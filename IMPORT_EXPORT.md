# 配置导入导出功能

## 功能说明

插件支持配置的导入和导出，方便用户：
- 备份当前配置
- 在不同设备间同步配置
- 分享配置（注意安全）
- 快速恢复默认设置

## 使用方法

### 导出配置

1. 点击浏览器工具栏的插件图标
2. 点击"设置"按钮
3. 滚动到页面底部
4. 在"配置管理"区域点击"导出配置"
5. 配置文件会自动下载为 `auto-translator-config-{时间戳}.json`

### 导入配置

1. 打开设置页面
2. 滚动到"配置管理"区域
3. 点击"导入配置"按钮
4. 选择之前导出的 JSON 文件
5. 等待导入完成
6. 确认弹出成功提示

## 配置文件结构

```json
{
  "version": "1.0.0",
  "exportedAt": "2024-01-22T14:30:00.000Z",
  "settings": {
    "enabled": true,
    "autoDetect": true,
    "targetLanguage": "zh-CN",
    "openai": {
      "apiKey": "sk-...",
      "baseUrl": "https://api.openai.com/v1",
      "models": [
        "gpt-3.5-turbo",
        "gpt-4",
        "gpt-4-turbo-preview"
      ],
      "maxConcurrency": 15,
      "timeout": 30000
    },
    "cacheEnabled": true,
    "cacheMaxAge": 604800000,
    "blacklist": [
      "translate.google.com",
      "deepl.com"
    ],
    "whitelist": []
  }
}
```

## 字段说明

### 元数据
- `version`: 配置格式版本
- `exportedAt`: 导出时间（ISO 8601 格式）

### 设置
- `enabled`: 是否启用自动翻译
- `autoDetect`: 是否自动检测语言
- `targetLanguage`: 目标语言代码

### OpenAI 配置
- `apiKey`: OpenAI API 密钥
- `baseUrl`: API 地址
- `models`: 模型列表数组
- `maxConcurrency`: 最大并发数
- `timeout`: 请求超时时间（毫秒）

### 缓存配置
- `cacheEnabled`: 是否启用缓存
- `cacheMaxAge`: 缓存有效期（毫秒）

### URL 过滤
- `blacklist`: 黑名单 URL 列表
- `whitelist`: 白名单 URL 列表

## 常见问题

### Q: 导入失败怎么办？

A: 检查以下几点：
1. 文件格式是否为 JSON
2. 文件是否包含 `version` 和 `settings` 字段
3. 文件是否损坏
4. 查看浏览器控制台的错误信息

### Q: 导入后模型列表不显示？

A: 这是之前的一个 bug，已在最新版本修复：
1. 确保使用最新版本
2. 导入配置后刷新设置页面
3. 重新编辑模型列表触发保存

### Q: API 密钥会安全导入吗？

A:
- 配置文件是纯 JSON 格式
- 导入后存储在浏览器本地存储
- 不会上传到任何服务器
- 但分享配置文件时需小心，避免泄露密钥

## 安全建议

1. **不要分享配置文件**：包含敏感的 API 密钥
2. **定期备份**：导出配置文件并安全保存
3. **验证来源**：只导入自己创建的配置文件
4. **检查内容**：导入前检查文件内容是否合理

## 版本兼容性

| 版本 | 兼容性 | 说明 |
|------|--------|------|
| 1.0.0 | 完全兼容 | 当前版本 |

## 故障排除

### 错误：无效的配置文件格式

**原因**: 文件缺少必要字段

**解决**: 检查文件是否包含 `version` 和 `settings` 字段

### 错误：导入失败

**原因**: JSON 解析错误

**解决**:
1. 使用 JSON 验证工具检查文件
2. 确保文件不是被修改过的二进制文件
3. 尝试重新导出配置

### 错误：模型列表不更新

**原因**: 缓存或 UI 未刷新

**解决**:
1. 刷新设置页面
2. 手动重新编辑模型列表
3. 清除浏览器缓存

## 示例配置

### 基础配置

```json
{
  "version": "1.0.0",
  "exportedAt": "2024-01-22T00:00:00.000Z",
  "settings": {
    "enabled": true,
    "autoDetect": true,
    "targetLanguage": "zh-CN",
    "openai": {
      "apiKey": "sk-your-api-key",
      "baseUrl": "https://api.openai.com/v1",
      "models": ["gpt-3.5-turbo"],
      "maxConcurrency": 5,
      "timeout": 30000
    },
    "cacheEnabled": true,
    "cacheMaxAge": 604800000,
    "blacklist": [],
    "whitelist": []
  }
}
```

### 多模型并发配置

```json
{
  "version": "1.0.0",
  "exportedAt": "2024-01-22T00:00:00.000Z",
  "settings": {
    "enabled": true,
    "autoDetect": true,
    "targetLanguage": "zh-CN",
    "openai": {
      "apiKey": "sk-your-api-key",
      "baseUrl": "https://api.openai.com/v1",
      "models": [
        "gpt-3.5-turbo",
        "gpt-3.5-turbo-16k",
        "gpt-4",
        "gpt-4-turbo-preview"
      ],
      "maxConcurrency": 20,
      "timeout": 30000
    },
    "cacheEnabled": true,
    "cacheMaxAge": 604800000,
    "blacklist": [],
    "whitelist": []
  }
}
```

### 国内 API 配置

```json
{
  "version": "1.0.0",
  "exportedAt": "2024-01-22T00:00:00.000Z",
  "settings": {
    "enabled": true,
    "autoDetect": true,
    "targetLanguage": "zh-CN",
    "openai": {
      "apiKey": "sk-your-api-key",
      "baseUrl": "https://api.deepseek.com/v1",
      "models": ["deepseek-chat"],
      "maxConcurrency": 20,
      "timeout": 30000
    },
    "cacheEnabled": true,
    "cacheMaxAge": 604800000,
    "blacklist": [],
    "whitelist": []
  }
}
```

## 更新日志

### v1.0.0 (2024-01-22)
- 初始版本
- 支持配置导入导出
- 支持完整设置备份和恢复
