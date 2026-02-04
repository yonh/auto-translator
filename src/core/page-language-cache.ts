import { LanguageDetectionResult } from '../types';

/**
 * Language detection patterns for common languages.
 * Order matters: Japanese is checked before Chinese because Japanese text
 * often contains kanji (Chinese characters) but also has hiragana/katakana.
 */
const LANGUAGE_PATTERNS: [string, RegExp][] = [
  // Japanese must be checked first - hiragana/katakana are unique to Japanese
  ['ja', /[\u3040-\u309f\u30a0-\u30ff]/],
  // Korean
  ['ko', /[\uac00-\ud7af]/],
  // Chinese (checked after Japanese)
  ['zh-CN', /[\u4e00-\u9fa5]/],
  // Other languages
  ['ru', /[\u0400-\u04ff]/],
  ['ar', /[\u0600-\u06ff]/],
  ['th', /[\u0e00-\u0e7f]/],
  ['he', /[\u0590-\u05ff]/],
  ['el', /[\u0370-\u03ff]/],
  ['hi', /[\u0900-\u097f]/],
];

/**
 * PageLanguageCache - Caches page-level language detection results.
 * 
 * This avoids redundant language detection for each text segment
 * by detecting the page language once and caching it.
 */
export class PageLanguageCache {
  private detectedLanguage: string | null = null;
  private confidence: number = 0;
  private sampleSize: number = 500;
  private confidenceThreshold: number = 0.1;
  
  /**
   * Gets the detected page language.
   */
  getPageLanguage(): string {
    if (this.detectedLanguage) {
      return this.detectedLanguage;
    }
    
    this.detectPageLanguage();
    return this.detectedLanguage || 'en';
  }
  
  /**
   * Gets the detection confidence.
   */
  getConfidence(): number {
    return this.confidence;
  }
  
  /**
   * Detects the page language using multiple strategies.
   */
  private detectPageLanguage(): void {
    // Strategy 1: Check HTML lang attribute
    const htmlLang = this.getHtmlLangAttribute();
    if (htmlLang) {
      this.detectedLanguage = this.normalizeLanguage(htmlLang);
      this.confidence = 1.0;
      return;
    }
    
    // Strategy 2: Check meta tags
    const metaLang = this.getMetaLanguage();
    if (metaLang) {
      this.detectedLanguage = this.normalizeLanguage(metaLang);
      this.confidence = 0.9;
      return;
    }
    
    // Strategy 3: Analyze page content
    const contentResult = this.analyzePageContent();
    this.detectedLanguage = contentResult.detected;
    this.confidence = contentResult.confidence;
  }
  
  /**
   * Gets the lang attribute from the HTML element.
   */
  private getHtmlLangAttribute(): string | null {
    const lang = document.documentElement.lang;
    if (lang && lang.trim().length > 0) {
      return lang.trim();
    }
    return null;
  }
  
  /**
   * Gets language from meta tags.
   */
  private getMetaLanguage(): string | null {
    // Check Content-Language meta tag
    const contentLang = document.querySelector('meta[http-equiv="Content-Language"]');
    if (contentLang) {
      const content = contentLang.getAttribute('content');
      if (content && content.trim().length > 0) {
        return content.trim();
      }
    }
    
    // Check og:locale meta tag
    const ogLocale = document.querySelector('meta[property="og:locale"]');
    if (ogLocale) {
      const content = ogLocale.getAttribute('content');
      if (content && content.trim().length > 0) {
        return content.trim();
      }
    }
    
    return null;
  }
  
  /**
   * Analyzes page content to detect language.
   */
  private analyzePageContent(): LanguageDetectionResult {
    const sampleText = this.getSampleText();
    
    if (!sampleText || sampleText.length < 10) {
      return { detected: 'en', confidence: 0 };
    }
    
    // Check for non-Latin scripts first (more reliable)
    for (const [lang, pattern] of LANGUAGE_PATTERNS) {
      const matches = sampleText.match(new RegExp(pattern.source, 'g'));
      if (matches) {
        const matchRatio = matches.length / sampleText.length;
        if (matchRatio > this.confidenceThreshold) {
          return {
            detected: lang,
            confidence: Math.min(matchRatio * 2, 1),
          };
        }
      }
    }
    
    // Default to English for Latin script
    return { detected: 'en', confidence: 0.5 };
  }
  
