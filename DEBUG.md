# 调试指南

## 开发模式调试

### 1. 启动开发服务器

```bash
# Chrome 开发模式
npm run dev

# Firefox 开发模式
npm run dev:firefox
```

开发模式会：
- 监听文件变化并自动重新编译
- 启用 source map 方便调试
- 支持热重载

### 2. 加载到浏览器

#### Chrome

1. 打开 `chrome://extensions/`
2. 开启右上角"开发者模式"
3. 点击"加载已解压的扩展程序"
4. 选择项目目录中的 `.output/chrome-mv3` 或 `.wxt-dev/chrome-mv3`（开发模式）
5. 插件会自动刷新当代码变化时

#### Firefox

1. 打开 `about:debugging`
2. 点击"此 Firefox"
3. 点击"临时附加附加组件"
4. 选择 `.output/firefox-mv2` 或 `.wxt-dev/firefox-mv2`

## 调试技巧

### Content Script 调试

#### 方法 1: 页面控制台

1. 打开任意网页
2. 按 F12 打开开发者工具
3. 在 Console 标签中直接调试 content script

```javascript
// 测试翻译管理器是否加载
console.log('Translation manager loaded:', typeof window.translationManager);

// 测试语言检测
import { languageDetector } from 'path-to-language-detector';
console.log(languageDetector.detect('Hello world'));
```

#### 方法 2: 注入调试代码

在 `entrypoints/content/index.ts` 中添加：

```typescript
export default defineContentScript({
  matches: ['<all_urls>'],
  main() {
    // 调试模式
    if (import.meta.env.DEV) {
      console.log('[Content Script] Initializing...');
      window.__DEBUG__ = {
        translationManager,
        languageDetector,
        openaiService: getOpenAIService(),
      };
      console.log('[Content Script] Debug objects attached to window.__DEBUG__');
    }

    // 原有代码
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => {
        translationManager.init();
      });
    } else {
      translationManager.init();
    }
  }
});
```

然后在浏览器控制台使用：

```javascript
// 访问调试对象
window.__DEBUG__.translationManager.translatePage();
window.__DEBUG__.languageDetector.detect('测试文本');
```

### Background Script 调试

#### Chrome

1. 打开 `chrome://extensions/`
2. 找到 Auto Translator 扩展
3. 点击"Service Worker"或"背景页"
4. 打开的控制台可以调试 background script

#### Firefox

1. 打开 `about:debugging#/runtime/this-firefox`
2. 找到 Auto Translator
3. 点击"调试"

#### 添加调试日志

在 `entrypoints/background/index.ts` 中：

```typescript
export default defineBackground(() => {
  if (import.meta.env.DEV) {
    console.log('[Background] Initializing...');
  }

  translationManager.init();

  if (import.meta.env.DEV) {
    console.log('[Background] Translation manager initialized');
  }
});
```

### Popup 调试

#### 方法 1: 右键检查

1. 点击浏览器工具栏的插件图标打开 popup
2. 在 popup 界面右键 → 检查
3. 打开的开发者工具可以调试 popup

#### 方法 2: Console 日志

在 Vue 组件中添加调试日志：

```vue
<script setup lang="ts">
import { ref, onMounted } from 'vue';

const status = ref('idle');

onMounted(async () => {
  console.log('[Popup] Component mounted');
  console.log('[Popup] Current status:', status.value);

  await loadSettings();
  console.log('[Popup] Settings loaded');
});

async function translateCurrentPage() {
  console.log('[Popup] Translating current page...');
  status.value = 'translating';
  // ...
}
</script>
```

### Options 页面调试

1. 右键点击页面 → 检查
2. 或者在插件设置中直接打开开发者工具

## 常见调试场景

### 1. 检查翻译流程

在控制台逐步执行：

```javascript
// 1. 检查设置
await browser.storage.local.get('settings').then(console.log);

// 2. 测试语言检测
const text = "Hello world, 你好世界";
const detected = window.__DEBUG__.languageDetector.detect(text);
console.log('Detected:', detected);

// 3. 测试缓存
const cacheResult = await window.__DEBUG__.openaiService.translationCache.get(
  text,
  'en',
  'zh-CN',
  'gpt-3.5-turbo'
);
console.log('Cache result:', cacheResult);

// 4. 测试翻译
try {
  const result = await window.__DEBUG__.openaiService.translate({
    text: "Hello",
    sourceLang: "en",
    targetLang: "zh-CN"
  });
  console.log('Translation result:', result);
} catch (error) {
  console.error('Translation error:', error);
}
```

### 2. 检查多模型并发

