import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { StructurePreservingApplier } from '../../../src/core/structure-preserving-applier';
import { createTranslatableUnit } from '../../../src/core/translatable-unit';

describe('StructurePreservingApplier', () => {
  let applier: StructurePreservingApplier;
  let container: HTMLElement;

  beforeEach(() => {
    applier = new StructurePreservingApplier();
    container = document.createElement('div');
    document.body.appendChild(container);
  });

  afterEach(() => {
    container.remove();
  });

  describe('apply', () => {
    it('should apply translation to single text node', () => {
      container.innerHTML = '<p>Hello World</p>';
      const p = container.querySelector('p')!;
      const textNode = p.firstChild as Text;
      const unit = createTranslatableUnit([textNode], p);
      
      applier.apply(unit, '你好世界');
      
      expect(p.textContent).toBe('你好世界');
    });

    it('should preserve DOM structure with nested elements', () => {
      container.innerHTML = '<p>Hello <strong>bold</strong> world</p>';
      const p = container.querySelector('p')!;
      const strong = p.querySelector('strong')!;
      
      // Get text nodes
      const textNodes: Text[] = [];
      const walker = document.createTreeWalker(p, NodeFilter.SHOW_TEXT);
      let node;
      while ((node = walker.nextNode())) {
        textNodes.push(node as Text);
      }
      
      const unit = createTranslatableUnit(textNodes, p);
      applier.apply(unit, '你好 粗体 世界');
      
      // Structure should be preserved
      expect(p.querySelector('strong')).toBe(strong);
      expect(p.innerHTML).toContain('<strong>');
    });

    it('should mark unit as translated', () => {
      container.innerHTML = '<p>Hello</p>';
      const p = container.querySelector('p')!;
      const textNode = p.firstChild as Text;
      const unit = createTranslatableUnit([textNode], p);
      
      expect(unit.isTranslated).toBe(false);
      
      applier.apply(unit, '你好');
      
      expect(unit.isTranslated).toBe(true);
      expect(unit.translatedText).toBe('你好');
    });
  });

  describe('revert', () => {
    it('should revert translation to original text', () => {
      container.innerHTML = '<p>Hello World</p>';
      const p = container.querySelector('p')!;
      const textNode = p.firstChild as Text;
      const unit = createTranslatableUnit([textNode], p);
      
      applier.apply(unit, '你好世界');
      expect(p.textContent).toBe('你好世界');
      
      applier.revert(unit);
      expect(p.textContent).toBe('Hello World');
    });

    it('should mark unit as not translated after revert', () => {
      container.innerHTML = '<p>Hello</p>';
      const p = container.querySelector('p')!;
      const textNode = p.firstChild as Text;
      const unit = createTranslatableUnit([textNode], p);
      
      applier.apply(unit, '你好');
      expect(unit.isTranslated).toBe(true);
      
      applier.revert(unit);
      expect(unit.isTranslated).toBe(false);
      expect(unit.translatedText).toBeUndefined();
    });
  });

  describe('revertAll', () => {
    it('should revert all translations', () => {
      container.innerHTML = `
        <p id="p1">First</p>
        <p id="p2">Second</p>
      `;
      
      const p1 = container.querySelector('#p1')!;
      const p2 = container.querySelector('#p2')!;
      
      const unit1 = createTranslatableUnit([p1.firstChild as Text], p1 as HTMLElement);
      const unit2 = createTranslatableUnit([p2.firstChild as Text], p2 as HTMLElement);
      
      applier.apply(unit1, '第一');
      applier.apply(unit2, '第二');
      
      expect(p1.textContent).toBe('第一');
      expect(p2.textContent).toBe('第二');
      
      applier.revertAll();
      
      expect(p1.textContent).toBe('First');
      expect(p2.textContent).toBe('Second');
    });
  });

  describe('translation badges', () => {
    it('should add translation badge', () => {
      container.innerHTML = '<p>Hello</p>';
      const p = container.querySelector('p')!;
      
      applier.addTranslationBadge(p);
      
      const badge = p.querySelector('.at-translation-badge');
      expect(badge).not.toBeNull();
    });

    it('should not add duplicate badges', () => {
      container.innerHTML = '<p>Hello</p>';
      const p = container.querySelector('p')!;
      
      applier.addTranslationBadge(p);
      applier.addTranslationBadge(p);
      
      const badges = p.querySelectorAll('.at-translation-badge');
      expect(badges.length).toBe(1);
    });

    it('should remove translation badge', () => {
      container.innerHTML = '<p>Hello</p>';
      const p = container.querySelector('p')!;
      
      applier.addTranslationBadge(p);
      expect(p.querySelector('.at-translation-badge')).not.toBeNull();
      
      applier.removeTranslationBadge(p);
      expect(p.querySelector('.at-translation-badge')).toBeNull();
    });

    it('should clear all badges', () => {
      container.innerHTML = `
        <p id="p1">First</p>
        <p id="p2">Second</p>
      `;
      
      const p1 = container.querySelector('#p1')!;
      const p2 = container.querySelector('#p2')!;
      
      applier.addTranslationBadge(p1);
      applier.addTranslationBadge(p2);
      
      applier.clearBadges();
      
      expect(p1.querySelector('.at-translation-badge')).toBeNull();
      expect(p2.querySelector('.at-translation-badge')).toBeNull();
    });
  });

  describe('getTranslatedCount', () => {
    it('should return correct count of translated units', () => {
      container.innerHTML = `
        <p id="p1">First</p>
        <p id="p2">Second</p>
      `;
      
      const p1 = container.querySelector('#p1')!;
      const p2 = container.querySelector('#p2')!;
      
      const unit1 = createTranslatableUnit([p1.firstChild as Text], p1 as HTMLElement);
      const unit2 = createTranslatableUnit([p2.firstChild as Text], p2 as HTMLElement);
      
      expect(applier.getTranslatedCount()).toBe(0);
      
      applier.apply(unit1, '第一');
      expect(applier.getTranslatedCount()).toBe(1);
      
      applier.apply(unit2, '第二');
      expect(applier.getTranslatedCount()).toBe(2);
      
      applier.revert(unit1);
      expect(applier.getTranslatedCount()).toBe(1);
    });
  });

  describe('isTranslated', () => {
    it('should correctly report translation status', () => {
      container.innerHTML = '<p>Hello</p>';
      const p = container.querySelector('p')!;
      const textNode = p.firstChild as Text;
      const unit = createTranslatableUnit([textNode], p);
      
      expect(applier.isTranslated(unit.id)).toBe(false);
      
      applier.apply(unit, '你好');
      expect(applier.isTranslated(unit.id)).toBe(true);
      
      applier.revert(unit);
      expect(applier.isTranslated(unit.id)).toBe(false);
    });
  });
});
