import webext from 'webextension-polyfill';
import { defineContentScript } from 'wxt/sandbox';
import { languageDetector } from '../src/services/language-detector';
import { getOpenAIService } from '../src/services/openai';
import { translationCache } from '../src/services/cache';
import '../src/utils/debug';

export default defineContentScript({
  matches: ['<all_urls>'],
  runAt: 'document_idle',
  main() {
    const browser = webext as any;

    console.log('[Content Script] Loading...');

    // 全局状态
    let isInitialized = false;

    // 创建全局消息处理器
    browser.runtime.onMessage.addListener((message: any, sender: any, sendResponse: any) => {
      console.log('[Content Script] Received message:', message.type, 'Initialized:', isInitialized);

      if (message.type === 'getSettings') {
        if (window.__TRANSLATION_MANAGER__) {
          sendResponse(window.__TRANSLATION_MANAGER__.getSettings());
        } else {
          sendResponse({ error: 'Manager not ready yet' });
        }
      } else if (message.type === 'updateSettings') {
        if (window.__TRANSLATION_MANAGER__) {
          window.__TRANSLATION_MANAGER__.updateSettings(message.settings).then(() => {
            sendResponse({ success: true });
          }).catch((error) => {
            console.error('[Content Script] Update settings failed:', error);
            sendResponse({ success: false, error: error.message });
          });
          return true;
        } else {
          sendResponse({ error: 'Manager not ready yet' });
        }
      } else if (message.type === 'translatePage') {
        if (window.__TRANSLATION_MANAGER__) {
          console.log('[Content Script] Starting translation...');
          window.__TRANSLATION_MANAGER__.translatePage().then(() => {
            console.log('[Content Script] Translation completed');
            sendResponse({ success: true });
          }).catch((error) => {
            console.error('[Content Script] Translation failed:', error);
            sendResponse({ success: false, error: error.message });
          });
          return true;
        } else {
          console.warn('[Content Script] Manager not ready, queueing translation...');
          setTimeout(() => {
            if (window.__TRANSLATION_MANAGER__) {
              window.__TRANSLATION_MANAGER__.translatePage().then(() => {
                sendResponse({ success: true });
              }).catch((error) => {
                sendResponse({ success: false, error: error.message });
              });
            } else {
              sendResponse({ success: false, error: 'Manager still not ready' });
            }
          }, 500);
        }
      } else if (message.type === 'getStatus') {
        if (window.__TRANSLATION_MANAGER__) {
          sendResponse({ status: window.__TRANSLATION_MANAGER__.getStatus() });
        } else {
          sendResponse({ status: 'idle' });
        }
  } else if (message.type === 'revertAll') {
      if (window.__TRANSLATION_MANAGER__) {
        window.__TRANSLATION_MANAGER__.revertAll().then(() => {
          sendResponse({ success: true });
        }).catch((error) => {
          console.error('[Content Script] Revert all failed:', error);
          sendResponse({ success: false, error: error.message });
        });
        return true;
      } else {
        sendResponse({ error: 'Manager not ready yet' });
      }
    } else if (message.type === 'clearCache') {
      translationCache.clear().then(() => {
        if (window.__TRANSLATION_MANAGER__) {
          window.__TRANSLATION_MANAGER__['translatedElements']?.clear?.();
        }
        sendResponse({ success: true });
        setTimeout(() => location.reload(), 100);
      }).catch((error) => {
        console.error('[Content Script] Clear cache failed:', error);
        sendResponse({ success: false, error: error.message });
      });
      return true;
    }

      return true;
    });

    // 创建并初始化翻译管理器
    class TranslationManagerImpl {
      private settings = {
        enabled: true,
        autoDetect: true,
        targetLanguage: 'zh-CN',
        openai: {
          apiKey: '',
          baseUrl: 'https://api.openai.com/v1',
          models: ['gpt-3.5-turbo'],
          maxConcurrency: 5,
          timeout: 30000
        },
        cacheEnabled: true,
        cacheMaxAge: 7 * 24 * 60 * 60 * 1000,
        blacklist: [],
        whitelist: [],
        showTranslationBadge: true
      };

      private status: 'idle' | 'detecting' | 'translating' | 'completed' | 'error' = 'idle';

      private translatedElements = new Set<HTMLElement>();
      private observer: MutationObserver | null = null;
      private pendingTranslations = new Set<string>();

      async init() {
        console.log('[TranslationManager] Initializing...');

        await this.loadSettings();

        if (this.settings.cacheEnabled) {
          await translationCache.init(this.settings.cacheMaxAge);
        }

        if (this.settings.openai.apiKey) {
          const service = getOpenAIService(this.settings.openai);
          console.log('[TranslationManager] OpenAI service initialized with models:', this.settings.openai.models);
        }

        this.setupObserver();
        isInitialized = true;
        console.log('[TranslationManager] Initialization completed');
      }

      private async loadSettings() {
        const data = await browser.storage.local.get('settings');
        console.log('[TranslationManager] Loaded settings:', data.settings);
        this.settings = { ...this.settings, ...data.settings };
      }

      private async saveSettings() {
        await browser.storage.local.set({ settings: this.settings });
      }

      private async updateSettings(updates: any) {
        console.log('[TranslationManager] Updating settings:', updates);
        this.settings = { ...this.settings, ...updates };
        await this.saveSettings();

        if (updates.openai) {
          const service = getOpenAIService(updates.openai);
          console.log('[TranslationManager] OpenAI config updated');
        }
      }

      getSettings() {
        return { ...this.settings };
      }

      async translatePage() {
        if (!this.settings.enabled) {
          console.log('[TranslationManager] Translation disabled');
          return;
        }

        if (!this.settings.openai.apiKey) {
          console.warn('[TranslationManager] API key not configured');
          return;
        }

        this.status = 'detecting';

        if (this.settings.autoDetect) {
          const pageLang = languageDetector.detectPageLanguage();
          console.log('[TranslationManager] Page language:', pageLang);

          if (!languageDetector.shouldTranslate(this.settings.targetLanguage)) {
            console.log('[TranslationManager] Translation not needed');
            this.status = 'idle';
            return;
          }
        }

        this.status = 'translating';
        console.log('[TranslationManager] Starting translation...');

        const elements = this.findTranslatableElements();
        console.log('[TranslationManager] Found', elements.length, 'translatable elements');
        await this.translateElements(elements);

        this.status = 'completed';
        console.log('[TranslationManager] Translation completed');
      }

      private findTranslatableElements() {
        const elements: HTMLElement[] = [];
        const translatedSet = new Set<HTMLElement>();

        const walker = document.createTreeWalker(
          document.body,
          NodeFilter.SHOW_TEXT,
          {
            acceptNode: (node) => {
              let parent = node.parentElement;

              if (!parent) {
                return NodeFilter.FILTER_REJECT;
              }

              const text = node.textContent?.trim();
              if (!text || text.length < 2) {
                return NodeFilter.FILTER_REJECT;
              }

              // 检查是否在排除区域内
              if (this.hasExcludedAncestor(parent)) {
                return NodeFilter.FILTER_REJECT;
              }

              // 查找合适的翻译容器
              const container = this.findTranslationContainer(parent);
              if (container && !translatedSet.has(container)) {
                translatedSet.add(container);
                return NodeFilter.FILTER_ACCEPT;
              }

              return NodeFilter.FILTER_REJECT;
            }
          }
        );

        let node;
        while ((node = walker.nextNode())) {
          // 过滤器已经处理了逻辑，这里只需要收集被接受的元素
        }

        return Array.from(translatedSet);
      }

      private findTranslationContainer(element: HTMLElement): HTMLElement | null {
        let current: HTMLElement | null = element;
        let candidate: HTMLElement | null = null;

        // 向上遍历，找到最合适的翻译容器
        while (current && current !== document.body) {
          const tag = current.tagName.toLowerCase();

          // 如果当前元素应该被排除，返回之前找到的候选
          if (!this.shouldTranslateElement(current)) {
            return candidate;
          }

          // 容器标签列表（这些标签适合作为翻译单元）
          if (['p', 'div', 'section', 'article', 'aside', 'li', 'td', 'th', 'dt', 'dd', 'figcaption', 'caption'].includes(tag)) {
            candidate = current;
          }

          // 如果是顶级容器（h1-h6），直接返回
          if (['h1', 'h2', 'h3', 'h4', 'h5', 'h6'].includes(tag)) {
            return current;
          }

          current = current.parentElement;
        }

        // 如果找到候选容器，返回它；否则返回 body
        return candidate || document.body;
      }

      private shouldTranslateElement(element: HTMLElement): boolean {
        const tag = element.tagName.toLowerCase();
        const excludeTags = [
          'script',
          'style',
          'noscript',
          'iframe',
          'svg',
          'canvas',
          'video',
          'audio',
          'code',
          'pre',
          'kbd',
          'samp'
        ];

        if (excludeTags.includes(tag)) {
          return false;
        }

        if (element.getAttribute('translate') === 'no') {
          return false;
        }

        if (element.getAttribute('data-translate') === 'false') {
          return false;
        }

        const className = element.className;
        if (typeof className === 'string' && className.includes('notranslate')) {
          return false;
        }

        return true;
      }

      private hasExcludedAncestor(element: HTMLElement): boolean {
        let current: HTMLElement | null = element;

        while (current && current !== document.body) {
          const tag = current.tagName.toLowerCase();

          if (['code', 'pre', 'kbd', 'samp'].includes(tag)) {
            return true;
          }

          if (current.getAttribute('translate') === 'no' ||
              current.getAttribute('data-translate') === 'false' ||
              (typeof current.className === 'string' && current.className.includes('notranslate'))) {
            return true;
          }

          current = current.parentElement;
        }

        return false;
      }

      private async translateElements(elements: HTMLElement[]) {
        const service = getOpenAIService();
        if (!service) {
          console.error('[TranslationManager] OpenAI service not available');
          return;
        }

        const requests = [];

        for (const element of elements) {
          if (this.translatedElements.has(element)) {
            continue;
          }

          const text = element.textContent?.trim();
          if (!text || text.length < 3) {
            continue;
          }

          const hash = this.hashText(text);
          if (this.pendingTranslations.has(hash)) {
            continue;
          }

          this.pendingTranslations.add(hash);

          const sourceLang = this.settings.autoDetect
            ? languageDetector.detect(text).detected
            : languageDetector.detectPageLanguage();

          requests.push({
            text,
            sourceLang,
            targetLang: this.settings.targetLanguage,
            element
          });
        }

        if (requests.length === 0) {
          console.log('[TranslationManager] No elements to translate');
          return;
        }

        console.log('[TranslationManager] Translating', requests.length, 'texts');

        let translatedCount = 0;
        const total = requests.length;

        const batchSize = Math.min(5, this.settings.openai.maxConcurrency || 5);

        for (let i = 0; i < requests.length; i += batchSize) {
          const batch = requests.slice(i, i + batchSize);

          await Promise.allSettled(
            batch.map(async (request) => {
              try {
                const result = await service.translate({
                  text: request.text,
                  sourceLang: request.sourceLang,
                  targetLang: request.targetLang
                });

                if (result && result.translatedText !== result.originalText) {
                  this.applyTranslation(request.element, request.text, result.translatedText);
                }

                translatedCount++;
                console.log(`[TranslationManager] Translated ${translatedCount}/${total}`);

              } catch (error) {
                console.error('[TranslationManager] Translation failed for:', request.text, error);
              } finally {
                const hash = this.hashText(request.text);
                this.pendingTranslations.delete(hash);
              }
            })
          );
        }

        console.log('[TranslationManager] Translation completed, total:', translatedCount);
      }

      private applyTranslation(element: HTMLElement, original: string, translated: string) {
        if (this.translatedElements.has(element)) {
          return;
        }

        element.setAttribute('data-at-original', original);
        element.setAttribute('data-at-translated', translated);

        const childNodes = Array.from(element.childNodes);
        for (const node of childNodes) {
          if (node.nodeType === Node.TEXT_NODE) {
            const nodeText = node.textContent || '';
            if (nodeText.includes(original)) {
              const newText = nodeText.replace(original, translated);
              node.textContent = newText;
            }
          }
        }

        this.translatedElements.add(element);

        if (this.settings.showTranslationBadge) {
          this.addTranslationBadge(element);
        }
      }

      private addTranslationBadge(element: HTMLElement) {
        const existingBadge = element.querySelector('.at-badge');
        if (existingBadge) {
          return;
        }

        const position = window.getComputedStyle(element).position;
        if (position === 'static') {
          element.style.position = 'relative';
        }

        const badge = document.createElement('span');
        badge.className = 'at-badge';
        badge.innerHTML = `
          <svg viewBox="0 0 16 16" width="14" height="14" fill="currentColor">
            <path d="M4.5 2A2.5 2.5 0 002 4.5v8A2.5 2.5 0 004.5 15h8a2.5 2.5 0 002.5-2.5v-8A2.5 2.5 0 0012.5 2h-8zm4 3a.5.5 0 01.5.5V8h1a.5.5 0 010-1H4.5z"/>
          </svg>
        `;
        badge.style.cssText = `
          position: absolute;
          top: -4px;
          right: -4px;
          background: #3b82f6;
          color: white;
          border-radius: 4px;
          padding: 2px 4px;
          font-size: 10px;
          cursor: pointer;
          z-index: 10000;
          display: flex;
          align-items: center;
          gap: 2px;
        `;

        badge.addEventListener('click', (e) => {
          e.stopPropagation();
          this.revertTranslation(element);
        });

        element.appendChild(badge);
      }

      private revertTranslation(element: HTMLElement) {
        const original = element.getAttribute('data-at-original');
        const translated = element.getAttribute('data-at-translated');

        if (original && translated) {
          const childNodes = Array.from(element.childNodes);
          for (const node of childNodes) {
            if (node.nodeType === Node.TEXT_NODE) {
              const nodeText = node.textContent || '';
              if (nodeText.includes(translated)) {
                node.textContent = nodeText.replace(translated, original);
              }
            }
          }

          element.removeAttribute('data-at-original');
          element.removeAttribute('data-at-translated');
          this.translatedElements.delete(element);

          const badge = element.querySelector('.at-badge');
          if (badge) {
            badge.remove();
          }
        }
      }

      private setupObserver() {
        if (this.observer) {
          return;
        }

        this.observer = new MutationObserver(
          this.debounce(() => {
            if (this.status === 'completed') {
              console.log('[TranslationManager] Page changed, re-translating...');
              const newElements = this.findTranslatableElements();
              this.translateElements(newElements);
            }
          }, 500)
        );

        this.observer.observe(document.body, {
          childList: true,
          subtree: true
        });
      }

      private debounce(func: Function, wait: number) {
        let timeout: number | null = null;
        return (...args: any[]) => {
          if (timeout) {
            clearTimeout(timeout);
          }
          timeout = window.setTimeout(() => func(...args), wait);
        };
      }

      private hashText(text: string): string {
        let hash = 0;
        for (let i = 0; i < text.length; i++) {
          hash = ((hash << 5) - hash) + text.charCodeAt(i);
          hash = hash & hash;
        }
        return Math.abs(hash).toString();
      }

  getStatus() {
    return this.status;
  }

  async revertAll() {
    console.log('[TranslationManager] Reverting all translations...');

    const elements = Array.from(this.translatedElements);

    for (const element of elements) {
      this.revertTranslation(element);
    }

    this.translatedElements.clear();
    this.status = 'idle';

    console.log('[TranslationManager] All translations reverted');
  }
}

    const manager = new TranslationManagerImpl();

    (window as any).__TRANSLATION_MANAGER__ = manager;

    if (typeof window !== 'undefined' && (window as any).__DEBUG__) {
      (window as any).__DEBUG__.registerModule('translationManager', manager);
      (window as any).__DEBUG__.registerModule('languageDetector', languageDetector);
      (window as any).__DEBUG__.registerModule('openaiService', getOpenAIService());
      (window as any).__DEBUG__.registerModule('translationCache', translationCache);
    }

    // 初始化
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => {
        console.log('[Content Script] DOM loaded, initializing manager...');
        manager.init();
      });
    } else {
      console.log('[Content Script] DOM already loaded, initializing manager immediately...');
      manager.init();
    }
  },
});
