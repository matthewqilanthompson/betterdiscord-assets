/**
 * @name ItemVault
 * @description Centralized item storage and inventory system for the Solo Leveling plugin ecosystem. Manages currencies, materials, consumables, and future equipment.
 * @version 1.0.0
 * @author Solo Leveling Theme Dev, matthewqilanthompson
 */
var __getOwnPropNames = Object.getOwnPropertyNames;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};

// src/shared/event-bus.js
var require_event_bus = __commonJS({
  "src/shared/event-bus.js"(exports2, module2) {
    (function initGlobalEventBus() {
      if (typeof window === "undefined") return;
      if (!window.__SL_EventBus) {
        let _getNativeBus2 = function() {
          if (_nativeBusChecked) return _nativeBus;
          _nativeBusChecked = true;
          if (typeof BdApi !== "undefined" && BdApi.Events && typeof BdApi.Events.on === "function" && typeof BdApi.Events.emit === "function") {
            _nativeBus = BdApi.Events;
          }
          return _nativeBus;
        };
        var _getNativeBus = _getNativeBus2;
        const listeners = /* @__PURE__ */ new Map();
        let _nativeBus = null;
        let _nativeBusChecked = false;
        window.__SL_EventBus = {
          on(event, handler) {
            if (!listeners.has(event)) listeners.set(event, /* @__PURE__ */ new Set());
            listeners.get(event).add(handler);
            const _nb_on = _getNativeBus2();
            if (_nb_on) {
              try {
                _nb_on.on(event, handler);
              } catch (_) {
              }
            }
          },
          off(event, handler) {
            const set = listeners.get(event);
            if (set) {
              set.delete(handler);
              if (set.size === 0) listeners.delete(event);
            }
            const _nb_off = _getNativeBus2();
            if (_nb_off) {
              try {
                _nb_off.off(event, handler);
              } catch (_) {
              }
            }
          },
          emit(event, ...args) {
            const set = listeners.get(event);
            if (set) {
              for (const handler of set) {
                try {
                  handler(...args);
                } catch (err) {
                  console.error(`[SL:EventBus] ${event}:`, err);
                }
              }
            }
          }
        };
      }
    })();
    module2.exports = window.__SL_EventBus;
  }
});

// src/shared/dom-bus.js
var require_dom_bus = __commonJS({
  "src/shared/dom-bus.js"(exports2, module2) {
    function _getDomBus() {
      if (window.__SL_DomBus) return window.__SL_DomBus;
      const bus = {
        _kdCapture: /* @__PURE__ */ new Set(),
        _kdBubble: /* @__PURE__ */ new Set(),
        _onKdCapture: null,
        _onKdBubble: null,
        _resize: /* @__PURE__ */ new Set(),
        _onResize: null,
        _resizeRaf: false,
        addKeydown(fn, capture) {
          const set = capture ? this._kdCapture : this._kdBubble;
          set.add(fn);
          if (capture && !this._onKdCapture) {
            this._onKdCapture = (e) => {
              for (const h of this._kdCapture) {
                try {
                  h(e);
                } catch (_) {
                }
              }
            };
            document.addEventListener("keydown", this._onKdCapture, true);
          } else if (!capture && !this._onKdBubble) {
            this._onKdBubble = (e) => {
              for (const h of this._kdBubble) {
                try {
                  h(e);
                } catch (_) {
                }
              }
            };
            document.addEventListener("keydown", this._onKdBubble, false);
          }
          return () => {
            set.delete(fn);
            if (capture && this._onKdCapture && this._kdCapture.size === 0) {
              document.removeEventListener("keydown", this._onKdCapture, true);
              this._onKdCapture = null;
            } else if (!capture && this._onKdBubble && this._kdBubble.size === 0) {
              document.removeEventListener("keydown", this._onKdBubble, false);
              this._onKdBubble = null;
            }
          };
        },
        addResize(fn) {
          this._resize.add(fn);
          if (!this._onResize) {
            this._onResize = () => {
              if (this._resizeRaf) return;
              this._resizeRaf = true;
              requestAnimationFrame(() => {
                this._resizeRaf = false;
                for (const h of this._resize) {
                  try {
                    h();
                  } catch (_) {
                  }
                }
              });
            };
            window.addEventListener("resize", this._onResize, { passive: true });
          }
          return () => {
            this._resize.delete(fn);
            if (this._onResize && this._resize.size === 0) {
              window.removeEventListener("resize", this._onResize);
              this._onResize = null;
            }
          };
        }
      };
      window.__SL_DomBus = bus;
      return bus;
    }
    function onKeydown2(handler, opts) {
      if (typeof handler !== "function") return () => {
      };
      const capture = !(opts && opts.capture === false);
      return _getDomBus().addKeydown(handler, capture);
    }
    function onResize(handler) {
      if (typeof handler !== "function") return () => {
      };
      return _getDomBus().addResize(handler);
    }
    module2.exports = { onKeydown: onKeydown2, onResize };
  }
});

// src/shared/dispatcher.js
var require_dispatcher = __commonJS({
  "src/shared/dispatcher.js"(exports2, module2) {
    var { Webpack } = BdApi;
    var _cached = null;
    function isValidDispatcher(d) {
      return d != null && typeof d.subscribe === "function" && typeof d.dispatch === "function" && typeof d.unsubscribe === "function";
    }
    function extractFromStores() {
      var _a, _b;
      try {
        const stores = Webpack.Stores;
        if (!stores) return null;
        const storeNames = [
          "UserStore",
          "GuildStore",
          "ChannelStore",
          "SelectedChannelStore",
          "MessageStore",
          "PresenceStore"
        ];
        for (const name of storeNames) {
          const d = (_a = stores[name]) == null ? void 0 : _a._dispatcher;
          if (isValidDispatcher(d)) return d;
        }
        for (const key of Object.keys(stores)) {
          try {
            const d = (_b = stores[key]) == null ? void 0 : _b._dispatcher;
            if (isValidDispatcher(d)) return d;
          } catch (_) {
          }
        }
      } catch (_) {
      }
      return null;
    }
    function acquireDispatcher() {
      if (_cached) return _cached;
      const d = (
        // Tier 1: Extract from Flux stores (most reliable, zero search cost)
        extractFromStores() || // Tier 2: Webpack module filter (NO optional chaining!)
        Webpack.getModule((m) => m.dispatch && m.subscribe && m.unsubscribe) || // Tier 3: Legacy named key
        Webpack.getByKeys("actionLogger") || // Tier 4: Webpack filter with _actionHandlers (Discord-specific internal)
        Webpack.getModule((m) => m.dispatch && m._actionHandlers) || // Tier 5: Check for global FluxDispatcher (some BD builds expose it)
        (typeof window !== "undefined" && isValidDispatcher(window.FluxDispatcher) ? window.FluxDispatcher : null) || null
      );
      if (isValidDispatcher(d)) {
        _cached = d;
        return d;
      }
      return null;
    }
    function pollForDispatcher(options = {}) {
      const {
        initialDelay = 200,
        maxDelay = 5e3,
        timeout = 3e4,
        onAcquired,
        onTimeout,
        onPoll
      } = options;
      const immediate = acquireDispatcher();
      if (immediate) {
        onAcquired == null ? void 0 : onAcquired(immediate);
        return { dispatcher: immediate, cancel: () => {
        } };
      }
      let timer = null;
      let cancelled = false;
      let attempt = 0;
      let delay = initialDelay;
      const startTime = Date.now();
      const cancel = () => {
        cancelled = true;
        if (timer) {
          clearTimeout(timer);
          timer = null;
        }
      };
      const tryAcquire = () => {
        if (cancelled) return;
        attempt++;
        onPoll == null ? void 0 : onPoll(attempt, delay);
        const dispatcher = acquireDispatcher();
        if (dispatcher) {
          timer = null;
          onAcquired == null ? void 0 : onAcquired(dispatcher);
          return;
        }
        const elapsed = Date.now() - startTime;
        if (elapsed >= timeout) {
          timer = null;
          onTimeout == null ? void 0 : onTimeout();
          return;
        }
        delay = Math.min(delay * 2, maxDelay);
        delay = Math.min(delay, timeout - elapsed);
        timer = setTimeout(tryAcquire, delay);
      };
      timer = setTimeout(tryAcquire, initialDelay);
      return { dispatcher: null, cancel };
    }
    function resetCache() {
      _cached = null;
    }
    module2.exports = { acquireDispatcher, pollForDispatcher, isValidDispatcher, resetCache };
  }
});

