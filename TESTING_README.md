# Text Extraction Testing - Quick Start

## 快速开始

### 1. 运行测试套件

在浏览器中打开 `test-runner.html`，然后点击"Run All Tests"按钮。

```bash
# 如果没有本地服务器，可以使用 Python
python3 -m http.server 3000

# 或者使用 Node.js
npx serve .

# 然后访问
open http://localhost:3000/test-runner.html
```

### 2. 测试改进效果

在测试运行器中：
- 选择"Original"方法（原始提取逻辑）
- 选择"Improved"方法（改进的提取逻辑）
- 比较两种方法的通过率

### 3. 在 demo.html 上测试

打开 `demo.html` 并在控制台中运行：

```javascript
// 创建一个测试脚本
const script = document.createElement('script');
script.type = 'module';
script.textContent = `
  class TextExtractor {
    constructor() {
      this.excludeTags = ['script', 'style', 'noscript', 'iframe', 'svg', 'canvas', 'video', 'audio', 'code', 'pre', 'kbd', 'samp'];
      this.containerTags = ['p', 'div', 'section', 'article', 'aside', 'li', 'td', 'th', 'dt', 'dd', 'figcaption', 'caption', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6'];
      this.topContainerTags = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'];
    }

    extract(root = document.body) {
      const elements = [];
      const processed = new Set();

      const walker = document.createTreeWalker(root, NodeFilter.SHOW_ELEMENT, {
        acceptNode: (node) => {
          if (node instanceof HTMLElement) {
            if (this.excludeTags.includes(node.tagName.toLowerCase())) return NodeFilter.FILTER_REJECT;
            if (node.getAttribute('translate') === 'no' || node.getAttribute('data-translate') === 'false' || node.className?.includes('notranslate')) return NodeFilter.FILTER_REJECT;
            if (this.containerTags.includes(node.tagName.toLowerCase())) {
              const text = node.textContent?.trim();
              if (text && text.length >= 2) return NodeFilter.FILTER_ACCEPT;
            }
          }
          return NodeFilter.FILTER_REJECT;
        }
      });

      let node;
      while ((node = walker.nextNode())) {
        if (node instanceof HTMLElement) {
          const text = node.textContent?.trim();
          if (!text || text.length < 2) continue;
          if (processed.has(node)) continue;

          let current = node.parentElement;
          let isContained = false;
          while (current && current !== root) {
            if (processed.has(current)) { isContained = true; break; }
            current = current.parentElement;
          }
          if (isContained) continue;

          processed.add(node);
          if (text.length >= 3) elements.push(node);
        }
      }

      return elements;
    }
  }

  window.textExtractor = new TextExtractor();
`;
document.head.appendChild(script);

// 等待脚本加载后执行
setTimeout(() => {
  const extractor = new TextExtractor();
  const elements = extractor.extract(document.body);

  console.log('=== Text Extraction Results ===');
  console.log('Total elements extracted:', elements.length);
  console.log('\\n--- Extracted Texts ---');

  elements.forEach((el, i) => {
    const text = el.textContent?.trim() || '';
    console.log(`${i + 1}. [${el.tagName.toLowerCase()}] ${text.substring(0, 80)}${text.length > 80 ? '...' : ''}`);
  });

  // 统计信息
  const totalChars = elements.reduce((sum, el) => sum + (el.textContent?.trim().length || 0), 0);
  const avgLength = Math.round(totalChars / elements.length);

  console.log('\\n--- Statistics ---');
  console.log('Total characters:', totalChars);
  console.log('Average length:', avgLength);

}, 500);
```

## 文件说明

| 文件 | 用途 |
|------|------|
| `tests/text-extraction.test.ts` | 测试用例定义（15 个测试） |
| `test-runner.html` | 可视化测试运行器 |
| `src/utils/text-extractor.ts` | 改进的 TextExtractor 类 |
| `TEXT_EXTRACTION.md` | 详细技术文档 |
| `IMPLEMENTATION_SUMMARY.md` | 实现总结（中文） |

## 关键改进

### 原始方法的问题
- ❌ 重复提取相同文本
- ❌ 遗漏嵌套内容
- ❌ 容器选择不够智能

### 改进方法的优势
- ✅ 避免重复提取（使用 Set 跟踪）
- ✅ 正确处理嵌套结构（检查父元素）
- ✅ 智能容器选择（直接文本比例）
- ✅ 泛化能力强（适应各种 HTML 结构）

## 预期结果

在标准测试套件上：
- 原始方法：~60% 通过率
- 改进方法：~90%+ 通过率

在 demo.html 上：
- 改进方法应该提取到所有可见文本
- 正确跳过代码块、SVG 图标
- 避免重复提取

## 集成步骤

如果要将改进的 TextExtractor 集成到插件中：

1. 在 `entrypoints/content.ts` 中导入：
   ```typescript
   import { TextExtractor } from '../src/utils/text-extractor';
   ```

2. 替换 `findTranslatableElements()` 方法：
   ```typescript
   private findTranslatableElements() {
     const extractor = new TextExtractor();
     return extractor.extract(document.body);
   }
   ```

3. 重新构建并测试：
   ```bash
   npm run build
   # 在浏览器中加载插件并测试
   ```

## 故障排除

### 测试不通过

检查：
1. 浏览器控制台是否有错误
2. 是否正确导入了模块
3. HTML 结构是否符合预期

### 提取结果不正确

检查：
1. 元素是否在排除列表中
2. 是否有 `data-translate="false"` 属性
3. 文本长度是否满足要求（>= 2 字符）

### 性能问题

如果页面很大，提取可能较慢。可以：
1. 限制提取范围
2. 增加最小文本长度要求
3. 使用批处理

## 更多信息

- 详细文档：`TEXT_EXTRACTION.md`
- 实现总结：`IMPLEMENTATION_SUMMARY.md`
- 项目主文档：`README.md`
