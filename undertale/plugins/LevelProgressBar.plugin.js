/**
 * @name LevelProgressBar
 * @description Real-time progress bar showing your level, XP, and rank
 * @version 1.5.6
 * @author matthewqilanthompson
 * @source https://github.com/matthewqilanthompson/betterdiscord-assets
 */
var __getOwnPropNames = Object.getOwnPropertyNames;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};

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

// src/LevelProgressBar/settings-panel.js
var require_settings_panel = __commonJS({
  "src/LevelProgressBar/settings-panel.js"(exports2, module2) {
    function buildLevelProgressBarSettingsPanel2(plugin) {
      plugin.detachLevelProgressBarSettingsPanelHandlers();
      const panel = document.createElement("div");
      panel.style.padding = "20px";
      panel.innerHTML = `
      <div style="background: rgba(10, 10, 16, 0.98); border-radius: 2px; padding: 20px;">
        <h3 style="color: #8a2be2; margin: 0 0 16px 0; font-size: 16px; font-weight: 600;">Level Progress Bar</h3>
        <label style="display: flex; align-items: center; cursor: pointer; padding: 10px 12px; background: rgba(10, 10, 16, 0.98); border-radius: 2px; border: 1px solid rgba(138, 43, 226, 0.4);">
          <input type="checkbox" ${plugin.settings.debugMode ? "checked" : ""} data-lpb-setting="debugMode"
            style="accent-color: #8a2be2; width: 16px; height: 16px; margin: 0;">
          <span style="margin-left: 10px; color: #dcddde; font-size: 14px;">Debug Mode</span>
        </label>
        <p style="font-size: 12px; color: #b5bac1; margin: 8px 0 0 0;">
          Show detailed console logs for troubleshooting. Reload Discord after changing.
        </p>
      </div>
    `;
      const onChange = (event) => {
        var _a;
        const target = event.target;
        const key = (_a = target == null ? void 0 : target.getAttribute) == null ? void 0 : _a.call(target, "data-lpb-setting");
        if (!key) return;
        const nextValue = target.type === "checkbox" ? target.checked : target.value;
        const handlers = {
          debugMode: (value) => {
            plugin.settings.debugMode = !!value;
            plugin.saveSettings();
            plugin.debugLog("SETTINGS", `Debug mode: ${value ? "ENABLED" : "DISABLED"}`);
          }
        };
        (handlers[key] || (() => {
        }))(nextValue);
      };
      panel.addEventListener("change", onChange);
      plugin._settingsPanelRoot = panel;
      plugin._settingsPanelHandlers = { onChange };
      return panel;
    }
    module2.exports = { buildLevelProgressBarSettingsPanel: buildLevelProgressBarSettingsPanel2 };
  }
});

// src/LevelProgressBar/fallback-styles.js
var require_fallback_styles = __commonJS({
  "src/LevelProgressBar/fallback-styles.js"(exports2, module2) {
    function getFallbackLevelProgressBarCss2() {
      return `
      .lpb-progress-container {
        position: fixed;
        left: 0;
        right: 0;
        z-index: 999997;
        pointer-events: none;
      }
      .lpb-progress-container.top { top: 0; }
      .lpb-progress-container.bottom { bottom: 0; }
      .lpb-progress-bar {
        width: 100%;
        background: rgba(10, 10, 16, 0.97);
        padding: 12px 20px 12px 80px;
        display: flex;
        align-items: center;
        gap: 12px;
      }
      .lpb-progress-track {
        flex: 1 1 auto;
        min-width: 180px;
        height: 12px;
        border-radius: 2px;
        overflow: hidden;
        background: rgba(10, 10, 16, 0.98);
      }
      .lpb-progress-fill {
        width: 100%;
        height: 100%;
        transform-origin: left center;
        background: linear-gradient(90deg, #8a2be2 0%, #7b27cc 50%, #6c22b6 100%);
      }
    `;
    }
    module2.exports = { getFallbackLevelProgressBarCss: getFallbackLevelProgressBarCss2 };
  }
});