// src/shared/header-toolbar.js
var require_header_toolbar = __commonJS({
  "src/shared/header-toolbar.js"(exports2, module2) {
    var TOOLBAR_FALLBACKS = [
      '[aria-label="Channel header"] [class*="toolbar_"]',
      '[class*="titleWrapper_"] [class*="toolbar_"]',
      'header [class*="toolbar_"]'
    ];
    function getChannelHeaderToolbar() {
      for (const selector of TOOLBAR_FALLBACKS) {
        const nodes = document.querySelectorAll(selector);
        for (const node of nodes) {
          if (!node || node.offsetParent === null) continue;
          const host = node.closest('[aria-label="Channel header"], [class*="titleWrapper_"], header');
          if (host && host.offsetParent === null) continue;
          return node;
        }
      }
      return null;
    }
    function getAllChannelHeaderToolbars() {
      const out = [];
      const seen = /* @__PURE__ */ new Set();
      for (const selector of TOOLBAR_FALLBACKS) {
        const nodes = document.querySelectorAll(selector);
        for (const node of nodes) {
          if (!node || seen.has(node)) continue;
          if (node.offsetParent === null) continue;
          seen.add(node);
          out.push(node);
        }
      }
      return out;
    }
    var { acquireDispatcher } = require_dispatcher();
    function _resolveDispatcher() {
      return acquireDispatcher();
    }
    function _getToolbarHub() {
      if (window.__SL_ToolbarHub) return window.__SL_ToolbarHub;
      const hub = {
        callbacks: /* @__PURE__ */ new Set(),
        _rafScheduled: false,
        _mo: null,
        _dispatcherUnsubs: [],
        _onVisibility: null,
        // Coalesce a burst of triggers into one rAF tick, fan out to all callbacks.
        // BATCHED READ (2026-07-30, profiler: 76ms avg / 183ms worst per tick):
        // every subscriber used to resolve the toolbar itself, so one tick ran
        // read(offsetParent) -> write(inject) -> read -> write ... across ~6
        // consumers: textbook layout thrashing, since each write invalidates the
        // layout the next read forces recomputation of. The hub now performs ONE
        // read up front and passes the element to every callback; subscribers
        // that accept the argument skip their own lookup entirely. Callbacks that
        // ignore the argument keep working exactly as before.
        // PER-SUBSCRIBER ATTRIBUTION (2026-08-06). AAPerfSentinel showed
        // `fireAll` in ALL FIVE of a session's worst stalls (908-2019ms each,
        // avg 285ms over 312 calls) — but the sentinel attributes shared-singleton
        // work to whichever plugin WON THE STARTUP RACE to create the hub, not to
        // the subscriber whose callback actually burned the time. That made the
        // cost unactionable: "SoloLevelingTheme fireAll" names this hub, not a
        // culprit.
        //
        // Timing each callback closes the gap. Only a genuinely slow subscriber
        // (>=50ms — a whole frame) logs, so this is silent in normal operation and
        // self-announcing exactly when it matters. performance.now() per callback
        // across ~6 subscribers is negligible next to the work being measured.
        fireAll() {
          if (this._rafScheduled || document.hidden) return;
          this._rafScheduled = true;
          requestAnimationFrame(() => {
            this._rafScheduled = false;
            let toolbar = null;
            try {
              toolbar = getChannelHeaderToolbar();
            } catch (_) {
              toolbar = null;
            }
            for (const cb of this.callbacks) {
              const t0 = performance.now();
              try {
                cb(toolbar);
              } catch (_) {
              }
              const ms = performance.now() - t0;
              if (ms >= 50) {
                try {
                  console.warn(
                    `[__SL_ToolbarHub] slow subscriber: ${Math.round(ms)}ms \u2014 ${cb._slOwner || cb.name || "(anonymous)"}`
                  );
                } catch (_) {
                }
              }
            }
          });
        },
        _setup() {
          const dispatcher = _resolveDispatcher();
          if (dispatcher) {
            const fire = () => this.fireAll();
            for (const action of ["CHANNEL_SELECT", "VOICE_STATE_UPDATES"]) {
              try {
                dispatcher.subscribe(action, fire);
                this._dispatcherUnsubs.push(() => {
                  try {
                    dispatcher.unsubscribe(action, fire);
                  } catch (_) {
                  }
                });
              } catch (_) {
              }
            }
          }
          try {
            const target = document.getElementById("app-mount") || document.body;
            this._mo = new MutationObserver((records) => {
              if (document.hidden) return;
              if (!this._moPending) this._moPending = [];
              for (let i = 0; i < records.length; i++) this._moPending.push(records[i]);
              if (this._moScanScheduled) return;
              this._moScanScheduled = true;
              requestAnimationFrame(() => {
                var _a;
                this._moScanScheduled = false;
                const pending = this._moPending;
                this._moPending = [];
                if (document.hidden) return;
                for (const r of pending) {
                  for (const list of [r.addedNodes, r.removedNodes]) {
                    for (const node of list) {
                      if (node.nodeType !== 1) continue;
                      if ((_a = node.matches) == null ? void 0 : _a.call(node, '[aria-label="Channel header"], [class*="toolbar_"]')) {
                        this.fireAll();
                        return;
                      }
                    }
                  }
                }
              });
            });
            this._mo.observe(target, { childList: true, subtree: true });
          } catch (_) {
            this._mo = null;
          }
          try {
            this._onVisibility = () => {
              if (!document.hidden) this.fireAll();
            };
            document.addEventListener("visibilitychange", this._onVisibility);
          } catch (_) {
            this._onVisibility = null;
          }
        },
        _teardown() {
          for (const fn of this._dispatcherUnsubs) {
            try {
              fn();
            } catch (_) {
            }
          }
          this._dispatcherUnsubs = [];
          if (this._mo) {
            try {
              this._mo.disconnect();
            } catch (_) {
            }
            this._mo = null;
          }
          if (this._onVisibility) {
            try {
              document.removeEventListener("visibilitychange", this._onVisibility);
            } catch (_) {
            }
            this._onVisibility = null;
          }
        },
        /**
         * @param {Function} cb        called with the resolved toolbar element
         * @param {string} [owner]     label for slow-subscriber logging. Optional —
         *   when omitted the owning .plugin.js is derived from the registration
         *   stack ONCE, here, never on the fire path. Subscribers are anonymous
         *   arrows in every current call site, so cb.name alone would report
         *   nothing useful when a callback turns out to be the slow one.
         */
        add(cb, owner) {
          const wasEmpty = this.callbacks.size === 0;
          if (!cb._slOwner) {
            let label = owner || "";
            if (!label) {
              try {
                const frame = (new Error().stack || "").split("\n").find((l) => l.includes(".plugin.js"));
                label = frame ? (frame.match(/(\w+)\.plugin\.js/) || [])[1] || "" : "";
              } catch (_) {
              }
            }
            try {
              cb._slOwner = label || void 0;
            } catch (_) {
            }
          }
          this.callbacks.add(cb);
          if (wasEmpty) this._setup();
          requestAnimationFrame(() => {
            if (this.callbacks.has(cb)) {
              try {
                cb();
              } catch (_) {
              }
            }
          });
        },
        remove(cb) {
          this.callbacks.delete(cb);
          if (this.callbacks.size === 0) {
            this._teardown();
            if (typeof window !== "undefined") window.__SL_ToolbarHub = null;
          }
        }
      };
      window.__SL_ToolbarHub = hub;
      return hub;
    }
    function watchToolbar2(onChange) {
      if (typeof onChange !== "function") return () => {
      };
      const hub = _getToolbarHub();
      hub.add(onChange);
      let disposed = false;
      return function unwatch() {
        if (disposed) return;
        disposed = true;
        hub.remove(onChange);
      };
    }
    module2.exports = {
      TOOLBAR_FALLBACKS,
      getChannelHeaderToolbar,
      getAllChannelHeaderToolbars,
      watchToolbar: watchToolbar2
    };
  }
});

