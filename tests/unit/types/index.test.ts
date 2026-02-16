import { describe, it, expect } from 'vitest';
import type {
  CacheEntry,
  OpenAIConfig,
  TranslationRequest,
  TranslationResponse,
  PluginSettings,
  LanguageDetectionResult,
  TextSegment,
  TranslationStatus
} from '../../src/types';

describe('Type Definitions', () => {
  describe('CacheEntry', () => {
    it('should accept valid cache entry', () => {
      const entry: CacheEntry = {
        originalText: 'Hello',
        translatedText: '你好',
        sourceLang: 'en',
        targetLang: 'zh-CN',
        model: 'gpt-3.5-turbo',
        timestamp: Date.now(),
        hash: 'test-hash-123'
      };

      expect(entry.originalText).toBe('Hello');
      expect(entry.translatedText).toBe('你好');
      expect(entry.sourceLang).toBe('en');
      expect(entry.targetLang).toBe('zh-CN');
      expect(entry.model).toBe('gpt-3.5-turbo');
      expect(entry.timestamp).toBeTypeOf('number');
      expect(entry.hash).toBe('test-hash-123');
    });
  });

  describe('OpenAIConfig', () => {
    it('should accept valid OpenAI config', () => {
      const config: OpenAIConfig = {
        apiKey: 'sk-test-123',
        baseUrl: 'https://api.openai.com/v1',
        models: ['gpt-3.5-turbo', 'gpt-4'],
        maxConcurrency: 5,
        timeout: 30000
      };

      expect(config.apiKey).toBe('sk-test-123');
      expect(config.baseUrl).toBe('https://api.openai.com/v1');
      expect(config.models).toEqual(['gpt-3.5-turbo', 'gpt-4']);
      expect(config.maxConcurrency).toBe(5);
      expect(config.timeout).toBe(30000);
    });
  });

  describe('TranslationRequest', () => {
    it('should accept valid translation request', () => {
      const request: TranslationRequest = {
        text: 'Hello World',
        sourceLang: 'en',
        targetLang: 'zh-CN'
      };

      expect(request.text).toBe('Hello World');
      expect(request.sourceLang).toBe('en');
      expect(request.targetLang).toBe('zh-CN');
      expect(request.model).toBeUndefined();
    });

    it('should accept translation request with model', () => {
      const request: TranslationRequest = {
        text: 'Hello World',
        sourceLang: 'en',
        targetLang: 'zh-CN',
        model: 'gpt-4'
      };

      expect(request.model).toBe('gpt-4');
    });
  });

  describe('TranslationResponse', () => {
    it('should accept cached translation response', () => {
      const response: TranslationResponse = {
        originalText: 'Hello',
        translatedText: '你好',
        sourceLang: 'en',
        targetLang: 'zh-CN',
        model: 'gpt-3.5-turbo',
        cached: true
      };

      expect(response.originalText).toBe('Hello');
      expect(response.translatedText).toBe('你好');
      expect(response.sourceLang).toBe('en');
      expect(response.targetLang).toBe('zh-CN');
      expect(response.model).toBe('gpt-3.5-turbo');
      expect(response.cached).toBe(true);
    });

    it('should accept fresh translation response', () => {
      const response: TranslationResponse = {
        originalText: 'Hello',
        translatedText: '你好',
        sourceLang: 'en',
        targetLang: 'zh-CN',
        model: 'gpt-4',
        cached: false
      };

      expect(response.cached).toBe(false);
    });
  });

  describe('PluginSettings', () => {
    it('should accept valid plugin settings', () => {
      const settings: PluginSettings = {
        enabled: true,
        autoDetect: true,
        showFloatingStatusControl: true,
        targetLanguage: 'zh-CN',
        openai: {
          apiKey: 'sk-test',
          baseUrl: 'https://api.openai.com/v1',
          models: ['gpt-3.5-turbo'],
          maxConcurrency: 5,
          timeout: 30000
        },
        cacheEnabled: true,
        cacheMaxAge: 7 * 24 * 60 * 60 * 1000,
        blacklist: [],
        whitelist: []
      };

      expect(settings.enabled).toBe(true);
      expect(settings.autoDetect).toBe(true);
      expect(settings.showFloatingStatusControl).toBe(true);
      expect(settings.targetLanguage).toBe('zh-CN');
      expect(settings.cacheEnabled).toBe(true);
      expect(settings.blacklist).toEqual([]);
      expect(settings.whitelist).toEqual([]);
    });
  });

  describe('LanguageDetectionResult', () => {
    it('should accept valid detection result', () => {
      const result: LanguageDetectionResult = {
        detected: 'zh-CN',
        confidence: 0.85
      };

      expect(result.detected).toBe('zh-CN');
      expect(result.confidence).toBeTypeOf('number');
      expect(result.confidence).toBeGreaterThanOrEqual(0);
      expect(result.confidence).toBeLessThanOrEqual(1);
    });

    it('should accept low confidence result', () => {
      const result: LanguageDetectionResult = {
        detected: 'en',
        confidence: 0.1
      };

      expect(result.confidence).toBe(0.1);
    });
  });

  describe('TextSegment', () => {
    it('should accept valid text segment', () => {
      const element = document.createElement('p');
      element.textContent = 'Hello World';

      const segment: TextSegment = {
        text: 'Hello World',
        element: element,
        xpath: '/html/body/p'
      };

      expect(segment.text).toBe('Hello World');
      expect(segment.element).toBe(element);
      expect(segment.xpath).toBe('/html/body/p');
    });
  });

  describe('TranslationStatus', () => {
    it('should accept all status values', () => {
      const statuses: TranslationStatus[] = [
        'idle',
        'detecting',
        'translating',
        'completed',
        'error'
      ];

      statuses.forEach(status => {
        expect(['idle', 'detecting', 'translating', 'completed', 'error']).toContain(status);
      });
    });

    it('should be string literal type', () => {
      const status: TranslationStatus = 'idle';
      expect(status).toBeTypeOf('string');
    });
  });

  describe('Type Safety', () => {
    it('should enforce required fields', () => {
      const createCacheEntry = (): CacheEntry => ({
        originalText: 'test',
        translatedText: '测试',
        sourceLang: 'en',
        targetLang: 'zh-CN',
        model: 'gpt-3.5-turbo',
        timestamp: Date.now(),
        hash: 'hash'
      });

      expect(() => createCacheEntry()).not.toThrow();
    });

    it('should allow optional fields to be omitted', () => {
      const request: TranslationRequest = {
        text: 'Hello',
        sourceLang: 'en',
        targetLang: 'zh-CN'
      };

      expect(request.model).toBeUndefined();
    });
  });
});