  /**
   * Gets a sample of text from the page for analysis.
   */
  private getSampleText(): string {
    const body = document.body;
    if (!body) {
      return '';
    }
    
    // Get text from main content areas first
    const mainSelectors = ['main', 'article', '[role="main"]', '.content', '#content'];
    
    for (const selector of mainSelectors) {
      const element = document.querySelector(selector);
      if (element) {
        const text = element.textContent?.trim();
        if (text && text.length >= this.sampleSize) {
          return this.cleanText(text).substring(0, this.sampleSize);
        }
      }
    }
    
    // Fall back to body text
    const bodyText = body.textContent?.trim() || '';
    return this.cleanText(bodyText).substring(0, this.sampleSize);
  }
  
  /**
   * Cleans text for analysis.
   */
  private cleanText(text: string): string {
    return text
      .replace(/\s+/g, ' ')
      .replace(/[0-9]+/g, '')
      .replace(/[^\w\s\u4e00-\u9fff\u3040-\u309f\u30a0-\u30ff\uac00-\ud7af\u0400-\u04ff\u0600-\u06ff\u0e00-\u0e7f\u0590-\u05ff\u0370-\u03ff\u0900-\u097f]/g, '')
      .trim();
  }
  
  /**
   * Normalizes a language code.
   */
  private normalizeLanguage(lang: string): string {
    const normalized = lang.toLowerCase().trim();
    
    // Handle common variations
    const mappings: Record<string, string> = {
      'zh': 'zh-CN',
      'zh-hans': 'zh-CN',
      'zh-hant': 'zh-TW',
      'zh-cn': 'zh-CN',
      'zh-tw': 'zh-TW',
      'zh-hk': 'zh-TW',
      'en-us': 'en',
      'en-gb': 'en',
      'ja-jp': 'ja',
      'ko-kr': 'ko',
    };
    
    return mappings[normalized] || normalized.split('-')[0];
  }
  
  /**
   * Detects language for a specific text.
   */
  detectText(text: string): LanguageDetectionResult {
    if (!text || text.trim().length < 2) {
      return { detected: this.getPageLanguage(), confidence: 0 };
    }
    
    const cleaned = this.cleanText(text);
    
    // Check for non-Latin scripts
    for (const [lang, pattern] of LANGUAGE_PATTERNS) {
      const matches = cleaned.match(new RegExp(pattern.source, 'g'));
      if (matches) {
        const matchRatio = matches.length / cleaned.length;
        if (matchRatio > this.confidenceThreshold) {
          return {
            detected: lang,
            confidence: Math.min(matchRatio * 2, 1),
          };
        }
      }
    }
    
    // For short texts, use page language
    if (cleaned.length < 20) {
      return { detected: this.getPageLanguage(), confidence: 0.3 };
    }
    
    // Default to English
    return { detected: 'en', confidence: 0.5 };
  }
  
  /**
   * Checks if a language should be translated to the target language.
   */
  shouldTranslate(sourceLang: string, targetLang: string): boolean {
    if (!sourceLang || !targetLang) {
      return false;
    }
    
    const normalizedSource = this.normalizeLanguage(sourceLang);
    const normalizedTarget = this.normalizeLanguage(targetLang);
    
    // Same language
    if (normalizedSource === normalizedTarget) {
      return false;
    }
    
    // Handle Chinese variants
    if (normalizedSource.startsWith('zh') && normalizedTarget.startsWith('zh')) {
      // zh-CN to zh-TW or vice versa might still need translation
      return normalizedSource !== normalizedTarget;
    }
    
    return true;
  }
  
  /**
   * Clears the cache.
   */
  clear(): void {
    this.detectedLanguage = null;
    this.confidence = 0;
  }
  
  /**
   * Forces re-detection of page language.
   */
  refresh(): void {
    this.clear();
    this.detectPageLanguage();
  }
}

/**
 * Singleton instance for page language cache.
 */
export const pageLanguageCache = new PageLanguageCache();
