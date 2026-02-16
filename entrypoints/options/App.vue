<template>
  <div class="options-container">
    <header class="options-header">
      <h1>自动翻译设置</h1>
    </header>

    <main class="options-main">
      <section class="settings-section">
        <h2>基本设置</h2>

        <div class="control-group">
          <label>
            <input
              type="checkbox"
              v-model="settings.enabled"
              @change="saveSettings"
            />
            启用自动翻译
          </label>
        </div>

        <div class="control-group">
          <label>
            <input
              type="checkbox"
              v-model="settings.autoDetect"
              :disabled="!settings.enabled"
              @change="saveSettings"
            />
            自动检测页面语言
          </label>
        </div>

        <div class="control-group">
          <label for="targetLanguage">目标语言</label>
          <select
            id="targetLanguage"
            v-model="settings.targetLanguage"
            :disabled="!settings.enabled"
            @change="saveSettings"
          >
            <option
              v-for="lang in languages"
              :key="lang.code"
              :value="lang.code"
            >
              {{ lang.name }}
            </option>
          </select>
        </div>
      </section>

      <section class="settings-section">
        <h2>OpenAI API 配置</h2>

        <div class="control-group">
          <label for="apiKey">API 密钥</label>
          <input
            id="apiKey"
            type="password"
            v-model="settings.openai.apiKey"
            placeholder="sk-..."
            @blur="saveSettings"
          />
        </div>

        <div class="control-group">
          <label for="baseUrl">API 地址</label>
          <input
            id="baseUrl"
            type="text"
            v-model="settings.openai.baseUrl"
            placeholder="https://api.openai.com/v1"
            @blur="saveSettings"
          />
        </div>

        <div class="control-group">
          <label for="models">模型列表 (多行输入)</label>
          <textarea
            id="models"
            v-model="modelsText"
            placeholder="gpt-3.5-turbo&#10;gpt-4&#10;gpt-4-turbo"
            rows="3"
            @blur="updateModels"
          ></textarea>
          <small class="help-text">
            每行一个模型，使用多个模型可以绕过单模型并发限制
          </small>
        </div>

        <div class="control-group">
          <label for="maxConcurrency">
            最大并发请求数: {{ settings.openai.maxConcurrency }}
          </label>
          <input
            id="maxConcurrency"
            type="range"
            v-model.number="settings.openai.maxConcurrency"
            min="1"
            max="20"
            step="1"
            @input="saveSettings"
          />
        </div>

        <div class="control-group">
          <label for="batchMaxItems">批次最大条目数</label>
          <input
            id="batchMaxItems"
            type="number"
            v-model.number="settings.openai.batchMaxItems"
            min="1"
            step="1"
            @blur="saveSettings"
          />
        </div>

        <div class="control-group">
          <label for="batchMaxChars">批次最大字符数</label>
          <input
            id="batchMaxChars"
            type="number"
            v-model.number="settings.openai.batchMaxChars"
            min="1"
            step="100"
            @blur="saveSettings"
          />
        </div>

        <div class="control-group">
          <label for="batchMaxTokens">批次最大 Token 数</label>
          <input
            id="batchMaxTokens"
            type="number"
            v-model.number="settings.openai.batchMaxTokens"
            min="1"
            step="100"
            @blur="saveSettings"
          />
        </div>

        <div class="control-group">
          <label for="batchRetryCount">批次失败重试次数</label>
          <input
            id="batchRetryCount"
            type="number"
            v-model.number="settings.openai.batchRetryCount"
            min="0"
            step="1"
            @blur="saveSettings"
          />
        </div>
      </section>

      <section class="settings-section">
        <h2>缓存设置</h2>

        <div class="control-group">
          <label>
            <input
              type="checkbox"
              v-model="settings.cacheEnabled"
              @change="saveSettings"
            />
            启用翻译缓存
          </label>
        </div>

        <div class="control-group">
          <label for="cacheMaxAge">缓存有效期 (天): {{ cacheMaxAgeDays }}</label>
          <input
            id="cacheMaxAge"
            type="range"
            v-model.number="cacheMaxAgeDays"
            min="1"
            max="30"
            step="1"
            @input="updateCacheMaxAge"
          />
        </div>

        <button class="btn-danger" @click="clearCache">
          清除缓存
        </button>
      </section>

      <section class="settings-section">
        <h2>URL 过滤</h2>

        <div class="control-group">
          <label for="whitelist">白名单 (每行一个 URL)</label>
          <textarea
            id="whitelist"
            v-model="whitelistText"
            placeholder="example.com&#10;*.example.org"
            rows="3"
            @blur="updateWhitelist"
          ></textarea>
          <small class="help-text">
            只翻译白名单中的网站，留空则翻译所有网站
          </small>
        </div>

        <div class="control-group">
          <label for="blacklist">黑名单 (每行一个 URL)</label>
          <textarea
            id="blacklist"
            v-model="blacklistText"
            placeholder="translate.google.com&#10;deepl.com"
            rows="3"
            @blur="updateBlacklist"
          ></textarea>
          <small class="help-text">
            不翻译黑名单中的网站
          </small>
        </div>
      </section>

      <section class="settings-section">
        <h2>显示设置</h2>

        <div class="control-group">
          <label>
            <input
              type="checkbox"
              v-model="settings.showFloatingStatusControl"
              @change="saveSettings"
            />
            显示页面底部翻译状态栏
          </label>
        </div>

        <div class="control-group">
          <label>
            <input
              type="checkbox"
              v-model="settings.debugLogging"
              @change="saveSettings"
            />
            启用调试日志
          </label>
          <small class="help-text">
            打印跳过原因、去重命中、动态批量翻译统计到页面控制台
          </small>
        </div>
      </section>

      <section class="settings-section cache-stats" v-if="cacheStats">
        <h2>缓存统计</h2>
        <div class="stats-grid">
          <div class="stat-item">
            <div class="stat-value">{{ cacheStats.size }}</div>
            <div class="stat-label">缓存条目</div>
          </div>
          <div class="stat-item">
            <div class="stat-value">{{ formatDate(cacheStats.oldestTimestamp) }}</div>
            <div class="stat-label">最早缓存</div>
          </div>
          <div class="stat-item">
            <div class="stat-value">{{ formatDate(cacheStats.newestTimestamp) }}</div>
            <div class="stat-label">最新缓存</div>
          </div>
        </div>
      </section>

      <section class="settings-section">
        <h2>配置管理</h2>
        <div class="config-actions">
          <button class="btn-primary" @click="exportConfig">
            导出配置
          </button>
          <button class="btn-secondary" @click="triggerImport">
            导入配置
          </button>
          <input
            type="file"
            ref="fileInput"
            accept=".json"
            style="display: none"
            @change="importConfig"
          />
        </div>
        <div class="config-note">
          导出配置可以备份当前设置，导入配置可以快速恢复或共享配置。
        </div>
        <div v-if="autoLoadedConfig" class="config-auto-loaded">
          <span class="auto-loaded-icon">✓</span>
          已自动从 /config.json 加载配置（仅开发环境）
        </div>
      </section>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import webext from 'webextension-polyfill';
