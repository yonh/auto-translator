import '@testing-library/jest-dom/vitest';

// Global test setup
global.console = {
  ...console,
  // Silence certain logs in tests
  log: console.log,
  warn: console.warn,
  error: console.error
};