// src/ItemVault/storage.js
var require_storage = __commonJS({
  "src/ItemVault/storage.js"(exports2, module2) {
    var DB_NAME = "ItemVault";
    var DB_VERSION = 1;
    var STORE_NAME = "items";
    var FLUSH_INTERVAL_MS = 1e4;
    var ItemVaultStorage2 = class {
      constructor() {
        this._db = null;
        this._cache = /* @__PURE__ */ new Map();
        this._dirty = /* @__PURE__ */ new Set();
        this._flushTimer = null;
        this._ready = false;
      }
      async open() {
        if (this._db) return;
        return new Promise((resolve, reject) => {
          const req = indexedDB.open(DB_NAME, DB_VERSION);
          req.onupgradeneeded = (e) => {
            const db = e.target.result;
            if (!db.objectStoreNames.contains(STORE_NAME)) {
              db.createObjectStore(STORE_NAME, { keyPath: "id" });
            }
          };
          req.onsuccess = (e) => {
            this._db = e.target.result;
            this._startFlushTimer();
            resolve();
          };
          req.onerror = (e) => {
            console.error("[ItemVault] IDB open failed:", e.target.error);
            reject(e.target.error);
          };
        });
      }
      /** Load all items from IDB into memory cache */
      async loadAll() {
        if (!this._db) return;
        return new Promise((resolve, reject) => {
          const tx = this._db.transaction(STORE_NAME, "readonly");
          const store = tx.objectStore(STORE_NAME);
          const req = store.getAll();
          req.onsuccess = () => {
            this._cache.clear();
            for (const record of req.result) {
              this._cache.set(record.id, record);
            }
            this._ready = true;
            resolve(this._cache);
          };
          req.onerror = (e) => {
            console.error("[ItemVault] loadAll failed:", e.target.error);
            reject(e.target.error);
          };
        });
      }
      /** Get current amount for an item (0 if not found) */
      getAmount(itemId) {
        var _a;
        return ((_a = this._cache.get(itemId)) == null ? void 0 : _a.amount) ?? 0;
      }
      /** Get all records as a plain object { itemId: amount } */
      getAllBalances() {
        const balances = {};
        for (const [id, record] of this._cache) {
          balances[id] = record.amount;
        }
        return balances;
      }
      /**
       * Add amount to an item. Creates record if it doesn't exist.
       * Returns the new total.
       */
      add(itemId, amount, meta = {}) {
        if (amount <= 0) return this.getAmount(itemId);
        const existing = this._cache.get(itemId);
        if (existing) {
          existing.amount += amount;
          existing.lastModified = Date.now();
          if (meta && Object.keys(meta).length) {
            existing.meta = { ...existing.meta, ...meta };
          }
        } else {
          this._cache.set(itemId, {
            id: itemId,
            amount,
            lastModified: Date.now(),
            meta
          });
        }
        this._dirty.add(itemId);
        return this.getAmount(itemId);
      }
      /**
       * Spend/consume amount from an item.
       * Returns { success, newAmount, shortfall }.
       * If insufficient, nothing is deducted.
       */
      spend(itemId, amount) {
        if (amount <= 0) return { success: true, newAmount: this.getAmount(itemId), shortfall: 0 };
        const current = this.getAmount(itemId);
        if (current < amount) {
          return { success: false, newAmount: current, shortfall: amount - current };
        }
        const record = this._cache.get(itemId);
        record.amount = Math.max(0, record.amount - amount);
        record.lastModified = Date.now();
        this._dirty.add(itemId);
        return { success: true, newAmount: record.amount, shortfall: 0 };
      }
      /**
       * Set exact amount (for migrations or corrections).
       */
      set(itemId, amount, meta = {}) {
        const record = this._cache.get(itemId);
        if (record) {
          record.amount = Math.max(0, amount);
          record.lastModified = Date.now();
          if (meta && Object.keys(meta).length) {
            record.meta = { ...record.meta, ...meta };
          }
        } else {
          this._cache.set(itemId, {
            id: itemId,
            amount: Math.max(0, amount),
            lastModified: Date.now(),
            meta
          });
        }
        this._dirty.add(itemId);
        return this.getAmount(itemId);
      }
      /** Flush dirty records to IDB */
      async flush() {
        if (!this._db || this._dirty.size === 0) return;
        const toWrite = [...this._dirty];
        this._dirty.clear();
        return new Promise((resolve) => {
          try {
            const tx = this._db.transaction(STORE_NAME, "readwrite");
            const store = tx.objectStore(STORE_NAME);
            for (const itemId of toWrite) {
              const record = this._cache.get(itemId);
              if (record) {
                const putReq = store.put(record);
                putReq.onerror = (e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  console.error("[ItemVault] flush: put failed for item", itemId, e.target.error);
                  this._dirty.add(itemId);
                };
              }
            }
            tx.oncomplete = () => resolve(true);
            tx.onerror = () => {
              for (const id of toWrite) this._dirty.add(id);
              resolve(false);
            };
          } catch (err) {
            console.error("[ItemVault] flush error:", err);
            for (const id of toWrite) this._dirty.add(id);
            resolve(false);
          }
        });
      }
      _startFlushTimer() {
        if (this._flushTimer) return;
        this._flushTimer = setInterval(() => this.flush(), FLUSH_INTERVAL_MS);
      }
      async close() {
        if (this._flushTimer) {
          clearInterval(this._flushTimer);
          this._flushTimer = null;
        }
        await this.flush();
        if (this._db) {
          this._db.close();
          this._db = null;
        }
        this._ready = false;
      }
      get isReady() {
        return this._ready;
      }
    };
    module2.exports = { ItemVaultStorage: ItemVaultStorage2 };
  }
});

