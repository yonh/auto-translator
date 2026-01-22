# 配置示例文件

## 配置导入导出

插件支持将配置导出为 JSON 文件，方便备份和分享。

### 导出配置

1. 打开设置页面
2. 滚动到底部"配置管理"区域
3. 点击"导出配置"按钮
4. 浏览器会自动下载 `.json` 文件

### 导入配置

1. 打开设置页面
2. 滚动到底部"配置管理"区域
3. 点击"导入配置"按钮
4. 选择之前导出的 JSON 文件
5. 确认导入成功

### 配置文件格式

```json
{
  "version": "1.0.0",
  "exportedAt": "2024-01-22T00:00:00.000Z",
  "settings": {
    "enabled": true,
    "autoDetect": true,
    "targetLanguage": "zh-CN",
    "openai": {
      "apiKey": "sk-...",
      "baseUrl": "https://api.openai.com/v1",
      "models": ["gpt-3.5-turbo"],
      "maxConcurrency": 5,
      "timeout": 30000
    },
    "cacheEnabled": true,
    "cacheMaxAge": 604800000,
    "blacklist": [],
    "whitelist": [],
    "showTranslationBadge": true
  }
}
```

### 注意事项

1. **安全性**: 配置文件包含 API 密钥，请勿分享给他人
2. **格式验证**: 导入时会验证文件格式，无效的文件会报错
3. **覆盖**: 导入会覆盖当前设置，请谨慎操作
4. **备份**: 导入前建议先导出当前配置作为备份

---

## OpenAI 官方 API

```json
{
  "apiKey": "sk-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
  "baseUrl": "https://api.openai.com/v1",
  "models": [
    "gpt-3.5-turbo",
    "gpt-4"
  ],
  "maxConcurrency": 5
}
```

## Azure OpenAI

```json
{
  "apiKey": "your-azure-api-key",
  "baseUrl": "https://your-resource.openai.azure.com/openai/deployments/your-deployment",
  "models": [
    "gpt-35-turbo",
    "gpt-4"
  ],
  "maxConcurrency": 5
}
```

## DeepSeek (国内可用)

```json
{
  "apiKey": "sk-xxxxxxxxxxxxxxxxxxxxxxxx",
  "baseUrl": "https://api.deepseek.com/v1",
  "models": [
    "deepseek-chat"
  ],
  "maxConcurrency": 10
}
```

## 通义千问 (阿里云)

```json
{
  "apiKey": "sk-xxxxxxxxxxxxxxxxxxxxxxxx",
  "baseUrl": "https://dashscope.aliyuncs.com/compatible-mode/v1",
  "models": [
    "qwen-turbo",
    "qwen-plus"
  ],
  "maxConcurrency": 10
}
```

## 智谱 GLM

```json
{
  "apiKey": "xxxxxxxxxxxxxxxxxxxxxxxx",
  "baseUrl": "https://open.bigmodel.cn/api/paas/v4",
  "models": [
    "glm-4",
    "glm-3-turbo"
  ],
  "maxConcurrency": 10
}
```

## 多模型配置示例（绕过并发限制）

使用多个不同服务商的模型，可以大幅提高并发能力：

```json
{
  "apiKey": "sk-xxxxxxxxxxxxxxxxxxxxxxxx",
  "baseUrl": "https://api.openai.com/v1",
  "models": [
    "gpt-3.5-turbo",
    "gpt-3.5-turbo-16k",
    "gpt-4",
    "gpt-4-turbo-preview"
  ],
  "maxConcurrency": 20
}
```

**说明**：
- 设置 4 个模型，每个模型并发限制为 5
- 实际总并发能力 = 4 × 5 = 20
- 插件会自动分配请求到不同模型

## URL 过滤示例

### 白名单（只翻译这些网站）
```
github.com
stackoverflow.com
medium.com
```

### 黑名单（不翻译这些网站）
```
translate.google.com
deepl.com
bing.com/translator
```

## 缓存配置

```json
{
  "cacheEnabled": true,
  "cacheMaxAge": 604800000
}
```

`cacheMaxAge` 单位为毫秒：
- 1 天 = 86400000
- 7 天 = 604800000
- 30 天 = 2592000000
