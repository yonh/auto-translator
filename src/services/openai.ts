import webext from 'webextension-polyfill';
import { OpenAIConfig, TranslationRequest, TranslationResponse } from '../types';
import { translationCache } from './cache';

const browser = webext as any;

interface OpenAIRequest {
  model: string;
  messages: Array<{ role: string; content: string }>;
  temperature?: number;
  max_tokens?: number;
}

interface OpenAIResponse {
  choices: Array<{
    message: { content: string };
    finish_reason: string;
  }>;
  usage: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
}

export class OpenAIService {
  private config: OpenAIConfig;
  private activeRequests: Map<string, AbortController> = new Map();
  private requestQueue: Array<() => void> = [];

  constructor(config: OpenAIConfig) {
    this.config = config;
    console.log('[OpenAIService] Initialized with config:', {
      batchMaxItems: this.config.batchMaxItems,
      batchMaxChars: this.config.batchMaxChars,
      batchMaxTokens: this.config.batchMaxTokens,
      batchRetryCount: this.config.batchRetryCount
    });
  }

  /**
   * Parses single translation content, tolerant to fenced JSON arrays or wrapped outputs.
   */
  private parseSingleTranslationContent(content: string): string {
    const trimmed = content.trim();

    // Try to extract JSON from fenced blocks or raw content
    const extracted = this.extractJsonContent(trimmed);
    try {
      const parsed = JSON.parse(extracted);

      if (typeof parsed === 'string') {
        return parsed.trim();
      }

      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed.join(' ').trim();
      }

      if (parsed && Array.isArray((parsed as any).translations)) {
        return (parsed as any).translations.join(' ').trim();
      }
    } catch (_error) {
      // Fallback to original content below
    }

