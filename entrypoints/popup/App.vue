<template>
  <div class="popup-container">
    <header class="popup-header">
      <h1>自动翻译</h1>
      <div class="status-indicator" :class="statusClass">
        {{ statusText }}
      </div>
    </header>

    <div class="popup-content">
      <div class="toggle-section">
        <label class="toggle-label">
          <input
            type="checkbox"
            v-model="settings.enabled"
            @change="toggleEnabled"
          />
          <span class="toggle-slider"></span>
          <span>启用自动翻译</span>
        </label>
      </div>

      <div v-if="settings.enabled" class="settings-section">
        <div class="control-group">
          <label>目标语言</label>
          <select v-model="settings.targetLanguage" @change="saveSettings">
            <option
              v-for="lang in languages"
              :key="lang.code"
              :value="lang.code"
            >
              {{ lang.name }}
            </option>
          </select>
        </div>

        <div class="control-group">
          <label>
            <input
              type="checkbox"
              v-model="settings.autoDetect"
              @change="saveSettings"
            />
            自动检测语言
          </label>
        </div>

        <div class="button-group">
          <button
            v-if="status === 'idle'"
            class="translate-btn"
            @click="translateCurrentPage"
          >
            翻译当前页面
          </button>

          <button
            v-else-if="status === 'translating' || status === 'detecting'"
            class="translate-btn"
            disabled
          >
            {{ isTranslating ? '翻译中...' : '检测中...' }}
          </button>

          <div v-else-if="status === 'completed'" class="completed-actions">
            <button class="btn-success" @click="revertTranslation">
              撤销翻译
            </button>
            <button class="btn-secondary" @click="translateCurrentPage">
              重新翻译
            </button>
          </div>

          <button
            v-else-if="status === 'error'"
            class="btn-error"
            @click="translateCurrentPage"
          >
            重试
          </button>
        </div>
      </div>

      <div class="api-status" v-if="!hasApiKey">
        <p class="warning">⚠️ 请先配置 OpenAI API 密钥</p>
        <button class="btn-secondary" @click="openSettings">
          前往设置
        </button>
      </div>
    </div>

    <footer class="popup-footer">
      <button class="btn-link" @click="openSettings">设置</button>
      <button class="btn-link" @click="clearCache">清除缓存</button>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import webext from 'webextension-polyfill';

const browser = webext as any;

interface Settings {
  enabled: boolean;
  autoDetect: boolean;
  targetLanguage: string;
}

const languages = [
  { code: 'zh-CN', name: '简体中文' },
  { code: 'zh-TW', name: '繁體中文' },
  { code: 'en', name: 'English' },
  { code: 'ja', name: '日本語' },
  { code: 'ko', name: '한국어' },
  { code: 'fr', name: 'Français' },
  { code: 'de', name: 'Deutsch' },
  { code: 'es', name: 'Español' }
];

const settings = ref<Settings>({
  enabled: true,
  autoDetect: true,
  targetLanguage: 'zh-CN'
});

const status = ref<'idle' | 'detecting' | 'translating' | 'completed' | 'error'>('idle');
const hasApiKey = ref(false);

const isTranslating = computed(() => {
  return ['detecting', 'translating'].includes(status.value);
});

const statusText = computed(() => {
  const statusMap = {
    idle: '就绪',
    detecting: '检测中...',
    translating: '翻译中...',
    completed: '已完成',
    error: '错误'
  };
  return statusMap[status.value];
});

const statusClass = computed(() => {
  const classMap = {
    idle: 'status-idle',
    detecting: 'status-detecting',
    translating: 'status-translating',
    completed: 'status-completed',
    error: 'status-error'
  };
  return classMap[status.value];
});

onMounted(async () => {
  await loadSettings();
  await checkApiKey();
  await checkStatus();
  await checkCurrentTab();
});

async function checkCurrentTab() {
  try {
    const result = await browser.tabs.query({ active: true, currentWindow: true });
    
    if (result[0]) {
      const url = result[0].url;
      console.log('[Popup] Current tab URL:', url);

      const specialPages = [
        'chrome://extensions/',
        'chrome://newtab/',
        'about:blank',
        'edge://extensions/',
        'edge://newtab/',
        'moz-extension://'
      ];

      const isSpecialPage = specialPages.some(page => url?.startsWith(page));
      
      if (isSpecialPage) {
        console.warn('[Popup] Currently on special page, translation may not work');
      }
    }
  } catch (error) {
    console.error('[Popup] Failed to check current tab:', error);
  }
}

async function loadSettings() {
  try {
    const result = await browser.storage.local.get('settings');
    const savedSettings = result.settings;

    if (savedSettings) {
      settings.value = {
        enabled: savedSettings.enabled ?? true,
        autoDetect: savedSettings.autoDetect ?? true,
        targetLanguage: savedSettings.targetLanguage ?? 'zh-CN'
      };
      console.log('[Popup] Settings loaded from storage:', settings.value);
    }
  } catch (error) {
    console.error('[Popup] Failed to load settings from storage:', error);
  }
}

