import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { PageTranslationManager } from '../../../src/core/page-translation-manager';
import { PluginSettings } from '../../../src/types';

vi.stubGlobal('browser', {
  storage: {
    local: {}
  }
});

describe('PageTranslationManager', () => {
  let manager: PageTranslationManager;
  let mockRoot: HTMLElement;
  let mockSettings: PluginSettings;

  beforeEach(() => {
    vi.clearAllMocks();
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({
        choices: [{ message: { content: '翻译' } }],
        usage: { total_tokens: 10 }
      })
    });

    mockRoot = document.createElement('div');
    mockRoot.innerHTML = '<p>Hello</p><p>World</p>';

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

    manager = new PageTranslationManager(mockSettings);
  });

  afterEach(() => {
    manager.cancel();
  });

  describe('constructor', () => {
    it('should initialize with default idle state', () => {
      expect(manager.getStatus()).toBe('idle');
    });

    it('should initialize with zero progress', () => {
      const progress = manager.getProgress();
      expect(progress.current).toBe(0);
      expect(progress.total).toBe(0);
      expect(progress.percentage).toBe(0);
    });
  });

  describe('translatePage', () => {
    it('should detect language when autoDetect is enabled', async () => {
      await manager.translatePage(mockRoot);

      expect(manager.getStatus()).toBe('completed');
    });

    it('should not translate when source equals target', async () => {
      const settings = { ...mockSettings, targetLanguage: 'en' };
      const zhManager = new PageTranslationManager(settings);
      const zhRoot = document.createElement('div');
      zhRoot.innerHTML = '<p>你好</p>';

      await zhManager.translatePage(zhRoot);

      expect(zhManager.getStatus()).toBe('idle');
      zhManager.cancel();
    });

    it('should set translating state during translation', async () => {
      const statusListener = vi.fn();
      manager.onStatusChange(statusListener);

      const promise = manager.translatePage(mockRoot);

      await new Promise(resolve => setTimeout(resolve, 10));

      expect(statusListener).toHaveBeenCalledWith('translating');

      await promise;
      statusListener.mockClear();
    });

    it('should update progress during translation', async () => {
      const progressListener = vi.fn();
      manager.onProgressChange(progressListener);

      await manager.translatePage(mockRoot);

      expect(progressListener).toHaveBeenCalled();
    });
  });

  describe('translateNode', () => {
    it('should translate single node', async () => {
      const node = document.createTextNode('Hello');

      await manager.translateNode(node);

      expect(manager.getStatus()).toBe('completed');
    });

    it('should not translate short text', async () => {
      const node = document.createTextNode('H');

      await manager.translateNode(node);

      expect(manager.getStatus()).toBe('idle');
    });

    it('should not translate empty text', async () => {
      const node = document.createTextNode('');

      await manager.translateNode(node);

      expect(manager.getStatus()).toBe('idle');
    });
  });

  describe('cancel', () => {
    it('should cancel ongoing translation', async () => {
      const promise = manager.translatePage(mockRoot);

      await new Promise(resolve => setTimeout(resolve, 10));
      manager.cancel();

      await promise;

      const status = manager.getStatus();
      expect(status).toBe('idle');
    });

    it('should reset progress on cancel', () => {
      manager.updateSettings(mockSettings);
      manager.cancel();

      const progress = manager.getProgress();
      expect(progress.current).toBe(0);
      expect(progress.total).toBe(0);
      expect(progress.percentage).toBe(0);
    });
  });

  describe('revertPage', () => {
    it('should revert all translations', async () => {
      await manager.translatePage(mockRoot);
      await manager.revertPage();

      expect(manager.getStatus()).toBe('idle');
    });
  });

  describe('getStatus', () => {
    it('should return current status', () => {
      manager['stateManager'].setState('translating');
      expect(manager.getStatus()).toBe('translating');
    });
  });

  describe('getProgress', () => {
    it('should return current progress', () => {
      manager['stateManager'].setProgress(5, 10);
      const progress = manager.getProgress();
      expect(progress.current).toBe(5);
      expect(progress.total).toBe(10);
      expect(progress.percentage).toBe(50);
    });
  });

  describe('updateSettings', () => {
    it('should update settings', () => {
      const newSettings = { ...mockSettings, targetLanguage: 'ja' };
      manager.updateSettings(newSettings);

      const currentSettings = manager['settings'];
      expect(currentSettings.targetLanguage).toBe('ja');
    });
  });

  describe('onStatusChange', () => {
    it('should subscribe to status changes', () => {
      const listener = vi.fn();
      const unsubscribe = manager.onStatusChange(listener);

      manager['stateManager'].setState('translating');

      expect(listener).toHaveBeenCalledWith('translating');

      unsubscribe();
    });

    it('should unsubscribe listener', () => {
      const listener = vi.fn();
      const unsubscribe = manager.onStatusChange(listener);

      unsubscribe();
      manager['stateManager'].setState('translating');

      expect(listener).not.toHaveBeenCalled();
    });
  });

  describe('onProgressChange', () => {
    it('should subscribe to progress changes', () => {
      const listener = vi.fn();
      const unsubscribe = manager.onProgressChange(listener);

      manager['stateManager'].setProgress(5, 10);

      expect(listener).toHaveBeenCalledWith({ current: 5, total: 10, percentage: 50 });

      unsubscribe();
    });

    it('should unsubscribe listener', () => {
      const listener = vi.fn();
      const unsubscribe = manager.onProgressChange(listener);

      unsubscribe();
      manager['stateManager'].setProgress(5, 10);

      expect(listener).not.toHaveBeenCalled();
    });
  });
});