    return trimmed;
  }

  updateConfig(config: Partial<OpenAIConfig>): void {
    this.config = { ...this.config, ...config };
    console.log('[OpenAIService] Config updated:', {
      batchMaxItems: this.config.batchMaxItems,
      batchMaxChars: this.config.batchMaxChars,
      batchMaxTokens: this.config.batchMaxTokens,
      batchRetryCount: this.config.batchRetryCount
    });
  }

  async translate(req: TranslationRequest): Promise<TranslationResponse> {
    const model = req.model || this.config.models[0];
    const cacheKey = `${req.sourceLang}:${req.targetLang}:${model}`;

    if (this.config.maxConcurrency > 0) {
      await this.waitSlot();
    }

    try {
      const cached = await translationCache.get(
        req.text,
        req.sourceLang,
        req.targetLang,
        model
      );

      if (cached) {
        return {
          originalText: req.text,
          translatedText: cached.translatedText,
          sourceLang: req.sourceLang,
          targetLang: req.targetLang,
          model: cached.model,
          cached: true
        };
      }

      const abortController = new AbortController();
      const requestId = `${cacheKey}:${Date.now()}`;
      this.activeRequests.set(requestId, abortController);

      const translatedText = await this.translateWithModel(
        req.text,
        req.sourceLang,
        req.targetLang,
        model,
        abortController.signal
      );

      await translationCache.set(
        req.text,
        req.sourceLang,
        req.targetLang,
        model,
        translatedText
      );

      this.activeRequests.delete(requestId);
      this.releaseSlot();

      return {
        originalText: req.text,
        translatedText,
        sourceLang: req.sourceLang,
        targetLang: req.targetLang,
        model,
        cached: false
      };
    } catch (error) {
      this.releaseSlot();
      throw error;
    }
  }

  async translateBatch(requests: TranslationRequest[]): Promise<TranslationResponse[]> {
    if (requests.length === 0) {
      return [];
    }

    const model = requests[0].model || this.config.models[0];

    if (this.config.models.length > 1) {
      return this.translateBatchWithMultipleModels(requests);
    }

    const results: Array<TranslationResponse | null> = new Array(requests.length).fill(null);
    const pending: Array<{ request: TranslationRequest; index: number }> = [];

    for (let i = 0; i < requests.length; i++) {
      const request = requests[i];
      const cached = await translationCache.get(
        request.text,
        request.sourceLang,
        request.targetLang,
        model
      );

      if (cached) {
        results[i] = {
          originalText: request.text,
          translatedText: cached.translatedText,
          sourceLang: request.sourceLang,
          targetLang: request.targetLang,
          model: cached.model,
          cached: true
        };
      } else {
        pending.push({ request, index: i });
      }
    }

    if (pending.length === 0) {
      return results.map(result => result!);
    }

    const batches = this.buildBatches(pending);

    await Promise.all(
      batches.map(async (batch) => {
        const translations = await this.translateBatchWithRetry(
          batch.map(item => item.request),
          model
        );

        for (let i = 0; i < batch.length; i++) {
          const request = batch[i].request;
          const translatedText = translations[i] ?? request.text;
          results[batch[i].index] = {
            originalText: request.text,
            translatedText,
            sourceLang: request.sourceLang,
            targetLang: request.targetLang,
            model,
            cached: false
          };

          await translationCache.set(
            request.text,
            request.sourceLang,
            request.targetLang,
            model,
            translatedText
          );
        }
      })
    );

    return results.map(result => result!);
  }

  private async translateBatchWithMultipleModels(
    requests: TranslationRequest[]
  ): Promise<TranslationResponse[]> {
    const modelCounts = Math.ceil(
      (this.config.maxConcurrency || 1) / this.config.models.length
    );
    const results: TranslationResponse[] = [];

    for (const model of this.config.models) {
      const modelRequests = requests.filter(
        r => !r.model || r.model === model
      );

      if (modelRequests.length === 0) {
        continue;
      }

      const modelResults = await this.translateBatch(
        modelRequests.map(req => ({ ...req, model }))
      );
      results.push(...modelResults);
    }

    return results;
  }

  private async translateWithModel(
    text: string,
    sourceLang: string,
    targetLang: string,
    model: string,
    signal: AbortSignal
  ): Promise<string> {
    const chunkSize = Math.max(0, this.config.chunkSize || 0);

    if (chunkSize > 0 && text.length > chunkSize) {
      const chunks = this.chunkText(text, chunkSize);
      const translatedChunks: string[] = [];

      for (const chunk of chunks) {
        const translatedChunk = await this.translateSingleChunk(
          chunk,
          sourceLang,
          targetLang,
          model,
          signal
        );
        translatedChunks.push(translatedChunk);
      }

      return translatedChunks.join('');
    }

    return this.translateSingleChunk(text, sourceLang, targetLang, model, signal);
  }

  private async translateSingleChunk(
    text: string,
    sourceLang: string,
    targetLang: string,
    model: string,
    signal: AbortSignal
  ): Promise<string> {
    const prompt = this.buildPrompt(text, sourceLang, targetLang);

    const requestBody: OpenAIRequest = {
      model,
      messages: [
        {
          role: 'system',
          content: 'You are a professional translator. Translate given text accurately while preserving original meaning and tone.'
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      temperature: 1.0,
      max_tokens: 20000
    };

    let apiUrl = this.config.baseUrl;
    apiUrl = this.normalizeApiUrl(apiUrl);

    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.config.apiKey}`
      },
      body: JSON.stringify(requestBody),
      signal
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('[OpenAI Service] API request failed:', {
        url: apiUrl,
        status: response.status,
        statusText: response.statusText,
        body: errorText
      });
      throw new Error(`OpenAI API error: ${response.status} - ${errorText}`);
    }

    const data: OpenAIResponse = await response.json();

    if (!data.choices || data.choices.length === 0) {
      throw new Error('No translation returned from OpenAI API');
    }

    return this.parseSingleTranslationContent(data.choices[0].message.content);
  }

  /**
   * Build request batches based on item count and character limits.
   */
  private buildBatches(
    items: Array<{ request: TranslationRequest; index: number }>
  ): Array<Array<{ request: TranslationRequest; index: number }>> {
    const maxItems = Math.max(1, this.config.batchMaxItems || 10);
    const maxChars = Math.max(1, this.config.batchMaxChars || 2000);
    const maxTokens = Math.max(1, this.config.batchMaxTokens || 800);
    console.log('[OpenAIService] Batch limits:', {
      maxItems,
      maxChars,
      maxTokens,
      totalItems: items.length
    });
    const batches: Array<Array<{ request: TranslationRequest; index: number }>> = [];
    let current: Array<{ request: TranslationRequest; index: number }> = [];
    let currentChars = 0;
    let currentTokens = 0;

    for (const item of items) {
      const textLength = item.request.text.length;
      const itemTokens = this.estimateTokens(item.request.text);
      const nextChars = currentChars + textLength;
      const nextTokens = currentTokens + itemTokens;
      if (current.length >= maxItems || nextChars > maxChars || nextTokens > maxTokens) {
        if (current.length > 0) {
          batches.push(current);
        }
        current = [item];
        currentChars = textLength;
        currentTokens = itemTokens;
        continue;
      }

      current.push(item);
      currentChars = nextChars;
      currentTokens = nextTokens;
    }

    if (current.length > 0) {
      batches.push(current);
    }

    return batches;
  }

  /**
   * Estimate token count using a heuristic to reduce batching churn.
   */
  private estimateTokens(text: string): number {
    const latinCount = (text.match(/[A-Za-z0-9]/g) || []).length;
    const nonLatinCount = Math.max(0, text.length - latinCount);
    const latinTokens = Math.ceil(latinCount / 4);
    return Math.max(1, latinTokens + nonLatinCount);
  }

  /**
   * Translate a batch with retry and format tolerance.
   */
  private async translateBatchWithRetry(
    requests: TranslationRequest[],
    model: string
  ): Promise<string[]> {
    const retries = Math.max(0, this.config.batchRetryCount || 2);
    let lastError: Error | null = null;

    for (let attempt = 0; attempt <= retries; attempt++) {
      try {
        return await this.translateBatchRequest(requests, model);
      } catch (error) {
        lastError = error as Error;
      }
    }

    throw lastError || new Error('Batch translation failed');
  }

  /**
   * Send a single API request for a batch of texts.
   */
  private async translateBatchRequest(
    requests: TranslationRequest[],
    model: string
  ): Promise<string[]> {
    const abortController = new AbortController();
    const requestId = `batch:${Date.now()}`;
    this.activeRequests.set(requestId, abortController);

    if (this.config.maxConcurrency > 0) {
      await this.waitSlot();
    }

    try {
      const prompt = this.buildBatchPrompt(requests);
      const requestBody: OpenAIRequest = {
        model,
        messages: [
          {
            role: 'system',
            content: 'You are a professional translator. Translate each item accurately and return a JSON array of translated strings in the same order.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 1.0,
        max_tokens: 20000
      };

      const apiUrl = this.normalizeApiUrl(this.config.baseUrl);
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.config.apiKey}`
        },
        body: JSON.stringify(requestBody),
        signal: abortController.signal
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`OpenAI API error: ${response.status} - ${errorText}`);
      }

      const data: OpenAIResponse = await response.json();
      if (!data.choices || data.choices.length === 0) {
        throw new Error('No translation returned from OpenAI API');
      }

      const content = data.choices[0].message.content.trim();
      const translations = this.parseBatchTranslations(content, requests.length);
      if (translations.length !== requests.length) {
        throw new Error('Batch translation response length mismatch');
      }

      return translations;
    } finally {
      this.activeRequests.delete(requestId);
      this.releaseSlot();
    }
  }

  /**
   * Build a batch prompt that yields a JSON array response.
   */
  private buildBatchPrompt(requests: TranslationRequest[]): string {
    const sourceLang = requests[0]?.sourceLang || 'auto';
    const targetLang = requests[0]?.targetLang || 'auto';
    const items = requests
      .map((request, index) => `${index + 1}. ${request.text}`)
      .join('\n');

    return `Translate the following items from ${sourceLang} to ${targetLang}.
Return ONLY a JSON array of translated strings in the same order.

Items:
${items}`;
  }

  /**
   * Parse model output into a translation list, supporting JSON code blocks.
   */
  private parseBatchTranslations(content: string, expectedCount: number): string[] {
    const extracted = this.extractJsonContent(content);
    try {
      const parsed = JSON.parse(extracted);
      if (Array.isArray(parsed)) {
        return parsed.map(item => String(item));
      }
      if (parsed && Array.isArray(parsed.translations)) {
        return parsed.translations.map((item: unknown) => String(item));
      }
    } catch (error) {
      throw new Error(`Failed to parse batch translation response: ${String(error)}`);
    }

    throw new Error(`Invalid batch translation response, expected ${expectedCount} items`);
  }

  /**
   * Extract JSON content from a raw response, including ```json blocks.
   */
  private extractJsonContent(content: string): string {
    const fencedMatch = content.match(/```json\s*([\s\S]*?)```/i);
    if (fencedMatch?.[1]) {
      return fencedMatch[1].trim();
    }

    const genericMatch = content.match(/```\s*([\s\S]*?)```/i);
    if (genericMatch?.[1]) {
      return genericMatch[1].trim();
    }

    const arrayStart = content.indexOf('[');
    const arrayEnd = content.lastIndexOf(']');
    if (arrayStart !== -1 && arrayEnd !== -1 && arrayEnd > arrayStart) {
      return content.slice(arrayStart, arrayEnd + 1);
    }

    return content;
  }

  /**
   * Normalize OpenAI API URL to chat completions endpoint.
   */
  private normalizeApiUrl(baseUrl: string): string {
    if (baseUrl.endsWith('/chat/completions')) {
      return baseUrl;
    }
    return baseUrl.replace(/\/$/, '') + '/chat/completions';
  }

  /**
   * Split a text into fixed-size character chunks to constrain request payloads.
   */
  private chunkText(text: string, size: number): string[] {
    const chunks: string[] = [];
    for (let i = 0; i < text.length; i += size) {
      chunks.push(text.slice(i, i + size));
    }
    return chunks;
  }

  private buildPrompt(text: string, sourceLang: string, targetLang: string): string {
    // Use XML-like tags to clearly delimit the text to translate
    // This prevents short texts like "OR" from being misinterpreted as instructions
    return `Translate the text inside <source> tags from ${sourceLang} to ${targetLang}.
Output ONLY the translated text, nothing else.

<source>${text}</source>`;
  }

  private async waitSlot(): Promise<void> {
    const activeCount = this.activeRequests.size;
    if (activeCount < this.config.maxConcurrency) {
      return;
    }

    return new Promise(resolve => {
      this.requestQueue.push(resolve);
    });
  }

  private releaseSlot(): void {
    const next = this.requestQueue.shift();
    if (next) {
      next();
    }
  }

  cancelAll(): void {
    for (const controller of this.activeRequests.values()) {
      controller.abort();
    }
    this.activeRequests.clear();
    this.requestQueue = [];
  }

  getActiveRequestCount(): number {
    return this.activeRequests.size;
  }
}

let openaiService: OpenAIService | null = null;

export function getOpenAIService(config?: OpenAIConfig): OpenAIService {
  if (!openaiService && config) {
    openaiService = new OpenAIService(config);
  }
  return openaiService!;
}

export function updateOpenAIConfig(config: Partial<OpenAIConfig>): void {
  if (openaiService) {
    openaiService.updateConfig(config);
  }
}
