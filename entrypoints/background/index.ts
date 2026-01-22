import webext from 'webextension-polyfill';
import { defineBackground } from 'wxt/sandbox';
import { translationManager } from '../../src/services/translation-manager';

const browser = webext as any;

export default defineBackground(() => {
  if ((import.meta as any).env?.DEV) {
    console.log('[Background] Initializing...');
  }

  translationManager.init();

  browser.runtime.onMessage.addListener((message: any, sender: any, sendResponse: any) => {
    console.log('[Background] Received message:', message.type);

    if (message.type === 'getSettings') {
      sendResponse(translationManager.getSettings());
    } else if (message.type === 'updateSettings') {
      translationManager.updateSettings(message.settings).then(() => {
        sendResponse({ success: true });
      }).catch((error) => {
        console.error('[Background] Update settings failed:', error);
        sendResponse({ success: false, error: error.message });
      });
      return true;
    }

    return true;
  });

  if ((import.meta as any).env?.DEV) {
    console.log('[Background] Ready');
  }
});
