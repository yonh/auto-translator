import { TranslationStatus, PluginSettings, TranslationRequest } from '../types';
import { TranslationStateManager } from './translation-state-manager';
import { TranslationApplier } from './translation-applier';
import { TextExtractor } from '../utils/text-extractor';
import { LanguageDetector } from '../services/language-detector';
import { getOpenAIService } from '../services/openai';
import { translationCache } from '../services/cache';

export class PageTranslationManager {
  private stateManager: TranslationStateManager;
  private applier: TranslationApplier;
  private extractor: TextExtractor;
  private languageDetector: LanguageDetector;
  private settings: PluginSettings;
  private root: HTMLElement | null = null;
  private cancelled: boolean = false;

  constructor(settings: PluginSettings) {
    this.stateManager = new TranslationStateManager();
    this.applier = new TranslationApplier();
    this.extractor = new TextExtractor();
    this.languageDetector = new LanguageDetector();
    this.settings = settings;
  }

  async initialize(): Promise<void> {
    await translationCache.init(this.settings.cacheMaxAge);
  }

  async translatePage(root?: HTMLElement): Promise<void> {
    if (this.stateManager.isTranslating()) {
      return;
    }

    this.cancelled = false;
    this.root = root || document.body;

    this.stateManager.setState('detecting');

    try {
      if (this.settings.autoDetect) {
        const detected = this.languageDetector.detect(
          this.extractor.getElementText(this.root!)
        );

        if (!this.shouldTranslate(detected.detected)) {
          this.stateManager.setState('idle');
          return;
        }
      }

      this.stateManager.setState('translating');
      const elements = this.extractor.extract(this.root!);

      if (elements.length === 0) {
        this.stateManager.setState('idle');
        return;
      }

      this.stateManager.setProgress(0, elements.length);

      await this.translateElements(elements);

      if (!this.cancelled) {
        this.stateManager.setState('completed');
        this.stateManager.setProgress(elements.length, elements.length);
      }
    } catch (error) {
      this.stateManager.setError(error as Error);
    }
  }

  async translateNode(node: Node): Promise<void> {
    if (this.stateManager.isTranslating()) {
      return;
    }

    this.cancelled = false;

    try {
      const text = this.extractor.getElementText(node as HTMLElement);

      if (!text || text.length < 2) {
        return;
      }

      const detectionResult = this.languageDetector.detect(text);
      const sourceLang = detectionResult.detected;

      if (!this.shouldTranslate(sourceLang)) {
        return;
      }

      this.stateManager.setState('translating');
      this.stateManager.setProgress(0, 1);

      const openAIService = getOpenAIService(this.settings.openai);

      const response = await openAIService.translate({
        text,
        sourceLang,
        targetLang: this.settings.targetLanguage
      });

      if (!this.cancelled) {
        this.applier.apply(node, response.translatedText);
        this.stateManager.setProgress(1, 1);
        this.stateManager.setState('completed');
      }
    } catch (error) {
      this.stateManager.setError(error as Error);
    }
  }

  async revertPage(): Promise<void> {
    this.applier.revertAll();
    this.stateManager.reset();
  }

  async revertNode(node: Node): Promise<void> {
    if (node instanceof HTMLElement) {
      this.applier.revert(node);
    }
  }

  async clearCache(): Promise<void> {
    translationCache.clear();
  }

  cancel(): void {
    this.cancelled = true;
    const openAIService = getOpenAIService(this.settings.openai);
    openAIService.cancelAll();
    this.stateManager.reset();
  }

  getStatus(): TranslationStatus {
    return this.stateManager.getState();
  }

  getProgress() {
    return this.stateManager.getProgress();
  }

  updateSettings(settings: Partial<PluginSettings>): void {
    this.settings = { ...this.settings, ...settings };
  }

  private shouldTranslate(sourceLang: string): boolean {
    if (sourceLang === this.settings.targetLanguage) {
      return false;
    }

    const supportedLanguages = ['en', 'zh-CN', 'zh-TW', 'ja', 'ko', 'fr', 'de', 'es', 'ru', 'pt'];
    return supportedLanguages.includes(sourceLang);
  }

  private async translateElements(elements: HTMLElement[]): Promise<void> {
    const openAIService = getOpenAIService(this.settings.openai);
    const batchSize = Math.min(10, elements.length);

    for (let i = 0; i < elements.length && !this.cancelled; i += batchSize) {
      const batch = elements.slice(i, i + batchSize);
      const requests: TranslationRequest[] = [];

      for (const element of batch) {
        const text = this.extractor.getElementText(element);

        if (!text || text.length < 2) {
          this.stateManager.setProgress(
            this.stateManager.getProgress().current + 1,
            elements.length
          );
          continue;
        }

        const detectionResult = this.languageDetector.detect(text);
        const sourceLang = detectionResult.detected;

        if (!this.shouldTranslate(sourceLang)) {
          this.stateManager.setProgress(
            this.stateManager.getProgress().current + 1,
            elements.length
          );
          continue;
        }

        requests.push({
          text,
          sourceLang,
          targetLang: this.settings.targetLanguage
        });
      }

      if (requests.length === 0) {
        continue;
      }

      const responses = await openAIService.translateBatch(requests);

      let requestIndex = 0;
      for (const element of batch) {
        const text = this.extractor.getElementText(element);

        if (!text || text.length < 2) {
          continue;
        }

        const detectionResult = this.languageDetector.detect(text);
        const sourceLang = detectionResult.detected;

        if (!this.shouldTranslate(sourceLang)) {
          continue;
        }

        const response = responses[requestIndex];
        this.applier.apply(element, response.translatedText);
        requestIndex++;
      }

      this.stateManager.setProgress(i + batch.length, elements.length);
    }
  }

  onStatusChange(callback: (status: TranslationStatus) => void): () => void {
    return this.stateManager.onStatusChange(callback);
  }

  onProgressChange(callback: (progress: any) => void): () => void {
    return this.stateManager.onProgressChange(callback);
  }
}