// src/ItemVault/item-registry.js
var require_item_registry = __commonJS({
  "src/ItemVault/item-registry.js"(exports2, module2) {
    var ITEM_CATEGORY = {
      CURRENCY: "currency",
      MATERIAL: "material",
      CONSUMABLE: "consumable",
      EQUIPMENT: "equipment",
      QUEST: "quest",
      KEY: "key"
    };
    var ITEMS = {
      shadow_essence: {
        id: "shadow_essence",
        name: "Shadow Essence",
        category: ITEM_CATEGORY.CURRENCY,
        stackable: true,
        maxStack: 0,
        icon: "\u{1FA78}",
        rarity: "B",
        description: "Crystallized mana extracted from fallen enemies. Used to promote shadow soldiers through the ranks.",
        source: ["Dungeons", "ShadowArmy"]
      },
      demon_soul: {
        id: "demon_soul",
        name: "Demon Soul",
        category: ITEM_CATEGORY.CURRENCY,
        stackable: true,
        maxStack: 0,
        icon: "\u{1F47F}",
        rarity: "A",
        description: "Soul fragment torn from a slain demon in the Demon Castle. The System tracks these as proof of conquest.",
        source: ["Dungeons"]
      },
      entry_permit: {
        id: "entry_permit",
        name: "Entry Permit",
        category: ITEM_CATEGORY.KEY,
        stackable: true,
        maxStack: 0,
        icon: "\u{1F3AB}",
        rarity: "S",
        description: "A permit that grants passage to the next floor of the Demon Castle. Consumed on floor advancement.",
        source: ["Dungeons"]
      },
      // ──────────────────────────────────────────────────
      // Future items — defined now for schema stability
      // ──────────────────────────────────────────────────
      holy_water_of_life: {
        id: "holy_water_of_life",
        name: "Holy Water of Life",
        category: ITEM_CATEGORY.QUEST,
        stackable: false,
        maxStack: 1,
        icon: "\u{1F4A7}",
        rarity: "SSS",
        description: "Sacred water obtained by clearing all 100 floors of the Demon Castle. Can cure any ailment.",
        source: ["Dungeons"]
      }
      /* Placeholder templates for equipment system:
      knights_daggers: {
        id: 'knights_daggers',
        name: "Knight Killer's Daggers",
        category: ITEM_CATEGORY.EQUIPMENT,
        stackable: false,
        maxStack: 1,
        icon: '🗡️',
        rarity: 'S',
        description: 'Twin daggers forged from Vulcan\'s flames.',
        source: ['Dungeons'],
        slot: 'weapon',
        stats: { strength: 50, agility: 30 },
      },
      */
    };
    function getItem(id) {
      return ITEMS[id] || null;
    }
    function getItemsByCategory(category) {
      return Object.values(ITEMS).filter((item) => item.category === category);
    }
    function getAllItems2() {
      return Object.values(ITEMS);
    }
    function isValidItem(id) {
      return id in ITEMS;
    }
    module2.exports = {
      ITEM_CATEGORY,
      ITEMS,
      getItem,
      getItemsByCategory,
      getAllItems: getAllItems2,
      isValidItem
    };
  }
});

// src/ItemVault/event-api.js
var require_event_api = __commonJS({
  "src/ItemVault/event-api.js"(exports2, module2) {
    var Events2 = require_event_bus();
    var { isValidItem } = require_item_registry();
    var ItemVaultEventAPI2 = class {
      constructor(storage, debugLog) {
        this._storage = storage;
        this._debugLog = debugLog || (() => {
        });
        this._handlers = {};
      }
      mount() {
        this._handlers = {
          add: (data) => this._onAdd(data),
          spend: (data) => this._onSpend(data),
          set: (data) => this._onSet(data),
          query: (data) => this._onQuery(data),
          queryAll: (data) => this._onQueryAll(data)
        };
        Events2.on("ItemVault:add", this._handlers.add);
        Events2.on("ItemVault:spend", this._handlers.spend);
        Events2.on("ItemVault:set", this._handlers.set);
        Events2.on("ItemVault:query", this._handlers.query);
        Events2.on("ItemVault:queryAll", this._handlers.queryAll);
        this._debugLog("EventAPI mounted \u2014 listening for ItemVault events");
      }
      unmount() {
        Events2.off("ItemVault:add", this._handlers.add);
        Events2.off("ItemVault:spend", this._handlers.spend);
        Events2.off("ItemVault:set", this._handlers.set);
        Events2.off("ItemVault:query", this._handlers.query);
        Events2.off("ItemVault:queryAll", this._handlers.queryAll);
        this._handlers = {};
      }
      broadcastReady() {
        Events2.emit("ItemVault:ready", {
          balances: this._storage.getAllBalances()
        });
      }
      _onAdd({ itemId, amount, source, meta } = {}) {
        if (!itemId || !amount || amount <= 0) return;
        if (!isValidItem(itemId)) {
          this._debugLog(`ADD rejected \u2014 unknown item: ${itemId}`);
          return;
        }
        const oldAmount = this._storage.getAmount(itemId);
        const newAmount = this._storage.add(itemId, amount, meta);
        this._debugLog(`ADD ${itemId}: ${oldAmount} \u2192 ${newAmount} (+${amount}) [${source || "unknown"}]`);
        Events2.emit("ItemVault:changed", {
          itemId,
          oldAmount,
          newAmount,
          action: "add",
          amount,
          source: source || "unknown"
        });
      }
      _onSpend({ itemId, amount, source, reason } = {}) {
        if (!itemId || !amount || amount <= 0) return;
        if (!isValidItem(itemId)) {
          this._debugLog(`SPEND rejected \u2014 unknown item: ${itemId}`);
          return;
        }
        const oldAmount = this._storage.getAmount(itemId);
        const result = this._storage.spend(itemId, amount);
        if (result.success) {
          this._debugLog(`SPEND ${itemId}: ${oldAmount} \u2192 ${result.newAmount} (-${amount}) [${source || "unknown"}] ${reason || ""}`);
          Events2.emit("ItemVault:changed", {
            itemId,
            oldAmount,
            newAmount: result.newAmount,
            action: "spend",
            amount,
            source: source || "unknown",
            reason
          });
        } else {
          const failKey = `${itemId}:${amount}:${oldAmount}`;
          if (this._lastSpendFailKey !== failKey) {
            this._lastSpendFailKey = failKey;
            this._debugLog(`SPEND FAILED ${itemId}: have ${oldAmount}, need ${amount}, short ${result.shortfall} [${source || "unknown"}]`);
          }
          Events2.emit("ItemVault:spendFailed", {
            itemId,
            requested: amount,
            current: oldAmount,
            shortfall: result.shortfall,
            source: source || "unknown",
            reason
          });
        }
      }
      _onSet({ itemId, amount, source } = {}) {
        if (!itemId || amount == null) return;
        if (!isValidItem(itemId)) return;
        const oldAmount = this._storage.getAmount(itemId);
        const newAmount = this._storage.set(itemId, amount);
        if (newAmount === oldAmount) return;
        this._debugLog(`SET ${itemId}: ${oldAmount} \u2192 ${newAmount} [${source || "unknown"}]`);
        Events2.emit("ItemVault:changed", {
          itemId,
          oldAmount,
          newAmount,
          action: "set",
          source: source || "unknown"
        });
      }
      _onQuery({ itemId, callback } = {}) {
        if (typeof callback !== "function") return;
        if (itemId) {
          callback({ itemId, amount: this._storage.getAmount(itemId) });
        } else {
          callback({ balances: this._storage.getAllBalances() });
        }
      }
      _onQueryAll({ callback } = {}) {
        if (typeof callback !== "function") return;
        callback({ balances: this._storage.getAllBalances() });
      }
    };
    module2.exports = { ItemVaultEventAPI: ItemVaultEventAPI2 };
  }
});

