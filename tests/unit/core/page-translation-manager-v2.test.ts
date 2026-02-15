import { describe, it, expect } from 'vitest';
import { PageTranslationManagerV2 } from '../../../src/core/page-translation-manager-v2';
import { createTranslatableUnit } from '../../../src/core/translatable-unit';
import { PluginSettings } from '../../../src/types';

const settings: PluginSettings = {
  enabled: true,
  autoDetect: true,
  targetLanguage: 'zh-CN',
  openai: {
    apiKey: '',
    baseUrl: 'https://api.openai.com/v1',
    models: ['gpt-3.5-turbo'],
    maxConcurrency: 5,
    timeout: 30000,
  },
  cacheEnabled: true,
  cacheMaxAge: 7 * 24 * 60 * 60 * 1000,
  blacklist: [],
  whitelist: [],
  showTranslationBadge: true,
  debugLogging: false,
};

describe('PageTranslationManagerV2 popover reopen scenarios', () => {
  it('popover-reopen-clear-stale-dedup-key-when-text-reverts', () => {
    const manager = new PageTranslationManagerV2(settings) as any;

    const parent = document.createElement('div');
    const textNode = document.createTextNode('Appearance settings');
    parent.appendChild(textNode);
    document.body.appendChild(parent);

    const unit = createTranslatableUnit([textNode], parent);
    unit.translatedText = '外观设置';
    unit.isTranslated = true;

    const key = manager.getContentKey(unit);
    manager.translatedUnits.set(unit.id, unit);
    manager.translatedContentKeys.add(key);

    // Simulate popover close/reopen resetting content back to source text.
    textNode.textContent = 'Appearance settings';

    manager.cleanupStaleTranslatedState();

    expect(manager.translatedUnits.has(unit.id)).toBe(false);
    expect(manager.translatedContentKeys.has(key)).toBe(false);

    parent.remove();
  });

  it('popover-reopen-allow-retranslation-after-close-reopen', () => {
    const manager = new PageTranslationManagerV2(settings) as any;

    const popover = document.createElement('div');
    const textNode = document.createTextNode('Appearance settings');
    popover.appendChild(textNode);
    document.body.appendChild(popover);

    // First open: content translated and dedup key recorded.
    const firstUnit = createTranslatableUnit([textNode], popover);
    const key = manager.getContentKey(firstUnit);
    firstUnit.translatedText = '外观设置';
    firstUnit.isTranslated = true;
    textNode.textContent = '外观设置';
    manager.translatedUnits.set(firstUnit.id, firstUnit);
    manager.translatedContentKeys.add(key);

    expect(manager.translatedContentKeys.has(key)).toBe(true);

    // Close + reopen: site reuses node and restores source text.
    textNode.textContent = 'Appearance settings';

    manager.cleanupStaleTranslatedState();

    // Reopen should not be blocked by stale dedup key.
    const reopenedUnit = createTranslatableUnit([textNode], popover);
    const reopenedKey = manager.getContentKey(reopenedUnit);
    expect(reopenedKey).toBe(key);
    expect(manager.translatedContentKeys.has(reopenedKey)).toBe(false);

    popover.remove();
  });
});
