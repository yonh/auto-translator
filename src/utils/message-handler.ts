import webext from 'webextension-polyfill';

export type MessageCallback<T = any> = (data: T) => void | Promise<void>;

export class MessageHandler {
  private listeners: Map<string, Set<MessageCallback>> = new Map();

  on<T = any>(type: string, handler: MessageCallback<T>): () => void {
    if (!this.listeners.has(type)) {
      this.listeners.set(type, new Set());
    }

    this.listeners.get(type)!.add(handler);

    return () => this.off(type, handler);
  }

  off<T = any>(type: string, handler: MessageCallback<T>): void {
    const handlers = this.listeners.get(type);

    if (handlers) {
      handlers.delete(handler);

      if (handlers.size === 0) {
        this.listeners.delete(type);
      }
    }
  }

  async send<T = any>(type: string, data: T): Promise<T> {
    return new Promise((resolve, reject) => {
      const handleMessage = (message: any) => {
        if (message.type === type && message.data) {
          webext.runtime.onMessage.removeListener(handleMessage);
          resolve(message.data);
        }
      };

      webext.runtime.onMessage.addListener(handleMessage);

      webext.runtime.sendMessage({
        type,
        data
      });
    });
  }

  handleMessage<T = any>(message: any): T | Promise<T> {
    const { type, data } = message;

    const handlers = this.listeners.get(type);

    if (!handlers || handlers.size === 0) {
      return new Promise((resolve, reject) => {
        reject(new Error(`No handler for message type: ${type}`));
      });
    }

    const results: any[] = [];

    for (const handler of handlers) {
      const result = handler(data);

      if (result instanceof Promise) {
        results.push(result);
      } else {
        results.push({ success: true, data: result });
      }
    }

    if (results.length === 0) {
      return results[0];
    }

    return Promise.all(results).then(results => {
      const errors = results.filter(r => r.success === false);

      if (errors.length === 0) {
        return results[0];
      }

      const errorsStr = errors.map((r: any) => r.error).join(', ');

      return {
        success: errors.length === 0,
        error: errorsStr
      };
    });
  }

  removeAllListeners(): void {
    this.listeners.clear();
  }

  clear(): void {
    this.removeAllListeners();
  }
}

export const messageHandler = new MessageHandler();