// src/ItemVault/migration.js
var require_migration = __commonJS({
  "src/ItemVault/migration.js"(exports2, module2) {
    var MIGRATION_KEY = "ItemVault_migrated_v1";
    async function runMigration2(storage, debugLog) {
      var _a;
      const migrated = BdApi.Data.load("ItemVault", MIGRATION_KEY);
      if (migrated) return false;
      debugLog("Running first-time migration from legacy plugin storage...");
      let count = 0;
      try {
        const saData = BdApi.Data.load("ShadowArmy", "settings");
        const essence = (_a = saData == null ? void 0 : saData.shadowEssence) == null ? void 0 : _a.essence;
        if (typeof essence === "number" && essence > 0) {
          storage.set("shadow_essence", Math.floor(essence));
          debugLog(`Migrated shadow_essence: ${Math.floor(essence)}`);
          count++;
        }
      } catch (err) {
        debugLog(`Migration warning (shadow_essence): ${err.message}`);
      }
      debugLog("Demon souls: will sync from Dungeons on next load (IDB-backed, no direct migration)");
      debugLog("Entry permits: will sync from Dungeons on next load");
      BdApi.Data.save("ItemVault", MIGRATION_KEY, {
        completedAt: Date.now(),
        itemsMigrated: count
      });
      debugLog(`Migration complete: ${count} items transferred`);
      return true;
    }
    module2.exports = { runMigration: runMigration2 };
  }
});

// src/ItemVault/styles.css
var require_styles = __commonJS({
  "src/ItemVault/styles.css"(exports2, module2) {
    module2.exports = "/* ItemVault \u2014 Inventory UI Styles */\n\n/* \u2500\u2500\u2500 SL-themed scrollbar for the header popup (overrides macOS default) \u2500\u2500\u2500 */\n#itemvault-header-popup::-webkit-scrollbar {\n  width: 9px;\n}\n#itemvault-header-popup::-webkit-scrollbar-track {\n  background: rgba(8, 8, 13, 0.6);\n}\n#itemvault-header-popup::-webkit-scrollbar-thumb {\n  background: linear-gradient(180deg, rgba(138, 43, 226, 0.6) 0%, rgba(138, 43, 226, 0.38) 100%);\n  border: 1px solid rgba(138, 43, 226, 0.35);\n  border-radius: 2px;\n}\n#itemvault-header-popup::-webkit-scrollbar-thumb:hover {\n  background: linear-gradient(180deg, rgba(186, 85, 211, 0.75) 0%, rgba(138, 43, 226, 0.5) 100%);\n}\n\n/* \u2500\u2500\u2500 Toast notification override for vault events \u2500\u2500\u2500 */\n.iv-toast {\n  font-size: 14px;\n}\n\n.iv-toast-add {\n  color: #00ff88;\n}\n\n.iv-toast-spend {\n  color: #8a2be2;\n}\n\n/* \u2500\u2500\u2500 Balance widget (inline display for other plugin UIs) \u2500\u2500\u2500 */\n.iv-balance-badge {\n  display: inline-flex;\n  align-items: center;\n  gap: 4px;\n  padding: 2px 8px;\n  border-radius: 2px;\n  background: rgba(138,43,226,0.12);\n  font-size: 12px;\n  font-weight: 600;\n  color: #8a2be2;\n  white-space: nowrap;\n}\n\n.iv-balance-badge .iv-icon {\n  font-size: 14px;\n}\n\n.iv-balance-badge .iv-amount {\n  font-variant-numeric: tabular-nums;\n}\n";
  }
});

// src/ItemVault/manifest.json
var require_manifest = __commonJS({
  "src/ItemVault/manifest.json"(exports2, module2) {
    module2.exports = {
      name: "ItemVault",
      description: "Centralized item storage and inventory system for the Solo Leveling plugin ecosystem. Manages currencies, materials, consumables, and future equipment.",
      version: "1.0.0",
      author: "Solo Leveling Theme Dev, matthewqilanthompson"
    };
  }
});