import { translationCache } from '../../src/services/cache';
import { PluginSettings } from '../../src/types';

const browser = webext as any;

const languages = [
  { code: 'zh-CN', name: '简体中文' },
  { code: 'zh-TW', name: '繁體中文' },
  { code: 'en', name: 'English' },
  { code: 'ja', name: '日本語' },
  { code: 'ko', name: '한국어' },
  { code: 'fr', name: 'Français' },
  { code: 'de', name: 'Deutsch' },
  { code: 'es', name: 'Español' },
  { code: 'ru', name: 'Русский' },
  { code: 'pt', name: 'Português' }
];

const settings = ref<PluginSettings>({
  enabled: true,
  autoDetect: true,
  showFloatingStatusControl: true,
  targetLanguage: 'zh-CN',
  openai: {
    apiKey: '',
    baseUrl: 'https://api.openai.com/v1',
    models: ['gpt-3.5-turbo'],
    maxConcurrency: 5,
    timeout: 30000,
    chunkSize: 0,
    batchMaxChars: 20000,
    batchMaxItems: 100,
    batchMaxTokens: 10000,
    batchRetryCount: 2
  },
  cacheEnabled: true,
  cacheMaxAge: 7 * 24 * 60 * 60 * 1000,
  blacklist: [],
  whitelist: [],
  debugLogging: false
});

