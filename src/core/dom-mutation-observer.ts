export type MutationCallback = (mutations: any[], observer: MutationObserver) => void;

export class DOMMutationObserver {
  private observer: MutationObserver | null = null;
  private isRunning: boolean = false;
  private isPaused: boolean = false;
  private callback: MutationCallback | null = null;
  private debounceTimer: ReturnType<typeof setTimeout> | null = null;
  private debounceDelay: number = 100;

  start(root: Node, callback: MutationCallback): void {
    if (this.isRunning) {
      this.stop();
    }

    this.callback = callback;
    this.isRunning = true;
    this.isPaused = false;

    this.observer = new MutationObserver(
      (mutations: MutationRecord[], observer: MutationObserver) => {
        if (this.isPaused) {
          return;
        }

        if (this.debounceTimer) {
          clearTimeout(this.debounceTimer);
        }

        this.debounceTimer = setTimeout(() => {
          this.handleMutations(mutations);
        }, this.debounceDelay);
      }
    );

    this.observer.observe(root, {
      childList: true,
      subtree: true,
      attributes: false,
      characterData: true,
      characterDataOldValue: false
    });
  }

  stop(): void {
    if (!this.isRunning) {
      return;
    }

    if (this.observer) {
      this.observer.disconnect();
      this.observer = null;
    }

    if (this.debounceTimer) {
      clearTimeout(this.debounceTimer);
      this.debounceTimer = null;
    }

    this.isRunning = false;
    this.isPaused = false;
    this.callback = null;
  }

  pause(): void {
    this.isPaused = true;
  }

  resume(): void {
    this.isPaused = false;
  }

  setDebounceDelay(delay: number): void {
    this.debounceDelay = delay;
  }

  private handleMutations(mutations: MutationRecord[]): void {
    if (!this.callback) {
      return;
    }

    const filteredMutations = this.filterRelevantMutations(mutations);
    this.callback(filteredMutations);
  }

  private filterRelevantMutations(mutations: MutationRecord[]): MutationRecord[] {
    const relevant: MutationRecord[] = [];
    const seenNodes = new Set<Node>();

    for (const mutation of mutations) {
      if (mutation.type === 'childList') {
        for (const node of mutation.addedNodes) {
          if (node.nodeType === Node.ELEMENT_NODE) {
            if (!seenNodes.has(node)) {
              seenNodes.add(node);
              relevant.push(mutation);
            }
          }
        }
      } else if (mutation.type === 'characterData') {
        const node = mutation.target;
        const text = (node as Text).textContent || '';

        if (text.trim().length >= 2 && !seenNodes.has(node)) {
          seenNodes.add(node);
          relevant.push(mutation);
        }
      }
    }

    return relevant;
  }

  isActive(): boolean {
    return this.isRunning && !this.isPaused;
  }
}
