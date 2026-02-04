import { TranslationStatus, PluginSettings, TranslationRequest } from '../types';
import { TranslationStateManager } from './translation-state-manager';
import { TextNodeExtractor } from './text-node-extractor';
import { StructurePreservingApplier } from './structure-preserving-applier';
import { DynamicContentHandler } from './dynamic-content-handler';
import { PageLanguageCache } from './page-language-cache';
import { TranslatableUnit } from './translatable-unit';
import { getOpenAIService } from '../services/openai';
import { translationCache } from '../services/cache';

/**
 * PageTranslationManagerV2 - Refactored page translation manager.
 * 
 * Key improvements over the original:
 * 1. Uses TextNodeExtractor for comprehensive text capture
 * 2. Uses StructurePreservingApplier to maintain DOM structure
 * 3. Integrates DynamicContentHandler for SPA support
 * 4. Uses PageLanguageCache for efficient language detection
 */
export class PageTranslationManagerV2 {
  private stateManager: TranslationStateManager;
  private extractor: TextNodeExtractor;
  private applier: StructurePreservingApplier;
  private dynamicHandler: DynamicContentHandler;
  private languageCache: PageLanguageCache;
  private settings: PluginSettings;
  private root: HTMLElement | null = null;
  private cancelled: boolean = false;
  private translatedUnits: Map<string, TranslatableUnit> = new Map();
  
  constructor(settings: PluginSettings) {
    this.settings = settings;
    this.stateManager = new TranslationStateManager();
    this.extractor = new TextNodeExtractor();
    this.applier = new StructurePreservingApplier();
    this.languageCache = new PageLanguageCache();
    this.dynamicHandler = new DynamicContentHandler(this.extractor);
  }

  /**
   * Initializes the translation manager.
   */
  async initialize(): Promise<void> {
    await translationCache.init(this.settings.cacheMaxAge);
  }
  
  /**
   * Translates the entire page.
   */
  async translatePage(root?: HTMLElement): Promise<void> {
    // Only block if actively translating, allow re-translation when completed/idle/error
    if (this.stateManager.isTranslating()) {
      console.log('[PageTranslationManagerV2] Already translating, skipping');
      return;
    }
    
    this.cancelled = false;
    this.root = root || document.body;
    
    // Clear previous translation state for fresh extraction
    // This ensures all text nodes are re-evaluated
    this.applier.revertAll();
    this.translatedUnits.clear();
    this.dynamicHandler.clearProcessedCache();
    
    console.log('[PageTranslationManagerV2] Starting page translation');
    this.stateManager.setState('detecting');
    
    try {
      // Detect page language
      const pageLanguage = this.languageCache.getPageLanguage();
      console.log(`[PageTranslationManagerV2] Detected page language: ${pageLanguage}`);
      
      // Check if translation is needed
      if (!this.languageCache.shouldTranslate(pageLanguage, this.settings.targetLanguage)) {
        console.log('[PageTranslationManagerV2] Page already in target language, skipping');
        this.stateManager.setState('idle');
        return;
      }
      
      this.stateManager.setState('translating');
      
      // Extract all translatable units
      const units = this.extractor.extract(this.root!);
      console.log(`[PageTranslationManagerV2] Extracted ${units.length} translatable units`);
      
      if (units.length === 0) {
        console.log('[PageTranslationManagerV2] No translatable content found');
        this.stateManager.setState('idle');
        return;
      }
      
      this.stateManager.setProgress(0, units.length);
      
      // Translate units in batches
      await this.translateUnits(units);
      
      if (!this.cancelled) {
        this.stateManager.setState('completed');
        this.stateManager.setProgress(units.length, units.length);
        console.log(`[PageTranslationManagerV2] Page translation completed. Translated ${this.translatedUnits.size} units.`);
        
        // Start observing for dynamic content
        this.startDynamicObservation();
      }
    } catch (error) {
      console.error('[PageTranslationManagerV2] Translation error:', error);
      this.stateManager.setError(error as Error);
      // Reset to idle so user can retry
      this.stateManager.setState('idle');
    }
  }
  
  /**
   * Translates a specific node.
   */
  async translateNode(node: Node): Promise<void> {
    if (this.stateManager.isTranslating()) {
      return;
    }
    
    this.cancelled = false;
    
    try {
      if (!(node instanceof HTMLElement)) {
        return;
      }
      
      const unit = this.extractor.extractFromElement(node);
      
      if (!unit) {
        console.log('[PageTranslationManagerV2] No translatable content in node');
        return;
      }
      
      // Detect language
      const detection = this.languageCache.detectText(unit.originalText);
      
      if (!this.languageCache.shouldTranslate(detection.detected, this.settings.targetLanguage)) {
        return;
      }
      
      unit.sourceLang = detection.detected;
      
      this.stateManager.setState('translating');
      this.stateManager.setProgress(0, 1);
      
      // Translate single unit
      await this.translateSingleUnit(unit);
      
      if (!this.cancelled) {
        this.stateManager.setProgress(1, 1);
        this.stateManager.setState('completed');
      }
    } catch (error) {
      console.error('[PageTranslationManagerV2] Node translation error:', error);
      this.stateManager.setError(error as Error);
    }
  }
  
