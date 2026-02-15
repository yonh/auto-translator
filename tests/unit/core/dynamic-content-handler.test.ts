import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { TextNodeExtractor } from '../../../src/core/text-node-extractor';
import { DynamicContentHandler } from '../../../src/core/dynamic-content-handler';

describe('DynamicContentHandler', () => {
  let root: HTMLElement;
  let extractor: TextNodeExtractor;
  let handler: DynamicContentHandler;

  beforeEach(() => {
    vi.useFakeTimers();
    root = document.createElement('div');
    document.body.appendChild(root);
    extractor = new TextNodeExtractor();
  });

  afterEach(() => {
    handler?.stop();
    root.remove();
    vi.useRealTimers();
    vi.restoreAllMocks();
  });

  it('popover-reopen-enqueue-on-first-open', async () => {
    const callback = vi.fn();
    handler = new DynamicContentHandler(extractor, {
      debounceDelay: 0,
      useIntersectionObserver: false,
    });

    root.innerHTML = `
      <div id="menu" aria-hidden="true">
        <div>In-App Purchase (IAP)</div>
      </div>
    `;

    const menu = root.querySelector('#menu') as HTMLElement;
    handler.start(root, callback);

    menu.setAttribute('aria-hidden', 'false');

    await vi.runAllTimersAsync();

    expect(callback).toHaveBeenCalled();
    const units = callback.mock.calls[0][0];
    const texts = units.map((u: { originalText: string }) => u.originalText);
    expect(texts).toContain('In-App Purchase (IAP)');
  });

  it('popover-reopen-reenqueue-on-second-open', async () => {
    const callback = vi.fn();
    handler = new DynamicContentHandler(extractor, {
      debounceDelay: 0,
      useIntersectionObserver: false,
    });

    root.innerHTML = `
      <div id="menu" aria-hidden="true">
        <div>Appearance settings</div>
      </div>
    `;

    const menu = root.querySelector('#menu') as HTMLElement;
    handler.start(root, callback);

    menu.setAttribute('aria-hidden', 'false');
    await vi.runAllTimersAsync();

    menu.setAttribute('aria-hidden', 'true');
    await vi.runAllTimersAsync();

    menu.setAttribute('aria-hidden', 'false');
    await vi.runAllTimersAsync();

    expect(callback.mock.calls.length).toBeGreaterThanOrEqual(2);
    const lastUnits = callback.mock.calls[callback.mock.calls.length - 1][0];
    const texts = lastUnits.map((u: { originalText: string }) => u.originalText);
    expect(texts).toContain('Appearance settings');
  });
});
