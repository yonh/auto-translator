export const DEFAULT_TARGET_LANGUAGES = [
  { code: 'zh-CN', name: '简体中文' },
  { code: 'zh-TW', name: '繁體中文' },
  { code: 'en', name: 'English' },
  { code: 'ja', name: '日本語' },
  { code: 'ko', name: '한국어' },
  { code: 'fr', name: 'Français' },
  { code: 'de', name: 'Deutsch' },
  { code: 'es', name: 'Español' },
  { code: 'ru', name: 'Русский' },
  { code: 'pt', name: 'Português' }
];

export const LANGUAGE_DETECTION_PATTERNS: Record<string, RegExp> = {
  'zh-CN': /[\u4e00-\u9fa5]/,
  'ja': /[\u3040-\u309f\u30a0-\u30ff]/,
  'ko': /[\uac00-\ud7af]/,
  'ru': /[\u0400-\u04ff]/,
  'ar': /[\u0600-\u06ff]/,
  'th': /[\u0e00-\u0e7f]/
};

export function detectLanguage(text: string): string | null {
  for (const [lang, pattern] of Object.entries(LANGUAGE_DETECTION_PATTERNS)) {
    if (pattern.test(text)) {
      return lang;
    }
  }
  return null;
}

export function isCJK(text: string): boolean {
  return /^[\u4e00-\u9fff\u3040-\u309f\u30a0-\u30ff\uac00-\ud7af]/.test(text);
}

export function extractTextContent(element: HTMLElement): string {
  return element.textContent?.trim() || '';
}

export function shouldTranslateElement(element: HTMLElement): boolean {
  const tag = element.tagName.toLowerCase();
  const excludeTags = ['script', 'style', 'noscript', 'iframe', 'svg', 'canvas', 'video', 'audio'];

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

export function createTranslationBadge(translated: boolean): HTMLElement {
  const badge = document.createElement('span');
  badge.className = 'at-badge';
  badge.style.cssText = `
    position: absolute;
    top: -8px;
    right: -8px;
    background: ${translated ? '#10b981' : '#f59e0b'};
    color: white;
    font-size: 10px;
    padding: 2px 6px;
    border-radius: 4px;
    z-index: 10000;
    pointer-events: none;
    white-space: nowrap;
  `;
  badge.textContent = translated ? '已翻译' : '翻译中...';
  return badge;
}

export function escapeHtml(text: string): string {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: number | null = null;

  return (...args: Parameters<T>) => {
    if (timeout) {
      clearTimeout(timeout);
    }
    timeout = window.setTimeout(() => func(...args), wait);
  };
}
