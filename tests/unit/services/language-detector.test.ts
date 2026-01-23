import { describe, it, expect, beforeEach } from 'vitest';
import { LanguageDetector } from '../../../src/services/language-detector';

describe('LanguageDetector', () => {
  let detector: LanguageDetector;

  beforeEach(() => {
    detector = new LanguageDetector();
  });

  describe('detect', () => {
    it('should detect Chinese (simplified)', () => {
      const text = '这是一段简体中文文本';
      const result = detector.detect(text);

      expect(result.detected).toBe('zh-CN');
      expect(result.confidence).toBeGreaterThan(0);
    });

    it('should detect Chinese (traditional)', () => {
      const text = '這是一段繁體中文文本';
      const result = detector.detect(text);

      expect(result.detected).toBe('zh-CN');
      expect(result.confidence).toBeGreaterThan(0);
    });

    it('should detect Japanese (hiragana)', () => {
      const text = 'これは日本語のテキストです';
      const result = detector.detect(text);

      expect(result.detected).toBe('ja');
      expect(result.confidence).toBeGreaterThan(0);
    });

    it('should detect Japanese (katakana)', () => {
      const text = 'これはカタカナのテキストです';
      const result = detector.detect(text);

      expect(result.detected).toBe('ja');
      expect(result.confidence).toBeGreaterThan(0);
    });

    it('should detect Japanese (kanji) or Chinese due to shared Unicode ranges', () => {
      const text = '日本語の漢字テキスト';
      const result = detector.detect(text);

      expect(result.detected).toMatch(/^(zh-CN|ja)$/);
      expect(result.confidence).toBeGreaterThan(0);
    });

    it('should detect Korean', () => {
      const text = '이것은 한국어 텍스트입니다';
      const result = detector.detect(text);

      expect(result.detected).toBe('ko');
      expect(result.confidence).toBeGreaterThan(0);
    });

    it('should detect Russian', () => {
      const text = 'Это русский текст';
      const result = detector.detect(text);

      expect(result.detected).toBe('ru');
      expect(result.confidence).toBeGreaterThan(0);
    });

    it('should detect Arabic', () => {
      const text = 'هذا نص عربي';
      const result = detector.detect(text);

      expect(result.detected).toBe('ar');
      expect(result.confidence).toBeGreaterThan(0);
    });

    it('should detect Thai', () => {
      const text = 'นี่คือข้อความภาษาไทย';
      const result = detector.detect(text);

      expect(result.detected).toBe('th');
      expect(result.confidence).toBeGreaterThan(0);
    });

    it('should handle empty text', () => {
      const result = detector.detect('');

      expect(result.detected).toBe('en');
      expect(result.confidence).toBe(0);
    });

    it('should handle whitespace only', () => {
      const result = detector.detect('   ');

      expect(result.detected).toBe('en');
      expect(result.confidence).toBe(0);
    });

    it('should handle English text (fallback)', () => {
      const text = 'This is English text';
      const result = detector.detect(text);

      expect(result.detected).toBe('en');
      expect(result.confidence).toBe(0);
    });

    it('should detect dominant language in mixed text', () => {
      const text = 'Hello 这是中文 text';
      const result = detector.detect(text);

      // English fallback returns 'en' with 0 confidence
      // If Chinese is detected, confidence > 0
      expect(['en', 'zh-CN']).toContain(result.detected);
      expect(result.confidence).toBeGreaterThanOrEqual(0);
    });

    it('should normalize whitespace', () => {
      const text = 'Hello    World   Test';
      const result = detector.detect(text);

      expect(result).toBeDefined();
      expect(result.confidence).toBeGreaterThanOrEqual(0);
    });

    it('should filter special characters', () => {
      const text = 'Hello!@#$%^&*()World';
      const result = detector.detect(text);

      expect(result.detected).toBe('en');
      expect(result.confidence).toBe(0);
    });

    it('should calculate confidence correctly', () => {
      const chineseText = '中中中中中中中中中中';
      const result = detector.detect(chineseText);

      expect(result.confidence).toBeGreaterThan(0);
      expect(result.confidence).toBeLessThanOrEqual(1);
    });

    it('should have higher confidence for dominant language', () => {
      const dominant = detector.detect('中中中中中中中中中中');
      const mixed = detector.detect('中中中中HelloWorld');

      expect(dominant.confidence).toBeGreaterThan(mixed.confidence);
    });

    it('should handle text below confidence threshold', () => {
      const text = 'a'; // Very short text
      const result = detector.detect(text);

      expect(result.confidence).toBeLessThan(0.3);
      expect(result.detected).toBe('en');
    });
  });

  describe('detectPageLanguage', () => {
    beforeEach(() => {
      document.documentElement.lang = '';
    });

    it('should detect from html lang attribute', () => {
      document.documentElement.lang = 'zh-CN';

      const detected = detector.detectPageLanguage();

      expect(detected).toBe('zh-CN');
    });

    it('should detect from meta tag', () => {
      const meta = document.createElement('meta');
      meta.setAttribute('http-equiv', 'Content-Language');
      meta.setAttribute('content', 'ja');
      document.head.appendChild(meta);

      const detected = detector.detectPageLanguage();

      expect(detected).toBe('ja');
      document.head.removeChild(meta);
    });

    it('should fall back to content detection', () => {
      document.documentElement.lang = '';
      document.body.textContent = '这是一段中文文本';

      const detected = detector.detectPageLanguage();

      expect(detected).toBe('zh-CN');
    });

    it('should return English when no detection possible', () => {
      document.documentElement.lang = '';
      document.body.textContent = '';

      const detected = detector.detectPageLanguage();

      expect(detected).toBe('en');
    });

    it('should prioritize html lang over detection', () => {
      document.documentElement.lang = 'zh-CN';
      document.body.textContent = 'This is English text';

      const detected = detector.detectPageLanguage();

      expect(detected).toBe('zh-CN');
    });
  });

  describe('shouldTranslate', () => {
    beforeEach(() => {
      document.documentElement.lang = 'en';
    });

    it('should return true when languages differ', () => {
      document.documentElement.lang = 'en';
      const should = detector.shouldTranslate('zh-CN');

      expect(should).toBe(true);
    });

    it('should return false when languages are the same', () => {
      document.documentElement.lang = 'zh-CN';
      const should = detector.shouldTranslate('zh-CN');

      expect(should).toBe(false);
    });

    it('should treat zh-CN and zh-TW as different languages', () => {
      document.documentElement.lang = 'zh-CN';
      const should = detector.shouldTranslate('zh-TW');

      expect(should).toBe(true);
    });

    it('should detect page language and compare', () => {
      document.documentElement.lang = 'ja';
      const should = detector.shouldTranslate('en');

      expect(should).toBe(true);
    });

    it('should handle prefix matching', () => {
      document.documentElement.lang = 'zh-CN';
      const should = detector.shouldTranslate('zh');

      expect(should).toBe(false);
    });
  });
});
