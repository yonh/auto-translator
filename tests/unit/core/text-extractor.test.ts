import { describe, it, expect, beforeEach } from 'vitest';
import { createTestHTML } from '../../helpers/test-utils';
import { TextExtractor } from '../../../src/utils/text-extractor';

describe('TextExtractor', () => {
  let extractor: TextExtractor;

  beforeEach(() => {
    extractor = new TextExtractor();
  });

  describe('shouldExcludeElement', () => {
    it('should exclude script tags', () => {
      const container = createTestHTML('<script>console.log("test");</script>');
      const script = container.querySelector('script') as HTMLElement;

      const result = extractor.shouldExcludeElement(script);

      expect(result).toBe(true);
    });

    it('should exclude style tags', () => {
      const container = createTestHTML('<style>.test { color: red; }</style>');
      const style = container.querySelector('style') as HTMLElement;

      const result = extractor.shouldExcludeElement(style);

      expect(result).toBe(true);
    });

    it('should exclude noscript tags', () => {
      const container = createTestHTML('<noscript>Javascript is disabled</noscript>');
      const noscript = container.querySelector('noscript') as HTMLElement;

      const result = extractor.shouldExcludeElement(noscript);

      expect(result).toBe(true);
    });

    it('should exclude iframe tags', () => {
      const container = createTestHTML('<iframe src="https://example.com"></iframe>');
      const iframe = container.querySelector('iframe') as HTMLElement;

      const result = extractor.shouldExcludeElement(iframe);

      expect(result).toBe(true);
    });

    it('should exclude svg tags', () => {
      const container = createTestHTML('<svg><circle cx="50" cy="50" r="40"/></svg>');
      const svg = container.querySelector('svg') as unknown as HTMLElement;

      const result = extractor.shouldExcludeElement(svg);

      expect(result).toBe(true);
    });

    it('should exclude canvas tags', () => {
      const container = createTestHTML('<canvas id="myCanvas"></canvas>');
      const canvas = container.querySelector('canvas') as HTMLElement;

      const result = extractor.shouldExcludeElement(canvas);

      expect(result).toBe(true);
    });

    it('should exclude video tags', () => {
      const container = createTestHTML('<video src="video.mp4"></video>');
      const video = container.querySelector('video') as HTMLElement;

      const result = extractor.shouldExcludeElement(video);

      expect(result).toBe(true);
    });

    it('should exclude audio tags', () => {
      const container = createTestHTML('<audio src="audio.mp3"></audio>');
      const audio = container.querySelector('audio') as HTMLElement;

      const result = extractor.shouldExcludeElement(audio);

      expect(result).toBe(true);
    });

    it('should exclude code tags', () => {
      const container = createTestHTML('<code>const x = 1;</code>');
      const code = container.querySelector('code') as HTMLElement;

      const result = extractor.shouldExcludeElement(code);

      expect(result).toBe(true);
    });

    it('should exclude pre tags', () => {
      const container = createTestHTML('<pre>code block</pre>');
      const pre = container.querySelector('pre') as HTMLElement;

      const result = extractor.shouldExcludeElement(pre);

      expect(result).toBe(true);
    });

    it('should exclude kbd tags', () => {
      const container = createTestHTML('<kbd>Ctrl+C</kbd>');
      const kbd = container.querySelector('kbd') as HTMLElement;

      const result = extractor.shouldExcludeElement(kbd);

      expect(result).toBe(true);
    });

    it('should exclude samp tags', () => {
      const container = createTestHTML('<samp>sample output</samp>');
      const samp = container.querySelector('samp') as HTMLElement;

      const result = extractor.shouldExcludeElement(samp);

      expect(result).toBe(true);
    });

    it('should exclude elements with translate="no" attribute', () => {
      const container = createTestHTML('<div translate="no">Do not translate</div>');
      const div = container.querySelector('div') as HTMLElement;

      const result = extractor.shouldExcludeElement(div);

      expect(result).toBe(true);
    });

    it('should exclude elements with data-translate="false" attribute', () => {
      const container = createTestHTML('<div data-translate="false">Do not translate</div>');
      const div = container.querySelector('div') as HTMLElement;

      const result = extractor.shouldExcludeElement(div);

      expect(result).toBe(true);
    });

    it('should exclude elements with .notranslate class', () => {
      const container = createTestHTML('<div class="notranslate">Do not translate</div>');
      const div = container.querySelector('div') as HTMLElement;

      const result = extractor.shouldExcludeElement(div);

      expect(result).toBe(true);
    });

    it('should include normal elements', () => {
      const container = createTestHTML('<p>This is a paragraph</p>');
      const p = container.querySelector('p') as HTMLElement;

      const result = extractor.shouldExcludeElement(p);

      expect(result).toBe(false);
    });

    it('should include div elements', () => {
      const container = createTestHTML('<div>Content here</div>');
      const div = container.querySelector('div') as HTMLElement;

      const result = extractor.shouldExcludeElement(div);

      expect(result).toBe(false);
    });
  });

  describe('isTranslationContainer', () => {
    it('should identify p tags as containers', () => {
      const container = createTestHTML('<p>This is text</p>');
      const p = container.querySelector('p') as HTMLElement;

      const result = extractor.isTranslationContainer(p);

      expect(result).toBe(true);
    });

    it('should identify div tags as containers', () => {
      const container = createTestHTML('<div>Content</div>');
      const div = container.querySelector('div') as HTMLElement;

      const result = extractor.isTranslationContainer(div);

      expect(result).toBe(true);
    });

    it('should identify section tags as containers', () => {
      const container = createTestHTML('<section>Section content</section>');
      const section = container.querySelector('section') as HTMLElement;

      const result = extractor.isTranslationContainer(section);

      expect(result).toBe(true);
    });

    it('should identify article tags as containers', () => {
      const container = createTestHTML('<article>Article content</article>');
      const article = container.querySelector('article') as HTMLElement;

      const result = extractor.isTranslationContainer(article);

      expect(result).toBe(true);
    });

    it('should identify li tags as containers', () => {
      const container = createTestHTML('<li>List item</li>');
      const li = container.querySelector('li') as HTMLElement;

      const result = extractor.isTranslationContainer(li);

      expect(result).toBe(true);
    });

    it('should identify td tags as containers', () => {
      const container = createTestHTML('<table><tr><td>Cell content</td></tr></table>');
      const td = container.querySelector('td') as HTMLElement;

      const result = extractor.isTranslationContainer(td);

      expect(result).toBe(true);
    });

    it('should identify h1-h6 tags as containers', () => {
      const container = createTestHTML('<h1>Heading 1</h1><h2>Heading 2</h2>');
      const h1 = container.querySelector('h1') as HTMLElement;
      const h2 = container.querySelector('h2') as HTMLElement;

      expect(extractor.isTranslationContainer(h1)).toBe(true);
      expect(extractor.isTranslationContainer(h2)).toBe(true);
    });

    it('should reject elements with insufficient text', () => {
      const container = createTestHTML('<p>  </p>');
      const p = container.querySelector('p') as HTMLElement;

      const result = extractor.isTranslationContainer(p);

      expect(result).toBe(false);
    });

    it('should reject single character text', () => {
      const container = createTestHTML('<p>a</p>');
      const p = container.querySelector('p') as HTMLElement;

      const result = extractor.isTranslationContainer(p);

      expect(result).toBe(false);
    });

    it('should reject non-container tags', () => {
      const container = createTestHTML('<span>Not a container</span>');
      const span = container.querySelector('span') as HTMLElement;

      const result = extractor.isTranslationContainer(span);

      expect(result).toBe(false);
    });

    it('should reject a tags', () => {
      const container = createTestHTML('<a href="#">Link</a>');
      const a = container.querySelector('a') as HTMLElement;

      const result = extractor.isTranslationContainer(a);

      expect(result).toBe(false);
    });
  });

  describe('extract', () => {
    it('should avoid duplicates with nested elements', () => {
      const container = createTestHTML(`
        <div>
          <p>Outer paragraph</p>
          <div>
            <p>Inner paragraph</p>
          </div>
        </div>
      `);

      const elements = extractor.extract(container);

      const uniqueElements = new Set(elements);
      expect(uniqueElements.size).toBe(elements.length);
    });

    it('should skip elements with translate="no"', () => {
      const container = createTestHTML(`
        <div>
          <p>Translate this</p>
          <div translate="no">
            <p>Do not translate this</p>
          </div>
        </div>
      `);

      const elements = extractor.extract(container);

      expect(elements.length).toBe(1);
    });

    it('should skip elements with .notranslate class', () => {
      const container = createTestHTML(`
        <div>
          <p>Translate this</p>
          <div class="notranslate">
            <p>Do not translate this</p>
          </div>
        </div>
      `);

      const elements = extractor.extract(container);

      expect(elements.length).toBe(1);
    });

    it('should handle empty or whitespace-only content', () => {
      const container = createTestHTML('<div><p>  </p><p></p></div>');

      const elements = extractor.extract(container);

      expect(elements.length).toBe(0);
    });
  });

  describe('getElementText', () => {
    it('should extract text content from element', () => {
      const container = createTestHTML('<p>Hello World</p>');
      const p = container.querySelector('p') as HTMLElement;

      const text = extractor.getElementText(p);

      expect(text).toBe('Hello World');
    });

    it('should trim whitespace', () => {
      const container = createTestHTML('<p>  Hello World  </p>');
      const p = container.querySelector('p') as HTMLElement;

      const text = extractor.getElementText(p);

      expect(text).toBe('Hello World');
    });

    it('should handle nested elements', () => {
      const container = createTestHTML('<p>Hello <strong>World</strong></p>');
      const p = container.querySelector('p') as HTMLElement;

      const text = extractor.getElementText(p);

      expect(text).toBe('Hello World');
    });
  });

  describe('normalizeWhitespace', () => {
    it('should collapse multiple spaces', () => {
      const result = extractor.normalizeWhitespace('Hello    World');

      expect(result).toBe('Hello World');
    });

    it('should collapse tabs to single space', () => {
      const result = extractor.normalizeWhitespace('Hello\t\tWorld');

      expect(result).toBe('Hello World');
    });

    it('should collapse newlines to single space', () => {
      const result = extractor.normalizeWhitespace('Hello\n\nWorld');

      expect(result).toBe('Hello World');
    });

    it('should trim leading and trailing whitespace', () => {
      const result = extractor.normalizeWhitespace('  Hello World  ');

      expect(result).toBe('Hello World');
    });
  });
});
