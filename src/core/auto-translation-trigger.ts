import { DOMMutationObserver } from './dom-mutation-observer';
import { PageTranslationManager } from './page-translation-manager';
import { PluginSettings } from '../types';

export class AutoTranslationTrigger {
  private mutationObserver: DOMMutationObserver;
  private pageManager: PageTranslationManager | null = null;
  private isEnabled: boolean = false;
  private isPaused: boolean = false;
  private lastTriggerTime: number = 0;
  private minInterval: number = 500;

  constructor() {
    this.mutationObserver = new DOMMutationObserver();
  }

  enable(pageManager: PageTranslationManager, settings: PluginSettings): void {
    this.pageManager = pageManager;
    this.isEnabled = settings.autoDetect && settings.enabled;
    this.isPaused = false;

    this.mutationObserver.start(document.body, (mutations) => {
      this.handleMutations(mutations);
    });
  }

  disable(): void {
    this.mutationObserver.stop();
    this.isEnabled = false;
    this.pageManager = null;
  }

  pause(): void {
    this.isPaused = true;
  }

  resume(): void {
    this.isPaused = false;
  }

  setMinInterval(interval: number): void {
    this.minInterval = interval;
  }

  isEnabledTrigger(): boolean {
    return this.isEnabled;
  }

  updateSettings(settings: PluginSettings): void {
    this.isEnabled = settings.autoDetect && settings.enabled;
    if (!this.isEnabled) {
      this.mutationObserver.pause();
    } else {
      this.mutationObserver.resume();
    }
  }

  private handleMutations(mutations: any[]): void {
    if (!this.isEnabled || this.isPaused || !this.pageManager) {
      return;
    }

    const now = Date.now();
    const timeSinceLastTrigger = now - this.lastTriggerTime;

    if (timeSinceLastTrigger < this.minInterval) {
      return;
    }

    const textNodes = this.extractTextNodesFromMutations(mutations);

    if (textNodes.length === 0) {
      return;
    }

    this.lastTriggerTime = now;

    this.translateNewNodes(textNodes);
  }

  private extractTextNodesFromMutations(mutations: any[]): Node[] {
    const nodes: Node[] = [];
    const seen = new Set<Node>();

    for (const mutation of mutations) {
      if (mutation.type === 'childList') {
        for (const node of mutation.addedNodes) {
          if (node.nodeType === Node.ELEMENT_NODE && !seen.has(node)) {
            const textNode = this.findTextNodeInElement(node as Element);
            if (textNode && !seen.has(textNode)) {
              nodes.push(textNode);
              seen.add(textNode);
            }
          } else if (node.nodeType === Node.TEXT_NODE) {
            const text = (node as Text).textContent || '';
            if (text.trim().length >= 2 && !seen.has(node)) {
              nodes.push(node);
              seen.add(node);
            }
          }
        }
      } else if (mutation.type === 'characterData') {
        const node = mutation.target;
        const text = (node as Text).textContent || '';

        if (text.trim().length >= 2 && !seen.has(node)) {
          nodes.push(node);
          seen.add(node);
        }
      }
    }

    return nodes;
  }

  private findTextNodeInElement(element: Element): Text | null {
    for (const child of element.childNodes) {
      if (child.nodeType === Node.TEXT_NODE) {
        const text = (child as Text).textContent || '';
        if (text.trim().length >= 2) {
          return child as Text;
        }
      } else if (child.nodeType === Node.ELEMENT_NODE) {
        const textNode = this.findTextNodeInElement(child as Element);
        if (textNode) return textNode;
      }
    }
    return null;
  }

  private async translateNewNodes(nodes: Node[]): Promise<void> {
    if (!this.pageManager) {
      return;
    }

    for (const node of nodes) {
      try {
        await this.pageManager.translateNode(node);
      } catch (error) {
        console.error('[AutoTranslationTrigger] Failed to translate node:', error);
      }
    }
  }
}
