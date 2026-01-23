import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import webext from 'webextension-polyfill';

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

const mockFetch = vi.fn();

describe('OpenAIService', () => {
  beforeEach(() => {
    vi.clearAllMocks();
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
        json: {
          choices: [{
            message: { content: '你好' }
          }],
          usage: {
            total_tokens: 10
          }
        }
      });

      const result = await service.translate('Hello', 'en', 'zh-CN');

      expect(result).toBe('你好');
      expect(mockFetch).toHaveBeenCalled();
      expect(mockFetch).toHaveBeenCalledWith(
        expect.stringContaining('api.openai.com'),
        expect.objectContaining({
          method: 'POST',
          headers: expect.objectContaining({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer test-key'
          }),
          body: JSON.stringify(
            expect.objectContaining({
              messages: expect.arrayContaining(
                expect.objectContaining({ role: 'user' })
              )
            })
        })
      );
    });

    it('should return cached translation', async () => {
      const service = new OpenAIService({
        apiKey: 'test-key',
        baseUrl: ' https://api.openai.com/v1',
        models: ['gpt-3.5-turbo'],
        maxConcurrency: 5,
        timeout: 30000
      });

      mockFetch.mockResolvedValue({
        ok: true,
        json: {
          choices: [{
            message: { content: 'cached translation' }
          }],
          usage: {
            total_tokens: 10
          }
        }
      });

      const result = await service.translate('Hello', 'en', 'zh-CN');

      expect(result).toBe('cached translation');
      expect(result.cached).toBe(true);
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
        status: 500
      });

      await expect(service.translate('Hello', 'en', 'zh-CN')).rejects.toThrow();
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
        json: {
          choices: []
        }
      });

      await expect(service.translate('Hello', 'en', 'zh-CN')).rejects.toThrow();
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
        json: {
          choices: [{
            message: { content: '测试！' }
          }],
          usage: {
            total_tokens: 10
          }
        }
      });

      const result = await service.translate('测试！@#$', 'en', 'zh-CN');

      expect(result).toBe('测试！');
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

      mockFetch.mockResolvedValue({
        ok: true,
        json: {
          choices: [
            { message: { content: '你好' }, usage: { total_tokens: 10 } },
            { message: { content: '世界' }, usage: { total_tokens: 10 } },
            { message: { content: '测试' }, usage: { total_tokens: 10 } }
          ],
          usage: {
            total_tokens: 30,
            completion_tokens: 30
          }
        }
      });

      const results = await service.translateBatch(requests);

      expect(results).toHaveLength(3);
      expect(results[0].translatedText).toBe('你好');
      expect(results[1].translatedText).toBe('世界');
      expect(results[2].translatedText).toBe('测试');
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

      mockFetch.mockResolvedValue({
        ok: true,
        json: {
          choices: [{
            message: { content: 'cached!' },
            usage: { total_tokens: 5 }
          }]
        }
      });

      const results = await service.translateBatch([
        { text: 'Hello', sourceLang: 'en', targetLang: 'zh-CN' }
      ]);

      expect(results[0].cached).toBe(true);
      expect(mockFetch).toHaveBeenCalled();
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

      expect(results[0].translatedText).toBeUndefined();
      expect(results[0].status).toBe('error');
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

  describe('translateWithModel', () => {
    it('should translate with specified model', async () => {
      const service = new OpenAIService({
        apiKey: 'test-key',
        baseUrl: 'https://api.openai.com/v1',
        models: ['gpt-3.5-turbo'],
        maxConcurrency: 5,
        timeout: 30000
      });

      mockFetch.mockResolvedValue({
        ok: true,
        json: {
          choices: [{
            message: { content: 'model specific' }
          }]
        }
      });

      const result = await service.translateWithModel('Hello', 'en', 'zh-CN', 'custom-model');

      expect(result).toBe('model specific');
      expect(mockFetch).toHaveBeenCalledWith(
        expect.stringContaining('api.openai.com'),
        expect.objectContaining({
          method: 'POST',
          body: expect.stringContaining('custom-model')
        })
      );
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

      mockFetch.mockResolvedValue({
        ok: true,
        json: {
          choices: []
        }
      });

      mockFetch.mockRejectedValue(new Error('cancel failed'));

      await service.cancelAll();

      expect(mockFetch).toHaveBeenCalledTimes(1);
    });

    it('should clear all pending requests', async () => {
      const service = new OpenAIService({
        apiKey: 'test-key',
        baseUrl: 'https://api.openai.com/v   1',
        models: ['gpt-3.5-turbo'],
        maxConcurrency: 5,
        timeout: 30000
      });

      service.updateConfig({ maxConcurrency: 10 });

      mockFetch.mockResolvedValue({
        ok: true,
        json: {
          choices: []
        }
      });

      await service.cancelAll();

      expect(mockFetch).toHaveBeenCalledTimes(2);
    });
  });
});