async function checkApiKey() {
  try {
    const result = await browser.storage.local.get('settings');
    const savedSettings = result.settings;
    const apiKey = savedSettings?.openai?.apiKey;
    console.log('[Popup] Checking API key:', !!apiKey, apiKey ? `${apiKey.substring(0, 8)}...` : 'none');
    hasApiKey.value = !!(apiKey && apiKey.length > 0);
  } catch (error) {
    console.error('[Popup] Failed to check API key:', error);
    hasApiKey.value = false;
  }
}

async function checkStatus() {
  const result = await browser.tabs.query({ active: true, currentWindow: true });
  if (result[0]?.id) {
    try {
      const response = await browser.tabs.sendMessage(result[0].id, {
        type: 'getStatus'
      });
      if (response?.status) {
        status.value = response.status;
      }
    } catch (error) {
      console.error('[Popup] Failed to check status:', error);
    }
  }
}

async function toggleEnabled() {
  await saveSettings();
}

async function saveSettings() {
  try {
    const result = await browser.storage.local.get('settings');
    const currentSettings = result.settings || {};

    const updatedSettings = {
      ...currentSettings,
      enabled: settings.value.enabled,
      autoDetect: settings.value.autoDetect,
      targetLanguage: settings.value.targetLanguage
    };

    await browser.storage.local.set({ settings: updatedSettings });

    // 可选：通知 content script（失败不影响设置保存）
    const tabResult = await browser.tabs.query({ active: true, currentWindow: true });
    if (tabResult[0]?.id) {
      try {
        await browser.tabs.sendMessage(tabResult[0].id, {
          type: 'updateSettings',
          settings: updatedSettings
        });
      } catch (error) {
        console.log('[Popup] Content script not reachable, settings saved to storage');
      }
    }
  } catch (error) {
    console.error('[Popup] Failed to save settings:', error);
    alert('保存设置失败，请重试');
  }
}

async function translateCurrentPage() {
  const result = await browser.tabs.query({ active: true, currentWindow: true });

  if (!result[0]) {
    console.error('[Popup] No active tab found');
    alert('无法找到当前页面标签');
    return;
  }

  const tab = result[0];

  // 检查是否是特殊页面，这些页面不会注入 content script
  const specialPages = [
    'chrome://extensions/',
    'chrome://newtab/',
    'about:blank',
    'about:newtab',
    'edge://extensions/',
    'edge://newtab/',
    'moz-extension://'
  ];

  const isSpecialPage = specialPages.some(page => tab.url?.startsWith(page));

  if (isSpecialPage) {
    console.warn('[Popup] Cannot translate special page:', tab.url);
    alert('请在正常网页上使用翻译功能\n（如 https://example.com）');
    return;
  }

  status.value = 'translating';
  console.log('[Popup] Sending translate message to tab:', tab.id, 'URL:', tab.url);

  try {
    const response = await browser.tabs.sendMessage(tab.id, {
      type: 'translatePage'
    });

    console.log('[Popup] Translation response:', response);

    if (response && response.success === false) {
      status.value = 'error';
      const errorMsg = response.error || '未知错误';
      alert(`翻译失败: ${errorMsg}`);
    } else {
      status.value = 'completed';
    }
  } catch (error: any) {
    console.error('[Popup] Failed to translate:', error);
    status.value = 'error';

    if (error.message.includes('Receiving end does not exist')) {
      console.error('[Popup] Message channel closed, tab may be closing or reloading');
      alert('页面正在加载或已关闭，请刷新页面后重试');
    } else if (error.message.includes('Could not establish connection')) {
      console.error('[Popup] Cannot connect to content script');
      alert('无法建立连接，content script 可能未加载\n请刷新页面或重新加载插件');
    } else {
      alert(`翻译失败: ${error.message || '未知错误'}\n请刷新页面后重试`);
    }
  }
}

async function revertTranslation() {
  const result = await browser.tabs.query({ active: true, currentWindow: true });

  if (!result[0]) {
    console.error('[Popup] No active tab found');
    alert('无法找到当前页面标签');
    return;
  }

  const tab = result[0];
  console.log('[Popup] Sending revert message to tab:', tab.id);

  try {
    const response = await browser.tabs.sendMessage(tab.id, {
      type: 'revertAll'
    });

    console.log('[Popup] Revert response:', response);

    if (response && response.success === false) {
      alert(`撤销翻译失败: ${response.error || '未知错误'}`);
    } else {
      status.value = 'idle';
    }
  } catch (error: any) {
    console.error('[Popup] Failed to revert:', error);
    alert(`撤销翻译失败: ${error.message || '未知错误'}`);
  }
}

async function openSettings() {
  await browser.runtime.openOptionsPage();
}