  /**
   * Translates multiple units in batches.
   */
  private async translateUnits(units: TranslatableUnit[]): Promise<void> {
    const openAIService = getOpenAIService(this.settings.openai);
    
    // Filter units that need translation
    const unitsToTranslate: TranslatableUnit[] = [];
    
    for (const unit of units) {
      const detection = this.languageCache.detectText(unit.originalText);
      
      if (this.languageCache.shouldTranslate(detection.detected, this.settings.targetLanguage)) {
        unit.sourceLang = detection.detected;
        unitsToTranslate.push(unit);
      }
    }
    
    console.log(`[PageTranslationManagerV2] ${unitsToTranslate.length} units need translation`);
    
    let processedCount = 0;
    
    if (unitsToTranslate.length === 0) {
      return;
    }

    const requests: TranslationRequest[] = unitsToTranslate.map((unit) => ({
      text: unit.originalText,
      sourceLang: unit.sourceLang || 'en',
      targetLang: this.settings.targetLanguage,
    }));

    try {
      const responses = await openAIService.translateBatch(requests);

      for (let j = 0; j < unitsToTranslate.length; j++) {
        const unit = unitsToTranslate[j];
        const response = responses[j];

        if (response && response.translatedText) {
          const translation = response.translatedText;
          if (this.isValidTranslation(translation, unit.originalText)) {
            this.applier.apply(unit, translation);
            this.translatedUnits.set(unit.id, unit);
          } else {
            console.warn(`[PageTranslationManagerV2] Invalid translation for "${unit.originalText}": "${translation}"`);
          }
        }

        processedCount += 1;
        this.stateManager.setProgress(processedCount, unitsToTranslate.length);
      }
    } catch (error) {
      console.error('[PageTranslationManagerV2] Batch translation error:', error);
    }
  }
  
  /**
   * Translates a single unit.
   */
  private async translateSingleUnit(unit: TranslatableUnit): Promise<void> {
    const openAIService = getOpenAIService(this.settings.openai);
    
    const response = await openAIService.translate({
      text: unit.originalText,
      sourceLang: unit.sourceLang || 'en',
      targetLang: this.settings.targetLanguage,
    });
    
    if (response && response.translatedText) {
      this.applier.apply(unit, response.translatedText);
      this.translatedUnits.set(unit.id, unit);
      // Badge disabled - affects viewing experience
    }
  }
  
  /**
   * Starts observing for dynamic content changes.
   */
  private startDynamicObservation(): void {
    if (!this.root) return;
    
    this.dynamicHandler.start(this.root, async (newUnits) => {
      console.log(`[PageTranslationManagerV2] New dynamic content: ${newUnits.length} units`);
      
      // Translate new units
      for (const unit of newUnits) {
        const detection = this.languageCache.detectText(unit.originalText);
        
        if (this.languageCache.shouldTranslate(detection.detected, this.settings.targetLanguage)) {
          unit.sourceLang = detection.detected;
          
          try {
            await this.translateSingleUnit(unit);
          } catch (error) {
            console.error('[PageTranslationManagerV2] Dynamic content translation error:', error);
          }
        }
      }
    });
  }
  
  /**
   * Reverts all translations on the page.
   */
  async revertPage(): Promise<void> {
    this.dynamicHandler.stop();
    this.applier.revertAll();
    this.translatedUnits.clear();
    this.stateManager.reset();
    console.log('[PageTranslationManagerV2] Page reverted');
  }
  
  /**
   * Reverts translation for a specific node.
   */
  async revertNode(node: Node): Promise<void> {
    if (!(node instanceof HTMLElement)) {
      return;
    }
    
    // Find units associated with this node
    for (const [id, unit] of this.translatedUnits) {
      if (unit.parentElement === node || node.contains(unit.parentElement)) {
        this.applier.revert(unit);
        this.translatedUnits.delete(id);
      }
    }
  }
  
  /**
   * Clears the translation cache.
   */
  async clearCache(): Promise<void> {
    translationCache.clear();
    this.languageCache.clear();
  }
  
  /**
   * Cancels the current translation.
   */
  cancel(): void {
    this.cancelled = true;
    this.dynamicHandler.stop();
    const openAIService = getOpenAIService(this.settings.openai);
    openAIService.cancelAll();
    this.stateManager.reset();
    console.log('[PageTranslationManagerV2] Translation cancelled');
  }
  
  /**
   * Gets the current translation status.
   */
  getStatus(): TranslationStatus {
    return this.stateManager.getState();
  }
  
  /**
   * Gets the current progress.
   */
  getProgress() {
    return this.stateManager.getProgress();
  }
  
  /**
   * Updates the settings.
   */
  updateSettings(settings: Partial<PluginSettings>): void {
    this.settings = { ...this.settings, ...settings };
  }
  
  /**
   * Registers a status change callback.
   */
  onStatusChange(callback: (status: TranslationStatus) => void): () => void {
    return this.stateManager.onStatusChange(callback);
  }
  
  /**
   * Registers a progress change callback.
   */
  onProgressChange(callback: (progress: any) => void): () => void {
    return this.stateManager.onProgressChange(callback);
  }
  
  /**
   * Gets statistics about the translation.
   */
  getStats() {
    return {
      translatedUnits: this.translatedUnits.size,
      pageLanguage: this.languageCache.getPageLanguage(),
      targetLanguage: this.settings.targetLanguage,
    };
  }
  
  /**
   * Validates a translation result.
   * Returns false if the translation looks like an error message or is invalid.
   */
  private isValidTranslation(translation: string, originalText: string): boolean {
    if (!translation || translation.trim().length === 0) {
      return false;
    }
    
    // Check for common error patterns from LLM
    const errorPatterns = [
      /please provide/i,
      /i cannot/i,
      /i can't/i,
      /no text to translate/i,
      /nothing to translate/i,
      /empty text/i,
      /provide the text/i,
      /what would you like/i,
      /what text/i,
    ];
    
    for (const pattern of errorPatterns) {
      if (pattern.test(translation)) {
        return false;
      }
    }
    
    // If translation is much longer than original (5x+), it might be an explanation
    if (translation.length > originalText.length * 5 && originalText.length < 20) {
      return false;
    }
    
    return true;
  }
}
