import '@testing-library/jest-dom/vitest';
import { vi } from 'vitest';

vi.mock('webextension-polyfill', () => ({
  default: {
    storage: {
      local: {
        get: vi.fn().mockResolvedValue({}),
        set: vi.fn().mockResolvedValue(),
        remove: vi.fn().mockResolvedValue(),
        clear: vi.fn().mockResolvedValue()
      }
    },
    runtime: {
      sendMessage: vi.fn(),
      onMessage: {
        addListener: vi.fn(),
        removeListener: vi.fn()
      }
    }
  }
}));

global.console = {
  ...console,
  log: console.log,
  warn: console.warn,
  error: console.error
};
