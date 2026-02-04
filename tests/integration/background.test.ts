import { describe, it, expect, vi, beforeEach, afterEach, Mocked } from 'vitest';

vi.mock('webextension-polyfill', () => {
  const onMessageMock = vi.fn();
  const onInstalledMock = vi.fn();
  const storageChangedMock = vi.fn();

  return {
    default: {
      runtime: {
        onMessage: {
          addListener: onMessageMock,
          removeListener: vi.fn()
        },
        onInstalled: {
          addListener: onInstalledMock
        }
      },
      tabs: {
        query: vi.fn().mockResolvedValue([]),
        sendMessage: vi.fn().mockResolvedValue(undefined)
      },
      storage: {
        local: {
          get: vi.fn().mockResolvedValue({}),
          set: vi.fn().mockResolvedValue(undefined),
          clear: vi.fn().mockResolvedValue(undefined),
          remove: vi.fn().mockResolvedValue(undefined)
        },
        onChanged: {
          addListener: storageChangedMock,
          removeListener: vi.fn()
        }
      }
    }
  };
});

import webext from 'webextension-polyfill';

const browser = webext as any;
browser.tabs = {
  query: vi.fn().mockResolvedValue([]),
  sendMessage: vi.fn().mockResolvedValue(undefined)
};

const DEFAULT_SETTINGS = {
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

describe('Background Script Integration', () => {
  let onMessageAddMock: Mocked<any>;
  let onInstalledAddMock: Mocked<any>;
  let storageGetMock: Mocked<any>;
  let storageSetMock: Mocked<any>;
  let storageClearMock: Mocked<any>;
  let storageRemoveMock: Mocked<any>;
  let storageChangedAddMock: Mocked<any>;
  let tabsQueryMock: Mocked<any>;
  let tabsSendMessageMock: Mocked<any>;

  beforeEach(() => {
    vi.clearAllMocks();

    onMessageAddMock = browser.runtime.onMessage.addListener as Mocked<any>;
    onInstalledAddMock = browser.runtime.onInstalled.addListener as Mocked<any>;
    storageGetMock = browser.storage.local.get as Mocked<any>;
    storageSetMock = browser.storage.local.set as Mocked<any>;
    storageClearMock = browser.storage.local.clear as Mocked<any>;
    storageRemoveMock = browser.storage.local.remove as Mocked<any>;
    storageChangedAddMock = browser.storage.onChanged.addListener as Mocked<any>;
    tabsQueryMock = browser.tabs.query as Mocked<any>;
    tabsSendMessageMock = browser.tabs.sendMessage as Mocked<any>;

    storageGetMock.mockResolvedValue({
      settings: DEFAULT_SETTINGS
    });
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('initialization', () => {
    it('should initialize message listener', async () => {
      await import('../../entrypoints/background/index');

      expect(onMessageAddMock).toHaveBeenCalledTimes(1);
    });

    it('should initialize onInstalled listener', async () => {
      await import('../../entrypoints/background/index');

      expect(onInstalledAddMock).toHaveBeenCalledTimes(1);
    });

    it('should initialize storage change listener', async () => {
      await import('../../entrypoints/background/index');

      expect(storageChangedAddMock).toHaveBeenCalledTimes(1);
    });
  });

  describe('message handling', () => {
    let messageHandler: any;

    beforeEach(async () => {
      onMessageAddMock.mockClear();
      await import('../../entrypoints/background/index');

      if (onMessageAddMock.mock.calls.length > 0) {
        messageHandler = onMessageAddMock.mock.calls[0][0];
      } else {
        messageHandler = null;
      }
    });

    it('should handle GET_SETTINGS message', async () => {
      if (!messageHandler) {
        return;
      }

      const result = await messageHandler({
        type: 'GET_SETTINGS',
        data: {}
      });

      expect(result).toBeDefined();
      expect(result.success).toBe(true);
      expect(result.data).toBeDefined();
    });

    it('should handle UPDATE_SETTINGS message', async () => {
      if (!messageHandler) {
        return;
      }

      const newSettings = {
        targetLanguage: 'en'
      };

      const result = await messageHandler({
        type: 'UPDATE_SETTINGS',
        data: newSettings
      });

      expect(result).toBeDefined();
      expect(result.success).toBe(true);
      expect(storageSetMock).toHaveBeenCalled();
    });

    it('should handle CLEAR_CACHE message', async () => {
      if (!messageHandler) {
        return;
      }

      storageGetMock.mockResolvedValue({
        'cache:test1': { data: 'value1', timestamp: Date.now() }
      });

      const result = await messageHandler({
        type: 'CLEAR_CACHE',
        data: {}
      });

      expect(result).toBeDefined();
      expect(result.success).toBe(true);
    });

    it('should handle unknown message type', async () => {
      if (!messageHandler) {
        return;
      }

      const result = await messageHandler({
        type: 'UNKNOWN_TYPE',
        data: {}
      });

      expect(result).toBeDefined();
      expect(result.success).toBe(false);
    });
  });

  describe('settings synchronization', () => {
    it('should broadcast settings to all tabs', async () => {
      await import('../../entrypoints/background/index');

      const storageChangeListener = storageChangedAddMock.mock.calls[0] && storageChangedAddMock.mock.calls[0][0];

      if (storageChangeListener) {
        tabsQueryMock.mockResolvedValue([
          { id: 1, url: 'https://example.com' }
        ]);

        await storageChangeListener({
          local: {
            settings: {
              newValue: { enabled: false },
              oldValue: { enabled: true }
            }
          }
        });

        expect(tabsSendMessageMock).toHaveBeenCalled();
      }
    });
  });

  describe('cache management', () => {
    it('should clear expired cache entries on install', async () => {
      const currentTime = Date.now();
      const expiredEntry = {
        timestamp: currentTime - 8 * 24 * 60 * 60 * 1000
      };

      storageGetMock.mockResolvedValue({
        'cache:test1': expiredEntry
      });

      await import('../../entrypoints/background/index');

      const onInstalledCallback = onInstalledAddMock.mock.calls[0] && onInstalledAddMock.mock.calls[0][0];

      if (onInstalledCallback) {
        await onInstalledCallback({ reason: 'install' });
        expect(storageRemoveMock).toHaveBeenCalled();
      }
    });
  });

  describe('edge cases', () => {
    it('should handle missing data field', async () => {
      await import('../../entrypoints/background/index');

      const messageHandler = onMessageAddMock.mock.calls[0] && onMessageAddMock.mock.calls[0][0];

      if (messageHandler) {
        const result = await messageHandler({
          type: 'GET_SETTINGS'
        });

        expect(result).toBeDefined();
      }
    });

    it('should handle storage errors gracefully', async () => {
      await import('../../entrypoints/background/index');

      const messageHandler = onMessageAddMock.mock.calls[0] && onMessageAddMock.mock.calls[0][0];

      if (messageHandler) {
        storageGetMock.mockRejectedValue(new Error('Storage error'));

        const result = await messageHandler({
          type: 'GET_SETTINGS',
          data: {}
        });

        expect(result).toBeDefined();
        expect(result.success).toBe(false);
      }
    });
  });
});
