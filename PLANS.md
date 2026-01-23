# Auto-Translator 插件重构开发计划

## 项目概述

使用 WXT 框架重新实现 auto-translator 浏览器翻译插件，采用递归方式遍历提取可翻译节点，全程遵循 TDD（测试驱动开发）流程。

### 技术栈
- **框架**: WXT (浏览器扩展框架)
- **语言**: TypeScript
- **UI**: Vue 3
- **测试**: Vitest + @testing-library
- **构建**: Vite

### 开发原则
1. **TDD 优先**: 先写测试，再写实现
2. **递归遍历**: 使用递归算法提取可翻译节点
3. **模块化设计**: 每个功能独立模块，便于测试
4. **类型安全**: 完整的 TypeScript 类型定义

---

## 阶段 0: 项目初始化与测试环境搭建

### 任务 0.1: 测试框架配置
**目标**: 配置 Vitest 测试环境，支持 TypeScript 和 DOM 测试

#### 子任务 0.1.1: 安装测试依赖
- **描述**: 安装 Vitest、@testing-library、jsdom 等测试相关依赖
- **操作**:
  ```bash
  pnpm add -D vitest @vitest/ui jsdom
  pnpm add -D @testing-library/vue @testing-library/jest-dom
  pnpm add -D @testing-library/user-event
  pnpm add -D happy-dom
  ```
- **验证**: package.json 中包含所有测试依赖

#### 子任务 0.1.2: 创建 Vitest 配置文件
- **描述**: 创建 vitest.config.ts 配置文件
- **文件**: `vitest.config.ts`
- **内容**:
  - 配置测试环境为 happy-dom
  - 配置测试文件匹配模式
  - 配置覆盖率报告
  - 配置全局测试设置

#### 子任务 0.1.3: 配置测试脚本
- **描述**: 在 package.json 中添加测试命令
- **脚本**:
  - `test`: 运行所有测试
  - `test:ui`: 运行测试 UI 界面
  - `test:coverage`: 生成覆盖率报告
  - `test:watch`: 监听模式运行测试

#### 子任务 0.1.4: 创建测试目录结构
- **描述**: 创建规范的测试目录结构
- **目录结构**:
  ```
  tests/
  ├── unit/              # 单元测试
  │   ├── utils/
  │   ├── services/
  │   └── core/
  ├── integration/       # 集成测试
  ├── fixtures/          # 测试数据
  └── helpers/           # 测试辅助函数
  ```

#### 子任务 0.1.5: 创建测试辅助工具
- **描述**: 创建通用测试辅助函数和 mock 工具
- **文件**: `tests/helpers/test-utils.ts`
- **内容**:
  - DOM 创建辅助函数
  - Mock 浏览器 API
  - 测试数据生成器

---

## 阶段 1: 核心类型系统

### 任务 1.1: 定义核心类型接口
**目标**: 建立完整的 TypeScript 类型系统

#### 子任务 1.1.1: 编写类型测试
- **文件**: `tests/unit/types/index.test.ts`
- **测试内容**:
  - 验证类型定义的完整性
  - 验证类型约束的正确性
  - 验证类型推导的准确性

#### 子任务 1.1.2: 实现核心类型定义
- **文件**: `src/types/index.ts`
- **类型定义**:
  - `TranslatableNode`: 可翻译节点接口
  - `NodeExtractionConfig`: 节点提取配置
  - `TranslationContext`: 翻译上下文
  - `CacheEntry`: 缓存条目
  - `OpenAIConfig`: OpenAI 配置
  - `PluginSettings`: 插件设置

#### 子任务 1.1.3: 验证类型系统
- **操作**: 运行类型测试确保所有类型定义正确
- **命令**: `pnpm test tests/unit/types`

---

## 阶段 2: 递归节点提取器

### 任务 2.1: 节点过滤器实现
**目标**: 实现节点过滤逻辑，判断哪些节点应该被排除

#### 子任务 2.1.1: 编写节点过滤器测试
- **文件**: `tests/unit/core/node-filter.test.ts`
- **测试用例**:
  - 测试排除 script 标签
  - 测试排除 style 标签
  - 测试排除 noscript 标签
  - 测试排除 svg、canvas 等非文本元素
  - 测试排除 code、pre 等代码块
  - 测试 translate="no" 属性识别
  - 测试 data-translate="false" 属性识别
  - 测试 .notranslate 类名识别
  - 测试自定义排除规则

#### 子任务 2.1.2: 实现节点过滤器
- **文件**: `src/core/node-filter.ts`
- **类**: `NodeFilter`
- **方法**:
  - `shouldExclude(node: Node): boolean`
  - `isExcludedTag(tagName: string): boolean`
  - `hasExcludeAttribute(element: Element): boolean`
  - `hasExcludeClass(element: Element): boolean`
  - `addCustomExcludeRule(rule: ExcludeRule): void`

