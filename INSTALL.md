# Auto Translator - 浏览器自动翻译插件

一个基于 wxt-vue 框架开发的智能浏览器翻译插件，支持 OpenAI 兼容接口。

## 核心功能

### 1. 自动翻译
- 自动检测页面语言
- 智能翻译页面所有文本内容
- 支持自动触发翻译

### 2. 缓存机制
- 翻译结果本地缓存
- 防止重复请求
- 可配置缓存有效期
- 自动清理过期缓存

### 3. 多模型并发
- 支持配置多个 OpenAI 模型
- 自动分配请求到不同模型
- 绕过单模型并发限制
- 提高翻译效率

### 4. 灵活配置
- 目标语言自定义
- URL 黑白名单
- 翻译开关控制

## 快速开始

### 开发环境

1. 克隆仓库：
```bash
cd auto-translator
```

2. 安装依赖：
```bash
npm install
```

3. 开发模式：
```bash
# Chrome
npm run dev

# Firefox
npm run dev:firefox
```

4. 构建生产版本：
```bash
npm run build
```

### 安装插件

1. 构建：
```bash
npm run build
```

2. 在浏览器中加载插件：
   - Chrome: `chrome://extensions/` → 开发者模式 → 加载已解压的扩展程序 → 选择 `.output/chrome-mv3` 目录
   - Firefox: `about:debugging` → 临时附加附加组件 → 选择 `.output/firefox-mv2` 目录

## 配置说明

### OpenAI API 设置

1. 打开插件设置页面
2. 配置以下参数：

| 参数 | 说明 | 示例 |
|------|------|------|
| API 密钥 | OpenAI API Key | `sk-xxx...` |
| API 地址 | OpenAI 兼容接口地址 | `https://api.openai.com/v1` |
| 模型列表 | 多个模型，每行一个 | `gpt-3.5-turbo`<br/>`gpt-4`<br/>`gpt-4-turbo` |
| 最大并发数 | 同时处理的请求数 | `5` |

### 多模型并发策略

通过配置多个模型来绕过单模型并发限制：

```
gpt-3.5-turbo
gpt-4
gpt-4-turbo
claude-3-opus
```

插件会自动将翻译请求分配到不同模型，每个模型独立处理并发限制。

### 基本设置

| 选项 | 说明 |
|------|------|
| 启用自动翻译 | 全局开关 |
| 自动检测语言 | 自动识别页面语言 |
| 目标语言 | 翻译目标语言 |

### 缓存设置

| 选项 | 说明 |
|------|------|
| 启用翻译缓存 | 减少重复请求 |
| 缓存有效期 | 1-30 天 |
| 清除缓存 | 手动清理缓存数据 |

### URL 过滤

| 选项 | 说明 | 示例 |
|------|------|------|
| 白名单 | 只翻译这些网站 | `example.com`<br/>`*.example.org` |
| 黑名单 | 不翻译这些网站 | `translate.google.com`<br/>`deepl.com` |

## 使用方法

### Popup 界面

1. 点击浏览器工具栏的插件图标
2. 启用/禁用自动翻译
3. 选择目标语言
4. 点击"翻译当前页面"手动触发

## 技术架构

```
auto-translator/
├── entrypoints/          # 入口文件
│   ├── popup/            # 弹窗界面
│   ├── options/          # 设置页面
│   ├── background/       # 后台服务
│   └── content/         # 内容脚本
├── src/
│   ├── services/         # 核心服务
│   │   ├── cache.ts              # 缓存服务
│   │   ├── openai.ts            # OpenAI API 服务
│   │   ├── language-detector.ts # 语言检测
│   │   └── translation-manager.ts # 翻译管理器
│   ├── types/            # 类型定义
│   └── utils/            # 工具函数
└── public/              # 静态资源
```

### 核心模块

#### TranslationManager
- 管理翻译流程
- 处理页面元素识别
- 协调各服务模块

#### OpenAIService
- OpenAI API 封装
- 多模型并发控制
- 请求队列管理

#### TranslationCache
- 翻译结果缓存
- LRU 淘汰策略
- 自动过期清理

#### LanguageDetector
- 文本语言识别
- 页面语言推断
- 支持多语言模式

## API 兼容性

支持所有 OpenAI 兼容的接口：

- OpenAI 官方 API
- Azure OpenAI
- DeepSeek
- 通义千问
- 智谱 GLM
- 其他兼容接口

只需配置正确的 `API 地址` 和 `API 密钥`。

## 性能优化

1. **缓存优先**：先查缓存，避免重复请求
2. **批量处理**：支持批量翻译请求
3. **并发控制**：限制同时请求数量
4. **智能节流**：避免短时间内重复翻译
5. **懒加载**：动态加载页面内容自动翻译

## 隐私说明

- 翻译文本发送到配置的 API 服务器
- 本地缓存翻译结果
- 不收集任何用户数据
- 支持 URL 黑名单保护敏感网站

## 故障排除

### 翻译失败
1. 检查 API 密钥是否正确
2. 确认 API 地址可访问
3. 检查并发限制设置
4. 查看浏览器控制台错误

### 部分内容未翻译
1. 检查 URL 是否在黑名单中
2. 确认元素不在排除标签中
3. 手动触发翻译

### 性能问题
1. 降低最大并发数
2. 启用缓存功能
3. 缩短缓存有效期
4. 减少模型数量

## License

MIT
