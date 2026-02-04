# Node Capture Issue Analysis

## Overview

The current browser extension can only translate a small portion of page content. This document analyzes the root causes and proposes a refactoring plan.

---

## Current Implementation Analysis

### 1. TextExtractor Architecture

The `TextExtractor` class (`src/utils/text-extractor.ts`) is responsible for identifying translatable DOM nodes. It uses a `TreeWalker` to traverse the DOM tree.

#### Current Logic Flow:
1. Create a `TreeWalker` starting from `document.body`
2. Filter nodes using `acceptNode` callback
3. Only accept nodes that:
   - Are not in the exclude list
   - **Are in the hardcoded `containerTags` list**
4. Skip nodes already contained in processed parents

---

## Root Cause Analysis

### Problem 1: Overly Restrictive Tag Whitelist

**Current containerTags:**
```typescript
private containerTags = [
  'p', 'div', 'section', 'article', 'aside', 'li', 'td', 'th',
  'dt', 'dd', 'figcaption', 'caption', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6'
];
```

**Missing common tags:**
- `span` - Most common inline text container
- `a` - Links with text content
- `label` - Form labels
- `button` - Button text
- `strong`, `em`, `b`, `i` - Emphasis elements
- `blockquote` - Quoted text
- `cite` - Citations
- `abbr` - Abbreviations
- `time` - Time elements
- `mark` - Highlighted text
- `small` - Small print
- `sub`, `sup` - Subscript/superscript
- `legend` - Fieldset legends
- `summary` - Details summary
- `option` - Select options
- `title` (in SVG) - SVG titles

**Impact:** Any text inside these tags is completely ignored.

---

### Problem 2: Flawed TreeWalker Filter Logic

```typescript
acceptNode: (node) => {
  if (node instanceof HTMLElement) {
    if (this.shouldExcludeElement(node)) {
      return NodeFilter.FILTER_REJECT;
    }
    if (this.isTranslationContainer(node)) {
      return NodeFilter.FILTER_ACCEPT;
    }
  }
  return NodeFilter.FILTER_REJECT;  // <-- Problem: Rejects all non-container elements
}
```

**Issues:**
1. Returns `FILTER_REJECT` for non-container elements, which **skips their entire subtree**
2. Should use `FILTER_SKIP` to continue traversing children
3. Text nodes (`Node.TEXT_NODE`) are never processed directly

---

### Problem 3: No Direct Text Node Processing

The extractor only looks at element nodes, not text nodes. Modern web pages often have:
- Text directly in `<span>` elements
- Mixed content (text + inline elements)
- Text nodes as direct children of `<div>` without wrapper elements

**Example not captured:**
```html
<div>
  Some text here  <!-- This text node is ignored -->
  <span>More text</span>  <!-- span not in containerTags -->
</div>
```

---

### Problem 4: Parent-Child Containment Logic Issues

```typescript
isContainedInProcessed(element: HTMLElement, processed: Set<HTMLElement>, root: HTMLElement): boolean {
  let current = element.parentElement;
  while (current && current !== root && !isContained) {
    if (processed.has(current)) {
      isContained = true;
    }
    current = current.parentElement;
  }
  return isContained;
}
```

**Issues:**
1. If a parent `<div>` is processed first, all child elements are skipped
2. But the parent might only have partial text, missing nested content
3. No granularity control - either translate whole parent or nothing

---

### Problem 5: Translation Applier Destroys DOM Structure

```typescript
apply(node: Node, translation: string): void {
  if (node.nodeType === Node.ELEMENT_NODE) {
    const element = node as Element;
    const textNode = this.findTextNode(element);
    if (textNode) {
      this.apply(textNode, translation);
    } else {
      element.textContent = translation;  // <-- Destroys all child elements!
    }
  }
}
```

**Issue:** Using `element.textContent = translation` removes all child elements, breaking:
- Links inside paragraphs
- Formatted text (bold, italic)
- Interactive elements
- Images and icons

---

### Problem 6: No Handling of Dynamic Content

- `DOMMutationObserver` exists but is **not connected** to the translation flow
- SPA (Single Page Application) content changes are not detected
- Lazy-loaded content is missed

---

### Problem 7: Language Detection Per-Element Overhead

Each element is detected separately:
```typescript
const detectionResult = this.languageDetector.detect(text);
```

**Issues:**
1. Redundant detection for same-language content
2. Short text snippets have unreliable detection
3. No page-level language caching

---

## Impact Summary

| Issue | Severity | Content Missed |
|-------|----------|----------------|
| Limited containerTags | **Critical** | 60-70% of text |
| FILTER_REJECT logic | **Critical** | Entire subtrees |
| No text node processing | **High** | Inline text |
| Parent containment | **Medium** | Nested content |
| DOM destruction | **High** | Formatted content |
| No dynamic content | **Medium** | SPA content |

---

## Recommended Refactoring Approach

See `REFACTORING_PLAN.md` for detailed implementation plan.
