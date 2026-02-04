import {
  TranslatableUnit,
  createTranslatableUnit,
  getElementXPath,
} from './translatable-unit';

/**
 * Configuration for the text node extractor.
 */
export interface TextNodeExtractorConfig {
  /** Minimum text length to consider for translation */
  minTextLength: number;
  
  /** Whether to merge adjacent text nodes */
  mergeAdjacentNodes: boolean;
  
  /** Custom exclude selectors */
  customExcludeSelectors: string[];
}

/**
 * Default configuration for the extractor.
 */
const DEFAULT_CONFIG: TextNodeExtractorConfig = {
  minTextLength: 2,
  mergeAdjacentNodes: true,
  customExcludeSelectors: [],
};

/**
 * TextNodeExtractor - Extracts translatable text nodes from the DOM.
 * 
 * This is a complete rewrite of the original TextExtractor that:
 * 1. Uses text nodes instead of element-based extraction
 * 2. Uses a blacklist approach instead of whitelist
 * 3. Properly handles all visible text content
 */
export class TextNodeExtractor {
  private config: TextNodeExtractorConfig;
  
  /** Elements that should never be translated */
  private readonly excludeSelectors = [
    // Script and style elements
    'script',
    'style',
    'noscript',
    
    // Media and embedded content
    'iframe',
    'svg',
    'canvas',
    'video',
    'audio',
    'object',
    'embed',
    
    // Code elements
    'code',
    'pre',
    'kbd',
    'samp',
    'var',
    
    // Form inputs (editable content)
    'input',
    'textarea',
    'select',
    
    // Explicit no-translate markers
    '[translate="no"]',
    '[data-translate="false"]',
    '.notranslate',
    
    // Editable content
    '[contenteditable="true"]',
    
    // Hidden content
    '[aria-hidden="true"]',
    '[hidden]',
    
    // Common framework-specific exclusions
    '.sr-only',
    '.visually-hidden',
  ];
  
  /** Block-level elements that define translation boundaries */
  private readonly blockElements = new Set([
    'address', 'article', 'aside', 'blockquote', 'dd', 'div', 'dl', 'dt',
    'fieldset', 'figcaption', 'figure', 'footer', 'form', 'h1', 'h2', 'h3',
    'h4', 'h5', 'h6', 'header', 'hr', 'li', 'main', 'nav', 'ol', 'p', 'pre',
    'section', 'table', 'tbody', 'td', 'tfoot', 'th', 'thead', 'tr', 'ul',
  ]);
  
  constructor(config: Partial<TextNodeExtractorConfig> = {}) {
    this.config = { ...DEFAULT_CONFIG, ...config };
  }
  
  /**
   * Extracts all translatable units from the given root element.
   */
  extract(root: HTMLElement = document.body): TranslatableUnit[] {
    const textNodes = this.collectTextNodes(root);
    const units = this.groupTextNodes(textNodes);
    return units.filter((unit) => unit.originalText.length >= this.config.minTextLength);
  }
  
  /**
   * Collects all visible text nodes from the DOM tree.
   */
  private collectTextNodes(root: HTMLElement): Text[] {
    const textNodes: Text[] = [];
    const excludeSelector = this.getExcludeSelector();
    
    const walker = document.createTreeWalker(
      root,
      NodeFilter.SHOW_TEXT,
      {
        acceptNode: (node: Text) => {
          // Check if text has meaningful content
          const text = node.textContent?.trim();
          if (!text || text.length < 1) {
            return NodeFilter.FILTER_REJECT;
          }
          
          // Check if node is in excluded element
          if (this.isInExcludedElement(node, excludeSelector)) {
            return NodeFilter.FILTER_REJECT;
          }
          
          // Check if node is visible
          if (!this.isVisible(node)) {
            return NodeFilter.FILTER_REJECT;
          }
          
          return NodeFilter.FILTER_ACCEPT;
        },
      }
    );
    
    let node: Text | null;
    while ((node = walker.nextNode() as Text | null)) {
      textNodes.push(node);
    }
    
    return textNodes;
  }
  
  /**
   * Groups text nodes into translatable units based on their common ancestors.
   */
  private groupTextNodes(textNodes: Text[]): TranslatableUnit[] {
    if (!this.config.mergeAdjacentNodes) {
      // Simple mode: each text node is its own unit
      return textNodes.map((node) => {
        const parent = this.findTranslationParent(node);
        return createTranslatableUnit([node], parent);
      });
    }
    
    // Advanced mode: group by block-level parent
    const groups = new Map<HTMLElement, Text[]>();
    
    for (const node of textNodes) {
      const blockParent = this.findBlockParent(node);
      if (!groups.has(blockParent)) {
        groups.set(blockParent, []);
      }
      groups.get(blockParent)!.push(node);
    }
    
    const units: TranslatableUnit[] = [];
    
    for (const [parent, nodes] of groups) {
      // Further split by inline boundaries if needed
      const subGroups = this.splitByInlineBoundaries(nodes, parent);
      
      for (const subGroup of subGroups) {
        if (subGroup.length > 0) {
          const unit = createTranslatableUnit(subGroup, parent);
          if (unit.originalText.trim().length > 0) {
            units.push(unit);
          }
        }
      }
    }
    
    return units;
  }
  
