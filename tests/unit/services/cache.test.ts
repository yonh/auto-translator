import { describe, it, expect, vi, beforeEach } from 'vitest';
import { translationCache } from '../../../src/services/cache';

vi.mock('webextension-polyfill', () => ({
  default: {
    storage: {
      local: {
        get: vi.fn(),
        set: vi.fn(),
        remove: vi.fn(),
        clear: vi.fn()
      }
    }
  }
}));

import webext from 'webextension-polyfill';

const browser = webext as any;
const CACHE_INDEX = 'trans_cache_index';

describe('TranslationCache', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    browser.storage.local.get.mockResolvedValue({ [CACHE_INDEX]: {} });
    browser.storage.local.set.mockResolvedValue(undefined);
    browser.storage.local.remove.mockResolvedValue(undefined);
    browser.storage.local.clear.mockResolvedValue(undefined);
  });

  it('initializes cache index from storage', async () => {
    await translationCache.init();

    expect(browser.storage.local.get).toHaveBeenCalledWith(CACHE_INDEX);
  });

  it('stores cache entry with prefixed key', async () => {
    await translationCache.init();
    await translationCache.set('Hello', 'en', 'zh-CN', 'gpt-3.5-turbo', '你好');

    expect(browser.storage.local.set).toHaveBeenCalled();
    const calls = browser.storage.local.set.mock.calls;
    const dataCall = calls.find((c: any[]) => Object.keys(c[0])[0].startsWith('trans_cache_'));
    expect(dataCall).toBeDefined();
  });

  it('returns cached entry when exists and not expired', async () => {
    await translationCache.init();

    const hash = (translationCache as any).generateHash('Hello', 'en', 'zh-CN', 'gpt-3.5-turbo');
    const key = `trans_cache_${hash}`;
    const entry = {
      originalText: 'Hello',
      translatedText: '你好',
      sourceLang: 'en',
      targetLang: 'zh-CN',
      model: 'gpt-3.5-turbo',
      timestamp: Date.now(),
      hash
    };

    browser.storage.local.get.mockResolvedValueOnce({ [key]: entry });

    const result = await translationCache.get('Hello', 'en', 'zh-CN', 'gpt-3.5-turbo');
    expect(result?.translatedText).toBe('你好');
  });

  it('returns null and deletes expired cache entry', async () => {
    await translationCache.init(1000);

    const hash = (translationCache as any).generateHash('Hello', 'en', 'zh-CN', 'gpt-3.5-turbo');
    const key = `trans_cache_${hash}`;
    const entry = {
      originalText: 'Hello',
      translatedText: '你好',
      sourceLang: 'en',
      targetLang: 'zh-CN',
      model: 'gpt-3.5-turbo',
      timestamp: Date.now() - 5000,
      hash
    };

    browser.storage.local.get.mockResolvedValueOnce({ [key]: entry });

    const result = await translationCache.get('Hello', 'en', 'zh-CN', 'gpt-3.5-turbo');
    expect(result).toBeNull();
    expect(browser.storage.local.remove).toHaveBeenCalledWith(key);
  });

  it('clears all indexed cache entries', async () => {
    browser.storage.local.get.mockResolvedValueOnce({
      [CACHE_INDEX]: {
        h1: Date.now(),
        h2: Date.now()
      }
    });
    await translationCache.init();

    await translationCache.clear();

    expect(browser.storage.local.remove).toHaveBeenCalledWith([
      'trans_cache_h1',
      'trans_cache_h2',
      CACHE_INDEX
    ]);
  });

  it('reports stats from index', async () => {
    const now = Date.now();
    browser.storage.local.get.mockResolvedValueOnce({
      [CACHE_INDEX]: {
        h1: now - 100,
        h2: now - 50
      }
    });

    await translationCache.init();
    const stats = await translationCache.getStats();

    expect(stats.size).toBe(2);
    expect(stats.oldestTimestamp).toBe(now - 100);
    expect(stats.newestTimestamp).toBe(now - 50);
  });
});
