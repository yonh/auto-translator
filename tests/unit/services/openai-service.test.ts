import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { OpenAIService } from '../../../src/services/openai';
import { translationCache } from '../../../src/services/cache';

vi.stubGlobal('browser', {
  storage: {
    local: {
      get: vi.fn().mockResolvedValue({}),
      set: vi.fn().mockResolvedValue(),
      remove: vi.fn().mockResolvedValue(),
      clear: vi.fn().mockResolvedValue()
    }
  }
});

global.fetch = vi.fn();

const mockFetch = global.fetch as any;

describe('OpenAIService', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.spyOn(translationCache, 'get').mockResolvedValue(null);
    vi.spyOn(translationCache, 'set').mockResolvedValue();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe('constructor', () => {
    it('should initialize with default config', () => {
      const service = new OpenAIService({
        apiKey: 'test-key',
        baseUrl: 'https://api.openai.com/v1',
        models: ['gpt-3.5-turbo'],
        maxConcurrency: 5,
        timeout: 30000
      });

      expect(service).toBeDefined();
      expect(service['config']).toBeDefined();
    });

    it('should initialize with custom config', () => {
      const config = {
        apiKey: 'custom-key',
        baseUrl: 'https://custom.api.com/v1',
        models: ['custom-model'],
        maxConcurrency: 10,
        timeout: 15000
      };

      const service = new OpenAIService(config);

      expect(service['config']).toEqual(config);
      expect(service['config']).toEqual(expect.objectContaining(config));
    });
  });

  describe('translate', () => {
    it('should translate text successfully', async () => {
      const service = new OpenAIService({
        apiKey: 'test-key',
        baseUrl: 'https://api.openai.com/v1',
        models: ['gpt-3.5-turbo'],
        maxConcurrency: 5,
        timeout: 30000
      });

      mockFetch.mockResolvedValue({
        ok: true,
        json: async () => ({
          choices: [{
            message: { content: '你好' }
          }],
          usage: {
            total_tokens: 10
          }
        })
      });

      const result = await service.translate({
        text: 'Hello',
        sourceLang: 'en',
        targetLang: 'zh-CN'
      });

      expect(result.translatedText).toBe('你好');
      expect(mockFetch).toHaveBeenCalled();
      expect(mockFetch).toHaveBeenCalledWith(
        expect.stringContaining('api.openai.com'),
        expect.objectContaining({
          method: 'POST',
          headers: expect.objectContaining({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer test-key'
          }),
          body: expect.stringContaining('user')
        })
      );
    });

    it('should return cached translation', async () => {
      const service = new OpenAIService({
        apiKey: 'test-key',
        baseUrl: 'https://api.openai.com/v1',
        models: ['gpt-3.5-turbo'],
        maxConcurrency: 5,
        timeout: 30000
      });

      vi.spyOn(translationCache, 'get').mockResolvedValue({
        translatedText: 'cached translation',
        model: 'gpt-3.5-turbo',
        timestamp: Date.now(),
        hash: 'test-hash',
        originalText: 'Hello',
        sourceLang: 'en',
        targetLang: 'zh-CN'
      });

      const result = await service.translate({
        text: 'Hello',
        sourceLang: 'en',
        targetLang: 'zh-CN'
      });

      expect(result.translatedText).toBe('cached translation');
      expect(result.cached).toBe(true);
      expect(mockFetch).not.toHaveBeenCalled();
    });

    it('should throw error on API failure', async () => {
      const service = new OpenAIService({
        apiKey: 'test-key',
        baseUrl: 'https://api.openai.com/v1',
        models: ['gpt-3.5-turbo'],
        maxConcurrency: 5,
        timeout: 30000
      });

      mockFetch.mockResolvedValue({
        ok: false,
        status: 500,
        text: async () => 'Internal Server Error'
      });

      await expect(
        service.translate({
          text: 'Hello',
          sourceLang: 'en',
          targetLang: 'zh-CN'
        })
      ).rejects.toThrow();
    });

    it('should throw error on invalid response', async () => {
      const service = new OpenAIService({
        apiKey: 'test-key',
        baseUrl: 'https://api.openai.com/v1',
        models: ['gpt-3.5-turbo'],
        maxConcurrency: 5,
        timeout: 30000
      });

      mockFetch.mockResolvedValue({
        ok: true,
        json: async () => ({
          choices: []
        })
      });

      await expect(
        service.translate({
          text: 'Hello',
          sourceLang: 'en',
          targetLang: 'zh-CN'
        })
      ).rejects.toThrow();
    });

    it('should handle special characters', async () => {
      const service = new OpenAIService({
        apiKey: 'test-key',
        baseUrl: 'https://api.openai.com/v1',
        models: ['gpt-3.5-turbo'],
        maxConcurrency: 5,
        timeout: 30000
      });

      mockFetch.mockResolvedValue({
        ok: true,
        json: async () => ({
          choices: [{
            message: { content: '测试！' }
          }],
          usage: {
            total_tokens: 10
          }
        })
      });

      const result = await service.translate({
        text: '测试！@#$',
        sourceLang: 'en',
        targetLang: 'zh-CN'
      });

      expect(result.translatedText).toBe('测试！');
      expect(mockFetch).toHaveBeenCalled();
    });
  });

  describe('translateBatch', () => {
    it('should translate multiple texts', async () => {
      const service = new OpenAIService({
        apiKey: 'test-key',
        baseUrl: 'https://api.openai.com/v1',
        models: ['gpt-3.5-turbo'],
        maxConcurrency: 5,
        timeout: 30000
      });

      const requests = [
        { text: 'Hello', sourceLang: 'en', targetLang: 'zh-CN' },
        { text: 'World', sourceLang: 'en', targetLang: 'zh-CN' },
        { text: 'Test', sourceLang: 'en', targetLang: 'zh-CN' }
      ];

      mockFetch.mockImplementation(async () => ({
        ok: true,
        json: async () => ({
          choices: [{
            message: { content: 'Translated text' }
          }],
          usage: {
            total_tokens: 10
          }
        })
      }));

      const results = await service.translateBatch(requests);

      expect(results).toHaveLength(3);
      results.forEach(result => {
        expect(result.translatedText).toBe('Translated text');
      });
      expect(mockFetch).toHaveBeenCalled();
    });

    it('should handle cache hit', async () => {
      const service = new OpenAIService({
        apiKey: 'test-key',
        baseUrl: 'https://api.openai.com/v1',
        models: ['gpt-3.5-turbo'],
        maxConcurrency: 5,
        timeout: 30000
      });

      vi.spyOn(translationCache, 'get').mockResolvedValue({
        translatedText: 'cached!',
        model: 'gpt-3.5-turbo',
        timestamp: Date.now(),
        hash: 'test-hash',
        originalText: 'Hello',
        sourceLang: 'en',
        targetLang: 'zh-CN'
      });

      const results = await service.translateBatch([
        { text: 'Hello', sourceLang: 'en', targetLang: 'zh-CN' }
      ]);

      expect(results[0].cached).toBe(true);
      expect(mockFetch).not.toHaveBeenCalled();
    });

    it('should handle API error gracefully', async () => {
      const service = new OpenAIService({
        apiKey: 'test-key',
        baseUrl: 'https://api.openai.com/v1',
        models: ['gpt-3.5-turbo'],
        maxConcurrency: 5,
        timeout: 30000
      });

      mockFetch.mockRejectedValue(new Error('API error'));

      const results = await service.translateBatch([
        { text: 'Hello', sourceLang: 'en', targetLang: 'zh-CN' }
      ]);

      expect(results).toHaveLength(1);
      expect(results[0].translatedText).toBe('Hello');
      expect(mockFetch).toHaveBeenCalled();
    });
  });

  describe('updateConfig', () => {
    it('should update configuration', () => {
      const service = new OpenAIService({
        apiKey: 'test-key',
        baseUrl: 'https://api.openai.com/v1',
        models: ['gpt-3.5-turbo'],
        maxConcurrency: 5,
        timeout: 30000
      });

      const newConfig = {
        apiKey: 'new-key',
        baseUrl: 'https://new-api.com/v1',
        models: ['new-model'],
        maxConcurrency: 10,
        timeout: 15000
      };

      service.updateConfig(newConfig);

      expect(service['config']).toEqual(newConfig);
    });
  });

  describe('cancelAll', () => {
    it('should cancel all pending requests', async () => {
      const service = new OpenAIService({
        apiKey: 'test-key',
        baseUrl: 'https://api.openai.com/v1',
        models: ['gpt-3.5-turbo'],
        maxConcurrency: 5,
        timeout: 30000
      });

      const abortSpy = vi.fn();

      service['activeRequests'].set('test-req-1', {
        abort: abortSpy
      } as any);

      service.cancelAll();

      expect(abortSpy).toHaveBeenCalled();
      expect(service['activeRequests'].size).toBe(0);
      expect(service['requestQueue']).toHaveLength(0);
    });
  });
});
