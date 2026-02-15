import webext from "webextension-polyfill";
import { defineContentScript } from "wxt/sandbox";
import { PageTranslationManagerV2 } from "~/src/core/page-translation-manager-v2";
import { PluginSettings } from "~/src/types";

let pageManager: PageTranslationManagerV2 | null = null;
let currentSettings: PluginSettings | null = null;
let floatingControl: HTMLDivElement | null = null;
let statusTextEl: HTMLSpanElement | null = null;
let actionButton: HTMLButtonElement | null = null;
let revertButton: HTMLButtonElement | null = null;
let unsubscribeStatus: (() => void) | null = null;
let isTranslated: boolean = false;

const DEFAULT_SETTINGS: PluginSettings = {
  enabled: true,
  autoDetect: true,
  showFloatingStatusControl: true,
  targetLanguage: "zh-CN",
  openai: {
    apiKey: "",
    baseUrl: "https://api.openai.com/v1",
    models: ["gpt-3.5-turbo"],
    maxConcurrency: 5,
    timeout: 30000,
    chunkSize: 0,
    batchMaxChars: 20000,
    batchMaxItems: 100,
    batchMaxTokens: 10000,
    batchRetryCount: 2,
  },
  cacheEnabled: true,
  cacheMaxAge: 7 * 24 * 60 * 60 * 1000,
  blacklist: [],
  whitelist: [],
  showTranslationBadge: true,
  debugLogging: false,
};

async function loadSettings(): Promise<PluginSettings> {
  try {
    const data = await webext.storage.local.get("settings");

    if (!data || !data.settings) {
      return { ...DEFAULT_SETTINGS };
    }

    return data.settings as PluginSettings;
  } catch (error) {
    console.error("[Content Script] Failed to load settings:", error);
    return { ...DEFAULT_SETTINGS };
  }
}

/**
 * Updates the floating control to reflect the latest translation status.
 */
function updateFloatingStatus(status: string): void {
  if (!statusTextEl || !actionButton || !revertButton) return;
  statusTextEl.textContent = status;

  isTranslated = status === "completed";

  if (status === "translating" || status === "detecting") {
    actionButton.textContent = "Stop";
    actionButton.style.background = "#ef4444";
    revertButton.disabled = true;
  } else {
    actionButton.textContent = "Translate";
    actionButton.style.background = "#10b981";
    revertButton.disabled = !isTranslated;
  }
}

/**
 * Binds status updates from the translation manager to the floating control.
 */
function bindStatusUpdates(): void {
  if (!pageManager) return;
  unsubscribeStatus?.();
  unsubscribeStatus = pageManager.onStatusChange((status) => {
    updateFloatingStatus(status);
  });
  updateFloatingStatus(pageManager.getStatus());
}

/**
 * Controls visibility of the floating control based on auto-translate settings.
 */
function updateFloatingVisibility(): void {
  const shouldShow = Boolean(
    currentSettings?.enabled && currentSettings?.showFloatingStatusControl,
  );

  if (!shouldShow) {
    unsubscribeStatus?.();
    unsubscribeStatus = null;
    if (floatingControl?.parentElement) {
      floatingControl.parentElement.removeChild(floatingControl);
    }
    floatingControl = null;
    statusTextEl = null;
    actionButton = null;
    revertButton = null;
    return;
  }

  ensureFloatingControl();
  bindStatusUpdates();
}

function ensureFloatingControl(): void {
  if (floatingControl) return;

  floatingControl = document.createElement("div");
  floatingControl.id = "at-floating-toggle";
  floatingControl.setAttribute(
    "style",
    `
    position: fixed;
    right: 20px;
    bottom: 20px;
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 10px 12px;
    background: rgba(0, 0, 0, 0.72);
    color: #fff;
    font-size: 13px;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    border-radius: 10px;
    box-shadow: 0 6px 16px rgba(0,0,0,0.2);
    z-index: 2147483647;
    backdrop-filter: blur(6px);
  `,
  );

  statusTextEl = document.createElement("span");
  statusTextEl.textContent = "Idle";

  actionButton = document.createElement("button");
  actionButton.textContent = "Translate";
  actionButton.setAttribute(
    "style",
    `
    padding: 6px 10px;
    background: #10b981;
    color: #fff;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    font-weight: 600;
  `,
  );

  actionButton.addEventListener("click", () => {
    if (!pageManager) return;
    const status = pageManager.getStatus();
    if (status === "translating") {
      pageManager.cancel();
      return;
    }
    pageManager.translatePage().catch((err) => {
      console.error("[Content Script] Floating translate failed:", err);
    });
  });

  revertButton = document.createElement("button");
  revertButton.textContent = "Original";
  revertButton.setAttribute(
    "style",
    `
    padding: 6px 10px;
    background: #374151;
    color: #fff;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    font-weight: 600;
  `,
  );
  revertButton.disabled = true;

  revertButton.addEventListener("click", () => {
    if (!pageManager) return;
    pageManager.cancel();
    pageManager
      .revertPage()
      .then(() => {
        updateFloatingStatus("idle");
      })
      .catch((err) => {
        console.error("[Content Script] Floating revert failed:", err);
      });
  });

  floatingControl.appendChild(statusTextEl);
  floatingControl.appendChild(actionButton);
  floatingControl.appendChild(revertButton);
  document.body.appendChild(floatingControl);
}

