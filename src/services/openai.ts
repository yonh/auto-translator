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
  }

  updateConfig(config: Partial<OpenAIConfig>): void {
    this.config = { ...this.config, ...config };
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

    const batchSize = Math.min(this.config.maxConcurrency || 1, requests.length);
    const results: TranslationResponse[] = [];

    for (let i = 0; i < requests.length; i += batchSize) {
      const batch = requests.slice(i, i + batchSize);
      const batchResults = await Promise.allSettled(
        batch.map(req => this.translate(req))
      );

      for (const result of batchResults) {
        if (result.status === 'fulfilled') {
          results.push(result.value);
        } else {
          results.push({
            originalText: requests[results.length].text,
            translatedText: requests[results.length].text,
            sourceLang: requests[results.length].sourceLang,
            targetLang: requests[results.length].targetLang,
            model,
            cached: false
          });
        }
      }
    }

    return results;
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

      const batches: TranslationRequest[][] = [];
      for (let i = 0; i < modelRequests.length; i += modelCounts) {
        batches.push(modelRequests.slice(i, i + modelCounts));
      }

      for (const batch of batches) {
        const batchResults = await Promise.allSettled(
          batch.map(req =>
            this.translate({ ...req, model })
          )
        );

        for (const result of batchResults) {
          if (result.status === 'fulfilled') {
            results.push(result.value);
          } else {
            results.push({
              originalText: requests[results.length].text,
              translatedText: requests[results.length].text,
              sourceLang: requests[results.length].sourceLang,
              targetLang: requests[results.length].targetLang,
              model,
              cached: false
            });
          }
        }
      }
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
      temperature: 0.3,
      max_tokens: 2000
    };

    let apiUrl = this.config.baseUrl;
    if (!apiUrl.endsWith('/chat/completions')) {
      apiUrl = apiUrl.replace(/\/$/, '') + '/chat/completions';
    }

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

    return data.choices[0].message.content.trim();
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
