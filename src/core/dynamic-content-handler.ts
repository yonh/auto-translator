import { TextNodeExtractor } from "./text-node-extractor";
import { TranslatableUnit } from "./translatable-unit";

/**
 * Callback type for new content detection.
 */
export type NewContentCallback = (units: TranslatableUnit[]) => void;

/**
 * Configuration for the dynamic content handler.
 */
export interface DynamicContentHandlerConfig {
  /** Debounce delay in milliseconds */
  debounceDelay: number;

  /** Whether to use IntersectionObserver for viewport-aware translation */
  useIntersectionObserver: boolean;

  /** Root margin for IntersectionObserver */
  intersectionRootMargin: string;

  /** Whether to translate hidden content (useful for dropdowns) */
  translateHiddenContent: boolean;
}

/**
 * Default configuration.
 */
const DEFAULT_CONFIG: DynamicContentHandlerConfig = {
  debounceDelay: 100,
  useIntersectionObserver: true,
  intersectionRootMargin: "100px",
  translateHiddenContent: true, // Enable translation of hidden content like dropdowns
};

/**
 * DynamicContentHandler - Handles dynamic content changes in SPAs.
 *
 * Uses MutationObserver to detect new content and IntersectionObserver
 * for viewport-aware translation.
 */
export class DynamicContentHandler {
  private config: DynamicContentHandlerConfig;
  private extractor: TextNodeExtractor;
  private mutationObserver: MutationObserver | null = null;
  private intersectionObserver: IntersectionObserver | null = null;
  private pendingNodes: Set<Node> = new Set();
  private debounceTimer: ReturnType<typeof setTimeout> | null = null;
  private callback: NewContentCallback | null = null;
  private isRunning: boolean = false;
  private isPaused: boolean = false;
  private processedElements: WeakSet<Element> = new WeakSet();
  private forceReprocessElements: WeakSet<Element> = new WeakSet();

  constructor(
    extractor: TextNodeExtractor,
    config: Partial<DynamicContentHandlerConfig> = {},
  ) {
    this.extractor = extractor;
    this.config = { ...DEFAULT_CONFIG, ...config };
  }

  /**
   * Starts observing for dynamic content changes.
   */
  start(root: HTMLElement, callback: NewContentCallback): void {
    if (this.isRunning) {
      this.stop();
    }

    this.callback = callback;
    this.isRunning = true;
    this.isPaused = false;

    // Set up MutationObserver
    this.mutationObserver = new MutationObserver((mutations) => {
      if (this.isPaused) return;
      this.handleMutations(mutations);
    });

    this.mutationObserver.observe(root, {
      childList: true,
      subtree: true,
      characterData: true,
      characterDataOldValue: false,
      attributes: true,
      attributeFilter: ["aria-hidden", "style", "class", "hidden"],
    });

    // Set up IntersectionObserver if enabled
    if (this.config.useIntersectionObserver) {
      this.intersectionObserver = new IntersectionObserver(
        (entries) => this.handleIntersections(entries),
        {
          rootMargin: this.config.intersectionRootMargin,
          threshold: 0,
        },
      );
    }
  }

  /**
   * Stops observing for dynamic content changes.
   */
  stop(): void {
    if (this.mutationObserver) {
      this.mutationObserver.disconnect();
      this.mutationObserver = null;
    }

    if (this.intersectionObserver) {
      this.intersectionObserver.disconnect();
      this.intersectionObserver = null;
    }

    if (this.debounceTimer) {
      clearTimeout(this.debounceTimer);
      this.debounceTimer = null;
    }

    this.pendingNodes.clear();
    this.forceReprocessElements = new WeakSet();
    this.callback = null;
    this.isRunning = false;
    this.isPaused = false;
  }

  /**
   * Pauses observation temporarily.
   */
  pause(): void {
    this.isPaused = true;
  }

  /**
   * Resumes observation.
   */
  resume(): void {
    this.isPaused = false;
  }

  /**
   * Handles mutation events.
   */
  private handleMutations(mutations: MutationRecord[]): void {
    for (const mutation of mutations) {
      if (mutation.type === "childList") {
        // Process added nodes
        for (const node of mutation.addedNodes) {
          if (this.isTranslatableNode(node)) {
            this.pendingNodes.add(node);
          }
        }
      } else if (mutation.type === "characterData") {
        // Text content changed
        const target = mutation.target;
        if (target.nodeType === Node.TEXT_NODE) {
          const parent = target.parentElement;
          if (parent && !this.processedElements.has(parent)) {
            this.pendingNodes.add(parent);
          }
        }
      } else if (mutation.type === "attributes") {
        const target = mutation.target;
        if (target.nodeType === Node.ELEMENT_NODE) {
          const element = target as HTMLElement;
          if (this.isTranslatableNode(element)) {
            this.pendingNodes.add(element);
            // Attribute-only toggles (e.g. aria-hidden/style/class) often reuse
            // existing nodes; allow them to be translated again.
            this.forceReprocessElements.add(element);
          }
        }
      }
    }

    this.scheduleProcessing();
  }

