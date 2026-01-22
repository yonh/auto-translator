# Auto Translator

浏览器自动翻译插件，基于 wxt-vue 框架开发。

## 功能特性

- 自动检测页面语言
- 智能翻译页面内容
- 翻译缓存，避免重复请求
- 支持多个 OpenAI 兼容模型
- 多模型并发，绕过单模型限制
- 可自定义目标语言
- URL 黑白名单过滤
- 可视化翻译标记

## 开发

安装依赖：
```bash
npm install
```

开发模式（Chrome）：
```bash
npm run dev
```

开发模式（Firefox）：
```bash
npm run dev:firefox
```

构建：
```bash
npm run build
```

打包：
```bash
npm run zip
```

## 配置

在浏览器扩展设置中配置：

1. OpenAI API 密钥
2. API 地址（支持 OpenAI 兼容接口）
3. 模型列表（多个模型并发）
4. 最大并发数
5. 目标语言
6. 缓存设置

## 使用说明

1. 安装插件后，点击浏览器工具栏中的插件图标
2. 启用自动翻译
3. 选择目标语言
4. 点击"翻译当前页面"或等待自动翻译

## 多模型并发

插件支持同时使用多个 OpenAI 模型进行翻译，这样可以绕过单个模型的并发限制。

例如，设置三个模型：
```
gpt-3.5-turbo
gpt-4
gpt-4-turbo
```

插件会自动在这些模型之间分配请求，每个模型独立处理自己的并发限制。

## 技术栈

- wxt - 浏览器扩展框架
- Vue 3 - UI 框架
- TypeScript - 类型安全
- webextension-polyfill - 浏览器 API

## License

MIT
