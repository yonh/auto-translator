import webext from 'webextension-polyfill';
import { CacheEntry } from '../types';

const browser = webext as any;

const CACHE_PREFIX = 'trans_cache_';
const CACHE_INDEX = 'trans_cache_index';

export class TranslationCache {
  private cacheIndex: Map<string, number> = new Map();
  private maxAge: number = 7 * 24 * 60 * 60 * 1000; // 7 days default

  async init(maxAge?: number): Promise<void> {
    if (maxAge) {
      this.maxAge = maxAge;
    }

    const indexData = await browser.storage.local.get(CACHE_INDEX);
    this.cacheIndex = new Map(Object.entries(indexData[CACHE_INDEX] || {}));

    await this.cleanExpired();
  }

  private generateHash(text: string, sourceLang: string, targetLang: string, model: string): string {
    return `${sourceLang}:${targetLang}:${model}:${this.hashCode(text)}`;
  }

  private hashCode(str: string): number {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32bit integer
    }
    return Math.abs(hash);
  }

  async get(text: string, sourceLang: string, targetLang: string, model: string): Promise<CacheEntry | null> {
    const hash = this.generateHash(text, sourceLang, targetLang, model);
    const cacheKey = `${CACHE_PREFIX}${hash}`;

    const data = await browser.storage.local.get(cacheKey);
    const entry: CacheEntry = data[cacheKey];

    if (!entry) {
      return null;
    }

    const now = Date.now();
    if (now - entry.timestamp > this.maxAge) {
      await this.delete(hash);
      return null;
    }

    return entry;
  }

  async set(text: string, sourceLang: string, targetLang: string, model: string, translatedText: string): Promise<void> {
    const hash = this.generateHash(text, sourceLang, targetLang, model);
    const cacheKey = `${CACHE_PREFIX}${hash}`;

    const entry: CacheEntry = {
      originalText: text,
      translatedText,
      sourceLang,
      targetLang,
      model,
      timestamp: Date.now(),
      hash
    };

    await browser.storage.local.set({ [cacheKey]: entry });

    this.cacheIndex.set(hash, entry.timestamp);
    await this.saveIndex();

    await this.cleanOldEntries();
  }

  async delete(hash: string): Promise<void> {
    const cacheKey = `${CACHE_PREFIX}${hash}`;
    await browser.storage.local.remove(cacheKey);
    this.cacheIndex.delete(hash);
    await this.saveIndex();
  }

  async clear(): Promise<void> {
    const keys = Array.from(this.cacheIndex.keys());
    const cacheKeys = keys.map(k => `${CACHE_PREFIX}${k}`);

    await browser.storage.local.remove([...cacheKeys, CACHE_INDEX]);
    this.cacheIndex.clear();
  }

  private async saveIndex(): Promise<void> {
    const indexObj = Object.fromEntries(this.cacheIndex);
    await browser.storage.local.set({ [CACHE_INDEX]: indexObj });
  }

  private async cleanExpired(): Promise<void> {
    const now = Date.now();
    const expired: string[] = [];

    for (const [hash, timestamp] of this.cacheIndex.entries()) {
      if (now - timestamp > this.maxAge) {
        expired.push(hash);
      }
    }

    for (const hash of expired) {
      await this.delete(hash);
    }
  }

  private async cleanOldEntries(): Promise<void> {
    const maxEntries = 10000;
    if (this.cacheIndex.size <= maxEntries) {
      return;
    }

    const entries = Array.from(this.cacheIndex.entries())
      .sort((a, b) => a[1] - b[1]);

    const toRemove = entries.slice(0, entries.length - maxEntries);
    for (const [hash] of toRemove) {
      await this.delete(hash);
    }
  }

  async getStats(): Promise<{ size: number; oldestTimestamp: number; newestTimestamp: number }> {
    if (this.cacheIndex.size === 0) {
      return { size: 0, oldestTimestamp: 0, newestTimestamp: 0 };
    }

    const timestamps = Array.from(this.cacheIndex.values());
    return {
      size: this.cacheIndex.size,
      oldestTimestamp: Math.min(...timestamps),
      newestTimestamp: Math.max(...timestamps)
    };
  }
}

export const translationCache = new TranslationCache();