const modelsText = ref('');
const whitelistText = ref('');
const blacklistText = ref('');
const cacheMaxAgeDays = ref(7);
const cacheStats = ref<any>(null);
const fileInput = ref<HTMLInputElement | null>(null);
const importError = ref<string | null>(null);
const autoLoadedConfig = ref(false); // 标记是否自动加载了配置

onMounted(async () => {
  await loadSettings();
  await loadCacheStats();

  // 开发环境：尝试自动加载本地 config.json
  if ((import.meta as any).env?.DEV) {
    await tryAutoLoadConfig();
  }
});

async function loadSettings() {
  const result = await browser.storage.local.get('settings');
  if (result.settings) {
    settings.value = {
      ...settings.value,
      ...result.settings,
      openai: {
        ...settings.value.openai,
        ...(result.settings.openai || {})
      }
    };
    modelsText.value = settings.value.openai.models.join('\n');
    whitelistText.value = settings.value.whitelist.join('\n');
    blacklistText.value = settings.value.blacklist.join('\n');
    cacheMaxAgeDays.value = Math.floor(settings.value.cacheMaxAge / (24 * 60 * 60 * 1000));
  }
}

async function saveSettings() {
  await browser.storage.local.set({ settings: settings.value });
}

function updateModels() {
  const models = modelsText.value
    .split('\n')
    .map(m => m.trim())
    .filter(m => m.length > 0);

  if (models.length > 0) {
    settings.value.openai.models = models;
    saveSettings();
  }
}

function updateWhitelist() {
  const whitelist = whitelistText.value
    .split('\n')
    .map(u => u.trim())
    .filter(u => u.length > 0);

  settings.value.whitelist = whitelist;
  saveSettings();
}

function updateBlacklist() {
  const blacklist = blacklistText.value
    .split('\n')
    .map(u => u.trim())
    .filter(u => u.length > 0);

  settings.value.blacklist = blacklist;
  saveSettings();
}

function updateCacheMaxAge() {
  settings.value.cacheMaxAge = cacheMaxAgeDays.value * 24 * 60 * 60 * 1000;
  saveSettings();
}

async function clearCache() {
  if (confirm('确定要清除所有翻译缓存吗？')) {
    await translationCache.clear();
    await loadCacheStats();
    alert('缓存已清除');
  }
}

async function loadCacheStats() {
  const stats = await translationCache.getStats();
  cacheStats.value = stats;
}

function formatDate(timestamp: number): string {
  if (!timestamp) return '-';
  const date = new Date(timestamp);
  return date.toLocaleDateString();
}

async function exportConfig() {
  const config = {
    version: '1.0.0',
    exportedAt: new Date().toISOString(),
    settings: settings.value
  };

  const json = JSON.stringify(config, null, 2);
  const blob = new Blob([json], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `auto-translator-config-${Date.now()}.json`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);

  alert('配置已导出');
}

function triggerImport() {
  fileInput.value?.click();
}

async function importConfig(event: Event) {
  const target = event.target as HTMLInputElement;
  const file = target.files?.[0];

  if (!file) {
    return;
  }

  try {
    const text = await file.text();
    const imported = JSON.parse(text);

    if (!imported.settings || !imported.version) {
      throw new Error('无效的配置文件格式');
    }

    const importedSettings = imported.settings;

    const newSettings = {
      ...settings.value,
      ...importedSettings,
      openai: {
        ...settings.value.openai,
        ...importedSettings.openai
      }
    };

    settings.value = newSettings;

    if (newSettings.openai.models) {
      modelsText.value = newSettings.openai.models.join('\n');
    }
    if (newSettings.whitelist) {
      whitelistText.value = newSettings.whitelist.join('\n');
    }
    if (newSettings.blacklist) {
      blacklistText.value = newSettings.blacklist.join('\n');
    }
    if (newSettings.cacheMaxAge) {
      cacheMaxAgeDays.value = Math.floor(newSettings.cacheMaxAge / (24 * 60 * 60 * 1000));
    }

    await saveSettings();

    alert(`配置已导入成功 (版本 ${imported.version})`);
    importError.value = null;

    await loadCacheStats();
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : '导入失败';
    importError.value = errorMessage;
    alert(`导入配置失败: ${errorMessage}`);
  }

  if (target) {
    target.value = '';
  }
}