#### 子任务 2.1.3: 运行测试验证
- **操作**: 运行节点过滤器测试
- **命令**: `pnpm test tests/unit/core/node-filter.test.ts`
- **目标**: 所有测试通过，覆盖率 > 95%

---

### 任务 2.2: 文本节点识别器
**目标**: 识别包含可翻译文本的节点

#### 子任务 2.2.1: 编写文本节点识别器测试
- **文件**: `tests/unit/core/text-node-detector.test.ts`
- **测试用例**:
  - 测试识别纯文本节点
  - 测试识别包含文本的元素节点
  - 测试过滤空白文本
  - 测试最小文本长度限制
  - 测试文本规范化
  - 测试多语言文本识别（中文、英文、日文等）
  - 测试混合内容节点处理
  - 测试特殊字符处理

#### 子任务 2.2.2: 实现文本节点识别器
- **文件**: `src/core/text-node-detector.ts`
- **类**: `TextNodeDetector`
- **方法**:
  - `isTextNode(node: Node): boolean`
  - `hasTranslatableText(node: Node): boolean`
  - `extractText(node: Node): string`
  - `normalizeText(text: string): string`
  - `getTextLength(text: string): number`
  - `detectLanguage(text: string): string | null`

#### 子任务 2.2.3: 运行测试验证
- **操作**: 运行文本节点识别器测试
- **命令**: `pnpm test tests/unit/core/text-node-detector.test.ts`
- **目标**: 所有测试通过，覆盖率 > 95%

---

### 任务 2.3: 递归节点遍历器
**目标**: 实现递归算法遍历 DOM 树，提取可翻译节点

#### 子任务 2.3.1: 编写递归遍历器测试
- **文件**: `tests/unit/core/recursive-traverser.test.ts`
- **测试用例**:
  - 测试简单 DOM 树遍历
  - 测试深层嵌套 DOM 树遍历
  - 测试跳过排除节点
  - 测试避免重复遍历
  - 测试遍历顺序（深度优先 vs 广度优先）
  - 测试性能（大型 DOM 树）
  - 测试循环引用处理
  - 测试 Shadow DOM 处理
  - 测试 iframe 处理

#### 子任务 2.3.2: 实现递归遍历器
- **文件**: `src/core/recursive-traverser.ts`
- **类**: `RecursiveTraverser`
- **方法**:
  - `traverse(root: Node, config: TraverseConfig): TranslatableNode[]`
  - `traverseNode(node: Node, depth: number): void` (递归核心)
  - `shouldTraverseChildren(node: Node): boolean`
  - `collectNode(node: Node): void`
  - `handleShadowDOM(element: Element): void`
  - `handleIframe(iframe: HTMLIFrameElement): void`
  - `reset(): void`

#### 子任务 2.3.3: 运行测试验证
- **操作**: 运行递归遍历器测试
- **命令**: `pnpm test tests/unit/core/recursive-traverser.test.ts`
- **目标**: 所有测试通过，覆盖率 > 95%

---

### 任务 2.4: 节点提取器集成
**目标**: 整合过滤器、识别器和遍历器，提供统一的节点提取接口

#### 子任务 2.4.1: 编写节点提取器集成测试
- **文件**: `tests/unit/core/node-extractor.test.ts`
- **测试用例**:
  - 测试完整提取流程
  - 测试配置选项应用
  - 测试提取结果格式
  - 测试提取性能
  - 测试边界情况
  - 测试错误处理

#### 子任务 2.4.2: 实现节点提取器
- **文件**: `src/core/node-extractor.ts`
- **类**: `NodeExtractor`
- **方法**:
  - `extract(root: Node, config?: ExtractionConfig): TranslatableNode[]`
  - `extractWithMetadata(root: Node): ExtractionResult`
  - `setConfig(config: ExtractionConfig): void`
  - `getStatistics(): ExtractionStatistics`

#### 子任务 2.4.3: 运行测试验证
- **操作**: 运行节点提取器测试
- **命令**: `pnpm test tests/unit/core/node-extractor.test.ts`
- **目标**: 所有测试通过，覆盖率 > 95%

---

## 阶段 3: 语言检测服务

### 任务 3.1: 语言检测器实现
**目标**: 实现基于 Unicode 范围的快速语言检测

#### 子任务 3.1.1: 编写语言检测器测试
- **文件**: `tests/unit/services/language-detector.test.ts`
- **测试用例**:
  - 测试中文检测（简体、繁体）
  - 测试英文检测
  - 测试日文检测（平假名、片假名、汉字）
  - 测试韩文检测
  - 测试俄文检测
  - 测试阿拉伯文检测
  - 测试混合语言文本
  - 测试置信度计算
  - 测试未知语言处理
  - 测试空文本处理

