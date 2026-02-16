import webext from 'webextension-polyfill';
import { PluginSettings } from '../types';
import { translationCache } from './cache';
import { updateOpenAIConfig } from './openai';

const browser = webext as any;

const DEFAULT_SETTINGS: PluginSettings = {
  enabled: true,
  autoDetect: true,
  showFloatingStatusControl: true,
  targetLanguage: 'zh-CN',
  openai: {
    apiKey: '',
    baseUrl: 'https://api.openai.com/v1',
    models: ['gpt-4o-mini'],
    maxConcurrency: 5,
    timeout: 30000,
    chunkSize: 0,
    batchMaxChars: 20000,
    batchMaxItems: 100,
    batchMaxTokens: 10000,
    batchRetryCount: 2
  },
  cacheEnabled: true,
  cacheMaxAge: 7 * 24 * 60 * 60 * 1000,
  blacklist: [],
  whitelist: []
};

class BackgroundTranslationManager {
  private settings: PluginSettings = DEFAULT_SETTINGS;

  async init(): Promise<void> {
    await this.loadSettings();

    if (this.settings.cacheEnabled) {
      await translationCache.init(this.settings.cacheMaxAge);
    }

    console.log('[BackgroundManager] Initialized');
  }

  private async loadSettings(): Promise<void> {
    const data = await browser.storage.local.get('settings');
    this.settings = {
      ...DEFAULT_SETTINGS,
      ...data.settings,
      openai: {
        ...DEFAULT_SETTINGS.openai,
        ...(data.settings?.openai || {})
      }
    };
  }

  private async saveSettings(): Promise<void> {
    await browser.storage.local.set({ settings: this.settings });
  }

  async updateSettings(updates: Partial<PluginSettings>): Promise<void> {
    this.settings = {
      ...this.settings,
      ...updates,
      openai: {
        ...this.settings.openai,
        ...(updates.openai || {})
      }
    };
    await this.saveSettings();

    if (updates.openai) {
      updateOpenAIConfig(updates.openai);
      console.log('[BackgroundManager] Settings updated:', updates.openai);
    }
  }

  getSettings(): PluginSettings {
    return { ...this.settings };
  }

  private isUrlAllowed(url: string): boolean {
    if (this.settings.whitelist.length > 0) {
      return this.settings.whitelist.some(pattern =>
        url.includes(pattern)
      );
    }

    if (this.settings.blacklist.length > 0) {
      return !this.settings.blacklist.some(pattern =>
        url.includes(pattern)
      );
    }

    return true;
  }
}

export const translationManager = new BackgroundTranslationManager();
