import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { translationCache } from '../../../src/services/cache';
import { CacheEntry } from '../../../src/types';

vi.stubGlobal('browser', {
  storage: {
    local: {}
  }
});

const CACHE_PREFIX = 'trans_cache_';
const CACHE_INDEX = 'trans_cache_index';

describe('TranslationCache', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    browser.storage.local.get = vi.fn().mockResolvedValue({});
    browser.storage.local.set = vi.fn().mockResolvedValue();
    browser.storage.local.remove = vi.fn().mockResolvedValue();
    browser.storage.local.clear = vi.fn().mockResolvedValue();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe('init', () => {
    it('should initialize cache index', async () => {
      browser.storage.local.get.mockResolvedValue({
        [CACHE_INDEX]: {}
      });

      await translationCache.init(10000);

      expect(browser.storage.local.get).toHaveBeenCalledWith(CACHE_INDEX);
      expect(browser.storage.local.get).toHaveBeenCalledTimes(1);
    });

    it('should set max age when provided', async () => {
      browser.storage.local.get.mockResolvedValue({
        [CACHE_INDEX]: {}
      });

      await translationCache.init(5000);

      browser.storage.local.get.mockResolvedValue({
        [CACHE_INDEX]: {}
      });

      expect(browser.storage.local.get).toHaveBeenCalledWith(CACHE_INDEX);
      expect(browser.storage.local.get).toHaveBeenCalledTimes(1);
    });

    it('should clean expired cache entries', async () => {
      const now = Date.now();
      const expiredEntry = {
        timestamp: now - 5000
      };

      browser.storage.local.get.mockResolvedValue({
        [CACHE_INDEX]: {
          'trans_cache_expired': expiredEntry
        }
      });

      await translationCache.init();

      expect(browser.storage.local.get).toHaveBeenCalledWith(CACHE_INDEX);
      expect(browser.storage.local.get).toHaveBeenCalledWith(CACHE_INDEX);
      expect(browser.storage.local.remove).toHaveBeenCalledWith('trans_cache_expired');
    });
  });

  describe('generateHash', () => {
    it('should generate consistent hash for same input', () => {
      const hash1 = (translationCache as any).generateHash('Hello World');
      const hash2 = (translationCache as any).generateHash('Hello World');

      expect(hash1).toBe(hash2);
    });

    it('should generate different hashes for different input', () => {
      const hash1 = (translationCache as any).generateHash('Hello');
      const hash2 = (translationCache as any).generateHash('World');

      expect(hash1).not.toBe(hash2);
    });

    it('should handle special characters', () => {
      const hash = (translationCache as any).generateHash('Hello!@#$%');

      expect(hash).toBeDefined();
      expect(typeof hash).toBe('number');
    });

    it('should handle empty text', () => {
      const hash = (translationCache as any).generateHash('');

      expect(hash).toBeDefined();
      expect(typeof hash).toBe('number');
    });

    it('should handle long text', () => {
      const longText = 'Hello World '.repeat(100);
      const hash = (translationCache as any).generateHash(longText);

      expect(hash).toBeDefined();
      expect(typeof hash).toBe('number');
    });
  });

  describe('generateKey', () => {
    it('should generate key with all components', () => {
      const key = (translationCache as any).generate('Hello', 'en', 'zh-CN', 'gpt-3.5-turbo');

      expect(key).toContain('en');
      expect(key).toContain('zh-CN');
      expect(key).toContain('gpt-3.5-turbo');
      expect(key).toContain('Hello');
    });

    it('should generate consistent keys', () => {
      const key1 = (translationCache as any).generate('Hello', 'en', 'zh-CN', 'gpt-3.5-turbo');
      const key2 = (translationCache as any).generate('Hello', 'en', 'zh-CN', 'gpt-3.5-turbo');

      expect(key1).toBe(key2);
    });
  });

  describe('get', () => {
    it('should return cache entry for valid cache', async () => {
      const now = Date.now();
      const validEntry: CacheEntry = {
        originalText: 'Hello',
        translatedText: '你好',
        sourceLang: 'en',
        targetLang: 'zh-CN',
        model: 'gpt-3.5-turbo',
        timestamp: now - 5000,
        hash: 'test-hash-123'
      };

      browser.storage.local.get.mockResolvedValue({
        [`trans_cache_${validEntry.hash}`]: validEntry
      });

      const result = await translationCache.get('Hello', 'en', 'zh-CN', 'gpt-3.5-turbo');

      expect(result).not.toBeNull();
      expect(result?.originalText).toBe('Hello');
      expect(result?.translatedText).toBe('你好');
    });

    it('should return null for expired cache', async () => {
      const now = Date.now();
      const expiredEntry: CacheEntry = {
        originalText: 'Hello',
        translatedText: '你好',
        sourceLang: 'en',
        targetLang: 'zh-CN',
        model: 'gpt-3.5-turbo',
        timestamp: now - 5000,
        hash: 'test-hash-123'
      };

      browser.storage.local.get.mockResolvedValue({
        [`trans_cache_${expiredEntry.hash}`]: expiredEntry
      });
      browser.storage.local.remove.mockResolvedValue();

      const result = await translationCache.get('Hello', 'en', 'zh-CN', 'gpt-3.5-turbo');

      expect(result).toBeNull();
    });

    it('should return null for non-existent cache', async () => {
      browser.storage.local.get.mockResolvedValue({});

      const result = await translationCache.get('Hello', 'en', 'zh-CN', 'gpt-3.5-turbo');

      expect(result).toBeNull();
    });
  });

  describe('set', () => {
    beforeEach(() => {
      browser.storage.local.get.mockResolvedValue({
        [CACHE_INDEX]: {}
      });
    });

    it('should write cache entry to storage', async () => {
      await translationCache.set('Hello', 'en', 'zh-CN', 'gpt-3.5-turbo', '你好');

      expect(browser.storage.local.set).toHaveBeenCalled();
      const storageCall = browser.storage.local.set.mock.calls[0][0];
      const [key, value] = JSON.parse(storageCall.args[0][0]);
      expect(key).toContain('trans_cache_');
      expect(JSON.parse(value)).toHaveProperty('originalText');
      expect(JSON.parse(value)).toHaveProperty('translatedText');
      expect(JSON.parse(value)).toHaveProperty('sourceLang');
      expect(JSON.parse(value)).toHaveProperty('targetLang');
      expect(JSON.parse(value)).toHaveProperty('model');
      expect(JSON.parse(value)).toHaveProperty('timestamp');
      expect(JSON.parse(value)).toHaveProperty('hash');
    });

    it('should update cache index', async () => {
      await translationCache.set('Hello', 'en', 'zh-CN', 'gpt-3.5-turbo', '你好');

      expect(browser.storage.local.get).toHaveBeenCalledWith(CACHE_INDEX);
      const indexCall = browser.storage.local.get.mock.calls.find(
        (call: any) => call[0] === CACHE_INDEX
      );
      expect(indexCall).toBeDefined();
    });

    it('should handle special characters', async () => {
      await translationCache.set('Hello!@#$', 'en', 'zh-CN', 'gpt-3.5-turbo', '测试！');

      expect(browser.storage.local.set).toHaveBeenCalled();
    });

    it('should handle long text', async () => {
      const longText = 'Hello World '.repeat(100);
      await translationCache.set(longText, 'en', 'zh-CN', 'gpt-3.5-turbo', '你好'.repeat(100));

      expect(browser.storage.local.set).toHaveBeenCalled();
    });
  });

  describe('delete', () => {
    beforeEach(() => {
      const now = Date.now();
      const expiredEntry: CacheEntry = {
        timestamp: now - 5000,
        hash: 'test-hash-123'
      };

      browser.storage.local.get.mockResolvedValue({
        [CACHE_INDEX]: {
          'trans_cache_test-hash-123': expiredEntry
        }
      });
      browser.storage.local.remove.mockResolvedValue();
    });

    it('should remove cache entry from storage', async () => {
      await translationCache.delete('test-hash-123');

      expect(browser.storage.local.remove).toHaveBeenCalledWith('trans_cache_test-hash-123');
      expect(browser.storage.local.get).toHaveBeenCalledWith(CACHE_INDEX);
      const removeCall = browser.storage.local.remove.mock.calls.find(
        (call: any) => call[0] === 'trans_cache_test-hash-123'
      );
      expect(removeCall).toBeDefined();
    });

    it('should remove entry from index', async () => {
      await translationCache.delete('test-hash-123');

      expect(browser.storage.local.get).toHaveBeenCalledWith(CACHE_INDEX);
    });
  });

  describe('clear', () => {
    beforeEach(() => {
      const now = Date.now();
      const expiredEntry1: CacheEntry = {
        timestamp: now - 5000,
        hash: 'expired1'
      };
      const expiredEntry2: CacheEntry = {
        timestamp: now - 5000,
        hash: 'expired2'
      };

      browser.storage.local.get.mockResolvedValue({
        [CACHE_INDEX]: {
          'trans_cache_expired1': expiredEntry1,
          'trans_cache_expired2': expiredEntry2
        }
      });
      browser.storage.local.remove.mockResolvedValue();
    });

    it('should remove all cache entries', async () => {
      await translationCache.clear();

      expect(browser.storage.local.remove).toHaveBeenCalled();
      const removeCalls = browser.storage.local.remove.mock.calls.filter(
        (call: any) => call[0]?.startsWith('trans_cache_')
      );
      expect(removeCalls.length).toBe(2);
    });

    it('should clear cache index', async () => {
      await translationCache.clear();

      expect(browser.storage.local.get).toHaveBeenCalledWith(CACHE_INDEX);
      expect(browser.storage.local.set).toHaveBeenCalledWith(
        { [CACHE_INDEX]: {} },
        undefined
      );
    });
  });

  describe('getStats', () => {
    it('should return cache statistics', async () => {
      const now = Date.now();
      const entry1 = {
        originalText: 'Hello',
        translatedText: '你好',
        sourceLang: 'en',
        targetLang: 'zh-CN',
        model: 'gpt-3.5-turbo',
        timestamp: now - 1000,
        hash: 'test-hash-123'
      };
      const entry2 = {
        originalText: 'World',
        translatedText: '世界',
        sourceLang: 'en',
        targetLang: 'zh-CN',
        model: 'gpt-3.5-turbo',
        timestamp: now - 2000,
        hash: 'test-hash-456'
      };
      const entry3 = {
        originalText: 'Test',
        translatedText: '测试',
        sourceLang: 'en',
        targetLang: 'zh-CN',
        model: 'gpt-3.5-turbo',
        timestamp: now - 3000,
        hash: 'test-hash-789'
      };

      browser.storage.local.get.mockResolvedValue({
        [CACHE_INDEX]: {
          'test-hash-123': entry1,
          'test-hash-456': entry2,
          'test-hash-789': entry3
        }
      });

      await translationCache.init();
      const stats = await translationCache.getStats();

      expect(stats.size).toBe(3);
      expect(stats.oldestTimestamp).toBe(entry1.timestamp);
      expect(stats.newestTimestamp).toBe(entry3.timestamp);
    });

    it('should return zero stats for empty cache', async () => {
      browser.storage.local.get.mockResolvedValue({
        [CACHE_INDEX]: {}
      });

      await translationCache.init();
      const stats = await translationCache.getStats();

      expect(stats.size).toBe(0);
      expect(stats.oldestTimestamp).toBe(0);
      expect(stats.newestTimestamp).toBe(0);
    });
  });
});
