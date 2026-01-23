# Text Extraction Root Cause Analysis

## Problem

用户报告：只提取了17个元素，但目标段落没有被提取。

## Root Cause

在 `getChildContainers` 方法中，我们检查所有子元素是否是容器标签：

```typescript
getChildContainers(element: HTMLElement): HTMLElement[] {
  const children: HTMLElement[] = [];
  for (let i = 0; i < element.children.length; i++) {
    const child = element.children[i] as HTMLElement;
    if (this.containerTags.includes(child.tagName.toLowerCase())) {
      children.push(child);
    }
  }
  return children;
}
```

**问题：** `<a>` 标签不在 `containerTags` 中，但 `<p>` 中包含链接时，`<a>` 是子元素。

例如：
```html
<p>This is text with <a href="#">a link</a> in it.</p>
```

在这种情况下：
- `<p>` 的 children 包含：1个文本节点 + 1个 `<a>` 元素
- `childContainers` 返回：`[]`（因为 `<a>` 不在 containerTags 中）
- 所以 `childContainers.length === 0` 为 true
- 但是 `directText` 只包含 "This is text with  in it."，不包含 "a link"
- 直接文本比例可能小于50%

**更严重的问题：** 如果段落包含 `<a>` 标签，`getDirectText` 会收集文本节点的内容，但 `<a>` 是元素节点，所以链接文字不会被计入直接文本！

让我验证这个问题...

## The Real Bug: `getDirectText` Implementation

```typescript
getDirectText(element: HTMLElement): string {
  let text = '';
  const childNodes = Array.from(element.childNodes);

  for (const node of childNodes) {
    if (node.nodeType === Node.TEXT_NODE) {
      text += node.textContent;
    }
  }
  return this.normalizeWhitespace(text);
}
```

对于这个段落：
```html
<p>This package aims to be the entry point to get started with event sourcing in Laravel. It can help you setting up aggregates, projectors and reactors.</p>
```

如果它包含链接或span：
```html
<p>This is <a href="#">a link</a> in text.</p>
```

`getDirectText` 会返回：
- "This is  in text."（不包含 "a link"，因为 `<a>` 是元素节点）
- 总长度：~16字符
- `getElementText` 返回："This is a link in text."
- 总长度：~21字符
- 直接文本比例：16/21 = 76%（这应该通过）

但如果段落完全由嵌套元素组成，比如：
```html
<p><span>Some</span> <span>text</span></p>
```

`getDirectText` 会返回空字符串！因为 `<span>` 都是元素节点。

## Solution

我们需要改进直接文本的计算，或者简化容器检测逻辑：

### Option 1: 改进 `getDirectText`
```typescript
getDirectText(element: HTMLElement): string {
  const childNodes = Array.from(element.childNodes);
  const directTextNodes = childNodes.filter(node => node.nodeType === Node.TEXT_NODE);
  return directTextNodes.map(node => node.textContent).join('');
}
```

### Option 2: 简化容器检测

对于 `<p>`、`<h1-h6>`、`<li>`、`<td>` 等叶子级容器，直接接受：

```typescript
isTranslationContainer(element) {
  const tag = element.tagName.toLowerCase();
  if (!this.containerTags.includes(tag)) return false;
  const text = this.getElementText(element);
  if (text.length < 2) return false;

  // 对于叶子级容器，直接接受
  const leafTags = ['p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'li', 'td', 'th', 'dt', 'dd', 'figcaption', 'caption'];
  if (leafTags.includes(tag)) {
    return true;
  }

  // 对于结构容器（div, section, article），检查直接文本
  const structTags = ['div', 'section', 'article', 'aside'];
  if (structTags.includes(tag)) {
    const directText = this.getDirectText(element);
    return directText.trim().length > 0;
  }

  return false;
}
```

这个方案更简单和可靠：
- 段落、标题等叶子元素总是被接受
- 只有结构容器（div、section）需要检查直接文本
- 避免了复杂的孩子检查和比例计算
