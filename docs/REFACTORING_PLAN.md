# Text Extractor Refactoring Plan

## Goals

1. Capture **all visible text content** on a page
2. Preserve DOM structure during translation
3. Support dynamic/SPA content
4. Improve translation quality and performance

---

## Phase 1: Core Text Extraction Rewrite

### 1.1 Switch to Text Node-Based Extraction

**Current approach:** Element-based with tag whitelist  
**New approach:** Text node-based with element context

```typescript
// New extraction strategy
class TextNodeExtractor {
  extract(root: HTMLElement): TranslatableUnit[] {
    const units: TranslatableUnit[] = [];
    const walker = document.createTreeWalker(
      root,
      NodeFilter.SHOW_TEXT,  // Focus on text nodes
      {
        acceptNode: (node) => {
          const text = node.textContent?.trim();
          if (!text || text.length < 2) {
            return NodeFilter.FILTER_REJECT;
          }
          if (this.isInExcludedElement(node)) {
            return NodeFilter.FILTER_REJECT;
          }
          return NodeFilter.FILTER_ACCEPT;
        }
      }
    );
    
    let textNode;
    while ((textNode = walker.nextNode())) {
      units.push(this.createTranslatableUnit(textNode as Text));
    }
    
    return this.mergeAdjacentUnits(units);
  }
}
```

### 1.2 Define TranslatableUnit Structure

```typescript
interface TranslatableUnit {
  id: string;
  textNodes: Text[];           // Original text nodes
  originalText: string;        // Combined original text
  translatedText?: string;     // Translation result
  parentElement: HTMLElement;  // Common parent for context
  context: {
    tagName: string;
    isHeading: boolean;
    isLink: boolean;
    isButton: boolean;
  };
}
```

### 1.3 Smart Unit Merging

Merge adjacent text nodes that should be translated together:

```typescript
mergeAdjacentUnits(units: TranslatableUnit[]): TranslatableUnit[] {
  // Group text nodes by their closest block-level parent
  // This keeps sentences together even if they span multiple inline elements
}
```

---

## Phase 2: Translation Applier Rewrite

### 2.1 Preserve DOM Structure

**Problem:** Current `element.textContent = translation` destroys child elements.

**Solution:** Replace only text node content, preserve structure.

```typescript
class StructurePreservingApplier {
  apply(unit: TranslatableUnit, translation: string): void {
    if (unit.textNodes.length === 1) {
      // Simple case: single text node
      this.replaceTextNode(unit.textNodes[0], translation);
    } else {
      // Complex case: multiple text nodes
      this.applyToMultipleNodes(unit, translation);
    }
  }
  
  private replaceTextNode(node: Text, text: string): void {
    // Store original for revert
    this.originals.set(node, node.textContent);
    node.textContent = text;
  }
  
  private applyToMultipleNodes(unit: TranslatableUnit, translation: string): void {
    // Strategy: Put all translation in first node, clear others
    // Or: Proportionally distribute based on original lengths
  }
}
```

### 2.2 Handle Mixed Content

For elements like `<p>Hello <strong>world</strong>!</p>`:

```typescript
// Option 1: Translate as single unit, preserve structure
// "Hello world!" -> "你好世界！"
// Result: <p>你好 <strong>世界</strong>！</p>

// Option 2: Translate each text node separately (simpler but less accurate)
// "Hello " -> "你好 "
// "world" -> "世界"
// "!" -> "！"
```

---

## Phase 3: Improved Element Filtering

### 3.1 Exclusion Rules (Blacklist Approach)

Instead of whitelist, use blacklist:

```typescript
private excludeSelectors = [
  'script', 'style', 'noscript', 'iframe', 'svg', 'canvas',
  'video', 'audio', 'code', 'pre', 'kbd', 'samp', 'var',
  '[translate="no"]',
  '[data-translate="false"]',
  '.notranslate',
  '[contenteditable="true"]',  // User input areas
  'input', 'textarea',          // Form inputs
  '[aria-hidden="true"]',       // Hidden content
];

isInExcludedElement(node: Node): boolean {
  let current = node.parentElement;
  while (current) {
    if (current.matches(this.excludeSelectors.join(','))) {
      return true;
    }
    current = current.parentElement;
  }
  return false;
}
```

### 3.2 Visibility Check

Only translate visible content:

```typescript
isVisible(element: HTMLElement): boolean {
  const style = window.getComputedStyle(element);
  return (
    style.display !== 'none' &&
    style.visibility !== 'hidden' &&
    style.opacity !== '0' &&
    element.offsetParent !== null
  );
}
```

---

## Phase 4: Dynamic Content Support

### 4.1 Integrate MutationObserver

```typescript
class DynamicContentHandler {
  private observer: MutationObserver;
  private pendingNodes: Set<Node> = new Set();
  private debounceTimer: number | null = null;
  
  start(root: HTMLElement, onNewContent: (nodes: Node[]) => void): void {
    this.observer = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        if (mutation.type === 'childList') {
          mutation.addedNodes.forEach(node => {
            if (this.isTranslatable(node)) {
              this.pendingNodes.add(node);
            }
          });
        }
      }
      this.scheduleProcessing(onNewContent);
    });
    
    this.observer.observe(root, {
      childList: true,
      subtree: true,
    });
  }
  
  private scheduleProcessing(callback: (nodes: Node[]) => void): void {
    if (this.debounceTimer) clearTimeout(this.debounceTimer);
    this.debounceTimer = window.setTimeout(() => {
      const nodes = Array.from(this.pendingNodes);
      this.pendingNodes.clear();
      callback(nodes);
    }, 100);
  }
}
```

