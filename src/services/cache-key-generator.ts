export class CacheKeyGenerator {
  private normalize(text: string): string {
    return text.toLowerCase().trim();
  }

  private hashCode(str: string): number {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash;
    }
    return Math.abs(hash);
  }

  generate(text: string, sourceLang: string, targetLang: string, model: string): string {
    return `${sourceLang}:${targetLang}:${model}:${this.hashCode(this.normalize(text))}`;
  }

  generateKey(text: string, sourceLang: string, targetLang: string, model: string): string {
    return `${sourceLang}:${targetLang}:${model}:${this.hashCode(this.normalize(text))}`;
  }

  getLanguageConfidence(text: string, lang: string): number {
    const pattern = LANGUAGE_PATTERNS[lang];
    if (!pattern) return 0;

    const matches = text.match(pattern);
    if (!matches) return 0;

    return matches.length / text.length;
  }

  isLanguage(text: string, lang: string): boolean {
    return this.getLanguageConfidence(text, lang) > 0.3;
  }
}

const LANGUAGE_PATTERNS: Record<string, RegExp> = {
  'zh-CN': /[\u4e00-\u9fa5]/,
  'ja': /[\u3040-\u309f\u30a0-\u30ff]/,
  'ko': /[\uac00-\ud7af]/,
  'ru': /[\u0400-\u04ff]/,
  'ar': /[\u0600-\u06ff]/
};

export const cacheKeyGenerator = new CacheKeyGenerator();