#### 子任务 3.1.2: 实现语言检测器
- **文件**: `src/services/language-detector.ts`
- **类**: `LanguageDetector`
- **方法**:
  - `detect(text: string): LanguageDetectionResult`
  - `detectPageLanguage(root?: HTMLElement): string`
  - `shouldTranslate(sourceLang: string, targetLang: string): boolean`
  - `getLanguageConfidence(text: string, lang: string): number`
  - `isLanguage(text: string, lang: string): boolean`

#### 子任务 3.1.3: 运行测试验证
- **操作**: 运行语言检测器测试
- **命令**: `pnpm test tests/unit/services/language-detector.test.ts`
- **目标**: 所有测试通过，覆盖率 > 95%

---

## 阶段 4: 翻译缓存系统

### 任务 4.1: 缓存键生成器
**目标**: 实现稳定的缓存键生成算法

#### 子任务 4.1.1: 编写缓存键生成器测试
- **文件**: `tests/unit/services/cache-key-generator.test.ts`
- **测试用例**:
  - 测试基本文本哈希
  - 测试相同文本生成相同键
  - 测试不同文本生成不同键
  - 测试包含语言信息的键
  - 测试包含模型信息的键
  - 测试特殊字符处理
  - 测试长文本处理
  - 测试哈希冲突概率

#### 子任务 4.1.2: 实现缓存键生成器
- **文件**: `src/services/cache-key-generator.ts`
- **类**: `CacheKeyGenerator`
- **方法**:
  - `generate(text: string, sourceLang: string, targetLang: string, model: string): string`
  - `hash(input: string): string`
  - `normalize(text: string): string`

#### 子任务 4.1.3: 运行测试验证
- **操作**: 运行缓存键生成器测试
- **命令**: `pnpm test tests/unit/services/cache-key-generator.test.ts`
- **目标**: 所有测试通过，覆盖率 > 95%

---

### 任务 4.2: 缓存存储管理器
**目标**: 实现基于 browser.storage.local 的缓存存储

#### 子任务 4.2.1: 编写缓存存储管理器测试
- **文件**: `tests/unit/services/cache-storage.test.ts`
- **测试用例**:
  - 测试缓存写入
  - 测试缓存读取
  - 测试缓存更新
  - 测试缓存删除
  - 测试批量操作
  - 测试过期缓存清理
  - 测试 LRU 淘汰策略
  - 测试容量限制
  - 测试存储配额处理
  - 测试并发访问

#### 子任务 4.2.2: 实现缓存存储管理器
- **文件**: `src/services/cache-storage.ts`
- **类**: `CacheStorage`
- **方法**:
  - `get(key: string): Promise<CacheEntry | null>`
  - `set(key: string, entry: CacheEntry): Promise<void>`
  - `delete(key: string): Promise<void>`
  - `clear(): Promise<void>`
  - `cleanExpired(): Promise<number>`
  - `getSize(): Promise<number>`
  - `getStatistics(): Promise<CacheStatistics>`

#### 子任务 4.2.3: 运行测试验证
- **操作**: 运行缓存存储管理器测试
- **命令**: `pnpm test tests/unit/services/cache-storage.test.ts`
- **目标**: 所有测试通过，覆盖率 > 95%

---

### 任务 4.3: 翻译缓存服务
**目标**: 整合缓存键生成和存储，提供高级缓存接口

#### 子任务 4.3.1: 编写翻译缓存服务测试
- **文件**: `tests/unit/services/translation-cache.test.ts`
- **测试用例**:
  - 测试缓存命中
  - 测试缓存未命中
  - 测试缓存写入
  - 测试缓存过期
  - 测试缓存预热
  - 测试缓存统计
  - 测试缓存导出/导入

#### 子任务 4.3.2: 实现翻译缓存服务
- **文件**: `src/services/translation-cache.ts`
- **类**: `TranslationCache`
- **方法**:
  - `get(text: string, sourceLang: string, targetLang: string, model: string): Promise<string | null>`
  - `set(text: string, sourceLang: string, targetLang: string, model: string, translation: string): Promise<void>`
  - `has(text: string, sourceLang: string, targetLang: string, model: string): Promise<boolean>`
  - `clear(): Promise<void>`
  - `export(): Promise<CacheExport>`
  - `import(data: CacheExport): Promise<void>`

#### 子任务 4.3.3: 运行测试验证
- **操作**: 运行翻译缓存服务测试
- **命令**: `pnpm test tests/unit/services/translation-cache.test.ts`
- **目标**: 所有测试通过，覆盖率 > 95%

---

## 阶段 5: OpenAI 翻译服务

### 任务 5.1: API 请求构建器
**目标**: 构建符合 OpenAI API 规范的请求

#### 子任务 5.1.1: 编写 API 请求构建器测试
- **文件**: `tests/unit/services/openai-request-builder.test.ts`
- **测试用例**:
  - 测试基本请求构建
  - 测试系统提示词
  - 测试用户提示词
  - 测试温度参数
  - 测试最大 token 数
  - 测试模型选择
  - 测试自定义参数

