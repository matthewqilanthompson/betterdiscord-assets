/**
 * @name RulersAuthority
 * @description Telekinetic control over Discord's UI — push, pull, grip, and crush panels and channels. Solo Leveling themed.
 * @version 2.1.2
 * @author matthewqilanthompson
 * @source https://github.com/matthewqilanthompson/betterdiscord-assets
 */
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// src/shared/bd-module-loader.js
var require_bd_module_loader = __commonJS({
  "src/shared/bd-module-loader.js"(exports2, module2) {
    function loadBdModuleFromPlugins2(fileName) {
      if (!fileName) return null;
      try {
        const fs = require("fs");
        const path = require("path");
        const source = fs.readFileSync(path.join(BdApi.Plugins.folder, fileName), "utf8");
        const moduleObj = { exports: {} };
        const factory = new Function(
          "module",
          "exports",
          "require",
          "BdApi",
          `${source}
return module.exports || exports || null;`
        );
        const loaded = factory(moduleObj, moduleObj.exports, require, BdApi);
        const candidate = loaded || moduleObj.exports;
        if (typeof candidate === "function") return candidate;
        if (candidate && typeof candidate === "object" && Object.keys(candidate).length > 0) {
          return candidate;
        }
      } catch (_) {
      }
      return null;
    }
    module2.exports = {
      loadBdModuleFromPlugins: loadBdModuleFromPlugins2
    };
  }
});

