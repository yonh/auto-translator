import { TextExtractor } from '../../src/utils/text-extractor';
import { LanguageDetector } from '../../src/services/language-detector';

/**
 * Creates a test HTML structure
 */
export function createTestHTML(html: string): HTMLElement {
  const div = document.createElement('div');
  div.innerHTML = html;
  return div;
}

/**
 * Creates a DOM tree for testing text extraction
 */
export function createTestDOM(): HTMLElement {
  return createTestHTML(`
    <div id="root">
      <h1>Hello World</h1>
      <p>This is a test paragraph with <strong>bold text</strong>.</p>
      <div class="container">
        <span class="highlight">Highlighted text</span>
      </div>
      <ul>
        <li>Item 1</li>
        <li>Item 2</li>
      </ul>
      <script>console.log("should be excluded");</script>
      <style>.css { display: none; }</style>
      <div data-translate="false">Should not translate</div>
      <div class="notranslate">Also should not translate</div>
    </div>
  `);
}

/**
 * Mock browser storage for testing
 */
export function createMockStorage() {
  const store = new Map<string, any>();

  return {
    get: (keys: string | string[] | Record<string, any> | null): Promise<any> => {
      if (keys === null) {
        return Promise.resolve(Object.fromEntries(store));
      }
      if (typeof keys === 'string') {
        return Promise.resolve({ [keys]: store.get(keys) });
      }
      if (Array.isArray(keys)) {
        const result: Record<string, any> = {};
        keys.forEach(key => {
          result[key] = store.get(key);
        });
        return Promise.resolve(result);
      }
      if (typeof keys === 'object') {
        const result: Record<string, any> = {};
        Object.keys(keys).forEach(key => {
          result[key] = store.has(key) ? store.get(key) : (keys as any)[key];
        });
        return Promise.resolve(result);
      }
      return Promise.resolve({});
    },
    set: (items: Record<string, any>): Promise<void> => {
      Object.entries(items).forEach(([key, value]) => {
        store.set(key, value);
      });
      return Promise.resolve();
    },
    remove: (keys: string | string[]): Promise<void> => {
      const keysArray = Array.isArray(keys) ? keys : [keys];
      keysArray.forEach(key => store.delete(key));
      return Promise.resolve();
    },
    clear: (): Promise<void> => {
      store.clear();
      return Promise.resolve();
    }
  };
}

/**
 * Mock OpenAI API response
 */
export function createMockOpenAIResponse(text: string, translatedText: string) {
  return {
    choices: [
      {
        message: {
          content: translatedText,
          role: 'assistant'
        },
        finish_reason: 'stop'
      }
    ],
    usage: {
      prompt_tokens: text.length / 4,
      completion_tokens: translatedText.length / 4,
      total_tokens: (text.length + translatedText.length) / 4
    }
  };
}

/**
 * Generate test translation data
 */
export function generateTestTranslations(count: number): Array<{ text: string; source: string; target: string }> {
  const data: Array<{ text: string; source: string; target: string }> = [];

  for (let i = 0; i < count; i++) {
    data.push({
      text: `Test text ${i + 1} with some content`,
      source: 'en',
      target: 'zh-CN'
    });
  }

  return data;
}

/**
 * Extract text elements from HTML string using TextExtractor
 */
export function extractTextElements(html: string): HTMLElement[] {
  const extractor = new TextExtractor();
  const container = createTestHTML(html);
  return extractor.extract(container);
}

/**
 * Detect language from text using LanguageDetector
 */
export function detectLanguageFromText(text: string): string {
  const detector = new LanguageDetector();
  const result = detector.detect(text);
  return result.detected;
}

/**
 * Wait for specified milliseconds (for async testing)
 */
export function wait(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Create a promise that can be resolved externally
 */
export function createDeferred<T>() {
  let resolve: (value: T) => void;
  let reject: (reason?: any) => void;
  const promise = new Promise<T>((res, rej) => {
    resolve = res;
    reject = rej;
  });

  return {
    promise,
    resolve: resolve!,
    reject: reject!
  };
}
