/**
 * @name ShadowSenses
 * @description Deploy shadow soldiers to monitor Discord users — get notified when they speak, even while invisible. Solo Leveling themed.
 * @version 1.1.5
 * @author matthewthompson
 */
var __getOwnPropNames = Object.getOwnPropertyNames;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};

// src/shared/rank-utils.js
var require_rank_utils = __commonJS({
  "src/shared/rank-utils.js"(exports2, module2) {
    var RANK_ORDER = Object.freeze([
      "E",
      "D",
      "C",
      "B",
      "A",
      "S",
      "SS",
      "SSS",
      "SSS+",
      "NH",
      "Monarch",
      "Monarch+",
      "Shadow Monarch"
    ]);
    function getRankIndex(rank) {
      const idx = RANK_ORDER.indexOf(rank);
      return idx >= 0 ? idx : 0;
    }
    function compareRanks(rankA, rankB) {
      return getRankIndex(rankA) - getRankIndex(rankB);
    }
    function getRankAtIndex(index) {
      const clamped = Math.max(0, Math.min(RANK_ORDER.length - 1, Math.floor(index)));
      return RANK_ORDER[clamped];
    }
    module2.exports = { RANK_ORDER, getRankIndex, compareRanks, getRankAtIndex };
  }
});

// src/ShadowSenses/constants.js
var require_constants = __commonJS({
  "src/ShadowSenses/constants.js"(exports2, module2) {
    var PLUGIN_NAME2 = "ShadowSenses";
    var PLUGIN_VERSION2 = "1.1.5";
    var STYLE_ID = "shadow-senses-css";
    var PANEL_CONTAINER_ID = "shadow-senses-panel-root";
    var TRANSITION_ID2 = "shadow-senses-transition-overlay";
    var GLOBAL_UTILITY_FEED_ID = "__shadow_senses_global__";
    var { RANK_ORDER } = require_rank_utils();
    var RANKS = RANK_ORDER;
    var RANK_COLORS = {
      E: "#9ca3af",
      D: "#60a5fa",
      C: "#34d399",
      B: "#a78bfa",
      A: "#f59e0b",
      S: "#ef4444",
      SS: "#ec4899",
      SSS: "#8b5cf6",
      "SSS+": "#c084fc",
      NH: "#14b8a6",
      Monarch: "#fbbf24",
      "Monarch+": "#f97316",
      "Shadow Monarch": "#8a2be2"
    };
    var GUILD_FEED_CAP = 5e3;
    var GLOBAL_FEED_CAP = 25e3;
    var FEED_MAX_AGE_MS = 3 * 24 * 60 * 60 * 1e3;
    var PURGE_INTERVAL_MS2 = 10 * 60 * 1e3;
    var STARTUP_TOAST_GRACE_MS2 = 5e3;
    var DEFAULT_TYPING_ALERT_COOLDOWN_MS = 15e3;
    var BURST_WINDOW_MS = 2e4;
    var PRIORITY = { LOW: 1, MEDIUM: 2, HIGH: 3, CRITICAL: 4 };
    var PRIORITY_LABELS = { 1: null, 2: "P2", 3: "P3", 4: "P4!" };
    var PRIORITY_COLORS = {
      1: null,
      2: "rgba(96, 165, 250, 0.3)",
      3: "rgba(251, 191, 36, 0.35)",
      4: "rgba(239, 68, 68, 0.4)"
    };
    var KEYWORD_MATCH_COLOR = "rgba(52, 211, 153, 0.35)";
    var NAME_MENTION_COLOR = "rgba(236, 72, 153, 0.4)";
    var ONLINE_STATUSES = /* @__PURE__ */ new Set(["online", "idle", "dnd"]);
    var PRESENCE_EVENT_NAMES2 = [
      "PRESENCE_UPDATES",
      "PRESENCE_UPDATE",
      "PRESENCES_REPLACE",
      "PRESENCE_REPLACE"
    ];
    var RELATIONSHIP_EVENT_NAMES2 = ["FRIEND_REQUEST_ACCEPTED", "RELATIONSHIP_ADD", "RELATIONSHIP_UPDATE", "RELATIONSHIP_REMOVE"];
    var STATUS_LABELS = {
      online: "Online",
      idle: "Idle",
      dnd: "Do Not Disturb",
      offline: "Offline",
      invisible: "Invisible"
    };
    var STATUS_ACCENT_COLORS = {
      online: "#22c55e",
      idle: "#f59e0b",
      dnd: "#ef4444",
      offline: "#9ca3af",
      invisible: "#9ca3af"
    };
    var STATUS_TOAST_TIMEOUT_MS = 5e3;
    var STARTUP_REPORT_ARTWORK_FALLBACK_URL2 = "https://raw.githubusercontent.com/matthewqilanthompson/betterdiscord-assets/main/assets/igris/Igris.svg";
    var DEFAULT_SETTINGS2 = {
      animationEnabled: true,
      respectReducedMotion: false,
      animationDuration: 550,
      statusAlerts: true,
      // In-character report voice — shadows address the Monarch with flavored
      // verbs ("has awakened", "stirs", "speaks"). Off = plain functional text.
      reportToMonarch: true,
      startupShadowReport: true,
      startupShadowReportWindowHours: 24,
      startupShadowReportArtwork: STARTUP_REPORT_ARTWORK_FALLBACK_URL2,
      typingAlerts: true,
      // When you're viewing the same channel a marked target types in, Discord
      // shows its own native typing indicator. Previously ShadowSenses always
      // suppressed its toast there — which read as "typing toasts don't work"
      // for anyone watching from inside the channel. Default now: still report
      // (you deployed a shadow to watch them). Set true to suppress in-channel.
      suppressTypingInViewedChannel: false,
      removedFriendAlerts: true,
      showMarkedOnlineCount: true,
      typingAlertCooldownMs: DEFAULT_TYPING_ALERT_COOLDOWN_MS,
      groupHighPriorityBursts: false,
      priorityKeywords: [],
      mentionNames: []
    };
    module2.exports = {
      BURST_WINDOW_MS,
      DEFAULT_SETTINGS: DEFAULT_SETTINGS2,
      DEFAULT_TYPING_ALERT_COOLDOWN_MS,
      FEED_MAX_AGE_MS,
      GLOBAL_FEED_CAP,
      GLOBAL_UTILITY_FEED_ID,
      GUILD_FEED_CAP,
      KEYWORD_MATCH_COLOR,
      NAME_MENTION_COLOR,
      ONLINE_STATUSES,
      PANEL_CONTAINER_ID,
      PLUGIN_NAME: PLUGIN_NAME2,
      PLUGIN_VERSION: PLUGIN_VERSION2,
      PRESENCE_EVENT_NAMES: PRESENCE_EVENT_NAMES2,
      PRIORITY,
      PRIORITY_COLORS,
      PRIORITY_LABELS,
      PURGE_INTERVAL_MS: PURGE_INTERVAL_MS2,
      RANK_COLORS,
      RANKS,
      RELATIONSHIP_EVENT_NAMES: RELATIONSHIP_EVENT_NAMES2,
      STARTUP_TOAST_GRACE_MS: STARTUP_TOAST_GRACE_MS2,
      STARTUP_REPORT_ARTWORK_FALLBACK_URL: STARTUP_REPORT_ARTWORK_FALLBACK_URL2,
      STATUS_ACCENT_COLORS,
      STATUS_LABELS,
      STATUS_TOAST_TIMEOUT_MS,
      STYLE_ID,
      TRANSITION_ID: TRANSITION_ID2
    };
  }
});

// src/shared/settings.js
var require_settings = __commonJS({
  "src/shared/settings.js"(exports2, module2) {
    function loadSettings2(pluginId, defaults, key = "settings") {
      try {
        return { ...defaults, ...BdApi.Data.load(pluginId, key) || {} };
      } catch (err) {
        console.error(`[SL:settings] load failed for ${pluginId}/${key} \u2014 using defaults:`, err);
        return { ...defaults };
      }
    }
    function saveSettings2(pluginId, settings, key = "settings") {
      try {
        BdApi.Data.save(pluginId, key, settings);
      } catch (err) {
        console.error(`[SL:settings] save FAILED for ${pluginId}/${key}:`, err);
      }
    }
    module2.exports = { loadSettings: loadSettings2, saveSettings: saveSettings2 };
  }
});

// src/shared/bd-module-loader.js
var require_bd_module_loader = __commonJS({
  "src/shared/bd-module-loader.js"(exports2, module2) {
    function loadBdModuleFromPlugins(fileName) {
      if (!fileName) return null;
      try {
        const fs2 = require("fs");
        const path2 = require("path");
        const source = fs2.readFileSync(path2.join(BdApi.Plugins.folder, fileName), "utf8");
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
      loadBdModuleFromPlugins
    };
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

// src/ShadowSenses/shared-utils.js
var require_shared_utils = __commonJS({
  "src/ShadowSenses/shared-utils.js"(exports2, module2) {
    var { loadBdModuleFromPlugins } = require_bd_module_loader();
    var _bdLoad = loadBdModuleFromPlugins;
    var _ReactUtils;
    try {
      _ReactUtils = _bdLoad("BetterDiscordReactUtils.js");
    } catch (_) {
      _ReactUtils = null;
    }
    var _PluginUtils;
    try {
      _PluginUtils = _bdLoad("BetterDiscordPluginUtils.js");
    } catch (_) {
      _PluginUtils = null;
    }
    var _TransitionCleanupUtils2;
    try {
      _TransitionCleanupUtils2 = _bdLoad("TransitionCleanupUtils.js");
    } catch (err) {
      _TransitionCleanupUtils2 = null;
      console.error(
        "[ShadowSenses] TransitionCleanupUtils.js failed to load \u2014 transition/navigation timers will be torn down by the inline fallback:",
        err
      );
    }
    var { createSingleValueCache: _ttl } = require_ttl_cache();
    module2.exports = {
      _bdLoad,
      _PluginUtils,
      _ReactUtils,
      _TransitionCleanupUtils: _TransitionCleanupUtils2,
      _ttl
    };
  }
});

// src/shared/plugin-bridge.js
var require_plugin_bridge = __commonJS({
  "src/shared/plugin-bridge.js"(exports2, module2) {
    var _BRIDGE_TTL_MS = 3e3;
    var _instanceCache = /* @__PURE__ */ new Map();
    function getPluginInstance(pluginName) {
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
    function getSkillTreeLevel(skillId) {
      try {
        const instance = getPluginInstance("SkillTree");
        if (!instance || typeof instance.getSkillLevel !== "function") return 0;
        return Number(instance.getSkillLevel(skillId)) || 0;
      } catch (_) {
        return 0;
      }
    }
    function getSoloLevelingData() {
      try {
        const instance = getPluginInstance("SoloLevelingStats");
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
    module2.exports = { getPluginInstance, getSkillTreeLevel, getSoloLevelingData, invalidatePluginInstance };
  }
});

// src/ShadowSenses/deployment-manager.js
var require_deployment_manager = __commonJS({
  "src/ShadowSenses/deployment-manager.js"(exports2, module2) {
    var { PLUGIN_NAME: PLUGIN_NAME2, RANKS } = require_constants();
    var { _ttl } = require_shared_utils();
    var { getPluginInstance } = require_plugin_bridge();
    var WATCH_FOCUS_SIGNALS = ["status", "typing", "messages", "mentions"];
    function normalizeWatchFocus(raw) {
      const focus = {};
      const src = raw && typeof raw === "object" ? raw : {};
      for (const signal of WATCH_FOCUS_SIGNALS) {
        focus[signal] = src[signal] !== false;
      }
      return focus;
    }
    function normalizeAlertKeywords(rawKeywords) {
      const source = Array.isArray(rawKeywords) ? rawKeywords : typeof rawKeywords === "string" ? rawKeywords.split(",") : [];
      const normalized = [];
      const seen = /* @__PURE__ */ new Set();
      for (const value of source) {
        if (typeof value !== "string") continue;
        const trimmed = value.trim();
        if (!trimmed) continue;
        const key = trimmed.toLowerCase();
        if (seen.has(key)) continue;
        seen.add(key);
        normalized.push(trimmed);
        if (normalized.length >= 30) break;
      }
      return normalized;
    }
    function normalizeDeploymentRecord(record) {
      if (!record || typeof record !== "object") return null;
      const normalizedUserId = String(record.targetUserId || "").trim();
      const normalizedShadowId = String(record.shadowId || "").trim();
      if (!normalizedUserId || !normalizedShadowId) return null;
      return {
        ...record,
        targetUserId: normalizedUserId,
        shadowId: normalizedShadowId,
        alertKeywords: normalizeAlertKeywords(record.alertKeywords),
        watchFocus: normalizeWatchFocus(record.watchFocus),
        // The Monarch's Mark — a priority target whose reports always cut
        // through (see engine): gold urgent styling, watch-focus mutes ignored,
        // higher rate cap. Default off.
        priority: record.priority === true
      };
    }
    var DeploymentManager2 = class {
      constructor(debugLog, debugError) {
        this._debugLog = debugLog;
        this._debugError = debugError;
        this._deployments = [];
        this._monitoredUserIds = /* @__PURE__ */ new Set();
        this._deployedShadowIds = /* @__PURE__ */ new Set();
        this._deploymentByUserId = /* @__PURE__ */ new Map();
        this._availableCache = _ttl(5e3);
        this._bus = new EventTarget();
        this.__version = 0;
        Object.defineProperty(this, "_version", {
          get() {
            return this.__version;
          },
          set(value) {
            this.__version = value;
            if (this._bus) this._bus.dispatchEvent(new Event("change"));
          },
          configurable: true,
          enumerable: true
        });
      }
      load() {
        try {
          const saved = BdApi.Data.load(PLUGIN_NAME2, "deployments");
          const normalizedDeployments = Array.isArray(saved) ? saved.map(normalizeDeploymentRecord).filter(Boolean) : [];
          this._deployments = normalizedDeployments;
          this._rebuildSets();
          const needsReshape = !Array.isArray(saved) || saved.length !== normalizedDeployments.length || JSON.stringify(saved) !== JSON.stringify(normalizedDeployments);
          if (needsReshape) {
            BdApi.Data.save(PLUGIN_NAME2, "deployments", this._deployments);
          }
          this._debugLog("DeploymentManager", "Loaded deployments", { count: this._deployments.length, reshaped: needsReshape });
        } catch (err) {
          this._debugError("DeploymentManager", "Failed to load deployments", err);
          this._deployments = [];
          this._rebuildSets();
        }
      }
      _save() {
        this._version++;
        try {
          BdApi.Data.save(PLUGIN_NAME2, "deployments", this._deployments);
        } catch (err) {
          this._debugError("DeploymentManager", "Failed to save deployments", err);
        }
      }
      _rebuildSets() {
        this._monitoredUserIds = new Set(this._deployments.map((d) => String(d.targetUserId)));
        this._deployedShadowIds = new Set(this._deployments.map((d) => String(d.shadowId)));
        this._deploymentByUserId = new Map(this._deployments.map((d) => [String(d.targetUserId), d]));
      }
      async deploy(shadow, targetUser) {
        if (!shadow || !shadow.id || !targetUser) {
          this._debugError("DeploymentManager", "Invalid deploy args", { shadow, targetUser });
          return false;
        }
        if (this._deployedShadowIds.has(shadow.id)) {
          this._debugLog("DeploymentManager", "Shadow already deployed", shadow.id);
          return false;
        }
        const targetUserId = String(targetUser.id || targetUser.userId || "").trim();
        if (!targetUserId) {
          this._debugError("DeploymentManager", "No target user ID");
          return false;
        }
        if (this._monitoredUserIds.has(targetUserId)) {
          this._debugLog("DeploymentManager", "User already monitored", targetUserId);
          return false;
        }
        try {
          const armyInstance = this._getShadowArmyInstance();
          const shadowStorage = armyInstance == null ? void 0 : armyInstance.storageManager;
          if (shadowStorage && typeof shadowStorage.getShadowsByIds === "function") {
            const exclusion = this._buildExclusionSnapshot();
            const [freshRaw] = await shadowStorage.getShadowsByIds([shadow.id]);
            const fresh = freshRaw && armyInstance.getShadowData ? armyInstance.getShadowData(freshRaw) : freshRaw;
            if (!fresh || !this._isShadowAvailable(fresh, exclusion)) {
              this._debugLog("DeploymentManager", `Shadow ${shadow.id} no longer available, aborting deployment`);
              return false;
            }
          } else {
            const currentAvailable = await this.getAvailableShadows();
            const stillAvailable = currentAvailable.find((s) => s.id === shadow.id);
            if (!stillAvailable) {
              this._debugLog("DeploymentManager", `Shadow ${shadow.id} no longer available, aborting deployment`);
              return false;
            }
          }
        } catch (err) {
          this._debugError("DeploymentManager", "Failed to re-verify shadow availability", err);
        }
        const record = {
          shadowId: shadow.id,
          shadowName: shadow.roleName || shadow.role || "Shadow",
          shadowRank: shadow.rank || "E",
          targetUserId,
          // Prefer the DISPLAY name (globalName) over the raw @username handle —
          // the list is unreadable when it shows handles you can't map to people
          // (2026-07-13). Reports already resolve display names via
          // _resolveUserName; this aligns the stored deployment label with them.
          targetUsername: targetUser.globalName || targetUser.global_name || targetUser.displayName || targetUser.username || "Unknown",
          deployedAt: Date.now(),
          alertKeywords: [],
          watchFocus: normalizeWatchFocus(null),
          // all signals on by default
          priority: false
        };
        this._deployments.push(record);
        this._rebuildSets();
        this._availableCache.invalidate();
        this._save();
        this._debugLog("DeploymentManager", "Deployed shadow", record);
        return true;
      }
      recall(shadowId) {
        const idx = this._deployments.findIndex((d) => d.shadowId === shadowId);
        if (idx === -1) return false;
        this._deployments.splice(idx, 1);
        this._rebuildSets();
        this._availableCache.invalidate();
        this._save();
        this._debugLog("DeploymentManager", "Recalled shadow", shadowId);
        return true;
      }
      getDeploymentForUser(userId) {
        const normalizedUserId = String(userId || "").trim();
        if (!normalizedUserId) return null;
        return this._deploymentByUserId.get(normalizedUserId) || null;
      }
      getDeployments() {
        return this._deployments.map((deployment) => ({
          ...deployment,
          alertKeywords: [...deployment.alertKeywords || []],
          watchFocus: normalizeWatchFocus(deployment.watchFocus),
          priority: deployment.priority === true
        }));
      }
      getDeploymentCount() {
        return this._deployments.length;
      }
      getMonitoredUserIds() {
        return this._monitoredUserIds;
      }
      getAlertKeywordsForUser(userId) {
        const deployment = this.getDeploymentForUser(userId);
        return (deployment == null ? void 0 : deployment.alertKeywords) ? [...deployment.alertKeywords] : [];
      }
      getWatchFocusForUser(userId) {
        const deployment = this.getDeploymentForUser(userId);
        return normalizeWatchFocus(deployment == null ? void 0 : deployment.watchFocus);
      }
      isPriorityTarget(userId) {
        var _a;
        return ((_a = this.getDeploymentForUser(userId)) == null ? void 0 : _a.priority) === true;
      }
      setPriorityForUser(userId, enabled) {
        const normalizedUserId = String(userId || "").trim();
        if (!normalizedUserId) return { ok: false };
        const idx = this._deployments.findIndex(
          (entry) => String(entry.targetUserId) === normalizedUserId
        );
        if (idx < 0) return { ok: false };
        const next = !!enabled;
        if (this._deployments[idx].priority === true === next) return { ok: true, changed: false };
        this._deployments[idx].priority = next;
        this._save();
        this._debugLog("DeploymentManager", "Updated Monarch's Mark", { targetUserId: normalizedUserId, priority: next });
        return { ok: true, changed: true };
      }
      // Returns { ok, changed } like setAlertKeywordsForUser so the caller can
      // distinguish a real save from a no-op. Unknown signal keys are ignored.
      setWatchFocusForUser(userId, signal, enabled) {
        const normalizedUserId = String(userId || "").trim();
        if (!normalizedUserId) return { ok: false };
        if (!WATCH_FOCUS_SIGNALS.includes(signal)) return { ok: false };
        const idx = this._deployments.findIndex(
          (entry) => String(entry.targetUserId) === normalizedUserId
        );
        if (idx < 0) return { ok: false };
        const current = normalizeWatchFocus(this._deployments[idx].watchFocus);
        const next = !!enabled;
        if (current[signal] === next) return { ok: true, changed: false };
        current[signal] = next;
        this._deployments[idx].watchFocus = current;
        this._save();
        this._debugLog("DeploymentManager", "Updated watch focus", {
          targetUserId: normalizedUserId,
          signal,
          enabled: next
        });
        return { ok: true, changed: true };
      }
      // Returns one of:
      //   { ok: true,  changed: true }  — keywords were modified and persisted
      //   { ok: true,  changed: false } — incoming keywords matched current; no-op
      //   { ok: false }                  — invalid userId or no deployment found
      // Callers can distinguish a real save from a no-op for accurate toasting.
      setAlertKeywordsForUser(userId, keywords) {
        const normalizedUserId = String(userId || "").trim();
        if (!normalizedUserId) return { ok: false };
        const deploymentIndex = this._deployments.findIndex(
          (entry) => String(entry.targetUserId) === normalizedUserId
        );
        if (deploymentIndex < 0) return { ok: false };
        const normalizedKeywords = normalizeAlertKeywords(keywords);
        const currentKeywords = this._deployments[deploymentIndex].alertKeywords || [];
        const hasSameKeywords = currentKeywords.length === normalizedKeywords.length && currentKeywords.every((value, idx) => value === normalizedKeywords[idx]);
        if (hasSameKeywords) return { ok: true, changed: false };
        this._deployments[deploymentIndex].alertKeywords = normalizedKeywords;
        this._save();
        this._debugLog("DeploymentManager", "Updated per-target alert keywords", {
          targetUserId: normalizedUserId,
          keywordCount: normalizedKeywords.length
        });
        return { ok: true, changed: true };
      }
      _getShadowArmyInstance() {
        const instance = getPluginInstance("ShadowArmy");
        if (!instance) {
          this._debugError("DeploymentManager", "ShadowArmy plugin not enabled or not available");
          return null;
        }
        return instance;
      }
      _getExchangeMarkedIds() {
        try {
          const exchangeInstance = getPluginInstance("ShadowExchange");
          if (typeof (exchangeInstance == null ? void 0 : exchangeInstance.getMarkedShadowIds) !== "function") return /* @__PURE__ */ new Set();
          const marked = exchangeInstance.getMarkedShadowIds();
          if (!(marked instanceof Set)) return /* @__PURE__ */ new Set();
          return new Set(Array.from(marked, (value) => String(value || "").trim()).filter(Boolean));
        } catch (err) {
          this._debugLog("DeploymentManager", "ShadowExchange not available for exclusion", err);
          return /* @__PURE__ */ new Set();
        }
      }
      _extractShadowId(shadow) {
        var _a;
        const raw = (shadow == null ? void 0 : shadow.id) || ((_a = shadow == null ? void 0 : shadow.extractedData) == null ? void 0 : _a.id) || null;
        if (!raw) return null;
        const normalized = String(raw).trim();
        return normalized || null;
      }
      _collectShadowIds(source, targetSet) {
        if (!Array.isArray(source)) return;
        for (const shadow of source) {
          const shadowId = this._extractShadowId(shadow);
          if (shadowId) targetSet.add(shadowId);
        }
      }
      _collectAllocatedShadowIds(allocationMap, targetSet) {
        if (!(allocationMap instanceof Map)) return;
        for (const shadows of allocationMap.values()) {
          this._collectShadowIds(shadows, targetSet);
        }
      }
      _getDungeonsSnapshot() {
        const snapshot = {
          dungeonAllocatedIds: /* @__PURE__ */ new Set(),
          reserveIds: /* @__PURE__ */ new Set()
        };
        try {
          const instance = getPluginInstance("Dungeons");
          if (!instance) return snapshot;
          this._collectShadowIds(instance.shadowReserve, snapshot.reserveIds);
          this._collectAllocatedShadowIds(instance.shadowAllocations, snapshot.dungeonAllocatedIds);
        } catch (err) {
          this._debugLog("DeploymentManager", "Dungeons not available for exclusion", err);
        }
        return snapshot;
      }
      _isShadowAvailable(shadow, exclusion) {
        const sid = String((shadow == null ? void 0 : shadow.id) || "").trim();
        if (!sid) return false;
        if (exclusion.deployedIds.has(sid)) return false;
        if (exclusion.exchangeMarkedIds.has(sid)) return false;
        if (exclusion.reserveIds.has(sid)) return true;
        if (exclusion.dungeonAllocatedIds.has(sid)) return false;
        return true;
      }
      _buildAvailableShadowList(allShadows, exclusion) {
        return allShadows.filter((shadow) => this._isShadowAvailable(shadow, exclusion));
      }
      _buildExclusionSnapshot() {
        const dungeons = this._getDungeonsSnapshot();
        return {
          deployedIds: this._deployedShadowIds,
          exchangeMarkedIds: this._getExchangeMarkedIds(),
          dungeonAllocatedIds: dungeons.dungeonAllocatedIds,
          reserveIds: dungeons.reserveIds
        };
      }
      _pickWeakest(shadows) {
        if (!Array.isArray(shadows) || shadows.length === 0) return null;
        return [...shadows].sort(
          (a, b) => RANKS.indexOf(a.rank || "E") - RANKS.indexOf(b.rank || "E")
        )[0];
      }
      _injectDungeonFallbackShadow(available, allShadows, exclusion) {
        if (available.length > 0 || exclusion.dungeonAllocatedIds.size === 0) return;
        const fallback = allShadows.filter((shadow) => {
          const sid = String((shadow == null ? void 0 : shadow.id) || "").trim();
          if (!sid) return false;
          if (!exclusion.dungeonAllocatedIds.has(sid)) return false;
          if (exclusion.deployedIds.has(sid)) return false;
          if (exclusion.exchangeMarkedIds.has(sid)) return false;
          return true;
        }).sort((a, b) => RANKS.indexOf(a.rank || "E") - RANKS.indexOf(b.rank || "E"))[0];
        if (fallback) available.push(fallback);
      }
      async getAvailableShadows() {
        var _a;
        const cached = this._availableCache.get();
        if (cached) return cached;
        try {
          const armyInstance = this._getShadowArmyInstance();
          if (!armyInstance) return [];
          const allShadows = ((_a = armyInstance.getShadowSnapshot) == null ? void 0 : _a.call(armyInstance)) || await armyInstance.getAllShadows();
          if (!Array.isArray(allShadows)) return [];
          const exclusion = this._buildExclusionSnapshot();
          const available = this._buildAvailableShadowList(allShadows, exclusion);
          this._injectDungeonFallbackShadow(available, allShadows, exclusion);
          this._debugLog("DeploymentManager", "Available shadows", {
            total: allShadows.length,
            available: available.length,
            deployed: exclusion.deployedIds.size,
            exchangeMarked: exclusion.exchangeMarkedIds.size,
            dungeonAllocated: exclusion.dungeonAllocatedIds.size,
            reservePool: exclusion.reserveIds.size
          });
          this._availableCache.set(available);
          return available;
        } catch (err) {
          this._debugError("DeploymentManager", "Failed to get available shadows", err);
          return [];
        }
      }
      /**
       * Find the single weakest available shadow without loading the full
       * shadow store. Walks RANKS ascending (E first) and queries a bounded
       * sample per rank via ShadowArmy's 'rank' IDB index — replaces the
       * previous getAvailableShadows() + full-array sort used by the
       * "Deploy Shadow" context-menu action, which forced a full 281k-record
       * scan just to pick one shadow.
       */
      async getWeakestAvailableShadow({ rankSampleLimit = 500 } = {}) {
        try {
          const armyInstance = this._getShadowArmyInstance();
          if (!armyInstance) return null;
          const shadowStorage = armyInstance.storageManager;
          if (!shadowStorage || typeof shadowStorage.getShadowsByRankLimited !== "function") {
            return this._pickWeakest(await this.getAvailableShadows());
          }
          const exclusion = this._buildExclusionSnapshot();
          for (const rank of RANKS) {
            let rankShadows;
            try {
              rankShadows = await shadowStorage.getShadowsByRankLimited(rank, rankSampleLimit);
            } catch (err) {
              this._debugError("DeploymentManager", `Bounded rank query failed for rank ${rank}`, err);
              continue;
            }
            if (!Array.isArray(rankShadows) || rankShadows.length === 0) continue;
            const decompressed = armyInstance.getShadowData ? rankShadows.map((s) => armyInstance.getShadowData(s)) : rankShadows;
            const eligible = this._buildAvailableShadowList(decompressed, exclusion);
            if (eligible.length > 0) {
              this._debugLog("DeploymentManager", "Weakest available shadow found via bounded rank query", {
                rank,
                sampled: rankShadows.length
              });
              return eligible[0];
            }
          }
          this._debugLog("DeploymentManager", "Bounded rank query exhausted with no match, falling back to full scan");
          return this._pickWeakest(await this.getAvailableShadows());
        } catch (err) {
          this._debugError("DeploymentManager", "Failed to get weakest available shadow", err);
          return null;
        }
      }
    };
    module2.exports = { DeploymentManager: DeploymentManager2 };
  }
});

// src/ShadowSenses/components.js
var require_components = __commonJS({
  "src/ShadowSenses/components.js"(exports2, module2) {
    var {
      GLOBAL_UTILITY_FEED_ID,
      KEYWORD_MATCH_COLOR,
      NAME_MENTION_COLOR,
      PRIORITY_COLORS,
      PRIORITY_LABELS,
      RANK_COLORS
    } = require_constants();
    function buildComponents2(pluginRef) {
      const React = BdApi.React;
      const { useState, useEffect, useCallback, useRef, useMemo } = React;
      const ce = React.createElement;
      const EVENT_LABELS = {
        status: "STATUS",
        typing: "TYPING",
        relationship: "CONNECTION",
        edit: "EDIT"
      };
      function getEventLabel(eventType) {
        if (eventType === "message") return null;
        return EVENT_LABELS[eventType] || String(eventType || "event").toUpperCase();
      }
      function getBorderColor(matchReason, priority) {
        if (matchReason === "keyword" || matchReason === "targetKeyword") return KEYWORD_MATCH_COLOR;
        if (matchReason === "name") return NAME_MENTION_COLOR;
        return PRIORITY_COLORS[priority] || null;
      }
      function getPriorityBadge(priority) {
        const label = PRIORITY_LABELS[priority];
        if (!label) return null;
        if (priority >= 4) {
          return { label, color: "#ef4444", background: "rgba(239,68,68,0.15)" };
        }
        if (priority >= 3) {
          return { label, color: "#fbbf24", background: "rgba(251,191,36,0.15)" };
        }
        return { label, color: "#60a5fa", background: "rgba(96,165,250,0.15)" };
      }
      function getMatchBadge(entry, priority) {
        if (entry.matchReason === "keyword" || entry.matchReason === "targetKeyword") {
          return {
            label: entry.matchedTerm ? `"${entry.matchedTerm}"` : "KW",
            color: "#34d399",
            background: "rgba(52,211,153,0.15)"
          };
        }
        if (entry.matchReason === "name") {
          return {
            label: entry.matchedTerm ? `"${entry.matchedTerm}"` : "NAME",
            color: "#ec4899",
            background: "rgba(236,72,153,0.15)"
          };
        }
        return getPriorityBadge(priority);
      }
      function renderTagBadge(badge) {
        if (!badge) return null;
        return ce(
          "span",
          {
            style: {
              color: badge.color,
              fontSize: badge.fontSize || "10px",
              fontWeight: badge.fontWeight || 600,
              padding: "1px 8px",
              borderRadius: "2px",
              background: badge.background,
              letterSpacing: "0.02em",
              whiteSpace: "nowrap",
              lineHeight: 1.4
            }
          },
          badge.label
        );
      }
      function getBurstBadge(messageCount) {
        if (messageCount <= 1) return null;
        return {
          label: `${messageCount} msgs`,
          color: "#8a2be2",
          background: "rgba(138, 43, 226, 0.15)"
        };
      }
      function parseContent(content, guildId) {
        var _a, _b, _c, _d, _e, _f, _g;
        if (!content || typeof content !== "string") return [];
        const Webpack = BdApi == null ? void 0 : BdApi.Webpack;
        const UserStore = (_a = Webpack == null ? void 0 : Webpack.getStore) == null ? void 0 : _a.call(Webpack, "UserStore");
        const ChannelStore = (_b = Webpack == null ? void 0 : Webpack.getStore) == null ? void 0 : _b.call(Webpack, "ChannelStore");
        const GuildStore = (_c = Webpack == null ? void 0 : Webpack.getStore) == null ? void 0 : _c.call(Webpack, "GuildStore");
        const RE = /<(@[!&]?|#)(\d+)>|<a?:([a-zA-Z0-9_]+):\d+>|@(everyone|here)\b/g;
        const PILL = (color, bg) => ({
          color,
          background: bg,
          padding: "0 4px",
          borderRadius: "2px",
          fontWeight: 500,
          whiteSpace: "nowrap"
        });
        const out = [];
        let lastIndex = 0;
        let key = 0;
        for (const match of content.matchAll(RE)) {
          if (match.index > lastIndex) out.push(content.slice(lastIndex, match.index));
          const [full, prefix, id, emojiName, special] = match;
          let node;
          if (special) {
            node = ce("span", {
              key: `m${key++}`,
              style: PILL("#fbbf24", "rgba(251, 191, 36, 0.15)")
            }, `@${special}`);
          } else if (emojiName) {
            node = ce("span", {
              key: `m${key++}`,
              style: { color: "rgba(181, 186, 193, 0.75)" }
            }, `:${emojiName}:`);
          } else if (prefix === "@" || prefix === "@!") {
            const user = (_d = UserStore == null ? void 0 : UserStore.getUser) == null ? void 0 : _d.call(UserStore, id);
            const name = (user == null ? void 0 : user.globalName) || (user == null ? void 0 : user.username) || `user-${id.slice(-4)}`;
            node = ce("span", {
              key: `m${key++}`,
              style: PILL("#8a2be2", "rgba(138, 43, 226, 0.18)")
            }, `@${name}`);
          } else if (prefix === "@&") {
            let name = `role-${id.slice(-4)}`;
            let color = "#8a2be2";
            try {
              const guild = (_e = GuildStore == null ? void 0 : GuildStore.getGuild) == null ? void 0 : _e.call(GuildStore, guildId);
              const role = (_f = guild == null ? void 0 : guild.roles) == null ? void 0 : _f[id];
              if (role) {
                name = role.name || name;
                if (role.colorString) color = role.colorString;
              }
            } catch (_) {
            }
            node = ce("span", {
              key: `m${key++}`,
              style: PILL(color, "rgba(138, 43, 226, 0.18)")
            }, `@${name}`);
          } else if (prefix === "#") {
            const channel = (_g = ChannelStore == null ? void 0 : ChannelStore.getChannel) == null ? void 0 : _g.call(ChannelStore, id);
            const name = (channel == null ? void 0 : channel.name) || `channel-${id.slice(-4)}`;
            node = ce("span", {
              key: `m${key++}`,
              style: PILL("#60a5fa", "rgba(96, 165, 250, 0.18)")
            }, `#${name}`);
          } else {
            node = full;
          }
          out.push(node);
          lastIndex = match.index + full.length;
        }
        if (lastIndex < content.length) out.push(content.slice(lastIndex));
        return out;
      }
      const EDIT_BEFORE_INK = "#e0919b";
      const EDIT_AFTER_INK = "#7fd99a";
      const MAX_DIFF_WORDS = 80;
      const EDIT_ROW = (accent) => ({
        display: "flex",
        alignItems: "flex-start",
        gap: "8px",
        padding: "1px 0 1px 8px",
        borderLeft: `2px solid ${accent}`
      });
      const EDIT_LABEL = (color) => ({
        flex: "0 0 auto",
        minWidth: "42px",
        color,
        fontSize: "10px",
        fontWeight: 700,
        letterSpacing: "0.08em",
        lineHeight: "1.9",
        textTransform: "uppercase",
        opacity: 0.85
      });
      const EDIT_TEXT = (color) => ({
        flex: "1 1 auto",
        minWidth: 0,
        color,
        overflowWrap: "anywhere"
      });
      const EDIT_MARK = (color, bg) => ({
        color,
        background: bg,
        borderRadius: "2px",
        padding: "0 2px",
        fontWeight: 600
      });
      const LEGACY_EDIT_RE = /^[\s\S]*? edited a message\nbefore: ([\s\S]*?)\nafter: ([\s\S]*)$/;
      function resolveEditPair(entry) {
        if (typeof entry.editBefore === "string" || typeof entry.editAfter === "string") {
          return { before: entry.editBefore || "", after: entry.editAfter || "" };
        }
        const match = LEGACY_EDIT_RE.exec(String(entry.content || ""));
        if (!match) return null;
        return {
          before: match[1] === "\u2014" ? "" : match[1],
          after: match[2] === "\u2014" ? "" : match[2]
        };
      }
      function diffWordRanges(beforeWords, afterWords) {
        const shorter = Math.min(beforeWords.length, afterWords.length);
        let head = 0;
        while (head < shorter && beforeWords[head] === afterWords[head]) head++;
        let tail = 0;
        while (tail < shorter - head && beforeWords[beforeWords.length - 1 - tail] === afterWords[afterWords.length - 1 - tail]) tail++;
        return {
          head,
          beforeEnd: beforeWords.length - tail,
          afterEnd: afterWords.length - tail
        };
      }
      function buildDiffTextNodes(words, head, end, markStyle) {
        if (words.length === 0) return ["\u2014"];
        const nodes = [];
        for (let i = 0; i < words.length; i++) {
          if (i > 0) nodes.push(" ");
          nodes.push(i >= head && i < end ? ce("span", { key: `d${i}`, style: markStyle }, words[i]) : words[i]);
        }
        return nodes;
      }
      function buildEditDiffNodes(entry) {
        const pair = resolveEditPair(entry);
        if (!pair) return null;
        const beforeWords = pair.before.trim() ? pair.before.trim().split(/\s+/) : [];
        const afterWords = pair.after.trim() ? pair.after.trim().split(/\s+/) : [];
        const range = beforeWords.length <= MAX_DIFF_WORDS && afterWords.length <= MAX_DIFF_WORDS ? diffWordRanges(beforeWords, afterWords) : { head: 0, beforeEnd: 0, afterEnd: 0 };
        return ce(
          "div",
          { style: { display: "flex", flexDirection: "column", gap: "3px" } },
          ce(
            "div",
            { style: EDIT_ROW(EDIT_BEFORE_INK) },
            ce("span", { style: EDIT_LABEL(EDIT_BEFORE_INK) }, "Before"),
            ce(
              "span",
              { style: EDIT_TEXT("#b9a8c9") },
              ...buildDiffTextNodes(
                beforeWords,
                range.head,
                range.beforeEnd,
                EDIT_MARK(EDIT_BEFORE_INK, "rgba(224, 145, 155, 0.16)")
              )
            )
          ),
          ce(
            "div",
            { style: EDIT_ROW(EDIT_AFTER_INK) },
            ce("span", { style: EDIT_LABEL(EDIT_AFTER_INK) }, "After"),
            ce(
              "span",
              { style: EDIT_TEXT("#e8e3f5") },
              ...buildDiffTextNodes(
                afterWords,
                range.head,
                range.afterEnd,
                EDIT_MARK(EDIT_AFTER_INK, "rgba(127, 217, 154, 0.16)")
              )
            )
          )
        );
      }
      function getContentText(entry, eventType) {
        if (eventType === "message") {
          if (!entry.content) return "\u2014 no text content \u2014";
          return ["\u201C", ...parseContent(entry.content, entry.guildId), "\u201D"];
        }
        return entry.content || "\u2014 no details \u2014";
      }
      function buildMediaPreviews(entry) {
        const attachments = Array.isArray(entry.attachments) ? entry.attachments : [];
        const embeds = Array.isArray(entry.embeds) ? entry.embeds : [];
        if (attachments.length === 0 && embeds.length === 0) return null;
        const thumbStyle = {
          maxWidth: "240px",
          maxHeight: "180px",
          width: "auto",
          height: "auto",
          borderRadius: "2px",
          border: "1px solid rgba(138, 43, 226, 0.2)",
          background: "rgba(0, 0, 0, 0.25)",
          display: "block",
          objectFit: "contain"
        };
        const items = [];
        let key = 0;
        for (const a of attachments) {
          if (!(a == null ? void 0 : a.url)) continue;
          items.push(
            ce("img", {
              key: `att${key++}`,
              src: a.url,
              alt: a.filename || "attachment",
              loading: "lazy",
              decoding: "async",
              style: thumbStyle,
              onError: (e) => {
                const node = (e == null ? void 0 : e.currentTarget) || (e == null ? void 0 : e.target);
                if (node && node.parentNode) {
                  const ph = document.createElement("span");
                  ph.textContent = "[Image]";
                  ph.style.cssText = "color: rgba(232, 227, 245, 0.5); font-size: 12px; font-style: italic;";
                  node.parentNode.replaceChild(ph, node);
                }
              }
            })
          );
        }
        for (const em of embeds) {
          if (!(em == null ? void 0 : em.thumbnailUrl)) continue;
          items.push(
            ce("img", {
              key: `em${key++}`,
              src: em.thumbnailUrl,
              alt: em.title || em.type || "embed",
              loading: "lazy",
              decoding: "async",
              style: thumbStyle,
              // Show "GIF" badge corner-mark via title attribute (tooltip)
              // since we're using static thumbnails for no-lag rendering.
              title: em.type === "gifv" ? "GIF \u2014 click card to view animated" : void 0,
              onError: (e) => {
                const node = (e == null ? void 0 : e.currentTarget) || (e == null ? void 0 : e.target);
                if (node && node.parentNode) {
                  const ph = document.createElement("span");
                  ph.textContent = em.type === "gifv" ? "[GIF]" : "[Embed]";
                  ph.style.cssText = "color: rgba(232, 227, 245, 0.5); font-size: 12px; font-style: italic;";
                  node.parentNode.replaceChild(ph, node);
                }
              }
            })
          );
        }
        if (items.length === 0) return null;
        return ce(
          "div",
          {
            className: "shadow-senses-feed-media",
            style: {
              display: "flex",
              flexWrap: "wrap",
              gap: "8px",
              marginTop: "8px"
            }
          },
          ...items
        );
      }
      function parseKeywordInput(rawValue) {
        if (typeof rawValue !== "string") return [];
        const terms = rawValue.split(",").map((value) => value.trim()).filter(Boolean);
        const deduped = [];
        const seen = /* @__PURE__ */ new Set();
        for (const term of terms) {
          const key = term.toLowerCase();
          if (seen.has(key)) continue;
          seen.add(key);
          deduped.push(term);
          if (deduped.length >= 30) break;
        }
        return deduped;
      }
      function mergeKeywords(existingKeywords, rawValue) {
        const merged = [];
        const seen = /* @__PURE__ */ new Set();
        const pushUnique = (values) => {
          for (const value of values) {
            const key = value.toLowerCase();
            if (seen.has(key)) continue;
            seen.add(key);
            merged.push(value);
            if (merged.length >= 30) break;
          }
        };
        pushUnique(parseKeywordInput(Array.isArray(existingKeywords) ? existingKeywords.join(",") : ""));
        if (merged.length >= 30) return merged;
        pushUnique(parseKeywordInput(rawValue));
        return merged;
      }
      function removeKeyword(existingKeywords, keywordToRemove) {
        const removeKey = String(keywordToRemove || "").toLowerCase();
        if (!removeKey) return Array.isArray(existingKeywords) ? [...existingKeywords] : [];
        const source = Array.isArray(existingKeywords) ? existingKeywords : [];
        return source.filter((keyword) => keyword.toLowerCase() !== removeKey);
      }
      function deploymentSortName(deployment) {
        return String((deployment == null ? void 0 : deployment.targetUsername) || "").toLowerCase();
      }
      function buildDeploymentSnapshot(deployments) {
        if (!Array.isArray(deployments) || deployments.length === 0) return "";
        return deployments.map((deployment) => {
          const userId = String(deployment.targetUserId || "");
          const shadowId = String(deployment.shadowId || "");
          const keywordSig = (deployment.alertKeywords || []).map((keyword) => keyword.toLowerCase()).join("|");
          const f = deployment.watchFocus || {};
          const focusSig = `${f.status !== false ? 1 : 0}${f.typing !== false ? 1 : 0}${f.messages !== false ? 1 : 0}${f.mentions !== false ? 1 : 0}`;
          const prioSig = deployment.priority === true ? "P" : "-";
          return `${shadowId}:${userId}:${keywordSig}:${focusSig}:${prioSig}`;
        }).join(";");
      }
      function getFirstContentBlock(entry, messageCount) {
        if (messageCount <= 1 || !entry.firstContent) return null;
        return ce(
          "div",
          {
            className: "shadow-senses-feed-content",
            style: {
              color: "rgba(181, 186, 193, 0.55)",
              fontSize: "12px",
              marginTop: "4px",
              fontStyle: "italic",
              lineHeight: 1.4,
              fontFamily: "'gg sans', system-ui, sans-serif"
            }
          },
          "First: \u201C",
          ...parseContent(entry.firstContent, entry.guildId),
          "\u201D"
        );
      }
      function buildFeedCardHeaderNodes(entry, options) {
        const {
          rankColor,
          badge,
          burstBadge,
          eventLabel,
          timeStr
        } = options;
        const HB = {
          fontSize: "11px",
          fontFamily: "'gg sans', system-ui, sans-serif",
          lineHeight: 1.3
        };
        const nodes = [
          ce("span", {
            style: { ...HB, color: rankColor, fontWeight: 700, letterSpacing: "0.03em" }
          }, `[${entry.shadowRank}] ${entry.shadowName}`),
          ce("span", { style: { ...HB, color: "#4a4a5e" } }, "\u2192"),
          ce("span", { style: { ...HB, color: "#d4b0ff", fontWeight: 600 } }, entry.authorName)
        ];
        const matchBadgeNode = renderTagBadge(badge);
        if (matchBadgeNode) nodes.push(matchBadgeNode);
        if (burstBadge) nodes.push(renderTagBadge({ ...burstBadge, fontWeight: 600 }));
        if (eventLabel) {
          nodes.push(
            ce("span", { style: { ...HB, color: "#fbbf24", fontWeight: 700 } }, eventLabel)
          );
        }
        if (entry.guildName) {
          nodes.push(ce("span", {
            style: { ...HB, color: "#8a2be2", opacity: 0.75 }
          }, entry.guildName));
        }
        if (entry.channelId) {
          nodes.push(ce("span", { style: { ...HB, color: "#7a8ba8" } }, `#${entry.channelName}`));
        }
        nodes.push(ce("span", {
          style: {
            ...HB,
            color: "#5a5a6e",
            marginLeft: "auto",
            fontVariantNumeric: "tabular-nums"
          }
        }, timeStr));
        return nodes;
      }
      function buildFeedCardStyle(isNavigable, borderColor) {
        return {
          cursor: isNavigable ? "pointer" : "default",
          borderLeft: borderColor ? `3px solid ${borderColor}` : void 0
        };
      }
      function createFeedCardClickHandler(isNavigable, onNavigate, entry) {
        if (!isNavigable || !onNavigate) return void 0;
        return () => onNavigate(entry);
      }
      function _applyFeedCardContentStyle(el) {
        if (!el) return;
        el.style.setProperty("font-family", "'gg sans', 'Helvetica Neue', system-ui, sans-serif", "important");
        el.style.setProperty("font-weight", "400", "important");
        el.style.setProperty("font-size", "14px", "important");
        el.style.setProperty("line-height", "1.45", "important");
        el.style.setProperty("color", "#e8e3f5", "important");
      }
      function FeedCardBase({ entry, onNavigate }) {
        const time = new Date(entry.timestamp);
        const timeStr = `${String(time.getHours()).padStart(2, "0")}:${String(time.getMinutes()).padStart(2, "0")}`;
        const rankColor = RANK_COLORS[entry.shadowRank] || "#8a2be2";
        const eventType = entry.eventType || "message";
        const isNavigable = !!(entry.guildId && entry.channelId && entry.guildId !== GLOBAL_UTILITY_FEED_ID);
        const eventLabel = getEventLabel(eventType);
        const priority = entry.priority || 1;
        const msgCount = entry.messageCount || 1;
        const borderColor = getBorderColor(entry.matchReason || null, priority);
        const badge = getMatchBadge(entry, priority);
        const burstBadge = getBurstBadge(msgCount);
        const editDiff = eventType === "edit" ? buildEditDiffNodes(entry) : null;
        const contentText = editDiff || getContentText(entry, eventType);
        const firstContent = getFirstContentBlock(entry, msgCount);
        const mediaPreviews = buildMediaPreviews(entry);
        const headerNodes = buildFeedCardHeaderNodes(entry, {
          rankColor,
          badge,
          burstBadge,
          eventLabel,
          timeStr
        });
        return ce(
          "div",
          {
            className: "shadow-senses-feed-card",
            style: buildFeedCardStyle(isNavigable, borderColor),
            onClick: createFeedCardClickHandler(isNavigable, onNavigate, entry),
            // Same bulletproof technique as the message body inside —
            // class-based !important rules keep getting beaten by something
            // upstream. Inline !important via setProperty wins absolutely.
            // Note: the inline buildFeedCardStyle borderLeft (priority color)
            // is set via React style prop; setProperty here uses the OTHER
            // 3 sides only (border-top/right/bottom) so we don't override the
            // priority indicator on the left.
            ref: (el) => {
              if (!el) return;
              el.style.setProperty("background", "rgba(38, 28, 60, 0.85)", "important");
              el.style.setProperty("border-top", "1px solid rgba(138, 43, 226, 0.32)", "important");
              el.style.setProperty("border-right", "1px solid rgba(138, 43, 226, 0.32)", "important");
              el.style.setProperty("border-bottom", "1px solid rgba(138, 43, 226, 0.32)", "important");
              if (!borderColor) {
                el.style.setProperty("border-left", "1px solid rgba(138, 43, 226, 0.32)", "important");
              }
              el.style.setProperty("border-radius", "2px", "important");
              el.style.setProperty("padding", "12px 14px", "important");
              el.style.setProperty("margin", "0 0 10px 0", "important");
              el.style.setProperty("box-shadow", "inset 0 1px 0 rgba(138, 43, 226, 0.12), 0 2px 6px rgba(0, 0, 0, 0.45)", "important");
            }
          },
          ce("div", { className: "shadow-senses-feed-card-header" }, ...headerNodes),
          ce("div", {
            className: "shadow-senses-feed-content",
            // ref + setProperty('important') is the only way to ship inline
            // !important from React. JSX `style` props can't carry !important;
            // class-based !important rules can be beaten by competing
            // !important rules from external themes/plugins; CSS variable
            // values can be poisoned upstream. Inline `!important`
            // declarations are the unambiguous winner per the CSS cascade
            // (highest specificity tier in the author origin).
            ref: _applyFeedCardContentStyle
          }, contentText),
          mediaPreviews,
          firstContent
        );
      }
      const FeedCard = React.memo(FeedCardBase);
      const WATCH_FOCUS_CHIPS = [
        { key: "status", label: "Status" },
        { key: "typing", label: "Typing" },
        { key: "messages", label: "Msgs" },
        { key: "mentions", label: "Pings" }
      ];
      function _applyFocusChip(el, active) {
        if (!el) return;
        el.style.setProperty("display", "inline-flex", "important");
        el.style.setProperty("align-items", "center", "important");
        el.style.setProperty("padding", "2px 8px", "important");
        el.style.setProperty("border-radius", "2px", "important");
        el.style.setProperty("font-family", "'gg sans', system-ui, sans-serif", "important");
        el.style.setProperty("font-size", "10px", "important");
        el.style.setProperty("font-weight", "700", "important");
        el.style.setProperty("letter-spacing", "0.04em", "important");
        el.style.setProperty("text-transform", "uppercase", "important");
        el.style.setProperty("cursor", "pointer", "important");
        el.style.setProperty("outline", "none", "important");
        el.style.setProperty("box-shadow", "none", "important");
        el.style.setProperty("transition", "background 0.15s ease, color 0.15s ease, border-color 0.15s ease", "important");
        if (active) {
          el.style.setProperty("background", "rgba(138, 43, 226, 0.22)", "important");
          el.style.setProperty("color", "#d4b0ff", "important");
          el.style.setProperty("border", "1px solid rgba(138, 43, 226, 0.55)", "important");
        } else {
          el.style.setProperty("background", "rgba(0, 0, 0, 0.25)", "important");
          el.style.setProperty("color", "#6a6a7e", "important");
          el.style.setProperty("border", "1px solid rgba(120, 120, 140, 0.18)", "important");
        }
      }
      function DeploymentRow({ deployment, onRecall, onToggleFocus, onDossier, onTogglePriority }) {
        const rankColor = RANK_COLORS[deployment.shadowRank] || "#8a2be2";
        const focus = deployment.watchFocus || {};
        const isPriority = deployment.priority === true;
        let targetLabel = deployment.targetUsername;
        try {
          const engine = pluginRef.sensesEngine;
          if (engine == null ? void 0 : engine._resolveUserName) {
            targetLabel = engine._resolveUserName(deployment.targetUserId, deployment.targetUsername);
          }
        } catch (_) {
        }
        const HB = {
          fontFamily: "'gg sans', 'Helvetica Neue', system-ui, sans-serif",
          fontSize: "13px",
          lineHeight: 1.3
        };
        const topLine = ce(
          "div",
          {
            style: { display: "flex", alignItems: "center", justifyContent: "space-between", gap: "12px" }
          },
          ce(
            "div",
            {
              style: { display: "flex", alignItems: "center", gap: "8px", flex: 1, minWidth: 0, ...HB }
            },
            ce("span", {
              style: { ...HB, color: rankColor, fontWeight: 700, letterSpacing: "0.03em" }
            }, `[${deployment.shadowRank}]`),
            ce("span", { style: { ...HB, color: "#d4b0ff", fontWeight: 600 } }, deployment.shadowName),
            ce("span", { style: { ...HB, color: "#5a5a6e" } }, "\u2192"),
            ce("span", {
              style: { ...HB, color: "#8a2be2", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }
            }, targetLabel)
          ),
          ce("button", {
            className: "shadow-senses-recall-btn",
            onClick: () => onRecall && onRecall(deployment),
            ref: (el) => {
              if (!el) return;
              el.style.setProperty("background", "rgba(239, 68, 68, 0.12)", "important");
              el.style.setProperty("color", "#f87171", "important");
              el.style.setProperty("border", "1px solid rgba(239, 68, 68, 0.35)", "important");
              el.style.setProperty("border-radius", "2px", "important");
              el.style.setProperty("padding", "4px 12px", "important");
              el.style.setProperty("font-family", "'gg sans', system-ui, sans-serif", "important");
              el.style.setProperty("font-size", "11px", "important");
              el.style.setProperty("font-weight", "600", "important");
              el.style.setProperty("letter-spacing", "0.04em", "important");
              el.style.setProperty("text-transform", "uppercase", "important");
              el.style.setProperty("cursor", "pointer", "important");
              el.style.setProperty("box-shadow", "none", "important");
              el.style.setProperty("outline", "none", "important");
              el.style.setProperty("transition", "background 0.15s ease, border-color 0.15s ease", "important");
            },
            onMouseEnter: (e) => {
              e.currentTarget.style.setProperty("background", "rgba(239, 68, 68, 0.22)", "important");
              e.currentTarget.style.setProperty("border-color", "rgba(239, 68, 68, 0.55)", "important");
            },
            onMouseLeave: (e) => {
              e.currentTarget.style.setProperty("background", "rgba(239, 68, 68, 0.12)", "important");
              e.currentTarget.style.setProperty("border-color", "rgba(239, 68, 68, 0.35)", "important");
            }
          }, "Recall")
        );
        const bottomLine = ce(
          "div",
          {
            style: {
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "8px",
              marginTop: "8px",
              flexWrap: "wrap"
            }
          },
          ce(
            "div",
            { style: { display: "flex", alignItems: "center", gap: "5px", flexWrap: "wrap" } },
            WATCH_FOCUS_CHIPS.map((chip) => {
              const active = focus[chip.key] !== false;
              return ce("button", {
                key: chip.key,
                title: `${active ? "Reporting" : "Muted"}: ${chip.label} \u2014 click to ${active ? "mute" : "report"}`,
                onClick: () => onToggleFocus && onToggleFocus(deployment, chip.key, !active),
                ref: (el) => _applyFocusChip(el, active)
              }, chip.label);
            })
          ),
          ce(
            "div",
            { style: { display: "flex", alignItems: "center", gap: "6px" } },
            ce("button", {
              title: isPriority ? "The Monarch's Mark \u2014 priority target (cuts through mutes, gold urgent reports). Click to unmark." : "Set the Monarch's Mark \u2014 make this a priority target whose reports always cut through.",
              onClick: () => onTogglePriority && onTogglePriority(deployment, !isPriority),
              ref: (el) => {
                if (!el) return;
                el.style.setProperty("background", isPriority ? "rgba(251,191,36,0.20)" : "rgba(0,0,0,0.25)", "important");
                el.style.setProperty("color", isPriority ? "#fbbf24" : "#6a6a7e", "important");
                el.style.setProperty("border", `1px solid ${isPriority ? "rgba(251,191,36,0.55)" : "rgba(120,120,140,0.18)"}`, "important");
                el.style.setProperty("border-radius", "2px", "important");
                el.style.setProperty("padding", "3px 9px", "important");
                el.style.setProperty("font-family", "'gg sans', system-ui, sans-serif", "important");
                el.style.setProperty("font-size", "10px", "important");
                el.style.setProperty("font-weight", "700", "important");
                el.style.setProperty("cursor", "pointer", "important");
                el.style.setProperty("outline", "none", "important");
                el.style.setProperty("box-shadow", "none", "important");
              }
            }, isPriority ? "\u2605 Marked" : "\u2606 Mark"),
            ce("button", {
              title: "Copy this target's last 24h of recorded activity to the clipboard",
              onClick: () => onDossier && onDossier(deployment),
              ref: (el) => {
                if (!el) return;
                el.style.setProperty("background", "rgba(59, 130, 246, 0.12)", "important");
                el.style.setProperty("color", "#93c5fd", "important");
                el.style.setProperty("border", "1px solid rgba(59, 130, 246, 0.35)", "important");
                el.style.setProperty("border-radius", "2px", "important");
                el.style.setProperty("padding", "3px 10px", "important");
                el.style.setProperty("font-family", "'gg sans', system-ui, sans-serif", "important");
                el.style.setProperty("font-size", "10px", "important");
                el.style.setProperty("font-weight", "700", "important");
                el.style.setProperty("letter-spacing", "0.04em", "important");
                el.style.setProperty("text-transform", "uppercase", "important");
                el.style.setProperty("cursor", "pointer", "important");
                el.style.setProperty("box-shadow", "none", "important");
                el.style.setProperty("outline", "none", "important");
              },
              onMouseEnter: (e) => {
                e.currentTarget.style.setProperty("background", "rgba(59, 130, 246, 0.22)", "important");
              },
              onMouseLeave: (e) => {
                e.currentTarget.style.setProperty("background", "rgba(59, 130, 246, 0.12)", "important");
              }
            }, "Dossier")
          )
        );
        return ce("div", {
          className: "shadow-senses-deploy-row",
          ref: (el) => {
            if (!el) return;
            el.style.setProperty("display", "block", "important");
            el.style.setProperty("background", "rgba(38, 28, 60, 0.85)", "important");
            el.style.setProperty("border", "1px solid rgba(138, 43, 226, 0.32)", "important");
            el.style.setProperty(
              "border-left",
              isPriority ? "3px solid rgba(251,191,36,0.7)" : "1px solid rgba(138, 43, 226, 0.32)",
              "important"
            );
            el.style.setProperty("border-radius", "2px", "important");
            el.style.setProperty("padding", "10px 14px", "important");
            el.style.setProperty("margin", "0 0 8px 0", "important");
            el.style.setProperty("box-shadow", "inset 0 1px 0 rgba(138, 43, 226, 0.12), 0 2px 6px rgba(0, 0, 0, 0.45)", "important");
          }
        }, topLine, bottomLine);
      }
      function _applyDeployButtonStyle(el) {
        if (!el) return;
        el.style.setProperty("background", "rgba(138, 43, 226, 0.18)", "important");
        el.style.setProperty("color", "#d4b0ff", "important");
        el.style.setProperty("border", "1px solid rgba(138, 43, 226, 0.5)", "important");
        el.style.setProperty("border-radius", "2px", "important");
        el.style.setProperty("padding", "8px 18px", "important");
        el.style.setProperty("font-family", "'gg sans', system-ui, sans-serif", "important");
        el.style.setProperty("font-size", "12px", "important");
        el.style.setProperty("font-weight", "700", "important");
        el.style.setProperty("letter-spacing", "0.05em", "important");
        el.style.setProperty("text-transform", "uppercase", "important");
        el.style.setProperty("cursor", "pointer", "important");
        el.style.setProperty("box-shadow", "0 2px 8px rgba(138, 43, 226, 0.18)", "important");
        el.style.setProperty("outline", "none", "important");
        el.style.setProperty("display", "inline-flex", "important");
        el.style.setProperty("align-items", "center", "important");
        el.style.setProperty("gap", "6px", "important");
        el.style.setProperty("transition", "background 0.15s ease, border-color 0.15s ease, transform 0.15s ease", "important");
      }
      function _deployBtnHoverIn(e) {
        e.currentTarget.style.setProperty("background", "rgba(138, 43, 226, 0.32)", "important");
        e.currentTarget.style.setProperty("border-color", "rgba(138, 43, 226, 0.7)", "important");
        e.currentTarget.style.setProperty("transform", "translateY(-1px)", "important");
      }
      function _deployBtnHoverOut(e) {
        e.currentTarget.style.setProperty("background", "rgba(138, 43, 226, 0.18)", "important");
        e.currentTarget.style.setProperty("border-color", "rgba(138, 43, 226, 0.5)", "important");
        e.currentTarget.style.setProperty("transform", "none", "important");
      }
      function FeedTab({ onNavigate }) {
        const [feed, setFeed] = useState([]);
        const scrollRef = useRef(null);
        const prevLenRef = useRef(0);
        const didInitialScrollRef = useRef(false);
        useEffect(() => {
          var _a;
          const engine = pluginRef.sensesEngine;
          if (!engine) return void 0;
          const refresh = () => {
            var _a2;
            if (document.hidden) return;
            try {
              setFeed(engine.getActiveFeed());
            } catch (err) {
              (_a2 = pluginRef.debugLog) == null ? void 0 : _a2.call(pluginRef, "REACT", "Feed refresh error", err);
            }
          };
          let debounceTimer = null;
          const scheduleRefresh = () => {
            if (document.hidden || debounceTimer) return;
            debounceTimer = setTimeout(() => {
              debounceTimer = null;
              refresh();
            }, 300);
          };
          try {
            setFeed(engine.getActiveFeed());
          } catch (err) {
            (_a = pluginRef.debugLog) == null ? void 0 : _a.call(pluginRef, "REACT", "Feed initial load error", err);
          }
          if (engine._feedBus) engine._feedBus.addEventListener("change", scheduleRefresh);
          return () => {
            if (debounceTimer) clearTimeout(debounceTimer);
            if (engine._feedBus) engine._feedBus.removeEventListener("change", scheduleRefresh);
          };
        }, []);
        useEffect(() => {
          const el = scrollRef.current;
          if (!el || feed.length === 0) return;
          if (!didInitialScrollRef.current) {
            didInitialScrollRef.current = true;
            prevLenRef.current = feed.length;
            el.scrollTop = el.scrollHeight;
            requestAnimationFrame(() => {
              if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
            });
            return;
          }
          if (feed.length > prevLenRef.current) {
            const nearBottom = el.scrollHeight - el.scrollTop - el.clientHeight < 80;
            if (nearBottom) {
              requestAnimationFrame(() => {
                if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
              });
            }
          }
          prevLenRef.current = feed.length;
        }, [feed.length]);
        const visibleFeed = useMemo(() => {
          if (feed.length <= 200) return feed;
          return feed.slice(feed.length - 200);
        }, [feed]);
        if (visibleFeed.length === 0) {
          return ce(
            "div",
            { className: "shadow-senses-empty" },
            "No messages detected yet. Shadows are watching..."
          );
        }
        return ce(
          "div",
          {
            ref: scrollRef,
            style: { maxHeight: "50vh", overflowY: "auto", padding: "8px 16px" }
          },
          visibleFeed.map(
            (entry, i) => ce(FeedCard, { key: `${entry.messageId}-${i}`, entry, onNavigate })
          )
        );
      }
      function DeploymentsTab({ onRecall, onDeployNew }) {
        const [deployments, setDeployments] = useState([]);
        const versionRef = useRef(-1);
        useEffect(() => {
          var _a;
          const dm = pluginRef.deploymentManager;
          try {
            setDeployments(dm ? dm.getDeployments() : []);
          } catch (err) {
            (_a = pluginRef.debugLog) == null ? void 0 : _a.call(pluginRef, "REACT", "Deployments load error", err);
          }
          if (!dm || !dm._bus) return void 0;
          const refresh = () => {
            if (document.hidden) return;
            try {
              versionRef.current = dm._version;
              setDeployments(dm.getDeployments());
            } catch (_) {
            }
          };
          dm._bus.addEventListener("change", refresh);
          return () => dm._bus.removeEventListener("change", refresh);
        }, []);
        const handleRecall = useCallback((deployment) => {
          try {
            if (pluginRef.deploymentManager) {
              pluginRef.deploymentManager.recall(deployment.shadowId);
              setDeployments(pluginRef.deploymentManager.getDeployments());
            }
          } catch (err) {
            pluginRef.debugError("DeploymentsTab", "Recall failed:", err);
          }
          if (onRecall) onRecall(deployment);
        }, [onRecall]);
        const handleToggleFocus = useCallback((deployment, signal, enabled) => {
          var _a;
          try {
            const dm = pluginRef.deploymentManager;
            if (!(dm == null ? void 0 : dm.setWatchFocusForUser)) return;
            const res = dm.setWatchFocusForUser(deployment.targetUserId, signal, enabled);
            if (res == null ? void 0 : res.changed) setDeployments(dm.getDeployments());
          } catch (err) {
            (_a = pluginRef.debugError) == null ? void 0 : _a.call(pluginRef, "DeploymentsTab", "Toggle focus failed:", err);
          }
        }, []);
        const handleMuster = useCallback(() => {
          var _a, _b;
          try {
            const engine = pluginRef.sensesEngine;
            if (!(engine == null ? void 0 : engine.buildMusterReport)) return;
            const report = engine.buildMusterReport();
            const monarch = ((_a = pluginRef.settings) == null ? void 0 : _a.reportToMonarch) !== false;
            const React2 = BdApi.React;
            const fmtSilence = (ms) => {
              if (ms == null) return "no activity seen";
              const m = Math.floor(ms / 6e4);
              if (m < 1) return "active now";
              if (m < 60) return `silent ${m}m`;
              const h = Math.floor(m / 60);
              if (h < 24) return `silent ${h}h`;
              return `silent ${Math.floor(h / 24)}d`;
            };
            const rankColorOf = (r) => RANK_COLORS[r] || "#8a2be2";
            const summary = monarch ? `The army reports, my liege \u2014 ${report.onlineCount} of ${report.total} shadows' targets stand awake.` : `${report.onlineCount} of ${report.total} watched targets online.`;
            const rowsUi = report.rows.map(
              (r, i) => React2.createElement(
                "div",
                {
                  key: i,
                  style: {
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    padding: "6px 8px",
                    borderBottom: "1px solid rgba(138,43,226,0.10)",
                    fontFamily: "'gg sans', system-ui, sans-serif",
                    fontSize: "12px",
                    color: r.online ? "#dcddde" : "#8a8a9a",
                    borderLeft: r.priority ? "3px solid #fbbf24" : "3px solid transparent"
                  }
                },
                React2.createElement("span", { style: { color: rankColorOf(r.rank), fontWeight: 700 } }, `[${r.rank}]`),
                React2.createElement("span", { style: { color: "#d4b0ff", fontWeight: 600 } }, r.shadowName),
                React2.createElement("span", { style: { color: "#5a5a6e" } }, "\u2192"),
                React2.createElement("span", { style: { flex: 1, minWidth: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" } }, r.userName),
                React2.createElement("span", {
                  style: { color: r.online ? "#43b581" : "#72767d", fontSize: "11px" }
                }, r.online ? r.statusLabel : fmtSilence(r.silenceMs))
              )
            );
            const content = React2.createElement(
              "div",
              { style: { maxHeight: "60vh", overflowY: "auto" } },
              React2.createElement("div", {
                style: { color: "#b5bac1", fontSize: "13px", marginBottom: "10px", lineHeight: 1.4 }
              }, summary),
              report.rows.length ? rowsUi : React2.createElement(
                "div",
                { style: { color: "#8a8a9a", fontSize: "12px", padding: "8px" } },
                "No shadows deployed."
              )
            );
            BdApi.UI.showConfirmationModal(
              monarch ? "Shadow Muster" : "Roll Call",
              content,
              { confirmText: "Dismiss", cancelText: null }
            );
          } catch (err) {
            (_b = pluginRef.debugError) == null ? void 0 : _b.call(pluginRef, "DeploymentsTab", "Muster failed:", err);
          }
        }, []);
        const handleTogglePriority = useCallback((deployment, enabled) => {
          var _a;
          try {
            const dm = pluginRef.deploymentManager;
            if (!(dm == null ? void 0 : dm.setPriorityForUser)) return;
            const res = dm.setPriorityForUser(deployment.targetUserId, enabled);
            if (res == null ? void 0 : res.changed) setDeployments(dm.getDeployments());
          } catch (err) {
            (_a = pluginRef.debugError) == null ? void 0 : _a.call(pluginRef, "DeploymentsTab", "Toggle priority failed:", err);
          }
        }, []);
        const handleDossier = useCallback((deployment) => {
          var _a, _b, _c;
          try {
            const engine = pluginRef.sensesEngine;
            if (!(engine == null ? void 0 : engine.buildTargetDossier)) return;
            const { text, count, userName } = engine.buildTargetDossier(deployment.targetUserId);
            const notify = (msg, type) => {
              try {
                if (typeof pluginRef._toast === "function") pluginRef._toast(msg, type);
                else BdApi.UI.showToast(msg, { type });
              } catch (_) {
              }
            };
            const copy = (_b = (_a = navigator == null ? void 0 : navigator.clipboard) == null ? void 0 : _a.writeText) == null ? void 0 : _b.call(_a, text);
            if (copy && typeof copy.then === "function") {
              copy.then(
                () => notify(`Dossier copied: ${count} entr${count === 1 ? "y" : "ies"} on ${userName}`, "success"),
                () => notify("Dossier: clipboard write blocked by Discord.", "error")
              );
            } else {
              notify("Dossier: clipboard unavailable.", "error");
            }
          } catch (err) {
            (_c = pluginRef.debugError) == null ? void 0 : _c.call(pluginRef, "DeploymentsTab", "Dossier failed:", err);
          }
        }, []);
        if (deployments.length === 0) {
          return ce(
            "div",
            { style: { padding: "16px", textAlign: "center" } },
            ce(
              "div",
              { className: "shadow-senses-empty" },
              "No shadows deployed. Right-click a user to deploy a shadow."
            ),
            ce("button", {
              className: "shadow-senses-deploy-btn",
              onClick: onDeployNew,
              ref: _applyDeployButtonStyle,
              onMouseEnter: _deployBtnHoverIn,
              onMouseLeave: _deployBtnHoverOut
            }, "+ Deploy New Shadow")
          );
        }
        return ce(
          "div",
          { style: { padding: "10px 16px 16px", maxHeight: "50vh", overflowY: "auto" } },
          ce(
            "div",
            { style: { display: "flex", justifyContent: "flex-end", marginBottom: 8 } },
            ce("button", {
              title: "Muster \u2014 the army's current read on every watched target",
              onClick: handleMuster,
              ref: (el) => {
                if (!el) return;
                el.style.setProperty("background", "rgba(138,43,226,0.14)", "important");
                el.style.setProperty("color", "#d4b0ff", "important");
                el.style.setProperty("border", "1px solid rgba(138,43,226,0.45)", "important");
                el.style.setProperty("border-radius", "2px", "important");
                el.style.setProperty("padding", "4px 12px", "important");
                el.style.setProperty("font-family", "'gg sans', system-ui, sans-serif", "important");
                el.style.setProperty("font-size", "10px", "important");
                el.style.setProperty("font-weight", "800", "important");
                el.style.setProperty("letter-spacing", "0.06em", "important");
                el.style.setProperty("text-transform", "uppercase", "important");
                el.style.setProperty("cursor", "pointer", "important");
                el.style.setProperty("outline", "none", "important");
                el.style.setProperty("box-shadow", "none", "important");
              }
            }, "\u2694 Muster")
          ),
          deployments.map(
            (d) => ce(DeploymentRow, {
              key: d.shadowId,
              deployment: d,
              onRecall: handleRecall,
              onToggleFocus: handleToggleFocus,
              onDossier: handleDossier,
              onTogglePriority: handleTogglePriority
            })
          ),
          ce(
            "div",
            { style: { display: "flex", justifyContent: "center", marginTop: 12 } },
            ce("button", {
              className: "shadow-senses-deploy-btn",
              onClick: onDeployNew,
              ref: _applyDeployButtonStyle,
              onMouseEnter: _deployBtnHoverIn,
              onMouseLeave: _deployBtnHoverOut
            }, "+ Deploy New Shadow")
          )
        );
      }
      const applyTargetCard = (el) => {
        if (!el) return;
        el.style.setProperty("background", "rgba(38, 28, 60, 0.85)", "important");
        el.style.setProperty("border", "1px solid rgba(138, 43, 226, 0.32)", "important");
        el.style.setProperty("border-radius", "2px", "important");
        el.style.setProperty("padding", "12px 14px", "important");
        el.style.setProperty("margin", "0 0 10px 0", "important");
        el.style.setProperty("box-shadow", "inset 0 1px 0 rgba(138, 43, 226, 0.12), 0 2px 6px rgba(0, 0, 0, 0.45)", "important");
      };
      const applyChip = (el) => {
        if (!el) return;
        el.style.setProperty("display", "inline-flex", "important");
        el.style.setProperty("align-items", "center", "important");
        el.style.setProperty("gap", "6px", "important");
        el.style.setProperty("background", "rgba(52, 211, 153, 0.14)", "important");
        el.style.setProperty("color", "#34d399", "important");
        el.style.setProperty("border", "1px solid rgba(52, 211, 153, 0.35)", "important");
        el.style.setProperty("border-radius", "2px", "important");
        el.style.setProperty("padding", "3px 4px 3px 10px", "important");
        el.style.setProperty("font-family", "'gg sans', system-ui, sans-serif", "important");
        el.style.setProperty("font-size", "12px", "important");
        el.style.setProperty("font-weight", "500", "important");
        el.style.setProperty("line-height", "1.3", "important");
      };
      const applyChipRemove = (el) => {
        if (!el) return;
        el.style.setProperty("background", "transparent", "important");
        el.style.setProperty("color", "rgba(52, 211, 153, 0.7)", "important");
        el.style.setProperty("border", "none", "important");
        el.style.setProperty("border-radius", "999px", "important");
        el.style.setProperty("width", "16px", "important");
        el.style.setProperty("height", "16px", "important");
        el.style.setProperty("padding", "0", "important");
        el.style.setProperty("display", "inline-flex", "important");
        el.style.setProperty("align-items", "center", "important");
        el.style.setProperty("justify-content", "center", "important");
        el.style.setProperty("font-size", "13px", "important");
        el.style.setProperty("font-weight", "700", "important");
        el.style.setProperty("line-height", "1", "important");
        el.style.setProperty("cursor", "pointer", "important");
        el.style.setProperty("outline", "none", "important");
        el.style.setProperty("box-shadow", "none", "important");
        el.style.setProperty("transition", "background 0.12s ease, color 0.12s ease", "important");
      };
      const applyKwInput = (el) => {
        if (!el) return;
        el.style.setProperty("flex", "1", "important");
        el.style.setProperty("min-width", "0", "important");
        el.style.setProperty("background", "rgba(20, 14, 36, 0.7)", "important");
        el.style.setProperty("color", "#e8e3f5", "important");
        el.style.setProperty("border", "1px solid rgba(138, 43, 226, 0.25)", "important");
        el.style.setProperty("border-radius", "2px", "important");
        el.style.setProperty("padding", "6px 10px", "important");
        el.style.setProperty("font-family", "'gg sans', system-ui, sans-serif", "important");
        el.style.setProperty("font-size", "12px", "important");
        el.style.setProperty("outline", "none", "important");
        el.style.setProperty("box-shadow", "none", "important");
        el.style.setProperty("transition", "border-color 0.15s ease", "important");
      };
      const applySmallPill = (color, bg, border) => (el) => {
        if (!el) return;
        el.style.setProperty("background", bg, "important");
        el.style.setProperty("color", color, "important");
        el.style.setProperty("border", `1px solid ${border}`, "important");
        el.style.setProperty("border-radius", "2px", "important");
        el.style.setProperty("padding", "5px 12px", "important");
        el.style.setProperty("font-family", "'gg sans', system-ui, sans-serif", "important");
        el.style.setProperty("font-size", "11px", "important");
        el.style.setProperty("font-weight", "600", "important");
        el.style.setProperty("letter-spacing", "0.04em", "important");
        el.style.setProperty("text-transform", "uppercase", "important");
        el.style.setProperty("cursor", "pointer", "important");
        el.style.setProperty("outline", "none", "important");
        el.style.setProperty("box-shadow", "none", "important");
        el.style.setProperty("white-space", "nowrap", "important");
        el.style.setProperty("transition", "background 0.15s ease, border-color 0.15s ease", "important");
      };
      function KeywordAlertsTab() {
        const [deployments, setDeployments] = useState([]);
        const [keywordDrafts, setKeywordDrafts] = useState({});
        const [keywordsByUser, setKeywordsByUser] = useState({});
        const snapshotRef = useRef("");
        const readDeployments = useCallback(() => {
          var _a, _b;
          const source = ((_b = (_a = pluginRef.deploymentManager) == null ? void 0 : _a.getDeployments) == null ? void 0 : _b.call(_a)) || [];
          return [...source].sort((left, right) => deploymentSortName(left).localeCompare(deploymentSortName(right)));
        }, []);
        const syncDeployments = useCallback((force = false) => {
          try {
            const nextDeployments = readDeployments();
            const nextSnapshot = buildDeploymentSnapshot(nextDeployments);
            if (!force && nextSnapshot === snapshotRef.current) return;
            snapshotRef.current = nextSnapshot;
            setDeployments(nextDeployments);
            setKeywordDrafts((previous) => {
              const next = {};
              for (const deployment of nextDeployments) {
                const userId = String(deployment.targetUserId || "");
                if (!userId) continue;
                next[userId] = previous[userId] ?? "";
              }
              return next;
            });
            setKeywordsByUser((previous) => {
              const next = {};
              for (const deployment of nextDeployments) {
                const userId = String(deployment.targetUserId || "");
                if (!userId) continue;
                if (Array.isArray(previous[userId])) {
                  next[userId] = previous[userId];
                } else {
                  next[userId] = parseKeywordInput((deployment.alertKeywords || []).join(","));
                }
              }
              return next;
            });
          } catch (error) {
            pluginRef.debugError("KeywordAlertsTab", "Failed to sync deployments", error);
          }
        }, [readDeployments]);
        useEffect(() => {
          syncDeployments(true);
          const dm = pluginRef.deploymentManager;
          if (!dm || !dm._bus) return void 0;
          const refresh = () => {
            if (document.hidden) return;
            syncDeployments(false);
          };
          dm._bus.addEventListener("change", refresh);
          return () => dm._bus.removeEventListener("change", refresh);
        }, [syncDeployments]);
        const persistKeywords = useCallback((userId, nextKeywords, successMessage) => {
          const normalizedUserId = String(userId || "");
          if (!normalizedUserId || !pluginRef.deploymentManager) return false;
          try {
            const sanitized = parseKeywordInput((nextKeywords || []).join(","));
            const result = pluginRef.deploymentManager.setAlertKeywordsForUser(normalizedUserId, sanitized);
            if (!result || !result.ok) {
              pluginRef._toast("Unable to save keyword alerts for this target", "error", 2800);
              return false;
            }
            setKeywordsByUser((previous) => ({ ...previous, [normalizedUserId]: sanitized }));
            syncDeployments(true);
            if (result.changed && successMessage) {
              pluginRef._toast(successMessage, "success", 1800);
            } else if (!result.changed) {
              pluginRef._toast("No changes", "info", 1200);
            }
            return true;
          } catch (error) {
            pluginRef.debugError("KeywordAlertsTab", "Failed to persist keywords", error);
            pluginRef._toast("Failed to save keyword alerts", "error", 3e3);
            return false;
          }
        }, [syncDeployments]);
        const addKeywordsForUser = useCallback((userId) => {
          const normalizedUserId = String(userId || "");
          const rawDraft = keywordDrafts[normalizedUserId] || "";
          if (!rawDraft.trim()) return;
          const currentKeywords = keywordsByUser[normalizedUserId] || [];
          const merged = mergeKeywords(currentKeywords, rawDraft);
          if (merged.length === currentKeywords.length) {
            setKeywordDrafts((previous) => ({ ...previous, [normalizedUserId]: "" }));
            pluginRef._toast("No new keywords added", "info", 1500);
            return;
          }
          setKeywordDrafts((previous) => ({ ...previous, [normalizedUserId]: "" }));
          persistKeywords(
            normalizedUserId,
            merged,
            `Saved ${merged.length} keyword${merged.length === 1 ? "" : "s"}`
          );
        }, [keywordDrafts, keywordsByUser, persistKeywords]);
        const removeKeywordForUser = useCallback((userId, keyword) => {
          const normalizedUserId = String(userId || "");
          const currentKeywords = keywordsByUser[normalizedUserId] || [];
          const reduced = removeKeyword(currentKeywords, keyword);
          persistKeywords(
            normalizedUserId,
            reduced,
            reduced.length > 0 ? `Saved ${reduced.length} keyword${reduced.length === 1 ? "" : "s"}` : "Cleared keyword alerts"
          );
        }, [keywordsByUser, persistKeywords]);
        const clearKeywordsForUser = useCallback((userId) => {
          const normalizedUserId = String(userId || "");
          setKeywordDrafts((previous) => ({ ...previous, [normalizedUserId]: "" }));
          persistKeywords(normalizedUserId, [], "Cleared keyword alerts");
        }, [persistKeywords]);
        if (deployments.length === 0) {
          return ce(
            "div",
            { className: "shadow-senses-empty" },
            "No monitored targets yet. Deploy a shadow first, then add per-target keywords."
          );
        }
        return ce(
          "div",
          { style: { padding: "12px 16px 16px", maxHeight: "50vh", overflowY: "auto" } },
          ce("div", {
            style: {
              color: "rgba(181, 186, 193, 0.7)",
              fontSize: "12px",
              lineHeight: 1.5,
              marginBottom: "10px",
              fontFamily: "'gg sans', system-ui, sans-serif"
            }
          }, "Manage keywords per monitored target. Matching is case-insensitive and uses contains logic (not exact match)."),
          ce("div", {
            style: {
              color: "rgba(181, 186, 193, 0.45)",
              fontSize: "10px",
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              marginBottom: "12px",
              fontFamily: "'gg sans', system-ui, sans-serif"
            }
          }, `${deployments.length} monitored target${deployments.length === 1 ? "" : "s"}`),
          deployments.map((deployment) => {
            const userId = String(deployment.targetUserId || "");
            const rankColor = RANK_COLORS[deployment.shadowRank] || "#8a2be2";
            const draftValue = keywordDrafts[userId] ?? "";
            const userKeywords = keywordsByUser[userId] || [];
            let targetLabel = deployment.targetUsername;
            try {
              const engine = pluginRef.sensesEngine;
              if (engine == null ? void 0 : engine._resolveUserName) targetLabel = engine._resolveUserName(userId, deployment.targetUsername);
            } catch (_) {
            }
            const HB_KW = {
              fontFamily: "'gg sans', 'Helvetica Neue', system-ui, sans-serif",
              fontSize: "13px",
              lineHeight: 1.3
            };
            return ce(
              "div",
              {
                key: deployment.shadowId,
                className: "shadow-senses-keyword-target",
                ref: applyTargetCard
              },
              ce(
                "div",
                {
                  className: "shadow-senses-keyword-target-head",
                  style: { display: "flex", alignItems: "center", justifyContent: "space-between", gap: "12px", marginBottom: "10px" }
                },
                ce(
                  "div",
                  {
                    style: { display: "flex", alignItems: "center", gap: "8px", flex: 1, minWidth: 0 }
                  },
                  ce("span", { style: { ...HB_KW, color: rankColor, fontWeight: 700, letterSpacing: "0.03em" } }, `[${deployment.shadowRank}]`),
                  ce("span", { style: { ...HB_KW, color: "#d4b0ff", fontWeight: 600 } }, deployment.shadowName),
                  ce("span", { style: { ...HB_KW, color: "#5a5a6e" } }, "\u2192"),
                  ce("span", { style: { ...HB_KW, color: "#8a2be2", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" } }, targetLabel)
                ),
                ce("span", {
                  className: "shadow-senses-keyword-count",
                  style: {
                    fontFamily: "'gg sans', system-ui, sans-serif",
                    fontSize: "10px",
                    fontWeight: 600,
                    color: userKeywords.length > 0 ? "#34d399" : "rgba(181, 186, 193, 0.4)",
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                    whiteSpace: "nowrap",
                    background: userKeywords.length > 0 ? "rgba(52, 211, 153, 0.12)" : "rgba(138, 43, 226, 0.08)",
                    border: `1px solid ${userKeywords.length > 0 ? "rgba(52, 211, 153, 0.3)" : "rgba(138, 43, 226, 0.18)"}`,
                    borderRadius: "2px",
                    padding: "2px 10px"
                  }
                }, `${userKeywords.length} keyword${userKeywords.length === 1 ? "" : "s"}`)
              ),
              ce(
                "div",
                {
                  className: "shadow-senses-keyword-list",
                  style: { display: "flex", flexWrap: "wrap", gap: "6px", marginBottom: "10px", minHeight: "24px", alignItems: "center" }
                },
                userKeywords.length === 0 ? ce("div", {
                  className: "shadow-senses-keyword-empty",
                  style: { color: "rgba(181, 186, 193, 0.4)", fontSize: "12px", fontStyle: "italic", fontFamily: "'gg sans', system-ui, sans-serif" }
                }, "No keywords set yet.") : userKeywords.map(
                  (keyword) => ce(
                    "span",
                    {
                      key: `${userId}:${keyword.toLowerCase()}`,
                      className: "shadow-senses-keyword-chip",
                      ref: applyChip
                    },
                    ce("span", { style: { whiteSpace: "nowrap" } }, keyword),
                    ce("button", {
                      type: "button",
                      className: "shadow-senses-keyword-chip-remove",
                      title: `Remove "${keyword}"`,
                      ref: applyChipRemove,
                      onClick: () => removeKeywordForUser(userId, keyword),
                      onMouseEnter: (e) => {
                        e.currentTarget.style.setProperty("background", "rgba(239, 68, 68, 0.25)", "important");
                        e.currentTarget.style.setProperty("color", "#f87171", "important");
                      },
                      onMouseLeave: (e) => {
                        e.currentTarget.style.setProperty("background", "transparent", "important");
                        e.currentTarget.style.setProperty("color", "rgba(52, 211, 153, 0.7)", "important");
                      }
                    }, "\xD7")
                  )
                )
              ),
              ce(
                "div",
                {
                  className: "shadow-senses-keyword-input-row",
                  style: { display: "flex", alignItems: "center", gap: "6px" }
                },
                ce("input", {
                  type: "text",
                  className: "shadow-senses-keyword-input",
                  value: draftValue,
                  placeholder: "Add keyword (or comma-separated list)",
                  ref: applyKwInput,
                  onFocus: (e) => {
                    e.currentTarget.style.setProperty("border-color", "rgba(138, 43, 226, 0.55)", "important");
                  },
                  onBlur: (e) => {
                    e.currentTarget.style.setProperty("border-color", "rgba(138, 43, 226, 0.25)", "important");
                  },
                  onChange: (event) => {
                    var _a;
                    const value = ((_a = event == null ? void 0 : event.target) == null ? void 0 : _a.value) ?? "";
                    setKeywordDrafts((prev) => ({ ...prev, [userId]: value }));
                  },
                  onKeyDown: (event) => {
                    if (event.key !== "Enter") return;
                    event.preventDefault();
                    addKeywordsForUser(userId);
                  }
                }),
                ce("button", {
                  className: "shadow-senses-deploy-btn shadow-senses-keyword-add-btn",
                  onClick: () => addKeywordsForUser(userId),
                  title: "Add keyword(s)",
                  ref: applySmallPill("#d4b0ff", "rgba(138, 43, 226, 0.18)", "rgba(138, 43, 226, 0.45)"),
                  onMouseEnter: (e) => {
                    e.currentTarget.style.setProperty("background", "rgba(138, 43, 226, 0.32)", "important");
                    e.currentTarget.style.setProperty("border-color", "rgba(138, 43, 226, 0.7)", "important");
                  },
                  onMouseLeave: (e) => {
                    e.currentTarget.style.setProperty("background", "rgba(138, 43, 226, 0.18)", "important");
                    e.currentTarget.style.setProperty("border-color", "rgba(138, 43, 226, 0.45)", "important");
                  }
                }, "Add"),
                ce("button", {
                  className: "shadow-senses-recall-btn shadow-senses-keyword-clear-btn",
                  onClick: () => clearKeywordsForUser(userId),
                  title: "Clear all keywords",
                  ref: applySmallPill("#f87171", "rgba(239, 68, 68, 0.12)", "rgba(239, 68, 68, 0.35)"),
                  onMouseEnter: (e) => {
                    e.currentTarget.style.setProperty("background", "rgba(239, 68, 68, 0.22)", "important");
                    e.currentTarget.style.setProperty("border-color", "rgba(239, 68, 68, 0.55)", "important");
                  },
                  onMouseLeave: (e) => {
                    e.currentTarget.style.setProperty("background", "rgba(239, 68, 68, 0.12)", "important");
                    e.currentTarget.style.setProperty("border-color", "rgba(239, 68, 68, 0.35)", "important");
                  }
                }, "Clear All")
              )
            );
          })
        );
      }
      function SensesPanel({ onClose, embedded }) {
        var _a;
        const [activeTab, setActiveTab] = useState("feed");
        const handleOverlayClick = useCallback((e) => {
          if (e.target === e.currentTarget) onClose();
        }, [onClose]);
        const handleNavigate = useCallback((entry) => {
          if (!entry.guildId || !entry.channelId) {
            onClose();
            return;
          }
          const path2 = entry.messageId ? `/channels/${entry.guildId}/${entry.channelId}/${entry.messageId}` : `/channels/${entry.guildId}/${entry.channelId}`;
          onClose();
          pluginRef.teleportToPath(path2, {
            guildId: entry.guildId,
            channelId: entry.channelId,
            messageId: entry.messageId || null
          });
        }, [onClose]);
        const handleDeployNew = useCallback(() => {
          pluginRef._toast("Right-click a user to deploy a shadow");
        }, []);
        const deployCount = pluginRef.deploymentManager ? pluginRef.deploymentManager.getDeploymentCount() : 0;
        const onlineMarkedCount = pluginRef.sensesEngine ? pluginRef.sensesEngine.getMarkedOnlineCount() : 0;
        const msgCount = pluginRef.sensesEngine ? pluginRef.sensesEngine.getTotalDetections() : 0;
        const SS = embedded ? {
          panel: {
            background: "transparent",
            border: "none",
            borderRadius: 0,
            width: "100%",
            maxWidth: "none",
            maxHeight: "none",
            boxShadow: "none",
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
            // Default font for the embedded panel. Title gets the brand font
            // via its own inline style override below; everything else
            // inherits from here.
            fontFamily: "'gg sans', 'Helvetica Neue', system-ui, sans-serif"
          },
          header: {
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "14px 16px 8px",
            borderBottom: "1px solid rgba(138,43,226,0.25)"
          },
          title: {
            margin: 0,
            color: "#d4b0ff",
            fontSize: "16px",
            fontWeight: 700,
            letterSpacing: "0.04em",
            textTransform: "uppercase"
          },
          closeBtn: {
            background: "transparent",
            border: "none",
            color: "rgba(181,186,193,0.7)",
            fontSize: "16px",
            cursor: "pointer",
            padding: "4px 8px",
            borderRadius: 0,
            outline: "none",
            boxShadow: "none",
            fontFamily: "inherit"
          },
          tabs: {
            display: "flex",
            gap: "4px",
            padding: "0 12px",
            borderBottom: "1px solid rgba(138,43,226,0.25)",
            background: "transparent"
          },
          tab: (isActive) => ({
            background: isActive ? "rgba(138,43,226,0.12)" : "transparent",
            border: "none",
            borderBottom: `2px solid ${isActive ? "#8a2be2" : "transparent"}`,
            color: isActive ? "#d4b0ff" : "rgba(181,186,193,0.6)",
            fontSize: "12px",
            fontWeight: 600,
            padding: "8px 14px",
            cursor: "pointer",
            borderRadius: 0,
            outline: "none",
            boxShadow: "none",
            fontFamily: "inherit",
            letterSpacing: "0.03em"
          }),
          footer: {
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "12px",
            padding: "10px 16px",
            borderTop: "1px solid rgba(138,43,226,0.2)",
            color: "rgba(181,186,193,0.55)",
            fontSize: "11px"
          },
          footerSpan: { whiteSpace: "nowrap" }
        } : null;
        const panelEl = ce(
          "div",
          {
            className: `shadow-senses-panel${embedded ? " shadow-senses-panel--embedded" : ""}`,
            style: SS == null ? void 0 : SS.panel
          },
          ce(
            "div",
            { className: "shadow-senses-panel-header", style: SS == null ? void 0 : SS.header },
            ce("h2", { className: "shadow-senses-panel-title", style: SS == null ? void 0 : SS.title }, "Shadow Senses"),
            ce("button", {
              className: "shadow-senses-close-btn",
              style: SS == null ? void 0 : SS.closeBtn,
              onClick: onClose
            }, "\u2715")
          ),
          ce(
            "div",
            { className: "shadow-senses-tabs", style: SS == null ? void 0 : SS.tabs },
            ce("button", {
              className: `shadow-senses-tab${activeTab === "feed" ? " active" : ""}`,
              style: SS ? SS.tab(activeTab === "feed") : void 0,
              onClick: () => setActiveTab("feed")
            }, "Active Feed"),
            ce("button", {
              className: `shadow-senses-tab${activeTab === "deployments" ? " active" : ""}`,
              style: SS ? SS.tab(activeTab === "deployments") : void 0,
              onClick: () => setActiveTab("deployments")
            }, "Deployments"),
            ce("button", {
              className: `shadow-senses-tab${activeTab === "keywords" ? " active" : ""}`,
              style: SS ? SS.tab(activeTab === "keywords") : void 0,
              onClick: () => setActiveTab("keywords")
            }, "Keyword Alerts")
          ),
          activeTab === "feed" ? ce(FeedTab, { onNavigate: handleNavigate }) : activeTab === "deployments" ? ce(DeploymentsTab, { onRecall: null, onDeployNew: handleDeployNew }) : ce(KeywordAlertsTab),
          ce(
            "div",
            { className: "shadow-senses-footer", style: SS == null ? void 0 : SS.footer },
            ce(
              "span",
              { style: SS == null ? void 0 : SS.footerSpan },
              ((_a = pluginRef.settings) == null ? void 0 : _a.showMarkedOnlineCount) ? `${deployCount} deployed \u2022 ${onlineMarkedCount} online` : `${deployCount} shadow${deployCount !== 1 ? "s" : ""} deployed`
            ),
            ce(
              "span",
              { style: SS == null ? void 0 : SS.footerSpan },
              `${msgCount.toLocaleString()} detection${msgCount !== 1 ? "s" : ""}`
            )
          )
        );
        if (embedded) return panelEl;
        return ce("div", {
          className: "shadow-senses-overlay",
          onClick: handleOverlayClick
        }, panelEl);
      }
      return { SensesPanel };
    }
    module2.exports = { buildComponents: buildComponents2 };
  }
});

// src/ShadowSenses/styles.js
var require_styles = __commonJS({
  "src/ShadowSenses/styles.js"(exports2, module2) {
    function buildPortalTransitionCSS() {
      return `
/* Portal transition CSS (overlay/canvas/shard) moved to
   ShadowPortalCore/transition-css.js \u2014 injected ONCE via the portal-core
   consumer refcount instead of duplicated per-plugin (2026-07-13). */
`;
    }
    function buildCSS() {
      return `
${buildPortalTransitionCSS()}

/* \u2500\u2500 SL-themed scrollbar for the header popup (overrides macOS default) \u2500\u2500\u2500\u2500 */
#shadow-senses-header-popup::-webkit-scrollbar {
  width: 9px;
}
#shadow-senses-header-popup::-webkit-scrollbar-track {
  background: rgba(8, 8, 13, 0.6);
}
#shadow-senses-header-popup::-webkit-scrollbar-thumb {
  background: linear-gradient(180deg, rgba(138, 43, 226, 0.6) 0%, rgba(138, 43, 226, 0.38) 100%);
  border: 1px solid rgba(138, 43, 226, 0.35);
  border-radius: 2px;
}
#shadow-senses-header-popup::-webkit-scrollbar-thumb:hover {
  background: linear-gradient(180deg, rgba(186, 85, 211, 0.75) 0%, rgba(138, 43, 226, 0.5) 100%);
}

/* \u2500\u2500 Font Override \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */

/* Brand font: scoped to the panel TITLE only.
   Previous version cascaded the chunky Persona-5 'Friend or Foe BB' onto
   every descendant via .shadow-senses-panel * { ... !important }. That
   wide-letter-form font extended each header span's glyph advance past
   the flex gap, smushing username/server/channel/timestamp together
   despite the gap rule. Defeating the cascade also lets future inline
   style props win without needing !important.
   Body content now inherits Discord's gg sans system font for legibility. */
.shadow-senses-panel-title,
.shadow-senses-brand-font {
  font-family: 'Friend or Foe BB', 'gg sans', sans-serif !important;
  letter-spacing: 0.02em;
}

.shadow-senses-panel,
#shadow-senses-header-popup,
.shadow-senses-feed-card,
.shadow-senses-deploy-row {
  font-family: 'gg sans', 'Helvetica Neue', system-ui, sans-serif;
}

/* \u2500\u2500\u2500 Overlay \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */

.shadow-senses-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.85);
  z-index: 10002;
  display: flex;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(5px);
}

/* \u2500\u2500\u2500 Panel \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */

.shadow-senses-panel {
  background: rgba(10, 10, 16, 0.98);
  border: 1px solid rgba(138, 43, 226, 0.4);
  border-radius: 2px;
  width: 700px;
  max-width: 95vw;
  max-height: 80vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  box-shadow: 0 8px 32px rgba(138, 43, 226, 0.3);
}

.shadow-senses-panel-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 20px;
  border-bottom: 1px solid rgba(138, 43, 226, 0.3);
}

.shadow-senses-panel-title {
  color: #8a2be2;
  font-size: 18px;
  font-weight: 700;
  margin: 0;
}

.shadow-senses-close-btn {
  background: transparent;
  border: none;
  color: rgba(181, 186, 193, 0.5);
  font-size: 20px;
  cursor: pointer;
  padding: 4px 8px;
  border-radius: 2px;
  transition: color 0.15s ease;
}

.shadow-senses-close-btn:hover {
  color: #fff;
}

/* \u2500\u2500\u2500 Tabs \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */

.shadow-senses-tabs {
  display: flex;
  border-bottom: 1px solid rgba(138, 43, 226, 0.2);
  padding: 0 20px;
}

.shadow-senses-tab {
  background: transparent;
  border: none;
  border-bottom: 2px solid transparent;
  color: rgba(181, 186, 193, 0.5);
  font-size: 13px;
  font-weight: 600;
  padding: 10px 16px;
  cursor: pointer;
  transition: color 0.15s ease, border-color 0.15s ease;
}

.shadow-senses-tab:hover {
  color: rgba(181, 186, 193, 0.7);
}

.shadow-senses-tab.active {
  color: #8a2be2;
  border-bottom-color: #8a2be2;
}

/* \u2500\u2500\u2500 Feed Card \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */

.shadow-senses-feed-card {
  background: rgba(38, 28, 60, 0.85);
  border: 1px solid rgba(138, 43, 226, 0.32);
  border-radius: 2px;
  padding: 12px 14px;
  margin: 0 0 10px;
  cursor: pointer;
  box-shadow: inset 0 1px 0 rgba(138, 43, 226, 0.12), 0 2px 6px rgba(0, 0, 0, 0.45);
  transition: background 0.15s ease, border-color 0.15s ease, transform 0.15s ease;
}

/* ID-scoped to win against any external !important rule that might
   set background on #app-mount div or similar generic selectors.
   Specificity (1,1,0) beats (1,0,1). */
#shadow-senses-header-popup .shadow-senses-feed-card {
  background: rgba(38, 28, 60, 0.85) !important;
  border: 1px solid rgba(138, 43, 226, 0.32) !important;
  border-radius: 2px !important;
  padding: 12px 14px !important;
  margin: 0 0 10px !important;
  box-shadow: inset 0 1px 0 rgba(138, 43, 226, 0.12), 0 2px 6px rgba(0, 0, 0, 0.45) !important;
}

#shadow-senses-header-popup .shadow-senses-feed-card:hover {
  background: rgba(52, 38, 80, 0.92) !important;
  border-color: rgba(138, 43, 226, 0.55) !important;
}

.shadow-senses-feed-card:hover {
  background: rgba(40, 28, 65, 0.7);
  border-color: rgba(138, 43, 226, 0.4);
  transform: translateX(1px);
}

.shadow-senses-feed-card-header {
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  gap: 6px 10px;
  margin-bottom: 6px;
}

.shadow-senses-feed-content {
  font-family: 'gg sans', system-ui, sans-serif !important;
  font-size: 14px;
  font-weight: 400;
  line-height: 1.45;
  color: #e8e3f5;
  word-wrap: break-word;
  overflow-wrap: anywhere;
  margin: 2px 0 0;
}

/* \u2500\u2500\u2500 ID-scoped overrides \u2014 defeat SoloLevelingTheme global font rules \u2500\u2500\u2500\u2500\u2500
   Two competing !important font-family rules ship from theme assets:
     1. SoloLeveling-ClearVision.theme.css :
          *:where(...) { font-family: 'Friend or Foe BB' !important }
        Specificity (0,0,0) due to :where() \u2014 easy to beat.
     2. SoloLevelingTheme.plugin.js :
          #app-mount div { font-family: 'Friend or Foe BB' !important }
        Specificity (1,0,1) + !important \u2014 this is the one that was
        keeping the message bodies in chunky bold Persona-5 despite the
        plain .shadow-senses-feed-content rule above (only 0,0,1,0).
   Prefixing with the popup ID raises specificity to (1,1,1) which beats
   (1,0,1). Same trick used for header bits + "First: ..." quote so the
   theme's div rule can't reach into the popup. */
#shadow-senses-header-popup .shadow-senses-feed-content,
#shadow-senses-header-popup .shadow-senses-feed-card-header,
#shadow-senses-header-popup .shadow-senses-feed-card-header *,
#shadow-senses-header-popup .shadow-senses-empty,
#shadow-senses-header-popup .shadow-senses-footer,
#shadow-senses-header-popup .shadow-senses-footer *,
#shadow-senses-header-popup .shadow-senses-tabs *,
#shadow-senses-header-popup .shadow-senses-deploy-row,
#shadow-senses-header-popup .shadow-senses-deploy-row *,
#shadow-senses-header-popup .shadow-senses-keyword-target,
#shadow-senses-header-popup .shadow-senses-keyword-target * {
  font-family: 'gg sans', 'Helvetica Neue', system-ui, sans-serif !important;
  font-weight: inherit !important;
  letter-spacing: normal !important;
}

/* The message body specifically wants 400 weight \u2014 defeating both theme
   font-family AND any inherited bold from the cascade. */
#shadow-senses-header-popup .shadow-senses-feed-content {
  font-weight: 400 !important;
}

/* \u2500\u2500\u2500 Deploy / Recall \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */

.shadow-senses-deploy-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 12px;
  background: rgba(20, 20, 40, 0.4);
  border-radius: 2px;
  margin: 4px 0;
  border: 1px solid rgba(138, 43, 226, 0.1);
}

.shadow-senses-deploy-info {
  display: flex;
  align-items: center;
  gap: 8px;
  color: #ccc;
  font-size: 13px;
}

.shadow-senses-deploy-rank {
  font-weight: 700;
  font-size: 12px;
  min-width: 24px;
  text-align: center;
}

.shadow-senses-deploy-arrow {
  color: #666;
  font-size: 14px;
}

.shadow-senses-deploy-target {
  color: #8a2be2;
  font-weight: 600;
}

.shadow-senses-recall-btn {
  background: rgba(239, 68, 68, 0.15);
  border: 1px solid #ef4444;
  color: #ef4444;
  font-size: 12px;
  font-weight: 600;
  padding: 4px 12px;
  border-radius: 2px;
  cursor: pointer;
  transition: background 0.15s ease;
}

.shadow-senses-recall-btn:hover {
  background: rgba(239, 68, 68, 0.3);
}

.shadow-senses-deploy-btn {
  background: rgba(138, 43, 226, 0.15);
  border: 1px solid rgba(138, 43, 226, 0.4);
  color: #8a2be2;
  font-size: 13px;
  font-weight: 600;
  padding: 8px 16px;
  border-radius: 2px;
  cursor: pointer;
  width: 100%;
  text-align: center;
  transition: background 0.15s ease;
}

.shadow-senses-deploy-btn:hover {
  background: rgba(138, 43, 226, 0.3);
}

/* \u2500\u2500\u2500 Keyword Alerts \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */

.shadow-senses-keyword-target {
  background: linear-gradient(180deg, rgba(12, 9, 20, 0.92), rgba(8, 6, 14, 0.95));
  border: 1px solid rgba(138, 43, 226, 0.35);
  border-radius: 2px;
  padding: 10px 12px;
  margin: 6px 0;
  box-shadow: inset 0 0 0 1px rgba(138, 43, 226, 0.06), 0 0 14px rgba(138, 43, 226, 0.12);
}

.shadow-senses-keyword-target-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  margin-bottom: 8px;
}

.shadow-senses-keyword-count {
  color: #d3b7ff;
  font-size: 11px;
  font-weight: 700;
  padding: 2px 8px;
  border: 1px solid rgba(138, 43, 226, 0.48);
  border-radius: 2px;
  background: rgba(138, 43, 226, 0.2);
  white-space: nowrap;
  text-shadow: 0 0 6px rgba(138, 43, 226, 0.45);
}

.shadow-senses-keyword-list {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  min-height: 24px;
}

.shadow-senses-keyword-empty {
  color: #9f8fbd;
  font-size: 12px;
  font-style: italic;
}

.shadow-senses-keyword-chip {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  color: #f2e9ff;
  font-size: 12px;
  font-weight: 600;
  border: 1px solid rgba(138, 43, 226, 0.55);
  border-radius: 2px;
  background: linear-gradient(180deg, rgba(138, 43, 226, 0.34), rgba(80, 28, 146, 0.28));
  padding: 2px 8px;
  box-shadow: 0 0 8px rgba(138, 43, 226, 0.24);
}

.shadow-senses-keyword-chip-remove {
  border: none;
  background: transparent;
  color: #d8b8ff;
  cursor: pointer;
  line-height: 1;
  padding: 0;
  font-size: 14px;
}

.shadow-senses-keyword-chip-remove:hover {
  color: #fff;
}

.shadow-senses-keyword-input-row {
  display: grid;
  grid-template-columns: 1fr auto auto;
  gap: 8px;
  align-items: center;
  margin-top: 9px;
}

.shadow-senses-keyword-input {
  width: 100%;
  padding: 7px 9px;
  border-radius: 2px;
  border: 1px solid rgba(138, 43, 226, 0.5);
  background: rgba(5, 4, 10, 0.9);
  color: #ede3ff;
  font-size: 12px;
  box-sizing: border-box;
  outline: none;
  box-shadow: inset 0 0 0 1px rgba(138, 43, 226, 0.14);
}

.shadow-senses-keyword-input:focus {
  border-color: rgba(186, 85, 211, 0.9);
  box-shadow: inset 0 0 0 1px rgba(186, 85, 211, 0.24), 0 0 0 1px rgba(138, 43, 226, 0.24);
}

.shadow-senses-keyword-input::placeholder {
  color: #9c8db7;
}

.shadow-senses-keyword-add-btn {
  width: auto;
  padding: 6px 10px;
}

.shadow-senses-keyword-clear-btn {
  padding: 6px 10px;
  background: rgba(138, 43, 226, 0.12);
  border: 1px solid rgba(186, 85, 211, 0.7);
  color: #c89cff;
}

.shadow-senses-keyword-clear-btn:hover {
  background: rgba(138, 43, 226, 0.28);
  color: #fff;
}

/* \u2500\u2500\u2500 Footer \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */

.shadow-senses-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 20px;
  border-top: 1px solid rgba(138, 43, 226, 0.2);
  color: #666;
  font-size: 11px;
}

/* \u2500\u2500\u2500 Empty State \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */

.shadow-senses-empty {
  display: flex;
  align-items: center;
  justify-content: center;
  color: rgba(181, 186, 193, 0.55) !important;
  font-size: 13px !important;
  padding: 36px 24px !important;
  text-align: center !important;
  font-style: italic !important;
  letter-spacing: 0.02em !important;
  /* Override the global Persona-5 chunky font (line ~206) for empty states \u2014
     it makes the prompt text hard to read at small sizes on dark bg. */
  font-family: 'gg sans', system-ui, sans-serif !important;
  font-weight: 400 !important;
}

/* \u2500\u2500\u2500 Igris Report Modal \u2014 opaque fill \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */
/* The body content carries its own background, but the modal's outer
   frame (header with title, footer with action buttons) is transparent
   by default and lets Discord UI bleed through. Scope-target only
   modals that contain the marker class so other BD/Discord modals
   are unaffected.

   IMPORTANT \u2014 close-animation alignment. Discord runs its modal close
   animation (opacity 1 \u2192 0, ~150ms) on the INNER modal-box element,
   not on the outer [role="dialog"] wrapper. If we paint the outer
   wrapper solid, the inner box fades to opacity 0 while the outer
   wrapper's solid fill stays visible until React unmounts the DOM \u2014
   that's the 1-2 frame "afterimage" the user was seeing when clicking
   Understood. So we paint ONLY:
     1. The direct child (the modal-box itself, which fades)
     2. Inner header / footer / content (also fade with the box)
   The outer [role="dialog"] is left transparent so when the box
   fades, the entire fill leaves the screen at the same instant. */

[role="dialog"]:has(.shadowsenses-igris-report-modal) > * {
  background-color: #0d0d18 !important;
}
[role="dialog"]:has(.shadowsenses-igris-report-modal) [class*="header"],
[role="dialog"]:has(.shadowsenses-igris-report-modal) [class*="footer"],
[role="dialog"]:has(.shadowsenses-igris-report-modal) [class*="content"] {
  background-color: #0d0d18 !important;
}
/* IMPORTANT \u2014 undo the body fill INSIDE buttons. Discord wraps button
   labels in nested divs whose classes start with "contents-" (plural),
   which the [class*="content"] selector above accidentally matches.
   Higher specificity here neutralises the dark fill bleed onto labels. */
[role="dialog"]:has(.shadowsenses-igris-report-modal) button,
[role="dialog"]:has(.shadowsenses-igris-report-modal) button *,
[role="dialog"]:has(.shadowsenses-igris-report-modal) button [class*="content"] {
  background-color: transparent !important;
}
/* Footer flex-gap so Cancel/Understood don't touch \u2014 using button + button
   sibling combinator failed because Discord wraps each button in its own
   div. Apply to any flex/grid footer container that holds the buttons. */
[role="dialog"]:has(.shadowsenses-igris-report-modal) [class*="footer"] {
  gap: 12px !important;
  column-gap: 12px !important;
}

/* Buttons in the Igris modal \u2014 SoloLeveling purple aesthetic.
   Discord's default brand-colored button (Understood) gets the solid
   gradient treatment; any auxiliary buttons (Cancel etc.) get the
   subtle outline variant. */

[role="dialog"]:has(.shadowsenses-igris-report-modal) button {
  background: rgba(138, 43, 226, 0.14) !important;
  border: 1px solid rgba(138, 43, 226, 0.45) !important;
  color: #d6bcff !important;
  font-weight: 600 !important;
  letter-spacing: 0.04em !important;
  border-radius: 0 !important;
  transition: background 120ms ease, border-color 120ms ease,
              box-shadow 120ms ease, transform 80ms ease !important;
}
[role="dialog"]:has(.shadowsenses-igris-report-modal) button:hover {
  background: rgba(138, 43, 226, 0.22) !important;
  border-color: rgba(138, 43, 226, 0.65) !important;
}

/* Primary confirm ("Understood") \u2014 Discord brand class is the canonical
   confirm marker. Override its blue with the Igris purple gradient.
   No inset shadow \u2014 keep the fill flat to match the user's preference. */
[role="dialog"]:has(.shadowsenses-igris-report-modal) button[class*="colorBrand"],
[role="dialog"]:has(.shadowsenses-igris-report-modal) button[class*="confirm"],
[role="dialog"]:has(.shadowsenses-igris-report-modal) button[type="submit"] {
  background: linear-gradient(120deg,
    rgba(138, 43, 226, 0.55),
    rgba(168, 80, 255, 0.7)) !important;
  border: 1px solid rgba(180, 110, 255, 0.85) !important;
  color: #ffffff !important;
  text-shadow: 0 0 6px rgba(168, 80, 255, 0.55) !important;
  box-shadow: 0 0 12px rgba(138, 43, 226, 0.45) !important;
  border-radius: 0 !important;
}
[role="dialog"]:has(.shadowsenses-igris-report-modal) button[class*="colorBrand"]:hover,
[role="dialog"]:has(.shadowsenses-igris-report-modal) button[class*="confirm"]:hover,
[role="dialog"]:has(.shadowsenses-igris-report-modal) button[type="submit"]:hover {
  background: linear-gradient(120deg,
    rgba(168, 80, 255, 0.7),
    rgba(196, 120, 255, 0.85)) !important;
  border-color: rgba(210, 140, 255, 1) !important;
  box-shadow: 0 0 18px rgba(168, 80, 255, 0.7) !important;
}
[role="dialog"]:has(.shadowsenses-igris-report-modal) button[class*="colorBrand"]:active,
[role="dialog"]:has(.shadowsenses-igris-report-modal) button[class*="confirm"]:active,
[role="dialog"]:has(.shadowsenses-igris-report-modal) button[type="submit"]:active {
  transform: translateY(1px) !important;
}

/* \u2500\u2500\u2500 Header-popup hardening \u2014 overrides Discord/theme button defaults \u2500\u2500\u2500\u2500\u2500
   The header-anchored popup (#shadow-senses-header-popup) hosts the panel
   in embedded mode \u2014 no full-screen overlay wrapper. Discord's default
   <button> styling and SoloLevelingTheme can leak white pill backgrounds
   onto our close-btn / tab buttons; force the SL palette here with
   high specificity (#id .class) and !important. */

#shadow-senses-header-popup .shadow-senses-panel--embedded {
  background: transparent !important;
  border: none !important;
  border-radius: 0 !important;
  width: 100% !important;
  max-width: none !important;
  max-height: none !important;
  box-shadow: none !important;
}

#shadow-senses-header-popup .shadow-senses-panel-title {
  color: #d4b0ff !important;
  font-weight: 700 !important;
}

#shadow-senses-header-popup .shadow-senses-close-btn,
#shadow-senses-header-popup .shadow-senses-tab,
#shadow-senses-header-popup .shadow-senses-deploy-btn,
#shadow-senses-header-popup .shadow-senses-recall-btn {
  background: transparent !important;
  border: none !important;
  box-shadow: none !important;
  outline: none !important;
}

#shadow-senses-header-popup .shadow-senses-close-btn {
  color: rgba(181, 186, 193, 0.7) !important;
  font-size: 18px !important;
  padding: 4px 8px !important;
}

#shadow-senses-header-popup .shadow-senses-close-btn:hover {
  color: #fff !important;
  background: rgba(138, 43, 226, 0.15) !important;
}

#shadow-senses-header-popup .shadow-senses-tab {
  color: rgba(181, 186, 193, 0.6) !important;
  border-bottom: 2px solid transparent !important;
  padding: 10px 16px !important;
}

#shadow-senses-header-popup .shadow-senses-tab:hover {
  color: rgba(181, 186, 193, 0.9) !important;
  background: rgba(138, 43, 226, 0.08) !important;
}

#shadow-senses-header-popup .shadow-senses-tab.active {
  color: #d4b0ff !important;
  border-bottom-color: #8a2be2 !important;
  background: rgba(138, 43, 226, 0.12) !important;
}

#shadow-senses-header-popup .shadow-senses-tabs {
  border-bottom: 1px solid rgba(138, 43, 226, 0.25) !important;
  padding: 0 16px !important;
}

#shadow-senses-header-popup .shadow-senses-empty {
  color: rgba(181, 186, 193, 0.6) !important;
  text-align: center !important;
  padding: 32px 20px !important;
}

#shadow-senses-header-popup .shadow-senses-footer {
  color: rgba(181, 186, 193, 0.55) !important;
  border-top: 1px solid rgba(138, 43, 226, 0.2) !important;
  padding: 10px 16px !important;
  display: flex !important;
  justify-content: space-between !important;
  align-items: center !important;
  gap: 12px !important;
  font-size: 11px !important;
}

#shadow-senses-header-popup .shadow-senses-footer span {
  white-space: nowrap !important;
}
`;
    }
    module2.exports = { buildCSS };
  }
});

// src/shared/warn-once.js
var require_warn_once = __commonJS({
  "src/shared/warn-once.js"(exports2, module2) {
    function createWarnOnce() {
      const warned = /* @__PURE__ */ new Set();
      return (key, message, detail = null) => {
        if (warned.has(key)) return;
        warned.add(key);
        detail !== null ? console.warn(message, detail) : console.warn(message);
      };
    }
    module2.exports = { createWarnOnce };
  }
});

// src/shared/react-dom.js
var require_react_dom = __commonJS({
  "src/shared/react-dom.js"(exports2, module2) {
    function getCreateRoot() {
      var _a;
      if ((_a = BdApi.ReactDOM) == null ? void 0 : _a.createRoot) {
        return BdApi.ReactDOM.createRoot.bind(BdApi.ReactDOM);
      }
      return null;
    }
    function getLegacyReactDOM() {
      return BdApi.ReactDOM || BdApi.Webpack.getModule((m) => m && m.render && m.unmountComponentAtNode) || null;
    }
    function renderToContainer(container, element) {
      const createRoot = getCreateRoot();
      if (createRoot) {
        const root = createRoot(container);
        root.render(element);
        return () => root.unmount();
      }
      const legacyDOM = getLegacyReactDOM();
      if (legacyDOM == null ? void 0 : legacyDOM.render) {
        legacyDOM.render(element, container);
        return () => {
          if (legacyDOM.unmountComponentAtNode) {
            legacyDOM.unmountComponentAtNode(container);
          }
        };
      }
      const { createWarnOnce } = require_warn_once();
      const warnOnce = createWarnOnce();
      warnOnce("react-dom-unavailable", "[shared/react-dom] Neither createRoot nor ReactDOM.render available");
      return () => {
      };
    }
    module2.exports = { getCreateRoot, renderToContainer };
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
    function ensureTooltipCSS() {
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
    function showToolbarTooltip(icon, tooltipId, label) {
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
    function hideToolbarTooltip(tooltipId) {
      const tip = document.getElementById(tooltipId);
      if (tip) tip.classList.remove("sl-toolbar-tip--visible");
    }
    function removeToolbarTooltip(tooltipId) {
      const tip = document.getElementById(tooltipId);
      if (tip) tip.remove();
    }
    module2.exports = {
      showToolbarTooltip,
      hideToolbarTooltip,
      removeToolbarTooltip,
      ensureTooltipCSS
    };
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

// src/shared/channel-context.js
var require_channel_context = __commonJS({
  "src/shared/channel-context.js"(exports2, module2) {
    var { acquireDispatcher } = require_dispatcher();
    function _getStores() {
      try {
        const Webpack = BdApi == null ? void 0 : BdApi.Webpack;
        if (!Webpack) return null;
        const SelectedChannelStore = Webpack.getStore("SelectedChannelStore");
        const ChannelStore = Webpack.getStore("ChannelStore");
        if (!SelectedChannelStore || !ChannelStore) return null;
        return { SelectedChannelStore, ChannelStore };
      } catch (_) {
        return null;
      }
    }
    function getCurrentChannel() {
      var _a, _b, _c, _d;
      const stores = _getStores();
      if (!stores) return null;
      try {
        const channelId = (_b = (_a = stores.SelectedChannelStore).getChannelId) == null ? void 0 : _b.call(_a);
        if (!channelId) return null;
        return ((_d = (_c = stores.ChannelStore).getChannel) == null ? void 0 : _d.call(_c, channelId)) || null;
      } catch (_) {
        return null;
      }
    }
    function isVoiceChannelChat() {
      var _a, _b, _c;
      const Webpack = BdApi == null ? void 0 : BdApi.Webpack;
      let path1Resolved = false;
      try {
        const channel = getCurrentChannel();
        if (channel) {
          path1Resolved = true;
          const type = Number(channel.type);
          if (type === 2 || type === 13) return true;
        }
      } catch (_) {
      }
      let path2Resolved = false;
      try {
        if (typeof window !== "undefined" && window.location && Webpack) {
          const m = String(window.location.pathname || "").match(/^\/channels\/(?:@me|\d+)\/(\d+)/);
          if (m && m[1]) {
            const ChannelStore = Webpack.getStore("ChannelStore");
            const ch = (_a = ChannelStore == null ? void 0 : ChannelStore.getChannel) == null ? void 0 : _a.call(ChannelStore, m[1]);
            const t = Number(ch == null ? void 0 : ch.type);
            if (!Number.isNaN(t)) {
              path2Resolved = true;
              if (t === 2 || t === 13) return true;
            }
          }
        }
      } catch (_) {
      }
      if (path1Resolved && path2Resolved) return false;
      try {
        if (Webpack) {
          const VoiceStateStore = Webpack.getStore("VoiceStateStore");
          const UserStore = Webpack.getStore("UserStore");
          const SelectedChannelStore = Webpack.getStore("SelectedChannelStore");
          const userId = (_c = (_b = UserStore == null ? void 0 : UserStore.getCurrentUser) == null ? void 0 : _b.call(UserStore)) == null ? void 0 : _c.id;
          if (userId && (VoiceStateStore == null ? void 0 : VoiceStateStore.getVoiceStateForUser) && (SelectedChannelStore == null ? void 0 : SelectedChannelStore.getChannelId)) {
            const voiceState = VoiceStateStore.getVoiceStateForUser(userId);
            const voiceChannelId = voiceState == null ? void 0 : voiceState.channelId;
            const selectedId = SelectedChannelStore.getChannelId();
            if (voiceChannelId && selectedId && voiceChannelId === selectedId) return true;
          }
        }
      } catch (_) {
      }
      try {
        const vcMarkers = document.querySelectorAll(
          '[class*="voiceChannelChat"], [class*="voiceChannel_"][class*="chat_"]'
        );
        for (const el of vcMarkers) {
          if (el.offsetParent !== null) return true;
        }
      } catch (_) {
      }
      return false;
    }
    function debugVoiceChannelChat() {
      var _a, _b, _c, _d, _e;
      const Webpack = BdApi == null ? void 0 : BdApi.Webpack;
      const out = { final: null, paths: {} };
      try {
        const channel = getCurrentChannel();
        out.paths.selectedChannelType = {
          id: channel == null ? void 0 : channel.id,
          type: channel == null ? void 0 : channel.type,
          name: channel == null ? void 0 : channel.name,
          hit: channel && (channel.type === 2 || channel.type === 13)
        };
      } catch (e) {
        out.paths.selectedChannelType = { error: String(e) };
      }
      try {
        const path2 = String(window.location.pathname || "");
        const m = path2.match(/^\/channels\/(?:@me|\d+)\/(\d+)/);
        const ChannelStore = Webpack == null ? void 0 : Webpack.getStore("ChannelStore");
        const ch = m && m[1] ? (_a = ChannelStore == null ? void 0 : ChannelStore.getChannel) == null ? void 0 : _a.call(ChannelStore, m[1]) : null;
        out.paths.urlBased = {
          url: path2,
          extractedId: (m == null ? void 0 : m[1]) || null,
          type: ch == null ? void 0 : ch.type,
          name: ch == null ? void 0 : ch.name,
          hit: ch && (ch.type === 2 || ch.type === 13)
        };
      } catch (e) {
        out.paths.urlBased = { error: String(e) };
      }
      try {
        const VoiceStateStore = Webpack == null ? void 0 : Webpack.getStore("VoiceStateStore");
        const UserStore = Webpack == null ? void 0 : Webpack.getStore("UserStore");
        const SelectedChannelStore = Webpack == null ? void 0 : Webpack.getStore("SelectedChannelStore");
        const userId = (_c = (_b = UserStore == null ? void 0 : UserStore.getCurrentUser) == null ? void 0 : _b.call(UserStore)) == null ? void 0 : _c.id;
        const voiceState = userId ? (_d = VoiceStateStore == null ? void 0 : VoiceStateStore.getVoiceStateForUser) == null ? void 0 : _d.call(VoiceStateStore, userId) : null;
        const selectedId = (_e = SelectedChannelStore == null ? void 0 : SelectedChannelStore.getChannelId) == null ? void 0 : _e.call(SelectedChannelStore);
        out.paths.voiceStateMatch = {
          userId,
          voiceChannelId: voiceState == null ? void 0 : voiceState.channelId,
          selectedId,
          hit: (voiceState == null ? void 0 : voiceState.channelId) && selectedId && voiceState.channelId === selectedId
        };
      } catch (e) {
        out.paths.voiceStateMatch = { error: String(e) };
      }
      try {
        const vcMarkers = Array.from(document.querySelectorAll(
          '[class*="voiceChannelChat"], [class*="voiceChannel_"][class*="chat_"]'
        ));
        out.paths.domMarkers = {
          total: vcMarkers.length,
          visible: vcMarkers.filter((el) => el.offsetParent !== null).length,
          hit: vcMarkers.some((el) => el.offsetParent !== null)
        };
      } catch (e) {
        out.paths.domMarkers = { error: String(e) };
      }
      out.final = isVoiceChannelChat();
      return out;
    }
    var VC_BODY_ATTR = "data-sl-in-voice-chat";
    var FORUM_THREAD_BODY_ATTR = "data-sl-in-forum-or-thread";
    var DM_BODY_ATTR = "data-sl-in-dm";
    var HOME_BODY_ATTR = "data-sl-in-home";
    var READONLY_BODY_ATTR = "data-sl-channel-readonly";
    var CHAT_LAYER_BODY_ATTR = "data-sl-chat-layer";
    var _sendMessagesBit = null;
    function _getSendMessagesBit() {
      if (_sendMessagesBit !== null) return _sendMessagesBit;
      try {
        const Webpack = BdApi == null ? void 0 : BdApi.Webpack;
        const bits = Webpack.getModule((m) => m && typeof m === "object" && m.ADMINISTRATOR && m.VIEW_CHANNEL, { searchExports: true }) || Webpack.getByKeys("ADMINISTRATOR", "VIEW_CHANNEL");
        _sendMessagesBit = (bits == null ? void 0 : bits.SEND_MESSAGES) || 0n;
      } catch (_) {
        _sendMessagesBit = 0n;
      }
      return _sendMessagesBit;
    }
    function isChannelReadonly() {
      var _a;
      try {
        const ch = getCurrentChannel();
        if (!ch) return false;
        const t = Number(ch.type);
        if (t === 1 || t === 3) return false;
        const PermissionStore = (_a = BdApi == null ? void 0 : BdApi.Webpack) == null ? void 0 : _a.getStore("PermissionStore");
        const SEND = _getSendMessagesBit();
        if (!(PermissionStore == null ? void 0 : PermissionStore.can) || !SEND) return false;
        return !PermissionStore.can(SEND, ch);
      } catch (_) {
        return false;
      }
    }
    function isDmChannel() {
      var _a;
      try {
        const Webpack = BdApi == null ? void 0 : BdApi.Webpack;
        if (!Webpack || typeof window === "undefined" || !window.location) return false;
        const path2 = String(window.location.pathname || "");
        const m = path2.match(/^\/channels\/@me\/(\d+)/);
        if (!m || !m[1]) return false;
        const ChannelStore = Webpack.getStore("ChannelStore");
        const ch = (_a = ChannelStore == null ? void 0 : ChannelStore.getChannel) == null ? void 0 : _a.call(ChannelStore, m[1]);
        const t = Number(ch == null ? void 0 : ch.type);
        if (Number.isNaN(t)) return true;
        return t === 1 || t === 3;
      } catch (_) {
        return false;
      }
    }
    function isHomeView() {
      try {
        if (typeof window === "undefined" || !window.location) return false;
        const path2 = String(window.location.pathname || "");
        if (path2 === "/channels/@me" || path2 === "/channels/@me/") return true;
        if (/^\/channels\/@me(\?|$)/.test(path2)) return true;
        if (!path2.startsWith("/channels/")) return true;
        return false;
      } catch (_) {
        return false;
      }
    }
    function isForumOrThreadChannel() {
      var _a;
      try {
        const Webpack = BdApi == null ? void 0 : BdApi.Webpack;
        if (!Webpack || typeof window === "undefined" || !window.location) return false;
        const m = String(window.location.pathname || "").match(/^\/channels\/(?:@me|\d+)\/(\d+)/);
        if (!m || !m[1]) return false;
        const ChannelStore = Webpack.getStore("ChannelStore");
        const ch = (_a = ChannelStore == null ? void 0 : ChannelStore.getChannel) == null ? void 0 : _a.call(ChannelStore, m[1]);
        const t = Number(ch == null ? void 0 : ch.type);
        return t === 10 || t === 11 || t === 12 || t === 15;
      } catch (_) {
        return false;
      }
    }
    var VC_HIDE_STYLE_ID = "sl-vc-icon-hiding";
    var VC_HIDE_CSS = `
/* Auto-injected by src/shared/channel-context.js \u2014 hides Solo-Leveling
   plugin toolbar icons when the user is viewing a voice-channel chat panel.
   Toggled via body[data-sl-in-voice-chat="true"]. */
body[data-sl-in-voice-chat="true"] #eq-header-icon,
body[data-sl-in-voice-chat="true"] #itemvault-header-icon,
body[data-sl-in-voice-chat="true"] #shadow-senses-header-icon,
body[data-sl-in-voice-chat="true"] #se-swirl-icon,
body[data-sl-in-voice-chat="true"] #dungeons-header-widget {
  display: none !important;
}
`;
    var _vcWatchInstalled = false;
    var _vcWatchInterval = null;
    var _vcWatchRefCount = 0;
    var _vcDispatcherUnsub = null;
    if (typeof window !== "undefined") {
      window.__SL_VcHideRefs = window.__SL_VcHideRefs || 0;
    }
    function _writeVcAttribute() {
      try {
        if (!document.body) return;
        const vcValue = isVoiceChannelChat() ? "true" : "false";
        if (document.body.getAttribute(VC_BODY_ATTR) !== vcValue) {
          document.body.setAttribute(VC_BODY_ATTR, vcValue);
        }
        const ftValue = isForumOrThreadChannel() ? "true" : "false";
        if (document.body.getAttribute(FORUM_THREAD_BODY_ATTR) !== ftValue) {
          document.body.setAttribute(FORUM_THREAD_BODY_ATTR, ftValue);
        }
        const dmValue = isDmChannel() ? "true" : "false";
        if (document.body.getAttribute(DM_BODY_ATTR) !== dmValue) {
          document.body.setAttribute(DM_BODY_ATTR, dmValue);
        }
        const homeValue = isHomeView() ? "true" : "false";
        if (document.body.getAttribute(HOME_BODY_ATTR) !== homeValue) {
          document.body.setAttribute(HOME_BODY_ATTR, homeValue);
        }
        const roValue = isChannelReadonly() ? "true" : "false";
        if (document.body.getAttribute(READONLY_BODY_ATTR) !== roValue) {
          document.body.setAttribute(READONLY_BODY_ATTR, roValue);
        }
      } catch (_) {
      }
    }
    function installVoiceChatBodyAttr() {
      var _a;
      _vcWatchRefCount++;
      if (typeof window !== "undefined") {
        window.__SL_VcHideRefs = (window.__SL_VcHideRefs || 0) + 1;
      }
      if (!_vcWatchInstalled) {
        _vcWatchInstalled = true;
        try {
          if ((_a = BdApi == null ? void 0 : BdApi.DOM) == null ? void 0 : _a.addStyle) {
            BdApi.DOM.addStyle(VC_HIDE_STYLE_ID, VC_HIDE_CSS);
          }
        } catch (_) {
        }
        _writeVcAttribute();
        try {
          const dispatcher = acquireDispatcher();
          if (dispatcher) {
            const handler = () => _writeVcAttribute();
            dispatcher.subscribe("CHANNEL_SELECT", handler);
            dispatcher.subscribe("VOICE_STATE_UPDATES", handler);
            _vcDispatcherUnsub = () => {
              try {
                dispatcher.unsubscribe("CHANNEL_SELECT", handler);
              } catch (_) {
              }
              try {
                dispatcher.unsubscribe("VOICE_STATE_UPDATES", handler);
              } catch (_) {
              }
            };
          }
        } catch (_) {
        }
        if (!_vcDispatcherUnsub) {
          _vcWatchInterval = setInterval(() => {
            if (document.hidden) return;
            _writeVcAttribute();
          }, 15e3);
        }
      }
      return function uninstallVoiceChatBodyAttr() {
        var _a2;
        _vcWatchRefCount = Math.max(0, _vcWatchRefCount - 1);
        const globalRefs = typeof window !== "undefined" ? Math.max(0, (window.__SL_VcHideRefs || 1) - 1) : 0;
        if (typeof window !== "undefined") window.__SL_VcHideRefs = globalRefs;
        if (_vcWatchRefCount === 0 && _vcWatchInstalled) {
          _vcWatchInstalled = false;
          if (_vcWatchInterval) {
            clearInterval(_vcWatchInterval);
            _vcWatchInterval = null;
          }
          if (_vcDispatcherUnsub) {
            _vcDispatcherUnsub();
            _vcDispatcherUnsub = null;
          }
          try {
            if (document.body) {
              document.body.removeAttribute(VC_BODY_ATTR);
              document.body.removeAttribute(FORUM_THREAD_BODY_ATTR);
              document.body.removeAttribute(DM_BODY_ATTR);
              document.body.removeAttribute(HOME_BODY_ATTR);
              document.body.removeAttribute(READONLY_BODY_ATTR);
            }
          } catch (_) {
          }
          if (globalRefs === 0) {
            try {
              if ((_a2 = BdApi == null ? void 0 : BdApi.DOM) == null ? void 0 : _a2.removeStyle) BdApi.DOM.removeStyle(VC_HIDE_STYLE_ID);
            } catch (_) {
            }
          }
        }
      };
    }
    var _chatLayerObserver = null;
    var _chatLayerRefCount = 0;
    var _chatLayerRafPending = false;
    var _chatLayerLastValue = null;
    function _writeChatLayerAttribute() {
      try {
        if (!document.body) return;
        const value = document.querySelector('div[class^="chatLayerWrapper_"]') ? "true" : "false";
        if (value === _chatLayerLastValue) return;
        _chatLayerLastValue = value;
        document.body.setAttribute(CHAT_LAYER_BODY_ATTR, value);
      } catch (_) {
      }
    }
    function _scheduleChatLayerWrite() {
      if (_chatLayerRafPending) return;
      _chatLayerRafPending = true;
      requestAnimationFrame(() => {
        _chatLayerRafPending = false;
        _writeChatLayerAttribute();
      });
    }
    function installChatLayerBodyAttr() {
      _chatLayerRefCount++;
      if (!_chatLayerObserver) {
        _writeChatLayerAttribute();
        const target = document.querySelector('[class*="layerContainer_"]') || document.querySelector('[class*="layers_"]') || document.body;
        if (target) {
          _chatLayerObserver = new MutationObserver(_scheduleChatLayerWrite);
          _chatLayerObserver.observe(target, { childList: true, subtree: true });
        }
      }
      return function uninstallChatLayerBodyAttr() {
        var _a;
        _chatLayerRefCount = Math.max(0, _chatLayerRefCount - 1);
        if (_chatLayerRefCount > 0) return;
        if (_chatLayerObserver) {
          _chatLayerObserver.disconnect();
          _chatLayerObserver = null;
        }
        _chatLayerRafPending = false;
        _chatLayerLastValue = null;
        try {
          (_a = document.body) == null ? void 0 : _a.removeAttribute(CHAT_LAYER_BODY_ATTR);
        } catch (_) {
        }
      };
    }
    module2.exports = {
      getCurrentChannel,
      isVoiceChannelChat,
      isForumOrThreadChannel,
      isDmChannel,
      isHomeView,
      isChannelReadonly,
      debugVoiceChannelChat,
      installVoiceChatBodyAttr,
      installChatLayerBodyAttr,
      VC_BODY_ATTR,
      CHAT_LAYER_BODY_ATTR,
      FORUM_THREAD_BODY_ATTR,
      DM_BODY_ATTR,
      HOME_BODY_ATTR,
      READONLY_BODY_ATTR
    };
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
    function watchToolbar(onChange) {
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
      watchToolbar
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
    function onKeydown(handler, opts) {
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
    module2.exports = { onKeydown, onResize };
  }
});

// src/ShadowSenses/plugin-ui-methods.js
var require_plugin_ui_methods = __commonJS({
  "src/ShadowSenses/plugin-ui-methods.js"(exports2, module2) {
    var {
      DEFAULT_TYPING_ALERT_COOLDOWN_MS,
      PANEL_CONTAINER_ID,
      PLUGIN_NAME: PLUGIN_NAME2,
      STYLE_ID
    } = require_constants();
    var { buildCSS } = require_styles();
    var { getCreateRoot } = require_react_dom();
    var { showToolbarTooltip, hideToolbarTooltip, removeToolbarTooltip, ensureTooltipCSS } = require_toolbar_tooltip();
    var { isVoiceChannelChat } = require_channel_context();
    var { watchToolbar } = require_header_toolbar();
    var { onKeydown } = require_dom_bus();
    var ShadowSensesUiMethods2 = {
      injectCSS() {
        try {
          BdApi.DOM.addStyle(STYLE_ID, buildCSS());
          this.debugLog("CSS", "Injected via BdApi.DOM.addStyle");
        } catch (err) {
          try {
            if (!document.getElementById(STYLE_ID)) {
              const style = document.createElement("style");
              style.id = STYLE_ID;
              style.textContent = buildCSS();
              document.head.appendChild(style);
              this.debugLog("CSS", "Injected via manual <style> fallback");
            }
          } catch (fallbackErr) {
            this.debugError("CSS", "Failed to inject CSS", fallbackErr);
          }
        }
      },
      removeCSS() {
        try {
          BdApi.DOM.removeStyle(STYLE_ID);
        } catch (err) {
          try {
            const el = document.getElementById(STYLE_ID);
            if (el) el.remove();
          } catch (fallbackErr) {
            this.debugError("CSS", "Failed to remove CSS", fallbackErr);
          }
        }
      },
      debugLog(system, ...args) {
        if (this._debugMode) console.log(`[${PLUGIN_NAME2}][${system}]`, ...args);
      },
      debugError(system, ...args) {
        console.error(`[${PLUGIN_NAME2}][${system}]`, ...args);
      },
      _getCreateRoot() {
        return getCreateRoot();
      },
      // Panel
      openPanel() {
        var _a, _b, _c;
        try {
          if (!((_a = this._components) == null ? void 0 : _a.SensesPanel)) {
            (_b = this.debugError) == null ? void 0 : _b.call(this, "Panel", "Components not initialized");
            return;
          }
          if (this._popupReactRoot) {
            this._closeSensesPopup();
            return;
          }
          if (this._panelReactRoot) {
            this.closePanel();
            return;
          }
          const createRoot = this._getCreateRoot();
          if (!createRoot) {
            this.debugError("Panel", "createRoot not available");
            return;
          }
          const container = document.createElement("div");
          container.id = PANEL_CONTAINER_ID;
          container.style.display = "contents";
          document.body.appendChild(container);
          const root = createRoot(container);
          root.render(BdApi.React.createElement(this._components.SensesPanel, {
            onClose: () => this.closePanel()
          }));
          this._panelReactRoot = root;
          this._panelOpen = true;
          if ((_c = this.sensesEngine) == null ? void 0 : _c.clearUnread) {
            this.sensesEngine.clearUnread();
          }
          this.debugLog("Panel", "Opened");
        } catch (err) {
          this.debugError("Panel", "Failed to open panel", err);
        }
      },
      closePanel() {
        var _a;
        try {
          this._closeSensesPopup();
          if (this._panelReactRoot) {
            try {
              this._panelReactRoot.unmount();
            } catch (_) {
              (_a = this.debugLog) == null ? void 0 : _a.call(this, "CLEANUP", "Panel unmount error", _);
            }
            this._panelReactRoot = null;
          }
          const container = document.getElementById(PANEL_CONTAINER_ID);
          if (container) container.remove();
          this._panelOpen = false;
          this.debugLog("Panel", "Closed");
        } catch (err) {
          this.debugError("Panel", "Failed to close panel", err);
        }
      },
      // ESC Handler
      registerEscHandler() {
        try {
          if (this._escUnsub) {
            this._escUnsub();
            this._escUnsub = null;
            this._escHandler = null;
          }
          this._escHandler = (e) => {
            if (e.key !== "Escape") return;
            if (this._panelOpen) {
              this.closePanel();
              e.stopPropagation();
            }
          };
          this._escUnsub = onKeydown(this._escHandler, { capture: false });
          this.debugLog("ESC", "Handler registered");
        } catch (err) {
          this.debugError("ESC", "Failed to register ESC handler", err);
        }
      },
      // Context Menu
      patchContextMenu() {
        try {
          if (this._unpatchContextMenu) {
            try {
              this._unpatchContextMenu();
            } catch (_) {
            }
            this._unpatchContextMenu = null;
          }
          this._unpatchContextMenu = BdApi.ContextMenu.patch("user-context", (tree, props) => {
            if (!props || !props.user) return;
            const user = props.user;
            const userId = user.id;
            const deployment = this.deploymentManager.getDeploymentForUser(userId);
            let menuItem;
            if (deployment) {
              menuItem = BdApi.ContextMenu.buildItem({
                type: "text",
                label: "Recall",
                action: () => {
                  try {
                    this.deploymentManager.recall(deployment.shadowId);
                    this._toast(`Recalled ${deployment.shadowName} from ${deployment.targetUsername}`);
                  } catch (err) {
                    this.debugError("ContextMenu", "Recall failed", err);
                  }
                }
              });
            } else {
              menuItem = BdApi.ContextMenu.buildItem({
                type: "text",
                label: "Deploy Shadow",
                action: async () => {
                  this._toast("Deploying shadow\u2026", "info");
                  let weakest;
                  try {
                    weakest = this.deploymentManager ? await this.deploymentManager.getWeakestAvailableShadow() : null;
                  } catch (err) {
                    this.debugError("ContextMenu", "Failed to load available shadows", err);
                    this._toast("Failed to load shadows", "error");
                    return;
                  }
                  try {
                    if (!weakest) {
                      this._toast("No available shadows. All are deployed, in dungeons, or marked for exchange.", "warning");
                      return;
                    }
                    const success = await this.deploymentManager.deploy(weakest, user);
                    if (success) {
                      const targetName = user.globalName || user.username || "User";
                      this._toast(`Deployed ${weakest.roleName || weakest.role || "Shadow"} [${weakest.rank || "E"}] to monitor ${targetName}`, "success");
                    } else {
                      this._toast("Shadow already deployed or target already monitored", "warning");
                    }
                  } catch (err) {
                    this.debugError("ContextMenu", "Auto-deploy failed", err);
                    this._toast("Failed to deploy shadow", "error");
                  }
                }
              });
            }
            const separator = BdApi.ContextMenu.buildItem({ type: "separator" });
            if (tree && tree.props && Array.isArray(tree.props.children)) {
              tree.props.children.push(separator, menuItem);
            }
          });
          this.debugLog("ContextMenu", "Patched user-context menu");
        } catch (err) {
          this.debugError("ContextMenu", "Failed to patch context menu", err);
        }
      },
      // ─── Channel Header Icon ─────────────────────────────
      // Eye-shaped SVG icon in the channel header toolbar with unread badge.
      _SENSES_HEADER_ICON_ID: "shadow-senses-header-icon",
      _HEADER_TOOLBAR_SELECTORS: [
        '[aria-label="Channel header"] [class*="toolbar_"]',
        '[class*="titleWrapper_"] [class*="toolbar_"]',
        'header [class*="toolbar_"]'
      ],
      _getHeaderToolbar() {
        for (const sel of this._HEADER_TOOLBAR_SELECTORS) {
          const el = document.querySelector(sel);
          if (el && el.offsetParent !== null) return el;
        }
        return null;
      },
      _getSensesHeaderSVG() {
        return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8S1 12 1 12z"/>
      <circle cx="12" cy="12" r="3.5"/>
      <circle cx="12" cy="12" r="1.2" fill="currentColor" stroke="none"/>
    </svg>`;
      },
      startSensesHeaderIcon() {
        if (this._unwatchSensesToolbar) return;
        this._unwatchSensesToolbar = watchToolbar(() => {
          if (this._stopped) return;
          if (document.hidden) return;
          this._ensureSensesHeaderIcon();
        });
      },
      stopSensesHeaderIcon() {
        if (this._unwatchSensesToolbar) {
          try {
            this._unwatchSensesToolbar();
          } catch (_) {
          }
          this._unwatchSensesToolbar = null;
        }
        const existing = document.getElementById(this._SENSES_HEADER_ICON_ID);
        if (existing) existing.remove();
        removeToolbarTooltip("sl-toolbar-tip-ss");
      },
      _ensureSensesHeaderIcon() {
        if (isVoiceChannelChat()) {
          const stale = document.getElementById(this._SENSES_HEADER_ICON_ID);
          if (stale) stale.remove();
          return;
        }
        const existing = document.getElementById(this._SENSES_HEADER_ICON_ID);
        if (existing == null ? void 0 : existing.isConnected) {
          this._updateSensesHeaderBadge(existing);
          return;
        }
        const toolbar = this._getHeaderToolbar();
        if (!toolbar) return;
        if (toolbar.querySelector(`#${this._SENSES_HEADER_ICON_ID}`)) return;
        const wrapper = document.createElement("div");
        wrapper.id = this._SENSES_HEADER_ICON_ID;
        wrapper.style.cssText = `
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 24px;
      height: 24px;
      cursor: pointer;
      color: #b5bac1;
      opacity: 0.85;
      border-radius: 2px;
      margin: 0 2px;
      transition: opacity 0.15s ease, background 0.15s ease, color 0.15s ease;
    `;
        wrapper.innerHTML = this._getSensesHeaderSVG();
        ensureTooltipCSS();
        const badge = document.createElement("div");
        badge.className = "ss-header-badge";
        badge.style.cssText = `
      position: absolute;
      top: -4px;
      right: -6px;
      min-width: 16px;
      height: 16px;
      padding: 0 4px;
      border-radius: 2px;
      background: #ed4245;
      color: #fff;
      font-size: 10px;
      font-weight: 700;
      display: none;
      align-items: center;
      justify-content: center;
      line-height: 16px;
      box-sizing: border-box;
      pointer-events: none;
      font-family: 'gg sans', system-ui, sans-serif;
    `;
        badge.textContent = "0";
        wrapper.appendChild(badge);
        wrapper.addEventListener("mouseenter", () => {
          wrapper.style.color = "#dcddde";
          wrapper.style.opacity = "1";
          wrapper.style.background = "rgba(138,43,226,0.15)";
          showToolbarTooltip(wrapper, "sl-toolbar-tip-ss", "Shadow Senses");
        });
        wrapper.addEventListener("mouseleave", () => {
          wrapper.style.color = "#b5bac1";
          wrapper.style.opacity = "0.85";
          wrapper.style.background = "";
          hideToolbarTooltip("sl-toolbar-tip-ss");
        });
        wrapper.addEventListener("click", (e) => {
          var _a;
          e.stopPropagation();
          if ((_a = this.sensesEngine) == null ? void 0 : _a.clearUnread) {
            this.sensesEngine.clearUnread();
          }
          this._updateSensesHeaderBadge(wrapper);
          this._toggleSensesPopup(wrapper);
        });
        if (toolbar.firstChild) {
          toolbar.insertBefore(wrapper, toolbar.firstChild);
        } else {
          toolbar.appendChild(wrapper);
        }
        this._updateSensesHeaderBadge(wrapper);
      },
      _updateSensesHeaderBadge(wrapper) {
        var _a, _b;
        const badge = wrapper == null ? void 0 : wrapper.querySelector(".ss-header-badge");
        if (!badge) return;
        const unread = ((_b = (_a = this.sensesEngine) == null ? void 0 : _a.getUnreadCount) == null ? void 0 : _b.call(_a)) || 0;
        if (unread > 0) {
          badge.textContent = unread > 99 ? "99+" : String(unread);
          badge.style.display = "flex";
        } else {
          badge.style.display = "none";
        }
      },
      // ─── Senses Popup (anchored to header icon) ──────────
      _SENSES_POPUP_ID: "shadow-senses-header-popup",
      _toggleSensesPopup(anchorEl) {
        const existing = document.getElementById(this._SENSES_POPUP_ID);
        if (existing) {
          this._closeSensesPopup();
          return;
        }
        this._openSensesPopup(anchorEl);
      },
      _openSensesPopup(anchorEl) {
        var _a, _b;
        if (!((_a = this._components) == null ? void 0 : _a.SensesPanel)) {
          (_b = this.debugError) == null ? void 0 : _b.call(this, "Popup", "Components not initialized");
          return;
        }
        this._closeSensesPopup();
        const createRoot = this._getCreateRoot();
        if (!createRoot) return;
        const popup = document.createElement("div");
        popup.id = this._SENSES_POPUP_ID;
        popup.style.cssText = `
      position: fixed;
      z-index: 10001;
      width: 480px;
      max-height: calc(100vh - 80px);
      overflow-y: auto;
      background: linear-gradient(165deg, rgba(22, 18, 32, 0.97) 0%, rgba(13, 12, 20, 0.97) 55%, rgba(10, 10, 16, 0.98) 100%);
      border: 1px solid rgba(138, 43, 226, 0.32);
      border-radius: 2px;
      box-shadow: 0 20px 52px rgba(0, 0, 0, 0.66), 0 0 24px rgba(138, 43, 226, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.06), inset 0 0 0 1px rgba(138, 43, 226, 0.06);
      scrollbar-width: thin;
      scrollbar-color: rgba(138,43,226,0.85) rgba(8,8,13,0.55);
      font-family: 'gg sans', 'Helvetica Neue', system-ui, sans-serif;
    `;
        const anchorRect = anchorEl ? anchorEl.getBoundingClientRect() : null;
        document.body.appendChild(popup);
        this._positionSensesPopup(popup, anchorEl, anchorRect);
        const root = createRoot(popup);
        root.render(BdApi.React.createElement(this._components.SensesPanel, {
          onClose: () => this._closeSensesPopup(),
          embedded: true
          // signal to panel component it's in popup mode
        }));
        this._popupReactRoot = root;
        this._panelOpen = true;
        this._popupOutsideClickHandler = (e) => {
          if (!popup.contains(e.target) && !(anchorEl == null ? void 0 : anchorEl.contains(e.target))) {
            this._closeSensesPopup();
          }
        };
        document.addEventListener("click", this._popupOutsideClickHandler, true);
        this._popupEscHandler = (e) => {
          if (e.key === "Escape") {
            this._closeSensesPopup();
            e.stopPropagation();
          }
        };
        this._popupEscUnsub = onKeydown(this._popupEscHandler, { capture: true });
        this.debugLog("Popup", "Opened");
      },
      _positionSensesPopup(popup, anchorEl, prereadRect = null) {
        if (!anchorEl || !popup) return;
        const rect = prereadRect || anchorEl.getBoundingClientRect();
        const vpW = window.innerWidth;
        const vpH = window.innerHeight;
        let top = rect.bottom + 8;
        let left = rect.right - 480;
        if (left < 8) left = 8;
        if (left + 480 > vpW - 8) left = vpW - 488;
        if (top + 400 > vpH) top = rect.top - 400 - 8;
        popup.style.top = `${top}px`;
        popup.style.left = `${left}px`;
      },
      _closeSensesPopup() {
        if (this._popupReactRoot) {
          try {
            this._popupReactRoot.unmount();
          } catch (_) {
          }
          this._popupReactRoot = null;
        }
        const popup = document.getElementById(this._SENSES_POPUP_ID);
        if (popup) popup.remove();
        if (this._popupOutsideClickHandler) {
          document.removeEventListener("click", this._popupOutsideClickHandler, true);
          this._popupOutsideClickHandler = null;
        }
        if (this._popupEscUnsub) {
          this._popupEscUnsub();
          this._popupEscUnsub = null;
        }
        this._popupEscHandler = null;
        this._panelOpen = false;
        this.debugLog("Popup", "Closed");
      },
      getSettingsPanel() {
        var _a, _b, _c, _d, _e;
        const React = BdApi.React;
        const ce = React.createElement;
        const deployCount = ((_a = this.deploymentManager) == null ? void 0 : _a.getDeploymentCount()) || 0;
        const onlineMarkedCount = ((_c = (_b = this.sensesEngine) == null ? void 0 : _b.getMarkedOnlineCount) == null ? void 0 : _c.call(_b)) || 0;
        const sessionCount = ((_d = this.sensesEngine) == null ? void 0 : _d.getSessionMessageCount()) || 0;
        const totalDetections = ((_e = this.sensesEngine) == null ? void 0 : _e.getTotalDetections()) || 0;
        const statCardStyle = {
          background: "rgba(138, 43, 226, 0.1)",
          border: "1px solid rgba(138, 43, 226, 0.3)",
          borderRadius: "2px",
          padding: "12px",
          textAlign: "center"
        };
        const rowStyle = {
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "12px",
          marginTop: "10px"
        };
        const startupArtworkUrl = typeof this._resolveStartupReportArtworkUrl === "function" ? this._resolveStartupReportArtworkUrl(this.settings.startupShadowReportArtwork) : "https://cdn.discordapp.com/embed/avatars/0.png";
        const updateSetting = (key, value) => {
          this.settings[key] = value;
          this.saveSettings();
        };
        return ce(
          "div",
          { style: { padding: "16px", background: "rgba(10, 10, 16, 0.98)", borderRadius: "2px", color: "#dcddde" } },
          // Statistics header
          ce("h3", { style: { color: "#8a2be2", marginTop: 0, marginBottom: "12px" } }, "Shadow Senses Statistics"),
          ce(
            "div",
            {
              style: {
                display: "flex",
                alignItems: "center",
                gap: "12px",
                marginBottom: "14px",
                padding: "10px 12px",
                borderRadius: "2px",
                border: "1px solid rgba(138, 43, 226, 0.35)",
                background: "linear-gradient(120deg, rgba(138, 43, 226, 0.16), rgba(10, 10, 18, 0.92))"
              }
            },
            ce("img", {
              src: startupArtworkUrl,
              alt: "Startup report artwork",
              style: {
                width: "52px",
                height: "52px",
                objectFit: "cover",
                borderRadius: "2px",
                border: "1px solid rgba(138, 43, 226, 0.5)",
                boxShadow: "0 0 14px rgba(138, 43, 226, 0.28)"
              },
              onError: (event) => {
                var _a2;
                if ((_a2 = event == null ? void 0 : event.target) == null ? void 0 : _a2.style) event.target.style.display = "none";
              }
            }),
            ce(
              "div",
              null,
              ce("div", { style: { color: "#dcddde", fontSize: "13px", fontWeight: "700", letterSpacing: "0.03em" } }, "Startup Shadow Report Art"),
              ce(
                "div",
                { style: { color: "#b5bac1", fontSize: "11px", marginTop: "3px", lineHeight: 1.35 } },
                "Used for overview decoration and startup report popup dialogs."
              )
            )
          ),
          // Stat cards grid
          ce(
            "div",
            { style: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginBottom: "16px" } },
            ce(
              "div",
              { style: statCardStyle },
              ce("div", { style: { color: "#8a2be2", fontSize: "20px", fontWeight: "700" } }, deployCount),
              ce("div", { style: { color: "#b5bac1", fontSize: "11px" } }, "Deployed")
            ),
            ce(
              "div",
              { style: statCardStyle },
              ce("div", { style: { color: "#8a2be2", fontSize: "20px", fontWeight: "700" } }, onlineMarkedCount),
              ce("div", { style: { color: "#b5bac1", fontSize: "11px" } }, "Marked Online")
            ),
            ce(
              "div",
              { style: statCardStyle },
              ce("div", { style: { color: "#8a2be2", fontSize: "20px", fontWeight: "700" } }, sessionCount),
              ce("div", { style: { color: "#b5bac1", fontSize: "11px" } }, "Detections (since restart)")
            ),
            ce(
              "div",
              { style: statCardStyle },
              ce("div", { style: { color: "#8a2be2", fontSize: "20px", fontWeight: "700" } }, totalDetections.toLocaleString()),
              ce("div", { style: { color: "#b5bac1", fontSize: "11px" } }, "Total Detections")
            )
          ),
          ce("h3", { style: { color: "#8a2be2", marginTop: 0, marginBottom: "8px", fontSize: "14px" } }, "Marked Utility Alerts"),
          ce(
            "div",
            { style: rowStyle },
            ce("span", { style: { color: "#b5bac1", fontSize: "13px" } }, "Status Change Alerts"),
            ce("input", {
              type: "checkbox",
              defaultChecked: !!this.settings.statusAlerts,
              onChange: (e) => updateSetting("statusAlerts", e.target.checked),
              style: { accentColor: "#8a2be2" }
            })
          ),
          ce(
            "div",
            { style: rowStyle },
            ce("span", { style: { color: "#b5bac1", fontSize: "13px" } }, "Report to the Monarch (in-character voice)"),
            ce("input", {
              type: "checkbox",
              defaultChecked: this.settings.reportToMonarch !== false,
              onChange: (e) => updateSetting("reportToMonarch", e.target.checked),
              style: { accentColor: "#8a2be2" }
            })
          ),
          ce(
            "div",
            { style: rowStyle },
            ce("span", { style: { color: "#b5bac1", fontSize: "13px" } }, "Startup Shadow Report"),
            ce("input", {
              type: "checkbox",
              defaultChecked: this.settings.startupShadowReport !== false,
              onChange: (e) => updateSetting("startupShadowReport", e.target.checked),
              style: { accentColor: "#8a2be2" }
            })
          ),
          // #4: window mode — fixed hours OR since last successful report
          ce(
            "div",
            { style: rowStyle },
            ce("span", { style: { color: "#b5bac1", fontSize: "13px" } }, "Use 'since last report' window"),
            ce("input", {
              type: "checkbox",
              defaultChecked: !!this.settings.startupReportSinceLastSession,
              onChange: (e) => updateSetting("startupReportSinceLastSession", e.target.checked),
              style: { accentColor: "#8a2be2" }
            })
          ),
          ce(
            "div",
            { style: rowStyle },
            ce("span", { style: { color: "#b5bac1", fontSize: "13px" } }, "Startup Report Window (hours, max)"),
            ce("input", {
              type: "number",
              min: 1,
              max: 72,
              step: 1,
              defaultValue: Number(this.settings.startupShadowReportWindowHours) || 24,
              onChange: (e) => {
                const hours = Number(e.target.value);
                if (!Number.isFinite(hours)) return;
                updateSetting("startupShadowReportWindowHours", Math.min(72, Math.max(1, Math.floor(hours))));
              },
              style: {
                width: "80px",
                padding: "4px 6px",
                borderRadius: "2px",
                border: "1px solid rgba(138, 43, 226, 0.4)",
                background: "rgba(0,0,0,0.3)",
                color: "#dcddde"
              }
            })
          ),
          // OpenAI API key + explicit privacy disclosure (audit Wave B / #6 / #8)
          ce(
            "div",
            { style: { ...rowStyle, alignItems: "flex-start", flexDirection: "column", gap: "6px" } },
            ce("span", { style: { color: "#b5bac1", fontSize: "13px" } }, "OpenAI API Key (optional)"),
            ce("input", {
              type: "password",
              placeholder: "sk-... (leave empty for local fallback narration)",
              defaultValue: this.settings.startupReportApiKey || "",
              onChange: (e) => updateSetting("startupReportApiKey", String(e.target.value || "").trim()),
              style: {
                width: "100%",
                padding: "5px 8px",
                borderRadius: "2px",
                border: "1px solid rgba(138, 43, 226, 0.4)",
                background: "rgba(0,0,0,0.3)",
                color: "#dcddde",
                fontFamily: "monospace",
                fontSize: "12px",
                boxSizing: "border-box"
              }
            }),
            ce(
              "div",
              {
                style: {
                  fontSize: "11px",
                  color: "#b5bac1",
                  lineHeight: 1.4,
                  padding: "4px 0"
                }
              },
              "Privacy: when a key is set, the report sends Discord usernames, server/channel names, ",
              "and short message snippets (up to 180 chars per signal) to OpenAI. ",
              "Leave empty to use the offline fallback narration \u2014 no data leaves your machine. ",
              "Key is stored in plain text via BdApi.Data."
            )
          ),
          ce(
            "div",
            {
              style: {
                ...rowStyle,
                alignItems: "flex-start",
                flexDirection: "column",
                gap: "6px"
              }
            },
            ce("span", { style: { color: "#b5bac1", fontSize: "13px" } }, "Startup Report Artwork (PNG/JPG/SVG URL or file path)"),
            ce("input", {
              type: "text",
              placeholder: "/Downloads/Igris.svg or https://...",
              defaultValue: this.settings.startupShadowReportArtwork || "",
              onChange: (e) => updateSetting("startupShadowReportArtwork", e.target.value || ""),
              style: {
                width: "100%",
                padding: "8px 10px",
                borderRadius: "2px",
                border: "1px solid rgba(138, 43, 226, 0.35)",
                background: "rgba(0,0,0,0.3)",
                color: "#dcddde",
                fontSize: "13px",
                outline: "none",
                boxSizing: "border-box"
              }
            }),
            ce(
              "div",
              { style: { color: "#b5bac1", fontSize: "11px", lineHeight: 1.35 } },
              "Supports /Downloads/Igris.svg, ~/Downloads/Igris.svg, absolute paths, and URLs."
            )
          ),
          ce(
            "div",
            { style: rowStyle },
            ce("span", { style: { color: "#b5bac1", fontSize: "13px" } }, "Typing Alerts"),
            ce("input", {
              type: "checkbox",
              defaultChecked: !!this.settings.typingAlerts,
              onChange: (e) => updateSetting("typingAlerts", e.target.checked),
              style: { accentColor: "#8a2be2" }
            })
          ),
          ce(
            "div",
            { style: rowStyle },
            ce("span", { style: { color: "#b5bac1", fontSize: "13px" } }, "Suppress typing alerts in the channel you're viewing"),
            ce("input", {
              type: "checkbox",
              defaultChecked: !!this.settings.suppressTypingInViewedChannel,
              onChange: (e) => updateSetting("suppressTypingInViewedChannel", e.target.checked),
              style: { accentColor: "#8a2be2" }
            })
          ),
          ce(
            "div",
            { style: rowStyle },
            ce("span", { style: { color: "#b5bac1", fontSize: "13px" } }, "Removed Friend Alerts"),
            ce("input", {
              type: "checkbox",
              defaultChecked: !!this.settings.removedFriendAlerts,
              onChange: (e) => updateSetting("removedFriendAlerts", e.target.checked),
              style: { accentColor: "#8a2be2" }
            })
          ),
          ce(
            "div",
            { style: rowStyle },
            ce("span", { style: { color: "#b5bac1", fontSize: "13px" } }, "Show Marked Online Count"),
            ce("input", {
              type: "checkbox",
              defaultChecked: !!this.settings.showMarkedOnlineCount,
              onChange: (e) => updateSetting("showMarkedOnlineCount", e.target.checked),
              style: { accentColor: "#8a2be2" }
            })
          ),
          ce(
            "div",
            { style: rowStyle },
            ce("span", { style: { color: "#b5bac1", fontSize: "13px" } }, "Typing Alert Cooldown (seconds)"),
            ce("input", {
              type: "number",
              min: 3,
              max: 60,
              step: 1,
              defaultValue: Math.round((this.settings.typingAlertCooldownMs || DEFAULT_TYPING_ALERT_COOLDOWN_MS) / 1e3),
              onChange: (e) => {
                const seconds = Number(e.target.value);
                if (!Number.isFinite(seconds)) return;
                updateSetting("typingAlertCooldownMs", Math.min(6e4, Math.max(3e3, Math.floor(seconds * 1e3))));
              },
              style: {
                width: "80px",
                padding: "4px 6px",
                borderRadius: "2px",
                border: "1px solid rgba(138, 43, 226, 0.4)",
                background: "rgba(0,0,0,0.3)",
                color: "#dcddde"
              }
            })
          ),
          ce(
            "div",
            { style: rowStyle },
            ce("span", { style: { color: "#b5bac1", fontSize: "13px" } }, "Group High Priority Bursts (P3/P4)"),
            ce("input", {
              type: "checkbox",
              defaultChecked: !!this.settings.groupHighPriorityBursts,
              onChange: (e) => updateSetting("groupHighPriorityBursts", e.target.checked),
              style: { accentColor: "#8a2be2" }
            })
          ),
          ce("h3", { style: { color: "#8a2be2", marginBottom: "8px", marginTop: "16px", fontSize: "14px" } }, "Feed Policy"),
          ce(
            "div",
            {
              style: {
                marginTop: "6px",
                padding: "10px 12px",
                borderRadius: "2px",
                border: "1px solid rgba(138, 43, 226, 0.25)",
                background: "rgba(138, 43, 226, 0.08)",
                color: "#dcddde",
                fontSize: "12px",
                lineHeight: 1.45
              }
            },
            "Status, typing, and connection alerts are toast-only and are not saved in Active Feed history. ",
            "Active Feed records chat message detections only. ",
            "Burst grouping uses a 20s window per author+channel; enable high-priority grouping if you want P3/P4 merged too."
          ),
          ce("h3", { style: { color: "#8a2be2", marginBottom: "8px", marginTop: "16px", fontSize: "14px" } }, "Priority Keywords"),
          ce(
            "div",
            {
              style: {
                marginTop: "6px",
                padding: "10px 12px",
                borderRadius: "2px",
                border: "1px solid rgba(138, 43, 226, 0.25)",
                background: "rgba(138, 43, 226, 0.08)",
                color: "#dcddde",
                fontSize: "12px",
                lineHeight: 1.45,
                marginBottom: "8px"
              }
            },
            "Messages containing these keywords are bumped to P2 (Medium) priority. ",
            "P3 = @everyone/reply-to-you, P4 = direct @mention."
          ),
          ce("input", {
            type: "text",
            placeholder: "urgent, important, help, @here ...",
            defaultValue: (this.settings.priorityKeywords || []).join(", "),
            onChange: (e) => {
              const raw = e.target.value;
              const keywords = raw.split(",").map((s) => s.trim()).filter(Boolean);
              updateSetting("priorityKeywords", keywords);
            },
            style: {
              width: "100%",
              padding: "8px 10px",
              borderRadius: "2px",
              border: "1px solid rgba(138, 43, 226, 0.35)",
              background: "rgba(0,0,0,0.3)",
              color: "#dcddde",
              fontSize: "13px",
              outline: "none",
              boxSizing: "border-box"
            }
          }),
          ce("h3", { style: { color: "#ec4899", marginBottom: "8px", marginTop: "16px", fontSize: "14px" } }, "Mention Names"),
          ce(
            "div",
            {
              style: {
                marginTop: "6px",
                padding: "10px 12px",
                borderRadius: "2px",
                border: "1px solid rgba(236, 72, 153, 0.25)",
                background: "rgba(236, 72, 153, 0.08)",
                color: "#dcddde",
                fontSize: "12px",
                lineHeight: 1.45,
                marginBottom: "8px"
              }
            },
            "When a monitored user says one of these names in a message, you get a toast notification and the feed card is highlighted pink. ",
            "Case-insensitive. Ranked P3 (High)."
          ),
          ce("input", {
            type: "text",
            placeholder: "Curio, bestie, your name ...",
            defaultValue: (this.settings.mentionNames || []).join(", "),
            onChange: (e) => {
              const raw = e.target.value;
              const names = raw.split(",").map((s) => s.trim()).filter(Boolean);
              updateSetting("mentionNames", names);
            },
            style: {
              width: "100%",
              padding: "8px 10px",
              borderRadius: "2px",
              border: "1px solid rgba(236, 72, 153, 0.35)",
              background: "rgba(0,0,0,0.3)",
              color: "#dcddde",
              fontSize: "13px",
              outline: "none",
              boxSizing: "border-box"
            }
          }),
          ce("h3", { style: { color: "#8a2be2", marginBottom: "8px", marginTop: "16px", fontSize: "14px" } }, "Diagnostics"),
          ce(
            "div",
            { style: rowStyle },
            ce("span", { style: { color: "#b5bac1", fontSize: "13px" } }, "Debug Mode"),
            ce("input", {
              type: "checkbox",
              defaultChecked: this._debugMode,
              onChange: (e) => {
                this._debugMode = e.target.checked;
                BdApi.Data.save(PLUGIN_NAME2, "debugMode", this._debugMode);
              },
              style: { accentColor: "#8a2be2" }
            })
          )
        );
      }
    };
    module2.exports = ShadowSensesUiMethods2;
  }
});

// src/ShadowSenses/senses-engine-feed.js
var require_senses_engine_feed = __commonJS({
  "src/ShadowSenses/senses-engine-feed.js"(exports2, module2) {
    var {
      BURST_WINDOW_MS,
      FEED_MAX_AGE_MS,
      GLOBAL_FEED_CAP,
      GUILD_FEED_CAP,
      PLUGIN_NAME: PLUGIN_NAME2,
      PRIORITY
    } = require_constants();
    function markFeedDirty(ctx, guildId) {
      ctx._feedVersion++;
      ctx._dirtyGuilds.add(guildId);
      ctx._dirty = true;
    }
    function clearGuildBurstEntries(ctx, guildId) {
      for (const [key, burst] of ctx._burstMap) {
        if (burst.guildId === guildId) ctx._burstMap.delete(key);
      }
    }
    function enforceGuildFeedCap(ctx, guildId) {
      const feed = ctx._guildFeeds[guildId];
      if (!feed || feed.length <= GUILD_FEED_CAP) return;
      const removeCount = Math.max(1, Math.floor(GUILD_FEED_CAP * 0.1));
      const removed = feed.splice(0, Math.min(removeCount, feed.length - 1));
      ctx._totalFeedEntries -= removed.length;
      clearGuildBurstEntries(ctx, guildId);
    }
    function getLargestGuildFeedEntry(feedsByGuild) {
      let maxGuild = null;
      let maxLen = 0;
      for (const [guildId, feed] of Object.entries(feedsByGuild)) {
        if (feed.length > maxLen) {
          maxGuild = guildId;
          maxLen = feed.length;
        }
      }
      return { maxGuild, maxLen };
    }
    function enforceGlobalFeedCap(ctx) {
      var _a, _b;
      if (ctx._totalFeedEntries <= GLOBAL_FEED_CAP) return;
      const { maxGuild, maxLen } = getLargestGuildFeedEntry(ctx._guildFeeds);
      if (!maxGuild || maxLen <= 0) return;
      const trimTo = Math.max(100, Math.floor(maxLen / 2));
      const trimmed = maxLen - trimTo;
      ctx._guildFeeds[maxGuild] = ctx._guildFeeds[maxGuild].slice(-trimTo);
      ctx._totalFeedEntries -= trimmed;
      clearGuildBurstEntries(ctx, maxGuild);
      ctx._dirtyGuilds.add(maxGuild);
      (_b = (_a = ctx._plugin).debugLog) == null ? void 0 : _b.call(
        _a,
        "SensesEngine",
        `Global cap: trimmed guild ${maxGuild} from ${maxLen} to ${trimTo}`
      );
    }
    function setMatchReason(entry, reason, matchedTerm) {
      entry.matchReason = reason;
      if (matchedTerm) entry.matchedTerm = matchedTerm;
    }
    function getLowerContent(message, entry) {
      if (typeof (message == null ? void 0 : message.content) === "string" && message.content.length > 0) {
        return message.content.toLowerCase();
      }
      if (typeof (entry == null ? void 0 : entry.content) === "string" && entry.content.length > 0) {
        return entry.content.toLowerCase();
      }
      return "";
    }
    function getPerTargetAlertKeywords(ctx, authorId) {
      var _a, _b;
      const manager = (_a = ctx == null ? void 0 : ctx._plugin) == null ? void 0 : _a.deploymentManager;
      if (!manager) return [];
      if (typeof manager.getAlertKeywordsForUser === "function") {
        return manager.getAlertKeywordsForUser(authorId);
      }
      const deployment = (_b = manager.getDeploymentForUser) == null ? void 0 : _b.call(manager, authorId);
      return Array.isArray(deployment == null ? void 0 : deployment.alertKeywords) ? deployment.alertKeywords : [];
    }
    function findTermMatch(terms, contentLower) {
      if (!contentLower || !Array.isArray(terms) || terms.length === 0) return null;
      for (const term of terms) {
        if (!term) continue;
        if (contentLower.includes(term.toLowerCase())) return term;
      }
      return null;
    }
    function isDirectMention(message, currentUserId) {
      if (!currentUserId || !Array.isArray(message == null ? void 0 : message.mentions)) return false;
      for (const mention of message.mentions) {
        if (String((mention == null ? void 0 : mention.id) || mention) === currentUserId) return true;
      }
      return false;
    }
    function hasCurrentUserRoleMention(ctx, guildId, currentUserId, roleMentions) {
      var _a, _b;
      if (!currentUserId || !guildId || !Array.isArray(roleMentions) || roleMentions.length === 0) {
        return false;
      }
      try {
        const member = (_b = (_a = ctx._plugin._GuildMemberStore) == null ? void 0 : _a.getMember) == null ? void 0 : _b.call(_a, guildId, currentUserId);
        if (!member || !Array.isArray(member.roles)) return false;
        const myRoles = new Set(member.roles.map(String));
        for (const roleId of roleMentions) {
          if (myRoles.has(String(roleId))) return true;
        }
      } catch (_) {
        return false;
      }
      return false;
    }
    function isBurstCandidateMatch(candidate, entry) {
      return !!candidate && candidate.eventType === "message" && candidate.authorId === entry.authorId && candidate.channelId === entry.channelId;
    }
    function resolveBurstIndexByStoredIndex(feed, burst, entry) {
      const index = burst.feedIndex;
      if (!Number.isInteger(index) || index < 0 || index >= feed.length) return -1;
      return isBurstCandidateMatch(feed[index], entry) ? index : -1;
    }
    function resolveBurstIndexByMessageId(feed, burst, entry) {
      if (!burst.messageId) return -1;
      for (let i = feed.length - 1; i >= 0; i--) {
        const candidate = feed[i];
        if (!isBurstCandidateMatch(candidate, entry)) continue;
        if (candidate.messageId === burst.messageId) return i;
      }
      return -1;
    }
    function resolveBurstIndexByWindow(feed, entry) {
      const cutoff = entry.timestamp - BURST_WINDOW_MS;
      for (let i = feed.length - 1; i >= 0; i--) {
        const candidate = feed[i];
        if (!isBurstCandidateMatch(candidate, entry)) continue;
        if ((candidate.timestamp || 0) < cutoff) break;
        return i;
      }
      return -1;
    }
    function shouldAllowBurstMerge(ctx, priorityValue) {
      var _a;
      const allowHighPriorityBursts = !!((_a = ctx._plugin.settings) == null ? void 0 : _a.groupHighPriorityBursts);
      if (!allowHighPriorityBursts && (priorityValue || 1) >= PRIORITY.HIGH) return false;
      return true;
    }
    function updateBurstAfterMerge(burst, targetIndex, target, entry) {
      burst.feedIndex = targetIndex;
      burst.messageId = target.messageId || entry.messageId || burst.messageId || null;
      burst.timestamp = entry.timestamp;
    }
    function serializeUserLastActivityIndex(userLastActivity, maxEntries) {
      if (!(userLastActivity instanceof Map) || userLastActivity.size === 0) return {};
      const sortedEntries = Array.from(userLastActivity.entries()).filter(([userId, data]) => {
        if (!userId) return false;
        const timestamp = Number(data == null ? void 0 : data.timestamp) || 0;
        return timestamp > 0;
      }).sort((a, b) => {
        var _a, _b;
        return (Number((_a = b[1]) == null ? void 0 : _a.timestamp) || 0) - (Number((_b = a[1]) == null ? void 0 : _b.timestamp) || 0);
      }).slice(0, Math.max(1, Number(maxEntries) || 1e3));
      const index = {};
      for (const [userId, data] of sortedEntries) {
        index[userId] = {
          t: Number(data == null ? void 0 : data.timestamp) || 0,
          f: !!(data == null ? void 0 : data.isFallback)
        };
      }
      return index;
    }
    async function flushToDisk() {
      if (this._flushInFlight) return;
      this._flushInFlight = true;
      try {
        const dirtyCount = this._dirtyGuilds.size;
        const shouldSaveActivityIndex = !!this._activityIndexDirty;
        if (dirtyCount === 0 && !this._dirty && !shouldSaveActivityIndex) return;
        for (const guildId of this._dirtyGuilds) {
          BdApi.Data.save(PLUGIN_NAME2, `feed_${guildId}`, this._guildFeeds[guildId] || []);
          await new Promise((r) => setTimeout(r, 0));
        }
        BdApi.Data.save(PLUGIN_NAME2, "feedGuildIds", Object.keys(this._guildFeeds));
        await new Promise((r) => setTimeout(r, 0));
        BdApi.Data.save(PLUGIN_NAME2, "totalDetections", this._totalDetections);
        await new Promise((r) => setTimeout(r, 0));
        if (shouldSaveActivityIndex) {
          BdApi.Data.save(
            PLUGIN_NAME2,
            "userLastActivityIndex",
            serializeUserLastActivityIndex(this._userLastActivity, this._USER_ACTIVITY_MAX)
          );
          await new Promise((r) => setTimeout(r, 0));
        }
        this._dirtyGuilds.clear();
        this._dirty = false;
        this._activityIndexDirty = false;
        this._plugin.debugLog("SensesEngine", "Flushed to disk", {
          dirtyGuilds: dirtyCount,
          totalGuilds: Object.keys(this._guildFeeds).length,
          activityIndexSaved: shouldSaveActivityIndex
        });
      } catch (err) {
        this._plugin.debugError("SensesEngine", "Failed to flush to disk", err);
      } finally {
        this._flushInFlight = false;
      }
    }
    function addToGuildFeed(guildId, entry) {
      var _a;
      if (!this._guildFeeds[guildId]) this._guildFeeds[guildId] = [];
      const feed = this._guildFeeds[guildId];
      feed.push(entry);
      this._totalFeedEntries++;
      if (entry.eventType === "message" && !((_a = this._plugin) == null ? void 0 : _a._panelOpen)) {
        this._unreadCount++;
      }
      enforceGuildFeedCap(this, guildId);
      enforceGlobalFeedCap(this);
      markFeedDirty(this, guildId);
    }
    function purgeOldEntries() {
      const cutoff = Date.now() - FEED_MAX_AGE_MS;
      let totalPurged = 0;
      for (const guildId of Object.keys(this._guildFeeds)) {
        const feed = this._guildFeeds[guildId];
        if (!feed || feed.length === 0) continue;
        let keepFrom = 0;
        while (keepFrom < feed.length && feed[keepFrom].timestamp < cutoff) {
          keepFrom++;
        }
        if (keepFrom > 0) {
          this._guildFeeds[guildId] = feed.slice(keepFrom);
          this._totalFeedEntries -= keepFrom;
          totalPurged += keepFrom;
          this._dirtyGuilds.add(guildId);
          this._dirty = true;
          if (this._guildFeeds[guildId].length === 0) {
            delete this._guildFeeds[guildId];
          }
        }
      }
      if (totalPurged > 0) {
        this._feedVersion++;
        this._plugin.debugLog("SensesEngine", `Purged ${totalPurged} entries older than 3 days`);
      }
    }
    function purgeUtilityEntries() {
      let removed = 0;
      for (const guildId of Object.keys(this._guildFeeds)) {
        const feed = this._guildFeeds[guildId];
        if (!Array.isArray(feed) || feed.length === 0) continue;
        const filtered = feed.filter(
          (entry) => !(entry == null ? void 0 : entry.eventType) || entry.eventType === "message" || entry.eventType === "edit"
        );
        if (filtered.length === feed.length) continue;
        const diff = feed.length - filtered.length;
        this._guildFeeds[guildId] = filtered;
        this._totalFeedEntries -= diff;
        removed += diff;
        this._dirtyGuilds.add(guildId);
        this._dirty = true;
        if (filtered.length === 0) delete this._guildFeeds[guildId];
      }
      if (removed > 0) {
        this._feedVersion++;
        this._plugin.debugLog("SensesEngine", `Purged ${removed} non-message utility entries`);
      }
    }
    function computePriority(message, guildId, entry) {
      var _a, _b, _c, _d, _e, _f, _g;
      const currentUser = (_b = (_a = this._plugin._UserStore) == null ? void 0 : _a.getCurrentUser) == null ? void 0 : _b.call(_a);
      const currentUserId = currentUser == null ? void 0 : currentUser.id;
      const contentLower = getLowerContent(message, entry);
      const targetKeyword = findTermMatch(
        getPerTargetAlertKeywords(this, ((_c = message == null ? void 0 : message.author) == null ? void 0 : _c.id) || (entry == null ? void 0 : entry.authorId)),
        contentLower
      );
      if (targetKeyword) {
        entry.userKeywordMatch = targetKeyword;
      }
      if (isDirectMention(message, currentUserId)) {
        setMatchReason(entry, "mention");
        return PRIORITY.CRITICAL;
      }
      if (currentUserId && ((_e = (_d = message.referenced_message) == null ? void 0 : _d.author) == null ? void 0 : _e.id) === currentUserId) {
        setMatchReason(entry, "reply");
        return PRIORITY.HIGH;
      }
      if (message.mention_everyone) {
        setMatchReason(entry, "everyone");
        return PRIORITY.HIGH;
      }
      const mentionName = findTermMatch((_f = this._plugin.settings) == null ? void 0 : _f.mentionNames, contentLower);
      if (mentionName) {
        setMatchReason(entry, "name", mentionName);
        return PRIORITY.HIGH;
      }
      if (hasCurrentUserRoleMention(this, guildId, currentUserId, message.mention_roles)) {
        setMatchReason(entry, "role");
        return PRIORITY.MEDIUM;
      }
      if (targetKeyword) {
        setMatchReason(entry, "targetKeyword", targetKeyword);
        return PRIORITY.MEDIUM;
      }
      const keyword = findTermMatch((_g = this._plugin.settings) == null ? void 0 : _g.priorityKeywords, contentLower);
      if (keyword) {
        setMatchReason(entry, "keyword", keyword);
        return PRIORITY.MEDIUM;
      }
      return PRIORITY.LOW;
    }
    function resolveBurstTargetIndex(guildId, burst, entry) {
      const feed = this._guildFeeds[guildId];
      if (!feed || feed.length === 0) return -1;
      const byStoredIndex = resolveBurstIndexByStoredIndex(feed, burst, entry);
      if (byStoredIndex >= 0) return byStoredIndex;
      const byMessageId = resolveBurstIndexByMessageId(feed, burst, entry);
      if (byMessageId >= 0) return byMessageId;
      return resolveBurstIndexByWindow(feed, entry);
    }
    function tryBurstGroup(guildId, entry) {
      if (!shouldAllowBurstMerge(this, entry.priority)) return false;
      const key = `${entry.authorId}:${entry.channelId}`;
      const burst = this._burstMap.get(key);
      if (!burst || burst.guildId !== guildId) return false;
      if (entry.timestamp - burst.timestamp > BURST_WINDOW_MS) {
        this._burstMap.delete(key);
        return false;
      }
      const feed = this._guildFeeds[guildId];
      if (!feed || feed.length === 0) {
        this._burstMap.delete(key);
        return false;
      }
      const targetIndex = this._resolveBurstTargetIndex(guildId, burst, entry);
      if (targetIndex < 0) {
        this._burstMap.delete(key);
        return false;
      }
      const target = feed[targetIndex];
      if (!shouldAllowBurstMerge(this, target.priority)) return false;
      if (!target.firstContent) target.firstContent = target.content;
      target.content = entry.content;
      target.messageId = entry.messageId;
      target.timestamp = entry.timestamp;
      target.messageCount = (target.messageCount || 1) + 1;
      if ((entry.priority || 1) > (target.priority || 1)) target.priority = entry.priority;
      if (entry.attachments) target.attachments = entry.attachments;
      if (entry.embeds) target.embeds = entry.embeds;
      updateBurstAfterMerge(burst, targetIndex, target, entry);
      markFeedDirty(this, guildId);
      return true;
    }
    function registerBurst(guildId, entry) {
      const key = `${entry.authorId}:${entry.channelId}`;
      const feed = this._guildFeeds[guildId];
      if (!feed) return;
      this._burstMap.set(key, {
        guildId,
        feedIndex: feed.length - 1,
        messageId: entry.messageId || null,
        timestamp: entry.timestamp
      });
      if (this._burstMap.size > 200) {
        this._burstMap.delete(this._burstMap.keys().next().value);
      }
    }
    function getActiveFeed() {
      if (this._activeFeedCache && this._activeFeedCacheVersion === this._feedVersion && this._activeFeedCacheGuild === this._currentGuildId) {
        return this._activeFeedCache;
      }
      const merged = [];
      for (const [guildId, feed] of Object.entries(this._guildFeeds)) {
        if (guildId === this._currentGuildId) continue;
        for (let i = 0; i < feed.length; i++) {
          merged.push(feed[i]);
        }
      }
      merged.sort((a, b) => a.timestamp - b.timestamp);
      this._activeFeedCache = merged;
      this._activeFeedCacheVersion = this._feedVersion;
      this._activeFeedCacheGuild = this._currentGuildId;
      return merged;
    }
    function buildTargetDossier(userId, windowMs = 24 * 60 * 60 * 1e3) {
      const targetId = String(userId || "").trim();
      if (!targetId) return { text: "", count: 0, userName: "Unknown" };
      const cutoff = Date.now() - windowMs;
      const rows = [];
      for (const feed of Object.values(this._guildFeeds)) {
        for (let i = 0; i < feed.length; i++) {
          const e = feed[i];
          if (String(e.authorId) !== targetId) continue;
          if ((e.timestamp || 0) < cutoff) continue;
          rows.push(e);
        }
      }
      rows.sort((a, b) => (a.timestamp || 0) - (b.timestamp || 0));
      const userName = rows.length ? rows[rows.length - 1].authorName || "Unknown" : "Unknown";
      const hours = Math.round(windowMs / (60 * 60 * 1e3));
      const fmtTime = (ts) => {
        try {
          return new Date(ts).toLocaleString();
        } catch (_) {
          return String(ts);
        }
      };
      const header = [
        `Shadow Senses \u2014 Dossier: ${userName}`,
        `Window: last ${hours}h \xB7 Entries: ${rows.length}`,
        "\u2500".repeat(40)
      ];
      const lines = rows.map((e) => {
        var _a, _b;
        const where = e.guildName ? `${e.guildName} #${e.channelName || "?"}` : `#${e.channelName || "?"}`;
        const tag = e.matchReason ? ` [${e.matchReason}${e.matchedTerm ? `: ${e.matchedTerm}` : ""}]` : "";
        const media = ((_a = e.attachments) == null ? void 0 : _a.length) || ((_b = e.embeds) == null ? void 0 : _b.length) ? " \u{1F4CE}" : "";
        const body = (e.content || "").replace(/\s+/g, " ").trim();
        return `${fmtTime(e.timestamp)} \xB7 ${where}${tag}${media}
  ${body || "(no text)"}`;
      });
      return {
        text: rows.length ? header.concat(lines).join("\n") : `No recorded activity for ${userName} in the last ${hours}h.`,
        count: rows.length,
        userName
      };
    }
    function buildMusterReport() {
      var _a;
      const dm = (_a = this._plugin) == null ? void 0 : _a.deploymentManager;
      const deployments = dm ? dm.getDeployments() : [];
      const now = Date.now();
      const rows = deployments.map((d) => {
        var _a2, _b;
        const uid = String(d.targetUserId);
        const status = ((_a2 = this._statusByUserId) == null ? void 0 : _a2.get(uid)) || "offline";
        const online = status !== "offline";
        const act = (_b = this._userLastActivity) == null ? void 0 : _b.get(uid);
        const silenceMs = (act == null ? void 0 : act.timestamp) ? Math.max(0, now - act.timestamp) : null;
        const userName = this._resolveUserName ? this._resolveUserName(uid, d.targetUsername || "Unknown") : d.targetUsername || "Unknown";
        return {
          rank: d.shadowRank || "E",
          shadowName: d.shadowName || "Shadow",
          userName,
          status,
          statusLabel: this._getStatusLabel ? this._getStatusLabel(status) : status,
          online,
          silenceMs,
          priority: d.priority === true
        };
      });
      rows.sort((a, b) => {
        if (a.priority !== b.priority) return a.priority ? -1 : 1;
        if (a.online !== b.online) return a.online ? -1 : 1;
        return a.userName.localeCompare(b.userName);
      });
      return {
        total: rows.length,
        onlineCount: rows.filter((r) => r.online).length,
        rows,
        generatedAt: now
      };
    }
    function getActiveFeedCount() {
      let count = 0;
      for (const [guildId, feed] of Object.entries(this._guildFeeds)) {
        if (guildId === this._currentGuildId) continue;
        count += feed.length;
      }
      return count;
    }
    function getMarkedOnlineCount() {
      var _a, _b;
      const monitoredIds = (_b = (_a = this._plugin.deploymentManager) == null ? void 0 : _a.getMonitoredUserIds) == null ? void 0 : _b.call(_a);
      if (!monitoredIds || monitoredIds.size === 0) return 0;
      const presenceStore = this._resolvePresenceStore();
      if (!presenceStore || typeof presenceStore.getStatus !== "function") return 0;
      let onlineCount = 0;
      for (const userId of monitoredIds) {
        try {
          const status = this._normalizeStatus(presenceStore.getStatus(userId));
          this._statusByUserId.set(userId, status);
          if (this._isOnlineStatus(status)) onlineCount++;
        } catch (_) {
        }
      }
      return onlineCount;
    }
    function getSessionMessageCount() {
      return this._sessionMessageCount;
    }
    function getTotalDetections() {
      return this._totalDetections;
    }
    function getEntryWeight(entry) {
      const count = Number(entry == null ? void 0 : entry.messageCount);
      if (!Number.isFinite(count) || count < 1) return 1;
      return Math.floor(count);
    }
    function sortTopCounts(map, limit = 3) {
      const cappedLimit = Math.max(1, Math.floor(Number(limit) || 3));
      return Array.from(map.entries()).sort((left, right) => {
        if (right[1] !== left[1]) return right[1] - left[1];
        return left[0].localeCompare(right[0]);
      }).slice(0, cappedLimit).map(([name, count]) => ({ name, count }));
    }
    function getStartupSummary(windowMs = 24 * 60 * 60 * 1e3, topTargetLimit = 3, topChannelLimit = 2) {
      const parsedWindowMs = Number(windowMs);
      const safeWindowMs = Number.isFinite(parsedWindowMs) && parsedWindowMs > 0 ? Math.floor(parsedWindowMs) : 24 * 60 * 60 * 1e3;
      const cutoff = Date.now() - safeWindowMs;
      const activeGuildIds = /* @__PURE__ */ new Set();
      const targetCounts = /* @__PURE__ */ new Map();
      const channelCounts = /* @__PURE__ */ new Map();
      let totalEvents = 0;
      let urgentCount = 0;
      let highCount = 0;
      let mediumCount = 0;
      let lowCount = 0;
      let latestTimestamp = 0;
      for (const [guildId, feed] of Object.entries(this._guildFeeds)) {
        if (!Array.isArray(feed) || feed.length === 0) continue;
        for (const entry of feed) {
          if (!entry || entry.eventType && entry.eventType !== "message") continue;
          const timestamp = Number(entry.timestamp) || 0;
          if (timestamp < cutoff) continue;
          const weight = getEntryWeight(entry);
          const priority = Number(entry.priority) || PRIORITY.LOW;
          totalEvents += weight;
          if (priority >= PRIORITY.CRITICAL) {
            urgentCount += weight;
          } else if (priority >= PRIORITY.HIGH) {
            highCount += weight;
          } else if (priority >= PRIORITY.MEDIUM) {
            mediumCount += weight;
          } else {
            lowCount += weight;
          }
          const normalizedGuildId = String(guildId || "").trim();
          if (normalizedGuildId) activeGuildIds.add(normalizedGuildId);
          const targetName = String(entry.authorName || "Unknown").trim() || "Unknown";
          targetCounts.set(targetName, (targetCounts.get(targetName) || 0) + weight);
          const channelName = String(entry.channelName || "unknown").trim() || "unknown";
          channelCounts.set(channelName, (channelCounts.get(channelName) || 0) + weight);
          if (timestamp > latestTimestamp) latestTimestamp = timestamp;
        }
      }
      return {
        windowMs: safeWindowMs,
        totalEvents,
        urgentCount,
        highCount,
        mediumCount,
        lowCount,
        activeGuildCount: activeGuildIds.size,
        topTargets: sortTopCounts(targetCounts, topTargetLimit),
        topChannels: sortTopCounts(channelCounts, topChannelLimit),
        latestTimestamp
      };
    }
    function getStartupEntries(windowMs = 24 * 60 * 60 * 1e3, limit = 12) {
      const parsedWindowMs = Number(windowMs);
      const safeWindowMs = Number.isFinite(parsedWindowMs) && parsedWindowMs > 0 ? Math.floor(parsedWindowMs) : 24 * 60 * 60 * 1e3;
      const parsedLimit = Number(limit);
      const safeLimit = Number.isFinite(parsedLimit) && parsedLimit > 0 ? Math.min(50, Math.floor(parsedLimit)) : 12;
      const cutoff = Date.now() - safeWindowMs;
      const collected = [];
      for (const [guildId, feed] of Object.entries(this._guildFeeds)) {
        if (!Array.isArray(feed) || feed.length === 0) continue;
        for (const entry of feed) {
          if (!entry || entry.eventType && entry.eventType !== "message") continue;
          const timestamp = Number(entry.timestamp) || 0;
          if (timestamp < cutoff) continue;
          collected.push({
            timestamp,
            guildId: String(guildId || "").trim(),
            guildName: String(entry.guildName || guildId || "Unknown").trim() || "Unknown",
            channelName: String(entry.channelName || "unknown").trim() || "unknown",
            authorName: String(entry.authorName || "Unknown").trim() || "Unknown",
            priority: Number(entry.priority) || PRIORITY.LOW,
            messageCount: Number(entry.messageCount) || 1,
            content: String(entry.content || "").replace(/\s+/g, " ").trim().slice(0, 220),
            // Carry WHY this signal fired so the report can explain the priority
            // ("mentioned you" / keyword) instead of a bare [URGENT].
            matchReason: entry.matchReason ? String(entry.matchReason) : null,
            matchedTerm: entry.matchedTerm ? String(entry.matchedTerm) : entry.userKeywordMatch ? String(entry.userKeywordMatch) : null
          });
        }
      }
      collected.sort((left, right) => {
        if (right.priority !== left.priority) return right.priority - left.priority;
        if (right.timestamp !== left.timestamp) return right.timestamp - left.timestamp;
        return left.authorName.localeCompare(right.authorName);
      });
      return collected.slice(0, safeLimit);
    }
    function getUnreadCount() {
      return this._unreadCount || 0;
    }
    function clearUnread() {
      this._unreadCount = 0;
      this._lastPanelOpenedAt = Date.now();
    }
    module2.exports = {
      _addToGuildFeed: addToGuildFeed,
      _computePriority: computePriority,
      _flushToDisk: flushToDisk,
      _getStartupSummary: getStartupSummary,
      _purgeOldEntries: purgeOldEntries,
      _purgeUtilityEntries: purgeUtilityEntries,
      _registerBurst: registerBurst,
      _resolveBurstTargetIndex: resolveBurstTargetIndex,
      _getStartupEntries: getStartupEntries,
      _tryBurstGroup: tryBurstGroup,
      getActiveFeed,
      getActiveFeedCount,
      buildTargetDossier,
      buildMusterReport,
      getMarkedOnlineCount,
      getSessionMessageCount,
      getStartupSummary,
      getStartupEntries,
      getTotalDetections,
      getUnreadCount,
      clearUnread
    };
  }
});

// src/ShadowSenses/senses-engine-utils.js
var require_senses_engine_utils = __commonJS({
  "src/ShadowSenses/senses-engine-utils.js"(exports2, module2) {
    var {
      DEFAULT_TYPING_ALERT_COOLDOWN_MS,
      ONLINE_STATUSES,
      STATUS_ACCENT_COLORS,
      STATUS_LABELS,
      STATUS_TOAST_TIMEOUT_MS
    } = require_constants();
    function resolveUserStore() {
      if (this._plugin._UserStore) return this._plugin._UserStore;
      try {
        this._plugin._UserStore = BdApi.Webpack.getStore("UserStore");
      } catch (err) {
        this._plugin.debugError("SensesEngine", "Failed to resolve UserStore", err);
      }
      return this._plugin._UserStore;
    }
    function resolvePresenceStore() {
      if (this._plugin._PresenceStore) return this._plugin._PresenceStore;
      try {
        this._plugin._PresenceStore = BdApi.Webpack.getStore("PresenceStore");
      } catch (err) {
        this._plugin.debugError("SensesEngine", "Failed to resolve PresenceStore", err);
      }
      return this._plugin._PresenceStore;
    }
    function resolveRelationshipStore() {
      if (this._plugin._RelationshipStore) return this._plugin._RelationshipStore;
      try {
        this._plugin._RelationshipStore = BdApi.Webpack.getStore("RelationshipStore");
      } catch (err) {
        this._plugin.debugError("SensesEngine", "Failed to resolve RelationshipStore", err);
      }
      return this._plugin._RelationshipStore;
    }
    function normalizeStatus(status) {
      if (!status || typeof status !== "string") return "offline";
      return status.toLowerCase();
    }
    function inferStatusFromClientStatus(clientStatus, normalizer) {
      if (!clientStatus || typeof clientStatus !== "object") return null;
      const statuses = Object.values(clientStatus).map(
        (statusValue) => typeof statusValue === "string" && statusValue.trim().length > 0 ? normalizer(statusValue) : null
      ).filter(Boolean);
      if (statuses.length === 0) return "offline";
      if (statuses.includes("dnd")) return "dnd";
      if (statuses.includes("online")) return "online";
      if (statuses.includes("idle")) return "idle";
      if (statuses.includes("offline")) return "offline";
      if (statuses.includes("invisible")) return "invisible";
      return statuses[0];
    }
    function resolvePresenceUpdateUserId(update) {
      var _a, _b, _c, _d, _e;
      if (!update || typeof update !== "object") return null;
      const candidate = update.userId || update.user_id || ((_a = update.user) == null ? void 0 : _a.id) || ((_c = (_b = update.member) == null ? void 0 : _b.user) == null ? void 0 : _c.id) || ((_e = (_d = update.presence) == null ? void 0 : _d.user) == null ? void 0 : _e.id) || update.id;
      if (!candidate) return null;
      return String(candidate);
    }
    function resolvePresenceUpdateStatus(update, normalizer) {
      var _a, _b, _c, _d, _e;
      if (!update || typeof update !== "object") return null;
      const explicitStatus = update.status || ((_a = update.presence) == null ? void 0 : _a.status) || ((_c = (_b = update.user) == null ? void 0 : _b.presence) == null ? void 0 : _c.status) || update.userStatus || null;
      if (typeof explicitStatus === "string" && explicitStatus.trim().length > 0) {
        return normalizer(explicitStatus);
      }
      return inferStatusFromClientStatus(
        update.clientStatus || update.client_status || ((_d = update.user) == null ? void 0 : _d.clientStatus) || ((_e = update.user) == null ? void 0 : _e.client_status),
        normalizer
      );
    }
    function flattenPresenceUpdateCandidates(group, monitoredIds) {
      if (!group) return [];
      const queue = [group];
      const visited = /* @__PURE__ */ new Set();
      const updates = [];
      while (queue.length > 0) {
        const current = queue.shift();
        if (!current || typeof current !== "object") continue;
        if (visited.has(current)) continue;
        visited.add(current);
        if (Array.isArray(current)) {
          for (const item of current) queue.push(item);
          continue;
        }
        if (current instanceof Map || current instanceof Set) {
          for (const item of current.values()) queue.push(item);
          continue;
        }
        const candidateId = resolvePresenceUpdateUserId(current);
        if (candidateId) {
          if (monitoredIds && !monitoredIds.has(candidateId)) continue;
          updates.push(current);
          continue;
        }
        for (const value of Object.values(current)) queue.push(value);
      }
      return updates;
    }
    function isOnlineStatus(status) {
      return ONLINE_STATUSES.has(this._normalizeStatus(status));
    }
    function getStatusLabel(status) {
      const normalized = this._normalizeStatus(status);
      return STATUS_LABELS[normalized] || normalized;
    }
    function getFriendIdSet() {
      const relationshipStore = this._resolveRelationshipStore();
      if (!relationshipStore || typeof relationshipStore.getFriendIDs !== "function") return /* @__PURE__ */ new Set();
      try {
        return new Set((relationshipStore.getFriendIDs() || []).map(String));
      } catch (err) {
        this._plugin.debugError("SensesEngine", "Failed to read friend IDs", err);
        return /* @__PURE__ */ new Set();
      }
    }
    function snapshotFriendRelationships() {
      this._relationshipFriendIds = this._getFriendIdSet();
    }
    function resolveUserName(userId, fallbackName = "Unknown") {
      const userStore = this._resolveUserStore();
      if (!userStore || typeof userStore.getUser !== "function") return fallbackName;
      try {
        const user = userStore.getUser(userId);
        return (user == null ? void 0 : user.globalName) || (user == null ? void 0 : user.global_name) || (user == null ? void 0 : user.username) || fallbackName;
      } catch (_) {
        return fallbackName;
      }
    }
    function resolveUserAvatarUrl(userId) {
      var _a, _b, _c, _d;
      const userStore = this._resolveUserStore();
      if (!userStore || typeof userStore.getUser !== "function") return null;
      try {
        const user = userStore.getUser(userId);
        if (!user) return null;
        try {
          const v = (_a = user.getAvatarURL) == null ? void 0 : _a.call(user, null, 64, true);
          if (typeof v === "string" && v.length > 4) return v;
        } catch (_) {
        }
        try {
          const v = (_b = user.getAvatarURL) == null ? void 0 : _b.call(user);
          if (typeof v === "string" && v.length > 4) return v;
        } catch (_) {
        }
        try {
          const v = (_c = user.getAvatarURL) == null ? void 0 : _c.call(user, 64);
          if (typeof v === "string" && v.length > 4) return v;
        } catch (_) {
        }
        try {
          const v = (_d = user.getDefaultAvatarURL) == null ? void 0 : _d.call(user);
          if (typeof v === "string" && v.length > 4) return v;
        } catch (_) {
        }
        if (typeof user.defaultAvatarURL === "string" && user.defaultAvatarURL.length > 4) {
          return user.defaultAvatarURL;
        }
        if (user.avatar && user.id) {
          return `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png?size=64`;
        }
      } catch (_) {
      }
      return null;
    }
    function isFriend(userId) {
      return this._relationshipFriendIds instanceof Set && this._relationshipFriendIds.has(String(userId));
    }
    var _fallbackToastTimestamps = [];
    var _FALLBACK_TOAST_MAX_PER_MIN = 30;
    function toast(message, type = "info", timeout = null) {
      if (this._toastEngine) {
        this._toastEngine.showToast(message, type, timeout, {
          callerId: "shadowSenses-utility",
          maxPerMinute: 30
        });
      } else {
        const now = Date.now();
        while (_fallbackToastTimestamps.length && _fallbackToastTimestamps[0] < now - 6e4) {
          _fallbackToastTimestamps.shift();
        }
        if (_fallbackToastTimestamps.length >= _FALLBACK_TOAST_MAX_PER_MIN) return;
        _fallbackToastTimestamps.push(now);
        BdApi.UI.showToast(message, { type, ...timeout ? { timeout } : {} });
      }
    }
    function scheduleStatusToast(toastPayload, delayMs = 0) {
      const emit = () => {
        if (this._plugin._stopped) return;
        this._showStatusToast(toastPayload);
      };
      if (!Number.isFinite(delayMs) || delayMs <= 0) {
        emit();
        return;
      }
      const timer = setTimeout(() => {
        this._deferredStatusToastTimers.delete(timer);
        emit();
      }, Math.floor(delayMs));
      this._deferredStatusToastTimers.add(timer);
    }
    function scheduleDeferredUtilityToast(callback, delayMs = 0) {
      if (typeof callback !== "function") return;
      const emit = () => {
        if (this._plugin._stopped) return;
        callback();
      };
      if (!Number.isFinite(delayMs) || delayMs <= 0) {
        emit();
        return;
      }
      const timer = setTimeout(() => {
        this._deferredUtilityToastTimers.delete(timer);
        emit();
      }, Math.floor(delayMs));
      this._deferredUtilityToastTimers.add(timer);
    }
    function showStatusToast({ userId, userName, previousLabel, nextLabel, nextStatus, deployment, body }) {
      if (!this._toastEngine || this._toastEngine._isStopped) {
        this._toastEngine = null;
        try {
          const p = BdApi.Plugins.get("SoloLevelingToasts");
          const inst = p == null ? void 0 : p.instance;
          if ((inst == null ? void 0 : inst.toastEngineVersion) >= 2 && !inst._isStopped) this._toastEngine = inst;
        } catch (_) {
        }
      }
      const priority = (deployment == null ? void 0 : deployment.priority) === true;
      const accent = priority ? "#fbbf24" : STATUS_ACCENT_COLORS[nextStatus] || "#8a2be2";
      const rankLabel = (deployment == null ? void 0 : deployment.shadowRank) || "E";
      const shadowName = (deployment == null ? void 0 : deployment.shadowName) || "Shadow";
      const friendSuffix = this._isFriend(userId) ? " [FRIEND]" : "";
      if (this._toastEngine) {
        const avatarUrl = this._resolveUserAvatarUrl(userId);
        this._toastEngine.showCardToast({
          avatarUrl: avatarUrl || "https://cdn.discordapp.com/embed/avatars/0.png",
          accentColor: accent,
          header: `[${rankLabel}] ${shadowName} reports${friendSuffix}`,
          body: body || `${userName || "Unknown"} ${previousLabel} -> ${nextLabel}`,
          timeout: STATUS_TOAST_TIMEOUT_MS,
          callerId: "shadowSenses-status",
          maxPerMinute: priority ? 120 : 45,
          // Per-friend replacement: a fresh status toast for this user dismisses
          // any older one still on screen, so only the latest transition shows.
          replaceKey: `shadowsenses-presence:${userId}`
        });
      } else {
        BdApi.UI.showToast(`[${rankLabel}] ${shadowName}: ${userName} ${previousLabel} -> ${nextLabel}`, { type: "info" });
      }
    }
    function showMentionToast({ userId, userName, label, detail, accent, deployment, onClick, imageUrl, body }) {
      if (this._toastEngine) {
        const avatarUrl = this._resolveUserAvatarUrl(userId) || "https://cdn.discordapp.com/embed/avatars/0.png";
        const priority = (deployment == null ? void 0 : deployment.priority) === true;
        this._toastEngine.showCardToast({
          avatarUrl,
          accentColor: priority ? "#fbbf24" : accent,
          header: `[${(deployment == null ? void 0 : deployment.shadowRank) || "E"}] ${(deployment == null ? void 0 : deployment.shadowName) || "Shadow"}`,
          body: body || `${userName} ${label}`,
          detail: detail || void 0,
          timeout: STATUS_TOAST_TIMEOUT_MS,
          callerId: "shadowSenses-mention",
          maxPerMinute: priority ? 120 : 30,
          onClick: typeof onClick === "function" ? onClick : void 0,
          // Inline media preview (image attachment / GIF still) when the
          // triggering message carried one (2026-07-13).
          imageUrl: imageUrl || void 0
        });
      } else {
        BdApi.UI.showToast(`${userName} ${label}`, { type: "info" });
      }
    }
    function seedTrackedStatuses() {
      const presenceStore = this._resolvePresenceStore();
      this._statusByUserId.clear();
      if (!presenceStore || typeof presenceStore.getStatus !== "function") return;
      const monitoredIds = this._plugin.deploymentManager.getMonitoredUserIds();
      for (const userId of monitoredIds) {
        try {
          const status = this._normalizeStatus(presenceStore.getStatus(userId));
          this._statusByUserId.set(userId, status);
        } catch (_) {
        }
      }
    }
    function getTypingCooldownMs() {
      var _a;
      const ms = Number((_a = this._plugin.settings) == null ? void 0 : _a.typingAlertCooldownMs);
      if (!Number.isFinite(ms)) return DEFAULT_TYPING_ALERT_COOLDOWN_MS;
      return Math.min(6e4, Math.max(3e3, Math.floor(ms)));
    }
    function extractPresenceUpdates(payload, monitoredIds) {
      if (!payload) return [];
      const updatesByUserId = /* @__PURE__ */ new Map();
      const normalizer = (statusValue) => this._normalizeStatus(statusValue);
      const upsertUpdate = (userId, status) => {
        if (!userId) return;
        const normalizedUserId = String(userId);
        const normalizedStatus = typeof status === "string" && status.trim().length > 0 ? normalizer(status) : null;
        const existing = updatesByUserId.get(normalizedUserId);
        if ((existing == null ? void 0 : existing.status) && !normalizedStatus) return;
        updatesByUserId.set(normalizedUserId, {
          userId: normalizedUserId,
          status: normalizedStatus
        });
      };
      const updateGroups = [
        payload,
        payload.updates,
        payload.presences,
        payload.presenceUpdates,
        payload.presence_updates,
        payload.guildPresences,
        payload.guild_presences,
        payload.memberPresences,
        payload.member_presences,
        payload.memberUpdates,
        payload.member_updates,
        payload.members
      ];
      for (const group of updateGroups) {
        for (const update of flattenPresenceUpdateCandidates(group, monitoredIds)) {
          const userId = resolvePresenceUpdateUserId(update);
          if (!userId) continue;
          const status = resolvePresenceUpdateStatus(update, normalizer);
          upsertUpdate(userId, status);
        }
      }
      return Array.from(updatesByUserId.values());
    }
    module2.exports = {
      _extractPresenceUpdates: extractPresenceUpdates,
      _getFriendIdSet: getFriendIdSet,
      _getStatusLabel: getStatusLabel,
      _getTypingCooldownMs: getTypingCooldownMs,
      _isFriend: isFriend,
      _isOnlineStatus: isOnlineStatus,
      _normalizeStatus: normalizeStatus,
      _resolvePresenceStore: resolvePresenceStore,
      _resolveRelationshipStore: resolveRelationshipStore,
      _resolveUserAvatarUrl: resolveUserAvatarUrl,
      _resolveUserName: resolveUserName,
      _resolveUserStore: resolveUserStore,
      _scheduleDeferredUtilityToast: scheduleDeferredUtilityToast,
      _scheduleStatusToast: scheduleStatusToast,
      _seedTrackedStatuses: seedTrackedStatuses,
      _showMentionToast: showMentionToast,
      _showStatusToast: showStatusToast,
      _snapshotFriendRelationships: snapshotFriendRelationships,
      _toast: toast,
      resolvePresenceUpdateStatus
    };
  }
});

// src/shared/navigation.js
var require_navigation = __commonJS({
  "src/shared/navigation.js"(exports2, module2) {
    var { Webpack } = BdApi;
    var _cached = null;
    function getNavigationUtils() {
      if (_cached) return _cached;
      _cached = Webpack.getByKeys("transitionTo", "back", "forward") || Webpack.getModule((m) => m.transitionTo && m.back && m.forward) || null;
      return _cached;
    }
    module2.exports = { getNavigationUtils };
  }
});

// src/ShadowSenses/report-voice.js
var require_report_voice = __commonJS({
  "src/ShadowSenses/report-voice.js"(exports2, module2) {
    var MONARCH_STATUS = {
      online: "has awakened",
      idle: "grows distant",
      dnd: "stands guarded",
      offline: "has fallen silent"
    };
    function _loc(location) {
      return location ? ` in ${location}` : "";
    }
    function reportBody(kind, ctx, monarch) {
      const u = ctx.userName || "Unknown";
      const loc = ctx.location || "";
      switch (kind) {
        case "status":
          return monarch ? `${u} ${MONARCH_STATUS[ctx.nextStatus] || `is now ${ctx.nextLabel}`}` : `${u} ${ctx.prevLabel} \u2192 ${ctx.nextLabel}`;
        case "typing":
          return monarch ? `${u} stirs${_loc(loc)}` : `${u} typing${_loc(loc)}`;
        case "message":
          return monarch ? `${u} speaks${_loc(loc)}` : `${u} sent${_loc(loc)}`;
        case "invisible":
          return monarch ? `${u} moves unseen${_loc(loc)}` : `${u} sent a message while invisible`;
        case "mention":
          return monarch ? `My liege \u2014 ${u} calls upon you${_loc(loc)}` : `${u} @mentioned you`;
        case "name":
          return monarch ? `My liege \u2014 ${u} utters your name${_loc(loc)}` : `${u} said "${ctx.term}"`;
        case "keyword":
          return monarch ? `${u} speaks of "${ctx.term}"${_loc(loc)}` : `${u} keyword "${ctx.term}"`;
        default:
          return `${u}`;
      }
    }
    module2.exports = { reportBody };
  }
});

// src/ShadowSenses/senses-engine-events.js
var require_senses_engine_events = __commonJS({
  "src/ShadowSenses/senses-engine-events.js"(exports2, module2) {
    var {
      BURST_WINDOW_MS,
      GLOBAL_UTILITY_FEED_ID,
      STARTUP_TOAST_GRACE_MS: STARTUP_TOAST_GRACE_MS2
    } = require_constants();
    var { resolvePresenceUpdateStatus } = require_senses_engine_utils();
    var { getNavigationUtils } = require_navigation();
    var DEFAULT_AVATAR_URL = "https://cdn.discordapp.com/embed/avatars/0.png";
    var _messageActionsModule = null;
    function _getMessageActions() {
      if (typeof (_messageActionsModule == null ? void 0 : _messageActionsModule.jumpToMessage) === "function") return _messageActionsModule;
      const W = BdApi.Webpack;
      const strategies = [
        ["getByKeys(jumpToMessage)", () => {
          var _a;
          return (_a = W.getByKeys) == null ? void 0 : _a.call(W, "jumpToMessage");
        }],
        ["getByKeys(jumpToMessage,sendMessage)", () => {
          var _a;
          return (_a = W.getByKeys) == null ? void 0 : _a.call(W, "jumpToMessage", "sendMessage");
        }],
        ["getModule(fn)", () => {
          var _a;
          return (_a = W.getModule) == null ? void 0 : _a.call(W, (m) => typeof (m == null ? void 0 : m.jumpToMessage) === "function");
        }],
        ["getModule(combined)", () => {
          var _a;
          return (_a = W.getModule) == null ? void 0 : _a.call(W, (m) => (m == null ? void 0 : m.jumpToMessage) && (m == null ? void 0 : m.sendMessage) && ((m == null ? void 0 : m.receiveMessage) || (m == null ? void 0 : m.editMessage)));
        }],
        ["nested.default", () => {
          var _a, _b;
          return (_b = (_a = W.getModule) == null ? void 0 : _a.call(W, (m) => {
            var _a2;
            return typeof ((_a2 = m == null ? void 0 : m.default) == null ? void 0 : _a2.jumpToMessage) === "function";
          })) == null ? void 0 : _b.default;
        }],
        ["nested.Z", () => {
          var _a, _b;
          return (_b = (_a = W.getModule) == null ? void 0 : _a.call(W, (m) => {
            var _a2;
            return typeof ((_a2 = m == null ? void 0 : m.Z) == null ? void 0 : _a2.jumpToMessage) === "function";
          })) == null ? void 0 : _b.Z;
        }],
        ["nested.ZP", () => {
          var _a, _b;
          return (_b = (_a = W.getModule) == null ? void 0 : _a.call(W, (m) => {
            var _a2;
            return typeof ((_a2 = m == null ? void 0 : m.ZP) == null ? void 0 : _a2.jumpToMessage) === "function";
          })) == null ? void 0 : _b.ZP;
        }]
      ];
      for (const [, strat] of strategies) {
        try {
          const mod = strat();
          if (typeof (mod == null ? void 0 : mod.jumpToMessage) === "function") {
            _messageActionsModule = mod;
            return mod;
          }
        } catch (_) {
        }
      }
      return null;
    }
    var _channelStore = null;
    function _getChannelStore() {
      if (_channelStore == null ? void 0 : _channelStore.getChannel) return _channelStore;
      try {
        _channelStore = BdApi.Webpack.getStore("ChannelStore") || null;
      } catch (_) {
        _channelStore = null;
      }
      return _channelStore;
    }
    function _resolveGuildSegment(guildId, channelId) {
      var _a, _b;
      if (guildId && guildId !== "DM") return guildId;
      try {
        const ch = (_b = (_a = _getChannelStore()) == null ? void 0 : _a.getChannel) == null ? void 0 : _b.call(_a, channelId);
        if (ch == null ? void 0 : ch.guild_id) return ch.guild_id;
      } catch (_) {
      }
      return "@me";
    }
    function _portalStyleNavigate(path2) {
      var _a;
      try {
        const nav = getNavigationUtils();
        if (nav == null ? void 0 : nav.transitionTo) {
          nav.transitionTo(path2);
          return "transitionTo";
        }
      } catch (_) {
      }
      try {
        if ((_a = window.history) == null ? void 0 : _a.pushState) {
          window.history.pushState({}, "", path2);
          window.dispatchEvent(new PopStateEvent("popstate"));
          return "pushState";
        }
      } catch (_) {
      }
      return "none";
    }
    function portalJump(ctx, guildId, channelId, messageId) {
      if (!channelId) return;
      const plugin = ctx == null ? void 0 : ctx._plugin;
      if (plugin && typeof plugin.teleportToPath === "function") {
        const seg = _resolveGuildSegment(guildId, channelId);
        const path2 = messageId ? `/channels/${seg}/${channelId}/${messageId}` : `/channels/${seg}/${channelId}`;
        try {
          plugin.teleportToPath(path2, {}, messageId || null);
          return;
        } catch (_) {
        }
      }
      navigateToChannel(guildId, channelId, messageId);
    }
    function navigateToChannel(guildId, channelId, messageId) {
      if (!channelId) return false;
      const seg = _resolveGuildSegment(guildId, channelId);
      if (!messageId) {
        return _portalStyleNavigate(`/channels/${seg}/${channelId}`) !== "none";
      }
      const navVia = _portalStyleNavigate(`/channels/${seg}/${channelId}/${messageId}`);
      const actions = _getMessageActions();
      if (actions) {
        setTimeout(() => {
          try {
            actions.jumpToMessage({ channelId, messageId, flash: true });
          } catch (_) {
            try {
              actions.jumpToMessage(channelId, messageId);
            } catch (_2) {
            }
          }
        }, 700);
      }
      return navVia !== "none";
    }
    function pickToastThumbnail(entry) {
      if (!entry) return void 0;
      if (Array.isArray(entry.attachments)) {
        for (const a of entry.attachments) {
          if ((a == null ? void 0 : a.url) && String(a.contentType || "").startsWith("image/")) return a.url;
        }
      }
      if (Array.isArray(entry.embeds)) {
        for (const e of entry.embeds) {
          if (e == null ? void 0 : e.thumbnailUrl) return e.thumbnailUrl;
        }
      }
      return void 0;
    }
    var { reportBody } = require_report_voice();
    function _monarch(ctx) {
      var _a, _b;
      return ((_b = (_a = ctx == null ? void 0 : ctx._plugin) == null ? void 0 : _a.settings) == null ? void 0 : _b.reportToMonarch) !== false;
    }
    function focusAllows(deployment, signal) {
      var _a;
      if (deployment == null ? void 0 : deployment.priority) return true;
      return ((_a = deployment == null ? void 0 : deployment.watchFocus) == null ? void 0 : _a[signal]) !== false;
    }
    var PRIORITY_ACCENT = "#fbbf24";
    var MAX_ACTIVITY_SEED_SCAN_ENTRIES = 6e3;
    var LAST_SEEN_FALLBACK_MS = 24 * 60 * 60 * 1e3;
    function getStartupState(ctx) {
      const now = Date.now();
      const msSinceSubscribe = now - ctx._subscribeTime;
      const isEarlyStartup = ctx._subscribeTime > 0 && msSinceSubscribe < STARTUP_TOAST_GRACE_MS2;
      return {
        now,
        msSinceSubscribe,
        isEarlyStartup,
        delayMs: isEarlyStartup ? Math.max(0, STARTUP_TOAST_GRACE_MS2 - msSinceSubscribe) : 0
      };
    }
    function ensureCurrentGuildId(ctx) {
      if (ctx._currentGuildId) return;
      try {
        ctx._currentGuildId = ctx._plugin._SelectedGuildStore ? ctx._plugin._SelectedGuildStore.getGuildId() : null;
        if (ctx._currentGuildId) {
          ctx._plugin._debugMode && console.log(`[ShadowSenses] Lazy guild resolve: _currentGuildId=${ctx._currentGuildId}`);
        }
      } catch (_) {
      }
    }
    function resolveMessageChannelContext(ctx, message) {
      let channelName = "unknown";
      let guildId = message.guild_id || null;
      try {
        const channel = ctx._plugin._ChannelStore ? ctx._plugin._ChannelStore.getChannel(message.channel_id) : null;
        if (channel) {
          channelName = channel.name || "unknown";
          if (!guildId) guildId = channel.guild_id;
        }
      } catch (chErr) {
        ctx._plugin.debugError("SensesEngine", "Failed to resolve channel", chErr);
      }
      if (!guildId) return null;
      return { guildId, channelName };
    }
    function resolveTypingPayload(payload) {
      if (!payload) return null;
      const userId = String(payload.userId || payload.user_id || "");
      if (!userId) return null;
      return {
        userId,
        channelId: payload.channelId || payload.channel_id || null,
        guildId: payload.guildId || payload.guild_id || null
      };
    }
    function resolveTypingChannelContext(ctx, channelId, initialGuildId) {
      var _a, _b;
      let guildId = initialGuildId || null;
      let channelName = "unknown";
      if (!channelId || !((_a = ctx._plugin._ChannelStore) == null ? void 0 : _a.getChannel)) return { guildId, channelName };
      try {
        const channel = ctx._plugin._ChannelStore.getChannel(channelId);
        if (!channel) return { guildId, channelName };
        channelName = channel.name || ((_b = channel.rawRecipients) == null ? void 0 : _b.map((recipient) => recipient == null ? void 0 : recipient.username).filter(Boolean).join(", ")) || "Direct Message";
        if (!guildId && channel.guild_id) guildId = channel.guild_id;
      } catch (err) {
        ctx._plugin.debugError("SensesEngine", "Failed to resolve typing channel", err);
      }
      return { guildId, channelName };
    }
    function pruneTypingCooldown(ctx, now, cooldownMs) {
      if (ctx._typingToastCooldown.size <= 500) return;
      for (const [key, ts] of ctx._typingToastCooldown.entries()) {
        if (now - ts > cooldownMs * 4) ctx._typingToastCooldown.delete(key);
      }
    }
    function shouldSkipTypingToast(ctx, cooldownKey, now, cooldownMs) {
      const lastToastAt = ctx._typingToastCooldown.get(cooldownKey) || 0;
      if (now - lastToastAt < cooldownMs) return true;
      ctx._typingToastCooldown.set(cooldownKey, now);
      pruneTypingCooldown(ctx, now, cooldownMs);
      return false;
    }
    function syncLastSeenCount(ctx, guildId) {
      if (!guildId || guildId !== ctx._currentGuildId) return;
      const feed = ctx._guildFeeds[guildId];
      if (feed) ctx._lastSeenCount[guildId] = feed.length;
    }
    function getRemovedFriendIds(previousFriends, nextFriends) {
      const removed = [];
      for (const friendId of previousFriends) {
        if (!nextFriends.has(friendId)) removed.push(friendId);
      }
      return removed;
    }
    function withStartupDelay(ctx, startupState, action) {
      if (!startupState.isEarlyStartup) {
        action();
        return;
      }
      ctx._scheduleDeferredUtilityToast(action, startupState.delayMs);
    }
    function showActivityToast(ctx, options) {
      const {
        deployment,
        accentColor,
        body,
        detail,
        fallbackType,
        fallbackBody
      } = options;
      const avatarUrl = ctx._resolveUserAvatarUrl(options.authorId) || DEFAULT_AVATAR_URL;
      if (ctx._toastEngine) {
        ctx._toastEngine.showCardToast({
          avatarUrl,
          accentColor,
          header: `[${deployment.shadowRank}] ${deployment.shadowName}`,
          body,
          detail,
          // BUGFIX (2026-07-13): was `duration:` — showCardToast reads `timeout`,
          // so these activity toasts silently used the default instead of 5s.
          timeout: 5e3
        });
        return;
      }
      ctx._toast(
        `[${deployment.shadowRank}] ${deployment.shadowName} reports: ${fallbackBody}`,
        fallbackType,
        5e3
      );
    }
    function formatSilenceDuration(silenceMs) {
      if (!Number.isFinite(silenceMs) || silenceMs <= 0) return "<1m";
      const totalMinutes = Math.floor(silenceMs / (60 * 1e3));
      const days = Math.floor(totalMinutes / (24 * 60));
      const hours = Math.floor(totalMinutes % (24 * 60) / 60);
      const minutes = totalMinutes % 60;
      if (days > 0) return `${days}d${hours > 0 ? ` ${hours}h` : ""}`;
      if (hours > 0) return `${hours}h${minutes > 0 ? ` ${minutes}m` : ""}`;
      if (minutes > 0) return `${minutes}m`;
      return "<1m";
    }
    function upsertUserLastActivity(ctx, authorId, timestamp, notifiedActive, isFallback = false) {
      const normalizedUserId = String(authorId || "");
      const nextTimestamp = Number(timestamp) || 0;
      if (!normalizedUserId || nextTimestamp <= 0) return;
      const current = ctx._userLastActivity.get(normalizedUserId);
      if (current && nextTimestamp < (current.timestamp || 0)) return;
      ctx._userLastActivity.set(normalizedUserId, {
        timestamp: nextTimestamp,
        notifiedActive: !!notifiedActive,
        isFallback: !!isFallback
      });
      ctx._activityIndexDirty = true;
    }
    function getPendingSeedUserIds(ctx) {
      var _a, _b;
      const monitoredIds = (_b = (_a = ctx._plugin.deploymentManager) == null ? void 0 : _a.getMonitoredUserIds) == null ? void 0 : _b.call(_a);
      if (!(monitoredIds instanceof Set) || monitoredIds.size === 0) return /* @__PURE__ */ new Set();
      const pending = /* @__PURE__ */ new Set();
      for (const monitoredId of monitoredIds) {
        const userId = String(monitoredId || "");
        if (!userId) continue;
        const cached = ctx._userLastActivity.get(userId);
        if (!cached || !Number.isFinite(cached.timestamp) || cached.timestamp <= 0) {
          pending.add(userId);
        }
      }
      return pending;
    }
    function seedUserActivityFromFeeds() {
      if (this._activitySeededFromHistory) return;
      this._activitySeededFromHistory = true;
      if (!this._guildFeeds || typeof this._guildFeeds !== "object") return;
      const pendingSeedUserIds = getPendingSeedUserIds(this);
      if (pendingSeedUserIds.size === 0) return;
      let scannedEntries = 0;
      let scanLimitReached = false;
      for (const feed of Object.values(this._guildFeeds)) {
        if (!Array.isArray(feed) || feed.length === 0) continue;
        for (let index = feed.length - 1; index >= 0; index--) {
          scannedEntries++;
          if (scannedEntries > MAX_ACTIVITY_SEED_SCAN_ENTRIES) {
            scanLimitReached = true;
            break;
          }
          const entry = feed[index];
          if (!entry || entry.eventType !== "message") continue;
          const authorId = entry.authorId ? String(entry.authorId) : "";
          const timestamp = Number(entry.timestamp) || 0;
          if (!authorId || timestamp <= 0 || !pendingSeedUserIds.has(authorId)) continue;
          upsertUserLastActivity(this, authorId, timestamp, false);
          pendingSeedUserIds.delete(authorId);
          if (pendingSeedUserIds.size === 0) break;
        }
        if (scanLimitReached) break;
        if (pendingSeedUserIds.size === 0) break;
      }
      if (scanLimitReached && pendingSeedUserIds.size > 0) {
        this._plugin.debugLog(
          "SensesEngine",
          "Activity seed scan capped to avoid startup hitch",
          { unresolved: pendingSeedUserIds.size, scannedEntries: MAX_ACTIVITY_SEED_SCAN_ENTRIES }
        );
      }
      if (pendingSeedUserIds.size > 0) {
        const fallbackTimestamp = Date.now() - LAST_SEEN_FALLBACK_MS;
        for (const unresolvedUserId of pendingSeedUserIds) {
          upsertUserLastActivity(this, unresolvedUserId, fallbackTimestamp, false, true);
        }
      }
      trimUserActivitySeedCache(this);
    }
    function pruneUserActivityCache(ctx) {
      if (ctx._userLastActivity.size <= ctx._USER_ACTIVITY_MAX) return;
      const oldest = ctx._userLastActivity.keys().next().value;
      if (oldest != null) ctx._userLastActivity.delete(oldest);
    }
    function trimUserActivitySeedCache(ctx) {
      if (ctx._userLastActivity.size <= ctx._USER_ACTIVITY_MAX) return;
      const topRecent = Array.from(ctx._userLastActivity.entries()).sort((a, b) => {
        var _a, _b;
        return (((_a = b[1]) == null ? void 0 : _a.timestamp) || 0) - (((_b = a[1]) == null ? void 0 : _b.timestamp) || 0);
      }).slice(0, ctx._USER_ACTIVITY_MAX);
      ctx._userLastActivity = new Map(topRecent);
    }
    function trackUserActivity(ctx, params) {
      const {
        authorId,
        authorName,
        deployment,
        guildName,
        channelName,
        startupState,
        now
      } = params;
      const lastActivity = ctx._userLastActivity.get(authorId);
      const alreadyNotifiedThisSession = ctx._sessionActivityNotified.has(authorId);
      const isFallbackLastSeen = !!(lastActivity == null ? void 0 : lastActivity.isFallback);
      const silenceMs = lastActivity ? Math.max(0, now - (lastActivity.timestamp || 0)) : null;
      if (!alreadyNotifiedThisSession) {
        const elapsedLabel = isFallbackLastSeen ? "last seen 24h+ ago" : Number.isFinite(silenceMs) && silenceMs > 0 ? `last seen ${formatSilenceDuration(silenceMs)} ago` : "first signal this session";
        withStartupDelay(
          ctx,
          startupState,
          () => showActivityToast(ctx, {
            authorId,
            deployment,
            authorName,
            guildName,
            channelName,
            accentColor: "#22c55e",
            body: `${authorName} is active`,
            detail: `${elapsedLabel} \u2022 ${guildName} #${channelName}`,
            fallbackType: "quest",
            fallbackBody: `${authorName} is active (${elapsedLabel})`
          })
        );
        ctx._sessionActivityNotified.add(authorId);
        upsertUserLastActivity(ctx, authorId, now, true, false);
        pruneUserActivityCache(ctx);
        return;
      }
      if (!lastActivity) {
        upsertUserLastActivity(ctx, authorId, now, true, false);
        pruneUserActivityCache(ctx);
        return;
      }
      if (silenceMs >= ctx._AFK_THRESHOLD_MS) {
        const timeStr = formatSilenceDuration(silenceMs);
        withStartupDelay(
          ctx,
          startupState,
          () => showActivityToast(ctx, {
            authorId,
            deployment,
            authorName,
            guildName,
            channelName,
            accentColor: "#fbbf24",
            body: `${authorName} has returned`,
            detail: `AFK ${timeStr} \u2022 ${guildName} #${channelName}`,
            fallbackType: "achievement",
            fallbackBody: `${authorName} has returned (AFK ${timeStr})`
          })
        );
      }
      upsertUserLastActivity(ctx, authorId, now, true, false);
      pruneUserActivityCache(ctx);
    }
    function buildAttachmentMarker(attachment) {
      const contentType = (attachment == null ? void 0 : attachment.content_type) || "";
      if (contentType.startsWith("image/")) return "[Image]";
      if (contentType.startsWith("video/")) return "[Video]";
      if (contentType.startsWith("audio/")) return "[Audio]";
      return `[File: ${(attachment == null ? void 0 : attachment.filename) || "attachment"}]`;
    }
    function buildEmbedMarker(embed) {
      if (embed == null ? void 0 : embed.title) return `[Embed: ${embed.title.slice(0, 60)}]`;
      if (embed == null ? void 0 : embed.description) return `[Embed: ${embed.description.slice(0, 60)}]`;
      if (embed == null ? void 0 : embed.url) return "[Link]";
      return "[Embed]";
    }
    function buildMessageContent(message) {
      const contentParts = [];
      if (message.content) contentParts.push(message.content.slice(0, 200));
      if (Array.isArray(message.attachments) && message.attachments.length > 0) {
        for (const attachment of message.attachments) {
          contentParts.push(buildAttachmentMarker(attachment));
        }
      }
      if (Array.isArray(message.embeds) && message.embeds.length > 0) {
        for (const embed of message.embeds) {
          contentParts.push(buildEmbedMarker(embed));
        }
      }
      return contentParts.join(" ") || "";
    }
    function buildMessageMedia(message) {
      const attachments = [];
      const embeds = [];
      if (Array.isArray(message.attachments)) {
        for (const a of message.attachments) {
          if (!a) continue;
          const ct = a.content_type || "";
          if (!ct.startsWith("image/") && !ct.startsWith("video/")) continue;
          const url = a.proxy_url || a.url;
          if (!url) continue;
          attachments.push({
            url,
            contentType: ct,
            width: Number(a.width) || void 0,
            height: Number(a.height) || void 0,
            filename: a.filename ? String(a.filename).slice(0, 80) : void 0
          });
        }
      }
      if (Array.isArray(message.embeds)) {
        for (const e of message.embeds) {
          if (!e) continue;
          const thumb = e.thumbnail;
          const renderable = e.type === "gifv" || e.type === "image" || e.type === "video" || thumb && (thumb.proxy_url || thumb.url);
          if (!renderable) continue;
          const thumbnailUrl = (thumb == null ? void 0 : thumb.proxy_url) || (thumb == null ? void 0 : thumb.url) || null;
          if (!thumbnailUrl) continue;
          embeds.push({
            type: String(e.type || "embed"),
            thumbnailUrl,
            width: Number(thumb == null ? void 0 : thumb.width) || void 0,
            height: Number(thumb == null ? void 0 : thumb.height) || void 0,
            title: e.title ? String(e.title).slice(0, 80) : void 0
          });
        }
      }
      return { attachments, embeds };
    }
    function showMatchReasonToast(ctx, params) {
      const {
        entry,
        deployment,
        authorId,
        authorName,
        guildName,
        isInvisible = false
      } = params;
      if (!focusAllows(deployment, "mentions")) return null;
      const snippet = entry.content ? `: "${entry.content.slice(0, 80)}"` : "";
      const invisibleSuffix = isInvisible ? " (invisible)" : "";
      const jumpClick = () => portalJump(ctx, entry.guildId, entry.channelId, entry.messageId);
      const imageUrl = pickToastThumbnail(entry);
      const monarch = _monarch(ctx);
      if (entry.matchReason === "mention") {
        ctx._showMentionToast({
          userId: authorId,
          userName: authorName,
          label: `@mentioned you${invisibleSuffix}`,
          body: reportBody("mention", { userName: authorName }, monarch) + invisibleSuffix,
          detail: `in ${guildName} #${entry.channelName}${snippet}`,
          accent: "#ef4444",
          deployment,
          onClick: jumpClick,
          imageUrl
        });
        return "mention";
      }
      if (entry.matchReason === "name") {
        ctx._showMentionToast({
          userId: authorId,
          userName: authorName,
          label: `said "${entry.matchedTerm}"${invisibleSuffix}`,
          body: reportBody("name", { userName: authorName, term: entry.matchedTerm }, monarch) + invisibleSuffix,
          detail: `in ${guildName} #${entry.channelName}${snippet}`,
          accent: "#ec4899",
          deployment,
          onClick: jumpClick,
          imageUrl
        });
        return "name";
      }
      const keywordTerm = entry.userKeywordMatch || (entry.matchReason === "targetKeyword" ? entry.matchedTerm : null);
      if (!keywordTerm) return null;
      ctx._showMentionToast({
        userId: authorId,
        userName: authorName,
        label: `keyword "${keywordTerm}"${invisibleSuffix}`,
        body: reportBody("keyword", { userName: authorName, term: keywordTerm }, monarch) + invisibleSuffix,
        detail: `in ${guildName} #${entry.channelName}${snippet}`,
        accent: "#34d399",
        deployment,
        onClick: jumpClick,
        imageUrl
      });
      return "keyword";
    }
    function pruneInvisibleToastCooldown(ctx, now) {
      if (ctx._invisibleToastCooldown.size <= 500) return;
      for (const [key, ts] of ctx._invisibleToastCooldown.entries()) {
        if (now - ts > BURST_WINDOW_MS * 4) ctx._invisibleToastCooldown.delete(key);
      }
    }
    function shouldSkipInvisibleMessageToast(ctx, entry, now) {
      const cooldownKey = `${entry.authorId}:${entry.channelId || "unknown"}`;
      const previous = ctx._invisibleToastCooldown.get(cooldownKey) || 0;
      if (now - previous < BURST_WINDOW_MS) return true;
      ctx._invisibleToastCooldown.set(cooldownKey, now);
      pruneInvisibleToastCooldown(ctx, now);
      return false;
    }
    function applyPresenceToastAndLastSeen(ctx, params) {
      const {
        entry,
        guildId,
        guildName,
        isAwayGuild,
        userStatus = "offline",
        isInvisible = false,
        matchToastType = null,
        suppressGenericToast = false
      } = params;
      const deployment = ctx._plugin.deploymentManager.getDeploymentForUser(entry.authorId);
      if (!focusAllows(deployment, "messages")) {
        syncLastSeenCount(ctx, guildId);
        return;
      }
      if (isInvisible && !matchToastType && !shouldSkipInvisibleMessageToast(ctx, entry, entry.timestamp || Date.now())) {
        const location = `${guildName} #${entry.channelName}`;
        ctx._showMentionToast({
          userId: entry.authorId,
          userName: entry.authorName,
          label: "sent a message while invisible",
          body: reportBody("invisible", { userName: entry.authorName }, _monarch(ctx)),
          detail: `in ${location}`,
          accent: "#ef4444",
          deployment: {
            shadowRank: entry.shadowRank,
            shadowName: entry.shadowName
          },
          // Click-to-jump — navigate to the exact message that triggered
          // this toast, same as the match-reason toasts above.
          onClick: () => portalJump(ctx, entry.guildId, entry.channelId, entry.messageId),
          imageUrl: pickToastThumbnail(entry)
        });
        syncLastSeenCount(ctx, guildId);
        return;
      }
      if (suppressGenericToast) {
        syncLastSeenCount(ctx, guildId);
        return;
      }
      if (isAwayGuild) {
        ctx._toast(
          `[${entry.shadowRank}] ${entry.shadowName} sensed ${entry.authorName} in ${guildName} #${entry.channelName}`,
          "info"
        );
        return;
      }
      if (isInvisible) {
        ctx._toast(
          `[${entry.shadowRank}] ${entry.shadowName} sensed ${entry.authorName} (${userStatus}) in #${entry.channelName}`,
          "error"
        );
      }
      syncLastSeenCount(ctx, guildId);
    }
    function resolveSelectedGuildId(ctx, payload) {
      if (payload == null ? void 0 : payload.guildId) return payload.guildId;
      try {
        return ctx._plugin._SelectedGuildStore ? ctx._plugin._SelectedGuildStore.getGuildId() : null;
      } catch (gErr) {
        ctx._plugin.debugError("SensesEngine", "Failed to get guild ID on select", gErr);
        return null;
      }
    }
    function notifyUnseenSignalsForGuild(ctx, guildId) {
      if (!guildId || !ctx._guildFeeds[guildId]) return;
      const feed = ctx._guildFeeds[guildId];
      const lastSeen = ctx._lastSeenCount[guildId] || 0;
      const unseenCount = feed.length - lastSeen;
      if (unseenCount > 0) {
        const unseenEntries = feed.slice(lastSeen);
        const shadowNames = new Set(unseenEntries.map((entry) => entry.shadowName));
        const guildName = ctx._plugin._getGuildName(guildId);
        ctx._toast(
          `Shadow Senses: ${unseenCount} signal${unseenCount > 1 ? "s" : ""} in ${guildName} from ${shadowNames.size} shadow${shadowNames.size > 1 ? "s" : ""} while away`,
          "info"
        );
      }
      ctx._lastSeenCount[guildId] = feed.length;
    }
    function handlePresenceUpdateEntry(ctx, update, monitoredIds, startupState) {
      var _a, _b;
      const userId = update.userId;
      if (!userId || !monitoredIds.has(userId)) return false;
      const deployment = ctx._plugin.deploymentManager.getDeploymentForUser(userId);
      if (!deployment) return false;
      const hasPriorStatus = ctx._statusByUserId.has(userId);
      const previousStatus = hasPriorStatus ? ctx._normalizeStatus(ctx._statusByUserId.get(userId)) : null;
      let nextStatus = typeof update.status === "string" && update.status.trim().length > 0 ? ctx._normalizeStatus(update.status) : null;
      if (!nextStatus && update.clientStatus) {
        nextStatus = resolvePresenceUpdateStatus(update, ctx._normalizeStatus.bind(ctx));
      }
      if (!nextStatus) {
        const presenceStore = ctx._resolvePresenceStore();
        const liveStatus = (_a = presenceStore == null ? void 0 : presenceStore.getStatus) == null ? void 0 : _a.call(presenceStore, userId);
        if (typeof liveStatus === "string" && liveStatus.trim().length > 0) {
          nextStatus = ctx._normalizeStatus(liveStatus);
        }
      }
      if (!nextStatus) {
        if (!hasPriorStatus) return false;
        nextStatus = previousStatus || "offline";
      }
      ctx._statusByUserId.set(userId, nextStatus);
      if (!hasPriorStatus || previousStatus === nextStatus) return false;
      if (startupState.isEarlyStartup) return true;
      if (((_b = ctx._plugin.settings) == null ? void 0 : _b.statusAlerts) && focusAllows(deployment, "status")) {
        if (!ctx._statusToastDedup) ctx._statusToastDedup = /* @__PURE__ */ new Map();
        const dedupKey = `${userId}:${nextStatus}`;
        const now = Date.now();
        const lastAt = ctx._statusToastDedup.get(dedupKey) || 0;
        if (now - lastAt < 6e3) return true;
        ctx._statusToastDedup.set(dedupKey, now);
        if (ctx._statusToastDedup.size > 200) {
          for (const [k, ts] of ctx._statusToastDedup) {
            if (now - ts > 6e4) ctx._statusToastDedup.delete(k);
          }
        }
        const uName = ctx._resolveUserName(userId, deployment.targetUsername || "Unknown");
        const prevLabel = ctx._getStatusLabel(previousStatus);
        const nextLbl = ctx._getStatusLabel(nextStatus);
        ctx._showStatusToast({
          userId,
          userName: uName,
          previousLabel: prevLabel,
          nextLabel: nextLbl,
          nextStatus,
          deployment,
          body: reportBody("status", { userName: uName, prevLabel, nextLabel: nextLbl, nextStatus }, _monarch(ctx))
        });
      }
      return true;
    }
    function mergePresenceUpdatesWithStoreSnapshot(ctx, updates, monitoredIds) {
      const mergedByUserId = /* @__PURE__ */ new Map();
      const upsert = (userId, status) => {
        const normalizedUserId = String(userId || "").trim();
        if (!normalizedUserId || !monitoredIds.has(normalizedUserId)) return;
        const normalizedStatus = typeof status === "string" && status.trim().length > 0 ? ctx._normalizeStatus(status) : null;
        const existing = mergedByUserId.get(normalizedUserId);
        if ((existing == null ? void 0 : existing.status) && !normalizedStatus) return;
        mergedByUserId.set(normalizedUserId, { userId: normalizedUserId, status: normalizedStatus });
      };
      for (const update of updates || []) {
        if (!update || typeof update !== "object") continue;
        upsert(update.userId, update.status);
      }
      return Array.from(mergedByUserId.values());
    }
    function onPresenceUpdate(payload) {
      try {
        const monitoredIds = this._plugin.deploymentManager.getMonitoredUserIds();
        if (!monitoredIds || monitoredIds.size === 0) return;
        const updates = this._extractPresenceUpdates(payload, monitoredIds);
        const mergedUpdates = mergePresenceUpdatesWithStoreSnapshot(this, updates, monitoredIds);
        if (mergedUpdates.length === 0) return;
        const startupState = getStartupState(this);
        for (const update of mergedUpdates) {
          handlePresenceUpdateEntry(this, update, monitoredIds, startupState);
        }
      } catch (err) {
        this._plugin.debugError("SensesEngine", "Error in PRESENCE_UPDATE handler", err);
      }
    }
    function pollMonitoredPresenceStatuses(source = "interval") {
      var _a, _b;
      try {
        const monitoredIds = this._plugin.deploymentManager.getMonitoredUserIds();
        if (!(monitoredIds instanceof Set) || monitoredIds.size === 0) {
          this._statusByUserId.clear();
          return;
        }
        for (const userId of Array.from(this._statusByUserId.keys())) {
          if (!monitoredIds.has(userId)) this._statusByUserId.delete(userId);
        }
        const presenceStore = this._resolvePresenceStore();
        if (!presenceStore || typeof presenceStore.getStatus !== "function") return;
        let clientStatuses = null;
        try {
          clientStatuses = (_b = (_a = presenceStore.getState) == null ? void 0 : _a.call(presenceStore)) == null ? void 0 : _b.clientStatuses;
        } catch (_) {
        }
        const startupState = getStartupState(this);
        let hasStateChanges = false;
        for (const monitoredId of monitoredIds) {
          const userId = String(monitoredId || "").trim();
          if (!userId) continue;
          let nextStatus = null;
          try {
            if (clientStatuses && clientStatuses[userId]) {
              const clientMap = clientStatuses[userId];
              const statusPriority = { online: 4, dnd: 3, idle: 2, offline: 1 };
              let bestStatus = "offline";
              let bestPrio = 0;
              for (const clientStatus of Object.values(clientMap)) {
                const prio = statusPriority[clientStatus] || 0;
                if (prio > bestPrio) {
                  bestPrio = prio;
                  bestStatus = clientStatus;
                }
              }
              nextStatus = this._normalizeStatus(bestStatus);
            } else {
              const rawStatus = presenceStore.getStatus(userId);
              if (typeof rawStatus === "string" && rawStatus.trim().length > 0) {
                nextStatus = this._normalizeStatus(rawStatus);
              } else {
                nextStatus = "offline";
              }
            }
          } catch (_) {
            nextStatus = "offline";
          }
          const previousStatus = this._statusByUserId.get(userId);
          if (previousStatus === void 0) {
            this._statusByUserId.set(userId, nextStatus);
            continue;
          }
          if (previousStatus === nextStatus) continue;
          const changed = handlePresenceUpdateEntry(this, { userId, status: nextStatus }, monitoredIds, startupState);
          if (changed) hasStateChanges = true;
        }
        if (hasStateChanges) {
          this._plugin.debugLog("SensesEngine", "Presence poll detected state changes", {
            source,
            monitoredCount: monitoredIds.size
          });
        }
      } catch (err) {
        this._plugin.debugError("SensesEngine", "Error in presence status poll", err);
      }
    }
    function onTypingStart(payload) {
      var _a, _b, _c, _d, _e, _f;
      try {
        const typingPayload = resolveTypingPayload(payload);
        if (!typingPayload) return;
        const { userId, channelId } = typingPayload;
        const userStore = this._resolveUserStore();
        const currentUserId = (_b = (_a = userStore == null ? void 0 : userStore.getCurrentUser) == null ? void 0 : _a.call(userStore)) == null ? void 0 : _b.id;
        if (currentUserId && userId === currentUserId) return;
        const monitoredIds = this._plugin.deploymentManager.getMonitoredUserIds();
        if (!monitoredIds || !monitoredIds.has(userId)) return;
        const deployment = this._plugin.deploymentManager.getDeploymentForUser(userId);
        if (!deployment) return;
        if (channelId && ((_c = this._plugin.settings) == null ? void 0 : _c.suppressTypingInViewedChannel)) {
          try {
            const selectedChannelId = (_e = (_d = this._plugin._SelectedChannelStore) == null ? void 0 : _d.getChannelId) == null ? void 0 : _e.call(_d);
            if (selectedChannelId && selectedChannelId === channelId) return;
          } catch (_) {
          }
        }
        const { guildId, channelName } = resolveTypingChannelContext(
          this,
          channelId,
          typingPayload.guildId
        );
        const eventScopeId = guildId || GLOBAL_UTILITY_FEED_ID;
        const cooldownKey = `${userId}:${channelId || eventScopeId}`;
        const now = Date.now();
        const cooldownMs = this._getTypingCooldownMs();
        if (shouldSkipTypingToast(this, cooldownKey, now, cooldownMs)) return;
        const userName = this._resolveUserName(userId, deployment.targetUsername || "Unknown");
        const guildName = guildId ? this._plugin._getGuildName(guildId) : "Shadow Network";
        const locationLabel = channelId ? `${guildName} #${channelName}` : guildName;
        if (((_f = this._plugin.settings) == null ? void 0 : _f.typingAlerts) && focusAllows(deployment, "typing")) {
          this._lastTypingAt = this._lastTypingAt || /* @__PURE__ */ new Map();
          this._lastTypingAt.set(userId, {
            ts: Date.now(),
            channelId,
            guildId,
            channelName,
            guildName,
            userName,
            deployment
          });
          const _ltaExpiry = Date.now() - 6e4;
          for (const [_ltaKey, _ltaVal] of this._lastTypingAt) {
            if (_ltaVal.ts < _ltaExpiry) this._lastTypingAt.delete(_ltaKey);
          }
          if (this._toastEngine) {
            const avatarUrl = this._resolveUserAvatarUrl(userId) || DEFAULT_AVATAR_URL;
            this._toastEngine.showCardToast({
              avatarUrl,
              accentColor: deployment.priority ? PRIORITY_ACCENT : "#9333ea",
              // Header dropped: the "[shadow] senses" framing felt redundant
              // alongside the body line. Avatar + purple accent still identify
              // the toast as ShadowSenses intel.
              body: reportBody("typing", { userName, location: locationLabel }, _monarch(this)),
              // Persistent-ish: Discord re-fires TYPING_START every ~10s while
              // the user is typing; each fire refreshes via replaceKey. Auto-
              // fades after 30s if they stop typing without sending.
              timeout: 3e4,
              callerId: "shadowSenses-typing",
              maxPerMinute: 60,
              replaceKey: `shadowsenses-typing:${userId}`
              // No onClick on typing — only sent toast jumps to channel.
            });
          } else {
            this._toast(
              `[${deployment.shadowRank}] ${deployment.shadowName} senses ${userName} typing in ${locationLabel}`,
              "info",
              4e3
            );
          }
        }
        syncLastSeenCount(this, guildId);
      } catch (err) {
        this._plugin.debugError("SensesEngine", "Error in TYPING_START handler", err);
      }
    }
    function onRelationshipChange() {
      var _a;
      try {
        const monitoredIds = this._plugin.deploymentManager.getMonitoredUserIds();
        if (!monitoredIds || monitoredIds.size === 0) {
          this._snapshotFriendRelationships();
          return;
        }
        const previousFriends = this._relationshipFriendIds || /* @__PURE__ */ new Set();
        const nextFriends = this._getFriendIdSet();
        this._relationshipFriendIds = nextFriends;
        if (previousFriends.size === 0) return;
        const removedFriendIds = getRemovedFriendIds(previousFriends, nextFriends);
        if (removedFriendIds.length === 0) return;
        for (const removedId of removedFriendIds) {
          if (!monitoredIds.has(removedId)) continue;
          const deployment = this._plugin.deploymentManager.getDeploymentForUser(removedId);
          if (!deployment) continue;
          const userName = this._resolveUserName(removedId, deployment.targetUsername || "Unknown");
          if ((_a = this._plugin.settings) == null ? void 0 : _a.removedFriendAlerts) {
            this._toast(
              `[${deployment.shadowRank}] ${deployment.shadowName} reports: ${userName} removed your connection`,
              "warning",
              5e3
            );
          }
        }
      } catch (err) {
        this._plugin.debugError("SensesEngine", "Error in relationship handler", err);
      }
    }
    function onMessageCreate(payload) {
      var _a, _b;
      try {
        const message = payload == null ? void 0 : payload.message;
        if (!((_a = message == null ? void 0 : message.author) == null ? void 0 : _a.id)) return;
        const authorId = message.author.id;
        const monitoredIds = this._plugin.deploymentManager.getMonitoredUserIds();
        if (!monitoredIds.has(authorId)) return;
        const deployment = this._plugin.deploymentManager.getDeploymentForUser(authorId);
        if (!deployment) return;
        ensureCurrentGuildId(this);
        const channelContext = resolveMessageChannelContext(this, message);
        if (!channelContext) return;
        const { guildId, channelName } = channelContext;
        const guildName = this._plugin._getGuildName(guildId);
        const isAwayGuild = guildId !== this._currentGuildId;
        const authorName = message.author.username || message.author.global_name || "Unknown";
        const presenceStore = this._resolvePresenceStore();
        const userStatus = this._normalizeStatus(((_b = presenceStore == null ? void 0 : presenceStore.getStatus) == null ? void 0 : _b.call(presenceStore, authorId)) || "offline");
        const isInvisible = userStatus === "offline" || userStatus === "invisible";
        const startupState = getStartupState(this);
        trackUserActivity(this, {
          authorId,
          authorName,
          deployment,
          guildName,
          channelName,
          startupState,
          now: startupState.now
        });
        const { attachments: mediaAttachments, embeds: mediaEmbeds } = buildMessageMedia(message);
        const entry = {
          eventType: "message",
          messageId: message.id,
          authorId,
          authorName,
          channelId: message.channel_id,
          channelName,
          guildId,
          guildName,
          content: buildMessageContent(message),
          attachments: mediaAttachments.length > 0 ? mediaAttachments : void 0,
          embeds: mediaEmbeds.length > 0 ? mediaEmbeds : void 0,
          timestamp: startupState.now,
          shadowName: deployment.shadowName,
          shadowRank: deployment.shadowRank
        };
        entry.priority = this._computePriority(message, guildId, entry);
        const merged = this._tryBurstGroup(guildId, entry);
        if (!merged) {
          this._addToGuildFeed(guildId, entry);
          this._registerBurst(guildId, entry);
        }
        const matchToastType = showMatchReasonToast(this, {
          entry,
          deployment,
          authorId,
          authorName,
          guildName,
          isInvisible
        });
        applyPresenceToastAndLastSeen(this, {
          entry,
          guildId,
          guildName,
          isAwayGuild,
          userStatus,
          isInvisible,
          matchToastType,
          suppressGenericToast: matchToastType !== null
        });
        if (this._lastTypingAt && isInvisible) {
          this._lastTypingAt.delete(authorId);
        } else if (this._lastTypingAt) {
          const recent = this._lastTypingAt.get(authorId);
          if (recent && Date.now() - recent.ts < 3e4) {
            this._lastTypingAt.delete(authorId);
            if (this._toastEngine && focusAllows(deployment, "messages")) {
              const avatarUrl = this._resolveUserAvatarUrl(authorId) || DEFAULT_AVATAR_URL;
              const friendSuffix = this._isFriend(authorId) ? " [FRIEND]" : "";
              this._toastEngine.showCardToast({
                avatarUrl,
                accentColor: deployment.priority ? PRIORITY_ACCENT : "#22c55e",
                header: `[${deployment.shadowRank}] ${deployment.shadowName} reports${friendSuffix}`,
                body: reportBody("message", { userName: authorName, location: `${guildName} #${channelName}` }, _monarch(this)),
                detail: "Click to view message",
                timeout: 5e3,
                callerId: "shadowSenses-sent",
                maxPerMinute: deployment.priority ? 120 : 30,
                // SAME replaceKey as the typing toast so this dismisses it.
                replaceKey: `shadowsenses-typing:${authorId}`,
                onClick: () => portalJump(this, guildId, message.channel_id, message.id),
                imageUrl: pickToastThumbnail(entry)
              });
            }
          }
        }
        this._sessionMessageCount++;
        this._totalDetections++;
      } catch (err) {
        this._plugin.debugError("SensesEngine", "Error in MESSAGE_CREATE handler", err);
      }
    }
    function onChannelSelect(payload) {
      try {
        const newGuildId = resolveSelectedGuildId(this, payload);
        if (newGuildId === this._currentGuildId) return;
        notifyUnseenSignalsForGuild(this, newGuildId);
        this._currentGuildId = newGuildId;
        this._plugin.debugLog("SensesEngine", "Guild switched", { newGuildId });
      } catch (err) {
        this._plugin.debugError("SensesEngine", "Error in CHANNEL_SELECT handler", err);
      }
    }
    function onExternalMessageEdit(detail) {
      try {
        const authorId = detail == null ? void 0 : detail.authorId;
        const messageId = detail == null ? void 0 : detail.messageId;
        if (!authorId || !messageId) return;
        const monitoredIds = this._plugin.deploymentManager.getMonitoredUserIds();
        if (!monitoredIds.has(authorId)) return;
        const deployment = this._plugin.deploymentManager.getDeploymentForUser(authorId);
        if (!deployment) return;
        ensureCurrentGuildId(this);
        const channelContext = resolveMessageChannelContext(this, {
          channel_id: detail.channelId,
          guild_id: null
        });
        if (!channelContext) return;
        const { guildId, channelName } = channelContext;
        const authorName = this._resolveUserName(authorId, deployment.targetUsername || "Unknown");
        const before = String(detail.previousContent ?? "");
        const after = String(detail.newContent ?? "");
        const entry = {
          eventType: "edit",
          messageId,
          authorId,
          authorName,
          channelId: detail.channelId,
          channelName,
          guildId,
          guildName: this._plugin._getGuildName(guildId),
          // Structured pair — components.js renders these as a labelled
          // before/after diff with the changed words highlighted.
          editBefore: before,
          editAfter: after,
          // Flattened fallback, kept for entries read as plain text (and for
          // feeds persisted by older builds, which components.js parses back
          // into the pair above).
          content: `${authorName} edited a message
before: ${before || "\u2014"}
after: ${after || "\u2014"}`,
          timestamp: detail.at || Date.now(),
          shadowName: deployment.shadowName,
          shadowRank: deployment.shadowRank
        };
        this._addToGuildFeed(guildId, entry);
      } catch (err) {
        this._plugin.debugError("SensesEngine", "Error in message-edit handler", err);
      }
    }
    module2.exports = {
      _onChannelSelect: onChannelSelect,
      _onExternalMessageEdit: onExternalMessageEdit,
      _onMessageCreate: onMessageCreate,
      _pollMonitoredPresenceStatuses: pollMonitoredPresenceStatuses,
      _onPresenceUpdate: onPresenceUpdate,
      _onRelationshipChange: onRelationshipChange,
      _seedUserActivityFromFeeds: seedUserActivityFromFeeds,
      _onTypingStart: onTypingStart
    };
  }
});

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

// src/shared/presence-bus.js
var require_presence_bus = __commonJS({
  "src/shared/presence-bus.js"(exports2, module2) {
    var { acquireDispatcher } = require_dispatcher();
    function _resolveDispatcher() {
      return acquireDispatcher();
    }
    function _getPresenceBus() {
      if (window.__SL_PresenceBus) return window.__SL_PresenceBus;
      const bus = {
        _byEvent: /* @__PURE__ */ new Map(),
        // eventName -> { handlers: Set, sub: fn|null }
        _dispatcher: null,
        _ensureDispatcher() {
          if (!this._dispatcher) this._dispatcher = _resolveDispatcher();
          return this._dispatcher;
        },
        on(eventName, handler) {
          let entry = this._byEvent.get(eventName);
          if (!entry) {
            entry = { handlers: /* @__PURE__ */ new Set(), sub: null };
            this._byEvent.set(eventName, entry);
          }
          entry.handlers.add(handler);
          if (!entry.sub) {
            const d = this._ensureDispatcher();
            if (d) {
              entry.sub = (action) => {
                for (const h of entry.handlers) {
                  try {
                    h(action);
                  } catch (_) {
                  }
                }
              };
              try {
                d.subscribe(eventName, entry.sub);
              } catch (_) {
                entry.sub = null;
              }
            }
          }
          return () => {
            entry.handlers.delete(handler);
            if (entry.handlers.size === 0 && entry.sub && this._dispatcher) {
              try {
                this._dispatcher.unsubscribe(eventName, entry.sub);
              } catch (_) {
              }
              entry.sub = null;
            }
          };
        }
      };
      window.__SL_PresenceBus = bus;
      return bus;
    }
    function onPresence2(eventName, handler) {
      if (typeof eventName !== "string" || typeof handler !== "function") return () => {
      };
      return _getPresenceBus().on(eventName, handler);
    }
    module2.exports = { onPresence: onPresence2 };
  }
});

// src/ShadowPortalCore/transition-css.js
var require_transition_css = __commonJS({
  "src/ShadowPortalCore/transition-css.js"(exports2, module2) {
    var PORTAL_TRANSITION_STYLE_ID = "sl-portal-transition-css";
    var PORTAL_TRANSITION_CSS = `
@keyframes ss-mist-css-overlay {
  0% { opacity: 0; }
  14% { opacity: 0.98; }
  56% { opacity: 1; }
  74% { opacity: 0.82; }
  100% { opacity: 0; }
}

@keyframes ss-mist-css-shard {
  0% { transform: translate3d(0, 0, 0) rotate(0deg) scale(0.3); opacity: 0; }
  22% { transform: translate3d(0, 0, 0) rotate(0deg) scale(1); opacity: 0.72; }
  100% {
    transform: translate3d(var(--ss-shard-x, 0px), var(--ss-shard-y, -80px), 0) rotate(var(--ss-shard-r, 0deg)) scale(0.2);
    opacity: 0;
  }
}

.ss-transition-overlay {
  position: fixed;
  inset: 0;
  z-index: 999999;
  pointer-events: none;
  overflow: hidden;
  opacity: 0;
  background: transparent;
  will-change: opacity;
}

.ss-transition-canvas {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  display: block;
  opacity: 1;
}

.ss-shard {
  position: absolute;
  pointer-events: none;
  border-radius: 999px;
  transform-origin: center;
  background: linear-gradient(180deg, rgba(204, 188, 166, 0.78) 0%, rgba(96, 72, 54, 0.54) 52%, rgba(16, 10, 8, 0) 100%);
  box-shadow: 0 0 6px rgba(110, 82, 56, 0.28);
  opacity: 0;
  will-change: transform, opacity;
}

.ss-transition-overlay--waapi .ss-shard {
  animation: none !important;
}

.ss-transition-overlay--css {
  background: radial-gradient(120% 95% at 50% 50%, rgba(8, 8, 12, 0.7) 30%, rgba(0, 0, 0, 0.88) 100%);
  animation: ss-mist-css-overlay var(--ss-total-duration, 1000ms) cubic-bezier(.2,.58,.2,1) forwards;
}

.ss-transition-overlay--css .ss-shard {
  animation: ss-mist-css-shard 900ms cubic-bezier(.22,.61,.36,1) forwards;
  animation-delay: var(--ss-delay, 0ms);
}

.ss-transition-overlay--reduced {
  background: rgba(0, 0, 0, 0.65);
}

.ss-transition-overlay--reduced .ss-shard {
  display: none;
}
`;
    module2.exports = { PORTAL_TRANSITION_STYLE_ID, PORTAL_TRANSITION_CSS };
  }
});

// src/ShadowPortalCore/portal-image-data.js
var require_portal_image_data = __commonJS({
  "src/ShadowPortalCore/portal-image-data.js"(exports2, module2) {
    var PORTAL_IMAGE_DATA_URL = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAgAAAAIACAYAAAD0eNT6AAAAAXNSR0IArs4c6QAAAJxlWElmTU0AKgAAAAgABgEGAAMAAAABAAIAAAENAAIAAAAMAAAAVgEaAAUAAAABAAAAYgEbAAUAAAABAAAAagEoAAMAAAABAAIAAIdpAAQAAAABAAAAcgAAAABwb3J0YWxfbWFzawAAAAEIAAAAAQAAAQgAAAABAAOgAQADAAAAAQABAACgAgAEAAAAAQAAAgCgAwAEAAAAAQAAAgAAAAAAKNygjAAAAAlwSFlzAAAomgAAKJoBFzohsgAAA+BpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IlhNUCBDb3JlIDYuMC4wIj4KICAgPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4KICAgICAgPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIKICAgICAgICAgICAgeG1sbnM6dGlmZj0iaHR0cDovL25zLmFkb2JlLmNvbS90aWZmLzEuMC8iCiAgICAgICAgICAgIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyIKICAgICAgICAgICAgeG1sbnM6SXB0YzR4bXBFeHQ9Imh0dHA6Ly9pcHRjLm9yZy9zdGQvSXB0YzR4bXBFeHQvMjAwOC0wMi0yOS8iPgogICAgICAgICA8dGlmZjpEb2N1bWVudE5hbWU+cG9ydGFsX21hc2s8L3RpZmY6RG9jdW1lbnROYW1lPgogICAgICAgICA8dGlmZjpSZXNvbHV0aW9uVW5pdD4yPC90aWZmOlJlc29sdXRpb25Vbml0PgogICAgICAgICA8dGlmZjpDb21wcmVzc2lvbj41PC90aWZmOkNvbXByZXNzaW9uPgogICAgICAgICA8dGlmZjpYUmVzb2x1dGlvbj4yNjQ8L3RpZmY6WFJlc29sdXRpb24+CiAgICAgICAgIDx0aWZmOlBob3RvbWV0cmljSW50ZXJwcmV0YXRpb24+MjwvdGlmZjpQaG90b21ldHJpY0ludGVycHJl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";
    module2.exports = { PORTAL_IMAGE_DATA_URL };
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

// src/ShadowPortalCore/index.js
var require_ShadowPortalCore = __commonJS({
  "src/ShadowPortalCore/index.js"(exports2, module2) {
    "use strict";
    var { PORTAL_TRANSITION_STYLE_ID, PORTAL_TRANSITION_CSS } = require_transition_css();
    var { PORTAL_IMAGE_DATA_URL } = require_portal_image_data();
    function _getPortalCoreState() {
      if (window.__SL_PortalCore) {
        if (!(window.__SL_PortalCore.consumers instanceof Set)) {
          window.__SL_PortalCore.consumers = /* @__PURE__ */ new Set();
        }
        return window.__SL_PortalCore;
      }
      window.__SL_PortalCore = {
        gsapLoadPromise: null,
        gsapLoaded: false,
        gsapLogSent: false,
        // GSAP script elements injected into document.head — cleaned up once the last
        // consumer releases, to prevent accumulation across BD reloads.
        gsapScriptEls: [],
        // (Portal artwork is embedded — see portal-image-data.js. No mask cache.)
        // Consumer hold set, keyed by stable class name — populated by the
        // _portalCoreAcquire()/_portalCoreRelease() prototype methods (installed via
        // applyPortalCoreToClass). Set semantics make acquire/release idempotent: a
        // class's restart-safety self-call (start() -> stop(false) -> release) can
        // never double-count or under-count against genuine activation, and the shared
        // GSAP/mask cache only tears down once every genuinely-active consumer has
        // released — so disabling one of several concurrently-enabled portal-core
        // plugins doesn't force the remaining ones to re-fetch GSAP from CDN.
        consumers: /* @__PURE__ */ new Set()
      };
      return window.__SL_PortalCore;
    }
    var MIST_HALO_DIM = 0.62;
    var REVEAL_HOLD_CAP_MS = 500;
    var REVEAL_HOLD_CAP_UNCACHED_MS = 2200;
    var REVEAL_READY_POLL_MS = 32;
    var DEFAULT_CONTEXT_LABEL_KEYS = ["anchorName", "waypointLabel", "label", "name", "targetName", "targetUsername"];
    function getCoreConfig(instance) {
      if (!instance || !instance.__shadowPortalCoreConfig || typeof instance.__shadowPortalCoreConfig !== "object") {
        return {};
      }
      return instance.__shadowPortalCoreConfig;
    }
    function getTransitionId(instance) {
      const cfg = getCoreConfig(instance);
      return typeof cfg.transitionId === "string" && cfg.transitionId.trim() ? cfg.transitionId.trim() : "ss-transition-overlay";
    }
    function getNavigationFailureToast(instance) {
      const cfg = getCoreConfig(instance);
      return typeof cfg.navigationFailureToast === "string" && cfg.navigationFailureToast.trim() ? cfg.navigationFailureToast : "Failed to switch channel";
    }
    function getContextLabel(context, instance) {
      if (!context || typeof context !== "object") return "";
      const cfg = getCoreConfig(instance);
      const keys = Array.isArray(cfg.contextLabelKeys) && cfg.contextLabelKeys.length ? cfg.contextLabelKeys : DEFAULT_CONTEXT_LABEL_KEYS;
      for (const key of keys) {
        const value = context[key];
        if (typeof value === "string") {
          const trimmed = value.trim();
          if (trimmed) return trimmed;
        }
      }
      return "";
    }
    function debugLog(instance, tag, message, ...args) {
      try {
        if (instance && typeof instance.debugLog === "function") {
          instance.debugLog(tag, message, ...args);
        }
      } catch (_) {
      }
    }
    function debugError(instance, tag, message, error) {
      try {
        if (instance && typeof instance.debugError === "function") {
          instance.debugError(tag, message, error);
        } else {
          console.error("[ShadowPortalCore]", tag, message, error);
        }
      } catch (_) {
        console.error("[ShadowPortalCore]", tag, message, error);
      }
    }
    function getPortalPerfProfile() {
      var _a, _b;
      const screenArea = Math.max(
        1,
        Math.floor((window.innerWidth || 1920) * (window.innerHeight || 1080))
      );
      let perfTier = screenArea > 26e5 ? 0 : screenArea > 17e5 ? 1 : 2;
      const hwThreads = Number(((_a = window == null ? void 0 : window.navigator) == null ? void 0 : _a.hardwareConcurrency) || 8);
      const deviceMemory = Number(((_b = window == null ? void 0 : window.navigator) == null ? void 0 : _b.deviceMemory) || 8);
      if (hwThreads <= 4 || deviceMemory <= 4) {
        perfTier = Math.max(0, perfTier - 1);
      }
      const qualityScale = perfTier === 0 ? 0.48 : perfTier === 1 ? 0.68 : 0.9;
      const detailStep = perfTier === 0 ? 3 : perfTier === 1 ? 2 : 1;
      const mistStep = perfTier === 0 ? 4 : perfTier === 1 ? 2 : 1;
      const shadowScale = perfTier === 0 ? 1.3 : perfTier === 1 ? 1.7 : 2.1;
      const dprCap = perfTier === 0 ? 1 : perfTier === 1 ? 1.15 : 1.3;
      const targetFrameMs = perfTier === 0 ? 28 : perfTier === 1 ? 22 : 16;
      return {
        perfTier,
        qualityScale,
        detailStep,
        mistStep,
        shadowScale,
        dprCap,
        targetFrameMs,
        dpr: Math.min(dprCap, window.devicePixelRatio || 1)
      };
    }
    var methods = {
      /**
       * Load GSAP + plugins from CDN with dedup and graceful fallback.
       * Safe to call multiple times — returns cached promise on repeat calls.
       * @returns {Promise<object|null>} GSAP instance or null if CDN failed.
       */
      async _ensureGSAP() {
        const core = _getPortalCoreState();
        if (core.gsapLoaded && window.gsap) return window.gsap;
        if (core.gsapLoadPromise) return core.gsapLoadPromise;
        core.gsapLoadPromise = (async () => {
          var _a;
          try {
            const loadScript = (url) => new Promise((resolve, reject) => {
              const existing = document.querySelector(`script[src="${url}"]`);
              if (existing) {
                if (existing.dataset.slLoaded === "1") {
                  resolve();
                  return;
                }
                if (existing.dataset.slFailed === "1") {
                  reject(new Error(`Previously failed to load ${url}`));
                  return;
                }
                existing.addEventListener("load", () => resolve(), { once: true });
                existing.addEventListener("error", () => reject(new Error(`Failed to load ${url}`)), { once: true });
                return;
              }
              const el = document.createElement("script");
              el.src = url;
              el.onload = () => {
                el.dataset.slLoaded = "1";
                resolve();
              };
              el.onerror = () => {
                el.dataset.slFailed = "1";
                reject(new Error(`Failed to load ${url}`));
              };
              document.head.appendChild(el);
              core.gsapScriptEls.push(el);
            });
            const CDN = "https://cdnjs.cloudflare.com/ajax/libs/gsap/3.13.0";
            await loadScript(`${CDN}/gsap.min.js`);
            await loadScript(`${CDN}/EasePack.min.js`);
            await loadScript(`${CDN}/CustomEase.min.js`).catch(() => {
            });
            await loadScript(`${CDN}/Physics2DPlugin.min.js`).catch(() => {
            });
            if (!window.gsap) throw new Error("gsap global not found after script injection");
            if (window.CustomEase) window.gsap.registerPlugin(window.CustomEase);
            if (window.Physics2DPlugin) window.gsap.registerPlugin(window.Physics2DPlugin);
            core.gsapLoaded = true;
            if (!core.gsapLogSent) {
              core.gsapLogSent = true;
              if ((_a = this.settings) == null ? void 0 : _a.debugMode) {
                const plugins = [window.CustomEase && "CustomEase", window.Physics2DPlugin && "Physics2D"].filter(Boolean);
                console.log(`[ShadowPortalCore] GSAP v${window.gsap.version} loaded` + (plugins.length ? ` + ${plugins.join(" + ")}` : ""));
              }
            }
            return window.gsap;
          } catch (err) {
            console.warn("[ShadowPortalCore] GSAP CDN load failed \u2014 vanilla canvas fallback active:", err.message);
            core.gsapLoaded = false;
            core.gsapLoadPromise = null;
            core.gsapError = err.message || "unknown";
            return null;
          }
        })();
        return core.gsapLoadPromise;
      },
      /**
       * Extract a Discord channel ID from a path like /channels/guildId/channelId
       */
      _extractChannelId(path2) {
        const match = String(path2 || "").match(/\/channels\/\d+\/(\d+)/);
        return match ? match[1] : null;
      },
      /**
       * Check if Discord's MessageStore already has messages for a channel.
       * Cached channels load almost instantly — no need for a long portal animation.
       */
      _isChannelCached(path2) {
        var _a, _b, _c;
        try {
          const channelId = this._extractChannelId(path2);
          if (!channelId) return false;
          if (!this._messageStoreCache) {
            const { Webpack } = BdApi;
            const ms = ((_a = Webpack.getStore) == null ? void 0 : _a.call(Webpack, "MessageStore")) || ((_b = Webpack.getModule) == null ? void 0 : _b.call(Webpack, (m) => m.getMessage && m.getMessages));
            if (ms == null ? void 0 : ms.getMessages) this._messageStoreCache = ms;
          }
          const MessageStore = this._messageStoreCache;
          if (!(MessageStore == null ? void 0 : MessageStore.getMessages)) return false;
          const messages = MessageStore.getMessages(channelId);
          return messages && (messages.length > 0 || ((_c = messages._array) == null ? void 0 : _c.length) > 0 || messages.size > 0);
        } catch (e) {
          debugError(this, "Cache", "Failed to check channel cache", e);
          return false;
        }
      },
      _normalizePath(path2) {
        const p = String(path2 || "").trim();
        if (!p) return "/";
        const withSlash = p.startsWith("/") ? p : `/${p}`;
        return withSlash.replace(/\/+$/, "") || "/";
      },
      _isPathActive(targetPath) {
        var _a;
        const target = this._normalizePath(targetPath);
        const current = this._normalizePath(((_a = window.location) == null ? void 0 : _a.pathname) || "/");
        if (current === target) return true;
        return current.startsWith(`${target}/`);
      },
      _clearNavigateRetries() {
        if (!(this._navigateRetryTimers instanceof Set)) {
          this._navigateRetryTimers = /* @__PURE__ */ new Set();
          return;
        }
        for (const timer of this._navigateRetryTimers) {
          clearTimeout(timer);
        }
        this._navigateRetryTimers.clear();
      },
      _findChannelViewNode() {
        const transitionId = getTransitionId(this);
        const selectors = [
          "#app-mount main",
          "main",
          "#app-mount [role='main']",
          `#app-mount ${require_discord_classes().sel.chatContent}`,
          `#app-mount ${require_discord_classes().sel.chat}`,
          `#app-mount ${require_discord_classes().sel.content}`
        ];
        for (const selector of selectors) {
          const node = document.querySelector(selector);
          if (node && node.id !== transitionId && !node.closest(`#${transitionId}`)) return node;
        }
        return null;
      },
      _cancelChannelViewFade() {
        this._channelFadeToken = Number(this._channelFadeToken || 0) + 1;
        if (this._channelFadeResetTimer) {
          clearTimeout(this._channelFadeResetTimer);
          this._channelFadeResetTimer = null;
        }
        const node = this._findChannelViewNode();
        if (!node) return;
        try {
          node.style.removeProperty("opacity");
          node.style.removeProperty("transition");
          node.style.removeProperty("will-change");
        } catch (error) {
          debugError(this, "Transition", "Failed to reset channel view fade styles", error);
        }
      },
      _beginChannelViewFadeOut() {
        this._cancelChannelViewFade();
        const token = this._channelFadeToken;
        const node = this._findChannelViewNode();
        if (!node) return token;
        try {
          node.style.willChange = "opacity";
          if (typeof node.animate === "function") {
            node.animate(
              [{ opacity: 1 }, { opacity: 0.2 }],
              { duration: 120, easing: "ease-out", fill: "forwards" }
            );
          } else {
            node.style.transition = "opacity 120ms ease-out";
            node.style.opacity = "0.2";
          }
        } catch (error) {
          debugError(this, "Transition", "Failed to start channel view fade out", error);
        }
        return token;
      },
      _finishChannelViewFade(token, success) {
        if (token !== this._channelFadeToken) return;
        const node = this._findChannelViewNode();
        if (!node) return;
        const fromOpacity = success ? 0.14 : 0.45;
        const duration = success ? 220 : 140;
        try {
          node.style.willChange = "opacity";
          if (typeof node.animate === "function") {
            node.animate(
              [{ opacity: fromOpacity }, { opacity: 1 }],
              { duration, easing: "cubic-bezier(.22,.61,.36,1)", fill: "forwards" }
            );
          } else {
            node.style.transition = `opacity ${duration}ms cubic-bezier(.22,.61,.36,1)`;
            node.style.opacity = "1";
          }
        } catch (error) {
          debugError(this, "Transition", "Failed to finish channel view fade", error);
        }
        if (this._channelFadeResetTimer) clearTimeout(this._channelFadeResetTimer);
        this._channelFadeResetTimer = setTimeout(() => {
          if (token !== this._channelFadeToken) return;
          this._channelFadeResetTimer = null;
          try {
            node.style.removeProperty("opacity");
            node.style.removeProperty("transition");
            node.style.removeProperty("will-change");
          } catch (error) {
            debugError(this, "Transition", "Failed to clean channel view fade styles after transition", error);
          }
        }, duration + 80);
      },
      _navigateOnce(path2) {
        var _a, _b;
        try {
          if ((_a = this._NavigationUtils) == null ? void 0 : _a.transitionTo) {
            this._NavigationUtils.transitionTo(path2);
            return true;
          }
          const { getNavigationUtils } = require_navigation();
          const nav = getNavigationUtils();
          if (nav == null ? void 0 : nav.transitionTo) {
            this._NavigationUtils = nav;
            nav.transitionTo(path2);
            return true;
          }
          if ((_b = window.history) == null ? void 0 : _b.pushState) {
            window.history.pushState({}, "", path2);
            window.dispatchEvent(new PopStateEvent("popstate"));
            return true;
          }
          return false;
        } catch (err) {
          debugError(this, "Navigate", "Failed:", err);
          return false;
        }
      },
      _navigate(path2, context = {}, hooks = {}) {
        const targetPath = this._normalizePath(path2);
        const maxAttempts = 7;
        if (this._isPathActive(targetPath)) {
          debugLog(this, "Navigate", `Already at ${targetPath}`);
          if (typeof hooks.onConfirmed === "function") {
            try {
              hooks.onConfirmed({ attempt: 0, alreadyActive: true });
            } catch (error) {
              debugError(this, "Navigate", "onConfirmed hook failed for already-active target", error);
            }
          }
          return;
        }
        this._navigateRequestId = Number(this._navigateRequestId || 0) + 1;
        const requestId = this._navigateRequestId;
        this._clearNavigateRetries();
        const attemptNavigate = (attempt) => {
          if (requestId !== this._navigateRequestId) return;
          const invoked = this._navigateOnce(targetPath);
          if (this._isPathActive(targetPath)) {
            debugLog(this, "Navigate", `Confirmed ${targetPath} on attempt ${attempt}`);
            if (typeof hooks.onConfirmed === "function") {
              try {
                hooks.onConfirmed({ attempt, targetPath });
              } catch (error) {
                debugError(this, "Navigate", "onConfirmed hook failed after navigation confirmation", error);
              }
            }
            return;
          }
          if (attempt >= maxAttempts) {
            const contextLabel = getContextLabel(context, this);
            const suffix = contextLabel ? ` (${contextLabel})` : "";
            debugError(this, "Navigate", `Failed to reach ${targetPath}${suffix} after ${attempt} attempts`);
            if (typeof hooks.onFailed === "function") {
              try {
                hooks.onFailed({ attempt, targetPath });
              } catch (error) {
                debugError(this, "Navigate", "onFailed hook failed after navigation exhaustion", error);
              }
            }
            if (typeof this._toast === "function") {
              this._toast(getNavigationFailureToast(this), "error");
            } else {
              BdApi.UI.showToast(getNavigationFailureToast(this), { type: "error" });
            }
            if (this._gsapMasterTimeline) {
              this._reversePortalTransition();
            }
            return;
          }
          const delay = invoked ? 62 + attempt * 38 : 46 + attempt * 34;
          const timer = setTimeout(() => {
            this._navigateRetryTimers.delete(timer);
            if (requestId !== this._navigateRequestId) return;
            attemptNavigate(attempt + 1);
          }, delay);
          this._navigateRetryTimers.add(timer);
        };
        try {
          attemptNavigate(1);
        } catch (err) {
          debugError(this, "Navigate", "Unexpected navigation failure:", err);
          if (typeof hooks.onFailed === "function") {
            try {
              hooks.onFailed({ attempt: 0, targetPath, error: err });
            } catch (hookError) {
              debugError(this, "Navigate", "onFailed hook threw during navigation exception handling", hookError);
            }
          }
          if (typeof this._toast === "function") {
            this._toast("Navigation error \u2014 check console", "error");
          } else {
            BdApi.UI.showToast("Navigation error \u2014 check console", { type: "error" });
          }
        }
      },
      /**
       * Smoothly reverse the portal animation (GSAP only).
       * Falls back to instant cleanup if GSAP timeline isn't active.
       * Automatically called on navigation failure when GSAP is loaded.
       */
      _reversePortalTransition() {
        const tl = this._gsapMasterTimeline;
        if (!tl || !window.gsap) {
          this._cancelPendingTransition();
          return;
        }
        if (this._transitionCleanupTimeout) {
          clearTimeout(this._transitionCleanupTimeout);
          this._transitionCleanupTimeout = null;
        }
        if (this._transitionNavTimeout) {
          clearTimeout(this._transitionNavTimeout);
          this._transitionNavTimeout = null;
        }
        tl.timeScale(2);
        tl.reverse();
        tl.eventCallback("onReverseComplete", () => {
          this._cancelPendingTransition();
        });
        debugLog(this, "Transition", "Portal reverse initiated (GSAP timeline.reverse @ 2x)");
      },
      _cancelPendingTransition() {
        this._gsapMasterTimeline = null;
        this._portalRevealGate = null;
        if (this._transitionNavTimeout) {
          clearTimeout(this._transitionNavTimeout);
          this._transitionNavTimeout = null;
        }
        if (this._transitionCleanupTimeout) {
          clearTimeout(this._transitionCleanupTimeout);
          this._transitionCleanupTimeout = null;
        }
        if (this._activeShardAnims) {
          for (const a of this._activeShardAnims) {
            try {
              if (typeof a.kill === "function") a.kill();
              else a.cancel();
            } catch (_) {
            }
          }
          this._activeShardAnims = null;
        }
        if (typeof this._transitionStopCanvas === "function") {
          try {
            this._transitionStopCanvas();
          } catch (error) {
            debugError(this, "Transition", "Failed to stop active transition canvas", error);
          }
          this._transitionStopCanvas = null;
        }
        const transitionId = getTransitionId(this);
        const overlay = document.getElementById(transitionId);
        if (overlay) overlay.remove();
        this._cancelChannelViewFade();
      },
      /**
       * Play portal transition animation.
       * @param {Function} callback - Navigation callback fired during the animation
       * @param {string} [targetPath] - Optional Discord path for cached-channel detection.
       *   When the target channel has cached messages, a shorter "express" animation plays
       *   (~350ms) instead of the full cinematic portal (~1200ms).
       */
      playTransition(callback, targetPath) {
        var _a, _b, _c, _d;
        if (!((_a = this.settings) == null ? void 0 : _a.animationEnabled)) {
          callback();
          return;
        }
        this._cancelPendingTransition();
        this._transitionRunId = Number(this._transitionRunId || 0) + 1;
        const runId = this._transitionRunId;
        const configuredDuration = this.settings.animationDuration || 550;
        const isCached = !!targetPath && this._isChannelCached(targetPath);
        const revealCapMs = isCached ? REVEAL_HOLD_CAP_MS : REVEAL_HOLD_CAP_UNCACHED_MS;
        this._portalRevealGate = { released: false, capMs: revealCapMs };
        const duration = 2e3;
        const totalDuration = 2500;
        const transitionStartedAt = performance.now();
        const _debugMode = !!((_b = this.settings) == null ? void 0 : _b.debugMode);
        const _diag = { t0: transitionStartedAt, events: [] };
        const _diagLog = (phase) => {
          if (!_debugMode) return;
          const ms = Math.round(performance.now() - _diag.t0);
          _diag.events.push({ phase, ms });
          console.log(`%c[PortalDiag]%c ${phase} %c@ ${ms}ms`, "color:#a855f7;font-weight:bold", "color:#e2e8f0", "color:#94a3b8");
        };
        _diagLog(isCached ? "TRANSITION_START (cached, ~2.5s)" : "TRANSITION_START (cinematic, ~2.5s)");
        if (_debugMode) {
          console.log(`%c[PortalDiag]%c cached=${isCached} configuredDuration=${configuredDuration} duration=${duration} totalDuration=${totalDuration}`, "color:#a855f7;font-weight:bold", "color:#94a3b8");
          console.log(`%c[PortalDiag]%c navDelay=${Math.max(580, Math.round(totalDuration * 0.39))}ms cleanup=${totalDuration + 340}ms (unified timing)`, "color:#a855f7;font-weight:bold", "color:#94a3b8");
        }
        const systemPrefersReducedMotion = !!((_d = (_c = window.matchMedia) == null ? void 0 : _c.call(window, "(prefers-reduced-motion: reduce)")) == null ? void 0 : _d.matches);
        const respectReducedMotion = this.settings.respectReducedMotion !== false;
        const pageHidden = typeof document !== "undefined" && document.visibilityState === "hidden";
        const prefersReducedMotion = respectReducedMotion && systemPrefersReducedMotion || pageHidden;
        const perfProfile = getPortalPerfProfile();
        const transitionId = getTransitionId(this);
        const overlay = document.createElement("div");
        overlay.id = transitionId;
        overlay.className = "ss-transition-overlay";
        overlay.style.setProperty("--ss-duration", `${duration}ms`);
        overlay.style.setProperty("--ss-total-duration", `${totalDuration}ms`);
        let cssPortalEl = null;
        if (!prefersReducedMotion) {
          const gsapReady = !!(_getPortalCoreState().gsapLoaded && window.gsap);
          const portalDiam = Math.min(window.innerWidth, window.innerHeight) * 3;
          const portalStyleEl = document.createElement("style");
          portalStyleEl.textContent = [
            "@keyframes ss-portal-spin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}",
            // No-GSAP lifecycle: fade in, hold, burst outward, fade out.
            "@keyframes ss-portal-img-life{0%{opacity:0;transform:translate(-50%,-50%) scale(.5)}15%{opacity:1}55%{opacity:1;transform:translate(-50%,-50%) scale(1)}78%{opacity:1;transform:translate(-50%,-50%) scale(2)}100%{opacity:0;transform:translate(-50%,-50%) scale(2.8)}}",
            ".ss-portal-img{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%) scale(.5);opacity:0;pointer-events:none;border-radius:50%;overflow:hidden;filter:drop-shadow(0 0 24px rgba(123,63,191,.45)) drop-shadow(0 0 60px rgba(90,45,138,.25))}",
            // The PNG as visible artwork — counter-rotating layers for depth.
            `.ss-portal-img__inner,.ss-portal-img__core{position:absolute;inset:0;background:url(${PORTAL_IMAGE_DATA_URL}) center/100% 100% no-repeat}`,
            ".ss-portal-img__inner{animation:ss-portal-spin 2.8s infinite linear}",
            ".ss-portal-img__core{animation:ss-portal-spin 8s infinite linear reverse;opacity:.7}",
            // Applied ONLY when GSAP is unavailable — otherwise GSAP owns the lifecycle.
            ".ss-portal-img--css{animation:ss-portal-img-life var(--ss-duration,2000ms) cubic-bezier(.22,.61,.36,1) forwards}"
          ].join("");
          overlay.appendChild(portalStyleEl);
          cssPortalEl = document.createElement("div");
          cssPortalEl.className = "ss-portal-img" + (gsapReady ? "" : " ss-portal-img--css");
          cssPortalEl.style.width = `${portalDiam}px`;
          cssPortalEl.style.height = `${portalDiam}px`;
          const portalInner = document.createElement("div");
          portalInner.className = "ss-portal-img__inner";
          cssPortalEl.appendChild(portalInner);
          const portalCore = document.createElement("div");
          portalCore.className = "ss-portal-img__core";
          cssPortalEl.appendChild(portalCore);
          cssPortalEl._inner = portalInner;
          cssPortalEl._core = portalCore;
          const glowR = portalDiam / 2;
          const glowEl = document.createElement("div");
          glowEl.className = "ss-portal-glow";
          glowEl.style.cssText = `position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);pointer-events:none;border-radius:50%;opacity:0;width:${portalDiam + 120}px;height:${portalDiam + 120}px;background:radial-gradient(circle closest-side, rgba(0,0,0,0) ${Math.max(0, glowR - 6)}px, rgba(123,63,191,0.7) ${glowR + 10}px, rgba(90,45,138,0.4) ${glowR + 30}px, rgba(0,0,0,0) ${glowR + 60}px);`;
          overlay.appendChild(glowEl);
          cssPortalEl._glow = glowEl;
          overlay.appendChild(cssPortalEl);
        }
        const canvas = document.createElement("canvas");
        canvas.className = "ss-transition-canvas";
        overlay.appendChild(canvas);
        const shardCount = prefersReducedMotion ? 0 : perfProfile.perfTier === 0 ? 3 + Math.floor(Math.random() * 3) : perfProfile.perfTier === 1 ? 5 + Math.floor(Math.random() * 4) : 6 + Math.floor(Math.random() * 6);
        debugLog(
          this,
          "Transition",
          `start style=${isCached ? "expressFlash" : "blackMistPortalCanvasV5"} duration=${duration} total=${totalDuration} cached=${isCached} reducedMotion=${prefersReducedMotion} cinders=${shardCount}`
        );
        const shards = [];
        if (shardCount > 0) {
          const shardFragment = document.createDocumentFragment();
          for (let i = 0; i < shardCount; i++) {
            const shard = document.createElement("div");
            shard.className = "ss-shard";
            shard.style.left = "50%";
            shard.style.top = "50%";
            shard.style.setProperty("--ss-delay", `${Math.random() * 320}ms`);
            const tx = (Math.random() * 2 - 1) * 230;
            const ty = -40 - Math.random() * 280 + Math.random() * 70;
            const rot = (Math.random() * 150 - 75).toFixed(2);
            shard.style.setProperty("--ss-shard-x", `${tx.toFixed(2)}px`);
            shard.style.setProperty("--ss-shard-y", `${ty.toFixed(2)}px`);
            shard.style.setProperty("--ss-shard-r", `${rot}deg`);
            shard.style.width = `${1.5 + Math.random() * 2.5}px`;
            shard.style.height = `${6 + Math.random() * 10}px`;
            shards.push(shard);
            shardFragment.appendChild(shard);
          }
          overlay.appendChild(shardFragment);
        }
        document.body.appendChild(overlay);
        _diagLog("OVERLAY_APPENDED");
        this._transitionStopCanvas = null;
        if (!prefersReducedMotion) {
          const startCanvas = () => {
            if (runId !== this._transitionRunId) return;
            _diagLog("CANVAS_ANIMATION_START");
            try {
              this._transitionStopCanvas = this.startPortalCanvasAnimation(canvas, totalDuration, cssPortalEl, perfProfile);
            } catch (error) {
              this._transitionStopCanvas = null;
              debugError(this, "Transition", "Canvas portal start failed; continuing with non-canvas overlay", error);
            }
          };
          if (typeof requestAnimationFrame === "function") {
            requestAnimationFrame(startCanvas);
          } else {
            setTimeout(startCanvas, 0);
          }
        }
        const canUseWaapi = typeof overlay.animate === "function";
        if (!prefersReducedMotion && canUseWaapi) {
          _diagLog("WAAPI_OVERLAY_START");
          overlay.classList.add("ss-transition-overlay--waapi");
          overlay.animate(
            [
              { opacity: 0 },
              { opacity: 1, offset: 0.08 },
              { opacity: 1, offset: 0.88 },
              { opacity: 0.7, offset: 0.95 },
              { opacity: 0 }
            ],
            { duration: totalDuration, easing: "linear", fill: "forwards" }
          );
          const shardAnims = [];
          if (_getPortalCoreState().gsapLoaded && window.gsap) {
            for (const shard of shards) {
              const delay = parseFloat(shard.style.getPropertyValue("--ss-delay")) || 0;
              const tx = shard.style.getPropertyValue("--ss-shard-x") || "0px";
              const ty = shard.style.getPropertyValue("--ss-shard-y") || "-80px";
              const rot = shard.style.getPropertyValue("--ss-shard-r") || "0deg";
              window.gsap.set(shard, { scale: 0.3, opacity: 0, x: 0, y: 0, rotation: 0 });
              const shardTl = window.gsap.timeline({ delay: delay / 1e3 });
              shardTl.to(shard, {
                scale: 1,
                opacity: 0.72,
                duration: 0.2,
                ease: "back.out(2)"
              });
              shardTl.to(shard, {
                x: tx,
                y: ty,
                rotation: rot,
                scale: 0.2,
                opacity: 0,
                duration: 0.7,
                ease: "power3.out"
              });
              shardAnims.push(shardTl);
            }
            this._activeShardAnims = shardAnims;
            debugLog(this, "Transition", "Using GSAP shards + canvas portal transition");
          } else {
            for (const shard of shards) {
              const delay = parseFloat(shard.style.getPropertyValue("--ss-delay")) || 0;
              const tx = shard.style.getPropertyValue("--ss-shard-x") || "0px";
              const ty = shard.style.getPropertyValue("--ss-shard-y") || "-80px";
              const rot = shard.style.getPropertyValue("--ss-shard-r") || "0deg";
              shardAnims.push(shard.animate(
                [
                  { transform: "translate3d(0, 0, 0) rotate(0deg) scale(0.3)", opacity: 0 },
                  { transform: "translate3d(0, 0, 0) rotate(0deg) scale(1)", opacity: 0.72, offset: 0.22 },
                  { transform: `translate3d(${tx}, ${ty}, 0) rotate(${rot}) scale(0.2)`, opacity: 0 }
                ],
                { duration: 900, easing: "cubic-bezier(.22,.61,.36,1)", fill: "forwards", delay }
              ));
            }
            this._activeShardAnims = shardAnims;
            debugLog(this, "Transition", "Using WAAPI + canvas portal transition");
          }
        } else if (prefersReducedMotion) {
          overlay.classList.add("ss-transition-overlay--reduced");
          if (canUseWaapi) {
            overlay.animate(
              [{ opacity: 0 }, { opacity: 0.65, offset: 0.35 }, { opacity: 0 }],
              { duration: Math.max(260, Math.round(duration * 0.82)), easing: "ease-out", fill: "forwards" }
            );
          }
        } else {
          overlay.classList.add("ss-transition-overlay--css");
          debugLog(this, "Transition", "Using CSS fallback (canvas unavailable)");
        }
        let navigated = false;
        const runNavigation = () => {
          if (navigated) return;
          navigated = true;
          _diagLog("NAVIGATE_FIRE");
          debugLog(this, "Transition", `Navigation callback fired at ${Math.round(performance.now() - transitionStartedAt)}ms`);
          callback();
          Promise.resolve().then(() => _diagLog("NAVIGATE_CALLBACK_RETURNED"));
          const readyDeadline = performance.now() + revealCapMs;
          const pollReady = () => {
            if (runId !== this._transitionRunId) return;
            if (this._isDestinationReady(targetPath)) {
              this._releasePortalReveal("dest-ready");
              return;
            }
            if (performance.now() >= readyDeadline) {
              this._releasePortalReveal("ready-timeout");
              return;
            }
            setTimeout(pollReady, REVEAL_READY_POLL_MS);
          };
          requestAnimationFrame(() => requestAnimationFrame(pollReady));
        };
        const navDelay = prefersReducedMotion ? 24 : Math.max(580, Math.round(totalDuration * 0.39));
        _diagLog(`NAV_SCHEDULED (delay=${navDelay}ms, cached=${isCached})`);
        if (this._transitionNavTimeout) clearTimeout(this._transitionNavTimeout);
        if (this._transitionCleanupTimeout) clearTimeout(this._transitionCleanupTimeout);
        this._transitionNavTimeout = setTimeout(() => {
          if (runId !== this._transitionRunId) return;
          this._transitionNavTimeout = null;
          runNavigation();
        }, navDelay);
        const cleanupDelay = prefersReducedMotion ? Math.max(320, Math.round(duration * 0.98)) : totalDuration + 340 + revealCapMs;
        _diagLog(`CLEANUP_SCHEDULED (delay=${cleanupDelay}ms)`);
        this._transitionCleanupTimeout = setTimeout(() => {
          if (runId !== this._transitionRunId) return;
          _diagLog("CLEANUP_FIRE");
          this._transitionCleanupTimeout = null;
          this._cancelPendingTransition();
        }, cleanupDelay);
      },
      /**
       * Is the teleport destination actually ready to be revealed?
       * True when the route has committed to the target AND (for a channel path)
       * the target channel's messages are present — i.e. Discord has painted the
       * destination, not just the old channel behind a committed URL. Used by the
       * reveal gate so the aperture opens onto the new channel, not the old one.
       */
      _isDestinationReady(targetPath) {
        try {
          if (!this._isPathActive(targetPath)) return false;
          const channelId = this._extractChannelId(targetPath);
          if (!channelId) return true;
          return this._isChannelCached(targetPath);
        } catch (_) {
          return false;
        }
      },
      /**
       * REVEAL GATE release — called when the destination is ready (readiness poll
       * after the route callback) or when the draw loop / poll hits the hold cap.
       * Idempotent; resumes the GSAP timeline if it's parked at the addPause.
       */
      _releasePortalReveal(reason) {
        const gate = this._portalRevealGate;
        if (!gate || gate.released) return;
        gate.released = true;
        debugLog(this, "Transition", `Reveal gate released (${reason})`);
        const tl = this._gsapMasterTimeline;
        try {
          if (tl && tl.paused()) tl.play();
        } catch (_) {
        }
      },
      startPortalCanvasAnimation(canvas, duration, cssPortalEl, perfProfile) {
        if (_getPortalCoreState().gsapLoaded && window.gsap) {
          return this._startPortalCanvasGSAP(canvas, duration, cssPortalEl, perfProfile);
        }
        if (typeof canvas.transferControlToOffscreen === "function") {
          try {
            return this._startPortalCanvasWorker(canvas, duration, perfProfile);
          } catch (e) {
            console.warn("[ShadowPortalCore] OffscreenCanvas Worker failed, falling back to main thread:", e);
          }
        }
        return this._startPortalCanvasMainThread(canvas, duration, null, false, perfProfile);
      },
      /**
       * GSAP-enhanced canvas animation path.
       * Creates a master timeline driving a state object; the canvas draw loop
       * reads GSAP-interpolated values instead of computing from raw `t`.
       * Uses main-thread canvas only (GSAP depends on DOM APIs).
       */
      _startPortalCanvasGSAP(canvas, duration, cssPortalEl, perfProfile) {
        var _a;
        const gsap = window.gsap;
        if (!gsap) return this._startPortalCanvasMainThread(canvas, duration, null, false, perfProfile);
        const gs = {
          portalForm: 0.38,
          // 0.38→1.0 (formation envelope)
          formEase: 0,
          // 0→1 (formation progress)
          easeInOut: 0,
          // 0→1 (global ease envelope)
          fadeOut: 1,
          // 1→0 (end fade)
          revealProgress: 0,
          // 0→1 (aperture reveal)
          revealEase: 0,
          // 0→1 (reveal easing)
          ringGlow: 1,
          // glow multiplier (Phase 5)
          coreGlow: 1,
          // core glow multiplier (Phase 5)
          hueShift: 0,
          // hue drift in degrees (Phase 5)
          shockwaveBoost: 0,
          // elastic overshoot for shockwave ripples (Phase 3)
          shadowEnvelope: 0,
          // 0→1→0 black engulf before reveal (shadow teleport effect)
          darknessOverlay: 0,
          // 0→1 full-screen black blanket drawn on top of everything
          vortexSpin: 0,
          // 0→1 accelerating spiral rotation over portal lifetime
          strandMorph: 0,
          // 0↔1 strand deformation amplitude modulator (breathing)
          tendrilPulse: 0.5
          // 0↔1 inner tendril intensity breathing
        };
        const dur = duration / 1e3;
        const tl = gsap.timeline();
        tl.to(gs, {
          portalForm: 1,
          formEase: 1,
          duration: dur * 0.25,
          ease: "back.out(1.4)"
        }, 0);
        tl.to(gs, {
          easeInOut: 1,
          duration: dur,
          ease: "power2.inOut"
        }, 0);
        tl.addPause(dur * 0.6, () => {
          const gate = this._portalRevealGate;
          if (!gate || gate.released) {
            try {
              tl.play();
            } catch (_) {
            }
          }
        });
        tl.to(gs, {
          revealProgress: 1,
          revealEase: 1,
          duration: dur * 0.4,
          ease: "expo.inOut"
        }, dur * 0.6);
        tl.to(gs, {
          fadeOut: 0,
          duration: dur * 0.05,
          ease: "power2.in"
        }, dur * 0.95);
        tl.to(gs, {
          shadowEnvelope: 1,
          duration: dur * 0.15,
          ease: "power2.in"
        }, dur * 0.25);
        tl.to(gs, {
          shadowEnvelope: 0,
          duration: dur * 0.14,
          ease: "power3.out"
        }, dur * 0.6);
        tl.to(gs, {
          shockwaveBoost: 1,
          duration: dur * 0.26,
          ease: "elastic.out(1, 0.3)"
        }, dur * 0.74);
        tl.to(gs, {
          vortexSpin: 1,
          duration: dur,
          ease: "power2.in"
        }, 0);
        const breathingTweens = [
          gsap.to(gs, { ringGlow: 1.6, duration: 0.8, ease: "sine.inOut", yoyo: true, repeat: -1 }),
          gsap.to(gs, { coreGlow: 2, duration: 1.1, ease: "sine.inOut", yoyo: true, repeat: -1 }),
          gsap.to(gs, { hueShift: 10, duration: 2, ease: "none", yoyo: true, repeat: -1 }),
          gsap.to(gs, { strandMorph: 1, duration: 0.7, ease: "sine.inOut", yoyo: true, repeat: -1 }),
          gsap.to(gs, { tendrilPulse: 1, duration: 0.5, ease: "sine.inOut", yoyo: true, repeat: -1 })
        ];
        if (cssPortalEl) {
          const revealAt = dur * 0.6;
          const expandDur = dur * 0.36;
          tl.fromTo(
            cssPortalEl,
            { opacity: 0, scale: 0.3 },
            { opacity: 1, scale: 1, duration: dur * 0.25, ease: "back.out(1.2)" },
            0
          );
          const overlayEl = cssPortalEl.parentNode;
          tl.set(overlayEl, { overflow: "visible" }, revealAt);
          tl.set(cssPortalEl, {
            borderRadius: "0%",
            overflow: "visible"
          }, revealAt);
          tl.to(cssPortalEl, {
            scale: 2.4,
            duration: expandDur,
            ease: "power2.inOut"
          }, revealAt);
          tl.to(canvas, {
            opacity: 0,
            duration: dur * 0.2,
            ease: "power2.in"
          }, dur * 0.74);
          tl.to(cssPortalEl._inner, {
            scale: 3.5,
            duration: expandDur,
            ease: "power2.inOut"
          }, revealAt);
          tl.to(cssPortalEl._core, {
            scale: 3.5,
            duration: expandDur,
            ease: "power2.inOut"
          }, revealAt);
          tl.set(cssPortalEl, { filter: "contrast(2.2)" }, 0);
          tl.set(cssPortalEl._glow, { opacity: 1 }, 0);
          tl.to(cssPortalEl._glow, {
            opacity: 0,
            duration: dur * 0.15,
            ease: "power2.in"
          }, dur * 0.25);
          tl.to(cssPortalEl._glow, {
            opacity: 1,
            duration: dur * 0.14,
            ease: "power3.out"
          }, dur * 0.6);
          tl.to([cssPortalEl, cssPortalEl._glow], {
            opacity: 0,
            duration: dur * 0.08,
            ease: "power2.in"
          }, revealAt + expandDur * 0.85);
        }
        this._gsapMasterTimeline = tl;
        if ((_a = this.settings) == null ? void 0 : _a.debugMode) {
          console.log(
            "%c[PortalDiag]%c GSAP timeline created \u2014 " + dur.toFixed(3) + "s, " + tl.getChildren().length + " tweens" + (cssPortalEl ? " (CSS portal active)" : ""),
            "color:#a855f7;font-weight:bold",
            "color:#22c55e",
            "CustomEase:",
            !!window.CustomEase,
            "Physics2D:",
            !!window.Physics2DPlugin
          );
        }
        const stopCanvas = this._startPortalCanvasMainThread(canvas, duration, gs, !!cssPortalEl, perfProfile);
        return () => {
          tl.kill();
          for (const tw of breathingTweens) tw.kill();
          this._gsapMasterTimeline = null;
          if (stopCanvas) stopCanvas();
        };
      },
      _startPortalCanvasMainThread(canvas, duration, _gsap, _cssPortalActive, perfProfile) {
        if (!canvas || typeof canvas.getContext !== "function") return null;
        const ctx = canvas.getContext("2d", { alpha: true, desynchronized: true });
        if (!ctx) return null;
        const TAU = Math.PI * 2;
        const perf = perfProfile || getPortalPerfProfile();
        const perfTier = perf.perfTier;
        const qualityScale = perf.qualityScale;
        const detailStep = perf.detailStep;
        const mistStep = perf.mistStep;
        const shadowScale = perf.shadowScale;
        const dpr = perf.dpr;
        let width = 1;
        let height = 1;
        let maxSide = 1;
        let cx = 0;
        let cy = 0;
        let rafId = 0;
        let stopped = false;
        const targetFrameMs = perf.targetFrameMs;
        let lastFrameAt = 0;
        const seedCacheKey = `v1:${perfTier}:${qualityScale.toFixed(2)}`;
        if (!(this.__shadowPortalSeedCache instanceof Map)) {
          this.__shadowPortalSeedCache = /* @__PURE__ */ new Map();
        }
        let seeds = this.__shadowPortalSeedCache.get(seedCacheKey);
        if (!seeds) {
          seeds = {
            // wisps, darkBlots, portalRifts, coreFilaments removed — only used by worker fallback path
            ringMistBands: Array.from({ length: Math.max(38, Math.round(84 * qualityScale)) }, () => ({
              angle: Math.random() * TAU,
              speed: 0.2 + Math.random() * 0.95,
              width: 0.06 + Math.random() * 0.22,
              band: 0.74 + Math.random() * 0.64,
              lineWidth: 1.1 + Math.random() * 2.7,
              phase: Math.random() * TAU
            })),
            purpleJets: Array.from({ length: Math.max(18, Math.round(34 * qualityScale)) }, () => ({
              angle: Math.random() * TAU,
              speed: 0.24 + Math.random() * 0.92,
              length: 0.34 + Math.random() * 0.32,
              spread: 0.22 + Math.random() * 0.64,
              lineWidth: 1 + Math.random() * 2.5,
              phase: Math.random() * TAU
            })),
            outerLightning: Array.from({ length: Math.max(28, Math.round(52 * qualityScale)) }, () => ({
              angle: Math.random() * TAU,
              speed: 0.32 + Math.random() * 0.88,
              reach: 0.4 + Math.random() * 0.6,
              width: 1.4 + Math.random() * 2.2,
              jitter: 0.05 + Math.random() * 0.09,
              phase: Math.random() * TAU
            }))
          };
          this.__shadowPortalSeedCache.set(seedCacheKey, seeds);
          if (this.__shadowPortalSeedCache.size > 2) {
            const firstKey = this.__shadowPortalSeedCache.keys().next().value;
            if (firstKey !== seedCacheKey) this.__shadowPortalSeedCache.delete(firstKey);
          }
        }
        const { ringMistBands, purpleJets, outerLightning } = seeds;
        const resize = () => {
          width = Math.max(1, Math.floor(window.innerWidth));
          height = Math.max(1, Math.floor(window.innerHeight));
          maxSide = Math.max(width, height);
          cx = width / 2;
          cy = height / 2;
          canvas.width = Math.max(1, Math.floor(width * dpr));
          canvas.height = Math.max(1, Math.floor(height * dpr));
          canvas.style.width = `${width}px`;
          canvas.style.height = `${height}px`;
          ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        };
        resize();
        let resizeTimer = null;
        const onResize = () => {
          if (resizeTimer) clearTimeout(resizeTimer);
          resizeTimer = setTimeout(resize, 150);
        };
        window.addEventListener("resize", onResize, { passive: true });
        const start = performance.now();
        const _canvasDiag = { formDone: false, revealStarted: false, fadeStarted: false, done: false };
        const _cdLog = (phase) => {
          var _a;
          if ((_a = this.settings) == null ? void 0 : _a.debugMode) console.log(`%c[PortalDiag]%c ${phase} %c@ ${Math.round(performance.now() - start)}ms (canvas)`, "color:#a855f7;font-weight:bold", "color:#e2e8f0", "color:#94a3b8");
        };
        const revealGate = this._portalRevealGate || null;
        const gateHoldPointMs = Math.max(1, duration) * 0.599;
        let gateFrozenMs = 0;
        const draw = (now) => {
          var _a;
          if (stopped) return;
          let elapsed = now - start - gateFrozenMs;
          if (revealGate && !revealGate.released && elapsed >= gateHoldPointMs) {
            if (gateFrozenMs >= revealGate.capMs) {
              this._releasePortalReveal("hold-cap");
            } else {
              gateFrozenMs += elapsed - gateHoldPointMs;
              elapsed = gateHoldPointMs;
            }
          }
          const t = Math.max(0, Math.min(1, elapsed / Math.max(1, duration)));
          if (now - lastFrameAt < targetFrameMs) {
            if (t < 1) rafId = requestAnimationFrame(draw);
            return;
          }
          lastFrameAt = now;
          const swirl = elapsed * 44e-4;
          const revealStart = 0.6;
          let easeInOut, fadeOut, darknessOverlay, formT, formEase, portalForm, revealProgress, revealEase;
          darknessOverlay = t < 0.38 ? Math.pow(t / 0.38, 3.5) : t < 0.6 ? 1 : t < 0.74 ? 1 - Math.pow(Math.min(1, (t - 0.6) / 0.14), 0.5) : 0;
          if (_gsap) {
            easeInOut = _gsap.easeInOut;
            fadeOut = _gsap.fadeOut;
            formEase = _gsap.formEase;
            portalForm = _gsap.portalForm;
            revealProgress = _gsap.revealProgress;
            revealEase = _gsap.revealEase;
            formT = formEase;
          } else {
            easeInOut = t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
            fadeOut = t < 0.96 ? 1 : Math.max(0, 1 - (t - 0.96) / 0.04);
            formT = Math.min(1, t / 0.22);
            formEase = 1 - Math.pow(1 - formT, 3);
            portalForm = 0.38 + 0.62 * formEase;
            revealProgress = t <= revealStart ? 0 : Math.min(1, (t - revealStart) / (1 - revealStart));
            revealEase = revealProgress < 0.5 ? 2 * revealProgress * revealProgress : 1 - Math.pow(-2 * revealProgress + 2, 2) / 2;
          }
          if (!_canvasDiag.formDone && formT >= 1) {
            _canvasDiag.formDone = true;
            _cdLog("FORMATION_COMPLETE (formT=1, t=0.22)");
          }
          if (!_canvasDiag.revealStarted && t > revealStart) {
            _canvasDiag.revealStarted = true;
            _cdLog(`REVEAL_APERTURE_START (t=${t.toFixed(3)}, target=0.60)`);
          }
          if (!_canvasDiag.fadeStarted && t >= 0.95) {
            _canvasDiag.fadeStarted = true;
            _cdLog("FADE_OUT_START (t=0.95)");
          }
          if (!_canvasDiag.done && t >= 1) {
            _canvasDiag.done = true;
            _cdLog("CANVAS_ANIMATION_END (t=1)");
          }
          const glowMul = _gsap ? _gsap.ringGlow : 1;
          const glowDim = _gsap ? 1 - _gsap.shadowEnvelope : 1;
          const effShadow = shadowScale * glowDim;
          const portalRadius = maxSide * (0.68 + 1.28 * easeInOut);
          ctx.clearRect(0, 0, width, height);
          const overlayAlpha = 0.7 * formEase * fadeOut;
          ctx.fillStyle = `rgba(2,1,4,${overlayAlpha.toFixed(3)})`;
          ctx.fillRect(0, 0, width, height);
          const envelope = _gsap ? _gsap.shadowEnvelope : 0;
          if (envelope > 0.01) {
            ctx.fillStyle = `rgba(0,0,0,${(envelope * fadeOut).toFixed(3)})`;
            ctx.fillRect(0, 0, width, height);
          }
          if (darknessOverlay > 5e-3) {
            ctx.save();
            ctx.globalCompositeOperation = "source-over";
            ctx.globalAlpha = 1;
            ctx.fillStyle = `rgba(0,0,0,${darknessOverlay.toFixed(3)})`;
            ctx.fillRect(0, 0, width, height);
            ctx.restore();
            if (((_a = this.settings) == null ? void 0 : _a.debugMode) && (!this._lastDarknessLog || now - this._lastDarknessLog > 500)) {
              this._lastDarknessLog = now;
              console.log(`%c[DarknessOverlay]%c t=${t.toFixed(3)} darkness=${darknessOverlay.toFixed(4)} fadeOut=${fadeOut.toFixed(4)} gsap=${!!_gsap} canvasW=${width} canvasH=${height}`, "color:#ff6b6b;font-weight:bold", "color:#e2e8f0");
            }
          }
          if (revealProgress > 0) {
            const innerRadius = portalRadius * (0.62 + 0.1 * Math.sin(swirl * 4.4));
            const apertureRadius = innerRadius * (0.24 + 2.36 * revealEase) * (1 + Math.sin(swirl * 9.8) * 0.11 * (1 - revealProgress * 0.62));
            ctx.save();
            ctx.globalCompositeOperation = "destination-out";
            ctx.beginPath();
            ctx.arc(cx, cy, apertureRadius, 0, TAU);
            ctx.fill();
            ctx.restore();
            const ringRadius = apertureRadius * (1 + Math.sin(swirl * 10.8) * 0.026);
            const oneMinusReveal = 1 - revealProgress;
            const rimWidth = innerRadius * (0.48 + oneMinusReveal * 0.28);
            const ringInner = Math.max(2, ringRadius - rimWidth * 0.42);
            const ringOuter = ringRadius + rimWidth * 1.3;
            const fadeStr = fadeOut.toFixed(3);
            const fade092 = (0.92 * fadeOut).toFixed(3);
            const fade064 = (0.64 * fadeOut).toFixed(3);
            const fade048 = (0.48 * fadeOut).toFixed(3);
            const fade058 = (0.58 * fadeOut).toFixed(3);
            const fade044 = (0.44 * fadeOut).toFixed(3);
            const fade032 = (0.32 * fadeOut).toFixed(3);
            const fade016 = (0.16 * fadeOut).toFixed(3);
            const mistShadowBlur = (10 + oneMinusReveal * 16) * effShadow;
            const jetShadowBlur = (12 + oneMinusReveal * 14) * effShadow;
            const mistLineExtra = oneMinusReveal * 1.8;
            const jetLineExtra = 1.6 + oneMinusReveal * 2.4;
            const ringBody = ctx.createRadialGradient(cx, cy, ringInner, cx, cy, ringOuter);
            ringBody.addColorStop(0, `rgba(0,0,0,${fadeStr})`);
            ringBody.addColorStop(0.68, `rgba(4,2,8,${fade092})`);
            ringBody.addColorStop(0.88, `rgba(8,6,14,${fade064})`);
            ringBody.addColorStop(1, "rgba(0,0,0,0)");
            ctx.fillStyle = ringBody;
            ctx.beginPath();
            ctx.arc(cx, cy, ringOuter, 0, TAU);
            ctx.arc(cx, cy, ringInner, 0, TAU, true);
            ctx.fill("evenodd");
            const blackRimAlpha = Math.max(0, (1 - revealProgress * 0.18) * fadeOut);
            if (blackRimAlpha > 6e-3) {
              ctx.beginPath();
              ctx.strokeStyle = `rgba(0,0,0,${blackRimAlpha.toFixed(3)})`;
              ctx.lineWidth = 14 + oneMinusReveal * 20;
              ctx.shadowBlur = (14 + oneMinusReveal * 22) * effShadow;
              ctx.shadowColor = `rgba(0,0,0,${(blackRimAlpha * 0.78).toFixed(3)})`;
              ctx.arc(cx, cy, ringRadius, 0, TAU);
              ctx.stroke();
            }
            const edgeAlpha = Math.max(0, (0.34 - revealProgress * 0.12) * fadeOut);
            if (edgeAlpha > 4e-3) {
              ctx.beginPath();
              ctx.strokeStyle = `rgba(124,120,136,${edgeAlpha.toFixed(3)})`;
              ctx.lineWidth = 1.2 + oneMinusReveal * 1.4;
              ctx.shadowBlur = (8 + oneMinusReveal * 8) * effShadow;
              ctx.shadowColor = `rgba(48,44,60,${(edgeAlpha * 0.84).toFixed(3)})`;
              ctx.arc(cx, cy, ringRadius + rimWidth * 0.34, 0, TAU);
              ctx.stroke();
            }
            ctx.shadowBlur = mistShadowBlur;
            ctx.shadowColor = "rgba(18,18,24,0.15)";
            for (let mi = 0; mi < ringMistBands.length; mi += mistStep) {
              const band = ringMistBands[mi];
              const drift = swirl * band.speed + band.phase;
              const radius = ringRadius + innerRadius * (0.03 + (band.band - 0.9) * 0.24) + Math.sin(drift * 1.2) * innerRadius * 0.03;
              const arcLength = band.width + Math.sin(drift * 1.8) * 0.04;
              const start2 = band.angle + drift * 0.32;
              const alpha = (0.07 + 0.12 * oneMinusReveal) * (0.7 + Math.sin(drift * 2.4) * 0.3) * fadeOut;
              if (alpha <= 4e-3) continue;
              ctx.beginPath();
              ctx.globalAlpha = alpha;
              ctx.strokeStyle = "rgba(66,66,76,1)";
              ctx.lineWidth = band.lineWidth + mistLineExtra;
              ctx.arc(cx, cy, radius, start2, start2 + arcLength);
              ctx.stroke();
            }
            ctx.globalAlpha = 1;
            const swBoost = _gsap ? _gsap.shockwaveBoost : 0;
            for (let i = 0; i < 5; i++) {
              const wave = revealProgress * 1.45 - i * 0.18;
              if (wave <= 0 || wave >= 1.52) continue;
              const waveRadius = ringOuter + innerRadius * wave * (0.92 + swBoost * 0.18);
              const waveAlpha = 0.22 * (1 - Math.min(1, wave)) * (1 - i * 0.12) * fadeOut;
              if (waveAlpha <= 3e-3) continue;
              ctx.beginPath();
              ctx.globalAlpha = waveAlpha;
              ctx.strokeStyle = "rgba(72,58,96,1)";
              ctx.lineWidth = Math.max(1.5, 6.4 - wave * 2.8);
              ctx.shadowBlur = (16 + (1 - wave) * 24) * effShadow * glowMul;
              ctx.shadowColor = "rgba(48,32,78,0.88)";
              ctx.arc(cx, cy, waveRadius, 0, TAU);
              ctx.stroke();
            }
            ctx.globalAlpha = 1;
            ctx.globalCompositeOperation = "screen";
            ctx.shadowBlur = jetShadowBlur;
            ctx.shadowColor = "rgba(50,28,90,0.45)";
            for (let i = 0; i < purpleJets.length; i += detailStep) {
              const jet = purpleJets[i];
              const drift = swirl * jet.speed + jet.phase;
              const radius = ringRadius + innerRadius * (0.01 + Math.sin(drift * 1.7) * 0.04);
              const start2 = jet.angle + drift * 0.24;
              const span = 0.12 + jet.spread * 0.18 + Math.sin(drift * 2.1) * 0.03;
              const alpha = (0.24 + 0.34 * oneMinusReveal) * (0.7 + Math.sin(drift * 3.1) * 0.3) * fadeOut;
              if (alpha <= 4e-3) continue;
              ctx.beginPath();
              ctx.globalAlpha = alpha * 0.5;
              ctx.strokeStyle = "rgba(80,50,130,1)";
              ctx.lineWidth = jet.lineWidth + jetLineExtra;
              ctx.arc(cx, cy, radius, start2, start2 + span);
              ctx.stroke();
            }
            ctx.globalAlpha = 1;
            ctx.globalCompositeOperation = "source-over";
            const revealLightningRamp = Math.max(0, Math.min(1, (revealProgress - 0.08) / 0.92));
            if (revealLightningRamp > 0.01) {
              const revealBoltStep = Math.max(perfTier === 0 ? 3 : 2, detailStep + 1);
              const revealMainSteps = perfTier === 0 ? 4 : 5;
              const revealBranchSteps = perfTier === 0 ? 3 : 4;
              const revealLightningRadius = ringOuter + rimWidth * 0.12;
              const mainShadowBlur = (10 + oneMinusReveal * 8) * effShadow;
              const coreShadowBlur = (5 + oneMinusReveal * 6) * effShadow;
              const branchShadowBlur = (7 + oneMinusReveal * 6) * effShadow;
              for (let li = 0; li < outerLightning.length; li += revealBoltStep) {
                const bolt = outerLightning[li];
                const drift = swirl * (bolt.speed * 1.06) + bolt.phase;
                const flicker = 0.5 + 0.5 * Math.sin(drift * 4.2 + revealProgress * 16) + 0.3 * Math.sin(drift * 6.6 + bolt.phase * 1.2);
                if (flicker < -0.04) continue;
                const alpha = (0.1 + 0.18 * (flicker * 0.5 + 0.5)) * revealLightningRamp * fadeOut;
                if (alpha <= 3e-3) continue;
                const baseA = bolt.angle + drift * 0.2 + Math.sin(drift * 1.8) * 0.06;
                const startR = revealLightningRadius * (0.98 + 0.05 * Math.sin(drift * 1.7));
                const reach = innerRadius * (0.18 + bolt.reach * 0.42);
                const span = 0.2 + 0.08 * Math.sin(drift * 2.4 + bolt.phase);
                ctx.beginPath();
                for (let i = 0; i <= revealMainSteps; i++) {
                  const p = i / revealMainSteps;
                  const rr = startR + reach * p;
                  const jag = Math.sin(drift * 3 + p * 12.2) + 0.58 * Math.sin(drift * 5.1 + p * 7.6 + bolt.phase);
                  const ang = baseA + (p - 0.24) * span + jag * bolt.jitter * (1 + p * 1.12);
                  const x = cx + Math.cos(ang) * rr;
                  const y = cy + Math.sin(ang) * rr * 0.88;
                  if (i === 0) ctx.moveTo(x, y);
                  else ctx.lineTo(x, y);
                }
                ctx.globalAlpha = alpha * 0.72;
                ctx.strokeStyle = "rgb(108, 64, 198)";
                ctx.lineWidth = Math.max(0.78, bolt.width * 0.88);
                ctx.shadowBlur = mainShadowBlur;
                ctx.shadowColor = "rgba(100, 58, 188, 0.88)";
                ctx.stroke();
                ctx.globalAlpha = Math.min(0.32, alpha + 0.03);
                ctx.strokeStyle = "rgb(208, 164, 255)";
                ctx.lineWidth = Math.max(0.7, bolt.width * 0.48);
                ctx.shadowBlur = coreShadowBlur;
                ctx.shadowColor = "rgba(170, 126, 246, 0.74)";
                ctx.stroke();
                if (flicker > 0.26) {
                  const dir = Math.sin(drift * 2 + bolt.phase) > 0 ? 1 : -1;
                  const branchStartP = 0.36 + 0.2 * (0.5 + 0.5 * Math.sin(drift * 1.4 + bolt.phase));
                  const fromR = startR + reach * branchStartP;
                  const fromA = baseA + dir * 0.035;
                  const branchReach = reach * (0.32 + 0.18 * (0.5 + 0.5 * Math.sin(drift * 2.1)));
                  const branchSpan = dir * (0.18 + 0.08 * Math.sin(drift * 2.8 + bolt.phase));
                  ctx.beginPath();
                  for (let b = 0; b <= revealBranchSteps; b++) {
                    const p = b / revealBranchSteps;
                    const rr = fromR + branchReach * p;
                    const jag = Math.sin(drift * 3.8 + p * 8.6) + 0.45 * Math.sin(drift * 6 + p * 5.4 + bolt.phase);
                    const ang = fromA + p * branchSpan + jag * bolt.jitter * 1.16;
                    const x = cx + Math.cos(ang) * rr;
                    const y = cy + Math.sin(ang) * rr * 0.88;
                    if (b === 0) ctx.moveTo(x, y);
                    else ctx.lineTo(x, y);
                  }
                  ctx.globalAlpha = alpha * 0.5;
                  ctx.strokeStyle = "rgb(120, 76, 210)";
                  ctx.lineWidth = Math.max(0.65, bolt.width * 0.52);
                  ctx.shadowBlur = branchShadowBlur;
                  ctx.shadowColor = "rgba(108, 70, 198, 0.82)";
                  ctx.stroke();
                }
              }
            }
            ctx.globalAlpha = 1;
            ctx.shadowBlur = 0;
            const mistHalo = ctx.createRadialGradient(
              cx,
              cy,
              Math.max(2, ringRadius * 0.72),
              cx,
              cy,
              ringOuter + innerRadius * (0.78 + oneMinusReveal * 0.34)
            );
            mistHalo.addColorStop(0, "rgba(0, 0, 0, 0)");
            mistHalo.addColorStop(0.18, `rgba(42, 28, 68, ${fade048})`);
            mistHalo.addColorStop(0.38, `rgba(64, 42, 108, ${fade058})`);
            mistHalo.addColorStop(0.56, `rgba(86, 52, 148, ${fade044})`);
            mistHalo.addColorStop(0.74, `rgba(58, 34, 102, ${fade032})`);
            mistHalo.addColorStop(0.9, `rgba(32, 18, 62, ${fade016})`);
            mistHalo.addColorStop(1, "rgba(0, 0, 0, 0)");
            ctx.fillStyle = mistHalo;
            ctx.globalAlpha = MIST_HALO_DIM;
            ctx.beginPath();
            ctx.arc(cx, cy, ringOuter + innerRadius, 0, TAU);
            ctx.fill();
            ctx.globalAlpha = 1;
            ctx.restore();
          }
          if (t < 1) rafId = requestAnimationFrame(draw);
        };
        rafId = requestAnimationFrame(draw);
        return () => {
          stopped = true;
          if (rafId) cancelAnimationFrame(rafId);
          if (resizeTimer) clearTimeout(resizeTimer);
          window.removeEventListener("resize", onResize);
          ctx.clearRect(0, 0, width, height);
        };
      },
      /**
       * OffscreenCanvas Worker version — runs the draw loop on a separate CPU thread.
       * Discord's main-thread navigation work cannot starve this animation.
       */
      _startPortalCanvasWorker(canvas, duration, perfProfile) {
        var _a;
        const TAU = Math.PI * 2;
        const perf = perfProfile || getPortalPerfProfile();
        const perfTier = perf.perfTier;
        const qualityScale = perf.qualityScale;
        const dpr = perf.dpr;
        const seedCacheKey = `v1:${perfTier}:${qualityScale.toFixed(2)}`;
        if (!(this.__shadowPortalSeedCache instanceof Map)) this.__shadowPortalSeedCache = /* @__PURE__ */ new Map();
        let seeds = this.__shadowPortalSeedCache.get(seedCacheKey);
        if (!seeds) {
          const rng = () => Math.random();
          seeds = {
            wisps: Array.from({ length: Math.max(56, Math.round(96 * qualityScale)) }, () => ({
              angle: rng() * TAU,
              speed: 0.08 + rng() * 0.46,
              offset: 0.08 + rng() * 1.08,
              size: 20 + rng() * 74,
              phase: rng() * TAU,
              drift: rng() * 2 - 1
            })),
            darkBlots: Array.from({ length: Math.max(24, Math.round(44 * qualityScale)) }, () => ({
              angle: rng() * TAU,
              speed: 0.12 + rng() * 0.38,
              offset: 0.12 + rng() * 0.92,
              size: 26 + rng() * 62,
              phase: rng() * TAU
            })),
            portalRifts: Array.from({ length: Math.max(16, Math.round(30 * qualityScale)) }, () => ({
              angle: rng() * TAU,
              speed: 0.22 + rng() * 0.62,
              spread: 0.42 + rng() * 1.05,
              lineWidth: 1 + rng() * 2.6,
              length: 0.46 + rng() * 0.32,
              phase: rng() * TAU
            })),
            coreFilaments: Array.from({ length: Math.max(12, Math.round(22 * qualityScale)) }, () => ({
              angle: rng() * TAU,
              speed: 0.3 + rng() * 0.82,
              spread: 0.62 + rng() * 1.12,
              lineWidth: 1 + rng() * 2,
              length: 0.54 + rng() * 0.26,
              phase: rng() * TAU
            })),
            ringMistBands: Array.from({ length: Math.max(28, Math.round(56 * qualityScale)) }, () => ({
              angle: rng() * TAU,
              speed: 0.2 + rng() * 0.95,
              width: 0.06 + rng() * 0.22,
              band: 0.74 + rng() * 0.64,
              lineWidth: 1.1 + rng() * 2.7,
              phase: rng() * TAU
            })),
            purpleJets: Array.from({ length: Math.max(14, Math.round(24 * qualityScale)) }, () => ({
              angle: rng() * TAU,
              speed: 0.24 + rng() * 0.92,
              length: 0.34 + rng() * 0.32,
              spread: 0.22 + rng() * 0.64,
              lineWidth: 1 + rng() * 2.5,
              phase: rng() * TAU
            })),
            outerLightning: Array.from({ length: Math.max(20, Math.round(36 * qualityScale)) }, () => ({
              angle: rng() * TAU,
              speed: 0.32 + rng() * 0.88,
              reach: 0.4 + rng() * 0.6,
              width: 1.4 + rng() * 2.2,
              jitter: 0.05 + rng() * 0.09,
              phase: rng() * TAU
            }))
          };
          this.__shadowPortalSeedCache.set(seedCacheKey, seeds);
          if (this.__shadowPortalSeedCache.size > 2) {
            const firstKey = this.__shadowPortalSeedCache.keys().next().value;
            if (firstKey !== seedCacheKey) this.__shadowPortalSeedCache.delete(firstKey);
          }
        }
        const initWidth = Math.max(1, Math.floor(window.innerWidth));
        const initHeight = Math.max(1, Math.floor(window.innerHeight));
        const offscreen = canvas.transferControlToOffscreen();
        const workerCode = `
"use strict";
let canvas, ctx, stopped = false;
let width, height, maxSide, cx, cy, dpr;
let seeds, perfTier, detailStep, mistStep, shadowScale, duration;
let frameDelayMs = 16;
const TAU = Math.PI * 2;

function resize(w, h, devicePixelRatio) {
  width = w; height = h; dpr = devicePixelRatio;
  maxSide = Math.max(width, height);
  cx = width / 2; cy = height / 2;
  canvas.width = Math.max(1, Math.floor(width * dpr));
  canvas.height = Math.max(1, Math.floor(height * dpr));
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
}

self.onmessage = (e) => {
  const msg = e.data;
  if (msg.type === "init") {
    canvas = msg.canvas;
    ctx = canvas.getContext("2d", { alpha: true, desynchronized: true });
    seeds = msg.seeds;
    perfTier = msg.perfTier;
    detailStep = perfTier === 0 ? 3 : perfTier === 1 ? 2 : 1;
    mistStep = perfTier === 0 ? 4 : perfTier === 1 ? 2 : 1;
    shadowScale = perfTier === 0 ? 1.3 : perfTier === 1 ? 1.7 : 2.1;
    frameDelayMs = Number(msg.frameDelayMs) > 0
      ? Number(msg.frameDelayMs)
      : (perfTier === 0 ? 28 : perfTier === 1 ? 22 : 16);
    duration = msg.duration;
    dpr = msg.dpr;
    resize(msg.width, msg.height, dpr);
    startDrawLoop();
  } else if (msg.type === "resize") {
    resize(msg.width, msg.height, dpr);
  } else if (msg.type === "stop") {
    stopped = true;
    if (ctx) ctx.clearRect(0, 0, canvas.width, canvas.height);
    self.close();
  }
};

function startDrawLoop() {
  const { wisps, darkBlots, portalRifts, coreFilaments, ringMistBands, purpleJets, outerLightning } = seeds;
  const qualityScale = perfTier === 0 ? 0.48 : perfTier === 1 ? 0.68 : 0.9;
  const start = performance.now();

  function draw() {
    if (stopped) return;
    const now = performance.now();
    const elapsed = now - start;
    const t = Math.max(0, Math.min(1, elapsed / Math.max(1, duration)));
    if (t >= 1) { stopped = true; return; }

    const easeInOut = t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
    const fadeOut = t < 0.96 ? 1 : Math.max(0, 1 - (t - 0.96) / 0.04);
    const darknessOverlay = t < 0.38
      ? Math.pow(t / 0.38, 3.5)
      : t < 0.60
        ? 1
        : t < 0.74
        ? 1 - Math.pow(Math.min(1, (t - 0.60) / 0.14), 0.5)
        : 0;
    const swirl = elapsed * 0.0044;
    const formT = Math.min(1, t / 0.22);
    const formEase = 1 - Math.pow(1 - formT, 3);
    const portalForm = 0.38 + 0.62 * formEase;
    const revealStart = 0.60;
    const revealProgress = t <= revealStart ? 0 : Math.min(1, (t - revealStart) / (1 - revealStart));
    const revealEase = revealProgress < 0.5 ? 2 * revealProgress * revealProgress : 1 - Math.pow(-2 * revealProgress + 2, 2) / 2;

    // Shadow envelope: vanilla computation (mirrors GSAP 25\u219240% gradual in, 60\u219274% out)
    let shadowEnvelope = 0;
    if (t >= 0.25 && t < 0.40) {
      const envT = (t - 0.25) / 0.15;
      shadowEnvelope = envT * envT; // power2.in (slight acceleration into darkness)
    } else if (t >= 0.40 && t < 0.60) {
      shadowEnvelope = 1;
    } else if (t >= 0.60 && t < 0.74) {
      const envT = (t - 0.60) / 0.14;
      shadowEnvelope = 1 - (1 - Math.pow(1 - envT, 3)); // power3.out
    }

    const glowDim = 1 - shadowEnvelope; // dims all glow during envelope
    const effShadow = shadowScale * glowDim;

    const portalRadius = maxSide * (0.68 + 1.28 * easeInOut);
    const innerRadius = portalRadius * (0.62 + 0.1 * Math.sin(swirl * 4.4));

    ctx.clearRect(0, 0, width, height);

    // Pre-cache fadeOut-derived strings (used 30+ times per frame)
    const fadeStr = fadeOut.toFixed(4);
    const fade048 = (0.48 * fadeOut).toFixed(4);
    const fade058 = (0.58 * fadeOut).toFixed(4);
    const fade044 = (0.44 * fadeOut).toFixed(4);
    const fade032 = (0.32 * fadeOut).toFixed(4);
    const fade016 = (0.16 * fadeOut).toFixed(4);
    const fade092 = (0.92 * fadeOut).toFixed(4);
    const fade088 = (0.88 * fadeOut).toFixed(4);
    const fade096 = (0.96 * fadeOut).toFixed(4);
    const fade064 = (0.64 * fadeOut).toFixed(4);

    // Ambient dim
    const ambientDim = (0.18 + 0.35 * formEase) * fadeOut;
    ctx.fillStyle = "rgba(2, 2, 6, " + ambientDim.toFixed(4) + ")";
    ctx.fillRect(0, 0, width, height);

    // Shadow envelope: complete blackout before reveal \u2014 shadow engulfs for teleport
    if (shadowEnvelope > 0.01) {
      ctx.fillStyle = "rgba(0, 0, 0, " + (shadowEnvelope * fadeOut).toFixed(4) + ")";
      ctx.fillRect(0, 0, width, height);
    }

    // Veil
    const veilOuter = maxSide * (0.58 + 0.9 * formEase);
    const veilInner = Math.max(2, innerRadius * (0.1 + 0.18 * formEase));
    const veil = ctx.createRadialGradient(cx, cy, veilInner, cx, cy, veilOuter);
    veil.addColorStop(0, "rgba(6, 4, 10, " + (0.52 * portalForm * fadeOut).toFixed(4) + ")");
    veil.addColorStop(0.26, "rgba(4, 3, 8, " + (0.56 * portalForm * fadeOut).toFixed(4) + ")");
    veil.addColorStop(0.62, "rgba(2, 2, 4, " + (0.34 * portalForm * fadeOut).toFixed(4) + ")");
    veil.addColorStop(1, "rgba(0, 0, 0, " + (0.10 * formEase * fadeOut).toFixed(4) + ")");
    ctx.fillStyle = veil;
    ctx.beginPath(); ctx.arc(cx, cy, veilOuter, 0, TAU); ctx.fill();

    // Wisps
    for (let wi = 0; wi < wisps.length; wi += detailStep) {
      const wisp = wisps[wi];
      const alpha = (0.03 + 0.22 * (1 - wisp.offset * 0.68)) * fadeOut * portalForm;
      if (alpha < 0.004) continue;
      const ang = wisp.angle + swirl * wisp.speed + Math.sin(swirl * 0.8 + wisp.phase) * 0.2;
      const orbit = portalRadius * (0.34 + wisp.offset * 0.72) + Math.sin(swirl * 2.4 + wisp.phase) * portalRadius * 0.12;
      const x = cx + Math.cos(ang) * orbit + Math.sin(swirl + wisp.phase) * 20 * wisp.drift;
      const y = cy + Math.sin(ang) * orbit * 0.78 + Math.cos(swirl * 0.92 + wisp.phase) * 14 * wisp.drift;
      const r = wisp.size * (0.88 + easeInOut * 0.72);
      const g = ctx.createRadialGradient(x, y, 0, x, y, r);
      g.addColorStop(0, "rgba(12, 10, 18, " + (alpha * 1.4).toFixed(4) + ")");
      g.addColorStop(0.56, "rgba(4, 3, 8, " + (alpha * 1.1).toFixed(4) + ")");
      g.addColorStop(1, "rgba(0, 0, 0, 0)");
      ctx.fillStyle = g; ctx.beginPath(); ctx.arc(x, y, r, 0, TAU); ctx.fill();
    }

    // Dark blots
    for (let bi = 0; bi < darkBlots.length; bi += detailStep) {
      const blot = darkBlots[bi];
      const alpha = (0.18 + 0.26 * (1 - blot.offset * 0.7)) * fadeOut * portalForm;
      if (alpha < 0.004) continue;
      const ang = blot.angle + swirl * blot.speed + Math.sin(swirl * 0.9 + blot.phase) * 0.32;
      const radius = innerRadius * (0.22 + blot.offset * 0.86);
      const x = cx + Math.cos(ang) * radius;
      const y = cy + Math.sin(ang) * radius * 0.82;
      const r = blot.size * (0.82 + easeInOut * 0.62);
      const bg = ctx.createRadialGradient(x, y, 0, x, y, r);
      bg.addColorStop(0, "rgba(0, 0, 0, " + Math.min(0.86, alpha).toFixed(4) + ")");
      bg.addColorStop(0.62, "rgba(0, 0, 0, " + (alpha * 0.58).toFixed(4) + ")");
      bg.addColorStop(1, "rgba(0, 0, 0, 0)");
      ctx.fillStyle = bg; ctx.beginPath(); ctx.arc(x, y, r, 0, TAU); ctx.fill();
    }

    // Purple ring energy
    const ringOuterClip = innerRadius * (1.18 + 0.05 * Math.sin(swirl * 1.6));
    const ringInnerClip = innerRadius * (0.66 + 0.04 * Math.sin(swirl * 2.1));
    ctx.save();
    ctx.beginPath();
    ctx.arc(cx, cy, ringOuterClip, 0, TAU);
    ctx.arc(cx, cy, ringInnerClip, 0, TAU, true);
    ctx.clip("evenodd");
    ctx.globalCompositeOperation = "screen";

    for (let ri = 0; ri < portalRifts.length; ri += detailStep) {
      const rift = portalRifts[ri];
      const base = rift.angle + swirl * rift.speed + Math.sin(swirl * 1.2 + rift.phase) * 0.22;
      ctx.beginPath();
      for (let i = 0; i <= 8; i++) {
        const p = i / 8;
        const rr = innerRadius * (1.06 - p * rift.length * 0.34 + 0.08 * Math.sin(swirl * 2.3 + rift.phase + p * 2.8));
        const ang = base + (p - 0.48) * rift.spread + Math.sin(swirl * 2 + rift.phase + p) * 0.08;
        const x = cx + Math.cos(ang) * rr;
        const y = cy + Math.sin(ang) * rr * 0.86;
        if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
      }
      const glow = (0.25 + 0.32 * Math.sin(swirl * 2.6 + rift.phase)) * fadeOut;
      ctx.strokeStyle = "rgba(100, 60, 160, " + Math.max(0.05, glow * 0.6).toFixed(4) + ")";
      ctx.lineWidth = rift.lineWidth + easeInOut * 1.8;
      ctx.shadowBlur = (8 + easeInOut * 14) * effShadow;
      ctx.shadowColor = "rgba(80, 40, 140, 0.5)";
      ctx.stroke();
    }

    for (let fi = 0; fi < coreFilaments.length; fi += detailStep) {
      const filament = coreFilaments[fi];
      const base = filament.angle + swirl * filament.speed + Math.sin(swirl * 1.8 + filament.phase) * 0.26;
      ctx.beginPath();
      for (let i = 0; i <= 7; i++) {
        const p = i / 7;
        const rr = innerRadius * (1.1 - p * filament.length * 0.36 + 0.06 * Math.sin(swirl * 2.6 + filament.phase + p * 2.4));
        const ang = base + (p - 0.5) * filament.spread + Math.sin(swirl * 2.2 + filament.phase + p * 0.6) * 0.06;
        const x = cx + Math.cos(ang) * rr;
        const y = cy + Math.sin(ang) * rr * 0.88;
        if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
      }
      const glow = (0.2 + 0.24 * Math.sin(swirl * 2.8 + filament.phase)) * fadeOut;
      ctx.strokeStyle = "rgba(120, 80, 170, " + Math.max(0.05, glow * 0.55).toFixed(4) + ")";
      ctx.lineWidth = filament.lineWidth + easeInOut * 1.5;
      ctx.shadowBlur = (6 + easeInOut * 10) * effShadow;
      ctx.shadowColor = "rgba(90, 50, 150, 0.45)";
      ctx.stroke();
    }
    ctx.restore();

    // Void gradient
    const voidGradient = ctx.createRadialGradient(cx, cy, innerRadius * 0.14, cx, cy, innerRadius * 2.18);
    voidGradient.addColorStop(0, "rgba(4, 2, 8, " + fade088 + ")");
    voidGradient.addColorStop(0.34, "rgba(2, 1, 5, " + fade096 + ")");
    voidGradient.addColorStop(0.72, "rgba(1, 1, 2, " + fade092 + ")");
    voidGradient.addColorStop(1, "rgba(0, 0, 0, 0)");
    ctx.fillStyle = voidGradient;
    ctx.beginPath(); ctx.arc(cx, cy, innerRadius * 2.18, 0, TAU); ctx.fill();

    // Hard occlusion mask
    const solidPortalRadius = innerRadius * (1.02 + 0.03 * Math.sin(swirl * 3.1));
    const solidPortalAlpha = Math.min(1, 0.98 * fadeOut + 0.02);
    ctx.fillStyle = "rgba(0, 0, 0, " + solidPortalAlpha.toFixed(4) + ")";
    ctx.beginPath(); ctx.arc(cx, cy, solidPortalRadius, 0, TAU); ctx.fill();

    // Core gradient
    const coreGradient = ctx.createRadialGradient(cx, cy, 0, cx, cy, innerRadius);
    coreGradient.addColorStop(0, "rgba(0, 0, 0, " + fadeStr + ")");
    coreGradient.addColorStop(0.32, "rgba(0, 0, 0, " + fadeStr + ")");
    coreGradient.addColorStop(0.72, "rgba(0, 0, 0, " + fadeStr + ")");
    coreGradient.addColorStop(1, "rgba(0, 0, 0, " + fadeStr + ")");
    ctx.fillStyle = coreGradient;
    ctx.beginPath(); ctx.arc(cx, cy, innerRadius, 0, TAU); ctx.fill();
    ctx.fillStyle = "rgba(0, 0, 0, " + fadeStr + ")";
    ctx.beginPath(); ctx.arc(cx, cy, innerRadius * 0.78, 0, TAU); ctx.fill();

    // Core vortex
    const coreVortexAlpha = (0.24 + 0.42 * (1 - revealProgress)) * fadeOut * portalForm;
    if (coreVortexAlpha > 0.004) {
      const coreVortexRadius = innerRadius * (1.0 + 0.52 * formEase);
      ctx.save();
      ctx.globalCompositeOperation = "source-over";
      const vortexGlow = ctx.createRadialGradient(cx, cy, Math.max(2, coreVortexRadius * 0.08), cx, cy, coreVortexRadius);
      vortexGlow.addColorStop(0, "rgba(40, 20, 70, " + (coreVortexAlpha * 0.8).toFixed(4) + ")");
      vortexGlow.addColorStop(0.28, "rgba(16, 10, 32, " + (coreVortexAlpha * 0.6).toFixed(4) + ")");
      vortexGlow.addColorStop(0.62, "rgba(6, 4, 14, " + (coreVortexAlpha * 0.4).toFixed(4) + ")");
      vortexGlow.addColorStop(1, "rgba(0, 0, 0, 0)");
      ctx.fillStyle = vortexGlow;
      ctx.beginPath(); ctx.arc(cx, cy, coreVortexRadius, 0, TAU); ctx.fill();

      // Worker fallback: 8 swirl strands (unified rotation + tapered width, no GSAP)
      var swirlCount = 8;
      var swirlPoints = perfTier === 0 ? 12 : 16;
      var strandSeeds = [0.73, 0.21, 0.58, 0.92, 0.37, 0.85, 0.14, 0.66];
      var strandDirs = [1, 1, -1, 1, 1, -1, 1, 1];
      var strandSpeeds = [1.24, 1.18, 0.88, 1.30, 1.22, 0.92, 1.26, 1.20];
      var strandTurns = [2.4, 2.2, 1.6, 2.5, 2.3, 1.8, 2.6, 2.1];
      for (var s = 0; s < swirlCount; s++) {
        var phase = swirl * strandSpeeds[s];
        var dir = strandDirs[s];
        var base = strandSeeds[s] * TAU + phase * dir;
        var wobbleFreq = 2.4 + s * 0.7;
        var wobbleAmp = 0.10 + 0.06 * Math.sin(phase * 0.6 + s);
        var pts = [];
        for (var i = 0; i <= swirlPoints; i++) {
          var p = i / swirlPoints;
          var rr = coreVortexRadius * (0.08 + 1.48 * p + 0.12 * Math.sin(phase * 1.9 + p * 6.4 + s * 1.3) + 0.06 * Math.sin(phase * 3.7 + p * 11.8 + s * 0.9));
          var twist = p * strandTurns[s] * dir;
          var distort = Math.sin(phase * wobbleFreq + p * 8.6 + s * 0.5) * wobbleAmp + Math.sin(phase * 4.1 + p * 13.2 + s * 1.1) * 0.04;
          var ang = base + twist + distort;
          pts.push({ x: cx + Math.cos(ang) * rr, y: cy + Math.sin(ang) * rr * 0.86 });
        }
        var strandAlpha = coreVortexAlpha * (0.58 + 0.42 * Math.sin(phase + s * 0.8));
        var tS = perfTier === 0 ? 0.9 : 1;
        var bW = 1.0 * tS;
        var mW = 16.0 * tS;
        ctx.lineCap = "round";
        for (var i = 0; i < pts.length - 1; i++) {
          var p = i / (pts.length - 1);
          var segA = strandAlpha * (0.3 + 0.7 * p);
          ctx.beginPath();
          ctx.moveTo(pts[i].x, pts[i].y);
          ctx.lineTo(pts[i + 1].x, pts[i + 1].y);
          ctx.lineWidth = bW + (mW - bW) * p * p;
          ctx.strokeStyle = "rgba(90, 55, 150, " + Math.max(0.03, segA * 0.65).toFixed(4) + ")";
          ctx.shadowBlur = (4 + 16 * p) * effShadow;
          ctx.shadowColor = "rgba(60, 30, 110, " + (segA * 0.55).toFixed(4) + ")";
          ctx.stroke();
        }
        ctx.lineCap = "butt";
      }

      // Worker fallback: 12 spiral tendrils (no GSAP \u2014 static sine spirals)
      var tendrilCount = 12;
      var tendrilPoints = 18;
      for (var ti = 0; ti < tendrilCount; ti++) {
        var tBaseAngle = (ti / tendrilCount) * TAU + swirl * 0.9;
        var spiralTightness = 1.8 + ti * 0.12;
        var spiralDir = (ti === 3 || ti === 7 || ti === 10) ? -1 : 1;
        ctx.beginPath();
        for (var i = 0; i <= tendrilPoints; i++) {
          var p = i / tendrilPoints;
          var rBase = coreVortexRadius * (0.04 + p * 0.42);
          var rWobble = coreVortexRadius * 0.06 * Math.sin(swirl * 2.8 + ti * 1.3 + p * 5.2);
          var rr = rBase + rWobble;
          var spiralAngle = tBaseAngle + p * spiralTightness * spiralDir + Math.sin(swirl * 2.5 + ti + p * 3) * 0.15 + Math.sin(swirl * 4.3 + ti * 0.7 + p * 7.8) * 0.05;
          var x = cx + Math.cos(spiralAngle) * rr;
          var y = cy + Math.sin(spiralAngle) * rr * 0.88;
          if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
        }
        var tAlpha = coreVortexAlpha * 0.55 * (0.5 + 0.5 * Math.sin(swirl * 2 + ti * 0.52));
        ctx.strokeStyle = "rgba(100, 60, 165, " + Math.max(0.04, tAlpha * 0.7).toFixed(4) + ")";
        ctx.lineWidth = 1.0 + 0.5 * Math.sin(swirl * 3 + ti * 0.9);
        ctx.shadowBlur = 6 * effShadow;
        ctx.shadowColor = "rgba(80, 40, 140, " + (tAlpha * 0.5).toFixed(4) + ")";
        ctx.stroke();
      }

      // Center blob \u2014 wobbly purple shape at portal core (Worker fallback)
      var blobR2 = coreVortexRadius * 0.10;
      var blobPulse2 = 0.75 + 0.25 * (0.5 + 0.5 * Math.sin(swirl * 1.2));
      var blobPts2 = 24;
      ctx.beginPath();
      for (var bi2 = 0; bi2 <= blobPts2; bi2++) {
        var bp2 = bi2 / blobPts2;
        var bAng2 = bp2 * TAU + swirl * 0.8;
        var bw2 = blobR2 * (
          1.0
          + 0.2 * Math.sin(swirl * 2.4 + bp2 * 5.5 + 0.3) * blobPulse2
          + 0.12 * Math.sin(swirl * 4.1 + bp2 * 10.0 + 1.2)
        );
        var bbx2 = cx + Math.cos(bAng2) * bw2;
        var bby2 = cy + Math.sin(bAng2) * bw2 * 0.9;
        if (bi2 === 0) ctx.moveTo(bbx2, bby2);
        else ctx.lineTo(bbx2, bby2);
      }
      ctx.closePath();
      var blobAlpha2 = coreVortexAlpha * 0.85 * blobPulse2;
      ctx.fillStyle = "rgba(105, 60, 180, " + blobAlpha2.toFixed(4) + ")";
      ctx.shadowBlur = 14 * effShadow;
      ctx.shadowColor = "rgba(120, 70, 200, " + (blobAlpha2 * 0.6).toFixed(4) + ")";
      ctx.fill();
      ctx.shadowBlur = 0;

      ctx.restore();
    }

    // Darkness overlay: drawn BEFORE aperture so the reveal punches through it
    if (darknessOverlay > 0.005) {
      ctx.save();
      ctx.globalCompositeOperation = "source-over";
      ctx.globalAlpha = 1;
      ctx.fillStyle = "rgba(0,0,0," + darknessOverlay.toFixed(4) + ")";
      ctx.fillRect(0, 0, width, height);
      ctx.restore();
    }

    // Reveal aperture
    if (revealProgress > 0) {
      const apertureRadius = innerRadius * (0.24 + 2.36 * revealEase) * (1 + Math.sin(swirl * 9.8) * 0.11 * (1 - revealProgress * 0.62));
      ctx.save(); ctx.globalCompositeOperation = "destination-out";
      ctx.beginPath(); ctx.arc(cx, cy, apertureRadius, 0, TAU); ctx.fill(); ctx.restore();

      const ringRadius = apertureRadius * (1 + Math.sin(swirl * 10.8) * 0.026);
      const rimWidth = innerRadius * (0.48 + (1 - revealProgress) * 0.28);
      const ringInner = Math.max(2, ringRadius - rimWidth * 0.42);
      const ringOuter = ringRadius + rimWidth * 1.3;

      ctx.save(); ctx.globalCompositeOperation = "source-over";
      const ringBody = ctx.createRadialGradient(cx, cy, ringInner, cx, cy, ringOuter);
      ringBody.addColorStop(0, "rgba(0, 0, 0, " + fadeStr + ")");
      ringBody.addColorStop(0.42, "rgba(0, 0, 0, " + fadeStr + ")");
      ringBody.addColorStop(0.68, "rgba(4, 2, 8, " + fade092 + ")");
      ringBody.addColorStop(0.88, "rgba(8, 6, 14, " + fade064 + ")");
      ringBody.addColorStop(1, "rgba(0, 0, 0, 0)");
      ctx.fillStyle = ringBody;
      ctx.beginPath(); ctx.arc(cx, cy, ringOuter, 0, TAU);
      ctx.arc(cx, cy, ringInner, 0, TAU, true); ctx.fill("evenodd");

      const blackRimAlpha = Math.max(0, (1.0 - revealProgress * 0.18) * fadeOut);
      if (blackRimAlpha > 0.006) {
        ctx.beginPath();
        ctx.strokeStyle = "rgba(0, 0, 0, " + blackRimAlpha.toFixed(4) + ")";
        ctx.lineWidth = 14 + (1 - revealProgress) * 20;
        ctx.shadowBlur = (14 + (1 - revealProgress) * 22) * effShadow;
        ctx.shadowColor = "rgba(0, 0, 0, " + (blackRimAlpha * 0.78).toFixed(4) + ")";
        ctx.arc(cx, cy, ringRadius, 0, TAU); ctx.stroke();
      }

      const edgeAlpha = Math.max(0, (0.34 - revealProgress * 0.12) * fadeOut);
      if (edgeAlpha > 0.004) {
        ctx.beginPath();
        ctx.strokeStyle = "rgba(124, 120, 136, " + edgeAlpha.toFixed(4) + ")";
        ctx.lineWidth = 1.2 + (1 - revealProgress) * 1.4;
        ctx.shadowBlur = (8 + (1 - revealProgress) * 8) * effShadow;
        ctx.shadowColor = "rgba(48, 44, 60, " + (edgeAlpha * 0.84).toFixed(4) + ")";
        ctx.arc(cx, cy, ringRadius + rimWidth * 0.34, 0, TAU); ctx.stroke();
      }

      // Ring mist bands
      for (let mi = 0; mi < ringMistBands.length; mi += mistStep) {
        const band = ringMistBands[mi];
        const drift = swirl * band.speed + band.phase;
        const radius = ringRadius + innerRadius * (0.03 + (band.band - 0.9) * 0.24) + Math.sin(drift * 1.2) * innerRadius * 0.03;
        const arcLength = band.width + Math.sin(drift * 1.8) * 0.04;
        const start = band.angle + drift * 0.32;
        const alpha = (0.07 + 0.12 * (1 - revealProgress)) * (0.7 + Math.sin(drift * 2.4) * 0.3) * fadeOut;
        if (alpha <= 0.004) continue;
        ctx.beginPath();
        ctx.strokeStyle = "rgba(66, 66, 76, " + Math.max(0.01, alpha).toFixed(4) + ")";
        ctx.lineWidth = band.lineWidth + (1 - revealProgress) * 1.8;
        ctx.shadowBlur = (10 + (1 - revealProgress) * 16) * effShadow;
        ctx.shadowColor = "rgba(18, 18, 24, " + (alpha * 0.9).toFixed(4) + ")";
        ctx.arc(cx, cy, radius, start, start + arcLength); ctx.stroke();
      }

      // Expanding shockwave ripples \u2014 start beyond ring outer edge
      for (let i = 0; i < 5; i++) {
        const wave = revealProgress * 1.45 - i * 0.18;
        if (wave <= 0 || wave >= 1.52) continue;
        const waveRadius = ringOuter + innerRadius * wave * 0.92;
        const waveAlpha = (0.22 * (1 - Math.min(1, wave)) * (1 - i * 0.12)) * fadeOut;
        if (waveAlpha <= 0.003) continue;
        ctx.beginPath();
        ctx.strokeStyle = "rgba(72, 58, 96, " + waveAlpha.toFixed(4) + ")";
        ctx.lineWidth = Math.max(1.5, 6.4 - wave * 2.8);
        ctx.shadowBlur = (16 + (1 - wave) * 24) * effShadow;
        ctx.shadowColor = "rgba(48, 32, 78, " + (waveAlpha * 0.88).toFixed(4) + ")";
        ctx.arc(cx, cy, waveRadius, 0, TAU); ctx.stroke();
      }

      // Purple energy jets \u2014 centered on ring body
      ctx.globalCompositeOperation = "screen";
      for (let i = 0; i < purpleJets.length; i += detailStep) {
        const jet = purpleJets[i];
        const drift = swirl * jet.speed + jet.phase;
        const radius = ringRadius + innerRadius * (0.01 + Math.sin(drift * 1.7) * 0.04);
        const start = jet.angle + drift * 0.24;
        const span = 0.12 + jet.spread * 0.18 + Math.sin(drift * 2.1) * 0.03;
        const alpha = (0.24 + 0.34 * (1 - revealProgress)) * (0.7 + Math.sin(drift * 3.1) * 0.3) * fadeOut;
        if (alpha <= 0.004) continue;
        ctx.beginPath();
        ctx.strokeStyle = "rgba(80, 50, 130, " + Math.max(0.04, alpha * 0.5).toFixed(4) + ")";
        ctx.lineWidth = jet.lineWidth + 1.6 + (1 - revealProgress) * 2.4;
        ctx.shadowBlur = (12 + (1 - revealProgress) * 14) * effShadow;
        ctx.shadowColor = "rgba(50, 28, 90, " + (alpha * 0.45).toFixed(4) + ")";
        ctx.arc(cx, cy, radius, start, start + span); ctx.stroke();
      }

      // Reveal lightning \u2014 boosted alpha & reach for thick ring
      const revealLightningRamp = Math.max(0, Math.min(1, (revealProgress - 0.08) / 0.92));
      if (revealLightningRamp > 0.01) {
        const revealBoltStep = Math.max(perfTier === 0 ? 3 : 2, detailStep + 1);
        const revealMainSteps = perfTier === 0 ? 4 : 5;
        const revealBranchSteps = perfTier === 0 ? 3 : 4;
        const revealLightningRadius = ringOuter + rimWidth * 0.12;
        for (let li = 0; li < outerLightning.length; li += revealBoltStep) {
          const bolt = outerLightning[li];
          const drift = swirl * (bolt.speed * 1.06) + bolt.phase;
          const flicker = 0.5 + 0.5 * Math.sin(drift * 4.2 + revealProgress * 16) + 0.3 * Math.sin(drift * 6.6 + bolt.phase * 1.2);
          if (flicker < -0.04) continue;
          const alpha = (0.10 + 0.18 * (flicker * 0.5 + 0.5)) * revealLightningRamp * fadeOut;
          if (alpha <= 0.003) continue;
          const baseA = bolt.angle + drift * 0.2 + Math.sin(drift * 1.8) * 0.06;
          const startR = revealLightningRadius * (0.98 + 0.05 * Math.sin(drift * 1.7));
          const reach = innerRadius * (0.18 + bolt.reach * 0.42);
          const span = 0.2 + 0.08 * Math.sin(drift * 2.4 + bolt.phase);
          ctx.beginPath();
          for (let i = 0; i <= revealMainSteps; i++) {
            const p = i / revealMainSteps;
            const rr = startR + reach * p;
            const jag = Math.sin(drift * 3 + p * 12.2) + 0.58 * Math.sin(drift * 5.1 + p * 7.6 + bolt.phase);
            const ang = baseA + (p - 0.24) * span + jag * bolt.jitter * (1 + p * 1.12);
            const x = cx + Math.cos(ang) * rr;
            const y = cy + Math.sin(ang) * rr * 0.88;
            if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
          }
          ctx.strokeStyle = "rgba(108, 64, 198, " + (alpha * 0.72).toFixed(4) + ")";
          ctx.lineWidth = Math.max(0.78, bolt.width * 0.88);
          ctx.shadowBlur = (10 + (1 - revealProgress) * 8) * effShadow;
          ctx.shadowColor = "rgba(100, 58, 188, " + (alpha * 0.88).toFixed(4) + ")";
          ctx.stroke();
          ctx.strokeStyle = "rgba(208, 164, 255, " + Math.min(0.32, alpha + 0.03).toFixed(4) + ")";
          ctx.lineWidth = Math.max(0.7, bolt.width * 0.48);
          ctx.shadowBlur = (5 + (1 - revealProgress) * 6) * effShadow;
          ctx.shadowColor = "rgba(170, 126, 246, " + (alpha * 0.74).toFixed(4) + ")";
          ctx.stroke();
          if (flicker > 0.26) {
            const dir = Math.sin(drift * 2 + bolt.phase) > 0 ? 1 : -1;
            const branchStartP = 0.36 + 0.2 * (0.5 + 0.5 * Math.sin(drift * 1.4 + bolt.phase));
            const fromR = startR + reach * branchStartP;
            const fromA = baseA + dir * 0.035;
            const branchReach = reach * (0.32 + 0.18 * (0.5 + 0.5 * Math.sin(drift * 2.1)));
            const branchSpan = dir * (0.18 + 0.08 * Math.sin(drift * 2.8 + bolt.phase));
            ctx.beginPath();
            for (let b = 0; b <= revealBranchSteps; b++) {
              const p = b / revealBranchSteps;
              const rr = fromR + branchReach * p;
              const jag = Math.sin(drift * 3.8 + p * 8.6) + 0.45 * Math.sin(drift * 6 + p * 5.4 + bolt.phase);
              const ang = fromA + p * branchSpan + jag * bolt.jitter * 1.16;
              const x = cx + Math.cos(ang) * rr;
              const y = cy + Math.sin(ang) * rr * 0.88;
              if (b === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
            }
            const branchAlpha = alpha * 0.5;
            ctx.strokeStyle = "rgba(120, 76, 210, " + branchAlpha.toFixed(4) + ")";
            ctx.lineWidth = Math.max(0.65, bolt.width * 0.52);
            ctx.shadowBlur = (7 + (1 - revealProgress) * 6) * effShadow;
            ctx.shadowColor = "rgba(108, 70, 198, " + (branchAlpha * 0.82).toFixed(4) + ")";
            ctx.stroke();
          }
        }
      }

      // Mist halo \u2014 solid atmospheric fog centered on ring
      const mistHalo = ctx.createRadialGradient(cx, cy, Math.max(2, ringRadius * 0.72), cx, cy, ringOuter + innerRadius * (0.78 + (1 - revealProgress) * 0.34));
      mistHalo.addColorStop(0, "rgba(0, 0, 0, 0)");
      mistHalo.addColorStop(0.18, "rgba(42, 28, 68, " + fade048 + ")");
      mistHalo.addColorStop(0.38, "rgba(64, 42, 108, " + fade058 + ")");
      mistHalo.addColorStop(0.56, "rgba(86, 52, 148, " + fade044 + ")");
      mistHalo.addColorStop(0.74, "rgba(58, 34, 102, " + fade032 + ")");
      mistHalo.addColorStop(0.90, "rgba(32, 18, 62, " + fade016 + ")");
      mistHalo.addColorStop(1, "rgba(0, 0, 0, 0)");
      ctx.fillStyle = mistHalo;
      ctx.beginPath(); ctx.arc(cx, cy, ringOuter + innerRadius * 1.0, 0, TAU); ctx.fill();
      ctx.restore();
    }

    setTimeout(draw, frameDelayMs);
  }

  draw();
}
`;
        const blob = new Blob([workerCode], { type: "application/javascript" });
        const url = URL.createObjectURL(blob);
        const worker = new Worker(url);
        URL.revokeObjectURL(url);
        if ((_a = this.settings) == null ? void 0 : _a.debugMode) {
          console.log("%c[PortalDiag]%c OffscreenCanvas Worker created \u2014 animation on separate thread", "color:#a855f7;font-weight:bold", "color:#22c55e");
        }
        canvas.style.width = `${initWidth}px`;
        canvas.style.height = `${initHeight}px`;
        worker.postMessage({
          type: "init",
          canvas: offscreen,
          duration,
          seeds,
          perfTier,
          frameDelayMs: perf.targetFrameMs,
          dpr,
          width: initWidth,
          height: initHeight
        }, [offscreen]);
        let resizeTimer = null;
        const onResize = () => {
          if (resizeTimer) clearTimeout(resizeTimer);
          resizeTimer = setTimeout(() => {
            const w = Math.max(1, Math.floor(window.innerWidth));
            const h = Math.max(1, Math.floor(window.innerHeight));
            canvas.style.width = `${w}px`;
            canvas.style.height = `${h}px`;
            worker.postMessage({ type: "resize", width: w, height: h });
          }, 150);
        };
        window.addEventListener("resize", onResize, { passive: true });
        return () => {
          window.removeEventListener("resize", onResize);
          if (resizeTimer) clearTimeout(resizeTimer);
          try {
            worker.postMessage({ type: "stop" });
          } catch (_) {
          }
          setTimeout(() => {
            try {
              worker.terminate();
            } catch (_) {
            }
          }, 50);
        };
      },
      /**
       * Register this instance's genuine activation as a hold on the shared
       * window.__SL_PortalCore cache. Idempotent (Set.add) — safe to call more than
       * once per instance, and safe to call from a class that never releases.
       */
      _portalCoreAcquire() {
        var _a, _b;
        const core = _getPortalCoreState();
        const key = ((_a = this == null ? void 0 : this.constructor) == null ? void 0 : _a.name) || "UnknownPortalCoreConsumer";
        core.consumers.add(key);
        try {
          if ((_b = BdApi == null ? void 0 : BdApi.DOM) == null ? void 0 : _b.addStyle) BdApi.DOM.addStyle(PORTAL_TRANSITION_STYLE_ID, PORTAL_TRANSITION_CSS);
        } catch (_) {
        }
      },
      /**
       * Release this instance's hold on the shared window.__SL_PortalCore cache.
       * Idempotent (Set.delete) — a class that never acquired (e.g. the
       * start() -> stop(false) restart-safety self-call) is a harmless no-op. Only
       * tears down the shared GSAP/mask cache once the hold set is empty, i.e. once
       * every genuinely-active consumer has released.
       */
      _portalCoreRelease() {
        var _a, _b;
        const core = _getPortalCoreState();
        const key = ((_a = this == null ? void 0 : this.constructor) == null ? void 0 : _a.name) || "UnknownPortalCoreConsumer";
        const held = core.consumers.delete(key);
        if (!held || core.consumers.size > 0) return;
        core.gsapLoaded = false;
        core.gsapLoadPromise = null;
        core.gsapLogSent = false;
        try {
          if ((_b = BdApi == null ? void 0 : BdApi.DOM) == null ? void 0 : _b.removeStyle) BdApi.DOM.removeStyle(PORTAL_TRANSITION_STYLE_ID);
        } catch (_) {
        }
        for (const el of core.gsapScriptEls) {
          if (el.parentNode) el.parentNode.removeChild(el);
        }
        core.gsapScriptEls = [];
      }
    };
    function applyPortalCoreToClass(PluginClass, config = {}) {
      if (!PluginClass || typeof PluginClass !== "function" || !PluginClass.prototype) return false;
      const className = PluginClass.name || "AnonymousPluginClass";
      const mergedConfig = {
        contextLabelKeys: DEFAULT_CONTEXT_LABEL_KEYS,
        ...config
      };
      if (!Array.isArray(mergedConfig.contextLabelKeys) || mergedConfig.contextLabelKeys.length === 0) {
        mergedConfig.contextLabelKeys = DEFAULT_CONTEXT_LABEL_KEYS;
      }
      if (typeof mergedConfig.transitionId !== "string" || !mergedConfig.transitionId.trim()) {
        console.warn(`[ShadowPortalCore] ${className} missing transitionId; using default overlay id.`);
      }
      if (typeof mergedConfig.navigationFailureToast !== "string" || !mergedConfig.navigationFailureToast.trim()) {
        console.warn(`[ShadowPortalCore] ${className} missing navigationFailureToast; using fallback toast text.`);
      }
      Object.defineProperty(PluginClass.prototype, "__shadowPortalCoreConfig", {
        configurable: true,
        enumerable: false,
        writable: true,
        value: mergedConfig
      });
      for (const [name, fn] of Object.entries(methods)) {
        if (typeof fn !== "function") continue;
        Object.defineProperty(PluginClass.prototype, name, {
          configurable: true,
          enumerable: false,
          writable: true,
          value: fn
        });
      }
      const core = _getPortalCoreState();
      if (!core.gsapLoadPromise && !core.gsapLoaded) {
        methods._ensureGSAP.call({}).catch(() => {
        });
      }
      return true;
    }
    var SHARED_COOLDOWN_KEY = "ShadowPortalCore";
    var SHARED_COOLDOWN_DATA_KEY = "_lastTeleportTime";
    function _getSkillTreeSkillLevel(skillId) {
      try {
        const plugin = BdApi.Plugins.get("SkillTree");
        const instance = (plugin == null ? void 0 : plugin.instance) || null;
        if (!instance || typeof instance.getSkillLevel !== "function") return 0;
        return instance.getSkillLevel(skillId) || 0;
      } catch {
        return 0;
      }
    }
    function getTeleportCooldownMs() {
      const level = _getSkillTreeSkillLevel("shadow_exchange");
      if (level <= 0) return Infinity;
      const BASE_COOLDOWN_MS = 3 * 60 * 60 * 1e3;
      return Math.round(BASE_COOLDOWN_MS / Math.pow(2, level - 1));
    }
    function checkTeleportCooldown() {
      const cooldownMs = getTeleportCooldownMs();
      const lastTeleport = BdApi.Data.load(SHARED_COOLDOWN_KEY, SHARED_COOLDOWN_DATA_KEY) || 0;
      const elapsed = Date.now() - lastTeleport;
      const remaining = cooldownMs - elapsed;
      if (remaining <= 0) return { onCooldown: false, remainingMs: 0, remainingText: "" };
      const totalSec = Math.ceil(remaining / 1e3);
      const h = Math.floor(totalSec / 3600);
      const m = Math.floor(totalSec % 3600 / 60);
      const s = totalSec % 60;
      const parts = [];
      if (h > 0) parts.push(`${h}h`);
      if (m > 0) parts.push(`${m}m`);
      if (h === 0 && s > 0) parts.push(`${s}s`);
      return { onCooldown: true, remainingMs: remaining, remainingText: parts.join(" ") };
    }
    function stampTeleportCooldown() {
      const now = Date.now();
      BdApi.Data.save(SHARED_COOLDOWN_KEY, SHARED_COOLDOWN_DATA_KEY, now);
      return now;
    }
    var _stopDeprecationWarned = false;
    function stop() {
      if (!_stopDeprecationWarned) {
        _stopDeprecationWarned = true;
        console.warn(
          "[ShadowPortalCore] stop() is deprecated and is now a no-op \u2014 use the instance _portalCoreRelease() method installed by applyPortalCoreToClass."
        );
      }
    }
    module2.exports = {
      applyPortalCoreToClass,
      stop,
      methods,
      checkTeleportCooldown,
      getTeleportCooldownMs,
      stampTeleportCooldown
    };
    if (typeof window !== "undefined") {
      window.ShadowPortalCore = module2.exports;
    }
  }
});

// src/ShadowSenses/index.js
var fs = require("fs");
var path = require("path");
var {
  DEFAULT_SETTINGS,
  PLUGIN_NAME,
  PLUGIN_VERSION,
  PRESENCE_EVENT_NAMES,
  PURGE_INTERVAL_MS,
  RELATIONSHIP_EVENT_NAMES,
  STARTUP_REPORT_ARTWORK_FALLBACK_URL,
  STARTUP_TOAST_GRACE_MS,
  TRANSITION_ID
} = require_constants();
var { loadSettings, saveSettings } = require_settings();
var { DeploymentManager } = require_deployment_manager();
var { buildComponents } = require_components();
var ShadowSensesUiMethods = require_plugin_ui_methods();
var SensesEngineFeed = require_senses_engine_feed();
var SensesEngineEvents = require_senses_engine_events();
var SLEvents = require_event_bus();
var MESSAGE_EDIT_EVENT = "MessageEditHistory:editRecorded";
var SensesEngineUtils = require_senses_engine_utils();
var { _TransitionCleanupUtils } = require_shared_utils();
var { createToast } = require_toast();
var { onPresence } = require_presence_bus();
var _EmbeddedShadowPortalCore;
try {
  _EmbeddedShadowPortalCore = require_ShadowPortalCore();
} catch (_) {
  _EmbeddedShadowPortalCore = null;
}
var _fallbackToast = createToast();
var STARTUP_NOISE_TOPICS = /* @__PURE__ */ new Set(["lmao", "lmfao", "lol", "ooo", "ohh", "haha", "fr", "ok", "k", "uwu"]);
function toFileUrl(filePath) {
  const resolvedPath = path.resolve(String(filePath || ""));
  const normalizedPath = resolvedPath.replace(/\\/g, "/");
  const urlPath = normalizedPath.startsWith("/") ? normalizedPath : `/${normalizedPath}`;
  return `file://${encodeURI(urlPath).replace(/#/g, "%23").replace(/\?/g, "%3F")}`;
}
function parseEnvValue(content, key) {
  if (typeof content !== "string" || !content) return "";
  const escapedKey = String(key || "").replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const regex = new RegExp(`^\\s*${escapedKey}\\s*=\\s*(.*)\\s*$`, "m");
  const match = content.match(regex);
  if (!match) return "";
  let value = String(match[1] || "").trim();
  if (!value) return "";
  if (value.startsWith('"') && value.endsWith('"') || value.startsWith("'") && value.endsWith("'")) {
    value = value.slice(1, -1);
  }
  return value.trim();
}
var SensesEngine = class {
  constructor(pluginRef) {
    this._plugin = pluginRef;
    this._guildFeeds = {};
    this._lastSeenCount = {};
    this._currentGuildId = null;
    this._sessionMessageCount = 0;
    this._totalDetections = 0;
    this._dirty = false;
    this._dirtyGuilds = /* @__PURE__ */ new Set();
    this._flushInterval = null;
    this._presenceStore = null;
    this._presenceStoreListener = null;
    this._presencePollDebounce = null;
    this._handleMessageCreate = null;
    this._handleChannelSelect = null;
    this._handlePresenceUpdate = null;
    this._handleTypingStart = null;
    this._handleRelationshipChange = null;
    this._subscribedEventHandlers = /* @__PURE__ */ new Map();
    this._totalFeedEntries = 0;
    this._feedBus = new EventTarget();
    this.__feedVersion = 0;
    Object.defineProperty(this, "_feedVersion", {
      get() {
        return this.__feedVersion;
      },
      set(value) {
        this.__feedVersion = value;
        if (this._feedBus) this._feedBus.dispatchEvent(new Event("change"));
      },
      configurable: true,
      enumerable: true
    });
    this._burstMap = /* @__PURE__ */ new Map();
    this._userLastActivity = /* @__PURE__ */ new Map();
    this._sessionActivityNotified = /* @__PURE__ */ new Set();
    this._activitySeededFromHistory = false;
    this._activityIndexDirty = false;
    this._USER_ACTIVITY_MAX = 1e3;
    this._AFK_THRESHOLD_MS = 2 * 60 * 60 * 1e3;
    this._subscribeTime = 0;
    this._statusByUserId = /* @__PURE__ */ new Map();
    this._presenceStatusMissCount = /* @__PURE__ */ new Map();
    this._relationshipFriendIds = /* @__PURE__ */ new Set();
    this._typingToastCooldown = /* @__PURE__ */ new Map();
    this._invisibleToastCooldown = /* @__PURE__ */ new Map();
    this._deferredStatusToastTimers = /* @__PURE__ */ new Set();
    this._deferredUtilityToastTimers = /* @__PURE__ */ new Set();
    this._unreadCount = 0;
    this._lastPanelOpenedAt = Date.now();
    const feedGuildIds = BdApi.Data.load(PLUGIN_NAME, "feedGuildIds");
    if (Array.isArray(feedGuildIds) && feedGuildIds.length > 0) {
      this._guildFeeds = {};
      for (const gid of feedGuildIds) {
        const feed = BdApi.Data.load(PLUGIN_NAME, `feed_${gid}`);
        if (Array.isArray(feed) && feed.length > 0) {
          this._guildFeeds[gid] = feed;
        }
      }
    } else {
      this._guildFeeds = BdApi.Data.load(PLUGIN_NAME, "guildFeeds") || {};
    }
    this._totalDetections = BdApi.Data.load(PLUGIN_NAME, "totalDetections") || 0;
    const persistedActivityIndex = BdApi.Data.load(PLUGIN_NAME, "userLastActivityIndex");
    if (persistedActivityIndex && typeof persistedActivityIndex === "object") {
      for (const [userId, savedValue] of Object.entries(persistedActivityIndex)) {
        const timestamp = Number(
          savedValue && typeof savedValue === "object" ? savedValue.t ?? savedValue.timestamp : savedValue
        ) || 0;
        const isFallback = !!(savedValue && typeof savedValue === "object" && (savedValue.f || savedValue.isFallback));
        const normalizedUserId = String(userId || "");
        if (!normalizedUserId || timestamp <= 0) continue;
        this._userLastActivity.set(normalizedUserId, {
          timestamp,
          notifiedActive: false,
          isFallback
        });
      }
      if (this._userLastActivity.size > this._USER_ACTIVITY_MAX) {
        const trimmed = Array.from(this._userLastActivity.entries()).sort((a, b) => {
          var _a, _b;
          return (((_a = b[1]) == null ? void 0 : _a.timestamp) || 0) - (((_b = a[1]) == null ? void 0 : _b.timestamp) || 0);
        }).slice(0, this._USER_ACTIVITY_MAX);
        this._userLastActivity = new Map(trimmed);
        this._activityIndexDirty = true;
      }
    }
    for (const guildId of Object.keys(this._guildFeeds)) {
      this._lastSeenCount[guildId] = this._guildFeeds[guildId].length;
      this._totalFeedEntries += this._guildFeeds[guildId].length;
    }
    this._purgeOldEntries();
    this._purgeUtilityEntries();
    this._plugin.debugLog("SensesEngine", "Loaded persisted feeds", {
      guilds: Object.keys(this._guildFeeds).length,
      totalEntries: this._totalFeedEntries
    });
  }
  subscribe() {
    var _a, _b;
    const Dispatcher = this._plugin._Dispatcher;
    if (!Dispatcher) {
      this._plugin.debugError("SensesEngine", "Dispatcher not available, cannot subscribe");
      return;
    }
    this._toastEngine = (() => {
      try {
        const p = BdApi.Plugins.get("SoloLevelingToasts");
        const inst = p == null ? void 0 : p.instance;
        return (inst == null ? void 0 : inst.toastEngineVersion) >= 2 ? inst : null;
      } catch {
        return null;
      }
    })();
    this._plugin.debugLog("SensesEngine", `Toast engine: ${this._toastEngine ? "v2 connected" : "fallback mode"}`);
    try {
      this._currentGuildId = this._plugin._SelectedGuildStore ? this._plugin._SelectedGuildStore.getGuildId() : null;
    } catch (err) {
      this._plugin.debugError("SensesEngine", "Failed to get initial guild ID", err);
    }
    this._plugin._debugMode && console.log(`[ShadowSenses] subscribe: _currentGuildId=${this._currentGuildId}`);
    if (this._currentGuildId && this._guildFeeds[this._currentGuildId]) {
      this._lastSeenCount[this._currentGuildId] = this._guildFeeds[this._currentGuildId].length;
    }
    this._handleMessageCreate = this._onMessageCreate.bind(this);
    this._handleChannelSelect = this._onChannelSelect.bind(this);
    this._handlePresenceUpdate = this._onPresenceUpdate.bind(this);
    this._handleTypingStart = this._onTypingStart.bind(this);
    this._handleRelationshipChange = this._onRelationshipChange.bind(this);
    this._subscribeEvent("MESSAGE_CREATE", this._handleMessageCreate);
    this._subscribeEvent("CHANNEL_SELECT", this._handleChannelSelect);
    this._subscribeEvent("TYPING_START", this._handleTypingStart);
    this._handleExternalMessageEdit = this._onExternalMessageEdit.bind(this);
    try {
      SLEvents.on(MESSAGE_EDIT_EVENT, this._handleExternalMessageEdit);
    } catch (err) {
      this._plugin.debugError("SensesEngine", "Failed to subscribe message-edit bus event", err);
    }
    this._presenceUnsubs = PRESENCE_EVENT_NAMES.map(
      (eventName) => onPresence(eventName, this._handlePresenceUpdate)
    );
    for (const eventName of RELATIONSHIP_EVENT_NAMES) {
      this._subscribeEvent(eventName, this._handleRelationshipChange);
    }
    this._subscribeTime = Date.now();
    this._seedTrackedStatuses();
    this._seedUserActivityFromFeeds();
    this._snapshotFriendRelationships();
    try {
      const PresenceStore = (_b = (_a = BdApi.Webpack).getStore) == null ? void 0 : _b.call(_a, "PresenceStore");
      if (PresenceStore && typeof PresenceStore.addChangeListener === "function") {
        this._presenceStoreListener = () => {
          if (this._plugin._stopped) return;
          if (document.hidden) return;
          if (this._presencePollDebounce) return;
          this._presencePollDebounce = setTimeout(() => {
            this._presencePollDebounce = null;
            if (!this._stopped) this._pollMonitoredPresenceStatuses("store-change");
          }, 200);
        };
        PresenceStore.addChangeListener(this._presenceStoreListener);
        this._presenceStore = PresenceStore;
      }
    } catch (_) {
    }
    this._flushInterval = setInterval(() => {
      if (!this._dirty && !this._activityIndexDirty) return;
      this._flushToDisk();
    }, 3e4);
    this._purgeInterval = setInterval(() => this._purgeOldEntries(), PURGE_INTERVAL_MS);
    this._plugin.debugLog("SensesEngine", "Subscribed to dispatcher events", {
      currentGuildId: this._currentGuildId,
      events: Array.from(this._subscribedEventHandlers.keys())
    });
  }
  unsubscribe() {
    var _a;
    const Dispatcher = this._plugin._Dispatcher;
    if (!Dispatcher) return;
    for (const [eventName, handlers] of this._subscribedEventHandlers.entries()) {
      for (const handler of handlers) {
        try {
          Dispatcher.unsubscribe(eventName, handler);
        } catch (err) {
          this._plugin.debugError("SensesEngine", `Failed to unsubscribe ${eventName}`, err);
        }
      }
    }
    this._subscribedEventHandlers.clear();
    if (this._presenceUnsubs) {
      for (const unsub of this._presenceUnsubs) {
        try {
          unsub();
        } catch (_) {
        }
      }
      this._presenceUnsubs = null;
    }
    if (this._handleExternalMessageEdit) {
      try {
        SLEvents.off(MESSAGE_EDIT_EVENT, this._handleExternalMessageEdit);
      } catch (err) {
        this._plugin.debugError("SensesEngine", "Failed to unsubscribe message-edit bus event", err);
      }
      this._handleExternalMessageEdit = null;
    }
    (_a = this._burstMap) == null ? void 0 : _a.clear();
    this._handleMessageCreate = null;
    this._handleChannelSelect = null;
    this._handlePresenceUpdate = null;
    this._handleTypingStart = null;
    this._handleRelationshipChange = null;
    if (this._flushInterval) {
      clearInterval(this._flushInterval);
      this._flushInterval = null;
    }
    if (this._purgeInterval) {
      clearInterval(this._purgeInterval);
      this._purgeInterval = null;
    }
    if (this._presenceStore && this._presenceStoreListener) {
      try {
        this._presenceStore.removeChangeListener(this._presenceStoreListener);
      } catch (_) {
      }
      this._presenceStore = null;
      this._presenceStoreListener = null;
    }
    if (this._presencePollDebounce) {
      clearTimeout(this._presencePollDebounce);
      this._presencePollDebounce = null;
    }
    if (this._dirty || this._activityIndexDirty) {
      this._flushToDisk();
    }
    this._typingToastCooldown.clear();
    this._invisibleToastCooldown.clear();
    this._statusByUserId.clear();
    this._presenceStatusMissCount.clear();
    this._relationshipFriendIds.clear();
    this._sessionActivityNotified.clear();
    this._activitySeededFromHistory = false;
    this._activityIndexDirty = false;
    for (const timer of this._deferredStatusToastTimers) clearTimeout(timer);
    this._deferredStatusToastTimers.clear();
    for (const timer of this._deferredUtilityToastTimers) clearTimeout(timer);
    this._deferredUtilityToastTimers.clear();
    if (this._lastTypingAt) {
      this._lastTypingAt.clear();
      this._lastTypingAt = null;
    }
    this._plugin.debugLog("SensesEngine", "Unsubscribed from all events");
  }
  _subscribeEvent(eventName, handler) {
    const Dispatcher = this._plugin._Dispatcher;
    if (!Dispatcher || !eventName || typeof handler !== "function") return false;
    const existing = this._subscribedEventHandlers.get(eventName);
    if (existing == null ? void 0 : existing.has(handler)) {
      this._plugin.debugLog("SensesEngine", `Duplicate subscribe ignored for ${eventName}`);
      return true;
    }
    try {
      Dispatcher.subscribe(eventName, handler);
      if (existing) {
        existing.add(handler);
      } else {
        this._subscribedEventHandlers.set(eventName, /* @__PURE__ */ new Set([handler]));
      }
      return true;
    } catch (err) {
      this._plugin.debugError("SensesEngine", `Failed to subscribe ${eventName}`, err);
      return false;
    }
  }
  // Feed/utils/event handler methods are mixed in from dedicated modules.
  _clearDispatcherSubscriptions() {
    var _a;
    const Dispatcher = this._plugin._Dispatcher;
    if (!(Dispatcher && ((_a = this._subscribedEventHandlers) == null ? void 0 : _a.size) > 0)) return;
    for (const [eventName, handlers] of this._subscribedEventHandlers.entries()) {
      for (const handler of handlers) {
        try {
          Dispatcher.unsubscribe(eventName, handler);
        } catch (_) {
        }
      }
    }
    this._subscribedEventHandlers.clear();
  }
  _clearDeferredToastTimers() {
    if (this._deferredStatusToastTimers instanceof Set) {
      for (const timer of this._deferredStatusToastTimers) clearTimeout(timer);
    }
    if (this._deferredUtilityToastTimers instanceof Set) {
      for (const timer of this._deferredUtilityToastTimers) clearTimeout(timer);
    }
  }
  _resetRuntimeState() {
    this._guildFeeds = {};
    this._lastSeenCount = {};
    this._burstMap = /* @__PURE__ */ new Map();
    this._currentGuildId = null;
    this._sessionMessageCount = 0;
    this._handleMessageCreate = null;
    this._handleChannelSelect = null;
    this._handlePresenceUpdate = null;
    this._handleTypingStart = null;
    this._handleRelationshipChange = null;
    this._subscribedEventHandlers = /* @__PURE__ */ new Map();
    this._dirty = false;
    this._dirtyGuilds = /* @__PURE__ */ new Set();
    this._totalFeedEntries = 0;
    this._feedVersion = 0;
    this._statusByUserId = /* @__PURE__ */ new Map();
    this._presenceStatusMissCount = /* @__PURE__ */ new Map();
    this._typingToastCooldown = /* @__PURE__ */ new Map();
    this._invisibleToastCooldown = /* @__PURE__ */ new Map();
    this._relationshipFriendIds = /* @__PURE__ */ new Set();
    this._userLastActivity = /* @__PURE__ */ new Map();
    this._sessionActivityNotified = /* @__PURE__ */ new Set();
    this._activitySeededFromHistory = false;
    this._activityIndexDirty = false;
    this._deferredStatusToastTimers = /* @__PURE__ */ new Set();
    this._deferredUtilityToastTimers = /* @__PURE__ */ new Set();
    this._lastTypingAt = /* @__PURE__ */ new Map();
  }
  clear() {
    this._clearDispatcherSubscriptions();
    this._clearDeferredToastTimers();
    this._resetRuntimeState();
  }
};
Object.assign(
  SensesEngine.prototype,
  SensesEngineUtils,
  SensesEngineFeed,
  SensesEngineEvents
);
module.exports = class ShadowSenses {
  constructor() {
    this.settings = { ...DEFAULT_SETTINGS };
    this._stopped = true;
    this._dispatcherPollHandle = null;
    this._unpatchContextMenu = null;
    this.sensesEngine = null;
    this.deploymentManager = null;
    this._components = null;
    this._transitionNavTimeout = null;
    this._transitionCleanupTimeout = null;
    this._transitionRunId = 0;
    this._transitionStopCanvas = null;
    this._navigateRetryTimers = /* @__PURE__ */ new Set();
    this._navigateRequestId = 0;
    this._channelFadeToken = 0;
    this._channelFadeResetTimer = null;
    this._startupReportTimer = null;
  }
  /**
   * Check if a SkillTree skill is unlocked (level >= 1).
   */
  _isSkillTreeSkillUnlocked(skillId) {
    try {
      const plugin = BdApi.Plugins.get("SkillTree");
      const instance = (plugin == null ? void 0 : plugin.instance) || null;
      if (!instance || typeof instance.getSkillLevel !== "function") return false;
      return instance.getSkillLevel(skillId) >= 1;
    } catch {
      return false;
    }
  }
  start() {
    try {
      if (!this._stopped) {
        this.stop(false);
      }
      this._debugMode = BdApi.Data.load(PLUGIN_NAME, "debugMode") ?? false;
      if (this._debugMode) {
        console.log(`[${PLUGIN_NAME}] Starting v${PLUGIN_VERSION}...`);
      }
      this.loadSettings();
      this._stopped = false;
      this._sensesResourcesActive = false;
      this._panelOpen = false;
      this._transitionNavTimeout = null;
      this._transitionCleanupTimeout = null;
      this._transitionRunId = 0;
      this._transitionStopCanvas = null;
      this._navigateRetryTimers = /* @__PURE__ */ new Set();
      this._navigateRequestId = 0;
      this._channelFadeToken = 0;
      this._channelFadeResetTimer = null;
      this._startupReportTimer = null;
      this._onSkillLevelChanged = (event) => {
        if (this._stopped) return;
        const { skillId, level } = event.detail || {};
        if (skillId !== "shadow_senses") return;
        if (level >= 1 && !this._sensesResourcesActive) {
          this.debugLog("SKILL_GATE", "shadow_senses unlocked \u2014 activating senses resources");
          this._activateSensesResources();
        } else if (level < 1 && this._sensesResourcesActive) {
          this.debugLog("SKILL_GATE", "shadow_senses reset \u2014 tearing down senses resources");
          this._deactivateSensesResources();
        }
      };
      document.addEventListener("SkillTree:skillLevelChanged", this._onSkillLevelChanged);
      if (this._isSkillTreeSkillUnlocked("shadow_senses")) {
        this._activateSensesResources();
      } else {
        this.debugLog("SKILL_GATE", "shadow_senses not unlocked \u2014 senses dormant, waiting for skill event");
        this._toast(`${PLUGIN_NAME} v${PLUGIN_VERSION} \u2014 Awaiting Shadow Senses skill`);
      }
    } catch (err) {
      console.error(`[${PLUGIN_NAME}] FATAL: start() crashed:`, err);
      this._toast(`${PLUGIN_NAME} failed to start: ${err.message}`, "error");
    }
  }
  /**
   * Activate all heavy resources (Dispatcher, SensesEngine, CSS, widget, etc.).
   * Called when shadow_senses skill is confirmed unlocked.
   */
  _activateSensesResources() {
    var _a;
    if (this._sensesResourcesActive) return;
    this._sensesResourcesActive = true;
    (_a = this._portalCoreAcquire) == null ? void 0 : _a.call(this);
    this.deploymentManager = new DeploymentManager(
      (...args) => this.debugLog(...args),
      (...args) => this.debugError(...args)
    );
    this.deploymentManager.load();
    this.initWebpack();
    this.sensesEngine = new SensesEngine(this);
    if (this._Dispatcher) {
      this.sensesEngine.subscribe();
    } else {
      this._startDispatcherWait();
    }
    this.injectCSS();
    this._components = buildComponents(this);
    this.startSensesHeaderIcon();
    this.registerEscHandler();
    this.patchContextMenu();
    this.debugLog("Lifecycle", "Senses resources activated");
    this._toast(`${PLUGIN_NAME} v${PLUGIN_VERSION} \u2014 Shadow deployment online`);
    this._scheduleStartupShadowReport();
  }
  /**
   * Tear down all heavy resources without fully stopping the plugin.
   * The skill listener stays active so resources re-activate on skill unlock.
   */
  _deactivateSensesResources() {
    var _a, _b, _c, _d;
    if (!this._sensesResourcesActive) return;
    this._sensesResourcesActive = false;
    if (this._dispatcherPollHandle) {
      this._dispatcherPollHandle.cancel();
      this._dispatcherPollHandle = null;
    }
    if (this._startupReportTimer) {
      clearTimeout(this._startupReportTimer);
      this._startupReportTimer = null;
    }
    if (this.sensesEngine) {
      this.sensesEngine.unsubscribe();
      this.sensesEngine = null;
    }
    if (this._unpatchContextMenu) {
      try {
        this._unpatchContextMenu();
      } catch (_) {
      }
      this._unpatchContextMenu = null;
    }
    this.closePanel();
    this.stopSensesHeaderIcon();
    if (this._escUnsub) {
      this._escUnsub();
      this._escUnsub = null;
    }
    this._escHandler = null;
    if (_TransitionCleanupUtils) {
      (_a = _TransitionCleanupUtils.cancelPendingTransition) == null ? void 0 : _a.call(_TransitionCleanupUtils, this);
      (_b = _TransitionCleanupUtils.clearNavigateRetries) == null ? void 0 : _b.call(_TransitionCleanupUtils, this);
      (_c = _TransitionCleanupUtils.cancelChannelViewFade) == null ? void 0 : _c.call(_TransitionCleanupUtils, this);
    } else {
      try {
        clearTimeout(this._transitionNavTimeout);
        clearTimeout(this._transitionCleanupTimeout);
        clearTimeout(this._channelFadeResetTimer);
        this._transitionNavTimeout = null;
        this._transitionCleanupTimeout = null;
        this._channelFadeResetTimer = null;
        const retries = this._navigateRetryTimers;
        if (retries && typeof retries.clear === "function") {
          for (const timerId of retries) clearTimeout(timerId);
          retries.clear();
        }
      } catch (err) {
        (_d = this.debugError) == null ? void 0 : _d.call(this, "CLEANUP", "Inline transition-timer teardown failed", err);
      }
    }
    this.removeCSS();
    this._components = null;
    this.deploymentManager = null;
    this.debugLog("SKILL_GATE", "Senses resources deactivated");
    this._toast(`${PLUGIN_NAME} \u2014 Shadows recalled (skill reset)`);
  }
  stop(showToast = true) {
    var _a;
    try {
      this._stopped = true;
      if (this._onSkillLevelChanged) {
        document.removeEventListener("SkillTree:skillLevelChanged", this._onSkillLevelChanged);
        this._onSkillLevelChanged = null;
      }
      this._sensesResourcesActive = true;
      this._deactivateSensesResources();
      (_a = this._portalCoreRelease) == null ? void 0 : _a.call(this);
    } catch (err) {
      this.debugError("Lifecycle", "Error during stop:", err);
    }
    if (showToast) this._toast(`${PLUGIN_NAME} \u2014 Shadows recalled`);
  }
  _toast(message, type = "info", timeout = null) {
    var _a;
    const engine = (_a = this.sensesEngine) == null ? void 0 : _a._toastEngine;
    if (engine) {
      engine.showToast(message, type, timeout, { callerId: "shadowSenses" });
    } else {
      _fallbackToast(message, type);
    }
  }
  _getStartupShadowReportWindowMs() {
    var _a;
    const configuredHours = Number((_a = this.settings) == null ? void 0 : _a.startupShadowReportWindowHours);
    const safeHours = Number.isFinite(configuredHours) ? Math.min(72, Math.max(1, Math.floor(configuredHours))) : 24;
    return safeHours * 60 * 60 * 1e3;
  }
  _formatStartupTopList(items, emptyLabel = "None", prefix = "") {
    if (!Array.isArray(items) || items.length === 0) return emptyLabel;
    return items.map((item) => `${prefix}${item.name} (${item.count})`).join(", ");
  }
  _formatStartupChannelLabel(channelName) {
    const rawName = String(channelName || "unknown").trim() || "unknown";
    return rawName.startsWith("#") ? rawName : `#${rawName}`;
  }
  // Convert Discord's raw markup into human-readable text for the report.
  // Custom emoji <:name:id> / <a:name:id> → :name: (was leaking the full
  // <:name:1207868584932417566> id string into the report — unreadable).
  // Mentions collapse to readable tokens rather than raw <@id> / <#id>.
  _cleanReportMarkup(rawContent) {
    return String(rawContent || "").replace(/<a?:([A-Za-z0-9_]+):\d+>/g, (_m, name) => /^[0-9a-f]{12,}$/i.test(name) ? "[emoji]" : `:${name}:`).replace(/<@!?\d+>/g, "@user").replace(/<@&\d+>/g, "@role").replace(/<#\d+>/g, "#channel").replace(/<https?:\/\/[^>]+>/gi, "").replace(/https?:\/\/\S+/gi, "").replace(/\s+/g, " ").trim();
  }
  // Content preview for an attention signal: cleaned markup with emoji
  // stripped entirely — an emoji as a signal's "content" conveys nothing
  // useful in the report. Real text survives; an emoji-only message yields
  // an empty preview (so no content line is shown at all).
  _reportContentPreview(rawContent) {
    return this._cleanReportMarkup(rawContent).replace(/\[emoji\]/g, "").replace(/:[A-Za-z0-9_]+:/g, "").replace(/\s+/g, " ").trim();
  }
  // Readable priority label for a signal line (was cryptic [P4]/[P3]/[P2]).
  _startupPriorityWord(priority) {
    const p = Number(priority) || 1;
    if (p >= 4) return "URGENT";
    if (p >= 3) return "HIGH";
    if (p >= 2) return "MEDIUM";
    return "LOW";
  }
  // Plain-English reason a signal demands attention. Prefers the precise
  // matchReason; falls back to a priority-tier description so the label is
  // never a bare [URGENT] with no "why".
  _startupAttentionReason(entry) {
    const reason = String((entry == null ? void 0 : entry.matchReason) || "").toLowerCase();
    const term = (entry == null ? void 0 : entry.matchedTerm) ? `"${this._cleanReportMarkup(entry.matchedTerm)}"` : "";
    if (reason === "mention") return "mentioned you";
    if (reason === "name") return "said your name";
    if (reason === "targetkeyword" || reason === "keyword" || reason === "userkeyword") {
      return term ? `keyword ${term}` : "keyword match";
    }
    const p = Number(entry == null ? void 0 : entry.priority) || 1;
    if (p >= 4) return "direct mention";
    if (p >= 3) return "reply or @everyone";
    if (p >= 2) return "role or keyword";
    return "activity";
  }
  // Compact relative time ("2h ago") — far easier to scan than a full locale
  // datetime string in a list of a dozen signals.
  _startupRelativeTime(ts) {
    const t = Number(ts) || 0;
    if (!t) return "";
    const diff = Date.now() - t;
    if (diff < 6e4) return "just now";
    const m = Math.floor(diff / 6e4);
    if (m < 60) return `${m}m ago`;
    const h = Math.floor(m / 60);
    if (h < 24) return `${h}h ago`;
    return `${Math.floor(h / 24)}d ago`;
  }
  _cleanStartupTopicSnippet(rawContent, maxLength = 72) {
    let content = this._cleanReportMarkup(rawContent);
    if (!content) return "";
    content = content.replace(/@user|@role|#channel/g, "").replace(/:[A-Za-z0-9_]+:/g, "").replace(/\s+/g, " ").trim();
    if (!content) return "";
    const noiseKey = content.toLowerCase().replace(/[^a-z0-9]+/g, "");
    if (STARTUP_NOISE_TOPICS.has(noiseKey)) {
      return "";
    }
    if (content.length <= maxLength) return content;
    const clipped = content.slice(0, Math.max(16, maxLength - 3));
    const boundary = clipped.lastIndexOf(" ");
    if (boundary > 18) return `${clipped.slice(0, boundary)}...`;
    return `${clipped}...`;
  }
  _buildStartupAttentionDigest(summary, recentEntries, options = {}) {
    const maxChannels = Math.max(1, Math.floor(Number(options.maxChannels) || 2));
    const maxSpeakers = Math.max(1, Math.floor(Number(options.maxSpeakers) || 3));
    const maxTopics = Math.max(1, Math.floor(Number(options.maxTopics) || 2));
    const actionableCount = Math.max(
      0,
      Number((summary == null ? void 0 : summary.urgentCount) || 0) + Number((summary == null ? void 0 : summary.highCount) || 0) + Number((summary == null ? void 0 : summary.mediumCount) || 0)
    );
    const channelMap = /* @__PURE__ */ new Map();
    const entries = Array.isArray(recentEntries) ? recentEntries : [];
    for (const entry of entries) {
      const priority = Number(entry == null ? void 0 : entry.priority) || 1;
      if (priority < 2) continue;
      const channelName = String((entry == null ? void 0 : entry.channelName) || "unknown").trim() || "unknown";
      const authorName = String((entry == null ? void 0 : entry.authorName) || "Unknown").trim() || "Unknown";
      const weight = Math.max(1, Math.floor(Number(entry == null ? void 0 : entry.messageCount) || 1));
      const topicSnippet = this._cleanStartupTopicSnippet((entry == null ? void 0 : entry.content) || "");
      if (!channelMap.has(channelName)) {
        channelMap.set(channelName, {
          signalCount: 0,
          speakerCounts: /* @__PURE__ */ new Map(),
          topicSnippets: [],
          summaryOnly: false
        });
      }
      const channelRecord = channelMap.get(channelName);
      channelRecord.signalCount += weight;
      channelRecord.speakerCounts.set(
        authorName,
        (channelRecord.speakerCounts.get(authorName) || 0) + weight
      );
      if (topicSnippet && channelRecord.topicSnippets.length < 8 && !channelRecord.topicSnippets.includes(topicSnippet)) {
        channelRecord.topicSnippets.push(topicSnippet);
      }
    }
    const topChannels = Array.isArray(summary == null ? void 0 : summary.topChannels) ? summary.topChannels : [];
    for (const topChannel of topChannels) {
      const topName = String((topChannel == null ? void 0 : topChannel.name) || "").trim();
      if (!topName || channelMap.has(topName)) continue;
      channelMap.set(topName, {
        signalCount: Math.max(1, Math.floor(Number(topChannel == null ? void 0 : topChannel.count) || 1)),
        speakerCounts: /* @__PURE__ */ new Map(),
        topicSnippets: [],
        summaryOnly: true
      });
      if (channelMap.size >= maxChannels) break;
    }
    const channels = Array.from(channelMap.entries()).sort((left, right) => {
      var _a, _b;
      const leftCount = ((_a = left[1]) == null ? void 0 : _a.signalCount) || 0;
      const rightCount = ((_b = right[1]) == null ? void 0 : _b.signalCount) || 0;
      if (rightCount !== leftCount) return rightCount - leftCount;
      return String(left[0]).localeCompare(String(right[0]));
    }).slice(0, maxChannels).map(([channelName, record]) => {
      const speakers = Array.from(record.speakerCounts.entries()).sort((left, right) => {
        if (right[1] !== left[1]) return right[1] - left[1];
        return left[0].localeCompare(right[0]);
      }).slice(0, maxSpeakers).map(([name]) => name);
      const topics = Array.isArray(record.topicSnippets) ? record.topicSnippets.slice(0, maxTopics) : [];
      return {
        channelName,
        channelLabel: this._formatStartupChannelLabel(channelName),
        signalCount: Number(record.signalCount) || 0,
        speakers,
        topics,
        summaryOnly: !!record.summaryOnly
      };
    });
    const focusText = channels.length ? channels.map((channel) => {
      const speakersLabel = channel.speakers.length ? channel.speakers.join(", ") : "top recent speakers";
      const topicsLabel = channel.topics.length ? `; topics: ${channel.topics.join(" | ")}` : "";
      return `${channel.channelLabel} (${speakersLabel}${topicsLabel})`;
    }).join(" and ") : "recent monitored channels";
    return { actionableCount, channels, focusText };
  }
  _resolveDefaultStartupArtworkUrl() {
    const homeDir = process.env.HOME || "";
    if (homeDir) {
      const candidatePaths = [
        path.join(homeDir, "Downloads", "Igris.svg"),
        path.join(homeDir, "Downloads", "Igris.png"),
        path.join(homeDir, "Downloads", "Igris.webp"),
        path.join(homeDir, "Downloads", "Igris.jpg"),
        path.join(homeDir, "Downloads", "Igris.jpeg")
      ];
      for (const candidatePath of candidatePaths) {
        try {
          if (fs.existsSync(candidatePath)) return toFileUrl(candidatePath);
        } catch (_) {
        }
      }
    }
    return STARTUP_REPORT_ARTWORK_FALLBACK_URL || null;
  }
  _normalizeArtworkInput(value) {
    const configured = String(value || "").trim();
    if (!configured) return "";
    if (/^(https?:|data:|file:)/i.test(configured)) return configured;
    const homeDir = process.env.HOME || "";
    if (configured.startsWith("~/") && homeDir) {
      return path.join(homeDir, configured.slice(2));
    }
    if (configured.startsWith("/Downloads/") && homeDir) {
      return path.join(homeDir, "Downloads", configured.slice("/Downloads/".length));
    }
    return configured;
  }
  _resolveStartupReportArtworkUrl(override = null) {
    var _a, _b;
    const fallback = "https://cdn.discordapp.com/embed/avatars/0.png";
    const rawValue = typeof override === "string" ? override : (_a = this.settings) == null ? void 0 : _a.startupShadowReportArtwork;
    const configured = this._normalizeArtworkInput(rawValue);
    if (!configured) {
      const autoDetected2 = this._resolveDefaultStartupArtworkUrl();
      return autoDetected2 || STARTUP_REPORT_ARTWORK_FALLBACK_URL || fallback;
    }
    if (/^(https?:|data:|file:)/i.test(configured)) return configured;
    const candidates = [];
    if (path.isAbsolute(configured)) {
      candidates.push(configured);
    } else {
      const pluginFolder = (_b = BdApi == null ? void 0 : BdApi.Plugins) == null ? void 0 : _b.folder;
      if (typeof pluginFolder === "string" && pluginFolder.trim().length > 0) {
        candidates.push(path.resolve(pluginFolder, configured));
      }
      candidates.push(path.resolve(process.cwd(), configured));
    }
    for (const candidatePath of candidates) {
      try {
        if (fs.existsSync(candidatePath)) return toFileUrl(candidatePath);
      } catch (_) {
      }
    }
    const autoDetected = this._resolveDefaultStartupArtworkUrl();
    return autoDetected || STARTUP_REPORT_ARTWORK_FALLBACK_URL || fallback;
  }
  _readEnvValueFromFile(filePath, key) {
    try {
      const resolvedPath = path.resolve(String(filePath || ""));
      if (!resolvedPath || !fs.existsSync(resolvedPath)) return "";
      const content = fs.readFileSync(resolvedPath, "utf8");
      return parseEnvValue(content, key);
    } catch (_) {
      return "";
    }
  }
  _resolveStartupAiConfig() {
    var _a, _b;
    const apiKeyFromSettings = String(((_a = this.settings) == null ? void 0 : _a.startupReportApiKey) || "").trim();
    const modelFromSettings = String(((_b = this.settings) == null ? void 0 : _b.startupReportModel) || "").trim();
    if (apiKeyFromSettings) {
      return {
        apiKey: apiKeyFromSettings,
        model: modelFromSettings || "gpt-4o-mini"
      };
    }
    const apiKeyFromProcess = String(process.env.OPENAI_API_KEY || "").trim();
    const modelFromProcess = String(process.env.OPENAI_MODEL || "").trim();
    if (apiKeyFromProcess) {
      return {
        apiKey: apiKeyFromProcess,
        model: modelFromProcess || "gpt-4o-mini"
      };
    }
    const homeDir = process.env.HOME || "";
    if (!homeDir) return null;
    const shadowAwayEnvPath = path.join(
      homeDir,
      "Documents",
      "DEVELOPMENT",
      "discord",
      "bots",
      "shadow-away-bot",
      ".env"
    );
    const apiKey = this._readEnvValueFromFile(shadowAwayEnvPath, "OPENAI_API_KEY");
    if (!apiKey) return null;
    const model = this._readEnvValueFromFile(shadowAwayEnvPath, "OPENAI_MODEL") || "gpt-4o-mini";
    return { apiKey, model };
  }
  async _requestOpenAiChatCompletion({ apiKey, model, messages, maxTokens = 260, temperature = 0.45, timeoutMs = 8e3 }) {
    var _a, _b, _c;
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), timeoutMs);
    try {
      const res = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          model,
          messages,
          temperature,
          max_tokens: maxTokens,
          response_format: { type: "json_object" }
        }),
        signal: controller.signal
      });
      clearTimeout(timer);
      if (!res.ok) {
        const errText = await res.text().catch(() => "");
        throw new Error(`openai_http_${res.status}:${errText.slice(0, 200)}`);
      }
      const data = await res.json();
      const content = (_c = (_b = (_a = data == null ? void 0 : data.choices) == null ? void 0 : _a[0]) == null ? void 0 : _b.message) == null ? void 0 : _c.content;
      if (!content) throw new Error("openai_empty_response");
      return String(content);
    } catch (error) {
      clearTimeout(timer);
      if ((error == null ? void 0 : error.name) === "AbortError") throw new Error("openai_timeout");
      throw error;
    }
  }
  // Names of Monarch's-Marked (priority) targets — used to spotlight them in
  // the startup report. Returns a lowercase Set for case-insensitive matching
  // against feed authorNames.
  _markedTargetNameSet() {
    var _a, _b;
    try {
      const deps = ((_b = (_a = this.deploymentManager) == null ? void 0 : _a.getDeployments) == null ? void 0 : _b.call(_a)) || [];
      return new Set(
        deps.filter((d) => d.priority === true).map((d) => String(d.targetUsername || "").toLowerCase()).filter(Boolean)
      );
    } catch (_) {
      return /* @__PURE__ */ new Set();
    }
  }
  _buildStartupReportFallbackNarration(summary, windowHours) {
    const hoursLabel = `${windowHours} hour${windowHours === 1 ? "" : "s"}`;
    if (!summary || Number(summary.totalEvents || 0) <= 0) {
      return `My liege, the shadows kept watch through the last ${hoursLabel}. Nothing stirred worth reporting.`;
    }
    const totalEvents = Math.max(0, Number(summary.totalEvents || 0));
    const attentionCount = Math.max(
      0,
      Number(summary.urgentCount || 0) + Number(summary.highCount || 0) + Number(summary.mediumCount || 0)
    );
    const marked = this._markedTargetNameSet();
    const markedActive = marked.size ? (summary.topTargets || []).filter((t) => marked.has(String(t.name || "").toLowerCase())) : [];
    const s = totalEvents === 1 ? "" : "s";
    const parts = [
      `My liege, across the last ${hoursLabel} your shadows caught ${totalEvents} signal${s} \u2014 the messages and stirrings of those you watch.`
    ];
    if (markedActive.length > 0) {
      const names = markedActive.slice(0, 2).map((t) => t.name).join(" and ");
      parts.push(`Your marked ${markedActive.length === 1 ? "quarry" : "quarries"} stirred: ${names}.`);
    }
    parts.push(
      attentionCount > 0 ? `${attentionCount} call for your attention \u2014 their account waits below.` : `None demand your attention; the full watch waits below.`
    );
    return parts.join(" ");
  }
  async _generateAiStartupNarration(summary, recentEntries, windowHours) {
    var _a;
    const attentionDigest = this._buildStartupAttentionDigest(summary, recentEntries);
    const fallback = this._buildStartupReportFallbackNarration(summary, windowHours, recentEntries);
    const aiConfig = this._resolveStartupAiConfig();
    if (!(aiConfig == null ? void 0 : aiConfig.apiKey)) return { narration: fallback, signalBreakdown: "" };
    const STARTUP_CACHE_TTL_MS = 30 * 60 * 1e3;
    const lastEntryTs = ((_a = recentEntries == null ? void 0 : recentEntries[0]) == null ? void 0 : _a.timestamp) || 0;
    const cacheKey = [
      windowHours,
      Number((summary == null ? void 0 : summary.totalEvents) || 0),
      Number((summary == null ? void 0 : summary.urgentCount) || 0),
      Number((summary == null ? void 0 : summary.highCount) || 0),
      lastEntryTs
    ].join(":");
    try {
      const cached = BdApi.Data.load(PLUGIN_NAME, "startupReportCache");
      if (cached && cached.cacheKey === cacheKey && Date.now() - (cached.ts || 0) < STARTUP_CACHE_TTL_MS) {
        this.debugLog("StartupReport", "Cache hit \u2014 skipping OpenAI call", { cacheKey });
        return cached.result || { narration: fallback, signalBreakdown: "" };
      }
    } catch (_) {
    }
    const promptPayload = {
      windowHours,
      summary: {
        totalEvents: Number((summary == null ? void 0 : summary.totalEvents) || 0),
        urgentCount: Number((summary == null ? void 0 : summary.urgentCount) || 0),
        highCount: Number((summary == null ? void 0 : summary.highCount) || 0),
        mediumCount: Number((summary == null ? void 0 : summary.mediumCount) || 0),
        lowCount: Number((summary == null ? void 0 : summary.lowCount) || 0),
        activeGuildCount: Number((summary == null ? void 0 : summary.activeGuildCount) || 0),
        actionableCount: Number((attentionDigest == null ? void 0 : attentionDigest.actionableCount) || 0),
        topTargets: Array.isArray(summary == null ? void 0 : summary.topTargets) ? summary.topTargets : [],
        topChannels: Array.isArray(summary == null ? void 0 : summary.topChannels) ? summary.topChannels : [],
        actionableChannelFocus: Array.isArray(attentionDigest == null ? void 0 : attentionDigest.channels) ? attentionDigest.channels.map((channel) => ({
          channel: channel.channelLabel,
          signalCount: channel.signalCount,
          speakers: channel.speakers,
          topics: channel.topics
        })) : []
      },
      recentSignals: Array.isArray(recentEntries) ? recentEntries.slice(0, 16).map((entry) => ({
        when: new Date(Number(entry.timestamp) || Date.now()).toISOString(),
        guild: entry.guildName,
        channel: entry.channelName,
        author: entry.authorName,
        priority: Number(entry.priority) || 1,
        content: String(entry.content || "").slice(0, 180),
        messageCount: Number(entry.messageCount) || 1
      })) : []
    };
    const systemPrompt = [
      "You are Igris, a loyal shadow retainer reporting to the Shadow Monarch.",
      "You must return TWO pieces in a single JSON response.",
      "",
      '1) "report" \u2014 a SHORT 2-3 sentence opener in plain text. Not a recap.',
      "   Tone: respectful, direct, tactical, calm. Always begin with 'My liege,'.",
      "   Say: how long the shadows watched, the total signal count (define 'signals'",
      "   ONCE as the messages/stirrings of the watched), and how many need attention.",
      "   Then point the Monarch to the detail below. Do NOT list channels, speakers,",
      "   or topics here \u2014 that breakdown lives in signalBreakdown and the sections",
      "   below, and repeating it is the redundancy we are removing.",
      "",
      '2) "signalBreakdown" \u2014 a detailed tactical briefing on the attention-worthy signals (priority >= 2).',
      "   Group by channel. For each channel: name the speakers, summarize what they discussed or what triggered the alert.",
      "   Include priority context (P4 = direct mention of the Monarch, P3 = reply/@everyone, P2 = role mention/keyword).",
      "   Use numbered entries. Keep each entry to 1-2 lines. Cover up to 10 entries.",
      "   If no actionable signals exist, write a single line: 'No signals require your attention in this window.'",
      "   Plain text only, no markdown or emojis.",
      "",
      "Do not use markdown, emojis, or bullet lists in either field.",
      "Never invent events; use only provided data.",
      'Return JSON only: {"report":"...","signalBreakdown":"..."}.'
    ].join("\n");
    try {
      const raw = await this._requestOpenAiChatCompletion({
        apiKey: aiConfig.apiKey,
        model: aiConfig.model,
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: JSON.stringify(promptPayload) }
        ],
        maxTokens: 700,
        timeoutMs: 12e3
      });
      this.debugLog("StartupReport", "AI raw response", { rawLength: raw == null ? void 0 : raw.length, raw: String(raw || "").slice(0, 500) });
      let report = "";
      let signalBreakdown = "";
      try {
        const parsed = JSON.parse(raw);
        report = String((parsed == null ? void 0 : parsed.report) || "").trim();
        signalBreakdown = String((parsed == null ? void 0 : parsed.signalBreakdown) || "").trim();
        this.debugLog("StartupReport", "AI parsed fields", {
          reportLength: report.length,
          signalBreakdownLength: signalBreakdown.length,
          hasSignalBreakdown: signalBreakdown.length > 0,
          signalBreakdownPreview: signalBreakdown.slice(0, 200)
        });
      } catch (parseErr) {
        this.debugLog("StartupReport", "AI JSON parse failed", { error: parseErr == null ? void 0 : parseErr.message });
        report = String(raw || "").trim();
      }
      report = report.replace(/```/g, "").replace(/\s+/g, " ").trim();
      signalBreakdown = signalBreakdown.replace(/```/g, "").trim();
      if (!report) return { narration: fallback, signalBreakdown: "" };
      if (!/^My liege,/i.test(report)) {
        report = `My liege, ${report.charAt(0).toLowerCase()}${report.slice(1)}`;
      }
      const result = { narration: report.slice(0, 700), signalBreakdown: signalBreakdown.slice(0, 1200) };
      try {
        BdApi.Data.save(PLUGIN_NAME, "startupReportCache", { cacheKey, ts: Date.now(), result });
      } catch (_) {
      }
      return result;
    } catch (error) {
      this.debugLog("StartupReport", "AI summary fallback", {
        reason: (error == null ? void 0 : error.message) || String(error)
      });
      return { narration: fallback, signalBreakdown: "" };
    }
  }
  _showStartupShadowReportModal({ summary, windowHours, narration, recentEntries, signalBreakdown }) {
    var _a, _b, _c;
    const React = BdApi.React;
    const title = `Igris Report \u2022 ${windowHours}h`;
    const safeNarration = String(
      narration || this._buildStartupReportFallbackNarration(summary, windowHours, recentEntries)
    );
    const attentionEntries = (Array.isArray(recentEntries) ? recentEntries : []).filter((entry) => (Number(entry == null ? void 0 : entry.priority) || 1) >= 2).filter((entry) => this._reportContentPreview(entry == null ? void 0 : entry.content) !== "").sort((left, right) => {
      const rightPriority = Number(right == null ? void 0 : right.priority) || 1;
      const leftPriority = Number(left == null ? void 0 : left.priority) || 1;
      if (rightPriority !== leftPriority) return rightPriority - leftPriority;
      return (Number(right == null ? void 0 : right.timestamp) || 0) - (Number(left == null ? void 0 : left.timestamp) || 0);
    }).slice(0, 12);
    const detailLine = `Urgent: ${Number((summary == null ? void 0 : summary.urgentCount) || 0)} \u2022 High: ${Number((summary == null ? void 0 : summary.highCount) || 0)} \u2022 Medium: ${Number((summary == null ? void 0 : summary.mediumCount) || 0)} \u2022 Active guilds: ${Number((summary == null ? void 0 : summary.activeGuildCount) || 0)}`;
    const topTargetsLine = `Top targets: ${this._formatStartupTopList(summary == null ? void 0 : summary.topTargets, "None")}`;
    const topChannelsLine = `Top channels: ${this._formatStartupTopList(summary == null ? void 0 : summary.topChannels, "None", "#")}`;
    const artworkUrl = this._resolveStartupReportArtworkUrl();
    const summaryActionableCount = Number((summary == null ? void 0 : summary.urgentCount) || 0) + Number((summary == null ? void 0 : summary.highCount) || 0) + Number((summary == null ? void 0 : summary.mediumCount) || 0);
    let attentionSignalText;
    const aiBreakdown = typeof signalBreakdown === "string" ? signalBreakdown.trim() : "";
    if (aiBreakdown) {
      attentionSignalText = aiBreakdown;
    } else if (attentionEntries.length) {
      attentionSignalText = attentionEntries.map((entry, idx) => {
        const when = this._startupRelativeTime(entry.timestamp);
        const countLabel = Number(entry.messageCount) > 1 ? ` x${entry.messageCount}` : "";
        const word = this._startupPriorityWord(entry.priority);
        const reason = this._startupAttentionReason(entry);
        const cleanContent = this._reportContentPreview(entry.content);
        const contentLine = cleanContent ? `
${cleanContent}` : "";
        return `${idx + 1}. [${word} \xB7 ${reason}] ${entry.authorName} in #${entry.channelName} (${entry.guildName})${countLabel}${contentLine}
${when}`;
      }).join("\n\n");
    } else if (summaryActionableCount > 0) {
      const lines = [];
      const urgent = Number((summary == null ? void 0 : summary.urgentCount) || 0);
      const high = Number((summary == null ? void 0 : summary.highCount) || 0);
      const medium = Number((summary == null ? void 0 : summary.mediumCount) || 0);
      lines.push(`${summaryActionableCount} signal${summaryActionableCount === 1 ? "" : "s"} detected:`);
      if (urgent > 0) lines.push(`  \u2022 ${urgent} urgent (direct mentions of you)`);
      if (high > 0) lines.push(`  \u2022 ${high} high (replies to you, @everyone, name matches)`);
      if (medium > 0) lines.push(`  \u2022 ${medium} medium (role mentions, keyword triggers)`);
      const topTargets = summary == null ? void 0 : summary.topTargets;
      if (Array.isArray(topTargets) && topTargets.length > 0) {
        const targetList = topTargets.map((t) => `${t.name} (${t.count})`).join(", ");
        lines.push(`
Most active targets: ${targetList}`);
      }
      const topChannels = summary == null ? void 0 : summary.topChannels;
      if (Array.isArray(topChannels) && topChannels.length > 0) {
        const channelList = topChannels.map((c) => `#${c.name} (${c.count})`).join(", ");
        lines.push(`Hottest channels: ${channelList}`);
      }
      attentionSignalText = lines.join("\n");
    } else {
      attentionSignalText = "No urgent, high, or medium-priority signals require your attention in this window.";
    }
    if (!React || !((_a = BdApi.UI) == null ? void 0 : _a.showConfirmationModal)) {
      const fallbackText = `${safeNarration}

${detailLine}
${topTargetsLine}
${topChannelsLine}

Signals Requiring Attention:
${attentionSignalText}`;
      (_c = (_b = BdApi.UI) == null ? void 0 : _b.alert) == null ? void 0 : _c.call(_b, title, fallbackText);
      return;
    }
    const content = React.createElement(
      "div",
      {
        // Marker class for the CSS in styles.js to scope-target this
        // modal's frame (header + footer) and force opaque background.
        className: "shadowsenses-igris-report-modal",
        style: {
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          maxHeight: "68vh",
          overflowY: "auto",
          // Solid background on the content area itself. Outer modal
          // frame (header/footer) is filled by the CSS rules in
          // styles.js scoped via [role="dialog"]:has(.shadowsenses-igris-report-modal).
          background: "#0d0d18",
          padding: "16px"
        }
      },
      React.createElement(
        "div",
        {
          style: {
            display: "flex",
            gap: "10px",
            alignItems: "center",
            padding: "8px 10px",
            borderRadius: "2px",
            border: "1px solid rgba(138, 43, 226, 0.35)",
            background: "linear-gradient(120deg, rgba(138, 43, 226, 0.15), rgba(15, 15, 24, 0.96))"
          }
        },
        React.createElement("img", {
          src: artworkUrl,
          alt: "Igris",
          style: {
            width: "52px",
            height: "52px",
            borderRadius: "2px",
            objectFit: "cover",
            border: "1px solid rgba(138, 43, 226, 0.45)"
          },
          onError: (event) => {
            var _a2;
            if ((_a2 = event == null ? void 0 : event.target) == null ? void 0 : _a2.style) event.target.style.display = "none";
          }
        }),
        React.createElement(
          "div",
          { style: { color: "#d6bcff", fontSize: "12px", lineHeight: 1.45, fontWeight: 600 } },
          safeNarration
        )
      ),
      React.createElement(
        "div",
        { style: { display: "flex", flexDirection: "column", gap: "4px" } },
        React.createElement(
          "div",
          { style: { color: "#a3a3a3", fontSize: "12px", lineHeight: 1.45 } },
          detailLine
        ),
        React.createElement(
          "div",
          { style: { color: "#8a8a8a", fontSize: "11px", lineHeight: 1.45 } },
          topTargetsLine
        ),
        React.createElement(
          "div",
          { style: { color: "#8a8a8a", fontSize: "11px", lineHeight: 1.45 } },
          topChannelsLine
        )
      ),
      React.createElement(
        "div",
        { style: { color: "#8a8a8a", fontSize: "11px", letterSpacing: "0.02em", fontWeight: 700 } },
        "SIGNALS REQUIRING ATTENTION"
      ),
      React.createElement(
        "pre",
        {
          style: {
            margin: 0,
            padding: "10px",
            borderRadius: "2px",
            border: "1px solid rgba(138, 43, 226, 0.22)",
            background: "rgba(18, 18, 30, 0.92)",
            color: "#d1d5db",
            fontSize: "11px",
            lineHeight: 1.45,
            whiteSpace: "pre-wrap",
            wordBreak: "break-word",
            // #13: bound the breakdown's height + give it its own scroll
            // so a long AI response can't push the modal past 68vh and
            // overflow narrow Discord windows.
            maxHeight: "30vh",
            overflowY: "auto"
          }
        },
        attentionSignalText
      ),
      // #22: copy the full report to clipboard so the user can keep a log
      // (modal is otherwise ephemeral — closing loses everything).
      React.createElement(
        "button",
        {
          type: "button",
          onClick: () => this._copyStartupReportToClipboard({
            title,
            safeNarration,
            detailLine,
            topTargetsLine,
            topChannelsLine,
            attentionSignalText
          }),
          style: {
            alignSelf: "flex-start",
            marginTop: "4px",
            padding: "5px 12px",
            background: "rgba(138, 43, 226, 0.18)",
            border: "1px solid rgba(138, 43, 226, 0.45)",
            borderRadius: "2px",
            color: "#d6bcff",
            cursor: "pointer",
            fontSize: "11px",
            fontWeight: 600,
            letterSpacing: "0.04em"
          }
        },
        "COPY REPORT"
      )
    );
    BdApi.UI.showConfirmationModal(title, content, {
      confirmText: "Understood"
    });
    this._applyIgrisModalStyles();
  }
  _applyIgrisModalStyles() {
    let attempts = 0;
    const maxAttempts = 30;
    const tick = () => {
      var _a, _b;
      if (this._stopped) return;
      attempts++;
      const marker = document.querySelector(".shadowsenses-igris-report-modal");
      if (!marker) {
        if (attempts < maxAttempts) setTimeout(tick, 50);
        return;
      }
      try {
        const dialog = marker.closest('[role="dialog"]') || ((_b = (_a = marker.parentElement) == null ? void 0 : _a.parentElement) == null ? void 0 : _b.parentElement);
        if (!dialog) return;
        const setImp = (el, prop, val) => el.style.setProperty(prop, val, "important");
        setImp(dialog, "background-color", "#0d0d18");
        Array.from(dialog.children).forEach((child) => setImp(child, "background-color", "#0d0d18"));
        dialog.querySelectorAll('[class*="header"], [class*="footer"], [class*="content"]').forEach((el) => {
          if (el.closest("button")) return;
          setImp(el, "background-color", "#0d0d18");
        });
        dialog.querySelectorAll('[class*="footer"]').forEach((footer) => {
          setImp(footer, "gap", "12px");
          setImp(footer, "column-gap", "12px");
        });
        const buttons = Array.from(dialog.querySelectorAll("button"));
        buttons.forEach((btn) => {
          const cls = String(btn.className || "");
          const text = String(btn.textContent || "").trim().toLowerCase();
          const isConfirm = text === "understood" || /colorBrand/i.test(cls);
          if (isConfirm) {
            setImp(btn, "background", "linear-gradient(120deg, rgba(138, 43, 226, 0.55), rgba(168, 80, 255, 0.7))");
            setImp(btn, "color", "#ffffff");
            setImp(btn, "text-shadow", "0 0 6px rgba(168, 80, 255, 0.55)");
            setImp(btn, "box-shadow", "0 0 12px rgba(138, 43, 226, 0.45)");
            setImp(btn, "border", "1px solid rgba(180, 110, 255, 0.85)");
          } else {
            setImp(btn, "background", "rgba(138, 43, 226, 0.14)");
            setImp(btn, "color", "#d6bcff");
            setImp(btn, "border", "1px solid rgba(138, 43, 226, 0.45)");
          }
          setImp(btn, "border-radius", "0");
          setImp(btn, "font-weight", "600");
          setImp(btn, "letter-spacing", "0.04em");
          btn.querySelectorAll("*").forEach((child) => {
            setImp(child, "background-color", "transparent");
          });
        });
        const paintTargets = /* @__PURE__ */ new Set([dialog]);
        Array.from(dialog.children).forEach((c) => paintTargets.add(c));
        dialog.querySelectorAll('[class*="header"], [class*="footer"], [class*="content"]').forEach((el) => {
          if (!el.closest("button")) paintTargets.add(el);
        });
        const clearBgPaint = () => {
          for (const el of paintTargets) {
            try {
              el.style.removeProperty("background-color");
            } catch (_) {
            }
          }
        };
        buttons.forEach((btn) => btn.addEventListener("click", clearBgPaint, { once: true, capture: true }));
        dialog.addEventListener("keydown", (e) => {
          if (e.key === "Escape") clearBgPaint();
        }, { capture: true });
        dialog.addEventListener("mousedown", (e) => {
          if (e.target === dialog) clearBgPaint();
        }, { capture: true });
      } catch (err) {
        this.debugError("StartupReport", "applyIgrisModalStyles failed", err);
      }
    };
    setTimeout(tick, 30);
  }
  // #22: serialize the modal's report content to plain text and write to
  // the system clipboard. Toast on success/failure for feedback.
  _copyStartupReportToClipboard({ title, safeNarration, detailLine, topTargetsLine, topChannelsLine, attentionSignalText }) {
    var _a, _b, _c;
    const text = [
      title,
      "",
      safeNarration,
      "",
      detailLine,
      topTargetsLine,
      topChannelsLine,
      "",
      "Signals Requiring Attention:",
      attentionSignalText
    ].filter((line) => line !== void 0 && line !== null && String(line).trim().length > 0).join("\n");
    if (!((_a = navigator == null ? void 0 : navigator.clipboard) == null ? void 0 : _a.writeText)) {
      (_c = (_b = BdApi.UI) == null ? void 0 : _b.showToast) == null ? void 0 : _c.call(_b, "Clipboard API unavailable", { type: "error" });
      return;
    }
    navigator.clipboard.writeText(text).then(() => {
      var _a2, _b2;
      return (_b2 = (_a2 = BdApi.UI) == null ? void 0 : _a2.showToast) == null ? void 0 : _b2.call(_a2, "Igris report copied to clipboard", { type: "success" });
    }).catch((err) => {
      var _a2, _b2;
      this.debugError("StartupReport", "Clipboard copy failed", err);
      (_b2 = (_a2 = BdApi.UI) == null ? void 0 : _a2.showToast) == null ? void 0 : _b2.call(_a2, "Copy failed \u2014 see console", { type: "error" });
    });
  }
  async _showStartupShadowReport() {
    var _a, _b, _c, _d, _e;
    if (this._stopped) return;
    if (!((_a = this.settings) == null ? void 0 : _a.startupShadowReport)) return;
    if (!((_b = this.sensesEngine) == null ? void 0 : _b.getStartupSummary)) return;
    const monitoredCount = ((_d = (_c = this.deploymentManager) == null ? void 0 : _c.getMonitoredUserIds) == null ? void 0 : _d.call(_c).size) || 0;
    if (monitoredCount === 0) {
      this.debugLog("Lifecycle", "Startup report skipped \u2014 no deployments");
      return;
    }
    const configuredWindowMs = this._getStartupShadowReportWindowMs();
    let windowMs = configuredWindowMs;
    if ((_e = this.settings) == null ? void 0 : _e.startupReportSinceLastSession) {
      try {
        const lastReportAt = Number(BdApi.Data.load(PLUGIN_NAME, "lastStartupReportAt") || 0);
        if (lastReportAt > 0 && lastReportAt < Date.now()) {
          const sinceLastMs = Date.now() - lastReportAt;
          windowMs = Math.max(60 * 60 * 1e3, Math.min(configuredWindowMs, sinceLastMs));
        }
      } catch (_) {
      }
    }
    const summary = this.sensesEngine.getStartupSummary(windowMs, 3, 2);
    if (!summary) return;
    if (!summary.totalEvents || summary.totalEvents === 0) {
      this.debugLog("Lifecycle", "Startup report skipped \u2014 no activity in window");
      return;
    }
    const recentEntries = this.sensesEngine.getStartupEntries ? this.sensesEngine.getStartupEntries(windowMs, 50) : [];
    const windowHours = Math.max(1, Math.round(summary.windowMs / (60 * 60 * 1e3)));
    const aiResult = await this._generateAiStartupNarration(summary, recentEntries, windowHours);
    if (this._stopped || !this._sensesResourcesActive) {
      this.debugLog("Lifecycle", "Startup report aborted \u2014 plugin/resources stopped during AI call");
      return;
    }
    const narration = (aiResult == null ? void 0 : aiResult.narration) || aiResult;
    const signalBreakdown = (aiResult == null ? void 0 : aiResult.signalBreakdown) || "";
    this._showStartupShadowReportModal({
      summary,
      windowHours,
      narration,
      recentEntries,
      signalBreakdown
    });
    this._startupReportFired = true;
    try {
      BdApi.Data.save(PLUGIN_NAME, "lastStartupReportAt", Date.now());
    } catch (_) {
    }
    this.debugLog("Lifecycle", "Startup shadow report emitted", {
      windowHours,
      totalEvents: summary.totalEvents,
      urgentCount: summary.urgentCount,
      highCount: summary.highCount,
      mediumCount: summary.mediumCount,
      activeGuildCount: summary.activeGuildCount
    });
  }
  _scheduleStartupShadowReport() {
    var _a;
    if (this._startupReportTimer) {
      clearTimeout(this._startupReportTimer);
      this._startupReportTimer = null;
    }
    if (!((_a = this.settings) == null ? void 0 : _a.startupShadowReport)) return;
    if (this._startupReportFired) {
      this.debugLog("Lifecycle", "Startup report skipped \u2014 already fired this session");
      return;
    }
    const delayMs = STARTUP_TOAST_GRACE_MS + 750;
    this._startupReportTimer = setTimeout(() => {
      this._startupReportTimer = null;
      this._showStartupShadowReport().catch((error) => {
        this.debugError("Lifecycle", "Startup report failed", error);
      });
    }, delayMs);
  }
  loadSettings() {
    this.settings = loadSettings(PLUGIN_NAME, DEFAULT_SETTINGS);
  }
  saveSettings() {
    saveSettings(PLUGIN_NAME, this.settings);
  }
  initWebpack() {
    const { Webpack } = BdApi;
    const { acquireDispatcher } = require_dispatcher();
    this._Dispatcher = acquireDispatcher();
    this._ChannelStore = Webpack.getStore("ChannelStore");
    this._SelectedGuildStore = Webpack.getStore("SelectedGuildStore");
    this._SelectedChannelStore = Webpack.getStore("SelectedChannelStore");
    this._GuildStore = Webpack.getStore("GuildStore");
    this._UserStore = Webpack.getStore("UserStore");
    this._PresenceStore = Webpack.getStore("PresenceStore");
    this._RelationshipStore = Webpack.getStore("RelationshipStore");
    this._GuildMemberStore = Webpack.getStore("GuildMemberStore");
    const { getNavigationUtils } = require_navigation();
    this._NavigationUtils = getNavigationUtils();
    this.debugLog("Webpack", "Modules acquired (sync)", {
      Dispatcher: !!this._Dispatcher,
      ChannelStore: !!this._ChannelStore,
      SelectedGuildStore: !!this._SelectedGuildStore,
      SelectedChannelStore: !!this._SelectedChannelStore,
      GuildStore: !!this._GuildStore,
      UserStore: !!this._UserStore,
      PresenceStore: !!this._PresenceStore,
      RelationshipStore: !!this._RelationshipStore,
      GuildMemberStore: !!this._GuildMemberStore,
      NavigationUtils: !!this._NavigationUtils
    });
  }
  /**
   * Resolve a guild's display name from its ID.
   * @param {string} guildId
   * @returns {string} Guild name or truncated ID fallback
   */
  _getGuildName(guildId) {
    var _a;
    try {
      const guild = (_a = this._GuildStore) == null ? void 0 : _a.getGuild(guildId);
      return (guild == null ? void 0 : guild.name) || (guildId == null ? void 0 : guildId.slice(-6)) || "Unknown";
    } catch (_) {
      return (guildId == null ? void 0 : guildId.slice(-6)) || "Unknown";
    }
  }
  _startDispatcherWait() {
    const { pollForDispatcher } = require_dispatcher();
    this._dispatcherPollHandle = pollForDispatcher({
      onAcquired: (d) => {
        this._Dispatcher = d;
        this.debugLog("Webpack", "Dispatcher acquired via polling");
        this.initWebpack();
        if (this.sensesEngine) this.sensesEngine.subscribe();
      },
      onTimeout: () => {
        console.error(`[${PLUGIN_NAME}] Dispatcher unavailable after 30s \u2014 message detection will NOT work`);
        this._toast(`${PLUGIN_NAME}: Dispatcher not found \u2014 message detection disabled`, "error");
      },
      onPoll: () => {
        var _a;
        if (this._stopped) (_a = this._dispatcherPollHandle) == null ? void 0 : _a.cancel();
      }
    });
  }
  // Shadow Monarch rank (level 2000) \u2014 Instant Sovereign perk exempts the
  // Monarch from the teleport cooldown. Mirrors ShadowExchange._getPlayerRank.
  _isShadowMonarch() {
    var _a, _b, _c;
    try {
      return ((_c = (_b = (_a = BdApi.Plugins.get("SoloLevelingStats")) == null ? void 0 : _a.instance) == null ? void 0 : _b.settings) == null ? void 0 : _c.rank) === "Shadow Monarch";
    } catch (_) {
      return false;
    }
  }
  // Lazy MessageActions resolver for the post-navigation scroll reinforcement.
  _resolveMsgActions() {
    var _a;
    if (typeof ((_a = this._msgActions) == null ? void 0 : _a.jumpToMessage) === "function") return this._msgActions;
    const W = BdApi.Webpack;
    const strats = [
      () => {
        var _a2;
        return (_a2 = W.getByKeys) == null ? void 0 : _a2.call(W, "jumpToMessage");
      },
      () => {
        var _a2;
        return (_a2 = W.getModule) == null ? void 0 : _a2.call(W, (m) => typeof (m == null ? void 0 : m.jumpToMessage) === "function");
      },
      () => {
        var _a2;
        return (_a2 = W.getModule) == null ? void 0 : _a2.call(W, (m) => (m == null ? void 0 : m.jumpToMessage) && (m == null ? void 0 : m.sendMessage) && ((m == null ? void 0 : m.receiveMessage) || (m == null ? void 0 : m.editMessage)));
      }
    ];
    for (const s of strats) {
      try {
        const mod = s();
        if (typeof (mod == null ? void 0 : mod.jumpToMessage) === "function") {
          this._msgActions = mod;
          return mod;
        }
      } catch (_) {
      }
    }
    return null;
  }
  // teleportToPath now plays the shadow-portal animation for the ShadowSenses
  // jump too, applies the shared teleport cooldown (with a toast) UNLESS the
  // user is Shadow Monarch, and \u2014 when a messageId is given \u2014 scrolls/flashes
  // the target message after the channel loads.
  // Returns true if it proceeded, false if the cooldown blocked it.
  teleportToPath(path2, context = {}, messageId = null) {
    var _a, _b;
    const portalCore = _EmbeddedShadowPortalCore || typeof window !== "undefined" && window.ShadowPortalCore;
    if (!this._isShadowMonarch() && (portalCore == null ? void 0 : portalCore.checkTeleportCooldown)) {
      const cdCheck = portalCore.checkTeleportCooldown();
      if (cdCheck.onCooldown) {
        this._toast(`Shadow exchange on cooldown \u2014 ${cdCheck.remainingText} remaining`, "error", 3e3);
        return false;
      }
    }
    const reinforceJump = () => {
      if (!messageId) return;
      const channelId = String(path2).split("/").filter(Boolean).slice(-2)[0];
      const actions = this._resolveMsgActions();
      if (!actions || !channelId) return;
      setTimeout(() => {
        try {
          actions.jumpToMessage({ channelId, messageId, flash: true });
        } catch (_) {
          try {
            actions.jumpToMessage(channelId, messageId);
          } catch (_2) {
          }
        }
      }, 800);
    };
    const targetPath = this._normalizePath(path2);
    if (typeof this.playTransition !== "function" || typeof this._navigate !== "function") {
      _ensureShadowPortalCoreApplied(this.constructor);
    }
    if (typeof this.playTransition !== "function" || typeof this._navigate !== "function") {
      this.debugError("Teleport", "Shared portal core missing; using direct navigation fallback");
      if ((_a = this._NavigationUtils) == null ? void 0 : _a.transitionTo) {
        this._NavigationUtils.transitionTo(targetPath);
      } else if ((_b = window.history) == null ? void 0 : _b.pushState) {
        window.history.pushState({}, "", targetPath);
        window.dispatchEvent(new PopStateEvent("popstate"));
      }
      reinforceJump();
      return true;
    }
    if (portalCore == null ? void 0 : portalCore.stampTeleportCooldown) portalCore.stampTeleportCooldown();
    this.playTransition(() => {
      const fadeToken = this._beginChannelViewFadeOut();
      this._navigate(targetPath, context, {
        onConfirmed: () => {
          this._finishChannelViewFade(fadeToken, true);
          reinforceJump();
        },
        onFailed: () => this._finishChannelViewFade(fadeToken, false)
      });
    }, targetPath);
    return true;
  }
  // UI/widget/panel/settings methods are mixed in from plugin-ui-methods.js
};
Object.assign(module.exports.prototype, ShadowSensesUiMethods);
var _getShadowPortalCoreCandidates = (path2) => {
  var _a;
  const candidates = [];
  if (((_a = BdApi == null ? void 0 : BdApi.Plugins) == null ? void 0 : _a.folder) && typeof BdApi.Plugins.folder === "string") {
    candidates.push(path2.join(BdApi.Plugins.folder, "ShadowPortalCore.js"));
  }
  candidates.push("./ShadowPortalCore.js");
  return candidates;
};
var _tryLoadShadowPortalCoreViaRequire = (candidate) => {
  try {
    const resolved = require.resolve(candidate);
    if (require.cache[resolved]) delete require.cache[resolved];
    const mod = require(resolved);
    return (mod == null ? void 0 : mod.applyPortalCoreToClass) ? mod : null;
  } catch (_) {
    return null;
  }
};
var _resolveShadowPortalAbsolutePath = (path2, candidate) => {
  var _a;
  if (path2.isAbsolute(candidate)) return candidate;
  const pluginsFolder = ((_a = BdApi == null ? void 0 : BdApi.Plugins) == null ? void 0 : _a.folder) || "";
  return path2.join(pluginsFolder, candidate.replace(/^\.\//, ""));
};
var _tryLoadShadowPortalCoreViaFactory = (path2, fs2, candidate) => {
  try {
    const absolute = _resolveShadowPortalAbsolutePath(path2, candidate);
    if (!absolute || !fs2.existsSync(absolute)) return null;
    const source = fs2.readFileSync(absolute, "utf8");
    const moduleObj = { exports: {} };
    const factory = new Function(
      "module",
      "exports",
      "require",
      "window",
      "BdApi",
      `${source}
return module.exports || exports || (window && window.ShadowPortalCore) || null;`
    );
    const loaded = factory(
      moduleObj,
      moduleObj.exports,
      require,
      typeof window !== "undefined" ? window : null,
      BdApi
    );
    const mod = loaded || moduleObj.exports || (typeof window !== "undefined" ? window.ShadowPortalCore : null);
    return (mod == null ? void 0 : mod.applyPortalCoreToClass) ? mod : null;
  } catch (_) {
    return null;
  }
};
var _loadShadowPortalCore = () => {
  if (_EmbeddedShadowPortalCore == null ? void 0 : _EmbeddedShadowPortalCore.applyPortalCoreToClass) {
    return _EmbeddedShadowPortalCore;
  }
  try {
    const path2 = require("path");
    const fs2 = require("fs");
    const candidates = _getShadowPortalCoreCandidates(path2);
    for (const candidate of candidates) {
      const fromRequire = _tryLoadShadowPortalCoreViaRequire(candidate);
      if (fromRequire) return fromRequire;
      const fromFactory = _tryLoadShadowPortalCoreViaFactory(path2, fs2, candidate);
      if (fromFactory) return fromFactory;
    }
  } catch (_) {
  }
  return typeof window !== "undefined" ? window.ShadowPortalCore || null : null;
};
var SHADOW_PORTAL_CONFIG = {
  transitionId: TRANSITION_ID,
  navigationFailureToast: "Shadow Senses failed to switch channel",
  contextLabelKeys: ["anchorName", "targetUsername", "targetName", "label", "name"]
};
var _ensureShadowPortalCoreApplied = (PluginClass = module.exports) => {
  const core = _loadShadowPortalCore();
  if (!(core == null ? void 0 : core.applyPortalCoreToClass)) return false;
  core.applyPortalCoreToClass(PluginClass, SHADOW_PORTAL_CONFIG);
  return true;
};
if (!_ensureShadowPortalCoreApplied(module.exports)) {
  const warnOnceKey = "__shadowSensesPortalCoreWarned";
  if (typeof window !== "undefined" && !window[warnOnceKey]) {
    window[warnOnceKey] = true;
    console.warn(`[${PLUGIN_NAME}] Shared portal core unavailable. Navigation/transition patch will not be shared.`);
  }
}