#### 子任务 5.1.2: 实现 API 请求构建器
- **文件**: `src/services/openai-request-builder.ts`
- **类**: `OpenAIRequestBuilder`
- **方法**:
  - `buildTranslationRequest(text: string, sourceLang: string, targetLang: string, model: string): OpenAIRequest`
  - `buildSystemPrompt(): string`
  - `buildUserPrompt(text: string, sourceLang: string, targetLang: string): string`
  - `setTemperature(temp: number): this`
  - `setMaxTokens(tokens: number): this`

#### 子任务 5.1.3: 运行测试验证
- **操作**: 运行 API 请求构建器测试
- **命令**: `pnpm test tests/unit/services/openai-request-builder.test.ts`
- **目标**: 所有测试通过，覆盖率 > 95%

---

### 任务 5.2: API 响应解析器
**目标**: 解析 OpenAI API 响应并提取翻译结果

#### 子任务 5.2.1: 编写 API 响应解析器测试
- **文件**: `tests/unit/services/openai-response-parser.test.ts`
- **测试用例**:
  - 测试正常响应解析
  - 测试错误响应处理
  - 测试空响应处理
  - 测试格式错误响应
  - 测试提取翻译文本
  - 测试提取使用统计
  - 测试多选项响应

#### 子任务 5.2.2: 实现 API 响应解析器
- **文件**: `src/services/openai-response-parser.ts`
- **类**: `OpenAIResponseParser`
- **方法**:
  - `parse(response: Response): Promise<OpenAIResponse>`
  - `extractTranslation(response: OpenAIResponse): string`
  - `extractUsage(response: OpenAIResponse): UsageInfo`
  - `validateResponse(response: OpenAIResponse): boolean`
  - `handleError(error: any): TranslationError`

#### 子任务 5.2.3: 运行测试验证
- **操作**: 运行 API 响应解析器测试
- **命令**: `pnpm test tests/unit/services/openai-response-parser.test.ts`
- **目标**: 所有测试通过，覆盖率 > 95%

---

### 任务 5.3: 并发控制器
**目标**: 实现请求队列和并发限制

#### 子任务 5.3.1: 编写并发控制器测试
- **文件**: `tests/unit/services/concurrency-controller.test.ts`
- **测试用例**:
  - 测试并发限制
  - 测试请求队列
  - 测试请求优先级
  - 测试请求取消
  - 测试超时处理
  - 测试错误重试
  - 测试多模型并发分配

#### 子任务 5.3.2: 实现并发控制器
- **文件**: `src/services/concurrency-controller.ts`
- **类**: `ConcurrencyController`
- **方法**:
  - `acquire(model: string): Promise<void>`
  - `release(model: string): void`
  - `enqueue(request: QueuedRequest): void`
  - `cancel(requestId: string): void`
  - `getActiveCount(model?: string): number`
  - `getQueueLength(model?: string): number`

#### 子任务 5.3.3: 运行测试验证
- **操作**: 运行并发控制器测试
- **命令**: `pnpm test tests/unit/services/concurrency-controller.test.ts`
- **目标**: 所有测试通过，覆盖率 > 95%

---

### 任务 5.4: OpenAI 翻译服务
**目标**: 整合请求构建、响应解析和并发控制

#### 子任务 5.4.1: 编写 OpenAI 翻译服务测试
- **文件**: `tests/unit/services/openai-service.test.ts`
- **测试用例**:
  - 测试单文本翻译
  - 测试批量翻译
  - 测试多模型并发翻译
  - 测试缓存集成
  - 测试错误处理
  - 测试请求取消
  - 测试超时处理
  - 测试重试机制

#### 子任务 5.4.2: 实现 OpenAI 翻译服务
- **文件**: `src/services/openai-service.ts`
- **类**: `OpenAIService`
- **方法**:
  - `translate(request: TranslationRequest): Promise<TranslationResponse>`
  - `translateBatch(requests: TranslationRequest[]): Promise<TranslationResponse[]>`
  - `translateWithModel(text: string, sourceLang: string, targetLang: string, model: string): Promise<string>`
  - `cancelAll(): void`
  - `updateConfig(config: Partial<OpenAIConfig>): void`
  - `getStatistics(): ServiceStatistics`

#### 子任务 5.4.3: 运行测试验证
- **操作**: 运行 OpenAI 翻译服务测试
- **命令**: `pnpm test tests/unit/services/openai-service.test.ts`
- **目标**: 所有测试通过，覆盖率 > 95%

---

## 阶段 6: 翻译管理器

### 任务 6.1: 翻译状态管理器
**目标**: 管理翻译状态和进度

#### 子任务 6.1.1: 编写翻译状态管理器测试
- **文件**: `tests/unit/core/translation-state-manager.test.ts`
- **测试用例**:
  - 测试状态初始化
  - 测试状态转换
  - 测试进度跟踪
  - 测试错误状态
  - 测试状态持久化
  - 测试状态恢复

