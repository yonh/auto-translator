import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { TextNodeExtractor } from '../../../src/core/text-node-extractor';

describe('TextNodeExtractor', () => {
  let extractor: TextNodeExtractor;
  let container: HTMLElement;

  beforeEach(() => {
    extractor = new TextNodeExtractor();
    container = document.createElement('div');
    document.body.appendChild(container);
  });

  afterEach(() => {
    container.remove();
  });

  describe('extract', () => {
    it('should extract text from simple paragraph', () => {
      container.innerHTML = '<p>Hello World</p>';
      const units = extractor.extract(container);
      
      expect(units.length).toBe(1);
      expect(units[0].originalText).toBe('Hello World');
    });

    it('should extract text from multiple paragraphs', () => {
      container.innerHTML = `
        <p>First paragraph</p>
        <p>Second paragraph</p>
      `;
      const units = extractor.extract(container);
      
      expect(units.length).toBe(2);
      expect(units[0].originalText).toBe('First paragraph');
      expect(units[1].originalText).toBe('Second paragraph');
    });

    it('should extract text from span elements', () => {
      container.innerHTML = '<span>Text in span</span>';
      const units = extractor.extract(container);
      
      expect(units.length).toBe(1);
      expect(units[0].originalText).toBe('Text in span');
    });

    it('should extract text from links', () => {
      container.innerHTML = '<a href="#">Click here</a>';
      const units = extractor.extract(container);
      
      expect(units.length).toBe(1);
      expect(units[0].originalText).toBe('Click here');
    });

    it('should extract text from buttons', () => {
      container.innerHTML = '<button>Submit</button>';
      const units = extractor.extract(container);
      
      expect(units.length).toBe(1);
      expect(units[0].originalText).toBe('Submit');
    });

    it('should extract text from headings', () => {
      container.innerHTML = `
        <h1>Main Title</h1>
        <h2>Subtitle</h2>
      `;
      const units = extractor.extract(container);
      
      expect(units.length).toBe(2);
      expect(units[0].originalText).toBe('Main Title');
      expect(units[1].originalText).toBe('Subtitle');
    });

    it('should extract text from list items', () => {
      container.innerHTML = `
        <ul>
          <li>Item 1</li>
          <li>Item 2</li>
        </ul>
      `;
      const units = extractor.extract(container);
      
      expect(units.length).toBe(2);
      expect(units[0].originalText).toBe('Item 1');
      expect(units[1].originalText).toBe('Item 2');
    });

    it('should extract text from table cells', () => {
      container.innerHTML = `
        <table>
          <tr>
            <td>Cell 1</td>
            <td>Cell 2</td>
          </tr>
        </table>
      `;
      const units = extractor.extract(container);
      
      expect(units.length).toBe(2);
      expect(units[0].originalText).toBe('Cell 1');
      expect(units[1].originalText).toBe('Cell 2');
    });

    it('should handle nested inline elements', () => {
      container.innerHTML = '<p>Hello <strong>bold</strong> world</p>';
      const units = extractor.extract(container);
      
      // Should capture all text, possibly as merged units
      const allText = units.map(u => u.originalText).join(' ');
      expect(allText).toContain('Hello');
      expect(allText).toContain('bold');
      expect(allText).toContain('world');
    });

    it('should handle mixed content with links', () => {
      container.innerHTML = '<p>Click <a href="#">here</a> for more</p>';
      const units = extractor.extract(container);
      
      const allText = units.map(u => u.originalText).join(' ');
      expect(allText).toContain('Click');
      expect(allText).toContain('here');
      expect(allText).toContain('for more');
    });

    it('should not merge link text across different parents', () => {
      container.innerHTML = `
        <div class="nav-dropdown-column-content">
          <a href="/store/search?sort=bestselling&filter=onsale" class="navbar-item-dropdown-item">On Sale</a>
          <a href="/store/search?sort=bestselling" class="navbar-item-dropdown-item">Bestselling</a>
          <a href="/store/search?sort=newest&filter=new" class="navbar-item-dropdown-item">New Releases</a>
        </div>
      `;

      const units = extractor.extract(container);
      const texts = units.map(u => u.originalText);

      expect(texts).toContain('On Sale');
      expect(texts).toContain('Bestselling');
      expect(texts).toContain('New Releases');
      expect(texts.length).toBeGreaterThanOrEqual(3);
    });
  });

  describe('exclusion rules', () => {
    it('should exclude script elements', () => {
      container.innerHTML = `
        <p>Visible text</p>
        <script>console.log("hidden");</script>
      `;
      const units = extractor.extract(container);
      
      expect(units.length).toBe(1);
      expect(units[0].originalText).toBe('Visible text');
    });

    it('should exclude style elements', () => {
      container.innerHTML = `
        <p>Visible text</p>
        <style>.hidden { display: none; }</style>
      `;
      const units = extractor.extract(container);
      
      expect(units.length).toBe(1);
      expect(units[0].originalText).toBe('Visible text');
    });

    it('should exclude code elements', () => {
      container.innerHTML = `
        <p>Visible text</p>
        <code>const x = 1;</code>
      `;
      const units = extractor.extract(container);
      
      expect(units.length).toBe(1);
      expect(units[0].originalText).toBe('Visible text');
    });

    it('should exclude pre elements', () => {
      container.innerHTML = `
        <p>Visible text</p>
        <pre>Preformatted text</pre>
      `;
      const units = extractor.extract(container);
      
      expect(units.length).toBe(1);
      expect(units[0].originalText).toBe('Visible text');
    });

    it('should exclude elements with translate="no"', () => {
      container.innerHTML = `
        <p>Visible text</p>
        <p translate="no">Do not translate</p>
      `;
      const units = extractor.extract(container);
      
      expect(units.length).toBe(1);
      expect(units[0].originalText).toBe('Visible text');
    });

    it('should exclude elements with data-translate="false"', () => {
      container.innerHTML = `
        <p>Visible text</p>
        <p data-translate="false">Do not translate</p>
      `;
      const units = extractor.extract(container);
      
      expect(units.length).toBe(1);
      expect(units[0].originalText).toBe('Visible text');
    });

    it('should exclude elements with notranslate class', () => {
      container.innerHTML = `
        <p>Visible text</p>
        <p class="notranslate">Do not translate</p>
      `;
      const units = extractor.extract(container);
      
      expect(units.length).toBe(1);
      expect(units[0].originalText).toBe('Visible text');
    });

    it('should exclude input elements', () => {
      container.innerHTML = `
        <p>Visible text</p>
        <input type="text" value="Input value">
      `;
      const units = extractor.extract(container);
      
      expect(units.length).toBe(1);
      expect(units[0].originalText).toBe('Visible text');
    });

    it('should exclude textarea elements', () => {
      container.innerHTML = `
        <p>Visible text</p>
        <textarea>Textarea content</textarea>
      `;
      const units = extractor.extract(container);
      
      expect(units.length).toBe(1);
      expect(units[0].originalText).toBe('Visible text');
    });
  });

  describe('minimum text length', () => {
    it('should skip text shorter than minimum length', () => {
      container.innerHTML = `
        <p>A</p>
        <p>Hello World</p>
      `;
      const units = extractor.extract(container);
      
      expect(units.length).toBe(1);
      expect(units[0].originalText).toBe('Hello World');
    });

    it('should respect custom minimum length', () => {
      const customExtractor = new TextNodeExtractor({ minTextLength: 10 });
      container.innerHTML = `
        <p>Short</p>
        <p>This is a longer text</p>
      `;
      const units = customExtractor.extract(container);
      
      expect(units.length).toBe(1);
      expect(units[0].originalText).toBe('This is a longer text');
    });
  });

  describe('extractFromElement', () => {
    it('should extract from a specific element', () => {
      container.innerHTML = `
        <div id="target">Target text</div>
        <div>Other text</div>
      `;
      const target = container.querySelector('#target') as HTMLElement;
      const unit = extractor.extractFromElement(target);
      
      expect(unit).not.toBeNull();
      expect(unit!.originalText).toBe('Target text');
    });

    it('should return null for empty elements', () => {
      container.innerHTML = '<div id="target"></div>';
      const target = container.querySelector('#target') as HTMLElement;
      const unit = extractor.extractFromElement(target);
      
      expect(unit).toBeNull();
    });

    it('should return null for excluded elements', () => {
      container.innerHTML = '<code id="target">Code content</code>';
      const target = container.querySelector('#target') as HTMLElement;
      const unit = extractor.extractFromElement(target);
      
      expect(unit).toBeNull();
    });
  });

  describe('extractIncludingHidden', () => {
    it('should include text inside aria-hidden containers while extract excludes it', () => {
      container.innerHTML = `
        <div aria-hidden="true">
          <div>In-App Purchase (IAP)</div>
          <div>Elevate innovation and in-car experiences</div>
        </div>
      `;

      const visibleOnlyUnits = extractor.extract(container);
      const includingHiddenUnits = extractor.extractIncludingHidden(container);

      const visibleTexts = visibleOnlyUnits.map((u) => u.originalText);
      const hiddenTexts = includingHiddenUnits.map((u) => u.originalText);

      expect(visibleTexts).not.toContain('In-App Purchase (IAP)');
      expect(visibleTexts).not.toContain('Elevate innovation and in-car experiences');
      expect(hiddenTexts).toContain('In-App Purchase (IAP)');
      expect(hiddenTexts).toContain('Elevate innovation and in-car experiences');
    });
  });

  describe('context detection', () => {
    it('should detect heading context', () => {
      container.innerHTML = '<h1>Heading text</h1>';
      const units = extractor.extract(container);
      
      expect(units.length).toBe(1);
      expect(units[0].context.isHeading).toBe(true);
    });

    it('should detect link context', () => {
      container.innerHTML = '<a href="#">Link text</a>';
      const units = extractor.extract(container);
      
      expect(units.length).toBe(1);
      expect(units[0].context.isLink).toBe(true);
    });

    it('should detect button context', () => {
      container.innerHTML = '<button>Button text</button>';
      const units = extractor.extract(container);
      
      expect(units.length).toBe(1);
      expect(units[0].context.isButton).toBe(true);
    });
  });
});