  /**
   * Splits text nodes by inline element boundaries.
   * This ensures that text in different inline contexts is translated separately.
   */
  private splitByInlineBoundaries(nodes: Text[], parent: HTMLElement): Text[][] {
    if (nodes.length <= 1) {
      return [nodes];
    }
    
    const groups: Text[][] = [];
    let currentGroup: Text[] = [];
    
    for (let i = 0; i < nodes.length; i++) {
      const node = nodes[i];
      currentGroup.push(node);
      
      // Check if there's a significant boundary before the next node
      if (i < nodes.length - 1) {
        const nextNode = nodes[i + 1];
        if (this.hasBoundaryBetween(node, nextNode, parent)) {
          groups.push(currentGroup);
          currentGroup = [];
        }
      }
    }
    
    if (currentGroup.length > 0) {
      groups.push(currentGroup);
    }
    
    return groups;
  }
  
  /**
   * Checks if there's a significant boundary between two text nodes.
   */
  private hasBoundaryBetween(node1: Text, node2: Text, commonParent: HTMLElement): boolean {
    // If they share the same parent element, no boundary
    if (node1.parentElement === node2.parentElement) {
      return false;
    }
    
    // Check if there's a block element between them
    const parent1 = node1.parentElement;
    const parent2 = node2.parentElement;
    
    if (!parent1 || !parent2) {
      return true;
    }
    
    // If either parent is a block element, there's a boundary
    if (this.blockElements.has(parent1.tagName.toLowerCase()) ||
        this.blockElements.has(parent2.tagName.toLowerCase())) {
      return true;
    }
    
    return false;
  }
  
  /**
   * Finds the nearest block-level parent element.
   */
  private findBlockParent(node: Text): HTMLElement {
    let current = node.parentElement;
    
    while (current) {
      if (this.blockElements.has(current.tagName.toLowerCase())) {
        return current;
      }
      current = current.parentElement;
    }
    
    return document.body;
  }
  
  /**
   * Finds the appropriate parent element for a text node.
   */
  private findTranslationParent(node: Text): HTMLElement {
    return node.parentElement || document.body;
  }
  
  /**
   * Checks if a node is inside an excluded element.
   */
  private isInExcludedElement(node: Node, excludeSelector: string): boolean {
    let current = node.parentElement;
    
    while (current) {
      try {
        if (current.matches(excludeSelector)) {
          return true;
        }
      } catch {
        // Invalid selector, skip
      }
      current = current.parentElement;
    }
    
    return false;
  }
  
  /**
   * Checks if a text node is visible.
   */
  private isVisible(node: Text): boolean {
    const parent = node.parentElement;
    if (!parent) {
      return false;
    }
    
    // Check computed style
    const style = window.getComputedStyle(parent);
    
    if (style.display === 'none') {
      return false;
    }
    
    if (style.visibility === 'hidden') {
      return false;
    }
    
    if (style.opacity === '0') {
      return false;
    }
    
    // Check if element has dimensions (not collapsed)
    // Note: offsetParent is null for hidden elements, but also for fixed/absolute positioned elements
    // So we use a combination of checks
    const rect = parent.getBoundingClientRect();
    if (rect.width === 0 && rect.height === 0) {
      // Could be a zero-size element, but text might still be visible via overflow
      // Be conservative and include it
    }
    
    return true;
  }
  
  /**
   * Gets the combined exclude selector string.
   */
  private getExcludeSelector(): string {
    const allSelectors = [
      ...this.excludeSelectors,
      ...this.config.customExcludeSelectors,
    ];
    return allSelectors.join(',');
  }
  
  /**
   * Extracts text from a specific element (for single-node translation).
   */
  extractFromElement(element: HTMLElement): TranslatableUnit | null {
    const textNodes = this.collectTextNodes(element);
    
    if (textNodes.length === 0) {
      return null;
    }
    
    const unit = createTranslatableUnit(textNodes, element);
    
    if (unit.originalText.length < this.config.minTextLength) {
      return null;
    }
    
    return unit;
  }
  
  /**
   * Updates the configuration.
   */
  updateConfig(config: Partial<TextNodeExtractorConfig>): void {
    this.config = { ...this.config, ...config };
  }
  
  /**
   * Checks if an element should be excluded from translation.
   */
  shouldExcludeElement(element: HTMLElement): boolean {
    const excludeSelector = this.getExcludeSelector();
    try {
      return element.matches(excludeSelector);
    } catch {
      return false;
    }
  }
}
