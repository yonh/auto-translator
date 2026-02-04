import { TranslationStatus, ProgressInfo } from '../types';

export class TranslationStateManager {
  private status: TranslationStatus = 'idle';
  private progress: ProgressInfo = { current: 0, total: 0, percentage: 0 };
  private error: Error | null = null;
  private listeners: Set<(status: TranslationStatus) => void> = new Set();
  private progressListeners: Set<(progress: ProgressInfo) => void> = new Set();

  setState(state: TranslationStatus): void {
    this.status = state;
    if (state === 'idle' || state === 'completed') {
      this.progress = { current: 0, total: 0, percentage: 0 };
      this.error = null;
    }
    this.notifyListeners();
  }

  getState(): TranslationStatus {
    return this.status;
  }

  setProgress(current: number, total: number): void {
    this.progress = {
      current,
      total,
      percentage: total > 0 ? Math.round((current / total) * 100) : 0
    };
    this.notifyProgressListeners();
  }

  getProgress(): ProgressInfo {
    return { ...this.progress };
  }

  setError(error: Error): void {
    this.error = error;
    this.status = 'error';
    this.notifyListeners();
  }

  getError(): Error | null {
    return this.error;
  }

  reset(): void {
    this.status = 'idle';
    this.progress = { current: 0, total: 0, percentage: 0 };
    this.error = null;
    this.notifyListeners();
    this.notifyProgressListeners();
  }

  onStatusChange(callback: (status: TranslationStatus) => void): () => void {
    this.listeners.add(callback);
    return () => this.listeners.delete(callback);
  }

  onProgressChange(callback: (progress: ProgressInfo) => void): () => void {
    this.progressListeners.add(callback);
    return () => this.progressListeners.delete(callback);
  }

  isIdle(): boolean {
    return this.status === 'idle';
  }

  isTranslating(): boolean {
    return this.status === 'translating';
  }

  isCompleted(): boolean {
    return this.status === 'completed';
  }

  hasError(): boolean {
    return this.status === 'error';
  }

  private notifyListeners(): void {
    for (const listener of this.listeners) {
      listener(this.status);
    }
  }

  private notifyProgressListeners(): void {
    for (const listener of this.progressListeners) {
      listener(this.progress);
    }
  }
}
