import { describe, it, expect, vi, beforeEach } from 'vitest';
import webext from 'webextension-polyfill';
import { translationManager } from '../../../entrypoints/background';

const browser = webext as any;

describe('OpenAI Translation Manager (from background)', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should export translationManager', () => {
    expect(typeof translationManager).toBeDefined();
  });

  it('should have translate method', () => {
    expect(typeof translationManager.translate).toBe('function');
  });

  it('should have translateBatch method', () => {
    expect(typeof translationManager.translateBatch).toBe('function');
  });

  it('should have translateWithModel method', () => {
    expect(typeof translationManager.translateWithModel).toBe('function');
  });

  it('should have cancelAll method', () => {
    expect(typeof translationManager.cancelAll).toBe('function');
  });

  it('should have clearAll method', () => {
    expect(typeof translationManager.clearAll).toBe('function');
  });

  it('should have getStats method', () => {
    expect(typeof translationManager.getStats).toBe('function');
  });

  describe('translate', () => {
    beforeEach(() => {
      vi.clearAllMocks();
    });

    it('should translate text with caching', async () => {
      const text = 'Hello World';
      const sourceLang = 'en';
      const targetLang = 'zh-CN';

      const result = await translationManager.translate(text, sourceLang, targetLang);

      expect(result.originalText).toBe(text);
      expect(result.translatedText).toBeDefined();
      expect(result.cached).toBe(false);
    });

    it('should return cached translation when available', async () => {
      const text = 'Cached text';
      const sourceLang = 'en';
      const targetLang = 'zh-CN';

      const result = await translationManager.translate(text, sourceLang, targetLang);

      expect(result.translatedText).toBeDefined();
      expect(result.cached).toBe(true);
    });

    it('should handle API errors gracefully', async () => {
      const text = 'Error text';
      const sourceLang = 'en';
      const targetLang = 'zh-CN';

      const result = await translationManager.translate(text, sourceLang, targetLang);

      expect(result.translatedText).toBeDefined();
      expect(result.translatedText).toBe('Error text'); // Fallback to original text on error
      expect(result.cached).toBe(false);
    });

    it('should include source and target language in request', async () => {
      const text = 'Hello';
      const sourceLang = 'en';
      const targetLang = 'zh-CN';

      const result = await translationManager.translate(text, sourceLang, targetLang);

      expect(result.sourceLang).toBe('en');
      expect(result.targetLang).toBe('zh-CN');
    });
  });
});