// src/LevelProgressBar/index.js
var { loadBdModuleFromPlugins } = require_bd_module_loader();
var PLUGIN_ID = "LevelProgressBar";
var STYLE_ID = "level-progress-bar-css";
var { buildLevelProgressBarSettingsPanel } = require_settings_panel();
var { getFallbackLevelProgressBarCss } = require_fallback_styles();
var _loadOptionalModule = (fileName, isValid) => {
  try {
    const mod = loadBdModuleFromPlugins(fileName);
    return isValid(mod) ? mod : null;
  } catch (_) {
    return null;
  }
};
var SLUtils;
SLUtils = loadBdModuleFromPlugins("SoloLevelingUtils.js") || window.SoloLevelingUtils || null;
if (SLUtils && !window.SoloLevelingUtils) window.SoloLevelingUtils = SLUtils;
var getLevelProgressBarCSS = null;
{
  const loadedStylesModule = _loadOptionalModule(
    "LevelProgressBarStyles.js",
    (mod) => typeof mod === "function" || typeof (mod == null ? void 0 : mod.getLevelProgressBarCSS) === "function"
  );
  if (typeof loadedStylesModule === "function") {
    getLevelProgressBarCSS = loadedStylesModule;
  } else if (loadedStylesModule == null ? void 0 : loadedStylesModule.getLevelProgressBarCSS) {
    getLevelProgressBarCSS = loadedStylesModule.getLevelProgressBarCSS.bind(loadedStylesModule);
  }
}
var levelProgressBarRuntimeHelpers = null;
{
  const loadedRuntimeHelpers = _loadOptionalModule(
    "LevelProgressBarRuntimeHelpers.js",
    (mod) => !!mod && typeof mod === "object"
  );
  if (loadedRuntimeHelpers) levelProgressBarRuntimeHelpers = loadedRuntimeHelpers;
}
module.exports = class LevelProgressBar {
  // === Bootstrap + Rendering ===
  initializeWebpackModules() {
    var _a, _b;
    if (SLUtils) {
      const result = SLUtils.initWebpackModules();
      this.webpackModules.UserStore = result.UserStore;
      this.webpackModules.ChannelStore = result.ChannelStore;
      this.webpackModuleAccess = result.ok;
      this.debugLog("WEBPACK_INIT", "Webpack modules initialized (shared)", {
        hasUserStore: !!result.UserStore,
        hasChannelStore: !!result.ChannelStore,
        webpackModuleAccess: result.ok
      });
    } else {
      try {
        this.webpackModules.UserStore = BdApi.Webpack.getStore("UserStore");
        this.webpackModules.ChannelStore = BdApi.Webpack.getStore("ChannelStore");
        this.webpackModuleAccess = !!(this.webpackModules.UserStore || this.webpackModules.ChannelStore);
      } catch (error) {
        this.debugError("WEBPACK_INIT", error);
        this.webpackModuleAccess = false;
      }
    }
    try {
      const getStore = (_b = (_a = BdApi == null ? void 0 : BdApi.Webpack) == null ? void 0 : _a.getStore) == null ? void 0 : _b.bind(BdApi.Webpack);
      if (getStore) {
        this.webpackModules.SelectedGuildStore = getStore("SelectedGuildStore");
        this.webpackModules.SelectedChannelStore = getStore("SelectedChannelStore");
        this.webpackModules.GuildStore = getStore("GuildStore");
        this.webpackModules.GuildMemberCountStore = getStore("GuildMemberCountStore");
        this.webpackModules.PresenceStore = getStore("PresenceStore");
      }
    } catch (error) {
      this.debugError("WEBPACK_INIT", error, { phase: "reconStores" });
    }
  }
  tryReactInjection() {
    const pluginInstance = this;
    if (!(SLUtils == null ? void 0 : SLUtils.tryReactInjection)) {
      this._trace("REACT_INJECT", "SLUtils.tryReactInjection unavailable");
      return false;
    }
    this._trace("REACT_INJECT", "Using SLUtils.tryReactInjection path");
    const ok = SLUtils.tryReactInjection({
      patcherId: "LevelProgressBar",
      elementId: "lpb-progress-container",
      render: (React) => React.createElement(
        "div",
        {
          id: "lpb-progress-container",
          className: `lpb-progress-container ${pluginInstance.settings.position}`
        },
        pluginInstance.renderProgressBarReactElement(React)
      ),
      onMount: (domEl) => {
        pluginInstance._trace("REACT_INJECT", "onMount callback fired \u2014 element in DOM");
        pluginInstance.progressBar = domEl;
        pluginInstance.initializeProgressBar();
      },
      debugLog: (...a) => pluginInstance.debugLog(...a),
      debugError: (...a) => pluginInstance.debugError(...a)
    });
    this._trace("REACT_INJECT", `SLUtils.tryReactInjection returned: ${ok}`);
    if (ok) this.reactInjectionActive = true;
    return ok;
  }
  renderProgressBarHTML() {
    const bar = `
      <div class="lpb-progress-bar ${this.settings.compact ? "compact" : ""}">
        <div class="lpb-progress-bar-content">
          <div class="lpb-progress-text" id="lpb-progress-text">Rank: E Lv.1 0/100 XP</div>
        </div>
        <div class="lpb-progress-track">
          <div class="lpb-progress-fill" id="lpb-progress-fill" style="transform: scaleX(0);"></div>
        </div>
        <div class="lpb-recon-text" id="lpb-recon-text"></div>
      </div>
    `;
    return bar;
  }
  renderProgressBarReactElement(React) {
    const noShimmerClass = !this.settings.showShimmer || this.getPrefersReducedMotion() ? "lpb-no-shimmer" : "";
    return React.createElement(
      "div",
      {
        className: `lpb-progress-bar ${this.settings.compact ? "compact" : ""} ${noShimmerClass}`.trim()
      },
      React.createElement(
        "div",
        { className: "lpb-progress-bar-content" },
        React.createElement("div", {
          className: "lpb-progress-text",
          id: "lpb-progress-text",
          children: "Rank: E Lv.1 0/100 XP"
        })
      ),
      React.createElement(
        "div",
        { className: "lpb-progress-track" },
        React.createElement("div", {
          className: "lpb-progress-fill",
          id: "lpb-progress-fill",
          style: { transform: "scaleX(0)" }
        })
      ),
      React.createElement("div", {
        className: "lpb-recon-text",
        id: "lpb-recon-text"
      })
    );
  }
  initializeProgressBar() {
    if (!this.progressBar) {
      this._trace("INIT_BAR", "initializeProgressBar called but progressBar is null");
      return;
    }
    this._trace("INIT_BAR", "Initializing progress bar", {
      inDOM: document.contains(this.progressBar),
      position: this.settings.position
    });
    this.lastLevel = null;
    this.lastXP = null;
    this.lastXPRequired = null;
    this.updateProgressBar();
    this._setTrackedTimeout(() => {
      var _a;
      const progressTrack = this.getCachedElement(".lpb-progress-track");
      if (progressTrack) {
        const instance = (_a = SLUtils == null ? void 0 : SLUtils.getPluginInstance) == null ? void 0 : _a.call(SLUtils, "SoloLevelingStats");
        if (instance && instance.getCurrentLevel) {
          const levelInfo = instance.getCurrentLevel();
          const xpPercent = levelInfo.xp / levelInfo.xpRequired * 100;
          this.updateMilestoneMarkers(progressTrack, xpPercent);
        }
      }
    }, 100);
  }
  constructor() {
    this.defaultSettings = {
      enabled: true,
      debugMode: false,
      // Toggle debug console logs
      position: "top",
      // top, bottom
      showLevel: true,
      showRank: true,
      showXP: true,
      compact: false,
      // Compact mode (smaller bar)
      integratedLevelUpAnimation: true,
      // Consolidated: show level-up animation from progress bar
      showShimmer: true,
      // Visual effect (can be disabled for performance)
      opacity: 1,
      // 100% opacity - fully opaque (fixed, no config needed)
      updateInterval: 5e3
      // Fallback polling interval (only used if events unavailable)
    };
    this.settings = SLUtils ? SLUtils.mergeSettings(this.defaultSettings, {}) : structuredClone(this.defaultSettings);
    this.progressBar = null;
    this.updateInterval = null;
    this.lastLevel = 0;
    this.lastXP = 0;
    this.lastXPRequired = 0;
    this.lastReconText = "";
    this.eventUnsubscribers = [];
    this.reconUpdateInterval = null;
    this._isStopped = true;
    this._timeouts = SLUtils ? SLUtils.createTrackedTimeouts() : null;
    this._trackedTimeouts = this._timeouts ? null : /* @__PURE__ */ new Set();
    this._updateRafId = null;
    this._updateQueued = false;
    this._deferredQueueTimeout = null;
    this._lastQueuedUpdateTs = 0;
    this._minQueuedUpdateGapMs = 350;
    this._lastMilestoneCount = null;
    this._prefersReducedMotion = null;
    this._xpGainClassTimer = null;
    this.webpackModules = {
      UserStore: null,
      ChannelStore: null,
      SelectedGuildStore: null,
      SelectedChannelStore: null,
      GuildStore: null,
      GuildMemberCountStore: null,
      PresenceStore: null
    };
    this.webpackModuleAccess = false;
    this.reactInjectionActive = false;
    this._cache = {
      soloLevelingData: null,
      soloLevelingDataTime: 0,
      soloLevelingDataTTL: 500,
      // HIGH fix: raised from 100ms; cache is only invalidated on xp/level/rank events now
      soloPluginInstance: null,
      soloPluginInstanceTime: 0,
      soloPluginInstanceTTL: 5e3,
      domElements: /* @__PURE__ */ new Map(),
      domElementsTime: 0,
      domElementsTTL: 2e3
    };
    this._domCache = SLUtils ? SLUtils.createDOMCache(2e3) : null;
    this._debug = SLUtils ? SLUtils.createDebugLogger("LevelProgressBar", () => {
      var _a;
      return (_a = this.settings) == null ? void 0 : _a.debugMode;
    }) : null;
    this._runtimeHelpers = levelProgressBarRuntimeHelpers;
    this._runtimeHelperFallbackNotified = false;
    this._debugLogLastByOp = /* @__PURE__ */ new Map();
    this._suppressedDebugOps = /* @__PURE__ */ new Set(["GET_SOLO_DATA", "UPDATE_BAR", "UPDATE_TEXT"]);
    this._startGeneration = 0;
  }
  async start() {
    if (!this._isStopped) this.stop();
    const startGeneration = ++this._startGeneration;
    this._isStopped = false;
    this._deferredQueueTimeout = null;
    this._lastQueuedUpdateTs = 0;
    this._updateQueued = false;
    this._trace("START", "Plugin starting...");
    this.debugLog("START", "Plugin starting");
    this.initializeWebpackModules();
    await this.loadSettings();
    if (this._isStopped || startGeneration !== this._startGeneration) return;
    this._trace("START", "Settings loaded", { debugMode: this.settings.debugMode, enabled: this.settings.enabled, position: this.settings.position });
    this.injectCSS();
    this.createProgressBar();
    this.startReconUpdates();
    this.subscribeToEvents();
    if (this.eventUnsubscribers.length === 0) {
      this._scheduleSubscribeRetry(1);
    }
    this._trace("START", "Plugin started", {
      enabled: this.settings.enabled,
      hasProgressBar: !!this.progressBar,
      reactInjection: this.reactInjectionActive,
      eventListeners: this.eventUnsubscribers.length
    });
  }
  stop() {
    var _a;
    this._startGeneration += 1;
    this._isStopped = true;
    this._trace("STOP", "Plugin stopping");
    this.debugLog("STOP", "Plugin stopping");
    if (this._subscribeRetryTimeout) {
      this._subscribeRetryTimeout = null;
    }
    this.unsubscribeFromEvents();
    this.stopReconUpdates();
    this.stopUpdating();
    if (this._timeouts) this._timeouts.clearAll();
    else this._clearTrackedTimeouts();
    this._deferredQueueTimeout = null;
    if (this._updateRafId) {
      cancelAnimationFrame(this._updateRafId);
      this._updateRafId = null;
      this._updateQueued = false;
    }
    (_a = this.detachLevelProgressBarSettingsPanelHandlers) == null ? void 0 : _a.call(this);
    try {
      BdApi.Patcher.unpatchAll(PLUGIN_ID);
      if (this.reactInjectionActive) {
        this.debugLog("STOP", "Webpack patches and React injection removed");
      }
      this.reactInjectionActive = false;
    } catch (error) {
      this.debugError("STOP", error, { phase: "unpatch" });
    }
    this.webpackModules = {
      UserStore: null,
      ChannelStore: null,
      SelectedGuildStore: null,
      SelectedChannelStore: null,
      GuildStore: null,
      GuildMemberCountStore: null,
      PresenceStore: null
    };
    this.webpackModuleAccess = false;
    this.removeProgressBar();
    this.removeCSS();
    this._cache.soloLevelingData = null;
    this._cache.soloLevelingDataTime = 0;
    this._cache.soloPluginInstance = null;
    this._cache.soloPluginInstanceTime = 0;
    this._cache.domElements = /* @__PURE__ */ new Map();
    this._cache.domElementsTime = 0;
    this._debugLogLastByOp.clear();
    this.debugLog("STOP", "Plugin stopped successfully");
  }
  // === Settings + Persistence ===
  // Single-tier (BdApi.Data). The former tri-tier system (file backup +
  // UnifiedSaveManager/IndexedDB + BdApi.Data with weighted newest-wins
  // candidate picking, ~100 lines) guarded purely cosmetic UI toggles —
  // ponytail audit 2026-07-29. saveSettings always wrote BdApi.Data, so
  // existing installs migrate seamlessly. Deep merge preserved via SLUtils.
  async loadSettings() {
    try {
      const saved = BdApi.Data.load(PLUGIN_ID, "settings") || {};
      delete saved._metadata;
      this.settings = SLUtils ? SLUtils.mergeSettings(this.defaultSettings, saved) : structuredClone({ ...this.defaultSettings, ...saved });
    } catch (error) {
      this.debugError("LOAD_SETTINGS", error);
      this.settings = structuredClone(this.defaultSettings);
    }
  }
  async saveSettings() {
    try {
      BdApi.Data.save(PLUGIN_ID, "settings", this.settings);
    } catch (error) {
      this.debugError("SAVE_SETTINGS", error);
    }
  }
  detachLevelProgressBarSettingsPanelHandlers() {
    const root = this._settingsPanelRoot;
    const handlers = this._settingsPanelHandlers;
    if (root && handlers) {
      root.removeEventListener("change", handlers.onChange);
    }
    this._settingsPanelRoot = null;
    this._settingsPanelHandlers = null;
  }
  getSettingsPanel() {
    return buildLevelProgressBarSettingsPanel(this);
  }
  // === Styles + DOM Mount ===
  getProgressBarCSS() {
    if (typeof getLevelProgressBarCSS === "function") {
      try {
        return getLevelProgressBarCSS();
      } catch (error) {
        this.debugError("CSS_LOAD", error, { source: "LevelProgressBarStyles.js" });
      }
    }
    return this.getFallbackProgressBarCSS();
  }
  getFallbackProgressBarCSS() {
    return getFallbackLevelProgressBarCss();
  }
  injectCSS() {
    const cssContent = this.getProgressBarCSS();
    const addStyleSafely = () => {
      var _a;
      if (!((_a = BdApi.DOM) == null ? void 0 : _a.addStyle)) return false;
      try {
        BdApi.DOM.addStyle(STYLE_ID, cssContent);
        return true;
      } catch (_error) {
        return false;
      }
    };
    const injectedViaBdApi = addStyleSafely();
    if (!injectedViaBdApi) {
      const existingStyle = document.getElementById(STYLE_ID);
      if (existingStyle) {
        existingStyle.textContent = cssContent;
      } else {
        const styleElement = document.createElement("style");
        styleElement.id = STYLE_ID;
        styleElement.textContent = cssContent;
        document.head.appendChild(styleElement);
      }
    }
    this.debugLog(
      "INJECT_CSS",
      `CSS injected successfully via ${injectedViaBdApi ? "BdApi.DOM" : "manual method"}`
    );
  }
  removeCSS() {
    try {
      BdApi.DOM.removeStyle(STYLE_ID);
    } catch (error) {
      const style = document.getElementById(STYLE_ID);
      if (style) style.remove();
    }
  }
  _createProgressBarDOM() {
    var _a;
    (_a = document.getElementById("lpb-progress-container")) == null ? void 0 : _a.remove();
    const container = document.createElement("div");
    container.id = "lpb-progress-container";
    container.className = `lpb-progress-container ${this.settings.position}`;
    container.style.opacity = 1;
    container.innerHTML = this.renderProgressBarHTML();
    document.body.appendChild(container);
    this.progressBar = container;
    this._trace("CREATE_BAR", "Progress bar created via DOM injection", {
      position: this.settings.position,
      inDOM: !!document.getElementById("lpb-progress-container")
    });
    this.initializeProgressBar();
    this.invalidateDOMCache();
  }
  createProgressBar() {
    if (!this.settings.enabled) {
      this._trace("CREATE_BAR", "Plugin disabled, skipping bar creation");
      return;
    }
    if (this.progressBar && document.contains(this.progressBar)) {
      this._trace("CREATE_BAR", "Progress bar already exists in DOM");
      return;
    }
    if (this.progressBar && !document.contains(this.progressBar)) {
      this._trace("CREATE_BAR", "Stale progressBar ref detected, clearing");
      this.progressBar = null;
    }
    this._trace("CREATE_BAR", "Attempting React injection...");
    const reactOk = this.tryReactInjection();
    this._trace("CREATE_BAR", `React injection returned: ${reactOk}`);
    if (reactOk) {
      this._setTrackedTimeout(() => {
        const el = document.getElementById("lpb-progress-container");
        if (el) {
          this._trace("CREATE_BAR", "React-injected element confirmed in DOM");
          if (!this.progressBar) {
            this.progressBar = el;
            this.initializeProgressBar();
          }
        } else {
          this._trace("CREATE_BAR", "React-injected element NOT in DOM after 1.5s \u2014 falling back to DOM injection");
          this._createProgressBarDOM();
        }
      }, 1500);
      return;
    }
    this._trace("CREATE_BAR", "React injection failed, using DOM fallback");
    this._createProgressBarDOM();
  }
  removeProgressBar() {
    if (this.progressBar) {
      this.progressBar.remove();
      this.progressBar = null;
      this.debugLog("REMOVE_BAR", "Progress bar removed");
      this.invalidateDOMCache();
    }
    this.removeLevelUpOverlay();
  }
  // === Data Access + Caching ===
  getSoloLevelingData() {
    var _a, _b;
    const now = Date.now();
    if (this._cache.soloLevelingData && this._cache.soloLevelingDataTime && now - this._cache.soloLevelingDataTime < this._cache.soloLevelingDataTTL) {
      return this._cache.soloLevelingData;
    }
    try {
      let instance = null;
      if (this._cache.soloPluginInstance && this._cache.soloPluginInstanceTime && now - this._cache.soloPluginInstanceTime < this._cache.soloPluginInstanceTTL) {
        instance = this._cache.soloPluginInstance;
      } else {
        instance = (_a = SLUtils == null ? void 0 : SLUtils.getPluginInstance) == null ? void 0 : _a.call(SLUtils, "SoloLevelingStats");
        if (!instance) {
          this._cache.soloLevelingData = null;
          this._cache.soloLevelingDataTime = now;
          this._cache.soloPluginInstance = null;
          this._cache.soloPluginInstanceTime = 0;
          return null;
        }
        this._cache.soloPluginInstance = instance;
        this._cache.soloPluginInstanceTime = now;
      }
      if (!(instance == null ? void 0 : instance.getCurrentLevel)) {
        this._cache.soloLevelingData = null;
        this._cache.soloLevelingDataTime = now;
        return null;
      }
      const levelInfo = instance.getCurrentLevel();
      if (!levelInfo) {
        this._cache.soloLevelingData = null;
        this._cache.soloLevelingDataTime = now;
        return null;
      }
      const rank = ((_b = instance.settings) == null ? void 0 : _b.rank) || "E";
      const result = {
        instance,
        levelInfo,
        rank
      };
      this._cache.soloLevelingData = result;
      this._cache.soloLevelingDataTime = now;
      return result;
    } catch (error) {
      this.debugError("GET_SOLO_DATA", error);
      this._cache.soloLevelingData = null;
      this._cache.soloLevelingDataTime = now;
      return null;
    }
  }
  getCachedElement(selector, container = null) {
    const target = container || this.progressBar;
    if (this._domCache) return this._domCache.get(selector, target);
    const now = Date.now();
    const cache = this._cache.domElements;
    if (!cache.get(selector) || !target || !target.contains(cache.get(selector)) || now - this._cache.domElementsTime > this._cache.domElementsTTL) {
      if (!target) return null;
      const el = target.querySelector(selector);
      if (el) {
        cache.set(selector, el);
        this._cache.domElementsTime = now;
      } else cache.delete(selector);
      return el;
    }
    return cache.get(selector);
  }
  invalidateDOMCache() {
    if (this._domCache) {
      this._domCache.invalidate();
      return;
    }
    this._cache.domElements = /* @__PURE__ */ new Map();
    this._cache.domElementsTime = 0;
  }
  _setTrackedTimeout(callback, delayMs) {
    if (this._timeouts) return this._timeouts.set(callback, delayMs);
    const wrapped = () => {
      this._trackedTimeouts.delete(timeoutId);
      !this._isStopped && callback();
    };
    const timeoutId = setTimeout(wrapped, delayMs);
    this._trackedTimeouts.add(timeoutId);
    return timeoutId;
  }
  _clearTrackedTimeouts() {
    if (this._timeouts) {
      this._timeouts.clearAll();
      return;
    }
    this._trackedTimeouts.forEach((id) => clearTimeout(id));
    this._trackedTimeouts.clear();
  }
  queueProgressBarUpdate() {
    if (this._isStopped) return;
    if (document.hidden) return;
    if (!this.progressBar || !document.contains(this.progressBar)) return;
    if (this._updateQueued) return;
    const now = Date.now();
    const elapsed = now - this._lastQueuedUpdateTs;
    if (elapsed < this._minQueuedUpdateGapMs) {
      if (this._deferredQueueTimeout) return;
      this._deferredQueueTimeout = this._setTrackedTimeout(() => {
        this._deferredQueueTimeout = null;
        this.queueProgressBarUpdate();
      }, this._minQueuedUpdateGapMs - elapsed);
      return;
    }
    this._lastQueuedUpdateTs = now;
    this._updateQueued = true;
    this._updateRafId = requestAnimationFrame(() => {
      this._updateQueued = false;
      this._updateRafId = null;
      if (!this._isStopped && !document.hidden && this.progressBar && document.contains(this.progressBar)) {
        this.updateProgressBar();
      }
    });
  }
  getPrefersReducedMotion() {
    var _a, _b;
    if (typeof this._prefersReducedMotion === "boolean") return this._prefersReducedMotion;
    try {
      this._prefersReducedMotion = !!((_b = (_a = window.matchMedia) == null ? void 0 : _a.call(window, "(prefers-reduced-motion: reduce)")) == null ? void 0 : _b.matches);
    } catch (_) {
      this._prefersReducedMotion = false;
    }
    return this._prefersReducedMotion;
  }
  // === Runtime-Delegated Recon + Progress Logic ===
  _fallbackUpdateProgressText(rank, level, xp, xpRequired) {
    const progressText = this.getCachedElement("#lpb-progress-text");
    if (!progressText) return;
    progressText.textContent = `Rank: ${rank} Lv.${level} ${xp}/${xpRequired} XP`;
  }
  _fallbackUpdateProgressBar() {
    if (!this.progressBar || !this.settings.enabled) return;
    const soloData = this.getSoloLevelingData();
    if (!(soloData == null ? void 0 : soloData.levelInfo)) return;
    const level = Math.max(0, Math.trunc(Number(soloData.levelInfo.level) || 0));
    const xp = Math.max(0, Math.trunc(Number(soloData.levelInfo.xp) || 0));
    const xpRequired = Math.max(1, Math.trunc(Number(soloData.levelInfo.xpRequired) || 1));
    const rank = soloData.rank ?? "E";
    const xpPercent = Math.min(xp / xpRequired * 100, 100);
    const unchanged = this.lastLevel !== null && this.lastXP !== null && this.lastLevel === level && this.lastXP === xp && this.lastXPRequired === xpRequired;
    if (unchanged) return;
    this.lastLevel = level;
    this.lastXP = xp;
    this.lastXPRequired = xpRequired;
    this._fallbackUpdateProgressText(rank, level, xp, xpRequired);
    const fill = this.getCachedElement("#lpb-progress-fill");
    if (fill) fill.style.transform = `scaleX(${Math.max(0, Math.min(xpPercent / 100, 1))})`;
  }
  _fallbackStartReconUpdates() {
  }
  _fallbackStopReconUpdates() {
    if (this.reconUpdateInterval) {
      clearInterval(this.reconUpdateInterval);
      this.reconUpdateInterval = null;
    }
    this.lastReconText = "";
  }
  _invokeRuntimeHelper(name, ...args) {
    var _a;
    const fn = (_a = this._runtimeHelpers) == null ? void 0 : _a[name];
    if (typeof fn === "function") return fn(this, ...args);
    if (!this._runtimeHelperFallbackNotified) {
      this._runtimeHelperFallbackNotified = true;
      this.debugLog(
        "RUNTIME_HELPER_FALLBACK",
        "LevelProgressBar runtime helpers missing; using safe fallback defaults",
        { helper: name }
      );
    }
    const defaults = {
      _toNonNegativeInt: 0,
      _formatNumber: "0",
      _resolveCurrentGuildId: null,
      _readOnlineCountFromObject: null,
      _getGuildOnlineCount: 0,
      _readOnlineCountFromStoreMethod: null,
      _getGuildOnlineCountFromStore: null,
      _getGuildReconCounts: { total: 0, online: 0 },
      updateReconIntelText: false,
      startReconUpdates: () => this._fallbackStartReconUpdates(),
      stopReconUpdates: () => this._fallbackStopReconUpdates(),
      _shouldSkipProgressBarUpdate: !this.progressBar || !this.settings.enabled,
      _buildProgressSnapshot: { rank: "E", currentLevel: 0, currentXP: 0, xpRequired: 1, xpPercent: 0 },
      _isProgressSnapshotUnchanged: true,
      updateProgressBar: () => this._fallbackUpdateProgressBar(),
      updateProgressText: (...innerArgs) => this._fallbackUpdateProgressText(...innerArgs)
    };
    const fallback = defaults[name];
    return typeof fallback === "function" ? fallback(...args) : fallback;
  }
  _toNonNegativeInt(value) {
    return this._invokeRuntimeHelper("_toNonNegativeInt", value);
  }
  _formatNumber(value) {
    return this._invokeRuntimeHelper("_formatNumber", value);
  }
  _resolveCurrentGuildId() {
    return this._invokeRuntimeHelper("_resolveCurrentGuildId");
  }
  _readOnlineCountFromObject(value) {
    return this._invokeRuntimeHelper("_readOnlineCountFromObject", value);
  }
  _getGuildOnlineCount(guildId, guild = null) {
    return this._invokeRuntimeHelper("_getGuildOnlineCount", guildId, guild);
  }
  _readOnlineCountFromStoreMethod(countStore, methodName, guildId) {
    return this._invokeRuntimeHelper("_readOnlineCountFromStoreMethod", countStore, methodName, guildId);
  }
  _getGuildOnlineCountFromStore(countStore, guildId) {
    return this._invokeRuntimeHelper("_getGuildOnlineCountFromStore", countStore, guildId);
  }
  _getGuildReconCounts(guildId) {
    return this._invokeRuntimeHelper("_getGuildReconCounts", guildId);
  }
  updateReconIntelText() {
    return this._invokeRuntimeHelper("updateReconIntelText");
  }
  startReconUpdates() {
    return this._invokeRuntimeHelper("startReconUpdates");
  }
  stopReconUpdates() {
    return this._invokeRuntimeHelper("stopReconUpdates");
  }
  _shouldSkipProgressBarUpdate() {
    return this._invokeRuntimeHelper("_shouldSkipProgressBarUpdate");
  }
  _buildProgressSnapshot(soloData) {
    return this._invokeRuntimeHelper("_buildProgressSnapshot", soloData);
  }
  _isProgressSnapshotUnchanged(snapshot, reconChanged) {
    return this._invokeRuntimeHelper("_isProgressSnapshotUnchanged", snapshot, reconChanged);
  }
  _cacheProgressSnapshot(snapshot) {
    return this._invokeRuntimeHelper("_cacheProgressSnapshot", snapshot);
  }
  _updateProgressFill(xpPercent) {
    return this._invokeRuntimeHelper("_updateProgressFill", xpPercent);
  }
  _updateMilestoneMarkersIfNeeded(xpPercent) {
    return this._invokeRuntimeHelper("_updateMilestoneMarkersIfNeeded", xpPercent);
  }
  _syncProgressBarClasses() {
    return this._invokeRuntimeHelper("_syncProgressBarClasses");
  }
  updateProgressBar() {
    return this._invokeRuntimeHelper("updateProgressBar");
  }
  removeLevelUpOverlay() {
    var _a;
    (_a = document.getElementById("lpb-levelup-overlay")) == null ? void 0 : _a.remove();
  }
  updateProgressText(rank, level, xp, xpRequired) {
    return this._invokeRuntimeHelper("updateProgressText", rank, level, xp, xpRequired);
  }
  // === Event Wiring + Polling ===
  _scheduleSubscribeRetry(attempt) {
    const MAX_SUBSCRIBE_RETRY_ATTEMPTS = 10;
    const SUBSCRIBE_RETRY_DELAY_MS = 4e3;
    if (this._isStopped || attempt > MAX_SUBSCRIBE_RETRY_ATTEMPTS) {
      if (attempt > MAX_SUBSCRIBE_RETRY_ATTEMPTS) {
        this._trace("START", "Giving up on event subscription after max retries", {
          attempts: MAX_SUBSCRIBE_RETRY_ATTEMPTS
        });
      }
      return;
    }
    this._subscribeRetryTimeout = this._setTrackedTimeout(() => {
      if (this._isStopped || this.eventUnsubscribers.length > 0) return;
      const subscribed = this.subscribeToEvents();
      if (!subscribed) this._scheduleSubscribeRetry(attempt + 1);
    }, SUBSCRIBE_RETRY_DELAY_MS);
  }
  subscribeToEvents() {
    var _a;
    if (this.eventUnsubscribers.length > 0) {
      this.debugLog("SUBSCRIBE_EVENTS", "Already subscribed to events");
      return true;
    }
    const instance = (_a = SLUtils == null ? void 0 : SLUtils.getPluginInstance) == null ? void 0 : _a.call(SLUtils, "SoloLevelingStats");
    if (!instance) {
      this.debugLog("SUBSCRIBE_EVENTS", "SoloLevelingStats plugin not available");
      return false;
    }
    if (typeof instance.on !== "function") {
      this.debugLog("SUBSCRIBE_EVENTS", "Event system not available", {
        hasOnMethod: typeof instance.on === "function"
      });
      this.subscribeToDomEvents();
      return false;
    }
    const events = ["xpChanged", "levelChanged", "rankChanged", "statsChanged"];
    for (const event of events) {
      const unsub = instance.on(event, (data) => this._handleEvent(event, data));
      this.eventUnsubscribers.push(unsub);
    }
    this.debugLog("EVENTS", "Event-based updates enabled - progress bar will update in real-time");
    this.debugLog("SUBSCRIBE_EVENTS", "Successfully subscribed to events", {
      listenersCount: this.eventUnsubscribers.length
    });
    this.queueProgressBarUpdate();
    return true;
  }
  _handleEvent(eventName, data) {
    const INVALIDATING_EVENTS = /* @__PURE__ */ new Set(["xpChanged", "levelChanged", "rankChanged"]);
    if (INVALIDATING_EVENTS.has(eventName)) {
      this._cache.soloLevelingData = null;
      this._cache.soloLevelingDataTime = 0;
    }
    if (eventName === "levelChanged") {
      if (data && typeof data.newLevel === "number" && data.newLevel !== this.lastLevel) {
        this.lastLevel = null;
        this.lastXP = null;
        this.lastXPRequired = null;
      }
      this.queueProgressBarUpdate();
      return;
    }
    this.queueProgressBarUpdate();
  }
  subscribeToDomEvents() {
    if (this._domEventSubscribed) return;
    this._domEventSubscribed = true;
    const events = ["xpChanged", "levelChanged", "rankChanged", "statsChanged"];
    const handlers = {};
    for (const event of events) {
      const handler = (domEvent) => this._handleEvent(event, domEvent == null ? void 0 : domEvent.detail);
      handlers[event] = handler;
      document.addEventListener(`SoloLevelingStats:${event}`, handler);
    }
    this.eventUnsubscribers.push(() => {
      for (const event of events) {
        document.removeEventListener(`SoloLevelingStats:${event}`, handlers[event]);
      }
      this._domEventSubscribed = false;
    });
  }
  unsubscribeFromEvents() {
    this.eventUnsubscribers.forEach((unsubscribe) => {
      try {
        unsubscribe();
      } catch (error) {
        this.debugError("UNSUBSCRIBE_EVENTS", error);
      }
    });
    this.eventUnsubscribers = [];
    this.debugLog("UNSUBSCRIBE_EVENTS", "Unsubscribed from all events");
  }
  startUpdating() {
  }
  stopUpdating() {
    if (this.updateInterval) {
      clearInterval(this.updateInterval);
      this.updateInterval = null;
      this.debugLog("STOP_UPDATE", "Update interval stopped");
    }
  }
  // === Diagnostics + UI Effects ===
  _trace(tag, msg, data = null) {
    var _a;
    if (!((_a = this.settings) == null ? void 0 : _a.debugMode)) return;
    const prefix = "%c[LPB]%c";
    const styles = ["color:#a855f7;font-weight:bold", "color:inherit"];
    if (data) console.log(prefix, ...styles, `[${tag}]`, msg, data);
    else console.log(prefix, ...styles, `[${tag}]`, msg);
  }
  debugLog(operation, message, data = null) {
    var _a, _b, _c;
    if ((_a = this._suppressedDebugOps) == null ? void 0 : _a.has(operation)) return;
    const now = Date.now();
    const throttleKey = `${operation}:${message}`;
    const lastTs = ((_b = this._debugLogLastByOp) == null ? void 0 : _b.get(throttleKey)) || 0;
    if (now - lastTs < 1e3) return;
    if (this._debugLogLastByOp.size > 200) this._debugLogLastByOp.clear();
    this._debugLogLastByOp.set(throttleKey, now);
    if (this._debug) {
      this._debug.log(operation, message, data);
      return;
    }
    if (!((_c = this.settings) == null ? void 0 : _c.debugMode)) return;
    console.log(`[LevelProgressBar] ${operation}:`, message, data || "");
  }
  debugError(operation, error, data = null) {
    if (this._debug) {
      this._debug.error(operation, error, data ? { context: data } : {});
      return;
    }
    console.error(`[LevelProgressBar] ERROR [${operation}]:`, error, data || "");
  }
  updateMilestoneMarkers(progressTrack, xpPercent) {
    if (!progressTrack) return;
    const activeCount = [25, 50, 75].filter((m) => xpPercent >= m).length;
    if (this._lastMilestoneCount === activeCount) return;
    this._lastMilestoneCount = activeCount;
    const existingMarkers = progressTrack.querySelectorAll(".lpb-milestone");
    existingMarkers.forEach((m) => m.remove());
    [25, 50, 75].filter((milestone) => xpPercent >= milestone).forEach((milestone) => {
      const marker = document.createElement("div");
      marker.className = "lpb-milestone";
      marker.style.left = `${milestone}%`;
      progressTrack.appendChild(marker);
    });
  }
};
