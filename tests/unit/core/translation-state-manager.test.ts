import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { TranslationStateManager } from '../../../src/core/translation-state-manager';

describe('TranslationStateManager', () => {
  let manager: TranslationStateManager;

  beforeEach(() => {
    manager = new TranslationStateManager();
  });

  afterEach(() => {
    manager.reset();
  });

  describe('setState', () => {
    it('should set idle state', () => {
      manager.setState('idle');
      expect(manager.getState()).toBe('idle');
    });

    it('should set translating state', () => {
      manager.setState('translating');
      expect(manager.getState()).toBe('translating');
    });

    it('should set completed state', () => {
      manager.setState('completed');
      expect(manager.getState()).toBe('completed');
    });

    it('should reset progress on state change', () => {
      manager.setProgress(50, 100);
      manager.setState('completed');
      expect(manager.getProgress()).toEqual({ current: 0, total: 0, percentage: 0 });
    });
  });

  describe('getState', () => {
    it('should return initial state as idle', () => {
      expect(manager.getState()).toBe('idle');
    });
  });

  describe('setProgress', () => {
    it('should set progress correctly', () => {
      manager.setProgress(25, 100);
      const progress = manager.getProgress();
      expect(progress.current).toBe(25);
      expect(progress.total).toBe(100);
      expect(progress.percentage).toBe(25);
    });

    it('should calculate percentage correctly', () => {
      manager.setProgress(50, 200);
      const progress = manager.getProgress();
      expect(progress.percentage).toBe(25);
    });

    it('should handle zero total', () => {
      manager.setProgress(10, 0);
      const progress = manager.getProgress();
      expect(progress.percentage).toBe(0);
    });

    it('should round percentage to integer', () => {
      manager.setProgress(33, 100);
      const progress = manager.getProgress();
      expect(progress.percentage).toBe(33);
    });

    it('should handle 100% completion', () => {
      manager.setProgress(100, 100);
      const progress = manager.getProgress();
      expect(progress.percentage).toBe(100);
    });
  });

  describe('getProgress', () => {
    it('should return default progress', () => {
      const progress = manager.getProgress();
      expect(progress).toEqual({ current: 0, total: 0, percentage: 0 });
    });
  });

  describe('setError', () => {
    it('should set error and change state', () => {
      const error = new Error('Translation failed');
      manager.setError(error);
      expect(manager.getError()).toBe(error);
      expect(manager.hasError()).toBe(true);
    });
  });

  describe('getError', () => {
    it('should return null initially', () => {
      expect(manager.getError()).toBe(null);
    });
  });

  describe('reset', () => {
    it('should reset to initial state', () => {
      manager.setState('translating');
      manager.setProgress(50, 100);
      manager.setError(new Error('test'));
      manager.reset();
      expect(manager.getState()).toBe('idle');
      expect(manager.getProgress()).toEqual({ current: 0, total: 0, percentage: 0 });
      expect(manager.getError()).toBe(null);
    });
  });

  describe('onStatusChange', () => {
    it('should notify listeners on state change', () => {
      const listener = vi.fn();
      const unsubscribe = manager.onStatusChange(listener);

      manager.setState('translating');

      expect(listener).toHaveBeenCalledWith('translating');

      unsubscribe();
    });

    it('should unsubscribe listener', () => {
      const listener = vi.fn();
      const unsubscribe = manager.onStatusChange(listener);

      unsubscribe();
      manager.setState('translating');

      expect(listener).not.toHaveBeenCalled();
    });

    it('should support multiple listeners', () => {
      const listener1 = vi.fn();
      const listener2 = vi.fn();
      manager.onStatusChange(listener1);
      manager.onStatusChange(listener2);

      manager.setState('completed');

      expect(listener1).toHaveBeenCalledWith('completed');
      expect(listener2).toHaveBeenCalledWith('completed');
    });
  });

  describe('onProgressChange', () => {
    it('should notify listeners on progress change', () => {
      const listener = vi.fn();
      const unsubscribe = manager.onProgressChange(listener);

      manager.setProgress(50, 100);

      expect(listener).toHaveBeenCalledWith({ current: 50, total: 100, percentage: 50 });

      unsubscribe();
    });

    it('should unsubscribe listener', () => {
      const listener = vi.fn();
      const unsubscribe = manager.onProgressChange(listener);

      unsubscribe();
      manager.setProgress(50, 100);

      expect(listener).not.toHaveBeenCalled();
    });
  });

  describe('isIdle', () => {
    it('should return true for idle state', () => {
      manager.setState('idle');
      expect(manager.isIdle()).toBe(true);
    });

    it('should return false for non-idle states', () => {
      manager.setState('translating');
      expect(manager.isIdle()).toBe(false);
    });
  });

  describe('isTranslating', () => {
    it('should return true for translating state', () => {
      manager.setState('translating');
      expect(manager.isTranslating()).toBe(true);
    });

    it('should return false for non-translating states', () => {
      manager.setState('idle');
      expect(manager.isTranslating()).toBe(false);
    });
  });

  describe('isCompleted', () => {
    it('should return true for completed state', () => {
      manager.setState('completed');
      expect(manager.isCompleted()).toBe(true);
    });

    it('should return false for non-completed states', () => {
      manager.setState('translating');
      expect(manager.isCompleted()).toBe(false);
    });
  });

  describe('hasError', () => {
    it('should return true for error state', () => {
      manager.setError(new Error('test'));
      expect(manager.hasError()).toBe(true);
    });

    it('should return false for non-error states', () => {
      manager.setState('idle');
      expect(manager.hasError()).toBe(false);
    });
  });
});
