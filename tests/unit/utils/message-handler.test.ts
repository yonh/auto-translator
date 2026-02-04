import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { MessageCallback, messageHandler } from '../../../src/utils/message-handler';

vi.stubGlobal('browser', {
  runtime: {
    sendMessage: vi.fn(),
    onMessage: {
      addListener: vi.fn(),
      removeListener: vi.fn()
    }
  }
});

describe('MessageHandler', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    messageHandler.clear();
  });

  afterEach(() => {
    messageHandler.clear();
  });

  describe('send', () => {
    it('should send message and receive response', async () => {
      const sendMessage = (global as any).browser.runtime.sendMessage;
      const response = { data: 'test-response' };
      sendMessage.mockResolvedValue(response);

      const result = await messageHandler.send('test-type', { test: 'data' });

      expect(sendMessage).toHaveBeenCalledWith({
        type: 'test-type',
        data: { test: 'data' },
        messageId: expect.any(String),
        timestamp: expect.any(Number)
      });
      expect(result.success).toBe(true);
      expect(result.data).toBe('test-response');
    });

    it('should handle message timeout', async () => {
      const sendMessage = (global as any).browser.runtime.sendMessage;
      vi.useFakeTimers();

      const result = messageHandler.send('test-type', { test: 'data' }, { timeout: 1000 });

      await vi.advanceTimersByTime(1100);

      expect(result.success).toBe(false);
      expect(result.error).toContain('timeout');
    });

    it('should handle send error', async () => {
      const sendMessage = (global as any).browser.runtime.sendMessage;
      sendMessage.mockRejectedValue(new Error('Send failed'));

      await expect(messageHandler.send('test-type', { test: 'data' })).rejects.toThrow();
    });
  });

  describe('on', () => {
    it('should register handler for message type', () => {
      const handler = vi.fn();
      const unsubscribe = messageHandler.on('test-type', handler);

      expect(unsubscribe).toBeInstanceOf(Function);

      unsubscribe();
    });

    it('should return unsubscribe function that removes handler', () => {
      const handler = vi.fn();
      const unsubscribe = messageHandler.on('test-type', handler);

      const handler2 = vi.fn();
      messageHandler.on('test-type', handler2);

      unsubscribe();

      messageHandler.handleMessage({ type: 'test-type', data: 'test' });

      expect(handler).not.toHaveBeenCalled();
      expect(handler2).toHaveBeenCalled();
    });

    it('should create new handler set for new type', () => {
      const handler1 = vi.fn();
      const handler2 = vi.fn();
      const handler3 = vi.fn();

      messageHandler.on('test-type', handler1);
      messageHandler.on('test-type', handler2);
      messageHandler.on('test-type', handler3);

      expect(handler1).toHaveBeenCalledTimes(1);
      expect(handler2).toHaveBeenCalledTimes(1);
      expect(handler3).toHaveBeenCalledTimes(1);
    });
  });

  describe('off', () => {
    it('should remove specific handler', () => {
      const handler = vi.fn();
      messageHandler.on('test-type', handler);
      messageHandler.off('test-type', handler);

      messageHandler.handleMessage({ type: 'test-type', data: 'test' });

      expect(handler).not.toHaveBeenCalled();
    });

    it('should clean up handler set when last handler removed', () => {
      const handler = vi.fn();
      messageHandler.on('test-type', handler);

      messageHandler.off('test-type', handler);

      const handlers = (messageHandler as any)['handlers']?.has('test-type');
      expect(handlers).toBe(false);
    });

    it('should handle removing non-existent handler', () => {
      expect(() => messageHandler.off('test-type', vi.fn())).not.toThrow();
    });
  });

  describe('handleMessage', () => {
    it('should call all registered handlers', async () => {
      const handler1 = vi.fn();
      const handler2 = vi.fn();
      const handler3 = vi.fn();

      messageHandler.on('test-type', handler1);
      messageHandler.on('test-type', handler2);
      messageHandler.on('test-type', handler3);

      await messageHandler.handleMessage({ type: 'test-type', data: 'test' });

      expect(handler1).toHaveBeenCalledWith('test');
      expect(handler2).toHaveBeenCalledWith('test');
      expect(handler3).toHaveBeenCalledWith('test');
    });

    it('should handle sync handlers', async () => {
      const handler = vi.fn();
      messageHandler.on('test-type', handler);

      const result = await messageHandler.handleMessage({ type: 'test-type', data: 'test' });

      expect(result.success).toBe(true);
    });

    it('should handle async handlers', async () => {
      const handler = vi.fn().mockResolvedValue(undefined);
      messageHandler.on('test-type', handler);

      const result = await messageHandler.handleMessage({ type: 'test-type', data: 'test' });

      expect(result.success).toBe(true);
    });

    it('should handle handler errors', async () => {
      const handler = vi.fn().mockRejectedValue(new Error('Handler error'));
      messageHandler.on('test-type', handler);

      const result = await messageHandler.handleMessage({ type: 'test-type', data: 'test' });

      expect(result.success).toBe(false);
      expect(result.error).toBeDefined();
    });

    it('should return error when no handlers', async () => {
      const result = await messageHandler.handleMessage({ type: 'non-existent', data: 'test' });

      expect(result.success).toBe(false);
      expect(result.error).toContain('No handler for message type');
    });
  });

  describe('removeAllListeners', () => {
    it('should clear all handlers', () => {
      const handler1 = vi.fn();
      const handler2 = vi.fn();

      messageHandler.on('type1', handler1);
      messageHandler.on('type2', handler2);

      messageHandler.removeAllListeners();

      const hasHandler1 = (messageHandler as any)['handlers']?.has('type1');
      const hasHandler2 = (messageHandler as any)['handlers']?.has('type2');

      expect(hasHandler1).toBe(false);
      expect(hasHandler2).toBe(false);
    });
  });

  describe('removeAllResponses', () => {
    it('should reject all pending promises', async () => {
      const promise = messageHandler.send('test-type', { test: 'data' });

      messageHandler.removeAllResponses();

      await expect(promise).rejects.toThrow('MessageHandlerInternal cleared');
    });
  });

  describe('clear', () => {
    it('should clear all listeners and responses', () => {
      const handler = vi.fn();
      messageHandler.on('test-type', handler);

      const promise = messageHandler.send('test-type', { test: 'data' });

      messageHandler.clear();

      const hasHandlers = (messageHandler as any)['handlers']?.has('test-type');
      const hasResponses = (messageHandler as any)['responseMap']?.size;

      expect(hasHandlers).toBe(false);
      expect(hasResponses).toBe(0);

      await expect(promise).rejects.toThrow('MessageHandlerInternal cleared');
    });
  });
});