async function saveSettings(settings: PluginSettings): Promise<void> {
  try {
    await webext.storage.local.set({ settings });
  } catch (error) {
    console.error("[Content Script] Failed to save settings:", error);
    throw error;
  }
}

function updateSettings(updates: Partial<PluginSettings>): Promise<void> {
  return saveSettings({ ...currentSettings!, ...updates });
}

async function initialize(): Promise<void> {
  currentSettings = await loadSettings();

  if (!currentSettings.enabled) {
    console.log("[Content Script] Plugin disabled, skipping initialization");
    return;
  }

  try {
    pageManager = new PageTranslationManagerV2(currentSettings);
    await pageManager.initialize();
    console.log("[Content Script] Translation manager initialized");

    updateFloatingVisibility();

    await autoTranslateIfEnabled();
  } catch (error) {
    console.error(
      "[Content Script] Failed to initialize translation manager:",
      error,
    );
    pageManager = null;
  }
}

/**
 * Automatically triggers page translation when the plugin is enabled and auto-detect is on.
 */
async function autoTranslateIfEnabled(): Promise<void> {
  if (!pageManager || !currentSettings) {
    return;
  }

  if (!currentSettings.enabled || !currentSettings.autoDetect) {
    return;
  }

  try {
    await waitForPageStable();
    await pageManager.translatePage();
  } catch (error) {
    console.error("[Content Script] Auto translation failed:", error);
  }
}

/**
 * Waits for the page to be in a relatively stable state before auto translation.
 * This reduces missed content on pages that render asynchronously right after load.
 */
async function waitForPageStable(
  maxWaitMs = 5000,
  quietWindowMs = 600,
): Promise<void> {
  const waitForComplete = async (): Promise<void> => {
    if (document.readyState === "complete") {
      return;
    }

    await new Promise<void>((resolve) => {
      const timeoutId = window.setTimeout(resolve, maxWaitMs);
      const onReadyStateChange = () => {
        if (document.readyState === "complete") {
          cleanup();
          resolve();
        }
      };
      const cleanup = () => {
        clearTimeout(timeoutId);
        document.removeEventListener("readystatechange", onReadyStateChange);
      };
      document.addEventListener("readystatechange", onReadyStateChange);
    });
  };

  await waitForComplete();

  await new Promise<void>((resolve) => {
    let quietTimer: number | null = null;
    const timeoutId = window.setTimeout(cleanupAndResolve, maxWaitMs);

    const observer = new MutationObserver(() => {
      if (quietTimer !== null) {
        clearTimeout(quietTimer);
      }
      quietTimer = window.setTimeout(cleanupAndResolve, quietWindowMs);
    });

    const cleanup = () => {
      observer.disconnect();
      clearTimeout(timeoutId);
      if (quietTimer !== null) {
        clearTimeout(quietTimer);
      }
    };

    function cleanupAndResolve() {
      cleanup();
      resolve();
    }

    observer.observe(document.documentElement, {
      childList: true,
      subtree: true,
      characterData: true,
    });

    quietTimer = window.setTimeout(cleanupAndResolve, quietWindowMs);
  });
}