// 开发环境：尝试自动加载本地 config.json
async function tryAutoLoadConfig() {
  try {
    const response = await fetch('/config.json');
    if (!response.ok) {
      console.log('[Options] No local config.json found, skipping auto-load');
      return;
    }

    const text = await response.text();
    const imported = JSON.parse(text);

    if (!imported.settings || !imported.version) {
      console.log('[Options] Invalid config.json format, skipping auto-load');
      return;
    }

    const importedSettings = imported.settings;

    const newSettings = {
      ...settings.value,
      ...importedSettings,
      openai: {
        ...settings.value.openai,
        ...importedSettings.openai
      }
    };

    settings.value = newSettings;

    if (newSettings.openai.models) {
      modelsText.value = newSettings.openai.models.join('\n');
    }
    if (newSettings.whitelist) {
      whitelistText.value = newSettings.whitelist.join('\n');
    }
    if (newSettings.blacklist) {
      blacklistText.value = newSettings.blacklist.join('\n');
    }
    if (newSettings.cacheMaxAge) {
      cacheMaxAgeDays.value = Math.floor(newSettings.cacheMaxAge / (24 * 60 * 60 * 1000));
    }

    await saveSettings();
    autoLoadedConfig.value = true;

    console.log('[Options] Config auto-loaded successfully');
    await loadCacheStats();
  } catch (error) {
    // 静默失败，不显示错误
    console.log('[Options] Failed to auto-load config:', error);
  }
}
</script>

<style scoped>
.config-actions {
  display: flex;
  gap: 12px;
  margin-bottom: 16px;
}

.config-note {
  font-size: 13px;
  color: #6b7280;
  padding: 12px;
  background: #f3f4f6;
  border-radius: 6px;
}

.options-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 32px;
  background: #ffffff;
  min-height: 100vh;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

.options-header {
  margin-bottom: 32px;
  padding-bottom: 20px;
  border-bottom: 2px solid #e5e7eb;
}

.options-header h1 {
  font-size: 28px;
  font-weight: 700;
  margin: 0;
  color: #111827;
}

.options-main {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.settings-section {
  background: #f9fafb;
  padding: 24px;
  border-radius: 12px;
  border: 1px solid #e5e7eb;
}

.settings-section h2 {
  font-size: 18px;
  font-weight: 600;
  margin: 0 0 20px 0;
  color: #111827;
}

.control-group {
  margin-bottom: 20px;
}

.control-group label {
  display: block;
  font-size: 14px;
  font-weight: 500;
  color: #374151;
  margin-bottom: 8px;
}

.control-group input[type='text'],
.control-group input[type='password'],
.control-group select,
.control-group textarea {
  width: 100%;
  padding: 10px 12px;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  font-size: 14px;
  background: white;
  transition: border-color 0.2s;
}

.control-group input:focus,
.control-group select:focus,
.control-group textarea:focus {
  outline: none;
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.control-group input[type='checkbox'] {
  margin-right: 8px;
}

.control-group input[type='range'] {
  width: 100%;
  height: 6px;
  background: #e5e7eb;
  border-radius: 3px;
  outline: none;
  -webkit-appearance: none;
}

.control-group input[type='range']::-webkit-slider-thumb {
  -webkit-appearance: none;
  width: 18px;
  height: 18px;
  background: #3b82f6;
  border-radius: 50%;
  cursor: pointer;
}

.control-group input[type='range']:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.help-text {
  display: block;
  font-size: 12px;
  color: #6b7280;
  margin-top: 6px;
}

.btn-danger {
  width: 100%;
  padding: 12px;
  background: #dc2626;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;
}

.btn-danger:hover {
  background: #b91c1c;
}

.cache-stats .stats-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
}

.stat-item {
  text-align: center;
  padding: 16px;
  background: white;
  border-radius: 8px;
  border: 1px solid #e5e7eb;
}

.stat-value {
  font-size: 24px;
  font-weight: 700;
  color: #3b82f6;
  margin-bottom: 4px;
}

.stat-label {
  font-size: 12px;
  color: #6b7280;
}

.config-auto-loaded {
  margin-top: 12px;
  padding: 10px 14px;
  background: #ecfdf5;
  border: 1px solid #10b981;
  border-radius: 6px;
  font-size: 13px;
  color: #065f46;
  display: flex;
  align-items: center;
  gap: 8px;
}

.auto-loaded-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  background: #10b981;
  color: white;
  border-radius: 50%;
  font-size: 12px;
  font-weight: bold;
}
</style>
