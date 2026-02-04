import { describe, it, expect, vi, beforeEach, afterEach, Mocked } from 'vitest';

vi.mock('webextension-polyfill', () => ({
  default: {
    runtime: {
      sendMessage: vi.fn().mockResolvedValue(undefined),
      onMessage: {
        addListener: vi.fn(),
        removeListener: vi.fn()
      }
    },
    storage: {
      local: {
        get: vi.fn().mockResolvedValue({}),
        set: vi.fn().mockResolvedValue(undefined)
      }
    }
  }
}));

vi.mock('../../src/core/page-translation-manager', () => ({
  PageTranslationManager: class {
    translatePage = vi.fn().mockResolvedValue(undefined);
    translateNode = vi.fn().mockResolvedValue(undefined);
    revertPage = vi.fn().mockResolvedValue(undefined);
    revertNode = vi.fn().mockResolvedValue(undefined);
    getStatus = vi.fn().mockReturnValue({ status: 'idle' });
    getProgress = vi.fn().mockReturnValue({ current: 0, total: 0, percentage: 0 });
    clearCache = vi.fn().mockResolvedValue(undefined);
  }
}));

import webext from 'webextension-polyfill';

describe('Content Script Integration', () => {
  let contentModule: any;
  let sendMessageMock: Mocked<any>;
  let onMessageAddMock: Mocked<any>;
  let storageGetMock: Mocked<any>;
  let storageSetMock: Mocked<any>;

  beforeEach(() => {
    vi.clearAllMocks();

    Object.defineProperty(document, 'readyState', {
      value: 'complete',
      writable: true,
      configurable: true
    });

    storageGetMock.mockResolvedValue({
      settings: {
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
        cacheMaxAge: 604800000,
        blacklist: [],
        whitelist: [],
        showTranslationBadge: true
      }
    });

    vi.resetModules();
  });

  beforeEach(async () => {
    sendMessageMock = webext.runtime.sendMessage as Mocked<any>;
    onMessageAddMock = webext.runtime.onMessage.addListener as Mocked<any>;
    storageGetMock = webext.storage.local.get as Mocked<any>;
    storageSetMock = webext.storage.local.set as Mocked<any>;

    contentModule = await import('../../entrypoints/content');
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('initialization', () => {
    it('should initialize when DOM is already ready', async () => {
      Object.defineProperty(document, 'readyState', {
        value: 'complete',
        writable: true
      });

      contentModule = await import('../../entrypoints/content');

      expect(onMessageAddMock).toHaveBeenCalledTimes(1);
      expect(storageGetMock).toHaveBeenCalledWith('settings');
    });

    it('should wait for DOMContentLoaded when DOM is loading', async () => {
      Object.defineProperty(document, 'readyState', {
        value: 'loading',
        writable: true
      });

      const domContentLoadedSpy = vi.spyOn(document, 'addEventListener');

      contentModule = await import('../../entrypoints/content');

      expect(domContentLoadedSpy).toHaveBeenCalledWith('DOMContentLoaded', expect.any(Function));

      domContentLoadedSpy.mockRestore();
    });

    it('should skip initialization when plugin is disabled', async () => {
      storageGetMock.mockResolvedValue({
        settings: {
          enabled: false,
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
          cacheMaxAge: 604800000,
          blacklist: [],
          whitelist: [],
          showTranslationBadge: true
        }
      });

      contentModule = await import('../../entrypoints/content');

      expect(onMessageAddMock).toHaveBeenCalledTimes(1);
    });

    it('should use default settings when storage is empty', async () => {
      storageGetMock.mockResolvedValue({});

      contentModule = await import('../../entrypoints/content');

      expect(onMessageAddMock).toHaveBeenCalled();
    });

    it('should handle storage errors gracefully', async () => {
      storageGetMock.mockRejectedValue(new Error('Storage error'));

      contentModule = await import('../../entrypoints/content');

      expect(onMessageAddMock).toHaveBeenCalled();
    });
  });

  describe('message handling', () => {
    let messageHandler: any;

    beforeEach(async () => {
      contentModule = await import('../../entrypoints/content');

      messageHandler = onMessageAddMock.mock.calls[0][0];
    });

    it('should handle TRANSLATE_PAGE message', async () => {
      const mockId = 'test-id-1';

      await messageHandler({
        type: 'TRANSLATE_PAGE',
        data: {},
        id: mockId
      });

      await new Promise(resolve => setTimeout(resolve, 10));

      expect(sendMessageMock).toHaveBeenCalledWith(
        expect.objectContaining({
          type: 'TRANSLATE_PAGE_RESPONSE',
          id: mockId,
          success: true
        })
      );
    });

    it('should handle TRANSLATE_NODE message', async () => {
      const mockId = 'test-id-2';
      const testElement = document.createElement('div');
      testElement.id = 'test-node-123';
      document.body.appendChild(testElement);

      await messageHandler({
        type: 'TRANSLATE_NODE',
        data: {},
        id: testElement.id
      });

      await new Promise(resolve => setTimeout(resolve, 10));

      expect(sendMessageMock).toHaveBeenCalledWith(
        expect.objectContaining({
          type: 'TRANSLATE_NODE_RESPONSE',
          id: testElement.id,
          success: true
        })
      );

      document.body.removeChild(testElement);
    });

    it('should handle TRANSLATE_NODE for non-existent element', async () => {
      const mockId = 'test-id-3';

      await messageHandler({
        type: 'TRANSLATE_NODE',
        data: {},
        id: 'non-existent-id'
      });

      await new Promise(resolve => setTimeout(resolve, 10));

      expect(sendMessageMock).not.toHaveBeenCalledWith(
        expect.objectContaining({
          type: 'TRANSLATE_NODE_RESPONSE',
          id: 'non-existent-id',
          success: true
        })
      );
    });

    it('should handle REVERT_PAGE message', async () => {
      const mockId = 'test-id-4';

      await messageHandler({
        type: 'REVERT_PAGE',
        data: {},
        id: mockId
      });

      await new Promise(resolve => setTimeout(resolve, 10));

      expect(sendMessageMock).toHaveBeenCalledWith(
        expect.objectContaining({
          type: 'REVERT_PAGE_RESPONSE',
          id: mockId,
          success: true
        })
      );
    });

    it('should handle REVERT_NODE message', async () => {
      const mockId = 'test-id-5';
      const testElement = document.createElement('div');
      testElement.id = 'test-node-456';
      document.body.appendChild(testElement);

      await messageHandler({
        type: 'REVERT_NODE',
        data: {},
        id: testElement.id
      });

      await new Promise(resolve => setTimeout(resolve, 10));

      expect(sendMessageMock).toHaveBeenCalledWith(
        expect.objectContaining({
          type: 'REVERT_NODE_RESPONSE',
          id: testElement.id,
          success: true
        })
      );

      document.body.removeChild(testElement);
    });

    it('should handle UPDATE_SETTINGS message', async () => {
      const mockId = 'test-id-6';
      const newSettings = {
        targetLanguage: 'en'
      };

      await messageHandler({
        type: 'UPDATE_SETTINGS',
        data: newSettings,
        id: mockId
      });

      await new Promise(resolve => setTimeout(resolve, 10));

      expect(storageSetMock).toHaveBeenCalledWith({
        settings: expect.objectContaining(newSettings)
      });
    });

    it('should handle GET_STATUS message', async () => {
      const mockId = 'test-id-7';

      await messageHandler({
        type: 'GET_STATUS',
        data: {},
        id: mockId
      });

      await new Promise(resolve => setTimeout(resolve, 10));

      expect(sendMessageMock).toHaveBeenCalledWith(
        expect.objectContaining({
          type: 'GET_STATUS_RESPONSE',
          id: mockId,
          success: true,
          data: expect.objectContaining({
            status: 'idle'
          })
        })
      );
    });

    it('should handle GET_PROGRESS message', async () => {
      const mockId = 'test-id-8';

      await messageHandler({
        type: 'GET_PROGRESS',
        data: {},
        id: mockId
      });

      await new Promise(resolve => setTimeout(resolve, 10));

      expect(sendMessageMock).toHaveBeenCalledWith(
        expect.objectContaining({
          type: 'GET_PROGRESS_RESPONSE',
          id: mockId,
          success: true,
          data: expect.objectContaining({
            progress: expect.any(Object)
          })
        })
      );
    });

    it('should handle CLEAR_CACHE message', async () => {
      const mockId = 'test-id-9';

      await messageHandler({
        type: 'CLEAR_CACHE',
        data: {},
        id: mockId
      });

      await new Promise(resolve => setTimeout(resolve, 10));

      expect(sendMessageMock).toHaveBeenCalledWith(
        expect.objectContaining({
          type: 'CLEAR_CACHE_RESPONSE',
          id: mockId,
          success: true,
          error: null
        })
      );
    });

    it('should handle unknown message type', async () => {
      const mockId = 'test-id-10';

      await messageHandler({
        type: 'UNKNOWN_TYPE',
        data: {},
        id: mockId
      });

      await new Promise(resolve => setTimeout(resolve, 10));

      expect(sendMessageMock).toHaveBeenCalledWith(
        expect.objectContaining({
          type: 'UNKNOWN_RESPONSE',
          id: mockId,
          success: false,
          error: expect.stringContaining('Unknown message type')
        })
      );
    });

    it('should handle translation errors gracefully', async () => {
      const mockId = 'test-id-11';

      storageGetMock.mockResolvedValue({
        settings: {
          enabled: false,
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
          cacheMaxAge: 604800000,
          blacklist: [],
          whitelist: [],
          showTranslationBadge: true
        }
      });

      vi.resetModules();
      contentModule = await import('../../entrypoints/content');
      sendMessageMock = webext.runtime.sendMessage as Mocked<any>;
      onMessageAddMock = webext.runtime.onMessage.addListener as Mocked<any>;
      storageGetMock = webext.storage.local.get as Mocked<any>;
      storageSetMock = webext.storage.local.set as Mocked<any>;
      messageHandler = onMessageAddMock.mock.calls[0][0];

      await messageHandler({
        type: 'TRANSLATE_PAGE',
        data: {},
        id: mockId
      });

      await new Promise(resolve => setTimeout(resolve, 10));

      expect(sendMessageMock).not.toHaveBeenCalledWith(
        expect.objectContaining({
          type: 'TRANSLATE_PAGE_RESPONSE',
          id: mockId,
          success: true
        })
      );
    });

    it('should handle sendMessage failures', async () => {
      sendMessageMock.mockRejectedValueOnce(new Error('Send failed'));

      const mockId = 'test-id-12';

      await messageHandler({
        type: 'TRANSLATE_PAGE',
        data: {},
        id: mockId
      });

      await new Promise(resolve => setTimeout(resolve, 20));

      expect(sendMessageMock).toHaveBeenCalled();
    });
  });

  describe('settings management', () => {
    beforeEach(async () => {
      contentModule = await import('../../entrypoints/content');
    });

    it('should load settings from storage', async () => {
      const testSettings = {
        enabled: true,
        autoDetect: false,
        targetLanguage: 'ja',
        openai: {
          apiKey: 'custom-key',
          baseUrl: 'https://custom.api.com',
          models: ['gpt-4'],
          maxConcurrency: 3,
          timeout: 60000
        },
        cacheEnabled: false,
        cacheMaxAge: 1209600000,
        blacklist: ['example.com'],
        whitelist: [],
        showTranslationBadge: false
      };

      storageGetMock.mockResolvedValueOnce({ settings: testSettings });

      vi.resetModules();
      await import('../../entrypoints/content');

      expect(storageGetMock).toHaveBeenCalledWith('settings');
    });

    it('should save settings to storage', async () => {
      const messageHandler = onMessageAddMock.mock.calls[0][0];
      const newSettings = {
        targetLanguage: 'fr',
        maxConcurrency: 10
      };

      await messageHandler({
        type: 'UPDATE_SETTINGS',
        data: newSettings,
        id: 'update-test'
      });

      await new Promise(resolve => setTimeout(resolve, 10));

      expect(storageSetMock).toHaveBeenCalled();
      const callArgs = storageSetMock.mock.calls[0][0];
      expect(callArgs.settings).toBeDefined();
    });
  });

  describe('edge cases', () => {
    it('should handle missing data field in message', async () => {
      contentModule = await import('../../entrypoints/content');
      const messageHandler = onMessageAddMock.mock.calls[0][0];

      await messageHandler({
        type: 'GET_STATUS',
        id: 'edge-1'
      });

      await new Promise(resolve => setTimeout(resolve, 10));
    });

    it('should handle missing id field in message', async () => {
      contentModule = await import('../../entrypoints/content');
      const messageHandler = onMessageAddMock.mock.calls[0][0];

      await messageHandler({
        type: 'GET_STATUS',
        data: {}
      });

      await new Promise(resolve => setTimeout(resolve, 10));
    });

    it('should handle concurrent message requests', async () => {
      contentModule = await import('../../entrypoints/content');
      const messageHandler = onMessageAddMock.mock.calls[0][0];

      const promises = [
        messageHandler({ type: 'GET_STATUS', data: {}, id: 'concurrent-1' }),
        messageHandler({ type: 'GET_PROGRESS', data: {}, id: 'concurrent-2' }),
        messageHandler({ type: 'GET_STATUS', data: {}, id: 'concurrent-3' })
      ];

      await Promise.all(promises);
      await new Promise(resolve => setTimeout(resolve, 20));

      expect(sendMessageMock).toHaveBeenCalled();
    });
  });
});