function handleIncomingMessage(message: any): any {
  const { type, data, id } = message;

  console.log("[Content Script] Received message:", type);

  switch (type) {
    case "TRANSLATE_PAGE":
    case "translatePage":
      if (!pageManager) {
        console.error("[Content Script] Translation manager not initialized");
        return {
          success: false,
          error: "Translation manager not initialized",
          id,
        };
      }

      return pageManager
        .translatePage()
        .then(() => ({ success: true, id }))
        .catch((e) => {
          console.error("[Content Script] Translation failed:", e);
          return { success: false, error: String(e), id };
        });

    case "TRANSLATE_NODE":
    case "translateNode":
      if (!pageManager) {
        console.error("[Content Script] Translation manager not initialized");
        return {
          success: false,
          error: "Translation manager not initialized",
          id,
        };
      }

      const node = document.getElementById(id);

      if (!node) {
        console.warn(`[Content Script] Node not found: ${id}`);
        return { success: false, error: "Node not found", id };
      }

      return pageManager
        .translateNode(node)
        .then(() => ({ success: true, id }))
        .catch((e) => {
          console.error("[Content Script] Node translation failed:", e);
          return { success: false, error: String(e), id };
        });

    case "REVERT_PAGE":
    case "revertPage":
      if (!pageManager) {
        console.error("[Content Script] Translation manager not initialized");
        return {
          success: false,
          error: "Translation manager not initialized",
          id,
        };
      }

      return pageManager
        .revertPage()
        .then(() => ({ success: true, id }))
        .catch((e) => {
          console.error("[Content Script] Revert failed:", e);
          return { success: false, error: String(e), id };
        });

    case "REVERT_NODE":
    case "revertNode":
      if (!pageManager) {
        console.error("[Content Script] Translation manager not initialized");
        return {
          success: false,
          error: "Translation manager not initialized",
          id,
        };
      }

      const revertNode = document.getElementById(id);

      if (!revertNode) {
        console.warn(`[Content Script] Node not found: ${id}`);
        return { success: false, error: "Node not found", id };
      }

      return pageManager
        .revertNode(revertNode)
        .then(() => ({ success: true, id }))
        .catch((e) => {
          console.error("[Content Script] Node revert failed:", e);
          return { success: false, error: String(e), id };
        });

    case "UPDATE_SETTINGS":
    case "updateSettings":
      currentSettings = { ...currentSettings, ...data };
      console.log(
        "[Content Script] Settings updated in memory:",
        currentSettings,
      );

      if (pageManager) {
        pageManager.updateSettings(currentSettings);
      }

      return Promise.resolve({ success: true, id });

    case "GET_STATUS":
    case "getStatus":
    case "getSettings":
      if (!pageManager) {
        console.error("[Content Script] Translation manager not initialized");
        return {
          success: false,
          error: "Translation manager not initialized",
          id,
        };
      }

      const settingsData = {
        enabled: currentSettings?.enabled,
        autoDetect: currentSettings?.autoDetect,
        targetLanguage: currentSettings?.targetLanguage,
      };

      return {
        success: true,
        data: { status: pageManager.getStatus(), ...settingsData },
        id,
      };

    case "GET_PROGRESS":
    case "getProgress":
      if (!pageManager) {
        console.error("[Content Script] Translation manager not initialized");
        return {
          success: false,
          error: "Translation manager not initialized",
          id,
        };
      }

      return {
        success: true,
        data: { progress: pageManager.getProgress() },
        id,
      };

    case "CLEAR_CACHE":
    case "clearCache":
      if (!pageManager) {
        console.error("[Content Script] Translation manager not initialized");
        return {
          success: false,
          error: "Translation manager not initialized",
          id,
        };
      }

      return pageManager
        .clearCache()
        .then(() => ({ success: true, id, error: null }))
        .catch((e) => {
          console.error("[Content Script] Clear cache failed:", e);
          return { success: false, error: String(e), id };
        });

    case "SETTINGS_CHANGED":
    case "settingsChanged":
      console.log("[Content Script] Settings changed:", data);
      currentSettings = data.settings;

      if (currentSettings && pageManager) {
        pageManager.updateSettings(currentSettings);
        updateFloatingVisibility();
      }

      return { success: true, id };

    default:
      console.warn(`[Content Script] Unknown message type: ${type}`);
      return {
        success: false,
        error: `Unknown message type: ${type}`,
        id,
      };
  }
}

export default defineContentScript({
  matches: ["<all_urls>"],
  main(ctx) {
    console.log("[Content Script] Context:", ctx);

    webext.runtime.onMessage.addListener(handleIncomingMessage);

    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", () => {
        initialize();
      });
    } else {
      initialize();
    }

    console.log("[Content Script] Loaded");
  },
});
