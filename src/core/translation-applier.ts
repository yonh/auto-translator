export class TranslationApplier {
  private translatedNodes: Map<Node, string> = new Map();

  apply(node: Node, translation: string): void {
    if (node.nodeType === Node.TEXT_NODE) {
      this.saveOriginalText(node);
      node.textContent = translation;
    } else if (node.nodeType === Node.ELEMENT_NODE) {
      const element = node as Element;
      const textNode = this.findTextNode(element);
      if (textNode) {
        this.apply(textNode, translation);
      } else {
        this.saveOriginalText(node);
        element.textContent = translation;
      }
    }
  }

  applyBatch(translations: Map<Node, string>): void {
    for (const [node, translation] of translations.entries()) {
      this.apply(node, translation);
    }
  }

  revert(node: Node): void {
    const originalText = this.translatedNodes.get(node);
    if (originalText !== undefined) {
      node.textContent = originalText;
      this.translatedNodes.delete(node);
    }
  }

  revertAll(): void {
    for (const node of this.translatedNodes.keys()) {
      this.revert(node);
    }
  }

  private saveOriginalText(node: Node): void {
    if (!this.translatedNodes.has(node) && node.textContent) {
      this.translatedNodes.set(node, node.textContent);
    }
  }

  private findTextNode(element: Element): Text | null {
    for (const child of element.childNodes) {
      if (child.nodeType === Node.TEXT_NODE && child.textContent?.trim()) {
        return child as Text;
      }
      if (child.nodeType === Node.ELEMENT_NODE) {
        const text = this.findTextNode(child as Element);
        if (text) return text;
      }
    }
    return null;
  }
}
