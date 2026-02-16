import { TranslatableUnit } from './translatable-unit';

/**
 * Stores original text content for revert functionality.
 */
interface OriginalContent {
  node: Text;
  text: string;
}

/**
 * StructurePreservingApplier - Applies translations while preserving DOM structure.
 * 
 * Unlike the original TranslationApplier that used element.textContent (which destroys
 * child elements), this applier only modifies text nodes directly, preserving all
 * DOM structure including links, formatting, and interactive elements.
 */
export class StructurePreservingApplier {
  /** Map of unit IDs to their original content for revert */
  private originals: Map<string, OriginalContent[]> = new Map();
  
  /** Map of translated units */
  private translatedUnits: Map<string, TranslatableUnit> = new Map();
  
  /**
   * Applies a translation to a translatable unit.
   */
  apply(unit: TranslatableUnit, translation: string): void {
    if (unit.textNodes.length === 0) {
      return;
    }
    
    // Save original content for revert
    this.saveOriginal(unit);
    
    if (unit.textNodes.length === 1) {
      // Simple case: single text node
      this.applySingleNode(unit.textNodes[0], translation);
    } else {
      // Complex case: multiple text nodes
      this.applyMultipleNodes(unit, translation);
    }
    
    // Mark unit as translated
    unit.translatedText = translation;
    unit.isTranslated = true;
    this.translatedUnits.set(unit.id, unit);
  }
  
  /**
   * Applies translation to a single text node.
   */
  private applySingleNode(node: Text, translation: string): void {
    node.textContent = translation;
  }
  
  /**
   * Applies translation to multiple text nodes.
   * 
   * Strategy: Distribute translation proportionally based on original text lengths,
   * or put all content in the first node if distribution doesn't make sense.
   */
  private applyMultipleNodes(unit: TranslatableUnit, translation: string): void {
    const nodes = unit.textNodes;
    const originalTexts = nodes.map((n) => n.textContent || '');
    const totalOriginalLength = originalTexts.reduce((sum, t) => sum + t.length, 0);
    
    if (totalOriginalLength === 0) {
      // Edge case: no original text
      if (nodes.length > 0) {
        nodes[0].textContent = translation;
      }
      return;
    }
    
    // Check if we should distribute or consolidate
    // If the translation is significantly different in structure, consolidate
    const shouldDistribute = this.shouldDistributeTranslation(originalTexts, translation);
    
    if (shouldDistribute) {
      // Distribute proportionally
      let remainingTranslation = translation;
      
      for (let i = 0; i < nodes.length; i++) {
        const originalLength = originalTexts[i].length;
        const proportion = originalLength / totalOriginalLength;
        
        if (i === nodes.length - 1) {
          // Last node gets the remainder
          nodes[i].textContent = remainingTranslation;
        } else {
          // Calculate proportional length
          const targetLength = Math.round(translation.length * proportion);
          
          // Find a good break point (word boundary)
          const breakPoint = this.findBreakPoint(remainingTranslation, targetLength);
          
          nodes[i].textContent = remainingTranslation.substring(0, breakPoint);
          remainingTranslation = remainingTranslation.substring(breakPoint).trimStart();
        }
      }
    } else {
      // Consolidate: put all translation in first node, clear others
      nodes[0].textContent = translation;
      
      for (let i = 1; i < nodes.length; i++) {
        nodes[i].textContent = '';
      }
    }
  }
  
  /**
   * Determines if translation should be distributed across nodes.
   */
  private shouldDistributeTranslation(originalTexts: string[], translation: string): boolean {
    // If there are only 2 nodes and they're short, consolidate
    if (originalTexts.length === 2) {
      const totalLength = originalTexts.reduce((sum, t) => sum + t.length, 0);
      if (totalLength < 50) {
        return false;
      }
    }
    
    // If translation is much shorter than original, consolidate
    const totalOriginal = originalTexts.reduce((sum, t) => sum + t.length, 0);
    if (translation.length < totalOriginal * 0.3) {
      return false;
    }
    
    // Default: distribute
    return true;
  }
  
  /**
   * Finds a good break point in the text (preferably at word boundary).
   */
  private findBreakPoint(text: string, targetIndex: number): number {
    if (targetIndex >= text.length) {
      return text.length;
    }
    
    // Look for space within 20 characters of target
    const searchStart = Math.max(0, targetIndex - 10);
    const searchEnd = Math.min(text.length, targetIndex + 10);
    
    // Search forward first
    for (let i = targetIndex; i < searchEnd; i++) {
      if (text[i] === ' ' || text[i] === '\n') {
        return i + 1;
      }
    }
    
    // Search backward
    for (let i = targetIndex - 1; i >= searchStart; i--) {
      if (text[i] === ' ' || text[i] === '\n') {
        return i + 1;
      }
    }
    
    // No good break point found, use target index
    return targetIndex;
  }
  
  /**
   * Saves the original content of a unit for later revert.
   */
  private saveOriginal(unit: TranslatableUnit): void {
    if (this.originals.has(unit.id)) {
      // Already saved
      return;
    }
    
    const contents: OriginalContent[] = unit.textNodes.map((node) => ({
      node,
      text: node.textContent || '',
    }));
    
    this.originals.set(unit.id, contents);
  }
  
  /**
   * Reverts a translated unit to its original content.
   */
  revert(unit: TranslatableUnit): void {
    const contents = this.originals.get(unit.id);
    
    if (!contents) {
      return;
    }
    
    for (const content of contents) {
      if (content.node.parentNode) {
        content.node.textContent = content.text;
      }
    }
    
    unit.isTranslated = false;
    unit.translatedText = undefined;
    
    this.originals.delete(unit.id);
    this.translatedUnits.delete(unit.id);
    
  }
  
  /**
   * Reverts all translated units.
   */
  revertAll(): void {
    for (const [unitId, contents] of this.originals) {
      for (const content of contents) {
        if (content.node.parentNode) {
          content.node.textContent = content.text;
        }
      }
      
      const unit = this.translatedUnits.get(unitId);
      if (unit) {
        unit.isTranslated = false;
        unit.translatedText = undefined;
      }
    }
    
    this.originals.clear();
    this.translatedUnits.clear();
  }
  
  /**
   * Gets the count of translated units.
   */
  getTranslatedCount(): number {
    return this.translatedUnits.size;
  }
  
  /**
   * Checks if a unit has been translated.
   */
  isTranslated(unitId: string): boolean {
    return this.translatedUnits.has(unitId);
  }
  
  /**
   * Gets all translated units.
   */
  getTranslatedUnits(): TranslatableUnit[] {
    return Array.from(this.translatedUnits.values());
  }
}
