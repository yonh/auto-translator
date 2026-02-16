import { beforeEach, describe, expect, it, vi } from "vitest";

type MockSettings = {
  enabled: boolean;
  autoDetect: boolean;
  showFloatingStatusControl: boolean;
  targetLanguage: string;
  openai: {
    apiKey: string;
    baseUrl: string;
    models: string[];
    maxConcurrency: number;
    timeout: number;
    chunkSize: number;
    batchMaxChars: number;
    batchMaxItems: number;
    batchMaxTokens: number;
    batchRetryCount: number;
  };
  cacheEnabled: boolean;
  cacheMaxAge: number;
  blacklist: string[];
  whitelist: string[];
  debugLogging: boolean;
};

const baseSettings: MockSettings = {
  enabled: true,
  autoDetect: false,
  showFloatingStatusControl: true,
  targetLanguage: "zh-CN",
  openai: {
    apiKey: "test-key",
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
  debugLogging: false,
};

let runtimeMessageListener: ((message: any) => any) | null = null;
const storageGetMock = vi.fn();
const storageSetMock = vi.fn();

class MockPageTranslationManagerV2 {
  static instances: MockPageTranslationManagerV2[] = [];

  public initialize = vi.fn().mockResolvedValue(undefined);
  public translatePage = vi.fn().mockResolvedValue(undefined);
  public translateNode = vi.fn().mockResolvedValue(undefined);
  public revertPage = vi.fn().mockResolvedValue(undefined);
  public revertNode = vi.fn().mockResolvedValue(undefined);
  public clearCache = vi.fn().mockResolvedValue(undefined);
  public cancel = vi.fn();
  public getStatus = vi.fn().mockReturnValue("idle");
  public getProgress = vi
    .fn()
    .mockReturnValue({ current: 0, total: 0, percentage: 0 });
  public updateSettings = vi.fn();
  public onStatusChange = vi.fn().mockImplementation(() => () => undefined);

  constructor(public settings: MockSettings) {
    MockPageTranslationManagerV2.instances.push(this);
  }
}

vi.mock("webextension-polyfill", () => ({
  default: {
    runtime: {
      onMessage: {
        addListener: vi.fn((listener: (message: any) => any) => {
          runtimeMessageListener = listener;
        }),
      },
    },
    storage: {
      local: {
        get: storageGetMock,
        set: storageSetMock,
      },
    },
  },
}));

vi.mock("wxt/sandbox", () => ({
  defineContentScript: (config: any) => config,
}));

vi.mock("~/src/core/page-translation-manager-v2", () => ({
  PageTranslationManagerV2: MockPageTranslationManagerV2,
}));

async function loadContentWithSettings(settings: MockSettings): Promise<void> {
  storageGetMock.mockResolvedValue({ settings });
  vi.resetModules();
  runtimeMessageListener = null;
  MockPageTranslationManagerV2.instances = [];

  const contentModule = await import("../../../entrypoints/content");
  contentModule.default.main({});
  await Promise.resolve();
}

describe("Content script lifecycle and message flow", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    runtimeMessageListener = null;
    Object.defineProperty(document, "readyState", {
      value: "complete",
      configurable: true,
    });
    document.body.innerHTML = "";
  });

  it("lazy-initializes manager when settings switch from disabled to enabled", async () => {
    await loadContentWithSettings({ ...baseSettings, enabled: false });

    expect(MockPageTranslationManagerV2.instances).toHaveLength(0);
    expect(document.getElementById("at-floating-toggle")).toBeNull();

    const response = await runtimeMessageListener?.({
      type: "SETTINGS_CHANGED",
      id: "msg-1",
      data: { settings: { ...baseSettings, enabled: true } },
    });

    expect(response).toEqual({ success: true, id: "msg-1" });
    expect(MockPageTranslationManagerV2.instances).toHaveLength(1);
    expect(MockPageTranslationManagerV2.instances[0].initialize).toHaveBeenCalled();
    expect(document.getElementById("at-floating-toggle")).not.toBeNull();
  });

  it("accepts popup updateSettings(data) payload and returns valid getStatus shape", async () => {
    await loadContentWithSettings({ ...baseSettings, enabled: false });

    const updateResponse = await runtimeMessageListener?.({
      type: "updateSettings",
      id: "msg-2",
      data: { enabled: true, showFloatingStatusControl: true },
    });

    expect(updateResponse).toEqual({ success: true, id: "msg-2" });
    expect(MockPageTranslationManagerV2.instances).toHaveLength(1);

    const statusResponse = await runtimeMessageListener?.({
      type: "getStatus",
      id: "msg-3",
      data: {},
    });

    expect(statusResponse).toEqual(
      expect.objectContaining({
        success: true,
        id: "msg-3",
        data: expect.objectContaining({ status: "idle" }),
      }),
    );
  });

  it("tears down manager on disable and rejects translate requests afterward", async () => {
    await loadContentWithSettings({ ...baseSettings, enabled: true });

    expect(MockPageTranslationManagerV2.instances).toHaveLength(1);

    const instance = MockPageTranslationManagerV2.instances[0];

    const disableResponse = await runtimeMessageListener?.({
      type: "SETTINGS_CHANGED",
      id: "msg-4",
      data: { settings: { ...baseSettings, enabled: false } },
    });

    expect(disableResponse).toEqual({ success: true, id: "msg-4" });
    expect(instance.cancel).toHaveBeenCalled();
    expect(document.getElementById("at-floating-toggle")).toBeNull();

    const translateResponse = await runtimeMessageListener?.({
      type: "translatePage",
      id: "msg-5",
      data: {},
    });

    expect(translateResponse).toEqual(
      expect.objectContaining({
        success: false,
        id: "msg-5",
        error: "Translation manager not initialized",
      }),
    );
  });
});
