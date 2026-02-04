import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { SettingsStorage } from '../../../src/services/settings-storage';
import { PluginSettings } from '../../../src/types';

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

describe('SettingsStorage', () => {
  let storage: SettingsStorage;

  beforeEach(() => {
    vi.clearAllMocks();
    storage = new SettingsStorage();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe('load', () => {
    it('should load default settings when none stored', async () => {
      const settings = await storage.load();

      expect(settings.enabled).toBe(true);
      expect(settings.autoDetect).toBe(true);
      expect(settings.targetLanguage).toBe('zh-CN');
      expect(settings.openai.apiKey).toBe('');
      expect(settings.cacheEnabled).toBe(true);
      expect(settings.whitelist).toEqual([]);
      expect(settings.blacklist).toEqual([]);
    });

    it('should load stored settings', async () => {
      const browser = (global as any).browser;
      const storedSettings = {
        enabled: false,
        autoDetect: false,
        targetLanguage: 'ja',
        openai: {
          apiKey: 'test-key',
          baseUrl: 'https://api.test.com/v1',
          models: ['gpt-4'],
          maxConcurrency: 10,
          timeout: 15000
        },
        cacheEnabled: false,
        cacheMaxAge: 86400000,
        blacklist: ['example.com'],
        whitelist: ['test.com'],
        showTranslationBadge: false
      };

      browser.storage.local.get.mockResolvedValue({ settings: storedSettings });

      const settings = await storage.load();

      expect(settings.enabled).toBe(false);
      expect(settings.targetLanguage).toBe('ja');
      expect(settings.openai.apiKey).toBe('test-key');
    });

    it('should validate settings on load', async () => {
      const browser = (global as any).browser;
      const invalidSettings = {
        enabled: 'invalid' as any,
        autoDetect: 'invalid' as any,
        targetLanguage: 'invalid',
        openai: {
          apiKey: 'test-key',
          baseUrl: 'https://api.test.com/v1',
          models: 'invalid-model' as any,
          maxConcurrency: 'invalid' as any,
          timeout: 'invalid' as any
        },
        cacheEnabled: 'invalid' as any,
        cacheMaxAge: 'invalid' as any,
        blacklist: 'invalid' as any,
        whitelist: 'invalid' as any,
        showTranslationBadge: 'invalid' as any
      };

      browser.storage.local.get.mockResolvedValue({ settings: invalidSettings });

      const settings = await storage.load();

      expect(settings.enabled).toBe(true);
      expect(settings.targetLanguage).toBe('zh-CN');
      expect(settings.openai.models).toEqual(['gpt-3.5-turbo']);
    });
  });

  describe('save', () => {
    it('should save settings to storage', async () => {
      const browser = (global as any).browser;
      const settings: Partial<PluginSettings> = {
        enabled: false,
        targetLanguage: 'ja'
      };

      await storage.save(settings as PluginSettings);

      expect(browser.storage.local.set).toHaveBeenCalledWith({ settings: expect.any(Object) });
    });

    it('should validate settings before saving', async () => {
      const browser = (global as any).browser;
      const invalidSettings: Partial<PluginSettings> = {
        enabled: 'invalid' as any,
        targetLanguage: 'invalid'
      };

      await storage.save(invalidSettings as PluginSettings);

      const savedData = browser.storage.local.set.mock.calls[0][0].0];
      expect(savedData.settings.enabled).toBe(true);
      expect(savedData.settings.targetLanguage).toBe('zh-CN');
    });

    it('should handle save errors', async () => {
      const browser = (global as any).browser;
      browser.storage.local.set.mockRejectedValue(new Error('Storage error'));

      await expect(storage.save({} as PluginSettings)).rejects.toThrow('Storage error');
    });
  });

  describe('update', () => {
    it('should update settings', async () => {
      const browser = (global as any).browser;
      const updates: Partial<PluginSettings> = {
        enabled: false,
        targetLanguage: 'ja'
      };

      await storage.update(updates);

      expect(browser.storage.local.set).toHaveBeenCalledWith({ settings: expect.any(Object) });
    });

    it('should merge updates with existing settings', async () => {
      const browser = (global as any).browser;
      const existingSettings = {
        enabled: true,
        autoDetect: true,
        targetLanguage: 'zh-CN',
        openai: {
          apiKey: 'test-key',
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

      browser.storage.local.get.mockResolvedValue({ settings: existingSettings });

      const updates: Partial<PluginSettings> = {
        enabled: false,
        targetLanguage: 'ja'
      };

      await storage.update(updates);

      const savedData = browser.storage.local.set.mock.calls[0][0][0];
      expect(savedData.settings.enabled).toBe(false);
      expect(savedData.settings.autoDetect).toBe(true);
      expect(savedData.settings.targetLanguage).toBe('ja');
      expect(savedData.settings.openai.apiKey).toBe('test-key');
    });
  });

  describe('reset', () => {
    it('should reset to default settings', async () => {
      const browser = (global as any).browser;

      await storage.reset();

      const savedData = browser.storage.local.set.mock.calls[0][0][0];
      expect(savedData.settings.enabled).toBe(true);
      expect(savedData.settings.openai.apiKey).toBe('');
    });
  });

  describe('export', () => {
    it('should export settings', async () => {
      const browser = (global as any).browser;
      const currentSettings = {
        enabled: true,
        autoDetect: true,
        targetLanguage: 'zh-CN',
        openai: {
          apiKey: 'test-key',
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

      browser.storage.local.get.mockResolvedValue({ settings: currentSettings });

      const exported = await storage.export();

      expect(exported.version).toBe('1.0.0');
      expect(exported.settings).toEqual(currentSettings);
      expect(exported.timestamp).toBeDefined();
    });

    it('should handle export errors', async () => {
      const browser = (global as any).browser;
      browser.storage.local.get.mockRejectedValue(new Error('Storage error'));

      await expect(storage.export()).rejects.toThrow('Storage error');
    });
  });

  describe('import', () => {
    it('should import settings', async () => {
      const browser = (global as any).browser;
      const importData = {
        version: '1.0.0',
        timestamp: Date.now(),
        settings: {
          enabled: false,
          autoDetect: true,
          targetLanguage: 'ja',
          openai: {
            apiKey: 'test-key',
            baseUrl: 'https://api.test.com/v1',
            models: ['gpt-4'],
            maxConcurrency: 10,
            timeout: 15000
          },
          cacheEnabled: false,
          cacheMaxAge: 86400000,
          blacklist: ['example.com'],
          whitelist: ['test.com'],
          showTranslationBadge: false
        }
      };

      await storage.import(importData);

      expect(browser.storage.local.set).toHaveBeenCalledWith({ settings: expect.any(Object) });
    });

    it('should validate imported settings', async () => {
      const browser = (global as any).browser;
      const invalidImport = {
        version: '1.0.0',
        timestamp: Date.now(),
        settings: {
          enabled: 'invalid' as any,
          autoDetect: 'invalid' as any,
          targetLanguage: 'invalid',
          openai: {
            apiKey: 'test-key',
            baseUrl: 'https://api.test.com/v1',
            models: ['gpt-4'],
            maxConcurrency: 10,
            timeout: 15000
          },
          cacheEnabled: 'invalid' as any,
          cacheMaxAge: 'invalid' as any,
          blacklist: 'invalid' as any,
          whitelist: 'invalid' as any,
          showTranslationBadge: 'invalid' as any
        }
      };

      await storage.import(invalidImport);

      const savedData = browser.storage.local.set.mock.calls[0][0][0];
      expect(savedData.settings.enabled).toBe(true);
      expect(savedData.settings.targetLanguage).toBe('zh-CN');
    });

    it('should warn on version mismatch', async () => {
      const browser = (global as any).browser;
      const importData = {
        version: '2.0.0',
        timestamp: Date.now(),
        settings: {
          enabled: false,
          autoDetect: true,
          targetLanguage: 'ja',
          openai: {
            apiKey: 'test-key',
            baseUrl: 'https://api.test.com/v1',
            models: ['gpt-4'],
            maxConcurrency: 10,
            timeout: 15000
          },
          cacheEnabled: false,
          cacheMaxAge: 86400000,
          blacklist: ['example.com'],
          whitelist: ['test.com'],
          showTranslationBadge: false
        }
      };

      await storage.import(importData);

      expect(browser.storage.local.set).toHaveBeenCalled();
    });
  });

  describe('getDefaultSettings', () => {
    it('should return default settings', () => {
      const defaults = storage.getDefaultSettings();

      expect(defaults.enabled).toBe(true);
      expect(defaults.autoDetect).toBe(true);
      expect(defaults.targetLanguage).toBe('zh-CN');
      expect(defaults.openai.apiKey).toBe('');
      expect(defaults.cacheEnabled).toBe(true);
    });
  });
});