// src/shared/discord-classes.js
var require_discord_classes = __commonJS({
  "src/shared/discord-classes.js"(exports2, module2) {
    var { Webpack } = BdApi;
    var _resolved = false;
    var _cls = {};
    var _sel = {};
    var _fb = {};
    var DEFS = {
      // Layout / Panels
      chatContent: [["chatContent"], "chatContent", '[class*="chatContent_"]'],
      sidebar: [["sidebar"], "sidebar", '[class*="sidebar_"]'],
      sidebarList: [["sidebar", "sidebarList"], "sidebarList", '[class*="sidebar_"]'],
      membersWrap: [["membersWrap"], "membersWrap", '[class*="membersWrap_"]'],
      members: [["membersWrap"], "members", '[class*="members_"]'],
      container: [["membersWrap"], "container", '[class*="container_"]'],
      privateChannels: [["privateChannels"], "privateChannels", '[class*="privateChannels_"]'],
      userProfileOuter: [["userProfileOuter"], "userProfileOuter", '[class*="userProfileOuter_"]'],
      searchResultsWrap: [["searchResultsWrap"], "searchResultsWrap", '[class*="searchResultsWrap_"]'],
      // Scrolling
      scroller: [["scroller", "thin"], "scroller", '[class*="scroller_"]'],
      scrollerBase: [["scrollerBase"], "scrollerBase", '[class*="scrollerBase_"]'],
      thin: [["scroller", "thin"], "thin", '[class*="thin_"]'],
      // Messages
      messageListItem: [["messageListItem"], "messageListItem", '[class*="messageListItem_"]'],
      message: [["message", "groupStart"], "message", '[class*="message_"]'],
      groupStart: [["message", "groupStart"], "groupStart", '[class*="groupStart_"]'],
      cozy: [["message", "cozy"], "cozy", '[class*="cozy_"]'],
      messageContent: [["messageContent"], "messageContent", '[class*="messageContent_"]'],
      markup: [["markup"], "markup", '[class*="markup_"]'],
      mentioned: [["mentioned"], "mentioned", '[class*="mentioned_"]'],
      // Message parts
      author: [null, "author", '[class*="author_"]'],
      username: [["username"], "username", '[class*="username_"]'],
      timestamp: [["timestamp"], "timestamp", '[class*="timestamp_"]'],
      avatar: [["avatar", "wrapper"], "avatar", '[class*="avatar_"]'],
      repliedMessage: [["repliedMessage"], "repliedMessage", '[class*="repliedMessage_"]'],
      embed: [["embed"], "embed", '[class*="embed_"]'],
      attachment: [["attachment"], "attachment", '[class*="attachment_"]'],
      embedWrapper: [["embedWrapper"], "embedWrapper", '[class*="embedWrapper_"]'],
      botTag: [["botTag"], "botTag", '[class*="botTag_"]'],
      // Header / Toolbar
      toolbar: [["updateIconForeground", "search", "toolbar"], "toolbar", '[class*="toolbar_"]'],
      titleWrapper: [["titleWrapper"], "titleWrapper", '[class*="titleWrapper_"]'],
      title: [["title", "lineClamp"], "title", '[class*="title_"]'],
      channelHeader: [["channelHeader"], "channelHeader", '[class*="channelHeader_"]'],
      // Input / Composer
      channelTextArea: [["channelTextArea"], "channelTextArea", '[class*="channelTextArea_"]'],
      textContainer: [["textContainer"], "textContainer", '[class*="textContainer_"]'],
      slateContainer: [["slateContainer"], "slateContainer", '[class*="slateContainer_"]'],
      editor: [["editor"], "editor", '[class*="editor_"]'],
      channelBottomBarArea: [["channelBottomBarArea"], "channelBottomBarArea", '[class*="channelBottomBarArea_"]'],
      scrollableContainer: [["scrollableContainer"], "scrollableContainer", '[class*="scrollableContainer_"]'],
      inner: [["inner"], "inner", '[class*="inner_"]'],
      // User panel / profile
      user: [["user"], "user", '[class*="user_"]'],
      nameTag: [["nameTag"], "nameTag", '[class*="nameTag_"]'],
      withTagAsButton: [["withTagAsButton"], "withTagAsButton", '[class*="withTagAsButton_"]'],
      panelSubtextContainer: [["panelSubtextContainer"], "panelSubtextContainer", '[class*="panelSubtextContainer_"]'],
      panelTitleContainer: [["panelTitleContainer"], "panelTitleContainer", '[class*="panelTitleContainer_"]'],
      // App layout
      base: [["base", "content"], "base", '[class*="base_"]'],
      content: [["base", "content"], "content", '[class*="content_"]'],
      layers: [["layers"], "layers", '[class*="layers_"]'],
      chat: [["chat"], "chat", '[class*="chat_"]'],
      chatLayerWrapper: [["chatLayerWrapper"], "chatLayerWrapper", '[class*="chatLayerWrapper_"]'],
      layerContainer: [["layerContainer"], "layerContainer", '[class*="layerContainer_"]'],
      panels: [["panels"], "panels", '[class*="panels_"]'],
      // Settings
      userSettings: [["standardSidebarView"], "standardSidebarView", '[class*="userSettings_"]'],
      standardSidebarView: [["standardSidebarView"], "standardSidebarView", '[class*="standardSidebarView_"]'],
      settingsContainer: [["settingsContainer"], "settingsContainer", '[class*="settingsContainer_"]'],
      searchBar: [["searchBar"], "searchBar", '[class*="searchBar_"]'],
      privateChannelsHeaderContainer: [["privateChannelsHeaderContainer"], "privateChannelsHeaderContainer", '[class*="privateChannelsHeaderContainer_"]'],
      // Messages (extended)
      messageList: [["messageList"], "messageList", '[class*="messageList_"]'],
      messageContainer: [["messageContainer"], "messageContainer", '[class*="messageContainer_"]'],
      messageGroupWrapper: [["messageGroupWrapper"], "messageGroupWrapper", '[class*="messageGroupWrapper_"]'],
      messages: [["messages"], "messages", '[class*="messages_"]'],
      messagesWrapper: [["messagesWrapper"], "messagesWrapper", '[class*="messagesWrapper_"]'],
      scrollerInner: [["scrollerInner"], "scrollerInner", '[class*="scrollerInner_"]'],
      systemMessage: [["systemMessage"], "systemMessage", '[class*="systemMessage_"]'],
      headerText: [["headerText"], "headerText", '[class*="headerText_"]'],
      // Guilds / Dock
      guilds: [["guilds", "wrapper"], "guilds", '[class*="guilds_"]'],
      wrapper: [["guilds", "wrapper"], "wrapper", '[class*="wrapper_"]'],
      // Forms / Composer
      form: [["form"], "form", '[class*="form_"]'],
      textArea: [["textArea"], "textArea", '[class*="textArea_"]'],
      slateTextArea: [["slateTextArea"], "slateTextArea", '[class*="slateTextArea_"]'],
      // Alerts / Badges / UI
      button: [["button"], "button", '[class*="button_"]'],
      listItem: [["listItem"], "listItem", '[class*="listItem_"]'],
      numberBadge: [["numberBadge"], "numberBadge", '[class*="numberBadge_"]'],
      mentionsBadge: [["mentionsBadge"], "mentionsBadge", '[class*="mentionsBadge_"]'],
      pill: [["pill"], "pill", '[class*="pill_"]'],
      // Probed 2026-03-13 (8 new stems)
      app: [null, "app", '[class*="app_"]'],
      bot: [["bot"], "bot", '[class*="bot_"]'],
      botText: [["botText"], "botText", '[class*="botText_"]'],
      channel: [["channel"], "channel", '[class*="channel_"]'],
      header: [["header"], "header", '[class*="header_"]'],
      name: [null, "name", '[class*="name_"]'],
      text: [["text"], "text", '[class*="text_"]'],
      thread: [["thread"], "thread", '[class*="thread_"]']
    };
    function _resolve() {
      const moduleCache = /* @__PURE__ */ new Map();
      for (const [name, [filterKeys, prop, fallback]] of Object.entries(DEFS)) {
        _fb[name] = fallback;
        let mod;
        if (filterKeys === null) {
          try {
            mod = Webpack.getModule(
              (m) => (m == null ? void 0 : m[prop]) && typeof m[prop] === "string" && /^\w+_\w{4,}/.test(m[prop])
            ) || null;
          } catch (_) {
            mod = null;
          }
        } else {
          const cacheKey = filterKeys.join("|");
          mod = moduleCache.get(cacheKey);
          if (mod === void 0) {
            try {
              mod = Webpack.getByKeys(...filterKeys) || null;
            } catch (_) {
              mod = null;
            }
            moduleCache.set(cacheKey, mod);
          }
        }
        const cls2 = mod == null ? void 0 : mod[prop];
        if (cls2 && typeof cls2 === "string" && !cls2.includes(" ")) {
          _cls[name] = cls2;
          _sel[name] = `.${cls2}`;
        } else {
          _cls[name] = "";
          _sel[name] = fallback;
        }
      }
      _resolved = true;
    }
    var sel = new Proxy(_sel, {
      get(target, prop) {
        if (!_resolved) _resolve();
        return target[prop];
      }
    });
    var cls = new Proxy(_cls, {
      get(target, prop) {
        if (!_resolved) _resolve();
        return target[prop];
      }
    });
    var fb = new Proxy(_fb, {
      get(target, prop) {
        if (!_resolved) _resolve();
        return target[prop];
      }
    });
    function refresh() {
      _resolved = false;
      _resolve();
    }
    function isResolved(name) {
      if (!_resolved) _resolve();
      return !!_cls[name];
    }
    function cssSelector(name, prefix = "", suffix = "") {
      if (!_resolved) _resolve();
      return `${prefix}${_sel[name]}${suffix}`;
    }
    function query(root, name) {
      if (!_resolved) _resolve();
      if (_cls[name]) {
        const el = root.querySelector(`.${_cls[name]}`);
        if (el) return el;
      }
      return root.querySelector(_fb[name]);
    }
    function queryAll(root, name) {
      if (!_resolved) _resolve();
      if (_cls[name]) {
        const list = root.querySelectorAll(`.${_cls[name]}`);
        if (list.length) return list;
      }
      return root.querySelectorAll(_fb[name]);
    }
    module2.exports = { sel, cls, fb, refresh, isResolved, cssSelector, query, queryAll };
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
    function onResize2(handler) {
      if (typeof handler !== "function") return () => {
      };
      return _getDomBus().addResize(handler);
    }
    module2.exports = { onKeydown: onKeydown2, onResize: onResize2 };
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
    function acquireDispatcher2() {
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
      const immediate = acquireDispatcher2();
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
        const dispatcher = acquireDispatcher2();
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
    module2.exports = { acquireDispatcher: acquireDispatcher2, pollForDispatcher, isValidDispatcher, resetCache };
  }
});

// src/shared/header-toolbar.js
var require_header_toolbar = __commonJS({
  "src/shared/header-toolbar.js"(exports2, module2) {
    var TOOLBAR_FALLBACKS2 = [
      '[aria-label="Channel header"] [class*="toolbar_"]',
      '[class*="titleWrapper_"] [class*="toolbar_"]',
      'header [class*="toolbar_"]'
    ];
    function getChannelHeaderToolbar2() {
      for (const selector of TOOLBAR_FALLBACKS2) {
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
      for (const selector of TOOLBAR_FALLBACKS2) {
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
    var { acquireDispatcher: acquireDispatcher2 } = require_dispatcher();
    function _resolveDispatcher() {
      return acquireDispatcher2();
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
              toolbar = getChannelHeaderToolbar2();
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
      TOOLBAR_FALLBACKS: TOOLBAR_FALLBACKS2,
      getChannelHeaderToolbar: getChannelHeaderToolbar2,
      getAllChannelHeaderToolbars,
      watchToolbar: watchToolbar2
    };
  }
});

// src/shared/toast.js
var require_toast = __commonJS({
  "src/shared/toast.js"(exports2, module2) {
    function createToast2() {
      return (message, type = "info", timeout) => {
        const opts = { type: type === "level-up" ? "info" : type };
        if (typeof timeout === "number" && timeout > 0) opts.timeout = timeout;
        BdApi.UI.showToast(message, opts);
      };
    }
    module2.exports = { createToast: createToast2 };
  }
});

// src/shared/plugin-bridge.js
var require_plugin_bridge = __commonJS({
  "src/shared/plugin-bridge.js"(exports2, module2) {
    var _BRIDGE_TTL_MS = 3e3;
    var _instanceCache = /* @__PURE__ */ new Map();
    function getPluginInstance2(pluginName) {
      var _a;
      const now = Date.now();
      const cached = _instanceCache.get(pluginName);
      if (cached && now - cached.ts < _BRIDGE_TTL_MS) {
        const inst = cached.instance;
        if (!inst || !(inst._stopped || inst._isStopped)) return inst;
      }
      let instance = null;
      try {
        if (BdApi.Plugins.isEnabled(pluginName)) {
          instance = ((_a = BdApi.Plugins.get(pluginName)) == null ? void 0 : _a.instance) || null;
        }
      } catch (_) {
        instance = null;
      }
      _instanceCache.set(pluginName, { instance, ts: now });
      return instance;
    }
    function invalidatePluginInstance(pluginName) {
      if (pluginName) _instanceCache.delete(pluginName);
      else _instanceCache.clear();
    }
    function getSkillTreeLevel2(skillId) {
      try {
        const instance = getPluginInstance2("SkillTree");
        if (!instance || typeof instance.getSkillLevel !== "function") return 0;
        return Number(instance.getSkillLevel(skillId)) || 0;
      } catch (_) {
        return 0;
      }
    }
    function getSoloLevelingData2() {
      try {
        const instance = getPluginInstance2("SoloLevelingStats");
        if (!instance) return null;
        if (typeof instance.getPublicAPI === "function") {
          return instance.getPublicAPI() || null;
        }
        const s = instance.settings;
        if (!s) return null;
        return { ...s, stats: { ...s.stats || {} } };
      } catch (_) {
        return null;
      }
    }
    module2.exports = { getPluginInstance: getPluginInstance2, getSkillTreeLevel: getSkillTreeLevel2, getSoloLevelingData: getSoloLevelingData2, invalidatePluginInstance };
  }
});

// src/shared/settings.js
var require_settings = __commonJS({
  "src/shared/settings.js"(exports2, module2) {
    function loadSettings(pluginId, defaults, key = "settings") {
      try {
        return { ...defaults, ...BdApi.Data.load(pluginId, key) || {} };
      } catch (err) {
        console.error(`[SL:settings] load failed for ${pluginId}/${key} \u2014 using defaults:`, err);
        return { ...defaults };
      }
    }
    function saveSettings(pluginId, settings, key = "settings") {
      try {
        BdApi.Data.save(pluginId, key, settings);
      } catch (err) {
        console.error(`[SL:settings] save FAILED for ${pluginId}/${key}:`, err);
      }
    }
    module2.exports = { loadSettings, saveSettings };
  }
});

// src/shared/ttl-cache.js
var require_ttl_cache = __commonJS({
  "src/shared/ttl-cache.js"(exports2, module2) {
    function createTtlCache(ttlMs = 5e3) {
      const entries = /* @__PURE__ */ new Map();
      return {
        get(key) {
          const entry = entries.get(key);
          if (!entry) return void 0;
          if (Date.now() - entry.time > ttlMs) {
            entries.delete(key);
            return void 0;
          }
          return entry.value;
        },
        set(key, value) {
          entries.set(key, { value, time: Date.now() });
        },
        invalidate(key) {
          entries.delete(key);
        },
        clear() {
          entries.clear();
        }
      };
    }
    function createSingleValueCache(ttlMs = 5e3) {
      let value;
      let timestamp = 0;
      return {
        get() {
          return Date.now() - timestamp < ttlMs ? value : null;
        },
        set(v) {
          value = v;
          timestamp = Date.now();
        },
        invalidate() {
          value = null;
          timestamp = 0;
        }
      };
    }
    module2.exports = { createTtlCache, createSingleValueCache };
  }
});

// src/shared/hotkeys.js
var require_hotkeys = __commonJS({
  "src/shared/hotkeys.js"(exports2, module2) {
    function isEditableTarget2(target) {
      var _a, _b;
      if (!target) return false;
      const tag = ((_b = (_a = target.tagName) == null ? void 0 : _a.toLowerCase) == null ? void 0 : _b.call(_a)) || "";
      return tag === "input" || tag === "textarea" || tag === "select" || !!target.isContentEditable;
    }
    function parseHotkey(hotkey) {
      const parts = String(hotkey || "").split("+").map((p) => p.trim().toLowerCase());
      return {
        key: parts.filter(
          (p) => p !== "ctrl" && p !== "shift" && p !== "alt" && p !== "meta" && p !== "cmd"
        )[0] || "",
        ctrl: parts.includes("ctrl"),
        shift: parts.includes("shift"),
        alt: parts.includes("alt"),
        meta: parts.includes("meta") || parts.includes("cmd")
      };
    }
    function matchesHotkey2(event, hotkey) {
      if (!event || !hotkey) return false;
      const spec = parseHotkey(hotkey);
      if (!spec.key) return false;
      if (event.key.toLowerCase() !== spec.key) return false;
      if (spec.ctrl && !event.ctrlKey) return false;
      if (spec.shift && !event.shiftKey) return false;
      if (spec.alt && !event.altKey) return false;
      if (spec.meta && !event.metaKey) return false;
      return true;
    }
    module2.exports = { isEditableTarget: isEditableTarget2, parseHotkey, matchesHotkey: matchesHotkey2 };
  }
});

// src/RulersAuthority/hotkeys.js
var require_hotkeys2 = __commonJS({
  "src/RulersAuthority/hotkeys.js"(exports2, module2) {
    var { isEditableTarget: _sharedIsEditableTarget, matchesHotkey: _sharedMatchesHotkey } = require_hotkeys();
    var _pluginUtilsRef = null;
    function setPluginUtils2(utils) {
      _pluginUtilsRef = utils;
    }
    function isEditableTarget2(t) {
      if (_pluginUtilsRef == null ? void 0 : _pluginUtilsRef.isEditableTarget) return _pluginUtilsRef.isEditableTarget(t);
      return _sharedIsEditableTarget(t);
    }
    function matchesHotkey2(e, hotkey) {
      if (_pluginUtilsRef == null ? void 0 : _pluginUtilsRef.matchesHotkey) return _pluginUtilsRef.matchesHotkey(e, hotkey);
      return _sharedMatchesHotkey(e, hotkey);
    }
    module2.exports = { setPluginUtils: setPluginUtils2, isEditableTarget: isEditableTarget2, matchesHotkey: matchesHotkey2 };
  }
});

// src/RulersAuthority/constants.js
var import_bd_module_loader = __toESM(require_bd_module_loader());
var import_discord_classes = __toESM(require_discord_classes());
var RA_PLUGIN_NAME = "RulersAuthority";
var RA_VERSION = "2.1.2";
var RA_STYLE_ID = "rulers-authority-css";
var RA_VARS_STYLE_ID = "rulers-authority-vars";
var RA_TOOLBAR_ICON_ID = "ra-toolbar-icon";
var RA_ICON_REINJECT_DELAY_MS = 140;
var RA_STATS_CACHE_TTL = 5e3;
var RA_OBSERVER_THROTTLE_MS = 400;
var RA_RESIZE_MIN_WIDTH = 80;
var RA_SETTINGS_OPEN_CLASS = "ra-settings-open";
var SIDEBAR_FALLBACKS = [
  'nav[aria-label="Channels sidebar"]',
  'nav[aria-label="Channels"]',
  `${import_discord_classes.default.sel.sidebar}${import_discord_classes.default.sel.container}`,
  import_discord_classes.default.sel.sidebar
];
var SIDEBAR_CSS_SAFE = SIDEBAR_FALLBACKS.slice(0, -1);
var MEMBERS_FALLBACKS = [
  import_discord_classes.default.sel.membersWrap
];
var PROFILE_FALLBACKS = [
  import_discord_classes.default.sel.userProfileOuter,
  '[class*="userPanelOuter_"]',
  '[class*="profilePanel_"]'
];
var SEARCH_FALLBACKS = [
  import_discord_classes.default.sel.searchResultsWrap
];
var TOOLBAR_FALLBACKS = [
  '[aria-label="Channel header"] [class*="toolbar_"]',
  '[class*="titleWrapper_"] [class*="toolbar_"]',
  'header [class*="toolbar_"]'
];
var DM_LIST_FALLBACKS = [
  `${import_discord_classes.default.sel.privateChannels} ${import_discord_classes.default.sel.scroller}`,
  `${import_discord_classes.default.sel.privateChannels} [role="list"]`
];
var PANEL_DEFS = {
  sidebar: { label: "Channel Sidebar", hoverCapable: true, moduleName: "sidebar", moduleKey: "sidebarList" },
  members: { label: "Members List", hoverCapable: true, moduleName: "members", moduleKey: "membersWrap" },
  profile: { label: "User Profile", hoverCapable: true, moduleName: "panel", moduleKey: "outer" },
  search: { label: "Search Results", hoverCapable: false, moduleName: "search", moduleKey: "searchResultsWrap" }
};
var DEFAULT_SETTINGS = {
  enabled: true,
  debugMode: false,
  transitionSpeed: 250,
  animationsEnabled: true,
  // Panel states + widths
  panels: {
    sidebar: { pushed: false, hotkey: "Ctrl+Shift+R", hoverExpand: true, width: 0 },
    members: { pushed: false, hotkey: "", hoverExpand: true, width: 0 },
    profile: { pushed: false, hotkey: "", hoverExpand: true, width: 0 },
    search: { pushed: false, hotkey: "", width: 0 }
  },
  // Default panel widths (used for reset)
  defaultWidths: {
    sidebar: 240,
    members: 245,
    profile: 340,
    search: 400
  },
  // Hover config — instant (2026-07-13); the focus-loss guardrail replaces
  // the old timing guardrails.
  hoverFudgePx: 15,
  // Per-guild micro state
  guilds: {},
  // { [guildId]: { hiddenChannels: [{ id, name }], crushedCategories: [{ id, name }] } }
  // DM gripping
  grippedDMs: []
  // [{ channelId, username }]
};
var { loadBdModuleFromPlugins } = import_bd_module_loader.default;
var _bdLoad = loadBdModuleFromPlugins;
var _PluginUtils;
try {
  _PluginUtils = _bdLoad("BetterDiscordPluginUtils.js");
} catch (_) {
  _PluginUtils = null;
}

// src/RulersAuthority/resize.js
function isResizeEdgeHit(panelName, rect, clientX) {
  const isLeftEdge = panelName !== "sidebar" && clientX <= rect.left + 12;
  const isRightEdge = panelName === "sidebar" && clientX >= rect.right - 12;
  return isLeftEdge || isRightEdge;
}
function shouldSkipPanelResizeStart(panelName) {
  return panelName === "sidebar" && document.body.classList.contains(RA_SETTINGS_OPEN_CLASS);
}
function tryStartPanelDrag(ctx, event, target, panelName) {
  var _a;
  if ((_a = ctx.isPanelGated) == null ? void 0 : _a.call(ctx, panelName)) return false;
  if (shouldSkipPanelResizeStart(panelName)) return false;
  const panelEl = ctx._findPanelElement(panelName);
  if (!panelEl) return false;
  const clickedPanel = target === panelEl || target.parentElement === panelEl;
  if (!clickedPanel) return false;
  const rect = panelEl.getBoundingClientRect();
  if (!isResizeEdgeHit(panelName, rect, event.clientX)) return false;
  event.preventDefault();
  ctx._dragging = panelEl;
  ctx._dragPanel = panelName;
  panelEl.style.setProperty("transition", "none", "important");
  ctx.debugLog("Resize", `Started dragging ${panelName}`);
  return true;
}
function handleResizeMouseDown(ctx, event) {
  if (event.button !== 0) return;
  const target = event.target;
  for (const panelName of Object.keys(PANEL_DEFS)) {
    if (tryStartPanelDrag(ctx, event, target, panelName)) return;
  }
}
function setupResizeHandlers(ctx) {
  if (!ctx._controller) return;
  const signal = ctx._controller.signal;
  document.addEventListener("mousedown", (e) => {
    handleResizeMouseDown(ctx, e);
  }, { passive: false, signal });
  let _resizeRafId = null;
  document.addEventListener("mousemove", (e) => {
    if (!ctx._dragging || !ctx._dragPanel) return;
    if (_resizeRafId) return;
    _resizeRafId = requestAnimationFrame(() => {
      _resizeRafId = null;
      if (!ctx._dragging || !ctx._dragPanel) return;
      const rect = ctx._dragging.getBoundingClientRect();
      let width;
      if (ctx._dragPanel === "sidebar") {
        width = e.clientX - rect.left;
      } else {
        width = rect.right - e.clientX;
      }
      width = Math.max(RA_RESIZE_MIN_WIDTH, Math.min(width, window.innerWidth * 0.6));
      ctx._dragging.style.setProperty("width", `${width}px`, "important");
      ctx._dragging.style.setProperty("max-width", `${width}px`, "important");
      ctx._dragging.style.setProperty("min-width", `${width}px`, "important");
    });
  }, { passive: true, signal });
  document.addEventListener("mouseup", (e) => {
    if (!ctx._dragging || !ctx._dragPanel) return;
    if (e.button !== 0) return;
    const panelName = ctx._dragPanel;
    const dragged = ctx._dragging;
    ctx.settings.panels[panelName].width = parseInt(dragged.style.width, 10) || ctx.settings.defaultWidths[panelName];
    dragged.style.removeProperty("width");
    dragged.style.removeProperty("max-width");
    dragged.style.removeProperty("min-width");
    ctx.saveSettings();
    ctx.updateCSSVars();
    setTimeout(() => {
      dragged.style.removeProperty("transition");
    }, ctx.settings.transitionSpeed);
    ctx._dragging = null;
    ctx._dragPanel = null;
    ctx.debugLog("Resize", `Committed ${panelName} width: ${ctx.settings.panels[panelName].width}px`);
  }, { passive: true, signal });
}
function removeAllResizeStyles(ctx) {
  for (const panelName of Object.keys(PANEL_DEFS)) {
    const el = ctx._findPanelElement(panelName);
    if (el) {
      el.style.removeProperty("width");
      el.style.removeProperty("max-width");
      el.style.removeProperty("min-width");
      el.style.removeProperty("transition");
    }
  }
}

// src/RulersAuthority/context-menu-helpers.js
function appendContextMenuItems(tree, ...items) {
  var _a;
  const children = (_a = tree == null ? void 0 : tree.props) == null ? void 0 : _a.children;
  if (!Array.isArray(children)) return;
  children.push(...items);
}
function buildDMGripContextItem(ctx, channel, channelId, isGripped, actions) {
  return BdApi.ContextMenu.buildItem({
    type: "text",
    label: isGripped ? "Release Grip" : "Grip DM",
    id: isGripped ? "ra-release-dm" : "ra-grip-dm",
    action: () => {
      var _a, _b;
      if (isGripped) {
        actions.releaseDM(ctx, channelId);
        return;
      }
      actions.gripDM(
        ctx,
        channelId,
        ((_b = (_a = channel.rawRecipients) == null ? void 0 : _a[0]) == null ? void 0 : _b.username) || channel.name || "Unknown"
      );
    }
  });
}
function handleDMContextMenuPatch(options) {
  const {
    ctx,
    tree,
    channel,
    channelId,
    guildId,
    actions
  } = options;
  if (guildId || channel.type !== 1 && channel.type !== 3) return false;
  const isGripped = actions.isDMGripped(ctx, channelId);
  const separator = BdApi.ContextMenu.buildItem({ type: "separator" });
  const item = buildDMGripContextItem(ctx, channel, channelId, isGripped, actions);
  appendContextMenuItems(tree, separator, item);
  return true;
}
function buildCategoryContextItem(ctx, guildId, channelId, channelName, actions) {
  const crushed = actions.isCategoryCrushed(ctx, guildId, channelId);
  return {
    type: "text",
    label: crushed ? "Release Category" : "Crush Category",
    id: crushed ? "ra-release-category" : "ra-crush-category",
    action: () => {
      if (crushed) {
        actions.releaseCategory(ctx, guildId, channelId);
        ctx._toast(`Released ${channelName}`, "info");
        return;
      }
      actions.crushCategory(ctx, guildId, channelId, channelName);
      ctx._toast(`Crushed ${channelName}`, "success");
    }
  };
}
function buildChannelContextItem(ctx, guildId, channelId, channelName, actions) {
  const hidden = actions.isChannelHidden(ctx, guildId, channelId);
  return {
    type: "text",
    label: hidden ? "Recall Channel" : "Push Channel",
    id: hidden ? "ra-recall-channel" : "ra-push-channel",
    action: () => {
      if (hidden) {
        actions.recallChannel(ctx, guildId, channelId);
        ctx._toast(`Recalled #${channelName}`, "info");
        return;
      }
      actions.pushChannel(ctx, guildId, channelId, channelName);
      ctx._toast(`Pushed #${channelName}`, "success");
    }
  };
}
function buildGuildContextItems(ctx, guildId, channel, actions) {
  const channelId = channel.id;
  const channelName = channel.name;
  const items = [];
  if (channel.type === 4) {
    items.push(buildCategoryContextItem(ctx, guildId, channelId, channelName, actions));
  }
  if (channel.type !== 4) {
    items.push(buildChannelContextItem(ctx, guildId, channelId, channelName, actions));
  }
  return items;
}
function appendGuildSubmenu(tree, items) {
  if (!Array.isArray(items) || items.length === 0) return;
  const separator = BdApi.ContextMenu.buildItem({ type: "separator" });
  const submenu = BdApi.ContextMenu.buildItem({
    type: "submenu",
    label: "Ruler's Authority",
    id: "ra-submenu",
    items
  });
  appendContextMenuItems(tree, separator, submenu);
}
function applyChannelContextMenuPatch(options) {
  const {
    ctx,
    tree,
    channel,
    guildId,
    actions
  } = options;
  const channelId = channel.id;
  if (handleDMContextMenuPatch({ ctx, tree, channel, channelId, guildId, actions })) return;
  if (!guildId) return;
  appendGuildSubmenu(tree, buildGuildContextItems(ctx, guildId, channel, actions));
}

// src/RulersAuthority/panels.js
var import_discord_classes2 = __toESM(require_discord_classes());
var import_toolbar_tooltip = __toESM(require_toolbar_tooltip());
var { onResize } = require_dom_bus();
var { acquireDispatcher } = require_dispatcher();
var { watchToolbar } = require_header_toolbar();
function findChannelSidebar() {
  for (const sel of SIDEBAR_FALLBACKS) {
    const el = document.querySelector(sel);
    if (el) return el;
  }
  return null;
}
function _userIsInVoice() {
  var _a, _b, _c, _d;
  try {
    const Webpack = BdApi == null ? void 0 : BdApi.Webpack;
    if (!Webpack) return false;
    const VoiceStateStore = (_a = Webpack.getStore) == null ? void 0 : _a.call(Webpack, "VoiceStateStore");
    const UserStore = (_b = Webpack.getStore) == null ? void 0 : _b.call(Webpack, "UserStore");
    const userId = (_d = (_c = UserStore == null ? void 0 : UserStore.getCurrentUser) == null ? void 0 : _c.call(UserStore)) == null ? void 0 : _d.id;
    if (!userId || !(VoiceStateStore == null ? void 0 : VoiceStateStore.getVoiceStateForUser)) return false;
    const voiceState = VoiceStateStore.getVoiceStateForUser(userId);
    return Boolean(voiceState == null ? void 0 : voiceState.channelId);
  } catch (_) {
    return false;
  }
}
function _viewingVoiceOrStageChat() {
  var _a, _b, _c, _d, _e;
  try {
    const path = String(((_a = window.location) == null ? void 0 : _a.pathname) || "");
    const m = path.match(/^\/channels\/(?:@me|\d+)\/(\d+)/);
    if (!m) return false;
    const ch = (_e = (_d = (_c = (_b = BdApi == null ? void 0 : BdApi.Webpack) == null ? void 0 : _b.getStore) == null ? void 0 : _c.call(_b, "ChannelStore")) == null ? void 0 : _d.getChannel) == null ? void 0 : _e.call(_d, m[1]);
    const t = Number(ch == null ? void 0 : ch.type);
    return t === 2 || t === 13;
  } catch (_) {
    return false;
  }
}
function _shouldHideRaIcon() {
  return _userIsInVoice() || _viewingVoiceOrStageChat();
}
function togglePanel(ctx, panelName) {
  var _a;
  const def = PANEL_DEFS[panelName];
  if (!def) return;
  if ((_a = ctx.isPanelGated) == null ? void 0 : _a.call(ctx, panelName)) return;
  const isPushed = ctx.settings.panels[panelName].pushed;
  ctx.settings.panels[panelName].pushed = !isPushed;
  if (!isPushed) {
    const el = ctx._findPanelElement(panelName);
    if (el && !ctx.settings.panels[panelName].width) {
      ctx.settings.panels[panelName].width = el.getBoundingClientRect().width;
    }
    document.body.classList.add(`ra-${panelName}-pushed`);
    showPushEffect(ctx, panelName);
    ctx.debugLog("Panel", `Pushed ${panelName}`);
  } else {
    document.body.classList.remove(`ra-${panelName}-pushed`);
    document.body.classList.remove(`ra-${panelName}-hover-reveal`);
    showPullEffect(ctx, panelName);
    ctx.debugLog("Panel", `Pulled ${panelName}`);
  }
  ctx.saveSettings();
  ctx.updateCSSVars();
  updateToolbarIcon(ctx);
}
function restorePanelStates(ctx) {
  var _a;
  const apply = () => {
    var _a2;
    for (const [panelName, config] of Object.entries(ctx.settings.panels)) {
      if ((_a2 = ctx.isPanelGated) == null ? void 0 : _a2.call(ctx, panelName)) continue;
      if (config.pushed) {
        document.body.classList.add(`ra-${panelName}-pushed`);
      }
    }
  };
  const probe = () => ctx._findPanelElement("members") || ctx._findPanelElement("sidebar");
  if (probe()) {
    apply();
    return;
  }
  let panelProbeObserver = null;
  let panelProbeTimeout = null;
  const finish = () => {
    if (panelProbeObserver) {
      try {
        panelProbeObserver.disconnect();
      } catch (_) {
      }
      panelProbeObserver = null;
    }
    if (panelProbeTimeout) {
      clearTimeout(panelProbeTimeout);
      panelProbeTimeout = null;
    }
    apply();
  };
  panelProbeObserver = new MutationObserver((records) => {
    for (const r of records) {
      for (const node of r.addedNodes) {
        if (node.nodeType === 1) {
          if (probe()) finish();
          return;
        }
      }
    }
  });
  const probeRoot = document.getElementById("app-mount") || document.body;
  panelProbeObserver.observe(probeRoot, { childList: true, subtree: true });
  panelProbeTimeout = setTimeout(finish, 4e3);
  const origAbort = (_a = ctx._controller) == null ? void 0 : _a.signal;
  if (origAbort) {
    origAbort.addEventListener("abort", () => {
      if (panelProbeObserver) {
        try {
          panelProbeObserver.disconnect();
        } catch (_) {
        }
        panelProbeObserver = null;
      }
      if (panelProbeTimeout) {
        clearTimeout(panelProbeTimeout);
        panelProbeTimeout = null;
      }
    }, { once: true });
  }
}
function getPushedPanelCount(ctx) {
  return Object.values(ctx.settings.panels).filter((p) => p.pushed).length;
}
function applyHoverRevealState(ctx, options) {
  const {
    name,
    inZone,
    revealDelay,
    hideDelay,
    isActive,
    setActive
  } = options;
  const revealKey = `_${name}RevealTimer`;
  const hideKey = `_${name}HideTimer`;
  const hoverEnterAtKey = `_${name}HoverEnterAt`;
  const className = `ra-${name}-hover-reveal`;
  const revealDelayMs = Number(revealDelay);
  const hideDelayMs = Number(hideDelay);
  const normalizedRevealDelay = Number.isFinite(revealDelayMs) ? Math.max(0, revealDelayMs) : 0;
  const normalizedHideDelay = Number.isFinite(hideDelayMs) ? Math.max(0, hideDelayMs) : 0;
  const checkActive = isActive || (() => document.body.classList.contains(className));
  const applyActive = setActive || ((revealed) => {
    if (revealed) {
      document.body.classList.add(className);
    } else {
      document.body.classList.remove(className);
    }
  });
  if (inZone) {
    clearTimeout(ctx[hideKey]);
    ctx[hideKey] = null;
    if (checkActive()) {
      ctx[hoverEnterAtKey] = null;
      return;
    }
    const now = Date.now();
    if (!Number.isFinite(ctx[hoverEnterAtKey]) || ctx[hoverEnterAtKey] <= 0) {
      ctx[hoverEnterAtKey] = now;
    }
    const enteredAt = Number(ctx[hoverEnterAtKey]) || now;
    const elapsed = now - enteredAt;
    const remaining = normalizedRevealDelay - elapsed;
    if (remaining <= 0) {
      clearTimeout(ctx[revealKey]);
      ctx[revealKey] = null;
      ctx[hoverEnterAtKey] = null;
      applyActive(true);
      return;
    }
    if (!ctx[revealKey]) {
      ctx[revealKey] = setTimeout(() => {
        ctx[revealKey] = null;
        const since = Date.now() - (Number(ctx[hoverEnterAtKey]) || 0);
        if (since >= normalizedRevealDelay && !checkActive()) {
          ctx[hoverEnterAtKey] = null;
          applyActive(true);
        }
      }, remaining);
    }
  } else {
    clearTimeout(ctx[revealKey]);
    ctx[revealKey] = null;
    ctx[hoverEnterAtKey] = null;
    if (!ctx[hideKey] && checkActive()) {
      if (normalizedHideDelay <= 0) {
        applyActive(false);
        return;
      }
      ctx[hideKey] = setTimeout(() => {
        ctx[hideKey] = null;
        applyActive(false);
      }, normalizedHideDelay);
    }
  }
}
function clearPanelHoverState(ctx, name) {
  const revealKey = `_${name}RevealTimer`;
  const hideKey = `_${name}HideTimer`;
  clearTimeout(ctx[revealKey]);
  clearTimeout(ctx[hideKey]);
  ctx[revealKey] = null;
  ctx[hideKey] = null;
  document.body.classList.remove(`ra-${name}-hover-reveal`);
}
function getHoverRuntime(ctx, e) {
  var _a, _b, _c, _d, _e;
  const currentGuildId = (_b = (_a = ctx._SelectedGuildStore) == null ? void 0 : _a.getGuildId) == null ? void 0 : _b.call(_a);
  const hiddenChannelsCount = currentGuildId ? ((_e = (_d = (_c = ctx.settings.guilds) == null ? void 0 : _c[currentGuildId]) == null ? void 0 : _d.hiddenChannels) == null ? void 0 : _e.length) || 0 : 0;
  const channelHoverEnabled = hiddenChannelsCount > 0;
  const sidebarHoverEnabled = ctx.settings.panels.sidebar.hoverExpand;
  const membersHoverEnabled = ctx.settings.panels.members.hoverExpand;
  const profileHoverEnabled = ctx.settings.panels.profile.hoverExpand;
  const anyEnabled = sidebarHoverEnabled || membersHoverEnabled || profileHoverEnabled || channelHoverEnabled;
  if (!anyEnabled) return null;
  const fudge = Number(ctx.settings.hoverFudgePx) || 15;
  const edgeZonePx = Math.max(36, fudge);
  return {
    event: e,
    fudge,
    edgeZonePx,
    hideDelay: 0,
    revealDelay: 0,
    panelRevealDelay: 0,
    viewportWidth: window.innerWidth,
    sidebarHoverEnabled,
    membersHoverEnabled,
    profileHoverEnabled,
    channelHoverEnabled
  };
}
function handleSidebarHover(ctx, runtime) {
  var _a, _b;
  if ((_a = ctx.isPanelGated) == null ? void 0 : _a.call(ctx, "sidebar")) {
    clearPanelHoverState(ctx, "sidebar");
    return;
  }
  if (!(runtime.sidebarHoverEnabled && ctx.settings.panels.sidebar.pushed)) {
    clearPanelHoverState(ctx, "sidebar");
    return;
  }
  const revealActive = document.body.classList.contains("ra-sidebar-hover-reveal");
  const inEdgeZone = runtime.event.clientX <= runtime.edgeZonePx;
  const sidebarWidth = ctx.settings.panels.sidebar.width || ((_b = ctx.settings.defaultWidths) == null ? void 0 : _b.sidebar) || 240;
  const inPanel = revealActive && runtime.event.clientX <= sidebarWidth + runtime.fudge;
  applyHoverRevealState(ctx, {
    name: "sidebar",
    inZone: inEdgeZone || inPanel,
    revealDelay: runtime.panelRevealDelay,
    hideDelay: runtime.hideDelay
  });
}
function handleMembersHover(ctx, runtime) {
  var _a, _b;
  if ((_a = ctx.isPanelGated) == null ? void 0 : _a.call(ctx, "members")) {
    clearPanelHoverState(ctx, "members");
    return;
  }
  if (!(runtime.membersHoverEnabled && ctx.settings.panels.members.pushed)) {
    clearPanelHoverState(ctx, "members");
    return;
  }
  const distFromRight = runtime.viewportWidth - runtime.event.clientX;
  const revealActive = document.body.classList.contains("ra-members-hover-reveal");
  const inEdgeZone = distFromRight <= runtime.edgeZonePx;
  const membersWidth = ctx.settings.panels.members.width || ((_b = ctx.settings.defaultWidths) == null ? void 0 : _b.members) || 245;
  const inPanel = revealActive && distFromRight <= membersWidth + runtime.fudge;
  applyHoverRevealState(ctx, {
    name: "members",
    inZone: inEdgeZone || inPanel,
    revealDelay: runtime.panelRevealDelay,
    hideDelay: runtime.hideDelay
  });
}
function handleProfileHover(ctx, runtime) {
  var _a, _b;
  if ((_a = ctx.isPanelGated) == null ? void 0 : _a.call(ctx, "profile")) {
    clearPanelHoverState(ctx, "profile");
    return;
  }
  if (!(runtime.profileHoverEnabled && ctx.settings.panels.profile.pushed)) return;
  const distFromRight = runtime.viewportWidth - runtime.event.clientX;
  const revealActive = document.body.classList.contains("ra-profile-hover-reveal");
  const profileWidth = ctx.settings.panels.profile.width || ((_b = ctx.settings.defaultWidths) == null ? void 0 : _b.profile) || 340;
  const inPanel = revealActive && distFromRight <= profileWidth + runtime.fudge;
  const inZone = distFromRight <= runtime.edgeZonePx && !document.body.classList.contains("ra-members-hover-reveal");
  applyHoverRevealState(ctx, {
    name: "profile",
    inZone: inZone || inPanel,
    revealDelay: runtime.revealDelay,
    hideDelay: runtime.hideDelay
  });
}
function handleChannelHover(ctx, runtime) {
  if (!runtime.channelHoverEnabled) {
    clearPanelHoverState(ctx, "channel");
    setHiddenChannelRevealState(ctx, false);
    return;
  }
  const hoverEl = getChannelHoverElement();
  const inEdgeZone = runtime.event.clientX <= runtime.edgeZonePx;
  const inChannelPanel = ctx._channelsHoverRevealActive && hoverEl ? ctx._isInsideElement(runtime.event, hoverEl, runtime.fudge) : false;
  applyHoverRevealState(ctx, {
    name: "channel",
    inZone: inEdgeZone || inChannelPanel,
    revealDelay: runtime.revealDelay,
    hideDelay: runtime.hideDelay,
    isActive: () => ctx._channelsHoverRevealActive,
    setActive: (revealed) => setHiddenChannelRevealState(ctx, revealed)
  });
}
function setupHoverHandlers(ctx) {
  if (!ctx._controller) return;
  const handler = ctx._throttle((e) => {
    if (!ctx._controller) return;
    if (!document.hasFocus()) {
      clearAllHoverStates(ctx);
      return;
    }
    if (document.body.classList.contains(RA_SETTINGS_OPEN_CLASS)) {
      clearAllHoverStates(ctx);
      return;
    }
    const runtime = getHoverRuntime(ctx, e);
    if (!runtime) {
      clearPanelHoverState(ctx, "sidebar");
      clearPanelHoverState(ctx, "members");
      clearPanelHoverState(ctx, "profile");
      clearPanelHoverState(ctx, "channel");
      setHiddenChannelRevealState(ctx, false);
      return;
    }
    handleSidebarHover(ctx, runtime);
    handleMembersHover(ctx, runtime);
    handleProfileHover(ctx, runtime);
    handleChannelHover(ctx, runtime);
  }, 32);
  document.addEventListener("mousemove", handler, {
    passive: true,
    signal: ctx._controller.signal
  });
  window.addEventListener(
    "blur",
    () => {
      if (!ctx._controller) return;
      clearAllHoverStates(ctx);
    },
    { signal: ctx._controller.signal }
  );
}
function getGuildData(ctx, guildId) {
  if (!ctx.settings.guilds[guildId]) {
    ctx.settings.guilds[guildId] = { hiddenChannels: [], crushedCategories: [] };
  }
  return ctx.settings.guilds[guildId];
}
function pushChannel(ctx, guildId, channelId, channelName) {
  const guildData = getGuildData(ctx, guildId);
  if (guildData.hiddenChannels.some((c) => c.id === channelId)) return;
  guildData.hiddenChannels.push({ id: channelId, name: channelName });
  _hiddenIdSetCache.delete(guildId);
  applyChannelHiding(ctx, guildId);
  ctx.saveSettings();
  ctx.debugLog("PushChannel", `Pushed #${channelName} in ${guildId}`);
}
function recallChannel(ctx, guildId, channelId) {
  const guildData = getGuildData(ctx, guildId);
  guildData.hiddenChannels = guildData.hiddenChannels.filter((c) => c.id !== channelId);
  _hiddenIdSetCache.delete(guildId);
  const el = document.querySelector(`[data-list-item-id="channels___${channelId}"]`);
  if (el) {
    el.style.display = "";
    el.removeAttribute("data-ra-pushed");
  }
  applyChannelHiding(ctx, guildId);
  ctx.saveSettings();
  ctx.debugLog("RecallChannel", `Recalled ${channelId} in ${guildId}`);
}
function isChannelHidden(ctx, guildId, channelId) {
  var _a;
  const guildData = ctx.settings.guilds[guildId];
  return ((_a = guildData == null ? void 0 : guildData.hiddenChannels) == null ? void 0 : _a.some((c) => c.id === channelId)) || false;
}
var _channelHoverEl = null;
var _channelHoverElTime = 0;
var _CHANNEL_HOVER_TTL = 500;
function getChannelHoverElement() {
  const now = Date.now();
  if (_channelHoverEl && now - _channelHoverElTime < _CHANNEL_HOVER_TTL && _channelHoverEl.isConnected) {
    return _channelHoverEl;
  }
  const channelTree = document.querySelector('ul[aria-label="Channels"]') || document.querySelector('[role="tree"][aria-label="Channels"]') || document.querySelector(`${import_discord_classes2.default.sel.sidebar} [role="tree"]`);
  if (!channelTree) {
    _channelHoverEl = null;
    return null;
  }
  _channelHoverEl = channelTree.closest(import_discord_classes2.default.sel.sidebar) || channelTree;
  _channelHoverElTime = now;
  return _channelHoverEl;
}
function invalidateChannelHoverCache() {
  _channelHoverEl = null;
  _channelHoverElTime = 0;
}
function setHiddenChannelRevealState(ctx, shouldReveal) {
  const next = !!shouldReveal;
  if (ctx._channelsHoverRevealActive === next) return;
  ctx._channelsHoverRevealActive = next;
  document.body.classList.toggle("ra-channels-hover-reveal", next);
  applyChannelHiding(ctx);
}
function getEffectiveGuildId(ctx, guildId) {
  var _a, _b;
  const currentGuildId = (_b = (_a = ctx._SelectedGuildStore) == null ? void 0 : _a.getGuildId) == null ? void 0 : _b.call(_a);
  if (guildId && guildId !== currentGuildId) return null;
  return guildId || currentGuildId || null;
}
var _hiddenIdSetCache = /* @__PURE__ */ new Map();
function resolveHiddenIdSet(guildData, guildId) {
  if (!guildData) return /* @__PURE__ */ new Set();
  if (guildData._hiddenIdSet !== void 0 && !(guildData._hiddenIdSet instanceof Set)) {
    delete guildData._hiddenIdSet;
  }
  let hiddenIds = _hiddenIdSetCache.get(guildId);
  if (!hiddenIds) {
    hiddenIds = new Set((guildData.hiddenChannels || []).map((entry) => String(entry.id)));
    _hiddenIdSetCache.set(guildId, hiddenIds);
  }
  return hiddenIds;
}
function clearStalePushedChannelMarkers(scope, hiddenIds) {
  const pushedEls = scope.querySelectorAll("[data-ra-pushed]");
  for (const el of pushedEls) {
    const listId = el.getAttribute("data-list-item-id") || "";
    const channelId = listId.startsWith("channels___") ? listId.replace("channels___", "") : null;
    if (channelId && hiddenIds.has(channelId)) continue;
    el.style.display = "";
    el.removeAttribute("data-ra-pushed");
  }
}
function applyHiddenChannelVisibility(scope, hiddenIds, revealActive) {
  for (const id of hiddenIds) {
    const el = scope.querySelector(`[data-list-item-id="channels___${id}"]`);
    if (!el) continue;
    el.style.display = revealActive ? "" : "none";
    el.setAttribute("data-ra-pushed", "true");
  }
}
function resetHiddenChannelReveal(ctx) {
  ctx._channelsHoverRevealActive = false;
  document.body.classList.remove("ra-channels-hover-reveal");
}
function applyChannelHiding(ctx, guildId, sidebar) {
  const effectiveGuildId = getEffectiveGuildId(ctx, guildId);
  if (!effectiveGuildId) return;
  const guildData = ctx.settings.guilds[effectiveGuildId];
  const hiddenIds = resolveHiddenIdSet(guildData, effectiveGuildId);
  const scope = sidebar || findChannelSidebar() || document;
  if (hiddenIds.size === 0) {
    if (scope.querySelector("[data-ra-pushed]")) {
      clearStalePushedChannelMarkers(scope, hiddenIds);
    }
    resetHiddenChannelReveal(ctx);
    return;
  }
  clearStalePushedChannelMarkers(scope, hiddenIds);
  applyHiddenChannelVisibility(scope, hiddenIds, ctx._channelsHoverRevealActive);
}
function restoreAllHiddenChannels() {
  const pushed = document.querySelectorAll("[data-ra-pushed]");
  for (const el of pushed) {
    el.style.display = "";
    el.removeAttribute("data-ra-pushed");
  }
  document.body.classList.remove("ra-channels-hover-reveal");
}
function crushCategory(ctx, guildId, categoryId, categoryName) {
  const guildData = getGuildData(ctx, guildId);
  if (guildData.crushedCategories.some((c) => c.id === categoryId)) return;
  guildData.crushedCategories.push({ id: categoryId, name: categoryName });
  applyCategoryCrushing(ctx, guildId);
  ctx.saveSettings();
  ctx.debugLog("CrushCategory", `Crushed ${categoryName} in ${guildId}`);
}
function releaseCategory(ctx, guildId, categoryId) {
  const guildData = getGuildData(ctx, guildId);
  guildData.crushedCategories = guildData.crushedCategories.filter((c) => c.id !== categoryId);
  const children = document.querySelectorAll(`[data-ra-category-crushed="${categoryId}"]`);
  for (const el of children) {
    el.style.display = "";
    el.removeAttribute("data-ra-category-crushed");
  }
  const catEl = document.querySelector(`[data-list-item-id="channels___${categoryId}"]`);
  if (catEl) catEl.removeAttribute("data-ra-crushed");
  ctx.saveSettings();
  ctx.debugLog("ReleaseCategory", `Released ${categoryId} in ${guildId}`);
}
function isCategoryCrushed(ctx, guildId, categoryId) {
  var _a;
  const guildData = ctx.settings.guilds[guildId];
  return ((_a = guildData == null ? void 0 : guildData.crushedCategories) == null ? void 0 : _a.some((c) => c.id === categoryId)) || false;
}
function getChannelIdFromListItem(el) {
  const listId = (el == null ? void 0 : el.getAttribute("data-list-item-id")) || "";
  if (!listId.startsWith("channels___")) return null;
  return listId.replace("channels___", "");
}
function hideCrushedCategoryChildren(ctx, categoryEl, categoryId) {
  var _a, _b;
  let next = categoryEl.nextElementSibling;
  let safetyLimit = 200;
  let nonChannelSkips = 0;
  while (next && safetyLimit-- > 0) {
    const channelId = getChannelIdFromListItem(next);
    if (!channelId) {
      nonChannelSkips++;
      if (nonChannelSkips > 5) break;
      next = next.nextElementSibling;
      continue;
    }
    nonChannelSkips = 0;
    const channel = (_b = (_a = ctx._ChannelStore) == null ? void 0 : _a.getChannel) == null ? void 0 : _b.call(_a, channelId);
    if (!channel || channel.type === 4) break;
    next.style.display = "none";
    next.setAttribute("data-ra-category-crushed", categoryId);
    next = next.nextElementSibling;
  }
}
function applyCategoryCrushForId(ctx, scope, categoryId) {
  var _a;
  const categoryEl = scope.querySelector(`[data-list-item-id="channels___${categoryId}"]`);
  if (!categoryEl) return;
  const alreadyCrushed = categoryEl.hasAttribute("data-ra-crushed") && ((_a = categoryEl.nextElementSibling) == null ? void 0 : _a.getAttribute("data-ra-category-crushed")) === categoryId;
  if (alreadyCrushed) return;
  categoryEl.setAttribute("data-ra-crushed", "true");
  hideCrushedCategoryChildren(ctx, categoryEl, categoryId);
}
function applyCategoryCrushing(ctx, guildId, sidebar) {
  const effectiveGuildId = getEffectiveGuildId(ctx, guildId);
  if (!effectiveGuildId) return;
  const guildData = ctx.settings.guilds[effectiveGuildId];
  const crushedCategories = (guildData == null ? void 0 : guildData.crushedCategories) || [];
  if (crushedCategories.length === 0) return;
  const scope = sidebar || findChannelSidebar() || document;
  for (const { id: categoryId } of crushedCategories) {
    applyCategoryCrushForId(ctx, scope, categoryId);
  }
}
function restoreAllCrushedCategories() {
  const crushed = document.querySelectorAll("[data-ra-category-crushed]");
  for (const el of crushed) {
    el.style.display = "";
    el.removeAttribute("data-ra-category-crushed");
  }
  const cats = document.querySelectorAll("[data-ra-crushed]");
  for (const el of cats) {
    el.removeAttribute("data-ra-crushed");
  }
}
function applyMicroStateForCurrentGuild(ctx) {
  var _a, _b;
  const guildId = (_b = (_a = ctx._SelectedGuildStore) == null ? void 0 : _a.getGuildId) == null ? void 0 : _b.call(_a);
  if (guildId) {
    let sidebar = ctx._sidebarElCache;
    if (!sidebar || !sidebar.isConnected) {
      sidebar = findChannelSidebar();
      ctx._sidebarElCache = sidebar || null;
    }
    applyChannelHiding(ctx, guildId, sidebar);
    applyCategoryCrushing(ctx, guildId, sidebar);
  }
}
function gripDM(ctx, channelId, username) {
  if (ctx.settings.grippedDMs.some((d) => d.channelId === channelId)) return;
  ctx.settings.grippedDMs.push({ channelId, username });
  applyDMGripping(ctx);
  ctx.saveSettings();
  ctx._toast(`Gripped DM: ${username}`, "success");
  ctx.debugLog("GripDM", `Gripped ${username} (${channelId})`);
}
function releaseDM(ctx, channelId) {
  ctx.settings.grippedDMs = ctx.settings.grippedDMs.filter((d) => d.channelId !== channelId);
  const el = document.querySelector(`[data-list-item-id*="${channelId}"] .ra-grip-indicator`);
  if (el) el.remove();
  setupDMObserver(ctx);
  ctx.saveSettings();
  ctx._toast("Released DM grip", "info");
  ctx.debugLog("ReleaseDM", `Released ${channelId}`);
}
function isDMGripped(ctx, channelId) {
  return ctx.settings.grippedDMs.some((d) => d.channelId === channelId);
}
function setupDMObserver(ctx) {
  if (ctx._dmObserver) {
    ctx._dmObserver.disconnect();
    ctx._dmObserver = null;
  }
  if (ctx._dmThrottleTimerRef) {
    clearTimeout(ctx._dmThrottleTimerRef.id);
    ctx._dmThrottleTimerRef = null;
  }
  if (ctx.settings.grippedDMs.length === 0) return;
  const dmList = ctx._findElement(DM_LIST_FALLBACKS);
  if (!dmList) return;
  const timerRef = { id: null };
  ctx._dmThrottleTimerRef = timerRef;
  const _innerThrottle = ctx._throttle(() => {
    if (!ctx._dmObserver) return;
    timerRef.id = null;
    applyDMGripping(ctx);
  }, RA_OBSERVER_THROTTLE_MS);
  const throttledGrip = function(...args) {
    if (ctx._dmApplyInProgress) return;
    timerRef.id = null;
    _innerThrottle(...args);
  };
  ctx._dmObserver = new MutationObserver(throttledGrip);
  ctx._dmObserver.observe(dmList, { childList: true, subtree: true });
}
function applyDMGripping(ctx) {
  var _a;
  const dmList = ctx._findElement(DM_LIST_FALLBACKS);
  if (!dmList) return;
  const header = dmList.querySelector(import_discord_classes2.default.sel.searchBar) || dmList.querySelector(import_discord_classes2.default.sel.privateChannelsHeaderContainer) || dmList.querySelector("h2");
  const insertAfterEl = (header == null ? void 0 : header.closest(import_discord_classes2.default.sel.listItem)) || (header == null ? void 0 : header.parentElement) || null;
  ctx._dmApplyInProgress = true;
  try {
    for (const { channelId } of [...ctx.settings.grippedDMs].reverse()) {
      const dmEl = dmList.querySelector(`[data-list-item-id*="${channelId}"]`) || ((_a = dmList.querySelector(`a[href="/channels/@me/${channelId}"]`)) == null ? void 0 : _a.closest("[data-list-item-id]"));
      if (!dmEl) continue;
      if (!dmEl.querySelector(".ra-grip-indicator")) {
        const indicator = document.createElement("div");
        indicator.className = "ra-grip-indicator";
        indicator.title = "Telekinetic Grip";
        dmEl.style.position = "relative";
        dmEl.appendChild(indicator);
      }
      if (insertAfterEl && insertAfterEl.nextSibling !== dmEl) {
        dmList.insertBefore(dmEl, insertAfterEl.nextSibling);
      } else if (!insertAfterEl && dmList.firstChild !== dmEl) {
        dmList.insertBefore(dmEl, dmList.firstChild);
      }
    }
  } finally {
    Promise.resolve().then(() => {
      ctx._dmApplyInProgress = false;
    });
  }
}
function patchContextMenus(ctx) {
  try {
    if (ctx._unpatchChannelCtx) {
      try {
        ctx._unpatchChannelCtx();
      } catch (_) {
      }
      ctx._unpatchChannelCtx = null;
    }
    ctx._unpatchChannelCtx = BdApi.ContextMenu.patch("channel-context", (tree, props) => {
      if (!(props == null ? void 0 : props.channel)) return;
      const channel = props.channel;
      const guildId = channel.guild_id || null;
      applyChannelContextMenuPatch({
        ctx,
        tree,
        channel,
        guildId,
        actions: {
          gripDM,
          isCategoryCrushed,
          isChannelHidden,
          isDMGripped,
          crushCategory,
          pushChannel,
          recallChannel,
          releaseCategory,
          releaseDM
        }
      });
    });
    ctx.debugLog("ContextMenu", "Patched channel-context");
  } catch (err) {
    ctx.debugError("ContextMenu", "Failed to patch:", err);
  }
}
function getChannelHeaderToolbar(ctx) {
  const selectors = ctx._resolvedSelectors.toolbar || TOOLBAR_FALLBACKS;
  for (const selector of selectors) {
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
function attachToolbarIcon(ctx, icon) {
  const toolbar = getChannelHeaderToolbar(ctx);
  if (!toolbar) return false;
  if (icon.parentElement !== toolbar) {
    if (toolbar.firstChild) {
      toolbar.insertBefore(icon, toolbar.firstChild);
    } else {
      toolbar.appendChild(icon);
    }
  }
  icon.classList.remove("ra-toolbar-icon--hidden");
  return true;
}
function injectToolbarIcon(ctx) {
  let icon = document.getElementById(RA_TOOLBAR_ICON_ID);
  if (!icon) {
    icon = document.createElement("div");
    icon.id = RA_TOOLBAR_ICON_ID;
    icon.className = "ra-toolbar-icon";
    icon.setAttribute("role", "button");
    icon.setAttribute("aria-label", "Ruler's Authority \u2014 Toggle Sidebar");
    icon.setAttribute("tabindex", "0");
    icon.innerHTML = [
      '<svg viewBox="0 0 32 32" width="18" height="18" xmlns="http://www.w3.org/2000/svg">',
      '<path fill="#b5b5be" d="M31 8.5c0 0-2.53 5.333-3.215 8.062-0.896 3.57 0.13 6.268-1.172 9.73-2.25 4.060-2.402 4.717-10.613 4.708-3.009-0.003-11.626-2.297-11.626-2.297-1.188-0.305-3.373-0.125-3.373-1.453s1.554-2.296 2.936-2.3l5.439 0.478c1.322-0.083 2.705-0.856 2.747-2.585-0.022-2.558-0.275-4.522-1.573-6.6l-5.042-7.867c-0.301-0.626-0.373-1.694 0.499-2.171s1.862 0.232 2.2 0.849l5.631 7.66c0.602 0.559 1.671 0.667 1.58-0.524l-2.487-11.401c-0.155-0.81 0.256-1.791 1.194-1.791 1.231 0 1.987 0.47 1.963 1.213l2.734 11.249c0.214 0.547 0.972 0.475 1.176-0.031l0.779-10.939c0.040-0.349 0.495-0.957 1.369-0.831s1.377 1.063 1.285 1.424l-0.253 10.809c0.177 0.958 0.93 1.098 1.517 0.563l3.827-6.843c0.232-0.574 1.143-0.693 1.67-0.466 0.491 0.32 0.81 0.748 0.81 1.351v0z"/>',
      "</svg>"
    ].join("");
    const iconSignal = ctx._controller ? { signal: ctx._controller.signal } : {};
    icon.addEventListener("click", (e) => {
      e.stopPropagation();
      e.preventDefault();
      togglePanel(ctx, "sidebar");
    }, iconSignal);
    icon.addEventListener("contextmenu", (e) => {
      e.stopPropagation();
      e.preventDefault();
      togglePanel(ctx, "members");
    }, iconSignal);
    (0, import_toolbar_tooltip.ensureTooltipCSS)();
    icon.addEventListener("mouseenter", () => (0, import_toolbar_tooltip.showToolbarTooltip)(icon, "sl-toolbar-tip-ra", "Ruler's Authority"), iconSignal);
    icon.addEventListener("mouseleave", () => (0, import_toolbar_tooltip.hideToolbarTooltip)("sl-toolbar-tip-ra"), iconSignal);
  }
  updateToolbarIcon(ctx);
  if (_shouldHideRaIcon()) {
    if (icon.parentElement && icon.parentElement.id !== "ra-icon-park") {
      icon.parentElement.removeChild(icon);
    }
    icon.classList.add("ra-toolbar-icon--hidden");
    return;
  }
  const anchored = attachToolbarIcon(ctx, icon);
  if (!anchored) {
    if (!icon.parentElement) document.body.appendChild(icon);
    icon.classList.add("ra-toolbar-icon--hidden");
  }
}
function updateToolbarIcon(ctx) {
  const icon = document.getElementById(RA_TOOLBAR_ICON_ID);
  if (!icon) return;
  const pushedCount = getPushedPanelCount(ctx);
  const anyPushed = pushedCount > 0;
  icon.classList.toggle("ra-toolbar-icon--active", anyPushed);
  icon.classList.toggle("ra-toolbar-icon--amplified", ctx._amplifiedMode);
}
function scheduleIconReinject(ctx, delayMs = RA_ICON_REINJECT_DELAY_MS) {
  if (ctx._iconReinjectTimeout) clearTimeout(ctx._iconReinjectTimeout);
  ctx._iconReinjectTimeout = setTimeout(() => {
    ctx._iconReinjectTimeout = null;
    injectToolbarIcon(ctx);
  }, delayMs);
}
function setupToolbarObserver(ctx) {
  if (ctx._toolbarUnwatch) return;
  ctx._toolbarUnwatch = watchToolbar((hubToolbar) => {
    const icon = document.getElementById(RA_TOOLBAR_ICON_ID);
    const toolbar = hubToolbar || getChannelHeaderToolbar(ctx);
    if (_shouldHideRaIcon()) return;
    if (!icon || !toolbar || icon.parentElement !== toolbar) {
      scheduleIconReinject(ctx);
    }
  });
  try {
    const dispatcher = acquireDispatcher();
    if (dispatcher && typeof dispatcher.subscribe === "function") {
      const handler = () => scheduleIconReinject(ctx, 0);
      if (typeof ctx._voiceStateUnsub === "function") {
        try {
          ctx._voiceStateUnsub();
        } catch (_) {
        }
        ctx._voiceStateUnsub = null;
      }
      dispatcher.subscribe("VOICE_STATE_UPDATES", handler);
      dispatcher.subscribe("CHANNEL_SELECT", handler);
      ctx._voiceStateUnsub = () => {
        try {
          dispatcher.unsubscribe("VOICE_STATE_UPDATES", handler);
        } catch (_) {
        }
        try {
          dispatcher.unsubscribe("CHANNEL_SELECT", handler);
        } catch (_) {
        }
      };
    }
  } catch (_) {
  }
  ctx._resizeUnsub = onResize(() => scheduleIconReinject(ctx, 80));
  scheduleIconReinject(ctx, 60);
}
function teardownToolbarObserver(ctx) {
  if (ctx._toolbarUnwatch) {
    ctx._toolbarUnwatch();
    ctx._toolbarUnwatch = null;
  }
  if (typeof ctx._voiceStateUnsub === "function") {
    try {
      ctx._voiceStateUnsub();
    } catch (_) {
    }
    ctx._voiceStateUnsub = null;
  }
  if (typeof ctx._resizeUnsub === "function") {
    try {
      ctx._resizeUnsub();
    } catch (_) {
    }
    ctx._resizeUnsub = null;
  }
  if (ctx._iconReinjectTimeout) {
    clearTimeout(ctx._iconReinjectTimeout);
    ctx._iconReinjectTimeout = null;
  }
  (0, import_toolbar_tooltip.removeToolbarTooltip)("sl-toolbar-tip-ra");
}
function showPushEffect(ctx, panelName) {
  if (!ctx.settings.animationsEnabled) return;
  document.body.classList.add("ra-pushing");
  clearTimeout(ctx._pushAnimTimer);
  ctx._pushAnimTimer = setTimeout(() => {
    document.body.classList.remove("ra-pushing");
  }, 500);
}
function showPullEffect(ctx, panelName) {
  if (!ctx.settings.animationsEnabled) return;
  document.body.classList.add("ra-pulling");
  clearTimeout(ctx._pullAnimTimer);
  ctx._pullAnimTimer = setTimeout(() => {
    document.body.classList.remove("ra-pulling");
  }, 350);
}
function getSoloLevelingData(ctx) {
  var _a;
  const cached = ctx._statsCache.get();
  if (cached && BdApi.Plugins.isEnabled("SoloLevelingStats")) {
    return cached;
  }
  if (!BdApi.Plugins.isEnabled("SoloLevelingStats")) return null;
  const soloPlugin = BdApi.Plugins.get("SoloLevelingStats");
  const instance = (soloPlugin == null ? void 0 : soloPlugin.instance) || soloPlugin;
  if (!(instance == null ? void 0 : instance.settings)) return null;
  const data = {
    level: instance.settings.level || 1,
    intelligence: ((_a = instance.settings.stats) == null ? void 0 : _a.intelligence) || 0,
    stats: { ...instance.settings.stats }
  };
  ctx._statsCache.set(data);
  return data;
}
function setupGuildChangeListener(ctx) {
  if (!ctx._SelectedGuildStore) return;
  ctx._guildChangeHandler = () => {
    ctx._panelElCache = null;
    invalidateChannelHoverCache();
    clearTimeout(ctx._guildChangeApplyTimer);
    ctx._guildChangeApplyTimer = setTimeout(() => {
      if (!ctx._controller) return;
      applyMicroStateForCurrentGuild(ctx);
      setupChannelObserver(ctx);
    }, 300);
  };
  ctx._SelectedGuildStore.addChangeListener(ctx._guildChangeHandler);
  if (ctx._SelectedChannelStore) {
    ctx._channelChangeHandler = ctx._throttle(() => {
      if (!ctx._controller) return;
      ctx._panelElCache = null;
      applyMicroStateForCurrentGuild(ctx);
      if (!ctx._channelObserver) {
        setupChannelObserver(ctx);
      }
    }, 500);
    ctx._SelectedChannelStore.addChangeListener(ctx._channelChangeHandler);
  }
}
function setupChannelObserver(ctx, retries = 0) {
  var _a;
  if (ctx._channelObserver) {
    ctx._channelObserver.disconnect();
    ctx._channelObserver = null;
  }
  clearTimeout(ctx._channelObserverRetryTimer);
  const m = ctx._modules;
  const channelList = ((_a = m == null ? void 0 : m.sidebar) == null ? void 0 : _a.sidebarList) && document.querySelector(`.${m.sidebar.sidebarList} [role="tree"]`) || document.querySelector(`${import_discord_classes2.default.sel.sidebar} [role="tree"]`) || document.querySelector(`${import_discord_classes2.default.sel.sidebar} ${import_discord_classes2.default.sel.scroller}`);
  if (!channelList) {
    if (retries < 4 && ctx._controller) {
      const delay = 300 * (retries + 1);
      ctx._channelObserverRetryTimer = setTimeout(() => {
        if (ctx._controller) setupChannelObserver(ctx, retries + 1);
      }, delay);
    }
    return;
  }
  const throttledApply = ctx._throttle(() => {
    if (!ctx._channelObserver) return;
    if (!channelList.isConnected) {
      setupChannelObserver(ctx);
      return;
    }
    applyMicroStateForCurrentGuild(ctx);
  }, RA_OBSERVER_THROTTLE_MS);
  ctx._channelObserver = new MutationObserver(throttledApply);
  ctx._channelObserver.observe(channelList, { childList: true, subtree: true });
}
function setupSettingsGuard(ctx) {
  if (ctx._settingsObserver) {
    ctx._settingsObserver.disconnect();
    ctx._settingsObserver = null;
  }
  if (ctx._settingsGuardObserver) {
    try {
      ctx._settingsGuardObserver.disconnect();
    } catch (_) {
    }
    ctx._settingsGuardObserver = null;
  }
  if (ctx._settingsGuardInterval) {
    clearInterval(ctx._settingsGuardInterval);
    ctx._settingsGuardInterval = null;
  }
  syncSettingsGuardState(ctx);
  const settingsSel = import_discord_classes2.default.sel.standardSidebarView;
  ctx._settingsGuardObserver = new MutationObserver((records) => {
    var _a, _b;
    if (!ctx._controller) return;
    if (document.hidden) return;
    for (const r of records) {
      for (const list of [r.addedNodes, r.removedNodes]) {
        for (const node of list) {
          if (node.nodeType !== 1) continue;
          if (((_a = node.matches) == null ? void 0 : _a.call(node, settingsSel)) || ((_b = node.querySelector) == null ? void 0 : _b.call(node, settingsSel))) {
            syncSettingsGuardState(ctx);
            return;
          }
        }
      }
    }
  });
  ctx._settingsGuardObserver.observe(document.body, { childList: true });
}
function isSettingsModalOpen() {
  return !!document.querySelector(import_discord_classes2.default.sel.standardSidebarView);
}
function syncSettingsGuardState(ctx, forceOpen) {
  const body = document.body;
  if (!body) return false;
  const isOpen = typeof forceOpen === "boolean" ? forceOpen : isSettingsModalOpen();
  body.classList.toggle(RA_SETTINGS_OPEN_CLASS, isOpen);
  if (isOpen) clearAllHoverStates(ctx);
  return isOpen;
}
function clearSidebarHoverState(ctx) {
  clearTimeout(ctx._sidebarRevealTimer);
  clearTimeout(ctx._sidebarHideTimer);
  clearTimeout(ctx._channelRevealTimer);
  clearTimeout(ctx._channelHideTimer);
  ctx._sidebarRevealTimer = null;
  ctx._sidebarHideTimer = null;
  ctx._channelRevealTimer = null;
  ctx._channelHideTimer = null;
  document.body.classList.remove("ra-sidebar-hover-reveal");
  if (ctx._channelsHoverRevealActive) setHiddenChannelRevealState(ctx, false);
}
function clearAllHoverStates(ctx) {
  clearSidebarHoverState(ctx);
  clearTimeout(ctx._membersRevealTimer);
  clearTimeout(ctx._membersHideTimer);
  clearTimeout(ctx._profileRevealTimer);
  clearTimeout(ctx._profileHideTimer);
  ctx._membersRevealTimer = null;
  ctx._membersHideTimer = null;
  ctx._profileRevealTimer = null;
  ctx._profileHideTimer = null;
  document.body.classList.remove("ra-members-hover-reveal", "ra-profile-hover-reveal");
  invalidateChannelHoverCache();
}

// src/RulersAuthority/styles.js
var dc3 = require_discord_classes();
function updateCSSVars(ctx) {
  const s = ctx.settings;
  BdApi.DOM.removeStyle(RA_VARS_STYLE_ID);
  BdApi.DOM.addStyle(RA_VARS_STYLE_ID, `
    :root {
      --ra-transition-speed: ${s.transitionSpeed}ms;
      --ra-sidebar-width: ${s.panels.sidebar.width || s.defaultWidths.sidebar}px;
      --ra-members-width: ${s.panels.members.width || s.defaultWidths.members}px;
      --ra-profile-width: ${s.panels.profile.width || s.defaultWidths.profile}px;
      --ra-search-width: ${s.panels.search.width || s.defaultWidths.search}px;
      --ra-push-color: rgba(138, 43, 226, 0.25);
      --ra-members-bg: rgba(10, 14, 24, 0.44);
      --ra-hover-fudge: ${s.hoverFudgePx}px;
    }
  `.replace(/\s+/g, " "));
}
function buildCSS(ctx) {
  var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m;
  const m = ctx._modules || {};
  const buildCollapsedPushRule = (selectors) => `${selectors.join(",\n")} {
  width: 0 !important;
  min-width: 0 !important;
  max-width: 0 !important;
  overflow: hidden !important;
  transition: width var(--ra-transition-speed) ease,
              min-width var(--ra-transition-speed) ease,
              max-width var(--ra-transition-speed) ease;
}`;
  const sidebarSel = ((_a = m.sidebar) == null ? void 0 : _a.sidebarList) ? `.${m.sidebar.sidebarList}` : SIDEBAR_CSS_SAFE.join(", ");
  const membersSel = ((_b = m.members) == null ? void 0 : _b.membersWrap) ? `.${m.members.membersWrap}` : MEMBERS_FALLBACKS.join(", ");
  const profileSel = ((_c = m.panel) == null ? void 0 : _c.outer) ? `.${m.panel.outer}` : PROFILE_FALLBACKS.join(", ");
  const searchSel = ((_d = m.search) == null ? void 0 : _d.searchResultsWrap) ? `.${m.search.searchResultsWrap}` : SEARCH_FALLBACKS.join(", ");
  const chatSel = ((_e = m.guilds) == null ? void 0 : _e.chatContent) ? `.${m.guilds.chatContent}` : dc3.sel.chatContent;
  const sidebarPush = SIDEBAR_CSS_SAFE.map((s) => `body.ra-sidebar-pushed:not(.${RA_SETTINGS_OPEN_CLASS}) ${s}`);
  const membersPush = MEMBERS_FALLBACKS.map((s) => `body.ra-members-pushed ${s}`);
  const profilePush = PROFILE_FALLBACKS.map((s) => `body.ra-profile-pushed ${s}`);
  const searchPush = SEARCH_FALLBACKS.map((s) => `body.ra-search-pushed ${s}`);
  if ((_f = m.sidebar) == null ? void 0 : _f.sidebarList) sidebarPush.unshift(`body.ra-sidebar-pushed:not(.${RA_SETTINGS_OPEN_CLASS}) .${m.sidebar.sidebarList}`);
  if ((_g = m.members) == null ? void 0 : _g.membersWrap) membersPush.unshift(`body.ra-members-pushed .${m.members.membersWrap}`);
  if ((_h = m.panel) == null ? void 0 : _h.outer) profilePush.unshift(`body.ra-profile-pushed .${m.panel.outer}`);
  if ((_i = m.search) == null ? void 0 : _i.searchResultsWrap) searchPush.unshift(`body.ra-search-pushed .${m.search.searchResultsWrap}`);
  const sidebarHover = SIDEBAR_CSS_SAFE.map((s) => `body.ra-sidebar-pushed.ra-sidebar-hover-reveal:not(.${RA_SETTINGS_OPEN_CLASS}) ${s}`);
  const membersHover = MEMBERS_FALLBACKS.map((s) => `body.ra-members-pushed.ra-members-hover-reveal ${s}`);
  const profileHover = PROFILE_FALLBACKS.map((s) => `body.ra-profile-pushed.ra-profile-hover-reveal ${s}`);
  if ((_j = m.sidebar) == null ? void 0 : _j.sidebarList) sidebarHover.unshift(`body.ra-sidebar-pushed.ra-sidebar-hover-reveal:not(.${RA_SETTINGS_OPEN_CLASS}) .${m.sidebar.sidebarList}`);
  if ((_k = m.members) == null ? void 0 : _k.membersWrap) membersHover.unshift(`body.ra-members-pushed.ra-members-hover-reveal .${m.members.membersWrap}`);
  if ((_l = m.panel) == null ? void 0 : _l.outer) profileHover.unshift(`body.ra-profile-pushed.ra-profile-hover-reveal .${m.panel.outer}`);
  const sidebarHandleDisable = SIDEBAR_FALLBACKS.map((s) => `body.${RA_SETTINGS_OPEN_CLASS} ${s}::before`);
  if ((_m = m.sidebar) == null ? void 0 : _m.sidebarList) sidebarHandleDisable.unshift(`body.${RA_SETTINGS_OPEN_CLASS} .${m.sidebar.sidebarList}::before`);
  return `
/* \u2500\u2500 Ruler's Authority v${RA_VERSION} \u2014 Dynamic CSS \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */

/* \u2500\u2500 Core Panel Push \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */

${buildCollapsedPushRule(sidebarPush)}

${buildCollapsedPushRule(membersPush)}

${buildCollapsedPushRule(profilePush)}

${buildCollapsedPushRule(searchPush)}

/* \u2500\u2500 Members Column Surface (transparent) \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */

${membersSel},
${membersSel} > div${dc3.sel.members},
${membersSel} > div${dc3.sel.container} {
  background: var(--ra-members-bg) !important;
  position: relative !important;
  overflow: visible !important;
}

${membersSel},
${membersSel} ${dc3.sel.members},
${membersSel} ${dc3.sel.scroller},
${membersSel} ${dc3.sel.thin},
${membersSel} ${dc3.sel.scrollerBase} {
  scrollbar-width: none !important;
  -ms-overflow-style: none !important;
}

${membersSel}::-webkit-scrollbar,
${membersSel} ${dc3.sel.members}::-webkit-scrollbar,
${membersSel} ${dc3.sel.scroller}::-webkit-scrollbar,
${membersSel} ${dc3.sel.thin}::-webkit-scrollbar,
${membersSel} ${dc3.sel.scrollerBase}::-webkit-scrollbar {
  width: 0 !important;
  height: 0 !important;
  display: none !important;
}

/* \u2500\u2500 Chat content dark overlay \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */
body.ra-members-pushed.ra-members-hover-reveal ${chatSel} {
  background: rgba(0, 0, 0, 0.4) !important;
}

/* \u2500\u2500 Members: outer wrap matches inner dark overlay \u2500\u2500 */
body.ra-members-pushed.ra-members-hover-reveal ${membersSel},
body.ra-members-pushed.ra-members-hover-reveal div[class^="membersWrap_"] {
  background: rgba(0, 0, 0, 0.4) !important;
  background-color: rgba(0, 0, 0, 0.4) !important;
  box-shadow: none !important;
  border-left: 0 !important;
  outline: none !important;
}

body.ra-members-pushed.ra-members-hover-reveal div[class^="members_"] {
  background: transparent !important;
  background-color: transparent !important;
  box-shadow: none !important;
  border-left: 0 !important;
  outline: none !important;
}

body.ra-members-pushed.ra-members-hover-reveal div[aria-label="Members"][role="list"] {
  background: transparent !important;
  -webkit-mask-image: none !important;
  mask-image: none !important;
}

/* \u2500\u2500 Hover-to-Expand (float overlay) \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */

${sidebarHover.join(",\n")} {
  width: var(--ra-sidebar-width) !important;
  min-width: var(--ra-sidebar-width) !important;
  max-width: var(--ra-sidebar-width) !important;
  overflow-y: auto !important;
  box-shadow: none !important;
  transition: width var(--ra-transition-speed) ease,
              min-width var(--ra-transition-speed) ease,
              max-width var(--ra-transition-speed) ease;
}

${membersHover.join(",\n")} {
  width: var(--ra-members-width) !important;
  min-width: var(--ra-members-width) !important;
  max-width: var(--ra-members-width) !important;
  overflow-y: auto !important;
  overflow-x: visible !important;
  position: relative !important;
  border-left: 0 !important;
  box-shadow: none !important;
  transition: width var(--ra-transition-speed) ease,
              min-width var(--ra-transition-speed) ease,
              max-width var(--ra-transition-speed) ease;
}

/* Stable selectors from live DOM: force-hide member list scrollbar */
body.ra-members-pushed.ra-members-hover-reveal aside[class^="membersWrap_"] > div[class^="members_"],
body.ra-members-pushed.ra-members-hover-reveal div[aria-label="Members"][role="list"] {
  overflow-y: auto !important;
  overflow-x: hidden !important;
  scrollbar-width: none !important;
  -ms-overflow-style: none !important;
}

body.ra-members-pushed.ra-members-hover-reveal aside[class^="membersWrap_"] > div[class^="members_"]::-webkit-scrollbar,
body.ra-members-pushed.ra-members-hover-reveal div[aria-label="Members"][role="list"]::-webkit-scrollbar {
  width: 0 !important;
  height: 0 !important;
  display: none !important;
  background: transparent !important;
}

${profileHover.join(",\n")} {
  width: var(--ra-profile-width) !important;
  min-width: var(--ra-profile-width) !important;
  max-width: var(--ra-profile-width) !important;
  overflow-y: auto !important;
  position: absolute !important;
  right: 0 !important;
  top: 0 !important;
  height: 100% !important;
  z-index: 101 !important;
  box-shadow: -4px 0 20px var(--ra-push-color) !important;
  transition: width var(--ra-transition-speed) ease,
              min-width var(--ra-transition-speed) ease,
              max-width var(--ra-transition-speed) ease;
}

/* \u2500\u2500 Resize Handles (::before pseudo-elements \u2014 CollapsibleUI pattern) \u2500\u2500 */

${membersSel}:before,
${profileSel}:before,
${searchSel}:before {
  cursor: e-resize;
  z-index: 200;
  position: absolute;
  content: "";
  width: 12px;
  height: 100%;
  left: -4px;
  opacity: 0;
  transition: opacity 200ms ease;
}

${membersSel}:hover:before,
${profileSel}:hover:before,
${searchSel}:hover:before {
  opacity: 1;
  background: transparent;
}

${sidebarSel}:before {
  cursor: e-resize;
  z-index: 200;
  position: absolute;
  content: "";
  width: 12px;
  height: 100%;
  right: -4px;
  left: auto;
  opacity: 0;
  transition: opacity 200ms ease;
}

${sidebarSel}:hover:before {
  opacity: 1;
  background: transparent;
}

${sidebarHandleDisable.join(",\n")} {
  opacity: 0 !important;
  background: none !important;
  pointer-events: none !important;
}

/* \u2500\u2500 Crushed Category Visual \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */

[data-ra-crushed="true"] {
  opacity: 0.5;
  border-left: 2px solid rgba(138, 43, 226, 0.4);
}

/* \u2500\u2500 Grip DM Indicator \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */

.ra-grip-indicator {
  position: absolute;
  top: 4px;
  right: 4px;
  width: 8px;
  height: 8px;
  background: radial-gradient(circle, rgba(138, 43, 226, 1) 0%, rgba(138, 43, 226, 0.3) 100%);
  border-radius: 50%;
  pointer-events: none;
  animation: ra-grip-pulse 2s ease-in-out infinite;
}

@keyframes ra-grip-pulse {
  0%, 100% { opacity: 0.6; transform: scale(1); }
  50% { opacity: 1; transform: scale(1.3); }
}

/* \u2500\u2500 Toolbar Icon \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */

.ra-toolbar-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  cursor: pointer;
  border-radius: 2px;
  transition: opacity 0.15s ease, background 0.15s ease, color 0.15s ease;
  margin: 0 2px;
  opacity: 0.85;
  color: #b5bac1;
}

.ra-toolbar-icon:hover {
  opacity: 1;
  background: rgba(138, 43, 226, 0.15);
}

.ra-toolbar-icon:hover svg {
  filter: drop-shadow(0 0 4px rgba(200, 170, 255, 0.7));
}

.ra-toolbar-icon--active {
  opacity: 1;
}

.ra-toolbar-icon--active svg {
  filter: drop-shadow(0 0 4px rgba(138, 43, 226, 0.6));
}

.ra-toolbar-icon--hidden {
  display: none !important;
}

/* \u2500\u2500 Push/Pull Animation \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */

@keyframes ra-push-ripple {
  0% { box-shadow: inset 3px 0 12px rgba(138, 43, 226, 0.5); }
  50% { box-shadow: inset 3px 0 20px rgba(138, 43, 226, 0.2); }
  100% { box-shadow: none; }
}

@keyframes ra-pull-bounce {
  0% { transform: scaleX(0.97); }
  60% { transform: scaleX(1.01); }
  100% { transform: scaleX(1); }
}

body.ra-pushing ${chatSel} {
  animation: ra-push-ripple 500ms ease-out;
}

body.ra-pulling ${chatSel} {
  animation: ra-pull-bounce 350ms ease-out;
}
  `.trim();
}
function injectCSS(ctx) {
  if (!ctx._builtCSS) ctx._builtCSS = buildCSS(ctx);
  BdApi.DOM.removeStyle(RA_STYLE_ID);
  BdApi.DOM.addStyle(RA_STYLE_ID, ctx._builtCSS);
}

// src/RulersAuthority/settings.js
function getSettingsPanel(ctx) {
  const React = BdApi.React;
  const { useState, useCallback, useReducer } = React;
  const ce = React.createElement;
  const SettingsPanel = () => {
    const [, forceUpdate] = useReducer((x) => x + 1, 0);
    const [debug, setDebug] = useState(ctx.settings.debugMode);
    const [transSpeed, setTransSpeed] = useState(ctx.settings.transitionSpeed);
    const [anims, setAnims] = useState(ctx.settings.animationsEnabled);
    const slsData = getSoloLevelingData(ctx);
    const updateSetting = useCallback((key, value) => {
      ctx.settings[key] = value;
      ctx.saveSettings();
      forceUpdate();
    }, []);
    const containerStyle = {
      background: "rgba(10, 10, 16, 0.98)",
      padding: "16px",
      borderRadius: "2px",
      color: "#ccc",
      fontFamily: "inherit",
      fontSize: "14px"
    };
    const sectionStyle = {
      marginBottom: "16px",
      padding: "12px",
      background: "#252540",
      borderRadius: "2px"
    };
    const headerStyle = { color: "#b49bff", fontSize: "16px", marginBottom: "8px", fontWeight: "600" };
    const subHeaderStyle = { color: "#9b8ec4", fontSize: "13px", marginBottom: "6px", fontWeight: "500" };
    const labelStyle = { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "6px" };
    const dimStyle = { fontSize: "11px", color: "#666", marginTop: "2px" };
    const btnStyle = {
      background: "#9b59b6",
      border: "none",
      color: "#fff",
      padding: "4px 10px",
      borderRadius: "2px",
      cursor: "pointer",
      fontSize: "12px",
      marginRight: "6px",
      marginBottom: "4px"
    };
    const btnDimStyle = { ...btnStyle, background: "#444" };
    const Toggle = ({ label, checked, onChange }) => ce(
      "label",
      { style: labelStyle },
      ce("span", null, label),
      ce("input", {
        type: "checkbox",
        checked,
        style: { accentColor: "#9b59b6" },
        onChange: (e) => onChange(e.target.checked)
      })
    );
    const StatusSection = () => ce(
      "div",
      { style: sectionStyle },
      ce("div", { style: headerStyle }, "Ruler's Authority"),
      ce(
        "div",
        { style: dimStyle },
        slsData ? `INT: ${slsData.intelligence} | Level: ${slsData.level}` : "SoloLevelingStats not detected"
      ),
      ctx._amplifiedMode && ce(
        "div",
        { style: { ...dimStyle, color: "#b49bff", marginTop: "4px" } },
        "AMPLIFIED MODE ACTIVE"
      ),
      ce(
        "div",
        { style: { ...dimStyle, marginTop: "4px" } },
        `Webpack: ${Object.keys(ctx._resolvedSelectors).filter((k) => {
          var _a, _b, _c, _d, _e;
          const m = ctx._modules;
          if (k === "sidebar") return !!((_a = m.sidebar) == null ? void 0 : _a.sidebarList);
          if (k === "members") return !!((_b = m.members) == null ? void 0 : _b.membersWrap);
          if (k === "profile") return !!((_c = m.panel) == null ? void 0 : _c.outer);
          if (k === "search") return !!((_d = m.search) == null ? void 0 : _d.searchResultsWrap);
          if (k === "toolbar") return !!((_e = m.icons) == null ? void 0 : _e.toolbar);
          return false;
        }).length}/5 modules resolved`
      )
    );
    const PanelSection = () => ce(
      "div",
      { style: sectionStyle },
      ce("div", { style: subHeaderStyle }, "Panel Controls"),
      Object.entries(PANEL_DEFS).map(
        ([name, def]) => ce(
          "div",
          { key: name, style: { marginBottom: "8px" } },
          ce(Toggle, {
            label: def.label,
            checked: ctx.settings.panels[name].pushed,
            onChange: () => {
              togglePanel(ctx, name);
              forceUpdate();
            }
          }),
          def.hoverCapable && ce(Toggle, {
            label: "  \u21B3 Hover to expand",
            checked: ctx.settings.panels[name].hoverExpand,
            onChange: (v) => {
              ctx.settings.panels[name].hoverExpand = v;
              ctx.saveSettings();
              forceUpdate();
            }
          }),
          // Width display (if panel has been resized)
          ctx.settings.panels[name].width > 0 && ce(
            "div",
            { style: { ...dimStyle, display: "flex", alignItems: "center", gap: "6px" } },
            ce("span", null, `Width: ${ctx.settings.panels[name].width}px`),
            ce("button", {
              style: { ...btnDimStyle, fontSize: "10px", padding: "2px 6px", marginBottom: "0" },
              onClick: () => {
                ctx.settings.panels[name].width = ctx.settings.defaultWidths[name];
                ctx.saveSettings();
                updateCSSVars(ctx);
                forceUpdate();
              }
            }, "Reset")
          )
        )
      )
    );
    const HiddenChannelsSection = () => {
      const guildEntries = Object.entries(ctx.settings.guilds).filter(
        ([, data]) => {
          var _a, _b;
          return ((_a = data.hiddenChannels) == null ? void 0 : _a.length) > 0 || ((_b = data.crushedCategories) == null ? void 0 : _b.length) > 0;
        }
      );
      if (guildEntries.length === 0) return null;
      return ce(
        "div",
        { style: sectionStyle },
        ce("div", { style: subHeaderStyle }, "Pushed Channels & Crushed Categories"),
        guildEntries.map(([guildId, data]) => {
          var _a, _b, _c, _d;
          const guild = (_b = (_a = ctx._GuildStore) == null ? void 0 : _a.getGuild) == null ? void 0 : _b.call(_a, guildId);
          const guildName = (guild == null ? void 0 : guild.name) || guildId;
          return ce(
            "div",
            { key: guildId, style: { marginBottom: "10px" } },
            ce("div", { style: { fontSize: "12px", color: "#999", marginBottom: "4px" } }, guildName),
            (_c = data.hiddenChannels) == null ? void 0 : _c.map(
              (ch) => ce("button", {
                key: ch.id,
                style: btnDimStyle,
                onClick: () => {
                  recallChannel(ctx, guildId, ch.id);
                  forceUpdate();
                }
              }, `Recall #${ch.name}`)
            ),
            (_d = data.crushedCategories) == null ? void 0 : _d.map(
              (cat) => ce("button", {
                key: cat.id,
                style: btnDimStyle,
                onClick: () => {
                  releaseCategory(ctx, guildId, cat.id);
                  forceUpdate();
                }
              }, `Release ${cat.name}`)
            )
          );
        })
      );
    };
    const GrippedDMsSection = () => {
      if (ctx.settings.grippedDMs.length === 0) return null;
      return ce(
        "div",
        { style: sectionStyle },
        ce("div", { style: subHeaderStyle }, "Gripped DMs"),
        ctx.settings.grippedDMs.map(
          (dm) => ce("button", {
            key: dm.channelId,
            style: btnDimStyle,
            onClick: () => {
              releaseDM(ctx, dm.channelId);
              forceUpdate();
            }
          }, `Release ${dm.username}`)
        )
      );
    };
    const GeneralSection = () => ce(
      "div",
      { style: sectionStyle },
      ce("div", { style: subHeaderStyle }, "General"),
      ce(
        "label",
        { style: { ...labelStyle, marginBottom: "10px" } },
        ce("span", null, `Transition Speed: ${transSpeed}ms`),
        ce("input", {
          type: "range",
          min: 0,
          max: 600,
          step: 50,
          value: transSpeed,
          style: { width: "120px", accentColor: "#9b59b6" },
          onChange: (e) => {
            const v = Number(e.target.value);
            setTransSpeed(v);
            ctx.settings.transitionSpeed = v;
            ctx.saveSettings();
            updateCSSVars(ctx);
          }
        })
      ),
      ce(Toggle, {
        label: "Animations",
        checked: anims,
        onChange: (v) => {
          setAnims(v);
          updateSetting("animationsEnabled", v);
        }
      }),
      ce(Toggle, {
        label: "Debug Mode",
        checked: debug,
        onChange: (v) => {
          setDebug(v);
          updateSetting("debugMode", v);
        }
      })
    );
    return ce(
      "div",
      { style: containerStyle },
      ce(StatusSection),
      ce(PanelSection),
      ce(HiddenChannelsSection),
      ce(GrippedDMsSection),
      ce(GeneralSection)
    );
  };
  return React.createElement(SettingsPanel);
}

// src/RulersAuthority/index.js
var { createToast } = require_toast();
var { getSkillTreeLevel, getPluginInstance } = require_plugin_bridge();
var { saveSettings: _sharedSaveSettings } = require_settings();
var { removeToolbarTooltip: _removeToolbarTooltip } = require_toolbar_tooltip();
var { onKeydown } = require_dom_bus();
var _safeGetByKeys = (...keys) => {
  try {
    return BdApi.Webpack.getByKeys(...keys) || null;
  } catch (_) {
    return null;
  }
};
var _createModules = () => ({
  _members: void 0,
  _membersResolved: false,
  _sidebar: void 0,
  _sidebarResolved: false,
  _panel: void 0,
  _panelResolved: false,
  _search: void 0,
  _searchResolved: false,
  _toolbar: void 0,
  _toolbarResolved: false,
  _icons: void 0,
  _iconsResolved: false,
  _guilds: void 0,
  _guildsResolved: false,
  _channels: void 0,
  _channelsResolved: false,
  get members() {
    if (!this._membersResolved) {
      this._members = _safeGetByKeys("membersWrap", "hiddenMembers");
      this._membersResolved = true;
    }
    return this._members;
  },
  get sidebar() {
    if (!this._sidebarResolved) {
      this._sidebar = _safeGetByKeys("sidebar", "activityPanel", "sidebarListRounded");
      this._sidebarResolved = true;
    }
    return this._sidebar;
  },
  get panel() {
    if (!this._panelResolved) {
      this._panel = _safeGetByKeys("outer", "inner", "overlay");
      this._panelResolved = true;
    }
    return this._panel;
  },
  get search() {
    if (!this._searchResolved) {
      this._search = _safeGetByKeys("searchResultsWrap", "stillIndexing", "noResults");
      this._searchResolved = true;
    }
    return this._search;
  },
  get toolbar() {
    if (!this._toolbarResolved) {
      this._toolbar = _safeGetByKeys("updateIconForeground", "search", "downloadArrow");
      this._toolbarResolved = true;
    }
    return this._toolbar;
  },
  get icons() {
    if (!this._iconsResolved) {
      this._icons = _safeGetByKeys("selected", "iconWrapper", "clickable", "icon");
      this._iconsResolved = true;
    }
    return this._icons;
  },
  get guilds() {
    if (!this._guildsResolved) {
      this._guilds = _safeGetByKeys("chatContent", "noChat", "parentChannelName");
      this._guildsResolved = true;
    }
    return this._guilds;
  },
  get channels() {
    if (!this._channelsResolved) {
      this._channels = _safeGetByKeys("channel", "closeIcon", "dm");
      this._channelsResolved = true;
    }
    return this._channels;
  }
});
var { createSingleValueCache: _ttl } = require_ttl_cache();
var { setPluginUtils, isEditableTarget, matchesHotkey } = require_hotkeys2();
setPluginUtils(_PluginUtils);
function ensureGuildSettingsShape(settings) {
  if (typeof settings.guilds !== "object" || settings.guilds === null) settings.guilds = {};
}
function ensurePanelSettingsShape(settings) {
  if (!settings.panels || typeof settings.panels !== "object") {
    settings.panels = structuredClone(DEFAULT_SETTINGS.panels);
  }
  for (const [panelName, def] of Object.entries(PANEL_DEFS)) {
    if (!settings.panels[panelName] || typeof settings.panels[panelName] !== "object") {
      settings.panels[panelName] = structuredClone(DEFAULT_SETTINGS.panels[panelName] || {});
    }
    if (def.hoverCapable && typeof settings.panels[panelName].hoverExpand !== "boolean") {
      settings.panels[panelName].hoverExpand = true;
    }
  }
}
function sanitizeLoadedSettings(saved, deepMerge) {
  const settings = deepMerge(DEFAULT_SETTINGS, saved);
  if (!Array.isArray(settings.grippedDMs)) settings.grippedDMs = [];
  if (!settings.defaultWidths) settings.defaultWidths = { ...DEFAULT_SETTINGS.defaultWidths };
  ensureGuildSettingsShape(settings);
  ensurePanelSettingsShape(settings);
  return settings;
}
module.exports = class RulersAuthority {
  constructor() {
    this.settings = structuredClone(DEFAULT_SETTINGS);
    this._amplifiedMode = false;
    this._amplifiedExpiresAt = 0;
    this._modules = null;
    this._ChannelStore = null;
    this._GuildStore = null;
    this._SelectedGuildStore = null;
    this._SelectedChannelStore = null;
    this._statsCache = _ttl(RA_STATS_CACHE_TTL);
    this._panelElCache = null;
    this._resolvedSelectors = {};
    this._controller = null;
    this._channelObserver = null;
    this._dmObserver = null;
    this._toolbarObserver = null;
    this._settingsObserver = null;
    this._iconReinjectTimeout = null;
    this._sidebarRevealTimer = null;
    this._sidebarHideTimer = null;
    this._membersRevealTimer = null;
    this._membersHideTimer = null;
    this._profileRevealTimer = null;
    this._profileHideTimer = null;
    this._channelRevealTimer = null;
    this._channelHideTimer = null;
    this._channelsHoverRevealActive = false;
    this._onDungeonCombatSkillStateChanged = null;
    this._amplifiedExpireTimer = null;
    this._pushAnimTimer = null;
    this._pullAnimTimer = null;
    this._dragging = null;
    this._dragPanel = null;
    this._guildChangeHandler = null;
    this._channelChangeHandler = null;
    this._guildChangeApplyTimer = null;
    this._channelObserverRetryTimer = null;
    this._authorityResourcesActive = false;
    this._currentGateLevel = 0;
    this._onAuthorityLevelChanged = null;
  }
  // SkillTree gate helpers
  _getRulersAuthorityLevel() {
    return getSkillTreeLevel("rulers_authority");
  }
  /**
   * Whether a panel is allowed at the current Ruler's Authority skill level.
   * Lv 2+: members, profile, search panels active
   * Lv 3:  sidebar panel also active
   */
  isPanelGated(panelName) {
    if (panelName === "sidebar") return this._currentGateLevel < 3;
    return false;
  }
  // Lifecycle
  start() {
    var _a, _b;
    this._toast = ((_b = (_a = _PluginUtils) == null ? void 0 : _a.createToastHelper) == null ? void 0 : _b.call(_a, "rulersAuthority")) || createToast();
    try {
      if (this._controller) this.stop({ silent: true });
      this._onAuthorityLevelChanged = (e) => {
        var _a2;
        if (((_a2 = e.detail) == null ? void 0 : _a2.skillId) !== "rulers_authority") return;
        const level2 = e.detail.level || 0;
        this._handleAuthorityLevelChange(level2);
      };
      document.addEventListener("SkillTree:skillLevelChanged", this._onAuthorityLevelChanged);
      this.loadSettings();
      this.initWebpack();
      injectCSS(this);
      updateCSSVars(this);
      const level = this._getRulersAuthorityLevel();
      if (level >= 2) {
        this._activateAuthorityResources(level);
      } else {
        this._skillTreeRetryTimer = setTimeout(() => {
          this._skillTreeRetryTimer = null;
          const retryLevel = this._getRulersAuthorityLevel();
          if (retryLevel >= 2 && !this._authorityResourcesActive) {
            this._activateAuthorityResources(retryLevel);
          }
        }, 4e3);
        this._toast("Ruler's Authority awaiting skill level 2", "info");
      }
    } catch (err) {
      this.debugError("Lifecycle", "Error during start:", err);
      try {
        this.stop({ silent: true });
      } catch (_) {
      }
      this._toast("Ruler's Authority \u2014 Failed to start", "error");
    }
  }
  _handleAuthorityLevelChange(level) {
    var _a;
    if (level >= 2 && !this._authorityResourcesActive) {
      this._activateAuthorityResources(level);
    } else if (level < 2 && this._authorityResourcesActive) {
      this._deactivateAuthorityResources();
    } else if (this._authorityResourcesActive && level !== this._currentGateLevel) {
      const hadSidebar = this._currentGateLevel >= 3;
      const hasSidebar = level >= 3;
      this._currentGateLevel = level;
      if (!hadSidebar && hasSidebar) {
        this.debugLog("SkillGate", "Sidebar panel unlocked at level 3");
        if ((_a = this.settings.panels.sidebar) == null ? void 0 : _a.pushed) {
          document.body.classList.add("ra-sidebar-pushed");
        }
        this._toast("Sidebar control unlocked \u2014 Level 3", "success");
      } else if (hadSidebar && !hasSidebar) {
        this.debugLog("SkillGate", "Sidebar panel revoked (below level 3)");
        document.body.classList.remove("ra-sidebar-pushed", "ra-sidebar-hover-reveal");
        clearTimeout(this._sidebarRevealTimer);
        clearTimeout(this._sidebarHideTimer);
        this._sidebarRevealTimer = null;
        this._sidebarHideTimer = null;
        this._toast("Sidebar control revoked", "info");
      }
    }
  }
  _activateAuthorityResources(level) {
    if (this._authorityResourcesActive) return;
    this._authorityResourcesActive = true;
    this._currentGateLevel = level;
    this._controller = new AbortController();
    setupSettingsGuard(this);
    updateCSSVars(this);
    restorePanelStates(this);
    injectToolbarIcon(this);
    setupToolbarObserver(this);
    patchContextMenus(this);
    this.setupHotkeyListener();
    setupHoverHandlers(this);
    setupResizeHandlers(this);
    setupChannelObserver(this);
    setupGuildChangeListener(this);
    applyMicroStateForCurrentGuild(this);
    applyDMGripping(this);
    setupDMObserver(this);
    this._onDungeonCombatSkillStateChanged = (e) => {
      var _a, _b, _c, _d, _e;
      if (((_a = e.detail) == null ? void 0 : _a.skillId) !== "rulers_authority_force" || ((_b = e.detail) == null ? void 0 : _b.reason) !== "used") return;
      const skillTree = getPluginInstance("SkillTree");
      const durationMs = ((_e = (_d = (_c = skillTree == null ? void 0 : skillTree.dungeonCombatSkillDefs) == null ? void 0 : _c.rulers_authority_force) == null ? void 0 : _d.debuff) == null ? void 0 : _e.disableAttacksDurationMs) || 0;
      if (!durationMs) return;
      this._amplifiedMode = true;
      this._amplifiedExpiresAt = Date.now() + durationMs;
      if (this._amplifiedExpireTimer) clearTimeout(this._amplifiedExpireTimer);
      this._amplifiedExpireTimer = setTimeout(() => {
        this._amplifiedExpireTimer = null;
        this._amplifiedMode = false;
        this._amplifiedExpiresAt = 0;
        updateToolbarIcon(this);
      }, durationMs);
      updateToolbarIcon(this);
    };
    document.addEventListener("SkillTree:dungeonCombatSkillStateChanged", this._onDungeonCombatSkillStateChanged);
    const desc = level >= 3 ? "Full Authority (sidebar + members)" : "Members control active";
    this._toast(`Ruler's Authority \u2014 ${desc}`, "info");
  }
  _deactivateAuthorityResources() {
    if (!this._authorityResourcesActive) return;
    this._authorityResourcesActive = false;
    this._currentGateLevel = 0;
    this._clearLifecycleTimers();
    if (this._keydownUnsub) {
      this._keydownUnsub();
      this._keydownUnsub = null;
    }
    if (this._controller) {
      this._controller.abort();
      this._controller = null;
    }
    this._resetBodyVisualState();
    const icon = document.getElementById(RA_TOOLBAR_ICON_ID);
    if (icon) icon.remove();
    _removeToolbarTooltip("sl-toolbar-tip-ra");
    teardownToolbarObserver(this);
    if (this._unpatchChannelCtx) {
      this._unpatchChannelCtx();
      this._unpatchChannelCtx = null;
    }
    this._disconnectObserversAndGuards();
    this._detachSkillTreeListeners();
    this._detachStoreListeners();
    restoreAllHiddenChannels();
    restoreAllCrushedCategories();
    removeAllResizeStyles(this);
    document.body.classList.remove(RA_SETTINGS_OPEN_CLASS);
    this._resetRuntimeReferences();
    this._toast("Ruler's Authority \u2014 Power revoked", "info");
  }
  stop(options = {}) {
    const { silent = false } = options;
    try {
      if (this._onAuthorityLevelChanged) {
        document.removeEventListener("SkillTree:skillLevelChanged", this._onAuthorityLevelChanged);
        this._onAuthorityLevelChanged = null;
      }
      if (this._authorityResourcesActive) {
        this._authorityResourcesActive = false;
        this._currentGateLevel = 0;
      }
      if (this._skillTreeRetryTimer) {
        clearTimeout(this._skillTreeRetryTimer);
        this._skillTreeRetryTimer = null;
      }
      this._clearLifecycleTimers();
      if (this._keydownUnsub) {
        this._keydownUnsub();
        this._keydownUnsub = null;
      }
      if (this._controller) {
        this._controller.abort();
        this._controller = null;
      }
      clearAllHoverStates(this);
      this._resetBodyVisualState();
      BdApi.DOM.removeStyle(RA_STYLE_ID);
      BdApi.DOM.removeStyle(RA_VARS_STYLE_ID);
      const icon = document.getElementById(RA_TOOLBAR_ICON_ID);
      if (icon) icon.remove();
      _removeToolbarTooltip("sl-toolbar-tip-ra");
      teardownToolbarObserver(this);
      if (this._unpatchChannelCtx) {
        this._unpatchChannelCtx();
        this._unpatchChannelCtx = null;
      }
      this._disconnectObserversAndGuards();
      this._detachSkillTreeListeners();
      this._detachStoreListeners();
      restoreAllHiddenChannels();
      restoreAllCrushedCategories();
      removeAllResizeStyles(this);
      document.body.classList.remove(RA_SETTINGS_OPEN_CLASS);
      this._resetRuntimeReferences();
    } catch (err) {
      this.debugError("Lifecycle", "Error during stop:", err);
    }
    if (!silent) this._toast("Ruler's Authority \u2014 Dormant", "info");
  }
  _clearLifecycleTimers() {
    const timeoutKeys = [
      "_iconReinjectTimeout",
      "_sidebarRevealTimer",
      "_sidebarHideTimer",
      "_membersRevealTimer",
      "_membersHideTimer",
      "_profileRevealTimer",
      "_profileHideTimer",
      "_channelRevealTimer",
      "_channelHideTimer",
      "_pushAnimTimer",
      "_pullAnimTimer",
      "_guildChangeApplyTimer",
      "_channelObserverRetryTimer"
    ];
    for (const key of timeoutKeys) {
      clearTimeout(this[key]);
      this[key] = null;
    }
  }
  _resetBodyVisualState() {
    for (const panelName of Object.keys(PANEL_DEFS)) {
      document.body.classList.remove(`ra-${panelName}-pushed`, `ra-${panelName}-hover-reveal`);
    }
    document.body.classList.remove("ra-pushing", "ra-pulling", "ra-channels-hover-reveal");
    this._channelsHoverRevealActive = false;
  }
  _disconnectObserversAndGuards() {
    if (this._channelObserver) {
      this._channelObserver.disconnect();
      this._channelObserver = null;
    }
    if (this._dmObserver) {
      this._dmObserver.disconnect();
      this._dmObserver = null;
    }
    if (this._settingsObserver) {
      this._settingsObserver.disconnect();
      this._settingsObserver = null;
    }
    if (this._settingsGuardObserver) {
      try {
        this._settingsGuardObserver.disconnect();
      } catch (_) {
      }
      this._settingsGuardObserver = null;
    }
    if (this._settingsGuardInterval) {
      clearInterval(this._settingsGuardInterval);
      this._settingsGuardInterval = null;
    }
  }
  _detachSkillTreeListeners() {
    if (this._onDungeonCombatSkillStateChanged) {
      document.removeEventListener("SkillTree:dungeonCombatSkillStateChanged", this._onDungeonCombatSkillStateChanged);
      this._onDungeonCombatSkillStateChanged = null;
    }
    if (this._amplifiedExpireTimer) {
      clearTimeout(this._amplifiedExpireTimer);
      this._amplifiedExpireTimer = null;
    }
    this._amplifiedMode = false;
    this._amplifiedExpiresAt = 0;
  }
  _detachStoreListeners() {
    if (this._guildChangeHandler && this._SelectedGuildStore) {
      this._SelectedGuildStore.removeChangeListener(this._guildChangeHandler);
      this._guildChangeHandler = null;
    }
    if (this._channelChangeHandler && this._SelectedChannelStore) {
      this._SelectedChannelStore.removeChangeListener(this._channelChangeHandler);
      this._channelChangeHandler = null;
    }
  }
  _resetRuntimeReferences() {
    this._ChannelStore = null;
    this._GuildStore = null;
    this._SelectedGuildStore = null;
    this._SelectedChannelStore = null;
    this._statsCache.invalidate();
    this._modules = null;
    this._resolvedSelectors = {};
    this._panelElCache = null;
    this._dragging = null;
    this._dragPanel = null;
    this._hotkeyHandler = null;
    this._keydownUnsub = null;
  }
  initWebpack() {
    const { Webpack } = BdApi;
    this._ChannelStore = Webpack.getStore("ChannelStore");
    this._GuildStore = Webpack.getStore("GuildStore");
    this._SelectedGuildStore = Webpack.getStore("SelectedGuildStore");
    this._SelectedChannelStore = Webpack.getStore("SelectedChannelStore");
    this._modules = _createModules();
    this._builtCSS = null;
    this._buildResolvedSelectors();
    this.debugLog("Webpack", "Modules acquired", {
      stores: {
        ChannelStore: !!this._ChannelStore,
        GuildStore: !!this._GuildStore,
        SelectedGuildStore: !!this._SelectedGuildStore,
        SelectedChannelStore: !!this._SelectedChannelStore
      },
      cssModules: {
        members: !!this._modules.members,
        sidebar: !!this._modules.sidebar,
        panel: !!this._modules.panel,
        search: !!this._modules.search,
        toolbar: !!this._modules.toolbar,
        icons: !!this._modules.icons,
        guilds: !!this._modules.guilds
      }
    });
  }
  _buildResolvedSelectors() {
    var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k;
    const m = this._modules;
    this._resolvedSelectors = {
      sidebar: ((_a = m.sidebar) == null ? void 0 : _a.sidebarList) ? [`.${m.sidebar.sidebarList}`] : SIDEBAR_FALLBACKS,
      members: ((_b = m.members) == null ? void 0 : _b.membersWrap) ? [`.${m.members.membersWrap}`] : MEMBERS_FALLBACKS,
      profile: ((_c = m.panel) == null ? void 0 : _c.outer) ? [
        ...((_d = m.guilds) == null ? void 0 : _d.content) ? [`.${m.guilds.content} .${m.panel.outer}`] : [],
        `.${m.panel.outer}`
      ] : PROFILE_FALLBACKS,
      search: ((_e = m.search) == null ? void 0 : _e.searchResultsWrap) ? [`.${m.search.searchResultsWrap}`] : SEARCH_FALLBACKS,
      // toolbar: always use the substring fallbacks FIRST. The Webpack-resolved
      // single class (m.icons.toolbar) points at a DIFFERENT toolbar element
      // than the channel-header icon cluster, which parked RA's icon at the far
      // right of the header. `[aria-label="Channel header"] [class*="toolbar_"]`
      // is exactly what every other SL plugin uses and clusters correctly, so
      // prefer it; keep the resolved class only as a last-resort fallback.
      toolbar: ((_f = m.icons) == null ? void 0 : _f.toolbar) ? [...TOOLBAR_FALLBACKS, `.${m.icons.toolbar}`] : TOOLBAR_FALLBACKS,
      dmList: DM_LIST_FALLBACKS
      // DM list doesn't change often, keep fallbacks
    };
    this.debugLog("Selectors", "Resolved selectors", {
      sidebar: ((_g = m.sidebar) == null ? void 0 : _g.sidebarList) ? "webpack" : "fallback",
      members: ((_h = m.members) == null ? void 0 : _h.membersWrap) ? "webpack" : "fallback",
      profile: ((_i = m.panel) == null ? void 0 : _i.outer) ? "webpack" : "fallback",
      search: ((_j = m.search) == null ? void 0 : _j.searchResultsWrap) ? "webpack" : "fallback",
      toolbar: ((_k = m.icons) == null ? void 0 : _k.toolbar) ? "webpack" : "fallback"
    });
  }
  // Find a DOM element using resolved selectors for a panel
  // PERF: Caches element refs — panel elements rarely change (only on guild/channel switch).
  _findPanelElement(panelName) {
    var _a;
    const cached = (_a = this._panelElCache) == null ? void 0 : _a[panelName];
    if (cached && cached.isConnected) return cached;
    const selectors = this._resolvedSelectors[panelName];
    if (!selectors) return null;
    for (const sel of selectors) {
      const el = document.querySelector(sel);
      if (el && el.isConnected) {
        if (!this._panelElCache) this._panelElCache = {};
        this._panelElCache[panelName] = el;
        return el;
      }
    }
    if (this._panelElCache) this._panelElCache[panelName] = null;
    return null;
  }
  // Delegated methods (call module functions with `this` context)
  togglePanel(panelName) {
    togglePanel(this, panelName);
  }
  updateCSSVars() {
    updateCSSVars(this);
  }
  updateToolbarIcon() {
    updateToolbarIcon(this);
  }
  setupHotkeyListener() {
    this._hotkeyHandler = (e) => {
      if (isEditableTarget(e.target)) return;
      for (const [panelName, config] of Object.entries(this.settings.panels)) {
        if (config.hotkey && matchesHotkey(e, config.hotkey)) {
          e.preventDefault();
          e.stopPropagation();
          togglePanel(this, panelName);
          return;
        }
      }
    };
    this._keydownUnsub = onKeydown(this._hotkeyHandler, { capture: true });
  }
  getSettingsPanel() {
    return getSettingsPanel(this);
  }
  loadSettings() {
    try {
      const saved = BdApi.Data.load(RA_PLUGIN_NAME, "settings") || {};
      this.settings = sanitizeLoadedSettings(saved, this._deepMerge.bind(this));
    } catch (_) {
      this.settings = structuredClone(DEFAULT_SETTINGS);
    }
  }
  saveSettings() {
    try {
      _sharedSaveSettings(RA_PLUGIN_NAME, this.settings);
    } catch (err) {
      this.debugError("Settings", "Failed to save:", err);
    }
  }
  // DOM Helpers
  _findElement(selectorArray) {
    for (const selector of selectorArray) {
      const el = document.querySelector(selector);
      if (el && el.isConnected) return el;
    }
    return null;
  }
  _isInsideElement(mouseEvent, element, fudgePx = 0) {
    const rect = element.getBoundingClientRect();
    return mouseEvent.clientX >= rect.left - fudgePx && mouseEvent.clientX <= rect.right + fudgePx && mouseEvent.clientY >= rect.top - fudgePx && mouseEvent.clientY <= rect.bottom + fudgePx;
  }
  // General Helpers
  _throttle(fn, wait) {
    var _a;
    if ((_a = _PluginUtils) == null ? void 0 : _a.createThrottle) return _PluginUtils.createThrottle(fn, wait);
    let lastTime = 0;
    let timer = null;
    return function(...args) {
      const now = Date.now();
      const remaining = wait - (now - lastTime);
      if (remaining <= 0) {
        clearTimeout(timer);
        timer = null;
        lastTime = now;
        fn(...args);
      } else if (!timer) {
        timer = setTimeout(() => {
          lastTime = Date.now();
          timer = null;
          fn(...args);
        }, remaining);
      }
    };
  }
  _deepMerge(target, source) {
    const result = { ...target };
    for (const key of Object.keys(source)) {
      if (source[key] && typeof source[key] === "object" && !Array.isArray(source[key]) && target[key] && typeof target[key] === "object" && !Array.isArray(target[key])) {
        result[key] = this._deepMerge(target[key], source[key]);
      } else {
        result[key] = source[key];
      }
    }
    return result;
  }
  debugLog(tag, msg, data) {
    if (!this.settings.debugMode) return;
    console.log(`[${RA_PLUGIN_NAME}][${tag}]`, msg, data || "");
  }
  debugError(tag, msg, err) {
    console.error(`[${RA_PLUGIN_NAME}][${tag}]`, msg, err || "");
  }
};
