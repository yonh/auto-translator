import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { PageLanguageCache } from '../../../src/core/page-language-cache';

describe('PageLanguageCache', () => {
  let cache: PageLanguageCache;

  beforeEach(() => {
    cache = new PageLanguageCache();
  });

  afterEach(() => {
    cache.clear();
    // Reset document lang
    document.documentElement.lang = '';
  });

  describe('getPageLanguage', () => {
    it('should detect language from HTML lang attribute', () => {
      document.documentElement.lang = 'zh-CN';
      cache.refresh();
      
      expect(cache.getPageLanguage()).toBe('zh-CN');
    });

    it('should normalize language codes', () => {
      document.documentElement.lang = 'en-US';
      cache.refresh();
      
      expect(cache.getPageLanguage()).toBe('en');
    });

    it('should default to English when no language is detected', () => {
      document.documentElement.lang = '';
      cache.refresh();
      
      // With empty body, should default to 'en'
      const lang = cache.getPageLanguage();
      expect(lang).toBe('en');
    });
  });

  describe('detectText', () => {
    it('should detect Chinese text', () => {
      const result = cache.detectText('这是一段中文文本');
      
      expect(result.detected).toBe('zh-CN');
      expect(result.confidence).toBeGreaterThan(0);
    });

    it('should detect Japanese text', () => {
      const result = cache.detectText('これは日本語のテキストです');
      
      expect(result.detected).toBe('ja');
      expect(result.confidence).toBeGreaterThan(0);
    });

    it('should detect Korean text', () => {
      const result = cache.detectText('이것은 한국어 텍스트입니다');
      
      expect(result.detected).toBe('ko');
      expect(result.confidence).toBeGreaterThan(0);
    });

    it('should detect Russian text', () => {
      const result = cache.detectText('Это русский текст');
      
      expect(result.detected).toBe('ru');
      expect(result.confidence).toBeGreaterThan(0);
    });

    it('should return English for Latin script', () => {
      const result = cache.detectText('This is English text');
      
      expect(result.detected).toBe('en');
    });

    it('should handle empty text', () => {
      const result = cache.detectText('');
      
      expect(result.confidence).toBe(0);
    });

    it('should handle very short text', () => {
      const result = cache.detectText('Hi');
      
      // Short text should use page language or have low confidence
      expect(result).toBeDefined();
    });
  });

  describe('shouldTranslate', () => {
    it('should return false for same language', () => {
      expect(cache.shouldTranslate('en', 'en')).toBe(false);
      expect(cache.shouldTranslate('zh-CN', 'zh-CN')).toBe(false);
    });

    it('should return true for different languages', () => {
      expect(cache.shouldTranslate('en', 'zh-CN')).toBe(true);
      expect(cache.shouldTranslate('ja', 'en')).toBe(true);
    });

    it('should handle Chinese variants', () => {
      expect(cache.shouldTranslate('zh-CN', 'zh-TW')).toBe(true);
      expect(cache.shouldTranslate('zh-TW', 'zh-CN')).toBe(true);
    });

    it('should handle empty languages', () => {
      expect(cache.shouldTranslate('', 'en')).toBe(false);
      expect(cache.shouldTranslate('en', '')).toBe(false);
    });
  });

  describe('caching', () => {
    it('should cache page language', () => {
      document.documentElement.lang = 'fr';
      cache.refresh();
      
      const lang1 = cache.getPageLanguage();
      
      // Change lang attribute
      document.documentElement.lang = 'de';
      
      // Should still return cached value
      const lang2 = cache.getPageLanguage();
      expect(lang2).toBe(lang1);
    });

    it('should clear cache', () => {
      document.documentElement.lang = 'fr';
      cache.refresh();
      
      cache.getPageLanguage();
      cache.clear();
      
      document.documentElement.lang = 'de';
      cache.refresh();
      
      expect(cache.getPageLanguage()).toBe('de');
    });

    it('should refresh cache', () => {
      document.documentElement.lang = 'fr';
      cache.refresh();
      cache.getPageLanguage();
      
      document.documentElement.lang = 'de';
      cache.refresh();
      
      expect(cache.getPageLanguage()).toBe('de');
    });
  });

  describe('confidence', () => {
    it('should have high confidence for HTML lang attribute', () => {
      document.documentElement.lang = 'en';
      cache.refresh();
      cache.getPageLanguage();
      
      expect(cache.getConfidence()).toBe(1.0);
    });
  });
});
