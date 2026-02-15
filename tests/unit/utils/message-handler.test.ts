import { describe, it, expect, vi, beforeEach } from 'vitest';

vi.mock('webextension-polyfill', () => ({
  default: {
    runtime: {
      sendMessage: vi.fn(),
      onMessage: {
        addListener: vi.fn(),
        removeListener: vi.fn()
      }
    }
  }
}));

import webext from 'webextension-polyfill';
import { messageHandler } from '../../../src/utils/message-handler';

const browser = webext as any;

describe('MessageHandler', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    messageHandler.clear();
  });

  it('registers and unregisters listeners', async () => {
    const handler = vi.fn();
    const off = messageHandler.on('type-a', handler);

    await messageHandler.handleMessage({ type: 'type-a', data: { x: 1 } });
    expect(handler).toHaveBeenCalledWith({ x: 1 });

    off();
    await expect(messageHandler.handleMessage({ type: 'type-a', data: { x: 2 } })).rejects.toThrow(
      'No handler for message type: type-a'
    );
  });

  it('send resolves when onMessage listener receives matching response', async () => {
    browser.runtime.sendMessage.mockResolvedValue(undefined);

    const p = messageHandler.send('PING', { a: 1 });
    const addCall = browser.runtime.onMessage.addListener.mock.calls[0][0];
    addCall({ type: 'PING', data: { ok: true } });

    await expect(p).resolves.toEqual({ ok: true });
    expect(browser.runtime.sendMessage).toHaveBeenCalledWith({ type: 'PING', data: { a: 1 } });
  });

  it('handleMessage executes async handlers', async () => {
    const handler = vi.fn().mockResolvedValue({ success: true, data: 'ok' });
    messageHandler.on('async-type', handler);

    const result = await messageHandler.handleMessage({ type: 'async-type', data: 123 });
    expect(handler).toHaveBeenCalledWith(123);
    expect(result).toEqual({ success: true, data: 'ok' });
  });

  it('clear removes all listeners', async () => {
    messageHandler.on('t1', vi.fn());
    messageHandler.on('t2', vi.fn());

    messageHandler.clear();

    await expect(messageHandler.handleMessage({ type: 't1', data: null })).rejects.toThrow(
      'No handler for message type: t1'
    );
  });
});