  /**
   * Handles intersection events for viewport-aware translation.
   */
  private handleIntersections(entries: IntersectionObserverEntry[]): void {
    const visibleElements: HTMLElement[] = [];

    for (const entry of entries) {
      if (entry.isIntersecting) {
        visibleElements.push(entry.target as HTMLElement);
        this.intersectionObserver?.unobserve(entry.target);
      }
    }

    if (visibleElements.length > 0 && this.callback) {
      const units: TranslatableUnit[] = [];

      for (const element of visibleElements) {
        const unit = this.extractor.extractFromElement(element);
        if (unit) {
          units.push(unit);
        }
      }

      if (units.length > 0) {
        this.callback(units);
      }
    }
  }

  /**
   * Schedules processing of pending nodes with debounce.
   */
  private scheduleProcessing(): void {
    if (this.debounceTimer) {
      clearTimeout(this.debounceTimer);
    }

    this.debounceTimer = setTimeout(() => {
      this.processPendingNodes();
    }, this.config.debounceDelay);
  }

  /**
   * Processes all pending nodes.
   */
  private processPendingNodes(): void {
    if (!this.callback || this.pendingNodes.size === 0) {
      return;
    }

    const nodes = Array.from(this.pendingNodes);
    this.pendingNodes.clear();

    const units: TranslatableUnit[] = [];

    for (const node of nodes) {
      if (node.nodeType === Node.ELEMENT_NODE) {
        const element = node as HTMLElement;

        // Skip if already processed
        if (
          this.processedElements.has(element) &&
          !this.forceReprocessElements.has(element)
        ) {
          continue;
        }

        // Use IntersectionObserver for deferred translation if enabled
        if (this.config.useIntersectionObserver && this.intersectionObserver) {
          // Check if element is already in viewport
          const rect = element.getBoundingClientRect();
          const isInViewport =
            rect.top < window.innerHeight + 100 &&
            rect.bottom > -100 &&
            rect.left < window.innerWidth + 100 &&
            rect.right > -100;

          if (isInViewport) {
            // Extract immediately
            const extractedUnits = this.extractor.extract(element);
            units.push(...extractedUnits);
          } else {
            // Defer until visible
            this.intersectionObserver.observe(element);
          }
        } else {
          // Extract immediately
          const extractedUnits = this.extractor.extract(element);
          units.push(...extractedUnits);
        }

        this.processedElements.add(element);
        this.forceReprocessElements.delete(element);
      } else if (node.nodeType === Node.TEXT_NODE) {
        const parent = node.parentElement;
        if (parent && !this.processedElements.has(parent)) {
          const unit = this.extractor.extractFromElement(parent);
          if (unit) {
            units.push(unit);
          }
          this.processedElements.add(parent);
        }
      }
    }

    if (units.length > 0) {
      this.callback(units);
    }
  }

  /**
   * Checks if a node should be considered for translation.
   */
  private isTranslatableNode(node: Node): boolean {
    if (node.nodeType === Node.ELEMENT_NODE) {
      const element = node as HTMLElement;

      // Skip excluded elements
      if (this.extractor.shouldExcludeElement(element)) {
        return false;
      }

      // Check if element has text content
      const text = element.textContent?.trim();
      if (!text || text.length < 2) {
        return false;
      }

      return true;
    }

    if (node.nodeType === Node.TEXT_NODE) {
      const text = node.textContent?.trim();
      return !!text && text.length >= 2;
    }

    return false;
  }

  /**
   * Observes a specific element for viewport entry.
   */
  observeElement(element: HTMLElement): void {
    if (this.intersectionObserver && !this.processedElements.has(element)) {
      this.intersectionObserver.observe(element);
    }
  }

  /**
   * Marks an element as processed.
   */
  markProcessed(element: Element): void {
    this.processedElements.add(element);
  }

  /**
   * Clears the processed elements cache.
   */
  clearProcessedCache(): void {
    this.processedElements = new WeakSet();
  }

  /**
   * Updates the configuration.
   */
  updateConfig(config: Partial<DynamicContentHandlerConfig>): void {
    this.config = { ...this.config, ...config };
  }

  /**
   * Returns whether the handler is currently running.
   */
  isActive(): boolean {
    return this.isRunning && !this.isPaused;
  }
}