#### 子任务 6.1.2: 实现翻译状态管理器
- **文件**: `src/core/translation-state-manager.ts`
- **类**: `TranslationStateManager`
- **方法**:
  - `setState(state: TranslationStatus): void`
  - `getState(): TranslationStatus`
  - `setProgress(current: number, total: number): void`
  - `getProgress(): ProgressInfo`
  - `setError(error: Error): void`
  - `reset(): void`

#### 子任务 6.1.3: 运行测试验证
- **操作**: 运行翻译状态管理器测试
- **命令**: `pnpm test tests/unit/core/translation-state-manager.test.ts`
- **目标**: 所有测试通过，覆盖率 > 95%

---

### 任务 6.2: 翻译应用器
**目标**: 将翻译结果应用到 DOM 节点

#### 子任务 6.2.1: 编写翻译应用器测试
- **文件**: `tests/unit/core/translation-applier.test.ts`
- **测试用例**:
  - 测试文本节点翻译应用
  - 测试元素节点翻译应用
  - 测试保留原始文本
  - 测试翻译标记添加
  - 测试翻译还原
  - 测试批量应用
  - 测试 DOM 更新性能

#### 子任务 6.2.2: 实现翻译应用器
- **文件**: `src/core/translation-applier.ts`
- **类**: `TranslationApplier`
- **方法**:
  - `apply(node: Node, translation: string): void`
  - `applyBatch(translations: Map<Node, string>): void`
  - `revert(node: Node): void`
  - `revertAll(): void`
  - `addTranslationBadge(element: Element): void`
  - `removeTranslationBadge(element: Element): void`

#### 子任务 6.2.3: 运行测试验证
- **操作**: 运行翻译应用器测试
- **命令**: `pnpm test tests/unit/core/translation-applier.test.ts`
- **目标**: 所有测试通过，覆盖率 > 95%

---

### 任务 6.3: 页面翻译管理器
**目标**: 协调整个页面翻译流程

#### 子任务 6.3.1: 编写页面翻译管理器测试
- **文件**: `tests/unit/core/page-translation-manager.test.ts`
- **测试用例**:
  - 测试完整翻译流程
  - 测试节点提取
  - 测试语言检测
  - 测试批量翻译
  - 测试翻译应用
  - 测试错误处理
  - 测试取消翻译
  - 测试翻译还原

#### 子任务 6.3.2: 实现页面翻译管理器
- **文件**: `src/core/page-translation-manager.ts`
- **类**: `PageTranslationManager`
- **方法**:
  - `translatePage(root?: HTMLElement): Promise<void>`
  - `translateNode(node: Node): Promise<void>`
  - `revertPage(): Promise<void>`
  - `cancel(): void`
  - `getStatus(): TranslationStatus`
  - `getProgress(): ProgressInfo`
  - `updateSettings(settings: Partial<PluginSettings>): void`

#### 子任务 6.3.3: 运行测试验证
- **操作**: 运行页面翻译管理器测试
- **命令**: `pnpm test tests/unit/core/page-translation-manager.test.ts`
- **目标**: 所有测试通过，覆盖率 > 95%

---

## 阶段 7: 动态内容监听

### 任务 7.1: DOM 变化监听器
**目标**: 使用 MutationObserver 监听页面动态变化

#### 子任务 7.1.1: 编写 DOM 变化监听器测试
- **文件**: `tests/unit/core/dom-mutation-observer.test.ts`
- **测试用例**:
  - 测试节点添加监听
  - 测试节点删除监听
  - 测试节点修改监听
  - 测试批量变化处理
  - 测试防抖动
  - 测试监听器启动/停止
  - 测试性能优化

#### 子任务 7.1.2: 实现 DOM 变化监听器
- **文件**: `src/core/dom-mutation-observer.ts`
- **类**: `DOMMutationObserver`
- **方法**:
  - `start(root: Node, callback: MutationCallback): void`
  - `stop(): void`
  - `pause(): void`
  - `resume(): void`
  - `handleMutations(mutations: MutationRecord[]): void`

#### 子任务 7.1.3: 运行测试验证
- **操作**: 运行 DOM 变化监听器测试
- **命令**: `pnpm test tests/unit/core/dom-mutation-observer.test.ts`
- **目标**: 所有测试通过，覆盖率 > 95%

---

### 任务 7.2: 自动翻译触发器
**目标**: 在检测到新内容时自动触发翻译

#### 子任务 7.2.1: 编写自动翻译触发器测试
- **文件**: `tests/unit/core/auto-translation-trigger.test.ts`
- **测试用例**:
  - 测试新节点自动翻译
  - 测试节流控制
  - 测试批量处理
  - 测试条件触发
  - 测试触发器启用/禁用

