import { LanguageDetectionResult } from '../types';
import { LANGUAGE_DETECTION_PATTERNS } from '../utils/helpers';

export class LanguageDetector {
  private sampleSize = 200;
  private confidenceThreshold = 0.3;

  detect(text: string): LanguageDetectionResult {
    if (!text || text.trim().length === 0) {
      return { detected: 'en', confidence: 0 };
    }

    const sample = this.getSampleText(text);
    const matches = this.analyzeSample(sample);

    if (matches.length === 0) {
      return { detected: 'en', confidence: 0 };
    }

    const bestMatch = matches[0];

    if (bestMatch.confidence < this.confidenceThreshold) {
      return { detected: 'en', confidence: 0 };
    }

    return bestMatch;
  }

  private getSampleText(text: string): string {
    const cleaned = text
      .replace(/\s+/g, ' ')
      .replace(/[^\w\s\u4e00-\u9fff\u3040-\u309f\u30a0-\u30ff\uac00-\ud7af\u0400-\u04ff\u0600-\u06ff\u0e00-\u0e7f]/g, '')
      .trim();

    return cleaned.slice(0, this.sampleSize);
  }

  private analyzeSample(sample: string): LanguageDetectionResult[] {
    const results: LanguageDetectionResult[] = [];

    for (const [lang, pattern] of Object.entries(LANGUAGE_DETECTION_PATTERNS)) {
      const matches = sample.match(new RegExp(pattern.source, 'g'));
      const matchCount = matches ? matches.length : 0;
      const confidence = matchCount / sample.length;

      if (matchCount > 0) {
        results.push({
          detected: lang,
          confidence
        });
      }
    }

    return results.sort((a, b) => b.confidence - a.confidence);
  }

  detectPageLanguage(): string {
    const htmlLang = document.documentElement.lang;
    if (htmlLang && htmlLang !== 'en') {
      return htmlLang;
    }

    const metaLang = document.querySelector('meta[http-equiv="Content-Language"]');
    if (metaLang) {
      const lang = metaLang.getAttribute('content');
      if (lang && lang !== 'en') {
        return lang;
      }
    }

    const bodyText = document.body?.textContent || '';
    const detection = this.detect(bodyText);

    return detection.detected;
  }

  shouldTranslate(targetLanguage: string): boolean {
    const pageLanguage = this.detectPageLanguage();

    if (pageLanguage === targetLanguage) {
      return false;
    }

    if (pageLanguage.startsWith(targetLanguage) || targetLanguage.startsWith(pageLanguage)) {
      return false;
    }

    return true;
  }
}

export const languageDetector = new LanguageDetector();