```javascript
// 查看当前配置
const settings = window.__DEBUG__.translationManager.getSettings();
console.log('Models:', settings.openai.models);
console.log('Max concurrency:', settings.openai.maxConcurrency);

// 测试批量翻译
const requests = [
  { text: "Hello", sourceLang: "en", targetLang: "zh-CN" },
  { text: "World", sourceLang: "en", targetLang: "zh-CN" },
  { text: "Test", sourceLang: "en", targetLang: "zh-CN" },
];

const results = await window.__DEBUG__.openaiService.translateBatch(requests);
console.log('Batch translation results:', results);

// 检查活跃请求数
console.log('Active requests:', window.__DEBUG__.openaiService.getActiveRequestCount());
```

### 3. 检查缓存状态

```javascript
// 获取缓存统计
const stats = await window.__DEBUG__.translationCache.getStats();
console.log('Cache stats:', stats);

// 清空缓存
await window.__DEBUG__.translationCache.clear();
console.log('Cache cleared');
```

### 4. 检查页面元素识别

```javascript
// 获取可翻译元素
const elements = document.querySelectorAll('*');
const translatable = [];

elements.forEach(el => {
  const text = el.textContent?.trim();
  if (text && text.length > 2 && shouldTranslateElement(el)) {
    translatable.push({
      tag: el.tagName,
      text: text.substring(0, 50) + '...',
      class: el.className
    });
  }
});

console.log('Translatable elements:', translatable.length);
console.table(translatable.slice(0, 10)); // 显示前 10 个
```

## 网络请求调试

### 查看 API 请求

1. 打开开发者工具 → Network 标签
2. 筛选 XHR 或 Fetch 请求
3. 查找对 OpenAI API 的请求

**请求示例**：

```
POST https://api.openai.com/v1/chat/completions
Headers:
  Authorization: Bearer sk-xxx...
  Content-Type: application/json

Body:
  {
    "model": "gpt-3.5-turbo",
    "messages": [
      {
        "role": "system",
        "content": "You are a professional translator..."
      },
      {
        "role": "user",
        "content": "Translate the following text..."
      }
    ]
  }
```

### 检查错误响应

如果 API 请求失败，查看：

1. **状态码**: 401（密钥错误）、429（限流）、500（服务器错误）
2. **响应内容**: 具体错误信息
3. **请求头**: Authorization 是否正确

## 性能调试

### 测量翻译时间

```javascript
console.time('Translation');
const result = await window.__DEBUG__.openaiService.translate({
  text: "This is a test text",
  sourceLang: "en",
  targetLang: "zh-CN"
});
console.timeEnd('Translation');
console.log('Result:', result);
```

### 内存使用检查

Chrome DevTools → Memory 标签 → Take heap snapshot

### 性能分析

1. DevTools → Performance 标签
2. 点击 Record
3. 触发翻译
4. 停止录制
5. 分析函数调用时间

## 常见问题排查

### 问题 1: 插件未加载

**检查清单**：
- [ ] 是否开启了开发者模式
- [ ] 选择的目录是否正确（`.output/chrome-mv3`）
- [ ] manifest.json 是否有语法错误
- [ ] Console 是否有错误信息

### 问题 2: 翻译不工作

**排查步骤**：

```javascript
// 1. 检查插件是否启用
console.log('Plugin enabled:', window.__DEBUG__.translationManager.getSettings().enabled);

// 2. 检查 API 密钥
const settings = await browser.storage.local.get('settings');
console.log('API Key configured:', !!settings.settings.openai.apiKey);

// 3. 测试单个翻译
try {
  const result = await window.__DEBUG__.openaiService.translate({
    text: "test",
    sourceLang: "en",
    targetLang: "zh-CN"
  });
  console.log('Translation test passed:', result);
} catch (error) {
  console.error('Translation test failed:', error);
}

// 4. 检查当前页面语言
const pageLang = window.__DEBUG__.languageDetector.detectPageLanguage();
console.log('Page language:', pageLang);
```

### 问题 3: 多模型并发不生效

**检查配置**：

```javascript
const settings = window.__DEBUG__.translationManager.getSettings();
console.log('Models configured:', settings.openai.models);
console.log('Max concurrency:', settings.openai.maxConcurrency);

// 计算实际并发
const modelsCount = settings.openai.models.length;
const perModelConcurrency = Math.floor(settings.openai.maxConcurrency / modelsCount);
console.log(`Per-model concurrency: ${perModelConcurrency}`);
```

### 问题 4: 缓存不工作

**检查存储**：

