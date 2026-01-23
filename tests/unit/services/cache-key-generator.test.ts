import { describe, it, expect } from 'vitest';
import { cacheKeyGenerator } from '../../src/services/cache-key-generator';

describe('Cache Key Generator', () => {
  describe('generate', () => {
    it('should generate consistent hash for same input', () => {
      const text = 'Hello World';
      const sourceLang = 'en';
      const targetLang = 'zh-CN';
      const model = 'gpt-3.5-turbo';

      const hash1 = cacheKeyGenerator.generate(text, sourceLang, targetLang, model);
      const hash2 = cacheKeyGenerator.generate(text, sourceLang, targetLang, model);

      expect(hash1).toBe(hash2);
    });

    it('should generate different hashes for different input', () => {
      const text = 'Hello World';
      const sourceLang = 'en';
      const targetLang = 'zh-CN';
      const model = 'gpt-3.5-turbo';

      const hash1 = cacheKeyGenerator.generate(text, sourceLang, targetLang, model);
      const hash2 = cacheKeyGenerator.generate(text, sourceLang, 'ja', model);

      expect(hash1).not.toBe(hash2);
    });

    it('should include language and model in hash', () => {
      const hash = cacheKeyGenerator.generate('test', 'en', 'zh-CN', 'gpt-3.5-turbo');

      expect(hash).toContain('en');
      expect(hash).toContain('zh-CN');
      expect(hash).toContain('gpt-3.5-turbo');
    });

    it('should handle special characters', () => {
      const hash = cacheKeyGenerator.generate('Hello!@#$', 'en', 'zh-CN', 'gpt-3.5-turbo');

      expect(hash).toBeDefined();
      expect(typeof hash).toBe('number');
    });

    it('should handle empty text', () => {
      const hash = cacheKeyGenerator.generate('', 'en', 'zh-CN', 'gpt-3.5-turbo');

      expect(hash).toBeDefined();
      expect(typeof hash).toBe('number');
    });

    it('should handle long text', () => {
      const longText = 'Hello World '.repeat(100);
      const hash = cacheKeyGenerator.generate(longText, 'en', 'zh-CN', 'gpt-3.5-turbo');

      expect(hash).toBeDefined();
      expect(typeof hash).toBe('string');
    });
  });
});
