export class TextExtractor {
  private excludeTags = [
    'script', 'style', 'noscript', 'iframe', 'svg', 'canvas',
    'video', 'audio', 'code', 'pre', 'kbd', 'samp'
  ];

  private containerTags = [
    'p', 'div', 'section', 'article', 'aside', 'li', 'td', 'th',
    'dt', 'dd', 'figcaption', 'caption', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6'
  ];

  extract(root: HTMLElement = document.body): HTMLElement[] {
    const elements: HTMLElement[] = [];
    const processed = new Set<HTMLElement>();

    const walker = document.createTreeWalker(
      root,
      NodeFilter.SHOW_ELEMENT,
      {
        acceptNode: (node) => {
          if (node instanceof HTMLElement) {
            if (this.shouldExcludeElement(node)) {
              return NodeFilter.FILTER_REJECT;
            }

            if (this.isTranslationContainer(node)) {
              return NodeFilter.FILTER_ACCEPT;
            }
          }

          return NodeFilter.FILTER_REJECT;
        }
      }
    );

    let node;
    while ((node = walker.nextNode())) {
      if (node instanceof HTMLElement) {
        const text = this.getElementText(node);

        if (!text || text.length < 2) {
          continue;
        }

        if (processed.has(node)) {
          continue;
        }

        const isContained = this.isContainedInProcessed(node, processed, root);
        if (isContained) {
          continue;
        }

        processed.add(node);
        elements.push(node);
      }
    }

    return elements;
  }

  shouldExcludeElement(element: HTMLElement): boolean {
    const tag = element.tagName.toLowerCase();

    if (this.excludeTags.includes(tag)) {
      return true;
    }

    if (element.getAttribute('translate') === 'no') {
      return true;
    }

    if (element.getAttribute('data-translate') === 'false') {
      return true;
    }

    const className = element.className;
    if (typeof className === 'string' && className.includes('notranslate')) {
      return true;
    }

    return false;
  }

  isTranslationContainer(element: HTMLElement): boolean {
    const tag = element.tagName.toLowerCase();

    if (!this.containerTags.includes(tag)) {
      return false;
    }

    const text = this.getElementText(element);

    if (text.length < 2) {
      return false;
    }

    return true;
  }

  isContainedInProcessed(element: HTMLElement, processed: Set<HTMLElement>, root: HTMLElement): boolean {
    let current = element.parentElement;
    let isContained = false;

    while (current && current !== root && !isContained) {
      if (processed.has(current)) {
        isContained = true;
      }
      current = current.parentElement;
    }

    return isContained;
  }

  getElementText(element: HTMLElement): string {
    const text = element.textContent?.trim() || '';
    return this.normalizeWhitespace(text);
  }

  normalizeWhitespace(text: string): string {
    return text
      .replace(/\s+/g, ' ')
      .trim();
  }
}
