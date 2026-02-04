import webext from 'webextension-polyfill';
import { PluginSettings, SettingsExport } from '../types';

const browser = webext as any;

const DEFAULT_SETTINGS: PluginSettings = {
  enabled: true,
  autoDetect: true,
  targetLanguage: 'zh-CN',
  openai: {
    apiKey: '',
    baseUrl: 'https://api.openai.com/v1',
    models: ['gpt-3.5-turbo'],
    maxConcurrency: 5,
    timeout: 30000
  },
  cacheEnabled: true,
  cacheMaxAge: 7 * 24 * 60 * 60 * 1000,
  blacklist: [],
  whitelist: [],
  showTranslationBadge: true
};

export class SettingsStorage {
  private readonly STORAGE_KEY = 'settings';

  async load(): Promise<PluginSettings> {
    try {
      const data = await browser.storage.local.get(this.STORAGE_KEY);
      const storedSettings = data[this.STORAGE_KEY];

      if (!storedSettings) {
        return { ...DEFAULT_SETTINGS };
      }

      return this.validateSettings(storedSettings);
    } catch (error) {
      console.error('[SettingsStorage] Failed to load settings:', error);
      return { ...DEFAULT_SETTINGS };
    }
  }

  async save(settings: PluginSettings): Promise<void> {
    try {
      const validSettings = this.validateSettings(settings);
      await browser.storage.local.set({ [this.STORAGE_KEY]: validSettings });
    } catch (error) {
      console.error('[SettingsStorage] Failed to save settings:', error);
      throw error;
    }
  }

  async update(updates: Partial<PluginSettings>): Promise<void> {
    try {
      const currentSettings = await this.load();
      const newSettings = { ...currentSettings, ...updates };
      await this.save(newSettings);
    } catch (error) {
      console.error('[SettingsStorage] Failed to update settings:', error);
      throw error;
    }
  }

  async reset(): Promise<void> {
    try {
      await this.save({ ...DEFAULT_SETTINGS });
    } catch (error) {
      console.error('[SettingsStorage] Failed to reset settings:', error);
      throw error;
    }
  }

  async export(): Promise<SettingsExport> {
    try {
      const settings = await this.load();
      return {
        version: '1.0.0',
        timestamp: Date.now(),
        settings
      };
    } catch (error) {
      console.error('[SettingsStorage] Failed to export settings:', error);
      throw error;
    }
  }

  async import(data: SettingsExport): Promise<void> {
    try {
      const validSettings = this.validateSettings(data.settings);

      if (data.version !== '1.0.0') {
        console.warn('[SettingsStorage] Settings version mismatch:', data.version);
      }

      await this.save(validSettings);
    } catch (error) {
      console.error('[SettingsStorage] Failed to import settings:', error);
      throw error;
    }
  }

  private validateSettings(settings: any): PluginSettings {
    return {
      enabled: Boolean(settings.enabled),
      autoDetect: Boolean(settings.autoDetect),
      targetLanguage: settings.targetLanguage || 'zh-CN',
      openai: {
        apiKey: settings.openai?.apiKey || '',
        baseUrl: settings.openai?.baseUrl || 'https://api.openai.com/v1',
        models: Array.isArray(settings.openai?.models) ? settings.openai.models : DEFAULT_SETTINGS.openai.models,
        maxConcurrency: Math.max(1, Math.min(20, Number(settings.openai?.maxConcurrency) || DEFAULT_SETTINGS.openai.maxConcurrency)),
        timeout: Math.max(1000, Math.min(60000, Number(settings.openai?.timeout) || DEFAULT_SETTINGS.openai.timeout))
      },
      cacheEnabled: Boolean(settings.cacheEnabled),
      cacheMaxAge: Math.max(0, Number(settings.cacheMaxAge) || DEFAULT_SETTINGS.cacheMaxAge),
      blacklist: Array.isArray(settings.blacklist) ? settings.blacklist : [],
      whitelist: Array.isArray(settings.whitelist) ? settings.whitelist : [],
      showTranslationBadge: Boolean(settings.showTranslationBadge)
    };
  }

  getDefaultSettings(): PluginSettings {
    return { ...DEFAULT_SETTINGS };
  }
}

export const settingsStorage = new SettingsStorage();
