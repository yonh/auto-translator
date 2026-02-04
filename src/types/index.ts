// Translation cache entry structure
export interface CacheEntry {
  originalText: string;
  translatedText: string;
  sourceLang: string;
  targetLang: string;
  model: string;
  timestamp: number;
  hash: string;
}

// OpenAI API configuration
export interface OpenAIConfig {
  apiKey: string;
  baseUrl: string;
  models: string[];
  maxConcurrency: number;
  timeout: number;
  chunkSize?: number; // max characters per request chunk
  batchMaxChars?: number; // max characters per batch translation request
  batchMaxItems?: number; // max items per batch translation request
  batchMaxTokens?: number; // max estimated tokens per batch translation request
  batchRetryCount?: number; // retries for batch request/parse failures
}

// Translation request
export interface TranslationRequest {
  text: string;
  sourceLang: string;
  targetLang: string;
  model?: string;
}

// Translation response
export interface TranslationResponse {
  originalText: string;
  translatedText: string;
  sourceLang: string;
  targetLang: string;
  model: string;
  cached: boolean;
}

// Plugin settings
export interface PluginSettings {
  enabled: boolean;
  autoDetect: boolean;
  targetLanguage: string;
  openai: OpenAIConfig;
  cacheEnabled: boolean;
  cacheMaxAge: number; // in milliseconds
  blacklist: string[]; // URLs to exclude
  whitelist: string[]; // URLs to include
  showTranslationBadge: boolean;
}

// Language detection result
export interface LanguageDetectionResult {
  detected: string;
  confidence: number;
}

// Page text segment
export interface TextSegment {
  text: string;
  element: HTMLElement;
  xpath: string;
}

// Translation status
export type TranslationStatus = 'idle' | 'detecting' | 'translating' | 'completed' | 'error';

// Progress information
export interface ProgressInfo {
  current: number;
  total: number;
  percentage: number;
}

// Settings export/import format
export interface SettingsExport {
  version: string;
  timestamp: number;
  settings: PluginSettings;
}