#### 子任务 7.2.2: 实现自动翻译触发器
- **文件**: `src/core/auto-translation-trigger.ts`
- **类**: `AutoTranslationTrigger`
- **方法**:
  - `enable(): void`
  - `disable(): void`
  - `onNewContent(nodes: Node[]): void`
  - `shouldTrigger(node: Node): boolean`
  - `throttle(fn: Function, delay: number): Function`

#### 子任务 7.2.3: 运行测试验证
- **操作**: 运行自动翻译触发器测试
- **命令**: `pnpm test tests/unit/core/auto-translation-trigger.test.ts`
- **目标**: 所有测试通过，覆盖率 > 95%

---

## 阶段 8: 设置管理

### 任务 8.1: 设置存储服务
**目标**: 管理插件设置的持久化

#### 子任务 8.1.1: 编写设置存储服务测试
- **文件**: `tests/unit/services/settings-storage.test.ts`
- **测试用例**:
  - 测试设置加载
  - 测试设置保存
  - 测试默认设置
  - 测试设置验证
  - 测试设置迁移
  - 测试设置导出/导入

#### 子任务 8.1.2: 实现设置存储服务
- **文件**: `src/services/settings-storage.ts`
- **类**: `SettingsStorage`
- **方法**:
  - `load(): Promise<PluginSettings>`
  - `save(settings: PluginSettings): Promise<void>`
  - `update(updates: Partial<PluginSettings>): Promise<void>`
  - `reset(): Promise<void>`
  - `export(): Promise<SettingsExport>`
  - `import(data: SettingsExport): Promise<void>`

#### 子任务 8.1.3: 运行测试验证
- **操作**: 运行设置存储服务测试
- **命令**: `pnpm test tests/unit/services/settings-storage.test.ts`
- **目标**: 所有测试通过，覆盖率 > 95%

---

### 任务 8.2: URL 过滤器
**目标**: 实现黑白名单 URL 过滤

#### 子任务 8.2.1: 编写 URL 过滤器测试
- **文件**: `tests/unit/utils/url-filter.test.ts`
- **测试用例**:
  - 测试白名单匹配
  - 测试黑名单匹配
  - 测试通配符匹配
  - 测试正则表达式匹配
  - 测试优先级处理
  - 测试性能

#### 子任务 8.2.2: 实现 URL 过滤器
- **文件**: `src/utils/url-filter.ts`
- **类**: `URLFilter`
- **方法**:
  - `isAllowed(url: string): boolean`
  - `matchesWhitelist(url: string): boolean`
  - `matchesBlacklist(url: string): boolean`
  - `addToWhitelist(pattern: string): void`
  - `addToBlacklist(pattern: string): void`

#### 子任务 8.2.3: 运行测试验证
- **操作**: 运行 URL 过滤器测试
- **命令**: `pnpm test tests/unit/utils/url-filter.test.ts`
- **目标**: 所有测试通过，覆盖率 > 95%

---

## 阶段 9: Content Script 集成

### 任务 9.1: Content Script 入口
**目标**: 实现 content script 主入口文件

#### 子任务 9.1.1: 编写 Content Script 集成测试
- **文件**: `tests/integration/content-script.test.ts`
- **测试用例**:
  - 测试脚本初始化
  - 测试消息监听
  - 测试翻译触发
  - 测试设置更新
  - 测试状态同步

#### 子任务 9.1.2: 实现 Content Script
- **文件**: `entrypoints/content.ts`
- **功能**:
  - 初始化翻译管理器
  - 设置消息监听器
  - 处理翻译请求
  - 处理设置更新
  - 处理状态查询

#### 子任务 9.1.3: 运行测试验证
- **操作**: 运行 Content Script 集成测试
- **命令**: `pnpm test tests/integration/content-script.test.ts`
- **目标**: 所有测试通过

---

### 任务 9.2: 消息通信层
**目标**: 实现 content script 与 background/popup 的消息通信

#### 子任务 9.2.1: 编写消息通信测试
- **文件**: `tests/unit/utils/message-handler.test.ts`
- **测试用例**:
  - 测试消息发送
  - 测试消息接收
  - 测试消息响应
  - 测试错误处理
  - 测试超时处理

#### 子任务 9.2.2: 实现消息通信层
- **文件**: `src/utils/message-handler.ts`
- **类**: `MessageHandler`
- **方法**:
  - `send(type: string, data: any): Promise<any>`
  - `on(type: string, handler: MessageCallback): void`
  - `off(type: string, handler: MessageCallback): void`
  - `handleMessage(message: Message): Promise<any>`

#### 子任务 9.2.3: 运行测试验证
- **操作**: 运行消息通信测试
- **命令**: `pnpm test tests/unit/utils/message-handler.test.ts`
- **目标**: 所有测试通过，覆盖率 > 95%

---

## 阶段 10: Background Script

### 任务 10.1: Background Service Worker
**目标**: 实现后台服务管理

