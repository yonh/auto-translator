var content = function() {
  "use strict";var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);

  var commonjsGlobal = typeof globalThis !== "undefined" ? globalThis : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : {};
  function getDefaultExportFromCjs(x) {
    return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, "default") ? x["default"] : x;
  }
  var browserPolyfill$1 = { exports: {} };
  (function(module, exports$1) {
    (function(global2, factory) {
      {
        factory(module);
      }
    })(typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : commonjsGlobal, function(module2) {
      var _a, _b;
      if (!((_b = (_a = globalThis.chrome) == null ? void 0 : _a.runtime) == null ? void 0 : _b.id)) {
        throw new Error("This script should only be loaded in a browser extension.");
      }
      if (typeof globalThis.browser === "undefined" || Object.getPrototypeOf(globalThis.browser) !== Object.prototype) {
        const CHROME_SEND_MESSAGE_CALLBACK_NO_RESPONSE_MESSAGE = "The message port closed before a response was received.";
        const wrapAPIs = (extensionAPIs) => {
          const apiMetadata = {
            "alarms": {
              "clear": {
                "minArgs": 0,
                "maxArgs": 1
              },
              "clearAll": {
                "minArgs": 0,
                "maxArgs": 0
              },
              "get": {
                "minArgs": 0,
                "maxArgs": 1
              },
              "getAll": {
                "minArgs": 0,
                "maxArgs": 0
              }
            },
            "bookmarks": {
              "create": {
                "minArgs": 1,
                "maxArgs": 1
              },
              "get": {
                "minArgs": 1,
                "maxArgs": 1
              },
              "getChildren": {
                "minArgs": 1,
                "maxArgs": 1
              },
              "getRecent": {
                "minArgs": 1,
                "maxArgs": 1
              },
              "getSubTree": {
                "minArgs": 1,
                "maxArgs": 1
              },
              "getTree": {
                "minArgs": 0,
                "maxArgs": 0
              },
              "move": {
                "minArgs": 2,
                "maxArgs": 2
              },
              "remove": {
                "minArgs": 1,
                "maxArgs": 1
              },
              "removeTree": {
                "minArgs": 1,
                "maxArgs": 1
              },
              "search": {
                "minArgs": 1,
                "maxArgs": 1
              },
              "update": {
                "minArgs": 2,
                "maxArgs": 2
              }
            },
            "browserAction": {
              "disable": {
                "minArgs": 0,
                "maxArgs": 1,
                "fallbackToNoCallback": true
              },
              "enable": {
                "minArgs": 0,
                "maxArgs": 1,
                "fallbackToNoCallback": true
              },
              "getBadgeBackgroundColor": {
                "minArgs": 1,
                "maxArgs": 1
              },
              "getBadgeText": {
                "minArgs": 1,
                "maxArgs": 1
              },
              "getPopup": {
                "minArgs": 1,
                "maxArgs": 1
              },
              "getTitle": {
                "minArgs": 1,
                "maxArgs": 1
              },
              "openPopup": {
                "minArgs": 0,
                "maxArgs": 0
              },
              "setBadgeBackgroundColor": {
                "minArgs": 1,
                "maxArgs": 1,
                "fallbackToNoCallback": true
              },
              "setBadgeText": {
                "minArgs": 1,
                "maxArgs": 1,
                "fallbackToNoCallback": true
              },
              "setIcon": {
                "minArgs": 1,
                "maxArgs": 1
              },
              "setPopup": {
                "minArgs": 1,
                "maxArgs": 1,
                "fallbackToNoCallback": true
              },
              "setTitle": {
                "minArgs": 1,
                "maxArgs": 1,
                "fallbackToNoCallback": true
              }
            },
            "browsingData": {
              "remove": {
                "minArgs": 2,
                "maxArgs": 2
              },
              "removeCache": {
                "minArgs": 1,
                "maxArgs": 1
              },
              "removeCookies": {
                "minArgs": 1,
                "maxArgs": 1
              },
              "removeDownloads": {
                "minArgs": 1,
                "maxArgs": 1
              },
              "removeFormData": {
                "minArgs": 1,
                "maxArgs": 1
              },
              "removeHistory": {
                "minArgs": 1,
                "maxArgs": 1
              },
              "removeLocalStorage": {
                "minArgs": 1,
                "maxArgs": 1
              },
              "removePasswords": {
                "minArgs": 1,
                "maxArgs": 1
              },
              "removePluginData": {
                "minArgs": 1,
                "maxArgs": 1
              },
              "settings": {
                "minArgs": 0,
                "maxArgs": 0
              }
            },
            "commands": {
              "getAll": {
                "minArgs": 0,
                "maxArgs": 0
              }
            },
            "contextMenus": {
              "remove": {
                "minArgs": 1,
                "maxArgs": 1
              },
              "removeAll": {
                "minArgs": 0,
                "maxArgs": 0
              },
              "update": {
                "minArgs": 2,
                "maxArgs": 2
              }
            },
            "cookies": {
              "get": {
                "minArgs": 1,
                "maxArgs": 1
              },
              "getAll": {
                "minArgs": 1,
                "maxArgs": 1
              },
              "getAllCookieStores": {
                "minArgs": 0,
                "maxArgs": 0
              },
              "remove": {
                "minArgs": 1,
                "maxArgs": 1
              },
              "set": {
                "minArgs": 1,
                "maxArgs": 1
              }
            },
            "devtools": {
              "inspectedWindow": {
                "eval": {
                  "minArgs": 1,
                  "maxArgs": 2,
                  "singleCallbackArg": false
                }
              },
              "panels": {
                "create": {
                  "minArgs": 3,
                  "maxArgs": 3,
                  "singleCallbackArg": true
                },
                "elements": {
                  "createSidebarPane": {
                    "minArgs": 1,
                    "maxArgs": 1
                  }
                }
              }
            },
            "downloads": {
              "cancel": {
                "minArgs": 1,
                "maxArgs": 1
              },
              "download": {
                "minArgs": 1,
                "maxArgs": 1
              },
              "erase": {
                "minArgs": 1,
                "maxArgs": 1
              },
              "getFileIcon": {
                "minArgs": 1,
                "maxArgs": 2
              },
              "open": {
                "minArgs": 1,
                "maxArgs": 1,
                "fallbackToNoCallback": true
              },
              "pause": {
                "minArgs": 1,
                "maxArgs": 1
              },
              "removeFile": {
                "minArgs": 1,
                "maxArgs": 1
              },
              "resume": {
                "minArgs": 1,
                "maxArgs": 1
              },
              "search": {
                "minArgs": 1,
                "maxArgs": 1
              },
              "show": {
                "minArgs": 1,
                "maxArgs": 1,
                "fallbackToNoCallback": true
              }
            },
            "extension": {
              "isAllowedFileSchemeAccess": {
                "minArgs": 0,
                "maxArgs": 0
              },
              "isAllowedIncognitoAccess": {
                "minArgs": 0,
                "maxArgs": 0
              }
            },
            "history": {
              "addUrl": {
                "minArgs": 1,
                "maxArgs": 1
              },
              "deleteAll": {
                "minArgs": 0,
                "maxArgs": 0
              },
              "deleteRange": {
                "minArgs": 1,
                "maxArgs": 1
              },
              "deleteUrl": {
                "minArgs": 1,
                "maxArgs": 1
              },
              "getVisits": {
                "minArgs": 1,
                "maxArgs": 1
              },
              "search": {
                "minArgs": 1,
                "maxArgs": 1
              }
            },
            "i18n": {
              "detectLanguage": {
                "minArgs": 1,
                "maxArgs": 1
              },
              "getAcceptLanguages": {
                "minArgs": 0,
                "maxArgs": 0
              }
            },
            "identity": {
              "launchWebAuthFlow": {
                "minArgs": 1,
                "maxArgs": 1
              }
            },
            "idle": {
              "queryState": {
                "minArgs": 1,
                "maxArgs": 1
              }
            },
            "management": {
              "get": {
                "minArgs": 1,
                "maxArgs": 1
              },
              "getAll": {
                "minArgs": 0,
                "maxArgs": 0
              },
              "getSelf": {
                "minArgs": 0,
                "maxArgs": 0
              },
              "setEnabled": {
                "minArgs": 2,
                "maxArgs": 2
              },
              "uninstallSelf": {
                "minArgs": 0,
                "maxArgs": 1
              }
            },
            "notifications": {
              "clear": {
                "minArgs": 1,
                "maxArgs": 1
              },
              "create": {
                "minArgs": 1,
                "maxArgs": 2
              },
              "getAll": {
                "minArgs": 0,
                "maxArgs": 0
              },
              "getPermissionLevel": {
                "minArgs": 0,
                "maxArgs": 0
              },
              "update": {
                "minArgs": 2,
                "maxArgs": 2
              }
            },
            "pageAction": {
              "getPopup": {
                "minArgs": 1,
                "maxArgs": 1
              },
              "getTitle": {
                "minArgs": 1,
                "maxArgs": 1
              },
              "hide": {
                "minArgs": 1,
                "maxArgs": 1,
                "fallbackToNoCallback": true
              },
              "setIcon": {
                "minArgs": 1,
                "maxArgs": 1
              },
              "setPopup": {
                "minArgs": 1,
                "maxArgs": 1,
                "fallbackToNoCallback": true
              },
              "setTitle": {
                "minArgs": 1,
                "maxArgs": 1,
                "fallbackToNoCallback": true
              },
              "show": {
                "minArgs": 1,
                "maxArgs": 1,
                "fallbackToNoCallback": true
              }
            },
            "permissions": {
              "contains": {
                "minArgs": 1,
                "maxArgs": 1
              },
              "getAll": {
                "minArgs": 0,
                "maxArgs": 0
              },
              "remove": {
                "minArgs": 1,
                "maxArgs": 1
              },
              "request": {
                "minArgs": 1,
                "maxArgs": 1
              }
            },
            "runtime": {
              "getBackgroundPage": {
                "minArgs": 0,
                "maxArgs": 0
              },
              "getPlatformInfo": {
                "minArgs": 0,
                "maxArgs": 0
              },
              "openOptionsPage": {
                "minArgs": 0,
                "maxArgs": 0
              },
              "requestUpdateCheck": {
                "minArgs": 0,
                "maxArgs": 0
              },
              "sendMessage": {
                "minArgs": 1,
                "maxArgs": 3
              },
              "sendNativeMessage": {
                "minArgs": 2,
                "maxArgs": 2
              },
              "setUninstallURL": {
                "minArgs": 1,
                "maxArgs": 1
              }
            },
            "sessions": {
              "getDevices": {
                "minArgs": 0,
                "maxArgs": 1
              },
              "getRecentlyClosed": {
                "minArgs": 0,
                "maxArgs": 1
              },
              "restore": {
                "minArgs": 0,
                "maxArgs": 1
              }
            },
            "storage": {
              "local": {
                "clear": {
                  "minArgs": 0,
                  "maxArgs": 0
                },
                "get": {
                  "minArgs": 0,
                  "maxArgs": 1
                },
                "getBytesInUse": {
                  "minArgs": 0,
                  "maxArgs": 1
                },
                "remove": {
                  "minArgs": 1,
                  "maxArgs": 1
                },
                "set": {
                  "minArgs": 1,
                  "maxArgs": 1
                }
              },
              "managed": {
                "get": {
                  "minArgs": 0,
                  "maxArgs": 1
                },
                "getBytesInUse": {
                  "minArgs": 0,
                  "maxArgs": 1
                }
              },
              "sync": {
                "clear": {
                  "minArgs": 0,
                  "maxArgs": 0
                },
                "get": {
                  "minArgs": 0,
                  "maxArgs": 1
                },
                "getBytesInUse": {
                  "minArgs": 0,
                  "maxArgs": 1
                },
                "remove": {
                  "minArgs": 1,
                  "maxArgs": 1
                },
                "set": {
                  "minArgs": 1,
                  "maxArgs": 1
                }
              }
            },
            "tabs": {
              "captureVisibleTab": {
                "minArgs": 0,
                "maxArgs": 2
              },
              "create": {
                "minArgs": 1,
                "maxArgs": 1
              },
              "detectLanguage": {
                "minArgs": 0,
                "maxArgs": 1
              },
              "discard": {
                "minArgs": 0,
                "maxArgs": 1
              },
              "duplicate": {
                "minArgs": 1,
                "maxArgs": 1
              },
              "executeScript": {
                "minArgs": 1,
                "maxArgs": 2
              },
              "get": {
                "minArgs": 1,
                "maxArgs": 1
              },
              "getCurrent": {
                "minArgs": 0,
                "maxArgs": 0
              },
              "getZoom": {
                "minArgs": 0,
                "maxArgs": 1
              },
              "getZoomSettings": {
                "minArgs": 0,
                "maxArgs": 1
              },
              "goBack": {
                "minArgs": 0,
                "maxArgs": 1
              },
              "goForward": {
                "minArgs": 0,
                "maxArgs": 1
              },
              "highlight": {
                "minArgs": 1,
                "maxArgs": 1
              },
              "insertCSS": {
                "minArgs": 1,
                "maxArgs": 2
              },
              "move": {
                "minArgs": 2,
                "maxArgs": 2
              },
              "query": {
                "minArgs": 1,
                "maxArgs": 1
              },
              "reload": {
                "minArgs": 0,
                "maxArgs": 2
              },
              "remove": {
                "minArgs": 1,
                "maxArgs": 1
              },
              "removeCSS": {
                "minArgs": 1,
                "maxArgs": 2
              },
              "sendMessage": {
                "minArgs": 2,
                "maxArgs": 3
              },
              "setZoom": {
                "minArgs": 1,
                "maxArgs": 2
              },
              "setZoomSettings": {
                "minArgs": 1,
                "maxArgs": 2
              },
              "update": {
                "minArgs": 1,
                "maxArgs": 2
              }
            },
            "topSites": {
              "get": {
                "minArgs": 0,
                "maxArgs": 0
              }
            },
            "webNavigation": {
              "getAllFrames": {
                "minArgs": 1,
                "maxArgs": 1
              },
              "getFrame": {
                "minArgs": 1,
                "maxArgs": 1
              }
            },
            "webRequest": {
              "handlerBehaviorChanged": {
                "minArgs": 0,
                "maxArgs": 0
              }
            },
            "windows": {
              "create": {
                "minArgs": 0,
                "maxArgs": 1
              },
              "get": {
                "minArgs": 1,
                "maxArgs": 2
              },
              "getAll": {
                "minArgs": 0,
                "maxArgs": 1
              },
              "getCurrent": {
                "minArgs": 0,
                "maxArgs": 1
              },
              "getLastFocused": {
                "minArgs": 0,
                "maxArgs": 1
              },
              "remove": {
                "minArgs": 1,
                "maxArgs": 1
              },
              "update": {
                "minArgs": 2,
                "maxArgs": 2
              }
            }
          };
          if (Object.keys(apiMetadata).length === 0) {
            throw new Error("api-metadata.json has not been included in browser-polyfill");
          }
          class DefaultWeakMap extends WeakMap {
            constructor(createItem, items = void 0) {
              super(items);
              this.createItem = createItem;
            }
            get(key) {
              if (!this.has(key)) {
                this.set(key, this.createItem(key));
              }
              return super.get(key);
            }
          }
          const isThenable = (value) => {
            return value && typeof value === "object" && typeof value.then === "function";
          };
          const makeCallback = (promise, metadata) => {
            return (...callbackArgs) => {
              if (extensionAPIs.runtime.lastError) {
                promise.reject(new Error(extensionAPIs.runtime.lastError.message));
              } else if (metadata.singleCallbackArg || callbackArgs.length <= 1 && metadata.singleCallbackArg !== false) {
                promise.resolve(callbackArgs[0]);
              } else {
                promise.resolve(callbackArgs);
              }
            };
          };
          const pluralizeArguments = (numArgs) => numArgs == 1 ? "argument" : "arguments";
          const wrapAsyncFunction = (name, metadata) => {
            return function asyncFunctionWrapper(target, ...args) {
              if (args.length < metadata.minArgs) {
                throw new Error(`Expected at least ${metadata.minArgs} ${pluralizeArguments(metadata.minArgs)} for ${name}(), got ${args.length}`);
              }
              if (args.length > metadata.maxArgs) {
                throw new Error(`Expected at most ${metadata.maxArgs} ${pluralizeArguments(metadata.maxArgs)} for ${name}(), got ${args.length}`);
              }
              return new Promise((resolve, reject) => {
                if (metadata.fallbackToNoCallback) {
                  try {
                    target[name](...args, makeCallback({
                      resolve,
                      reject
                    }, metadata));
                  } catch (cbError) {
                    console.warn(`${name} API method doesn't seem to support the callback parameter, falling back to call it without a callback: `, cbError);
                    target[name](...args);
                    metadata.fallbackToNoCallback = false;
                    metadata.noCallback = true;
                    resolve();
                  }
                } else if (metadata.noCallback) {
                  target[name](...args);
                  resolve();
                } else {
                  target[name](...args, makeCallback({
                    resolve,
                    reject
                  }, metadata));
                }
              });
            };
          };
          const wrapMethod = (target, method, wrapper) => {
            return new Proxy(method, {
              apply(targetMethod, thisObj, args) {
                return wrapper.call(thisObj, target, ...args);
              }
            });
          };
          let hasOwnProperty = Function.call.bind(Object.prototype.hasOwnProperty);
          const wrapObject = (target, wrappers = {}, metadata = {}) => {
            let cache = /* @__PURE__ */ Object.create(null);
            let handlers = {
              has(proxyTarget2, prop) {
                return prop in target || prop in cache;
              },
              get(proxyTarget2, prop, receiver) {
                if (prop in cache) {
                  return cache[prop];
                }
                if (!(prop in target)) {
                  return void 0;
                }
                let value = target[prop];
                if (typeof value === "function") {
                  if (typeof wrappers[prop] === "function") {
                    value = wrapMethod(target, target[prop], wrappers[prop]);
                  } else if (hasOwnProperty(metadata, prop)) {
                    let wrapper = wrapAsyncFunction(prop, metadata[prop]);
                    value = wrapMethod(target, target[prop], wrapper);
                  } else {
                    value = value.bind(target);
                  }
                } else if (typeof value === "object" && value !== null && (hasOwnProperty(wrappers, prop) || hasOwnProperty(metadata, prop))) {
                  value = wrapObject(value, wrappers[prop], metadata[prop]);
                } else if (hasOwnProperty(metadata, "*")) {
                  value = wrapObject(value, wrappers[prop], metadata["*"]);
                } else {
                  Object.defineProperty(cache, prop, {
                    configurable: true,
                    enumerable: true,
                    get() {
                      return target[prop];
                    },
                    set(value2) {
                      target[prop] = value2;
                    }
                  });
                  return value;
                }
                cache[prop] = value;
                return value;
              },
              set(proxyTarget2, prop, value, receiver) {
                if (prop in cache) {
                  cache[prop] = value;
                } else {
                  target[prop] = value;
                }
                return true;
              },
              defineProperty(proxyTarget2, prop, desc) {
                return Reflect.defineProperty(cache, prop, desc);
              },
              deleteProperty(proxyTarget2, prop) {
                return Reflect.deleteProperty(cache, prop);
              }
            };
            let proxyTarget = Object.create(target);
            return new Proxy(proxyTarget, handlers);
          };
          const wrapEvent = (wrapperMap) => ({
            addListener(target, listener, ...args) {
              target.addListener(wrapperMap.get(listener), ...args);
            },
            hasListener(target, listener) {
              return target.hasListener(wrapperMap.get(listener));
            },
            removeListener(target, listener) {
              target.removeListener(wrapperMap.get(listener));
            }
          });
          const onRequestFinishedWrappers = new DefaultWeakMap((listener) => {
            if (typeof listener !== "function") {
              return listener;
            }
            return function onRequestFinished(req) {
              const wrappedReq = wrapObject(
                req,
                {},
                {
                  getContent: {
                    minArgs: 0,
                    maxArgs: 0
                  }
                }
              );
              listener(wrappedReq);
            };
          });
          const onMessageWrappers = new DefaultWeakMap((listener) => {
            if (typeof listener !== "function") {
              return listener;
            }
            return function onMessage(message, sender, sendResponse) {
              let didCallSendResponse = false;
              let wrappedSendResponse;
              let sendResponsePromise = new Promise((resolve) => {
                wrappedSendResponse = function(response) {
                  didCallSendResponse = true;
                  resolve(response);
                };
              });
              let result2;
              try {
                result2 = listener(message, sender, wrappedSendResponse);
              } catch (err) {
                result2 = Promise.reject(err);
              }
              const isResultThenable = result2 !== true && isThenable(result2);
              if (result2 !== true && !isResultThenable && !didCallSendResponse) {
                return false;
              }
              const sendPromisedResult = (promise) => {
                promise.then((msg) => {
                  sendResponse(msg);
                }, (error) => {
                  let message2;
                  if (error && (error instanceof Error || typeof error.message === "string")) {
                    message2 = error.message;
                  } else {
                    message2 = "An unexpected error occurred";
                  }
                  sendResponse({
                    __mozWebExtensionPolyfillReject__: true,
                    message: message2
                  });
                }).catch((err) => {
                  console.error("Failed to send onMessage rejected reply", err);
                });
              };
              if (isResultThenable) {
                sendPromisedResult(result2);
              } else {
                sendPromisedResult(sendResponsePromise);
              }
              return true;
            };
          });
          const wrappedSendMessageCallback = ({
            reject,
            resolve
          }, reply) => {
            if (extensionAPIs.runtime.lastError) {
              if (extensionAPIs.runtime.lastError.message === CHROME_SEND_MESSAGE_CALLBACK_NO_RESPONSE_MESSAGE) {
                resolve();
              } else {
                reject(new Error(extensionAPIs.runtime.lastError.message));
              }
            } else if (reply && reply.__mozWebExtensionPolyfillReject__) {
              reject(new Error(reply.message));
            } else {
              resolve(reply);
            }
          };
          const wrappedSendMessage = (name, metadata, apiNamespaceObj, ...args) => {
            if (args.length < metadata.minArgs) {
              throw new Error(`Expected at least ${metadata.minArgs} ${pluralizeArguments(metadata.minArgs)} for ${name}(), got ${args.length}`);
            }
            if (args.length > metadata.maxArgs) {
              throw new Error(`Expected at most ${metadata.maxArgs} ${pluralizeArguments(metadata.maxArgs)} for ${name}(), got ${args.length}`);
            }
            return new Promise((resolve, reject) => {
              const wrappedCb = wrappedSendMessageCallback.bind(null, {
                resolve,
                reject
              });
              args.push(wrappedCb);
              apiNamespaceObj.sendMessage(...args);
            });
          };
          const staticWrappers = {
            devtools: {
              network: {
                onRequestFinished: wrapEvent(onRequestFinishedWrappers)
              }
            },
            runtime: {
              onMessage: wrapEvent(onMessageWrappers),
              onMessageExternal: wrapEvent(onMessageWrappers),
              sendMessage: wrappedSendMessage.bind(null, "sendMessage", {
                minArgs: 1,
                maxArgs: 3
              })
            },
            tabs: {
              sendMessage: wrappedSendMessage.bind(null, "sendMessage", {
                minArgs: 2,
                maxArgs: 3
              })
            }
          };
          const settingMetadata = {
            clear: {
              minArgs: 1,
              maxArgs: 1
            },
            get: {
              minArgs: 1,
              maxArgs: 1
            },
            set: {
              minArgs: 1,
              maxArgs: 1
            }
          };
          apiMetadata.privacy = {
            network: {
              "*": settingMetadata
            },
            services: {
              "*": settingMetadata
            },
            websites: {
              "*": settingMetadata
            }
          };
          return wrapObject(extensionAPIs, staticWrappers, apiMetadata);
        };
        module2.exports = wrapAPIs(chrome);
      } else {
        module2.exports = globalThis.browser;
      }
    });
  })(browserPolyfill$1);
  var browserPolyfillExports$1 = browserPolyfill$1.exports;
  const webext = /* @__PURE__ */ getDefaultExportFromCjs(browserPolyfillExports$1);
  function defineContentScript(definition2) {
    return definition2;
  }
  const LANGUAGE_DETECTION_PATTERNS = {
    "zh-CN": /[\u4e00-\u9fa5]/,
    "ja": /[\u3040-\u309f\u30a0-\u30ff]/,
    "ko": /[\uac00-\ud7af]/,
    "ru": /[\u0400-\u04ff]/,
    "ar": /[\u0600-\u06ff]/,
    "th": /[\u0e00-\u0e7f]/
  };
  content;
  class LanguageDetector {
    constructor() {
      this.sampleSize = 200;
      this.confidenceThreshold = 0.3;
    }
    detect(text) {
      if (!text || text.trim().length === 0) {
        return { detected: "en", confidence: 0 };
      }
      const sample = this.getSampleText(text);
      const matches = this.analyzeSample(sample);
      if (matches.length === 0) {
        return { detected: "en", confidence: 0 };
      }
      const bestMatch = matches[0];
      if (bestMatch.confidence < this.confidenceThreshold) {
        return { detected: "en", confidence: 0 };
      }
      return bestMatch;
    }
    getSampleText(text) {
      const cleaned = text.replace(/\s+/g, " ").replace(/[^\w\s\u4e00-\u9fff\u3040-\u309f\u30a0-\u30ff\uac00-\ud7af\u0400-\u04ff\u0600-\u06ff\u0e00-\u0e7f]/g, "").trim();
      return cleaned.slice(0, this.sampleSize);
    }
    analyzeSample(sample) {
      const results = [];
      for (const [lang, pattern] of Object.entries(LANGUAGE_DETECTION_PATTERNS)) {
        const matches = sample.match(new RegExp(pattern.source, "g"));
        const matchCount = matches ? matches.length : 0;
        const confidence = matchCount / sample.length;
        if (matchCount > 0) {
          results.push({
            detected: lang,
            confidence
          });
        }
      }
      return results.sort((a, b) => b.confidence - a.confidence);
    }
    detectPageLanguage() {
      var _a;
      const htmlLang = document.documentElement.lang;
      if (htmlLang && htmlLang !== "en") {
        return htmlLang;
      }
      const metaLang = document.querySelector('meta[http-equiv="Content-Language"]');
      if (metaLang) {
        const lang = metaLang.getAttribute("content");
        if (lang && lang !== "en") {
          return lang;
        }
      }
      const bodyText = ((_a = document.body) == null ? void 0 : _a.textContent) || "";
      const detection = this.detect(bodyText);
      return detection.detected;
    }
    shouldTranslate(targetLanguage) {
      const pageLanguage = this.detectPageLanguage();
      if (pageLanguage === targetLanguage) {
        return false;
      }
      if (pageLanguage.startsWith(targetLanguage) || targetLanguage.startsWith(pageLanguage)) {
        return false;
      }
      return true;
    }
  }
  const languageDetector = new LanguageDetector();
  content;
  const browser$2 = webext;
  const CACHE_PREFIX = "trans_cache_";
  const CACHE_INDEX = "trans_cache_index";
  class TranslationCache {
    constructor() {
      this.cacheIndex = /* @__PURE__ */ new Map();
      this.maxAge = 7 * 24 * 60 * 60 * 1e3;
    }
    // 7 days default
    async init(maxAge) {
      if (maxAge) {
        this.maxAge = maxAge;
      }
      const indexData = await browser$2.storage.local.get(CACHE_INDEX);
      this.cacheIndex = new Map(Object.entries(indexData[CACHE_INDEX] || {}));
      await this.cleanExpired();
    }
    generateHash(text, sourceLang, targetLang, model) {
      return `${sourceLang}:${targetLang}:${model}:${this.hashCode(text)}`;
    }
    hashCode(str) {
      let hash = 0;
      for (let i = 0; i < str.length; i++) {
        const char = str.charCodeAt(i);
        hash = (hash << 5) - hash + char;
        hash = hash & hash;
      }
      return Math.abs(hash);
    }
    async get(text, sourceLang, targetLang, model) {
      const hash = this.generateHash(text, sourceLang, targetLang, model);
      const cacheKey = `${CACHE_PREFIX}${hash}`;
      const data = await browser$2.storage.local.get(cacheKey);
      const entry = data[cacheKey];
      if (!entry) {
        return null;
      }
      const now = Date.now();
      if (now - entry.timestamp > this.maxAge) {
        await this.delete(hash);
        return null;
      }
      return entry;
    }
    async set(text, sourceLang, targetLang, model, translatedText) {
      const hash = this.generateHash(text, sourceLang, targetLang, model);
      const cacheKey = `${CACHE_PREFIX}${hash}`;
      const entry = {
        originalText: text,
        translatedText,
        sourceLang,
        targetLang,
        model,
        timestamp: Date.now(),
        hash
      };
      await browser$2.storage.local.set({ [cacheKey]: entry });
      this.cacheIndex.set(hash, entry.timestamp);
      await this.saveIndex();
      await this.cleanOldEntries();
    }
    async delete(hash) {
      const cacheKey = `${CACHE_PREFIX}${hash}`;
      await browser$2.storage.local.remove(cacheKey);
      this.cacheIndex.delete(hash);
      await this.saveIndex();
    }
    async clear() {
      const keys = Array.from(this.cacheIndex.keys());
      const cacheKeys = keys.map((k) => `${CACHE_PREFIX}${k}`);
      await browser$2.storage.local.remove([...cacheKeys, CACHE_INDEX]);
      this.cacheIndex.clear();
    }
    async saveIndex() {
      const indexObj = Object.fromEntries(this.cacheIndex);
      await browser$2.storage.local.set({ [CACHE_INDEX]: indexObj });
    }
    async cleanExpired() {
      const now = Date.now();
      const expired = [];
      for (const [hash, timestamp] of this.cacheIndex.entries()) {
        if (now - timestamp > this.maxAge) {
          expired.push(hash);
        }
      }
      for (const hash of expired) {
        await this.delete(hash);
      }
    }
    async cleanOldEntries() {
      const maxEntries = 1e4;
      if (this.cacheIndex.size <= maxEntries) {
        return;
      }
      const entries = Array.from(this.cacheIndex.entries()).sort((a, b) => a[1] - b[1]);
      const toRemove = entries.slice(0, entries.length - maxEntries);
      for (const [hash] of toRemove) {
        await this.delete(hash);
      }
    }
    async getStats() {
      if (this.cacheIndex.size === 0) {
        return { size: 0, oldestTimestamp: 0, newestTimestamp: 0 };
      }
      const timestamps = Array.from(this.cacheIndex.values());
      return {
        size: this.cacheIndex.size,
        oldestTimestamp: Math.min(...timestamps),
        newestTimestamp: Math.max(...timestamps)
      };
    }
  }
  const translationCache = new TranslationCache();
  content;
  class OpenAIService {
    constructor(config) {
      this.activeRequests = /* @__PURE__ */ new Map();
      this.requestQueue = [];
      this.config = config;
    }
    updateConfig(config) {
      this.config = { ...this.config, ...config };
    }
    async translate(req) {
      const model = req.model || this.config.models[0];
      const cacheKey = `${req.sourceLang}:${req.targetLang}:${model}`;
      if (this.config.maxConcurrency > 0) {
        await this.waitSlot();
      }
      try {
        const cached = await translationCache.get(
          req.text,
          req.sourceLang,
          req.targetLang,
          model
        );
        if (cached) {
          return {
            originalText: req.text,
            translatedText: cached.translatedText,
            sourceLang: req.sourceLang,
            targetLang: req.targetLang,
            model: cached.model,
            cached: true
          };
        }
        const abortController = new AbortController();
        const requestId = `${cacheKey}:${Date.now()}`;
        this.activeRequests.set(requestId, abortController);
        const translatedText = await this.translateWithModel(
          req.text,
          req.sourceLang,
          req.targetLang,
          model,
          abortController.signal
        );
        await translationCache.set(
          req.text,
          req.sourceLang,
          req.targetLang,
          model,
          translatedText
        );
        this.activeRequests.delete(requestId);
        this.releaseSlot();
        return {
          originalText: req.text,
          translatedText,
          sourceLang: req.sourceLang,
          targetLang: req.targetLang,
          model,
          cached: false
        };
      } catch (error) {
        this.releaseSlot();
        throw error;
      }
    }
    async translateBatch(requests) {
      if (requests.length === 0) {
        return [];
      }
      const model = requests[0].model || this.config.models[0];
      if (this.config.models.length > 1) {
        return this.translateBatchWithMultipleModels(requests);
      }
      const batchSize = Math.min(this.config.maxConcurrency || 1, requests.length);
      const results = [];
      for (let i = 0; i < requests.length; i += batchSize) {
        const batch = requests.slice(i, i + batchSize);
        const batchResults = await Promise.allSettled(
          batch.map((req) => this.translate(req))
        );
        for (const result2 of batchResults) {
          if (result2.status === "fulfilled") {
            results.push(result2.value);
          } else {
            results.push({
              originalText: requests[results.length].text,
              translatedText: requests[results.length].text,
              sourceLang: requests[results.length].sourceLang,
              targetLang: requests[results.length].targetLang,
              model,
              cached: false
            });
          }
        }
      }
      return results;
    }
    async translateBatchWithMultipleModels(requests) {
      const modelCounts = Math.ceil(
        (this.config.maxConcurrency || 1) / this.config.models.length
      );
      const results = [];
      for (const model of this.config.models) {
        const modelRequests = requests.filter(
          (r) => !r.model || r.model === model
        );
        if (modelRequests.length === 0) {
          continue;
        }
        const batches = [];
        for (let i = 0; i < modelRequests.length; i += modelCounts) {
          batches.push(modelRequests.slice(i, i + modelCounts));
        }
        for (const batch of batches) {
          const batchResults = await Promise.allSettled(
            batch.map(
              (req) => this.translate({ ...req, model })
            )
          );
          for (const result2 of batchResults) {
            if (result2.status === "fulfilled") {
              results.push(result2.value);
            } else {
              results.push({
                originalText: requests[results.length].text,
                translatedText: requests[results.length].text,
                sourceLang: requests[results.length].sourceLang,
                targetLang: requests[results.length].targetLang,
                model,
                cached: false
              });
            }
          }
        }
      }
      return results;
    }
    async translateWithModel(text, sourceLang, targetLang, model, signal) {
      const prompt = this.buildPrompt(text, sourceLang, targetLang);
      const requestBody = {
        model,
        messages: [
          {
            role: "system",
            content: "You are a professional translator. Translate given text accurately while preserving original meaning and tone."
          },
          {
            role: "user",
            content: prompt
          }
        ],
        temperature: 0.3,
        max_tokens: 2e3
      };
      let apiUrl = this.config.baseUrl;
      if (!apiUrl.endsWith("/chat/completions")) {
        apiUrl = apiUrl.replace(/\/$/, "") + "/chat/completions";
      }
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${this.config.apiKey}`
        },
        body: JSON.stringify(requestBody),
        signal
      });
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`OpenAI API error: ${response.status} - ${errorText}`);
      }
      const data = await response.json();
      if (!data.choices || data.choices.length === 0) {
        throw new Error("No translation returned from OpenAI API");
      }
      return data.choices[0].message.content.trim();
    }
    buildPrompt(text, sourceLang, targetLang) {
      return `Translate the following text from ${sourceLang} to ${targetLang}:

${text}

Provide only the translation, no explanations.`;
    }
    async waitSlot() {
      const activeCount = this.activeRequests.size;
      if (activeCount < this.config.maxConcurrency) {
        return;
      }
      return new Promise((resolve) => {
        this.requestQueue.push(resolve);
      });
    }
    releaseSlot() {
      const next = this.requestQueue.shift();
      if (next) {
        next();
      }
    }
    cancelAll() {
      for (const controller of this.activeRequests.values()) {
        controller.abort();
      }
      this.activeRequests.clear();
      this.requestQueue = [];
    }
    getActiveRequestCount() {
      return this.activeRequests.size;
    }
  }
  let openaiService = null;
  function getOpenAIService(config) {
    if (!openaiService && config) {
      openaiService = new OpenAIService(config);
    }
    return openaiService;
  }
  content;
  const browser$1 = webext;
  const enableDevTools = () => {
    const debugObj = {
      timestamp: Date.now(),
      version: "1.0.0-dev",
      modules: {
        translationManager: null,
        languageDetector: null,
        openaiService: null,
        translationCache: null
      },
      registerModule(name, module) {
        this.modules[name] = module;
        console.log(`[DEBUG] Module registered: ${name}`);
      },
      async healthCheck() {
        var _a, _b, _c;
        console.log("=== Auto Translator Health Check ===");
        console.log("Timestamp:", (/* @__PURE__ */ new Date()).toISOString());
        console.log("\n--- Modules ---");
        for (const [name, module] of Object.entries(this.modules)) {
          console.log(`${name}:`, module ? "✓" : "✗");
        }
        try {
          const settings = await browser$1.storage.local.get("settings");
          console.log("\n--- Settings ---");
          console.log("Settings loaded:", !!settings.settings);
          if (settings.settings) {
            console.log("Plugin enabled:", settings.settings.enabled);
            console.log("Target language:", settings.settings.targetLanguage);
            console.log("API Key configured:", !!((_a = settings.settings.openai) == null ? void 0 : _a.apiKey));
            console.log("Models:", (_b = settings.settings.openai) == null ? void 0 : _b.models);
            console.log("Max concurrency:", (_c = settings.settings.openai) == null ? void 0 : _c.maxConcurrency);
          }
        } catch (error) {
          console.error("Error reading settings:", error);
        }
        try {
          if (this.modules.translationCache) {
            const stats = await this.modules.translationCache.getStats();
            console.log("\n--- Cache ---");
            console.log("Cache entries:", stats.size);
            console.log("Oldest entry:", new Date(stats.oldestTimestamp));
            console.log("Newest entry:", new Date(stats.newestTimestamp));
          }
        } catch (error) {
          console.error("Error checking cache:", error);
        }
        try {
          if (this.modules.openaiService) {
            const activeCount = this.modules.openaiService.getActiveRequestCount();
            console.log("\n--- Requests ---");
            console.log("Active requests:", activeCount);
          }
        } catch (error) {
          console.error("Error checking requests:", error);
        }
        try {
          if (this.modules.languageDetector) {
            const pageLang = this.modules.languageDetector.detectPageLanguage();
            console.log("\n--- Page ---");
            console.log("Detected language:", pageLang);
            console.log("URL:", window.location.href);
          }
        } catch (error) {
          console.error("Error detecting language:", error);
        }
        console.log("\n=========================\n");
      },
      async testTranslation(text = "Hello, world!") {
        var _a, _b, _c, _d;
        console.log("=== Translation Test ===");
        console.log("Input:", text);
        if (!this.modules.openaiService) {
          console.error("OpenAI service not available");
          return;
        }
        try {
          const settings = await browser$1.storage.local.get("settings");
          const targetLang = ((_a = settings.settings) == null ? void 0 : _a.targetLanguage) || "zh-CN";
          const model = ((_d = (_c = (_b = settings.settings) == null ? void 0 : _b.openai) == null ? void 0 : _c.models) == null ? void 0 : _d[0]) || "gpt-3.5-turbo";
          console.log("Model:", model);
          console.log("Target language:", targetLang);
          const result2 = await this.modules.openaiService.translate({
            text,
            sourceLang: "en",
            targetLang,
            model
          });
          console.log("Translation result:", result2.translatedText);
          console.log("Cached:", result2.cached);
          console.log("=== Test Complete ===\n");
        } catch (error) {
          console.error("Translation test failed:", error);
        }
      },
      async testBatchTranslation() {
        console.log("=== Batch Translation Test ===");
        if (!this.modules.openaiService) {
          console.error("OpenAI service not available");
          return;
        }
        const requests = [
          { text: "Hello", sourceLang: "en", targetLang: "zh-CN" },
          { text: "World", sourceLang: "en", targetLang: "zh-CN" },
          { text: "Test", sourceLang: "en", targetLang: "zh-CN" }
        ];
        console.log("Requests:", requests.length);
        try {
          const results = await this.modules.openaiService.translateBatch(requests);
          console.table(results);
          console.log("=== Test Complete ===\n");
        } catch (error) {
          console.error("Batch translation test failed:", error);
        }
      },
      async testCache() {
        console.log("=== Cache Test ===");
        if (!this.modules.translationCache) {
          console.error("Translation cache not available");
          return;
        }
        const testText = "test text";
        const translatedText = "测试文本";
        try {
          await this.modules.translationCache.set(
            testText,
            "en",
            "zh-CN",
            "gpt-3.5-turbo",
            translatedText
          );
          console.log("✓ Cache set");
          const cached = await this.modules.translationCache.get(
            testText,
            "en",
            "zh-CN",
            "gpt-3.5-turbo"
          );
          if (cached) {
            console.log("✓ Cache hit");
            console.log("Original:", cached.originalText);
            console.log("Translated:", cached.translatedText);
            console.log("Timestamp:", new Date(cached.timestamp));
          } else {
            console.log("✗ Cache miss");
          }
          const hash = this.modules.translationCache.generateHash(
            testText,
            "en",
            "zh-CN",
            "gpt-3.5-turbo"
          );
          await this.modules.translationCache.delete(hash);
          console.log("✓ Test cache cleared");
          console.log("=== Test Complete ===\n");
        } catch (error) {
          console.error("Cache test failed:", error);
        }
      },
      async testLanguageDetection() {
        console.log("=== Language Detection Test ===");
        if (!this.modules.languageDetector) {
          console.error("Language detector not available");
          return;
        }
        const tests = [
          { text: "Hello world", expected: "en" },
          { text: "你好世界", expected: "zh-CN" },
          { text: "こんにちは世界", expected: "ja" },
          { text: "안녕하세요 세계", expected: "ko" },
          { text: "Привет мир", expected: "ru" }
        ];
        const results = [];
        for (const test of tests) {
          const detected = this.modules.languageDetector.detect(test.text);
          results.push({
            text: test.text,
            expected: test.expected,
            detected: detected.detected,
            confidence: detected.confidence.toFixed(2),
            match: detected.detected === test.expected
          });
        }
        console.table(results);
        console.log("=== Test Complete ===\n");
      },
      showPageInfo() {
        console.log("=== Page Information ===");
        console.log("URL:", window.location.href);
        console.log("Title:", document.title);
        console.log("Language (HTML):", document.documentElement.lang);
        if (this.modules.languageDetector) {
          const detectedLang = this.modules.languageDetector.detectPageLanguage();
          console.log("Detected language:", detectedLang);
        }
        const allElements = document.querySelectorAll("*");
        let textElements = 0;
        let totalTextLength = 0;
        allElements.forEach((el) => {
          var _a;
          const text = (_a = el.textContent) == null ? void 0 : _a.trim();
          if (text && text.length > 2) {
            textElements++;
            totalTextLength += text.length;
          }
        });
        console.log("Total elements:", allElements.length);
        console.log("Text elements:", textElements);
        console.log("Total text length:", totalTextLength);
        console.log("========================\n");
      },
      async clearAllCache() {
        console.log("=== Clearing All Cache ===");
        if (!this.modules.translationCache) {
          console.error("Translation cache not available");
          return;
        }
        try {
          await this.modules.translationCache.clear();
          console.log("✓ All cache cleared\n");
        } catch (error) {
          console.error("Failed to clear cache:", error);
        }
      },
      async reloadPlugin() {
        console.log("=== Reloading Plugin ===");
        try {
          await browser$1.runtime.reload();
          console.log("✓ Plugin reloaded\n");
        } catch (error) {
          console.error("Failed to reload plugin:", error);
        }
      },
      showHelp() {
        console.log("=== Auto Translator Debug Commands ===");
        console.log("window.__DEBUG__.healthCheck()      - Run full health check");
        console.log("window.__DEBUG__.testTranslation()   - Test single translation");
        console.log("window.__DEBUG__.testBatchTranslation() - Test batch translation");
        console.log("window.__DEBUG__.testCache()         - Test cache operations");
        console.log("window.__DEBUG__.testLanguageDetection() - Test language detection");
        console.log("window.__DEBUG__.showPageInfo()      - Show page information");
        console.log("window.__DEBUG__.clearAllCache()     - Clear all cache");
        console.log("window.__DEBUG__.reloadPlugin()       - Reload plugin");
        console.log("window.__DEBUG__.showHelp()          - Show this help");
        console.log("====================================\n");
      }
    };
    window.__DEBUG__ = debugObj;
    console.log("%c[Auto Translator] %cDebug tools loaded", "color: #3b82f6; font-weight: bold;", "color: #666;");
    console.log("Use window.__DEBUG__.showHelp() to see available commands");
    console.log("Use window.__DEBUG__.healthCheck() to run a quick check\n");
  };
  if (typeof window !== "undefined") {
    enableDevTools();
  }
  content;
  const definition = defineContentScript({
    matches: ["<all_urls>"],
    runAt: "document_idle",
    main() {
      const browser2 = webext;
      console.log("[Content Script] Loading...");
      let isInitialized = false;
      browser2.runtime.onMessage.addListener((message, sender, sendResponse) => {
        console.log("[Content Script] Received message:", message.type, "Initialized:", isInitialized);
        if (message.type === "getSettings") {
          if (window.__TRANSLATION_MANAGER__) {
            sendResponse(window.__TRANSLATION_MANAGER__.getSettings());
          } else {
            sendResponse({ error: "Manager not ready yet" });
          }
        } else if (message.type === "updateSettings") {
          if (window.__TRANSLATION_MANAGER__) {
            window.__TRANSLATION_MANAGER__.updateSettings(message.settings).then(() => {
              sendResponse({ success: true });
            }).catch((error) => {
              console.error("[Content Script] Update settings failed:", error);
              sendResponse({ success: false, error: error.message });
            });
            return true;
          } else {
            sendResponse({ error: "Manager not ready yet" });
          }
        } else if (message.type === "translatePage") {
          if (window.__TRANSLATION_MANAGER__) {
            console.log("[Content Script] Starting translation...");
            window.__TRANSLATION_MANAGER__.translatePage().then(() => {
              console.log("[Content Script] Translation completed");
              sendResponse({ success: true });
            }).catch((error) => {
              console.error("[Content Script] Translation failed:", error);
              sendResponse({ success: false, error: error.message });
            });
            return true;
          } else {
            console.warn("[Content Script] Manager not ready, queueing translation...");
            setTimeout(() => {
              if (window.__TRANSLATION_MANAGER__) {
                window.__TRANSLATION_MANAGER__.translatePage().then(() => {
                  sendResponse({ success: true });
                }).catch((error) => {
                  sendResponse({ success: false, error: error.message });
                });
              } else {
                sendResponse({ success: false, error: "Manager still not ready" });
              }
            }, 500);
          }
        } else if (message.type === "getStatus") {
          if (window.__TRANSLATION_MANAGER__) {
            sendResponse({ status: window.__TRANSLATION_MANAGER__.getStatus() });
          } else {
            sendResponse({ status: "idle" });
          }
        } else if (message.type === "revertAll") {
          if (window.__TRANSLATION_MANAGER__) {
            window.__TRANSLATION_MANAGER__.revertAll().then(() => {
              sendResponse({ success: true });
            }).catch((error) => {
              console.error("[Content Script] Revert all failed:", error);
              sendResponse({ success: false, error: error.message });
            });
            return true;
          } else {
            sendResponse({ error: "Manager not ready yet" });
          }
        } else if (message.type === "clearCache") {
          translationCache.clear().then(() => {
            var _a, _b;
            if (window.__TRANSLATION_MANAGER__) {
              (_b = (_a = window.__TRANSLATION_MANAGER__["translatedElements"]) == null ? void 0 : _a.clear) == null ? void 0 : _b.call(_a);
            }
            sendResponse({ success: true });
            setTimeout(() => location.reload(), 100);
          }).catch((error) => {
            console.error("[Content Script] Clear cache failed:", error);
            sendResponse({ success: false, error: error.message });
          });
          return true;
        }
        return true;
      });
      class TranslationManagerImpl {
        constructor() {
          this.settings = {
            enabled: true,
            autoDetect: true,
            targetLanguage: "zh-CN",
            openai: {
              apiKey: "",
              baseUrl: "https://api.openai.com/v1",
              models: ["gpt-3.5-turbo"],
              maxConcurrency: 5,
              timeout: 3e4
            },
            cacheEnabled: true,
            cacheMaxAge: 7 * 24 * 60 * 60 * 1e3,
            blacklist: [],
            whitelist: [],
            showTranslationBadge: true
          };
          this.status = "idle";
          this.translatedElements = /* @__PURE__ */ new Set();
          this.observer = null;
          this.pendingTranslations = /* @__PURE__ */ new Set();
        }
        async init() {
          console.log("[TranslationManager] Initializing...");
          await this.loadSettings();
          if (this.settings.cacheEnabled) {
            await translationCache.init(this.settings.cacheMaxAge);
          }
          if (this.settings.openai.apiKey) {
            getOpenAIService(this.settings.openai);
            console.log("[TranslationManager] OpenAI service initialized with models:", this.settings.openai.models);
          }
          this.setupObserver();
          isInitialized = true;
          console.log("[TranslationManager] Initialization completed");
        }
        async loadSettings() {
          const data = await browser2.storage.local.get("settings");
          console.log("[TranslationManager] Loaded settings:", data.settings);
          this.settings = { ...this.settings, ...data.settings };
        }
        async saveSettings() {
          await browser2.storage.local.set({ settings: this.settings });
        }
        async updateSettings(updates) {
          console.log("[TranslationManager] Updating settings:", updates);
          this.settings = { ...this.settings, ...updates };
          await this.saveSettings();
          if (updates.openai) {
            getOpenAIService(updates.openai);
            console.log("[TranslationManager] OpenAI config updated");
          }
        }
        getSettings() {
          return { ...this.settings };
        }
        async translatePage() {
          if (!this.settings.enabled) {
            console.log("[TranslationManager] Translation disabled");
            return;
          }
          if (!this.settings.openai.apiKey) {
            console.warn("[TranslationManager] API key not configured");
            return;
          }
          this.status = "detecting";
          if (this.settings.autoDetect) {
            const pageLang = languageDetector.detectPageLanguage();
            console.log("[TranslationManager] Page language:", pageLang);
            if (!languageDetector.shouldTranslate(this.settings.targetLanguage)) {
              console.log("[TranslationManager] Translation not needed");
              this.status = "idle";
              return;
            }
          }
          this.status = "translating";
          console.log("[TranslationManager] Starting translation...");
          const elements = this.findTranslatableElements();
          console.log("[TranslationManager] Found", elements.length, "translatable elements");
          await this.translateElements(elements);
          this.status = "completed";
          console.log("[TranslationManager] Translation completed");
        }
        findTranslatableElements() {
          const translatedSet = /* @__PURE__ */ new Set();
          const walker = document.createTreeWalker(
            document.body,
            NodeFilter.SHOW_TEXT,
            {
              acceptNode: (node2) => {
                var _a;
                let parent = node2.parentElement;
                if (!parent) {
                  return NodeFilter.FILTER_REJECT;
                }
                const text = (_a = node2.textContent) == null ? void 0 : _a.trim();
                if (!text || text.length < 2) {
                  return NodeFilter.FILTER_REJECT;
                }
                if (this.hasExcludedAncestor(parent)) {
                  return NodeFilter.FILTER_REJECT;
                }
                const container = this.findTranslationContainer(parent);
                if (container && !translatedSet.has(container)) {
                  translatedSet.add(container);
                  return NodeFilter.FILTER_ACCEPT;
                }
                return NodeFilter.FILTER_REJECT;
              }
            }
          );
          while (walker.nextNode()) {
          }
          return Array.from(translatedSet);
        }
        findTranslationContainer(element) {
          let current = element;
          let candidate = null;
          while (current && current !== document.body) {
            const tag = current.tagName.toLowerCase();
            if (!this.shouldTranslateElement(current)) {
              return candidate;
            }
            if (["p", "div", "section", "article", "aside", "li", "td", "th", "dt", "dd", "figcaption", "caption"].includes(tag)) {
              candidate = current;
            }
            if (["h1", "h2", "h3", "h4", "h5", "h6"].includes(tag)) {
              return current;
            }
            current = current.parentElement;
          }
          return candidate || document.body;
        }
        shouldTranslateElement(element) {
          const tag = element.tagName.toLowerCase();
          const excludeTags = [
            "script",
            "style",
            "noscript",
            "iframe",
            "svg",
            "canvas",
            "video",
            "audio",
            "code",
            "pre",
            "kbd",
            "samp"
          ];
          if (excludeTags.includes(tag)) {
            return false;
          }
          if (element.getAttribute("translate") === "no") {
            return false;
          }
          if (element.getAttribute("data-translate") === "false") {
            return false;
          }
          const className = element.className;
          if (typeof className === "string" && className.includes("notranslate")) {
            return false;
          }
          return true;
        }
        hasExcludedAncestor(element) {
          let current = element;
          while (current && current !== document.body) {
            const tag = current.tagName.toLowerCase();
            if (["code", "pre", "kbd", "samp"].includes(tag)) {
              return true;
            }
            if (current.getAttribute("translate") === "no" || current.getAttribute("data-translate") === "false" || typeof current.className === "string" && current.className.includes("notranslate")) {
              return true;
            }
            current = current.parentElement;
          }
          return false;
        }
        async translateElements(elements) {
          var _a;
          const service = getOpenAIService();
          if (!service) {
            console.error("[TranslationManager] OpenAI service not available");
            return;
          }
          const requests = [];
          for (const element of elements) {
            if (this.translatedElements.has(element)) {
              continue;
            }
            const text = (_a = element.textContent) == null ? void 0 : _a.trim();
            if (!text || text.length < 3) {
              continue;
            }
            const hash = this.hashText(text);
            if (this.pendingTranslations.has(hash)) {
              continue;
            }
            this.pendingTranslations.add(hash);
            const sourceLang = this.settings.autoDetect ? languageDetector.detect(text).detected : languageDetector.detectPageLanguage();
            requests.push({
              text,
              sourceLang,
              targetLang: this.settings.targetLanguage,
              element
            });
          }
          if (requests.length === 0) {
            console.log("[TranslationManager] No elements to translate");
            return;
          }
          console.log("[TranslationManager] Translating", requests.length, "texts");
          let translatedCount = 0;
          const total = requests.length;
          const batchSize = Math.min(5, this.settings.openai.maxConcurrency || 5);
          for (let i = 0; i < requests.length; i += batchSize) {
            const batch = requests.slice(i, i + batchSize);
            await Promise.allSettled(
              batch.map(async (request) => {
                try {
                  const result2 = await service.translate({
                    text: request.text,
                    sourceLang: request.sourceLang,
                    targetLang: request.targetLang
                  });
                  if (result2 && result2.translatedText !== result2.originalText) {
                    this.applyTranslation(request.element, request.text, result2.translatedText);
                  }
                  translatedCount++;
                  console.log(`[TranslationManager] Translated ${translatedCount}/${total}`);
                } catch (error) {
                  console.error("[TranslationManager] Translation failed for:", request.text, error);
                } finally {
                  const hash = this.hashText(request.text);
                  this.pendingTranslations.delete(hash);
                }
              })
            );
          }
          console.log("[TranslationManager] Translation completed, total:", translatedCount);
        }
        applyTranslation(element, original, translated) {
          if (this.translatedElements.has(element)) {
            return;
          }
          element.setAttribute("data-at-original", original);
          element.setAttribute("data-at-translated", translated);
          const childNodes = Array.from(element.childNodes);
          for (const node of childNodes) {
            if (node.nodeType === Node.TEXT_NODE) {
              const nodeText = node.textContent || "";
              if (nodeText.includes(original)) {
                const newText = nodeText.replace(original, translated);
                node.textContent = newText;
              }
            }
          }
          this.translatedElements.add(element);
          if (this.settings.showTranslationBadge) {
            this.addTranslationBadge(element);
          }
        }
        addTranslationBadge(element) {
          const existingBadge = element.querySelector(".at-badge");
          if (existingBadge) {
            return;
          }
          const position = window.getComputedStyle(element).position;
          if (position === "static") {
            element.style.position = "relative";
          }
          const badge = document.createElement("span");
          badge.className = "at-badge";
          badge.innerHTML = `
          <svg viewBox="0 0 16 16" width="14" height="14" fill="currentColor">
            <path d="M4.5 2A2.5 2.5 0 002 4.5v8A2.5 2.5 0 004.5 15h8a2.5 2.5 0 002.5-2.5v-8A2.5 2.5 0 0012.5 2h-8zm4 3a.5.5 0 01.5.5V8h1a.5.5 0 010-1H4.5z"/>
          </svg>
        `;
          badge.style.cssText = `
          position: absolute;
          top: -4px;
          right: -4px;
          background: #3b82f6;
          color: white;
          border-radius: 4px;
          padding: 2px 4px;
          font-size: 10px;
          cursor: pointer;
          z-index: 10000;
          display: flex;
          align-items: center;
          gap: 2px;
        `;
          badge.addEventListener("click", (e) => {
            e.stopPropagation();
            this.revertTranslation(element);
          });
          element.appendChild(badge);
        }
        revertTranslation(element) {
          const original = element.getAttribute("data-at-original");
          const translated = element.getAttribute("data-at-translated");
          if (original && translated) {
            const childNodes = Array.from(element.childNodes);
            for (const node of childNodes) {
              if (node.nodeType === Node.TEXT_NODE) {
                const nodeText = node.textContent || "";
                if (nodeText.includes(translated)) {
                  node.textContent = nodeText.replace(translated, original);
                }
              }
            }
            element.removeAttribute("data-at-original");
            element.removeAttribute("data-at-translated");
            this.translatedElements.delete(element);
            const badge = element.querySelector(".at-badge");
            if (badge) {
              badge.remove();
            }
          }
        }
        setupObserver() {
          if (this.observer) {
            return;
          }
          this.observer = new MutationObserver(
            this.debounce(() => {
              if (this.status === "completed") {
                console.log("[TranslationManager] Page changed, re-translating...");
                const newElements = this.findTranslatableElements();
                this.translateElements(newElements);
              }
            }, 500)
          );
          this.observer.observe(document.body, {
            childList: true,
            subtree: true
          });
        }
        debounce(func, wait) {
          let timeout = null;
          return (...args) => {
            if (timeout) {
              clearTimeout(timeout);
            }
            timeout = window.setTimeout(() => func(...args), wait);
          };
        }
        hashText(text) {
          let hash = 0;
          for (let i = 0; i < text.length; i++) {
            hash = (hash << 5) - hash + text.charCodeAt(i);
            hash = hash & hash;
          }
          return Math.abs(hash).toString();
        }
        getStatus() {
          return this.status;
        }
        async revertAll() {
          console.log("[TranslationManager] Reverting all translations...");
          const elements = Array.from(this.translatedElements);
          for (const element of elements) {
            this.revertTranslation(element);
          }
          this.translatedElements.clear();
          this.status = "idle";
          console.log("[TranslationManager] All translations reverted");
        }
      }
      const manager = new TranslationManagerImpl();
      window.__TRANSLATION_MANAGER__ = manager;
      if (typeof window !== "undefined" && window.__DEBUG__) {
        window.__DEBUG__.registerModule("translationManager", manager);
        window.__DEBUG__.registerModule("languageDetector", languageDetector);
        window.__DEBUG__.registerModule("openaiService", getOpenAIService());
        window.__DEBUG__.registerModule("translationCache", translationCache);
      }
      if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", () => {
          console.log("[Content Script] DOM loaded, initializing manager...");
          manager.init();
        });
      } else {
        console.log("[Content Script] DOM already loaded, initializing manager immediately...");
        manager.init();
      }
    }
  });
  content;
  var browserPolyfill = { exports: {} };
  (function(module, exports$1) {
    (function(global2, factory) {
      {
        factory(module);
      }
    })(typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : commonjsGlobal, function(module2) {
      if (!(globalThis.chrome && globalThis.chrome.runtime && globalThis.chrome.runtime.id)) {
        throw new Error("This script should only be loaded in a browser extension.");
      }
      if (!(globalThis.browser && globalThis.browser.runtime && globalThis.browser.runtime.id)) {
        const CHROME_SEND_MESSAGE_CALLBACK_NO_RESPONSE_MESSAGE = "The message port closed before a response was received.";
        const wrapAPIs = (extensionAPIs) => {
          const apiMetadata = {
            "alarms": {
              "clear": {
                "minArgs": 0,
                "maxArgs": 1
              },
              "clearAll": {
                "minArgs": 0,
                "maxArgs": 0
              },
              "get": {
                "minArgs": 0,
                "maxArgs": 1
              },
              "getAll": {
                "minArgs": 0,
                "maxArgs": 0
              }
            },
            "bookmarks": {
              "create": {
                "minArgs": 1,
                "maxArgs": 1
              },
              "get": {
                "minArgs": 1,
                "maxArgs": 1
              },
              "getChildren": {
                "minArgs": 1,
                "maxArgs": 1
              },
              "getRecent": {
                "minArgs": 1,
                "maxArgs": 1
              },
              "getSubTree": {
                "minArgs": 1,
                "maxArgs": 1
              },
              "getTree": {
                "minArgs": 0,
                "maxArgs": 0
              },
              "move": {
                "minArgs": 2,
                "maxArgs": 2
              },
              "remove": {
                "minArgs": 1,
                "maxArgs": 1
              },
              "removeTree": {
                "minArgs": 1,
                "maxArgs": 1
              },
              "search": {
                "minArgs": 1,
                "maxArgs": 1
              },
              "update": {
                "minArgs": 2,
                "maxArgs": 2
              }
            },
            "browserAction": {
              "disable": {
                "minArgs": 0,
                "maxArgs": 1,
                "fallbackToNoCallback": true
              },
              "enable": {
                "minArgs": 0,
                "maxArgs": 1,
                "fallbackToNoCallback": true
              },
              "getBadgeBackgroundColor": {
                "minArgs": 1,
                "maxArgs": 1
              },
              "getBadgeText": {
                "minArgs": 1,
                "maxArgs": 1
              },
              "getPopup": {
                "minArgs": 1,
                "maxArgs": 1
              },
              "getTitle": {
                "minArgs": 1,
                "maxArgs": 1
              },
              "openPopup": {
                "minArgs": 0,
                "maxArgs": 0
              },
              "setBadgeBackgroundColor": {
                "minArgs": 1,
                "maxArgs": 1,
                "fallbackToNoCallback": true
              },
              "setBadgeText": {
                "minArgs": 1,
                "maxArgs": 1,
                "fallbackToNoCallback": true
              },
              "setIcon": {
                "minArgs": 1,
                "maxArgs": 1
              },
              "setPopup": {
                "minArgs": 1,
                "maxArgs": 1,
                "fallbackToNoCallback": true
              },
              "setTitle": {
                "minArgs": 1,
                "maxArgs": 1,
                "fallbackToNoCallback": true
              }
            },
            "browsingData": {
              "remove": {
                "minArgs": 2,
                "maxArgs": 2
              },
              "removeCache": {
                "minArgs": 1,
                "maxArgs": 1
              },
              "removeCookies": {
                "minArgs": 1,
                "maxArgs": 1
              },
              "removeDownloads": {
                "minArgs": 1,
                "maxArgs": 1
              },
              "removeFormData": {
                "minArgs": 1,
                "maxArgs": 1
              },
              "removeHistory": {
                "minArgs": 1,
                "maxArgs": 1
              },
              "removeLocalStorage": {
                "minArgs": 1,
                "maxArgs": 1
              },
              "removePasswords": {
                "minArgs": 1,
                "maxArgs": 1
              },
              "removePluginData": {
                "minArgs": 1,
                "maxArgs": 1
              },
              "settings": {
                "minArgs": 0,
                "maxArgs": 0
              }
            },
            "commands": {
              "getAll": {
                "minArgs": 0,
                "maxArgs": 0
              }
            },
            "contextMenus": {
              "remove": {
                "minArgs": 1,
                "maxArgs": 1
              },
              "removeAll": {
                "minArgs": 0,
                "maxArgs": 0
              },
              "update": {
                "minArgs": 2,
                "maxArgs": 2
              }
            },
            "cookies": {
              "get": {
                "minArgs": 1,
                "maxArgs": 1
              },
              "getAll": {
                "minArgs": 1,
                "maxArgs": 1
              },
              "getAllCookieStores": {
                "minArgs": 0,
                "maxArgs": 0
              },
              "remove": {
                "minArgs": 1,
                "maxArgs": 1
              },
              "set": {
                "minArgs": 1,
                "maxArgs": 1
              }
            },
            "devtools": {
              "inspectedWindow": {
                "eval": {
                  "minArgs": 1,
                  "maxArgs": 2,
                  "singleCallbackArg": false
                }
              },
              "panels": {
                "create": {
                  "minArgs": 3,
                  "maxArgs": 3,
                  "singleCallbackArg": true
                },
                "elements": {
                  "createSidebarPane": {
                    "minArgs": 1,
                    "maxArgs": 1
                  }
                }
              }
            },
            "downloads": {
              "cancel": {
                "minArgs": 1,
                "maxArgs": 1
              },
              "download": {
                "minArgs": 1,
                "maxArgs": 1
              },
              "erase": {
                "minArgs": 1,
                "maxArgs": 1
              },
              "getFileIcon": {
                "minArgs": 1,
                "maxArgs": 2
              },
              "open": {
                "minArgs": 1,
                "maxArgs": 1,
                "fallbackToNoCallback": true
              },
              "pause": {
                "minArgs": 1,
                "maxArgs": 1
              },
              "removeFile": {
                "minArgs": 1,
                "maxArgs": 1
              },
              "resume": {
                "minArgs": 1,
                "maxArgs": 1
              },
              "search": {
                "minArgs": 1,
                "maxArgs": 1
              },
              "show": {
                "minArgs": 1,
                "maxArgs": 1,
                "fallbackToNoCallback": true
              }
            },
            "extension": {
              "isAllowedFileSchemeAccess": {
                "minArgs": 0,
                "maxArgs": 0
              },
              "isAllowedIncognitoAccess": {
                "minArgs": 0,
                "maxArgs": 0
              }
            },
            "history": {
              "addUrl": {
                "minArgs": 1,
                "maxArgs": 1
              },
              "deleteAll": {
                "minArgs": 0,
                "maxArgs": 0
              },
              "deleteRange": {
                "minArgs": 1,
                "maxArgs": 1
              },
              "deleteUrl": {
                "minArgs": 1,
                "maxArgs": 1
              },
              "getVisits": {
                "minArgs": 1,
                "maxArgs": 1
              },
              "search": {
                "minArgs": 1,
                "maxArgs": 1
              }
            },
            "i18n": {
              "detectLanguage": {
                "minArgs": 1,
                "maxArgs": 1
              },
              "getAcceptLanguages": {
                "minArgs": 0,
                "maxArgs": 0
              }
            },
            "identity": {
              "launchWebAuthFlow": {
                "minArgs": 1,
                "maxArgs": 1
              }
            },
            "idle": {
              "queryState": {
                "minArgs": 1,
                "maxArgs": 1
              }
            },
            "management": {
              "get": {
                "minArgs": 1,
                "maxArgs": 1
              },
              "getAll": {
                "minArgs": 0,
                "maxArgs": 0
              },
              "getSelf": {
                "minArgs": 0,
                "maxArgs": 0
              },
              "setEnabled": {
                "minArgs": 2,
                "maxArgs": 2
              },
              "uninstallSelf": {
                "minArgs": 0,
                "maxArgs": 1
              }
            },
            "notifications": {
              "clear": {
                "minArgs": 1,
                "maxArgs": 1
              },
              "create": {
                "minArgs": 1,
                "maxArgs": 2
              },
              "getAll": {
                "minArgs": 0,
                "maxArgs": 0
              },
              "getPermissionLevel": {
                "minArgs": 0,
                "maxArgs": 0
              },
              "update": {
                "minArgs": 2,
                "maxArgs": 2
              }
            },
            "pageAction": {
              "getPopup": {
                "minArgs": 1,
                "maxArgs": 1
              },
              "getTitle": {
                "minArgs": 1,
                "maxArgs": 1
              },
              "hide": {
                "minArgs": 1,
                "maxArgs": 1,
                "fallbackToNoCallback": true
              },
              "setIcon": {
                "minArgs": 1,
                "maxArgs": 1
              },
              "setPopup": {
                "minArgs": 1,
                "maxArgs": 1,
                "fallbackToNoCallback": true
              },
              "setTitle": {
                "minArgs": 1,
                "maxArgs": 1,
                "fallbackToNoCallback": true
              },
              "show": {
                "minArgs": 1,
                "maxArgs": 1,
                "fallbackToNoCallback": true
              }
            },
            "permissions": {
              "contains": {
                "minArgs": 1,
                "maxArgs": 1
              },
              "getAll": {
                "minArgs": 0,
                "maxArgs": 0
              },
              "remove": {
                "minArgs": 1,
                "maxArgs": 1
              },
              "request": {
                "minArgs": 1,
                "maxArgs": 1
              }
            },
            "runtime": {
              "getBackgroundPage": {
                "minArgs": 0,
                "maxArgs": 0
              },
              "getPlatformInfo": {
                "minArgs": 0,
                "maxArgs": 0
              },
              "openOptionsPage": {
                "minArgs": 0,
                "maxArgs": 0
              },
              "requestUpdateCheck": {
                "minArgs": 0,
                "maxArgs": 0
              },
              "sendMessage": {
                "minArgs": 1,
                "maxArgs": 3
              },
              "sendNativeMessage": {
                "minArgs": 2,
                "maxArgs": 2
              },
              "setUninstallURL": {
                "minArgs": 1,
                "maxArgs": 1
              }
            },
            "sessions": {
              "getDevices": {
                "minArgs": 0,
                "maxArgs": 1
              },
              "getRecentlyClosed": {
                "minArgs": 0,
                "maxArgs": 1
              },
              "restore": {
                "minArgs": 0,
                "maxArgs": 1
              }
            },
            "storage": {
              "local": {
                "clear": {
                  "minArgs": 0,
                  "maxArgs": 0
                },
                "get": {
                  "minArgs": 0,
                  "maxArgs": 1
                },
                "getBytesInUse": {
                  "minArgs": 0,
                  "maxArgs": 1
                },
                "remove": {
                  "minArgs": 1,
                  "maxArgs": 1
                },
                "set": {
                  "minArgs": 1,
                  "maxArgs": 1
                }
              },
              "managed": {
                "get": {
                  "minArgs": 0,
                  "maxArgs": 1
                },
                "getBytesInUse": {
                  "minArgs": 0,
                  "maxArgs": 1
                }
              },
              "sync": {
                "clear": {
                  "minArgs": 0,
                  "maxArgs": 0
                },
                "get": {
                  "minArgs": 0,
                  "maxArgs": 1
                },
                "getBytesInUse": {
                  "minArgs": 0,
                  "maxArgs": 1
                },
                "remove": {
                  "minArgs": 1,
                  "maxArgs": 1
                },
                "set": {
                  "minArgs": 1,
                  "maxArgs": 1
                }
              }
            },
            "tabs": {
              "captureVisibleTab": {
                "minArgs": 0,
                "maxArgs": 2
              },
              "create": {
                "minArgs": 1,
                "maxArgs": 1
              },
              "detectLanguage": {
                "minArgs": 0,
                "maxArgs": 1
              },
              "discard": {
                "minArgs": 0,
                "maxArgs": 1
              },
              "duplicate": {
                "minArgs": 1,
                "maxArgs": 1
              },
              "executeScript": {
                "minArgs": 1,
                "maxArgs": 2
              },
              "get": {
                "minArgs": 1,
                "maxArgs": 1
              },
              "getCurrent": {
                "minArgs": 0,
                "maxArgs": 0
              },
              "getZoom": {
                "minArgs": 0,
                "maxArgs": 1
              },
              "getZoomSettings": {
                "minArgs": 0,
                "maxArgs": 1
              },
              "goBack": {
                "minArgs": 0,
                "maxArgs": 1
              },
              "goForward": {
                "minArgs": 0,
                "maxArgs": 1
              },
              "highlight": {
                "minArgs": 1,
                "maxArgs": 1
              },
              "insertCSS": {
                "minArgs": 1,
                "maxArgs": 2
              },
              "move": {
                "minArgs": 2,
                "maxArgs": 2
              },
              "query": {
                "minArgs": 1,
                "maxArgs": 1
              },
              "reload": {
                "minArgs": 0,
                "maxArgs": 2
              },
              "remove": {
                "minArgs": 1,
                "maxArgs": 1
              },
              "removeCSS": {
                "minArgs": 1,
                "maxArgs": 2
              },
              "sendMessage": {
                "minArgs": 2,
                "maxArgs": 3
              },
              "setZoom": {
                "minArgs": 1,
                "maxArgs": 2
              },
              "setZoomSettings": {
                "minArgs": 1,
                "maxArgs": 2
              },
              "update": {
                "minArgs": 1,
                "maxArgs": 2
              }
            },
            "topSites": {
              "get": {
                "minArgs": 0,
                "maxArgs": 0
              }
            },
            "webNavigation": {
              "getAllFrames": {
                "minArgs": 1,
                "maxArgs": 1
              },
              "getFrame": {
                "minArgs": 1,
                "maxArgs": 1
              }
            },
            "webRequest": {
              "handlerBehaviorChanged": {
                "minArgs": 0,
                "maxArgs": 0
              }
            },
            "windows": {
              "create": {
                "minArgs": 0,
                "maxArgs": 1
              },
              "get": {
                "minArgs": 1,
                "maxArgs": 2
              },
              "getAll": {
                "minArgs": 0,
                "maxArgs": 1
              },
              "getCurrent": {
                "minArgs": 0,
                "maxArgs": 1
              },
              "getLastFocused": {
                "minArgs": 0,
                "maxArgs": 1
              },
              "remove": {
                "minArgs": 1,
                "maxArgs": 1
              },
              "update": {
                "minArgs": 2,
                "maxArgs": 2
              }
            }
          };
          if (Object.keys(apiMetadata).length === 0) {
            throw new Error("api-metadata.json has not been included in browser-polyfill");
          }
          class DefaultWeakMap extends WeakMap {
            constructor(createItem, items = void 0) {
              super(items);
              this.createItem = createItem;
            }
            get(key) {
              if (!this.has(key)) {
                this.set(key, this.createItem(key));
              }
              return super.get(key);
            }
          }
          const isThenable = (value) => {
            return value && typeof value === "object" && typeof value.then === "function";
          };
          const makeCallback = (promise, metadata) => {
            return (...callbackArgs) => {
              if (extensionAPIs.runtime.lastError) {
                promise.reject(new Error(extensionAPIs.runtime.lastError.message));
              } else if (metadata.singleCallbackArg || callbackArgs.length <= 1 && metadata.singleCallbackArg !== false) {
                promise.resolve(callbackArgs[0]);
              } else {
                promise.resolve(callbackArgs);
              }
            };
          };
          const pluralizeArguments = (numArgs) => numArgs == 1 ? "argument" : "arguments";
          const wrapAsyncFunction = (name, metadata) => {
            return function asyncFunctionWrapper(target, ...args) {
              if (args.length < metadata.minArgs) {
                throw new Error(`Expected at least ${metadata.minArgs} ${pluralizeArguments(metadata.minArgs)} for ${name}(), got ${args.length}`);
              }
              if (args.length > metadata.maxArgs) {
                throw new Error(`Expected at most ${metadata.maxArgs} ${pluralizeArguments(metadata.maxArgs)} for ${name}(), got ${args.length}`);
              }
              return new Promise((resolve, reject) => {
                if (metadata.fallbackToNoCallback) {
                  try {
                    target[name](...args, makeCallback({
                      resolve,
                      reject
                    }, metadata));
                  } catch (cbError) {
                    console.warn(`${name} API method doesn't seem to support the callback parameter, falling back to call it without a callback: `, cbError);
                    target[name](...args);
                    metadata.fallbackToNoCallback = false;
                    metadata.noCallback = true;
                    resolve();
                  }
                } else if (metadata.noCallback) {
                  target[name](...args);
                  resolve();
                } else {
                  target[name](...args, makeCallback({
                    resolve,
                    reject
                  }, metadata));
                }
              });
            };
          };
          const wrapMethod = (target, method, wrapper) => {
            return new Proxy(method, {
              apply(targetMethod, thisObj, args) {
                return wrapper.call(thisObj, target, ...args);
              }
            });
          };
          let hasOwnProperty = Function.call.bind(Object.prototype.hasOwnProperty);
          const wrapObject = (target, wrappers = {}, metadata = {}) => {
            let cache = /* @__PURE__ */ Object.create(null);
            let handlers = {
              has(proxyTarget2, prop) {
                return prop in target || prop in cache;
              },
              get(proxyTarget2, prop, receiver) {
                if (prop in cache) {
                  return cache[prop];
                }
                if (!(prop in target)) {
                  return void 0;
                }
                let value = target[prop];
                if (typeof value === "function") {
                  if (typeof wrappers[prop] === "function") {
                    value = wrapMethod(target, target[prop], wrappers[prop]);
                  } else if (hasOwnProperty(metadata, prop)) {
                    let wrapper = wrapAsyncFunction(prop, metadata[prop]);
                    value = wrapMethod(target, target[prop], wrapper);
                  } else {
                    value = value.bind(target);
                  }
                } else if (typeof value === "object" && value !== null && (hasOwnProperty(wrappers, prop) || hasOwnProperty(metadata, prop))) {
                  value = wrapObject(value, wrappers[prop], metadata[prop]);
                } else if (hasOwnProperty(metadata, "*")) {
                  value = wrapObject(value, wrappers[prop], metadata["*"]);
                } else {
                  Object.defineProperty(cache, prop, {
                    configurable: true,
                    enumerable: true,
                    get() {
                      return target[prop];
                    },
                    set(value2) {
                      target[prop] = value2;
                    }
                  });
                  return value;
                }
                cache[prop] = value;
                return value;
              },
              set(proxyTarget2, prop, value, receiver) {
                if (prop in cache) {
                  cache[prop] = value;
                } else {
                  target[prop] = value;
                }
                return true;
              },
              defineProperty(proxyTarget2, prop, desc) {
                return Reflect.defineProperty(cache, prop, desc);
              },
              deleteProperty(proxyTarget2, prop) {
                return Reflect.deleteProperty(cache, prop);
              }
            };
            let proxyTarget = Object.create(target);
            return new Proxy(proxyTarget, handlers);
          };
          const wrapEvent = (wrapperMap) => ({
            addListener(target, listener, ...args) {
              target.addListener(wrapperMap.get(listener), ...args);
            },
            hasListener(target, listener) {
              return target.hasListener(wrapperMap.get(listener));
            },
            removeListener(target, listener) {
              target.removeListener(wrapperMap.get(listener));
            }
          });
          const onRequestFinishedWrappers = new DefaultWeakMap((listener) => {
            if (typeof listener !== "function") {
              return listener;
            }
            return function onRequestFinished(req) {
              const wrappedReq = wrapObject(req, {}, {
                getContent: {
                  minArgs: 0,
                  maxArgs: 0
                }
              });
              listener(wrappedReq);
            };
          });
          const onMessageWrappers = new DefaultWeakMap((listener) => {
            if (typeof listener !== "function") {
              return listener;
            }
            return function onMessage(message, sender, sendResponse) {
              let didCallSendResponse = false;
              let wrappedSendResponse;
              let sendResponsePromise = new Promise((resolve) => {
                wrappedSendResponse = function(response) {
                  didCallSendResponse = true;
                  resolve(response);
                };
              });
              let result2;
              try {
                result2 = listener(message, sender, wrappedSendResponse);
              } catch (err) {
                result2 = Promise.reject(err);
              }
              const isResultThenable = result2 !== true && isThenable(result2);
              if (result2 !== true && !isResultThenable && !didCallSendResponse) {
                return false;
              }
              const sendPromisedResult = (promise) => {
                promise.then((msg) => {
                  sendResponse(msg);
                }, (error) => {
                  let message2;
                  if (error && (error instanceof Error || typeof error.message === "string")) {
                    message2 = error.message;
                  } else {
                    message2 = "An unexpected error occurred";
                  }
                  sendResponse({
                    __mozWebExtensionPolyfillReject__: true,
                    message: message2
                  });
                }).catch((err) => {
                  console.error("Failed to send onMessage rejected reply", err);
                });
              };
              if (isResultThenable) {
                sendPromisedResult(result2);
              } else {
                sendPromisedResult(sendResponsePromise);
              }
              return true;
            };
          });
          const wrappedSendMessageCallback = ({
            reject,
            resolve
          }, reply) => {
            if (extensionAPIs.runtime.lastError) {
              if (extensionAPIs.runtime.lastError.message === CHROME_SEND_MESSAGE_CALLBACK_NO_RESPONSE_MESSAGE) {
                resolve();
              } else {
                reject(new Error(extensionAPIs.runtime.lastError.message));
              }
            } else if (reply && reply.__mozWebExtensionPolyfillReject__) {
              reject(new Error(reply.message));
            } else {
              resolve(reply);
            }
          };
          const wrappedSendMessage = (name, metadata, apiNamespaceObj, ...args) => {
            if (args.length < metadata.minArgs) {
              throw new Error(`Expected at least ${metadata.minArgs} ${pluralizeArguments(metadata.minArgs)} for ${name}(), got ${args.length}`);
            }
            if (args.length > metadata.maxArgs) {
              throw new Error(`Expected at most ${metadata.maxArgs} ${pluralizeArguments(metadata.maxArgs)} for ${name}(), got ${args.length}`);
            }
            return new Promise((resolve, reject) => {
              const wrappedCb = wrappedSendMessageCallback.bind(null, {
                resolve,
                reject
              });
              args.push(wrappedCb);
              apiNamespaceObj.sendMessage(...args);
            });
          };
          const staticWrappers = {
            devtools: {
              network: {
                onRequestFinished: wrapEvent(onRequestFinishedWrappers)
              }
            },
            runtime: {
              onMessage: wrapEvent(onMessageWrappers),
              onMessageExternal: wrapEvent(onMessageWrappers),
              sendMessage: wrappedSendMessage.bind(null, "sendMessage", {
                minArgs: 1,
                maxArgs: 3
              })
            },
            tabs: {
              sendMessage: wrappedSendMessage.bind(null, "sendMessage", {
                minArgs: 2,
                maxArgs: 3
              })
            }
          };
          const settingMetadata = {
            clear: {
              minArgs: 1,
              maxArgs: 1
            },
            get: {
              minArgs: 1,
              maxArgs: 1
            },
            set: {
              minArgs: 1,
              maxArgs: 1
            }
          };
          apiMetadata.privacy = {
            network: {
              "*": settingMetadata
            },
            services: {
              "*": settingMetadata
            },
            websites: {
              "*": settingMetadata
            }
          };
          return wrapObject(extensionAPIs, staticWrappers, apiMetadata);
        };
        module2.exports = wrapAPIs(chrome);
      } else {
        module2.exports = globalThis.browser;
      }
    });
  })(browserPolyfill);
  var browserPolyfillExports = browserPolyfill.exports;
  const originalBrowser = /* @__PURE__ */ getDefaultExportFromCjs(browserPolyfillExports);
  const browser = originalBrowser;
  function print$1(method, ...args) {
    if (typeof args[0] === "string") {
      const message = args.shift();
      method(`[wxt] ${message}`, ...args);
    } else {
      method("[wxt]", ...args);
    }
  }
  const logger$1 = {
    debug: (...args) => print$1(console.debug, ...args),
    log: (...args) => print$1(console.log, ...args),
    warn: (...args) => print$1(console.warn, ...args),
    error: (...args) => print$1(console.error, ...args)
  };
  const _WxtLocationChangeEvent = class _WxtLocationChangeEvent extends Event {
    constructor(newUrl, oldUrl) {
      super(_WxtLocationChangeEvent.EVENT_NAME, {});
      this.newUrl = newUrl;
      this.oldUrl = oldUrl;
    }
  };
  __publicField(_WxtLocationChangeEvent, "EVENT_NAME", getUniqueEventName("wxt:locationchange"));
  let WxtLocationChangeEvent = _WxtLocationChangeEvent;
  function getUniqueEventName(eventName) {
    var _a;
    return `${(_a = browser == null ? void 0 : browser.runtime) == null ? void 0 : _a.id}:${"content"}:${eventName}`;
  }
  function createLocationWatcher(ctx) {
    let interval;
    let oldUrl;
    return {
      /**
       * Ensure the location watcher is actively looking for URL changes. If it's already watching,
       * this is a noop.
       */
      run() {
        if (interval != null) return;
        oldUrl = new URL(location.href);
        interval = ctx.setInterval(() => {
          let newUrl = new URL(location.href);
          if (newUrl.href !== oldUrl.href) {
            window.dispatchEvent(new WxtLocationChangeEvent(newUrl, oldUrl));
            oldUrl = newUrl;
          }
        }, 1e3);
      }
    };
  }
  const _ContentScriptContext = class _ContentScriptContext {
    constructor(contentScriptName, options) {
      __publicField(this, "isTopFrame", window.self === window.top);
      __publicField(this, "abortController");
      __publicField(this, "locationWatcher", createLocationWatcher(this));
      __publicField(this, "receivedMessageIds", /* @__PURE__ */ new Set());
      this.contentScriptName = contentScriptName;
      this.options = options;
      this.abortController = new AbortController();
      if (this.isTopFrame) {
        this.listenForNewerScripts({ ignoreFirstEvent: true });
        this.stopOldScripts();
      } else {
        this.listenForNewerScripts();
      }
    }
    get signal() {
      return this.abortController.signal;
    }
    abort(reason) {
      return this.abortController.abort(reason);
    }
    get isInvalid() {
      if (browser.runtime.id == null) {
        this.notifyInvalidated();
      }
      return this.signal.aborted;
    }
    get isValid() {
      return !this.isInvalid;
    }
    /**
     * Add a listener that is called when the content script's context is invalidated.
     *
     * @returns A function to remove the listener.
     *
     * @example
     * browser.runtime.onMessage.addListener(cb);
     * const removeInvalidatedListener = ctx.onInvalidated(() => {
     *   browser.runtime.onMessage.removeListener(cb);
     * })
     * // ...
     * removeInvalidatedListener();
     */
    onInvalidated(cb) {
      this.signal.addEventListener("abort", cb);
      return () => this.signal.removeEventListener("abort", cb);
    }
    /**
     * Return a promise that never resolves. Useful if you have an async function that shouldn't run
     * after the context is expired.
     *
     * @example
     * const getValueFromStorage = async () => {
     *   if (ctx.isInvalid) return ctx.block();
     *
     *   // ...
     * }
     */
    block() {
      return new Promise(() => {
      });
    }
    /**
     * Wrapper around `window.setInterval` that automatically clears the interval when invalidated.
     */
    setInterval(handler, timeout) {
      const id = setInterval(() => {
        if (this.isValid) handler();
      }, timeout);
      this.onInvalidated(() => clearInterval(id));
      return id;
    }
    /**
     * Wrapper around `window.setTimeout` that automatically clears the interval when invalidated.
     */
    setTimeout(handler, timeout) {
      const id = setTimeout(() => {
        if (this.isValid) handler();
      }, timeout);
      this.onInvalidated(() => clearTimeout(id));
      return id;
    }
    /**
     * Wrapper around `window.requestAnimationFrame` that automatically cancels the request when
     * invalidated.
     */
    requestAnimationFrame(callback) {
      const id = requestAnimationFrame((...args) => {
        if (this.isValid) callback(...args);
      });
      this.onInvalidated(() => cancelAnimationFrame(id));
      return id;
    }
    /**
     * Wrapper around `window.requestIdleCallback` that automatically cancels the request when
     * invalidated.
     */
    requestIdleCallback(callback, options) {
      const id = requestIdleCallback((...args) => {
        if (!this.signal.aborted) callback(...args);
      }, options);
      this.onInvalidated(() => cancelIdleCallback(id));
      return id;
    }
    addEventListener(target, type, handler, options) {
      var _a;
      if (type === "wxt:locationchange") {
        if (this.isValid) this.locationWatcher.run();
      }
      (_a = target.addEventListener) == null ? void 0 : _a.call(
        target,
        type.startsWith("wxt:") ? getUniqueEventName(type) : type,
        handler,
        {
          ...options,
          signal: this.signal
        }
      );
    }
    /**
     * @internal
     * Abort the abort controller and execute all `onInvalidated` listeners.
     */
    notifyInvalidated() {
      this.abort("Content script context invalidated");
      logger$1.debug(
        `Content script "${this.contentScriptName}" context invalidated`
      );
    }
    stopOldScripts() {
      window.postMessage(
        {
          type: _ContentScriptContext.SCRIPT_STARTED_MESSAGE_TYPE,
          contentScriptName: this.contentScriptName,
          messageId: Math.random().toString(36).slice(2)
        },
        "*"
      );
    }
    verifyScriptStartedEvent(event) {
      var _a, _b, _c;
      const isScriptStartedEvent = ((_a = event.data) == null ? void 0 : _a.type) === _ContentScriptContext.SCRIPT_STARTED_MESSAGE_TYPE;
      const isSameContentScript = ((_b = event.data) == null ? void 0 : _b.contentScriptName) === this.contentScriptName;
      const isNotDuplicate = !this.receivedMessageIds.has((_c = event.data) == null ? void 0 : _c.messageId);
      return isScriptStartedEvent && isSameContentScript && isNotDuplicate;
    }
    listenForNewerScripts(options) {
      let isFirst = true;
      const cb = (event) => {
        if (this.verifyScriptStartedEvent(event)) {
          this.receivedMessageIds.add(event.data.messageId);
          const wasFirst = isFirst;
          isFirst = false;
          if (wasFirst && (options == null ? void 0 : options.ignoreFirstEvent)) return;
          this.notifyInvalidated();
        }
      };
      addEventListener("message", cb);
      this.onInvalidated(() => removeEventListener("message", cb));
    }
  };
  __publicField(_ContentScriptContext, "SCRIPT_STARTED_MESSAGE_TYPE", getUniqueEventName(
    "wxt:content-script-started"
  ));
  let ContentScriptContext = _ContentScriptContext;
  const nullKey = Symbol("null");
  let keyCounter = 0;
  class ManyKeysMap extends Map {
    constructor() {
      super();
      this._objectHashes = /* @__PURE__ */ new WeakMap();
      this._symbolHashes = /* @__PURE__ */ new Map();
      this._publicKeys = /* @__PURE__ */ new Map();
      const [pairs] = arguments;
      if (pairs === null || pairs === void 0) {
        return;
      }
      if (typeof pairs[Symbol.iterator] !== "function") {
        throw new TypeError(typeof pairs + " is not iterable (cannot read property Symbol(Symbol.iterator))");
      }
      for (const [keys, value] of pairs) {
        this.set(keys, value);
      }
    }
    _getPublicKeys(keys, create = false) {
      if (!Array.isArray(keys)) {
        throw new TypeError("The keys parameter must be an array");
      }
      const privateKey = this._getPrivateKey(keys, create);
      let publicKey;
      if (privateKey && this._publicKeys.has(privateKey)) {
        publicKey = this._publicKeys.get(privateKey);
      } else if (create) {
        publicKey = [...keys];
        this._publicKeys.set(privateKey, publicKey);
      }
      return { privateKey, publicKey };
    }
    _getPrivateKey(keys, create = false) {
      const privateKeys = [];
      for (let key of keys) {
        if (key === null) {
          key = nullKey;
        }
        const hashes = typeof key === "object" || typeof key === "function" ? "_objectHashes" : typeof key === "symbol" ? "_symbolHashes" : false;
        if (!hashes) {
          privateKeys.push(key);
        } else if (this[hashes].has(key)) {
          privateKeys.push(this[hashes].get(key));
        } else if (create) {
          const privateKey = `@@mkm-ref-${keyCounter++}@@`;
          this[hashes].set(key, privateKey);
          privateKeys.push(privateKey);
        } else {
          return false;
        }
      }
      return JSON.stringify(privateKeys);
    }
    set(keys, value) {
      const { publicKey } = this._getPublicKeys(keys, true);
      return super.set(publicKey, value);
    }
    get(keys) {
      const { publicKey } = this._getPublicKeys(keys);
      return super.get(publicKey);
    }
    has(keys) {
      const { publicKey } = this._getPublicKeys(keys);
      return super.has(publicKey);
    }
    delete(keys) {
      const { publicKey, privateKey } = this._getPublicKeys(keys);
      return Boolean(publicKey && super.delete(publicKey) && this._publicKeys.delete(privateKey));
    }
    clear() {
      super.clear();
      this._symbolHashes.clear();
      this._publicKeys.clear();
    }
    get [Symbol.toStringTag]() {
      return "ManyKeysMap";
    }
    get size() {
      return super.size;
    }
  }
  new ManyKeysMap();
  function initPlugins() {
  }
  function print(method, ...args) {
    if (typeof args[0] === "string") {
      const message = args.shift();
      method(`[wxt] ${message}`, ...args);
    } else {
      method("[wxt]", ...args);
    }
  }
  const logger = {
    debug: (...args) => print(console.debug, ...args),
    log: (...args) => print(console.log, ...args),
    warn: (...args) => print(console.warn, ...args),
    error: (...args) => print(console.error, ...args)
  };
  const result = (async () => {
    try {
      initPlugins();
      const { main, ...options } = definition;
      const ctx = new ContentScriptContext("content", options);
      return await main(ctx);
    } catch (err) {
      logger.error(
        `The content script "${"content"}" crashed on startup!`,
        err
      );
      throw err;
    }
  })();
  return result;
}();
content;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udGVudC5qcyIsInNvdXJjZXMiOlsiLi4vLi4vLi4vbm9kZV9tb2R1bGVzLy5wbnBtL3dlYmV4dGVuc2lvbi1wb2x5ZmlsbEAwLjEwLjAvbm9kZV9tb2R1bGVzL3dlYmV4dGVuc2lvbi1wb2x5ZmlsbC9kaXN0L2Jyb3dzZXItcG9seWZpbGwuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvLnBucG0vd3h0QDAuMTkuMjlfQHR5cGVzK25vZGVAMjUuMC4xMF9yb2xsdXBANC41Ni4wX3Nhc3NAMS45Ny4zL25vZGVfbW9kdWxlcy93eHQvZGlzdC9zYW5kYm94L2RlZmluZS1jb250ZW50LXNjcmlwdC5tanMiLCIuLi8uLi8uLi9zcmMvdXRpbHMvaGVscGVycy50cyIsIi4uLy4uLy4uL3NyYy9zZXJ2aWNlcy9sYW5ndWFnZS1kZXRlY3Rvci50cyIsIi4uLy4uLy4uL3NyYy9zZXJ2aWNlcy9jYWNoZS50cyIsIi4uLy4uLy4uL3NyYy9zZXJ2aWNlcy9vcGVuYWkudHMiLCIuLi8uLi8uLi9zcmMvdXRpbHMvZGVidWcudHMiLCIuLi8uLi8uLi9lbnRyeXBvaW50cy9jb250ZW50LnRzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzLy5wbnBtL3dlYmV4dGVuc2lvbi1wb2x5ZmlsbEAwLjEyLjAvbm9kZV9tb2R1bGVzL3dlYmV4dGVuc2lvbi1wb2x5ZmlsbC9kaXN0L2Jyb3dzZXItcG9seWZpbGwuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvLnBucG0vd3h0QDAuMTkuMjlfQHR5cGVzK25vZGVAMjUuMC4xMF9yb2xsdXBANC41Ni4wX3Nhc3NAMS45Ny4zL25vZGVfbW9kdWxlcy93eHQvZGlzdC9icm93c2VyL2luZGV4Lm1qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy8ucG5wbS93eHRAMC4xOS4yOV9AdHlwZXMrbm9kZUAyNS4wLjEwX3JvbGx1cEA0LjU2LjBfc2Fzc0AxLjk3LjMvbm9kZV9tb2R1bGVzL3d4dC9kaXN0L3NhbmRib3gvdXRpbHMvbG9nZ2VyLm1qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy8ucG5wbS93eHRAMC4xOS4yOV9AdHlwZXMrbm9kZUAyNS4wLjEwX3JvbGx1cEA0LjU2LjBfc2Fzc0AxLjk3LjMvbm9kZV9tb2R1bGVzL3d4dC9kaXN0L2NsaWVudC9jb250ZW50LXNjcmlwdHMvY3VzdG9tLWV2ZW50cy5tanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvLnBucG0vd3h0QDAuMTkuMjlfQHR5cGVzK25vZGVAMjUuMC4xMF9yb2xsdXBANC41Ni4wX3Nhc3NAMS45Ny4zL25vZGVfbW9kdWxlcy93eHQvZGlzdC9jbGllbnQvY29udGVudC1zY3JpcHRzL2xvY2F0aW9uLXdhdGNoZXIubWpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzLy5wbnBtL3d4dEAwLjE5LjI5X0B0eXBlcytub2RlQDI1LjAuMTBfcm9sbHVwQDQuNTYuMF9zYXNzQDEuOTcuMy9ub2RlX21vZHVsZXMvd3h0L2Rpc3QvY2xpZW50L2NvbnRlbnQtc2NyaXB0cy9jb250ZW50LXNjcmlwdC1jb250ZXh0Lm1qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy8ucG5wbS9tYW55LWtleXMtbWFwQDIuMC4xL25vZGVfbW9kdWxlcy9tYW55LWtleXMtbWFwL2luZGV4LmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzLy5wbnBtL0AxbmF0c3Urd2FpdC1lbGVtZW50QDQuMS4yL25vZGVfbW9kdWxlcy9AMW5hdHN1L3dhaXQtZWxlbWVudC9kaXN0L2luZGV4Lm1qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gKGdsb2JhbCwgZmFjdG9yeSkge1xuICBpZiAodHlwZW9mIGRlZmluZSA9PT0gXCJmdW5jdGlvblwiICYmIGRlZmluZS5hbWQpIHtcbiAgICBkZWZpbmUoXCJ3ZWJleHRlbnNpb24tcG9seWZpbGxcIiwgW1wibW9kdWxlXCJdLCBmYWN0b3J5KTtcbiAgfSBlbHNlIGlmICh0eXBlb2YgZXhwb3J0cyAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgIGZhY3RvcnkobW9kdWxlKTtcbiAgfSBlbHNlIHtcbiAgICB2YXIgbW9kID0ge1xuICAgICAgZXhwb3J0czoge31cbiAgICB9O1xuICAgIGZhY3RvcnkobW9kKTtcbiAgICBnbG9iYWwuYnJvd3NlciA9IG1vZC5leHBvcnRzO1xuICB9XG59KSh0eXBlb2YgZ2xvYmFsVGhpcyAhPT0gXCJ1bmRlZmluZWRcIiA/IGdsb2JhbFRoaXMgOiB0eXBlb2Ygc2VsZiAhPT0gXCJ1bmRlZmluZWRcIiA/IHNlbGYgOiB0aGlzLCBmdW5jdGlvbiAobW9kdWxlKSB7XG4gIC8qIHdlYmV4dGVuc2lvbi1wb2x5ZmlsbCAtIHYwLjEwLjAgLSBGcmkgQXVnIDEyIDIwMjIgMTk6NDI6NDQgKi9cblxuICAvKiAtKi0gTW9kZTogaW5kZW50LXRhYnMtbW9kZTogbmlsOyBqcy1pbmRlbnQtbGV2ZWw6IDIgLSotICovXG5cbiAgLyogdmltOiBzZXQgc3RzPTIgc3c9MiBldCB0dz04MDogKi9cblxuICAvKiBUaGlzIFNvdXJjZSBDb2RlIEZvcm0gaXMgc3ViamVjdCB0byB0aGUgdGVybXMgb2YgdGhlIE1vemlsbGEgUHVibGljXG4gICAqIExpY2Vuc2UsIHYuIDIuMC4gSWYgYSBjb3B5IG9mIHRoZSBNUEwgd2FzIG5vdCBkaXN0cmlidXRlZCB3aXRoIHRoaXNcbiAgICogZmlsZSwgWW91IGNhbiBvYnRhaW4gb25lIGF0IGh0dHA6Ly9tb3ppbGxhLm9yZy9NUEwvMi4wLy4gKi9cbiAgXCJ1c2Ugc3RyaWN0XCI7XG5cbiAgaWYgKCFnbG9iYWxUaGlzLmNocm9tZT8ucnVudGltZT8uaWQpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJUaGlzIHNjcmlwdCBzaG91bGQgb25seSBiZSBsb2FkZWQgaW4gYSBicm93c2VyIGV4dGVuc2lvbi5cIik7XG4gIH1cblxuICBpZiAodHlwZW9mIGdsb2JhbFRoaXMuYnJvd3NlciA9PT0gXCJ1bmRlZmluZWRcIiB8fCBPYmplY3QuZ2V0UHJvdG90eXBlT2YoZ2xvYmFsVGhpcy5icm93c2VyKSAhPT0gT2JqZWN0LnByb3RvdHlwZSkge1xuICAgIGNvbnN0IENIUk9NRV9TRU5EX01FU1NBR0VfQ0FMTEJBQ0tfTk9fUkVTUE9OU0VfTUVTU0FHRSA9IFwiVGhlIG1lc3NhZ2UgcG9ydCBjbG9zZWQgYmVmb3JlIGEgcmVzcG9uc2Ugd2FzIHJlY2VpdmVkLlwiOyAvLyBXcmFwcGluZyB0aGUgYnVsayBvZiB0aGlzIHBvbHlmaWxsIGluIGEgb25lLXRpbWUtdXNlIGZ1bmN0aW9uIGlzIGEgbWlub3JcbiAgICAvLyBvcHRpbWl6YXRpb24gZm9yIEZpcmVmb3guIFNpbmNlIFNwaWRlcm1vbmtleSBkb2VzIG5vdCBmdWxseSBwYXJzZSB0aGVcbiAgICAvLyBjb250ZW50cyBvZiBhIGZ1bmN0aW9uIHVudGlsIHRoZSBmaXJzdCB0aW1lIGl0J3MgY2FsbGVkLCBhbmQgc2luY2UgaXQgd2lsbFxuICAgIC8vIG5ldmVyIGFjdHVhbGx5IG5lZWQgdG8gYmUgY2FsbGVkLCB0aGlzIGFsbG93cyB0aGUgcG9seWZpbGwgdG8gYmUgaW5jbHVkZWRcbiAgICAvLyBpbiBGaXJlZm94IG5lYXJseSBmb3IgZnJlZS5cblxuICAgIGNvbnN0IHdyYXBBUElzID0gZXh0ZW5zaW9uQVBJcyA9PiB7XG4gICAgICAvLyBOT1RFOiBhcGlNZXRhZGF0YSBpcyBhc3NvY2lhdGVkIHRvIHRoZSBjb250ZW50IG9mIHRoZSBhcGktbWV0YWRhdGEuanNvbiBmaWxlXG4gICAgICAvLyBhdCBidWlsZCB0aW1lIGJ5IHJlcGxhY2luZyB0aGUgZm9sbG93aW5nIFwiaW5jbHVkZVwiIHdpdGggdGhlIGNvbnRlbnQgb2YgdGhlXG4gICAgICAvLyBKU09OIGZpbGUuXG4gICAgICBjb25zdCBhcGlNZXRhZGF0YSA9IHtcbiAgICAgICAgXCJhbGFybXNcIjoge1xuICAgICAgICAgIFwiY2xlYXJcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDAsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJjbGVhckFsbFwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMCxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAwXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcImdldFwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMCxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcImdldEFsbFwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMCxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAwXG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBcImJvb2ttYXJrc1wiOiB7XG4gICAgICAgICAgXCJjcmVhdGVcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJnZXRcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJnZXRDaGlsZHJlblwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcImdldFJlY2VudFwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcImdldFN1YlRyZWVcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJnZXRUcmVlXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAwLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDBcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwibW92ZVwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMixcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAyXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcInJlbW92ZVwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcInJlbW92ZVRyZWVcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJzZWFyY2hcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJ1cGRhdGVcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDIsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMlxuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgXCJicm93c2VyQWN0aW9uXCI6IHtcbiAgICAgICAgICBcImRpc2FibGVcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDAsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwiZmFsbGJhY2tUb05vQ2FsbGJhY2tcIjogdHJ1ZVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJlbmFibGVcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDAsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwiZmFsbGJhY2tUb05vQ2FsbGJhY2tcIjogdHJ1ZVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJnZXRCYWRnZUJhY2tncm91bmRDb2xvclwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcImdldEJhZGdlVGV4dFwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcImdldFBvcHVwXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwiZ2V0VGl0bGVcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJvcGVuUG9wdXBcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDAsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMFxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJzZXRCYWRnZUJhY2tncm91bmRDb2xvclwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxLFxuICAgICAgICAgICAgXCJmYWxsYmFja1RvTm9DYWxsYmFja1wiOiB0cnVlXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcInNldEJhZGdlVGV4dFwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxLFxuICAgICAgICAgICAgXCJmYWxsYmFja1RvTm9DYWxsYmFja1wiOiB0cnVlXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcInNldEljb25cIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJzZXRQb3B1cFwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxLFxuICAgICAgICAgICAgXCJmYWxsYmFja1RvTm9DYWxsYmFja1wiOiB0cnVlXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcInNldFRpdGxlXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDEsXG4gICAgICAgICAgICBcImZhbGxiYWNrVG9Ob0NhbGxiYWNrXCI6IHRydWVcbiAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIFwiYnJvd3NpbmdEYXRhXCI6IHtcbiAgICAgICAgICBcInJlbW92ZVwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMixcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAyXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcInJlbW92ZUNhY2hlXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwicmVtb3ZlQ29va2llc1wiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcInJlbW92ZURvd25sb2Fkc1wiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcInJlbW92ZUZvcm1EYXRhXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwicmVtb3ZlSGlzdG9yeVwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcInJlbW92ZUxvY2FsU3RvcmFnZVwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcInJlbW92ZVBhc3N3b3Jkc1wiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcInJlbW92ZVBsdWdpbkRhdGFcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJzZXR0aW5nc1wiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMCxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAwXG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBcImNvbW1hbmRzXCI6IHtcbiAgICAgICAgICBcImdldEFsbFwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMCxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAwXG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBcImNvbnRleHRNZW51c1wiOiB7XG4gICAgICAgICAgXCJyZW1vdmVcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJyZW1vdmVBbGxcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDAsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMFxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJ1cGRhdGVcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDIsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMlxuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgXCJjb29raWVzXCI6IHtcbiAgICAgICAgICBcImdldFwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcImdldEFsbFwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcImdldEFsbENvb2tpZVN0b3Jlc1wiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMCxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAwXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcInJlbW92ZVwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcInNldFwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBcImRldnRvb2xzXCI6IHtcbiAgICAgICAgICBcImluc3BlY3RlZFdpbmRvd1wiOiB7XG4gICAgICAgICAgICBcImV2YWxcIjoge1xuICAgICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDIsXG4gICAgICAgICAgICAgIFwic2luZ2xlQ2FsbGJhY2tBcmdcIjogZmFsc2VcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9LFxuICAgICAgICAgIFwicGFuZWxzXCI6IHtcbiAgICAgICAgICAgIFwiY3JlYXRlXCI6IHtcbiAgICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDMsXG4gICAgICAgICAgICAgIFwibWF4QXJnc1wiOiAzLFxuICAgICAgICAgICAgICBcInNpbmdsZUNhbGxiYWNrQXJnXCI6IHRydWVcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBcImVsZW1lbnRzXCI6IHtcbiAgICAgICAgICAgICAgXCJjcmVhdGVTaWRlYmFyUGFuZVwiOiB7XG4gICAgICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgXCJkb3dubG9hZHNcIjoge1xuICAgICAgICAgIFwiY2FuY2VsXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwiZG93bmxvYWRcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJlcmFzZVwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcImdldEZpbGVJY29uXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDJcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwib3BlblwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxLFxuICAgICAgICAgICAgXCJmYWxsYmFja1RvTm9DYWxsYmFja1wiOiB0cnVlXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcInBhdXNlXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwicmVtb3ZlRmlsZVwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcInJlc3VtZVwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcInNlYXJjaFwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcInNob3dcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwiZmFsbGJhY2tUb05vQ2FsbGJhY2tcIjogdHJ1ZVxuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgXCJleHRlbnNpb25cIjoge1xuICAgICAgICAgIFwiaXNBbGxvd2VkRmlsZVNjaGVtZUFjY2Vzc1wiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMCxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAwXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcImlzQWxsb3dlZEluY29nbml0b0FjY2Vzc1wiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMCxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAwXG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBcImhpc3RvcnlcIjoge1xuICAgICAgICAgIFwiYWRkVXJsXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwiZGVsZXRlQWxsXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAwLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDBcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwiZGVsZXRlUmFuZ2VcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJkZWxldGVVcmxcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJnZXRWaXNpdHNcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJzZWFyY2hcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgXCJpMThuXCI6IHtcbiAgICAgICAgICBcImRldGVjdExhbmd1YWdlXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwiZ2V0QWNjZXB0TGFuZ3VhZ2VzXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAwLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDBcbiAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIFwiaWRlbnRpdHlcIjoge1xuICAgICAgICAgIFwibGF1bmNoV2ViQXV0aEZsb3dcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgXCJpZGxlXCI6IHtcbiAgICAgICAgICBcInF1ZXJ5U3RhdGVcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgXCJtYW5hZ2VtZW50XCI6IHtcbiAgICAgICAgICBcImdldFwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcImdldEFsbFwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMCxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAwXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcImdldFNlbGZcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDAsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMFxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJzZXRFbmFibGVkXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAyLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDJcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwidW5pbnN0YWxsU2VsZlwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMCxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBcIm5vdGlmaWNhdGlvbnNcIjoge1xuICAgICAgICAgIFwiY2xlYXJcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJjcmVhdGVcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMlxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJnZXRBbGxcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDAsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMFxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJnZXRQZXJtaXNzaW9uTGV2ZWxcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDAsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMFxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJ1cGRhdGVcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDIsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMlxuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgXCJwYWdlQWN0aW9uXCI6IHtcbiAgICAgICAgICBcImdldFBvcHVwXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwiZ2V0VGl0bGVcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJoaWRlXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDEsXG4gICAgICAgICAgICBcImZhbGxiYWNrVG9Ob0NhbGxiYWNrXCI6IHRydWVcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwic2V0SWNvblwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcInNldFBvcHVwXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDEsXG4gICAgICAgICAgICBcImZhbGxiYWNrVG9Ob0NhbGxiYWNrXCI6IHRydWVcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwic2V0VGl0bGVcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwiZmFsbGJhY2tUb05vQ2FsbGJhY2tcIjogdHJ1ZVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJzaG93XCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDEsXG4gICAgICAgICAgICBcImZhbGxiYWNrVG9Ob0NhbGxiYWNrXCI6IHRydWVcbiAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIFwicGVybWlzc2lvbnNcIjoge1xuICAgICAgICAgIFwiY29udGFpbnNcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJnZXRBbGxcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDAsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMFxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJyZW1vdmVcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJyZXF1ZXN0XCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIFwicnVudGltZVwiOiB7XG4gICAgICAgICAgXCJnZXRCYWNrZ3JvdW5kUGFnZVwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMCxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAwXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcImdldFBsYXRmb3JtSW5mb1wiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMCxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAwXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcIm9wZW5PcHRpb25zUGFnZVwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMCxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAwXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcInJlcXVlc3RVcGRhdGVDaGVja1wiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMCxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAwXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcInNlbmRNZXNzYWdlXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDNcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwic2VuZE5hdGl2ZU1lc3NhZ2VcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDIsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMlxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJzZXRVbmluc3RhbGxVUkxcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgXCJzZXNzaW9uc1wiOiB7XG4gICAgICAgICAgXCJnZXREZXZpY2VzXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAwLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwiZ2V0UmVjZW50bHlDbG9zZWRcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDAsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJyZXN0b3JlXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAwLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIFwic3RvcmFnZVwiOiB7XG4gICAgICAgICAgXCJsb2NhbFwiOiB7XG4gICAgICAgICAgICBcImNsZWFyXCI6IHtcbiAgICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDAsXG4gICAgICAgICAgICAgIFwibWF4QXJnc1wiOiAwXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgXCJnZXRcIjoge1xuICAgICAgICAgICAgICBcIm1pbkFyZ3NcIjogMCxcbiAgICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBcImdldEJ5dGVzSW5Vc2VcIjoge1xuICAgICAgICAgICAgICBcIm1pbkFyZ3NcIjogMCxcbiAgICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBcInJlbW92ZVwiOiB7XG4gICAgICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIFwic2V0XCI6IHtcbiAgICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSxcbiAgICAgICAgICBcIm1hbmFnZWRcIjoge1xuICAgICAgICAgICAgXCJnZXRcIjoge1xuICAgICAgICAgICAgICBcIm1pbkFyZ3NcIjogMCxcbiAgICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBcImdldEJ5dGVzSW5Vc2VcIjoge1xuICAgICAgICAgICAgICBcIm1pbkFyZ3NcIjogMCxcbiAgICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9LFxuICAgICAgICAgIFwic3luY1wiOiB7XG4gICAgICAgICAgICBcImNsZWFyXCI6IHtcbiAgICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDAsXG4gICAgICAgICAgICAgIFwibWF4QXJnc1wiOiAwXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgXCJnZXRcIjoge1xuICAgICAgICAgICAgICBcIm1pbkFyZ3NcIjogMCxcbiAgICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBcImdldEJ5dGVzSW5Vc2VcIjoge1xuICAgICAgICAgICAgICBcIm1pbkFyZ3NcIjogMCxcbiAgICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBcInJlbW92ZVwiOiB7XG4gICAgICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIFwic2V0XCI6IHtcbiAgICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBcInRhYnNcIjoge1xuICAgICAgICAgIFwiY2FwdHVyZVZpc2libGVUYWJcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDAsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMlxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJjcmVhdGVcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJkZXRlY3RMYW5ndWFnZVwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMCxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcImRpc2NhcmRcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDAsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJkdXBsaWNhdGVcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJleGVjdXRlU2NyaXB0XCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDJcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwiZ2V0XCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwiZ2V0Q3VycmVudFwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMCxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAwXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcImdldFpvb21cIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDAsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJnZXRab29tU2V0dGluZ3NcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDAsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJnb0JhY2tcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDAsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJnb0ZvcndhcmRcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDAsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJoaWdobGlnaHRcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJpbnNlcnRDU1NcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMlxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJtb3ZlXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAyLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDJcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwicXVlcnlcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJyZWxvYWRcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDAsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMlxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJyZW1vdmVcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJyZW1vdmVDU1NcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMlxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJzZW5kTWVzc2FnZVwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMixcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAzXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcInNldFpvb21cIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMlxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJzZXRab29tU2V0dGluZ3NcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMlxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJ1cGRhdGVcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMlxuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgXCJ0b3BTaXRlc1wiOiB7XG4gICAgICAgICAgXCJnZXRcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDAsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMFxuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgXCJ3ZWJOYXZpZ2F0aW9uXCI6IHtcbiAgICAgICAgICBcImdldEFsbEZyYW1lc1wiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcImdldEZyYW1lXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIFwid2ViUmVxdWVzdFwiOiB7XG4gICAgICAgICAgXCJoYW5kbGVyQmVoYXZpb3JDaGFuZ2VkXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAwLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDBcbiAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIFwid2luZG93c1wiOiB7XG4gICAgICAgICAgXCJjcmVhdGVcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDAsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJnZXRcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMlxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJnZXRBbGxcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDAsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJnZXRDdXJyZW50XCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAwLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwiZ2V0TGFzdEZvY3VzZWRcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDAsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJyZW1vdmVcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJ1cGRhdGVcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDIsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMlxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfTtcblxuICAgICAgaWYgKE9iamVjdC5rZXlzKGFwaU1ldGFkYXRhKS5sZW5ndGggPT09IDApIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiYXBpLW1ldGFkYXRhLmpzb24gaGFzIG5vdCBiZWVuIGluY2x1ZGVkIGluIGJyb3dzZXItcG9seWZpbGxcIik7XG4gICAgICB9XG4gICAgICAvKipcbiAgICAgICAqIEEgV2Vha01hcCBzdWJjbGFzcyB3aGljaCBjcmVhdGVzIGFuZCBzdG9yZXMgYSB2YWx1ZSBmb3IgYW55IGtleSB3aGljaCBkb2VzXG4gICAgICAgKiBub3QgZXhpc3Qgd2hlbiBhY2Nlc3NlZCwgYnV0IGJlaGF2ZXMgZXhhY3RseSBhcyBhbiBvcmRpbmFyeSBXZWFrTWFwXG4gICAgICAgKiBvdGhlcndpc2UuXG4gICAgICAgKlxuICAgICAgICogQHBhcmFtIHtmdW5jdGlvbn0gY3JlYXRlSXRlbVxuICAgICAgICogICAgICAgIEEgZnVuY3Rpb24gd2hpY2ggd2lsbCBiZSBjYWxsZWQgaW4gb3JkZXIgdG8gY3JlYXRlIHRoZSB2YWx1ZSBmb3IgYW55XG4gICAgICAgKiAgICAgICAga2V5IHdoaWNoIGRvZXMgbm90IGV4aXN0LCB0aGUgZmlyc3QgdGltZSBpdCBpcyBhY2Nlc3NlZC4gVGhlXG4gICAgICAgKiAgICAgICAgZnVuY3Rpb24gcmVjZWl2ZXMsIGFzIGl0cyBvbmx5IGFyZ3VtZW50LCB0aGUga2V5IGJlaW5nIGNyZWF0ZWQuXG4gICAgICAgKi9cblxuXG4gICAgICBjbGFzcyBEZWZhdWx0V2Vha01hcCBleHRlbmRzIFdlYWtNYXAge1xuICAgICAgICBjb25zdHJ1Y3RvcihjcmVhdGVJdGVtLCBpdGVtcyA9IHVuZGVmaW5lZCkge1xuICAgICAgICAgIHN1cGVyKGl0ZW1zKTtcbiAgICAgICAgICB0aGlzLmNyZWF0ZUl0ZW0gPSBjcmVhdGVJdGVtO1xuICAgICAgICB9XG5cbiAgICAgICAgZ2V0KGtleSkge1xuICAgICAgICAgIGlmICghdGhpcy5oYXMoa2V5KSkge1xuICAgICAgICAgICAgdGhpcy5zZXQoa2V5LCB0aGlzLmNyZWF0ZUl0ZW0oa2V5KSk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgcmV0dXJuIHN1cGVyLmdldChrZXkpO1xuICAgICAgICB9XG5cbiAgICAgIH1cbiAgICAgIC8qKlxuICAgICAgICogUmV0dXJucyB0cnVlIGlmIHRoZSBnaXZlbiBvYmplY3QgaXMgYW4gb2JqZWN0IHdpdGggYSBgdGhlbmAgbWV0aG9kLCBhbmQgY2FuXG4gICAgICAgKiB0aGVyZWZvcmUgYmUgYXNzdW1lZCB0byBiZWhhdmUgYXMgYSBQcm9taXNlLlxuICAgICAgICpcbiAgICAgICAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIHRlc3QuXG4gICAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB0aGUgdmFsdWUgaXMgdGhlbmFibGUuXG4gICAgICAgKi9cblxuXG4gICAgICBjb25zdCBpc1RoZW5hYmxlID0gdmFsdWUgPT4ge1xuICAgICAgICByZXR1cm4gdmFsdWUgJiYgdHlwZW9mIHZhbHVlID09PSBcIm9iamVjdFwiICYmIHR5cGVvZiB2YWx1ZS50aGVuID09PSBcImZ1bmN0aW9uXCI7XG4gICAgICB9O1xuICAgICAgLyoqXG4gICAgICAgKiBDcmVhdGVzIGFuZCByZXR1cm5zIGEgZnVuY3Rpb24gd2hpY2gsIHdoZW4gY2FsbGVkLCB3aWxsIHJlc29sdmUgb3IgcmVqZWN0XG4gICAgICAgKiB0aGUgZ2l2ZW4gcHJvbWlzZSBiYXNlZCBvbiBob3cgaXQgaXMgY2FsbGVkOlxuICAgICAgICpcbiAgICAgICAqIC0gSWYsIHdoZW4gY2FsbGVkLCBgY2hyb21lLnJ1bnRpbWUubGFzdEVycm9yYCBjb250YWlucyBhIG5vbi1udWxsIG9iamVjdCxcbiAgICAgICAqICAgdGhlIHByb21pc2UgaXMgcmVqZWN0ZWQgd2l0aCB0aGF0IHZhbHVlLlxuICAgICAgICogLSBJZiB0aGUgZnVuY3Rpb24gaXMgY2FsbGVkIHdpdGggZXhhY3RseSBvbmUgYXJndW1lbnQsIHRoZSBwcm9taXNlIGlzXG4gICAgICAgKiAgIHJlc29sdmVkIHRvIHRoYXQgdmFsdWUuXG4gICAgICAgKiAtIE90aGVyd2lzZSwgdGhlIHByb21pc2UgaXMgcmVzb2x2ZWQgdG8gYW4gYXJyYXkgY29udGFpbmluZyBhbGwgb2YgdGhlXG4gICAgICAgKiAgIGZ1bmN0aW9uJ3MgYXJndW1lbnRzLlxuICAgICAgICpcbiAgICAgICAqIEBwYXJhbSB7b2JqZWN0fSBwcm9taXNlXG4gICAgICAgKiAgICAgICAgQW4gb2JqZWN0IGNvbnRhaW5pbmcgdGhlIHJlc29sdXRpb24gYW5kIHJlamVjdGlvbiBmdW5jdGlvbnMgb2YgYVxuICAgICAgICogICAgICAgIHByb21pc2UuXG4gICAgICAgKiBAcGFyYW0ge2Z1bmN0aW9ufSBwcm9taXNlLnJlc29sdmVcbiAgICAgICAqICAgICAgICBUaGUgcHJvbWlzZSdzIHJlc29sdXRpb24gZnVuY3Rpb24uXG4gICAgICAgKiBAcGFyYW0ge2Z1bmN0aW9ufSBwcm9taXNlLnJlamVjdFxuICAgICAgICogICAgICAgIFRoZSBwcm9taXNlJ3MgcmVqZWN0aW9uIGZ1bmN0aW9uLlxuICAgICAgICogQHBhcmFtIHtvYmplY3R9IG1ldGFkYXRhXG4gICAgICAgKiAgICAgICAgTWV0YWRhdGEgYWJvdXQgdGhlIHdyYXBwZWQgbWV0aG9kIHdoaWNoIGhhcyBjcmVhdGVkIHRoZSBjYWxsYmFjay5cbiAgICAgICAqIEBwYXJhbSB7Ym9vbGVhbn0gbWV0YWRhdGEuc2luZ2xlQ2FsbGJhY2tBcmdcbiAgICAgICAqICAgICAgICBXaGV0aGVyIG9yIG5vdCB0aGUgcHJvbWlzZSBpcyByZXNvbHZlZCB3aXRoIG9ubHkgdGhlIGZpcnN0XG4gICAgICAgKiAgICAgICAgYXJndW1lbnQgb2YgdGhlIGNhbGxiYWNrLCBhbHRlcm5hdGl2ZWx5IGFuIGFycmF5IG9mIGFsbCB0aGVcbiAgICAgICAqICAgICAgICBjYWxsYmFjayBhcmd1bWVudHMgaXMgcmVzb2x2ZWQuIEJ5IGRlZmF1bHQsIGlmIHRoZSBjYWxsYmFja1xuICAgICAgICogICAgICAgIGZ1bmN0aW9uIGlzIGludm9rZWQgd2l0aCBvbmx5IGEgc2luZ2xlIGFyZ3VtZW50LCB0aGF0IHdpbGwgYmVcbiAgICAgICAqICAgICAgICByZXNvbHZlZCB0byB0aGUgcHJvbWlzZSwgd2hpbGUgYWxsIGFyZ3VtZW50cyB3aWxsIGJlIHJlc29sdmVkIGFzXG4gICAgICAgKiAgICAgICAgYW4gYXJyYXkgaWYgbXVsdGlwbGUgYXJlIGdpdmVuLlxuICAgICAgICpcbiAgICAgICAqIEByZXR1cm5zIHtmdW5jdGlvbn1cbiAgICAgICAqICAgICAgICBUaGUgZ2VuZXJhdGVkIGNhbGxiYWNrIGZ1bmN0aW9uLlxuICAgICAgICovXG5cblxuICAgICAgY29uc3QgbWFrZUNhbGxiYWNrID0gKHByb21pc2UsIG1ldGFkYXRhKSA9PiB7XG4gICAgICAgIHJldHVybiAoLi4uY2FsbGJhY2tBcmdzKSA9PiB7XG4gICAgICAgICAgaWYgKGV4dGVuc2lvbkFQSXMucnVudGltZS5sYXN0RXJyb3IpIHtcbiAgICAgICAgICAgIHByb21pc2UucmVqZWN0KG5ldyBFcnJvcihleHRlbnNpb25BUElzLnJ1bnRpbWUubGFzdEVycm9yLm1lc3NhZ2UpKTtcbiAgICAgICAgICB9IGVsc2UgaWYgKG1ldGFkYXRhLnNpbmdsZUNhbGxiYWNrQXJnIHx8IGNhbGxiYWNrQXJncy5sZW5ndGggPD0gMSAmJiBtZXRhZGF0YS5zaW5nbGVDYWxsYmFja0FyZyAhPT0gZmFsc2UpIHtcbiAgICAgICAgICAgIHByb21pc2UucmVzb2x2ZShjYWxsYmFja0FyZ3NbMF0pO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBwcm9taXNlLnJlc29sdmUoY2FsbGJhY2tBcmdzKTtcbiAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICB9O1xuXG4gICAgICBjb25zdCBwbHVyYWxpemVBcmd1bWVudHMgPSBudW1BcmdzID0+IG51bUFyZ3MgPT0gMSA/IFwiYXJndW1lbnRcIiA6IFwiYXJndW1lbnRzXCI7XG4gICAgICAvKipcbiAgICAgICAqIENyZWF0ZXMgYSB3cmFwcGVyIGZ1bmN0aW9uIGZvciBhIG1ldGhvZCB3aXRoIHRoZSBnaXZlbiBuYW1lIGFuZCBtZXRhZGF0YS5cbiAgICAgICAqXG4gICAgICAgKiBAcGFyYW0ge3N0cmluZ30gbmFtZVxuICAgICAgICogICAgICAgIFRoZSBuYW1lIG9mIHRoZSBtZXRob2Qgd2hpY2ggaXMgYmVpbmcgd3JhcHBlZC5cbiAgICAgICAqIEBwYXJhbSB7b2JqZWN0fSBtZXRhZGF0YVxuICAgICAgICogICAgICAgIE1ldGFkYXRhIGFib3V0IHRoZSBtZXRob2QgYmVpbmcgd3JhcHBlZC5cbiAgICAgICAqIEBwYXJhbSB7aW50ZWdlcn0gbWV0YWRhdGEubWluQXJnc1xuICAgICAgICogICAgICAgIFRoZSBtaW5pbXVtIG51bWJlciBvZiBhcmd1bWVudHMgd2hpY2ggbXVzdCBiZSBwYXNzZWQgdG8gdGhlXG4gICAgICAgKiAgICAgICAgZnVuY3Rpb24uIElmIGNhbGxlZCB3aXRoIGZld2VyIHRoYW4gdGhpcyBudW1iZXIgb2YgYXJndW1lbnRzLCB0aGVcbiAgICAgICAqICAgICAgICB3cmFwcGVyIHdpbGwgcmFpc2UgYW4gZXhjZXB0aW9uLlxuICAgICAgICogQHBhcmFtIHtpbnRlZ2VyfSBtZXRhZGF0YS5tYXhBcmdzXG4gICAgICAgKiAgICAgICAgVGhlIG1heGltdW0gbnVtYmVyIG9mIGFyZ3VtZW50cyB3aGljaCBtYXkgYmUgcGFzc2VkIHRvIHRoZVxuICAgICAgICogICAgICAgIGZ1bmN0aW9uLiBJZiBjYWxsZWQgd2l0aCBtb3JlIHRoYW4gdGhpcyBudW1iZXIgb2YgYXJndW1lbnRzLCB0aGVcbiAgICAgICAqICAgICAgICB3cmFwcGVyIHdpbGwgcmFpc2UgYW4gZXhjZXB0aW9uLlxuICAgICAgICogQHBhcmFtIHtib29sZWFufSBtZXRhZGF0YS5zaW5nbGVDYWxsYmFja0FyZ1xuICAgICAgICogICAgICAgIFdoZXRoZXIgb3Igbm90IHRoZSBwcm9taXNlIGlzIHJlc29sdmVkIHdpdGggb25seSB0aGUgZmlyc3RcbiAgICAgICAqICAgICAgICBhcmd1bWVudCBvZiB0aGUgY2FsbGJhY2ssIGFsdGVybmF0aXZlbHkgYW4gYXJyYXkgb2YgYWxsIHRoZVxuICAgICAgICogICAgICAgIGNhbGxiYWNrIGFyZ3VtZW50cyBpcyByZXNvbHZlZC4gQnkgZGVmYXVsdCwgaWYgdGhlIGNhbGxiYWNrXG4gICAgICAgKiAgICAgICAgZnVuY3Rpb24gaXMgaW52b2tlZCB3aXRoIG9ubHkgYSBzaW5nbGUgYXJndW1lbnQsIHRoYXQgd2lsbCBiZVxuICAgICAgICogICAgICAgIHJlc29sdmVkIHRvIHRoZSBwcm9taXNlLCB3aGlsZSBhbGwgYXJndW1lbnRzIHdpbGwgYmUgcmVzb2x2ZWQgYXNcbiAgICAgICAqICAgICAgICBhbiBhcnJheSBpZiBtdWx0aXBsZSBhcmUgZ2l2ZW4uXG4gICAgICAgKlxuICAgICAgICogQHJldHVybnMge2Z1bmN0aW9uKG9iamVjdCwgLi4uKil9XG4gICAgICAgKiAgICAgICBUaGUgZ2VuZXJhdGVkIHdyYXBwZXIgZnVuY3Rpb24uXG4gICAgICAgKi9cblxuXG4gICAgICBjb25zdCB3cmFwQXN5bmNGdW5jdGlvbiA9IChuYW1lLCBtZXRhZGF0YSkgPT4ge1xuICAgICAgICByZXR1cm4gZnVuY3Rpb24gYXN5bmNGdW5jdGlvbldyYXBwZXIodGFyZ2V0LCAuLi5hcmdzKSB7XG4gICAgICAgICAgaWYgKGFyZ3MubGVuZ3RoIDwgbWV0YWRhdGEubWluQXJncykge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBFeHBlY3RlZCBhdCBsZWFzdCAke21ldGFkYXRhLm1pbkFyZ3N9ICR7cGx1cmFsaXplQXJndW1lbnRzKG1ldGFkYXRhLm1pbkFyZ3MpfSBmb3IgJHtuYW1lfSgpLCBnb3QgJHthcmdzLmxlbmd0aH1gKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAoYXJncy5sZW5ndGggPiBtZXRhZGF0YS5tYXhBcmdzKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYEV4cGVjdGVkIGF0IG1vc3QgJHttZXRhZGF0YS5tYXhBcmdzfSAke3BsdXJhbGl6ZUFyZ3VtZW50cyhtZXRhZGF0YS5tYXhBcmdzKX0gZm9yICR7bmFtZX0oKSwgZ290ICR7YXJncy5sZW5ndGh9YCk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgICAgIGlmIChtZXRhZGF0YS5mYWxsYmFja1RvTm9DYWxsYmFjaykge1xuICAgICAgICAgICAgICAvLyBUaGlzIEFQSSBtZXRob2QgaGFzIGN1cnJlbnRseSBubyBjYWxsYmFjayBvbiBDaHJvbWUsIGJ1dCBpdCByZXR1cm4gYSBwcm9taXNlIG9uIEZpcmVmb3gsXG4gICAgICAgICAgICAgIC8vIGFuZCBzbyB0aGUgcG9seWZpbGwgd2lsbCB0cnkgdG8gY2FsbCBpdCB3aXRoIGEgY2FsbGJhY2sgZmlyc3QsIGFuZCBpdCB3aWxsIGZhbGxiYWNrXG4gICAgICAgICAgICAgIC8vIHRvIG5vdCBwYXNzaW5nIHRoZSBjYWxsYmFjayBpZiB0aGUgZmlyc3QgY2FsbCBmYWlscy5cbiAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICB0YXJnZXRbbmFtZV0oLi4uYXJncywgbWFrZUNhbGxiYWNrKHtcbiAgICAgICAgICAgICAgICAgIHJlc29sdmUsXG4gICAgICAgICAgICAgICAgICByZWplY3RcbiAgICAgICAgICAgICAgICB9LCBtZXRhZGF0YSkpO1xuICAgICAgICAgICAgICB9IGNhdGNoIChjYkVycm9yKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS53YXJuKGAke25hbWV9IEFQSSBtZXRob2QgZG9lc24ndCBzZWVtIHRvIHN1cHBvcnQgdGhlIGNhbGxiYWNrIHBhcmFtZXRlciwgYCArIFwiZmFsbGluZyBiYWNrIHRvIGNhbGwgaXQgd2l0aG91dCBhIGNhbGxiYWNrOiBcIiwgY2JFcnJvcik7XG4gICAgICAgICAgICAgICAgdGFyZ2V0W25hbWVdKC4uLmFyZ3MpOyAvLyBVcGRhdGUgdGhlIEFQSSBtZXRob2QgbWV0YWRhdGEsIHNvIHRoYXQgdGhlIG5leHQgQVBJIGNhbGxzIHdpbGwgbm90IHRyeSB0b1xuICAgICAgICAgICAgICAgIC8vIHVzZSB0aGUgdW5zdXBwb3J0ZWQgY2FsbGJhY2sgYW55bW9yZS5cblxuICAgICAgICAgICAgICAgIG1ldGFkYXRhLmZhbGxiYWNrVG9Ob0NhbGxiYWNrID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgbWV0YWRhdGEubm9DYWxsYmFjayA9IHRydWU7XG4gICAgICAgICAgICAgICAgcmVzb2x2ZSgpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2UgaWYgKG1ldGFkYXRhLm5vQ2FsbGJhY2spIHtcbiAgICAgICAgICAgICAgdGFyZ2V0W25hbWVdKC4uLmFyZ3MpO1xuICAgICAgICAgICAgICByZXNvbHZlKCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICB0YXJnZXRbbmFtZV0oLi4uYXJncywgbWFrZUNhbGxiYWNrKHtcbiAgICAgICAgICAgICAgICByZXNvbHZlLFxuICAgICAgICAgICAgICAgIHJlamVjdFxuICAgICAgICAgICAgICB9LCBtZXRhZGF0YSkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pO1xuICAgICAgICB9O1xuICAgICAgfTtcbiAgICAgIC8qKlxuICAgICAgICogV3JhcHMgYW4gZXhpc3RpbmcgbWV0aG9kIG9mIHRoZSB0YXJnZXQgb2JqZWN0LCBzbyB0aGF0IGNhbGxzIHRvIGl0IGFyZVxuICAgICAgICogaW50ZXJjZXB0ZWQgYnkgdGhlIGdpdmVuIHdyYXBwZXIgZnVuY3Rpb24uIFRoZSB3cmFwcGVyIGZ1bmN0aW9uIHJlY2VpdmVzLFxuICAgICAgICogYXMgaXRzIGZpcnN0IGFyZ3VtZW50LCB0aGUgb3JpZ2luYWwgYHRhcmdldGAgb2JqZWN0LCBmb2xsb3dlZCBieSBlYWNoIG9mXG4gICAgICAgKiB0aGUgYXJndW1lbnRzIHBhc3NlZCB0byB0aGUgb3JpZ2luYWwgbWV0aG9kLlxuICAgICAgICpcbiAgICAgICAqIEBwYXJhbSB7b2JqZWN0fSB0YXJnZXRcbiAgICAgICAqICAgICAgICBUaGUgb3JpZ2luYWwgdGFyZ2V0IG9iamVjdCB0aGF0IHRoZSB3cmFwcGVkIG1ldGhvZCBiZWxvbmdzIHRvLlxuICAgICAgICogQHBhcmFtIHtmdW5jdGlvbn0gbWV0aG9kXG4gICAgICAgKiAgICAgICAgVGhlIG1ldGhvZCBiZWluZyB3cmFwcGVkLiBUaGlzIGlzIHVzZWQgYXMgdGhlIHRhcmdldCBvZiB0aGUgUHJveHlcbiAgICAgICAqICAgICAgICBvYmplY3Qgd2hpY2ggaXMgY3JlYXRlZCB0byB3cmFwIHRoZSBtZXRob2QuXG4gICAgICAgKiBAcGFyYW0ge2Z1bmN0aW9ufSB3cmFwcGVyXG4gICAgICAgKiAgICAgICAgVGhlIHdyYXBwZXIgZnVuY3Rpb24gd2hpY2ggaXMgY2FsbGVkIGluIHBsYWNlIG9mIGEgZGlyZWN0IGludm9jYXRpb25cbiAgICAgICAqICAgICAgICBvZiB0aGUgd3JhcHBlZCBtZXRob2QuXG4gICAgICAgKlxuICAgICAgICogQHJldHVybnMge1Byb3h5PGZ1bmN0aW9uPn1cbiAgICAgICAqICAgICAgICBBIFByb3h5IG9iamVjdCBmb3IgdGhlIGdpdmVuIG1ldGhvZCwgd2hpY2ggaW52b2tlcyB0aGUgZ2l2ZW4gd3JhcHBlclxuICAgICAgICogICAgICAgIG1ldGhvZCBpbiBpdHMgcGxhY2UuXG4gICAgICAgKi9cblxuXG4gICAgICBjb25zdCB3cmFwTWV0aG9kID0gKHRhcmdldCwgbWV0aG9kLCB3cmFwcGVyKSA9PiB7XG4gICAgICAgIHJldHVybiBuZXcgUHJveHkobWV0aG9kLCB7XG4gICAgICAgICAgYXBwbHkodGFyZ2V0TWV0aG9kLCB0aGlzT2JqLCBhcmdzKSB7XG4gICAgICAgICAgICByZXR1cm4gd3JhcHBlci5jYWxsKHRoaXNPYmosIHRhcmdldCwgLi4uYXJncyk7XG4gICAgICAgICAgfVxuXG4gICAgICAgIH0pO1xuICAgICAgfTtcblxuICAgICAgbGV0IGhhc093blByb3BlcnR5ID0gRnVuY3Rpb24uY2FsbC5iaW5kKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkpO1xuICAgICAgLyoqXG4gICAgICAgKiBXcmFwcyBhbiBvYmplY3QgaW4gYSBQcm94eSB3aGljaCBpbnRlcmNlcHRzIGFuZCB3cmFwcyBjZXJ0YWluIG1ldGhvZHNcbiAgICAgICAqIGJhc2VkIG9uIHRoZSBnaXZlbiBgd3JhcHBlcnNgIGFuZCBgbWV0YWRhdGFgIG9iamVjdHMuXG4gICAgICAgKlxuICAgICAgICogQHBhcmFtIHtvYmplY3R9IHRhcmdldFxuICAgICAgICogICAgICAgIFRoZSB0YXJnZXQgb2JqZWN0IHRvIHdyYXAuXG4gICAgICAgKlxuICAgICAgICogQHBhcmFtIHtvYmplY3R9IFt3cmFwcGVycyA9IHt9XVxuICAgICAgICogICAgICAgIEFuIG9iamVjdCB0cmVlIGNvbnRhaW5pbmcgd3JhcHBlciBmdW5jdGlvbnMgZm9yIHNwZWNpYWwgY2FzZXMuIEFueVxuICAgICAgICogICAgICAgIGZ1bmN0aW9uIHByZXNlbnQgaW4gdGhpcyBvYmplY3QgdHJlZSBpcyBjYWxsZWQgaW4gcGxhY2Ugb2YgdGhlXG4gICAgICAgKiAgICAgICAgbWV0aG9kIGluIHRoZSBzYW1lIGxvY2F0aW9uIGluIHRoZSBgdGFyZ2V0YCBvYmplY3QgdHJlZS4gVGhlc2VcbiAgICAgICAqICAgICAgICB3cmFwcGVyIG1ldGhvZHMgYXJlIGludm9rZWQgYXMgZGVzY3JpYmVkIGluIHtAc2VlIHdyYXBNZXRob2R9LlxuICAgICAgICpcbiAgICAgICAqIEBwYXJhbSB7b2JqZWN0fSBbbWV0YWRhdGEgPSB7fV1cbiAgICAgICAqICAgICAgICBBbiBvYmplY3QgdHJlZSBjb250YWluaW5nIG1ldGFkYXRhIHVzZWQgdG8gYXV0b21hdGljYWxseSBnZW5lcmF0ZVxuICAgICAgICogICAgICAgIFByb21pc2UtYmFzZWQgd3JhcHBlciBmdW5jdGlvbnMgZm9yIGFzeW5jaHJvbm91cy4gQW55IGZ1bmN0aW9uIGluXG4gICAgICAgKiAgICAgICAgdGhlIGB0YXJnZXRgIG9iamVjdCB0cmVlIHdoaWNoIGhhcyBhIGNvcnJlc3BvbmRpbmcgbWV0YWRhdGEgb2JqZWN0XG4gICAgICAgKiAgICAgICAgaW4gdGhlIHNhbWUgbG9jYXRpb24gaW4gdGhlIGBtZXRhZGF0YWAgdHJlZSBpcyByZXBsYWNlZCB3aXRoIGFuXG4gICAgICAgKiAgICAgICAgYXV0b21hdGljYWxseS1nZW5lcmF0ZWQgd3JhcHBlciBmdW5jdGlvbiwgYXMgZGVzY3JpYmVkIGluXG4gICAgICAgKiAgICAgICAge0BzZWUgd3JhcEFzeW5jRnVuY3Rpb259XG4gICAgICAgKlxuICAgICAgICogQHJldHVybnMge1Byb3h5PG9iamVjdD59XG4gICAgICAgKi9cblxuICAgICAgY29uc3Qgd3JhcE9iamVjdCA9ICh0YXJnZXQsIHdyYXBwZXJzID0ge30sIG1ldGFkYXRhID0ge30pID0+IHtcbiAgICAgICAgbGV0IGNhY2hlID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiAgICAgICAgbGV0IGhhbmRsZXJzID0ge1xuICAgICAgICAgIGhhcyhwcm94eVRhcmdldCwgcHJvcCkge1xuICAgICAgICAgICAgcmV0dXJuIHByb3AgaW4gdGFyZ2V0IHx8IHByb3AgaW4gY2FjaGU7XG4gICAgICAgICAgfSxcblxuICAgICAgICAgIGdldChwcm94eVRhcmdldCwgcHJvcCwgcmVjZWl2ZXIpIHtcbiAgICAgICAgICAgIGlmIChwcm9wIGluIGNhY2hlKSB7XG4gICAgICAgICAgICAgIHJldHVybiBjYWNoZVtwcm9wXTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKCEocHJvcCBpbiB0YXJnZXQpKSB7XG4gICAgICAgICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGxldCB2YWx1ZSA9IHRhcmdldFtwcm9wXTtcblxuICAgICAgICAgICAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgICAgICAgIC8vIFRoaXMgaXMgYSBtZXRob2Qgb24gdGhlIHVuZGVybHlpbmcgb2JqZWN0LiBDaGVjayBpZiB3ZSBuZWVkIHRvIGRvXG4gICAgICAgICAgICAgIC8vIGFueSB3cmFwcGluZy5cbiAgICAgICAgICAgICAgaWYgKHR5cGVvZiB3cmFwcGVyc1twcm9wXSA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgICAgICAgICAgLy8gV2UgaGF2ZSBhIHNwZWNpYWwtY2FzZSB3cmFwcGVyIGZvciB0aGlzIG1ldGhvZC5cbiAgICAgICAgICAgICAgICB2YWx1ZSA9IHdyYXBNZXRob2QodGFyZ2V0LCB0YXJnZXRbcHJvcF0sIHdyYXBwZXJzW3Byb3BdKTtcbiAgICAgICAgICAgICAgfSBlbHNlIGlmIChoYXNPd25Qcm9wZXJ0eShtZXRhZGF0YSwgcHJvcCkpIHtcbiAgICAgICAgICAgICAgICAvLyBUaGlzIGlzIGFuIGFzeW5jIG1ldGhvZCB0aGF0IHdlIGhhdmUgbWV0YWRhdGEgZm9yLiBDcmVhdGUgYVxuICAgICAgICAgICAgICAgIC8vIFByb21pc2Ugd3JhcHBlciBmb3IgaXQuXG4gICAgICAgICAgICAgICAgbGV0IHdyYXBwZXIgPSB3cmFwQXN5bmNGdW5jdGlvbihwcm9wLCBtZXRhZGF0YVtwcm9wXSk7XG4gICAgICAgICAgICAgICAgdmFsdWUgPSB3cmFwTWV0aG9kKHRhcmdldCwgdGFyZ2V0W3Byb3BdLCB3cmFwcGVyKTtcbiAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAvLyBUaGlzIGlzIGEgbWV0aG9kIHRoYXQgd2UgZG9uJ3Qga25vdyBvciBjYXJlIGFib3V0LiBSZXR1cm4gdGhlXG4gICAgICAgICAgICAgICAgLy8gb3JpZ2luYWwgbWV0aG9kLCBib3VuZCB0byB0aGUgdW5kZXJseWluZyBvYmplY3QuXG4gICAgICAgICAgICAgICAgdmFsdWUgPSB2YWx1ZS5iaW5kKHRhcmdldCk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSBpZiAodHlwZW9mIHZhbHVlID09PSBcIm9iamVjdFwiICYmIHZhbHVlICE9PSBudWxsICYmIChoYXNPd25Qcm9wZXJ0eSh3cmFwcGVycywgcHJvcCkgfHwgaGFzT3duUHJvcGVydHkobWV0YWRhdGEsIHByb3ApKSkge1xuICAgICAgICAgICAgICAvLyBUaGlzIGlzIGFuIG9iamVjdCB0aGF0IHdlIG5lZWQgdG8gZG8gc29tZSB3cmFwcGluZyBmb3IgdGhlIGNoaWxkcmVuXG4gICAgICAgICAgICAgIC8vIG9mLiBDcmVhdGUgYSBzdWItb2JqZWN0IHdyYXBwZXIgZm9yIGl0IHdpdGggdGhlIGFwcHJvcHJpYXRlIGNoaWxkXG4gICAgICAgICAgICAgIC8vIG1ldGFkYXRhLlxuICAgICAgICAgICAgICB2YWx1ZSA9IHdyYXBPYmplY3QodmFsdWUsIHdyYXBwZXJzW3Byb3BdLCBtZXRhZGF0YVtwcm9wXSk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKGhhc093blByb3BlcnR5KG1ldGFkYXRhLCBcIipcIikpIHtcbiAgICAgICAgICAgICAgLy8gV3JhcCBhbGwgcHJvcGVydGllcyBpbiAqIG5hbWVzcGFjZS5cbiAgICAgICAgICAgICAgdmFsdWUgPSB3cmFwT2JqZWN0KHZhbHVlLCB3cmFwcGVyc1twcm9wXSwgbWV0YWRhdGFbXCIqXCJdKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIC8vIFdlIGRvbid0IG5lZWQgdG8gZG8gYW55IHdyYXBwaW5nIGZvciB0aGlzIHByb3BlcnR5LFxuICAgICAgICAgICAgICAvLyBzbyBqdXN0IGZvcndhcmQgYWxsIGFjY2VzcyB0byB0aGUgdW5kZXJseWluZyBvYmplY3QuXG4gICAgICAgICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShjYWNoZSwgcHJvcCwge1xuICAgICAgICAgICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICAgICAgICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuXG4gICAgICAgICAgICAgICAgZ2V0KCkge1xuICAgICAgICAgICAgICAgICAgcmV0dXJuIHRhcmdldFtwcm9wXTtcbiAgICAgICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICAgICAgc2V0KHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgICB0YXJnZXRbcHJvcF0gPSB2YWx1ZTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgY2FjaGVbcHJvcF0gPSB2YWx1ZTtcbiAgICAgICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICAgICAgICB9LFxuXG4gICAgICAgICAgc2V0KHByb3h5VGFyZ2V0LCBwcm9wLCB2YWx1ZSwgcmVjZWl2ZXIpIHtcbiAgICAgICAgICAgIGlmIChwcm9wIGluIGNhY2hlKSB7XG4gICAgICAgICAgICAgIGNhY2hlW3Byb3BdID0gdmFsdWU7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICB0YXJnZXRbcHJvcF0gPSB2YWx1ZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgfSxcblxuICAgICAgICAgIGRlZmluZVByb3BlcnR5KHByb3h5VGFyZ2V0LCBwcm9wLCBkZXNjKSB7XG4gICAgICAgICAgICByZXR1cm4gUmVmbGVjdC5kZWZpbmVQcm9wZXJ0eShjYWNoZSwgcHJvcCwgZGVzYyk7XG4gICAgICAgICAgfSxcblxuICAgICAgICAgIGRlbGV0ZVByb3BlcnR5KHByb3h5VGFyZ2V0LCBwcm9wKSB7XG4gICAgICAgICAgICByZXR1cm4gUmVmbGVjdC5kZWxldGVQcm9wZXJ0eShjYWNoZSwgcHJvcCk7XG4gICAgICAgICAgfVxuXG4gICAgICAgIH07IC8vIFBlciBjb250cmFjdCBvZiB0aGUgUHJveHkgQVBJLCB0aGUgXCJnZXRcIiBwcm94eSBoYW5kbGVyIG11c3QgcmV0dXJuIHRoZVxuICAgICAgICAvLyBvcmlnaW5hbCB2YWx1ZSBvZiB0aGUgdGFyZ2V0IGlmIHRoYXQgdmFsdWUgaXMgZGVjbGFyZWQgcmVhZC1vbmx5IGFuZFxuICAgICAgICAvLyBub24tY29uZmlndXJhYmxlLiBGb3IgdGhpcyByZWFzb24sIHdlIGNyZWF0ZSBhbiBvYmplY3Qgd2l0aCB0aGVcbiAgICAgICAgLy8gcHJvdG90eXBlIHNldCB0byBgdGFyZ2V0YCBpbnN0ZWFkIG9mIHVzaW5nIGB0YXJnZXRgIGRpcmVjdGx5LlxuICAgICAgICAvLyBPdGhlcndpc2Ugd2UgY2Fubm90IHJldHVybiBhIGN1c3RvbSBvYmplY3QgZm9yIEFQSXMgdGhhdFxuICAgICAgICAvLyBhcmUgZGVjbGFyZWQgcmVhZC1vbmx5IGFuZCBub24tY29uZmlndXJhYmxlLCBzdWNoIGFzIGBjaHJvbWUuZGV2dG9vbHNgLlxuICAgICAgICAvL1xuICAgICAgICAvLyBUaGUgcHJveHkgaGFuZGxlcnMgdGhlbXNlbHZlcyB3aWxsIHN0aWxsIHVzZSB0aGUgb3JpZ2luYWwgYHRhcmdldGBcbiAgICAgICAgLy8gaW5zdGVhZCBvZiB0aGUgYHByb3h5VGFyZ2V0YCwgc28gdGhhdCB0aGUgbWV0aG9kcyBhbmQgcHJvcGVydGllcyBhcmVcbiAgICAgICAgLy8gZGVyZWZlcmVuY2VkIHZpYSB0aGUgb3JpZ2luYWwgdGFyZ2V0cy5cblxuICAgICAgICBsZXQgcHJveHlUYXJnZXQgPSBPYmplY3QuY3JlYXRlKHRhcmdldCk7XG4gICAgICAgIHJldHVybiBuZXcgUHJveHkocHJveHlUYXJnZXQsIGhhbmRsZXJzKTtcbiAgICAgIH07XG4gICAgICAvKipcbiAgICAgICAqIENyZWF0ZXMgYSBzZXQgb2Ygd3JhcHBlciBmdW5jdGlvbnMgZm9yIGFuIGV2ZW50IG9iamVjdCwgd2hpY2ggaGFuZGxlc1xuICAgICAgICogd3JhcHBpbmcgb2YgbGlzdGVuZXIgZnVuY3Rpb25zIHRoYXQgdGhvc2UgbWVzc2FnZXMgYXJlIHBhc3NlZC5cbiAgICAgICAqXG4gICAgICAgKiBBIHNpbmdsZSB3cmFwcGVyIGlzIGNyZWF0ZWQgZm9yIGVhY2ggbGlzdGVuZXIgZnVuY3Rpb24sIGFuZCBzdG9yZWQgaW4gYVxuICAgICAgICogbWFwLiBTdWJzZXF1ZW50IGNhbGxzIHRvIGBhZGRMaXN0ZW5lcmAsIGBoYXNMaXN0ZW5lcmAsIG9yIGByZW1vdmVMaXN0ZW5lcmBcbiAgICAgICAqIHJldHJpZXZlIHRoZSBvcmlnaW5hbCB3cmFwcGVyLCBzbyB0aGF0ICBhdHRlbXB0cyB0byByZW1vdmUgYVxuICAgICAgICogcHJldmlvdXNseS1hZGRlZCBsaXN0ZW5lciB3b3JrIGFzIGV4cGVjdGVkLlxuICAgICAgICpcbiAgICAgICAqIEBwYXJhbSB7RGVmYXVsdFdlYWtNYXA8ZnVuY3Rpb24sIGZ1bmN0aW9uPn0gd3JhcHBlck1hcFxuICAgICAgICogICAgICAgIEEgRGVmYXVsdFdlYWtNYXAgb2JqZWN0IHdoaWNoIHdpbGwgY3JlYXRlIHRoZSBhcHByb3ByaWF0ZSB3cmFwcGVyXG4gICAgICAgKiAgICAgICAgZm9yIGEgZ2l2ZW4gbGlzdGVuZXIgZnVuY3Rpb24gd2hlbiBvbmUgZG9lcyBub3QgZXhpc3QsIGFuZCByZXRyaWV2ZVxuICAgICAgICogICAgICAgIGFuIGV4aXN0aW5nIG9uZSB3aGVuIGl0IGRvZXMuXG4gICAgICAgKlxuICAgICAgICogQHJldHVybnMge29iamVjdH1cbiAgICAgICAqL1xuXG5cbiAgICAgIGNvbnN0IHdyYXBFdmVudCA9IHdyYXBwZXJNYXAgPT4gKHtcbiAgICAgICAgYWRkTGlzdGVuZXIodGFyZ2V0LCBsaXN0ZW5lciwgLi4uYXJncykge1xuICAgICAgICAgIHRhcmdldC5hZGRMaXN0ZW5lcih3cmFwcGVyTWFwLmdldChsaXN0ZW5lciksIC4uLmFyZ3MpO1xuICAgICAgICB9LFxuXG4gICAgICAgIGhhc0xpc3RlbmVyKHRhcmdldCwgbGlzdGVuZXIpIHtcbiAgICAgICAgICByZXR1cm4gdGFyZ2V0Lmhhc0xpc3RlbmVyKHdyYXBwZXJNYXAuZ2V0KGxpc3RlbmVyKSk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgcmVtb3ZlTGlzdGVuZXIodGFyZ2V0LCBsaXN0ZW5lcikge1xuICAgICAgICAgIHRhcmdldC5yZW1vdmVMaXN0ZW5lcih3cmFwcGVyTWFwLmdldChsaXN0ZW5lcikpO1xuICAgICAgICB9XG5cbiAgICAgIH0pO1xuXG4gICAgICBjb25zdCBvblJlcXVlc3RGaW5pc2hlZFdyYXBwZXJzID0gbmV3IERlZmF1bHRXZWFrTWFwKGxpc3RlbmVyID0+IHtcbiAgICAgICAgaWYgKHR5cGVvZiBsaXN0ZW5lciAhPT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgICAgcmV0dXJuIGxpc3RlbmVyO1xuICAgICAgICB9XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBXcmFwcyBhbiBvblJlcXVlc3RGaW5pc2hlZCBsaXN0ZW5lciBmdW5jdGlvbiBzbyB0aGF0IGl0IHdpbGwgcmV0dXJuIGFcbiAgICAgICAgICogYGdldENvbnRlbnQoKWAgcHJvcGVydHkgd2hpY2ggcmV0dXJucyBhIGBQcm9taXNlYCByYXRoZXIgdGhhbiB1c2luZyBhXG4gICAgICAgICAqIGNhbGxiYWNrIEFQSS5cbiAgICAgICAgICpcbiAgICAgICAgICogQHBhcmFtIHtvYmplY3R9IHJlcVxuICAgICAgICAgKiAgICAgICAgVGhlIEhBUiBlbnRyeSBvYmplY3QgcmVwcmVzZW50aW5nIHRoZSBuZXR3b3JrIHJlcXVlc3QuXG4gICAgICAgICAqL1xuXG5cbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIG9uUmVxdWVzdEZpbmlzaGVkKHJlcSkge1xuICAgICAgICAgIGNvbnN0IHdyYXBwZWRSZXEgPSB3cmFwT2JqZWN0KHJlcSwge31cbiAgICAgICAgICAvKiB3cmFwcGVycyAqL1xuICAgICAgICAgICwge1xuICAgICAgICAgICAgZ2V0Q29udGVudDoge1xuICAgICAgICAgICAgICBtaW5BcmdzOiAwLFxuICAgICAgICAgICAgICBtYXhBcmdzOiAwXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSk7XG4gICAgICAgICAgbGlzdGVuZXIod3JhcHBlZFJlcSk7XG4gICAgICAgIH07XG4gICAgICB9KTtcbiAgICAgIGNvbnN0IG9uTWVzc2FnZVdyYXBwZXJzID0gbmV3IERlZmF1bHRXZWFrTWFwKGxpc3RlbmVyID0+IHtcbiAgICAgICAgaWYgKHR5cGVvZiBsaXN0ZW5lciAhPT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgICAgcmV0dXJuIGxpc3RlbmVyO1xuICAgICAgICB9XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBXcmFwcyBhIG1lc3NhZ2UgbGlzdGVuZXIgZnVuY3Rpb24gc28gdGhhdCBpdCBtYXkgc2VuZCByZXNwb25zZXMgYmFzZWQgb25cbiAgICAgICAgICogaXRzIHJldHVybiB2YWx1ZSwgcmF0aGVyIHRoYW4gYnkgcmV0dXJuaW5nIGEgc2VudGluZWwgdmFsdWUgYW5kIGNhbGxpbmcgYVxuICAgICAgICAgKiBjYWxsYmFjay4gSWYgdGhlIGxpc3RlbmVyIGZ1bmN0aW9uIHJldHVybnMgYSBQcm9taXNlLCB0aGUgcmVzcG9uc2UgaXNcbiAgICAgICAgICogc2VudCB3aGVuIHRoZSBwcm9taXNlIGVpdGhlciByZXNvbHZlcyBvciByZWplY3RzLlxuICAgICAgICAgKlxuICAgICAgICAgKiBAcGFyYW0geyp9IG1lc3NhZ2VcbiAgICAgICAgICogICAgICAgIFRoZSBtZXNzYWdlIHNlbnQgYnkgdGhlIG90aGVyIGVuZCBvZiB0aGUgY2hhbm5lbC5cbiAgICAgICAgICogQHBhcmFtIHtvYmplY3R9IHNlbmRlclxuICAgICAgICAgKiAgICAgICAgRGV0YWlscyBhYm91dCB0aGUgc2VuZGVyIG9mIHRoZSBtZXNzYWdlLlxuICAgICAgICAgKiBAcGFyYW0ge2Z1bmN0aW9uKCopfSBzZW5kUmVzcG9uc2VcbiAgICAgICAgICogICAgICAgIEEgY2FsbGJhY2sgd2hpY2gsIHdoZW4gY2FsbGVkIHdpdGggYW4gYXJiaXRyYXJ5IGFyZ3VtZW50LCBzZW5kc1xuICAgICAgICAgKiAgICAgICAgdGhhdCB2YWx1ZSBhcyBhIHJlc3BvbnNlLlxuICAgICAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAgICAgICAgICogICAgICAgIFRydWUgaWYgdGhlIHdyYXBwZWQgbGlzdGVuZXIgcmV0dXJuZWQgYSBQcm9taXNlLCB3aGljaCB3aWxsIGxhdGVyXG4gICAgICAgICAqICAgICAgICB5aWVsZCBhIHJlc3BvbnNlLiBGYWxzZSBvdGhlcndpc2UuXG4gICAgICAgICAqL1xuXG5cbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIG9uTWVzc2FnZShtZXNzYWdlLCBzZW5kZXIsIHNlbmRSZXNwb25zZSkge1xuICAgICAgICAgIGxldCBkaWRDYWxsU2VuZFJlc3BvbnNlID0gZmFsc2U7XG4gICAgICAgICAgbGV0IHdyYXBwZWRTZW5kUmVzcG9uc2U7XG4gICAgICAgICAgbGV0IHNlbmRSZXNwb25zZVByb21pc2UgPSBuZXcgUHJvbWlzZShyZXNvbHZlID0+IHtcbiAgICAgICAgICAgIHdyYXBwZWRTZW5kUmVzcG9uc2UgPSBmdW5jdGlvbiAocmVzcG9uc2UpIHtcbiAgICAgICAgICAgICAgZGlkQ2FsbFNlbmRSZXNwb25zZSA9IHRydWU7XG4gICAgICAgICAgICAgIHJlc29sdmUocmVzcG9uc2UpO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgICBsZXQgcmVzdWx0O1xuXG4gICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIHJlc3VsdCA9IGxpc3RlbmVyKG1lc3NhZ2UsIHNlbmRlciwgd3JhcHBlZFNlbmRSZXNwb25zZSk7XG4gICAgICAgICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgICAgICByZXN1bHQgPSBQcm9taXNlLnJlamVjdChlcnIpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGNvbnN0IGlzUmVzdWx0VGhlbmFibGUgPSByZXN1bHQgIT09IHRydWUgJiYgaXNUaGVuYWJsZShyZXN1bHQpOyAvLyBJZiB0aGUgbGlzdGVuZXIgZGlkbid0IHJldHVybmVkIHRydWUgb3IgYSBQcm9taXNlLCBvciBjYWxsZWRcbiAgICAgICAgICAvLyB3cmFwcGVkU2VuZFJlc3BvbnNlIHN5bmNocm9ub3VzbHksIHdlIGNhbiBleGl0IGVhcmxpZXJcbiAgICAgICAgICAvLyBiZWNhdXNlIHRoZXJlIHdpbGwgYmUgbm8gcmVzcG9uc2Ugc2VudCBmcm9tIHRoaXMgbGlzdGVuZXIuXG5cbiAgICAgICAgICBpZiAocmVzdWx0ICE9PSB0cnVlICYmICFpc1Jlc3VsdFRoZW5hYmxlICYmICFkaWRDYWxsU2VuZFJlc3BvbnNlKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgfSAvLyBBIHNtYWxsIGhlbHBlciB0byBzZW5kIHRoZSBtZXNzYWdlIGlmIHRoZSBwcm9taXNlIHJlc29sdmVzXG4gICAgICAgICAgLy8gYW5kIGFuIGVycm9yIGlmIHRoZSBwcm9taXNlIHJlamVjdHMgKGEgd3JhcHBlZCBzZW5kTWVzc2FnZSBoYXNcbiAgICAgICAgICAvLyB0byB0cmFuc2xhdGUgdGhlIG1lc3NhZ2UgaW50byBhIHJlc29sdmVkIHByb21pc2Ugb3IgYSByZWplY3RlZFxuICAgICAgICAgIC8vIHByb21pc2UpLlxuXG5cbiAgICAgICAgICBjb25zdCBzZW5kUHJvbWlzZWRSZXN1bHQgPSBwcm9taXNlID0+IHtcbiAgICAgICAgICAgIHByb21pc2UudGhlbihtc2cgPT4ge1xuICAgICAgICAgICAgICAvLyBzZW5kIHRoZSBtZXNzYWdlIHZhbHVlLlxuICAgICAgICAgICAgICBzZW5kUmVzcG9uc2UobXNnKTtcbiAgICAgICAgICAgIH0sIGVycm9yID0+IHtcbiAgICAgICAgICAgICAgLy8gU2VuZCBhIEpTT04gcmVwcmVzZW50YXRpb24gb2YgdGhlIGVycm9yIGlmIHRoZSByZWplY3RlZCB2YWx1ZVxuICAgICAgICAgICAgICAvLyBpcyBhbiBpbnN0YW5jZSBvZiBlcnJvciwgb3IgdGhlIG9iamVjdCBpdHNlbGYgb3RoZXJ3aXNlLlxuICAgICAgICAgICAgICBsZXQgbWVzc2FnZTtcblxuICAgICAgICAgICAgICBpZiAoZXJyb3IgJiYgKGVycm9yIGluc3RhbmNlb2YgRXJyb3IgfHwgdHlwZW9mIGVycm9yLm1lc3NhZ2UgPT09IFwic3RyaW5nXCIpKSB7XG4gICAgICAgICAgICAgICAgbWVzc2FnZSA9IGVycm9yLm1lc3NhZ2U7XG4gICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgbWVzc2FnZSA9IFwiQW4gdW5leHBlY3RlZCBlcnJvciBvY2N1cnJlZFwiO1xuICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgc2VuZFJlc3BvbnNlKHtcbiAgICAgICAgICAgICAgICBfX21veldlYkV4dGVuc2lvblBvbHlmaWxsUmVqZWN0X186IHRydWUsXG4gICAgICAgICAgICAgICAgbWVzc2FnZVxuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pLmNhdGNoKGVyciA9PiB7XG4gICAgICAgICAgICAgIC8vIFByaW50IGFuIGVycm9yIG9uIHRoZSBjb25zb2xlIGlmIHVuYWJsZSB0byBzZW5kIHRoZSByZXNwb25zZS5cbiAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihcIkZhaWxlZCB0byBzZW5kIG9uTWVzc2FnZSByZWplY3RlZCByZXBseVwiLCBlcnIpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfTsgLy8gSWYgdGhlIGxpc3RlbmVyIHJldHVybmVkIGEgUHJvbWlzZSwgc2VuZCB0aGUgcmVzb2x2ZWQgdmFsdWUgYXMgYVxuICAgICAgICAgIC8vIHJlc3VsdCwgb3RoZXJ3aXNlIHdhaXQgdGhlIHByb21pc2UgcmVsYXRlZCB0byB0aGUgd3JhcHBlZFNlbmRSZXNwb25zZVxuICAgICAgICAgIC8vIGNhbGxiYWNrIHRvIHJlc29sdmUgYW5kIHNlbmQgaXQgYXMgYSByZXNwb25zZS5cblxuXG4gICAgICAgICAgaWYgKGlzUmVzdWx0VGhlbmFibGUpIHtcbiAgICAgICAgICAgIHNlbmRQcm9taXNlZFJlc3VsdChyZXN1bHQpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBzZW5kUHJvbWlzZWRSZXN1bHQoc2VuZFJlc3BvbnNlUHJvbWlzZSk7XG4gICAgICAgICAgfSAvLyBMZXQgQ2hyb21lIGtub3cgdGhhdCB0aGUgbGlzdGVuZXIgaXMgcmVwbHlpbmcuXG5cblxuICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9O1xuICAgICAgfSk7XG5cbiAgICAgIGNvbnN0IHdyYXBwZWRTZW5kTWVzc2FnZUNhbGxiYWNrID0gKHtcbiAgICAgICAgcmVqZWN0LFxuICAgICAgICByZXNvbHZlXG4gICAgICB9LCByZXBseSkgPT4ge1xuICAgICAgICBpZiAoZXh0ZW5zaW9uQVBJcy5ydW50aW1lLmxhc3RFcnJvcikge1xuICAgICAgICAgIC8vIERldGVjdCB3aGVuIG5vbmUgb2YgdGhlIGxpc3RlbmVycyByZXBsaWVkIHRvIHRoZSBzZW5kTWVzc2FnZSBjYWxsIGFuZCByZXNvbHZlXG4gICAgICAgICAgLy8gdGhlIHByb21pc2UgdG8gdW5kZWZpbmVkIGFzIGluIEZpcmVmb3guXG4gICAgICAgICAgLy8gU2VlIGh0dHBzOi8vZ2l0aHViLmNvbS9tb3ppbGxhL3dlYmV4dGVuc2lvbi1wb2x5ZmlsbC9pc3N1ZXMvMTMwXG4gICAgICAgICAgaWYgKGV4dGVuc2lvbkFQSXMucnVudGltZS5sYXN0RXJyb3IubWVzc2FnZSA9PT0gQ0hST01FX1NFTkRfTUVTU0FHRV9DQUxMQkFDS19OT19SRVNQT05TRV9NRVNTQUdFKSB7XG4gICAgICAgICAgICByZXNvbHZlKCk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJlamVjdChuZXcgRXJyb3IoZXh0ZW5zaW9uQVBJcy5ydW50aW1lLmxhc3RFcnJvci5tZXNzYWdlKSk7XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2UgaWYgKHJlcGx5ICYmIHJlcGx5Ll9fbW96V2ViRXh0ZW5zaW9uUG9seWZpbGxSZWplY3RfXykge1xuICAgICAgICAgIC8vIENvbnZlcnQgYmFjayB0aGUgSlNPTiByZXByZXNlbnRhdGlvbiBvZiB0aGUgZXJyb3IgaW50b1xuICAgICAgICAgIC8vIGFuIEVycm9yIGluc3RhbmNlLlxuICAgICAgICAgIHJlamVjdChuZXcgRXJyb3IocmVwbHkubWVzc2FnZSkpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJlc29sdmUocmVwbHkpO1xuICAgICAgICB9XG4gICAgICB9O1xuXG4gICAgICBjb25zdCB3cmFwcGVkU2VuZE1lc3NhZ2UgPSAobmFtZSwgbWV0YWRhdGEsIGFwaU5hbWVzcGFjZU9iaiwgLi4uYXJncykgPT4ge1xuICAgICAgICBpZiAoYXJncy5sZW5ndGggPCBtZXRhZGF0YS5taW5BcmdzKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBFeHBlY3RlZCBhdCBsZWFzdCAke21ldGFkYXRhLm1pbkFyZ3N9ICR7cGx1cmFsaXplQXJndW1lbnRzKG1ldGFkYXRhLm1pbkFyZ3MpfSBmb3IgJHtuYW1lfSgpLCBnb3QgJHthcmdzLmxlbmd0aH1gKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChhcmdzLmxlbmd0aCA+IG1ldGFkYXRhLm1heEFyZ3MpIHtcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYEV4cGVjdGVkIGF0IG1vc3QgJHttZXRhZGF0YS5tYXhBcmdzfSAke3BsdXJhbGl6ZUFyZ3VtZW50cyhtZXRhZGF0YS5tYXhBcmdzKX0gZm9yICR7bmFtZX0oKSwgZ290ICR7YXJncy5sZW5ndGh9YCk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAgIGNvbnN0IHdyYXBwZWRDYiA9IHdyYXBwZWRTZW5kTWVzc2FnZUNhbGxiYWNrLmJpbmQobnVsbCwge1xuICAgICAgICAgICAgcmVzb2x2ZSxcbiAgICAgICAgICAgIHJlamVjdFxuICAgICAgICAgIH0pO1xuICAgICAgICAgIGFyZ3MucHVzaCh3cmFwcGVkQ2IpO1xuICAgICAgICAgIGFwaU5hbWVzcGFjZU9iai5zZW5kTWVzc2FnZSguLi5hcmdzKTtcbiAgICAgICAgfSk7XG4gICAgICB9O1xuXG4gICAgICBjb25zdCBzdGF0aWNXcmFwcGVycyA9IHtcbiAgICAgICAgZGV2dG9vbHM6IHtcbiAgICAgICAgICBuZXR3b3JrOiB7XG4gICAgICAgICAgICBvblJlcXVlc3RGaW5pc2hlZDogd3JhcEV2ZW50KG9uUmVxdWVzdEZpbmlzaGVkV3JhcHBlcnMpXG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBydW50aW1lOiB7XG4gICAgICAgICAgb25NZXNzYWdlOiB3cmFwRXZlbnQob25NZXNzYWdlV3JhcHBlcnMpLFxuICAgICAgICAgIG9uTWVzc2FnZUV4dGVybmFsOiB3cmFwRXZlbnQob25NZXNzYWdlV3JhcHBlcnMpLFxuICAgICAgICAgIHNlbmRNZXNzYWdlOiB3cmFwcGVkU2VuZE1lc3NhZ2UuYmluZChudWxsLCBcInNlbmRNZXNzYWdlXCIsIHtcbiAgICAgICAgICAgIG1pbkFyZ3M6IDEsXG4gICAgICAgICAgICBtYXhBcmdzOiAzXG4gICAgICAgICAgfSlcbiAgICAgICAgfSxcbiAgICAgICAgdGFiczoge1xuICAgICAgICAgIHNlbmRNZXNzYWdlOiB3cmFwcGVkU2VuZE1lc3NhZ2UuYmluZChudWxsLCBcInNlbmRNZXNzYWdlXCIsIHtcbiAgICAgICAgICAgIG1pbkFyZ3M6IDIsXG4gICAgICAgICAgICBtYXhBcmdzOiAzXG4gICAgICAgICAgfSlcbiAgICAgICAgfVxuICAgICAgfTtcbiAgICAgIGNvbnN0IHNldHRpbmdNZXRhZGF0YSA9IHtcbiAgICAgICAgY2xlYXI6IHtcbiAgICAgICAgICBtaW5BcmdzOiAxLFxuICAgICAgICAgIG1heEFyZ3M6IDFcbiAgICAgICAgfSxcbiAgICAgICAgZ2V0OiB7XG4gICAgICAgICAgbWluQXJnczogMSxcbiAgICAgICAgICBtYXhBcmdzOiAxXG4gICAgICAgIH0sXG4gICAgICAgIHNldDoge1xuICAgICAgICAgIG1pbkFyZ3M6IDEsXG4gICAgICAgICAgbWF4QXJnczogMVxuICAgICAgICB9XG4gICAgICB9O1xuICAgICAgYXBpTWV0YWRhdGEucHJpdmFjeSA9IHtcbiAgICAgICAgbmV0d29yazoge1xuICAgICAgICAgIFwiKlwiOiBzZXR0aW5nTWV0YWRhdGFcbiAgICAgICAgfSxcbiAgICAgICAgc2VydmljZXM6IHtcbiAgICAgICAgICBcIipcIjogc2V0dGluZ01ldGFkYXRhXG4gICAgICAgIH0sXG4gICAgICAgIHdlYnNpdGVzOiB7XG4gICAgICAgICAgXCIqXCI6IHNldHRpbmdNZXRhZGF0YVxuICAgICAgICB9XG4gICAgICB9O1xuICAgICAgcmV0dXJuIHdyYXBPYmplY3QoZXh0ZW5zaW9uQVBJcywgc3RhdGljV3JhcHBlcnMsIGFwaU1ldGFkYXRhKTtcbiAgICB9OyAvLyBUaGUgYnVpbGQgcHJvY2VzcyBhZGRzIGEgVU1EIHdyYXBwZXIgYXJvdW5kIHRoaXMgZmlsZSwgd2hpY2ggbWFrZXMgdGhlXG4gICAgLy8gYG1vZHVsZWAgdmFyaWFibGUgYXZhaWxhYmxlLlxuXG5cbiAgICBtb2R1bGUuZXhwb3J0cyA9IHdyYXBBUElzKGNocm9tZSk7XG4gIH0gZWxzZSB7XG4gICAgbW9kdWxlLmV4cG9ydHMgPSBnbG9iYWxUaGlzLmJyb3dzZXI7XG4gIH1cbn0pO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9YnJvd3Nlci1wb2x5ZmlsbC5qcy5tYXBcbiIsImV4cG9ydCBmdW5jdGlvbiBkZWZpbmVDb250ZW50U2NyaXB0KGRlZmluaXRpb24pIHtcbiAgcmV0dXJuIGRlZmluaXRpb247XG59XG4iLCJleHBvcnQgY29uc3QgREVGQVVMVF9UQVJHRVRfTEFOR1VBR0VTID0gW1xuICB7IGNvZGU6ICd6aC1DTicsIG5hbWU6ICfnroDkvZPkuK3mlocnIH0sXG4gIHsgY29kZTogJ3poLVRXJywgbmFtZTogJ+e5gemrlOS4reaWhycgfSxcbiAgeyBjb2RlOiAnZW4nLCBuYW1lOiAnRW5nbGlzaCcgfSxcbiAgeyBjb2RlOiAnamEnLCBuYW1lOiAn5pel5pys6KqeJyB9LFxuICB7IGNvZGU6ICdrbycsIG5hbWU6ICftlZzqta3slrQnIH0sXG4gIHsgY29kZTogJ2ZyJywgbmFtZTogJ0ZyYW7Dp2FpcycgfSxcbiAgeyBjb2RlOiAnZGUnLCBuYW1lOiAnRGV1dHNjaCcgfSxcbiAgeyBjb2RlOiAnZXMnLCBuYW1lOiAnRXNwYcOxb2wnIH0sXG4gIHsgY29kZTogJ3J1JywgbmFtZTogJ9Cg0YPRgdGB0LrQuNC5JyB9LFxuICB7IGNvZGU6ICdwdCcsIG5hbWU6ICdQb3J0dWd1w6pzJyB9XG5dO1xuXG5leHBvcnQgY29uc3QgTEFOR1VBR0VfREVURUNUSU9OX1BBVFRFUk5TOiBSZWNvcmQ8c3RyaW5nLCBSZWdFeHA+ID0ge1xuICAnemgtQ04nOiAvW1xcdTRlMDAtXFx1OWZhNV0vLFxuICAnamEnOiAvW1xcdTMwNDAtXFx1MzA5ZlxcdTMwYTAtXFx1MzBmZl0vLFxuICAna28nOiAvW1xcdWFjMDAtXFx1ZDdhZl0vLFxuICAncnUnOiAvW1xcdTA0MDAtXFx1MDRmZl0vLFxuICAnYXInOiAvW1xcdTA2MDAtXFx1MDZmZl0vLFxuICAndGgnOiAvW1xcdTBlMDAtXFx1MGU3Zl0vXG59O1xuXG5leHBvcnQgZnVuY3Rpb24gZGV0ZWN0TGFuZ3VhZ2UodGV4dDogc3RyaW5nKTogc3RyaW5nIHwgbnVsbCB7XG4gIGZvciAoY29uc3QgW2xhbmcsIHBhdHRlcm5dIG9mIE9iamVjdC5lbnRyaWVzKExBTkdVQUdFX0RFVEVDVElPTl9QQVRURVJOUykpIHtcbiAgICBpZiAocGF0dGVybi50ZXN0KHRleHQpKSB7XG4gICAgICByZXR1cm4gbGFuZztcbiAgICB9XG4gIH1cbiAgcmV0dXJuIG51bGw7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc0NKSyh0ZXh0OiBzdHJpbmcpOiBib29sZWFuIHtcbiAgcmV0dXJuIC9eW1xcdTRlMDAtXFx1OWZmZlxcdTMwNDAtXFx1MzA5ZlxcdTMwYTAtXFx1MzBmZlxcdWFjMDAtXFx1ZDdhZl0vLnRlc3QodGV4dCk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBleHRyYWN0VGV4dENvbnRlbnQoZWxlbWVudDogSFRNTEVsZW1lbnQpOiBzdHJpbmcge1xuICByZXR1cm4gZWxlbWVudC50ZXh0Q29udGVudD8udHJpbSgpIHx8ICcnO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gc2hvdWxkVHJhbnNsYXRlRWxlbWVudChlbGVtZW50OiBIVE1MRWxlbWVudCk6IGJvb2xlYW4ge1xuICBjb25zdCB0YWcgPSBlbGVtZW50LnRhZ05hbWUudG9Mb3dlckNhc2UoKTtcbiAgY29uc3QgZXhjbHVkZVRhZ3MgPSBbJ3NjcmlwdCcsICdzdHlsZScsICdub3NjcmlwdCcsICdpZnJhbWUnLCAnc3ZnJywgJ2NhbnZhcycsICd2aWRlbycsICdhdWRpbyddO1xuXG4gIGlmIChleGNsdWRlVGFncy5pbmNsdWRlcyh0YWcpKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgaWYgKGVsZW1lbnQuZ2V0QXR0cmlidXRlKCd0cmFuc2xhdGUnKSA9PT0gJ25vJykge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIGlmIChlbGVtZW50LmdldEF0dHJpYnV0ZSgnZGF0YS10cmFuc2xhdGUnKSA9PT0gJ2ZhbHNlJykge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIGNvbnN0IGNsYXNzTmFtZSA9IGVsZW1lbnQuY2xhc3NOYW1lO1xuICBpZiAodHlwZW9mIGNsYXNzTmFtZSA9PT0gJ3N0cmluZycgJiYgY2xhc3NOYW1lLmluY2x1ZGVzKCdub3RyYW5zbGF0ZScpKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgcmV0dXJuIHRydWU7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVUcmFuc2xhdGlvbkJhZGdlKHRyYW5zbGF0ZWQ6IGJvb2xlYW4pOiBIVE1MRWxlbWVudCB7XG4gIGNvbnN0IGJhZGdlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuICBiYWRnZS5jbGFzc05hbWUgPSAnYXQtYmFkZ2UnO1xuICBiYWRnZS5zdHlsZS5jc3NUZXh0ID0gYFxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICB0b3A6IC04cHg7XG4gICAgcmlnaHQ6IC04cHg7XG4gICAgYmFja2dyb3VuZDogJHt0cmFuc2xhdGVkID8gJyMxMGI5ODEnIDogJyNmNTllMGInfTtcbiAgICBjb2xvcjogd2hpdGU7XG4gICAgZm9udC1zaXplOiAxMHB4O1xuICAgIHBhZGRpbmc6IDJweCA2cHg7XG4gICAgYm9yZGVyLXJhZGl1czogNHB4O1xuICAgIHotaW5kZXg6IDEwMDAwO1xuICAgIHBvaW50ZXItZXZlbnRzOiBub25lO1xuICAgIHdoaXRlLXNwYWNlOiBub3dyYXA7XG4gIGA7XG4gIGJhZGdlLnRleHRDb250ZW50ID0gdHJhbnNsYXRlZCA/ICflt7Lnv7vor5EnIDogJ+e/u+ivkeS4rS4uLic7XG4gIHJldHVybiBiYWRnZTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGVzY2FwZUh0bWwodGV4dDogc3RyaW5nKTogc3RyaW5nIHtcbiAgY29uc3QgZGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gIGRpdi50ZXh0Q29udGVudCA9IHRleHQ7XG4gIHJldHVybiBkaXYuaW5uZXJIVE1MO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZGVib3VuY2U8VCBleHRlbmRzICguLi5hcmdzOiBhbnlbXSkgPT4gYW55PihcbiAgZnVuYzogVCxcbiAgd2FpdDogbnVtYmVyXG4pOiAoLi4uYXJnczogUGFyYW1ldGVyczxUPikgPT4gdm9pZCB7XG4gIGxldCB0aW1lb3V0OiBudW1iZXIgfCBudWxsID0gbnVsbDtcblxuICByZXR1cm4gKC4uLmFyZ3M6IFBhcmFtZXRlcnM8VD4pID0+IHtcbiAgICBpZiAodGltZW91dCkge1xuICAgICAgY2xlYXJUaW1lb3V0KHRpbWVvdXQpO1xuICAgIH1cbiAgICB0aW1lb3V0ID0gd2luZG93LnNldFRpbWVvdXQoKCkgPT4gZnVuYyguLi5hcmdzKSwgd2FpdCk7XG4gIH07XG59XG4iLCJpbXBvcnQgeyBMYW5ndWFnZURldGVjdGlvblJlc3VsdCB9IGZyb20gJy4uL3R5cGVzJztcbmltcG9ydCB7IExBTkdVQUdFX0RFVEVDVElPTl9QQVRURVJOUyB9IGZyb20gJy4uL3V0aWxzL2hlbHBlcnMnO1xuXG5leHBvcnQgY2xhc3MgTGFuZ3VhZ2VEZXRlY3RvciB7XG4gIHByaXZhdGUgc2FtcGxlU2l6ZSA9IDIwMDtcbiAgcHJpdmF0ZSBjb25maWRlbmNlVGhyZXNob2xkID0gMC4zO1xuXG4gIGRldGVjdCh0ZXh0OiBzdHJpbmcpOiBMYW5ndWFnZURldGVjdGlvblJlc3VsdCB7XG4gICAgaWYgKCF0ZXh0IHx8IHRleHQudHJpbSgpLmxlbmd0aCA9PT0gMCkge1xuICAgICAgcmV0dXJuIHsgZGV0ZWN0ZWQ6ICdlbicsIGNvbmZpZGVuY2U6IDAgfTtcbiAgICB9XG5cbiAgICBjb25zdCBzYW1wbGUgPSB0aGlzLmdldFNhbXBsZVRleHQodGV4dCk7XG4gICAgY29uc3QgbWF0Y2hlcyA9IHRoaXMuYW5hbHl6ZVNhbXBsZShzYW1wbGUpO1xuXG4gICAgaWYgKG1hdGNoZXMubGVuZ3RoID09PSAwKSB7XG4gICAgICByZXR1cm4geyBkZXRlY3RlZDogJ2VuJywgY29uZmlkZW5jZTogMCB9O1xuICAgIH1cblxuICAgIGNvbnN0IGJlc3RNYXRjaCA9IG1hdGNoZXNbMF07XG5cbiAgICBpZiAoYmVzdE1hdGNoLmNvbmZpZGVuY2UgPCB0aGlzLmNvbmZpZGVuY2VUaHJlc2hvbGQpIHtcbiAgICAgIHJldHVybiB7IGRldGVjdGVkOiAnZW4nLCBjb25maWRlbmNlOiAwIH07XG4gICAgfVxuXG4gICAgcmV0dXJuIGJlc3RNYXRjaDtcbiAgfVxuXG4gIHByaXZhdGUgZ2V0U2FtcGxlVGV4dCh0ZXh0OiBzdHJpbmcpOiBzdHJpbmcge1xuICAgIGNvbnN0IGNsZWFuZWQgPSB0ZXh0XG4gICAgICAucmVwbGFjZSgvXFxzKy9nLCAnICcpXG4gICAgICAucmVwbGFjZSgvW15cXHdcXHNcXHU0ZTAwLVxcdTlmZmZcXHUzMDQwLVxcdTMwOWZcXHUzMGEwLVxcdTMwZmZcXHVhYzAwLVxcdWQ3YWZcXHUwNDAwLVxcdTA0ZmZcXHUwNjAwLVxcdTA2ZmZcXHUwZTAwLVxcdTBlN2ZdL2csICcnKVxuICAgICAgLnRyaW0oKTtcblxuICAgIHJldHVybiBjbGVhbmVkLnNsaWNlKDAsIHRoaXMuc2FtcGxlU2l6ZSk7XG4gIH1cblxuICBwcml2YXRlIGFuYWx5emVTYW1wbGUoc2FtcGxlOiBzdHJpbmcpOiBMYW5ndWFnZURldGVjdGlvblJlc3VsdFtdIHtcbiAgICBjb25zdCByZXN1bHRzOiBMYW5ndWFnZURldGVjdGlvblJlc3VsdFtdID0gW107XG5cbiAgICBmb3IgKGNvbnN0IFtsYW5nLCBwYXR0ZXJuXSBvZiBPYmplY3QuZW50cmllcyhMQU5HVUFHRV9ERVRFQ1RJT05fUEFUVEVSTlMpKSB7XG4gICAgICBjb25zdCBtYXRjaGVzID0gc2FtcGxlLm1hdGNoKG5ldyBSZWdFeHAocGF0dGVybi5zb3VyY2UsICdnJykpO1xuICAgICAgY29uc3QgbWF0Y2hDb3VudCA9IG1hdGNoZXMgPyBtYXRjaGVzLmxlbmd0aCA6IDA7XG4gICAgICBjb25zdCBjb25maWRlbmNlID0gbWF0Y2hDb3VudCAvIHNhbXBsZS5sZW5ndGg7XG5cbiAgICAgIGlmIChtYXRjaENvdW50ID4gMCkge1xuICAgICAgICByZXN1bHRzLnB1c2goe1xuICAgICAgICAgIGRldGVjdGVkOiBsYW5nLFxuICAgICAgICAgIGNvbmZpZGVuY2VcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHJlc3VsdHMuc29ydCgoYSwgYikgPT4gYi5jb25maWRlbmNlIC0gYS5jb25maWRlbmNlKTtcbiAgfVxuXG4gIGRldGVjdFBhZ2VMYW5ndWFnZSgpOiBzdHJpbmcge1xuICAgIGNvbnN0IGh0bWxMYW5nID0gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50Lmxhbmc7XG4gICAgaWYgKGh0bWxMYW5nICYmIGh0bWxMYW5nICE9PSAnZW4nKSB7XG4gICAgICByZXR1cm4gaHRtbExhbmc7XG4gICAgfVxuXG4gICAgY29uc3QgbWV0YUxhbmcgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdtZXRhW2h0dHAtZXF1aXY9XCJDb250ZW50LUxhbmd1YWdlXCJdJyk7XG4gICAgaWYgKG1ldGFMYW5nKSB7XG4gICAgICBjb25zdCBsYW5nID0gbWV0YUxhbmcuZ2V0QXR0cmlidXRlKCdjb250ZW50Jyk7XG4gICAgICBpZiAobGFuZyAmJiBsYW5nICE9PSAnZW4nKSB7XG4gICAgICAgIHJldHVybiBsYW5nO1xuICAgICAgfVxuICAgIH1cblxuICAgIGNvbnN0IGJvZHlUZXh0ID0gZG9jdW1lbnQuYm9keT8udGV4dENvbnRlbnQgfHwgJyc7XG4gICAgY29uc3QgZGV0ZWN0aW9uID0gdGhpcy5kZXRlY3QoYm9keVRleHQpO1xuXG4gICAgcmV0dXJuIGRldGVjdGlvbi5kZXRlY3RlZDtcbiAgfVxuXG4gIHNob3VsZFRyYW5zbGF0ZSh0YXJnZXRMYW5ndWFnZTogc3RyaW5nKTogYm9vbGVhbiB7XG4gICAgY29uc3QgcGFnZUxhbmd1YWdlID0gdGhpcy5kZXRlY3RQYWdlTGFuZ3VhZ2UoKTtcblxuICAgIGlmIChwYWdlTGFuZ3VhZ2UgPT09IHRhcmdldExhbmd1YWdlKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgaWYgKHBhZ2VMYW5ndWFnZS5zdGFydHNXaXRoKHRhcmdldExhbmd1YWdlKSB8fCB0YXJnZXRMYW5ndWFnZS5zdGFydHNXaXRoKHBhZ2VMYW5ndWFnZSkpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxufVxuXG5leHBvcnQgY29uc3QgbGFuZ3VhZ2VEZXRlY3RvciA9IG5ldyBMYW5ndWFnZURldGVjdG9yKCk7XG4iLCJpbXBvcnQgd2ViZXh0IGZyb20gJ3dlYmV4dGVuc2lvbi1wb2x5ZmlsbCc7XG5pbXBvcnQgeyBDYWNoZUVudHJ5IH0gZnJvbSAnLi4vdHlwZXMnO1xuXG5jb25zdCBicm93c2VyID0gd2ViZXh0IGFzIGFueTtcblxuY29uc3QgQ0FDSEVfUFJFRklYID0gJ3RyYW5zX2NhY2hlXyc7XG5jb25zdCBDQUNIRV9JTkRFWCA9ICd0cmFuc19jYWNoZV9pbmRleCc7XG5cbmV4cG9ydCBjbGFzcyBUcmFuc2xhdGlvbkNhY2hlIHtcbiAgcHJpdmF0ZSBjYWNoZUluZGV4OiBNYXA8c3RyaW5nLCBudW1iZXI+ID0gbmV3IE1hcCgpO1xuICBwcml2YXRlIG1heEFnZTogbnVtYmVyID0gNyAqIDI0ICogNjAgKiA2MCAqIDEwMDA7IC8vIDcgZGF5cyBkZWZhdWx0XG5cbiAgYXN5bmMgaW5pdChtYXhBZ2U/OiBudW1iZXIpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBpZiAobWF4QWdlKSB7XG4gICAgICB0aGlzLm1heEFnZSA9IG1heEFnZTtcbiAgICB9XG5cbiAgICBjb25zdCBpbmRleERhdGEgPSBhd2FpdCBicm93c2VyLnN0b3JhZ2UubG9jYWwuZ2V0KENBQ0hFX0lOREVYKTtcbiAgICB0aGlzLmNhY2hlSW5kZXggPSBuZXcgTWFwKE9iamVjdC5lbnRyaWVzKGluZGV4RGF0YVtDQUNIRV9JTkRFWF0gfHwge30pKTtcblxuICAgIGF3YWl0IHRoaXMuY2xlYW5FeHBpcmVkKCk7XG4gIH1cblxuICBwcml2YXRlIGdlbmVyYXRlSGFzaCh0ZXh0OiBzdHJpbmcsIHNvdXJjZUxhbmc6IHN0cmluZywgdGFyZ2V0TGFuZzogc3RyaW5nLCBtb2RlbDogc3RyaW5nKTogc3RyaW5nIHtcbiAgICByZXR1cm4gYCR7c291cmNlTGFuZ306JHt0YXJnZXRMYW5nfToke21vZGVsfToke3RoaXMuaGFzaENvZGUodGV4dCl9YDtcbiAgfVxuXG4gIHByaXZhdGUgaGFzaENvZGUoc3RyOiBzdHJpbmcpOiBudW1iZXIge1xuICAgIGxldCBoYXNoID0gMDtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHN0ci5sZW5ndGg7IGkrKykge1xuICAgICAgY29uc3QgY2hhciA9IHN0ci5jaGFyQ29kZUF0KGkpO1xuICAgICAgaGFzaCA9ICgoaGFzaCA8PCA1KSAtIGhhc2gpICsgY2hhcjtcbiAgICAgIGhhc2ggPSBoYXNoICYgaGFzaDsgLy8gQ29udmVydCB0byAzMmJpdCBpbnRlZ2VyXG4gICAgfVxuICAgIHJldHVybiBNYXRoLmFicyhoYXNoKTtcbiAgfVxuXG4gIGFzeW5jIGdldCh0ZXh0OiBzdHJpbmcsIHNvdXJjZUxhbmc6IHN0cmluZywgdGFyZ2V0TGFuZzogc3RyaW5nLCBtb2RlbDogc3RyaW5nKTogUHJvbWlzZTxDYWNoZUVudHJ5IHwgbnVsbD4ge1xuICAgIGNvbnN0IGhhc2ggPSB0aGlzLmdlbmVyYXRlSGFzaCh0ZXh0LCBzb3VyY2VMYW5nLCB0YXJnZXRMYW5nLCBtb2RlbCk7XG4gICAgY29uc3QgY2FjaGVLZXkgPSBgJHtDQUNIRV9QUkVGSVh9JHtoYXNofWA7XG5cbiAgICBjb25zdCBkYXRhID0gYXdhaXQgYnJvd3Nlci5zdG9yYWdlLmxvY2FsLmdldChjYWNoZUtleSk7XG4gICAgY29uc3QgZW50cnk6IENhY2hlRW50cnkgPSBkYXRhW2NhY2hlS2V5XTtcblxuICAgIGlmICghZW50cnkpIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIGNvbnN0IG5vdyA9IERhdGUubm93KCk7XG4gICAgaWYgKG5vdyAtIGVudHJ5LnRpbWVzdGFtcCA+IHRoaXMubWF4QWdlKSB7XG4gICAgICBhd2FpdCB0aGlzLmRlbGV0ZShoYXNoKTtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIHJldHVybiBlbnRyeTtcbiAgfVxuXG4gIGFzeW5jIHNldCh0ZXh0OiBzdHJpbmcsIHNvdXJjZUxhbmc6IHN0cmluZywgdGFyZ2V0TGFuZzogc3RyaW5nLCBtb2RlbDogc3RyaW5nLCB0cmFuc2xhdGVkVGV4dDogc3RyaW5nKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgY29uc3QgaGFzaCA9IHRoaXMuZ2VuZXJhdGVIYXNoKHRleHQsIHNvdXJjZUxhbmcsIHRhcmdldExhbmcsIG1vZGVsKTtcbiAgICBjb25zdCBjYWNoZUtleSA9IGAke0NBQ0hFX1BSRUZJWH0ke2hhc2h9YDtcblxuICAgIGNvbnN0IGVudHJ5OiBDYWNoZUVudHJ5ID0ge1xuICAgICAgb3JpZ2luYWxUZXh0OiB0ZXh0LFxuICAgICAgdHJhbnNsYXRlZFRleHQsXG4gICAgICBzb3VyY2VMYW5nLFxuICAgICAgdGFyZ2V0TGFuZyxcbiAgICAgIG1vZGVsLFxuICAgICAgdGltZXN0YW1wOiBEYXRlLm5vdygpLFxuICAgICAgaGFzaFxuICAgIH07XG5cbiAgICBhd2FpdCBicm93c2VyLnN0b3JhZ2UubG9jYWwuc2V0KHsgW2NhY2hlS2V5XTogZW50cnkgfSk7XG5cbiAgICB0aGlzLmNhY2hlSW5kZXguc2V0KGhhc2gsIGVudHJ5LnRpbWVzdGFtcCk7XG4gICAgYXdhaXQgdGhpcy5zYXZlSW5kZXgoKTtcblxuICAgIGF3YWl0IHRoaXMuY2xlYW5PbGRFbnRyaWVzKCk7XG4gIH1cblxuICBhc3luYyBkZWxldGUoaGFzaDogc3RyaW5nKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgY29uc3QgY2FjaGVLZXkgPSBgJHtDQUNIRV9QUkVGSVh9JHtoYXNofWA7XG4gICAgYXdhaXQgYnJvd3Nlci5zdG9yYWdlLmxvY2FsLnJlbW92ZShjYWNoZUtleSk7XG4gICAgdGhpcy5jYWNoZUluZGV4LmRlbGV0ZShoYXNoKTtcbiAgICBhd2FpdCB0aGlzLnNhdmVJbmRleCgpO1xuICB9XG5cbiAgYXN5bmMgY2xlYXIoKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgY29uc3Qga2V5cyA9IEFycmF5LmZyb20odGhpcy5jYWNoZUluZGV4LmtleXMoKSk7XG4gICAgY29uc3QgY2FjaGVLZXlzID0ga2V5cy5tYXAoayA9PiBgJHtDQUNIRV9QUkVGSVh9JHtrfWApO1xuXG4gICAgYXdhaXQgYnJvd3Nlci5zdG9yYWdlLmxvY2FsLnJlbW92ZShbLi4uY2FjaGVLZXlzLCBDQUNIRV9JTkRFWF0pO1xuICAgIHRoaXMuY2FjaGVJbmRleC5jbGVhcigpO1xuICB9XG5cbiAgcHJpdmF0ZSBhc3luYyBzYXZlSW5kZXgoKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgY29uc3QgaW5kZXhPYmogPSBPYmplY3QuZnJvbUVudHJpZXModGhpcy5jYWNoZUluZGV4KTtcbiAgICBhd2FpdCBicm93c2VyLnN0b3JhZ2UubG9jYWwuc2V0KHsgW0NBQ0hFX0lOREVYXTogaW5kZXhPYmogfSk7XG4gIH1cblxuICBwcml2YXRlIGFzeW5jIGNsZWFuRXhwaXJlZCgpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBjb25zdCBub3cgPSBEYXRlLm5vdygpO1xuICAgIGNvbnN0IGV4cGlyZWQ6IHN0cmluZ1tdID0gW107XG5cbiAgICBmb3IgKGNvbnN0IFtoYXNoLCB0aW1lc3RhbXBdIG9mIHRoaXMuY2FjaGVJbmRleC5lbnRyaWVzKCkpIHtcbiAgICAgIGlmIChub3cgLSB0aW1lc3RhbXAgPiB0aGlzLm1heEFnZSkge1xuICAgICAgICBleHBpcmVkLnB1c2goaGFzaCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgZm9yIChjb25zdCBoYXNoIG9mIGV4cGlyZWQpIHtcbiAgICAgIGF3YWl0IHRoaXMuZGVsZXRlKGhhc2gpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgYXN5bmMgY2xlYW5PbGRFbnRyaWVzKCk6IFByb21pc2U8dm9pZD4ge1xuICAgIGNvbnN0IG1heEVudHJpZXMgPSAxMDAwMDtcbiAgICBpZiAodGhpcy5jYWNoZUluZGV4LnNpemUgPD0gbWF4RW50cmllcykge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IGVudHJpZXMgPSBBcnJheS5mcm9tKHRoaXMuY2FjaGVJbmRleC5lbnRyaWVzKCkpXG4gICAgICAuc29ydCgoYSwgYikgPT4gYVsxXSAtIGJbMV0pO1xuXG4gICAgY29uc3QgdG9SZW1vdmUgPSBlbnRyaWVzLnNsaWNlKDAsIGVudHJpZXMubGVuZ3RoIC0gbWF4RW50cmllcyk7XG4gICAgZm9yIChjb25zdCBbaGFzaF0gb2YgdG9SZW1vdmUpIHtcbiAgICAgIGF3YWl0IHRoaXMuZGVsZXRlKGhhc2gpO1xuICAgIH1cbiAgfVxuXG4gIGFzeW5jIGdldFN0YXRzKCk6IFByb21pc2U8eyBzaXplOiBudW1iZXI7IG9sZGVzdFRpbWVzdGFtcDogbnVtYmVyOyBuZXdlc3RUaW1lc3RhbXA6IG51bWJlciB9PiB7XG4gICAgaWYgKHRoaXMuY2FjaGVJbmRleC5zaXplID09PSAwKSB7XG4gICAgICByZXR1cm4geyBzaXplOiAwLCBvbGRlc3RUaW1lc3RhbXA6IDAsIG5ld2VzdFRpbWVzdGFtcDogMCB9O1xuICAgIH1cblxuICAgIGNvbnN0IHRpbWVzdGFtcHMgPSBBcnJheS5mcm9tKHRoaXMuY2FjaGVJbmRleC52YWx1ZXMoKSk7XG4gICAgcmV0dXJuIHtcbiAgICAgIHNpemU6IHRoaXMuY2FjaGVJbmRleC5zaXplLFxuICAgICAgb2xkZXN0VGltZXN0YW1wOiBNYXRoLm1pbiguLi50aW1lc3RhbXBzKSxcbiAgICAgIG5ld2VzdFRpbWVzdGFtcDogTWF0aC5tYXgoLi4udGltZXN0YW1wcylcbiAgICB9O1xuICB9XG59XG5cbmV4cG9ydCBjb25zdCB0cmFuc2xhdGlvbkNhY2hlID0gbmV3IFRyYW5zbGF0aW9uQ2FjaGUoKTtcbiIsImltcG9ydCB3ZWJleHQgZnJvbSAnd2ViZXh0ZW5zaW9uLXBvbHlmaWxsJztcbmltcG9ydCB7IE9wZW5BSUNvbmZpZywgVHJhbnNsYXRpb25SZXF1ZXN0LCBUcmFuc2xhdGlvblJlc3BvbnNlIH0gZnJvbSAnLi4vdHlwZXMnO1xuaW1wb3J0IHsgdHJhbnNsYXRpb25DYWNoZSB9IGZyb20gJy4vY2FjaGUnO1xuXG5jb25zdCBicm93c2VyID0gd2ViZXh0IGFzIGFueTtcblxuaW50ZXJmYWNlIE9wZW5BSVJlcXVlc3Qge1xuICBtb2RlbDogc3RyaW5nO1xuICBtZXNzYWdlczogQXJyYXk8eyByb2xlOiBzdHJpbmc7IGNvbnRlbnQ6IHN0cmluZyB9PjtcbiAgdGVtcGVyYXR1cmU/OiBudW1iZXI7XG4gIG1heF90b2tlbnM/OiBudW1iZXI7XG59XG5cbmludGVyZmFjZSBPcGVuQUlSZXNwb25zZSB7XG4gIGNob2ljZXM6IEFycmF5PHtcbiAgICBtZXNzYWdlOiB7IGNvbnRlbnQ6IHN0cmluZyB9O1xuICAgIGZpbmlzaF9yZWFzb246IHN0cmluZztcbiAgfT47XG4gIHVzYWdlOiB7XG4gICAgcHJvbXB0X3Rva2VuczogbnVtYmVyO1xuICAgIGNvbXBsZXRpb25fdG9rZW5zOiBudW1iZXI7XG4gICAgdG90YWxfdG9rZW5zOiBudW1iZXI7XG4gIH07XG59XG5cbmV4cG9ydCBjbGFzcyBPcGVuQUlTZXJ2aWNlIHtcbiAgcHJpdmF0ZSBjb25maWc6IE9wZW5BSUNvbmZpZztcbiAgcHJpdmF0ZSBhY3RpdmVSZXF1ZXN0czogTWFwPHN0cmluZywgQWJvcnRDb250cm9sbGVyPiA9IG5ldyBNYXAoKTtcbiAgcHJpdmF0ZSByZXF1ZXN0UXVldWU6IEFycmF5PCgpID0+IHZvaWQ+ID0gW107XG5cbiAgY29uc3RydWN0b3IoY29uZmlnOiBPcGVuQUlDb25maWcpIHtcbiAgICB0aGlzLmNvbmZpZyA9IGNvbmZpZztcbiAgfVxuXG4gIHVwZGF0ZUNvbmZpZyhjb25maWc6IFBhcnRpYWw8T3BlbkFJQ29uZmlnPik6IHZvaWQge1xuICAgIHRoaXMuY29uZmlnID0geyAuLi50aGlzLmNvbmZpZywgLi4uY29uZmlnIH07XG4gIH1cblxuICBhc3luYyB0cmFuc2xhdGUocmVxOiBUcmFuc2xhdGlvblJlcXVlc3QpOiBQcm9taXNlPFRyYW5zbGF0aW9uUmVzcG9uc2U+IHtcbiAgICBjb25zdCBtb2RlbCA9IHJlcS5tb2RlbCB8fCB0aGlzLmNvbmZpZy5tb2RlbHNbMF07XG4gICAgY29uc3QgY2FjaGVLZXkgPSBgJHtyZXEuc291cmNlTGFuZ306JHtyZXEudGFyZ2V0TGFuZ306JHttb2RlbH1gO1xuXG4gICAgaWYgKHRoaXMuY29uZmlnLm1heENvbmN1cnJlbmN5ID4gMCkge1xuICAgICAgYXdhaXQgdGhpcy53YWl0U2xvdCgpO1xuICAgIH1cblxuICAgIHRyeSB7XG4gICAgICBjb25zdCBjYWNoZWQgPSBhd2FpdCB0cmFuc2xhdGlvbkNhY2hlLmdldChcbiAgICAgICAgcmVxLnRleHQsXG4gICAgICAgIHJlcS5zb3VyY2VMYW5nLFxuICAgICAgICByZXEudGFyZ2V0TGFuZyxcbiAgICAgICAgbW9kZWxcbiAgICAgICk7XG5cbiAgICAgIGlmIChjYWNoZWQpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICBvcmlnaW5hbFRleHQ6IHJlcS50ZXh0LFxuICAgICAgICAgIHRyYW5zbGF0ZWRUZXh0OiBjYWNoZWQudHJhbnNsYXRlZFRleHQsXG4gICAgICAgICAgc291cmNlTGFuZzogcmVxLnNvdXJjZUxhbmcsXG4gICAgICAgICAgdGFyZ2V0TGFuZzogcmVxLnRhcmdldExhbmcsXG4gICAgICAgICAgbW9kZWw6IGNhY2hlZC5tb2RlbCxcbiAgICAgICAgICBjYWNoZWQ6IHRydWVcbiAgICAgICAgfTtcbiAgICAgIH1cblxuICAgICAgY29uc3QgYWJvcnRDb250cm9sbGVyID0gbmV3IEFib3J0Q29udHJvbGxlcigpO1xuICAgICAgY29uc3QgcmVxdWVzdElkID0gYCR7Y2FjaGVLZXl9OiR7RGF0ZS5ub3coKX1gO1xuICAgICAgdGhpcy5hY3RpdmVSZXF1ZXN0cy5zZXQocmVxdWVzdElkLCBhYm9ydENvbnRyb2xsZXIpO1xuXG4gICAgICBjb25zdCB0cmFuc2xhdGVkVGV4dCA9IGF3YWl0IHRoaXMudHJhbnNsYXRlV2l0aE1vZGVsKFxuICAgICAgICByZXEudGV4dCxcbiAgICAgICAgcmVxLnNvdXJjZUxhbmcsXG4gICAgICAgIHJlcS50YXJnZXRMYW5nLFxuICAgICAgICBtb2RlbCxcbiAgICAgICAgYWJvcnRDb250cm9sbGVyLnNpZ25hbFxuICAgICAgKTtcblxuICAgICAgYXdhaXQgdHJhbnNsYXRpb25DYWNoZS5zZXQoXG4gICAgICAgIHJlcS50ZXh0LFxuICAgICAgICByZXEuc291cmNlTGFuZyxcbiAgICAgICAgcmVxLnRhcmdldExhbmcsXG4gICAgICAgIG1vZGVsLFxuICAgICAgICB0cmFuc2xhdGVkVGV4dFxuICAgICAgKTtcblxuICAgICAgdGhpcy5hY3RpdmVSZXF1ZXN0cy5kZWxldGUocmVxdWVzdElkKTtcbiAgICAgIHRoaXMucmVsZWFzZVNsb3QoKTtcblxuICAgICAgcmV0dXJuIHtcbiAgICAgICAgb3JpZ2luYWxUZXh0OiByZXEudGV4dCxcbiAgICAgICAgdHJhbnNsYXRlZFRleHQsXG4gICAgICAgIHNvdXJjZUxhbmc6IHJlcS5zb3VyY2VMYW5nLFxuICAgICAgICB0YXJnZXRMYW5nOiByZXEudGFyZ2V0TGFuZyxcbiAgICAgICAgbW9kZWwsXG4gICAgICAgIGNhY2hlZDogZmFsc2VcbiAgICAgIH07XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIHRoaXMucmVsZWFzZVNsb3QoKTtcbiAgICAgIHRocm93IGVycm9yO1xuICAgIH1cbiAgfVxuXG4gIGFzeW5jIHRyYW5zbGF0ZUJhdGNoKHJlcXVlc3RzOiBUcmFuc2xhdGlvblJlcXVlc3RbXSk6IFByb21pc2U8VHJhbnNsYXRpb25SZXNwb25zZVtdPiB7XG4gICAgaWYgKHJlcXVlc3RzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgcmV0dXJuIFtdO1xuICAgIH1cblxuICAgIGNvbnN0IG1vZGVsID0gcmVxdWVzdHNbMF0ubW9kZWwgfHwgdGhpcy5jb25maWcubW9kZWxzWzBdO1xuXG4gICAgaWYgKHRoaXMuY29uZmlnLm1vZGVscy5sZW5ndGggPiAxKSB7XG4gICAgICByZXR1cm4gdGhpcy50cmFuc2xhdGVCYXRjaFdpdGhNdWx0aXBsZU1vZGVscyhyZXF1ZXN0cyk7XG4gICAgfVxuXG4gICAgY29uc3QgYmF0Y2hTaXplID0gTWF0aC5taW4odGhpcy5jb25maWcubWF4Q29uY3VycmVuY3kgfHwgMSwgcmVxdWVzdHMubGVuZ3RoKTtcbiAgICBjb25zdCByZXN1bHRzOiBUcmFuc2xhdGlvblJlc3BvbnNlW10gPSBbXTtcblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcmVxdWVzdHMubGVuZ3RoOyBpICs9IGJhdGNoU2l6ZSkge1xuICAgICAgY29uc3QgYmF0Y2ggPSByZXF1ZXN0cy5zbGljZShpLCBpICsgYmF0Y2hTaXplKTtcbiAgICAgIGNvbnN0IGJhdGNoUmVzdWx0cyA9IGF3YWl0IFByb21pc2UuYWxsU2V0dGxlZChcbiAgICAgICAgYmF0Y2gubWFwKHJlcSA9PiB0aGlzLnRyYW5zbGF0ZShyZXEpKVxuICAgICAgKTtcblxuICAgICAgZm9yIChjb25zdCByZXN1bHQgb2YgYmF0Y2hSZXN1bHRzKSB7XG4gICAgICAgIGlmIChyZXN1bHQuc3RhdHVzID09PSAnZnVsZmlsbGVkJykge1xuICAgICAgICAgIHJlc3VsdHMucHVzaChyZXN1bHQudmFsdWUpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJlc3VsdHMucHVzaCh7XG4gICAgICAgICAgICBvcmlnaW5hbFRleHQ6IHJlcXVlc3RzW3Jlc3VsdHMubGVuZ3RoXS50ZXh0LFxuICAgICAgICAgICAgdHJhbnNsYXRlZFRleHQ6IHJlcXVlc3RzW3Jlc3VsdHMubGVuZ3RoXS50ZXh0LFxuICAgICAgICAgICAgc291cmNlTGFuZzogcmVxdWVzdHNbcmVzdWx0cy5sZW5ndGhdLnNvdXJjZUxhbmcsXG4gICAgICAgICAgICB0YXJnZXRMYW5nOiByZXF1ZXN0c1tyZXN1bHRzLmxlbmd0aF0udGFyZ2V0TGFuZyxcbiAgICAgICAgICAgIG1vZGVsLFxuICAgICAgICAgICAgY2FjaGVkOiBmYWxzZVxuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHJlc3VsdHM7XG4gIH1cblxuICBwcml2YXRlIGFzeW5jIHRyYW5zbGF0ZUJhdGNoV2l0aE11bHRpcGxlTW9kZWxzKFxuICAgIHJlcXVlc3RzOiBUcmFuc2xhdGlvblJlcXVlc3RbXVxuICApOiBQcm9taXNlPFRyYW5zbGF0aW9uUmVzcG9uc2VbXT4ge1xuICAgIGNvbnN0IG1vZGVsQ291bnRzID0gTWF0aC5jZWlsKFxuICAgICAgKHRoaXMuY29uZmlnLm1heENvbmN1cnJlbmN5IHx8IDEpIC8gdGhpcy5jb25maWcubW9kZWxzLmxlbmd0aFxuICAgICk7XG4gICAgY29uc3QgcmVzdWx0czogVHJhbnNsYXRpb25SZXNwb25zZVtdID0gW107XG5cbiAgICBmb3IgKGNvbnN0IG1vZGVsIG9mIHRoaXMuY29uZmlnLm1vZGVscykge1xuICAgICAgY29uc3QgbW9kZWxSZXF1ZXN0cyA9IHJlcXVlc3RzLmZpbHRlcihcbiAgICAgICAgciA9PiAhci5tb2RlbCB8fCByLm1vZGVsID09PSBtb2RlbFxuICAgICAgKTtcblxuICAgICAgaWYgKG1vZGVsUmVxdWVzdHMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuXG4gICAgICBjb25zdCBiYXRjaGVzOiBUcmFuc2xhdGlvblJlcXVlc3RbXVtdID0gW107XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG1vZGVsUmVxdWVzdHMubGVuZ3RoOyBpICs9IG1vZGVsQ291bnRzKSB7XG4gICAgICAgIGJhdGNoZXMucHVzaChtb2RlbFJlcXVlc3RzLnNsaWNlKGksIGkgKyBtb2RlbENvdW50cykpO1xuICAgICAgfVxuXG4gICAgICBmb3IgKGNvbnN0IGJhdGNoIG9mIGJhdGNoZXMpIHtcbiAgICAgICAgY29uc3QgYmF0Y2hSZXN1bHRzID0gYXdhaXQgUHJvbWlzZS5hbGxTZXR0bGVkKFxuICAgICAgICAgIGJhdGNoLm1hcChyZXEgPT5cbiAgICAgICAgICAgIHRoaXMudHJhbnNsYXRlKHsgLi4ucmVxLCBtb2RlbCB9KVxuICAgICAgICAgIClcbiAgICAgICAgKTtcblxuICAgICAgICBmb3IgKGNvbnN0IHJlc3VsdCBvZiBiYXRjaFJlc3VsdHMpIHtcbiAgICAgICAgICBpZiAocmVzdWx0LnN0YXR1cyA9PT0gJ2Z1bGZpbGxlZCcpIHtcbiAgICAgICAgICAgIHJlc3VsdHMucHVzaChyZXN1bHQudmFsdWUpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXN1bHRzLnB1c2goe1xuICAgICAgICAgICAgICBvcmlnaW5hbFRleHQ6IHJlcXVlc3RzW3Jlc3VsdHMubGVuZ3RoXS50ZXh0LFxuICAgICAgICAgICAgICB0cmFuc2xhdGVkVGV4dDogcmVxdWVzdHNbcmVzdWx0cy5sZW5ndGhdLnRleHQsXG4gICAgICAgICAgICAgIHNvdXJjZUxhbmc6IHJlcXVlc3RzW3Jlc3VsdHMubGVuZ3RoXS5zb3VyY2VMYW5nLFxuICAgICAgICAgICAgICB0YXJnZXRMYW5nOiByZXF1ZXN0c1tyZXN1bHRzLmxlbmd0aF0udGFyZ2V0TGFuZyxcbiAgICAgICAgICAgICAgbW9kZWwsXG4gICAgICAgICAgICAgIGNhY2hlZDogZmFsc2VcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiByZXN1bHRzO1xuICB9XG5cbiAgcHJpdmF0ZSBhc3luYyB0cmFuc2xhdGVXaXRoTW9kZWwoXG4gICAgdGV4dDogc3RyaW5nLFxuICAgIHNvdXJjZUxhbmc6IHN0cmluZyxcbiAgICB0YXJnZXRMYW5nOiBzdHJpbmcsXG4gICAgbW9kZWw6IHN0cmluZyxcbiAgICBzaWduYWw6IEFib3J0U2lnbmFsXG4gICk6IFByb21pc2U8c3RyaW5nPiB7XG4gICAgY29uc3QgcHJvbXB0ID0gdGhpcy5idWlsZFByb21wdCh0ZXh0LCBzb3VyY2VMYW5nLCB0YXJnZXRMYW5nKTtcblxuICAgIGNvbnN0IHJlcXVlc3RCb2R5OiBPcGVuQUlSZXF1ZXN0ID0ge1xuICAgICAgbW9kZWwsXG4gICAgICBtZXNzYWdlczogW1xuICAgICAgICB7XG4gICAgICAgICAgcm9sZTogJ3N5c3RlbScsXG4gICAgICAgICAgY29udGVudDogJ1lvdSBhcmUgYSBwcm9mZXNzaW9uYWwgdHJhbnNsYXRvci4gVHJhbnNsYXRlIGdpdmVuIHRleHQgYWNjdXJhdGVseSB3aGlsZSBwcmVzZXJ2aW5nIG9yaWdpbmFsIG1lYW5pbmcgYW5kIHRvbmUuJ1xuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgcm9sZTogJ3VzZXInLFxuICAgICAgICAgIGNvbnRlbnQ6IHByb21wdFxuICAgICAgICB9XG4gICAgICBdLFxuICAgICAgdGVtcGVyYXR1cmU6IDAuMyxcbiAgICAgIG1heF90b2tlbnM6IDIwMDBcbiAgICB9O1xuXG4gICAgbGV0IGFwaVVybCA9IHRoaXMuY29uZmlnLmJhc2VVcmw7XG4gICAgaWYgKCFhcGlVcmwuZW5kc1dpdGgoJy9jaGF0L2NvbXBsZXRpb25zJykpIHtcbiAgICAgIGFwaVVybCA9IGFwaVVybC5yZXBsYWNlKC9cXC8kLywgJycpICsgJy9jaGF0L2NvbXBsZXRpb25zJztcbiAgICB9XG5cbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKGFwaVVybCwge1xuICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICBoZWFkZXJzOiB7XG4gICAgICAgICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbicsXG4gICAgICAgICdBdXRob3JpemF0aW9uJzogYEJlYXJlciAke3RoaXMuY29uZmlnLmFwaUtleX1gXG4gICAgICB9LFxuICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkocmVxdWVzdEJvZHkpLFxuICAgICAgc2lnbmFsXG4gICAgfSk7XG5cbiAgICBpZiAoIXJlc3BvbnNlLm9rKSB7XG4gICAgICBjb25zdCBlcnJvclRleHQgPSBhd2FpdCByZXNwb25zZS50ZXh0KCk7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYE9wZW5BSSBBUEkgZXJyb3I6ICR7cmVzcG9uc2Uuc3RhdHVzfSAtICR7ZXJyb3JUZXh0fWApO1xuICAgIH1cblxuICAgIGNvbnN0IGRhdGE6IE9wZW5BSVJlc3BvbnNlID0gYXdhaXQgcmVzcG9uc2UuanNvbigpO1xuXG4gICAgaWYgKCFkYXRhLmNob2ljZXMgfHwgZGF0YS5jaG9pY2VzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdObyB0cmFuc2xhdGlvbiByZXR1cm5lZCBmcm9tIE9wZW5BSSBBUEknKTtcbiAgICB9XG5cbiAgICByZXR1cm4gZGF0YS5jaG9pY2VzWzBdLm1lc3NhZ2UuY29udGVudC50cmltKCk7XG4gIH1cblxuICBwcml2YXRlIGJ1aWxkUHJvbXB0KHRleHQ6IHN0cmluZywgc291cmNlTGFuZzogc3RyaW5nLCB0YXJnZXRMYW5nOiBzdHJpbmcpOiBzdHJpbmcge1xuICAgIHJldHVybiBgVHJhbnNsYXRlIHRoZSBmb2xsb3dpbmcgdGV4dCBmcm9tICR7c291cmNlTGFuZ30gdG8gJHt0YXJnZXRMYW5nfTpcblxuJHt0ZXh0fVxuXG5Qcm92aWRlIG9ubHkgdGhlIHRyYW5zbGF0aW9uLCBubyBleHBsYW5hdGlvbnMuYDtcbiAgfVxuXG4gIHByaXZhdGUgYXN5bmMgd2FpdFNsb3QoKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgY29uc3QgYWN0aXZlQ291bnQgPSB0aGlzLmFjdGl2ZVJlcXVlc3RzLnNpemU7XG4gICAgaWYgKGFjdGl2ZUNvdW50IDwgdGhpcy5jb25maWcubWF4Q29uY3VycmVuY3kpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICByZXR1cm4gbmV3IFByb21pc2UocmVzb2x2ZSA9PiB7XG4gICAgICB0aGlzLnJlcXVlc3RRdWV1ZS5wdXNoKHJlc29sdmUpO1xuICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSByZWxlYXNlU2xvdCgpOiB2b2lkIHtcbiAgICBjb25zdCBuZXh0ID0gdGhpcy5yZXF1ZXN0UXVldWUuc2hpZnQoKTtcbiAgICBpZiAobmV4dCkge1xuICAgICAgbmV4dCgpO1xuICAgIH1cbiAgfVxuXG4gIGNhbmNlbEFsbCgpOiB2b2lkIHtcbiAgICBmb3IgKGNvbnN0IGNvbnRyb2xsZXIgb2YgdGhpcy5hY3RpdmVSZXF1ZXN0cy52YWx1ZXMoKSkge1xuICAgICAgY29udHJvbGxlci5hYm9ydCgpO1xuICAgIH1cbiAgICB0aGlzLmFjdGl2ZVJlcXVlc3RzLmNsZWFyKCk7XG4gICAgdGhpcy5yZXF1ZXN0UXVldWUgPSBbXTtcbiAgfVxuXG4gIGdldEFjdGl2ZVJlcXVlc3RDb3VudCgpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLmFjdGl2ZVJlcXVlc3RzLnNpemU7XG4gIH1cbn1cblxubGV0IG9wZW5haVNlcnZpY2U6IE9wZW5BSVNlcnZpY2UgfCBudWxsID0gbnVsbDtcblxuZXhwb3J0IGZ1bmN0aW9uIGdldE9wZW5BSVNlcnZpY2UoY29uZmlnPzogT3BlbkFJQ29uZmlnKTogT3BlbkFJU2VydmljZSB7XG4gIGlmICghb3BlbmFpU2VydmljZSAmJiBjb25maWcpIHtcbiAgICBvcGVuYWlTZXJ2aWNlID0gbmV3IE9wZW5BSVNlcnZpY2UoY29uZmlnKTtcbiAgfVxuICByZXR1cm4gb3BlbmFpU2VydmljZSE7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiB1cGRhdGVPcGVuQUlDb25maWcoY29uZmlnOiBQYXJ0aWFsPE9wZW5BSUNvbmZpZz4pOiB2b2lkIHtcbiAgaWYgKG9wZW5haVNlcnZpY2UpIHtcbiAgICBvcGVuYWlTZXJ2aWNlLnVwZGF0ZUNvbmZpZyhjb25maWcpO1xuICB9XG59XG4iLCJpbXBvcnQgd2ViZXh0IGZyb20gJ3dlYmV4dGVuc2lvbi1wb2x5ZmlsbCc7XG5cbmNvbnN0IGJyb3dzZXIgPSB3ZWJleHQgYXMgYW55O1xuXG5kZWNsYXJlIGdsb2JhbCB7XG4gIGludGVyZmFjZSBXaW5kb3cge1xuICAgIF9fREVCVUdfXz86IHtcbiAgICAgIHRpbWVzdGFtcDogbnVtYmVyO1xuICAgICAgdmVyc2lvbjogc3RyaW5nO1xuICAgICAgbW9kdWxlczoge1xuICAgICAgICB0cmFuc2xhdGlvbk1hbmFnZXI6IGFueTtcbiAgICAgICAgbGFuZ3VhZ2VEZXRlY3RvcjogYW55O1xuICAgICAgICBvcGVuYWlTZXJ2aWNlOiBhbnk7XG4gICAgICAgIHRyYW5zbGF0aW9uQ2FjaGU6IGFueTtcbiAgICAgICAgW2tleTogc3RyaW5nXTogYW55O1xuICAgICAgfTtcbiAgICAgIHJlZ2lzdGVyTW9kdWxlKG5hbWU6IHN0cmluZywgbW9kdWxlOiBhbnkpOiB2b2lkO1xuICAgICAgaGVhbHRoQ2hlY2soKTogUHJvbWlzZTx2b2lkPjtcbiAgICAgIHRlc3RUcmFuc2xhdGlvbih0ZXh0Pzogc3RyaW5nKTogUHJvbWlzZTx2b2lkPjtcbiAgICAgIHRlc3RCYXRjaFRyYW5zbGF0aW9uKCk6IFByb21pc2U8dm9pZD47XG4gICAgICB0ZXN0Q2FjaGUoKTogUHJvbWlzZTx2b2lkPjtcbiAgICAgIHRlc3RMYW5ndWFnZURldGVjdGlvbigpOiBQcm9taXNlPHZvaWQ+O1xuICAgICAgc2hvd1BhZ2VJbmZvKCk6IHZvaWQ7XG4gICAgICBjbGVhckFsbENhY2hlKCk6IFByb21pc2U8dm9pZD47XG4gICAgICByZWxvYWRQbHVnaW4oKTogUHJvbWlzZTx2b2lkPjtcbiAgICAgIHNob3dIZWxwKCk6IHZvaWQ7XG4gICAgfTtcbiAgfVxufVxuXG5leHBvcnQgY29uc3QgZW5hYmxlRGV2VG9vbHMgPSAoKSA9PiB7XG4gIGlmICghKGltcG9ydC5tZXRhIGFzIGFueSkuZW52Py5ERVYpIHtcbiAgICByZXR1cm47XG4gIH1cblxuICBjb25zdCBkZWJ1Z09iaiA9IHtcbiAgICB0aW1lc3RhbXA6IERhdGUubm93KCksXG4gICAgdmVyc2lvbjogJzEuMC4wLWRldicsXG4gICAgbW9kdWxlczoge1xuICAgICAgdHJhbnNsYXRpb25NYW5hZ2VyOiBudWxsLFxuICAgICAgbGFuZ3VhZ2VEZXRlY3RvcjogbnVsbCxcbiAgICAgIG9wZW5haVNlcnZpY2U6IG51bGwsXG4gICAgICB0cmFuc2xhdGlvbkNhY2hlOiBudWxsLFxuICAgIH0sXG4gICAgcmVnaXN0ZXJNb2R1bGUobmFtZTogc3RyaW5nLCBtb2R1bGU6IGFueSkge1xuICAgICAgdGhpcy5tb2R1bGVzW25hbWVdID0gbW9kdWxlO1xuICAgICAgY29uc29sZS5sb2coYFtERUJVR10gTW9kdWxlIHJlZ2lzdGVyZWQ6ICR7bmFtZX1gKTtcbiAgICB9LFxuICAgIGFzeW5jIGhlYWx0aENoZWNrKCkge1xuICAgICAgY29uc29sZS5sb2coJz09PSBBdXRvIFRyYW5zbGF0b3IgSGVhbHRoIENoZWNrID09PScpO1xuICAgICAgY29uc29sZS5sb2coJ1RpbWVzdGFtcDonLCBuZXcgRGF0ZSgpLnRvSVNPU3RyaW5nKCkpO1xuICAgICAgY29uc29sZS5sb2coJ1xcbi0tLSBNb2R1bGVzIC0tLScpO1xuICAgICAgZm9yIChjb25zdCBbbmFtZSwgbW9kdWxlXSBvZiBPYmplY3QuZW50cmllcyh0aGlzLm1vZHVsZXMpKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKGAke25hbWV9OmAsIG1vZHVsZSA/ICfinJMnIDogJ+KclycpO1xuICAgICAgfVxuICAgICAgdHJ5IHtcbiAgICAgICAgY29uc3Qgc2V0dGluZ3MgPSBhd2FpdCBicm93c2VyLnN0b3JhZ2UubG9jYWwuZ2V0KCdzZXR0aW5ncycpO1xuICAgICAgICBjb25zb2xlLmxvZygnXFxuLS0tIFNldHRpbmdzIC0tLScpO1xuICAgICAgICBjb25zb2xlLmxvZygnU2V0dGluZ3MgbG9hZGVkOicsICEhc2V0dGluZ3Muc2V0dGluZ3MpO1xuICAgICAgICBpZiAoc2V0dGluZ3Muc2V0dGluZ3MpIHtcbiAgICAgICAgICBjb25zb2xlLmxvZygnUGx1Z2luIGVuYWJsZWQ6Jywgc2V0dGluZ3Muc2V0dGluZ3MuZW5hYmxlZCk7XG4gICAgICAgICAgY29uc29sZS5sb2coJ1RhcmdldCBsYW5ndWFnZTonLCBzZXR0aW5ncy5zZXR0aW5ncy50YXJnZXRMYW5ndWFnZSk7XG4gICAgICAgICAgY29uc29sZS5sb2coJ0FQSSBLZXkgY29uZmlndXJlZDonLCAhIXNldHRpbmdzLnNldHRpbmdzLm9wZW5haT8uYXBpS2V5KTtcbiAgICAgICAgICBjb25zb2xlLmxvZygnTW9kZWxzOicsIHNldHRpbmdzLnNldHRpbmdzLm9wZW5haT8ubW9kZWxzKTtcbiAgICAgICAgICBjb25zb2xlLmxvZygnTWF4IGNvbmN1cnJlbmN5OicsIHNldHRpbmdzLnNldHRpbmdzLm9wZW5haT8ubWF4Q29uY3VycmVuY3kpO1xuICAgICAgICB9XG4gICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICBjb25zb2xlLmVycm9yKCdFcnJvciByZWFkaW5nIHNldHRpbmdzOicsIGVycm9yKTtcbiAgICAgIH1cbiAgICAgIHRyeSB7XG4gICAgICAgIGlmICh0aGlzLm1vZHVsZXMudHJhbnNsYXRpb25DYWNoZSkge1xuICAgICAgICAgIGNvbnN0IHN0YXRzID0gYXdhaXQgdGhpcy5tb2R1bGVzLnRyYW5zbGF0aW9uQ2FjaGUuZ2V0U3RhdHMoKTtcbiAgICAgICAgICBjb25zb2xlLmxvZygnXFxuLS0tIENhY2hlIC0tLScpO1xuICAgICAgICAgIGNvbnNvbGUubG9nKCdDYWNoZSBlbnRyaWVzOicsIHN0YXRzLnNpemUpO1xuICAgICAgICAgIGNvbnNvbGUubG9nKCdPbGRlc3QgZW50cnk6JywgbmV3IERhdGUoc3RhdHMub2xkZXN0VGltZXN0YW1wKSk7XG4gICAgICAgICAgY29uc29sZS5sb2coJ05ld2VzdCBlbnRyeTonLCBuZXcgRGF0ZShzdGF0cy5uZXdlc3RUaW1lc3RhbXApKTtcbiAgICAgICAgfVxuICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgY29uc29sZS5lcnJvcignRXJyb3IgY2hlY2tpbmcgY2FjaGU6JywgZXJyb3IpO1xuICAgICAgfVxuICAgICAgdHJ5IHtcbiAgICAgICAgaWYgKHRoaXMubW9kdWxlcy5vcGVuYWlTZXJ2aWNlKSB7XG4gICAgICAgICAgY29uc3QgYWN0aXZlQ291bnQgPSB0aGlzLm1vZHVsZXMub3BlbmFpU2VydmljZS5nZXRBY3RpdmVSZXF1ZXN0Q291bnQoKTtcbiAgICAgICAgICBjb25zb2xlLmxvZygnXFxuLS0tIFJlcXVlc3RzIC0tLScpO1xuICAgICAgICAgIGNvbnNvbGUubG9nKCdBY3RpdmUgcmVxdWVzdHM6JywgYWN0aXZlQ291bnQpO1xuICAgICAgICB9XG4gICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICBjb25zb2xlLmVycm9yKCdFcnJvciBjaGVja2luZyByZXF1ZXN0czonLCBlcnJvcik7XG4gICAgICB9XG4gICAgICB0cnkge1xuICAgICAgICBpZiAodGhpcy5tb2R1bGVzLmxhbmd1YWdlRGV0ZWN0b3IpIHtcbiAgICAgICAgICBjb25zdCBwYWdlTGFuZyA9IHRoaXMubW9kdWxlcy5sYW5ndWFnZURldGVjdG9yLmRldGVjdFBhZ2VMYW5ndWFnZSgpO1xuICAgICAgICAgIGNvbnNvbGUubG9nKCdcXG4tLS0gUGFnZSAtLS0nKTtcbiAgICAgICAgICBjb25zb2xlLmxvZygnRGV0ZWN0ZWQgbGFuZ3VhZ2U6JywgcGFnZUxhbmcpO1xuICAgICAgICAgIGNvbnNvbGUubG9nKCdVUkw6Jywgd2luZG93LmxvY2F0aW9uLmhyZWYpO1xuICAgICAgICB9XG4gICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICBjb25zb2xlLmVycm9yKCdFcnJvciBkZXRlY3RpbmcgbGFuZ3VhZ2U6JywgZXJyb3IpO1xuICAgICAgfVxuICAgICAgY29uc29sZS5sb2coJ1xcbj09PT09PT09PT09PT09PT09PT09PT09PT1cXG4nKTtcbiAgICB9LFxuICAgIGFzeW5jIHRlc3RUcmFuc2xhdGlvbih0ZXh0ID0gJ0hlbGxvLCB3b3JsZCEnKSB7XG4gICAgICBjb25zb2xlLmxvZygnPT09IFRyYW5zbGF0aW9uIFRlc3QgPT09Jyk7XG4gICAgICBjb25zb2xlLmxvZygnSW5wdXQ6JywgdGV4dCk7XG4gICAgICBpZiAoIXRoaXMubW9kdWxlcy5vcGVuYWlTZXJ2aWNlKSB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoJ09wZW5BSSBzZXJ2aWNlIG5vdCBhdmFpbGFibGUnKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgdHJ5IHtcbiAgICAgICAgY29uc3Qgc2V0dGluZ3MgPSBhd2FpdCBicm93c2VyLnN0b3JhZ2UubG9jYWwuZ2V0KCdzZXR0aW5ncycpO1xuICAgICAgICBjb25zdCB0YXJnZXRMYW5nID0gc2V0dGluZ3Muc2V0dGluZ3M/LnRhcmdldExhbmd1YWdlIHx8ICd6aC1DTic7XG4gICAgICAgIGNvbnN0IG1vZGVsID0gc2V0dGluZ3Muc2V0dGluZ3M/Lm9wZW5haT8ubW9kZWxzPy5bMF0gfHwgJ2dwdC0zLjUtdHVyYm8nO1xuICAgICAgICBjb25zb2xlLmxvZygnTW9kZWw6JywgbW9kZWwpO1xuICAgICAgICBjb25zb2xlLmxvZygnVGFyZ2V0IGxhbmd1YWdlOicsIHRhcmdldExhbmcpO1xuICAgICAgICBjb25zdCByZXN1bHQgPSBhd2FpdCB0aGlzLm1vZHVsZXMub3BlbmFpU2VydmljZS50cmFuc2xhdGUoe1xuICAgICAgICAgIHRleHQsXG4gICAgICAgICAgc291cmNlTGFuZzogJ2VuJyxcbiAgICAgICAgICB0YXJnZXRMYW5nLFxuICAgICAgICAgIG1vZGVsXG4gICAgICAgIH0pO1xuICAgICAgICBjb25zb2xlLmxvZygnVHJhbnNsYXRpb24gcmVzdWx0OicsIHJlc3VsdC50cmFuc2xhdGVkVGV4dCk7XG4gICAgICAgIGNvbnNvbGUubG9nKCdDYWNoZWQ6JywgcmVzdWx0LmNhY2hlZCk7XG4gICAgICAgIGNvbnNvbGUubG9nKCc9PT0gVGVzdCBDb21wbGV0ZSA9PT1cXG4nKTtcbiAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoJ1RyYW5zbGF0aW9uIHRlc3QgZmFpbGVkOicsIGVycm9yKTtcbiAgICAgIH1cbiAgICB9LFxuICAgIGFzeW5jIHRlc3RCYXRjaFRyYW5zbGF0aW9uKCkge1xuICAgICAgY29uc29sZS5sb2coJz09PSBCYXRjaCBUcmFuc2xhdGlvbiBUZXN0ID09PScpO1xuICAgICAgaWYgKCF0aGlzLm1vZHVsZXMub3BlbmFpU2VydmljZSkge1xuICAgICAgICBjb25zb2xlLmVycm9yKCdPcGVuQUkgc2VydmljZSBub3QgYXZhaWxhYmxlJyk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIGNvbnN0IHJlcXVlc3RzID0gW1xuICAgICAgICB7IHRleHQ6ICdIZWxsbycsIHNvdXJjZUxhbmc6ICdlbicsIHRhcmdldExhbmc6ICd6aC1DTicgfSxcbiAgICAgICAgeyB0ZXh0OiAnV29ybGQnLCBzb3VyY2VMYW5nOiAnZW4nLCB0YXJnZXRMYW5nOiAnemgtQ04nIH0sXG4gICAgICAgIHsgdGV4dDogJ1Rlc3QnLCBzb3VyY2VMYW5nOiAnZW4nLCB0YXJnZXRMYW5nOiAnemgtQ04nIH0sXG4gICAgICBdO1xuICAgICAgY29uc29sZS5sb2coJ1JlcXVlc3RzOicsIHJlcXVlc3RzLmxlbmd0aCk7XG4gICAgICB0cnkge1xuICAgICAgICBjb25zdCByZXN1bHRzID0gYXdhaXQgdGhpcy5tb2R1bGVzLm9wZW5haVNlcnZpY2UudHJhbnNsYXRlQmF0Y2gocmVxdWVzdHMpO1xuICAgICAgICBjb25zb2xlLnRhYmxlKHJlc3VsdHMpO1xuICAgICAgICBjb25zb2xlLmxvZygnPT09IFRlc3QgQ29tcGxldGUgPT09XFxuJyk7XG4gICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICBjb25zb2xlLmVycm9yKCdCYXRjaCB0cmFuc2xhdGlvbiB0ZXN0IGZhaWxlZDonLCBlcnJvcik7XG4gICAgICB9XG4gICAgfSxcbiAgICBhc3luYyB0ZXN0Q2FjaGUoKSB7XG4gICAgICBjb25zb2xlLmxvZygnPT09IENhY2hlIFRlc3QgPT09Jyk7XG4gICAgICBpZiAoIXRoaXMubW9kdWxlcy50cmFuc2xhdGlvbkNhY2hlKSB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoJ1RyYW5zbGF0aW9uIGNhY2hlIG5vdCBhdmFpbGFibGUnKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgY29uc3QgdGVzdEtleSA9ICd0ZXN0LWNhY2hlLWtleSc7XG4gICAgICBjb25zdCB0ZXN0VGV4dCA9ICd0ZXN0IHRleHQnO1xuICAgICAgY29uc3QgdHJhbnNsYXRlZFRleHQgPSAn5rWL6K+V5paH5pysJztcbiAgICAgIHRyeSB7XG4gICAgICAgIGF3YWl0IHRoaXMubW9kdWxlcy50cmFuc2xhdGlvbkNhY2hlLnNldChcbiAgICAgICAgICB0ZXN0VGV4dCxcbiAgICAgICAgICAnZW4nLFxuICAgICAgICAgICd6aC1DTicsXG4gICAgICAgICAgJ2dwdC0zLjUtdHVyYm8nLFxuICAgICAgICAgIHRyYW5zbGF0ZWRUZXh0XG4gICAgICAgICk7XG4gICAgICAgIGNvbnNvbGUubG9nKCfinJMgQ2FjaGUgc2V0Jyk7XG4gICAgICAgIGNvbnN0IGNhY2hlZCA9IGF3YWl0IHRoaXMubW9kdWxlcy50cmFuc2xhdGlvbkNhY2hlLmdldChcbiAgICAgICAgICB0ZXN0VGV4dCxcbiAgICAgICAgICAnZW4nLFxuICAgICAgICAgICd6aC1DTicsXG4gICAgICAgICAgJ2dwdC0zLjUtdHVyYm8nXG4gICAgICAgICk7XG4gICAgICAgIGlmIChjYWNoZWQpIHtcbiAgICAgICAgICBjb25zb2xlLmxvZygn4pyTIENhY2hlIGhpdCcpO1xuICAgICAgICAgIGNvbnNvbGUubG9nKCdPcmlnaW5hbDonLCBjYWNoZWQub3JpZ2luYWxUZXh0KTtcbiAgICAgICAgICBjb25zb2xlLmxvZygnVHJhbnNsYXRlZDonLCBjYWNoZWQudHJhbnNsYXRlZFRleHQpO1xuICAgICAgICAgIGNvbnNvbGUubG9nKCdUaW1lc3RhbXA6JywgbmV3IERhdGUoY2FjaGVkLnRpbWVzdGFtcCkpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGNvbnNvbGUubG9nKCfinJcgQ2FjaGUgbWlzcycpO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGhhc2ggPSB0aGlzLm1vZHVsZXMudHJhbnNsYXRpb25DYWNoZS5nZW5lcmF0ZUhhc2goXG4gICAgICAgICAgdGVzdFRleHQsXG4gICAgICAgICAgJ2VuJyxcbiAgICAgICAgICAnemgtQ04nLFxuICAgICAgICAgICdncHQtMy41LXR1cmJvJ1xuICAgICAgICApO1xuICAgICAgICBhd2FpdCB0aGlzLm1vZHVsZXMudHJhbnNsYXRpb25DYWNoZS5kZWxldGUoaGFzaCk7XG4gICAgICAgIGNvbnNvbGUubG9nKCfinJMgVGVzdCBjYWNoZSBjbGVhcmVkJyk7XG4gICAgICAgIGNvbnNvbGUubG9nKCc9PT0gVGVzdCBDb21wbGV0ZSA9PT1cXG4nKTtcbiAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoJ0NhY2hlIHRlc3QgZmFpbGVkOicsIGVycm9yKTtcbiAgICAgIH1cbiAgICB9LFxuICAgIGFzeW5jIHRlc3RMYW5ndWFnZURldGVjdGlvbigpIHtcbiAgICAgIGNvbnNvbGUubG9nKCc9PT0gTGFuZ3VhZ2UgRGV0ZWN0aW9uIFRlc3QgPT09Jyk7XG4gICAgICBpZiAoIXRoaXMubW9kdWxlcy5sYW5ndWFnZURldGVjdG9yKSB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoJ0xhbmd1YWdlIGRldGVjdG9yIG5vdCBhdmFpbGFibGUnKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgY29uc3QgdGVzdHMgPSBbXG4gICAgICAgIHsgdGV4dDogJ0hlbGxvIHdvcmxkJywgZXhwZWN0ZWQ6ICdlbicgfSxcbiAgICAgICAgeyB0ZXh0OiAn5L2g5aW95LiW55WMJywgZXhwZWN0ZWQ6ICd6aC1DTicgfSxcbiAgICAgICAgeyB0ZXh0OiAn44GT44KT44Gr44Gh44Gv5LiW55WMJywgZXhwZWN0ZWQ6ICdqYScgfSxcbiAgICAgICAgeyB0ZXh0OiAn7JWI64WV7ZWY7IS47JqUIOyEuOqzhCcsIGV4cGVjdGVkOiAna28nIH0sXG4gICAgICAgIHsgdGV4dDogJ9Cf0YDQuNCy0LXRgiDQvNC40YAnLCBleHBlY3RlZDogJ3J1JyB9LFxuICAgICAgXTtcbiAgICAgIGNvbnN0IHJlc3VsdHM6IGFueVtdID0gW107XG4gICAgICBmb3IgKGNvbnN0IHRlc3Qgb2YgdGVzdHMpIHtcbiAgICAgICAgY29uc3QgZGV0ZWN0ZWQgPSB0aGlzLm1vZHVsZXMubGFuZ3VhZ2VEZXRlY3Rvci5kZXRlY3QodGVzdC50ZXh0KTtcbiAgICAgICAgcmVzdWx0cy5wdXNoKHtcbiAgICAgICAgICB0ZXh0OiB0ZXN0LnRleHQsXG4gICAgICAgICAgZXhwZWN0ZWQ6IHRlc3QuZXhwZWN0ZWQsXG4gICAgICAgICAgZGV0ZWN0ZWQ6IGRldGVjdGVkLmRldGVjdGVkLFxuICAgICAgICAgIGNvbmZpZGVuY2U6IGRldGVjdGVkLmNvbmZpZGVuY2UudG9GaXhlZCgyKSxcbiAgICAgICAgICBtYXRjaDogZGV0ZWN0ZWQuZGV0ZWN0ZWQgPT09IHRlc3QuZXhwZWN0ZWRcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgICBjb25zb2xlLnRhYmxlKHJlc3VsdHMpO1xuICAgICAgY29uc29sZS5sb2coJz09PSBUZXN0IENvbXBsZXRlID09PVxcbicpO1xuICAgIH0sXG4gICAgc2hvd1BhZ2VJbmZvKCkge1xuICAgICAgY29uc29sZS5sb2coJz09PSBQYWdlIEluZm9ybWF0aW9uID09PScpO1xuICAgICAgY29uc29sZS5sb2coJ1VSTDonLCB3aW5kb3cubG9jYXRpb24uaHJlZik7XG4gICAgICBjb25zb2xlLmxvZygnVGl0bGU6JywgZG9jdW1lbnQudGl0bGUpO1xuICAgICAgY29uc29sZS5sb2coJ0xhbmd1YWdlIChIVE1MKTonLCBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQubGFuZyk7XG4gICAgICBpZiAodGhpcy5tb2R1bGVzLmxhbmd1YWdlRGV0ZWN0b3IpIHtcbiAgICAgICAgY29uc3QgZGV0ZWN0ZWRMYW5nID0gdGhpcy5tb2R1bGVzLmxhbmd1YWdlRGV0ZWN0b3IuZGV0ZWN0UGFnZUxhbmd1YWdlKCk7XG4gICAgICAgIGNvbnNvbGUubG9nKCdEZXRlY3RlZCBsYW5ndWFnZTonLCBkZXRlY3RlZExhbmcpO1xuICAgICAgfVxuICAgICAgY29uc3QgYWxsRWxlbWVudHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcqJyk7XG4gICAgICBsZXQgdGV4dEVsZW1lbnRzID0gMDtcbiAgICAgIGxldCB0b3RhbFRleHRMZW5ndGggPSAwO1xuICAgICAgYWxsRWxlbWVudHMuZm9yRWFjaCgoZWw6IGFueSkgPT4ge1xuICAgICAgICBjb25zdCB0ZXh0ID0gZWwudGV4dENvbnRlbnQ/LnRyaW0oKTtcbiAgICAgICAgaWYgKHRleHQgJiYgdGV4dC5sZW5ndGggPiAyKSB7XG4gICAgICAgICAgdGV4dEVsZW1lbnRzKys7XG4gICAgICAgICAgdG90YWxUZXh0TGVuZ3RoICs9IHRleHQubGVuZ3RoO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICAgIGNvbnNvbGUubG9nKCdUb3RhbCBlbGVtZW50czonLCBhbGxFbGVtZW50cy5sZW5ndGgpO1xuICAgICAgY29uc29sZS5sb2coJ1RleHQgZWxlbWVudHM6JywgdGV4dEVsZW1lbnRzKTtcbiAgICAgIGNvbnNvbGUubG9nKCdUb3RhbCB0ZXh0IGxlbmd0aDonLCB0b3RhbFRleHRMZW5ndGgpO1xuICAgICAgY29uc29sZS5sb2coJz09PT09PT09PT09PT09PT09PT09PT09PVxcbicpO1xuICAgIH0sXG4gICAgYXN5bmMgY2xlYXJBbGxDYWNoZSgpIHtcbiAgICAgIGNvbnNvbGUubG9nKCc9PT0gQ2xlYXJpbmcgQWxsIENhY2hlID09PScpO1xuICAgICAgaWYgKCF0aGlzLm1vZHVsZXMudHJhbnNsYXRpb25DYWNoZSkge1xuICAgICAgICBjb25zb2xlLmVycm9yKCdUcmFuc2xhdGlvbiBjYWNoZSBub3QgYXZhaWxhYmxlJyk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIHRyeSB7XG4gICAgICAgIGF3YWl0IHRoaXMubW9kdWxlcy50cmFuc2xhdGlvbkNhY2hlLmNsZWFyKCk7XG4gICAgICAgIGNvbnNvbGUubG9nKCfinJMgQWxsIGNhY2hlIGNsZWFyZWRcXG4nKTtcbiAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoJ0ZhaWxlZCB0byBjbGVhciBjYWNoZTonLCBlcnJvcik7XG4gICAgICB9XG4gICAgfSxcbiAgICBhc3luYyByZWxvYWRQbHVnaW4oKSB7XG4gICAgICBjb25zb2xlLmxvZygnPT09IFJlbG9hZGluZyBQbHVnaW4gPT09Jyk7XG4gICAgICB0cnkge1xuICAgICAgICBhd2FpdCBicm93c2VyLnJ1bnRpbWUucmVsb2FkKCk7XG4gICAgICAgIGNvbnNvbGUubG9nKCfinJMgUGx1Z2luIHJlbG9hZGVkXFxuJyk7XG4gICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICBjb25zb2xlLmVycm9yKCdGYWlsZWQgdG8gcmVsb2FkIHBsdWdpbjonLCBlcnJvcik7XG4gICAgICB9XG4gICAgfSxcbiAgICBzaG93SGVscCgpIHtcbiAgICAgIGNvbnNvbGUubG9nKCc9PT0gQXV0byBUcmFuc2xhdG9yIERlYnVnIENvbW1hbmRzID09PScpO1xuICAgICAgY29uc29sZS5sb2coJ3dpbmRvdy5fX0RFQlVHX18uaGVhbHRoQ2hlY2soKSAgICAgIC0gUnVuIGZ1bGwgaGVhbHRoIGNoZWNrJyk7XG4gICAgICBjb25zb2xlLmxvZygnd2luZG93Ll9fREVCVUdfXy50ZXN0VHJhbnNsYXRpb24oKSAgIC0gVGVzdCBzaW5nbGUgdHJhbnNsYXRpb24nKTtcbiAgICAgIGNvbnNvbGUubG9nKCd3aW5kb3cuX19ERUJVR19fLnRlc3RCYXRjaFRyYW5zbGF0aW9uKCkgLSBUZXN0IGJhdGNoIHRyYW5zbGF0aW9uJyk7XG4gICAgICBjb25zb2xlLmxvZygnd2luZG93Ll9fREVCVUdfXy50ZXN0Q2FjaGUoKSAgICAgICAgIC0gVGVzdCBjYWNoZSBvcGVyYXRpb25zJyk7XG4gICAgICBjb25zb2xlLmxvZygnd2luZG93Ll9fREVCVUdfXy50ZXN0TGFuZ3VhZ2VEZXRlY3Rpb24oKSAtIFRlc3QgbGFuZ3VhZ2UgZGV0ZWN0aW9uJyk7XG4gICAgICBjb25zb2xlLmxvZygnd2luZG93Ll9fREVCVUdfXy5zaG93UGFnZUluZm8oKSAgICAgIC0gU2hvdyBwYWdlIGluZm9ybWF0aW9uJyk7XG4gICAgICBjb25zb2xlLmxvZygnd2luZG93Ll9fREVCVUdfXy5jbGVhckFsbENhY2hlKCkgICAgIC0gQ2xlYXIgYWxsIGNhY2hlJyk7XG4gICAgICBjb25zb2xlLmxvZygnd2luZG93Ll9fREVCVUdfXy5yZWxvYWRQbHVnaW4oKSAgICAgICAtIFJlbG9hZCBwbHVnaW4nKTtcbiAgICAgIGNvbnNvbGUubG9nKCd3aW5kb3cuX19ERUJVR19fLnNob3dIZWxwKCkgICAgICAgICAgLSBTaG93IHRoaXMgaGVscCcpO1xuICAgICAgY29uc29sZS5sb2coJz09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxcbicpO1xuICAgIH1cbiAgfTtcblxuICB3aW5kb3cuX19ERUJVR19fID0gZGVidWdPYmo7XG5cbiAgY29uc29sZS5sb2coJyVjW0F1dG8gVHJhbnNsYXRvcl0gJWNEZWJ1ZyB0b29scyBsb2FkZWQnLCAnY29sb3I6ICMzYjgyZjY7IGZvbnQtd2VpZ2h0OiBib2xkOycsICdjb2xvcjogIzY2NjsnKTtcbiAgY29uc29sZS5sb2coJ1VzZSB3aW5kb3cuX19ERUJVR19fLnNob3dIZWxwKCkgdG8gc2VlIGF2YWlsYWJsZSBjb21tYW5kcycpO1xuICBjb25zb2xlLmxvZygnVXNlIHdpbmRvdy5fX0RFQlVHX18uaGVhbHRoQ2hlY2soKSB0byBydW4gYSBxdWljayBjaGVja1xcbicpO1xufTtcblxuaWYgKHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnKSB7XG4gIGVuYWJsZURldlRvb2xzKCk7XG59XG4iLCJpbXBvcnQgd2ViZXh0IGZyb20gJ3dlYmV4dGVuc2lvbi1wb2x5ZmlsbCc7XG5pbXBvcnQgeyBkZWZpbmVDb250ZW50U2NyaXB0IH0gZnJvbSAnd3h0L3NhbmRib3gnO1xuaW1wb3J0IHsgbGFuZ3VhZ2VEZXRlY3RvciB9IGZyb20gJy4uL3NyYy9zZXJ2aWNlcy9sYW5ndWFnZS1kZXRlY3Rvcic7XG5pbXBvcnQgeyBnZXRPcGVuQUlTZXJ2aWNlIH0gZnJvbSAnLi4vc3JjL3NlcnZpY2VzL29wZW5haSc7XG5pbXBvcnQgeyB0cmFuc2xhdGlvbkNhY2hlIH0gZnJvbSAnLi4vc3JjL3NlcnZpY2VzL2NhY2hlJztcbmltcG9ydCAnLi4vc3JjL3V0aWxzL2RlYnVnJztcblxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29udGVudFNjcmlwdCh7XG4gIG1hdGNoZXM6IFsnPGFsbF91cmxzPiddLFxuICBydW5BdDogJ2RvY3VtZW50X2lkbGUnLFxuICBtYWluKCkge1xuICAgIGNvbnN0IGJyb3dzZXIgPSB3ZWJleHQgYXMgYW55O1xuXG4gICAgY29uc29sZS5sb2coJ1tDb250ZW50IFNjcmlwdF0gTG9hZGluZy4uLicpO1xuXG4gICAgLy8g5YWo5bGA54q25oCBXG4gICAgbGV0IGlzSW5pdGlhbGl6ZWQgPSBmYWxzZTtcblxuICAgIC8vIOWIm+W7uuWFqOWxgOa2iOaBr+WkhOeQhuWZqFxuICAgIGJyb3dzZXIucnVudGltZS5vbk1lc3NhZ2UuYWRkTGlzdGVuZXIoKG1lc3NhZ2U6IGFueSwgc2VuZGVyOiBhbnksIHNlbmRSZXNwb25zZTogYW55KSA9PiB7XG4gICAgICBjb25zb2xlLmxvZygnW0NvbnRlbnQgU2NyaXB0XSBSZWNlaXZlZCBtZXNzYWdlOicsIG1lc3NhZ2UudHlwZSwgJ0luaXRpYWxpemVkOicsIGlzSW5pdGlhbGl6ZWQpO1xuXG4gICAgICBpZiAobWVzc2FnZS50eXBlID09PSAnZ2V0U2V0dGluZ3MnKSB7XG4gICAgICAgIGlmICh3aW5kb3cuX19UUkFOU0xBVElPTl9NQU5BR0VSX18pIHtcbiAgICAgICAgICBzZW5kUmVzcG9uc2Uod2luZG93Ll9fVFJBTlNMQVRJT05fTUFOQUdFUl9fLmdldFNldHRpbmdzKCkpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHNlbmRSZXNwb25zZSh7IGVycm9yOiAnTWFuYWdlciBub3QgcmVhZHkgeWV0JyB9KTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmIChtZXNzYWdlLnR5cGUgPT09ICd1cGRhdGVTZXR0aW5ncycpIHtcbiAgICAgICAgaWYgKHdpbmRvdy5fX1RSQU5TTEFUSU9OX01BTkFHRVJfXykge1xuICAgICAgICAgIHdpbmRvdy5fX1RSQU5TTEFUSU9OX01BTkFHRVJfXy51cGRhdGVTZXR0aW5ncyhtZXNzYWdlLnNldHRpbmdzKS50aGVuKCgpID0+IHtcbiAgICAgICAgICAgIHNlbmRSZXNwb25zZSh7IHN1Y2Nlc3M6IHRydWUgfSk7XG4gICAgICAgICAgfSkuY2F0Y2goKGVycm9yKSA9PiB7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKCdbQ29udGVudCBTY3JpcHRdIFVwZGF0ZSBzZXR0aW5ncyBmYWlsZWQ6JywgZXJyb3IpO1xuICAgICAgICAgICAgc2VuZFJlc3BvbnNlKHsgc3VjY2VzczogZmFsc2UsIGVycm9yOiBlcnJvci5tZXNzYWdlIH0pO1xuICAgICAgICAgIH0pO1xuICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHNlbmRSZXNwb25zZSh7IGVycm9yOiAnTWFuYWdlciBub3QgcmVhZHkgeWV0JyB9KTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmIChtZXNzYWdlLnR5cGUgPT09ICd0cmFuc2xhdGVQYWdlJykge1xuICAgICAgICBpZiAod2luZG93Ll9fVFJBTlNMQVRJT05fTUFOQUdFUl9fKSB7XG4gICAgICAgICAgY29uc29sZS5sb2coJ1tDb250ZW50IFNjcmlwdF0gU3RhcnRpbmcgdHJhbnNsYXRpb24uLi4nKTtcbiAgICAgICAgICB3aW5kb3cuX19UUkFOU0xBVElPTl9NQU5BR0VSX18udHJhbnNsYXRlUGFnZSgpLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ1tDb250ZW50IFNjcmlwdF0gVHJhbnNsYXRpb24gY29tcGxldGVkJyk7XG4gICAgICAgICAgICBzZW5kUmVzcG9uc2UoeyBzdWNjZXNzOiB0cnVlIH0pO1xuICAgICAgICAgIH0pLmNhdGNoKChlcnJvcikgPT4ge1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcignW0NvbnRlbnQgU2NyaXB0XSBUcmFuc2xhdGlvbiBmYWlsZWQ6JywgZXJyb3IpO1xuICAgICAgICAgICAgc2VuZFJlc3BvbnNlKHsgc3VjY2VzczogZmFsc2UsIGVycm9yOiBlcnJvci5tZXNzYWdlIH0pO1xuICAgICAgICAgIH0pO1xuICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGNvbnNvbGUud2FybignW0NvbnRlbnQgU2NyaXB0XSBNYW5hZ2VyIG5vdCByZWFkeSwgcXVldWVpbmcgdHJhbnNsYXRpb24uLi4nKTtcbiAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgIGlmICh3aW5kb3cuX19UUkFOU0xBVElPTl9NQU5BR0VSX18pIHtcbiAgICAgICAgICAgICAgd2luZG93Ll9fVFJBTlNMQVRJT05fTUFOQUdFUl9fLnRyYW5zbGF0ZVBhZ2UoKS50aGVuKCgpID0+IHtcbiAgICAgICAgICAgICAgICBzZW5kUmVzcG9uc2UoeyBzdWNjZXNzOiB0cnVlIH0pO1xuICAgICAgICAgICAgICB9KS5jYXRjaCgoZXJyb3IpID0+IHtcbiAgICAgICAgICAgICAgICBzZW5kUmVzcG9uc2UoeyBzdWNjZXNzOiBmYWxzZSwgZXJyb3I6IGVycm9yLm1lc3NhZ2UgfSk7XG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgc2VuZFJlc3BvbnNlKHsgc3VjY2VzczogZmFsc2UsIGVycm9yOiAnTWFuYWdlciBzdGlsbCBub3QgcmVhZHknIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0sIDUwMCk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSBpZiAobWVzc2FnZS50eXBlID09PSAnZ2V0U3RhdHVzJykge1xuICAgICAgICBpZiAod2luZG93Ll9fVFJBTlNMQVRJT05fTUFOQUdFUl9fKSB7XG4gICAgICAgICAgc2VuZFJlc3BvbnNlKHsgc3RhdHVzOiB3aW5kb3cuX19UUkFOU0xBVElPTl9NQU5BR0VSX18uZ2V0U3RhdHVzKCkgfSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgc2VuZFJlc3BvbnNlKHsgc3RhdHVzOiAnaWRsZScgfSk7XG4gICAgICAgIH1cbiAgfSBlbHNlIGlmIChtZXNzYWdlLnR5cGUgPT09ICdyZXZlcnRBbGwnKSB7XG4gICAgICBpZiAod2luZG93Ll9fVFJBTlNMQVRJT05fTUFOQUdFUl9fKSB7XG4gICAgICAgIHdpbmRvdy5fX1RSQU5TTEFUSU9OX01BTkFHRVJfXy5yZXZlcnRBbGwoKS50aGVuKCgpID0+IHtcbiAgICAgICAgICBzZW5kUmVzcG9uc2UoeyBzdWNjZXNzOiB0cnVlIH0pO1xuICAgICAgICB9KS5jYXRjaCgoZXJyb3IpID0+IHtcbiAgICAgICAgICBjb25zb2xlLmVycm9yKCdbQ29udGVudCBTY3JpcHRdIFJldmVydCBhbGwgZmFpbGVkOicsIGVycm9yKTtcbiAgICAgICAgICBzZW5kUmVzcG9uc2UoeyBzdWNjZXNzOiBmYWxzZSwgZXJyb3I6IGVycm9yLm1lc3NhZ2UgfSk7XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHNlbmRSZXNwb25zZSh7IGVycm9yOiAnTWFuYWdlciBub3QgcmVhZHkgeWV0JyB9KTtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKG1lc3NhZ2UudHlwZSA9PT0gJ2NsZWFyQ2FjaGUnKSB7XG4gICAgICB0cmFuc2xhdGlvbkNhY2hlLmNsZWFyKCkudGhlbigoKSA9PiB7XG4gICAgICAgIGlmICh3aW5kb3cuX19UUkFOU0xBVElPTl9NQU5BR0VSX18pIHtcbiAgICAgICAgICB3aW5kb3cuX19UUkFOU0xBVElPTl9NQU5BR0VSX19bJ3RyYW5zbGF0ZWRFbGVtZW50cyddPy5jbGVhcj8uKCk7XG4gICAgICAgIH1cbiAgICAgICAgc2VuZFJlc3BvbnNlKHsgc3VjY2VzczogdHJ1ZSB9KTtcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiBsb2NhdGlvbi5yZWxvYWQoKSwgMTAwKTtcbiAgICAgIH0pLmNhdGNoKChlcnJvcikgPT4ge1xuICAgICAgICBjb25zb2xlLmVycm9yKCdbQ29udGVudCBTY3JpcHRdIENsZWFyIGNhY2hlIGZhaWxlZDonLCBlcnJvcik7XG4gICAgICAgIHNlbmRSZXNwb25zZSh7IHN1Y2Nlc3M6IGZhbHNlLCBlcnJvcjogZXJyb3IubWVzc2FnZSB9KTtcbiAgICAgIH0pO1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9KTtcblxuICAgIC8vIOWIm+W7uuW5tuWIneWni+WMlue/u+ivkeeuoeeQhuWZqFxuICAgIGNsYXNzIFRyYW5zbGF0aW9uTWFuYWdlckltcGwge1xuICAgICAgcHJpdmF0ZSBzZXR0aW5ncyA9IHtcbiAgICAgICAgZW5hYmxlZDogdHJ1ZSxcbiAgICAgICAgYXV0b0RldGVjdDogdHJ1ZSxcbiAgICAgICAgdGFyZ2V0TGFuZ3VhZ2U6ICd6aC1DTicsXG4gICAgICAgIG9wZW5haToge1xuICAgICAgICAgIGFwaUtleTogJycsXG4gICAgICAgICAgYmFzZVVybDogJ2h0dHBzOi8vYXBpLm9wZW5haS5jb20vdjEnLFxuICAgICAgICAgIG1vZGVsczogWydncHQtMy41LXR1cmJvJ10sXG4gICAgICAgICAgbWF4Q29uY3VycmVuY3k6IDUsXG4gICAgICAgICAgdGltZW91dDogMzAwMDBcbiAgICAgICAgfSxcbiAgICAgICAgY2FjaGVFbmFibGVkOiB0cnVlLFxuICAgICAgICBjYWNoZU1heEFnZTogNyAqIDI0ICogNjAgKiA2MCAqIDEwMDAsXG4gICAgICAgIGJsYWNrbGlzdDogW10sXG4gICAgICAgIHdoaXRlbGlzdDogW10sXG4gICAgICAgIHNob3dUcmFuc2xhdGlvbkJhZGdlOiB0cnVlXG4gICAgICB9O1xuXG4gICAgICBwcml2YXRlIHN0YXR1czogJ2lkbGUnIHwgJ2RldGVjdGluZycgfCAndHJhbnNsYXRpbmcnIHwgJ2NvbXBsZXRlZCcgfCAnZXJyb3InID0gJ2lkbGUnO1xuXG4gICAgICBwcml2YXRlIHRyYW5zbGF0ZWRFbGVtZW50cyA9IG5ldyBTZXQ8SFRNTEVsZW1lbnQ+KCk7XG4gICAgICBwcml2YXRlIG9ic2VydmVyOiBNdXRhdGlvbk9ic2VydmVyIHwgbnVsbCA9IG51bGw7XG4gICAgICBwcml2YXRlIHBlbmRpbmdUcmFuc2xhdGlvbnMgPSBuZXcgU2V0PHN0cmluZz4oKTtcblxuICAgICAgYXN5bmMgaW5pdCgpIHtcbiAgICAgICAgY29uc29sZS5sb2coJ1tUcmFuc2xhdGlvbk1hbmFnZXJdIEluaXRpYWxpemluZy4uLicpO1xuXG4gICAgICAgIGF3YWl0IHRoaXMubG9hZFNldHRpbmdzKCk7XG5cbiAgICAgICAgaWYgKHRoaXMuc2V0dGluZ3MuY2FjaGVFbmFibGVkKSB7XG4gICAgICAgICAgYXdhaXQgdHJhbnNsYXRpb25DYWNoZS5pbml0KHRoaXMuc2V0dGluZ3MuY2FjaGVNYXhBZ2UpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuc2V0dGluZ3Mub3BlbmFpLmFwaUtleSkge1xuICAgICAgICAgIGNvbnN0IHNlcnZpY2UgPSBnZXRPcGVuQUlTZXJ2aWNlKHRoaXMuc2V0dGluZ3Mub3BlbmFpKTtcbiAgICAgICAgICBjb25zb2xlLmxvZygnW1RyYW5zbGF0aW9uTWFuYWdlcl0gT3BlbkFJIHNlcnZpY2UgaW5pdGlhbGl6ZWQgd2l0aCBtb2RlbHM6JywgdGhpcy5zZXR0aW5ncy5vcGVuYWkubW9kZWxzKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuc2V0dXBPYnNlcnZlcigpO1xuICAgICAgICBpc0luaXRpYWxpemVkID0gdHJ1ZTtcbiAgICAgICAgY29uc29sZS5sb2coJ1tUcmFuc2xhdGlvbk1hbmFnZXJdIEluaXRpYWxpemF0aW9uIGNvbXBsZXRlZCcpO1xuICAgICAgfVxuXG4gICAgICBwcml2YXRlIGFzeW5jIGxvYWRTZXR0aW5ncygpIHtcbiAgICAgICAgY29uc3QgZGF0YSA9IGF3YWl0IGJyb3dzZXIuc3RvcmFnZS5sb2NhbC5nZXQoJ3NldHRpbmdzJyk7XG4gICAgICAgIGNvbnNvbGUubG9nKCdbVHJhbnNsYXRpb25NYW5hZ2VyXSBMb2FkZWQgc2V0dGluZ3M6JywgZGF0YS5zZXR0aW5ncyk7XG4gICAgICAgIHRoaXMuc2V0dGluZ3MgPSB7IC4uLnRoaXMuc2V0dGluZ3MsIC4uLmRhdGEuc2V0dGluZ3MgfTtcbiAgICAgIH1cblxuICAgICAgcHJpdmF0ZSBhc3luYyBzYXZlU2V0dGluZ3MoKSB7XG4gICAgICAgIGF3YWl0IGJyb3dzZXIuc3RvcmFnZS5sb2NhbC5zZXQoeyBzZXR0aW5nczogdGhpcy5zZXR0aW5ncyB9KTtcbiAgICAgIH1cblxuICAgICAgcHJpdmF0ZSBhc3luYyB1cGRhdGVTZXR0aW5ncyh1cGRhdGVzOiBhbnkpIHtcbiAgICAgICAgY29uc29sZS5sb2coJ1tUcmFuc2xhdGlvbk1hbmFnZXJdIFVwZGF0aW5nIHNldHRpbmdzOicsIHVwZGF0ZXMpO1xuICAgICAgICB0aGlzLnNldHRpbmdzID0geyAuLi50aGlzLnNldHRpbmdzLCAuLi51cGRhdGVzIH07XG4gICAgICAgIGF3YWl0IHRoaXMuc2F2ZVNldHRpbmdzKCk7XG5cbiAgICAgICAgaWYgKHVwZGF0ZXMub3BlbmFpKSB7XG4gICAgICAgICAgY29uc3Qgc2VydmljZSA9IGdldE9wZW5BSVNlcnZpY2UodXBkYXRlcy5vcGVuYWkpO1xuICAgICAgICAgIGNvbnNvbGUubG9nKCdbVHJhbnNsYXRpb25NYW5hZ2VyXSBPcGVuQUkgY29uZmlnIHVwZGF0ZWQnKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBnZXRTZXR0aW5ncygpIHtcbiAgICAgICAgcmV0dXJuIHsgLi4udGhpcy5zZXR0aW5ncyB9O1xuICAgICAgfVxuXG4gICAgICBhc3luYyB0cmFuc2xhdGVQYWdlKCkge1xuICAgICAgICBpZiAoIXRoaXMuc2V0dGluZ3MuZW5hYmxlZCkge1xuICAgICAgICAgIGNvbnNvbGUubG9nKCdbVHJhbnNsYXRpb25NYW5hZ2VyXSBUcmFuc2xhdGlvbiBkaXNhYmxlZCcpO1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICghdGhpcy5zZXR0aW5ncy5vcGVuYWkuYXBpS2V5KSB7XG4gICAgICAgICAgY29uc29sZS53YXJuKCdbVHJhbnNsYXRpb25NYW5hZ2VyXSBBUEkga2V5IG5vdCBjb25maWd1cmVkJyk7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5zdGF0dXMgPSAnZGV0ZWN0aW5nJztcblxuICAgICAgICBpZiAodGhpcy5zZXR0aW5ncy5hdXRvRGV0ZWN0KSB7XG4gICAgICAgICAgY29uc3QgcGFnZUxhbmcgPSBsYW5ndWFnZURldGVjdG9yLmRldGVjdFBhZ2VMYW5ndWFnZSgpO1xuICAgICAgICAgIGNvbnNvbGUubG9nKCdbVHJhbnNsYXRpb25NYW5hZ2VyXSBQYWdlIGxhbmd1YWdlOicsIHBhZ2VMYW5nKTtcblxuICAgICAgICAgIGlmICghbGFuZ3VhZ2VEZXRlY3Rvci5zaG91bGRUcmFuc2xhdGUodGhpcy5zZXR0aW5ncy50YXJnZXRMYW5ndWFnZSkpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdbVHJhbnNsYXRpb25NYW5hZ2VyXSBUcmFuc2xhdGlvbiBub3QgbmVlZGVkJyk7XG4gICAgICAgICAgICB0aGlzLnN0YXR1cyA9ICdpZGxlJztcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnN0YXR1cyA9ICd0cmFuc2xhdGluZyc7XG4gICAgICAgIGNvbnNvbGUubG9nKCdbVHJhbnNsYXRpb25NYW5hZ2VyXSBTdGFydGluZyB0cmFuc2xhdGlvbi4uLicpO1xuXG4gICAgICAgIGNvbnN0IGVsZW1lbnRzID0gdGhpcy5maW5kVHJhbnNsYXRhYmxlRWxlbWVudHMoKTtcbiAgICAgICAgY29uc29sZS5sb2coJ1tUcmFuc2xhdGlvbk1hbmFnZXJdIEZvdW5kJywgZWxlbWVudHMubGVuZ3RoLCAndHJhbnNsYXRhYmxlIGVsZW1lbnRzJyk7XG4gICAgICAgIGF3YWl0IHRoaXMudHJhbnNsYXRlRWxlbWVudHMoZWxlbWVudHMpO1xuXG4gICAgICAgIHRoaXMuc3RhdHVzID0gJ2NvbXBsZXRlZCc7XG4gICAgICAgIGNvbnNvbGUubG9nKCdbVHJhbnNsYXRpb25NYW5hZ2VyXSBUcmFuc2xhdGlvbiBjb21wbGV0ZWQnKTtcbiAgICAgIH1cblxuICAgICAgcHJpdmF0ZSBmaW5kVHJhbnNsYXRhYmxlRWxlbWVudHMoKSB7XG4gICAgICAgIGNvbnN0IGVsZW1lbnRzOiBIVE1MRWxlbWVudFtdID0gW107XG4gICAgICAgIGNvbnN0IHRyYW5zbGF0ZWRTZXQgPSBuZXcgU2V0PEhUTUxFbGVtZW50PigpO1xuXG4gICAgICAgIGNvbnN0IHdhbGtlciA9IGRvY3VtZW50LmNyZWF0ZVRyZWVXYWxrZXIoXG4gICAgICAgICAgZG9jdW1lbnQuYm9keSxcbiAgICAgICAgICBOb2RlRmlsdGVyLlNIT1dfVEVYVCxcbiAgICAgICAgICB7XG4gICAgICAgICAgICBhY2NlcHROb2RlOiAobm9kZSkgPT4ge1xuICAgICAgICAgICAgICBsZXQgcGFyZW50ID0gbm9kZS5wYXJlbnRFbGVtZW50O1xuXG4gICAgICAgICAgICAgIGlmICghcGFyZW50KSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIE5vZGVGaWx0ZXIuRklMVEVSX1JFSkVDVDtcbiAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgIGNvbnN0IHRleHQgPSBub2RlLnRleHRDb250ZW50Py50cmltKCk7XG4gICAgICAgICAgICAgIGlmICghdGV4dCB8fCB0ZXh0Lmxlbmd0aCA8IDIpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gTm9kZUZpbHRlci5GSUxURVJfUkVKRUNUO1xuICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgLy8g5qOA5p+l5piv5ZCm5Zyo5o6S6Zmk5Yy65Z+f5YaFXG4gICAgICAgICAgICAgIGlmICh0aGlzLmhhc0V4Y2x1ZGVkQW5jZXN0b3IocGFyZW50KSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBOb2RlRmlsdGVyLkZJTFRFUl9SRUpFQ1Q7XG4gICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAvLyDmn6Xmib7lkIjpgILnmoTnv7vor5HlrrnlmahcbiAgICAgICAgICAgICAgY29uc3QgY29udGFpbmVyID0gdGhpcy5maW5kVHJhbnNsYXRpb25Db250YWluZXIocGFyZW50KTtcbiAgICAgICAgICAgICAgaWYgKGNvbnRhaW5lciAmJiAhdHJhbnNsYXRlZFNldC5oYXMoY29udGFpbmVyKSkge1xuICAgICAgICAgICAgICAgIHRyYW5zbGF0ZWRTZXQuYWRkKGNvbnRhaW5lcik7XG4gICAgICAgICAgICAgICAgcmV0dXJuIE5vZGVGaWx0ZXIuRklMVEVSX0FDQ0VQVDtcbiAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgIHJldHVybiBOb2RlRmlsdGVyLkZJTFRFUl9SRUpFQ1Q7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICApO1xuXG4gICAgICAgIGxldCBub2RlO1xuICAgICAgICB3aGlsZSAoKG5vZGUgPSB3YWxrZXIubmV4dE5vZGUoKSkpIHtcbiAgICAgICAgICAvLyDov4fmu6Tlmajlt7Lnu4/lpITnkIbkuobpgLvovpHvvIzov5nph4zlj6rpnIDopoHmlLbpm4booqvmjqXlj5fnmoTlhYPntKBcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBBcnJheS5mcm9tKHRyYW5zbGF0ZWRTZXQpO1xuICAgICAgfVxuXG4gICAgICBwcml2YXRlIGZpbmRUcmFuc2xhdGlvbkNvbnRhaW5lcihlbGVtZW50OiBIVE1MRWxlbWVudCk6IEhUTUxFbGVtZW50IHwgbnVsbCB7XG4gICAgICAgIGxldCBjdXJyZW50OiBIVE1MRWxlbWVudCB8IG51bGwgPSBlbGVtZW50O1xuICAgICAgICBsZXQgY2FuZGlkYXRlOiBIVE1MRWxlbWVudCB8IG51bGwgPSBudWxsO1xuXG4gICAgICAgIC8vIOWQkeS4iumBjeWOhu+8jOaJvuWIsOacgOWQiOmAgueahOe/u+ivkeWuueWZqFxuICAgICAgICB3aGlsZSAoY3VycmVudCAmJiBjdXJyZW50ICE9PSBkb2N1bWVudC5ib2R5KSB7XG4gICAgICAgICAgY29uc3QgdGFnID0gY3VycmVudC50YWdOYW1lLnRvTG93ZXJDYXNlKCk7XG5cbiAgICAgICAgICAvLyDlpoLmnpzlvZPliY3lhYPntKDlupTor6XooqvmjpLpmaTvvIzov5Tlm57kuYvliY3mib7liLDnmoTlgJnpgIlcbiAgICAgICAgICBpZiAoIXRoaXMuc2hvdWxkVHJhbnNsYXRlRWxlbWVudChjdXJyZW50KSkge1xuICAgICAgICAgICAgcmV0dXJuIGNhbmRpZGF0ZTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICAvLyDlrrnlmajmoIfnrb7liJfooajvvIjov5nkupvmoIfnrb7pgILlkIjkvZzkuLrnv7vor5HljZXlhYPvvIlcbiAgICAgICAgICBpZiAoWydwJywgJ2RpdicsICdzZWN0aW9uJywgJ2FydGljbGUnLCAnYXNpZGUnLCAnbGknLCAndGQnLCAndGgnLCAnZHQnLCAnZGQnLCAnZmlnY2FwdGlvbicsICdjYXB0aW9uJ10uaW5jbHVkZXModGFnKSkge1xuICAgICAgICAgICAgY2FuZGlkYXRlID0gY3VycmVudDtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICAvLyDlpoLmnpzmmK/pobbnuqflrrnlmajvvIhoMS1oNu+8ie+8jOebtOaOpei/lOWbnlxuICAgICAgICAgIGlmIChbJ2gxJywgJ2gyJywgJ2gzJywgJ2g0JywgJ2g1JywgJ2g2J10uaW5jbHVkZXModGFnKSkge1xuICAgICAgICAgICAgcmV0dXJuIGN1cnJlbnQ7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgY3VycmVudCA9IGN1cnJlbnQucGFyZW50RWxlbWVudDtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIOWmguaenOaJvuWIsOWAmemAieWuueWZqO+8jOi/lOWbnuWug++8m+WQpuWImei/lOWbniBib2R5XG4gICAgICAgIHJldHVybiBjYW5kaWRhdGUgfHwgZG9jdW1lbnQuYm9keTtcbiAgICAgIH1cblxuICAgICAgcHJpdmF0ZSBzaG91bGRUcmFuc2xhdGVFbGVtZW50KGVsZW1lbnQ6IEhUTUxFbGVtZW50KTogYm9vbGVhbiB7XG4gICAgICAgIGNvbnN0IHRhZyA9IGVsZW1lbnQudGFnTmFtZS50b0xvd2VyQ2FzZSgpO1xuICAgICAgICBjb25zdCBleGNsdWRlVGFncyA9IFtcbiAgICAgICAgICAnc2NyaXB0JyxcbiAgICAgICAgICAnc3R5bGUnLFxuICAgICAgICAgICdub3NjcmlwdCcsXG4gICAgICAgICAgJ2lmcmFtZScsXG4gICAgICAgICAgJ3N2ZycsXG4gICAgICAgICAgJ2NhbnZhcycsXG4gICAgICAgICAgJ3ZpZGVvJyxcbiAgICAgICAgICAnYXVkaW8nLFxuICAgICAgICAgICdjb2RlJyxcbiAgICAgICAgICAncHJlJyxcbiAgICAgICAgICAna2JkJyxcbiAgICAgICAgICAnc2FtcCdcbiAgICAgICAgXTtcblxuICAgICAgICBpZiAoZXhjbHVkZVRhZ3MuaW5jbHVkZXModGFnKSkge1xuICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChlbGVtZW50LmdldEF0dHJpYnV0ZSgndHJhbnNsYXRlJykgPT09ICdubycpIHtcbiAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoZWxlbWVudC5nZXRBdHRyaWJ1dGUoJ2RhdGEtdHJhbnNsYXRlJykgPT09ICdmYWxzZScpIHtcbiAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBjbGFzc05hbWUgPSBlbGVtZW50LmNsYXNzTmFtZTtcbiAgICAgICAgaWYgKHR5cGVvZiBjbGFzc05hbWUgPT09ICdzdHJpbmcnICYmIGNsYXNzTmFtZS5pbmNsdWRlcygnbm90cmFuc2xhdGUnKSkge1xuICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfVxuXG4gICAgICBwcml2YXRlIGhhc0V4Y2x1ZGVkQW5jZXN0b3IoZWxlbWVudDogSFRNTEVsZW1lbnQpOiBib29sZWFuIHtcbiAgICAgICAgbGV0IGN1cnJlbnQ6IEhUTUxFbGVtZW50IHwgbnVsbCA9IGVsZW1lbnQ7XG5cbiAgICAgICAgd2hpbGUgKGN1cnJlbnQgJiYgY3VycmVudCAhPT0gZG9jdW1lbnQuYm9keSkge1xuICAgICAgICAgIGNvbnN0IHRhZyA9IGN1cnJlbnQudGFnTmFtZS50b0xvd2VyQ2FzZSgpO1xuXG4gICAgICAgICAgaWYgKFsnY29kZScsICdwcmUnLCAna2JkJywgJ3NhbXAnXS5pbmNsdWRlcyh0YWcpKSB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAoY3VycmVudC5nZXRBdHRyaWJ1dGUoJ3RyYW5zbGF0ZScpID09PSAnbm8nIHx8XG4gICAgICAgICAgICAgIGN1cnJlbnQuZ2V0QXR0cmlidXRlKCdkYXRhLXRyYW5zbGF0ZScpID09PSAnZmFsc2UnIHx8XG4gICAgICAgICAgICAgICh0eXBlb2YgY3VycmVudC5jbGFzc05hbWUgPT09ICdzdHJpbmcnICYmIGN1cnJlbnQuY2xhc3NOYW1lLmluY2x1ZGVzKCdub3RyYW5zbGF0ZScpKSkge1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgY3VycmVudCA9IGN1cnJlbnQucGFyZW50RWxlbWVudDtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cblxuICAgICAgcHJpdmF0ZSBhc3luYyB0cmFuc2xhdGVFbGVtZW50cyhlbGVtZW50czogSFRNTEVsZW1lbnRbXSkge1xuICAgICAgICBjb25zdCBzZXJ2aWNlID0gZ2V0T3BlbkFJU2VydmljZSgpO1xuICAgICAgICBpZiAoIXNlcnZpY2UpIHtcbiAgICAgICAgICBjb25zb2xlLmVycm9yKCdbVHJhbnNsYXRpb25NYW5hZ2VyXSBPcGVuQUkgc2VydmljZSBub3QgYXZhaWxhYmxlJyk7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgcmVxdWVzdHMgPSBbXTtcblxuICAgICAgICBmb3IgKGNvbnN0IGVsZW1lbnQgb2YgZWxlbWVudHMpIHtcbiAgICAgICAgICBpZiAodGhpcy50cmFuc2xhdGVkRWxlbWVudHMuaGFzKGVsZW1lbnQpKSB7XG4gICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBjb25zdCB0ZXh0ID0gZWxlbWVudC50ZXh0Q29udGVudD8udHJpbSgpO1xuICAgICAgICAgIGlmICghdGV4dCB8fCB0ZXh0Lmxlbmd0aCA8IDMpIHtcbiAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGNvbnN0IGhhc2ggPSB0aGlzLmhhc2hUZXh0KHRleHQpO1xuICAgICAgICAgIGlmICh0aGlzLnBlbmRpbmdUcmFuc2xhdGlvbnMuaGFzKGhhc2gpKSB7XG4gICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICB0aGlzLnBlbmRpbmdUcmFuc2xhdGlvbnMuYWRkKGhhc2gpO1xuXG4gICAgICAgICAgY29uc3Qgc291cmNlTGFuZyA9IHRoaXMuc2V0dGluZ3MuYXV0b0RldGVjdFxuICAgICAgICAgICAgPyBsYW5ndWFnZURldGVjdG9yLmRldGVjdCh0ZXh0KS5kZXRlY3RlZFxuICAgICAgICAgICAgOiBsYW5ndWFnZURldGVjdG9yLmRldGVjdFBhZ2VMYW5ndWFnZSgpO1xuXG4gICAgICAgICAgcmVxdWVzdHMucHVzaCh7XG4gICAgICAgICAgICB0ZXh0LFxuICAgICAgICAgICAgc291cmNlTGFuZyxcbiAgICAgICAgICAgIHRhcmdldExhbmc6IHRoaXMuc2V0dGluZ3MudGFyZ2V0TGFuZ3VhZ2UsXG4gICAgICAgICAgICBlbGVtZW50XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAocmVxdWVzdHMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgY29uc29sZS5sb2coJ1tUcmFuc2xhdGlvbk1hbmFnZXJdIE5vIGVsZW1lbnRzIHRvIHRyYW5zbGF0ZScpO1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnNvbGUubG9nKCdbVHJhbnNsYXRpb25NYW5hZ2VyXSBUcmFuc2xhdGluZycsIHJlcXVlc3RzLmxlbmd0aCwgJ3RleHRzJyk7XG5cbiAgICAgICAgbGV0IHRyYW5zbGF0ZWRDb3VudCA9IDA7XG4gICAgICAgIGNvbnN0IHRvdGFsID0gcmVxdWVzdHMubGVuZ3RoO1xuXG4gICAgICAgIGNvbnN0IGJhdGNoU2l6ZSA9IE1hdGgubWluKDUsIHRoaXMuc2V0dGluZ3Mub3BlbmFpLm1heENvbmN1cnJlbmN5IHx8IDUpO1xuXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcmVxdWVzdHMubGVuZ3RoOyBpICs9IGJhdGNoU2l6ZSkge1xuICAgICAgICAgIGNvbnN0IGJhdGNoID0gcmVxdWVzdHMuc2xpY2UoaSwgaSArIGJhdGNoU2l6ZSk7XG5cbiAgICAgICAgICBhd2FpdCBQcm9taXNlLmFsbFNldHRsZWQoXG4gICAgICAgICAgICBiYXRjaC5tYXAoYXN5bmMgKHJlcXVlc3QpID0+IHtcbiAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICBjb25zdCByZXN1bHQgPSBhd2FpdCBzZXJ2aWNlLnRyYW5zbGF0ZSh7XG4gICAgICAgICAgICAgICAgICB0ZXh0OiByZXF1ZXN0LnRleHQsXG4gICAgICAgICAgICAgICAgICBzb3VyY2VMYW5nOiByZXF1ZXN0LnNvdXJjZUxhbmcsXG4gICAgICAgICAgICAgICAgICB0YXJnZXRMYW5nOiByZXF1ZXN0LnRhcmdldExhbmdcbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgIGlmIChyZXN1bHQgJiYgcmVzdWx0LnRyYW5zbGF0ZWRUZXh0ICE9PSByZXN1bHQub3JpZ2luYWxUZXh0KSB7XG4gICAgICAgICAgICAgICAgICB0aGlzLmFwcGx5VHJhbnNsYXRpb24ocmVxdWVzdC5lbGVtZW50LCByZXF1ZXN0LnRleHQsIHJlc3VsdC50cmFuc2xhdGVkVGV4dCk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgdHJhbnNsYXRlZENvdW50Kys7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coYFtUcmFuc2xhdGlvbk1hbmFnZXJdIFRyYW5zbGF0ZWQgJHt0cmFuc2xhdGVkQ291bnR9LyR7dG90YWx9YCk7XG5cbiAgICAgICAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKCdbVHJhbnNsYXRpb25NYW5hZ2VyXSBUcmFuc2xhdGlvbiBmYWlsZWQgZm9yOicsIHJlcXVlc3QudGV4dCwgZXJyb3IpO1xuICAgICAgICAgICAgICB9IGZpbmFsbHkge1xuICAgICAgICAgICAgICAgIGNvbnN0IGhhc2ggPSB0aGlzLmhhc2hUZXh0KHJlcXVlc3QudGV4dCk7XG4gICAgICAgICAgICAgICAgdGhpcy5wZW5kaW5nVHJhbnNsYXRpb25zLmRlbGV0ZShoYXNoKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICApO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc29sZS5sb2coJ1tUcmFuc2xhdGlvbk1hbmFnZXJdIFRyYW5zbGF0aW9uIGNvbXBsZXRlZCwgdG90YWw6JywgdHJhbnNsYXRlZENvdW50KTtcbiAgICAgIH1cblxuICAgICAgcHJpdmF0ZSBhcHBseVRyYW5zbGF0aW9uKGVsZW1lbnQ6IEhUTUxFbGVtZW50LCBvcmlnaW5hbDogc3RyaW5nLCB0cmFuc2xhdGVkOiBzdHJpbmcpIHtcbiAgICAgICAgaWYgKHRoaXMudHJhbnNsYXRlZEVsZW1lbnRzLmhhcyhlbGVtZW50KSkge1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGVsZW1lbnQuc2V0QXR0cmlidXRlKCdkYXRhLWF0LW9yaWdpbmFsJywgb3JpZ2luYWwpO1xuICAgICAgICBlbGVtZW50LnNldEF0dHJpYnV0ZSgnZGF0YS1hdC10cmFuc2xhdGVkJywgdHJhbnNsYXRlZCk7XG5cbiAgICAgICAgY29uc3QgY2hpbGROb2RlcyA9IEFycmF5LmZyb20oZWxlbWVudC5jaGlsZE5vZGVzKTtcbiAgICAgICAgZm9yIChjb25zdCBub2RlIG9mIGNoaWxkTm9kZXMpIHtcbiAgICAgICAgICBpZiAobm9kZS5ub2RlVHlwZSA9PT0gTm9kZS5URVhUX05PREUpIHtcbiAgICAgICAgICAgIGNvbnN0IG5vZGVUZXh0ID0gbm9kZS50ZXh0Q29udGVudCB8fCAnJztcbiAgICAgICAgICAgIGlmIChub2RlVGV4dC5pbmNsdWRlcyhvcmlnaW5hbCkpIHtcbiAgICAgICAgICAgICAgY29uc3QgbmV3VGV4dCA9IG5vZGVUZXh0LnJlcGxhY2Uob3JpZ2luYWwsIHRyYW5zbGF0ZWQpO1xuICAgICAgICAgICAgICBub2RlLnRleHRDb250ZW50ID0gbmV3VGV4dDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnRyYW5zbGF0ZWRFbGVtZW50cy5hZGQoZWxlbWVudCk7XG5cbiAgICAgICAgaWYgKHRoaXMuc2V0dGluZ3Muc2hvd1RyYW5zbGF0aW9uQmFkZ2UpIHtcbiAgICAgICAgICB0aGlzLmFkZFRyYW5zbGF0aW9uQmFkZ2UoZWxlbWVudCk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgcHJpdmF0ZSBhZGRUcmFuc2xhdGlvbkJhZGdlKGVsZW1lbnQ6IEhUTUxFbGVtZW50KSB7XG4gICAgICAgIGNvbnN0IGV4aXN0aW5nQmFkZ2UgPSBlbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJy5hdC1iYWRnZScpO1xuICAgICAgICBpZiAoZXhpc3RpbmdCYWRnZSkge1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IHBvc2l0aW9uID0gd2luZG93LmdldENvbXB1dGVkU3R5bGUoZWxlbWVudCkucG9zaXRpb247XG4gICAgICAgIGlmIChwb3NpdGlvbiA9PT0gJ3N0YXRpYycpIHtcbiAgICAgICAgICBlbGVtZW50LnN0eWxlLnBvc2l0aW9uID0gJ3JlbGF0aXZlJztcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGJhZGdlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuICAgICAgICBiYWRnZS5jbGFzc05hbWUgPSAnYXQtYmFkZ2UnO1xuICAgICAgICBiYWRnZS5pbm5lckhUTUwgPSBgXG4gICAgICAgICAgPHN2ZyB2aWV3Qm94PVwiMCAwIDE2IDE2XCIgd2lkdGg9XCIxNFwiIGhlaWdodD1cIjE0XCIgZmlsbD1cImN1cnJlbnRDb2xvclwiPlxuICAgICAgICAgICAgPHBhdGggZD1cIk00LjUgMkEyLjUgMi41IDAgMDAyIDQuNXY4QTIuNSAyLjUgMCAwMDQuNSAxNWg4YTIuNSAyLjUgMCAwMDIuNS0yLjV2LThBMi41IDIuNSAwIDAwMTIuNSAyaC04em00IDNhLjUuNSAwIDAxLjUuNVY4aDFhLjUuNSAwIDAxMC0xSDQuNXpcIi8+XG4gICAgICAgICAgPC9zdmc+XG4gICAgICAgIGA7XG4gICAgICAgIGJhZGdlLnN0eWxlLmNzc1RleHQgPSBgXG4gICAgICAgICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgICAgICAgIHRvcDogLTRweDtcbiAgICAgICAgICByaWdodDogLTRweDtcbiAgICAgICAgICBiYWNrZ3JvdW5kOiAjM2I4MmY2O1xuICAgICAgICAgIGNvbG9yOiB3aGl0ZTtcbiAgICAgICAgICBib3JkZXItcmFkaXVzOiA0cHg7XG4gICAgICAgICAgcGFkZGluZzogMnB4IDRweDtcbiAgICAgICAgICBmb250LXNpemU6IDEwcHg7XG4gICAgICAgICAgY3Vyc29yOiBwb2ludGVyO1xuICAgICAgICAgIHotaW5kZXg6IDEwMDAwO1xuICAgICAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICAgICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICAgICAgICBnYXA6IDJweDtcbiAgICAgICAgYDtcblxuICAgICAgICBiYWRnZS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XG4gICAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgICB0aGlzLnJldmVydFRyYW5zbGF0aW9uKGVsZW1lbnQpO1xuICAgICAgICB9KTtcblxuICAgICAgICBlbGVtZW50LmFwcGVuZENoaWxkKGJhZGdlKTtcbiAgICAgIH1cblxuICAgICAgcHJpdmF0ZSByZXZlcnRUcmFuc2xhdGlvbihlbGVtZW50OiBIVE1MRWxlbWVudCkge1xuICAgICAgICBjb25zdCBvcmlnaW5hbCA9IGVsZW1lbnQuZ2V0QXR0cmlidXRlKCdkYXRhLWF0LW9yaWdpbmFsJyk7XG4gICAgICAgIGNvbnN0IHRyYW5zbGF0ZWQgPSBlbGVtZW50LmdldEF0dHJpYnV0ZSgnZGF0YS1hdC10cmFuc2xhdGVkJyk7XG5cbiAgICAgICAgaWYgKG9yaWdpbmFsICYmIHRyYW5zbGF0ZWQpIHtcbiAgICAgICAgICBjb25zdCBjaGlsZE5vZGVzID0gQXJyYXkuZnJvbShlbGVtZW50LmNoaWxkTm9kZXMpO1xuICAgICAgICAgIGZvciAoY29uc3Qgbm9kZSBvZiBjaGlsZE5vZGVzKSB7XG4gICAgICAgICAgICBpZiAobm9kZS5ub2RlVHlwZSA9PT0gTm9kZS5URVhUX05PREUpIHtcbiAgICAgICAgICAgICAgY29uc3Qgbm9kZVRleHQgPSBub2RlLnRleHRDb250ZW50IHx8ICcnO1xuICAgICAgICAgICAgICBpZiAobm9kZVRleHQuaW5jbHVkZXModHJhbnNsYXRlZCkpIHtcbiAgICAgICAgICAgICAgICBub2RlLnRleHRDb250ZW50ID0gbm9kZVRleHQucmVwbGFjZSh0cmFuc2xhdGVkLCBvcmlnaW5hbCk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG5cbiAgICAgICAgICBlbGVtZW50LnJlbW92ZUF0dHJpYnV0ZSgnZGF0YS1hdC1vcmlnaW5hbCcpO1xuICAgICAgICAgIGVsZW1lbnQucmVtb3ZlQXR0cmlidXRlKCdkYXRhLWF0LXRyYW5zbGF0ZWQnKTtcbiAgICAgICAgICB0aGlzLnRyYW5zbGF0ZWRFbGVtZW50cy5kZWxldGUoZWxlbWVudCk7XG5cbiAgICAgICAgICBjb25zdCBiYWRnZSA9IGVsZW1lbnQucXVlcnlTZWxlY3RvcignLmF0LWJhZGdlJyk7XG4gICAgICAgICAgaWYgKGJhZGdlKSB7XG4gICAgICAgICAgICBiYWRnZS5yZW1vdmUoKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgcHJpdmF0ZSBzZXR1cE9ic2VydmVyKCkge1xuICAgICAgICBpZiAodGhpcy5vYnNlcnZlcikge1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMub2JzZXJ2ZXIgPSBuZXcgTXV0YXRpb25PYnNlcnZlcihcbiAgICAgICAgICB0aGlzLmRlYm91bmNlKCgpID0+IHtcbiAgICAgICAgICAgIGlmICh0aGlzLnN0YXR1cyA9PT0gJ2NvbXBsZXRlZCcpIHtcbiAgICAgICAgICAgICAgY29uc29sZS5sb2coJ1tUcmFuc2xhdGlvbk1hbmFnZXJdIFBhZ2UgY2hhbmdlZCwgcmUtdHJhbnNsYXRpbmcuLi4nKTtcbiAgICAgICAgICAgICAgY29uc3QgbmV3RWxlbWVudHMgPSB0aGlzLmZpbmRUcmFuc2xhdGFibGVFbGVtZW50cygpO1xuICAgICAgICAgICAgICB0aGlzLnRyYW5zbGF0ZUVsZW1lbnRzKG5ld0VsZW1lbnRzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9LCA1MDApXG4gICAgICAgICk7XG5cbiAgICAgICAgdGhpcy5vYnNlcnZlci5vYnNlcnZlKGRvY3VtZW50LmJvZHksIHtcbiAgICAgICAgICBjaGlsZExpc3Q6IHRydWUsXG4gICAgICAgICAgc3VidHJlZTogdHJ1ZVxuICAgICAgICB9KTtcbiAgICAgIH1cblxuICAgICAgcHJpdmF0ZSBkZWJvdW5jZShmdW5jOiBGdW5jdGlvbiwgd2FpdDogbnVtYmVyKSB7XG4gICAgICAgIGxldCB0aW1lb3V0OiBudW1iZXIgfCBudWxsID0gbnVsbDtcbiAgICAgICAgcmV0dXJuICguLi5hcmdzOiBhbnlbXSkgPT4ge1xuICAgICAgICAgIGlmICh0aW1lb3V0KSB7XG4gICAgICAgICAgICBjbGVhclRpbWVvdXQodGltZW91dCk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHRpbWVvdXQgPSB3aW5kb3cuc2V0VGltZW91dCgoKSA9PiBmdW5jKC4uLmFyZ3MpLCB3YWl0KTtcbiAgICAgICAgfTtcbiAgICAgIH1cblxuICAgICAgcHJpdmF0ZSBoYXNoVGV4dCh0ZXh0OiBzdHJpbmcpOiBzdHJpbmcge1xuICAgICAgICBsZXQgaGFzaCA9IDA7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGV4dC5sZW5ndGg7IGkrKykge1xuICAgICAgICAgIGhhc2ggPSAoKGhhc2ggPDwgNSkgLSBoYXNoKSArIHRleHQuY2hhckNvZGVBdChpKTtcbiAgICAgICAgICBoYXNoID0gaGFzaCAmIGhhc2g7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIE1hdGguYWJzKGhhc2gpLnRvU3RyaW5nKCk7XG4gICAgICB9XG5cbiAgZ2V0U3RhdHVzKCkge1xuICAgIHJldHVybiB0aGlzLnN0YXR1cztcbiAgfVxuXG4gIGFzeW5jIHJldmVydEFsbCgpIHtcbiAgICBjb25zb2xlLmxvZygnW1RyYW5zbGF0aW9uTWFuYWdlcl0gUmV2ZXJ0aW5nIGFsbCB0cmFuc2xhdGlvbnMuLi4nKTtcblxuICAgIGNvbnN0IGVsZW1lbnRzID0gQXJyYXkuZnJvbSh0aGlzLnRyYW5zbGF0ZWRFbGVtZW50cyk7XG5cbiAgICBmb3IgKGNvbnN0IGVsZW1lbnQgb2YgZWxlbWVudHMpIHtcbiAgICAgIHRoaXMucmV2ZXJ0VHJhbnNsYXRpb24oZWxlbWVudCk7XG4gICAgfVxuXG4gICAgdGhpcy50cmFuc2xhdGVkRWxlbWVudHMuY2xlYXIoKTtcbiAgICB0aGlzLnN0YXR1cyA9ICdpZGxlJztcblxuICAgIGNvbnNvbGUubG9nKCdbVHJhbnNsYXRpb25NYW5hZ2VyXSBBbGwgdHJhbnNsYXRpb25zIHJldmVydGVkJyk7XG4gIH1cbn1cblxuICAgIGNvbnN0IG1hbmFnZXIgPSBuZXcgVHJhbnNsYXRpb25NYW5hZ2VySW1wbCgpO1xuXG4gICAgKHdpbmRvdyBhcyBhbnkpLl9fVFJBTlNMQVRJT05fTUFOQUdFUl9fID0gbWFuYWdlcjtcblxuICAgIGlmICh0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJyAmJiAod2luZG93IGFzIGFueSkuX19ERUJVR19fKSB7XG4gICAgICAod2luZG93IGFzIGFueSkuX19ERUJVR19fLnJlZ2lzdGVyTW9kdWxlKCd0cmFuc2xhdGlvbk1hbmFnZXInLCBtYW5hZ2VyKTtcbiAgICAgICh3aW5kb3cgYXMgYW55KS5fX0RFQlVHX18ucmVnaXN0ZXJNb2R1bGUoJ2xhbmd1YWdlRGV0ZWN0b3InLCBsYW5ndWFnZURldGVjdG9yKTtcbiAgICAgICh3aW5kb3cgYXMgYW55KS5fX0RFQlVHX18ucmVnaXN0ZXJNb2R1bGUoJ29wZW5haVNlcnZpY2UnLCBnZXRPcGVuQUlTZXJ2aWNlKCkpO1xuICAgICAgKHdpbmRvdyBhcyBhbnkpLl9fREVCVUdfXy5yZWdpc3Rlck1vZHVsZSgndHJhbnNsYXRpb25DYWNoZScsIHRyYW5zbGF0aW9uQ2FjaGUpO1xuICAgIH1cblxuICAgIC8vIOWIneWni+WMllxuICAgIGlmIChkb2N1bWVudC5yZWFkeVN0YXRlID09PSAnbG9hZGluZycpIHtcbiAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCAoKSA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdbQ29udGVudCBTY3JpcHRdIERPTSBsb2FkZWQsIGluaXRpYWxpemluZyBtYW5hZ2VyLi4uJyk7XG4gICAgICAgIG1hbmFnZXIuaW5pdCgpO1xuICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnNvbGUubG9nKCdbQ29udGVudCBTY3JpcHRdIERPTSBhbHJlYWR5IGxvYWRlZCwgaW5pdGlhbGl6aW5nIG1hbmFnZXIgaW1tZWRpYXRlbHkuLi4nKTtcbiAgICAgIG1hbmFnZXIuaW5pdCgpO1xuICAgIH1cbiAgfSxcbn0pO1xuIiwiKGZ1bmN0aW9uIChnbG9iYWwsIGZhY3RvcnkpIHtcbiAgaWYgKHR5cGVvZiBkZWZpbmUgPT09IFwiZnVuY3Rpb25cIiAmJiBkZWZpbmUuYW1kKSB7XG4gICAgZGVmaW5lKFwid2ViZXh0ZW5zaW9uLXBvbHlmaWxsXCIsIFtcIm1vZHVsZVwiXSwgZmFjdG9yeSk7XG4gIH0gZWxzZSBpZiAodHlwZW9mIGV4cG9ydHMgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICBmYWN0b3J5KG1vZHVsZSk7XG4gIH0gZWxzZSB7XG4gICAgdmFyIG1vZCA9IHtcbiAgICAgIGV4cG9ydHM6IHt9XG4gICAgfTtcbiAgICBmYWN0b3J5KG1vZCk7XG4gICAgZ2xvYmFsLmJyb3dzZXIgPSBtb2QuZXhwb3J0cztcbiAgfVxufSkodHlwZW9mIGdsb2JhbFRoaXMgIT09IFwidW5kZWZpbmVkXCIgPyBnbG9iYWxUaGlzIDogdHlwZW9mIHNlbGYgIT09IFwidW5kZWZpbmVkXCIgPyBzZWxmIDogdGhpcywgZnVuY3Rpb24gKG1vZHVsZSkge1xuICAvKiB3ZWJleHRlbnNpb24tcG9seWZpbGwgLSB2MC4xMi4wIC0gVHVlIE1heSAxNCAyMDI0IDE4OjAxOjI5ICovXG4gIC8qIC0qLSBNb2RlOiBpbmRlbnQtdGFicy1tb2RlOiBuaWw7IGpzLWluZGVudC1sZXZlbDogMiAtKi0gKi9cbiAgLyogdmltOiBzZXQgc3RzPTIgc3c9MiBldCB0dz04MDogKi9cbiAgLyogVGhpcyBTb3VyY2UgQ29kZSBGb3JtIGlzIHN1YmplY3QgdG8gdGhlIHRlcm1zIG9mIHRoZSBNb3ppbGxhIFB1YmxpY1xuICAgKiBMaWNlbnNlLCB2LiAyLjAuIElmIGEgY29weSBvZiB0aGUgTVBMIHdhcyBub3QgZGlzdHJpYnV0ZWQgd2l0aCB0aGlzXG4gICAqIGZpbGUsIFlvdSBjYW4gb2J0YWluIG9uZSBhdCBodHRwOi8vbW96aWxsYS5vcmcvTVBMLzIuMC8uICovXG4gIFwidXNlIHN0cmljdFwiO1xuXG4gIGlmICghKGdsb2JhbFRoaXMuY2hyb21lICYmIGdsb2JhbFRoaXMuY2hyb21lLnJ1bnRpbWUgJiYgZ2xvYmFsVGhpcy5jaHJvbWUucnVudGltZS5pZCkpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJUaGlzIHNjcmlwdCBzaG91bGQgb25seSBiZSBsb2FkZWQgaW4gYSBicm93c2VyIGV4dGVuc2lvbi5cIik7XG4gIH1cbiAgaWYgKCEoZ2xvYmFsVGhpcy5icm93c2VyICYmIGdsb2JhbFRoaXMuYnJvd3Nlci5ydW50aW1lICYmIGdsb2JhbFRoaXMuYnJvd3Nlci5ydW50aW1lLmlkKSkge1xuICAgIGNvbnN0IENIUk9NRV9TRU5EX01FU1NBR0VfQ0FMTEJBQ0tfTk9fUkVTUE9OU0VfTUVTU0FHRSA9IFwiVGhlIG1lc3NhZ2UgcG9ydCBjbG9zZWQgYmVmb3JlIGEgcmVzcG9uc2Ugd2FzIHJlY2VpdmVkLlwiO1xuXG4gICAgLy8gV3JhcHBpbmcgdGhlIGJ1bGsgb2YgdGhpcyBwb2x5ZmlsbCBpbiBhIG9uZS10aW1lLXVzZSBmdW5jdGlvbiBpcyBhIG1pbm9yXG4gICAgLy8gb3B0aW1pemF0aW9uIGZvciBGaXJlZm94LiBTaW5jZSBTcGlkZXJtb25rZXkgZG9lcyBub3QgZnVsbHkgcGFyc2UgdGhlXG4gICAgLy8gY29udGVudHMgb2YgYSBmdW5jdGlvbiB1bnRpbCB0aGUgZmlyc3QgdGltZSBpdCdzIGNhbGxlZCwgYW5kIHNpbmNlIGl0IHdpbGxcbiAgICAvLyBuZXZlciBhY3R1YWxseSBuZWVkIHRvIGJlIGNhbGxlZCwgdGhpcyBhbGxvd3MgdGhlIHBvbHlmaWxsIHRvIGJlIGluY2x1ZGVkXG4gICAgLy8gaW4gRmlyZWZveCBuZWFybHkgZm9yIGZyZWUuXG4gICAgY29uc3Qgd3JhcEFQSXMgPSBleHRlbnNpb25BUElzID0+IHtcbiAgICAgIC8vIE5PVEU6IGFwaU1ldGFkYXRhIGlzIGFzc29jaWF0ZWQgdG8gdGhlIGNvbnRlbnQgb2YgdGhlIGFwaS1tZXRhZGF0YS5qc29uIGZpbGVcbiAgICAgIC8vIGF0IGJ1aWxkIHRpbWUgYnkgcmVwbGFjaW5nIHRoZSBmb2xsb3dpbmcgXCJpbmNsdWRlXCIgd2l0aCB0aGUgY29udGVudCBvZiB0aGVcbiAgICAgIC8vIEpTT04gZmlsZS5cbiAgICAgIGNvbnN0IGFwaU1ldGFkYXRhID0ge1xuICAgICAgICBcImFsYXJtc1wiOiB7XG4gICAgICAgICAgXCJjbGVhclwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMCxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcImNsZWFyQWxsXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAwLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDBcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwiZ2V0XCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAwLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwiZ2V0QWxsXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAwLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDBcbiAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIFwiYm9va21hcmtzXCI6IHtcbiAgICAgICAgICBcImNyZWF0ZVwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcImdldFwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcImdldENoaWxkcmVuXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwiZ2V0UmVjZW50XCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwiZ2V0U3ViVHJlZVwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcImdldFRyZWVcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDAsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMFxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJtb3ZlXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAyLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDJcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwicmVtb3ZlXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwicmVtb3ZlVHJlZVwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcInNlYXJjaFwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcInVwZGF0ZVwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMixcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAyXG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBcImJyb3dzZXJBY3Rpb25cIjoge1xuICAgICAgICAgIFwiZGlzYWJsZVwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMCxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxLFxuICAgICAgICAgICAgXCJmYWxsYmFja1RvTm9DYWxsYmFja1wiOiB0cnVlXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcImVuYWJsZVwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMCxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxLFxuICAgICAgICAgICAgXCJmYWxsYmFja1RvTm9DYWxsYmFja1wiOiB0cnVlXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcImdldEJhZGdlQmFja2dyb3VuZENvbG9yXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwiZ2V0QmFkZ2VUZXh0XCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwiZ2V0UG9wdXBcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJnZXRUaXRsZVwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcIm9wZW5Qb3B1cFwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMCxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAwXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcInNldEJhZGdlQmFja2dyb3VuZENvbG9yXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDEsXG4gICAgICAgICAgICBcImZhbGxiYWNrVG9Ob0NhbGxiYWNrXCI6IHRydWVcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwic2V0QmFkZ2VUZXh0XCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDEsXG4gICAgICAgICAgICBcImZhbGxiYWNrVG9Ob0NhbGxiYWNrXCI6IHRydWVcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwic2V0SWNvblwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcInNldFBvcHVwXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDEsXG4gICAgICAgICAgICBcImZhbGxiYWNrVG9Ob0NhbGxiYWNrXCI6IHRydWVcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwic2V0VGl0bGVcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwiZmFsbGJhY2tUb05vQ2FsbGJhY2tcIjogdHJ1ZVxuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgXCJicm93c2luZ0RhdGFcIjoge1xuICAgICAgICAgIFwicmVtb3ZlXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAyLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDJcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwicmVtb3ZlQ2FjaGVcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJyZW1vdmVDb29raWVzXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwicmVtb3ZlRG93bmxvYWRzXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwicmVtb3ZlRm9ybURhdGFcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJyZW1vdmVIaXN0b3J5XCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwicmVtb3ZlTG9jYWxTdG9yYWdlXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwicmVtb3ZlUGFzc3dvcmRzXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwicmVtb3ZlUGx1Z2luRGF0YVwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcInNldHRpbmdzXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAwLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDBcbiAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIFwiY29tbWFuZHNcIjoge1xuICAgICAgICAgIFwiZ2V0QWxsXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAwLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDBcbiAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIFwiY29udGV4dE1lbnVzXCI6IHtcbiAgICAgICAgICBcInJlbW92ZVwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcInJlbW92ZUFsbFwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMCxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAwXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcInVwZGF0ZVwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMixcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAyXG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBcImNvb2tpZXNcIjoge1xuICAgICAgICAgIFwiZ2V0XCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwiZ2V0QWxsXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwiZ2V0QWxsQ29va2llU3RvcmVzXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAwLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDBcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwicmVtb3ZlXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwic2V0XCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIFwiZGV2dG9vbHNcIjoge1xuICAgICAgICAgIFwiaW5zcGVjdGVkV2luZG93XCI6IHtcbiAgICAgICAgICAgIFwiZXZhbFwiOiB7XG4gICAgICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgICAgICBcIm1heEFyZ3NcIjogMixcbiAgICAgICAgICAgICAgXCJzaW5nbGVDYWxsYmFja0FyZ1wiOiBmYWxzZVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJwYW5lbHNcIjoge1xuICAgICAgICAgICAgXCJjcmVhdGVcIjoge1xuICAgICAgICAgICAgICBcIm1pbkFyZ3NcIjogMyxcbiAgICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDMsXG4gICAgICAgICAgICAgIFwic2luZ2xlQ2FsbGJhY2tBcmdcIjogdHJ1ZVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIFwiZWxlbWVudHNcIjoge1xuICAgICAgICAgICAgICBcImNyZWF0ZVNpZGViYXJQYW5lXCI6IHtcbiAgICAgICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBcImRvd25sb2Fkc1wiOiB7XG4gICAgICAgICAgXCJjYW5jZWxcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJkb3dubG9hZFwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcImVyYXNlXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwiZ2V0RmlsZUljb25cIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMlxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJvcGVuXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDEsXG4gICAgICAgICAgICBcImZhbGxiYWNrVG9Ob0NhbGxiYWNrXCI6IHRydWVcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwicGF1c2VcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJyZW1vdmVGaWxlXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwicmVzdW1lXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwic2VhcmNoXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwic2hvd1wiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxLFxuICAgICAgICAgICAgXCJmYWxsYmFja1RvTm9DYWxsYmFja1wiOiB0cnVlXG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBcImV4dGVuc2lvblwiOiB7XG4gICAgICAgICAgXCJpc0FsbG93ZWRGaWxlU2NoZW1lQWNjZXNzXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAwLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDBcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwiaXNBbGxvd2VkSW5jb2duaXRvQWNjZXNzXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAwLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDBcbiAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIFwiaGlzdG9yeVwiOiB7XG4gICAgICAgICAgXCJhZGRVcmxcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJkZWxldGVBbGxcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDAsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMFxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJkZWxldGVSYW5nZVwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcImRlbGV0ZVVybFwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcImdldFZpc2l0c1wiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcInNlYXJjaFwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBcImkxOG5cIjoge1xuICAgICAgICAgIFwiZGV0ZWN0TGFuZ3VhZ2VcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJnZXRBY2NlcHRMYW5ndWFnZXNcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDAsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMFxuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgXCJpZGVudGl0eVwiOiB7XG4gICAgICAgICAgXCJsYXVuY2hXZWJBdXRoRmxvd1wiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBcImlkbGVcIjoge1xuICAgICAgICAgIFwicXVlcnlTdGF0ZVwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBcIm1hbmFnZW1lbnRcIjoge1xuICAgICAgICAgIFwiZ2V0XCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwiZ2V0QWxsXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAwLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDBcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwiZ2V0U2VsZlwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMCxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAwXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcInNldEVuYWJsZWRcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDIsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMlxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJ1bmluc3RhbGxTZWxmXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAwLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIFwibm90aWZpY2F0aW9uc1wiOiB7XG4gICAgICAgICAgXCJjbGVhclwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcImNyZWF0ZVwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAyXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcImdldEFsbFwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMCxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAwXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcImdldFBlcm1pc3Npb25MZXZlbFwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMCxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAwXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcInVwZGF0ZVwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMixcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAyXG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBcInBhZ2VBY3Rpb25cIjoge1xuICAgICAgICAgIFwiZ2V0UG9wdXBcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJnZXRUaXRsZVwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcImhpZGVcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwiZmFsbGJhY2tUb05vQ2FsbGJhY2tcIjogdHJ1ZVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJzZXRJY29uXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwic2V0UG9wdXBcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwiZmFsbGJhY2tUb05vQ2FsbGJhY2tcIjogdHJ1ZVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJzZXRUaXRsZVwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxLFxuICAgICAgICAgICAgXCJmYWxsYmFja1RvTm9DYWxsYmFja1wiOiB0cnVlXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcInNob3dcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwiZmFsbGJhY2tUb05vQ2FsbGJhY2tcIjogdHJ1ZVxuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgXCJwZXJtaXNzaW9uc1wiOiB7XG4gICAgICAgICAgXCJjb250YWluc1wiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcImdldEFsbFwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMCxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAwXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcInJlbW92ZVwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcInJlcXVlc3RcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgXCJydW50aW1lXCI6IHtcbiAgICAgICAgICBcImdldEJhY2tncm91bmRQYWdlXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAwLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDBcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwiZ2V0UGxhdGZvcm1JbmZvXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAwLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDBcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwib3Blbk9wdGlvbnNQYWdlXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAwLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDBcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwicmVxdWVzdFVwZGF0ZUNoZWNrXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAwLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDBcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwic2VuZE1lc3NhZ2VcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogM1xuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJzZW5kTmF0aXZlTWVzc2FnZVwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMixcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAyXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcInNldFVuaW5zdGFsbFVSTFwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBcInNlc3Npb25zXCI6IHtcbiAgICAgICAgICBcImdldERldmljZXNcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDAsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJnZXRSZWNlbnRseUNsb3NlZFwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMCxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcInJlc3RvcmVcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDAsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgXCJzdG9yYWdlXCI6IHtcbiAgICAgICAgICBcImxvY2FsXCI6IHtcbiAgICAgICAgICAgIFwiY2xlYXJcIjoge1xuICAgICAgICAgICAgICBcIm1pbkFyZ3NcIjogMCxcbiAgICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDBcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBcImdldFwiOiB7XG4gICAgICAgICAgICAgIFwibWluQXJnc1wiOiAwLFxuICAgICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIFwiZ2V0Qnl0ZXNJblVzZVwiOiB7XG4gICAgICAgICAgICAgIFwibWluQXJnc1wiOiAwLFxuICAgICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIFwicmVtb3ZlXCI6IHtcbiAgICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgXCJzZXRcIjoge1xuICAgICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9LFxuICAgICAgICAgIFwibWFuYWdlZFwiOiB7XG4gICAgICAgICAgICBcImdldFwiOiB7XG4gICAgICAgICAgICAgIFwibWluQXJnc1wiOiAwLFxuICAgICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIFwiZ2V0Qnl0ZXNJblVzZVwiOiB7XG4gICAgICAgICAgICAgIFwibWluQXJnc1wiOiAwLFxuICAgICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJzeW5jXCI6IHtcbiAgICAgICAgICAgIFwiY2xlYXJcIjoge1xuICAgICAgICAgICAgICBcIm1pbkFyZ3NcIjogMCxcbiAgICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDBcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBcImdldFwiOiB7XG4gICAgICAgICAgICAgIFwibWluQXJnc1wiOiAwLFxuICAgICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIFwiZ2V0Qnl0ZXNJblVzZVwiOiB7XG4gICAgICAgICAgICAgIFwibWluQXJnc1wiOiAwLFxuICAgICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIFwicmVtb3ZlXCI6IHtcbiAgICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgXCJzZXRcIjoge1xuICAgICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIFwidGFic1wiOiB7XG4gICAgICAgICAgXCJjYXB0dXJlVmlzaWJsZVRhYlwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMCxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAyXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcImNyZWF0ZVwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcImRldGVjdExhbmd1YWdlXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAwLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwiZGlzY2FyZFwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMCxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcImR1cGxpY2F0ZVwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcImV4ZWN1dGVTY3JpcHRcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMlxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJnZXRcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJnZXRDdXJyZW50XCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAwLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDBcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwiZ2V0Wm9vbVwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMCxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcImdldFpvb21TZXR0aW5nc1wiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMCxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcImdvQmFja1wiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMCxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcImdvRm9yd2FyZFwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMCxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcImhpZ2hsaWdodFwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcImluc2VydENTU1wiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAyXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcIm1vdmVcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDIsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMlxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJxdWVyeVwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcInJlbG9hZFwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMCxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAyXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcInJlbW92ZVwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcInJlbW92ZUNTU1wiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAyXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcInNlbmRNZXNzYWdlXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAyLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDNcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwic2V0Wm9vbVwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAyXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcInNldFpvb21TZXR0aW5nc1wiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAyXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcInVwZGF0ZVwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAyXG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBcInRvcFNpdGVzXCI6IHtcbiAgICAgICAgICBcImdldFwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMCxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAwXG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBcIndlYk5hdmlnYXRpb25cIjoge1xuICAgICAgICAgIFwiZ2V0QWxsRnJhbWVzXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwiZ2V0RnJhbWVcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgXCJ3ZWJSZXF1ZXN0XCI6IHtcbiAgICAgICAgICBcImhhbmRsZXJCZWhhdmlvckNoYW5nZWRcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDAsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMFxuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgXCJ3aW5kb3dzXCI6IHtcbiAgICAgICAgICBcImNyZWF0ZVwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMCxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcImdldFwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAyXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcImdldEFsbFwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMCxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcImdldEN1cnJlbnRcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDAsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJnZXRMYXN0Rm9jdXNlZFwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMCxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcInJlbW92ZVwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcInVwZGF0ZVwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMixcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAyXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9O1xuICAgICAgaWYgKE9iamVjdC5rZXlzKGFwaU1ldGFkYXRhKS5sZW5ndGggPT09IDApIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiYXBpLW1ldGFkYXRhLmpzb24gaGFzIG5vdCBiZWVuIGluY2x1ZGVkIGluIGJyb3dzZXItcG9seWZpbGxcIik7XG4gICAgICB9XG5cbiAgICAgIC8qKlxuICAgICAgICogQSBXZWFrTWFwIHN1YmNsYXNzIHdoaWNoIGNyZWF0ZXMgYW5kIHN0b3JlcyBhIHZhbHVlIGZvciBhbnkga2V5IHdoaWNoIGRvZXNcbiAgICAgICAqIG5vdCBleGlzdCB3aGVuIGFjY2Vzc2VkLCBidXQgYmVoYXZlcyBleGFjdGx5IGFzIGFuIG9yZGluYXJ5IFdlYWtNYXBcbiAgICAgICAqIG90aGVyd2lzZS5cbiAgICAgICAqXG4gICAgICAgKiBAcGFyYW0ge2Z1bmN0aW9ufSBjcmVhdGVJdGVtXG4gICAgICAgKiAgICAgICAgQSBmdW5jdGlvbiB3aGljaCB3aWxsIGJlIGNhbGxlZCBpbiBvcmRlciB0byBjcmVhdGUgdGhlIHZhbHVlIGZvciBhbnlcbiAgICAgICAqICAgICAgICBrZXkgd2hpY2ggZG9lcyBub3QgZXhpc3QsIHRoZSBmaXJzdCB0aW1lIGl0IGlzIGFjY2Vzc2VkLiBUaGVcbiAgICAgICAqICAgICAgICBmdW5jdGlvbiByZWNlaXZlcywgYXMgaXRzIG9ubHkgYXJndW1lbnQsIHRoZSBrZXkgYmVpbmcgY3JlYXRlZC5cbiAgICAgICAqL1xuICAgICAgY2xhc3MgRGVmYXVsdFdlYWtNYXAgZXh0ZW5kcyBXZWFrTWFwIHtcbiAgICAgICAgY29uc3RydWN0b3IoY3JlYXRlSXRlbSwgaXRlbXMgPSB1bmRlZmluZWQpIHtcbiAgICAgICAgICBzdXBlcihpdGVtcyk7XG4gICAgICAgICAgdGhpcy5jcmVhdGVJdGVtID0gY3JlYXRlSXRlbTtcbiAgICAgICAgfVxuICAgICAgICBnZXQoa2V5KSB7XG4gICAgICAgICAgaWYgKCF0aGlzLmhhcyhrZXkpKSB7XG4gICAgICAgICAgICB0aGlzLnNldChrZXksIHRoaXMuY3JlYXRlSXRlbShrZXkpKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIHN1cGVyLmdldChrZXkpO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIC8qKlxuICAgICAgICogUmV0dXJucyB0cnVlIGlmIHRoZSBnaXZlbiBvYmplY3QgaXMgYW4gb2JqZWN0IHdpdGggYSBgdGhlbmAgbWV0aG9kLCBhbmQgY2FuXG4gICAgICAgKiB0aGVyZWZvcmUgYmUgYXNzdW1lZCB0byBiZWhhdmUgYXMgYSBQcm9taXNlLlxuICAgICAgICpcbiAgICAgICAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIHRlc3QuXG4gICAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB0aGUgdmFsdWUgaXMgdGhlbmFibGUuXG4gICAgICAgKi9cbiAgICAgIGNvbnN0IGlzVGhlbmFibGUgPSB2YWx1ZSA9PiB7XG4gICAgICAgIHJldHVybiB2YWx1ZSAmJiB0eXBlb2YgdmFsdWUgPT09IFwib2JqZWN0XCIgJiYgdHlwZW9mIHZhbHVlLnRoZW4gPT09IFwiZnVuY3Rpb25cIjtcbiAgICAgIH07XG5cbiAgICAgIC8qKlxuICAgICAgICogQ3JlYXRlcyBhbmQgcmV0dXJucyBhIGZ1bmN0aW9uIHdoaWNoLCB3aGVuIGNhbGxlZCwgd2lsbCByZXNvbHZlIG9yIHJlamVjdFxuICAgICAgICogdGhlIGdpdmVuIHByb21pc2UgYmFzZWQgb24gaG93IGl0IGlzIGNhbGxlZDpcbiAgICAgICAqXG4gICAgICAgKiAtIElmLCB3aGVuIGNhbGxlZCwgYGNocm9tZS5ydW50aW1lLmxhc3RFcnJvcmAgY29udGFpbnMgYSBub24tbnVsbCBvYmplY3QsXG4gICAgICAgKiAgIHRoZSBwcm9taXNlIGlzIHJlamVjdGVkIHdpdGggdGhhdCB2YWx1ZS5cbiAgICAgICAqIC0gSWYgdGhlIGZ1bmN0aW9uIGlzIGNhbGxlZCB3aXRoIGV4YWN0bHkgb25lIGFyZ3VtZW50LCB0aGUgcHJvbWlzZSBpc1xuICAgICAgICogICByZXNvbHZlZCB0byB0aGF0IHZhbHVlLlxuICAgICAgICogLSBPdGhlcndpc2UsIHRoZSBwcm9taXNlIGlzIHJlc29sdmVkIHRvIGFuIGFycmF5IGNvbnRhaW5pbmcgYWxsIG9mIHRoZVxuICAgICAgICogICBmdW5jdGlvbidzIGFyZ3VtZW50cy5cbiAgICAgICAqXG4gICAgICAgKiBAcGFyYW0ge29iamVjdH0gcHJvbWlzZVxuICAgICAgICogICAgICAgIEFuIG9iamVjdCBjb250YWluaW5nIHRoZSByZXNvbHV0aW9uIGFuZCByZWplY3Rpb24gZnVuY3Rpb25zIG9mIGFcbiAgICAgICAqICAgICAgICBwcm9taXNlLlxuICAgICAgICogQHBhcmFtIHtmdW5jdGlvbn0gcHJvbWlzZS5yZXNvbHZlXG4gICAgICAgKiAgICAgICAgVGhlIHByb21pc2UncyByZXNvbHV0aW9uIGZ1bmN0aW9uLlxuICAgICAgICogQHBhcmFtIHtmdW5jdGlvbn0gcHJvbWlzZS5yZWplY3RcbiAgICAgICAqICAgICAgICBUaGUgcHJvbWlzZSdzIHJlamVjdGlvbiBmdW5jdGlvbi5cbiAgICAgICAqIEBwYXJhbSB7b2JqZWN0fSBtZXRhZGF0YVxuICAgICAgICogICAgICAgIE1ldGFkYXRhIGFib3V0IHRoZSB3cmFwcGVkIG1ldGhvZCB3aGljaCBoYXMgY3JlYXRlZCB0aGUgY2FsbGJhY2suXG4gICAgICAgKiBAcGFyYW0ge2Jvb2xlYW59IG1ldGFkYXRhLnNpbmdsZUNhbGxiYWNrQXJnXG4gICAgICAgKiAgICAgICAgV2hldGhlciBvciBub3QgdGhlIHByb21pc2UgaXMgcmVzb2x2ZWQgd2l0aCBvbmx5IHRoZSBmaXJzdFxuICAgICAgICogICAgICAgIGFyZ3VtZW50IG9mIHRoZSBjYWxsYmFjaywgYWx0ZXJuYXRpdmVseSBhbiBhcnJheSBvZiBhbGwgdGhlXG4gICAgICAgKiAgICAgICAgY2FsbGJhY2sgYXJndW1lbnRzIGlzIHJlc29sdmVkLiBCeSBkZWZhdWx0LCBpZiB0aGUgY2FsbGJhY2tcbiAgICAgICAqICAgICAgICBmdW5jdGlvbiBpcyBpbnZva2VkIHdpdGggb25seSBhIHNpbmdsZSBhcmd1bWVudCwgdGhhdCB3aWxsIGJlXG4gICAgICAgKiAgICAgICAgcmVzb2x2ZWQgdG8gdGhlIHByb21pc2UsIHdoaWxlIGFsbCBhcmd1bWVudHMgd2lsbCBiZSByZXNvbHZlZCBhc1xuICAgICAgICogICAgICAgIGFuIGFycmF5IGlmIG11bHRpcGxlIGFyZSBnaXZlbi5cbiAgICAgICAqXG4gICAgICAgKiBAcmV0dXJucyB7ZnVuY3Rpb259XG4gICAgICAgKiAgICAgICAgVGhlIGdlbmVyYXRlZCBjYWxsYmFjayBmdW5jdGlvbi5cbiAgICAgICAqL1xuICAgICAgY29uc3QgbWFrZUNhbGxiYWNrID0gKHByb21pc2UsIG1ldGFkYXRhKSA9PiB7XG4gICAgICAgIHJldHVybiAoLi4uY2FsbGJhY2tBcmdzKSA9PiB7XG4gICAgICAgICAgaWYgKGV4dGVuc2lvbkFQSXMucnVudGltZS5sYXN0RXJyb3IpIHtcbiAgICAgICAgICAgIHByb21pc2UucmVqZWN0KG5ldyBFcnJvcihleHRlbnNpb25BUElzLnJ1bnRpbWUubGFzdEVycm9yLm1lc3NhZ2UpKTtcbiAgICAgICAgICB9IGVsc2UgaWYgKG1ldGFkYXRhLnNpbmdsZUNhbGxiYWNrQXJnIHx8IGNhbGxiYWNrQXJncy5sZW5ndGggPD0gMSAmJiBtZXRhZGF0YS5zaW5nbGVDYWxsYmFja0FyZyAhPT0gZmFsc2UpIHtcbiAgICAgICAgICAgIHByb21pc2UucmVzb2x2ZShjYWxsYmFja0FyZ3NbMF0pO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBwcm9taXNlLnJlc29sdmUoY2FsbGJhY2tBcmdzKTtcbiAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICB9O1xuICAgICAgY29uc3QgcGx1cmFsaXplQXJndW1lbnRzID0gbnVtQXJncyA9PiBudW1BcmdzID09IDEgPyBcImFyZ3VtZW50XCIgOiBcImFyZ3VtZW50c1wiO1xuXG4gICAgICAvKipcbiAgICAgICAqIENyZWF0ZXMgYSB3cmFwcGVyIGZ1bmN0aW9uIGZvciBhIG1ldGhvZCB3aXRoIHRoZSBnaXZlbiBuYW1lIGFuZCBtZXRhZGF0YS5cbiAgICAgICAqXG4gICAgICAgKiBAcGFyYW0ge3N0cmluZ30gbmFtZVxuICAgICAgICogICAgICAgIFRoZSBuYW1lIG9mIHRoZSBtZXRob2Qgd2hpY2ggaXMgYmVpbmcgd3JhcHBlZC5cbiAgICAgICAqIEBwYXJhbSB7b2JqZWN0fSBtZXRhZGF0YVxuICAgICAgICogICAgICAgIE1ldGFkYXRhIGFib3V0IHRoZSBtZXRob2QgYmVpbmcgd3JhcHBlZC5cbiAgICAgICAqIEBwYXJhbSB7aW50ZWdlcn0gbWV0YWRhdGEubWluQXJnc1xuICAgICAgICogICAgICAgIFRoZSBtaW5pbXVtIG51bWJlciBvZiBhcmd1bWVudHMgd2hpY2ggbXVzdCBiZSBwYXNzZWQgdG8gdGhlXG4gICAgICAgKiAgICAgICAgZnVuY3Rpb24uIElmIGNhbGxlZCB3aXRoIGZld2VyIHRoYW4gdGhpcyBudW1iZXIgb2YgYXJndW1lbnRzLCB0aGVcbiAgICAgICAqICAgICAgICB3cmFwcGVyIHdpbGwgcmFpc2UgYW4gZXhjZXB0aW9uLlxuICAgICAgICogQHBhcmFtIHtpbnRlZ2VyfSBtZXRhZGF0YS5tYXhBcmdzXG4gICAgICAgKiAgICAgICAgVGhlIG1heGltdW0gbnVtYmVyIG9mIGFyZ3VtZW50cyB3aGljaCBtYXkgYmUgcGFzc2VkIHRvIHRoZVxuICAgICAgICogICAgICAgIGZ1bmN0aW9uLiBJZiBjYWxsZWQgd2l0aCBtb3JlIHRoYW4gdGhpcyBudW1iZXIgb2YgYXJndW1lbnRzLCB0aGVcbiAgICAgICAqICAgICAgICB3cmFwcGVyIHdpbGwgcmFpc2UgYW4gZXhjZXB0aW9uLlxuICAgICAgICogQHBhcmFtIHtib29sZWFufSBtZXRhZGF0YS5zaW5nbGVDYWxsYmFja0FyZ1xuICAgICAgICogICAgICAgIFdoZXRoZXIgb3Igbm90IHRoZSBwcm9taXNlIGlzIHJlc29sdmVkIHdpdGggb25seSB0aGUgZmlyc3RcbiAgICAgICAqICAgICAgICBhcmd1bWVudCBvZiB0aGUgY2FsbGJhY2ssIGFsdGVybmF0aXZlbHkgYW4gYXJyYXkgb2YgYWxsIHRoZVxuICAgICAgICogICAgICAgIGNhbGxiYWNrIGFyZ3VtZW50cyBpcyByZXNvbHZlZC4gQnkgZGVmYXVsdCwgaWYgdGhlIGNhbGxiYWNrXG4gICAgICAgKiAgICAgICAgZnVuY3Rpb24gaXMgaW52b2tlZCB3aXRoIG9ubHkgYSBzaW5nbGUgYXJndW1lbnQsIHRoYXQgd2lsbCBiZVxuICAgICAgICogICAgICAgIHJlc29sdmVkIHRvIHRoZSBwcm9taXNlLCB3aGlsZSBhbGwgYXJndW1lbnRzIHdpbGwgYmUgcmVzb2x2ZWQgYXNcbiAgICAgICAqICAgICAgICBhbiBhcnJheSBpZiBtdWx0aXBsZSBhcmUgZ2l2ZW4uXG4gICAgICAgKlxuICAgICAgICogQHJldHVybnMge2Z1bmN0aW9uKG9iamVjdCwgLi4uKil9XG4gICAgICAgKiAgICAgICBUaGUgZ2VuZXJhdGVkIHdyYXBwZXIgZnVuY3Rpb24uXG4gICAgICAgKi9cbiAgICAgIGNvbnN0IHdyYXBBc3luY0Z1bmN0aW9uID0gKG5hbWUsIG1ldGFkYXRhKSA9PiB7XG4gICAgICAgIHJldHVybiBmdW5jdGlvbiBhc3luY0Z1bmN0aW9uV3JhcHBlcih0YXJnZXQsIC4uLmFyZ3MpIHtcbiAgICAgICAgICBpZiAoYXJncy5sZW5ndGggPCBtZXRhZGF0YS5taW5BcmdzKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYEV4cGVjdGVkIGF0IGxlYXN0ICR7bWV0YWRhdGEubWluQXJnc30gJHtwbHVyYWxpemVBcmd1bWVudHMobWV0YWRhdGEubWluQXJncyl9IGZvciAke25hbWV9KCksIGdvdCAke2FyZ3MubGVuZ3RofWApO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAoYXJncy5sZW5ndGggPiBtZXRhZGF0YS5tYXhBcmdzKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYEV4cGVjdGVkIGF0IG1vc3QgJHttZXRhZGF0YS5tYXhBcmdzfSAke3BsdXJhbGl6ZUFyZ3VtZW50cyhtZXRhZGF0YS5tYXhBcmdzKX0gZm9yICR7bmFtZX0oKSwgZ290ICR7YXJncy5sZW5ndGh9YCk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgICAgICBpZiAobWV0YWRhdGEuZmFsbGJhY2tUb05vQ2FsbGJhY2spIHtcbiAgICAgICAgICAgICAgLy8gVGhpcyBBUEkgbWV0aG9kIGhhcyBjdXJyZW50bHkgbm8gY2FsbGJhY2sgb24gQ2hyb21lLCBidXQgaXQgcmV0dXJuIGEgcHJvbWlzZSBvbiBGaXJlZm94LFxuICAgICAgICAgICAgICAvLyBhbmQgc28gdGhlIHBvbHlmaWxsIHdpbGwgdHJ5IHRvIGNhbGwgaXQgd2l0aCBhIGNhbGxiYWNrIGZpcnN0LCBhbmQgaXQgd2lsbCBmYWxsYmFja1xuICAgICAgICAgICAgICAvLyB0byBub3QgcGFzc2luZyB0aGUgY2FsbGJhY2sgaWYgdGhlIGZpcnN0IGNhbGwgZmFpbHMuXG4gICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgdGFyZ2V0W25hbWVdKC4uLmFyZ3MsIG1ha2VDYWxsYmFjayh7XG4gICAgICAgICAgICAgICAgICByZXNvbHZlLFxuICAgICAgICAgICAgICAgICAgcmVqZWN0XG4gICAgICAgICAgICAgICAgfSwgbWV0YWRhdGEpKTtcbiAgICAgICAgICAgICAgfSBjYXRjaCAoY2JFcnJvcikge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUud2FybihgJHtuYW1lfSBBUEkgbWV0aG9kIGRvZXNuJ3Qgc2VlbSB0byBzdXBwb3J0IHRoZSBjYWxsYmFjayBwYXJhbWV0ZXIsIGAgKyBcImZhbGxpbmcgYmFjayB0byBjYWxsIGl0IHdpdGhvdXQgYSBjYWxsYmFjazogXCIsIGNiRXJyb3IpO1xuICAgICAgICAgICAgICAgIHRhcmdldFtuYW1lXSguLi5hcmdzKTtcblxuICAgICAgICAgICAgICAgIC8vIFVwZGF0ZSB0aGUgQVBJIG1ldGhvZCBtZXRhZGF0YSwgc28gdGhhdCB0aGUgbmV4dCBBUEkgY2FsbHMgd2lsbCBub3QgdHJ5IHRvXG4gICAgICAgICAgICAgICAgLy8gdXNlIHRoZSB1bnN1cHBvcnRlZCBjYWxsYmFjayBhbnltb3JlLlxuICAgICAgICAgICAgICAgIG1ldGFkYXRhLmZhbGxiYWNrVG9Ob0NhbGxiYWNrID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgbWV0YWRhdGEubm9DYWxsYmFjayA9IHRydWU7XG4gICAgICAgICAgICAgICAgcmVzb2x2ZSgpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2UgaWYgKG1ldGFkYXRhLm5vQ2FsbGJhY2spIHtcbiAgICAgICAgICAgICAgdGFyZ2V0W25hbWVdKC4uLmFyZ3MpO1xuICAgICAgICAgICAgICByZXNvbHZlKCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICB0YXJnZXRbbmFtZV0oLi4uYXJncywgbWFrZUNhbGxiYWNrKHtcbiAgICAgICAgICAgICAgICByZXNvbHZlLFxuICAgICAgICAgICAgICAgIHJlamVjdFxuICAgICAgICAgICAgICB9LCBtZXRhZGF0YSkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pO1xuICAgICAgICB9O1xuICAgICAgfTtcblxuICAgICAgLyoqXG4gICAgICAgKiBXcmFwcyBhbiBleGlzdGluZyBtZXRob2Qgb2YgdGhlIHRhcmdldCBvYmplY3QsIHNvIHRoYXQgY2FsbHMgdG8gaXQgYXJlXG4gICAgICAgKiBpbnRlcmNlcHRlZCBieSB0aGUgZ2l2ZW4gd3JhcHBlciBmdW5jdGlvbi4gVGhlIHdyYXBwZXIgZnVuY3Rpb24gcmVjZWl2ZXMsXG4gICAgICAgKiBhcyBpdHMgZmlyc3QgYXJndW1lbnQsIHRoZSBvcmlnaW5hbCBgdGFyZ2V0YCBvYmplY3QsIGZvbGxvd2VkIGJ5IGVhY2ggb2ZcbiAgICAgICAqIHRoZSBhcmd1bWVudHMgcGFzc2VkIHRvIHRoZSBvcmlnaW5hbCBtZXRob2QuXG4gICAgICAgKlxuICAgICAgICogQHBhcmFtIHtvYmplY3R9IHRhcmdldFxuICAgICAgICogICAgICAgIFRoZSBvcmlnaW5hbCB0YXJnZXQgb2JqZWN0IHRoYXQgdGhlIHdyYXBwZWQgbWV0aG9kIGJlbG9uZ3MgdG8uXG4gICAgICAgKiBAcGFyYW0ge2Z1bmN0aW9ufSBtZXRob2RcbiAgICAgICAqICAgICAgICBUaGUgbWV0aG9kIGJlaW5nIHdyYXBwZWQuIFRoaXMgaXMgdXNlZCBhcyB0aGUgdGFyZ2V0IG9mIHRoZSBQcm94eVxuICAgICAgICogICAgICAgIG9iamVjdCB3aGljaCBpcyBjcmVhdGVkIHRvIHdyYXAgdGhlIG1ldGhvZC5cbiAgICAgICAqIEBwYXJhbSB7ZnVuY3Rpb259IHdyYXBwZXJcbiAgICAgICAqICAgICAgICBUaGUgd3JhcHBlciBmdW5jdGlvbiB3aGljaCBpcyBjYWxsZWQgaW4gcGxhY2Ugb2YgYSBkaXJlY3QgaW52b2NhdGlvblxuICAgICAgICogICAgICAgIG9mIHRoZSB3cmFwcGVkIG1ldGhvZC5cbiAgICAgICAqXG4gICAgICAgKiBAcmV0dXJucyB7UHJveHk8ZnVuY3Rpb24+fVxuICAgICAgICogICAgICAgIEEgUHJveHkgb2JqZWN0IGZvciB0aGUgZ2l2ZW4gbWV0aG9kLCB3aGljaCBpbnZva2VzIHRoZSBnaXZlbiB3cmFwcGVyXG4gICAgICAgKiAgICAgICAgbWV0aG9kIGluIGl0cyBwbGFjZS5cbiAgICAgICAqL1xuICAgICAgY29uc3Qgd3JhcE1ldGhvZCA9ICh0YXJnZXQsIG1ldGhvZCwgd3JhcHBlcikgPT4ge1xuICAgICAgICByZXR1cm4gbmV3IFByb3h5KG1ldGhvZCwge1xuICAgICAgICAgIGFwcGx5KHRhcmdldE1ldGhvZCwgdGhpc09iaiwgYXJncykge1xuICAgICAgICAgICAgcmV0dXJuIHdyYXBwZXIuY2FsbCh0aGlzT2JqLCB0YXJnZXQsIC4uLmFyZ3MpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9O1xuICAgICAgbGV0IGhhc093blByb3BlcnR5ID0gRnVuY3Rpb24uY2FsbC5iaW5kKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkpO1xuXG4gICAgICAvKipcbiAgICAgICAqIFdyYXBzIGFuIG9iamVjdCBpbiBhIFByb3h5IHdoaWNoIGludGVyY2VwdHMgYW5kIHdyYXBzIGNlcnRhaW4gbWV0aG9kc1xuICAgICAgICogYmFzZWQgb24gdGhlIGdpdmVuIGB3cmFwcGVyc2AgYW5kIGBtZXRhZGF0YWAgb2JqZWN0cy5cbiAgICAgICAqXG4gICAgICAgKiBAcGFyYW0ge29iamVjdH0gdGFyZ2V0XG4gICAgICAgKiAgICAgICAgVGhlIHRhcmdldCBvYmplY3QgdG8gd3JhcC5cbiAgICAgICAqXG4gICAgICAgKiBAcGFyYW0ge29iamVjdH0gW3dyYXBwZXJzID0ge31dXG4gICAgICAgKiAgICAgICAgQW4gb2JqZWN0IHRyZWUgY29udGFpbmluZyB3cmFwcGVyIGZ1bmN0aW9ucyBmb3Igc3BlY2lhbCBjYXNlcy4gQW55XG4gICAgICAgKiAgICAgICAgZnVuY3Rpb24gcHJlc2VudCBpbiB0aGlzIG9iamVjdCB0cmVlIGlzIGNhbGxlZCBpbiBwbGFjZSBvZiB0aGVcbiAgICAgICAqICAgICAgICBtZXRob2QgaW4gdGhlIHNhbWUgbG9jYXRpb24gaW4gdGhlIGB0YXJnZXRgIG9iamVjdCB0cmVlLiBUaGVzZVxuICAgICAgICogICAgICAgIHdyYXBwZXIgbWV0aG9kcyBhcmUgaW52b2tlZCBhcyBkZXNjcmliZWQgaW4ge0BzZWUgd3JhcE1ldGhvZH0uXG4gICAgICAgKlxuICAgICAgICogQHBhcmFtIHtvYmplY3R9IFttZXRhZGF0YSA9IHt9XVxuICAgICAgICogICAgICAgIEFuIG9iamVjdCB0cmVlIGNvbnRhaW5pbmcgbWV0YWRhdGEgdXNlZCB0byBhdXRvbWF0aWNhbGx5IGdlbmVyYXRlXG4gICAgICAgKiAgICAgICAgUHJvbWlzZS1iYXNlZCB3cmFwcGVyIGZ1bmN0aW9ucyBmb3IgYXN5bmNocm9ub3VzLiBBbnkgZnVuY3Rpb24gaW5cbiAgICAgICAqICAgICAgICB0aGUgYHRhcmdldGAgb2JqZWN0IHRyZWUgd2hpY2ggaGFzIGEgY29ycmVzcG9uZGluZyBtZXRhZGF0YSBvYmplY3RcbiAgICAgICAqICAgICAgICBpbiB0aGUgc2FtZSBsb2NhdGlvbiBpbiB0aGUgYG1ldGFkYXRhYCB0cmVlIGlzIHJlcGxhY2VkIHdpdGggYW5cbiAgICAgICAqICAgICAgICBhdXRvbWF0aWNhbGx5LWdlbmVyYXRlZCB3cmFwcGVyIGZ1bmN0aW9uLCBhcyBkZXNjcmliZWQgaW5cbiAgICAgICAqICAgICAgICB7QHNlZSB3cmFwQXN5bmNGdW5jdGlvbn1cbiAgICAgICAqXG4gICAgICAgKiBAcmV0dXJucyB7UHJveHk8b2JqZWN0Pn1cbiAgICAgICAqL1xuICAgICAgY29uc3Qgd3JhcE9iamVjdCA9ICh0YXJnZXQsIHdyYXBwZXJzID0ge30sIG1ldGFkYXRhID0ge30pID0+IHtcbiAgICAgICAgbGV0IGNhY2hlID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiAgICAgICAgbGV0IGhhbmRsZXJzID0ge1xuICAgICAgICAgIGhhcyhwcm94eVRhcmdldCwgcHJvcCkge1xuICAgICAgICAgICAgcmV0dXJuIHByb3AgaW4gdGFyZ2V0IHx8IHByb3AgaW4gY2FjaGU7XG4gICAgICAgICAgfSxcbiAgICAgICAgICBnZXQocHJveHlUYXJnZXQsIHByb3AsIHJlY2VpdmVyKSB7XG4gICAgICAgICAgICBpZiAocHJvcCBpbiBjYWNoZSkge1xuICAgICAgICAgICAgICByZXR1cm4gY2FjaGVbcHJvcF07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoIShwcm9wIGluIHRhcmdldCkpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGxldCB2YWx1ZSA9IHRhcmdldFtwcm9wXTtcbiAgICAgICAgICAgIGlmICh0eXBlb2YgdmFsdWUgPT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgICAgICAgICAvLyBUaGlzIGlzIGEgbWV0aG9kIG9uIHRoZSB1bmRlcmx5aW5nIG9iamVjdC4gQ2hlY2sgaWYgd2UgbmVlZCB0byBkb1xuICAgICAgICAgICAgICAvLyBhbnkgd3JhcHBpbmcuXG5cbiAgICAgICAgICAgICAgaWYgKHR5cGVvZiB3cmFwcGVyc1twcm9wXSA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgICAgICAgICAgLy8gV2UgaGF2ZSBhIHNwZWNpYWwtY2FzZSB3cmFwcGVyIGZvciB0aGlzIG1ldGhvZC5cbiAgICAgICAgICAgICAgICB2YWx1ZSA9IHdyYXBNZXRob2QodGFyZ2V0LCB0YXJnZXRbcHJvcF0sIHdyYXBwZXJzW3Byb3BdKTtcbiAgICAgICAgICAgICAgfSBlbHNlIGlmIChoYXNPd25Qcm9wZXJ0eShtZXRhZGF0YSwgcHJvcCkpIHtcbiAgICAgICAgICAgICAgICAvLyBUaGlzIGlzIGFuIGFzeW5jIG1ldGhvZCB0aGF0IHdlIGhhdmUgbWV0YWRhdGEgZm9yLiBDcmVhdGUgYVxuICAgICAgICAgICAgICAgIC8vIFByb21pc2Ugd3JhcHBlciBmb3IgaXQuXG4gICAgICAgICAgICAgICAgbGV0IHdyYXBwZXIgPSB3cmFwQXN5bmNGdW5jdGlvbihwcm9wLCBtZXRhZGF0YVtwcm9wXSk7XG4gICAgICAgICAgICAgICAgdmFsdWUgPSB3cmFwTWV0aG9kKHRhcmdldCwgdGFyZ2V0W3Byb3BdLCB3cmFwcGVyKTtcbiAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAvLyBUaGlzIGlzIGEgbWV0aG9kIHRoYXQgd2UgZG9uJ3Qga25vdyBvciBjYXJlIGFib3V0LiBSZXR1cm4gdGhlXG4gICAgICAgICAgICAgICAgLy8gb3JpZ2luYWwgbWV0aG9kLCBib3VuZCB0byB0aGUgdW5kZXJseWluZyBvYmplY3QuXG4gICAgICAgICAgICAgICAgdmFsdWUgPSB2YWx1ZS5iaW5kKHRhcmdldCk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSBpZiAodHlwZW9mIHZhbHVlID09PSBcIm9iamVjdFwiICYmIHZhbHVlICE9PSBudWxsICYmIChoYXNPd25Qcm9wZXJ0eSh3cmFwcGVycywgcHJvcCkgfHwgaGFzT3duUHJvcGVydHkobWV0YWRhdGEsIHByb3ApKSkge1xuICAgICAgICAgICAgICAvLyBUaGlzIGlzIGFuIG9iamVjdCB0aGF0IHdlIG5lZWQgdG8gZG8gc29tZSB3cmFwcGluZyBmb3IgdGhlIGNoaWxkcmVuXG4gICAgICAgICAgICAgIC8vIG9mLiBDcmVhdGUgYSBzdWItb2JqZWN0IHdyYXBwZXIgZm9yIGl0IHdpdGggdGhlIGFwcHJvcHJpYXRlIGNoaWxkXG4gICAgICAgICAgICAgIC8vIG1ldGFkYXRhLlxuICAgICAgICAgICAgICB2YWx1ZSA9IHdyYXBPYmplY3QodmFsdWUsIHdyYXBwZXJzW3Byb3BdLCBtZXRhZGF0YVtwcm9wXSk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKGhhc093blByb3BlcnR5KG1ldGFkYXRhLCBcIipcIikpIHtcbiAgICAgICAgICAgICAgLy8gV3JhcCBhbGwgcHJvcGVydGllcyBpbiAqIG5hbWVzcGFjZS5cbiAgICAgICAgICAgICAgdmFsdWUgPSB3cmFwT2JqZWN0KHZhbHVlLCB3cmFwcGVyc1twcm9wXSwgbWV0YWRhdGFbXCIqXCJdKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIC8vIFdlIGRvbid0IG5lZWQgdG8gZG8gYW55IHdyYXBwaW5nIGZvciB0aGlzIHByb3BlcnR5LFxuICAgICAgICAgICAgICAvLyBzbyBqdXN0IGZvcndhcmQgYWxsIGFjY2VzcyB0byB0aGUgdW5kZXJseWluZyBvYmplY3QuXG4gICAgICAgICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShjYWNoZSwgcHJvcCwge1xuICAgICAgICAgICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICAgICAgICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICAgICAgICAgIGdldCgpIHtcbiAgICAgICAgICAgICAgICAgIHJldHVybiB0YXJnZXRbcHJvcF07XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBzZXQodmFsdWUpIHtcbiAgICAgICAgICAgICAgICAgIHRhcmdldFtwcm9wXSA9IHZhbHVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNhY2hlW3Byb3BdID0gdmFsdWU7XG4gICAgICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgICAgICAgfSxcbiAgICAgICAgICBzZXQocHJveHlUYXJnZXQsIHByb3AsIHZhbHVlLCByZWNlaXZlcikge1xuICAgICAgICAgICAgaWYgKHByb3AgaW4gY2FjaGUpIHtcbiAgICAgICAgICAgICAgY2FjaGVbcHJvcF0gPSB2YWx1ZTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIHRhcmdldFtwcm9wXSA9IHZhbHVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgfSxcbiAgICAgICAgICBkZWZpbmVQcm9wZXJ0eShwcm94eVRhcmdldCwgcHJvcCwgZGVzYykge1xuICAgICAgICAgICAgcmV0dXJuIFJlZmxlY3QuZGVmaW5lUHJvcGVydHkoY2FjaGUsIHByb3AsIGRlc2MpO1xuICAgICAgICAgIH0sXG4gICAgICAgICAgZGVsZXRlUHJvcGVydHkocHJveHlUYXJnZXQsIHByb3ApIHtcbiAgICAgICAgICAgIHJldHVybiBSZWZsZWN0LmRlbGV0ZVByb3BlcnR5KGNhY2hlLCBwcm9wKTtcbiAgICAgICAgICB9XG4gICAgICAgIH07XG5cbiAgICAgICAgLy8gUGVyIGNvbnRyYWN0IG9mIHRoZSBQcm94eSBBUEksIHRoZSBcImdldFwiIHByb3h5IGhhbmRsZXIgbXVzdCByZXR1cm4gdGhlXG4gICAgICAgIC8vIG9yaWdpbmFsIHZhbHVlIG9mIHRoZSB0YXJnZXQgaWYgdGhhdCB2YWx1ZSBpcyBkZWNsYXJlZCByZWFkLW9ubHkgYW5kXG4gICAgICAgIC8vIG5vbi1jb25maWd1cmFibGUuIEZvciB0aGlzIHJlYXNvbiwgd2UgY3JlYXRlIGFuIG9iamVjdCB3aXRoIHRoZVxuICAgICAgICAvLyBwcm90b3R5cGUgc2V0IHRvIGB0YXJnZXRgIGluc3RlYWQgb2YgdXNpbmcgYHRhcmdldGAgZGlyZWN0bHkuXG4gICAgICAgIC8vIE90aGVyd2lzZSB3ZSBjYW5ub3QgcmV0dXJuIGEgY3VzdG9tIG9iamVjdCBmb3IgQVBJcyB0aGF0XG4gICAgICAgIC8vIGFyZSBkZWNsYXJlZCByZWFkLW9ubHkgYW5kIG5vbi1jb25maWd1cmFibGUsIHN1Y2ggYXMgYGNocm9tZS5kZXZ0b29sc2AuXG4gICAgICAgIC8vXG4gICAgICAgIC8vIFRoZSBwcm94eSBoYW5kbGVycyB0aGVtc2VsdmVzIHdpbGwgc3RpbGwgdXNlIHRoZSBvcmlnaW5hbCBgdGFyZ2V0YFxuICAgICAgICAvLyBpbnN0ZWFkIG9mIHRoZSBgcHJveHlUYXJnZXRgLCBzbyB0aGF0IHRoZSBtZXRob2RzIGFuZCBwcm9wZXJ0aWVzIGFyZVxuICAgICAgICAvLyBkZXJlZmVyZW5jZWQgdmlhIHRoZSBvcmlnaW5hbCB0YXJnZXRzLlxuICAgICAgICBsZXQgcHJveHlUYXJnZXQgPSBPYmplY3QuY3JlYXRlKHRhcmdldCk7XG4gICAgICAgIHJldHVybiBuZXcgUHJveHkocHJveHlUYXJnZXQsIGhhbmRsZXJzKTtcbiAgICAgIH07XG5cbiAgICAgIC8qKlxuICAgICAgICogQ3JlYXRlcyBhIHNldCBvZiB3cmFwcGVyIGZ1bmN0aW9ucyBmb3IgYW4gZXZlbnQgb2JqZWN0LCB3aGljaCBoYW5kbGVzXG4gICAgICAgKiB3cmFwcGluZyBvZiBsaXN0ZW5lciBmdW5jdGlvbnMgdGhhdCB0aG9zZSBtZXNzYWdlcyBhcmUgcGFzc2VkLlxuICAgICAgICpcbiAgICAgICAqIEEgc2luZ2xlIHdyYXBwZXIgaXMgY3JlYXRlZCBmb3IgZWFjaCBsaXN0ZW5lciBmdW5jdGlvbiwgYW5kIHN0b3JlZCBpbiBhXG4gICAgICAgKiBtYXAuIFN1YnNlcXVlbnQgY2FsbHMgdG8gYGFkZExpc3RlbmVyYCwgYGhhc0xpc3RlbmVyYCwgb3IgYHJlbW92ZUxpc3RlbmVyYFxuICAgICAgICogcmV0cmlldmUgdGhlIG9yaWdpbmFsIHdyYXBwZXIsIHNvIHRoYXQgIGF0dGVtcHRzIHRvIHJlbW92ZSBhXG4gICAgICAgKiBwcmV2aW91c2x5LWFkZGVkIGxpc3RlbmVyIHdvcmsgYXMgZXhwZWN0ZWQuXG4gICAgICAgKlxuICAgICAgICogQHBhcmFtIHtEZWZhdWx0V2Vha01hcDxmdW5jdGlvbiwgZnVuY3Rpb24+fSB3cmFwcGVyTWFwXG4gICAgICAgKiAgICAgICAgQSBEZWZhdWx0V2Vha01hcCBvYmplY3Qgd2hpY2ggd2lsbCBjcmVhdGUgdGhlIGFwcHJvcHJpYXRlIHdyYXBwZXJcbiAgICAgICAqICAgICAgICBmb3IgYSBnaXZlbiBsaXN0ZW5lciBmdW5jdGlvbiB3aGVuIG9uZSBkb2VzIG5vdCBleGlzdCwgYW5kIHJldHJpZXZlXG4gICAgICAgKiAgICAgICAgYW4gZXhpc3Rpbmcgb25lIHdoZW4gaXQgZG9lcy5cbiAgICAgICAqXG4gICAgICAgKiBAcmV0dXJucyB7b2JqZWN0fVxuICAgICAgICovXG4gICAgICBjb25zdCB3cmFwRXZlbnQgPSB3cmFwcGVyTWFwID0+ICh7XG4gICAgICAgIGFkZExpc3RlbmVyKHRhcmdldCwgbGlzdGVuZXIsIC4uLmFyZ3MpIHtcbiAgICAgICAgICB0YXJnZXQuYWRkTGlzdGVuZXIod3JhcHBlck1hcC5nZXQobGlzdGVuZXIpLCAuLi5hcmdzKTtcbiAgICAgICAgfSxcbiAgICAgICAgaGFzTGlzdGVuZXIodGFyZ2V0LCBsaXN0ZW5lcikge1xuICAgICAgICAgIHJldHVybiB0YXJnZXQuaGFzTGlzdGVuZXIod3JhcHBlck1hcC5nZXQobGlzdGVuZXIpKTtcbiAgICAgICAgfSxcbiAgICAgICAgcmVtb3ZlTGlzdGVuZXIodGFyZ2V0LCBsaXN0ZW5lcikge1xuICAgICAgICAgIHRhcmdldC5yZW1vdmVMaXN0ZW5lcih3cmFwcGVyTWFwLmdldChsaXN0ZW5lcikpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICAgIGNvbnN0IG9uUmVxdWVzdEZpbmlzaGVkV3JhcHBlcnMgPSBuZXcgRGVmYXVsdFdlYWtNYXAobGlzdGVuZXIgPT4ge1xuICAgICAgICBpZiAodHlwZW9mIGxpc3RlbmVyICE9PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgICByZXR1cm4gbGlzdGVuZXI7XG4gICAgICAgIH1cblxuICAgICAgICAvKipcbiAgICAgICAgICogV3JhcHMgYW4gb25SZXF1ZXN0RmluaXNoZWQgbGlzdGVuZXIgZnVuY3Rpb24gc28gdGhhdCBpdCB3aWxsIHJldHVybiBhXG4gICAgICAgICAqIGBnZXRDb250ZW50KClgIHByb3BlcnR5IHdoaWNoIHJldHVybnMgYSBgUHJvbWlzZWAgcmF0aGVyIHRoYW4gdXNpbmcgYVxuICAgICAgICAgKiBjYWxsYmFjayBBUEkuXG4gICAgICAgICAqXG4gICAgICAgICAqIEBwYXJhbSB7b2JqZWN0fSByZXFcbiAgICAgICAgICogICAgICAgIFRoZSBIQVIgZW50cnkgb2JqZWN0IHJlcHJlc2VudGluZyB0aGUgbmV0d29yayByZXF1ZXN0LlxuICAgICAgICAgKi9cbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIG9uUmVxdWVzdEZpbmlzaGVkKHJlcSkge1xuICAgICAgICAgIGNvbnN0IHdyYXBwZWRSZXEgPSB3cmFwT2JqZWN0KHJlcSwge30gLyogd3JhcHBlcnMgKi8sIHtcbiAgICAgICAgICAgIGdldENvbnRlbnQ6IHtcbiAgICAgICAgICAgICAgbWluQXJnczogMCxcbiAgICAgICAgICAgICAgbWF4QXJnczogMFxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pO1xuICAgICAgICAgIGxpc3RlbmVyKHdyYXBwZWRSZXEpO1xuICAgICAgICB9O1xuICAgICAgfSk7XG4gICAgICBjb25zdCBvbk1lc3NhZ2VXcmFwcGVycyA9IG5ldyBEZWZhdWx0V2Vha01hcChsaXN0ZW5lciA9PiB7XG4gICAgICAgIGlmICh0eXBlb2YgbGlzdGVuZXIgIT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgICAgIHJldHVybiBsaXN0ZW5lcjtcbiAgICAgICAgfVxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBXcmFwcyBhIG1lc3NhZ2UgbGlzdGVuZXIgZnVuY3Rpb24gc28gdGhhdCBpdCBtYXkgc2VuZCByZXNwb25zZXMgYmFzZWQgb25cbiAgICAgICAgICogaXRzIHJldHVybiB2YWx1ZSwgcmF0aGVyIHRoYW4gYnkgcmV0dXJuaW5nIGEgc2VudGluZWwgdmFsdWUgYW5kIGNhbGxpbmcgYVxuICAgICAgICAgKiBjYWxsYmFjay4gSWYgdGhlIGxpc3RlbmVyIGZ1bmN0aW9uIHJldHVybnMgYSBQcm9taXNlLCB0aGUgcmVzcG9uc2UgaXNcbiAgICAgICAgICogc2VudCB3aGVuIHRoZSBwcm9taXNlIGVpdGhlciByZXNvbHZlcyBvciByZWplY3RzLlxuICAgICAgICAgKlxuICAgICAgICAgKiBAcGFyYW0geyp9IG1lc3NhZ2VcbiAgICAgICAgICogICAgICAgIFRoZSBtZXNzYWdlIHNlbnQgYnkgdGhlIG90aGVyIGVuZCBvZiB0aGUgY2hhbm5lbC5cbiAgICAgICAgICogQHBhcmFtIHtvYmplY3R9IHNlbmRlclxuICAgICAgICAgKiAgICAgICAgRGV0YWlscyBhYm91dCB0aGUgc2VuZGVyIG9mIHRoZSBtZXNzYWdlLlxuICAgICAgICAgKiBAcGFyYW0ge2Z1bmN0aW9uKCopfSBzZW5kUmVzcG9uc2VcbiAgICAgICAgICogICAgICAgIEEgY2FsbGJhY2sgd2hpY2gsIHdoZW4gY2FsbGVkIHdpdGggYW4gYXJiaXRyYXJ5IGFyZ3VtZW50LCBzZW5kc1xuICAgICAgICAgKiAgICAgICAgdGhhdCB2YWx1ZSBhcyBhIHJlc3BvbnNlLlxuICAgICAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAgICAgICAgICogICAgICAgIFRydWUgaWYgdGhlIHdyYXBwZWQgbGlzdGVuZXIgcmV0dXJuZWQgYSBQcm9taXNlLCB3aGljaCB3aWxsIGxhdGVyXG4gICAgICAgICAqICAgICAgICB5aWVsZCBhIHJlc3BvbnNlLiBGYWxzZSBvdGhlcndpc2UuXG4gICAgICAgICAqL1xuICAgICAgICByZXR1cm4gZnVuY3Rpb24gb25NZXNzYWdlKG1lc3NhZ2UsIHNlbmRlciwgc2VuZFJlc3BvbnNlKSB7XG4gICAgICAgICAgbGV0IGRpZENhbGxTZW5kUmVzcG9uc2UgPSBmYWxzZTtcbiAgICAgICAgICBsZXQgd3JhcHBlZFNlbmRSZXNwb25zZTtcbiAgICAgICAgICBsZXQgc2VuZFJlc3BvbnNlUHJvbWlzZSA9IG5ldyBQcm9taXNlKHJlc29sdmUgPT4ge1xuICAgICAgICAgICAgd3JhcHBlZFNlbmRSZXNwb25zZSA9IGZ1bmN0aW9uIChyZXNwb25zZSkge1xuICAgICAgICAgICAgICBkaWRDYWxsU2VuZFJlc3BvbnNlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgcmVzb2x2ZShyZXNwb25zZSk7XG4gICAgICAgICAgICB9O1xuICAgICAgICAgIH0pO1xuICAgICAgICAgIGxldCByZXN1bHQ7XG4gICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIHJlc3VsdCA9IGxpc3RlbmVyKG1lc3NhZ2UsIHNlbmRlciwgd3JhcHBlZFNlbmRSZXNwb25zZSk7XG4gICAgICAgICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgICAgICByZXN1bHQgPSBQcm9taXNlLnJlamVjdChlcnIpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBjb25zdCBpc1Jlc3VsdFRoZW5hYmxlID0gcmVzdWx0ICE9PSB0cnVlICYmIGlzVGhlbmFibGUocmVzdWx0KTtcblxuICAgICAgICAgIC8vIElmIHRoZSBsaXN0ZW5lciBkaWRuJ3QgcmV0dXJuZWQgdHJ1ZSBvciBhIFByb21pc2UsIG9yIGNhbGxlZFxuICAgICAgICAgIC8vIHdyYXBwZWRTZW5kUmVzcG9uc2Ugc3luY2hyb25vdXNseSwgd2UgY2FuIGV4aXQgZWFybGllclxuICAgICAgICAgIC8vIGJlY2F1c2UgdGhlcmUgd2lsbCBiZSBubyByZXNwb25zZSBzZW50IGZyb20gdGhpcyBsaXN0ZW5lci5cbiAgICAgICAgICBpZiAocmVzdWx0ICE9PSB0cnVlICYmICFpc1Jlc3VsdFRoZW5hYmxlICYmICFkaWRDYWxsU2VuZFJlc3BvbnNlKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgLy8gQSBzbWFsbCBoZWxwZXIgdG8gc2VuZCB0aGUgbWVzc2FnZSBpZiB0aGUgcHJvbWlzZSByZXNvbHZlc1xuICAgICAgICAgIC8vIGFuZCBhbiBlcnJvciBpZiB0aGUgcHJvbWlzZSByZWplY3RzIChhIHdyYXBwZWQgc2VuZE1lc3NhZ2UgaGFzXG4gICAgICAgICAgLy8gdG8gdHJhbnNsYXRlIHRoZSBtZXNzYWdlIGludG8gYSByZXNvbHZlZCBwcm9taXNlIG9yIGEgcmVqZWN0ZWRcbiAgICAgICAgICAvLyBwcm9taXNlKS5cbiAgICAgICAgICBjb25zdCBzZW5kUHJvbWlzZWRSZXN1bHQgPSBwcm9taXNlID0+IHtcbiAgICAgICAgICAgIHByb21pc2UudGhlbihtc2cgPT4ge1xuICAgICAgICAgICAgICAvLyBzZW5kIHRoZSBtZXNzYWdlIHZhbHVlLlxuICAgICAgICAgICAgICBzZW5kUmVzcG9uc2UobXNnKTtcbiAgICAgICAgICAgIH0sIGVycm9yID0+IHtcbiAgICAgICAgICAgICAgLy8gU2VuZCBhIEpTT04gcmVwcmVzZW50YXRpb24gb2YgdGhlIGVycm9yIGlmIHRoZSByZWplY3RlZCB2YWx1ZVxuICAgICAgICAgICAgICAvLyBpcyBhbiBpbnN0YW5jZSBvZiBlcnJvciwgb3IgdGhlIG9iamVjdCBpdHNlbGYgb3RoZXJ3aXNlLlxuICAgICAgICAgICAgICBsZXQgbWVzc2FnZTtcbiAgICAgICAgICAgICAgaWYgKGVycm9yICYmIChlcnJvciBpbnN0YW5jZW9mIEVycm9yIHx8IHR5cGVvZiBlcnJvci5tZXNzYWdlID09PSBcInN0cmluZ1wiKSkge1xuICAgICAgICAgICAgICAgIG1lc3NhZ2UgPSBlcnJvci5tZXNzYWdlO1xuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIG1lc3NhZ2UgPSBcIkFuIHVuZXhwZWN0ZWQgZXJyb3Igb2NjdXJyZWRcIjtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBzZW5kUmVzcG9uc2Uoe1xuICAgICAgICAgICAgICAgIF9fbW96V2ViRXh0ZW5zaW9uUG9seWZpbGxSZWplY3RfXzogdHJ1ZSxcbiAgICAgICAgICAgICAgICBtZXNzYWdlXG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSkuY2F0Y2goZXJyID0+IHtcbiAgICAgICAgICAgICAgLy8gUHJpbnQgYW4gZXJyb3Igb24gdGhlIGNvbnNvbGUgaWYgdW5hYmxlIHRvIHNlbmQgdGhlIHJlc3BvbnNlLlxuICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKFwiRmFpbGVkIHRvIHNlbmQgb25NZXNzYWdlIHJlamVjdGVkIHJlcGx5XCIsIGVycik7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9O1xuXG4gICAgICAgICAgLy8gSWYgdGhlIGxpc3RlbmVyIHJldHVybmVkIGEgUHJvbWlzZSwgc2VuZCB0aGUgcmVzb2x2ZWQgdmFsdWUgYXMgYVxuICAgICAgICAgIC8vIHJlc3VsdCwgb3RoZXJ3aXNlIHdhaXQgdGhlIHByb21pc2UgcmVsYXRlZCB0byB0aGUgd3JhcHBlZFNlbmRSZXNwb25zZVxuICAgICAgICAgIC8vIGNhbGxiYWNrIHRvIHJlc29sdmUgYW5kIHNlbmQgaXQgYXMgYSByZXNwb25zZS5cbiAgICAgICAgICBpZiAoaXNSZXN1bHRUaGVuYWJsZSkge1xuICAgICAgICAgICAgc2VuZFByb21pc2VkUmVzdWx0KHJlc3VsdCk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHNlbmRQcm9taXNlZFJlc3VsdChzZW5kUmVzcG9uc2VQcm9taXNlKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICAvLyBMZXQgQ2hyb21lIGtub3cgdGhhdCB0aGUgbGlzdGVuZXIgaXMgcmVwbHlpbmcuXG4gICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH07XG4gICAgICB9KTtcbiAgICAgIGNvbnN0IHdyYXBwZWRTZW5kTWVzc2FnZUNhbGxiYWNrID0gKHtcbiAgICAgICAgcmVqZWN0LFxuICAgICAgICByZXNvbHZlXG4gICAgICB9LCByZXBseSkgPT4ge1xuICAgICAgICBpZiAoZXh0ZW5zaW9uQVBJcy5ydW50aW1lLmxhc3RFcnJvcikge1xuICAgICAgICAgIC8vIERldGVjdCB3aGVuIG5vbmUgb2YgdGhlIGxpc3RlbmVycyByZXBsaWVkIHRvIHRoZSBzZW5kTWVzc2FnZSBjYWxsIGFuZCByZXNvbHZlXG4gICAgICAgICAgLy8gdGhlIHByb21pc2UgdG8gdW5kZWZpbmVkIGFzIGluIEZpcmVmb3guXG4gICAgICAgICAgLy8gU2VlIGh0dHBzOi8vZ2l0aHViLmNvbS9tb3ppbGxhL3dlYmV4dGVuc2lvbi1wb2x5ZmlsbC9pc3N1ZXMvMTMwXG4gICAgICAgICAgaWYgKGV4dGVuc2lvbkFQSXMucnVudGltZS5sYXN0RXJyb3IubWVzc2FnZSA9PT0gQ0hST01FX1NFTkRfTUVTU0FHRV9DQUxMQkFDS19OT19SRVNQT05TRV9NRVNTQUdFKSB7XG4gICAgICAgICAgICByZXNvbHZlKCk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJlamVjdChuZXcgRXJyb3IoZXh0ZW5zaW9uQVBJcy5ydW50aW1lLmxhc3RFcnJvci5tZXNzYWdlKSk7XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2UgaWYgKHJlcGx5ICYmIHJlcGx5Ll9fbW96V2ViRXh0ZW5zaW9uUG9seWZpbGxSZWplY3RfXykge1xuICAgICAgICAgIC8vIENvbnZlcnQgYmFjayB0aGUgSlNPTiByZXByZXNlbnRhdGlvbiBvZiB0aGUgZXJyb3IgaW50b1xuICAgICAgICAgIC8vIGFuIEVycm9yIGluc3RhbmNlLlxuICAgICAgICAgIHJlamVjdChuZXcgRXJyb3IocmVwbHkubWVzc2FnZSkpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJlc29sdmUocmVwbHkpO1xuICAgICAgICB9XG4gICAgICB9O1xuICAgICAgY29uc3Qgd3JhcHBlZFNlbmRNZXNzYWdlID0gKG5hbWUsIG1ldGFkYXRhLCBhcGlOYW1lc3BhY2VPYmosIC4uLmFyZ3MpID0+IHtcbiAgICAgICAgaWYgKGFyZ3MubGVuZ3RoIDwgbWV0YWRhdGEubWluQXJncykge1xuICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgRXhwZWN0ZWQgYXQgbGVhc3QgJHttZXRhZGF0YS5taW5BcmdzfSAke3BsdXJhbGl6ZUFyZ3VtZW50cyhtZXRhZGF0YS5taW5BcmdzKX0gZm9yICR7bmFtZX0oKSwgZ290ICR7YXJncy5sZW5ndGh9YCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGFyZ3MubGVuZ3RoID4gbWV0YWRhdGEubWF4QXJncykge1xuICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgRXhwZWN0ZWQgYXQgbW9zdCAke21ldGFkYXRhLm1heEFyZ3N9ICR7cGx1cmFsaXplQXJndW1lbnRzKG1ldGFkYXRhLm1heEFyZ3MpfSBmb3IgJHtuYW1lfSgpLCBnb3QgJHthcmdzLmxlbmd0aH1gKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAgIGNvbnN0IHdyYXBwZWRDYiA9IHdyYXBwZWRTZW5kTWVzc2FnZUNhbGxiYWNrLmJpbmQobnVsbCwge1xuICAgICAgICAgICAgcmVzb2x2ZSxcbiAgICAgICAgICAgIHJlamVjdFxuICAgICAgICAgIH0pO1xuICAgICAgICAgIGFyZ3MucHVzaCh3cmFwcGVkQ2IpO1xuICAgICAgICAgIGFwaU5hbWVzcGFjZU9iai5zZW5kTWVzc2FnZSguLi5hcmdzKTtcbiAgICAgICAgfSk7XG4gICAgICB9O1xuICAgICAgY29uc3Qgc3RhdGljV3JhcHBlcnMgPSB7XG4gICAgICAgIGRldnRvb2xzOiB7XG4gICAgICAgICAgbmV0d29yazoge1xuICAgICAgICAgICAgb25SZXF1ZXN0RmluaXNoZWQ6IHdyYXBFdmVudChvblJlcXVlc3RGaW5pc2hlZFdyYXBwZXJzKVxuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgcnVudGltZToge1xuICAgICAgICAgIG9uTWVzc2FnZTogd3JhcEV2ZW50KG9uTWVzc2FnZVdyYXBwZXJzKSxcbiAgICAgICAgICBvbk1lc3NhZ2VFeHRlcm5hbDogd3JhcEV2ZW50KG9uTWVzc2FnZVdyYXBwZXJzKSxcbiAgICAgICAgICBzZW5kTWVzc2FnZTogd3JhcHBlZFNlbmRNZXNzYWdlLmJpbmQobnVsbCwgXCJzZW5kTWVzc2FnZVwiLCB7XG4gICAgICAgICAgICBtaW5BcmdzOiAxLFxuICAgICAgICAgICAgbWF4QXJnczogM1xuICAgICAgICAgIH0pXG4gICAgICAgIH0sXG4gICAgICAgIHRhYnM6IHtcbiAgICAgICAgICBzZW5kTWVzc2FnZTogd3JhcHBlZFNlbmRNZXNzYWdlLmJpbmQobnVsbCwgXCJzZW5kTWVzc2FnZVwiLCB7XG4gICAgICAgICAgICBtaW5BcmdzOiAyLFxuICAgICAgICAgICAgbWF4QXJnczogM1xuICAgICAgICAgIH0pXG4gICAgICAgIH1cbiAgICAgIH07XG4gICAgICBjb25zdCBzZXR0aW5nTWV0YWRhdGEgPSB7XG4gICAgICAgIGNsZWFyOiB7XG4gICAgICAgICAgbWluQXJnczogMSxcbiAgICAgICAgICBtYXhBcmdzOiAxXG4gICAgICAgIH0sXG4gICAgICAgIGdldDoge1xuICAgICAgICAgIG1pbkFyZ3M6IDEsXG4gICAgICAgICAgbWF4QXJnczogMVxuICAgICAgICB9LFxuICAgICAgICBzZXQ6IHtcbiAgICAgICAgICBtaW5BcmdzOiAxLFxuICAgICAgICAgIG1heEFyZ3M6IDFcbiAgICAgICAgfVxuICAgICAgfTtcbiAgICAgIGFwaU1ldGFkYXRhLnByaXZhY3kgPSB7XG4gICAgICAgIG5ldHdvcms6IHtcbiAgICAgICAgICBcIipcIjogc2V0dGluZ01ldGFkYXRhXG4gICAgICAgIH0sXG4gICAgICAgIHNlcnZpY2VzOiB7XG4gICAgICAgICAgXCIqXCI6IHNldHRpbmdNZXRhZGF0YVxuICAgICAgICB9LFxuICAgICAgICB3ZWJzaXRlczoge1xuICAgICAgICAgIFwiKlwiOiBzZXR0aW5nTWV0YWRhdGFcbiAgICAgICAgfVxuICAgICAgfTtcbiAgICAgIHJldHVybiB3cmFwT2JqZWN0KGV4dGVuc2lvbkFQSXMsIHN0YXRpY1dyYXBwZXJzLCBhcGlNZXRhZGF0YSk7XG4gICAgfTtcblxuICAgIC8vIFRoZSBidWlsZCBwcm9jZXNzIGFkZHMgYSBVTUQgd3JhcHBlciBhcm91bmQgdGhpcyBmaWxlLCB3aGljaCBtYWtlcyB0aGVcbiAgICAvLyBgbW9kdWxlYCB2YXJpYWJsZSBhdmFpbGFibGUuXG4gICAgbW9kdWxlLmV4cG9ydHMgPSB3cmFwQVBJcyhjaHJvbWUpO1xuICB9IGVsc2Uge1xuICAgIG1vZHVsZS5leHBvcnRzID0gZ2xvYmFsVGhpcy5icm93c2VyO1xuICB9XG59KTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWJyb3dzZXItcG9seWZpbGwuanMubWFwXG4iLCJpbXBvcnQgb3JpZ2luYWxCcm93c2VyIGZyb20gXCJ3ZWJleHRlbnNpb24tcG9seWZpbGxcIjtcbmV4cG9ydCBjb25zdCBicm93c2VyID0gb3JpZ2luYWxCcm93c2VyO1xuIiwiZnVuY3Rpb24gcHJpbnQobWV0aG9kLCAuLi5hcmdzKSB7XG4gIGlmIChpbXBvcnQubWV0YS5lbnYuTU9ERSA9PT0gXCJwcm9kdWN0aW9uXCIpIHJldHVybjtcbiAgaWYgKHR5cGVvZiBhcmdzWzBdID09PSBcInN0cmluZ1wiKSB7XG4gICAgY29uc3QgbWVzc2FnZSA9IGFyZ3Muc2hpZnQoKTtcbiAgICBtZXRob2QoYFt3eHRdICR7bWVzc2FnZX1gLCAuLi5hcmdzKTtcbiAgfSBlbHNlIHtcbiAgICBtZXRob2QoXCJbd3h0XVwiLCAuLi5hcmdzKTtcbiAgfVxufVxuZXhwb3J0IGNvbnN0IGxvZ2dlciA9IHtcbiAgZGVidWc6ICguLi5hcmdzKSA9PiBwcmludChjb25zb2xlLmRlYnVnLCAuLi5hcmdzKSxcbiAgbG9nOiAoLi4uYXJncykgPT4gcHJpbnQoY29uc29sZS5sb2csIC4uLmFyZ3MpLFxuICB3YXJuOiAoLi4uYXJncykgPT4gcHJpbnQoY29uc29sZS53YXJuLCAuLi5hcmdzKSxcbiAgZXJyb3I6ICguLi5hcmdzKSA9PiBwcmludChjb25zb2xlLmVycm9yLCAuLi5hcmdzKVxufTtcbiIsImltcG9ydCB7IGJyb3dzZXIgfSBmcm9tIFwid3h0L2Jyb3dzZXJcIjtcbmV4cG9ydCBjbGFzcyBXeHRMb2NhdGlvbkNoYW5nZUV2ZW50IGV4dGVuZHMgRXZlbnQge1xuICBjb25zdHJ1Y3RvcihuZXdVcmwsIG9sZFVybCkge1xuICAgIHN1cGVyKFd4dExvY2F0aW9uQ2hhbmdlRXZlbnQuRVZFTlRfTkFNRSwge30pO1xuICAgIHRoaXMubmV3VXJsID0gbmV3VXJsO1xuICAgIHRoaXMub2xkVXJsID0gb2xkVXJsO1xuICB9XG4gIHN0YXRpYyBFVkVOVF9OQU1FID0gZ2V0VW5pcXVlRXZlbnROYW1lKFwid3h0OmxvY2F0aW9uY2hhbmdlXCIpO1xufVxuZXhwb3J0IGZ1bmN0aW9uIGdldFVuaXF1ZUV2ZW50TmFtZShldmVudE5hbWUpIHtcbiAgcmV0dXJuIGAke2Jyb3dzZXI/LnJ1bnRpbWU/LmlkfToke2ltcG9ydC5tZXRhLmVudi5FTlRSWVBPSU5UfToke2V2ZW50TmFtZX1gO1xufVxuIiwiaW1wb3J0IHsgV3h0TG9jYXRpb25DaGFuZ2VFdmVudCB9IGZyb20gXCIuL2N1c3RvbS1ldmVudHMubWpzXCI7XG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlTG9jYXRpb25XYXRjaGVyKGN0eCkge1xuICBsZXQgaW50ZXJ2YWw7XG4gIGxldCBvbGRVcmw7XG4gIHJldHVybiB7XG4gICAgLyoqXG4gICAgICogRW5zdXJlIHRoZSBsb2NhdGlvbiB3YXRjaGVyIGlzIGFjdGl2ZWx5IGxvb2tpbmcgZm9yIFVSTCBjaGFuZ2VzLiBJZiBpdCdzIGFscmVhZHkgd2F0Y2hpbmcsXG4gICAgICogdGhpcyBpcyBhIG5vb3AuXG4gICAgICovXG4gICAgcnVuKCkge1xuICAgICAgaWYgKGludGVydmFsICE9IG51bGwpIHJldHVybjtcbiAgICAgIG9sZFVybCA9IG5ldyBVUkwobG9jYXRpb24uaHJlZik7XG4gICAgICBpbnRlcnZhbCA9IGN0eC5zZXRJbnRlcnZhbCgoKSA9PiB7XG4gICAgICAgIGxldCBuZXdVcmwgPSBuZXcgVVJMKGxvY2F0aW9uLmhyZWYpO1xuICAgICAgICBpZiAobmV3VXJsLmhyZWYgIT09IG9sZFVybC5ocmVmKSB7XG4gICAgICAgICAgd2luZG93LmRpc3BhdGNoRXZlbnQobmV3IFd4dExvY2F0aW9uQ2hhbmdlRXZlbnQobmV3VXJsLCBvbGRVcmwpKTtcbiAgICAgICAgICBvbGRVcmwgPSBuZXdVcmw7XG4gICAgICAgIH1cbiAgICAgIH0sIDFlMyk7XG4gICAgfVxuICB9O1xufVxuIiwiaW1wb3J0IHsgYnJvd3NlciB9IGZyb20gXCJ3eHQvYnJvd3NlclwiO1xuaW1wb3J0IHsgbG9nZ2VyIH0gZnJvbSBcIi4uLy4uL3NhbmRib3gvdXRpbHMvbG9nZ2VyLm1qc1wiO1xuaW1wb3J0IHsgZ2V0VW5pcXVlRXZlbnROYW1lIH0gZnJvbSBcIi4vY3VzdG9tLWV2ZW50cy5tanNcIjtcbmltcG9ydCB7IGNyZWF0ZUxvY2F0aW9uV2F0Y2hlciB9IGZyb20gXCIuL2xvY2F0aW9uLXdhdGNoZXIubWpzXCI7XG5leHBvcnQgY2xhc3MgQ29udGVudFNjcmlwdENvbnRleHQge1xuICBjb25zdHJ1Y3Rvcihjb250ZW50U2NyaXB0TmFtZSwgb3B0aW9ucykge1xuICAgIHRoaXMuY29udGVudFNjcmlwdE5hbWUgPSBjb250ZW50U2NyaXB0TmFtZTtcbiAgICB0aGlzLm9wdGlvbnMgPSBvcHRpb25zO1xuICAgIHRoaXMuYWJvcnRDb250cm9sbGVyID0gbmV3IEFib3J0Q29udHJvbGxlcigpO1xuICAgIGlmICh0aGlzLmlzVG9wRnJhbWUpIHtcbiAgICAgIHRoaXMubGlzdGVuRm9yTmV3ZXJTY3JpcHRzKHsgaWdub3JlRmlyc3RFdmVudDogdHJ1ZSB9KTtcbiAgICAgIHRoaXMuc3RvcE9sZFNjcmlwdHMoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5saXN0ZW5Gb3JOZXdlclNjcmlwdHMoKTtcbiAgICB9XG4gIH1cbiAgc3RhdGljIFNDUklQVF9TVEFSVEVEX01FU1NBR0VfVFlQRSA9IGdldFVuaXF1ZUV2ZW50TmFtZShcbiAgICBcInd4dDpjb250ZW50LXNjcmlwdC1zdGFydGVkXCJcbiAgKTtcbiAgaXNUb3BGcmFtZSA9IHdpbmRvdy5zZWxmID09PSB3aW5kb3cudG9wO1xuICBhYm9ydENvbnRyb2xsZXI7XG4gIGxvY2F0aW9uV2F0Y2hlciA9IGNyZWF0ZUxvY2F0aW9uV2F0Y2hlcih0aGlzKTtcbiAgcmVjZWl2ZWRNZXNzYWdlSWRzID0gLyogQF9fUFVSRV9fICovIG5ldyBTZXQoKTtcbiAgZ2V0IHNpZ25hbCgpIHtcbiAgICByZXR1cm4gdGhpcy5hYm9ydENvbnRyb2xsZXIuc2lnbmFsO1xuICB9XG4gIGFib3J0KHJlYXNvbikge1xuICAgIHJldHVybiB0aGlzLmFib3J0Q29udHJvbGxlci5hYm9ydChyZWFzb24pO1xuICB9XG4gIGdldCBpc0ludmFsaWQoKSB7XG4gICAgaWYgKGJyb3dzZXIucnVudGltZS5pZCA9PSBudWxsKSB7XG4gICAgICB0aGlzLm5vdGlmeUludmFsaWRhdGVkKCk7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLnNpZ25hbC5hYm9ydGVkO1xuICB9XG4gIGdldCBpc1ZhbGlkKCkge1xuICAgIHJldHVybiAhdGhpcy5pc0ludmFsaWQ7XG4gIH1cbiAgLyoqXG4gICAqIEFkZCBhIGxpc3RlbmVyIHRoYXQgaXMgY2FsbGVkIHdoZW4gdGhlIGNvbnRlbnQgc2NyaXB0J3MgY29udGV4dCBpcyBpbnZhbGlkYXRlZC5cbiAgICpcbiAgICogQHJldHVybnMgQSBmdW5jdGlvbiB0byByZW1vdmUgdGhlIGxpc3RlbmVyLlxuICAgKlxuICAgKiBAZXhhbXBsZVxuICAgKiBicm93c2VyLnJ1bnRpbWUub25NZXNzYWdlLmFkZExpc3RlbmVyKGNiKTtcbiAgICogY29uc3QgcmVtb3ZlSW52YWxpZGF0ZWRMaXN0ZW5lciA9IGN0eC5vbkludmFsaWRhdGVkKCgpID0+IHtcbiAgICogICBicm93c2VyLnJ1bnRpbWUub25NZXNzYWdlLnJlbW92ZUxpc3RlbmVyKGNiKTtcbiAgICogfSlcbiAgICogLy8gLi4uXG4gICAqIHJlbW92ZUludmFsaWRhdGVkTGlzdGVuZXIoKTtcbiAgICovXG4gIG9uSW52YWxpZGF0ZWQoY2IpIHtcbiAgICB0aGlzLnNpZ25hbC5hZGRFdmVudExpc3RlbmVyKFwiYWJvcnRcIiwgY2IpO1xuICAgIHJldHVybiAoKSA9PiB0aGlzLnNpZ25hbC5yZW1vdmVFdmVudExpc3RlbmVyKFwiYWJvcnRcIiwgY2IpO1xuICB9XG4gIC8qKlxuICAgKiBSZXR1cm4gYSBwcm9taXNlIHRoYXQgbmV2ZXIgcmVzb2x2ZXMuIFVzZWZ1bCBpZiB5b3UgaGF2ZSBhbiBhc3luYyBmdW5jdGlvbiB0aGF0IHNob3VsZG4ndCBydW5cbiAgICogYWZ0ZXIgdGhlIGNvbnRleHQgaXMgZXhwaXJlZC5cbiAgICpcbiAgICogQGV4YW1wbGVcbiAgICogY29uc3QgZ2V0VmFsdWVGcm9tU3RvcmFnZSA9IGFzeW5jICgpID0+IHtcbiAgICogICBpZiAoY3R4LmlzSW52YWxpZCkgcmV0dXJuIGN0eC5ibG9jaygpO1xuICAgKlxuICAgKiAgIC8vIC4uLlxuICAgKiB9XG4gICAqL1xuICBibG9jaygpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKCkgPT4ge1xuICAgIH0pO1xuICB9XG4gIC8qKlxuICAgKiBXcmFwcGVyIGFyb3VuZCBgd2luZG93LnNldEludGVydmFsYCB0aGF0IGF1dG9tYXRpY2FsbHkgY2xlYXJzIHRoZSBpbnRlcnZhbCB3aGVuIGludmFsaWRhdGVkLlxuICAgKi9cbiAgc2V0SW50ZXJ2YWwoaGFuZGxlciwgdGltZW91dCkge1xuICAgIGNvbnN0IGlkID0gc2V0SW50ZXJ2YWwoKCkgPT4ge1xuICAgICAgaWYgKHRoaXMuaXNWYWxpZCkgaGFuZGxlcigpO1xuICAgIH0sIHRpbWVvdXQpO1xuICAgIHRoaXMub25JbnZhbGlkYXRlZCgoKSA9PiBjbGVhckludGVydmFsKGlkKSk7XG4gICAgcmV0dXJuIGlkO1xuICB9XG4gIC8qKlxuICAgKiBXcmFwcGVyIGFyb3VuZCBgd2luZG93LnNldFRpbWVvdXRgIHRoYXQgYXV0b21hdGljYWxseSBjbGVhcnMgdGhlIGludGVydmFsIHdoZW4gaW52YWxpZGF0ZWQuXG4gICAqL1xuICBzZXRUaW1lb3V0KGhhbmRsZXIsIHRpbWVvdXQpIHtcbiAgICBjb25zdCBpZCA9IHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgaWYgKHRoaXMuaXNWYWxpZCkgaGFuZGxlcigpO1xuICAgIH0sIHRpbWVvdXQpO1xuICAgIHRoaXMub25JbnZhbGlkYXRlZCgoKSA9PiBjbGVhclRpbWVvdXQoaWQpKTtcbiAgICByZXR1cm4gaWQ7XG4gIH1cbiAgLyoqXG4gICAqIFdyYXBwZXIgYXJvdW5kIGB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lYCB0aGF0IGF1dG9tYXRpY2FsbHkgY2FuY2VscyB0aGUgcmVxdWVzdCB3aGVuXG4gICAqIGludmFsaWRhdGVkLlxuICAgKi9cbiAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKGNhbGxiYWNrKSB7XG4gICAgY29uc3QgaWQgPSByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKC4uLmFyZ3MpID0+IHtcbiAgICAgIGlmICh0aGlzLmlzVmFsaWQpIGNhbGxiYWNrKC4uLmFyZ3MpO1xuICAgIH0pO1xuICAgIHRoaXMub25JbnZhbGlkYXRlZCgoKSA9PiBjYW5jZWxBbmltYXRpb25GcmFtZShpZCkpO1xuICAgIHJldHVybiBpZDtcbiAgfVxuICAvKipcbiAgICogV3JhcHBlciBhcm91bmQgYHdpbmRvdy5yZXF1ZXN0SWRsZUNhbGxiYWNrYCB0aGF0IGF1dG9tYXRpY2FsbHkgY2FuY2VscyB0aGUgcmVxdWVzdCB3aGVuXG4gICAqIGludmFsaWRhdGVkLlxuICAgKi9cbiAgcmVxdWVzdElkbGVDYWxsYmFjayhjYWxsYmFjaywgb3B0aW9ucykge1xuICAgIGNvbnN0IGlkID0gcmVxdWVzdElkbGVDYWxsYmFjaygoLi4uYXJncykgPT4ge1xuICAgICAgaWYgKCF0aGlzLnNpZ25hbC5hYm9ydGVkKSBjYWxsYmFjayguLi5hcmdzKTtcbiAgICB9LCBvcHRpb25zKTtcbiAgICB0aGlzLm9uSW52YWxpZGF0ZWQoKCkgPT4gY2FuY2VsSWRsZUNhbGxiYWNrKGlkKSk7XG4gICAgcmV0dXJuIGlkO1xuICB9XG4gIGFkZEV2ZW50TGlzdGVuZXIodGFyZ2V0LCB0eXBlLCBoYW5kbGVyLCBvcHRpb25zKSB7XG4gICAgaWYgKHR5cGUgPT09IFwid3h0OmxvY2F0aW9uY2hhbmdlXCIpIHtcbiAgICAgIGlmICh0aGlzLmlzVmFsaWQpIHRoaXMubG9jYXRpb25XYXRjaGVyLnJ1bigpO1xuICAgIH1cbiAgICB0YXJnZXQuYWRkRXZlbnRMaXN0ZW5lcj8uKFxuICAgICAgdHlwZS5zdGFydHNXaXRoKFwid3h0OlwiKSA/IGdldFVuaXF1ZUV2ZW50TmFtZSh0eXBlKSA6IHR5cGUsXG4gICAgICBoYW5kbGVyLFxuICAgICAge1xuICAgICAgICAuLi5vcHRpb25zLFxuICAgICAgICBzaWduYWw6IHRoaXMuc2lnbmFsXG4gICAgICB9XG4gICAgKTtcbiAgfVxuICAvKipcbiAgICogQGludGVybmFsXG4gICAqIEFib3J0IHRoZSBhYm9ydCBjb250cm9sbGVyIGFuZCBleGVjdXRlIGFsbCBgb25JbnZhbGlkYXRlZGAgbGlzdGVuZXJzLlxuICAgKi9cbiAgbm90aWZ5SW52YWxpZGF0ZWQoKSB7XG4gICAgdGhpcy5hYm9ydChcIkNvbnRlbnQgc2NyaXB0IGNvbnRleHQgaW52YWxpZGF0ZWRcIik7XG4gICAgbG9nZ2VyLmRlYnVnKFxuICAgICAgYENvbnRlbnQgc2NyaXB0IFwiJHt0aGlzLmNvbnRlbnRTY3JpcHROYW1lfVwiIGNvbnRleHQgaW52YWxpZGF0ZWRgXG4gICAgKTtcbiAgfVxuICBzdG9wT2xkU2NyaXB0cygpIHtcbiAgICB3aW5kb3cucG9zdE1lc3NhZ2UoXG4gICAgICB7XG4gICAgICAgIHR5cGU6IENvbnRlbnRTY3JpcHRDb250ZXh0LlNDUklQVF9TVEFSVEVEX01FU1NBR0VfVFlQRSxcbiAgICAgICAgY29udGVudFNjcmlwdE5hbWU6IHRoaXMuY29udGVudFNjcmlwdE5hbWUsXG4gICAgICAgIG1lc3NhZ2VJZDogTWF0aC5yYW5kb20oKS50b1N0cmluZygzNikuc2xpY2UoMilcbiAgICAgIH0sXG4gICAgICBcIipcIlxuICAgICk7XG4gIH1cbiAgdmVyaWZ5U2NyaXB0U3RhcnRlZEV2ZW50KGV2ZW50KSB7XG4gICAgY29uc3QgaXNTY3JpcHRTdGFydGVkRXZlbnQgPSBldmVudC5kYXRhPy50eXBlID09PSBDb250ZW50U2NyaXB0Q29udGV4dC5TQ1JJUFRfU1RBUlRFRF9NRVNTQUdFX1RZUEU7XG4gICAgY29uc3QgaXNTYW1lQ29udGVudFNjcmlwdCA9IGV2ZW50LmRhdGE/LmNvbnRlbnRTY3JpcHROYW1lID09PSB0aGlzLmNvbnRlbnRTY3JpcHROYW1lO1xuICAgIGNvbnN0IGlzTm90RHVwbGljYXRlID0gIXRoaXMucmVjZWl2ZWRNZXNzYWdlSWRzLmhhcyhldmVudC5kYXRhPy5tZXNzYWdlSWQpO1xuICAgIHJldHVybiBpc1NjcmlwdFN0YXJ0ZWRFdmVudCAmJiBpc1NhbWVDb250ZW50U2NyaXB0ICYmIGlzTm90RHVwbGljYXRlO1xuICB9XG4gIGxpc3RlbkZvck5ld2VyU2NyaXB0cyhvcHRpb25zKSB7XG4gICAgbGV0IGlzRmlyc3QgPSB0cnVlO1xuICAgIGNvbnN0IGNiID0gKGV2ZW50KSA9PiB7XG4gICAgICBpZiAodGhpcy52ZXJpZnlTY3JpcHRTdGFydGVkRXZlbnQoZXZlbnQpKSB7XG4gICAgICAgIHRoaXMucmVjZWl2ZWRNZXNzYWdlSWRzLmFkZChldmVudC5kYXRhLm1lc3NhZ2VJZCk7XG4gICAgICAgIGNvbnN0IHdhc0ZpcnN0ID0gaXNGaXJzdDtcbiAgICAgICAgaXNGaXJzdCA9IGZhbHNlO1xuICAgICAgICBpZiAod2FzRmlyc3QgJiYgb3B0aW9ucz8uaWdub3JlRmlyc3RFdmVudCkgcmV0dXJuO1xuICAgICAgICB0aGlzLm5vdGlmeUludmFsaWRhdGVkKCk7XG4gICAgICB9XG4gICAgfTtcbiAgICBhZGRFdmVudExpc3RlbmVyKFwibWVzc2FnZVwiLCBjYik7XG4gICAgdGhpcy5vbkludmFsaWRhdGVkKCgpID0+IHJlbW92ZUV2ZW50TGlzdGVuZXIoXCJtZXNzYWdlXCIsIGNiKSk7XG4gIH1cbn1cbiIsImNvbnN0IG51bGxLZXkgPSBTeW1ib2woJ251bGwnKTsgLy8gYG9iamVjdEhhc2hlc2Aga2V5IGZvciBudWxsXG5cbmxldCBrZXlDb3VudGVyID0gMDtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTWFueUtleXNNYXAgZXh0ZW5kcyBNYXAge1xuXHRjb25zdHJ1Y3RvcigpIHtcblx0XHRzdXBlcigpO1xuXG5cdFx0dGhpcy5fb2JqZWN0SGFzaGVzID0gbmV3IFdlYWtNYXAoKTtcblx0XHR0aGlzLl9zeW1ib2xIYXNoZXMgPSBuZXcgTWFwKCk7IC8vIGh0dHBzOi8vZ2l0aHViLmNvbS90YzM5L2VjbWEyNjIvaXNzdWVzLzExOTRcblx0XHR0aGlzLl9wdWJsaWNLZXlzID0gbmV3IE1hcCgpO1xuXG5cdFx0Y29uc3QgW3BhaXJzXSA9IGFyZ3VtZW50czsgLy8gTWFwIGNvbXBhdFxuXHRcdGlmIChwYWlycyA9PT0gbnVsbCB8fCBwYWlycyA9PT0gdW5kZWZpbmVkKSB7XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXG5cdFx0aWYgKHR5cGVvZiBwYWlyc1tTeW1ib2wuaXRlcmF0b3JdICE9PSAnZnVuY3Rpb24nKSB7XG5cdFx0XHR0aHJvdyBuZXcgVHlwZUVycm9yKHR5cGVvZiBwYWlycyArICcgaXMgbm90IGl0ZXJhYmxlIChjYW5ub3QgcmVhZCBwcm9wZXJ0eSBTeW1ib2woU3ltYm9sLml0ZXJhdG9yKSknKTtcblx0XHR9XG5cblx0XHRmb3IgKGNvbnN0IFtrZXlzLCB2YWx1ZV0gb2YgcGFpcnMpIHtcblx0XHRcdHRoaXMuc2V0KGtleXMsIHZhbHVlKTtcblx0XHR9XG5cdH1cblxuXHRfZ2V0UHVibGljS2V5cyhrZXlzLCBjcmVhdGUgPSBmYWxzZSkge1xuXHRcdGlmICghQXJyYXkuaXNBcnJheShrZXlzKSkge1xuXHRcdFx0dGhyb3cgbmV3IFR5cGVFcnJvcignVGhlIGtleXMgcGFyYW1ldGVyIG11c3QgYmUgYW4gYXJyYXknKTtcblx0XHR9XG5cblx0XHRjb25zdCBwcml2YXRlS2V5ID0gdGhpcy5fZ2V0UHJpdmF0ZUtleShrZXlzLCBjcmVhdGUpO1xuXG5cdFx0bGV0IHB1YmxpY0tleTtcblx0XHRpZiAocHJpdmF0ZUtleSAmJiB0aGlzLl9wdWJsaWNLZXlzLmhhcyhwcml2YXRlS2V5KSkge1xuXHRcdFx0cHVibGljS2V5ID0gdGhpcy5fcHVibGljS2V5cy5nZXQocHJpdmF0ZUtleSk7XG5cdFx0fSBlbHNlIGlmIChjcmVhdGUpIHtcblx0XHRcdHB1YmxpY0tleSA9IFsuLi5rZXlzXTsgLy8gUmVnZW5lcmF0ZSBrZXlzIGFycmF5IHRvIGF2b2lkIGV4dGVybmFsIGludGVyYWN0aW9uXG5cdFx0XHR0aGlzLl9wdWJsaWNLZXlzLnNldChwcml2YXRlS2V5LCBwdWJsaWNLZXkpO1xuXHRcdH1cblxuXHRcdHJldHVybiB7cHJpdmF0ZUtleSwgcHVibGljS2V5fTtcblx0fVxuXG5cdF9nZXRQcml2YXRlS2V5KGtleXMsIGNyZWF0ZSA9IGZhbHNlKSB7XG5cdFx0Y29uc3QgcHJpdmF0ZUtleXMgPSBbXTtcblx0XHRmb3IgKGxldCBrZXkgb2Yga2V5cykge1xuXHRcdFx0aWYgKGtleSA9PT0gbnVsbCkge1xuXHRcdFx0XHRrZXkgPSBudWxsS2V5O1xuXHRcdFx0fVxuXG5cdFx0XHRjb25zdCBoYXNoZXMgPSB0eXBlb2Yga2V5ID09PSAnb2JqZWN0JyB8fCB0eXBlb2Yga2V5ID09PSAnZnVuY3Rpb24nID8gJ19vYmplY3RIYXNoZXMnIDogKHR5cGVvZiBrZXkgPT09ICdzeW1ib2wnID8gJ19zeW1ib2xIYXNoZXMnIDogZmFsc2UpO1xuXG5cdFx0XHRpZiAoIWhhc2hlcykge1xuXHRcdFx0XHRwcml2YXRlS2V5cy5wdXNoKGtleSk7XG5cdFx0XHR9IGVsc2UgaWYgKHRoaXNbaGFzaGVzXS5oYXMoa2V5KSkge1xuXHRcdFx0XHRwcml2YXRlS2V5cy5wdXNoKHRoaXNbaGFzaGVzXS5nZXQoa2V5KSk7XG5cdFx0XHR9IGVsc2UgaWYgKGNyZWF0ZSkge1xuXHRcdFx0XHRjb25zdCBwcml2YXRlS2V5ID0gYEBAbWttLXJlZi0ke2tleUNvdW50ZXIrK31AQGA7XG5cdFx0XHRcdHRoaXNbaGFzaGVzXS5zZXQoa2V5LCBwcml2YXRlS2V5KTtcblx0XHRcdFx0cHJpdmF0ZUtleXMucHVzaChwcml2YXRlS2V5KTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdHJldHVybiBmYWxzZTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHRyZXR1cm4gSlNPTi5zdHJpbmdpZnkocHJpdmF0ZUtleXMpO1xuXHR9XG5cblx0c2V0KGtleXMsIHZhbHVlKSB7XG5cdFx0Y29uc3Qge3B1YmxpY0tleX0gPSB0aGlzLl9nZXRQdWJsaWNLZXlzKGtleXMsIHRydWUpO1xuXHRcdHJldHVybiBzdXBlci5zZXQocHVibGljS2V5LCB2YWx1ZSk7XG5cdH1cblxuXHRnZXQoa2V5cykge1xuXHRcdGNvbnN0IHtwdWJsaWNLZXl9ID0gdGhpcy5fZ2V0UHVibGljS2V5cyhrZXlzKTtcblx0XHRyZXR1cm4gc3VwZXIuZ2V0KHB1YmxpY0tleSk7XG5cdH1cblxuXHRoYXMoa2V5cykge1xuXHRcdGNvbnN0IHtwdWJsaWNLZXl9ID0gdGhpcy5fZ2V0UHVibGljS2V5cyhrZXlzKTtcblx0XHRyZXR1cm4gc3VwZXIuaGFzKHB1YmxpY0tleSk7XG5cdH1cblxuXHRkZWxldGUoa2V5cykge1xuXHRcdGNvbnN0IHtwdWJsaWNLZXksIHByaXZhdGVLZXl9ID0gdGhpcy5fZ2V0UHVibGljS2V5cyhrZXlzKTtcblx0XHRyZXR1cm4gQm9vbGVhbihwdWJsaWNLZXkgJiYgc3VwZXIuZGVsZXRlKHB1YmxpY0tleSkgJiYgdGhpcy5fcHVibGljS2V5cy5kZWxldGUocHJpdmF0ZUtleSkpO1xuXHR9XG5cblx0Y2xlYXIoKSB7XG5cdFx0c3VwZXIuY2xlYXIoKTtcblx0XHR0aGlzLl9zeW1ib2xIYXNoZXMuY2xlYXIoKTtcblx0XHR0aGlzLl9wdWJsaWNLZXlzLmNsZWFyKCk7XG5cdH1cblxuXHRnZXQgW1N5bWJvbC50b1N0cmluZ1RhZ10oKSB7XG5cdFx0cmV0dXJuICdNYW55S2V5c01hcCc7XG5cdH1cblxuXHRnZXQgc2l6ZSgpIHtcblx0XHRyZXR1cm4gc3VwZXIuc2l6ZTtcblx0fVxufVxuIiwiaW1wb3J0IE1hbnlLZXlzTWFwIGZyb20gJ21hbnkta2V5cy1tYXAnO1xuaW1wb3J0IHsgZGVmdSB9IGZyb20gJ2RlZnUnO1xuaW1wb3J0IHsgaXNFeGlzdCB9IGZyb20gJy4vZGV0ZWN0b3JzLm1qcyc7XG5cbmNvbnN0IGdldERlZmF1bHRPcHRpb25zID0gKCkgPT4gKHtcbiAgdGFyZ2V0OiBnbG9iYWxUaGlzLmRvY3VtZW50LFxuICB1bmlmeVByb2Nlc3M6IHRydWUsXG4gIGRldGVjdG9yOiBpc0V4aXN0LFxuICBvYnNlcnZlQ29uZmlnczoge1xuICAgIGNoaWxkTGlzdDogdHJ1ZSxcbiAgICBzdWJ0cmVlOiB0cnVlLFxuICAgIGF0dHJpYnV0ZXM6IHRydWVcbiAgfSxcbiAgc2lnbmFsOiB2b2lkIDAsXG4gIGN1c3RvbU1hdGNoZXI6IHZvaWQgMFxufSk7XG5jb25zdCBtZXJnZU9wdGlvbnMgPSAodXNlclNpZGVPcHRpb25zLCBkZWZhdWx0T3B0aW9ucykgPT4ge1xuICByZXR1cm4gZGVmdSh1c2VyU2lkZU9wdGlvbnMsIGRlZmF1bHRPcHRpb25zKTtcbn07XG5cbmNvbnN0IHVuaWZ5Q2FjaGUgPSBuZXcgTWFueUtleXNNYXAoKTtcbmZ1bmN0aW9uIGNyZWF0ZVdhaXRFbGVtZW50KGluc3RhbmNlT3B0aW9ucykge1xuICBjb25zdCB7IGRlZmF1bHRPcHRpb25zIH0gPSBpbnN0YW5jZU9wdGlvbnM7XG4gIHJldHVybiAoc2VsZWN0b3IsIG9wdGlvbnMpID0+IHtcbiAgICBjb25zdCB7XG4gICAgICB0YXJnZXQsXG4gICAgICB1bmlmeVByb2Nlc3MsXG4gICAgICBvYnNlcnZlQ29uZmlncyxcbiAgICAgIGRldGVjdG9yLFxuICAgICAgc2lnbmFsLFxuICAgICAgY3VzdG9tTWF0Y2hlclxuICAgIH0gPSBtZXJnZU9wdGlvbnMob3B0aW9ucywgZGVmYXVsdE9wdGlvbnMpO1xuICAgIGNvbnN0IHVuaWZ5UHJvbWlzZUtleSA9IFtcbiAgICAgIHNlbGVjdG9yLFxuICAgICAgdGFyZ2V0LFxuICAgICAgdW5pZnlQcm9jZXNzLFxuICAgICAgb2JzZXJ2ZUNvbmZpZ3MsXG4gICAgICBkZXRlY3RvcixcbiAgICAgIHNpZ25hbCxcbiAgICAgIGN1c3RvbU1hdGNoZXJcbiAgICBdO1xuICAgIGNvbnN0IGNhY2hlZFByb21pc2UgPSB1bmlmeUNhY2hlLmdldCh1bmlmeVByb21pc2VLZXkpO1xuICAgIGlmICh1bmlmeVByb2Nlc3MgJiYgY2FjaGVkUHJvbWlzZSkge1xuICAgICAgcmV0dXJuIGNhY2hlZFByb21pc2U7XG4gICAgfVxuICAgIGNvbnN0IGRldGVjdFByb21pc2UgPSBuZXcgUHJvbWlzZShcbiAgICAgIC8vIGJpb21lLWlnbm9yZSBsaW50L3N1c3BpY2lvdXMvbm9Bc3luY1Byb21pc2VFeGVjdXRvcjogYXZvaWQgbmVzdGluZyBwcm9taXNlXG4gICAgICBhc3luYyAocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgIGlmIChzaWduYWw/LmFib3J0ZWQpIHtcbiAgICAgICAgICByZXR1cm4gcmVqZWN0KHNpZ25hbC5yZWFzb24pO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IG9ic2VydmVyID0gbmV3IE11dGF0aW9uT2JzZXJ2ZXIoXG4gICAgICAgICAgYXN5bmMgKG11dGF0aW9ucykgPT4ge1xuICAgICAgICAgICAgZm9yIChjb25zdCBfIG9mIG11dGF0aW9ucykge1xuICAgICAgICAgICAgICBpZiAoc2lnbmFsPy5hYm9ydGVkKSB7XG4gICAgICAgICAgICAgICAgb2JzZXJ2ZXIuZGlzY29ubmVjdCgpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIGNvbnN0IGRldGVjdFJlc3VsdDIgPSBhd2FpdCBkZXRlY3RFbGVtZW50KHtcbiAgICAgICAgICAgICAgICBzZWxlY3RvcixcbiAgICAgICAgICAgICAgICB0YXJnZXQsXG4gICAgICAgICAgICAgICAgZGV0ZWN0b3IsXG4gICAgICAgICAgICAgICAgY3VzdG9tTWF0Y2hlclxuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgaWYgKGRldGVjdFJlc3VsdDIuaXNEZXRlY3RlZCkge1xuICAgICAgICAgICAgICAgIG9ic2VydmVyLmRpc2Nvbm5lY3QoKTtcbiAgICAgICAgICAgICAgICByZXNvbHZlKGRldGVjdFJlc3VsdDIucmVzdWx0KTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgKTtcbiAgICAgICAgc2lnbmFsPy5hZGRFdmVudExpc3RlbmVyKFxuICAgICAgICAgIFwiYWJvcnRcIixcbiAgICAgICAgICAoKSA9PiB7XG4gICAgICAgICAgICBvYnNlcnZlci5kaXNjb25uZWN0KCk7XG4gICAgICAgICAgICByZXR1cm4gcmVqZWN0KHNpZ25hbC5yZWFzb24pO1xuICAgICAgICAgIH0sXG4gICAgICAgICAgeyBvbmNlOiB0cnVlIH1cbiAgICAgICAgKTtcbiAgICAgICAgY29uc3QgZGV0ZWN0UmVzdWx0ID0gYXdhaXQgZGV0ZWN0RWxlbWVudCh7XG4gICAgICAgICAgc2VsZWN0b3IsXG4gICAgICAgICAgdGFyZ2V0LFxuICAgICAgICAgIGRldGVjdG9yLFxuICAgICAgICAgIGN1c3RvbU1hdGNoZXJcbiAgICAgICAgfSk7XG4gICAgICAgIGlmIChkZXRlY3RSZXN1bHQuaXNEZXRlY3RlZCkge1xuICAgICAgICAgIHJldHVybiByZXNvbHZlKGRldGVjdFJlc3VsdC5yZXN1bHQpO1xuICAgICAgICB9XG4gICAgICAgIG9ic2VydmVyLm9ic2VydmUodGFyZ2V0LCBvYnNlcnZlQ29uZmlncyk7XG4gICAgICB9XG4gICAgKS5maW5hbGx5KCgpID0+IHtcbiAgICAgIHVuaWZ5Q2FjaGUuZGVsZXRlKHVuaWZ5UHJvbWlzZUtleSk7XG4gICAgfSk7XG4gICAgdW5pZnlDYWNoZS5zZXQodW5pZnlQcm9taXNlS2V5LCBkZXRlY3RQcm9taXNlKTtcbiAgICByZXR1cm4gZGV0ZWN0UHJvbWlzZTtcbiAgfTtcbn1cbmFzeW5jIGZ1bmN0aW9uIGRldGVjdEVsZW1lbnQoe1xuICB0YXJnZXQsXG4gIHNlbGVjdG9yLFxuICBkZXRlY3RvcixcbiAgY3VzdG9tTWF0Y2hlclxufSkge1xuICBjb25zdCBlbGVtZW50ID0gY3VzdG9tTWF0Y2hlciA/IGN1c3RvbU1hdGNoZXIoc2VsZWN0b3IpIDogdGFyZ2V0LnF1ZXJ5U2VsZWN0b3Ioc2VsZWN0b3IpO1xuICByZXR1cm4gYXdhaXQgZGV0ZWN0b3IoZWxlbWVudCk7XG59XG5jb25zdCB3YWl0RWxlbWVudCA9IGNyZWF0ZVdhaXRFbGVtZW50KHtcbiAgZGVmYXVsdE9wdGlvbnM6IGdldERlZmF1bHRPcHRpb25zKClcbn0pO1xuXG5leHBvcnQgeyBjcmVhdGVXYWl0RWxlbWVudCwgZ2V0RGVmYXVsdE9wdGlvbnMsIHdhaXRFbGVtZW50IH07XG4iXSwibmFtZXMiOlsiZ2xvYmFsIiwidGhpcyIsIm1vZHVsZSIsInByb3h5VGFyZ2V0IiwidmFsdWUiLCJyZXN1bHQiLCJtZXNzYWdlIiwiZGVmaW5pdGlvbiIsImJyb3dzZXIiLCJub2RlIiwicHJpbnQiLCJsb2dnZXIiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUEsS0FBQyxTQUFVQSxTQUFRLFNBQVM7QUFHaUI7QUFDekMsZ0JBQVEsTUFBTTtBQUFBLE1BQ2xCO0FBQUEsSUFPQSxHQUFHLE9BQU8sZUFBZSxjQUFjLGFBQWEsT0FBTyxTQUFTLGNBQWMsT0FBT0MsZ0JBQU0sU0FBVUMs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
