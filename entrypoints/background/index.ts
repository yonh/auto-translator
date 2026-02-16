import webext from 'webextension-polyfill';
import { defineBackground } from 'wxt/sandbox';
import { PluginSettings } from '@/types';

const DEFAULT_SETTINGS: PluginSettings = {
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
  cacheMaxAge: 7 * 24 * 60 * 60 * 1000,
  blacklist: [],
  whitelist: [],
  debugLogging: false
};

async function initializeDefaultSettings(): Promise<void> {
  try {
    const data = await webext.storage.local.get('settings');

    if (!data || !data.settings) {
      await webext.storage.local.set({ settings: DEFAULT_SETTINGS });
      console.log('[Background] Initialized default settings');
    }
  } catch (error) {
    console.error('[Background] Failed to initialize settings:', error);
  }
}

async function getSettings(): Promise<PluginSettings | null> {
  try {
    const data = await webext.storage.local.get('settings');

    if (!data || !data.settings) {
      return null;
    }

    return data.settings as PluginSettings;
  } catch (error) {
    console.error('[Background] Failed to get settings:', error);
    return null;
  }
}

async function updateSettings(newSettings: Partial<PluginSettings>): Promise<void> {
  try {
    const currentSettings = await getSettings();
    const mergedSettings = { ...currentSettings, ...newSettings };

    await webext.storage.local.set({ settings: mergedSettings });
    console.log('[Background] Settings updated');
  } catch (error) {
    console.error('[Background] Failed to update settings:', error);
    throw error;
  }
}

async function clearCache(): Promise<void> {
  try {
    const data = await webext.storage.local.get();
    const cacheKeys = Object.keys(data).filter(key => key.startsWith('cache:'));

    if (cacheKeys.length > 0) {
      for (const key of cacheKeys) {
        await webext.storage.local.remove(key);
      }
      console.log(`[Background] Cleared ${cacheKeys.length} cache entries`);
    }
  } catch (error) {
    console.error('[Background] Failed to clear cache:', error);
    throw error;
  }
}

async function clearExpiredCache(): Promise<void> {
  try {
    const data = await webext.storage.local.get();
    const currentTime = Date.now();
    const keysToRemove: string[] = [];

    for (const [key, value] of Object.entries(data)) {
      if (key.startsWith('cache:')) {
        const entry = value as any;
        if (entry.timestamp && (currentTime - entry.timestamp) > DEFAULT_SETTINGS.cacheMaxAge) {
          keysToRemove.push(key);
        }
      }
    }

    if (keysToRemove.length > 0) {
      for (const key of keysToRemove) {
        await webext.storage.local.remove(key);
      }
      console.log(`[Background] Cleared ${keysToRemove.length} expired cache entries`);
    }
  } catch (error) {
    console.error('[Background] Failed to clear expired cache:', error);
  }
}

async function broadcastSettingsChange(): Promise<void> {
  try {
    const tabs = await webext.tabs.query({});

    const settings = await getSettings();

    for (const tab of tabs) {
      if (tab.id) {
        try {
          await webext.tabs.sendMessage(tab.id, {
            type: 'SETTINGS_CHANGED',
            data: { settings }
          });
        } catch (error) {
          console.warn(`[Background] Failed to send settings to tab ${tab.id}:`, error);
        }
      }
    }
  } catch (error) {
    console.error('[Background] Failed to broadcast settings:', error);
  }
}

async function sendMessageToTab(tabId: number, message: any): Promise<any> {
  try {
    return await webext.tabs.sendMessage(tabId, message);
  } catch (error) {
    console.error(`[Background] Failed to send message to tab ${tabId}:`, error);
    throw error;
  }
}

export default defineBackground(() => {
  console.log('[Background] Initializing...');

  webext.runtime.onInstalled.addListener(async (details) => {
    console.log('[Background] Installed:', details.reason);

    if (details.reason === 'install') {
      await initializeDefaultSettings();
      await clearExpiredCache();
    } else if (details.reason === 'update') {
      await clearExpiredCache();
    }
  });

  webext.storage.onChanged.addListener(async (changes, areaName) => {
    if (areaName === 'local' && changes.settings) {
      console.log('[Background] Settings changed');
      await broadcastSettingsChange();
    }
  });

  webext.runtime.onMessage.addListener(async (message: any, sender: any) => {
    console.log('[Background] Received message:', message.type);

    try {
      switch (message.type) {
        case 'GET_SETTINGS': {
          const settings = await getSettings();
          return { success: true, data: settings };
        }

        case 'UPDATE_SETTINGS': {
          await updateSettings(message.data);
          return { success: true };
        }

        case 'CLEAR_CACHE': {
          await clearCache();
          return { success: true };
        }

        case 'SEND_MESSAGE_TO_TAB': {
          const { tabId, message: tabMessage } = message.data;
          await sendMessageToTab(tabId, tabMessage);
          return { success: true };
        }

        default:
          return {
            success: false,
            error: `Unknown message type: ${message.type}`
          };
      }
    } catch (error) {
      console.error('[Background] Error handling message:', error);
      return {
        success: false,
        error: (error as Error).message
      };
    }
  });

  console.log('[Background] Ready');
});