#### 子任务 10.1.1: 编写 Background Script 测试
- **文件**: `tests/integration/background.test.ts`
- **测试用例**:
  - 测试服务初始化
  - 测试设置同步
  - 测试消息路由
  - 测试缓存管理

#### 子任务 10.1.2: 实现 Background Script
- **文件**: `entrypoints/background/index.ts`
- **功能**:
  - 初始化后台服务
  - 管理全局设置
  - 处理跨标签页通信
  - 管理缓存清理

#### 子任务 10.1.3: 运行测试验证
- **操作**: 运行 Background Script 测试
- **命令**: `pnpm test tests/integration/background.test.ts`
- **目标**: 所有测试通过

---

## 阶段 11: UI 组件 (Vue)

### 任务 11.1: Popup 界面
**目标**: 实现快捷控制弹窗

#### 子任务 11.1.1: 编写 Popup 组件测试
- **文件**: `tests/unit/components/Popup.test.ts`
- **测试用例**:
  - 测试组件渲染
  - 测试启用/禁用切换
  - 测试语言选择
  - 测试翻译触发
  - 测试状态显示

#### 子任务 11.1.2: 实现 Popup 组件
- **文件**: `entrypoints/popup/App.vue`
- **功能**:
  - 显示翻译状态
  - 快捷开关控制
  - 语言选择器
  - 翻译按钮
  - 缓存统计

#### 子任务 11.1.3: 运行测试验证
- **操作**: 运行 Popup 组件测试
- **命令**: `pnpm test tests/unit/components/Popup.test.ts`
- **目标**: 所有测试通过

---

### 任务 11.2: Options 设置页面
**目标**: 实现完整设置界面

#### 子任务 11.2.1: 编写 Options 组件测试
- **文件**: `tests/unit/components/Options.test.ts`
- **测试用例**:
  - 测试组件渲染
  - 测试设置加载
  - 测试设置保存
  - 测试表单验证
  - 测试导入/导出

#### 子任务 11.2.2: 实现 Options 组件
- **文件**: `entrypoints/options/App.vue`
- **功能**:
  - OpenAI API 配置
  - 模型列表管理
  - 并发设置
  - 缓存配置
  - URL 过滤规则
  - 导入/导出设置

#### 子任务 11.2.3: 运行测试验证
- **操作**: 运行 Options 组件测试
- **命令**: `pnpm test tests/unit/components/Options.test.ts`
- **目标**: 所有测试通过

---

## 阶段 12: 集成测试

### 任务 12.1: 端到端翻译流程测试
**目标**: 测试完整的翻译流程

#### 子任务 12.1.1: 编写端到端测试
- **文件**: `tests/integration/e2e-translation.test.ts`
- **测试用例**:
  - 测试页面加载后自动翻译
  - 测试手动触发翻译
  - 测试动态内容翻译
  - 测试翻译还原
  - 测试缓存命中
  - 测试多模型并发

#### 子任务 12.1.2: 运行端到端测试
- **操作**: 运行完整流程测试
- **命令**: `pnpm test tests/integration/e2e-translation.test.ts`
- **目标**: 所有测试通过

---

### 任务 12.2: 性能测试
**目标**: 验证大规模翻译性能

#### 子任务 12.2.1: 编写性能测试
- **文件**: `tests/integration/performance.test.ts`
- **测试用例**:
  - 测试大型 DOM 树提取性能
  - 测试批量翻译性能
  - 测试缓存读写性能
  - 测试内存使用
  - 测试并发处理能力

#### 子任务 12.2.2: 运行性能测试
- **操作**: 运行性能测试并生成报告
- **命令**: `pnpm test tests/integration/performance.test.ts`
- **目标**: 性能指标达标

---

### 任务 12.3: 兼容性测试
**目标**: 测试不同浏览器和场景的兼容性

#### 子任务 12.3.1: 编写兼容性测试
- **文件**: `tests/integration/compatibility.test.ts`
- **测试用例**:
  - 测试 Chrome 兼容性
  - 测试 Firefox 兼容性
  - 测试 Shadow DOM 处理
  - 测试 iframe 处理
  - 测试 SPA 应用翻译

#### 子任务 12.3.2: 运行兼容性测试
- **操作**: 在不同环境运行测试
- **命令**: `pnpm test tests/integration/compatibility.test.ts`
- **目标**: 所有环境测试通过

---

## 阶段 13: 文档与部署

### 任务 13.1: API 文档
**目标**: 生成完整的 API 文档

#### 子任务 13.1.1: 添加 JSDoc 注释
- **描述**: 为所有公共 API 添加详细的 JSDoc 注释
- **范围**: 所有 src/ 下的类和方法

#### 子任务 13.1.2: 生成 API 文档
- **工具**: TypeDoc
- **命令**: `pnpm run docs`
- **输出**: `docs/api/`

---

### 任务 13.2: 用户文档
**目标**: 编写用户使用文档