```javascript
// 查看所有存储
const allData = await browser.storage.local.get(null);
console.log('All storage data:', allData);

// 检查缓存索引
console.log('Cache index:', allData.trans_cache_index);

// 手动测试缓存
await window.__DEBUG__.translationCache.set(
  "test text",
  "en",
  "zh-CN",
  "gpt-3.5-turbo",
  "测试文本"
);

const cached = await window.__DEBUG__.translationCache.get(
  "test text",
  "en",
  "zh-CN",
  "gpt-3.5-turbo"
);
console.log('Cached result:', cached);
```

## TypeScript 调试

### 类型检查

```bash
npm run compile
```

### 查看类型错误

```bash
npm run compile 2>&1 | grep "error TS"
```

### 类型提示

在 VS Code 中安装插件：
- Volar（Vue 3 支持）
- TypeScript Vue Plugin (Volar)

## 单元测试（未来扩展）

可以添加测试框架：

```bash
# 安装 Vitest
npm install -D vitest @vitest/ui

# 运行测试
npm run test
```

## 日志级别

创建日志工具统一管理：

```typescript
// src/utils/logger.ts
const LOG_LEVELS = {
  DEBUG: 0,
  INFO: 1,
  WARN: 2,
  ERROR: 3,
};

let currentLevel = import.meta.env.DEV ? LOG_LEVELS.DEBUG : LOG_LEVELS.INFO;

export const logger = {
  debug(...args: any[]) {
    if (currentLevel <= LOG_LEVELS.DEBUG) {
      console.log('[DEBUG]', ...args);
    }
  },
  info(...args: any[]) {
    if (currentLevel <= LOG_LEVELS.INFO) {
      console.log('[INFO]', ...args);
    }
  },
  warn(...args: any[]) {
    if (currentLevel <= LOG_LEVELS.WARN) {
      console.warn('[WARN]', ...args);
    }
  },
  error(...args: any[]) {
    console.error('[ERROR]', ...args);
  }
};
```

使用：

```typescript
import { logger } from './utils/logger';

logger.debug('Debug message');
logger.info('Translation started');
logger.warn('API rate limit approaching');
logger.error('Translation failed', error);
```

## 调试快捷键

创建快捷键测试：

在 `wxt.config.ts` 中添加：

```typescript
export default defineConfig({
  manifest: {
    // ... 其他配置
    commands: {
      'translate-page': {
        suggested_key: {
          default: 'Ctrl+Shift+T',
          mac: 'Command+Shift+T'
        },
        description: 'Translate current page'
      }
    }
  }
});
```

在 background 中监听：

```typescript
browser.commands.onCommand.addListener(async (command) => {
  if (command === 'translate-page') {
    console.log('[Debug] Translate page command triggered');
    // 触发翻译
  }
});
```

## 远程调试

### 使用 Chrome Remote Debugging

```bash
# 启动 Chrome 并开启远程调试
/Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome \
  --remote-debugging-port=9222
```

然后可以使用其他工具（如 Puppeteer、Chrome DevTools Protocol）进行调试。

## 调试最佳实践

1. **始终使用开发模式进行调试**
2. **添加有意义的日志信息**
3. **使用 source map 定位源代码**
4. **逐步测试每个功能模块**
5. **记录复现步骤**
6. **使用 Console.table() 显示结构化数据**
7. **利用浏览器断点调试**
8. **监控网络请求和响应**
9. **检查内存和性能**
10. **查看所有控制台输出（包括警告）**

## 调试命令速查

```bash
# 开发模式
npm run dev

# Firefox 开发
npm run dev:firefox

# 类型检查
npm run compile

# 构建并检查
npm run build && ls .output/chrome-mv3/

# 清理并重新构建
rm -rf .output .wxt && npm run dev

# 查看 manifest
cat .output/chrome-mv3/manifest.json

# 查看日志（如果使用外部日志）
# 在浏览器控制台直接查看
```

## 获取帮助

如果遇到问题：

1. 检查本文档的"常见问题排查"部分
2. 查看浏览器控制台错误
3. 查看后台脚本控制台错误
4. 检查网络请求是否成功
5. 查看存储数据是否正确
6. 查看 manifest.json 配置

```javascript
// 快速健康检查
async function healthCheck() {
  console.log('=== Health Check ===');
  console.log('1. Plugin loaded:', !!window.__DEBUG__);
  console.log('2. Settings:', await browser.storage.local.get('settings'));
  console.log('3. Cache stats:', await window.__DEBUG__?.translationCache.getStats());
  console.log('4. Active requests:', window.__DEBUG__?.openaiService?.getActiveRequestCount());
  console.log('5. Page language:', window.__DEBUG__?.languageDetector?.detectPageLanguage());
  console.log('==================');
}

healthCheck();
```