async function clearCache() {
  const result = await browser.tabs.query({ active: true, currentWindow: true });
  
  if (!result[0]) {
    alert('无法找到当前页面标签');
    return;
  }

  const tab = result[0];
  
  const specialPages = [
    'chrome://extensions/',
    'chrome://newtab/',
    'about:blank',
    'edge://extensions/',
    'edge://newtab/'
  ];
  
  const isSpecialPage = specialPages.some(page => tab.url?.startsWith(page));
  
  if (isSpecialPage) {
    alert('清除缓存操作仅在正常网页上可用');
    return;
  }

  console.log('[Popup] Sending clear cache message to tab:', tab.id, 'URL:', tab.url);

  try {
    const response = await browser.tabs.sendMessage(tab.id, {
      type: 'clearCache'
    });

    console.log('[Popup] Clear cache response:', response);

    if (response && response.success === false) {
      const errorMsg = response.error || '未知错误';
      alert(`清除缓存失败: ${errorMsg}`);
    } else {
      alert('缓存已清除，页面将自动刷新');
    }
  } catch (error: any) {
    console.error('[Popup] Failed to clear cache:', error);

    if (error.message.includes('Receiving end does not exist')) {
      alert('页面正在加载或已关闭，请刷新页面后重试');
    } else if (error.message.includes('Could not establish connection')) {
      alert('无法建立连接，content script 可能未加载\n请刷新页面或重新加载插件');
    } else {
      alert(`清除缓存失败: ${error.message}\n请刷新页面后重试`);
    }
  }
}
</script>

<style scoped>
.popup-container {
  width: 320px;
  padding: 16px;
  background: #ffffff;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

.popup-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
  padding-bottom: 12px;
  border-bottom: 1px solid #e5e7eb;
}

.popup-header h1 {
  font-size: 18px;
  font-weight: 600;
  margin: 0;
  color: #111827;
}

.status-indicator {
  font-size: 12px;
  padding: 4px 8px;
  border-radius: 4px;
  font-weight: 500;
}

.status-idle {
  background: #f3f4f6;
  color: #6b7280;
}

.status-detecting,
.status-translating {
  background: #dbeafe;
  color: #1d4ed8;
}

.status-completed {
  background: #dcfce7;
  color: #166534;
}

.status-error {
  background: #fee2e2;
  color: #dc2626;
}

.popup-content {
  min-height: 200px;
}

.toggle-section {
  margin-bottom: 16px;
}

.toggle-label {
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  user-select: none;
}

.toggle-label input[type='checkbox'] {
  display: none;
}

.toggle-slider {
  position: relative;
  width: 44px;
  height: 24px;
  background: #e5e7eb;
  border-radius: 12px;
  transition: background 0.2s;
}

.toggle-slider::before {
  content: '';
  position: absolute;
  top: 2px;
  left: 2px;
  width: 20px;
  height: 20px;
  background: white;
  border-radius: 50%;
  transition: transform 0.2s;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.toggle-label input:checked + .toggle-slider {
  background: #3b82f6;
}

.toggle-label input:checked + .toggle-slider::before {
  transform: translateX(20px);
}

.settings-section {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.control-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.control-group label {
  font-size: 14px;
  font-weight: 500;
  color: #374151;
}

.control-group select {
  padding: 8px 12px;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  font-size: 14px;
  background: white;
  cursor: pointer;
}

.control-group select:focus {
  outline: none;
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.control-group label input[type='checkbox'] {
  margin-right: 8px;
}

.translate-btn {
  width: 100%;
  padding: 12px;
  background: #3b82f6;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;
}

.translate-btn:hover:not(:disabled) {
  background: #2563eb;
}

.translate-btn:disabled {
  background: #9ca3af;
  cursor: not-allowed;
}

.button-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.completed-actions {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.btn-success {
  width: 100%;
  padding: 12px;
  background: #ef4444;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;
}

.btn-success:hover {
  background: #dc2626;
}

.btn-error {
  width: 100%;
  padding: 12px;
  background: #f59e0b;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;
}

.btn-error:hover {
  background: #d97706;
}

.api-status {
  padding: 12px;
  background: #fef3c7;
  border-radius: 8px;
  margin-top: 16px;
}

.warning {
  font-size: 13px;
  color: #92400e;
  margin: 0 0 12px 0;
}

.btn-secondary {
  width: 100%;
  padding: 8px 16px;
  background: #f59e0b;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.2s;
}

.btn-secondary:hover {
  background: #d97706;
}

.popup-footer {
  display: flex;
  gap: 12px;
  margin-top: 16px;
  padding-top: 12px;
  border-top: 1px solid #e5e7eb;
}

.btn-link {
  flex: 1;
  padding: 8px;
  background: transparent;
  color: #6b7280;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  font-size: 13px;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-link:hover {
  background: #f9fafb;
  color: #111827;
  border-color: #9ca3af;
}
</style>