### 4.2 Intersection Observer for Lazy Content

```typescript
class ViewportAwareTranslator {
  private intersectionObserver: IntersectionObserver;
  
  observeElement(element: HTMLElement): void {
    this.intersectionObserver.observe(element);
  }
  
  private handleIntersection(entries: IntersectionObserverEntry[]): void {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        this.translateElement(entry.target as HTMLElement);
        this.intersectionObserver.unobserve(entry.target);
      }
    });
  }
}
```

---

## Phase 5: Performance Optimization

### 5.1 Batch Translation Requests

```typescript
class BatchTranslator {
  private queue: TranslatableUnit[] = [];
  private batchSize = 20;
  private batchDelay = 50; // ms
  
  async add(unit: TranslatableUnit): Promise<void> {
    this.queue.push(unit);
    if (this.queue.length >= this.batchSize) {
      await this.flush();
    }
  }
  
  async flush(): Promise<void> {
    const batch = this.queue.splice(0, this.batchSize);
    const texts = batch.map(u => u.originalText);
    const translations = await this.translateBatch(texts);
    batch.forEach((unit, i) => {
      this.applier.apply(unit, translations[i]);
    });
  }
}
```

### 5.2 Page-Level Language Detection

```typescript
class PageLanguageCache {
  private detectedLanguage: string | null = null;
  
  getPageLanguage(): string {
    if (this.detectedLanguage) return this.detectedLanguage;
    
    // Check HTML lang attribute first
    const htmlLang = document.documentElement.lang;
    if (htmlLang) {
      this.detectedLanguage = this.normalizeLanguage(htmlLang);
      return this.detectedLanguage;
    }
    
    // Sample page content for detection
    const sampleText = this.getSampleText();
    this.detectedLanguage = this.detector.detect(sampleText).detected;
    return this.detectedLanguage;
  }
}
```

---

## Implementation Order

| Phase | Priority | Estimated Effort | Dependencies |
|-------|----------|------------------|--------------|
| Phase 1 | **Critical** | 2-3 days | None |
| Phase 2 | **Critical** | 1-2 days | Phase 1 |
| Phase 3 | High | 1 day | Phase 1 |
| Phase 4 | Medium | 1-2 days | Phase 1, 2 |
| Phase 5 | Medium | 1 day | Phase 1 |

---

## File Changes Required

### New Files
- `src/core/text-node-extractor.ts` - New extraction logic
- `src/core/translatable-unit.ts` - Unit type definitions
- `src/core/structure-preserving-applier.ts` - New applier
- `src/core/dynamic-content-handler.ts` - MutationObserver integration

### Modified Files
- `src/core/page-translation-manager.ts` - Use new extractor/applier
- `src/utils/text-extractor.ts` - Deprecate or remove
- `src/core/translation-applier.ts` - Deprecate or remove

### Tests
- `tests/text-node-extractor.test.ts`
- `tests/structure-preserving-applier.test.ts`
- `tests/dynamic-content.test.ts`

---

## Success Metrics

1. **Coverage:** >95% of visible text captured (vs current ~30%)
2. **Structure:** Zero DOM structure destruction
3. **Performance:** <100ms for initial extraction on typical page
4. **Dynamic:** New content translated within 200ms of appearing

---

## Rollback Plan

Keep old implementation available behind feature flag:

```typescript
const useNewExtractor = settings.experimentalExtractor ?? true;
const extractor = useNewExtractor 
  ? new TextNodeExtractor() 
  : new TextExtractor();
```

---

## Implementation Status: ✅ COMPLETED

### Completed Components

| Component | File | Status | Tests |
|-----------|------|--------|-------|
| TranslatableUnit | `src/core/translatable-unit.ts` | ✅ Done | - |
| TextNodeExtractor | `src/core/text-node-extractor.ts` | ✅ Done | 27 tests |
| StructurePreservingApplier | `src/core/structure-preserving-applier.ts` | ✅ Done | 12 tests |
| DynamicContentHandler | `src/core/dynamic-content-handler.ts` | ✅ Done | - |
| PageLanguageCache | `src/core/page-language-cache.ts` | ✅ Done | 18 tests |
| PageTranslationManagerV2 | `src/core/page-translation-manager-v2.ts` | ✅ Done | - |

### Key Improvements Implemented

1. **Text Node-Based Extraction**: Uses `NodeFilter.SHOW_TEXT` to capture all visible text
2. **Blacklist Approach**: Excludes specific elements instead of whitelisting tags
3. **DOM Structure Preservation**: Translations don't destroy child elements
4. **Dynamic Content Support**: MutationObserver + IntersectionObserver integration
5. **Page-Level Language Caching**: Efficient language detection with proper ordering
6. **Visibility Checks**: Only translates visible content

### Build Verification

```
✔ Built extension in 842 ms
Σ Total size: 182.88 kB
```

### Test Results

- `text-node-extractor.test.ts`: 27 tests ✅
- `structure-preserving-applier.test.ts`: 12 tests ✅
- `page-language-cache.test.ts`: 18 tests ✅
