import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { AutoTranslationTrigger } from '../../../src/core/auto-translation-trigger';
import { PageTranslationManager } from '../../../src/core/page-translation-manager';
import { PluginSettings } from '../../../src/types';

vi.stubGlobal('browser', {
  storage: {
    local: {}
  }
});

describe('AutoTranslationTrigger', () => {
  let trigger: AutoTranslationTrigger;
  let mockPageManager: PageTranslationManager;
  let mockSettings: PluginSettings;

  beforeEach(() => {
    vi.clearAllMocks();

    mockPageManager = {
      translateNode: vi.fn().mockResolvedValue(),
      translatePage: vi.fn().mockResolvedValue(),
      getStatus: vi.fn().mockReturnValue('idle'),
      getProgress: vi.fn().mockReturnValue({ current: 0, total: 0, percentage: 0 })
    } as any;

    mockSettings = {
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
      cacheEnabled: false,
      cacheMaxAge: 7 * 24 * 60 * 60 * 1000,
      blacklist: [],
      whitelist: [],
      showTranslationBadge: false
    };

    trigger = new AutoTranslationTrigger();
  });

  afterEach(() => {
    trigger.disable();
  });

  describe('constructor', () => {
    it('should initialize with default values', () => {
      expect(trigger.isEnabledTrigger()).toBe(false);
    });
  });

  describe('enable', () => {
    it('should enable trigger with page manager', () => {
      trigger.enable(mockPageManager, mockSettings);

      expect(trigger.isEnabledTrigger()).toBe(true);
    });
  });

  describe('disable', () => {
    it('should disable trigger', () => {
      trigger.enable(mockPageManager, mockSettings);
      trigger.disable();

      expect(trigger.isEnabledTrigger()).toBe(false);
    });
  });

  describe('pause', () => {
    it('should pause trigger', () => {
      trigger.enable(mockPageManager, mockSettings);
      trigger.pause();

      expect(trigger.isEnabledTrigger()).toBe(true);
    });
  });

  describe('resume', () => {
    it('should resume trigger', () => {
      trigger.enable(mockPageManager, mockSettings);
      trigger.pause();
      trigger.resume();

      expect(trigger.isEnabledTrigger()).toBe(true);
    });
  });

  describe('setMinInterval', () => {
    it('should update min interval', () => {
      trigger.setMinInterval(1000);
      trigger.enable(mockPageManager, mockSettings);

      expect(trigger.isEnabledTrigger()).toBe(true);
    });
  });

  describe('updateSettings', () => {
    it('should enable when auto detect and enabled', () => {
      trigger.updateSettings(mockSettings);

      expect(trigger.isEnabledTrigger()).toBe(true);
    });

    it('should disable when auto detect is false', () => {
      const disabledSettings = { ...mockSettings, autoDetect: false };
      trigger.updateSettings(disabledSettings);

      expect(trigger.isEnabledTrigger()).toBe(false);
    });

    it('should disable when plugin is disabled', () => {
      const disabledSettings = { ...mockSettings, enabled: false };
      trigger.updateSettings(disabledSettings);

      expect(trigger.isEnabledTrigger()).toBe(false);
    });
  });
});