#### 子任务 13.2.1: 编写 README
- **文件**: `README.md`
- **内容**:
  - 功能介绍
  - 安装说明
  - 快速开始
  - 配置指南

#### 子任务 13.2.2: 编写使用指南
- **文件**: `docs/USER_GUIDE.md`
- **内容**:
  - 详细使用说明
  - 常见问题
  - 故障排除
  - 最佳实践

---

### 任务 13.3: 开发者文档
**目标**: 编写开发者文档

#### 子任务 13.3.1: 编写架构文档
- **文件**: `docs/ARCHITECTURE.md`
- **内容**:
  - 系统架构
  - 模块设计
  - 数据流
  - 扩展指南

#### 子任务 13.3.2: 编写贡献指南
- **文件**: `CONTRIBUTING.md`
- **内容**:
  - 开发环境设置
  - 代码规范
  - 测试要求
  - PR 流程

---

### 任务 13.4: 构建与发布
**目标**: 配置构建流程和发布脚本

#### 子任务 13.4.1: 优化构建配置
- **文件**: `wxt.config.ts`
- **优化**:
  - 代码分割
  - Tree shaking
  - 压缩优化
  - Source map 配置

#### 子任务 13.4.2: 创建发布脚本
- **文件**: `scripts/release.sh`
- **功能**:
  - 版本号更新
  - 构建生产版本
  - 生成 changelog
  - 打包发布文件

#### 子任务 13.4.3: 配置 CI/CD
- **文件**: `.github/workflows/ci.yml`
- **流程**:
  - 自动运行测试
  - 生成覆盖率报告
  - 自动构建
  - 自动发布

---

## 测试覆盖率目标

### 整体目标
- **单元测试覆盖率**: > 95%
- **集成测试覆盖率**: > 85%
- **整体覆盖率**: > 90%

### 关键模块覆盖率
- 核心模块 (core/): 100%
- 服务模块 (services/): > 95%
- 工具模块 (utils/): > 90%
- UI 组件: > 80%

---

## 开发时间估算

### 阶段时间分配
- 阶段 0 (测试环境): 1 天
- 阶段 1 (类型系统): 0.5 天
- 阶段 2 (节点提取): 3 天
- 阶段 3 (语言检测): 1 天
- 阶段 4 (缓存系统): 2 天
- 阶段 5 (OpenAI 服务): 3 天
- 阶段 6 (翻译管理): 2 天
- 阶段 7 (动态监听): 1.5 天
- 阶段 8 (设置管理): 1.5 天
- 阶段 9 (Content Script): 1.5 天
- 阶段 10 (Background): 1 天
- 阶段 11 (UI 组件): 2 天
- 阶段 12 (集成测试): 2 天
- 阶段 13 (文档部署): 2 天

**总计**: 约 23.5 天

---

## 质量保证检查清单

### 代码质量
- [ ] 所有代码通过 ESLint 检查
- [ ] 所有代码通过 TypeScript 类型检查
- [ ] 所有函数有 JSDoc 注释
- [ ] 代码复杂度在合理范围内

### 测试质量
- [ ] 所有单元测试通过
- [ ] 所有集成测试通过
- [ ] 测试覆盖率达标
- [ ] 性能测试达标

### 功能完整性
- [ ] 所有核心功能实现
- [ ] 所有边界情况处理
- [ ] 错误处理完善
- [ ] 用户体验优化

### 文档完整性
- [ ] API 文档完整
- [ ] 用户文档完整
- [ ] 开发者文档完整
- [ ] 代码注释充分

---

## 风险与应对

### 技术风险
1. **递归深度限制**
   - 风险: 深层嵌套 DOM 可能导致栈溢出
   - 应对: 实现深度限制和迭代方案

2. **性能问题**
   - 风险: 大型页面翻译性能不佳
   - 应对: 分批处理、虚拟滚动、懒加载

3. **浏览器兼容性**
   - 风险: 不同浏览器 API 差异
   - 应对: 使用 polyfill、充分测试

### 进度风险
1. **测试编写耗时**
   - 风险: TDD 可能延长开发时间
   - 应对: 并行开发、复用测试模板

2. **需求变更**
   - 风险: 开发过程中需求调整
   - 应对: 模块化设计、灵活架构

---

## 下一步行动

1. **立即开始**: 阶段 0 - 测试环境搭建
2. **第一周目标**: 完成阶段 0-3
3. **第二周目标**: 完成阶段 4-7
4. **第三周目标**: 完成阶段 8-11
5. **第四周目标**: 完成阶段 12-13

---

## 附录

### 参考资料
- WXT 官方文档: https://wxt.dev
- Vitest 文档: https://vitest.dev
- Testing Library: https://testing-library.com
- OpenAI API: https://platform.openai.com/docs

### 工具链
- Node.js: >= 18
- pnpm: >= 8
- TypeScript: >= 5.3
- Vitest: >= 1.0

---

*本文档将随着开发进度持续更新*
