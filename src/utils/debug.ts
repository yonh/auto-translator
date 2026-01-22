import webext from 'webextension-polyfill';

const browser = webext as any;

declare global {
  interface Window {
    __DEBUG__?: {
      timestamp: number;
      version: string;
      modules: {
        translationManager: any;
        languageDetector: any;
        openaiService: any;
        translationCache: any;
        [key: string]: any;
      };
      registerModule(name: string, module: any): void;
      healthCheck(): Promise<void>;
      testTranslation(text?: string): Promise<void>;
      testBatchTranslation(): Promise<void>;
      testCache(): Promise<void>;
      testLanguageDetection(): Promise<void>;
      showPageInfo(): void;
      clearAllCache(): Promise<void>;
      reloadPlugin(): Promise<void>;
      showHelp(): void;
    };
  }
}

export const enableDevTools = () => {
  if (!(import.meta as any).env?.DEV) {
    return;
  }

  const debugObj = {
    timestamp: Date.now(),
    version: '1.0.0-dev',
    modules: {
      translationManager: null,
      languageDetector: null,
      openaiService: null,
      translationCache: null,
    },
    registerModule(name: string, module: any) {
      this.modules[name] = module;
      console.log(`[DEBUG] Module registered: ${name}`);
    },
    async healthCheck() {
      console.log('=== Auto Translator Health Check ===');
      console.log('Timestamp:', new Date().toISOString());
      console.log('\n--- Modules ---');
      for (const [name, module] of Object.entries(this.modules)) {
        console.log(`${name}:`, module ? '✓' : '✗');
      }
      try {
        const settings = await browser.storage.local.get('settings');
        console.log('\n--- Settings ---');
        console.log('Settings loaded:', !!settings.settings);
        if (settings.settings) {
          console.log('Plugin enabled:', settings.settings.enabled);
          console.log('Target language:', settings.settings.targetLanguage);
          console.log('API Key configured:', !!settings.settings.openai?.apiKey);
          console.log('Models:', settings.settings.openai?.models);
          console.log('Max concurrency:', settings.settings.openai?.maxConcurrency);
        }
      } catch (error) {
        console.error('Error reading settings:', error);
      }
      try {
        if (this.modules.translationCache) {
          const stats = await this.modules.translationCache.getStats();
          console.log('\n--- Cache ---');
          console.log('Cache entries:', stats.size);
          console.log('Oldest entry:', new Date(stats.oldestTimestamp));
          console.log('Newest entry:', new Date(stats.newestTimestamp));
        }
      } catch (error) {
        console.error('Error checking cache:', error);
      }
      try {
        if (this.modules.openaiService) {
          const activeCount = this.modules.openaiService.getActiveRequestCount();
          console.log('\n--- Requests ---');
          console.log('Active requests:', activeCount);
        }
      } catch (error) {
        console.error('Error checking requests:', error);
      }
      try {
        if (this.modules.languageDetector) {
          const pageLang = this.modules.languageDetector.detectPageLanguage();
          console.log('\n--- Page ---');
          console.log('Detected language:', pageLang);
          console.log('URL:', window.location.href);
        }
      } catch (error) {
        console.error('Error detecting language:', error);
      }
      console.log('\n=========================\n');
    },
    async testTranslation(text = 'Hello, world!') {
      console.log('=== Translation Test ===');
      console.log('Input:', text);
      if (!this.modules.openaiService) {
        console.error('OpenAI service not available');
        return;
      }
      try {
        const settings = await browser.storage.local.get('settings');
        const targetLang = settings.settings?.targetLanguage || 'zh-CN';
        const model = settings.settings?.openai?.models?.[0] || 'gpt-3.5-turbo';
        console.log('Model:', model);
        console.log('Target language:', targetLang);
        const result = await this.modules.openaiService.translate({
          text,
          sourceLang: 'en',
          targetLang,
          model
        });
        console.log('Translation result:', result.translatedText);
        console.log('Cached:', result.cached);
        console.log('=== Test Complete ===\n');
      } catch (error) {
        console.error('Translation test failed:', error);
      }
    },
    async testBatchTranslation() {
      console.log('=== Batch Translation Test ===');
      if (!this.modules.openaiService) {
        console.error('OpenAI service not available');
        return;
      }
      const requests = [
        { text: 'Hello', sourceLang: 'en', targetLang: 'zh-CN' },
        { text: 'World', sourceLang: 'en', targetLang: 'zh-CN' },
        { text: 'Test', sourceLang: 'en', targetLang: 'zh-CN' },
      ];
      console.log('Requests:', requests.length);
      try {
        const results = await this.modules.openaiService.translateBatch(requests);
        console.table(results);
        console.log('=== Test Complete ===\n');
      } catch (error) {
        console.error('Batch translation test failed:', error);
      }
    },
    async testCache() {
      console.log('=== Cache Test ===');
      if (!this.modules.translationCache) {
        console.error('Translation cache not available');
        return;
      }
      const testKey = 'test-cache-key';
      const testText = 'test text';
      const translatedText = '测试文本';
      try {
        await this.modules.translationCache.set(
          testText,
          'en',
          'zh-CN',
          'gpt-3.5-turbo',
          translatedText
        );
        console.log('✓ Cache set');
        const cached = await this.modules.translationCache.get(
          testText,
          'en',
          'zh-CN',
          'gpt-3.5-turbo'
        );
        if (cached) {
          console.log('✓ Cache hit');
          console.log('Original:', cached.originalText);
          console.log('Translated:', cached.translatedText);
          console.log('Timestamp:', new Date(cached.timestamp));
        } else {
          console.log('✗ Cache miss');
        }
        const hash = this.modules.translationCache.generateHash(
          testText,
          'en',
          'zh-CN',
          'gpt-3.5-turbo'
        );
        await this.modules.translationCache.delete(hash);
        console.log('✓ Test cache cleared');
        console.log('=== Test Complete ===\n');
      } catch (error) {
        console.error('Cache test failed:', error);
      }
    },
    async testLanguageDetection() {
      console.log('=== Language Detection Test ===');
      if (!this.modules.languageDetector) {
        console.error('Language detector not available');
        return;
      }
      const tests = [
        { text: 'Hello world', expected: 'en' },
        { text: '你好世界', expected: 'zh-CN' },
        { text: 'こんにちは世界', expected: 'ja' },
        { text: '안녕하세요 세계', expected: 'ko' },
        { text: 'Привет мир', expected: 'ru' },
      ];
      const results: any[] = [];
      for (const test of tests) {
        const detected = this.modules.languageDetector.detect(test.text);
        results.push({
          text: test.text,
          expected: test.expected,
          detected: detected.detected,
          confidence: detected.confidence.toFixed(2),
          match: detected.detected === test.expected
        });
      }
      console.table(results);
      console.log('=== Test Complete ===\n');
    },
    showPageInfo() {
      console.log('=== Page Information ===');
      console.log('URL:', window.location.href);
      console.log('Title:', document.title);
      console.log('Language (HTML):', document.documentElement.lang);
      if (this.modules.languageDetector) {
        const detectedLang = this.modules.languageDetector.detectPageLanguage();
        console.log('Detected language:', detectedLang);
      }
      const allElements = document.querySelectorAll('*');
      let textElements = 0;
      let totalTextLength = 0;
      allElements.forEach((el: any) => {
        const text = el.textContent?.trim();
        if (text && text.length > 2) {
          textElements++;
          totalTextLength += text.length;
        }
      });
      console.log('Total elements:', allElements.length);
      console.log('Text elements:', textElements);
      console.log('Total text length:', totalTextLength);
      console.log('========================\n');
    },
    async clearAllCache() {
      console.log('=== Clearing All Cache ===');
      if (!this.modules.translationCache) {
        console.error('Translation cache not available');
        return;
      }
      try {
        await this.modules.translationCache.clear();
        console.log('✓ All cache cleared\n');
      } catch (error) {
        console.error('Failed to clear cache:', error);
      }
    },
    async reloadPlugin() {
      console.log('=== Reloading Plugin ===');
      try {
        await browser.runtime.reload();
        console.log('✓ Plugin reloaded\n');
      } catch (error) {
        console.error('Failed to reload plugin:', error);
      }
    },
    showHelp() {
      console.log('=== Auto Translator Debug Commands ===');
      console.log('window.__DEBUG__.healthCheck()      - Run full health check');
      console.log('window.__DEBUG__.testTranslation()   - Test single translation');
      console.log('window.__DEBUG__.testBatchTranslation() - Test batch translation');
      console.log('window.__DEBUG__.testCache()         - Test cache operations');
      console.log('window.__DEBUG__.testLanguageDetection() - Test language detection');
      console.log('window.__DEBUG__.showPageInfo()      - Show page information');
      console.log('window.__DEBUG__.clearAllCache()     - Clear all cache');
      console.log('window.__DEBUG__.reloadPlugin()       - Reload plugin');
      console.log('window.__DEBUG__.showHelp()          - Show this help');
      console.log('====================================\n');
    }
  };

  window.__DEBUG__ = debugObj;

  console.log('%c[Auto Translator] %cDebug tools loaded', 'color: #3b82f6; font-weight: bold;', 'color: #666;');
  console.log('Use window.__DEBUG__.showHelp() to see available commands');
  console.log('Use window.__DEBUG__.healthCheck() to run a quick check\n');
};

if (typeof window !== 'undefined') {
  enableDevTools();
}