// src/shared/toolbar-tooltip.js
var require_toolbar_tooltip = __commonJS({
  "src/shared/toolbar-tooltip.js"(exports2, module2) {
    var SHARED_CSS_ID = "sl-toolbar-tip-shared";
    var TOOLTIP_CSS = `
  /* \u2500\u2500 Shared Toolbar Tooltip \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */
  .sl-toolbar-tip {
    position: fixed;
    transform: translateX(-50%);
    padding: 8px 12px;
    background: rgb(10, 10, 15);
    border: 1px solid rgba(138, 43, 226, 0.4);
    border-radius: 2px;
    box-shadow: 0 2px 12px rgba(138, 43, 226, 0.25), 0 0 20px rgba(138, 43, 226, 0.08);
    color: #fff;
    font-size: 14px;
    font-weight: 600;
    letter-spacing: 0.3px;
    white-space: nowrap;
    pointer-events: none;
    opacity: 0;
    transition: opacity 0.1s ease;
    z-index: 999999;
  }
  .sl-toolbar-tip--visible {
    opacity: 1;
  }
  .sl-toolbar-tip::after {
    content: '';
    position: absolute;
    bottom: 100%;
    left: 50%;
    transform: translateX(-50%);
    border: 5px solid transparent;
    border-bottom-color: rgba(138, 43, 226, 0.4);
  }
`;
    function ensureTooltipCSS2() {
      if (document.getElementById(SHARED_CSS_ID)) return;
      try {
        BdApi.DOM.addStyle(SHARED_CSS_ID, TOOLTIP_CSS);
      } catch (_) {
        const style = document.createElement("style");
        style.id = SHARED_CSS_ID;
        style.textContent = TOOLTIP_CSS;
        (document.head || document.documentElement).appendChild(style);
      }
    }
    function showToolbarTooltip2(icon, tooltipId, label) {
      const rect = icon.getBoundingClientRect();
      let tip = document.getElementById(tooltipId);
      if (!tip) {
        tip = document.createElement("div");
        tip.id = tooltipId;
        tip.className = "sl-toolbar-tip";
        (document.body || document.documentElement).appendChild(tip);
      }
      tip.textContent = label;
      if (!tip._cachedHeight || tip._lastLabel !== label) {
        tip._cachedHeight = tip.offsetHeight;
        tip._lastLabel = label;
      }
      tip.style.top = `${rect.bottom + 8}px`;
      tip.style.left = `${rect.left + rect.width / 2}px`;
      tip.classList.add("sl-toolbar-tip--visible");
    }
    function hideToolbarTooltip2(tooltipId) {
      const tip = document.getElementById(tooltipId);
      if (tip) tip.classList.remove("sl-toolbar-tip--visible");
    }
    function removeToolbarTooltip2(tooltipId) {
      const tip = document.getElementById(tooltipId);
      if (tip) tip.remove();
    }
    module2.exports = {
      showToolbarTooltip: showToolbarTooltip2,
      hideToolbarTooltip: hideToolbarTooltip2,
      removeToolbarTooltip: removeToolbarTooltip2,
      ensureTooltipCSS: ensureTooltipCSS2
    };
  }
});

