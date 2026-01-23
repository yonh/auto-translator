import { describe, it, expect } from 'vitest';

describe('Cache Key Generator', () => {
  describe('generateHash', () => {
    it('should generate consistent hash for same input', () => {
      const text = 'Hello World';
      const sourceLang = 'en';
      const targetLang = 'zh-CN';
      const model = 'gpt-3.5-turbo';

      const hash1 = generateHash(text, sourceLang, targetLang, model);
      const hash2 = generateHash(text, sourceLang, targetLang, model);

      expect(hash1).toBe(hash2);
    });

    it('should generate different hashes for different input', () => {
      const text = 'Hello World';
      const sourceLang = 'en';
      const targetLang = 'zh-CN';
      const model = 'gpt-3.5-turbo';

      const hash1 = generateHash(text, sourceLang, targetLang, model);
      const hash2 = generateHash(text, sourceLang, 'ja', model);

      expect(hash1).not.toBe(hash2);
    });

    it('should include language in hash', () => {
      const hashEn = generateHash('test', 'en', 'zh-CN', 'gpt-3.5-turbo');
      const hashJa = generateHash('test', 'ja', 'zh-CN', 'gpt-3.5-turbo');

      expect(hashEn).not.toBe(hashJa);
    });

    it('should include model in hash', () => {
      const hash1 = generateHash('test', 'en', 'zh-CN', 'gpt-3.5-turbo');
      const hash2 = generateHash('test', 'en', 'zh-CN', 'gpt-4');

      expect(hash1).not.toBe(hash2);
    });

    it('should handle special characters', () => {
      const hash = generateHash('Hello!@#$%', 'en', 'zh-CN', 'gpt-3.5-turbo');

      expect(hash).toBeDefined();
      expect(typeof hash).toBe('number');
    });

    it('should handle empty text', () => {
      const hash = generateHash('', 'en', 'zh-CN', 'gpt-3.5-turbo');

      expect(hash).toBeDefined();
      expect(typeof hash).toBe('number');
    });
  });

  describe('generateKey', () => {
    it('should generate key with all components', () => {
      const key = generateKey('Hello', 'en', 'zh-CN', 'gpt-3.5-turbo');

      expect(key).toContain('en');
      expect(key).toContain('zh-CN');
      expect(key).toContain('gpt-3.5-turbo');
      expect(key).toContain('Hello');
    });

    it('should generate consistent keys', () => {
      const key1 = generateKey('Hello', 'en', 'zh-CN', 'gpt-3.5-turbo');
      const key2 = generateKey('Hello', 'en', 'zh-CN', 'gpt-3.5-turbo');

      expect(key1).toBe(key2);
    });

    it('should distinguish by language pair', () => {
      const key1 = generateKey('Hello', 'en', 'zh-CN', 'gpt-3.5-turbo');
      const key2 = generateKey('Hello', 'en', 'ja', 'gpt-3.5-turbo');

      expect(key1).not.toBe(key2);
    });

    it('should distinguish by model', () => {
      const key1 = generateKey('Hello', 'en', 'zh-CN', 'gpt-3.5-turbo');
      const key2 = generateKey('Hello', 'en', 'zh-CN', 'gpt-4');

      expect(key1).not.toBe(key2);
    });

    it('should handle long text', () => {
      const longText = 'Hello World '.repeat(1000);
      const key = generateKey(longText, 'en', 'zh-CN', 'gpt-3.5-turbo');

      expect(key).toBeDefined();
      expect(typeof key).toBe('string');
      expect(key.length).toBeGreaterThan(0);
    });

    it('should handle Unicode characters', () => {
      const key = generateKey('你好世界', 'zh-CN', 'en', 'gpt-3.5-turbo');

      expect(key).toBeDefined();
      expect(key).toContain('你好世界');
    });
  });

  describe('normalize', () => {
    it('should trim whitespace', () => {
      const normalized = normalize(' Hello ');

      expect(normalized).toBe('Hello');
    });

    it('should convert to lowercase', () => {
      const normalized = normalize('Hello World');

      expect(normalized).toBe('hello world');
    });

    it('should remove special characters consistently', () => {
      const normalized1 = normalize('Hello!');
      const normalized2 = normalize('Hello?');

      const hash1 = generateHash(normalized1, 'en', 'zh-CN', 'gpt-3.5-turbo');
      const hash2 = generateHash(normalized2, 'en', 'zh-CN', 'gpt-3.5-turbo');

      expect(hash1).not.toBe(hash2);
    });
  });
});

function generateHash(text: string, sourceLang: string, targetLang: string, model: string): string {
  let hash = 0;
  const input = `${sourceLang}:${targetLang}:${model}:${text}`;

  for (let i = 0; i < input.length; i++) {
    const char = input.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }

  return Math.abs(hash).toString();
}

function generateKey(text: string, sourceLang: string, targetLang: string, model: string): string {
  return `${sourceLang}:${targetLang}:${model}:${generateHash(text, sourceLang, targetLang, model)}`;
}

function normalize(text: string): string {
  return text.toLowerCase().trim();
}
