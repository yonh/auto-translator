import {
  TranslationStatus,
  PluginSettings,
  TranslationRequest,
} from "../types";
import { TranslationStateManager } from "./translation-state-manager";
import { TextNodeExtractor } from "./text-node-extractor";
import { StructurePreservingApplier } from "./structure-preserving-applier";
import { DynamicContentHandler } from "./dynamic-content-handler";
import { PageLanguageCache } from "./page-language-cache";
import { TranslatableUnit } from "./translatable-unit";
import { getOpenAIService } from "../services/openai";
import { translationCache } from "../services/cache";

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
  private translatedContentKeys: Set<string> = new Set();

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
      this.debugLog("Already translating, skipping");
      return;
    }

    this.cancelled = false;
    this.root = root || document.body;

    // Clear previous translation state for fresh extraction
    // This ensures all text nodes are re-evaluated
    this.applier.revertAll();
    this.translatedUnits.clear();
    this.translatedContentKeys.clear();
    this.dynamicHandler.clearProcessedCache();

    this.debugLog("Starting page translation");
    this.stateManager.setState("detecting");

    try {
      // Detect page language
      const pageLanguage = this.languageCache.getPageLanguage();
      this.debugLog(`Detected page language: ${pageLanguage}`);

      // Check if translation is needed
      if (
        !this.languageCache.shouldTranslate(
          pageLanguage,
          this.settings.targetLanguage,
        )
      ) {
        this.debugLog("Page already in target language, skipping");
        this.stateManager.setState("idle");
        return;
      }

      this.stateManager.setState("translating");

      // Start observing early to avoid missing nodes added during initial translation.
      this.startDynamicObservation();

      // Extract all translatable units, including hidden content (like dropdowns)
      const units = this.extractor.extractIncludingHidden(this.root!);
      this.debugLog(`Extracted ${units.length} translatable units`);

      if (units.length === 0) {
        this.debugLog(
          "No translatable content found in initial scan, keeping dynamic observation active",
        );
        this.stateManager.setState("completed");
        this.stateManager.setProgress(0, 0);
        return;
      }

      this.stateManager.setProgress(0, units.length);

      // Translate units in batches
      await this.translateUnits(units);

      if (!this.cancelled) {
        this.stateManager.setState("completed");
        this.stateManager.setProgress(units.length, units.length);
        this.debugLog(
          `Page translation completed. Translated ${this.translatedUnits.size} units.`,
        );
      }
    } catch (error) {
      console.error("[PageTranslationManagerV2] Translation error:", error);
      this.stateManager.setError(error as Error);
      // Reset to idle so user can retry
      this.stateManager.setState("idle");
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
        this.debugLog("No translatable content in node");
        return;
      }

      if (this.shouldSkipText(unit.originalText)) {
        this.debugLogSkip(unit.originalText, "text-pattern");
        return;
      }

      // Detect language
      const detection = this.languageCache.detectText(unit.originalText);

      if (
        !this.languageCache.shouldTranslate(
          detection.detected,
          this.settings.targetLanguage,
        )
      ) {
        return;
      }

      unit.sourceLang = detection.detected;

      this.stateManager.setState("translating");
      this.stateManager.setProgress(0, 1);

      // Translate single unit
      await this.translateSingleUnit(unit);

      if (!this.cancelled) {
        this.stateManager.setProgress(1, 1);
        this.stateManager.setState("completed");
      }
    } catch (error) {
      console.error(
        "[PageTranslationManagerV2] Node translation error:",
        error,
      );
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
    const seenKeys = new Set<string>();

    for (const unit of units) {
      const contentKey = this.getContentKey(unit);
      if (
        seenKeys.has(contentKey) ||
        this.translatedContentKeys.has(contentKey)
      ) {
        this.debugLog(`Dedup skipped: ${contentKey}`);
        continue;
      }

      const detection = this.languageCache.detectText(unit.originalText);

      if (
        this.languageCache.shouldTranslate(
          detection.detected,
          this.settings.targetLanguage,
        )
      ) {
        if (this.shouldSkipText(unit.originalText)) {
          this.debugLogSkip(unit.originalText, "text-pattern");
          continue;
        }
        unit.sourceLang = detection.detected;
        unitsToTranslate.push(unit);
        seenKeys.add(contentKey);
      }
    }

    this.debugLog(`${unitsToTranslate.length} units need translation`);

    let processedCount = 0;

    if (unitsToTranslate.length === 0) {
      return;
    }

    const requests: TranslationRequest[] = unitsToTranslate.map((unit) => ({
      text: unit.originalText,
      sourceLang: unit.sourceLang || "en",
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
            this.applyTranslationSafely(unit, translation);
            this.translatedUnits.set(unit.id, unit);
            this.translatedContentKeys.add(this.getContentKey(unit));
          } else {
            console.warn(
              `[PageTranslationManagerV2] Invalid translation for "${unit.originalText}": "${translation}"`,
            );
          }
        }

        processedCount += 1;
        this.stateManager.setProgress(processedCount, unitsToTranslate.length);
      }
    } catch (error) {
      console.error(
        "[PageTranslationManagerV2] Batch translation error:",
        error,
      );
    }
  }

  /**
   * Translates a single unit.
   */
  private async translateSingleUnit(unit: TranslatableUnit): Promise<void> {
    const openAIService = getOpenAIService(this.settings.openai);

    const response = await openAIService.translate({
      text: unit.originalText,
      sourceLang: unit.sourceLang || "en",
      targetLang: this.settings.targetLanguage,
    });

    if (response && response.translatedText) {
      this.applyTranslationSafely(unit, response.translatedText);
      this.translatedUnits.set(unit.id, unit);
      this.translatedContentKeys.add(this.getContentKey(unit));
      // Badge disabled - affects viewing experience
    }
  }

  /**
   * Starts observing for dynamic content changes.
   */
  private startDynamicObservation(): void {
    if (!this.root) return;

    this.dynamicHandler.start(this.root, async (newUnits) => {
      this.debugLog(`New dynamic content: ${newUnits.length} units`);

      try {
        await this.translateDynamicUnits(newUnits);
      } catch (error) {
        console.error(
          "[PageTranslationManagerV2] Dynamic content translation error:",
          error,
        );
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
    this.translatedContentKeys.clear();
    this.stateManager.reset();
    this.debugLog("Page reverted");
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
        this.translatedContentKeys.delete(this.getContentKey(unit));
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
    this.debugLog("Translation cancelled");
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
  private isValidTranslation(
    translation: string,
    originalText: string,
  ): boolean {
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
    if (
      translation.length > originalText.length * 5 &&
      originalText.length < 20
    ) {
      return false;
    }

    return true;
  }

  /**
   * Applies translated text while pausing mutation observation to avoid self-trigger loops.
   */
  private applyTranslationSafely(
    unit: TranslatableUnit,
    translation: string,
  ): void {
    this.dynamicHandler.pause();
    try {
      this.applier.apply(unit, translation);
    } finally {
      this.dynamicHandler.resume();
    }
  }

  /**
   * Batch-translates dynamic units to reduce request fragmentation and UI jitter.
   */
  private async translateDynamicUnits(
    newUnits: TranslatableUnit[],
  ): Promise<void> {
    this.cleanupStaleTranslatedState();
    const openAIService = getOpenAIService(this.settings.openai);
    const unitsToTranslate: TranslatableUnit[] = [];
    const seenKeys = new Set<string>();

    for (const unit of newUnits) {
      const contentKey = this.getContentKey(unit);
      if (
        seenKeys.has(contentKey) ||
        this.translatedContentKeys.has(contentKey)
      ) {
        this.debugLog(`Dynamic dedup skipped: ${contentKey}`);
        continue;
      }

      if (this.shouldSkipText(unit.originalText)) {
        this.debugLogSkip(unit.originalText, "text-pattern");
        continue;
      }

      const detection = this.languageCache.detectText(unit.originalText);
      if (
        !this.languageCache.shouldTranslate(
          detection.detected,
          this.settings.targetLanguage,
        )
      ) {
        continue;
      }

      unit.sourceLang = detection.detected;
      unitsToTranslate.push(unit);
      seenKeys.add(contentKey);
    }

    if (unitsToTranslate.length === 0) {
      this.debugLog("Dynamic batch skipped: 0 units after filtering");
      return;
    }

    const requests: TranslationRequest[] = unitsToTranslate.map((unit) => ({
      text: unit.originalText,
      sourceLang: unit.sourceLang || "en",
      targetLang: this.settings.targetLanguage,
    }));

    const responses = await openAIService.translateBatch(requests);
    let appliedCount = 0;
    for (let i = 0; i < unitsToTranslate.length; i++) {
      const unit = unitsToTranslate[i];
      const response = responses[i];
      if (!response?.translatedText) {
        continue;
      }

      if (
        !this.isValidTranslation(response.translatedText, unit.originalText)
      ) {
        continue;
      }

      this.applyTranslationSafely(unit, response.translatedText);
      this.translatedUnits.set(unit.id, unit);
      this.translatedContentKeys.add(this.getContentKey(unit));
      appliedCount += 1;
    }
    this.debugLog(
      `Dynamic batch translated: ${appliedCount}/${unitsToTranslate.length}`,
    );
  }

  /**
   * Removes dedup entries for units that are no longer translated in the live DOM.
   * This keeps dynamic re-translation working for popovers/dialogs that reset text
   * back to source language when reopened.
   */
  private cleanupStaleTranslatedState(): void {
    for (const [id, unit] of this.translatedUnits) {
      const hasConnectedNode = unit.textNodes.some((node) => node.isConnected);
      const contentKey = this.getContentKey(unit);

      if (!hasConnectedNode) {
        this.translatedUnits.delete(id);
        this.translatedContentKeys.delete(contentKey);
        continue;
      }

      const currentText = unit.textNodes
        .map((node) => node.textContent || "")
        .join("")
        .replace(/\s+/g, " ")
        .trim();
      const originalText = unit.originalText.replace(/\s+/g, " ").trim();

      if (currentText === originalText) {
        this.translatedUnits.delete(id);
        this.translatedContentKeys.delete(contentKey);
      }
    }
  }

  /**
   * Builds a stable key used to deduplicate repeated content across dynamic updates.
   */
  private getContentKey(unit: TranslatableUnit): string {
    const xpath = unit.context?.xpath || "";
    const text = unit.originalText.replace(/\s+/g, " ").trim();
    return `${xpath}::${text}`;
  }

  private isDebugEnabled(): boolean {
    return Boolean(this.settings.debugLogging);
  }

  private debugLog(message: string, ...args: unknown[]): void {
    if (!this.isDebugEnabled()) {
      return;
    }
    console.log(`[PageTranslationManagerV2][Debug] ${message}`, ...args);
  }

  private debugLogSkip(text: string, reason: string): void {
    if (!this.isDebugEnabled()) {
      return;
    }
    const preview = text.length > 80 ? `${text.slice(0, 80)}...` : text;
    console.log(
      `[PageTranslationManagerV2][Debug] Skip (${reason}): "${preview}"`,
    );
  }

  /**
   * Returns true for texts that should not be sent for translation.
   * This avoids low-value requests like prices, pure numbers and symbol-only tokens.
   */
  private shouldSkipText(text: string): boolean {
    const normalized = (text || "").trim();
    if (!normalized) {
      return true;
    }

    // Pure numbers / punctuation / separators
    if (/^[\d\s.,:;!?()[\]{}\-_/\\|@#%&*+=~`"'<>]+$/.test(normalized)) {
      return true;
    }

    // Common price / currency tokens
    if (/^[¥$€£₹]\s?\d[\d,]*(\.\d+)?(%|[a-zA-Z]{1,4})?$/.test(normalized)) {
      return true;
    }
    if (
      /^\d[\d,]*(\.\d+)?\s?(usd|eur|gbp|cny|rmb|jpy|krw|cad|aud|hkd|ntd|元|块|円|엔|달러|dollars?)$/i.test(
        normalized,
      )
    ) {
      return true;
    }

    // Percentages and short numeric stats
    if (/^\d+([.,]\d+)?\s?%$/.test(normalized)) {
      return true;
    }

    // Numeric lists, e.g. "512, 1024, 2048, 4096" (also supports ; / | and newlines)
    if (/^(\d+([.,]\d+)?\s*([,;/|\n]\s*)+)+\d+([.,]\d+)?$/.test(normalized)) {
      return true;
    }

    // Very short tokens without letters from any language (e.g. "30.0", "--")
    if (normalized.length <= 8 && !/[\p{L}]/u.test(normalized)) {
      return true;
    }

    return false;
  }
}