// src/shared/escape-html.js
var require_escape_html = __commonJS({
  "src/shared/escape-html.js"(exports2, module2) {
    function escapeHtml2(value) {
      return String(value ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");
    }
    module2.exports = { escapeHtml: escapeHtml2 };
  }
});

// src/ItemVault/index.js
var Events = require_event_bus();
var { onKeydown } = require_dom_bus();
var { watchToolbar } = require_header_toolbar();
var { ItemVaultStorage } = require_storage();
var { ItemVaultEventAPI } = require_event_api();
var { runMigration } = require_migration();
var { getAllItems } = require_item_registry();
var CSS = require_styles();
var { version: PLUGIN_VERSION } = require_manifest();
var { showToolbarTooltip, hideToolbarTooltip, removeToolbarTooltip, ensureTooltipCSS } = require_toolbar_tooltip();
var STYLE_ID = "ItemVault-styles";
var HEADER_ICON_ID = "itemvault-header-icon";
var POPUP_ID = "itemvault-header-popup";
var HIDDEN_CHANNEL_TYPES = /* @__PURE__ */ new Set([2, 13]);
function _getUrlChannelType() {
  var _a, _b, _c, _d, _e;
  try {
    const path = String(((_a = window.location) == null ? void 0 : _a.pathname) || "");
    const match = path.match(/^\/channels\/(?:@me|\d+)\/(\d+)/);
    if (!match) return null;
    const channel = (_e = (_d = (_c = (_b = BdApi == null ? void 0 : BdApi.Webpack) == null ? void 0 : _b.getStore) == null ? void 0 : _c.call(_b, "ChannelStore")) == null ? void 0 : _d.getChannel) == null ? void 0 : _e.call(_d, match[1]);
    return channel ? Number(channel.type) : null;
  } catch (_) {
    return null;
  }
}
function _visibleChannelHeaders() {
  return Array.from(
    document.querySelectorAll('section[aria-label="Channel header"]')
  ).filter((el) => el.offsetParent !== null);
}
var { escapeHtml } = require_escape_html();
module.exports = class ItemVault {
  constructor() {
    this._storage = new ItemVaultStorage();
    this._eventAPI = null;
    this._debugMode = false;
    this._unwatchToolbar = null;
    this._popupTickLoop = null;
    this._stopped = true;
  }
  // ─── Lifecycle ──────────────────────────────────────
  async start() {
    this._stopped = false;
    this._debugMode = BdApi.Data.load("ItemVault", "debugMode") ?? false;
    this._log(`header-icon rules engaged \xB7 ${(/* @__PURE__ */ new Date()).toLocaleTimeString()}`);
    this._log(`ItemVault v${PLUGIN_VERSION} starting...`);
    BdApi.DOM.addStyle(STYLE_ID, CSS);
    try {
      await this._storage.open();
      await this._storage.loadAll();
      this._log(`Storage loaded: ${Object.keys(this._storage.getAllBalances()).length} item types`);
    } catch (err) {
      console.error("[ItemVault] Storage init failed:", err);
      BdApi.UI.showToast("ItemVault: Storage failed to initialize", { type: "error" });
      return;
    }
    try {
      await runMigration(this._storage, (msg) => this._log(msg));
    } catch (err) {
      console.error("[ItemVault] Migration error:", err);
    }
    this._eventAPI = new ItemVaultEventAPI(this._storage, (msg) => this._log(msg));
    this._eventAPI.mount();
    this._eventAPI.broadcastReady();
    this._renderDebounceTimer = null;
    this._onChanged = () => {
      clearTimeout(this._renderDebounceTimer);
      this._renderDebounceTimer = setTimeout(() => {
        if (!document.getElementById(POPUP_ID)) return;
        this._renderPopupContent();
      }, 16);
    };
    Events.on("ItemVault:changed", this._onChanged);
    this._startHeaderIcon();
    this._log("ItemVault ready.");
  }
  stop() {
    this._stopped = true;
    this._log("ItemVault stopping...");
    this._stopHeaderIcon();
    this._closePopup();
    removeToolbarTooltip("sl-toolbar-tip-iv");
    if (this._onChanged) {
      Events.off("ItemVault:changed", this._onChanged);
      this._onChanged = null;
    }
    clearTimeout(this._renderDebounceTimer);
    this._renderDebounceTimer = null;
    if (this._eventAPI) {
      this._eventAPI.unmount();
      this._eventAPI = null;
    }
    this._storage.close().catch((err) => {
      console.error("[ItemVault] Storage close error:", err);
    });
    BdApi.DOM.removeStyle(STYLE_ID);
    this._log("ItemVault stopped");
  }
  // ─── Header Icon ──────────────────────────────────
  //
  // Injection rules (all must hold to inject):
  //   1. URL channel must not be a voice / stage channel.
  //   2. Exactly ONE channel-header section is visible. When the VC chat
  //      overlay is open Discord renders TWO headers — refuse to inject
  //      in that scenario.
  //   3. The icon, if it already exists, must live inside the canonical
  //      header. If it has migrated, remove and re-inject in the right
  //      place.
  _removeHeaderIcon() {
    const el = document.getElementById(HEADER_ICON_ID);
    if (el) el.remove();
  }
  _getIconSVG() {
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
      <rect x="2" y="7" width="20" height="14" rx="2"/>
      <path d="M16 7V5a4 4 0 0 0-8 0v2"/>
      <circle cx="12" cy="15" r="2"/>
      <line x1="12" y1="17" x2="12" y2="19"/>
    </svg>`;
  }
  _startHeaderIcon() {
    if (this._unwatchToolbar) return;
    this._unwatchToolbar = watchToolbar(() => {
      if (this._stopped || document.hidden) return;
      this._ensureHeaderIcon();
    });
  }
  _stopHeaderIcon() {
    if (this._unwatchToolbar) {
      try {
        this._unwatchToolbar();
      } catch (_) {
      }
      this._unwatchToolbar = null;
    }
    this._removeHeaderIcon();
  }
  _ensureHeaderIcon() {
    const channelType = _getUrlChannelType();
    if (HIDDEN_CHANNEL_TYPES.has(channelType)) {
      this._removeHeaderIcon();
      return;
    }
    const headers = _visibleChannelHeaders();
    if (headers.length !== 1) {
      this._removeHeaderIcon();
      return;
    }
    const canonical = headers[0];
    const toolbar = canonical.querySelector('[class*="toolbar_"]');
    if (!toolbar) {
      this._removeHeaderIcon();
      return;
    }
    const existing = document.getElementById(HEADER_ICON_ID);
    if (existing == null ? void 0 : existing.isConnected) {
      if (canonical.contains(existing)) return;
      existing.remove();
    }
    if (toolbar.querySelector(`#${HEADER_ICON_ID}`)) return;
    const btn = document.createElement("div");
    btn.id = HEADER_ICON_ID;
    btn.style.cssText = `
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 24px;
      height: 24px;
      cursor: pointer;
      color: #b5bac1;
      margin: 0 2px;
      border-radius: 2px;
      opacity: 0.85;
      transition: opacity 0.15s, background 0.15s, color 0.15s;
    `;
    btn.innerHTML = this._getIconSVG();
    ensureTooltipCSS();
    btn.addEventListener("mouseenter", () => {
      btn.style.opacity = "1";
      btn.style.background = "rgba(138,43,226,0.15)";
      showToolbarTooltip(btn, "sl-toolbar-tip-iv", "Item Vault");
    });
    btn.addEventListener("mouseleave", () => {
      btn.style.opacity = "0.85";
      btn.style.background = "";
      hideToolbarTooltip("sl-toolbar-tip-iv");
    });
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      this._togglePopup(btn);
    });
    if (toolbar.firstChild) {
      toolbar.insertBefore(btn, toolbar.firstChild);
    } else {
      toolbar.appendChild(btn);
    }
  }
  // ─── Popup ────────────────────────────────────────
  _togglePopup(anchorEl) {
    const existing = document.getElementById(POPUP_ID);
    if (existing) {
      this._closePopup();
      return;
    }
    this._openPopup(anchorEl);
  }
  _openPopup(anchorEl) {
    this._closePopup();
    const POPUP_WIDTH = 540;
    const popup = document.createElement("div");
    popup.id = POPUP_ID;
    popup.style.cssText = `
      position: fixed;
      z-index: 10001;
      width: ${POPUP_WIDTH}px;
      max-height: calc(100vh - 80px);
      overflow-y: auto;
      background: linear-gradient(165deg, rgba(22,18,32,0.97) 0%, rgba(13,12,20,0.97) 55%, rgba(10,10,16,0.98) 100%);
      border: 1px solid rgba(138, 43, 226, 0.32);
      border-radius: 2px;
      box-shadow: 0 20px 52px rgba(0, 0, 0, 0.85), 0 0 30px rgba(138, 43, 226, 0.18), inset 0 1px 0 rgba(255,255,255,0.06), inset 0 0 0 1px rgba(138,43,226,0.06);
      padding: 0;
      scrollbar-width: thin;
      scrollbar-color: rgba(138,43,226,0.85) rgba(8,8,13,0.55);
    `;
    const anchorRect = anchorEl ? anchorEl.getBoundingClientRect() : null;
    document.body.appendChild(popup);
    if (anchorEl) {
      const rect = anchorRect;
      const vpW = window.innerWidth;
      let top = rect.bottom + 8;
      let left = rect.right - POPUP_WIDTH;
      if (left < 8) left = 8;
      if (left + POPUP_WIDTH > vpW - 8) left = vpW - POPUP_WIDTH - 8;
      popup.style.top = `${top}px`;
      popup.style.left = `${left}px`;
    }
    this._renderPopupContent();
    this._popupAnchor = anchorEl;
    this._outsideHandler = (e) => {
      if (!popup.contains(e.target) && !(anchorEl == null ? void 0 : anchorEl.contains(e.target))) {
        this._closePopup();
      }
    };
    setTimeout(() => document.addEventListener("click", this._outsideHandler, true), 50);
    this._escHandler = (e) => {
      if (e.key === "Escape") {
        this._closePopup();
        e.stopPropagation();
      }
    };
    this._escUnsub = onKeydown(this._escHandler, { capture: true });
  }
  _closePopup() {
    const popup = document.getElementById(POPUP_ID);
    if (popup) popup.remove();
    if (this._outsideHandler) {
      document.removeEventListener("click", this._outsideHandler, true);
      this._outsideHandler = null;
    }
    if (this._escUnsub) {
      this._escUnsub();
      this._escUnsub = null;
    }
    this._escHandler = null;
  }
  _renderPopupContent() {
    const popup = document.getElementById(POPUP_ID);
    if (!popup) return;
    const balances = this._storage.getAllBalances();
    const items = getAllItems();
    const totalItems = Object.values(balances).reduce((sum, v) => sum + (v || 0), 0);
    const scrollTop = popup.scrollTop;
    popup.innerHTML = `
      <!-- Header bar -->
      <div style="
        display: flex;
        align-items: center;
        gap: 10px;
        padding: 16px 20px;
        background: linear-gradient(90deg, rgba(138,43,226,0.15) 0%, rgba(10,10,15,0) 100%);
        border-bottom: 1px solid rgba(138,43,226,0.3);
      ">
        <div style="flex: 1;">
          <h3 style="margin: 0; font-size: 17px; font-weight: 800; color: #dcddde; letter-spacing: 0.04em; text-transform: uppercase;">Item Vault</h3>
          <div style="font-size: 10px; color: #b5bac1; margin-top: 1px; letter-spacing: 0.03em;">Solo Leveling Inventory</div>
        </div>
        <span style="font-size: 10px; color: #b5bac1; font-weight: 600;">${PLUGIN_VERSION}</span>
      </div>

      <!-- Stats row -->
      <div style="
        display: flex;
        padding: 12px 20px;
        background: rgba(138,43,226,0.04);
        border-bottom: 1px solid rgba(138,43,226,0.15);
      ">
        <div style="flex: 1; text-align: center;">
          <div style="font-size: 20px; font-weight: 800; color: #8a2be2; font-variant-numeric: tabular-nums;">${totalItems.toLocaleString()}</div>
          <div style="font-size: 9px; color: #b5bac1; text-transform: uppercase; letter-spacing: 0.1em; font-weight: 600;">Total</div>
        </div>
        <div style="width: 1px; background: rgba(138,43,226,0.2); margin: 4px 0;"></div>
        <div style="flex: 1; text-align: center;">
          <div style="font-size: 20px; font-weight: 800; color: #8a2be2; font-variant-numeric: tabular-nums;">${items.filter((i) => (balances[i.id] || 0) > 0).length}</div>
          <div style="font-size: 9px; color: #b5bac1; text-transform: uppercase; letter-spacing: 0.1em; font-weight: 600;">Held</div>
        </div>
        <div style="width: 1px; background: rgba(138,43,226,0.2); margin: 4px 0;"></div>
        <div style="flex: 1; text-align: center;">
          <div style="font-size: 20px; font-weight: 800; color: #8a2be2; font-variant-numeric: tabular-nums;">${items.length}</div>
          <div style="font-size: 9px; color: #b5bac1; text-transform: uppercase; letter-spacing: 0.1em; font-weight: 600;">Types</div>
        </div>
      </div>

      <!-- Items -->
      <div style="padding: 12px 16px;">
        <div style="font-size: 10px; color: #b5bac1; text-transform: uppercase; letter-spacing: 0.12em; font-weight: 700; margin-bottom: 10px; padding-left: 4px;">Inventory</div>
        ${items.filter((i) => i.stackable).map((item) => {
      const amount = balances[item.id] || 0;
      const rarityColor = this._getRarityColor(item.rarity);
      const hasAny = amount > 0;
      const sourceStr = Array.isArray(item.source) ? item.source.join(", ") : item.source || "\u2014";
      return `
            <div style="
              display: flex;
              align-items: center;
              gap: 14px;
              padding: 14px 16px;
              margin-bottom: 2px;
              background: ${hasAny ? "rgba(138,43,226,0.04)" : "rgba(255,255,255,0.01)"};
              border-left: 3px solid ${rarityColor};
              border-bottom: 1px solid rgba(138,43,226,0.08);
              transition: background 0.12s;
              opacity: ${hasAny ? "1" : "0.45"};
            " onmouseenter="this.style.background='rgba(138,43,226,0.1)'" onmouseleave="this.style.background='${hasAny ? "rgba(138,43,226,0.04)" : "rgba(255,255,255,0.01)"}'" >
              <!-- Icon -->
              <div style="
                width: 44px; height: 44px;
                display: flex; align-items: center; justify-content: center;
                background: rgba(138,43,226,0.08);
                border: 1px solid rgba(138,43,226,0.15);
                font-size: 24px;
                flex-shrink: 0;
              ">${item.icon}</div>

              <!-- Info -->
              <div style="flex: 1; min-width: 0;">
                <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 4px;">
                  <span style="font-size: 14px; font-weight: 700; color: #dcddde;">${escapeHtml(item.name)}</span>
                  <span style="
                    font-size: 9px;
                    font-weight: 800;
                    color: ${rarityColor};
                    padding: 2px 6px;
                    background: ${rarityColor}15;
                    border: 1px solid ${rarityColor}30;
                    text-transform: uppercase;
                    letter-spacing: 0.06em;
                  ">${item.rarity}-Rank</span>
                </div>
                <div style="font-size: 11px; color: #b5bac1; line-height: 1.45;">${escapeHtml(item.description)}</div>
                <div style="font-size: 9px; color: #b5bac1; margin-top: 5px; text-transform: uppercase; letter-spacing: 0.06em;">Source: ${escapeHtml(sourceStr)}</div>
              </div>

              <!-- Amount -->
              <div style="text-align: right; min-width: 80px; flex-shrink: 0;">
                <div style="
                  font-size: 22px;
                  font-weight: 800;
                  color: ${hasAny ? rarityColor : "#2a1a3a"};
                  font-variant-numeric: tabular-nums;
                  line-height: 1;
                ">${amount.toLocaleString()}</div>
                <div style="font-size: 8px; color: #b5bac1; text-transform: uppercase; letter-spacing: 0.08em; margin-top: 3px; font-weight: 600;">${escapeHtml(item.category)}</div>
              </div>
            </div>
          `;
    }).join("")}
        ${items.filter((i) => i.stackable).length === 0 ? '<div style="text-align: center; color: #b5bac1; padding: 30px; font-size: 12px;">No items registered. Enter a dungeon!</div>' : ""}
      </div>
    `;
    popup.scrollTop = scrollTop;
  }
  _getRarityColor(rarity) {
    const colors = {
      E: "#9ca3af",
      D: "#60a5fa",
      C: "#34d399",
      B: "#a78bfa",
      A: "#f59e0b",
      S: "#ef4444",
      SS: "#ec4899",
      SSS: "#8b5cf6",
      Monarch: "#fbbf24"
    };
    return colors[rarity] || "#9ca3af";
  }
  // ─── Settings Panel ─────────────────────────────────
  getSettingsPanel() {
    const panel = document.createElement("div");
    panel.style.cssText = "padding: 16px; background: rgba(10, 10, 16, 0.98); color: #dcddde;";
    const header = document.createElement("h2");
    header.textContent = `ItemVault v${PLUGIN_VERSION}`;
    header.style.cssText = "margin: 0 0 16px 0; font-size: 18px; color: #dcddde;";
    panel.appendChild(header);
    const desc = document.createElement("p");
    desc.textContent = "Centralized item storage for the Solo Leveling ecosystem. Click the vault icon in the channel header to view your inventory.";
    desc.style.cssText = "margin: 0 0 16px 0; font-size: 13px; color: #b5bac1;";
    panel.appendChild(desc);
    const debugRow = document.createElement("div");
    debugRow.style.cssText = "display: flex; align-items: center; gap: 8px; padding: 8px 0;";
    const debugToggle = document.createElement("input");
    debugToggle.type = "checkbox";
    debugToggle.checked = this._debugMode;
    debugToggle.addEventListener("change", () => {
      this._debugMode = debugToggle.checked;
      BdApi.Data.save("ItemVault", "debugMode", this._debugMode);
    });
    const debugLabel = document.createElement("span");
    debugLabel.textContent = "Debug Mode";
    debugLabel.style.cssText = "font-size: 13px; color: #b5bac1;";
    debugRow.appendChild(debugToggle);
    debugRow.appendChild(debugLabel);
    panel.appendChild(debugRow);
    return panel;
  }
  // ─── Debug Logging ──────────────────────────────────
  _log(...args) {
    if (this._debugMode) {
      console.log("[ItemVault]", ...args);
    }
  }
};
