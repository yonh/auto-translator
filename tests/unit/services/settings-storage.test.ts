import { describe, it, expect, vi, beforeEach } from 'vitest';

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
import { SettingsStorage } from '../../../src/services/settings-storage';

const browser = webext as any;

describe('SettingsStorage', () => {
  let storage: SettingsStorage;

  beforeEach(() => {
    vi.clearAllMocks();
    storage = new SettingsStorage();
    browser.storage.local.get.mockResolvedValue({});
    browser.storage.local.set.mockResolvedValue(undefined);
  });

  it('loads defaults when storage is empty', async () => {
    const settings = await storage.load();

    expect(settings.enabled).toBe(true);
    expect(settings.showFloatingStatusControl).toBe(true);
    expect(settings.targetLanguage).toBe('zh-CN');
    expect(settings.openai.models).toEqual(['gpt-3.5-turbo']);
  });

  it('loads stored settings and validates shape', async () => {
    browser.storage.local.get.mockResolvedValueOnce({
      settings: {
        enabled: false,
        autoDetect: true,
        showFloatingStatusControl: false,
        targetLanguage: 'ja',
        openai: {
          apiKey: 'k',
          baseUrl: 'https://api.openai.com/v1',
          models: ['gpt-4'],
          maxConcurrency: 3,
          timeout: 5000
        },
        cacheEnabled: true,
        cacheMaxAge: 100,
        blacklist: ['a.com'],
        whitelist: [],
        debugLogging: true
      }
    });

    const settings = await storage.load();
      expect(settings.enabled).toBe(false);
      expect(settings.showFloatingStatusControl).toBe(false);
      expect(settings.targetLanguage).toBe('ja');
    expect(settings.openai.models).toEqual(['gpt-4']);
    expect(settings.debugLogging).toBe(true);
  });

  it('save persists validated settings', async () => {
    await storage.save({
      enabled: true,
      autoDetect: true,
      showFloatingStatusControl: true,
      targetLanguage: 'zh-CN',
      openai: {
        apiKey: '',
        baseUrl: 'https://api.openai.com/v1',
        models: ['gpt-3.5-turbo'],
        maxConcurrency: 5,
        timeout: 30000
      },
      cacheEnabled: true,
      cacheMaxAge: 1000,
      blacklist: [],
      whitelist: [],
      debugLogging: false
    });

    expect(browser.storage.local.set).toHaveBeenCalledWith({ settings: expect.any(Object) });
  });

  it('update merges into current settings', async () => {
    browser.storage.local.get.mockResolvedValueOnce({
      settings: {
        enabled: true,
        autoDetect: true,
        showFloatingStatusControl: true,
        targetLanguage: 'zh-CN',
        openai: {
          apiKey: '',
          baseUrl: 'https://api.openai.com/v1',
          models: ['gpt-3.5-turbo'],
          maxConcurrency: 5,
          timeout: 30000
        },
        cacheEnabled: true,
        cacheMaxAge: 1000,
        blacklist: [],
        whitelist: [],
        debugLogging: false
      }
    });

    await storage.update({ targetLanguage: 'ja' });

    const saved = browser.storage.local.set.mock.calls[0][0].settings;
    expect(saved.targetLanguage).toBe('ja');
    expect(saved.enabled).toBe(true);
  });

  it('export returns versioned payload', async () => {
    const data = await storage.export();
    expect(data.version).toBe('1.0.0');
    expect(data.settings).toBeDefined();
    expect(typeof data.timestamp).toBe('number');
  });

  it('import saves validated settings', async () => {
    await storage.import({
      version: '1.0.0',
      timestamp: Date.now(),
      settings: {
        enabled: true,
        autoDetect: true,
        showFloatingStatusControl: true,
        targetLanguage: 'fr',
        openai: {
          apiKey: '',
          baseUrl: 'https://api.openai.com/v1',
          models: ['gpt-4'],
          maxConcurrency: 2,
          timeout: 10000
        },
        cacheEnabled: true,
        cacheMaxAge: 500,
        blacklist: [],
        whitelist: [],
        debugLogging: false
      }
    });

    expect(browser.storage.local.set).toHaveBeenCalled();
  });

  it('getDefaultSettings returns baseline config', () => {
    const defaults = storage.getDefaultSettings();
    expect(defaults.enabled).toBe(true);
    expect(defaults.showFloatingStatusControl).toBe(true);
    expect(defaults.targetLanguage).toBe('zh-CN');
  });
});
