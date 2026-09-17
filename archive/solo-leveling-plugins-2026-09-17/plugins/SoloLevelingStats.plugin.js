/**
 * @name SoloLevelingStats
 * @author matthewqilanthompson
 * @description Level up, unlock achievements, and complete daily quests based on your Discord activity
 * @version 3.0.5
 * @source https://github.com/matthewqilanthompson/betterdiscord-assets
 */
var __getOwnPropNames = Object.getOwnPropertyNames;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};

// src/SoloLevelingStats/constants.js
var require_constants = __commonJS({
  "src/SoloLevelingStats/constants.js"(exports2, module2) {
    module2.exports = {
      PLUGIN_NAME: "SoloLevelingStats",
      CHAT_UI_STYLE_ID: "sls-chat-ui-styles",
      STAT_KEYS: Object.freeze(["strength", "agility", "intelligence", "vitality", "perception", "attack", "defense", "critChance", "critDamage"]),
      EMPTY_STAT_BLOCK: Object.freeze({
        strength: 0,
        agility: 0,
        intelligence: 0,
        vitality: 0,
        perception: 0,
        attack: 0,
        defense: 0,
        critChance: 0,
        critDamage: 0
      }),
      DEFAULT_TITLE_BONUS: Object.freeze({
        xp: 0,
        critChance: 0,
        strength: 0,
        agility: 0,
        intelligence: 0,
        vitality: 0,
        perception: 0,
        strengthPercent: 0,
        agilityPercent: 0,
        intelligencePercent: 0,
        vitalityPercent: 0,
        perceptionPercent: 0
      })
    };
  }
});

// src/SoloLevelingStats/performance-cache.js
var require_performance_cache = __commonJS({
  "src/SoloLevelingStats/performance-cache.js"(exports2, module2) {
    module2.exports = {
      throttle(func, wait) {
        let timeout = null;
        let lastRun = 0;
        return (...args) => {
          const now = Date.now();
          const remaining = wait - (now - lastRun);
          if (remaining <= 0) {
            lastRun = now;
            return func.apply(this, args);
          } else if (!timeout) {
            timeout = setTimeout(() => {
              lastRun = Date.now();
              timeout = null;
              func.apply(this, args);
            }, remaining);
          }
        };
      },
      debounce(func, wait) {
        let timeout = null;
        return (...args) => {
          clearTimeout(timeout);
          timeout = setTimeout(() => func.apply(this, args), wait);
        };
      },
      _registerUIForceUpdate(forceUpdate) {
        if (typeof forceUpdate !== "function") return;
        this._chatUIForceUpdates ||= /* @__PURE__ */ new Set();
        this._chatUIForceUpdates.add(forceUpdate);
        this._chatUIForceUpdate = forceUpdate;
      },
      _unregisterUIForceUpdate(forceUpdate) {
        var _a, _b, _c;
        if (typeof forceUpdate === "function") {
          (_b = (_a = this._chatUIForceUpdates) == null ? void 0 : _a.delete) == null ? void 0 : _b.call(_a, forceUpdate);
        }
        if ((_c = this._chatUIForceUpdates) == null ? void 0 : _c.size) {
          const next = this._chatUIForceUpdates.values().next();
          this._chatUIForceUpdate = (next == null ? void 0 : next.done) ? null : next.value;
        } else {
          this._chatUIForceUpdate = null;
        }
      },
      _triggerUIForceUpdates() {
        var _a;
        if ((_a = this._chatUIForceUpdates) == null ? void 0 : _a.size) {
          this._chatUIForceUpdates.forEach((updateFn) => {
            try {
              updateFn();
            } catch (_) {
            }
          });
          return;
        }
        if (this._chatUIForceUpdate) {
          try {
            this._chatUIForceUpdate();
          } catch (_) {
          }
        }
      },
      // (initDOMCache removed — legacy pre-React DOM cache, no longer consumed.)
      _clearCurrentLevelCache() {
        this._cache.currentLevel = null;
        this._cache.currentLevelTime = 0;
        this._cache.milestoneMultiplier = null;
        this._cache.milestoneMultiplierLevel = null;
      },
      // (_clearPerceptionCaches removed — the cache slots it cleared were
      // never read; both writer and reader were dead.)
      _clearTitleCaches() {
        this._cache.activeTitleBonus = null;
        this._cache.activeTitleBonusTime = 0;
        this._cache.activeTitleBonusKey = null;
      },
      _clearShadowCaches() {
        this._cache.shadowArmyBuffs = null;
        this._cache.shadowArmyBuffsTime = 0;
      },
      _clearTotalEffectiveStatsCache() {
        this._cache.totalEffectiveStats = null;
        this._cache.totalEffectiveStatsTime = 0;
        this._cache.totalEffectiveStatsKey = null;
      },
      invalidatePerformanceCache(cacheKeys = null) {
        if (!cacheKeys) {
          this._clearCurrentLevelCache();
          this._clearTitleCaches();
          this._clearShadowCaches();
          this._clearTotalEffectiveStatsCache();
          this._cache.hpCache.clear();
          this._cache.manaCache.clear();
          return;
        }
        const keySet = new Set(cacheKeys);
        keySet.has("currentLevel") && this._clearCurrentLevelCache();
        keySet.has("title") && this._clearTitleCaches();
        keySet.has("shadow") && this._clearShadowCaches();
        if (keySet.has("title") || keySet.has("stats") || keySet.has("shadow")) {
          this._clearTotalEffectiveStatsCache();
        }
        if (keySet.has("stats")) {
          this._cache.hpCache.clear();
          this._cache.manaCache.clear();
        }
      }
    };
  }
});

// src/SoloLevelingStats/stat-helpers.js
var require_stat_helpers = __commonJS({
  "src/SoloLevelingStats/stat-helpers.js"(exports2, module2) {
    var C2 = require_constants();
    module2.exports = {
      getStatKeys() {
        if (Array.isArray(this.STAT_KEYS) && this.STAT_KEYS.length > 0) {
          return this.STAT_KEYS;
        }
        return C2.STAT_KEYS;
      },
      normalizeNumber(value, fallback = 0) {
        const numeric = Number(value);
        return Number.isFinite(numeric) ? numeric : fallback;
      },
      createEmptyStatBlock() {
        return { ...C2.EMPTY_STAT_BLOCK };
      },
      normalizeStatBlock(stats = null, fallback = 0) {
        const source = stats && typeof stats === "object" ? stats : null;
        const normalized = this.createEmptyStatBlock();
        const keys = this.getStatKeys();
        for (let i = 0; i < keys.length; i++) {
          const key = keys[i];
          normalized[key] = this.normalizeNumber(source == null ? void 0 : source[key], fallback);
        }
        return normalized;
      },
      sumStatBlock(stats = null) {
        var _a;
        const source = stats && typeof stats === "object" ? stats : (_a = this.settings) == null ? void 0 : _a.stats;
        if (!source || typeof source !== "object") return 0;
        const keys = this.getStatKeys();
        let sum = 0;
        for (let i = 0; i < keys.length; i++) {
          const key = keys[i];
          sum += this.normalizeNumber(source[key], 0);
        }
        return sum;
      },
      addToAllStats(increment, targetStats = null) {
        var _a;
        const target = targetStats && typeof targetStats === "object" ? targetStats : (_a = this.settings) == null ? void 0 : _a.stats;
        if (!target || typeof target !== "object") return;
        const delta = Math.max(0, Math.round(this.normalizeNumber(increment, 0)));
        if (!delta) return;
        const keys = this.getStatKeys();
        for (let i = 0; i < keys.length; i++) {
          const key = keys[i];
          target[key] = this.normalizeNumber(target[key], 0) + delta;
        }
      }
    };
  }
});

// src/SoloLevelingStats/calculation-bonuses.js
var require_calculation_bonuses = __commonJS({
  "src/SoloLevelingStats/calculation-bonuses.js"(exports2, module2) {
    module2.exports = {
      calculateQualityBonus(messageText, messageLength) {
        let bonus = 0;
        if (messageLength > 200) {
          bonus += 20;
          if (messageLength > 500) bonus += 15;
          if (messageLength > 1e3) bonus += 25;
        }
        const hasLinks = this.RE_LINKS.test(messageText);
        const hasCode = this.RE_CODE.test(messageText);
        const hasEmojis = this.RE_EMOJIS.test(messageText);
        const hasMentions = this.RE_MENTIONS.test(messageText);
        if (hasLinks) bonus += 5;
        if (hasCode) bonus += 10;
        if (hasEmojis && messageLength > 50) bonus += 3;
        if (hasMentions) bonus += 2;
        this.RE_WORDS.lastIndex = 0;
        const words = messageText.toLowerCase().match(this.RE_WORDS) || [];
        if (words.length > 10 && messageLength > 100) {
          if (!this._uniqueWordsPool) this._uniqueWordsPool = /* @__PURE__ */ new Set();
          const pool = this._uniqueWordsPool;
          pool.clear();
          for (let i = 0; i < words.length; i++) pool.add(words[i]);
          if (pool.size > 10) {
            bonus += Math.min(pool.size * 0.5, 15);
          }
        }
        if (messageText.includes("?") && messageLength > 30) bonus += 5;
        if (this.RE_PROPER_SENTENCE.test(messageText)) bonus += 3;
        return Math.round(bonus);
      },
      calculateMessageTypeBonus(messageText) {
        let bonus = 0;
        if (this.RE_NUMBERED_LIST.test(messageText)) bonus += 5;
        if (this.RE_BULLET_LIST.test(messageText)) bonus += 5;
        if (messageText.includes("\n") && messageText.split("\n").length > 2) bonus += 8;
        return bonus;
      },
      calculateTimeBonus() {
        const now = Date.now();
        if (this._cache.timeBonus !== null && this._cache.timeBonusTime && now - this._cache.timeBonusTime < this._cache.timeBonusTTL) {
          return this._cache.timeBonus;
        }
        const hour = (/* @__PURE__ */ new Date()).getHours();
        let result = 0;
        if (hour >= 18 && hour <= 23) {
          result = 5;
        } else if (hour >= 0 && hour <= 4) {
          result = 8;
        }
        this._cache.timeBonus = result;
        this._cache.timeBonusTime = now;
        return result;
      },
      // (calculateChannelActivityBonus removed — was a stub that returned 2
      // unconditionally when a channel id was resolvable, 0 otherwise.
      // Inlined at the single caller below.)
      calculateActivityStreakBonus() {
        var _a, _b;
        const now = Date.now();
        const today = (/* @__PURE__ */ new Date()).toDateString();
        try {
          const lastActiveDate = (_a = this.settings.activity) == null ? void 0 : _a.lastActiveDate;
          if (!this.settings.activity.streakDays) {
            this.settings.activity.streakDays = 0;
          }
          if (lastActiveDate !== today) {
            const yesterday = /* @__PURE__ */ new Date();
            yesterday.setDate(yesterday.getDate() - 1);
            const yesterdayStr = yesterday.toDateString();
            if (lastActiveDate === yesterdayStr) {
              this.settings.activity.streakDays = (this.settings.activity.streakDays || 0) + 1;
            } else if (lastActiveDate && lastActiveDate !== today) {
              this.settings.activity.streakDays = 1;
            } else {
              this.settings.activity.streakDays = 1;
            }
            this.settings.activity.lastActiveDate = today;
          }
          const cacheKey = `${today}_${((_b = this.settings.activity) == null ? void 0 : _b.streakDays) || 0}`;
          if (this._cache.activityStreakBonus !== null && this._cache.activityStreakBonusTime && this._cache.activityStreakBonusKey === cacheKey && now - this._cache.activityStreakBonusTime < this._cache.activityStreakBonusTTL) {
            return this._cache.activityStreakBonus;
          }
          const streakDays = Math.min(this.settings.activity.streakDays || 0, 7);
          const streakBonus = streakDays <= 1 ? streakDays : Math.min(2 + (streakDays - 1) * 2, 12);
          this._cache.activityStreakBonus = streakBonus;
          this._cache.activityStreakBonusTime = now;
          this._cache.activityStreakBonusKey = cacheKey;
          return streakBonus;
        } catch (error) {
          this.debugError("CALCULATE_STREAK_BONUS", error);
          return 0;
        }
      },
      getSkillTreeBonuses() {
        var _a, _b;
        const now = Date.now();
        if (this._cache.skillTreeBonuses !== null && this._cache.skillTreeBonusesTime && now - this._cache.skillTreeBonusesTime < this._cache.skillTreeBonusesTTL) {
          return this._cache.skillTreeBonuses;
        }
        try {
          let bonuses = null;
          const instance = (_b = (_a = this._SLUtils) == null ? void 0 : _a.getPluginInstance) == null ? void 0 : _b.call(_a, "SkillTree");
          if (instance && typeof instance.calculateSkillBonuses === "function") {
            bonuses = instance.calculateSkillBonuses() || null;
          }
          if (!bonuses) {
            bonuses = BdApi.Data.load("SkillTree", "bonuses") || null;
          }
          this._cache.skillTreeBonuses = bonuses;
          this._cache.skillTreeBonusesTime = now;
          return bonuses;
        } catch (error) {
          this.debugError("SKILL_TREE_BONUSES", error);
          this._cache.skillTreeBonuses = null;
          this._cache.skillTreeBonusesTime = now;
          return null;
        }
      },
      getActiveSkillBuffs() {
        const now = Date.now();
        if (this._cache.activeSkillBuffs !== null && this._cache.activeSkillBuffsTime && now - this._cache.activeSkillBuffsTime < this._cache.activeSkillBuffsTTL) {
          return this._cache.activeSkillBuffs;
        }
        try {
          const buffs = BdApi.Data.load("SkillTree", "activeBuffs") || null;
          this._cache.activeSkillBuffs = buffs;
          this._cache.activeSkillBuffsTime = now;
          return buffs;
        } catch (error) {
          this.debugError("ACTIVE_SKILL_BUFFS", error);
          this._cache.activeSkillBuffs = null;
          this._cache.activeSkillBuffsTime = now;
          return null;
        }
      },
      getHiddenBlessingBonuses() {
        var _a, _b;
        const now = Date.now();
        if (this._cache.hiddenBlessingBonuses !== null && this._cache.hiddenBlessingBonusesTime && now - this._cache.hiddenBlessingBonusesTime < (this._cache.hiddenBlessingBonusesTTL || 2e3)) {
          return this._cache.hiddenBlessingBonuses;
        }
        try {
          let blessings = null;
          const instance = (_b = (_a = this._SLUtils) == null ? void 0 : _a.getPluginInstance) == null ? void 0 : _b.call(_a, "SkillTree");
          if (instance && typeof instance.getHiddenBlessingBonuses === "function") {
            blessings = instance.getHiddenBlessingBonuses() || null;
          }
          if (!blessings) {
            blessings = BdApi.Data.load("SkillTree", "hiddenBlessings") || null;
          }
          this._cache.hiddenBlessingBonuses = blessings;
          this._cache.hiddenBlessingBonusesTime = now;
          if (!this._cache.hiddenBlessingBonusesTTL) this._cache.hiddenBlessingBonusesTTL = 2e3;
          return blessings;
        } catch (error) {
          this.debugError("HIDDEN_BLESSING_BONUSES", error);
          this._cache.hiddenBlessingBonuses = null;
          this._cache.hiddenBlessingBonusesTime = now;
          if (!this._cache.hiddenBlessingBonusesTTL) this._cache.hiddenBlessingBonusesTTL = 2e3;
          return null;
        }
      },
      consumeActiveSkillCharge(skillId) {
        var _a, _b;
        try {
          const instance = (_b = (_a = this._SLUtils) == null ? void 0 : _a.getPluginInstance) == null ? void 0 : _b.call(_a, "SkillTree");
          if (instance && typeof instance.consumeActiveSkillCharge === "function") {
            return instance.consumeActiveSkillCharge(skillId);
          }
        } catch (_error) {
        }
        return false;
      },
      calculateInteractionQualityBonus(messageContext = {}, messageText = "") {
        const mentionCount = Number.isFinite(messageContext == null ? void 0 : messageContext.mentionCount) ? messageContext.mentionCount : this.extractMentionCountFromText(messageText);
        const isReply = (messageContext == null ? void 0 : messageContext.isReply) === true;
        const isThreadParticipation = (messageContext == null ? void 0 : messageContext.isThread) === true;
        let bonus = 0;
        isReply && (bonus += 5);
        mentionCount > 0 && (bonus += Math.min(8, mentionCount * 2));
        isThreadParticipation && (bonus += 4);
        return bonus;
      },
      normalizeMessageFingerprint(messageText = "") {
        return String(messageText || "").toLowerCase().replace(/https?:\/\/\S+/g, "<url>").replace(/<@!?\d+>|@everyone|@here/g, "<mention>").replace(/[^\w\s<>]/g, " ").replace(/\s+/g, " ").trim().slice(0, 220);
      },
      pruneAntiAbuseFingerprints(now, maxAgeMs) {
        var _a;
        if (!((_a = this._messageAntiAbuse) == null ? void 0 : _a.fingerprints)) return;
        for (const [key, entry] of this._messageAntiAbuse.fingerprints.entries()) {
          if (!(entry == null ? void 0 : entry.lastSeen) || now - entry.lastSeen > maxAgeMs) {
            this._messageAntiAbuse.fingerprints.delete(key);
          }
        }
      },
      getRapidSendDecayMultiplier(deltaMs) {
        if (!Number.isFinite(deltaMs)) return 1;
        if (deltaMs < 700) return 0.18;
        if (deltaMs < 1200) return 0.35;
        if (deltaMs < 2e3) return 0.55;
        if (deltaMs < 3500) return 0.75;
        if (deltaMs < 5e3) return 0.9;
        return 1;
      },
      getRepeatDecayMultiplier(repeatCount) {
        if (repeatCount <= 1) return 1;
        if (repeatCount === 2) return 0.85;
        if (repeatCount === 3) return 0.65;
        return Math.max(0.35, 0.65 - (repeatCount - 3) * 0.08);
      },
      calculateAntiAbuseScore(messageText, messageContext = {}) {
        const now = Date.now();
        this._messageAntiAbuse = this._messageAntiAbuse || {
          lastMessageTime: 0,
          fingerprints: /* @__PURE__ */ new Map()
        };
        const state = this._messageAntiAbuse;
        const repeatWindowMs = 2 * 60 * 1e3;
        const deltaMs = state.lastMessageTime > 0 ? now - state.lastMessageTime : Number.POSITIVE_INFINITY;
        const rapidMultiplier = this.getRapidSendDecayMultiplier(deltaMs);
        this.pruneAntiAbuseFingerprints(now, repeatWindowMs);
        const fingerprint = this.normalizeMessageFingerprint(messageText);
        let repeatCount = 1;
        if (fingerprint.length >= 6) {
          const existing = state.fingerprints.get(fingerprint);
          if (existing && now - existing.lastSeen <= repeatWindowMs) {
            repeatCount = existing.count + 1;
          }
          state.fingerprints.set(fingerprint, { count: repeatCount, lastSeen: now });
        }
        const repeatMultiplier = this.getRepeatDecayMultiplier(repeatCount);
        const multiplier = Math.max(0.12, Math.min(1, rapidMultiplier * repeatMultiplier));
        state.lastMessageTime = now;
        return {
          multiplier,
          rapidMultiplier,
          repeatMultiplier,
          repeatCount,
          deltaMs: Number.isFinite(deltaMs) ? deltaMs : null,
          source: (messageContext == null ? void 0 : messageContext.source) || "unknown"
        };
      },
      getPerceptionBurstProfile() {
        var _a, _b;
        const perceptionStat = ((_b = (_a = this.settings) == null ? void 0 : _a.stats) == null ? void 0 : _b.perception) ?? 0;
        const perception = Math.max(0, Number(perceptionStat) || 0);
        const burstChance = Math.min(0.92, 0.05 + perception * 35e-4);
        const maxHits = Math.max(1, 1 + Math.floor(perception * 0.5));
        const jackpotChance = perception >= 40 ? Math.min(0.02, (perception - 39) * 4e-4) : 0;
        return {
          perception,
          burstChance,
          maxHits,
          jackpotChance
        };
      },
      calculateBaseXpForMessage({ messageText, messageLength, messageContext = null }) {
        let baseXP = 10;
        const charBonus = Math.min(messageLength * 0.15, 75);
        baseXP += charBonus;
        const qualityBonus = this.calculateQualityBonus(messageText, messageLength);
        baseXP += qualityBonus;
        const typeBonus = this.calculateMessageTypeBonus(messageText);
        baseXP += typeBonus;
        const timeBonus = this.calculateTimeBonus();
        baseXP += timeBonus;
        if (this.getCurrentChannelId()) baseXP += 2;
        const streakBonus = this.calculateActivityStreakBonus();
        baseXP += streakBonus;
        const interactionBonus = this.calculateInteractionQualityBonus(messageContext || {}, messageText);
        const antiAbuse = this.calculateAntiAbuseScore(messageText, messageContext || {});
        const decayedBaseXp = Math.max(3, Math.round(baseXP * antiAbuse.multiplier));
        const scaledInteractionBonus = Math.round(interactionBonus * Math.max(0.5, antiAbuse.multiplier));
        const finalBaseXp = decayedBaseXp + scaledInteractionBonus;
        this._lastAntiAbuseMeta = {
          antiAbuse,
          interactionBonus,
          scaledInteractionBonus,
          preDecayBaseXP: baseXP,
          postDecayBaseXP: finalBaseXp
        };
        return finalBaseXp;
      },
      getXPRequiredForLevel(level) {
        if (this._cache.xpRequiredForLevel.has(level)) {
          return this._cache.xpRequiredForLevel.get(level);
        }
        const baseXP = 100;
        const exponentialPart = baseXP * Math.pow(level, 1.6);
        const linearPart = baseXP * level * 0.25;
        const result = Math.round(exponentialPart + linearPart);
        if (this._cache.xpRequiredForLevel.size < 1e3) {
          this._cache.xpRequiredForLevel.set(level, result);
        }
        return result;
      },
      getStatPointsForLevel(level) {
        const normalizedLevel = Math.max(1, Math.floor(Number(level) || 1));
        if (normalizedLevel < 100) return 5;
        if (normalizedLevel < 300) return 4;
        if (normalizedLevel < 700) return 3;
        if (normalizedLevel < 1200) return 2;
        return 1;
      },
      getTitleXpCapForLevel(level) {
        const normalizedLevel = Math.max(1, Math.floor(Number(level) || 1));
        if (normalizedLevel < 200) return 0.35;
        if (normalizedLevel < 500) return 0.45;
        if (normalizedLevel < 1e3) return 0.55;
        if (normalizedLevel < 1500) return 0.65;
        return 0.75;
      },
      getPerMessageXpSoftCap(level) {
        const normalizedLevel = Math.max(1, Math.floor(Number(level) || 1));
        return Math.round(220 + normalizedLevel * 2.8);
      },
      getPerMessageXpHardCap(level) {
        const normalizedLevel = Math.max(1, Math.floor(Number(level) || 1));
        return Math.round(420 + normalizedLevel * 4.2);
      },
      applyXpGovernors(rawXp, level) {
        let xp = Math.max(0, Math.round(Number(rawXp) || 0));
        const softCap = this.getPerMessageXpSoftCap(level);
        const hardCap = this.getPerMessageXpHardCap(level);
        if (xp > softCap) {
          const overflow = xp - softCap;
          const capGap = Math.max(1, hardCap - softCap);
          const compressionScale = Math.max(1, Math.round(capGap / 4));
          const compressedOverflow = Math.min(capGap, Math.round(Math.sqrt(overflow * compressionScale)));
          xp = softCap + compressedOverflow;
        }
        return Math.min(xp, hardCap);
      },
      getRankMultiplier() {
        return this.rankData.xpMultipliers[this.settings.rank] || 1;
      }
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

// src/SoloLevelingStats/channel-context.js
var require_channel_context = __commonJS({
  "src/SoloLevelingStats/channel-context.js"(exports2, module2) {
    var dc = require_discord_classes();
    module2.exports = {
      extractMentionCountFromText(messageText = "") {
        if (!messageText) return 0;
        const mentionMatches = messageText.match(/<@!?\d+>|@everyone|@here/g);
        return mentionMatches ? mentionMatches.length : 0;
      },
      getChannelStore() {
        var _a;
        let channelStore = (_a = this.webpackModules) == null ? void 0 : _a.ChannelStore;
        if (!(channelStore == null ? void 0 : channelStore.getChannel)) {
          channelStore = BdApi.Webpack.getStore("ChannelStore");
          if (channelStore) this.webpackModules.ChannelStore = channelStore;
        }
        return channelStore || null;
      },
      getChannelTypeById(channelId) {
        var _a, _b, _c;
        if (!channelId) return null;
        try {
          return ((_c = (_b = (_a = this.getChannelStore()) == null ? void 0 : _a.getChannel) == null ? void 0 : _b.call(_a, channelId)) == null ? void 0 : _c.type) ?? null;
        } catch (_error) {
          return null;
        }
      },
      isThreadLikeChannelType(channelType) {
        return channelType === 10 || channelType === 11 || channelType === 12;
      },
      doesMessageFiberMatchAuthorId(messageElement, authorIdToMatch) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j;
        if (!messageElement || !authorIdToMatch) return false;
        try {
          const reactKey = this.getReactFiberKey(messageElement);
          if (!reactKey) return false;
          let fiber = messageElement[reactKey];
          for (let i = 0; i < 20 && fiber; i++) {
            const hasMessageProp = Boolean(((_a = fiber.memoizedProps) == null ? void 0 : _a.message) || ((_b = fiber.memoizedState) == null ? void 0 : _b.message));
            const authorId = ((_e = (_d = (_c = fiber.memoizedProps) == null ? void 0 : _c.message) == null ? void 0 : _d.author) == null ? void 0 : _e.id) || ((_h = (_g = (_f = fiber.memoizedState) == null ? void 0 : _f.message) == null ? void 0 : _g.author) == null ? void 0 : _h.id) || ((_j = (_i = fiber.memoizedProps) == null ? void 0 : _i.message) == null ? void 0 : _j.authorId);
            if (authorId === authorIdToMatch) return true;
            if (hasMessageProp) return false;
            fiber = fiber.return;
          }
          return false;
        } catch (_error) {
          return false;
        }
      },
      ensureValidTotalXP(logContext = "TOTAL_XP") {
        if (typeof this.settings.totalXP === "number" && !isNaN(this.settings.totalXP) && this.settings.totalXP >= 0) {
          return false;
        }
        const currentLevel = this.settings.level || 1;
        let totalXPNeeded = 0;
        for (let l = 1; l < currentLevel; l++) {
          totalXPNeeded += this.getXPRequiredForLevel(l);
        }
        this.settings.totalXP = totalXPNeeded + (this.settings.xp || 0);
        this.debugLog(logContext, "Initialized missing totalXP", {
          initializedTotalXP: this.settings.totalXP,
          level: currentLevel,
          xp: this.settings.xp
        });
        return true;
      },
      buildMessageContextFromView(messageText = "", messageElement = null) {
        var _a, _b;
        const channelInfo = this.getCurrentChannelInfo() || {};
        const rawChannelId = channelInfo.rawChannelId || null;
        const channelType = this.getChannelTypeById(rawChannelId);
        const mentionCount = this.extractMentionCountFromText(messageText);
        const hasReplyNode = !!((_a = messageElement == null ? void 0 : messageElement.querySelector) == null ? void 0 : _a.call(
          messageElement,
          '[class*="replied"], [class*="reply"], [id*="reply"]'
        ));
        return {
          source: "view",
          channelId: rawChannelId || channelInfo.channelId || null,
          channelType,
          mentionCount,
          hasMentions: mentionCount > 0,
          isReply: hasReplyNode,
          isThread: channelInfo.channelType === "thread" || this.isThreadLikeChannelType(channelType) || /\/threads\/\d+/.test(((_b = window.location) == null ? void 0 : _b.pathname) || ""),
          isForumThread: channelType === 11 || channelType === 12
        };
      },
      getCurrentChannelInfo() {
        try {
          const url = window.location.href;
          if (this._channelInfoCacheUrl === url && this._channelInfoCache) {
            return this._channelInfoCache;
          }
          this.debugLog("GET_CHANNEL_INFO", "Getting channel info", { url });
          const threadMatch = url.match(/channels\/(\d+)\/(\d+)\/threads\/(\d+)/);
          if (threadMatch) {
            const serverId = threadMatch[1];
            const parentChannelId = threadMatch[2];
            const threadId = threadMatch[3];
            this.debugLog("GET_CHANNEL_INFO", "Thread route detected", {
              serverId,
              parentChannelId,
              threadId,
              type: "thread"
            });
            const info2 = {
              channelId: `thread_${serverId}_${parentChannelId}_${threadId}`,
              channelType: "thread",
              serverId,
              isDM: false,
              rawChannelId: threadId,
              parentChannelId
            };
            this._channelInfoCacheUrl = url;
            this._channelInfoCache = info2;
            return info2;
          }
          const serverChannelMatch = url.match(/channels\/(\d+)\/(\d+)/);
          if (serverChannelMatch) {
            const serverId = serverChannelMatch[1];
            const channelId = serverChannelMatch[2];
            this.debugLog("GET_CHANNEL_INFO", "Server channel detected", {
              serverId,
              channelId,
              type: "server"
            });
            const info2 = {
              channelId: `server_${serverId}_${channelId}`,
              // Unique ID for server channels
              channelType: "server",
              serverId,
              isDM: false,
              rawChannelId: channelId
            };
            this._channelInfoCacheUrl = url;
            this._channelInfoCache = info2;
            return info2;
          }
          const dmMatch = url.match(/@me\/(\d+)/);
          if (dmMatch) {
            const channelId = dmMatch[1];
            this.debugLog("GET_CHANNEL_INFO", "DM channel detected", {
              channelId,
              type: "dm"
            });
            const info2 = {
              channelId: `dm_${channelId}`,
              // Unique ID for DMs
              channelType: "dm",
              serverId: null,
              isDM: true,
              rawChannelId: channelId
            };
            this._channelInfoCacheUrl = url;
            this._channelInfoCache = info2;
            return info2;
          }
          const groupDmMatch = url.match(/channels\/@me\/(\d+)/);
          if (groupDmMatch) {
            const groupId = groupDmMatch[1];
            this.debugLog("GET_CHANNEL_INFO", "Group DM detected", {
              groupId,
              type: "group_dm"
            });
            const info2 = {
              channelId: `group_dm_${groupId}`,
              channelType: "group_dm",
              serverId: null,
              isDM: true,
              rawChannelId: groupId
            };
            this._channelInfoCacheUrl = url;
            this._channelInfoCache = info2;
            return info2;
          }
          this.debugLog("GET_CHANNEL_INFO", "Unknown channel pattern, using URL as ID", {
            url,
            type: "unknown"
          });
          const info = {
            channelId: `unknown_${this.hashString(url)}`,
            channelType: "unknown",
            serverId: null,
            isDM: false,
            rawChannelId: url
          };
          this._channelInfoCacheUrl = url;
          this._channelInfoCache = info;
          return info;
        } catch (error) {
          this.debugError("GET_CHANNEL_INFO", error, {
            currentUrl: window.location.href
          });
          this._channelInfoCacheUrl = null;
          this._channelInfoCache = null;
          return null;
        }
      },
      getCurrentChannelId() {
        const info = this.getCurrentChannelInfo();
        return info ? info.channelId : null;
      },
      _isGuildTextChannel() {
        try {
          const channelInfo = this.getCurrentChannelInfo();
          if (!channelInfo) return false;
          if (channelInfo.isDM) return false;
          if (channelInfo.channelType === "dm" || channelInfo.channelType === "group_dm") return false;
          const channelStore = this.getChannelStore();
          if ((channelStore == null ? void 0 : channelStore.getChannel) && channelInfo.rawChannelId) {
            const channel = channelStore.getChannel(channelInfo.rawChannelId);
            if (channel) {
              return channel.type === 0 || channel.type === 5 || channel.type === 2 || channel.type === 13 || channel.type === 10 || channel.type === 11 || channel.type === 12 || channel.type === 15;
            }
          }
          if (channelInfo.channelType === "server") {
            return true;
          }
          return false;
        } catch (error) {
          this.debugError("IS_GUILD_TEXT_CHANNEL", error);
          return false;
        }
      },
      _canShowChatUIInCurrentView() {
        return this._isGuildTextChannel();
      },
      getReactFiberKey(element) {
        return Object.keys(element).find(
          (key) => key.startsWith("__reactFiber") || key.startsWith("__reactInternalInstance") || key.startsWith("__reactContainer")
        );
      },
      getMessageContainer() {
        const cached = this._messageContainerEl;
        if (cached && cached.isConnected) return cached;
        const el = document.querySelector(dc.sel.messagesWrapper) || document.querySelector(dc.sel.scrollerInner) || document.querySelector(dc.sel.messageList) || document.querySelector(dc.sel.scroller);
        this._messageContainerEl = el || null;
        return this._messageContainerEl;
      },
      getMessageInputElement() {
        const cachedInput = this._messageInputElCache;
        if (cachedInput == null ? void 0 : cachedInput.isConnected) return cachedInput;
        if (!this._messageInputSelectors) {
          this._messageInputSelectors = [
            'div[contenteditable="true"][role="textbox"]',
            // Modern Discord uses contenteditable divs
            'div[contenteditable="true"]',
            dc.sel.slateTextArea,
            dc.sel.textArea,
            '[class*="textValue"]',
            'textarea[placeholder*="Message"]',
            'textarea[placeholder*="message"]',
            '[class*="messageInput"]',
            '[class*="input"]',
            '[data-slate-editor="true"]'
            // Slate editor
          ];
        }
        for (const selector of this._messageInputSelectors) {
          const el = document.querySelector(selector);
          if (el) {
            this._messageInputElCache = el;
            return el;
          }
        }
        const roleInput = document.querySelector('[role="textbox"]');
        if (roleInput && roleInput.contentEditable === "true") {
          this.debugLog("FIND_INPUT", 'Found input by role="textbox"');
          this._messageInputElCache = roleInput;
          return roleInput;
        }
        this._messageInputElCache = null;
        return null;
      },
      getMessageContainerElementForObserving() {
        if (!this._messageContainerSelectors) {
          this._messageContainerSelectors = [
            dc.sel.messagesWrapper,
            dc.sel.scrollerInner,
            dc.sel.scroller
          ];
        }
        for (const selector of this._messageContainerSelectors) {
          const el = document.querySelector(selector);
          if (el) return el;
        }
        return null;
      },
      getCurrentUserIdForMessageDetection() {
        var _a, _b;
        try {
          const now = Date.now();
          if (this._currentUserIdCacheTime && now - this._currentUserIdCacheTime < 5e3 && this._currentUserIdCache) {
            return this._currentUserIdCache;
          }
          const storeUserId = this.getCurrentUserIdFromStore();
          if (storeUserId) {
            this._currentUserIdCache = storeUserId;
            this._currentUserIdCacheTime = now;
            return storeUserId;
          }
          const userElement = document.querySelector(dc.sel.avatar) || document.querySelector(dc.sel.user);
          if (userElement) {
            const reactKey = this.getReactFiberKey(userElement);
            if (reactKey) {
              let fiber = userElement[reactKey];
              for (let i = 0; i < 10 && fiber; i++) {
                if ((_b = (_a = fiber.memoizedProps) == null ? void 0 : _a.user) == null ? void 0 : _b.id) return fiber.memoizedProps.user.id;
                fiber = fiber.return;
              }
            }
          }
          const fallback = this.settings.ownUserId || null;
          this._currentUserIdCache = fallback;
          this._currentUserIdCacheTime = now;
          return fallback;
        } catch (error) {
          this.debugError("GET_USER_ID", error);
          return this.settings.ownUserId || null;
        }
      },
      getMessageId(messageElement) {
        var _a, _b, _c, _d, _e;
        let messageId = messageElement.getAttribute("data-list-item-id") || messageElement.getAttribute("id");
        if (!messageId) {
          try {
            const reactKey = this.getReactFiberKey(messageElement);
            if (reactKey) {
              let fiber = messageElement[reactKey];
              for (let i = 0; i < 10 && fiber; i++) {
                if ((_b = (_a = fiber.memoizedProps) == null ? void 0 : _a.message) == null ? void 0 : _b.id) {
                  messageId = fiber.memoizedProps.message.id;
                  break;
                }
                if ((_d = (_c = fiber.memoizedState) == null ? void 0 : _c.message) == null ? void 0 : _d.id) {
                  messageId = fiber.memoizedState.message.id;
                  break;
                }
                fiber = fiber.return;
              }
            }
          } catch (e) {
          }
        }
        if (!messageId) {
          const content = ((_e = messageElement.textContent) == null ? void 0 : _e.trim()) || "";
          const timestamp = Date.now();
          const hashContent = `${content.substring(0, 100)}:${timestamp}`;
          let hash = 0;
          for (let i = 0; i < hashContent.length; i++) {
            const char = hashContent.charCodeAt(i);
            hash = (hash << 5) - hash + char;
            hash = hash & hash;
          }
          messageId = `hash_${Math.abs(hash)}`;
        }
        return messageId;
      },
      isOwnMessage(messageElement, currentUserId) {
        var _a, _b, _c, _d, _e;
        try {
          this.debugLog("IS_OWN_MESSAGE", "Checking if message is own", {
            hasCurrentUserId: !!currentUserId,
            elementClasses: ((_a = messageElement.classList) == null ? void 0 : _a.toString()) || ""
          });
          if (this.doesMessageFiberMatchAuthorId(messageElement, currentUserId)) {
            this.debugLog("IS_OWN_MESSAGE", "CONFIRMED: Detected via React props user ID match", {
              currentUserId
            });
            return true;
          }
          const usernameElement = messageElement.querySelector(dc.sel.username) || messageElement.querySelector(dc.sel.author) || messageElement.querySelector('[class*="usernameInner"]');
          if (usernameElement) {
            const usernameText = ((_b = usernameElement.textContent) == null ? void 0 : _b.trim()) || "";
            if (usernameText.toLowerCase() === "you" || usernameText.toLowerCase().startsWith("you ")) {
              this.debugLog("IS_OWN_MESSAGE", 'CONFIRMED: Detected via explicit "You" indicator', {
                usernameText
              });
              return true;
            }
          }
          const messageClasses = ((_c = messageElement.classList) == null ? void 0 : _c.toString()) || "";
          const hasOwnClass = messageClasses.includes("own") || messageElement.closest('[class*="own"]') !== null;
          const hasCozyClass = messageClasses.includes("cozy");
          const hasRightAligned = messageClasses.includes("right");
          const hasOwnTimestamp = (_e = (_d = messageElement.querySelector(dc.sel.timestamp)) == null ? void 0 : _d.classList) == null ? void 0 : _e.toString().includes("own");
          let indicatorCount = 0;
          if (hasOwnClass) indicatorCount++;
          if (hasOwnTimestamp) indicatorCount++;
          if (hasRightAligned && hasCozyClass) indicatorCount++;
          if (indicatorCount >= 2) {
            this.debugLog("IS_OWN_MESSAGE", "CONFIRMED: Multiple strong indicators", {
              hasOwnClass,
              hasOwnTimestamp,
              hasRightAligned,
              hasCozyClass,
              indicatorCount
            });
            return true;
          }
          this.debugLog("IS_OWN_MESSAGE", "NOT OWN: Insufficient indicators", {
            hasOwnClass,
            hasOwnTimestamp,
            hasRightAligned,
            hasCozyClass,
            indicatorCount,
            hasCurrentUserId: !!currentUserId
          });
          return false;
        } catch (error) {
          this.debugError("IS_OWN_MESSAGE", error);
          return false;
        }
      }
    };
  }
});

// src/SoloLevelingStats/progression-read-model.js
var require_progression_read_model = __commonJS({
  "src/SoloLevelingStats/progression-read-model.js"(exports2, module2) {
    module2.exports = {
      getBuffPercents(statKey, titleBonus, shadowBuffs) {
        const percentKey = `${statKey}Percent`;
        const rawKey = statKey === "perception" ? titleBonus.perception || 0 : titleBonus[statKey] || 0;
        const titlePercent = titleBonus[percentKey] || (rawKey ? rawKey / 100 : 0);
        let shadowPercent = 0;
        if (shadowBuffs) {
          shadowPercent = statKey === "perception" ? shadowBuffs.perception || 0 : shadowBuffs[statKey] || 0;
        }
        return { titlePercent, shadowPercent };
      },
      formatSignedPercent(value, precision = 1) {
        const numeric = Number(value);
        if (!Number.isFinite(numeric)) return "+0%";
        return `${numeric >= 0 ? "+" : ""}${(numeric * 100).toFixed(precision)}%`;
      },
      formatMultiplierDelta(multiplier, precision = 1) {
        const numeric = Number(multiplier);
        if (!Number.isFinite(numeric)) return "+0%";
        return this.formatSignedPercent(numeric - 1, precision);
      },
      getUnifiedBuffSummary() {
        var _a, _b, _c, _d, _e, _f, _g, _h, _i;
        const groups = [];
        try {
          const titleBonus = this.getActiveTitleBonus();
          const activeTitle = ((_b = (_a = this.settings) == null ? void 0 : _a.achievements) == null ? void 0 : _b.activeTitle) || null;
          const titleEntries = [];
          (titleBonus.xp || 0) > 0 && titleEntries.push({ label: "XP", value: this.formatSignedPercent(titleBonus.xp, 0) });
          (titleBonus.critChance || 0) > 0 && titleEntries.push({ label: "Crit", value: this.formatSignedPercent(titleBonus.critChance, 0) });
          const statLabels = { strength: "STR", agility: "AGI", intelligence: "INT", vitality: "VIT", perception: "PER" };
          this.STAT_KEYS.forEach((statKey) => {
            const { titlePercent } = this.getBuffPercents(statKey, titleBonus || {}, null);
            if (titlePercent > 0) {
              titleEntries.push({ label: statLabels[statKey], value: this.formatSignedPercent(titlePercent, 0) });
            }
          });
          if (titleEntries.length > 0) {
            groups.push({
              source: activeTitle ? `Title Manager \u2014 ${activeTitle}` : "Title Manager",
              entries: titleEntries
            });
          }
        } catch (_) {
        }
        try {
          const shadowBuffs = this.getEffectiveShadowArmyBuffs();
          const shadowEntries = [];
          const statLabels = { strength: "STR", agility: "AGI", intelligence: "INT", vitality: "VIT", perception: "PER" };
          this.STAT_KEYS.forEach((statKey) => {
            const value = Number((shadowBuffs == null ? void 0 : shadowBuffs[statKey]) || 0);
            if (value > 0) {
              shadowEntries.push({ label: statLabels[statKey], value: this.formatSignedPercent(value, 1) });
            }
          });
          if (shadowEntries.length > 0) {
            groups.push({ source: "Shadow Army", entries: shadowEntries });
          }
        } catch (_) {
        }
        try {
          const hiddenBlessings = ((_c = this.getHiddenBlessingBonuses) == null ? void 0 : _c.call(this)) || null;
          const blessingEntries = [];
          if (hiddenBlessings) {
            Number(hiddenBlessings.xpBonus || 0) > 0 && blessingEntries.push({ label: "XP", value: this.formatSignedPercent(hiddenBlessings.xpBonus, 1) });
            Number(hiddenBlessings.naturalGrowthMultiplier || 1) > 1 && blessingEntries.push({
              label: "Natural Growth",
              value: this.formatMultiplierDelta(hiddenBlessings.naturalGrowthMultiplier, 1)
            });
          }
          if (blessingEntries.length > 0) {
            const rankSuffix = (hiddenBlessings == null ? void 0 : hiddenBlessings.sourceRank) ? ` (${hiddenBlessings.sourceRank})` : "";
            groups.push({
              source: `Hidden Blessings \u2014 Blessing of Kandiaru${rankSuffix}`,
              entries: blessingEntries
            });
          }
        } catch (_) {
        }
        try {
          const bonuses = this.getSkillTreeBonuses() || null;
          const passiveEntries = [];
          if (bonuses) {
            Number(bonuses.xpBonus || 0) > 0 && passiveEntries.push({ label: "XP", value: this.formatSignedPercent(bonuses.xpBonus, 1) });
            Number(bonuses.critBonus || 0) > 0 && passiveEntries.push({ label: "Crit", value: this.formatSignedPercent(bonuses.critBonus, 1) });
            Number(bonuses.critDamageBonus || 0) > 0 && passiveEntries.push({
              label: "Crit Damage",
              value: this.formatSignedPercent(bonuses.critDamageBonus, 1)
            });
            Number(bonuses.questBonus || 0) > 0 && passiveEntries.push({ label: "Quest", value: this.formatSignedPercent(bonuses.questBonus, 1) });
            Number(bonuses.allStatBonus || 0) > 0 && passiveEntries.push({ label: "All Stats", value: this.formatSignedPercent(bonuses.allStatBonus, 1) });
            Number(bonuses.attackCooldownReduction || 0) > 0 && passiveEntries.push({
              label: "Attack Cooldown",
              value: `-${(Number(bonuses.attackCooldownReduction) * 100).toFixed(1)}%`
            });
            Number(bonuses.daggerThrowDamageBonus || 0) > 0 && passiveEntries.push({
              label: "Dagger Throw",
              value: this.formatSignedPercent(bonuses.daggerThrowDamageBonus, 1)
            });
            Number(bonuses.hpRegenBonus || 0) > 0 && passiveEntries.push({ label: "HP Regen", value: this.formatSignedPercent(bonuses.hpRegenBonus, 1) });
            Number(bonuses.manaRegenBonus || 0) > 0 && passiveEntries.push({ label: "Mana Regen", value: this.formatSignedPercent(bonuses.manaRegenBonus, 1) });
            Number(bonuses.debuffDurationReduction || 0) > 0 && passiveEntries.push({
              label: "Debuff Duration",
              value: `-${(Number(bonuses.debuffDurationReduction) * 100).toFixed(1)}%`
            });
            Number(bonuses.debuffResistChance || 0) > 0 && passiveEntries.push({
              label: "Debuff Resist",
              value: this.formatSignedPercent(bonuses.debuffResistChance, 1)
            });
            Number(bonuses.debuffCleanseChance || 0) > 0 && passiveEntries.push({
              label: "Cleanse Chance",
              value: this.formatSignedPercent(bonuses.debuffCleanseChance, 1)
            });
            Number(bonuses.tenacityDamageReduction || 0) > 0 && Number(bonuses.tenacityThreshold || 0) > 0 && passiveEntries.push({
              label: "Tenacity",
              value: `-${(Number(bonuses.tenacityDamageReduction) * 100).toFixed(0)}% damage <${Math.round(Number(bonuses.tenacityThreshold) * 100)}% HP`
            });
          }
          if (passiveEntries.length > 0) {
            groups.push({ source: "Skill Tree (Passive)", entries: passiveEntries });
          }
        } catch (_) {
        }
        try {
          const activeBuffs = this.getActiveSkillBuffs() || null;
          const activeEntries = [];
          if (activeBuffs) {
            Number(activeBuffs.xpMultiplier || 1) > 1 && activeEntries.push({
              label: "XP Multiplier",
              value: this.formatMultiplierDelta(activeBuffs.xpMultiplier, 1)
            });
            Number(activeBuffs.allStatMultiplier || 1) > 1 && activeEntries.push({
              label: "All Stats",
              value: this.formatMultiplierDelta(activeBuffs.allStatMultiplier, 1)
            });
            Number(activeBuffs.globalMultiplier || 1) > 1 && activeEntries.push({
              label: "Global Multiplier",
              value: this.formatMultiplierDelta(activeBuffs.globalMultiplier, 1)
            });
            Number(activeBuffs.critChanceBonus || 0) > 0 && activeEntries.push({
              label: "Crit Chance",
              value: this.formatSignedPercent(activeBuffs.critChanceBonus, 1)
            });
            activeBuffs.guaranteedCrit === true && activeEntries.push({ label: "Guaranteed Crit", value: "Active" });
          }
          if (activeEntries.length > 0) {
            groups.push({ source: "Skill Tree (Active)", entries: activeEntries });
          }
        } catch (_) {
        }
        try {
          const dungeons = (_e = (_d = this._SLUtils) == null ? void 0 : _d.getPluginInstance) == null ? void 0 : _e.call(_d, "Dungeons");
          if (dungeons) {
            let channelKey = dungeons.currentChannelKey || ((_f = dungeons.settings) == null ? void 0 : _f.userActiveDungeon) || null;
            if (!channelKey && ((_g = dungeons.activeDungeons) == null ? void 0 : _g.size) === 1) {
              channelKey = dungeons.activeDungeons.keys().next().value || null;
            }
            if (!channelKey && typeof dungeons.getChannelInfo === "function") {
              const info = dungeons.getChannelInfo();
              if ((info == null ? void 0 : info.guildId) && (info == null ? void 0 : info.channelId)) channelKey = `${info.guildId}_${info.channelId}`;
            }
            const roleEntries = [];
            const roleContext = channelKey && typeof dungeons.getRoleCombatTickContext === "function" ? dungeons.getRoleCombatTickContext(channelKey) : null;
            if (roleContext == null ? void 0 : roleContext.enabled) {
              const bossBoost = Number(roleContext.bossMarkMultiplier || 1) - 1;
              const mobBoost = Number(roleContext.mobMarkMultiplier || 1) - 1;
              const incomingReduction = 1 - Number(roleContext.incomingDamageMultiplier || 1);
              bossBoost > 0 && roleEntries.push({ label: "Boss Damage", value: this.formatSignedPercent(bossBoost, 1) });
              mobBoost > 0 && roleEntries.push({ label: "Mob Damage", value: this.formatSignedPercent(mobBoost, 1) });
              incomingReduction > 0 && roleEntries.push({ label: "Damage Taken", value: this.formatSignedPercent(-incomingReduction, 1) });
            }
            if (roleEntries.length > 0) {
              const dungeonMeta = channelKey ? (_i = (_h = dungeons.activeDungeons) == null ? void 0 : _h.get) == null ? void 0 : _i.call(_h, channelKey) : null;
              const dungeonLabel = (dungeonMeta == null ? void 0 : dungeonMeta.name) && (dungeonMeta == null ? void 0 : dungeonMeta.rank) ? `${dungeonMeta.name} [${dungeonMeta.rank}]` : null;
              groups.push({
                source: dungeonLabel ? `Dungeons \u2014 ${dungeonLabel}` : "Dungeons",
                entries: roleEntries
              });
            }
          }
        } catch (_) {
        }
        return groups;
      },
      getCurrentLevel() {
        const now = Date.now();
        if (this._cache.currentLevel && this._cache.currentLevelTime && now - this._cache.currentLevelTime < this._cache.currentLevelTTL) {
          return this._cache.currentLevel;
        }
        const totalXP = typeof this.settings.totalXP === "number" && !isNaN(this.settings.totalXP) && this.settings.totalXP >= 0 ? this.settings.totalXP : 0;
        let level = 1;
        let totalXPNeeded = 0;
        let xpForNextLevel = 0;
        const maxLevel = 1e4;
        let iterations = 0;
        while (iterations < maxLevel) {
          xpForNextLevel = this.getXPRequiredForLevel(level);
          if (totalXPNeeded + xpForNextLevel > totalXP) {
            break;
          }
          totalXPNeeded += xpForNextLevel;
          level++;
          iterations++;
        }
        if (xpForNextLevel <= 0) {
          xpForNextLevel = this.getXPRequiredForLevel(level);
        }
        const currentXP = Math.max(0, totalXP - totalXPNeeded);
        const result = {
          level,
          xp: currentXP,
          xpRequired: xpForNextLevel,
          totalXPNeeded
        };
        this._cache.currentLevel = result;
        this._cache.currentLevelTime = now;
        return result;
      },
      getRankRequirements() {
        return {
          E: { level: 1, achievements: 0, name: "E-Rank Hunter", next: "D" },
          D: { level: 10, achievements: 2, name: "D-Rank Hunter", next: "C" },
          C: { level: 25, achievements: 5, name: "C-Rank Hunter", next: "B" },
          B: { level: 50, achievements: 10, name: "B-Rank Hunter", next: "A" },
          A: { level: 100, achievements: 15, name: "A-Rank Hunter", next: "S" },
          S: { level: 200, achievements: 20, name: "S-Rank Hunter", next: "SS" },
          SS: { level: 300, achievements: 22, name: "SS-Rank Hunter", next: "SSS" },
          SSS: { level: 400, achievements: 24, name: "SSS-Rank Hunter", next: "SSS+" },
          "SSS+": { level: 500, achievements: 26, name: "SSS+-Rank Hunter", next: "NH" },
          NH: { level: 700, achievements: 28, name: "National Hunter", next: "Monarch" },
          Monarch: { level: 1e3, achievements: 30, name: "Monarch", next: "Monarch+" },
          "Monarch+": { level: 1500, achievements: 33, name: "Monarch+", next: "Shadow Monarch" },
          "Shadow Monarch": { level: 2e3, achievements: 35, name: "Shadow Monarch", next: null }
        };
      },
      getTotalEffectiveStats() {
        var _a, _b, _c;
        const now = Date.now();
        const statKeys = this.getStatKeys();
        const stats = this.settings.stats || null;
        let _smPiecesForKey = 0;
        if (this.settings.rank === "Shadow Monarch") {
          try {
            _smPiecesForKey = Number((_b = (_a = window.EquipmentManager) == null ? void 0 : _a.getEquippedSetPieceCount) == null ? void 0 : _b.call(_a, "shadow_monarch_regalia")) || 0;
          } catch (_) {
          }
        }
        let cacheKey = "";
        for (let i = 0; i < statKeys.length; i++) {
          cacheKey += ((stats == null ? void 0 : stats[statKeys[i]]) || 0) + "_";
        }
        cacheKey += (((_c = this.settings.achievements) == null ? void 0 : _c.activeTitle) || "") + "_sm" + _smPiecesForKey;
        if (this._cache.totalEffectiveStats && this._cache.totalEffectiveStatsKey === cacheKey && this._cache.totalEffectiveStatsTime && now - this._cache.totalEffectiveStatsTime < this._cache.totalEffectiveStatsTTL) {
          return this._cache.totalEffectiveStats;
        }
        if (!this.settings.stats || typeof this.settings.stats !== "object") {
          this.settings.stats = this.createEmptyStatBlock();
          this._settingsDirty = true;
          this.debugLog("STATS", "Stats object was missing, initialized with defaults (deferred save)");
        }
        const baseStats = this.normalizeStatBlock(this.settings.stats, 0);
        const titleBonus = this.getActiveTitleBonus();
        const shadowBuffs = this.getEffectiveShadowArmyBuffs();
        const equipBonuses = this.getEquipmentBonuses();
        const baseCombatKeys = /* @__PURE__ */ new Set(["attack", "defense", "critChance", "critDamage"]);
        const smSetBonus = {};
        if (this.settings.rank === "Shadow Monarch") {
          const smPieces = _smPiecesForKey;
          if (smPieces > 0) {
            const coreKeys = ["strength", "agility", "intelligence", "vitality", "perception"];
            const totalBase = coreKeys.reduce((s, k) => s + (Number(baseStats[k]) || 0), 0);
            const SM_REGALIA_BASE = 1;
            const SM_REGALIA_DIVISOR = 1e3;
            const setFraction = smPieces / 10;
            const setMultiplier = setFraction * (SM_REGALIA_BASE + totalBase / SM_REGALIA_DIVISOR);
            if (setMultiplier > 0) {
              for (const k of coreKeys) {
                smSetBonus[k] = Math.floor((Number(baseStats[k]) || 0) * setMultiplier);
              }
            }
          }
        }
        const result = this.createEmptyStatBlock();
        for (const key of statKeys) {
          const withEquip = baseStats[key] + (Number(equipBonuses[key]) || 0) + (Number(smSetBonus[key]) || 0);
          if (baseCombatKeys.has(key)) {
            result[key] = withEquip;
          } else {
            const { titlePercent, shadowPercent } = this.getBuffPercents(key, titleBonus, shadowBuffs);
            const withTitle = Math.round(withEquip * (1 + titlePercent));
            result[key] = Math.round(withTitle * (1 + shadowPercent));
          }
        }
        this._cache.totalEffectiveStats = result;
        this._cache.totalEffectiveStatsKey = cacheKey;
        this._cache.totalEffectiveStatsTime = now;
        return result;
      },
      getTotalShadowPower() {
        return this.cachedShadowPower;
      },
      clampPercentage(value) {
        return Number.isFinite(value) ? Math.min(100, Math.max(0, value)) : 0;
      },
      formatPercentWidth(value) {
        return `${this.clampPercentage(value).toFixed(2)}%`;
      },
      getLevelProgressSnapshot({ allowFallback = false, logContext = null } = {}) {
        const levelInfo = this.getCurrentLevel();
        if (levelInfo && Number.isFinite(levelInfo.xpRequired) && levelInfo.xpRequired > 0) {
          return {
            valid: true,
            source: "levelInfo",
            levelInfo,
            xp: levelInfo.xp,
            xpRequired: levelInfo.xpRequired,
            xpPercent: this.clampPercentage(levelInfo.xp / levelInfo.xpRequired * 100)
          };
        }
        if (allowFallback) {
          const fallbackXP = this.settings.xp || 0;
          const fallbackXPRequired = this.getXPRequiredForLevel(this.settings.level || 1);
          if (fallbackXPRequired > 0) {
            const xpPercent = this.clampPercentage(fallbackXP / fallbackXPRequired * 100);
            if (logContext) {
              this.debugLog(logContext, "Using fallback XP calculation", {
                fallbackXP,
                fallbackXPRequired,
                xpPercent,
                level: this.settings.level
              });
            }
            return {
              valid: true,
              source: "fallback",
              levelInfo: levelInfo || null,
              xp: fallbackXP,
              xpRequired: fallbackXPRequired,
              xpPercent
            };
          }
        }
        return {
          valid: false,
          source: "invalid",
          levelInfo: levelInfo || null,
          xp: 0,
          xpRequired: 0,
          xpPercent: 0
        };
      },
      getEventLevelInfoOrNull(logContext) {
        const snapshot = this.getLevelProgressSnapshot({ allowFallback: false });
        if (!snapshot.valid || !snapshot.levelInfo) {
          this.debugLog(logContext, "Level info not available, skipping emit");
          return null;
        }
        return snapshot.levelInfo;
      },
      buildCoreProgressPayload(levelInfo) {
        return {
          xp: levelInfo.xp,
          xpRequired: levelInfo.xpRequired,
          totalXP: this.settings.totalXP,
          levelInfo
        };
      }
    };
  }
});

// src/SoloLevelingStats/hp-mana.js
var require_hp_mana = __commonJS({
  "src/SoloLevelingStats/hp-mana.js"(exports2, module2) {
    module2.exports = {
      calculateHP(vitality, rank = "E") {
        var _a, _b, _c, _d, _e;
        const rankList = Array.isArray((_a = this.settings) == null ? void 0 : _a.ranks) && this.settings.ranks.length ? this.settings.ranks : Array.isArray((_b = this.defaultSettings) == null ? void 0 : _b.ranks) && this.defaultSettings.ranks.length ? this.defaultSettings.ranks : ["E"];
        const normalizeRankValue = (value) => String(value || "").trim();
        let resolvedRank = normalizeRankValue(rank);
        if (!rankList.includes(resolvedRank)) {
          const lowered = resolvedRank.toLowerCase();
          resolvedRank = rankList.find((entry) => String(entry).toLowerCase() === lowered) || "";
        }
        if (!rankList.includes(resolvedRank)) {
          const currentRank = normalizeRankValue((_c = this.settings) == null ? void 0 : _c.rank);
          resolvedRank = rankList.includes(currentRank) ? currentRank : rankList[0];
        }
        const safeVitalityRaw = Number(vitality);
        const safeVitality = Number.isFinite(safeVitalityRaw) ? safeVitalityRaw : 0;
        const cacheKey = `${safeVitality}_${resolvedRank}`;
        if (this._cache.hpCache.has(cacheKey)) {
          return this._cache.hpCache.get(cacheKey);
        }
        const rankIndex = Math.max(rankList.indexOf(resolvedRank), 0);
        const rankLinearStep = Number.isFinite((_d = this.settings) == null ? void 0 : _d.userRankHpLinearStep) ? this.settings.userRankHpLinearStep : 50;
        const rankCurveStep = Number.isFinite((_e = this.settings) == null ? void 0 : _e.userRankHpCurveStep) ? this.settings.userRankHpCurveStep : 35;
        const rankHpBonus = Math.max(
          0,
          Math.floor(rankIndex * rankLinearStep + rankIndex * rankIndex * rankCurveStep)
        );
        const baseHP = 100;
        const result = baseHP + safeVitality * 10 + rankHpBonus;
        if (this._cache.hpCache.size < 100) {
          this._cache.hpCache.set(cacheKey, result);
        }
        return result;
      },
      calculateMana(intelligence) {
        const skillBonuses = typeof this.getSkillTreeBonuses === "function" ? this.getSkillTreeBonuses() : null;
        const flatMana = Math.max(0, Number(skillBonuses == null ? void 0 : skillBonuses.flatMana) || 0);
        const cacheKey = `${intelligence}_${flatMana}`;
        if (this._cache.manaCache.has(cacheKey)) {
          return this._cache.manaCache.get(cacheKey);
        }
        const baseMana = 100;
        const result = baseMana + intelligence * 10 + flatMana;
        if (this._cache.manaCache.size < 100) {
          this._cache.manaCache.set(cacheKey, result);
        }
        return result;
      }
    };
  }
});

// src/SoloLevelingStats/events.js
var require_events = __commonJS({
  "src/SoloLevelingStats/events.js"(exports2, module2) {
    module2.exports = {
      on(eventName, callback) {
        if (!this.eventListeners[eventName]) {
          this.eventListeners[eventName] = [];
        }
        this.eventListeners[eventName].push(callback);
        return () => {
          const index = this.eventListeners[eventName].indexOf(callback);
          if (index > -1) {
            this.eventListeners[eventName].splice(index, 1);
          }
        };
      },
      emit(eventName, data = {}) {
        const listeners = Array.isArray(this.eventListeners[eventName]) ? this.eventListeners[eventName].slice() : [];
        listeners.forEach((callback) => {
          try {
            callback(data);
          } catch (error) {
            this.debugError("EVENT_EMIT", error, { eventName, callback: callback.name || "anonymous" });
          }
        });
        try {
          const CustomEventCtor = typeof window !== "undefined" ? window.CustomEvent : null;
          typeof (document == null ? void 0 : document.dispatchEvent) === "function" && typeof CustomEventCtor === "function" && document.dispatchEvent(
            new CustomEventCtor(`SoloLevelingStats:${eventName}`, {
              detail: data
            })
          );
        } catch (error) {
          this.debugError("EVENT_EMIT", error, { eventName, phase: "custom_event_dispatch" });
        }
      },
      emitXPChanged() {
        try {
          const levelInfo = this.getEventLevelInfoOrNull("EMIT_XP_CHANGED");
          if (!levelInfo) return;
          const xpData = {
            level: this.settings.level,
            rank: this.settings.rank,
            ...this.buildCoreProgressPayload(levelInfo)
          };
          this._chatUIDirty = true;
          this.emit("xpChanged", xpData);
        } catch (error) {
          this.debugError("EMIT_XP_CHANGED", error);
        }
      },
      emitLevelChanged(oldLevel, newLevel) {
        try {
          const levelInfo = this.getEventLevelInfoOrNull("EMIT_LEVEL_CHANGED");
          if (!levelInfo) return;
          this.emit("levelChanged", {
            oldLevel,
            newLevel,
            rank: this.settings.rank,
            ...this.buildCoreProgressPayload(levelInfo)
          });
        } catch (error) {
          this.debugError("EMIT_LEVEL_CHANGED", error);
        }
      },
      emitRankChanged(oldRank, newRank) {
        try {
          const levelInfo = this.getEventLevelInfoOrNull("EMIT_RANK_CHANGED");
          if (!levelInfo) return;
          this.emit("rankChanged", {
            oldRank,
            newRank,
            level: this.settings.level,
            ...this.buildCoreProgressPayload(levelInfo)
          });
        } catch (error) {
          this.debugError("EMIT_RANK_CHANGED", error);
        }
      }
    };
  }
});

// src/SoloLevelingStats/components.js
var require_components = __commonJS({
  "src/SoloLevelingStats/components.js"(exports2, module2) {
    function buildChatUIComponents(pluginInstance) {
      const React = BdApi.React;
      const ce = React.createElement;
      function HPManaDisplay({ compact = false, totalStatsOverride = null }) {
        const s = pluginInstance.settings;
        const totalStats = totalStatsOverride || pluginInstance.getTotalEffectiveStats();
        if (typeof pluginInstance.syncHPManaForDisplay === "function") {
          pluginInstance.syncHPManaForDisplay(totalStats);
        } else {
          pluginInstance.recomputeHPManaFromStats(totalStats);
        }
        const hpPercent = s.userHP / s.userMaxHP * 100;
        const manaPercent = s.userMana / s.userMaxMana * 100;
        const barHeight = compact ? "10px" : "12px";
        const containerMinWidth = compact ? "120px" : "0";
        const containerFlex = compact ? "1" : "1";
        const textDisplay = "block";
        const barMinWidth = compact ? "72px" : "0";
        return ce(
          "div",
          {
            className: `sls-chat-hp-mana-display${compact ? " sls-chat-hp-mana-compact" : ""}`,
            id: "sls-chat-hp-mana-display",
            style: { display: "flex", alignItems: "center", gap: compact ? "8px" : "12px", flex: "1", minWidth: "0" }
          },
          ce(
            "div",
            { style: { display: "flex", alignItems: "center", gap: "6px", flex: containerFlex, minWidth: containerMinWidth } },
            ce("div", { style: { color: "#ec4899", fontSize: "11px", fontWeight: "600", minWidth: "30px", flexShrink: "0" } }, "HP"),
            ce(
              "div",
              { style: { flex: "1", height: barHeight, minHeight: barHeight, background: "rgba(10, 10, 16, 0.98)", borderRadius: "2px", overflow: "hidden", position: "relative", minWidth: barMinWidth } },
              ce("div", { id: "sls-hp-bar-fill", style: { height: "100%", width: `${hpPercent}%`, background: "linear-gradient(90deg, #8a2be2 0%, #7b27cc 50%, #6c22b6 100%)", borderRadius: "2px", transition: "width 0.6s cubic-bezier(0.4, 0, 0.2, 1)" } })
            ),
            ce(
              "div",
              { id: "sls-hp-text", style: { color: "#b5bac1", fontSize: "10px", minWidth: "50px", textAlign: "right", flexShrink: "0", display: textDisplay } },
              `${Math.floor(s.userHP)}/${s.userMaxHP}`
            )
          ),
          ce(
            "div",
            { style: { display: "flex", alignItems: "center", gap: "6px", flex: containerFlex, minWidth: containerMinWidth } },
            ce("div", { style: { color: "#3b82f6", fontSize: "11px", fontWeight: "600", minWidth: "30px", flexShrink: "0" } }, "MP"),
            ce(
              "div",
              { id: "sls-mp-bar-container", style: { flex: "1", height: barHeight, minHeight: barHeight, background: "rgba(10, 10, 16, 0.98)", borderRadius: "2px", overflow: "hidden", position: "relative", minWidth: barMinWidth } },
              ce("div", { id: "sls-mp-bar-fill", style: { height: "100%", width: `${manaPercent}%`, background: "linear-gradient(90deg, #60a5fa 0%, #3b82f6 50%, #2563eb 100%)", borderRadius: "2px", transition: "width 0.6s cubic-bezier(0.4, 0, 0.2, 1)" } })
            ),
            ce(
              "div",
              { id: "sls-mp-text", style: { color: "#b5bac1", fontSize: "10px", minWidth: "50px", textAlign: "right", flexShrink: "0", display: textDisplay } },
              `${Math.floor(s.userMana)}/${s.userMaxMana}`
            )
          )
        );
      }
      function LevelInfo() {
        const s = pluginInstance.settings;
        const progressSnapshot = pluginInstance.getLevelProgressSnapshot({ allowFallback: true, logContext: "REACT_CHAT_UI" });
        const xpPercent = progressSnapshot.xpPercent;
        return ce(
          "div",
          { className: "sls-chat-level" },
          ce(
            "div",
            { className: "sls-chat-level-row" },
            ce("div", { className: "sls-chat-rank" }, `Rank: ${s.rank}`),
            ce("div", { className: "sls-chat-level-number" }, `Lv.${s.level}`),
            ce(
              "div",
              { className: "sls-chat-progress-bar" },
              ce("div", { className: "sls-chat-progress-fill", id: "sls-xp-progress-fill", style: { width: pluginInstance.formatPercentWidth(xpPercent) } })
            ),
            ce("div", { className: "sls-chat-shadow-power" }, `Shadow Power: ${pluginInstance.getTotalShadowPower()}`)
          )
        );
      }
      function ActiveTitle() {
        const s = pluginInstance.settings;
        if (!s.achievements.activeTitle) return null;
        const titleBonus = pluginInstance.getActiveTitleBonus();
        const buffs = [];
        const percentRules = [
          ["xp", "XP"],
          ["critChance", "Crit"],
          ["strengthPercent", "STR"],
          ["agilityPercent", "AGI"],
          ["intelligencePercent", "INT"],
          ["vitalityPercent", "VIT"],
          ["perceptionPercent", "PER"]
        ];
        percentRules.forEach(([key, label]) => {
          const value = titleBonus[key] || 0;
          if (value > 0) buffs.push(`+${(value * 100).toFixed(0)}% ${label}`);
        });
        const rawRules = [
          ["strength", "strengthPercent", "STR"],
          ["agility", "agilityPercent", "AGI"],
          ["intelligence", "intelligencePercent", "INT"],
          ["vitality", "vitalityPercent", "VIT"],
          ["perception", "perceptionPercent", "PER"]
        ];
        rawRules.forEach(([rawKey, percentKey, label]) => {
          const rawValue = titleBonus[rawKey] || 0;
          if (rawValue > 0 && !titleBonus[percentKey]) buffs.push(`+${rawValue} ${label}`);
        });
        return ce(
          "div",
          { className: "sls-chat-title-display" },
          ce("span", { className: "sls-chat-title-label" }, "Title:"),
          ce("span", { className: "sls-chat-title-name" }, s.achievements.activeTitle),
          buffs.length > 0 ? ce("span", { className: "sls-chat-title-bonus" }, buffs.join(", ")) : null
        );
      }
      function buildStatsRenderContext() {
        return {
          totalStats: pluginInstance.getTotalEffectiveStats(),
          titleBonus: pluginInstance.getActiveTitleBonus(),
          shadowBuffs: pluginInstance.getEffectiveShadowArmyBuffs()
        };
      }
      function StatsList({ totalStats }) {
        const effectiveStats = totalStats || pluginInstance.getTotalEffectiveStats();
        return ce(
          "div",
          { className: "sls-chat-stats" },
          pluginInstance.STAT_KEYS.map((key) => {
            const def = pluginInstance.STAT_METADATA[key];
            if (!def) return null;
            return ce(
              "div",
              { key, className: "sls-chat-stat-item", "data-stat": key },
              ce("span", { className: "sls-chat-stat-name" }, def.name),
              ce("span", { className: "sls-chat-stat-value" }, String(effectiveStats[key]))
            );
          })
        );
      }
      function StatsRadarGraph({ totalStats }) {
        const effectiveStats = totalStats || pluginInstance.getTotalEffectiveStats();
        const statKeys = pluginInstance.STAT_KEYS.filter((key) => Boolean(pluginInstance.STAT_METADATA[key]));
        if (!statKeys.length) return null;
        const values = statKeys.map((key) => Math.max(0, Number(effectiveStats[key]) || 0));
        const maxObserved = Math.max(...values, 1);
        const scaleSteps = [25, 50, 100, 200, 500, 1e3, 2e3, 5e3, 1e4, 2e4, 5e4, 1e5];
        let chartMax = scaleSteps.find((step) => step >= maxObserved);
        if (!chartMax) {
          const magnitude = Math.pow(10, Math.max(0, Math.floor(Math.log10(maxObserved))));
          chartMax = Math.ceil(maxObserved / magnitude) * magnitude;
        }
        const size = 200;
        const center = size / 2;
        const radius = 66;
        const labelRadius = radius + 16;
        const toPoint = (index, ratio = 1) => {
          const angle = -Math.PI / 2 + index / statKeys.length * (Math.PI * 2);
          const clamped = Math.max(0, Math.min(1, ratio));
          const x = center + Math.cos(angle) * radius * clamped;
          const y = center + Math.sin(angle) * radius * clamped;
          return [x, y];
        };
        const toLabelPoint = (index) => {
          const angle = -Math.PI / 2 + index / statKeys.length * (Math.PI * 2);
          const x = center + Math.cos(angle) * labelRadius;
          const y = center + Math.sin(angle) * labelRadius;
          return [x, y];
        };
        const formatPoints = (points) => points.map(([x, y]) => `${x.toFixed(2)},${y.toFixed(2)}`).join(" ");
        const rings = [0.25, 0.5, 0.75, 1];
        const ringPolygons = rings.map(
          (ringRatio) => formatPoints(statKeys.map((_, index) => toPoint(index, ringRatio)))
        );
        const dataPolygon = formatPoints(
          statKeys.map((_, index) => toPoint(index, values[index] / chartMax))
        );
        return ce(
          "div",
          { className: "sls-popup-radar" },
          ce("div", { className: "sls-popup-section-title" }, "Stat Radar"),
          ce(
            "div",
            { className: "sls-popup-radar-wrap" },
            ce(
              "svg",
              {
                className: "sls-popup-radar-svg",
                viewBox: `0 0 ${size} ${size}`,
                role: "img",
                "aria-label": "Stat radar chart"
              },
              ringPolygons.map(
                (points, idx) => ce("polygon", { key: `ring-${rings[idx]}`, className: "sls-popup-radar-ring", points })
              ),
              statKeys.map((key, index) => {
                const [x, y] = toPoint(index, 1);
                return ce("line", {
                  key: `axis-${key}`,
                  className: "sls-popup-radar-axis",
                  x1: center,
                  y1: center,
                  x2: x,
                  y2: y
                });
              }),
              ce("polygon", { className: "sls-popup-radar-area", points: dataPolygon }),
              statKeys.map((key, index) => {
                const [x, y] = toPoint(index, values[index] / chartMax);
                return ce("circle", { key: `node-${key}`, className: "sls-popup-radar-node", cx: x, cy: y, r: 2.4 });
              }),
              statKeys.map((key, index) => {
                var _a;
                const [x, y] = toLabelPoint(index);
                const label = ((_a = pluginInstance.STAT_METADATA[key]) == null ? void 0 : _a.name) || key.toUpperCase();
                return ce("text", { key: `label-${key}`, className: "sls-popup-radar-label", x, y }, label);
              })
            ),
            ce("div", { className: "sls-popup-radar-scale" }, `Scale max: ${Number(chartMax).toLocaleString()}`)
          )
        );
      }
      function StatButton({ statKey, onAllocate, totalStats, titleBonus, shadowBuffs }) {
        const s = pluginInstance.settings;
        const effectiveStats = totalStats || pluginInstance.getTotalEffectiveStats();
        const effectiveTitleBonus = titleBonus || pluginInstance.getActiveTitleBonus();
        const effectiveShadowBuffs = shadowBuffs || pluginInstance.getEffectiveShadowArmyBuffs();
        const stat = pluginInstance.STAT_METADATA[statKey];
        const statName = stat && stat.name || String(statKey).toUpperCase();
        const baseValue = s.stats[statKey];
        const totalValue = effectiveStats[statKey];
        const canAllocate = s.unallocatedStatPoints > 0;
        const baseTooltip = pluginInstance.buildStatTooltip(statKey, baseValue, totalValue, effectiveTitleBonus, effectiveShadowBuffs);
        const tooltip = `${baseTooltip}

Click: +1  \xB7  Shift+Click: +10  \xB7  Ctrl/Cmd+Click: +50  \xB7  Alt+Click: +ALL remaining`;
        const valueText = pluginInstance.getStatValueWithBuffsHTML(totalValue, statKey, effectiveTitleBonus, effectiveShadowBuffs);
        return ce(
          "button",
          {
            className: `sls-chat-stat-btn${canAllocate ? " sls-chat-stat-btn-available" : ""}`,
            "data-stat": statKey,
            disabled: !canAllocate,
            title: tooltip,
            onClick: (e) => {
              e.stopPropagation();
              e.preventDefault();
              if (!canAllocate) return;
              let amount = 1;
              if (e.altKey) amount = s.unallocatedStatPoints;
              else if (e.ctrlKey || e.metaKey) amount = 50;
              else if (e.shiftKey) amount = 10;
              onAllocate(statKey, amount);
            }
          },
          ce("div", { className: "sls-chat-stat-btn-name" }, statName),
          ce("div", { className: "sls-chat-stat-btn-value" }, valueText),
          canAllocate ? ce("div", { className: "sls-chat-stat-btn-plus" }, "+") : null
        );
      }
      function StatAllocation({ onAllocate, totalStats, titleBonus, shadowBuffs }) {
        const s = pluginInstance.settings;
        if (s.unallocatedStatPoints <= 0) return null;
        const allocatableKeys = pluginInstance.STAT_KEYS.filter(
          (key) => Boolean(pluginInstance.STAT_METADATA[key])
        );
        return ce(
          "div",
          { className: "sls-chat-stat-allocation" },
          ce("div", { className: "sls-chat-stat-points" }, pluginInstance.formatUnallocatedStatPointsText()),
          ce(
            "div",
            { className: "sls-chat-stat-buttons" },
            allocatableKeys.map(
              (key) => ce(StatButton, { key, statKey: key, onAllocate, totalStats, titleBonus, shadowBuffs })
            )
          )
        );
      }
      function BuffSummaryList() {
        const groups = pluginInstance.getUnifiedBuffSummary();
        return ce(
          "div",
          { className: "sls-popup-buff-summary" },
          ce("div", { className: "sls-popup-section-title" }, "Buff Summary"),
          groups.length > 0 ? groups.map(
            (group) => ce(
              "div",
              { key: group.source, className: "sls-popup-buff-group" },
              ce("div", { className: "sls-popup-buff-source" }, group.source),
              ce(
                "div",
                { className: "sls-popup-buff-entries" },
                group.entries.map(
                  (entry, idx) => ce("span", { key: `${group.source}-${entry.label}-${idx}`, className: "sls-popup-buff-entry" }, `${entry.label}: ${entry.value}`)
                )
              )
            )
          ) : ce("div", { className: "sls-popup-empty" }, "No active cross-plugin buffs detected.")
        );
      }
      function CollapsibleSection({ sectionId, title, children }) {
        const [isOpen, setIsOpen] = React.useState(false);
        return ce(
          React.Fragment,
          null,
          ce(
            "div",
            {
              className: "sls-chat-section-toggle",
              "data-section": sectionId,
              onClick: () => setIsOpen(!isOpen)
            },
            ce("span", { className: "sls-chat-section-title" }, title),
            ce("span", { className: "sls-chat-section-arrow" }, isOpen ? "" : "")
          ),
          ce("div", {
            className: "sls-chat-section",
            id: `sls-chat-${sectionId}`,
            style: { display: isOpen ? "block" : "none" }
          }, children)
        );
      }
      function ActivityGrid() {
        var _a;
        const a = ((_a = pluginInstance.settings) == null ? void 0 : _a.activity) || {};
        const messagesSent = a.messagesSent ?? 0;
        const charactersTyped = a.charactersTyped ?? 0;
        const channelsVisited = a.channelsVisited;
        const channelsCount = channelsVisited instanceof Set ? channelsVisited.size : Array.isArray(channelsVisited) ? channelsVisited.length : 0;
        const timeActive = a.timeActive ?? 0;
        const items = [
          { label: "Messages", value: messagesSent.toLocaleString() },
          { label: "Characters", value: charactersTyped.toLocaleString() },
          { label: "Channels", value: String(channelsCount) },
          { label: "Time Active", value: `${Math.round(timeActive / 60)}h ${Math.round(timeActive % 60)}m` }
        ];
        return ce(
          "div",
          { className: "sls-chat-activity-grid" },
          items.map(
            (item) => ce(
              "div",
              { key: item.label, className: "sls-chat-activity-item" },
              ce("div", { className: "sls-chat-activity-label" }, item.label),
              ce("div", { className: "sls-chat-activity-value" }, item.value)
            )
          )
        );
      }
      function QuestList() {
        const quests = pluginInstance.settings.dailyQuests.quests;
        return ce(
          React.Fragment,
          null,
          Object.entries(quests).map(([questId, quest]) => {
            const def = pluginInstance.questData[questId] || { name: questId, desc: "" };
            const cappedProgress = Math.min(quest.progress, quest.target);
            const percentage = Math.min(cappedProgress / quest.target * 100, 100);
            const progressText = quest.completed ? "Completed" : `${Math.floor(cappedProgress)}/${quest.target}`;
            return ce(
              "div",
              { key: questId, className: `sls-chat-quest-item${quest.completed ? " sls-chat-quest-complete" : ""}` },
              ce(
                "div",
                { className: "sls-chat-quest-header" },
                ce("span", { className: "sls-chat-quest-name" }, def.name),
                ce("span", { className: "sls-chat-quest-progress" }, progressText)
              ),
              ce("div", { className: "sls-chat-quest-desc" }, def.desc),
              ce(
                "div",
                { className: "sls-chat-progress-bar" },
                ce("div", { className: "sls-chat-progress-fill", style: { width: `${percentage.toFixed(1)}%` } })
              )
            );
          })
        );
      }
      function StatsPanel() {
        const [, forceUpdate] = React.useReducer((x) => x + 1, 0);
        React.useEffect(() => {
          var _a;
          (_a = pluginInstance._registerUIForceUpdate) == null ? void 0 : _a.call(pluginInstance, forceUpdate);
          return () => {
            var _a2;
            (_a2 = pluginInstance._unregisterUIForceUpdate) == null ? void 0 : _a2.call(pluginInstance, forceUpdate);
          };
        }, [forceUpdate]);
        return ce(
          "div",
          { className: "sls-chat-strip" },
          ce(HPManaDisplay, { compact: true })
        );
      }
      function StatsPopup({ onClose }) {
        const [, forceUpdate] = React.useReducer((x) => x + 1, 0);
        const renderContext = buildStatsRenderContext();
        const handleAllocate = React.useCallback((statKey, amount = 1) => {
          if (pluginInstance.allocateStatPoints(statKey, amount)) forceUpdate();
        }, []);
        React.useEffect(() => {
          var _a;
          (_a = pluginInstance._registerUIForceUpdate) == null ? void 0 : _a.call(pluginInstance, forceUpdate);
          return () => {
            var _a2;
            (_a2 = pluginInstance._unregisterUIForceUpdate) == null ? void 0 : _a2.call(pluginInstance, forceUpdate);
          };
        }, [forceUpdate]);
        return ce(
          "div",
          {
            className: "sls-stats-popup-surface",
            onClick: (e) => e.stopPropagation()
          },
          ce(
            "div",
            { className: "sls-stats-popup-header" },
            ce("div", { className: "sls-stats-popup-title" }, "Hunter Console"),
            ce("button", {
              className: "sls-stats-popup-close",
              onClick: (e) => {
                e.preventDefault();
                e.stopPropagation();
                onClose == null ? void 0 : onClose();
              }
            }, "\xD7")
          ),
          ce(
            "div",
            { className: "sls-stats-popup-content" },
            ce(HPManaDisplay, { compact: false, totalStatsOverride: renderContext.totalStats }),
            ce(LevelInfo),
            ce(ActiveTitle),
            ce(StatsList, { totalStats: renderContext.totalStats }),
            ce(StatsRadarGraph, { totalStats: renderContext.totalStats }),
            ce(StatAllocation, {
              onAllocate: handleAllocate,
              totalStats: renderContext.totalStats,
              titleBonus: renderContext.titleBonus,
              shadowBuffs: renderContext.shadowBuffs
            }),
            ce(BuffSummaryList),
            ce(
              CollapsibleSection,
              { sectionId: "activity", title: "Activity Summary" },
              ce(ActivityGrid)
            ),
            ce(
              CollapsibleSection,
              { sectionId: "quests", title: "Daily Quests" },
              ce(QuestList)
            )
          )
        );
      }
      return {
        StatsPanel,
        StatsPopup,
        HPManaDisplay,
        LevelInfo,
        ActiveTitle,
        StatsList,
        StatsRadarGraph,
        StatAllocation,
        BuffSummaryList,
        ActivityGrid,
        QuestList
      };
    }
    module2.exports = buildChatUIComponents;
  }
});

// src/shared/tracked-timers.js
var require_tracked_timers = __commonJS({
  "src/shared/tracked-timers.js"(exports2, module2) {
    function createTrackedTimers() {
      const timeoutIds = /* @__PURE__ */ new Set();
      const intervalIds = /* @__PURE__ */ new Set();
      return {
        setTimeout(fn, delay) {
          const id = setTimeout(() => {
            timeoutIds.delete(id);
            fn();
          }, delay);
          timeoutIds.add(id);
          return id;
        },
        clearTimeout(id) {
          clearTimeout(id);
          timeoutIds.delete(id);
        },
        setInterval(fn, delay) {
          const id = setInterval(fn, delay);
          intervalIds.add(id);
          return id;
        },
        clearInterval(id) {
          clearInterval(id);
          intervalIds.delete(id);
        },
        clearAll() {
          timeoutIds.forEach((id) => clearTimeout(id));
          timeoutIds.clear();
          intervalIds.forEach((id) => clearInterval(id));
          intervalIds.clear();
        }
      };
    }
    module2.exports = { createTrackedTimers };
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
var require_channel_context2 = __commonJS({
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
        const path = String(window.location.pathname || "");
        const m = path.match(/^\/channels\/(?:@me|\d+)\/(\d+)/);
        const ChannelStore = Webpack == null ? void 0 : Webpack.getStore("ChannelStore");
        const ch = m && m[1] ? (_a = ChannelStore == null ? void 0 : ChannelStore.getChannel) == null ? void 0 : _a.call(ChannelStore, m[1]) : null;
        out.paths.urlBased = {
          url: path,
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
        const path = String(window.location.pathname || "");
        const m = path.match(/^\/channels\/@me\/(\d+)/);
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
        const path = String(window.location.pathname || "");
        if (path === "/channels/@me" || path === "/channels/@me/") return true;
        if (/^\/channels\/@me(\?|$)/.test(path)) return true;
        if (!path.startsWith("/channels/")) return true;
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

// src/SoloLevelingStats/lifecycle.js
var require_lifecycle = __commonJS({
  "src/SoloLevelingStats/lifecycle.js"(exports2, module2) {
    var buildChatUIComponents = require_components();
    var dc = require_discord_classes();
    var { createTrackedTimers } = require_tracked_timers();
    var { installChatLayerBodyAttr } = require_channel_context2();
    module2.exports = {
      _loadSLUtils() {
        this._SLUtils = this._SLUtils || window.SoloLevelingUtils || null;
      },
      async start() {
        var _a, _b, _c;
        try {
          this._uninstallChatLayerAttr = installChatLayerBodyAttr();
        } catch (_) {
          this._uninstallChatLayerAttr = null;
        }
        let bootstrapSettingsChanged = false;
        try {
          if (this._isRunning) {
            this.stop();
          }
          this.debugLog("START", "Plugin starting...");
          this._timers = createTrackedTimers();
          this.pluginStartTime = Date.now();
          this._isRunning = true;
          const sessionToken = ++this._sessionToken;
          this._loadSLUtils();
          this._chatUIComponents = buildChatUIComponents(this);
          this.debugLog("START", "Plugin start time recorded", { startTime: this.pluginStartTime });
          const bindIfExists = (methodName, wait, throttleOrDebounce) => {
            const method = this[methodName];
            const noOp = () => this.debugLog("BIND_SKIP", `Method ${methodName} not found`);
            return method ? throttleOrDebounce(method.bind(this), wait) : noOp;
          };
          this.throttled.checkDailyReset = bindIfExists(
            "checkDailyReset",
            500,
            this.throttle.bind(this)
          );
          this.debounced.saveSettings = bindIfExists("saveSettings", 1e3, this.debounce.bind(this));
          this.debugLog("START", "Performance optimizations initialized");
          if (this.saveManager) {
            try {
              await this.saveManager.init();
              this.debugLog("START", "UnifiedSaveManager initialized (IndexedDB)");
            } catch (error) {
              this.debugError("START", "Failed to initialize UnifiedSaveManager", error);
              this.saveManager = null;
            }
          }
          this._startupLoadComplete = false;
          this._startupProgressProbeComplete = false;
          this._hasRealProgress = false;
          await this.loadSettings();
          if (this._sessionToken !== sessionToken) return;
          this.debugLog("START", "Settings loaded", {
            level: this.settings.level,
            rank: this.settings.rank,
            totalXP: this.settings.totalXP
          });
          this._reconcileUnallocatedStatPoints();
          if (!this.settings.activity.lastActiveTime) {
            this.settings.activity.lastActiveTime = Date.now();
            bootstrapSettingsChanged = true;
          }
          if (!this.settings.activity.sessionStartTime) {
            this.settings.activity.sessionStartTime = Date.now();
            bootstrapSettingsChanged = true;
          }
          if (!this.settings.dailyQuests.lastResetDate) {
            this.settings.dailyQuests.lastResetDate = (/* @__PURE__ */ new Date()).toDateString();
            bootstrapSettingsChanged = true;
          }
          if (!this.settings.rank) {
            this.settings.rank = "E";
            bootstrapSettingsChanged = true;
          }
          if (!this.settings.rankHistory) {
            this.settings.rankHistory = [];
            bootstrapSettingsChanged = true;
          }
          this.checkRankPromotion();
          this.debugLog("START", "Plugin started successfully");
          this.registerBackupConsoleHooks();
          const shadowArmyInstance = (_b = (_a = this._SLUtils) == null ? void 0 : _a.getPluginInstance) == null ? void 0 : _b.call(_a, "ShadowArmy");
          const shadowArmyCachedPower = (_c = shadowArmyInstance == null ? void 0 : shadowArmyInstance.settings) == null ? void 0 : _c.cachedTotalPower;
          if (shadowArmyCachedPower !== void 0 && shadowArmyCachedPower > 0) {
            this.cachedShadowPower = shadowArmyCachedPower.toLocaleString();
            if (this.settings.cachedShadowPower !== this.cachedShadowPower) {
              this.settings.cachedShadowPower = this.cachedShadowPower;
              bootstrapSettingsChanged = true;
            }
            this.debugLog("START", "Loaded shadow power from ShadowArmy cache", {
              cachedShadowPower: this.cachedShadowPower,
              source: "ShadowArmy"
            });
          } else {
            this.cachedShadowPower = this.settings.cachedShadowPower || "0";
            this.debugLog("START", "Loaded cached shadow power from settings", {
              cachedShadowPower: this.cachedShadowPower,
              source: "SoloLevelingStats"
            });
          }
          if (typeof this.updateShadowPower === "function") {
            this.updateShadowPower().catch((error) => {
              this.debugError("START", "Failed to initialize shadow power", error);
            });
          }
          if (typeof this.initEquipmentIntegration === "function") {
            this.initEquipmentIntegration();
          }
          this._shadowExtractedHandler = () => {
            var _a2;
            (_a2 = this.updateShadowPower) == null ? void 0 : _a2.call(this);
          };
          document.addEventListener("shadowExtracted", this._shadowExtractedHandler);
          this.periodicSaveInterval = this._timers.setInterval(() => {
            if (this._settingsDirty) {
              this.debugLog("PERIODIC_SAVE", "Backup auto-save triggered");
              this.saveSettings();
            }
          }, this.saveInterval);
          if (typeof this.getSettingsPanel !== "function") {
            this.debugError("DEBUG", new Error("getSettingsPanel() method NOT FOUND!"));
          }
        } catch (error) {
          this.debugError("START", error, { phase: "initialization" });
        }
        const levelInfo = this.getCurrentLevel();
        if (this.settings.level !== levelInfo.level) {
          this.settings.level = levelInfo.level;
          this.settings.xp = levelInfo.xp;
          bootstrapSettingsChanged = true;
        }
        const vitality = this.settings.stats.vitality || 0;
        const intelligence = this.settings.stats.intelligence || 0;
        const userRank = this.settings.rank || "E";
        if (!Number.isFinite(this.settings.userMaxHP)) {
          this.settings.userMaxHP = this.calculateHP(vitality, userRank);
          this.settings.userHP = this.settings.userMaxHP;
          bootstrapSettingsChanged = true;
        }
        if (!Number.isFinite(this.settings.userMaxMana)) {
          this.settings.userMaxMana = this.calculateMana(intelligence);
          this.settings.userMana = this.settings.userMaxMana;
          bootstrapSettingsChanged = true;
        }
        this.checkDailyReset();
        this.trackChannelVisit();
        this.startChannelTracking();
        this.startActivityTracking();
        this.startObserving();
        this.startAutoSave();
        this.cleanupUnwantedTitles();
        if (!this._hasRealProgress) {
          this.revalidateUnlockedAchievements();
        }
        this.applyRetroactiveNaturalStatGrowth();
        this.integrateWithCriticalHit();
        try {
          this.createChatUI();
        } catch (error) {
          this.debugError("CREATE_CHAT_UI", error);
          if (this._createChatUIStartupRetryTimeout) {
            clearTimeout(this._createChatUIStartupRetryTimeout);
          }
          this._createChatUIStartupRetryTimeout = this._timers.setTimeout(() => {
            this._createChatUIStartupRetryTimeout = null;
            if (!this._isRunning) return;
            try {
              this.createChatUI();
            } catch (retryError) {
              this.debugError("CREATE_CHAT_UI_RETRY", retryError);
            }
          }, 2e3);
        }
        this.ensureHeaderStatsButton();
        if (bootstrapSettingsChanged) {
          this.saveSettings();
        }
        this.debugLog("START", `Started! Level ${this.settings.level}, ${this.settings.xp} XP`);
        this.debugLog("START", `Rank ${this.settings.rank}, Total XP: ${this.settings.totalXP}`);
        this.emitXPChanged();
        if (typeof this._xpChangedUnsub === "function") {
          try {
            this._xpChangedUnsub();
          } catch (_) {
          }
        }
        const _hudRefresh = () => {
          try {
            this.updateChatUI();
          } catch (error) {
            this.debugError("XP_CHANGED_LISTENER", "Error updating UI on XP/level/rank change", error);
          }
        };
        const _unsubXP = this.on("xpChanged", _hudRefresh);
        const _unsubLevel = this.on("levelChanged", _hudRefresh);
        const _unsubRank = this.on("rankChanged", _hudRefresh);
        this._xpChangedUnsub = () => {
          _unsubXP();
          _unsubLevel();
          _unsubRank();
        };
      },
      stop() {
        var _a, _b, _c, _d;
        this._isRunning = false;
        if (typeof this._uninstallChatLayerAttr === "function") {
          try {
            this._uninstallChatLayerAttr();
          } catch (_) {
          }
          this._uninstallChatLayerAttr = null;
        }
        this._shadowBuffsRefreshPromise = null;
        this._shadowBuffsRefreshAt = 0;
        this._fileBackupFailureToastShown = false;
        this._totalPowerFailureToastShown = false;
        (_a = this._timers) == null ? void 0 : _a.clearAll();
        this._timers = null;
        if (this._createChatUIStartupRetryTimeout) {
          clearTimeout(this._createChatUIStartupRetryTimeout);
          this._createChatUIStartupRetryTimeout = null;
        }
        if (this.levelUpDebounceTimeout) {
          clearTimeout(this.levelUpDebounceTimeout);
          this.levelUpDebounceTimeout = null;
        }
        this.pendingLevelUp = null;
        (_b = this.teardownMessageDispatcher) == null ? void 0 : _b.call(this);
        if (this.messageObserver) {
          this.messageObserver.disconnect();
          this.messageObserver = null;
        }
        if (this._mutationDebounceTimer) {
          clearTimeout(this._mutationDebounceTimer);
          this._mutationDebounceTimer = null;
        }
        this._pendingMutationNodes = [];
        if (this.processedMessageIds) {
          this.processedMessageIds.clear();
          this.processedMessageIds = null;
        }
        if (this.recentMessages) {
          this.recentMessages.clear();
          this.recentMessages = null;
        }
        if (this._startObservingRetryTimeout) {
          clearTimeout(this._startObservingRetryTimeout);
          this._startObservingRetryTimeout = null;
        }
        if (this._setupInputRetryTimeout) {
          clearTimeout(this._setupInputRetryTimeout);
          this._setupInputRetryTimeout = null;
        }
        if (this._messageProcessTimeouts) {
          this._messageProcessTimeouts.forEach((id) => clearTimeout(id));
          this._messageProcessTimeouts.clear();
        }
        if (this._statAllocationTimeout) {
          clearTimeout(this._statAllocationTimeout);
          this._statAllocationTimeout = null;
        }
        if (this._statAllocationQueue) {
          this._statAllocationQueue.length = 0;
        }
        if (this._saveSettingsTimer) {
          clearTimeout(this._saveSettingsTimer);
          this._saveSettingsTimer = null;
          this._settingsDirty = false;
        }
        if (this.activityTracker) {
          clearInterval(this.activityTracker);
          this.activityTracker = null;
        }
        this.periodicSaveInterval = null;
        if (this._autoSaveHandlers) {
          window.removeEventListener("beforeunload", this._autoSaveHandlers.beforeUnloadHandler);
          document.removeEventListener(
            "visibilitychange",
            this._autoSaveHandlers.visibilityChangeHandler
          );
          this._autoSaveHandlers = null;
        }
        if (this._channelTrackingStore && this._channelTrackingStoreListener) {
          try {
            this._channelTrackingStore.removeChangeListener(this._channelTrackingStoreListener);
          } catch (_) {
          }
          this._channelTrackingStore = null;
          this._channelTrackingStoreListener = null;
          this.debugLog("STOP", "Channel tracking stopped");
        }
        if (this._navBusUnsub) {
          this._navBusUnsub();
          this._navBusUnsub = null;
        }
        this._channelTrackingHooks = null;
        this._channelTrackingState = null;
        this._channelInfoCacheUrl = null;
        this._channelInfoCache = null;
        this._messageInputElCache = null;
        this.debugLog("STOP", "Channel tracking listeners/hooks restored");
        if (this.messageInputHandler) {
          const messageInput = this.messageInputHandler.element || document.querySelector(dc.sel.slateTextArea) || document.querySelector(dc.sel.textArea) || document.querySelector('textarea[placeholder*="Message"]');
          if (messageInput && this.messageInputHandler.handleKeyDown) {
            messageInput.removeEventListener("keydown", this.messageInputHandler.handleKeyDown, true);
            messageInput.removeEventListener("input", this.messageInputHandler.handleInput, true);
          }
          if (messageInput && this.messageInputHandler.handlePaste) {
            messageInput.removeEventListener("paste", this.messageInputHandler.handlePaste, true);
          }
          if (this.messageInputHandler.observer) {
            this.messageInputHandler.observer.disconnect();
          }
          this.messageInputHandler = null;
        }
        this.removeChatUI();
        this.webpackModules = {
          UserStore: null,
          ChannelStore: null
        };
        if (this.shadowPowerObserver) {
          this.shadowPowerObserver.disconnect();
          this.shadowPowerObserver = null;
        }
        if (this.shadowPowerUpdateTimeout) {
          clearTimeout(this.shadowPowerUpdateTimeout);
          this.shadowPowerUpdateTimeout = null;
        }
        if (this._shadowExtractedHandler) {
          document.removeEventListener("shadowExtracted", this._shadowExtractedHandler);
          this._shadowExtractedHandler = null;
        }
        if (typeof this.cleanupEquipmentIntegration === "function") {
          this.cleanupEquipmentIntegration();
        }
        if (this.userHPBarPositionUpdater) {
          clearInterval(this.userHPBarPositionUpdater);
          this.userHPBarPositionUpdater = null;
        }
        if (this.panelWatcher) {
          this.panelWatcher.disconnect();
          this.panelWatcher = null;
        }
        if (this.userHPBar) {
          this.userHPBar = null;
        }
        if (this._activityTrackingHandlers) {
          document.removeEventListener("mousemove", this._activityTrackingHandlers.mousemove);
          this._activityTrackingHandlers = null;
        }
        if (typeof this._activityKeydownUnsub === "function") {
          try {
            this._activityKeydownUnsub();
          } catch (_) {
          }
          this._activityKeydownUnsub = null;
        }
        if (this._activityTimeout) {
          clearTimeout(this._activityTimeout);
          this._activityTimeout = null;
        }
        if (typeof this._xpChangedUnsub === "function") {
          try {
            this._xpChangedUnsub();
          } catch (_) {
          }
          this._xpChangedUnsub = null;
        }
        document.querySelectorAll(".sls-quest-celebration, .sls-quest-particle").forEach((el) => {
          if (el._removeTimeout) {
            clearTimeout(el._removeTimeout);
          }
          el.remove();
        });
        (_c = this.clearLevelUpAnimationTimeouts) == null ? void 0 : _c.call(this);
        this._levelUpAnimationQueue && (this._levelUpAnimationQueue.length = 0);
        this._levelUpAnimationInFlight = false;
        (_d = document.getElementById("sls-levelup-overlay")) == null ? void 0 : _d.remove();
        if (this._questCelebrations) {
          this._questCelebrations.forEach((celebration) => {
            if (celebration._removeTimeout) {
              clearTimeout(celebration._removeTimeout);
            }
            if (celebration._progressInterval) {
              clearInterval(celebration._progressInterval);
            }
            if (celebration && celebration.parentNode) {
              celebration.remove();
            }
          });
          this._questCelebrations.clear();
        }
        if (this.pendingLevelUp) {
          this.pendingLevelUp = null;
        }
        try {
          const snapshotForBdApi = this._createCleanSettingsForSave();
          BdApi.Data.save("SoloLevelingStats", "settings", snapshotForBdApi);
          this.debugLog("STOP", "Sync snapshot to BdApi.Data committed", {
            level: snapshotForBdApi.level,
            xp: snapshotForBdApi.xp,
            totalXP: snapshotForBdApi.totalXP
          });
        } catch (snapErr) {
          this.debugError("STOP", "Sync BdApi.Data snapshot failed", snapErr);
        }
        this.saveSettings(true);
        this._detachSettingsPanelHandlers();
        if (this._settingsPreviewRoot) {
          try {
            this._settingsPreviewRoot.unmount();
          } catch (error) {
            this.debugError("STOP", error, { phase: "unmount-settings-preview-root" });
          }
          this._settingsPreviewRoot = null;
        }
        this.debugLog("STOP", "Plugin stopped");
      },
      _detachSettingsPanelHandlers() {
        var _a, _b;
        if (this._settingsPanelRoot && ((_a = this._settingsPanelHandlers) == null ? void 0 : _a.change)) {
          try {
            this._settingsPanelRoot.removeEventListener("change", this._settingsPanelHandlers.change);
          } catch (_) {
          }
        }
        if (this._settingsPanelRoot && ((_b = this._settingsPanelHandlers) == null ? void 0 : _b.click)) {
          try {
            this._settingsPanelRoot.removeEventListener("click", this._settingsPanelHandlers.click);
          } catch (_) {
          }
        }
        this._settingsPanelRoot = null;
        this._settingsPanelHandlers = null;
      }
    };
  }
});

// src/SoloLevelingStats/webpack-integration.js
var require_webpack_integration = __commonJS({
  "src/SoloLevelingStats/webpack-integration.js"(exports2, module2) {
    module2.exports = {
      getCurrentUserIdFromStore() {
        try {
          let store = this.webpackModules && this.webpackModules.UserStore;
          if (!store && BdApi.Webpack && typeof BdApi.Webpack.getStore === "function") {
            store = BdApi.Webpack.getStore("UserStore");
            if (store && this.webpackModules) {
              this.webpackModules.UserStore = store;
            }
          }
          if (store) {
            const user = store.getCurrentUser();
            if (user && user.id) {
              this.currentUserId = user.id;
              this.settings.ownUserId = user.id;
              this.debugLog("USER_STORE", "Current user ID retrieved", { userId: user.id });
              return user.id;
            }
          }
        } catch (error) {
          this.debugError("USER_STORE", error);
        }
        return null;
      },
      addProcessedMessageId(messageId) {
        if (!messageId) return;
        this.processedMessageIds = this.processedMessageIds || /* @__PURE__ */ new Set();
        this.processedMessageIds.add(messageId);
        const MAX_PROCESSED_MESSAGE_IDS = 5e3;
        if (this.processedMessageIds.size <= MAX_PROCESSED_MESSAGE_IDS) return;
        const keepCount = Math.floor(MAX_PROCESSED_MESSAGE_IDS * 0.6);
        const trimmed = Array.from(this.processedMessageIds).slice(-keepCount);
        this.processedMessageIds = new Set(trimmed);
      }
    };
  }
});

// src/SoloLevelingStats/criticalhit-integration.js
var require_criticalhit_integration = __commonJS({
  "src/SoloLevelingStats/criticalhit-integration.js"(exports2, module2) {
    var dc = require_discord_classes();
    module2.exports = {
      checkDailyReset() {
        const today = (/* @__PURE__ */ new Date()).toDateString();
        if (this.settings.dailyQuests.lastResetDate !== today) {
          this.settings.dailyQuests.lastResetDate = today;
          Object.keys(this.settings.dailyQuests.quests).forEach((questId) => {
            this.settings.dailyQuests.quests[questId].progress = 0;
            this.settings.dailyQuests.quests[questId].completed = false;
          });
          this.saveSettings(true);
          this.debugLog("DAILY_QUESTS", "Daily quests reset");
        }
      },
      checkCriticalHitBonus() {
        var _a, _b, _c, _d, _e, _f, _g;
        try {
          this._cache.lastAppliedCritBurst = null;
          const getMessageContainerElement = () => this.getMessageContainer();
          const findMessageElementById = (messageId) => {
            var _a2, _b2;
            if (!messageId) return null;
            const cssEscape = typeof window !== "undefined" && window.CSS && typeof window.CSS.escape === "function" ? window.CSS.escape : null;
            const safe = cssEscape ? cssEscape(String(messageId)) : String(messageId).replace(/\\/g, "\\\\").replace(/"/g, '\\"');
            const container = getMessageContainerElement() || document;
            return ((_a2 = container.querySelector) == null ? void 0 : _a2.call(container, `[data-list-item-id*="${safe}"]`)) || ((_b2 = container.querySelector) == null ? void 0 : _b2.call(container, `#${safe}`)) || null;
          };
          const findLatestOwnMessageElement = (limit = 25) => {
            var _a2, _b2;
            const container = getMessageContainerElement();
            if (!container) return null;
            const nodes = Array.from(((_a2 = container.querySelectorAll) == null ? void 0 : _a2.call(container, dc.sel.message)) || []);
            if (!nodes.length) return null;
            const currentUserId = this.currentUserId || ((_b2 = this.settings) == null ? void 0 : _b2.ownUserId) || null;
            return nodes.slice(-limit).reverse().find((el) => {
              var _a3;
              return (_a3 = this.isOwnMessage) == null ? void 0 : _a3.call(this, el, currentUserId);
            });
          };
          const cachedLast = this.lastMessageElement;
          const lastMessageElement = cachedLast && cachedLast.isConnected ? cachedLast : this.lastMessageId && findMessageElementById(this.lastMessageId) || findLatestOwnMessageElement();
          if (lastMessageElement) {
            this.lastMessageElement = lastMessageElement;
            this.lastMessageId = this.lastMessageId || this.getMessageId(lastMessageElement);
          }
          const isCrit = !!(lastMessageElement && ((_a = lastMessageElement.classList) == null ? void 0 : _a.contains("bd-crit-hit")));
          if (!isCrit) {
            return 0;
          }
          const agilityStat = ((_b = this.settings.stats) == null ? void 0 : _b.agility) || 0;
          const agilityBonus = Math.min(0.75, agilityStat * 6e-3);
          const baseCritBonus = 0.2;
          let critMultiplier = baseCritBonus + agilityBonus;
          try {
            const now = Date.now();
            const cachedComboData = (_c = this._cache) == null ? void 0 : _c.criticalHitComboData;
            const cachedComboDataTime = ((_d = this._cache) == null ? void 0 : _d.criticalHitComboDataTime) || 0;
            const comboTTL = ((_e = this._cache) == null ? void 0 : _e.criticalHitComboDataTTL) ?? 500;
            const comboData = now - cachedComboDataTime < comboTTL ? cachedComboData : (() => {
              var _a2, _b2, _c2, _d2, _e2, _f2, _g2, _h, _i;
              try {
                let liveCombo = null;
                try {
                  const chPlugin = BdApi.Plugins.isEnabled("CriticalHit") && BdApi.Plugins.get("CriticalHit");
                  const chInstance = chPlugin == null ? void 0 : chPlugin.instance;
                  if (chInstance == null ? void 0 : chInstance.getUserCombo) {
                    const userId = ((_d2 = (_c2 = (_b2 = (_a2 = this.webpackModules) == null ? void 0 : _a2.UserStore) == null ? void 0 : _b2.getCurrentUser) == null ? void 0 : _c2.call(_b2)) == null ? void 0 : _d2.id) || ((_i = (_h = (_g2 = (_f2 = (_e2 = BdApi.Webpack) == null ? void 0 : _e2.getStore) == null ? void 0 : _f2.call(_e2, "UserStore")) == null ? void 0 : _g2.getCurrentUser) == null ? void 0 : _h.call(_g2)) == null ? void 0 : _i.id);
                    liveCombo = userId ? chInstance.getUserCombo(userId) : null;
                  }
                } catch (_) {
                }
                const loaded = {
                  combo: liveCombo,
                  burst: BdApi.Data.load("CriticalHit", "lastCritBurst")
                };
                this._cache.criticalHitComboData = loaded;
                this._cache.criticalHitComboDataTime = now;
                return loaded;
              } catch (_error) {
                this._cache.criticalHitComboData = null;
                this._cache.criticalHitComboDataTime = now;
                return null;
              }
            })();
            const comboCount = ((_f = comboData == null ? void 0 : comboData.combo) == null ? void 0 : _f.comboCount) || 1;
            const burstData = (comboData == null ? void 0 : comboData.burst) || null;
            let burstHits = Math.max(1, Number((burstData == null ? void 0 : burstData.burstHits) || comboCount || 1));
            if ((burstData == null ? void 0 : burstData.messageId) && this.lastMessageId && String(burstData.messageId) !== String(this.lastMessageId)) {
              burstHits = 1;
            }
            if (burstHits > 1) {
              const effectiveBurstHits = Math.min(40, burstHits);
              const logGain = Math.log2(effectiveBurstHits + 1) * 0.045;
              const chainGain = (Math.min(12, effectiveBurstHits) - 1) * 8e-3;
              const burstBonus = Math.min(0.45, logGain + chainGain);
              critMultiplier += burstBonus;
              const agilityBurstEnhancement = burstBonus * Math.min(0.12, agilityStat * 1e-3);
              critMultiplier += agilityBurstEnhancement;
              this._cache.lastAppliedCritBurst = {
                burstHits,
                effectiveBurstHits,
                burstBonus,
                agilityBurstEnhancement,
                messageId: this.lastMessageId || null,
                timestamp: now
              };
              this.debugLog("CHECK_CRIT_BONUS", "Burst detected", {
                burstHits,
                effectiveBurstHits,
                burstBonus: (burstBonus * 100).toFixed(1) + "%",
                agilityBurstEnhancement: (agilityBurstEnhancement * 100).toFixed(1) + "%",
                totalBurstBonus: ((burstBonus + agilityBurstEnhancement) * 100).toFixed(1) + "%"
              });
            }
          } catch (error) {
            (_g = this.debugError) == null ? void 0 : _g.call(this, "CHECK_CRIT_BONUS_BURST", error);
          }
          critMultiplier = Math.min(1.35, critMultiplier);
          this.debugLog("CHECK_CRIT_BONUS", "Crit bonus calculated", {
            baseCritBonus: (baseCritBonus * 100).toFixed(0) + "%",
            agilityStat,
            agilityBonus: (agilityBonus * 100).toFixed(1) + "%",
            totalMultiplier: (critMultiplier * 100).toFixed(1) + "%"
          });
          return critMultiplier;
        } catch (error) {
          this.debugError("CHECK_CRIT_BONUS", error);
        }
        return 0;
      },
      integrateWithCriticalHit() {
        let cappedCritBonus = 0;
        let enhancedAgilityBonus = 0;
        let baseAgilityBonus = 0;
        let titleCritBonus = 0;
        let agilityStat = 0;
        try {
          if (!this.settings || !this.settings.stats) {
            this.debugError("SAVE_AGILITY_BONUS", new Error("Settings or stats not initialized"));
            return;
          }
          agilityStat = this.settings.stats.agility || 0;
          baseAgilityBonus = agilityStat * 0.02;
          const titleBonus = this.getActiveTitleBonus();
          titleCritBonus = titleBonus.critChance || 0;
          const totalCritChance = Math.min(baseAgilityBonus + titleCritBonus, 0.5);
          cappedCritBonus = totalCritChance;
          enhancedAgilityBonus = baseAgilityBonus;
          const agilityData = {
            bonus: isNaN(cappedCritBonus) ? 0 : Number(cappedCritBonus.toFixed(6)),
            baseBonus: isNaN(baseAgilityBonus) ? 0 : Number(baseAgilityBonus.toFixed(6)),
            titleCritBonus: isNaN(titleCritBonus) ? 0 : Number(titleCritBonus.toFixed(6)),
            agility: agilityStat,
            capped: totalCritChance >= 0.5
            // Indicate if it was capped at 50%
          };
          const agilityKey = `${agilityData.bonus}|${agilityData.baseBonus}|${agilityData.titleCritBonus}|${agilityData.agility}|${agilityData.capped}`;
          if (agilityKey !== this._lastAgilityBonusSaved) {
            BdApi.Data.save("SoloLevelingStats", "agilityBonus", agilityData);
            this._lastAgilityBonusSaved = agilityKey;
          }
          if (cappedCritBonus > 0) {
            const bonusParts = [];
            if (enhancedAgilityBonus > 0)
              bonusParts.push(`Agility: +${(enhancedAgilityBonus * 100).toFixed(1)}%`);
            if (titleCritBonus > 0) bonusParts.push(`Title: +${(titleCritBonus * 100).toFixed(1)}%`);
            this.debugLog(
              "AGILITY_BONUS",
              `Crit bonus available for CriticalHit: +${(cappedCritBonus * 100).toFixed(
                1
              )}% (${bonusParts.join(", ")})`
            );
          }
          try {
            const perceptionProfile = this.getPerceptionBurstProfile();
            const perceptionData = {
              perception: perceptionProfile.perception,
              effectivePerception: perceptionProfile.perception,
              burstChance: Number(perceptionProfile.burstChance.toFixed(6)),
              maxHits: perceptionProfile.maxHits,
              jackpotChance: Number(perceptionProfile.jackpotChance.toFixed(6)),
              updatedAt: Date.now()
            };
            const perceptionKey = `${perceptionData.perception}|${perceptionData.burstChance}|${perceptionData.maxHits}|${perceptionData.jackpotChance}`;
            if (perceptionKey !== this._lastPerceptionBurstSaved) {
              BdApi.Data.save("SoloLevelingStats", "perceptionBurst", perceptionData);
              this._lastPerceptionBurstSaved = perceptionKey;
            }
            const luckKey = `${perceptionProfile.perception}`;
            if (luckKey !== this._lastLuckBonusSaved) {
              BdApi.Data.save("SoloLevelingStats", "luckBonus", {
                bonus: 0,
                perception: perceptionProfile.perception,
                luck: perceptionProfile.perception,
                luckBuffs: [],
                totalBuffPercent: 0
              });
              this._lastLuckBonusSaved = luckKey;
            }
            this.debugLog("PERCEPTION_BURST", "Perception burst profile synced for CriticalHit", {
              perception: perceptionProfile.perception,
              burstChance: `${(perceptionProfile.burstChance * 100).toFixed(1)}%`,
              maxHits: perceptionProfile.maxHits,
              jackpotChance: `${(perceptionProfile.jackpotChance * 100).toFixed(2)}%`
            });
          } catch (error) {
            this.debugError("SAVE_PERCEPTION_BURST", error);
          }
        } catch (error) {
          this.debugError("SAVE_AGILITY_BONUS", error);
        }
      },
      saveAgilityBonus() {
        this.integrateWithCriticalHit();
      }
    };
  }
});

// src/SoloLevelingStats/migration-compat.js
var require_migration_compat = __commonJS({
  "src/SoloLevelingStats/migration-compat.js"(exports2, module2) {
    module2.exports = {
      /**
       * Trim impossible-high unallocated stat points without ever touching
       * already-allocated stats. Guards against legacy save-spam bugs that
       * inflated unallocatedStatPoints far beyond what level-ups + quests
       * could plausibly have granted.
       *
       * Cap = sum of getStatPointsForLevel(l) for l in [1..currentLevel]
       *     + 500 (quest grant buffer; max 5/day × ~100 days)
       *
       * NEVER mutates the 5 base stat values (strength/agility/intelligence/
       * vitality/perception) or any allocated state. Only clamps
       * unallocatedStatPoints downward when it exceeds the cap.
       */
      _reconcileUnallocatedStatPoints() {
        var _a, _b;
        try {
          if (!this.settings) return;
          const currentLevel = Math.max(1, Math.floor(Number(this.settings.level) || 1));
          let levelGrants = 0;
          for (let l = 1; l <= currentLevel; l++) {
            levelGrants += this.getStatPointsForLevel(l);
          }
          const QUEST_GRANT_BUFFER = Math.max(500, currentLevel * 2);
          const cap = levelGrants + QUEST_GRANT_BUFFER;
          const current = Number(this.settings.unallocatedStatPoints) || 0;
          if (current <= cap) return;
          const trimmed = current - cap;
          this.settings.unallocatedStatPoints = cap;
          this._settingsDirty = true;
          this.debugError(
            "RECONCILE_UNALLOCATED",
            new Error(`Trimmed ${trimmed} excess unallocated stat points`),
            {
              currentLevel,
              levelGrants,
              questBuffer: QUEST_GRANT_BUFFER,
              cap,
              before: current,
              after: cap
            }
          );
          if (!this._reconcileUnallocatedToastShown) {
            this._reconcileUnallocatedToastShown = true;
            try {
              (_b = (_a = BdApi.UI) == null ? void 0 : _a.showToast) == null ? void 0 : _b.call(
                _a,
                `SoloLevelingStats: trimmed ${trimmed} excess unallocated stat points (cap: ${cap} at level ${currentLevel}). Allocated stats unchanged.`,
                { type: "warning", timeout: 1e4 }
              );
            } catch (_) {
            }
          }
        } catch (err) {
          this.debugError("RECONCILE_UNALLOCATED", err);
        }
      },
      /**
       * ONE-TIME REPAIR (2026-08-03) for the `shadow_sovereign` id collision.
       *
       * Two different achievements shared that id: the Level-2000 + 35-achievement
       * capstone (defined first) and a Level-1500 + 18k-messages heir award
       * (defined later). checkAchievements walks the WHOLE definitions array and
       * skips any id already unlocked, so the far easier heir entry fired first,
       * claimed the id, and left the capstone permanently unearnable — the player
       * kept the heir's weaker titleBonus instead of the capstone's crown.
       *
       * The heir entry is now `shadow_sovereign_herald`. This repairs saves whose
       * `shadow_sovereign` came from that old path. NOTHING EARNED IS EVER
       * REMOVED WITHOUT REPLACEMENT:
       *   - qualifies for the capstone (level >= 2000 AND >= 35 unlocked)
       *       -> keep `shadow_sovereign` (it now resolves to the capstone, so the
       *          correct crown bonus finally applies) and ADD the herald, which was
       *          legitimately earned at 1500 on the way up.
       *   - does not qualify
       *       -> swap `shadow_sovereign` for `shadow_sovereign_herald` and remap a
       *          matching activeTitle, so the capstone becomes earnable again and
       *          the displayed title is preserved.
       *
       * Either branch leaves the unlocked count >= its previous value, so no
       * achievement-count gate regresses. Guarded by a persisted once-flag.
       */
      _migrateShadowSovereignSplit() {
        var _a, _b, _c, _d;
        const FLAG = "migration_shadow_sovereign_split_v1";
        try {
          if (BdApi.Data.load("SoloLevelingStats", FLAG)) return;
          const unlocked = (_b = (_a = this.settings) == null ? void 0 : _a.achievements) == null ? void 0 : _b.unlocked;
          if (Array.isArray(unlocked) && unlocked.includes("shadow_sovereign")) {
            const level = Number(this.settings.level) || 0;
            const qualifiesForCapstone = level >= 2e3 && unlocked.length >= 35;
            if (!unlocked.includes("shadow_sovereign_herald")) {
              unlocked.push("shadow_sovereign_herald");
            }
            if (!qualifiesForCapstone) {
              const at = unlocked.indexOf("shadow_sovereign");
              at >= 0 && unlocked.splice(at, 1);
              if (this.settings.achievements.activeTitle === "Shadow Sovereign") {
                this.settings.achievements.activeTitle = "Shadow Sovereign Herald";
              }
            }
            this._unlockedAchievementSet = null;
            this._unlockedAchievementSetSize = -1;
            (_c = this.debugLog) == null ? void 0 : _c.call(
              this,
              "MIGRATE_SOVEREIGN",
              qualifiesForCapstone ? "Capstone retained; Shadow Sovereign Herald granted." : "Reassigned to Shadow Sovereign Herald; capstone earnable again."
            );
          }
          BdApi.Data.save("SoloLevelingStats", FLAG, true);
        } catch (error) {
          (_d = this.debugError) == null ? void 0 : _d.call(this, "MIGRATE_SOVEREIGN", error);
        }
      },
      migrateData() {
        var _a, _b;
        try {
          if (!this.settings.stats || typeof this.settings.stats !== "object") {
            this.settings.stats = structuredClone(this.defaultSettings.stats);
          } else {
            const defaultStats = this.defaultSettings.stats;
            Object.keys(defaultStats).forEach((key) => {
              if (this.settings.stats[key] === void 0 || typeof this.settings.stats[key] !== "number") {
                this.settings.stats[key] = defaultStats[key];
              }
            });
          }
          if (!this.settings.activity || typeof this.settings.activity !== "object") {
            this.settings.activity = structuredClone(this.defaultSettings.activity);
          } else {
            const defaultActivity = this.defaultSettings.activity;
            Object.keys(defaultActivity).forEach((key) => {
              if (this.settings.activity[key] === void 0) {
                this.settings.activity[key] = defaultActivity[key];
              }
            });
          }
          if (this.settings.stats.luck !== void 0 && this.settings.stats.perception === void 0) {
            this.settings.stats.perception = this.settings.stats.luck;
            delete this.settings.stats.luck;
          }
          if (this.settings.luckBuffs !== void 0 && this.settings.perceptionBuffs === void 0) {
            this.settings.perceptionBuffs = this.settings.luckBuffs;
            delete this.settings.luckBuffs;
          }
          if (!Array.isArray(this.settings.perceptionBuffs)) {
            this.settings.perceptionBuffs = [];
          }
          if (!(this.settings.activity.channelsVisited instanceof Set)) {
            if (Array.isArray(this.settings.activity.channelsVisited)) {
              this.settings.activity.channelsVisited = new Set(this.settings.activity.channelsVisited);
            } else {
              this.settings.activity.channelsVisited = /* @__PURE__ */ new Set();
            }
          }
          if (this.settings.unallocatedStatPoints === void 0 || typeof this.settings.unallocatedStatPoints !== "number") {
            this.settings.unallocatedStatPoints = 0;
          }
          this._migrateShadowSovereignSplit();
        } catch (error) {
          this.debugError("MIGRATE_DATA", error);
          const looksFresh = (this.settings.level || 0) <= 1 && (this.settings.totalXP || 0) <= 0 && (this.settings.unallocatedStatPoints || 0) <= 0 && Object.values(this.settings.stats || {}).every((v) => !v || v <= 0);
          try {
            (_b = (_a = BdApi.UI) == null ? void 0 : _a.showToast) == null ? void 0 : _b.call(
              _a,
              looksFresh ? "SoloLevelingStats: migration failed \u2014 reset to defaults." : "SoloLevelingStats: migration failed \u2014 keeping current progress. See console.",
              { type: "error", timeout: 1e4 }
            );
          } catch (_) {
          }
          if (looksFresh) {
            this.settings.stats = structuredClone(this.defaultSettings.stats);
            this.settings.activity = structuredClone(this.defaultSettings.activity);
            this.settings.activity.channelsVisited = /* @__PURE__ */ new Set();
            this.settings.perceptionBuffs = [];
            this.settings.unallocatedStatPoints = 0;
          }
        }
      }
    };
  }
});

// src/SoloLevelingStats/message-observers.js
var require_message_observers = __commonJS({
  "src/SoloLevelingStats/message-observers.js"(exports2, module2) {
    var { acquireDispatcher, pollForDispatcher } = require_dispatcher();
    module2.exports = {
      _ensureMessageProcessTimeoutSet() {
        if (!this._messageProcessTimeouts) {
          this._messageProcessTimeouts = /* @__PURE__ */ new Set();
        }
        return this._messageProcessTimeouts;
      },
      _scheduleTrackedMessageTimeout(callback, delayMs) {
        const timeoutSet = this._ensureMessageProcessTimeoutSet();
        const timeoutId = setTimeout(() => {
          timeoutSet.delete(timeoutId);
          callback();
        }, delayMs);
        timeoutSet.add(timeoutId);
        return timeoutId;
      },
      _readMessageInputValue(messageInput, lastInputValue = "") {
        var _a;
        if (!messageInput) return "";
        if (messageInput.tagName === "TEXTAREA") {
          return messageInput.value || "";
        }
        if (messageInput.contentEditable === "true") {
          return messageInput.textContent || ((_a = messageInput.querySelector('[class*="textValue"]')) == null ? void 0 : _a.textContent) || "";
        }
        return messageInput.value || messageInput.textContent || lastInputValue || "";
      },
      _extractSendTextFromInput(messageInput, lastInputValue = "") {
        var _a;
        try {
          const textContent = (_a = messageInput == null ? void 0 : messageInput.textContent) == null ? void 0 : _a.trim();
          return textContent || String(lastInputValue || "").trim();
        } catch (_) {
          return String(lastInputValue || "").trim();
        }
      },
      _normalizeLongInputText(messageInput, messageText) {
        var _a;
        if (!messageInput || messageText.length <= 2e3) return messageText;
        this.debugLog("INPUT_DETECTION", "Message too long, likely capturing wrong content", {
          length: messageText.length,
          preview: messageText.substring(0, 100)
        });
        const textNodes = [];
        const walker = document.createTreeWalker(messageInput, NodeFilter.SHOW_TEXT, null, false);
        let node;
        while (node = walker.nextNode()) {
          const text = (_a = node.textContent) == null ? void 0 : _a.trim();
          if (text && text.length > 0 && text.length < 2e3) {
            textNodes.push(text);
          }
        }
        if (textNodes.length > 0) {
          const normalized = textNodes.join(" ").trim();
          return normalized.length > 2e3 ? normalized.substring(0, 2e3) : normalized;
        }
        return messageText.substring(0, 2e3);
      },
      _scheduleInputSendProcessing(messageText, messageInput, onProcessed) {
        this._scheduleTrackedMessageTimeout(() => {
          if (!this._isRunning) return;
          this.processMessageSent(messageText, this.buildMessageContextFromView(messageText));
          onProcessed == null ? void 0 : onProcessed();
        }, 100);
        this._scheduleTrackedMessageTimeout(() => {
          if (!this._isRunning) return;
          const currentValue = (messageInput == null ? void 0 : messageInput.tagName) === "TEXTAREA" ? messageInput.value || "" : (messageInput == null ? void 0 : messageInput.textContent) || "";
          if (!currentValue || currentValue.trim().length === 0) {
            this.debugLog("INPUT_DETECTION", "Input cleared, message confirmed sent");
          } else {
            this.debugLog("INPUT_DETECTION", "Input still has content, may be editing");
          }
        }, 500);
      },
      // ── FluxDispatcher MESSAGE_CREATE — own-message XP detection ─────────────────
      //
      // PERF (2026-07-14): this REPLACES a per-message MutationObserver that ran a
      // 20-deep React-fiber ownership walk (isOwnMessage) on EVERY message from
      // EVERY author just to find the current user's own posts — the busy-server
      // lag. MESSAGE_CREATE hands over `author.id` directly, so a single
      // `author.id === me` compare rejects everyone else's traffic with zero DOM
      // work. Own messages are funneled through the SAME processMessageSent() path
      // the input handler uses; its content-hash + 2s dedup already prevents
      // double-counting across the two paths, so this third trigger is safe.
      //
      // The input handler (keydown Enter) stays as the instant-feedback path (it
      // fires before the server round-trip); MESSAGE_CREATE is the reliable
      // fallback that also catches sends the input handler misses (slash commands,
      // click-to-send, paste flows) — the exact role the observer used to play,
      // now cheap.
      setupMessageDispatcher() {
        if (this._msgDispatcher || this._msgDispatcherPoll) return;
        try {
          const d = acquireDispatcher();
          if (d) {
            this._msgDispatcher = d;
            this._subscribeMessageDispatcher();
            return;
          }
          this._msgDispatcherPoll = pollForDispatcher({
            onAcquired: (dd) => {
              this._msgDispatcherPoll = null;
              if (!this._isRunning) return;
              this._msgDispatcher = dd;
              this._subscribeMessageDispatcher();
            },
            onTimeout: () => {
              this._msgDispatcherPoll = null;
              this.debugLog("MESSAGE_DISPATCHER", "FluxDispatcher unavailable after 30s \u2014 own-message XP will rely on the input handler only");
            },
            onPoll: () => {
              var _a, _b;
              if (!this._isRunning) (_b = (_a = this._msgDispatcherPoll) == null ? void 0 : _a.cancel) == null ? void 0 : _b.call(_a);
            }
          });
        } catch (error) {
          this.debugError("MESSAGE_DISPATCHER", error);
        }
      },
      _subscribeMessageDispatcher() {
        if (!this._msgDispatcher || this._msgCreateHandler) return;
        this._msgCreateHandler = (payload) => this._onMessageCreate(payload);
        try {
          this._msgDispatcher.subscribe("MESSAGE_CREATE", this._msgCreateHandler);
          this.debugLog("MESSAGE_DISPATCHER", "Subscribed to MESSAGE_CREATE for own-message XP");
        } catch (error) {
          this._msgCreateHandler = null;
          this.debugError("MESSAGE_DISPATCHER", error);
        }
      },
      teardownMessageDispatcher() {
        var _a, _b;
        if (this._msgDispatcher && this._msgCreateHandler) {
          try {
            this._msgDispatcher.unsubscribe("MESSAGE_CREATE", this._msgCreateHandler);
          } catch (_) {
          }
        }
        this._msgCreateHandler = null;
        this._msgDispatcher = null;
        if (this._msgDispatcherPoll) {
          try {
            (_b = (_a = this._msgDispatcherPoll).cancel) == null ? void 0 : _b.call(_a);
          } catch (_) {
          }
          this._msgDispatcherPoll = null;
        }
      },
      _onMessageCreate(payload) {
        var _a, _b;
        try {
          if (!this._isRunning) return;
          const msg = payload && payload.message;
          if (!msg || !msg.id || !msg.channel_id || !msg.author || !msg.author.id) return;
          if (msg.author.bot) return;
          if (msg.type !== 0 && msg.type !== 19) return;
          const me = this.currentUserId || this.getCurrentUserIdForMessageDetection() || ((_a = this.settings) == null ? void 0 : _a.ownUserId);
          if (!me || msg.author.id !== me) return;
          const viewed = this._getViewedChannelId();
          if (viewed && msg.channel_id !== viewed) return;
          const text = typeof msg.content === "string" ? msg.content.trim() : "";
          if (!text) return;
          const ts = this._msgTimestampMs(msg.timestamp);
          if (ts && this.pluginStartTime && ts < this.pluginStartTime) return;
          this.processedMessageIds = this.processedMessageIds || /* @__PURE__ */ new Set();
          if (this.processedMessageIds.has(msg.id)) return;
          if (typeof this.addProcessedMessageId === "function") this.addProcessedMessageId(msg.id);
          else this.processedMessageIds.add(msg.id);
          this.lastMessageId = msg.id;
          this.processMessageSent(text, this.buildMessageContextFromView(text));
          (_b = this.trackChannelVisit) == null ? void 0 : _b.call(this);
        } catch (error) {
          this.debugError("MESSAGE_CREATE", error);
        }
      },
      _msgTimestampMs(ts) {
        if (ts == null) return null;
        if (typeof ts === "number") return ts;
        if (typeof ts === "object" && typeof ts.valueOf === "function") {
          const v = ts.valueOf();
          return typeof v === "number" ? v : null;
        }
        const t = new Date(ts).getTime();
        return Number.isNaN(t) ? null : t;
      },
      // PERF (2026-07-15): store ref memoized — this runs per own-message and the
      // getStore lookup is a module-registry scan, not guaranteed cached by BD.
      // Flux stores are stable for the app lifetime; retry only while null.
      _getViewedChannelId() {
        var _a, _b;
        try {
          let store = this._selectedChannelStoreRef;
          if (!store) {
            store = (_b = (_a = BdApi.Webpack).getStore) == null ? void 0 : _b.call(_a, "SelectedChannelStore");
            if (store && typeof store.getChannelId === "function") {
              this._selectedChannelStoreRef = store;
            } else {
              return null;
            }
          }
          return store.getChannelId();
        } catch (_) {
        }
        return null;
      },
      setupInputMonitoringForMessageSending({ maxRetries = 10 } = {}) {
        var _a, _b;
        if ((_b = (_a = this.messageInputHandler) == null ? void 0 : _a.element) == null ? void 0 : _b.isConnected) return;
        let retryCount = 0;
        const attemptSetup = () => {
          const messageInput = this.getMessageInputElement();
          if (!messageInput) {
            retryCount++;
            if (retryCount < maxRetries) {
              this.debugLog(
                "SETUP_INPUT",
                `Message input not found, retrying (${retryCount}/${maxRetries})`
              );
              if (!this._setupInputRetryTimeout) {
                this._setupInputRetryTimeout = setTimeout(() => {
                  this._setupInputRetryTimeout = null;
                  attemptSetup();
                }, 1e3);
              }
            } else {
              this.debugLog(
                "SETUP_INPUT",
                "Message input not found after max retries, will rely on FluxDispatcher"
              );
            }
            return;
          }
          retryCount = 0;
          this.debugLog("SETUP_INPUT", "Found message input, setting up monitoring");
          let lastInputValue = "";
          const handleInput = () => {
            lastInputValue = this._readMessageInputValue(messageInput, lastInputValue);
          };
          const handleKeyDown = (event) => {
            if (event.key !== "Enter" || event.shiftKey) return;
            let messageText = this._extractSendTextFromInput(messageInput, lastInputValue);
            if (!messageText) return;
            messageText = this._normalizeLongInputText(messageInput, messageText);
            if (messageText.length <= 0 || messageText.length > 2e3) return;
            this.debugLog("INPUT_DETECTION", "Enter key pressed, message detected", {
              length: messageText.length,
              preview: messageText.substring(0, 50)
            });
            this.debugLog("INPUT_DETECTION", "Processing message immediately");
            this._scheduleInputSendProcessing(messageText, messageInput, () => {
              lastInputValue = "";
            });
          };
          const handlePaste = () => {
            this._scheduleTrackedMessageTimeout(() => {
              if (!this._isRunning) return;
              handleInput();
            }, 50);
          };
          messageInput.addEventListener("input", handleInput, true);
          messageInput.addEventListener("keydown", handleKeyDown, true);
          messageInput.addEventListener("paste", handlePaste, true);
          this.messageInputHandler = {
            handleInput,
            handleKeyDown,
            handlePaste,
            observer: null,
            element: messageInput
          };
          this.debugLog("SETUP_INPUT", "Input monitoring set up successfully");
          this.inputMonitoringActive = true;
        };
        attemptSetup();
      },
      startObserving() {
        this.processedMessageIds = this.processedMessageIds || /* @__PURE__ */ new Set();
        this.setupMessageDispatcher();
        const messageContainer = this.getMessageContainerElementForObserving();
        if (messageContainer) this._messageContainerEl = messageContainer;
        this.setupInputMonitoringForMessageSending({ maxRetries: 10 });
      }
    };
  }
});

// src/SoloLevelingStats/xp-processing.js
var require_xp_processing = __commonJS({
  "src/SoloLevelingStats/xp-processing.js"(exports2, module2) {
    var INT_TIER_BONUSES = Object.freeze([
      Object.freeze({ threshold: 400, bonus: 12 }),
      Object.freeze({ threshold: 200, bonus: 7 }),
      Object.freeze({ threshold: 100, bonus: 3 })
    ]);
    var MILESTONE_MULTIPLIERS = Object.freeze([
      Object.freeze([2e3, 1.68]),
      Object.freeze([1500, 1.6]),
      Object.freeze([1e3, 1.54]),
      Object.freeze([700, 1.48]),
      Object.freeze([500, 1.43]),
      Object.freeze([400, 1.38]),
      Object.freeze([300, 1.33]),
      Object.freeze([200, 1.27]),
      Object.freeze([150, 1.22]),
      Object.freeze([100, 1.18]),
      Object.freeze([75, 1.14]),
      Object.freeze([50, 1.1]),
      Object.freeze([25, 1.06])
    ]);
    module2.exports = {
      runMessageProcessingStage(stageFn) {
        try {
          stageFn();
        } catch (error) {
          this.debugError("MESSAGE_STAGE", error);
        }
      },
      _resolveMessageProcessingContext(messageText, messageContext) {
        if (messageContext && typeof messageContext === "object") {
          return messageContext;
        }
        return this.buildMessageContextFromView(messageText);
      },
      _ensureRecentMessagesMap() {
        if (!this.recentMessages || typeof this.recentMessages.get !== "function") {
          this.recentMessages = /* @__PURE__ */ new Map();
        }
        return this.recentMessages;
      },
      _pruneRecentMessages(now, recentWindowMs) {
        if (!this.recentMessages || this.recentMessages.size <= 100) return;
        for (const [key, timestamp] of this.recentMessages.entries()) {
          if (now - timestamp > recentWindowMs) {
            this.recentMessages.delete(key);
          }
        }
      },
      _buildRecentMessageHash(messageText, resolvedContext) {
        const channelScope = (resolvedContext == null ? void 0 : resolvedContext.channelId) || this.getCurrentChannelId() || "global";
        const messageHash = this.hashString(this._normalizeForDedup(messageText).substring(0, 2e3));
        return `msg_${channelScope}_${messageHash}`;
      },
      // The same message reaches processMessageSent from two triggers whose text
      // representation differs: the input handler reads the composer DOM (mentions
      // render as "@Name", channels "#name", custom emoji ":name:"), while the
      // FluxDispatcher path uses msg.content (raw markdown: "<@123>", "<#456>",
      // "<:name:789>"). Hashing raw text let the same message hash two different
      // ways, so the recent-message dedup missed it and awarded XP twice. Strip
      // Discord entity tokens in BOTH raw and rendered forms so the two triggers
      // converge on one dedup key. Over-stripping (e.g. a literal "@word") is
      // symmetric across both paths, so it can only cause a rare false-dedup
      // (one message's XP skipped) — never the double-count it prevents.
      _normalizeForDedup(text) {
        if (typeof text !== "string" || text.length === 0) return "";
        return text.replace(/<a?:\w+:\d+>/g, "").replace(/<@[!&]?\d+>/g, "").replace(/<#\d+>/g, "").replace(/<t:\d+(?::[a-zA-Z])?>/g, "").replace(/@[^\s]+/g, "").replace(/#[^\s]+/g, "").replace(/:\w+:/g, "").replace(/\s+/g, " ").trim();
      },
      _isRecentMessageDuplicate(hashKey, now, recentWindowMs) {
        const lastProcessedAt = this.recentMessages.get(hashKey);
        return Boolean(lastProcessedAt && now - lastProcessedAt < recentWindowMs);
      },
      _recordRecentMessage(hashKey, now) {
        this.recentMessages.set(hashKey, now);
      },
      _runMessageProcessingStages(messageText, messageLength, resolvedContext) {
        this.runMessageProcessingStage(() => {
          this.settings.activity.messagesSent++;
          this.settings.activity.charactersTyped += messageLength;
        });
        this.runMessageProcessingStage(() => this.trackChannelVisit());
        this.runMessageProcessingStage(() => this.awardXP(messageText, messageLength, resolvedContext));
        this.runMessageProcessingStage(() => {
          this.updateQuestProgress("messageMaster", 1);
          this.updateQuestProgress("characterChampion", messageLength);
          this.updateQuestProgress("perfectStreak", 1);
        });
        this.runMessageProcessingStage(() => this.processNaturalStatGrowth());
        this.runMessageProcessingStage(() => this.checkAchievements());
      },
      _maybeFlushPeriodicMessageSave() {
        if (Date.now() - this.lastSaveTime > 5e3) {
          this.runMessageProcessingStage(() => this.saveSettings());
        }
      },
      processMessageSent(messageText, messageContext = null) {
        if (!this._isRunning || typeof messageText !== "string" || messageText.length === 0) return;
        try {
          const now = Date.now();
          const recentWindowMs = 2e3;
          const resolvedContext = this._resolveMessageProcessingContext(messageText, messageContext);
          const hashKey = this._buildRecentMessageHash(messageText, resolvedContext);
          this._ensureRecentMessagesMap();
          this._pruneRecentMessages(now, recentWindowMs);
          if (this._isRecentMessageDuplicate(hashKey, now, recentWindowMs)) return;
          this._recordRecentMessage(hashKey, now);
          const messageLength = Math.min(messageText.length, 2e3);
          this._runMessageProcessingStages(messageText, messageLength, resolvedContext);
          this._maybeFlushPeriodicMessageSave();
        } catch (error) {
          this.debugError("PROCESS_MESSAGE", error);
        }
      },
      hashString(str) {
        let hash = 0;
        for (let i = 0; i < str.length; i++) {
          const char = str.charCodeAt(i);
          hash = (hash << 5) - hash + char;
          hash = hash & hash;
        }
        return Math.abs(hash);
      },
      handleChannelChange(lastChannelId) {
        try {
          const channelInfo = this.getCurrentChannelInfo();
          if (!channelInfo) {
            this.debugLog("HANDLE_CHANNEL_CHANGE", "No channel info after change", {
              currentUrl: window.location.href
            });
            return lastChannelId;
          }
          const { channelId, channelType, serverId, isDM } = channelInfo;
          if (channelId !== lastChannelId) {
            this.debugLog("HANDLE_CHANNEL_CHANGE", "Channel changed detected", {
              oldChannelId: lastChannelId,
              newChannelId: channelId,
              channelType,
              serverId: serverId || "N/A (DM)",
              isDM
            });
            this.trackChannelVisit();
            if (this._isGuildTextChannel()) {
              if (this.chatUIPanel && !this.chatUIPanel.isConnected) {
                this.debugLog("CHANNEL_CHANGE", "Stale chatUIPanel on channel switch \u2014 clearing");
                this.chatUIPanel = null;
              }
              if (!document.getElementById("sls-chat-ui")) {
                this.createChatUI();
              }
            } else {
              this.removeChatUI();
            }
            return channelId;
          } else {
            this.debugLog("HANDLE_CHANNEL_CHANGE", "Same channel, no change", {
              channelId
            });
          }
        } catch (error) {
          this.debugError("HANDLE_CHANNEL_CHANGE", error, {
            currentUrl: window.location.href
          });
        }
        return lastChannelId;
      },
      startAutoSave() {
        if (this._autoSaveHandlers) return;
        const beforeUnloadHandler = () => {
          this.saveSettings(true);
        };
        window.addEventListener("beforeunload", beforeUnloadHandler);
        const visibilityChangeHandler = () => document.hidden && this.saveSettings(true);
        document.addEventListener("visibilitychange", visibilityChangeHandler);
        this._autoSaveHandlers = {
          beforeUnloadHandler,
          visibilityChangeHandler
        };
      },
      _normalizeAddXpRequest(amount, options = {}) {
        const rawAmount = Number(amount);
        const xpAmount = Number.isFinite(rawAmount) ? Math.floor(rawAmount) : 0;
        const source = typeof options.source === "string" && options.source.trim().length > 0 ? options.source.trim() : "external";
        return {
          xpAmount,
          source,
          shareShadowXP: Boolean(options.shareShadowXP),
          saveImmediately: Boolean(options.saveImmediately)
        };
      },
      // SHADOW MONARCH PERK (Blessing of Kandiaru -> Kandiaru's Favor, player-exclusive):
      // at SM the player is level/rank capped, so XP no longer levels. All XP is routed
      // here and converted into base stat points (default 1 point per 1,000,000 XP, tunable
      // via settings.architectFavorRate). Returns true if the XP was consumed — the caller
      // must then SKIP the normal level/totalXP mutation. Deliberately does NOT touch
      // settings.xp or settings.totalXP: getCurrentLevel() derives level from totalXP, so
      // adding to it would keep leveling past the cap.
      _routeShadowMonarchXp(xpAmount) {
        var _a;
        if (((_a = this.settings) == null ? void 0 : _a.rank) !== "Shadow Monarch") return false;
        const amt = Math.max(0, Math.floor(Number(xpAmount) || 0));
        if (amt <= 0) return true;
        const rate = Math.max(1, Math.floor(Number(this.settings.architectFavorRate) || 1e6));
        const pool = (Number(this.settings.architectFavorPool) || 0) + amt;
        const minted = Math.floor(pool / rate);
        this.settings.architectFavorPool = pool - minted * rate;
        this.settings.architectFavorConvertedXP = (Number(this.settings.architectFavorConvertedXP) || 0) + amt;
        if (minted > 0) this._allocateBalancedBaseStats(minted);
        return true;
      },
      // Auto-balance: feed each minted point to the current lowest BASE stat, re-evaluating
      // after every point so the stats converge then climb together as a block. Ties resolve
      // in the fixed order STR > AGI > INT > VIT > PER. Reuses allocateStatPoints so HP/mana/
      // crit recompute, caches invalidate, and the UI/save run through the proven path.
      _allocateBalancedBaseStats(points) {
        var _a;
        const stats = (_a = this.settings) == null ? void 0 : _a.stats;
        const n = Math.max(0, Math.floor(Number(points) || 0));
        if (!stats || n <= 0) return;
        const keys = ["strength", "agility", "intelligence", "vitality", "perception"];
        this.settings.unallocatedStatPoints = (Number(this.settings.unallocatedStatPoints) || 0) + n;
        for (let i = 0; i < n; i++) {
          if ((Number(this.settings.unallocatedStatPoints) || 0) <= 0) break;
          let lowest = keys[0];
          for (const k of keys) {
            if ((Number(stats[k]) || 0) < (Number(stats[lowest]) || 0)) lowest = k;
          }
          this.allocateStatPoints(lowest, 1, { saveImmediately: false, refreshUI: false });
        }
        this.applyStatMutationEffects({ saveImmediately: true, refreshUI: true, recomputeHpMana: false });
      },
      _applyExternalXpToState(xpAmount, source) {
        this.ensureValidTotalXP(`ADD_XP:${source}`);
        const oldLevel = this.settings.level || 1;
        const oldTotalXP = this.settings.totalXP || 0;
        if (this._routeShadowMonarchXp(xpAmount)) {
          return { oldLevel, oldTotalXP };
        }
        this.settings.xp = (this.settings.xp || 0) + xpAmount;
        this.settings.totalXP = oldTotalXP + xpAmount;
        this.invalidatePerformanceCache(["currentLevel"]);
        const newLevelInfo = this.getCurrentLevel();
        this.settings.level = newLevelInfo.level;
        this.settings.xp = newLevelInfo.xp;
        return {
          oldLevel,
          oldTotalXP
        };
      },
      _runAddXpProgressChecks(oldLevel) {
        this.checkLevelUp(oldLevel);
        if ((this.settings.level || 1) === oldLevel) {
          this.checkRankPromotion();
        }
      },
      _persistAddXp(saveImmediately) {
        if (saveImmediately) {
          this.saveSettings(true);
          return;
        }
        this.saveSettings();
      },
      _shareAddXpWithShadowArmy(xpAmount, source, shareShadowXP) {
        if (!shareShadowXP) return;
        try {
          this.shareShadowXP(xpAmount, source);
        } catch (error) {
          this.debugError("ADD_XP", error, { phase: "shadow_xp_share", source });
        }
      },
      addXP(amount, options = {}) {
        try {
          const normalized = this._normalizeAddXpRequest(amount, options);
          if (normalized.xpAmount <= 0) return 0;
          const stateResult = this._applyExternalXpToState(normalized.xpAmount, normalized.source);
          this.emitXPChanged();
          this._runAddXpProgressChecks(stateResult.oldLevel);
          this._persistAddXp(normalized.saveImmediately);
          this._shareAddXpWithShadowArmy(
            normalized.xpAmount,
            normalized.source,
            normalized.shareShadowXP
          );
          this.debugLog("ADD_XP", "External XP added", {
            source: normalized.source,
            xpAmount: normalized.xpAmount,
            oldTotalXP: stateResult.oldTotalXP,
            newTotalXP: this.settings.totalXP,
            oldLevel: stateResult.oldLevel,
            newLevel: this.settings.level
          });
          return normalized.xpAmount;
        } catch (error) {
          this.debugError("ADD_XP", error, { amount, options });
          return 0;
        }
      },
      _logAntiAbuseMeta(antiAbuseMeta) {
        if (!(antiAbuseMeta == null ? void 0 : antiAbuseMeta.antiAbuse)) return;
        const shouldLogAntiAbuse = antiAbuseMeta.antiAbuse.multiplier < 1 || antiAbuseMeta.interactionBonus > 0;
        if (!shouldLogAntiAbuse) return;
        this.debugLog("ANTI_ABUSE", "Applied anti-abuse scoring", {
          multiplier: antiAbuseMeta.antiAbuse.multiplier,
          rapidMultiplier: antiAbuseMeta.antiAbuse.rapidMultiplier,
          repeatMultiplier: antiAbuseMeta.antiAbuse.repeatMultiplier,
          repeatCount: antiAbuseMeta.antiAbuse.repeatCount,
          deltaMs: antiAbuseMeta.antiAbuse.deltaMs,
          interactionBonus: antiAbuseMeta.interactionBonus,
          scaledInteractionBonus: antiAbuseMeta.scaledInteractionBonus,
          preDecayBaseXP: antiAbuseMeta.preDecayBaseXP,
          postDecayBaseXP: antiAbuseMeta.postDecayBaseXP,
          source: antiAbuseMeta.antiAbuse.source
        });
      },
      _getStrengthBonusPercent(strengthStat, skillTreeStatMultiplier) {
        if (strengthStat <= 0) return 0;
        let strengthBonus = 0;
        if (strengthStat <= 20) {
          strengthBonus = strengthStat * 2;
        } else {
          strengthBonus = 40 + (strengthStat - 20) * 0.5;
        }
        if (skillTreeStatMultiplier) {
          strengthBonus *= skillTreeStatMultiplier;
        }
        return strengthBonus;
      },
      _getIntelligenceTierBonus(messageLength) {
        for (let i = 0; i < INT_TIER_BONUSES.length; i++) {
          const tier = INT_TIER_BONUSES[i];
          if (messageLength >= tier.threshold) return tier;
        }
        return null;
      },
      _getIntelligenceBonusPercent(messageLength, intelligenceStat, skillTreeStatMultiplier) {
        if (intelligenceStat <= 0) return 0;
        const applicableTier = this._getIntelligenceTierBonus(messageLength);
        if (!applicableTier) return 0;
        const bonusPerPoint = applicableTier.bonus;
        const intelligenceBonus = intelligenceStat <= 15 ? intelligenceStat * bonusPerPoint : 15 * bonusPerPoint + (intelligenceStat - 15) * (bonusPerPoint / 5);
        const adjustedBonus = skillTreeStatMultiplier ? intelligenceBonus * skillTreeStatMultiplier : intelligenceBonus;
        this.debugLog("INT_TIER_BONUS", "Intelligence tier bonus applied", {
          messageLength,
          tier: applicableTier.threshold,
          bonusPerPoint,
          intelligenceStat,
          intelligenceBonus: adjustedBonus.toFixed(1) + "%"
        });
        return adjustedBonus;
      },
      _collectXpBonusState(messageLength) {
        var _a, _b, _c;
        const activeBuffs = this.getActiveSkillBuffs();
        const skillBonuses = this.getSkillTreeBonuses();
        const hiddenBlessings = (_a = this.getHiddenBlessingBonuses) == null ? void 0 : _a.call(this);
        let totalPercentageBonus = 0;
        this._skillTreeStatMultiplier = null;
        if ((skillBonuses == null ? void 0 : skillBonuses.xpBonus) > 0) {
          totalPercentageBonus += skillBonuses.xpBonus * 100;
        }
        if ((hiddenBlessings == null ? void 0 : hiddenBlessings.xpBonus) > 0) {
          totalPercentageBonus += hiddenBlessings.xpBonus * 100;
        }
        if ((skillBonuses == null ? void 0 : skillBonuses.allStatBonus) > 0) {
          this._skillTreeStatMultiplier = 1 + skillBonuses.allStatBonus;
        }
        if ((activeBuffs == null ? void 0 : activeBuffs.allStatMultiplier) > 1) {
          this._skillTreeStatMultiplier = (this._skillTreeStatMultiplier || 1) * activeBuffs.allStatMultiplier;
        }
        const strengthStat = ((_b = this.settings.stats) == null ? void 0 : _b.strength) || 0;
        totalPercentageBonus += this._getStrengthBonusPercent(
          strengthStat,
          this._skillTreeStatMultiplier
        );
        const intelligenceStat = ((_c = this.settings.stats) == null ? void 0 : _c.intelligence) || 0;
        totalPercentageBonus += this._getIntelligenceBonusPercent(
          messageLength,
          intelligenceStat,
          this._skillTreeStatMultiplier
        );
        return {
          activeBuffs,
          hiddenBlessings,
          skillBonuses,
          totalPercentageBonus
        };
      },
      _getMilestoneMultiplier(currentLevel) {
        if (this._cache.milestoneMultiplierLevel === currentLevel && this._cache.milestoneMultiplier !== null) {
          return this._cache.milestoneMultiplier;
        }
        let multiplier = 1;
        for (let i = 0; i < MILESTONE_MULTIPLIERS.length; i++) {
          if (currentLevel >= MILESTONE_MULTIPLIERS[i][0]) {
            multiplier = MILESTONE_MULTIPLIERS[i][1];
            break;
          }
        }
        this._cache.milestoneMultiplier = multiplier;
        this._cache.milestoneMultiplierLevel = currentLevel;
        return multiplier;
      },
      _applyNonCritXpLayers(baseXP, totalPercentageBonus, currentLevel, activeBuffs) {
        const cappedPercentageBonus = Math.min(totalPercentageBonus, 220);
        let xp = Math.round(baseXP * (1 + cappedPercentageBonus / 100));
        const titleBonus = this.getActiveTitleBonus();
        const titleXpCap = this.getTitleXpCapForLevel(currentLevel);
        const appliedTitleXpBonus = Math.min(Math.max(0, titleBonus.xp || 0), titleXpCap);
        if (appliedTitleXpBonus > 0) {
          xp = Math.round(xp * (1 + appliedTitleXpBonus));
        }
        if ((activeBuffs == null ? void 0 : activeBuffs.xpMultiplier) > 1) {
          xp = Math.round(xp * activeBuffs.xpMultiplier);
        }
        const milestoneMultiplier = this._getMilestoneMultiplier(currentLevel);
        let levelReductionMultiplier = null;
        if (currentLevel > 10) {
          const rawMultiplier = 1 / (1 + (currentLevel - 10) * 0.01);
          levelReductionMultiplier = Math.max(rawMultiplier, 0.6);
        }
        let effectiveReducer = levelReductionMultiplier;
        if (milestoneMultiplier > 1 && levelReductionMultiplier !== null) {
          effectiveReducer = Math.max(levelReductionMultiplier, 1 / milestoneMultiplier);
        }
        if (milestoneMultiplier > 1) {
          xp = Math.round(xp * milestoneMultiplier);
        }
        if (effectiveReducer !== null) {
          xp = Math.round(xp * effectiveReducer);
          xp = Math.max(xp, 10);
        }
        return {
          xp,
          cappedPercentageBonus,
          appliedTitleXpBonus,
          titleXpCap,
          milestoneMultiplier,
          levelReductionMultiplier
        };
      },
      _resolveCritBonusForAward(skillBonuses, activeBuffs) {
        var _a, _b;
        const activeSkillForcedCrit = (activeBuffs == null ? void 0 : activeBuffs.guaranteedCrit) === true;
        let critBonus = this.checkCriticalHitBonus();
        const passiveSkillCritChance = Math.min(0.35, Math.max(0, Number((skillBonuses == null ? void 0 : skillBonuses.critBonus) || 0)));
        const activeSkillCritChance = Math.min(
          0.5,
          Math.max(0, Number((activeBuffs == null ? void 0 : activeBuffs.critChanceBonus) || 0))
        );
        const supplementalCritChance = Math.min(0.85, passiveSkillCritChance + activeSkillCritChance);
        if (critBonus <= 0 && supplementalCritChance > 0 && Math.random() < supplementalCritChance) {
          const agilityStat = ((_a = this.settings.stats) == null ? void 0 : _a.agility) || 0;
          critBonus = Math.min(1.2, 0.2 + Math.min(0.75, agilityStat * 6e-3));
        }
        if (activeSkillForcedCrit && critBonus <= 0) {
          const agilityStat = ((_b = this.settings.stats) == null ? void 0 : _b.agility) || 0;
          critBonus = Math.min(1.2, 0.2 + Math.min(0.75, agilityStat * 6e-3));
        }
        return critBonus;
      },
      _applyCriticalHitXpLayer(xp, critBonus) {
        var _a, _b, _c, _d, _e;
        if (critBonus <= 0) {
          return {
            xp,
            wasCrit: false
          };
        }
        const baseXPBeforeCrit = xp;
        let critMultiplier = critBonus;
        let isMegaCrit = false;
        let comboFlatBonusXP = 0;
        const activeTitle = (_a = this.settings.achievements) == null ? void 0 : _a.activeTitle;
        if (activeTitle === "Dagger Throw Master") {
          const agilityStat = ((_b = this.settings.stats) == null ? void 0 : _b.agility) || 0;
          const megaCritChance = Math.min(0.2, agilityStat * 1e-3);
          const roll = Math.random();
          if (roll < megaCritChance) {
            critMultiplier = 149;
            isMegaCrit = true;
            this.showNotification(
              ` MEGA CRITICAL HIT! 
Dagger Throw Master activated!
150x XP Multiplier!`,
              "success",
              8e3
            );
            this.debugLog("AWARD_XP_MEGA_CRIT", "Mega crit activated!", {
              agilityStat,
              megaCritChance: (megaCritChance * 100).toFixed(1) + "%",
              roll: roll.toFixed(4),
              multiplier: "150x"
            });
          }
        }
        xp = Math.round(xp * (1 + critMultiplier));
        const critBurstInfo = ((_c = this._cache) == null ? void 0 : _c.lastAppliedCritBurst) || null;
        if (!isMegaCrit && (critBurstInfo == null ? void 0 : critBurstInfo.burstHits) > 1) {
          const effectiveBurstHits = Math.min(20, Number(critBurstInfo.effectiveBurstHits || 1));
          const extraRatio = Math.min(
            0.18,
            Math.log2(effectiveBurstHits + 1) * 0.02 + (Math.min(12, effectiveBurstHits) - 1) * 6e-3
          );
          const cappedFlatBonus = Math.max(4, Math.round(baseXPBeforeCrit * 0.18));
          comboFlatBonusXP = Math.min(
            cappedFlatBonus,
            Math.max(2, Math.round(baseXPBeforeCrit * extraRatio))
          );
          xp += comboFlatBonusXP;
        }
        if (!this.settings.activity.critsLanded) {
          this.settings.activity.critsLanded = 0;
        }
        this.settings.activity.critsLanded++;
        this.debugLog("AWARD_XP_CRIT", isMegaCrit ? "MEGA CRITICAL HIT!" : "Critical hit bonus applied", {
          critBonus: (critBonus * 100).toFixed(0) + "%",
          baseXPBeforeCrit,
          critBonusXP: xp - baseXPBeforeCrit,
          comboFlatBonusXP,
          burstHits: ((_e = (_d = this._cache) == null ? void 0 : _d.lastAppliedCritBurst) == null ? void 0 : _e.burstHits) || 1,
          finalXP: xp,
          totalCrits: this.settings.activity.critsLanded,
          isMegaCrit
        });
        return {
          xp,
          wasCrit: true
        };
      },
      _applyFinalXpLayers(xp, currentLevel, activeBuffs) {
        const rankMultiplier = this.getRankMultiplier();
        xp = Math.round(xp * rankMultiplier);
        if ((activeBuffs == null ? void 0 : activeBuffs.globalMultiplier) > 1) {
          xp = Math.round(xp * activeBuffs.globalMultiplier);
        }
        xp = this.applyXpGovernors(xp, currentLevel);
        xp = Math.round(xp);
        return {
          xp,
          rankMultiplier
        };
      },
      _applyAwardedXpToState(xp) {
        this.ensureValidTotalXP("AWARD_XP");
        const oldLevel = this.settings.level;
        const oldTotalXP = this.settings.totalXP;
        if (this._routeShadowMonarchXp(xp)) {
          return { oldLevel, oldTotalXP, newLevelInfo: this.getCurrentLevel() };
        }
        this.settings.xp = (this.settings.xp || 0) + xp;
        this.settings.totalXP = (this.settings.totalXP || 0) + xp;
        this.invalidatePerformanceCache(["currentLevel"]);
        const newLevelInfo = this.getCurrentLevel();
        if (this.settings.level !== newLevelInfo.level) {
          this.settings.level = newLevelInfo.level;
          this.settings.xp = newLevelInfo.xp;
        } else {
          this.settings.xp = newLevelInfo.xp;
        }
        return {
          oldLevel,
          oldTotalXP,
          newLevelInfo
        };
      },
      awardXP(messageText, messageLength, messageContext = null) {
        try {
          this.debugLog("AWARD_XP", "Calculating XP", { messageLength });
          const currentLevel = this.getCurrentLevel().level;
          const baseXP = this.calculateBaseXpForMessage({ messageText, messageLength, messageContext });
          this._logAntiAbuseMeta(this._lastAntiAbuseMeta);
          const bonusState = this._collectXpBonusState(messageLength);
          const nonCritResult = this._applyNonCritXpLayers(
            baseXP,
            bonusState.totalPercentageBonus,
            currentLevel,
            bonusState.activeBuffs
          );
          const critBonus = this._resolveCritBonusForAward(
            bonusState.skillBonuses,
            bonusState.activeBuffs
          );
          const critResult = this._applyCriticalHitXpLayer(nonCritResult.xp, critBonus);
          const finalResult = this._applyFinalXpLayers(
            critResult.xp,
            currentLevel,
            bonusState.activeBuffs
          );
          const skillTreeMultiplier = this._skillTreeStatMultiplier || 1;
          this.debugLog("AWARD_XP", "XP calculated", {
            baseXP,
            totalPercentageBonus: bonusState.totalPercentageBonus.toFixed(1) + "%",
            cappedPercentageBonus: nonCritResult.cappedPercentageBonus.toFixed(1) + "%",
            titleXpApplied: `${(nonCritResult.appliedTitleXpBonus * 100).toFixed(1)}% (cap ${(nonCritResult.titleXpCap * 100).toFixed(0)}%)`,
            skillTreeMultiplier: skillTreeMultiplier > 1 ? `${((skillTreeMultiplier - 1) * 100).toFixed(1)}%` : "None",
            milestoneMultiplier: nonCritResult.milestoneMultiplier > 1 ? `${((nonCritResult.milestoneMultiplier - 1) * 100).toFixed(0)}%` : "None",
            levelReduction: nonCritResult.levelReductionMultiplier != null ? (nonCritResult.levelReductionMultiplier * 100).toFixed(1) + "%" : "N/A",
            rankMultiplier: `${((finalResult.rankMultiplier - 1) * 100).toFixed(0)}%`,
            finalXP: finalResult.xp,
            messageLength,
            currentLevel
          });
          const stateResult = this._applyAwardedXpToState(finalResult.xp);
          this.debugLog("AWARD_XP", "XP added", {
            xpAwarded: finalResult.xp,
            oldTotalXP: stateResult.oldTotalXP,
            newTotalXP: this.settings.totalXP,
            oldLevel: stateResult.oldLevel,
            newLevel: this.settings.level,
            currentXP: this.settings.xp,
            xpRequired: stateResult.newLevelInfo.xpRequired
          });
          this.emitXPChanged();
          this.debugLog("AWARD_XP", "XP applied; checkLevelUp will persist");
          try {
            this.checkLevelUp(stateResult.oldLevel);
            if ((this.settings.level || 1) === stateResult.oldLevel) {
              this.checkRankPromotion();
            }
            this.debugLog("AWARD_XP", "Level and rank checks completed");
          } catch (error) {
            this.debugError("AWARD_XP", error, { phase: "level_rank_check" });
          }
          try {
            this.shareShadowXP(finalResult.xp, "message");
          } catch (error) {
            this.debugError("AWARD_XP", error, { phase: "shadow_xp_share" });
          }
        } catch (error) {
          this.debugError("AWARD_XP", error, {
            messageLength,
            messagePreview: messageText == null ? void 0 : messageText.substring(0, 30)
          });
        }
      }
    };
  }
});

// src/SoloLevelingStats/notifications.js
var require_notifications = __commonJS({
  "src/SoloLevelingStats/notifications.js"(exports2, module2) {
    module2.exports = {
      showNotification(message, type = "info", timeout = 3e3) {
        var _a, _b, _c;
        try {
          const now = Date.now();
          const cacheTtlMs = 3e3;
          if (!this._toastPluginCacheTime || now - this._toastPluginCacheTime > cacheTtlMs) {
            this._toastPluginCacheTime = now;
            this._toastPluginCache = ((_b = (_a = this._SLUtils) == null ? void 0 : _a.getPluginInstance) == null ? void 0 : _b.call(_a, "SoloLevelingToasts")) || null;
          }
          const slToasts = this._toastPluginCache;
          if (slToasts == null ? void 0 : slToasts.showToast) {
            slToasts.showToast(message, type, timeout, { callerId: "soloLevelingStats" });
            return;
          }
          if ((_c = BdApi == null ? void 0 : BdApi.UI) == null ? void 0 : _c.showToast) {
            BdApi.UI.showToast(message, {
              type: type === "level-up" ? "info" : type,
              timeout
            });
          }
        } catch (error) {
          this.debugError("NOTIFICATION", error);
        }
      },
      escapeHtml(text) {
        if (typeof text !== "string") return text;
        const div = document.createElement("div");
        div.textContent = text;
        return div.innerHTML;
      },
      showRankPromotionNotification(oldRank, newRank, rankInfo, statBonus = 0) {
        let message = `[SYSTEM] Rank Promotion!

Rank Up: ${oldRank} \u2192 ${newRank}
New Title: ${rankInfo.name}
Level: ${this.settings.level}
Achievements: ${this.settings.achievements.unlocked.length}
`;
        if (statBonus > 0) {
          message += `BONUS: +${statBonus} to ALL stats!
`;
        }
        message += `XP Multiplier: ${(this.getRankMultiplier() * 100).toFixed(0)}%`;
        this.showNotification(message, "success", 6e3);
      },
      showLevelUpNotification(newLevel, oldLevel, actualStatPointsGained = null) {
        const levelsGained = newLevel - oldLevel;
        if (actualStatPointsGained === null) {
          const statPointsPerLevel = this.getStatPointsForLevel(newLevel);
          actualStatPointsGained = levelsGained * statPointsPerLevel;
        }
        const rankInfo = this.getRankRequirements()[this.settings.rank];
        const totalStats = this.getTotalEffectiveStats();
        const vitality = totalStats.vitality || 0;
        const currentMaxHP = this.calculateHP(vitality, this.settings.rank);
        this.settings.userMaxHP = currentMaxHP;
        this.settings.userHP = currentMaxHP;
        this.saveSettings();
        let message = `[SYSTEM] Level up detected. HP fully restored.

`;
        if (levelsGained > 1) {
          message += `LEVEL UP! ${levelsGained}x Level Up! You're now Level ${newLevel}!
`;
          message += `(Level ${oldLevel} \u2192 Level ${newLevel})
`;
        } else {
          message += `LEVEL UP! You're now Level ${newLevel}!
`;
        }
        message += `Rank: ${this.settings.rank} - ${rankInfo.name}
`;
        message += `HP: ${currentMaxHP}/${currentMaxHP} (Fully Restored!)
`;
        message += `+${actualStatPointsGained} stat point(s)! Use settings to allocate stats`;
        this.showNotification(message, "level-up", 5e3);
        this.enqueueLevelUpAnimation(oldLevel, newLevel);
      }
    };
  }
});

// src/SoloLevelingStats/persistence-backups.js
var require_persistence_backups = __commonJS({
  "src/SoloLevelingStats/persistence-backups.js"(exports2, module2) {
    module2.exports = {
      readFileBackup() {
        if (!this.fileBackupPath) return null;
        try {
          const fs = require("fs");
          const getCandidate = (path, source) => {
            var _a, _b;
            try {
              if (!fs.existsSync(path)) return null;
              const raw = fs.readFileSync(path, "utf8");
              const data = JSON.parse(raw);
              let quality = 0;
              try {
                quality = this._getSettingsCandidateQuality(data);
              } catch (_) {
                quality = 0;
              }
              const stat = fs.statSync(path);
              const ts = Date.parse(((_a = data == null ? void 0 : data._metadata) == null ? void 0 : _a.lastSave) || "") || stat.mtimeMs || 0;
              return {
                source,
                data,
                quality: Number.isFinite(quality) ? quality : 0,
                ts: Number.isFinite(ts) ? ts : 0,
                path
              };
            } catch (e) {
              (_b = this.debugError) == null ? void 0 : _b.call(this, "READ_FILE_BACKUP_CANDIDATE", e, { path, source });
              return null;
            }
          };
          const candidates = [];
          const mainCandidate = getCandidate(this.fileBackupPath, "file");
          if (mainCandidate) candidates.push(mainCandidate);
          for (let i = 1; i <= 5; i++) {
            const backupCandidate = getCandidate(`${this.fileBackupPath}.bak${i}`, "file");
            if (backupCandidate) candidates.push(backupCandidate);
          }
          if (candidates.length === 0) return null;
          candidates.sort((a, b) => {
            if (b.quality !== a.quality) return b.quality - a.quality;
            return b.ts - a.ts;
          });
          if (candidates.length > 1) {
            this.debugLog(
              "READ_FILE_BACKUP",
              `Found ${candidates.length} backups. Best: ${candidates[0].path} (Q:${candidates[0].quality})`
            );
          }
          this._fileBackupCache = candidates[0].data;
          return candidates[0].data;
        } catch (error) {
          this.debugError("LOAD_SETTINGS_FILE", error);
          return null;
        }
      },
      // PERF: save-time-only accessor. Returns the in-memory mirror populated by
      // readFileBackup() (load/recovery) or writeFileBackup() (after a write)
      // instead of re-scanning all 6 backup files from disk. Falls back to a
      // real read only if the cache hasn't been warmed yet (e.g. a save races
      // ahead of the first load), so the regression/floor check never goes blind.
      getCachedFileBackup() {
        if (this._fileBackupCache !== null) return this._fileBackupCache;
        return this.readFileBackup();
      },
      writeFileBackup(data) {
        if (!this.fileBackupPath) return false;
        try {
          const fs = require("fs");
          const maxBackups = 5;
          for (let i = maxBackups - 1; i >= 0; i--) {
            const src = i === 0 ? this.fileBackupPath : `${this.fileBackupPath}.bak${i}`;
            const dest = `${this.fileBackupPath}.bak${i + 1}`;
            if (fs.existsSync(src)) {
              try {
                fs.renameSync(src, dest);
              } catch (e) {
                this.debugError("ROTATE_BACKUP", e);
              }
            }
          }
          const jsonStr = JSON.stringify(data, null, 2);
          const tmpPath = `${this.fileBackupPath}.tmp`;
          fs.writeFileSync(tmpPath, jsonStr, "utf8");
          fs.renameSync(tmpPath, this.fileBackupPath);
          this.debugLog("SAVE_SETTINGS", "Saved file backup (rotated)", { path: this.fileBackupPath });
          this._fileBackupCache = data;
          return true;
        } catch (error) {
          this.debugError("SAVE_SETTINGS_FILE", error);
          return false;
        }
      },
      checkBackups() {
        const statuses = [];
        try {
          const main = BdApi.Data.load("SoloLevelingStats", "settings");
          statuses.push(
            main ? `BdApi.Data main: OK (${Object.keys(main).length} keys)` : "BdApi.Data main: MISSING"
          );
        } catch (e) {
          statuses.push(`BdApi.Data main error: ${e.message}`);
        }
        try {
          const backup = BdApi.Data.load("SoloLevelingStats", "settings_backup");
          statuses.push(
            backup ? `BdApi.Data backup: OK (${Object.keys(backup).length} keys)` : "BdApi.Data backup: MISSING"
          );
        } catch (e) {
          statuses.push(`BdApi.Data backup error: ${e.message}`);
        }
        try {
          const exists = this.fileBackupPath && require("fs").existsSync(this.fileBackupPath);
          if (exists) {
            const raw = require("fs").readFileSync(this.fileBackupPath, "utf8");
            const data = JSON.parse(raw);
            statuses.push(
              `File backup: OK (${Object.keys(data || {}).length} keys, ${raw.length} bytes) at ${this.fileBackupPath}`
            );
          } else {
            statuses.push(`File backup: MISSING (${this.fileBackupPath})`);
          }
        } catch (e) {
          statuses.push(`File backup error: ${e.message}`);
        }
        this.debugLog("BACKUP_STATUS", "SoloLevelingStats backup status", { statuses });
        return statuses;
      },
      async restoreFromFileBackupToStores() {
        try {
          const data = this.readFileBackup();
          if (!data) {
            this.debugLog("RESTORE_FILE_BACKUP", "No file backup found to restore.");
            return false;
          }
          this.settings = structuredClone({ ...this.defaultSettings, ...data });
          this.recomputeHPManaFromStats();
          await this.saveSettings(true);
          this.debugLog("RESTORE_FILE_BACKUP", "Restored from file backup and saved to stores", {
            path: this.fileBackupPath
          });
          return true;
        } catch (error) {
          this.debugError("RESTORE_FILE_BACKUP", error);
          return false;
        }
      },
      async checkIndexedDBBackups() {
        const SaveManager = this._UnifiedSaveManager;
        if (!SaveManager) {
          this.debugLog("INDEXEDDB_CHECK", "UnifiedSaveManager not available for IndexedDB checks.");
          return null;
        }
        const manager = new SaveManager("SoloLevelingStats");
        await manager.init();
        const keys = await manager.getAllKeys();
        const result = { keys };
        if (keys.includes("settings") || keys.length === 0) {
          const settings = await manager.load("settings");
          if (settings) {
            result.settings = {
              exists: true,
              keys: Object.keys(settings || {}).length,
              level: settings.level,
              rank: settings.rank,
              totalXP: settings.totalXP
            };
          } else {
            result.settings = { exists: false };
          }
        }
        const backups = await manager.getBackups("settings", 10);
        result.backups = backups.map((b) => {
          var _a, _b;
          return {
            id: b.id,
            timestamp: b.timestamp,
            level: (_a = b.data) == null ? void 0 : _a.level,
            totalXP: (_b = b.data) == null ? void 0 : _b.totalXP
          };
        });
        this.debugLog("INDEXEDDB_STATUS", "IndexedDB status", result);
        return result;
      },
      async restoreFromIndexedDBBackup(backupId = null) {
        const SaveManager = this._UnifiedSaveManager;
        if (!SaveManager) {
          this.debugLog("INDEXEDDB_RESTORE", "UnifiedSaveManager not available for IndexedDB restore.");
          return false;
        }
        const manager = new SaveManager("SoloLevelingStats");
        await manager.init();
        let targetId = backupId;
        if (!targetId) {
          const backups = await manager.getBackups("settings", 1);
          if (!backups.length) {
            this.debugError("INDEXEDDB_RESTORE", "No IndexedDB backups found.");
            return false;
          }
          targetId = backups[0].id;
        }
        const data = await manager.restoreFromBackup("settings", targetId);
        if (!data) {
          this.debugError("INDEXEDDB_RESTORE", "Failed to restore from IndexedDB backup.");
          return false;
        }
        this.settings = structuredClone({ ...this.defaultSettings, ...data });
        this.recomputeHPManaFromStats();
        await this.saveSettings(true);
        this.debugLog("RESTORE_INDEXEDDB", "Restored from IndexedDB backup", { backupId: targetId });
        return true;
      },
      registerBackupConsoleHooks() {
        if (!window.SLSBackupTool) {
          window.SLSBackupTool = {};
        }
        window.SLSBackupTool.checkBackups = () => this.checkBackups();
        window.SLSBackupTool.restoreFromFile = () => this.restoreFromFileBackupToStores();
        window.SLSBackupTool.checkIndexedDB = () => this.checkIndexedDBBackups();
        window.SLSBackupTool.restoreIndexedDB = (backupId) => this.restoreFromIndexedDBBackup(backupId);
      }
    };
  }
});

// src/SoloLevelingStats/settings-store.js
var require_settings_store = __commonJS({
  "src/SoloLevelingStats/settings-store.js"(exports2, module2) {
    module2.exports = {
      recomputeHPManaFromStats(totalStatsOverride = null) {
        const totalStats = totalStatsOverride || this.getTotalEffectiveStats();
        const vitality = totalStats.vitality || 0;
        const intelligence = totalStats.intelligence || 0;
        const userRank = this.settings.rank || "E";
        const maxHP = this.calculateHP(vitality, userRank);
        const maxMana = this.calculateMana(intelligence);
        const prevMaxHP = this.settings.userMaxHP || maxHP;
        const prevHP = this.settings.userHP ?? prevMaxHP;
        const hpPercent = prevMaxHP > 0 ? Math.min(prevHP / prevMaxHP, 1) : 1;
        this.settings.userMaxHP = maxHP;
        this.settings.userHP = Math.min(maxHP, Math.floor(maxHP * hpPercent));
        const prevMaxMana = this.settings.userMaxMana || maxMana;
        const prevMana = this.settings.userMana ?? prevMaxMana;
        const manaPercent = prevMaxMana > 0 ? Math.min(prevMana / prevMaxMana, 1) : 1;
        this.settings.userMaxMana = maxMana;
        this.settings.userMana = Math.min(maxMana, Math.floor(maxMana * manaPercent));
      },
      syncHPManaForDisplay(totalStatsOverride = null) {
        const totalStats = totalStatsOverride || this.getTotalEffectiveStats();
        const vitality = totalStats.vitality || 0;
        const intelligence = totalStats.intelligence || 0;
        const userRank = this.settings.rank || "E";
        const nextMaxHP = this.calculateHP(vitality, userRank);
        const nextMaxMana = this.calculateMana(intelligence);
        const needsMaxSync = this.settings.userMaxHP !== nextMaxHP || this.settings.userMaxMana !== nextMaxMana;
        const needsCurrentInit = !Number.isFinite(this.settings.userHP) || !Number.isFinite(this.settings.userMana);
        if (needsMaxSync || needsCurrentInit) {
          this.recomputeHPManaFromStats(totalStats);
          return true;
        }
        return false;
      },
      _hasProgressCoreFields(data) {
        const hasNonDefaultRank = typeof data.rank === "string" && data.rank !== "E";
        return Number(data.level || 0) > 1 || Number(data.totalXP || 0) > 0 || Number(data.xp || 0) > 0 || Number(data.unallocatedStatPoints || 0) > 0 || hasNonDefaultRank;
      },
      _hasProgressStatGrowth(stats) {
        const statKeys = this.getStatKeys();
        for (let i = 0; i < statKeys.length; i++) {
          const key = statKeys[i];
          if (this.normalizeNumber(stats == null ? void 0 : stats[key], 0) > 0) {
            return true;
          }
        }
        return false;
      },
      _hasProgressActivity(activity) {
        return Number((activity == null ? void 0 : activity.messagesSent) || 0) > 0 || Number((activity == null ? void 0 : activity.charactersTyped) || 0) > 0 || Number((activity == null ? void 0 : activity.timeActive) || 0) > 0 || Number((activity == null ? void 0 : activity.critsLanded) || 0) > 0;
      },
      _hasProgressQuestState(quests) {
        const questValues = Object.values(quests || {});
        for (let i = 0; i < questValues.length; i++) {
          const quest = questValues[i];
          if (quest && (Number(quest.progress || 0) > 0 || quest.completed === true)) {
            return true;
          }
        }
        return false;
      },
      _hasProgressAchievements(achievements) {
        return Array.isArray(achievements == null ? void 0 : achievements.unlocked) && achievements.unlocked.length > 0 || Array.isArray(achievements == null ? void 0 : achievements.titles) && achievements.titles.length > 0 || Boolean(achievements == null ? void 0 : achievements.activeTitle);
      },
      _isRealProgressState(data) {
        var _a;
        if (!data || typeof data !== "object") return false;
        if (this._hasProgressCoreFields(data)) return true;
        if (this._hasProgressStatGrowth(data.stats || {})) return true;
        if (this._hasProgressActivity(data.activity || {})) return true;
        if (this._hasProgressQuestState(((_a = data.dailyQuests) == null ? void 0 : _a.quests) || {})) return true;
        if (this._hasProgressAchievements(data.achievements || {})) return true;
        return false;
      },
      _createProgressProbeMatch(source, data) {
        if (!this._isRealProgressState(data)) return null;
        return {
          found: true,
          source,
          level: Number((data == null ? void 0 : data.level) || 0),
          totalXP: Number((data == null ? void 0 : data.totalXP) || 0)
        };
      },
      async _probeRealProgressSource(source, loadFn) {
        try {
          const loaded = await loadFn();
          return this._createProgressProbeMatch(source, loaded);
        } catch (err) {
          this.debugError("PROBE_REAL_PROGRESS", err, { source });
          return null;
        }
      },
      _probeRealProgressCollection(source, items) {
        if (!Array.isArray(items)) return null;
        for (let i = 0; i < items.length; i++) {
          const match = this._createProgressProbeMatch(source, items[i]);
          if (match) return match;
        }
        return null;
      },
      async _detectPersistedRealProgress() {
        const fileMatch = await this._probeRealProgressSource("file", async () => this.readFileBackup());
        if (fileMatch) return fileMatch;
        if (this.saveManager) {
          const indexedDbMainMatch = await this._probeRealProgressSource(
            "indexeddb-main",
            async () => this.saveManager.load("settings")
          );
          if (indexedDbMainMatch) return indexedDbMainMatch;
          try {
            const backups = await this.saveManager.getBackups("settings", 3);
            const backupData = backups.map((backup) => backup == null ? void 0 : backup.data);
            const indexedDbBackupMatch = this._probeRealProgressCollection("indexeddb-backup", backupData);
            if (indexedDbBackupMatch) return indexedDbBackupMatch;
          } catch (_) {
          }
        }
        const bdMainMatch = await this._probeRealProgressSource(
          "bdapi-main",
          async () => BdApi.Data.load("SoloLevelingStats", "settings")
        );
        if (bdMainMatch) return bdMainMatch;
        const bdBackupMatch = await this._probeRealProgressSource(
          "bdapi-backup",
          async () => BdApi.Data.load("SoloLevelingStats", "settings_backup")
        );
        if (bdBackupMatch) return bdBackupMatch;
        const legacyMatch = await this._probeRealProgressSource(
          "legacy-file",
          async () => this._readLegacySettingsFile()
        );
        if (legacyMatch) return legacyMatch;
        return { found: false };
      },
      _getSavedTimestamp(data) {
        var _a;
        const iso = (_a = data == null ? void 0 : data._metadata) == null ? void 0 : _a.lastSave;
        const ts = iso ? Date.parse(iso) : NaN;
        return Number.isFinite(ts) ? ts : 0;
      },
      _collectSettingsCandidate(candidates, source, data) {
        if (!data || typeof data !== "object") return;
        candidates.push({ source, data, ts: this._getSavedTimestamp(data) });
      },
      _getLegacySettingsPath() {
        const pathModule = require("path");
        return pathModule.join(BdApi.Plugins.folder, "SoloLevelingStats.data.json");
      },
      _readLegacySettingsFile() {
        const fs = require("fs");
        const legacyPath = this._getLegacySettingsPath();
        if (!fs.existsSync(legacyPath)) return null;
        const legacyRaw = fs.readFileSync(legacyPath, "utf8");
        return JSON.parse(legacyRaw);
      },
      async _collectSettingsLoadCandidates() {
        var _a;
        const candidates = [];
        try {
          this._collectSettingsCandidate(candidates, "file", this.readFileBackup());
        } catch (error) {
          this.debugError("LOAD_SETTINGS", "File backup load failed", error);
        }
        if (this.saveManager) {
          try {
            this._collectSettingsCandidate(candidates, "indexeddb", await this.saveManager.load("settings"));
          } catch (error) {
            this.debugError("LOAD_SETTINGS", "IndexedDB load failed", error);
          }
          try {
            const backups = await this.saveManager.getBackups("settings", 1);
            const indexedDbBackupData = Array.isArray(backups) ? (_a = backups[0]) == null ? void 0 : _a.data : null;
            this._collectSettingsCandidate(candidates, "indexeddb-backup", indexedDbBackupData);
          } catch (error) {
            this.debugError("LOAD_SETTINGS", "IndexedDB backup candidate load failed", error);
          }
        }
        try {
          this._collectSettingsCandidate(candidates, "bdapi", BdApi.Data.load("SoloLevelingStats", "settings"));
        } catch (error) {
          this.debugError("LOAD_SETTINGS", "BdApi.Data load failed", error);
        }
        try {
          this._collectSettingsCandidate(
            candidates,
            "bdapi-backup",
            BdApi.Data.load("SoloLevelingStats", "settings_backup")
          );
        } catch (error) {
          this.debugError("LOAD_SETTINGS", "BdApi.Data backup candidate load failed", error);
        }
        try {
          const legacySaved = this._readLegacySettingsFile();
          if (legacySaved && typeof legacySaved === "object") {
            this._collectSettingsCandidate(candidates, "legacy-file", legacySaved);
            this.debugLog("LOAD_SETTINGS", "Found legacy .data.json backup", {
              level: legacySaved.level,
              rank: legacySaved.rank,
              ts: this._getSavedTimestamp(legacySaved)
            });
          }
        } catch (error) {
          this.debugError("LOAD_SETTINGS", "Legacy .data.json load failed", error);
        }
        return candidates;
      },
      _getSettingsSourcePriority(source) {
        const sourcePriority = {
          indexeddb: 3,
          "indexeddb-backup": 2.5,
          file: 2,
          "legacy-file": 1.5,
          "bdapi-backup": 1.25,
          bdapi: 1
        };
        return sourcePriority[source] ?? 0;
      },
      _getSettingsCandidateQuality(data) {
        if (!data || typeof data !== "object") return 0;
        const stats = data.stats || {};
        const statSum = this.sumStatBlock(stats);
        return (Number(data.level) || 0) * 1e3 + statSum + (Number(data.totalXP || data.xp) || 0) * 0.01;
      },
      _sanitizeAndScoreSettingsCandidates(candidates) {
        var _a;
        const maxValidTimestamp = Date.now() + 864e5;
        for (let i = 0; i < candidates.length; i++) {
          const candidate = candidates[i];
          let quality = 0;
          try {
            quality = this._getSettingsCandidateQuality(candidate.data);
          } catch (error) {
            this.debugError("LOAD_SETTINGS", "Candidate quality scoring failed", error, {
              source: candidate.source,
              level: (_a = candidate.data) == null ? void 0 : _a.level
            });
          }
          candidate.quality = Number.isFinite(quality) && quality >= 0 ? quality : 0;
          if (candidate.ts <= maxValidTimestamp) continue;
          this.debugLog("LOAD_SETTINGS", `WARNING: Clamped future timestamp from ${candidate.source}`, {
            originalTs: new Date(candidate.ts).toISOString(),
            clampedTo: new Date(maxValidTimestamp).toISOString()
          });
          candidate.ts = 0;
        }
      },
      _pickBestSettingsCandidate(candidates, logSelection = true) {
        this._sanitizeAndScoreSettingsCandidates(candidates);
        const best = candidates.reduce(
          (acc, cur) => {
            const qualityRatio = acc.quality > 0 ? cur.quality / acc.quality : cur.quality > 0 ? Infinity : 1;
            if (qualityRatio > 1.1) return cur;
            if (qualityRatio < 0.91) return acc;
            const hasNewerTimestamp = cur.ts > acc.ts;
            const isTie = cur.ts === acc.ts;
            const hasHigherPriority = this._getSettingsSourcePriority(cur.source) >= this._getSettingsSourcePriority(acc.source);
            return hasNewerTimestamp || isTie && hasHigherPriority ? cur : acc;
          },
          { source: null, data: null, ts: 0, quality: 0 }
        );
        if (logSelection) {
          const saved = best.data;
          this.debugLog(
            "LOAD_SETTINGS",
            saved ? "Selected settings candidate" : "WARNING: No valid candidate found",
            {
              winner: best.source,
              winnerLevel: saved == null ? void 0 : saved.level,
              winnerQuality: best.quality,
              candidateCount: candidates.length,
              allCandidates: candidates.map((candidate) => {
                var _a;
                return {
                  source: candidate.source,
                  level: (_a = candidate.data) == null ? void 0 : _a.level,
                  quality: candidate.quality,
                  ts: candidate.ts ? new Date(candidate.ts).toISOString() : "none"
                };
              })
            }
          );
        }
        return best;
      },
      _estimateTotalXPForState(data) {
        const directTotalXp = Number(data == null ? void 0 : data.totalXP);
        if (Number.isFinite(directTotalXp) && directTotalXp >= 0) {
          return directTotalXp;
        }
        const level = Math.max(1, Math.floor(Number(data == null ? void 0 : data.level) || 1));
        const xp = Math.max(0, Number(data == null ? void 0 : data.xp) || 0);
        let totalXPNeeded = 0;
        for (let l = 1; l < level; l++) {
          totalXPNeeded += this.getXPRequiredForLevel(l);
        }
        return totalXPNeeded + xp;
      },
      async _getPersistedSaveFloorCandidate(preReadFileBackup) {
        var _a;
        const candidates = [];
        const fileBackup = arguments.length > 0 ? preReadFileBackup : this.readFileBackup();
        try {
          this._collectSettingsCandidate(candidates, "file", fileBackup);
        } catch (_) {
        }
        try {
          this._collectSettingsCandidate(candidates, "bdapi", BdApi.Data.load("SoloLevelingStats", "settings"));
        } catch (_) {
        }
        try {
          this._collectSettingsCandidate(
            candidates,
            "bdapi-backup",
            BdApi.Data.load("SoloLevelingStats", "settings_backup")
          );
        } catch (_) {
        }
        if (this.saveManager) {
          try {
            this._collectSettingsCandidate(candidates, "indexeddb", await this.saveManager.load("settings"));
          } catch (_) {
          }
          try {
            const backups = await this.saveManager.getBackups("settings", 1);
            const indexedDbBackupData = Array.isArray(backups) ? (_a = backups[0]) == null ? void 0 : _a.data : null;
            this._collectSettingsCandidate(candidates, "indexeddb-backup", indexedDbBackupData);
          } catch (_) {
          }
        }
        if (candidates.length === 0) return null;
        return this._pickBestSettingsCandidate(candidates, false);
      },
      /**
       * Cheap structural sanity check for a candidate that is about to be PROMOTED
       * TO CANONICAL by a backup restore.
       *
       * Deliberately only the three corruption checks _validateCleanSettingsForSave
       * opens with — invalid level, invalid XP, all-stats-zero above level 5 — and
       * NOT the full save-path validator. That one also runs regression checks
       * against the file-backup cache and is built to ABORT; running it here could
       * block a legitimate recovery, which is strictly worse than restoring a
       * slightly stale backup.
       *
       * Failing this does NOT stop the backup being returned and used for this
       * session — it only stops corrupt data being written over the main store,
       * where it would become the thing every future load trusts.
       */
      _isStructurallySaneForPromotion(candidate) {
        if (!candidate || typeof candidate !== "object") return false;
        if (!candidate.level || candidate.level < 1 || !Number.isInteger(candidate.level)) return false;
        if (typeof candidate.xp !== "number" || isNaN(candidate.xp) || candidate.xp < 0) return false;
        const statSum = Object.values(candidate.stats || {}).reduce((a, b) => a + (Number(b) || 0), 0);
        if (statSum === 0 && candidate.level > 5 && (candidate.unallocatedStatPoints || 0) === 0) return false;
        return true;
      },
      async _tryIndexedDbBackupRestore() {
        if (!this.saveManager) return null;
        try {
          const backups = await this.saveManager.getBackups("settings", 1);
          if (!backups.length) return null;
          const backupData = backups[0].data;
          this.debugLog("LOAD_SETTINGS", "Loaded from IndexedDB backup");
          if (this._isStructurallySaneForPromotion(backupData)) {
            try {
              await this.saveManager.save("settings", backupData);
              this.debugLog("LOAD_SETTINGS", "Restored backup to main");
            } catch (restoreError) {
              this.debugError("LOAD_SETTINGS", "Failed to restore backup", restoreError);
            }
          } else {
            this.debugError(
              "LOAD_SETTINGS",
              new Error(
                `IndexedDB backup failed structural checks (level=${backupData == null ? void 0 : backupData.level}, xp=${backupData == null ? void 0 : backupData.xp}) \u2014 using it for this session but NOT promoting it to the main store`
              )
            );
          }
          return backupData;
        } catch (error) {
          this.debugError("LOAD_SETTINGS", "IndexedDB backup load failed", error);
          return null;
        }
      },
      async _tryBdApiBackupRestore() {
        try {
          const saved = BdApi.Data.load("SoloLevelingStats", "settings_backup");
          if (!saved) return null;
          this.debugLog("LOAD_SETTINGS", "Loaded from BdApi.Data backup");
          if (this.saveManager) {
            if (this._isStructurallySaneForPromotion(saved)) {
              try {
                await this.saveManager.save("settings", saved);
                this.debugLog("LOAD_SETTINGS", "Migrated backup to IndexedDB");
              } catch (migrateError) {
                this.debugError("LOAD_SETTINGS", "Migration failed", migrateError);
              }
            } else {
              this.debugError(
                "LOAD_SETTINGS",
                new Error(
                  `BdApi.Data backup failed structural checks (level=${saved == null ? void 0 : saved.level}, xp=${saved == null ? void 0 : saved.xp}) \u2014 using it for this session but NOT migrating it to IndexedDB`
                )
              );
            }
          }
          return saved;
        } catch (error) {
          this.debugError("LOAD_SETTINGS", "BdApi.Data backup load failed", error);
          return null;
        }
      },
      _ensureActivityChannelsVisitedSet() {
        var _a, _b;
        if (Array.isArray((_a = this.settings.activity) == null ? void 0 : _a.channelsVisited)) {
          this.settings.activity.channelsVisited = new Set(this.settings.activity.channelsVisited);
          this.debugLog("LOAD_SETTINGS", "Converted channelsVisited array to Set");
          return;
        }
        if (!(((_b = this.settings.activity) == null ? void 0 : _b.channelsVisited) instanceof Set)) {
          this.settings.activity.channelsVisited = /* @__PURE__ */ new Set();
          this.debugLog("LOAD_SETTINGS", "Initialized new channelsVisited Set");
        }
      },
      _ensureSettingsStatsInitialized() {
        if (!this.settings.stats || typeof this.settings.stats !== "object") {
          this.settings.stats = this.createEmptyStatBlock();
          this.debugLog("LOAD_SETTINGS", "Stats object was missing, initialized from defaults");
          return;
        }
        const mergedStats = { ...this.defaultSettings.stats, ...this.settings.stats };
        if (mergedStats.perception == null && mergedStats.luck != null) {
          mergedStats.perception = mergedStats.luck;
        }
        this.settings.stats = this.normalizeStatBlock(mergedStats, 0);
        this.debugLog("LOAD_SETTINGS", "Stats merged with defaults", {
          strength: this.settings.stats.strength,
          agility: this.settings.stats.agility,
          intelligence: this.settings.stats.intelligence,
          vitality: this.settings.stats.vitality,
          perception: this.settings.stats.perception
        });
      },
      _initializeLoadedSettings(saved) {
        var _a;
        const merged = { ...this.defaultSettings, ...saved };
        this.settings = structuredClone(merged);
        this.debugLog("LOAD_SETTINGS", "Settings merged (deep copy)", {
          level: this.settings.level,
          rank: this.settings.rank,
          totalXP: this.settings.totalXP
        });
        this.migrateData();
        this._ensureActivityChannelsVisitedSet();
        this._ensureSettingsStatsInitialized();
        if (!Array.isArray(this.settings.perceptionBuffs)) {
          this.settings.perceptionBuffs = [];
        }
        if (!this.settings.level || typeof this.settings.level !== "number" || this.settings.level < 1) {
          this.debugLog("LOAD_SETTINGS", "Level missing or invalid, initializing from totalXP");
          const levelInfo = this.getCurrentLevel();
          this.settings.level = levelInfo.level || 1;
        }
        const derivedLevelInfo = this.getCurrentLevel();
        if (typeof (derivedLevelInfo == null ? void 0 : derivedLevelInfo.level) === "number" && derivedLevelInfo.level !== this.settings.level) {
          this.debugLog("LOAD_SETTINGS", "Level/totalXP mismatch on load \u2014 recomputing", {
            storedLevel: this.settings.level,
            storedXp: this.settings.xp,
            derivedLevel: derivedLevelInfo.level,
            derivedXp: derivedLevelInfo.xp
          });
          this.settings.level = derivedLevelInfo.level;
          this.settings.xp = derivedLevelInfo.xp;
          this._needsPostLoadSave = true;
        }
        (_a = this.invalidatePerformanceCache) == null ? void 0 : _a.call(this, ["currentLevel"]);
        this.recomputeHPManaFromStats();
        this._hasRealProgress = this._isRealProgressState(this.settings);
        this._startupProgressProbeComplete = this._hasRealProgress;
        this._startupLoadComplete = true;
      },
      async _applyLoadedSettings(saved, source, loadedFromFile) {
        this._initializeLoadedSettings(saved);
        this.debugLog("LOAD_SETTINGS", "Startup load confirmed \u2014 saves unlocked", {
          level: this.settings.level,
          totalXP: this.settings.totalXP,
          source,
          hasRealProgress: this._hasRealProgress
        });
        if (loadedFromFile || this._needsPostLoadSave) {
          try {
            await this.saveSettings(true);
            this.debugLog("LOAD_SETTINGS", "Persisted post-load reconciled settings", {
              loadedFromFile,
              reconciledOnLoad: !!this._needsPostLoadSave
            });
          } catch (saveErr) {
            this.debugError("LOAD_SETTINGS", "Failed to push post-load save", saveErr);
          } finally {
            this._needsPostLoadSave = false;
          }
        }
        this.ensureValidTotalXP("LOAD_SETTINGS");
        this.debugLog("LOAD_SETTINGS", "Settings loaded successfully", {
          level: this.settings.level,
          totalXP: this.settings.totalXP,
          messagesSent: this.settings.activity.messagesSent,
          rank: this.settings.rank
        });
        this.emitXPChanged();
      },
      async _attemptLegacyRescue() {
        var _a;
        try {
          const rescueCandidates = [];
          try {
            this._collectSettingsCandidate(rescueCandidates, "file", this.readFileBackup());
          } catch (_) {
          }
          if (this.saveManager) {
            try {
              this._collectSettingsCandidate(
                rescueCandidates,
                "indexeddb",
                await this.saveManager.load("settings")
              );
            } catch (_) {
            }
            try {
              const backups = await this.saveManager.getBackups("settings", 1);
              const indexeddbBackupData = Array.isArray(backups) ? (_a = backups[0]) == null ? void 0 : _a.data : null;
              this._collectSettingsCandidate(rescueCandidates, "indexeddb-backup", indexeddbBackupData);
            } catch (_) {
            }
          }
          try {
            this._collectSettingsCandidate(
              rescueCandidates,
              "bdapi",
              BdApi.Data.load("SoloLevelingStats", "settings")
            );
          } catch (_) {
          }
          try {
            this._collectSettingsCandidate(
              rescueCandidates,
              "bdapi-backup",
              BdApi.Data.load("SoloLevelingStats", "settings_backup")
            );
          } catch (_) {
          }
          let legacyData = null;
          try {
            legacyData = this._readLegacySettingsFile();
          } catch (_) {
          }
          if (legacyData && typeof legacyData === "object") {
            this._collectSettingsCandidate(rescueCandidates, "legacy-file", legacyData);
          }
          const best = this._pickBestSettingsCandidate(rescueCandidates, true);
          const selected = best == null ? void 0 : best.data;
          if (!selected || !this._isRealProgressState(selected)) return false;
          this.debugLog("RESCUE", "Rescue selected best persisted candidate", {
            source: best.source,
            level: Number(selected.level || 0),
            totalXP: Number(selected.totalXP || 0),
            quality: best.quality,
            candidateCount: rescueCandidates.length
          });
          this._initializeLoadedSettings(selected);
          this._hasRealProgress = true;
          this._startupProgressProbeComplete = true;
          this._startupLoadComplete = true;
          try {
            await this.saveSettings(true);
          } catch (_) {
          }
          return true;
        } catch (legacyErr) {
          this.debugError("LOAD_SETTINGS", "Legacy rescue check failed", legacyErr);
          return false;
        }
      },
      _initializeFreshSettingsState() {
        this.settings = structuredClone(this.defaultSettings);
        this.settings.activity.channelsVisited = /* @__PURE__ */ new Set();
        this._hasRealProgress = false;
        this._startupProgressProbeComplete = false;
        this._startupLoadComplete = true;
        this.debugLog("LOAD_SETTINGS", "No saved data found anywhere (including legacy), using defaults");
      },
      _initializeFallbackSettingsAfterLoadError(error) {
        this.debugError("LOAD_SETTINGS", error, { phase: "load_settings" });
        this.settings = structuredClone(this.defaultSettings);
        this.settings.activity.channelsVisited = /* @__PURE__ */ new Set();
      },
      async loadSettings() {
        try {
          this.debugLog("LOAD_SETTINGS", "Attempting to load settings...");
          const candidates = await this._collectSettingsLoadCandidates();
          const best = this._pickBestSettingsCandidate(candidates, true);
          const loadedFromFile = best.source === "file";
          let saved = best.data;
          let source = best.source;
          if (!saved) {
            saved = await this._tryIndexedDbBackupRestore();
            if (saved) source = "indexeddb-backup";
          }
          if (!saved) {
            saved = await this._tryBdApiBackupRestore();
            if (saved) source = "bdapi-backup";
          }
          if (saved && typeof saved === "object") {
            try {
              await this._applyLoadedSettings(saved, source, loadedFromFile);
            } catch (error) {
              this.debugError("LOAD_SETTINGS", error, { phase: "settings_merge" });
              throw error;
            }
            return;
          }
          const rescuedFromLegacy = await this._attemptLegacyRescue();
          if (!rescuedFromLegacy) {
            this._initializeFreshSettingsState();
          }
        } catch (error) {
          this._initializeFallbackSettingsAfterLoadError(error);
          try {
            const rescued = await this._attemptLegacyRescue();
            if (rescued) {
              this.debugLog("RESCUE", "ERROR-PATH RESCUE: Found real progress in legacy .data.json");
            }
          } catch (_) {
          }
          this._hasRealProgress = this._isRealProgressState(this.settings);
          this._startupProgressProbeComplete = this._hasRealProgress;
          this._startupLoadComplete = true;
        }
      },
      withAutoSave(modifyFn, immediate = false) {
        const executeAndSave = () => {
          const result = modifyFn();
          this.saveSettings(immediate);
          return result;
        };
        return executeAndSave();
      },
      shareShadowXP(xpAmount, source = "message") {
        var _a, _b;
        const shareWithPlugin = (plugin) => {
          plugin.instance.shareShadowXP(xpAmount, source);
          this.debugConsole("[SHADOW XP]", `Shared ${xpAmount} XP (${source})`);
          return true;
        };
        const logError = (error) => {
          this.debugLog("SHADOW_XP_SHARE", `ShadowArmy integration: ${error.message}`);
          return null;
        };
        try {
          const saInstance = (_b = (_a = this._SLUtils) == null ? void 0 : _a.getPluginInstance) == null ? void 0 : _b.call(_a, "ShadowArmy");
          if (!saInstance || typeof saInstance.shareShadowXP !== "function") return null;
          return shareWithPlugin({ instance: saInstance });
        } catch (error) {
          return logError(error);
        }
      },
      async saveSettings(immediate = false) {
        if (!this.settings) {
          this.debugError("SAVE_SETTINGS", new Error("Settings not initialized"));
          return;
        }
        if (this._startupLoadComplete === false) {
          this.debugLog("SAVE_SETTINGS", "BLOCKED \u2014 startup load not yet complete, refusing to save");
          return;
        }
        if (immediate) {
          if (this._saveSettingsTimer) {
            clearTimeout(this._saveSettingsTimer);
            this._saveSettingsTimer = null;
          }
          return Promise.resolve(this._saveSettingsImmediate()).then(() => {
            this._settingsDirty = false;
          }).catch((err) => {
            var _a;
            (_a = this.debugError) == null ? void 0 : _a.call(this, "SAVE_SETTINGS_IMMEDIATE", err);
          });
        }
        this._settingsDirty = true;
        if (this._saveSettingsTimer) return;
        this._saveSettingsTimer = setTimeout(() => {
          this._saveSettingsTimer = null;
          if (!this._settingsDirty) return;
          Promise.resolve(this._saveSettingsImmediate()).then(() => {
            this._settingsDirty = false;
          }).catch((err) => {
            var _a;
            (_a = this.debugError) == null ? void 0 : _a.call(this, "SAVE_SETTINGS_DEBOUNCED", err);
          });
        }, 2e4);
      },
      async _runStartupSaveProbeGuard() {
        var _a;
        if (this._startupProgressProbeComplete) return true;
        const probeResult = await this._detectPersistedRealProgress();
        this._startupProgressProbeComplete = true;
        const currentLooksFresh = !this._isRealProgressState(this.settings);
        if (!probeResult.found || !currentLooksFresh) return true;
        this.debugLog(
          "SAVE_GUARD",
          `BLOCKED save: found persisted progress in ${probeResult.source} (level ${probeResult.level}, totalXP ${probeResult.totalXP}) while current state looks fresh. Reloading instead of overwriting.`
        );
        try {
          await this.loadSettings();
        } catch (err) {
          (_a = this.debugError) == null ? void 0 : _a.call(this, "SAVE_GUARD_REMEDIAL_LOAD", err);
        }
        return false;
      },
      _syncBonusesForSave() {
        if (!this.settings || !this.settings.stats) {
          this.debugError(
            "SAVE_SETTINGS",
            new Error("Settings or stats not initialized - cannot save bonuses")
          );
          return;
        }
        try {
          this.saveAgilityBonus();
        } catch (error) {
          this.debugError("SAVE_AGILITY_BONUS_IN_SAVE", error);
        }
      },
      _createCleanSettingsForSave() {
        var _a, _b, _c;
        const settingsToSave = {
          ...this.settings,
          activity: {
            ...this.settings.activity,
            channelsVisited: ((_a = this.settings.activity) == null ? void 0 : _a.channelsVisited) instanceof Set ? Array.from(this.settings.activity.channelsVisited) : Array.isArray((_b = this.settings.activity) == null ? void 0 : _b.channelsVisited) ? this.settings.activity.channelsVisited : []
          },
          _metadata: {
            lastSave: (/* @__PURE__ */ new Date()).toISOString(),
            version: ((_c = this.meta) == null ? void 0 : _c.version) || "3.0.5"
          }
        };
        const cleanSettings = structuredClone(settingsToSave);
        this._hasRealProgress = this._isRealProgressState(cleanSettings) || this._hasRealProgress;
        return cleanSettings;
      },
      async _validateCleanSettingsForSave(cleanSettings) {
        if (!cleanSettings.level || cleanSettings.level < 1 || !Number.isInteger(cleanSettings.level)) {
          this.debugError(
            "SAVE_SETTINGS",
            new Error(
              `Invalid level detected: ${cleanSettings.level}. Aborting save to prevent data corruption.`
            )
          );
          return { isValid: false, statSum: 0 };
        }
        if (typeof cleanSettings.xp !== "number" || isNaN(cleanSettings.xp) || cleanSettings.xp < 0) {
          this.debugError(
            "SAVE_SETTINGS",
            new Error(`Invalid XP detected: ${cleanSettings.xp}. Aborting save to prevent data corruption.`)
          );
          return { isValid: false, statSum: 0 };
        }
        const statSum = Object.values(cleanSettings.stats || {}).reduce((a, b) => a + (Number(b) || 0), 0);
        if (statSum === 0 && cleanSettings.level > 5 && (cleanSettings.unallocatedStatPoints || 0) === 0) {
          this.debugError(
            "SAVE_SETTINGS",
            new Error(
              `All stats are zero at level ${cleanSettings.level}. Aborting save to prevent data wipe.`
            )
          );
          return { isValid: false, statSum };
        }
        let existingFileBackup;
        let existingFileBackupRead = false;
        try {
          existingFileBackup = this.getCachedFileBackup();
          existingFileBackupRead = true;
          if (existingFileBackup == null ? void 0 : existingFileBackup.stats) {
            const existingStatSum = Object.values(existingFileBackup.stats).reduce(
              (a, b) => a + (Number(b) || 0),
              0
            );
            if (existingStatSum > 0 && statSum < existingStatSum * 0.5) {
              this.debugError(
                "SAVE_SETTINGS",
                new Error(
                  `Stats regression detected: current ${statSum} vs backup ${existingStatSum} (>50% drop). Aborting save.`
                )
              );
              return { isValid: false, statSum };
            }
          }
        } catch (regressionCheckError) {
          this.debugError("SAVE_SETTINGS", "Regression check failed (non-fatal)", regressionCheckError);
        }
        try {
          const persistedFloor = existingFileBackupRead ? await this._getPersistedSaveFloorCandidate(existingFileBackup) : await this._getPersistedSaveFloorCandidate();
          const floorData = persistedFloor == null ? void 0 : persistedFloor.data;
          const hasFloorProgress = floorData && this._isRealProgressState(floorData);
          const hasCurrentProgress = this._isRealProgressState(cleanSettings);
          if (hasFloorProgress && hasCurrentProgress) {
            const floorLevel = Number(floorData.level || 0);
            const currentLevel = Number(cleanSettings.level || 0);
            const floorTotalXP = this._estimateTotalXPForState(floorData);
            const currentTotalXP = this._estimateTotalXPForState(cleanSettings);
            const floorQuality = this._getSettingsCandidateQuality({ ...floorData, totalXP: floorTotalXP });
            const currentQuality = this._getSettingsCandidateQuality({ ...cleanSettings, totalXP: currentTotalXP });
            const levelDrop = floorLevel - currentLevel;
            const majorLevelDrop = floorLevel >= 25 && levelDrop >= 5;
            const majorTotalXPDrop = floorTotalXP >= 1e5 && currentTotalXP <= floorTotalXP * 0.75;
            const majorQualityDrop = floorQuality > 0 && currentQuality <= floorQuality * 0.75;
            const regressionDetected = majorLevelDrop || majorTotalXPDrop || majorQualityDrop;
            let allowRollback = this._allowProgressRollbackSave === true;
            try {
              allowRollback = allowRollback || typeof window !== "undefined" && window.__SLS_ALLOW_REGRESSION_SAVE__ === true;
            } catch (_) {
            }
            if (regressionDetected && !allowRollback) {
              this.debugError(
                "SAVE_SETTINGS",
                new Error(
                  `Progress regression blocked: current L${currentLevel}/XP ${currentTotalXP} vs persisted floor from ${persistedFloor.source || "unknown"} L${floorLevel}/XP ${floorTotalXP}.`
                )
              );
              return { isValid: false, statSum };
            }
          }
        } catch (saveFloorError) {
          this.debugError("SAVE_SETTINGS", "Persisted save floor check failed (non-fatal)", saveFloorError);
        }
        return { isValid: true, statSum };
      },
      _ensureValidTotalXpForSave(cleanSettings) {
        if (typeof cleanSettings.totalXP === "number" && !isNaN(cleanSettings.totalXP) && cleanSettings.totalXP >= 0) {
          return;
        }
        const currentLevel = cleanSettings.level || 1;
        let totalXPNeeded = 0;
        for (let l = 1; l < currentLevel; l++) {
          totalXPNeeded += this.getXPRequiredForLevel(l);
        }
        cleanSettings.totalXP = totalXPNeeded + (cleanSettings.xp || 0);
        this.debugLog("SAVE_SETTINGS", "Fixed invalid totalXP before save", {
          fixedTotalXP: cleanSettings.totalXP,
          level: currentLevel,
          xp: cleanSettings.xp
        });
      },
      async _saveCleanSettingsToStores(cleanSettings) {
        var _a, _b;
        const fileWriteOk = this.writeFileBackup(cleanSettings);
        if (!fileWriteOk && !this._fileBackupFailureToastShown) {
          this._fileBackupFailureToastShown = true;
          try {
            (_b = (_a = BdApi.UI) == null ? void 0 : _a.showToast) == null ? void 0 : _b.call(
              _a,
              "SoloLevelingStats: file backup write failed \u2014 see console. IDB save will still proceed.",
              { type: "warning", timeout: 8e3 }
            );
          } catch (_) {
          }
        }
        if (this.saveManager) {
          try {
            await this.saveManager.save("settings", cleanSettings, true);
            this.lastSaveTime = Date.now();
            this.debugLog("SAVE_SETTINGS", "Saved to IndexedDB", {
              level: cleanSettings.level,
              xp: cleanSettings.xp,
              timestamp: (/* @__PURE__ */ new Date()).toISOString()
            });
          } catch (error) {
            this.debugError("SAVE_SETTINGS", "IndexedDB save failed", error);
          }
        }
        let saveSuccess = false;
        let lastError = null;
        for (let attempt = 0; attempt < 3; attempt++) {
          try {
            BdApi.Data.save("SoloLevelingStats", "settings", cleanSettings);
            this.lastSaveTime = Date.now();
            saveSuccess = true;
            this.debugLog("SAVE_SETTINGS", "Saved to BdApi.Data", {
              attempt: attempt + 1,
              level: cleanSettings.level,
              xp: cleanSettings.xp,
              timestamp: (/* @__PURE__ */ new Date()).toISOString()
            });
            break;
          } catch (error) {
            lastError = error;
          }
        }
        if (!saveSuccess) {
          this.debugError("SAVE_SETTINGS", "BdApi.Data save failed after 3 attempts", lastError);
        }
        try {
          BdApi.Data.save("SoloLevelingStats", "settings_backup", cleanSettings);
          this.debugLog("SAVE_SETTINGS", "BdApi.Data backup saved");
        } catch (backupError) {
          this.debugError("SAVE_SETTINGS_BACKUP", "BdApi.Data backup save failed", backupError);
        }
      },
      _saveSettingsBackupFallback() {
        var _a, _b;
        try {
          const backupData = JSON.parse(
            JSON.stringify({
              ...this.settings,
              activity: {
                ...this.settings.activity,
                channelsVisited: ((_a = this.settings.activity) == null ? void 0 : _a.channelsVisited) instanceof Set ? Array.from(this.settings.activity.channelsVisited) : Array.isArray((_b = this.settings.activity) == null ? void 0 : _b.channelsVisited) ? this.settings.activity.channelsVisited : []
              }
            })
          );
          BdApi.Data.save("SoloLevelingStats", "settings_backup", backupData);
          this.debugLog("SAVE_SETTINGS", "Backup replaced (fallback after primary save failure)");
        } catch (backupError) {
          this.debugError("SAVE_SETTINGS_BACKUP", backupError);
        }
      },
      async _saveSettingsImmediate() {
        if (!this.settings) return;
        if (this._immediateSaveInFlight) {
          return this._immediateSaveInFlight;
        }
        this._immediateSaveInFlight = (async () => {
          if (!await this._runStartupSaveProbeGuard()) return;
          try {
            this._syncBonusesForSave();
            this.debugLog("SAVE_SETTINGS", "Current settings before save", {
              level: this.settings.level,
              xp: this.settings.xp,
              totalXP: this.settings.totalXP,
              rank: this.settings.rank,
              stats: this.settings.stats,
              unallocatedPoints: this.settings.unallocatedStatPoints
            });
            const cleanSettings = this._createCleanSettingsForSave();
            this._ensureValidTotalXpForSave(cleanSettings);
            const validation = await this._validateCleanSettingsForSave(cleanSettings);
            if (!validation.isValid) return;
            this.debugLog("SAVE_SETTINGS", "Clean settings to be saved", {
              level: cleanSettings.level,
              xp: cleanSettings.xp,
              totalXP: cleanSettings.totalXP,
              rank: cleanSettings.rank,
              stats: cleanSettings.stats,
              statSum: validation.statSum,
              metadata: cleanSettings._metadata
            });
            await this._saveCleanSettingsToStores(cleanSettings);
          } catch (error) {
            this.debugError("SAVE_SETTINGS", error);
            this._saveSettingsBackupFallback();
          }
        })();
        try {
          return await this._immediateSaveInFlight;
        } finally {
          this._immediateSaveInFlight = null;
        }
      },
      createChatUiPreviewPanel() {
        try {
          if (this._settingsPreviewRoot) {
            try {
              this._settingsPreviewRoot.unmount();
            } catch (error) {
              this.debugError("CREATE_CHAT_UI_PREVIEW_PANEL", error, {
                phase: "unmount-previous-preview-root"
              });
            }
            this._settingsPreviewRoot = null;
          }
          this.injectChatUICSS();
          const container = document.createElement("div");
          container.className = "sls-chat-panel";
          container.id = "sls-settings-chat-ui";
          const { StatsPanel } = this._chatUIComponents;
          const root = BdApi.ReactDOM.createRoot(container);
          root.render(BdApi.React.createElement(StatsPanel));
          this._settingsPreviewRoot = root;
          return container;
        } catch (error) {
          this.debugError("CREATE_CHAT_UI_PREVIEW_PANEL", error);
          const fallback = document.createElement("div");
          fallback.className = "sls-chat-panel";
          fallback.innerHTML = `<div style="padding: 20px; color: #fff;">Error creating chat UI preview: ${this.escapeHtml(error.message)}. Check console for details.</div>`;
          return fallback;
        }
      }
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

// src/SoloLevelingStats/activity-tracking.js
var require_activity_tracking = __commonJS({
  "src/SoloLevelingStats/activity-tracking.js"(exports2, module2) {
    var { onKeydown } = require_dom_bus();
    module2.exports = {
      startActivityTracking() {
        if (this.activityTracker) return;
        if (!this.settings.activity.lastActiveTime) {
          this.settings.activity.lastActiveTime = Date.now();
        }
        this.activityTracker = setInterval(() => {
          const now = Date.now();
          const timeDiff = (now - this.settings.activity.lastActiveTime) / 1e3 / 60;
          if (timeDiff < 5) {
            this.settings.activity.timeActive += timeDiff;
            this.settings.activity.lastActiveTime = now;
            if (timeDiff > 0.1) {
              this._settingsDirty = true;
            }
            this.updateQuestProgress("activeAdventurer", timeDiff);
          }
        }, 6e4);
        this._lastActivityReset = 0;
        const resetActivityTimeout = () => {
          const now = Date.now();
          if (now - this._lastActivityReset < 2e3) return;
          this._lastActivityReset = now;
          this.settings.activity.lastActiveTime = now;
        };
        this._activityTrackingHandlers = {
          mousemove: resetActivityTimeout
        };
        document.addEventListener("mousemove", resetActivityTimeout, { passive: true });
        this._activityKeydownUnsub = onKeydown(resetActivityTimeout, { capture: false });
        resetActivityTimeout();
      },
      trackChannelVisit() {
        try {
          const channelInfo = this.getCurrentChannelInfo();
          if (!channelInfo) {
            this.debugLog("TRACK_CHANNEL_VISIT", "No channel info found", {
              currentUrl: window.location.href
            });
            return;
          }
          const { channelId, channelType, serverId, isDM } = channelInfo;
          if (!(this.settings.activity.channelsVisited instanceof Set)) {
            if (Array.isArray(this.settings.activity.channelsVisited)) {
              this.settings.activity.channelsVisited = new Set(this.settings.activity.channelsVisited);
            } else {
              this.settings.activity.channelsVisited = /* @__PURE__ */ new Set();
            }
          }
          const previousSize = this.settings.activity.channelsVisited.size;
          const wasNewChannel = !this.settings.activity.channelsVisited.has(channelId);
          this.settings.activity.channelsVisited.add(channelId);
          if (wasNewChannel || this.debug.verbose) {
            this.debugLog("TRACK_CHANNEL_VISIT", "Channel visit tracked", {
              channelId,
              channelType,
              serverId: serverId || "N/A (DM)",
              isDM,
              wasNewChannel,
              previousCount: previousSize,
              newCount: this.settings.activity.channelsVisited.size,
              totalChannels: this.settings.activity.channelsVisited.size
            });
          }
          if (wasNewChannel) {
            this.debugLog("TRACK_CHANNEL_VISIT", "New channel discovered!", {
              channelId,
              channelType,
              isDM
            });
            this.updateQuestProgress("channelExplorer", 1);
            this.saveSettings(true);
            this.debugLog("TRACK_CHANNEL_VISIT", "Settings saved immediately after new channel visit");
          }
        } catch (error) {
          this.debugError("TRACK_CHANNEL_VISIT", error, {
            currentUrl: window.location.href
          });
        }
      },
      startChannelTracking() {
        var _a, _b, _c;
        try {
          this.debugLog("START_CHANNEL_TRACKING", "Starting real-time channel change detection");
          if (this._channelTrackingHooks) return;
          const state = {
            lastUrl: window.location.href,
            lastChannelId: null
          };
          const initialInfo = this.getCurrentChannelInfo();
          if (initialInfo) {
            state.lastChannelId = initialInfo.channelId;
            this.debugLog("START_CHANNEL_TRACKING", "Initial channel detected", {
              channelId: state.lastChannelId,
              channelType: initialInfo.channelType,
              url: state.lastUrl
            });
          }
          if ((_a = this._PluginUtils) == null ? void 0 : _a.NavigationBus) {
            this._navBusUnsub = this._PluginUtils.NavigationBus.subscribe(({ url }) => {
              if (url !== state.lastUrl) {
                this.debugLog("START_CHANNEL_TRACKING", "URL changed via NavigationBus", {
                  oldUrl: state.lastUrl,
                  newUrl: url
                });
                state.lastUrl = url;
                this._channelInfoCacheUrl = null;
                this._channelInfoCache = null;
                state.lastChannelId = this.handleChannelChange(state.lastChannelId);
              }
            });
          }
          try {
            const SelectedChannelStore = (_c = (_b = BdApi.Webpack).getStore) == null ? void 0 : _c.call(_b, "SelectedChannelStore");
            if (SelectedChannelStore && typeof SelectedChannelStore.addChangeListener === "function") {
              this._channelTrackingStoreListener = () => {
                if (document.hidden) return;
                const currentUrl = window.location.href;
                if (currentUrl !== state.lastUrl) {
                  this.debugLog("START_CHANNEL_TRACKING", "Channel changed via SelectedChannelStore", {
                    oldUrl: state.lastUrl,
                    newUrl: currentUrl
                  });
                  state.lastUrl = currentUrl;
                  this._channelInfoCacheUrl = null;
                  this._channelInfoCache = null;
                  state.lastChannelId = this.handleChannelChange(state.lastChannelId);
                }
              };
              SelectedChannelStore.addChangeListener(this._channelTrackingStoreListener);
              this._channelTrackingStore = SelectedChannelStore;
            }
          } catch (_) {
          }
          this._channelTrackingState = state;
          this._channelTrackingHooks = true;
          this.debugLog("START_CHANNEL_TRACKING", "Channel tracking started successfully", {
            methods: ["NavigationBus", "SelectedChannelStore"]
          });
        } catch (error) {
          this._channelTrackingHooks = null;
          this.debugError("START_CHANNEL_TRACKING", error);
        }
      }
    };
  }
});

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

// src/SoloLevelingStats/rank-progression.js
var require_rank_progression = __commonJS({
  "src/SoloLevelingStats/rank-progression.js"(exports2, module2) {
    module2.exports = {
      getRankPromotionBonusTable() {
        return {
          D: 4,
          C: 6,
          B: 9,
          A: 13,
          S: 19,
          SS: 27,
          SSS: 38,
          "SSS+": 54,
          NH: 76,
          Monarch: 110,
          "Monarch+": 165,
          "Shadow Monarch": 280
        };
      },
      getLegacyRankPromotionBonusTableForBackfill() {
        return {
          D: 2,
          C: 3,
          B: 4,
          A: 5,
          S: 7,
          SS: 9,
          SSS: 11,
          "SSS+": 13,
          NH: 16,
          Monarch: 20,
          "Monarch+": 24,
          "Shadow Monarch": 30
        };
      },
      calculateRankPromotionDampener(averageStat) {
        const safeAverage = Math.max(0, Number(averageStat) || 0);
        if (safeAverage >= 1200) return 0.5;
        if (safeAverage >= 800) return 0.62;
        if (safeAverage >= 500) return 0.75;
        if (safeAverage >= 300) return 0.88;
        return 1;
      },
      getPromotedRanksForRank(rank = ((_a) => (_a = this.settings) == null ? void 0 : _a.rank)()) {
        var _a2, _b;
        const { RANK_ORDER } = require_rank_utils();
        const fallbackRanks = ((_a2 = this.defaultSettings) == null ? void 0 : _a2.ranks) || RANK_ORDER;
        const ranks = Array.isArray((_b = this.settings) == null ? void 0 : _b.ranks) && this.settings.ranks.length ? this.settings.ranks : fallbackRanks;
        const rankIndex = ranks.indexOf(rank);
        if (rankIndex < 0) {
          if (typeof this.debugError === "function") this.debugError("RANK_PROGRESSION", new Error(`Rank not found: ${rank}`));
          return [];
        }
        if (rankIndex === 0) return [];
        return ranks.slice(1, rankIndex + 1);
      },
      async applyRankPromotionBonusBackfill() {
        var _a, _b;
        try {
          if ((_a = this.settings) == null ? void 0 : _a._rankBonusBackfillV2Applied) {
            return { applied: false, reason: "already_applied" };
          }
          if (!((_b = this.settings) == null ? void 0 : _b.stats) || typeof this.settings.stats !== "object") {
            return { applied: false, reason: "missing_stats" };
          }
          const promotedRanks = this.getPromotedRanksForRank();
          if (!promotedRanks.length) {
            return { applied: false, reason: "no_promotions" };
          }
          const currentTable = this.getRankPromotionBonusTable();
          const legacyTable = this.getLegacyRankPromotionBonusTableForBackfill();
          const deltaBase = promotedRanks.reduce((sum, rank) => {
            const currentValue = Number(currentTable[rank] || 0);
            const legacyValue = Number(legacyTable[rank] || 0);
            return sum + Math.max(0, currentValue - legacyValue);
          }, 0);
          if (deltaBase <= 0) {
            return { applied: false, reason: "no_delta", promotedRanks, deltaBase };
          }
          const backupKey = `rankBonusBackfillV2_pre_${Date.now()}`;
          const snapshot = structuredClone(this.settings);
          try {
            BdApi.Data.save("SoloLevelingStats", backupKey, snapshot);
          } catch (error) {
            this.debugError("RANK_BACKFILL", error, { phase: "backup_failed", backupKey });
            return { applied: false, reason: "backup_failed", backupKey, error };
          }
          const previousState = {
            stats: { ...this.settings.stats },
            userHP: this.settings.userHP,
            userMaxHP: this.settings.userMaxHP,
            userMana: this.settings.userMana,
            userMaxMana: this.settings.userMaxMana,
            markerApplied: this.settings._rankBonusBackfillV2Applied,
            markerAppliedAt: this.settings._rankBonusBackfillV2AppliedAt,
            markerBackupKey: this.settings._rankBonusBackfillV2BackupKey,
            markerMeta: this.settings._rankBonusBackfillV2Meta
          };
          try {
            const BASE_STAT_KEYS = ["strength", "agility", "intelligence", "vitality", "perception"];
            const baseStatSum = BASE_STAT_KEYS.reduce(
              (sum, k) => {
                var _a2;
                return sum + (Number((_a2 = this.settings.stats) == null ? void 0 : _a2[k]) || 0);
              },
              0
            );
            const averageStat = baseStatSum / BASE_STAT_KEYS.length;
            const dampener = this.calculateRankPromotionDampener(averageStat);
            const perStatDelta = Math.max(1, Math.round(deltaBase * dampener));
            this.addToAllStats(perStatDelta, this.settings.stats);
            this.settings._rankBonusBackfillV2Applied = true;
            this.settings._rankBonusBackfillV2AppliedAt = Date.now();
            this.settings._rankBonusBackfillV2BackupKey = backupKey;
            this.settings._rankBonusBackfillV2Meta = {
              promotedRanks,
              deltaBase,
              dampener,
              perStatDelta,
              rankAtApply: this.settings.rank
            };
            this.recomputeHPManaFromStats();
            await this.saveSettings(true);
            this.updateChatUI();
            this.debugLog("RANK_BACKFILL", "Rank promotion backfill applied", {
              rank: this.settings.rank,
              promotedRanks,
              deltaBase,
              dampener,
              perStatDelta,
              backupKey
            });
            return {
              applied: true,
              rank: this.settings.rank,
              promotedRanks,
              deltaBase,
              dampener,
              perStatDelta,
              backupKey
            };
          } catch (error) {
            this.settings.stats = { ...previousState.stats };
            this.settings.userHP = previousState.userHP;
            this.settings.userMaxHP = previousState.userMaxHP;
            this.settings.userMana = previousState.userMana;
            this.settings.userMaxMana = previousState.userMaxMana;
            this.settings._rankBonusBackfillV2Applied = previousState.markerApplied;
            this.settings._rankBonusBackfillV2AppliedAt = previousState.markerAppliedAt;
            this.settings._rankBonusBackfillV2BackupKey = previousState.markerBackupKey;
            this.settings._rankBonusBackfillV2Meta = previousState.markerMeta;
            try {
              await this.saveSettings(true);
            } catch (rollbackError) {
              this.debugError("RANK_BACKFILL", rollbackError, { phase: "rollback_save_failed" });
            }
            this.debugError("RANK_BACKFILL", error, { phase: "apply_failed" });
            return { applied: false, reason: "apply_failed", backupKey, error };
          }
        } catch (error) {
          this.debugError("RANK_BACKFILL", error, { phase: "unexpected" });
          return { applied: false, reason: "unexpected_error", error };
        }
      },
      checkLevelUp(oldLevel) {
        try {
          this.debugLog("CHECK_LEVEL_UP", "Checking for level up", { oldLevel });
          const levelInfo = this.getCurrentLevel();
          const newLevel = levelInfo.level;
          if (newLevel > oldLevel) {
            const levelsGained = newLevel - oldLevel;
            this.settings.level = newLevel;
            this.settings.xp = levelInfo.xp;
            let totalStatPoints = 0;
            for (let l = oldLevel + 1; l <= newLevel; l++) {
              totalStatPoints += this.getStatPointsForLevel(l);
            }
            this.settings.unallocatedStatPoints = (this.settings.unallocatedStatPoints || 0) + totalStatPoints;
            this.debugLog("CHECK_LEVEL_UP", "Level up detected!", {
              oldLevel,
              newLevel,
              levelsGained,
              unallocatedPoints: this.settings.unallocatedStatPoints
            });
            try {
              Array.from({ length: levelsGained }).forEach(() => {
                this.processNaturalStatGrowth();
              });
              this.debugLog("CHECK_LEVEL_UP", "Natural stat growth processed for skipped levels", {
                levelsGained
              });
            } catch (error) {
              this.debugError("CHECK_LEVEL_UP", error, { phase: "natural_stat_growth_on_levelup" });
            }
            this.emitLevelChanged(oldLevel, newLevel);
            try {
              this.saveSettings(true);
              this.debugLog("CHECK_LEVEL_UP", "Settings saved after level up");
            } catch (error) {
              this.debugError("CHECK_LEVEL_UP", error, { phase: "save_after_levelup" });
            }
            if (this.pendingLevelUp) {
              this.pendingLevelUp.oldLevel = Math.min(this.pendingLevelUp.oldLevel, oldLevel);
              this.pendingLevelUp.newLevel = Math.max(this.pendingLevelUp.newLevel, newLevel);
              this.pendingLevelUp.levelsGained = this.pendingLevelUp.newLevel - this.pendingLevelUp.oldLevel;
            } else {
              this.pendingLevelUp = {
                oldLevel,
                newLevel,
                levelsGained
              };
            }
            if (!this.levelUpDebounceTimeout) {
              this.levelUpDebounceTimeout = setTimeout(() => {
                if (this.pendingLevelUp) {
                  const {
                    oldLevel: finalOldLevel,
                    newLevel: finalNewLevel
                  } = this.pendingLevelUp;
                  let actualStatPointsGained = 0;
                  for (let l = finalOldLevel + 1; l <= finalNewLevel; l++) {
                    actualStatPointsGained += this.getStatPointsForLevel(l);
                  }
                  this.showLevelUpNotification(finalNewLevel, finalOldLevel, actualStatPointsGained);
                  this.pendingLevelUp = null;
                  this.levelUpDebounceTimeout = null;
                } else {
                  this.levelUpDebounceTimeout = null;
                }
              }, this.levelUpDebounceDelay);
            }
            try {
              this.checkAchievements();
            } catch (error) {
              this.debugError("CHECK_LEVEL_UP", error, { phase: "check_achievements" });
            }
            try {
              this.checkRankPromotion();
            } catch (error) {
              this.debugError("CHECK_LEVEL_UP", error, { phase: "check_rank_promotion" });
            }
            try {
              this.updateChatUI();
            } catch (error) {
              this.debugError("CHECK_LEVEL_UP", error, { phase: "update_ui" });
            }
          } else {
            this.settings.xp = levelInfo.xp;
            this.saveSettings();
            this.emitXPChanged();
          }
        } catch (error) {
          this.debugError("CHECK_LEVEL_UP", error, { oldLevel });
        }
      },
      checkRankPromotion(depth = 0) {
        if (depth >= 16) {
          this.debugError(
            "CHECK_RANK_PROMOTION",
            new Error(`Consecutive promotion depth exceeded (${depth}); bailing out`),
            { currentRank: this.settings.rank, level: this.settings.level }
          );
          return;
        }
        try {
          this.debugLog("CHECK_RANK_PROMOTION", "Checking for rank promotion", {
            currentRank: this.settings.rank,
            level: this.settings.level,
            achievements: this.settings.achievements.unlocked.length
          });
          const rankRequirements = this.getRankRequirements();
          const currentRank = this.settings.rank;
          const currentReq = rankRequirements[currentRank];
          if (!currentReq || !currentReq.next) {
            this.debugLog("CHECK_RANK_PROMOTION", "Already at max rank or invalid rank");
            return;
          }
          const nextRank = currentReq.next;
          const nextReq = rankRequirements[nextRank];
          const levelMet = this.settings.level >= nextReq.level;
          const achievementsMet = this.settings.achievements.unlocked.length >= nextReq.achievements;
          this.debugLog("CHECK_RANK_PROMOTION", "Requirements check", {
            nextRank,
            levelMet,
            levelRequired: nextReq.level,
            currentLevel: this.settings.level,
            achievementsMet,
            achievementsRequired: nextReq.achievements,
            currentAchievements: this.settings.achievements.unlocked.length
          });
          if (levelMet && achievementsMet) {
            const oldRank = this.settings.rank;
            this.settings.rank = nextRank;
            this.debugLog("CHECK_RANK_PROMOTION", "Rank promotion!", {
              oldRank,
              newRank: nextRank,
              level: this.settings.level,
              achievements: this.settings.achievements.unlocked.length
            });
            const rankPromotionBonuses = this.getRankPromotionBonusTable();
            const baseBonus = rankPromotionBonuses[nextRank] || 0;
            const BASE_STAT_KEYS = ["strength", "agility", "intelligence", "vitality", "perception"];
            const baseStatSum = BASE_STAT_KEYS.reduce(
              (sum, k) => {
                var _a;
                return sum + (Number((_a = this.settings.stats) == null ? void 0 : _a[k]) || 0);
              },
              0
            );
            const averageStat = baseStatSum / BASE_STAT_KEYS.length;
            const dampener = this.calculateRankPromotionDampener(averageStat);
            const bonus = Math.max(1, Math.round(baseBonus * dampener));
            if (bonus > 0) {
              this.addToAllStats(bonus, this.settings.stats);
              const vitality = this.settings.stats.vitality || 0;
              const intelligence = this.settings.stats.intelligence || 0;
              this.settings.userMaxHP = this.calculateHP(vitality, nextRank);
              this.settings.userMaxMana = this.calculateMana(intelligence);
              this.settings.userHP = this.settings.userMaxHP;
              this.settings.userMana = this.settings.userMaxMana;
            }
            this.emitRankChanged(oldRank, nextRank);
            if (!this.settings.rankHistory) {
              this.settings.rankHistory = [];
            }
            this.settings.rankHistory.push({
              rank: nextRank,
              level: this.settings.level,
              achievements: this.settings.achievements.unlocked.length,
              timestamp: Date.now()
            });
            if (this.settings.rankHistory.length > 100) {
              this.settings.rankHistory = this.settings.rankHistory.slice(-100);
            }
            try {
              this.saveSettings(true);
              this.debugLog("CHECK_RANK_PROMOTION", "Settings saved after rank promotion");
            } catch (error) {
              this.debugError("CHECK_RANK_PROMOTION", error, { phase: "save_after_promotion" });
            }
            try {
              this.showRankPromotionNotification(oldRank, nextRank, nextReq, bonus);
            } catch (error) {
              this.debugError("CHECK_RANK_PROMOTION", error, { phase: "show_notification" });
            }
            try {
              this.updateChatUI();
            } catch (error) {
              this.debugError("CHECK_RANK_PROMOTION", error, { phase: "update_ui" });
            }
            try {
              this.checkRankPromotion(depth + 1);
            } catch (error) {
              this.debugError("CHECK_RANK_PROMOTION", error, { phase: "consecutive_promotion_check" });
            }
          }
        } catch (error) {
          this.debugError("CHECK_RANK_PROMOTION", error, {
            currentRank: this.settings.rank,
            level: this.settings.level
          });
        }
      }
    };
  }
});

// src/SoloLevelingStats/levelup-overlay.js
var require_levelup_overlay = __commonJS({
  "src/SoloLevelingStats/levelup-overlay.js"(exports2, module2) {
    module2.exports = {
      getOrCreateLevelUpOverlay() {
        var _a;
        const existing = document.getElementById("sls-levelup-overlay");
        if (existing) return existing;
        try {
          (_a = this.injectChatUICSS) == null ? void 0 : _a.call(this);
        } catch (_) {
        }
        const overlay = document.createElement("div");
        overlay.id = "sls-levelup-overlay";
        overlay.className = "sls-levelup-overlay";
        (document.body || document.documentElement).appendChild(overlay);
        return overlay;
      },
      clearLevelUpAnimationTimeouts() {
        if (!this._levelUpAnimationTimeouts) return;
        this._levelUpAnimationTimeouts.forEach((id) => clearTimeout(id));
        this._levelUpAnimationTimeouts.clear();
      },
      enqueueLevelUpAnimation(oldLevel, newLevel) {
        if (!this._isRunning) return;
        if (document.hidden) return;
        if (typeof oldLevel !== "number" || typeof newLevel !== "number") return;
        if (newLevel <= oldLevel) return;
        this._levelUpAnimationQueue || (this._levelUpAnimationQueue = []);
        const levelsGained = newLevel - oldLevel;
        const maxSequential = 5;
        const entries = levelsGained > maxSequential ? [{ title: `LEVEL UP x${levelsGained}`, subtitle: `Level ${newLevel}` }] : Array.from({ length: levelsGained }, (_, i) => ({
          title: "LEVEL UP",
          subtitle: `Level ${oldLevel + 1 + i}`
        }));
        entries.forEach((entry) => this._levelUpAnimationQueue.push(entry));
        this.drainLevelUpAnimationQueue();
      },
      drainLevelUpAnimationQueue() {
        var _a, _b, _c, _d;
        if (!this._isRunning) return;
        if (this._levelUpAnimationInFlight) return;
        const next = (_b = (_a = this._levelUpAnimationQueue) == null ? void 0 : _a.shift) == null ? void 0 : _b.call(_a);
        if (!next) return;
        this._levelUpAnimationInFlight = true;
        this.renderLevelUpBanner(next);
        const doneId = setTimeout(() => {
          this._levelUpAnimationInFlight = false;
          this.drainLevelUpAnimationQueue();
        }, 1350);
        (_d = (_c = this._levelUpAnimationTimeouts) == null ? void 0 : _c.add) == null ? void 0 : _d.call(_c, doneId);
      },
      renderLevelUpBanner({ title, subtitle }) {
        var _a, _b, _c;
        try {
          const overlay = this.getOrCreateLevelUpOverlay();
          if (!overlay) return;
          overlay.textContent = "";
          const banner = document.createElement("div");
          banner.className = "sls-levelup-banner";
          const titleEl = document.createElement("div");
          titleEl.className = "sls-levelup-title";
          titleEl.textContent = title || "LEVEL UP";
          const subtitleEl = document.createElement("div");
          subtitleEl.className = "sls-levelup-subtitle";
          subtitleEl.textContent = subtitle || "";
          banner.appendChild(titleEl);
          subtitleEl.textContent && banner.appendChild(subtitleEl);
          overlay.appendChild(banner);
          const cleanupId = setTimeout(() => {
            banner.remove();
          }, 1600);
          (_b = (_a = this._levelUpAnimationTimeouts) == null ? void 0 : _a.add) == null ? void 0 : _b.call(_a, cleanupId);
        } catch (error) {
          (_c = this.debugError) == null ? void 0 : _c.call(this, "LEVEL_UP_ANIMATION", error);
        }
      },
      getStatBuffBreakdown(statKey, titleBonus, shadowBuffs) {
        const { titlePercent, shadowPercent } = this.getBuffPercents(statKey, titleBonus, shadowBuffs);
        const hasTitleBuff = titlePercent > 0;
        const hasShadowBuff = shadowPercent > 0;
        return {
          titlePercent,
          shadowPercent,
          hasTitleBuff,
          hasShadowBuff,
          titleDisplay: hasTitleBuff ? (titlePercent * 100).toFixed(0) : null,
          shadowDisplay: hasShadowBuff ? (shadowPercent * 100).toFixed(0) : null
        };
      },
      buildStatTooltip(statKey, baseValue, totalValue, titleBonus, shadowBuffs) {
        const stat = this.STAT_METADATA[statKey];
        if (!stat) return "";
        const breakdown = this.getStatBuffBreakdown(statKey, titleBonus, shadowBuffs);
        const tooltipParts = [`${stat.fullName}: Base ${baseValue}`];
        if (breakdown.hasTitleBuff && breakdown.titleDisplay !== null) {
          tooltipParts.push(`+${breakdown.titleDisplay}% title`);
        }
        if (breakdown.hasShadowBuff && breakdown.shadowDisplay !== null) {
          tooltipParts.push(`+${breakdown.shadowDisplay}% shadow`);
        }
        tooltipParts.push(`Total: ${totalValue}`);
        tooltipParts.push(`${stat.desc} per point`);
        return tooltipParts.join(" | ");
      },
      getStatValueWithBuffsHTML(totalValue, statKey, titleBonus, shadowBuffs) {
        return totalValue.toString();
      },
      formatUnallocatedStatPointsText() {
        const points = this.settings.unallocatedStatPoints || 0;
        return `${points} unallocated stat point${points === 1 ? "" : "s"}`;
      }
    };
  }
});

// src/SoloLevelingStats/stat-allocation.js
var require_stat_allocation = __commonJS({
  "src/SoloLevelingStats/stat-allocation.js"(exports2, module2) {
    module2.exports = {
      _queueStatAllocation(statName, oldValue, newValue, effectText, perceptionBuff = null, delta = 1) {
        this._statAllocationQueue.push({
          statName,
          oldValue,
          newValue,
          effectText,
          perceptionBuff,
          delta: Math.max(1, Math.floor(Number(delta) || 1)),
          timestamp: Date.now()
        });
        if (this._statAllocationTimeout) {
          clearTimeout(this._statAllocationTimeout);
        }
        this._statAllocationTimeout = setTimeout(() => {
          this._showAggregatedStatNotification();
        }, this._statAllocationDebounceDelay);
      },
      _showAggregatedStatNotification() {
        if (this._statAllocationQueue.length === 0) return;
        const statGroups = {};
        this._statAllocationQueue.forEach((allocation) => {
          const statName = allocation.statName;
          if (!statGroups[statName]) {
            statGroups[statName] = {
              count: 0,
              oldValue: allocation.oldValue,
              newValue: allocation.newValue,
              effectText: allocation.effectText
            };
          }
          statGroups[statName].count += allocation.delta || 1;
          statGroups[statName].newValue = allocation.newValue;
        });
        const statLines = Object.entries(statGroups).map(([statName, data]) => {
          const statDisplayName = statName.charAt(0).toUpperCase() + statName.slice(1);
          if (data.count === 1) {
            return `+1 ${statDisplayName} (${data.oldValue} \u2192 ${data.newValue})`;
          } else {
            return `+${data.count} ${statDisplayName} (${data.oldValue} \u2192 ${data.newValue})`;
          }
        });
        const bonusLines = [];
        Object.entries(statGroups).forEach(([statName, data]) => {
          if (statName === "perception") {
            const profile = this.getPerceptionBurstProfile();
            bonusLines.push(
              `Perception: ${Math.round(profile.burstChance * 100)}% chain chance, up to x${profile.maxHits} hits`
            );
          } else if (data.effectText && statName !== "perception") {
            let totalBonus = 0;
            const statBonusMap = {
              strength: (count) => count * 2,
              // +2% XP per point (before diminishing returns)
              agility: (count) => count * 2,
              // +2% crit chance per point
              intelligence: (count) => count * 3,
              // +3% long-message bonus baseline (higher tiers handled in XP calc)
              vitality: (count) => count * 5
              // +5% quest rewards per point
            };
            if (statBonusMap[statName]) {
              totalBonus = statBonusMap[statName](data.count);
              const statDisplayName = statName.charAt(0).toUpperCase() + statName.slice(1);
              bonusLines.push(`${statDisplayName}: +${totalBonus}% total bonus`);
            }
          }
        });
        const message = statLines.join("\n") + (bonusLines.length > 0 ? "\n\nTotal Bonuses:\n" + bonusLines.join("\n") : "");
        this.showNotification(message, "success", 6e3);
        this._statAllocationQueue = [];
        this._statAllocationTimeout = null;
      },
      applyStatMutationEffects({
        emitPayload = null,
        invalidateKeys = ["stats", "perception"],
        saveImmediately = true,
        refreshUI = true,
        recomputeHpMana = true
      } = {}) {
        (invalidateKeys == null ? void 0 : invalidateKeys.length) && this.invalidatePerformanceCache(invalidateKeys);
        recomputeHpMana && this.recomputeHPManaFromStats();
        saveImmediately && this.saveSettings(true);
        refreshUI && this.updateChatUI();
        if (emitPayload) {
          this.emit("statsChanged", {
            stats: { ...this.settings.stats },
            ...emitPayload
          });
        }
      },
      allocateStatPoints(statName, amount = 1, options = {}) {
        if (!statName) {
          this.debugError("ALLOCATE_STAT", new Error("No stat name provided"), {
            statName,
            type: typeof statName
          });
          this.showNotification("Invalid stat name!", "error", 2e3);
          return false;
        }
        statName = String(statName).toLowerCase().trim();
        const statMap = {
          str: "strength",
          agi: "agility",
          int: "intelligence",
          vit: "vitality",
          luk: "perception",
          luck: "perception",
          // Migration: map old 'luck' to 'perception'
          per: "perception"
        };
        if (statMap[statName]) {
          statName = statMap[statName];
        }
        const available = Number(this.settings.unallocatedStatPoints) || 0;
        const requested = Math.max(1, Math.floor(Number(amount) || 1));
        const toAllocate = Math.min(requested, available);
        this.debugLog("ALLOCATE_STAT", "Attempting allocation", {
          normalizedStatName: statName,
          requested,
          toAllocate,
          unallocatedPoints: available,
          statExists: statName in (this.settings.stats || {})
        });
        if (available <= 0) {
          this.showNotification("No stat points available!", "error", 2e3);
          return false;
        }
        if (!(statName in this.settings.stats)) {
          this.debugError("ALLOCATE_STAT", new Error(`Invalid stat name: ${statName}`), {
            providedName: statName,
            availableStats: Object.keys(this.settings.stats)
          });
          this.showNotification(`Invalid stat name: ${statName}!`, "error", 2e3);
          return false;
        }
        if (toAllocate < requested) {
          this.debugLog("ALLOCATE_STAT", "Clamped to available unallocated points", { requested, toAllocate });
        }
        const oldValue = Number(this.settings.stats[statName]) || 0;
        this.settings.stats[statName] = oldValue + toAllocate;
        this.settings.unallocatedStatPoints = available - toAllocate;
        const newValue = this.settings.stats[statName];
        if (statName === "perception") {
          const profile = this.getPerceptionBurstProfile();
          this.debugLog("ALLOCATE_STAT_PERCEPTION", "Perception burst profile updated", {
            perceptionStat: this.settings.stats.perception,
            burstChance: `${(profile.burstChance * 100).toFixed(1)}%`,
            maxHits: profile.maxHits,
            jackpotChance: `${(profile.jackpotChance * 100).toFixed(2)}%`
          });
          const perEffect = `Crit burst chance ${(profile.burstChance * 100).toFixed(
            0
          )}%, max x${profile.maxHits}`;
          this._queueStatAllocation(statName, oldValue, this.settings.stats[statName], perEffect, null, toAllocate);
          this.applyStatMutationEffects({
            emitPayload: {
              statChanged: statName,
              oldValue,
              newValue
            },
            ...options
          });
          this.debugLog(
            "ALLOCATE_STAT",
            `${statName.charAt(0).toUpperCase() + statName.slice(1)} stat point allocated with buff`,
            {
              statName,
              oldValue,
              newValue: this.settings.stats[statName],
              burstChance: profile.burstChance,
              maxHits: profile.maxHits,
              remainingPoints: this.settings.unallocatedStatPoints
            }
          );
          return true;
        }
        const statEffects = {
          strength: `+${(this.settings.stats[statName] * 2).toFixed(0)}% XP bonus (diminishing after 20)`,
          agility: `+${(this.settings.stats[statName] * 2).toFixed(0)}% crit chance (up to cap)`,
          intelligence: "Tiered long-message XP bonus (3/7/12% per point, diminishing after 15)",
          vitality: `+${(this.settings.stats[statName] * 5).toFixed(0)}% quest rewards`,
          perception: `Increases critical burst hit chains (xN)`
        };
        const effectText = statEffects[statName] || "Effect applied";
        this._queueStatAllocation(
          statName,
          oldValue,
          this.settings.stats[statName],
          effectText,
          null,
          // No perception buff for non-perception stats
          toAllocate
        );
        this.applyStatMutationEffects({
          emitPayload: {
            statChanged: statName,
            oldValue,
            newValue
          },
          ...options
        });
        this.debugLog("ALLOCATE_STAT", "Stat point allocated successfully", {
          statName,
          oldValue,
          newValue: this.settings.stats[statName],
          remainingPoints: this.settings.unallocatedStatPoints,
          effect: effectText
        });
        return true;
      },
      applyRetroactiveNaturalStatGrowth() {
        var _a;
        try {
          if (this.settings._retroactiveStatGrowthApplied) {
            return;
          }
          const messagesSent = ((_a = this.settings.activity) == null ? void 0 : _a.messagesSent) || 0;
          const level = this.settings.level || 1;
          const baseGrowthPer100Messages = 0.08;
          const levelMultiplier = 1 + Math.min(2.5, (level - 1) * 2e-3);
          const messageBasedGrowth = Math.floor(
            messagesSent / 100 * baseGrowthPer100Messages * levelMultiplier
          );
          const levelBasedGrowth = Math.floor((level - 1) * 0.03);
          const totalGrowth = messageBasedGrowth + levelBasedGrowth;
          if (totalGrowth > 0) {
            const statNames = ["strength", "agility", "intelligence", "vitality", "perception"];
            let statsAdded = 0;
            const growthPerStat = Math.floor(totalGrowth / statNames.length);
            const remainder = totalGrowth % statNames.length;
            statNames.forEach((statName, index) => {
              let growthToAdd = growthPerStat;
              if (index < remainder) {
                growthToAdd += 1;
              }
              if (growthToAdd > 0) {
                this.settings.stats[statName] += growthToAdd;
                statsAdded += growthToAdd;
              }
            });
            if (statsAdded > 0) {
              this.settings._retroactiveStatGrowthApplied = true;
              this.saveSettings(true);
              this.debugLog("RETROACTIVE_STAT_GROWTH", "Applied retroactive natural stat growth", {
                messagesSent,
                level,
                totalGrowth,
                statsAdded,
                newStats: { ...this.settings.stats }
              });
            }
          }
        } catch (error) {
          this.debugError("RETROACTIVE_STAT_GROWTH", error);
        }
      },
      processNaturalStatGrowth() {
        var _a, _b;
        try {
          const statNames = this.getStatKeys();
          let statsGrown = [];
          const userLevel = this.settings.level || 1;
          const userRank = this.settings.rank || "E";
          const rankIndex = ((_a = this.settings.ranks) == null ? void 0 : _a.indexOf(userRank)) || 0;
          const hiddenBlessings = ((_b = this.getHiddenBlessingBonuses) == null ? void 0 : _b.call(this)) || null;
          const kandiaruGrowthMultiplier = Math.max(
            1,
            Number((hiddenBlessings == null ? void 0 : hiddenBlessings.naturalGrowthMultiplier) || 1)
          );
          const levelBonus = Math.min(0.02, userLevel * 2e-5);
          const rankBonus = Math.min(0.012, rankIndex * 1e-3);
          statNames.forEach((statName) => {
            const currentStat = this.settings.stats[statName] || 0;
            const baseChance = 12e-4;
            const statScaling = Math.min(0.018, Math.sqrt(currentStat) * 45e-5);
            const growthChance = Math.min(
              0.05,
              (baseChance + statScaling + levelBonus + rankBonus) * kandiaruGrowthMultiplier
            );
            const roll = Math.random();
            if (roll < growthChance) {
              const oldValue = currentStat;
              let growthAmount = 1;
              if (currentStat >= 500 && Math.random() < 5e-3) {
                growthAmount = 3;
              } else if (currentStat >= 250 && Math.random() < 0.02) {
                growthAmount = 2;
              }
              this.settings.stats[statName] += growthAmount;
              statsGrown.push({
                stat: statName,
                oldValue,
                newValue: this.settings.stats[statName],
                growthAmount,
                chance: (growthChance * 100).toFixed(2) + "%"
              });
              this.debugLog("NATURAL_STAT_GROWTH", `Natural ${statName} growth!`, {
                statName,
                oldValue,
                newValue: this.settings.stats[statName],
                growthAmount,
                growthChance: (growthChance * 100).toFixed(2) + "%",
                levelBonus: (levelBonus * 100).toFixed(2) + "%",
                rankBonus: (rankBonus * 100).toFixed(2) + "%",
                kandiaruGrowthMultiplier: kandiaruGrowthMultiplier.toFixed(2),
                roll: roll.toFixed(4)
              });
            }
          });
          if (statsGrown.length > 0) {
            this.applyStatMutationEffects({
              emitPayload: {
                statsGrown
              }
            });
          }
        } catch (error) {
          this.debugError("NATURAL_STAT_GROWTH", error);
        }
      }
    };
  }
});

// src/SoloLevelingStats/quests.js
var require_quests = __commonJS({
  "src/SoloLevelingStats/quests.js"(exports2, module2) {
    module2.exports = {
      updateQuestProgress(questId, amount) {
        const quest = this.settings.dailyQuests.quests[questId];
        if (!quest || quest.completed) {
          return;
        }
        const previousProgress = Number(quest.progress || 0);
        quest.progress = previousProgress + Number(amount || 0);
        if (quest.progress > quest.target) {
          quest.progress = quest.target;
        }
        if (quest.progress >= quest.target) {
          quest.completed = true;
          this.completeQuest(questId);
          return;
        }
        if (quest.progress !== previousProgress) {
          this.saveSettings();
        }
      },
      completeQuest(questId) {
        const def = this.questData[questId];
        if (!def) return;
        const vitalityBaseBonus = this.settings.stats.vitality * 0.05;
        const vitalityAdvancedBonus = Math.max(0, (this.settings.stats.vitality - 10) * 0.01);
        const baseVitalityBonus = vitalityBaseBonus + vitalityAdvancedBonus;
        let skillAllStatBonus = 0;
        let skillQuestBonus = 0;
        const skillBonuses = this.getSkillTreeBonuses();
        if ((skillBonuses == null ? void 0 : skillBonuses.allStatBonus) > 0) skillAllStatBonus = skillBonuses.allStatBonus;
        if ((skillBonuses == null ? void 0 : skillBonuses.questBonus) > 0) skillQuestBonus = skillBonuses.questBonus;
        const enhancedVitalityBonus = baseVitalityBonus * (1 + skillAllStatBonus) + skillQuestBonus;
        const vitalityBonus = 1 + enhancedVitalityBonus;
        let xpReward = Math.round(def.xp * vitalityBonus);
        this.settings.unallocatedStatPoints += def.statPoints;
        this.addXP(xpReward, { source: "quest", saveImmediately: true, shareShadowXP: true });
        const message = `[QUEST COMPLETE] ${def.name}
 +${xpReward} XP${def.statPoints > 0 ? `, +${def.statPoints} stat point(s)` : ""}`;
        this.showNotification(message, "success", 2500);
        this.showQuestCompletionCelebration(def.name, xpReward, def.statPoints);
      },
      showQuestCompletionCelebration(questName, xpReward, statPoints) {
        try {
          this._loadQuestFont();
          const questCards = document.querySelectorAll(".sls-chat-quest-item");
          let questCard = null;
          questCard = Array.from(questCards).find((card) => {
            const cardText = card.textContent || "";
            return cardText.includes(questName) || card.classList.contains("sls-chat-quest-complete");
          });
          const animationType = "zoom";
          const questProgressHTML = Object.entries(this.settings.dailyQuests.quests).map(([questId, quest]) => {
            const questInfo = this.questData[questId] || { name: questId };
            const percentage = Math.min(quest.progress / quest.target * 100, 100);
            const isComplete = quest.completed;
            const progressText = isComplete ? quest.target : Math.floor(quest.progress);
            return `
            <div class="sls-quest-progress-item ${isComplete ? "completed" : ""}" data-quest-id="${questId}">
              <div class="sls-quest-progress-checkbox">
                ${isComplete ? "\u2713" : "\u25CB"}
              </div>
              <div class="sls-quest-progress-info">
                <div class="sls-quest-progress-name">${this.escapeHtml(questInfo.name)}</div>
                <div class="sls-quest-progress-bar-container">
                  <div class="sls-quest-progress-bar">
                    <div class="sls-quest-progress-fill" style="width: ${percentage}%"></div>
                  </div>
                  <div class="sls-quest-progress-text">${progressText}/${quest.target}</div>
                </div>
              </div>
            </div>
          `;
          }).join("");
          const celebration = document.createElement("div");
          celebration.className = `sls-quest-celebration ${animationType}`;
          celebration.innerHTML = `
        <div class="sls-quest-celebration-content">
          <div class="sls-quest-notification-header">
            <div class="sls-quest-notification-title">Quest Notification [!]</div>
            <div class="sls-quest-notification-subtitle">Daily Quest Completed</div>
          </div>
          <div class="sls-quest-completed-name">${this.escapeHtml(questName)}</div>
          <div class="sls-quest-current-progress">
            <div class="sls-quest-progress-title">Current Progress</div>
            <div class="sls-quest-progress-list">
              ${questProgressHTML}
            </div>
          </div>
          <div class="sls-quest-confirm-button-container">
            <button class="sls-quest-confirm-button">Confirm</button>
          </div>
        </div>
      `;
          celebration.style.left = "50%";
          celebration.style.top = "50%";
          celebration.style.transform = "translate(-50%, -50%)";
          celebration.style.opacity = "0";
          if (questCard) {
            questCard.classList.add("sls-quest-celebrating");
            celebration._questCard = questCard;
          }
          document.body.appendChild(celebration);
          this.createQuestParticles(celebration);
          const closeNotification = () => {
            if (celebration._progressInterval) {
              clearInterval(celebration._progressInterval);
            }
            if (celebration._questCard) {
              celebration._questCard.classList.remove("sls-quest-celebrating");
            }
            celebration.style.animation = "quest-celebration-fade-out 0.2s ease-out forwards";
            celebration._removeTimeout = setTimeout(() => {
              var _a, _b;
              celebration._removeTimeout = null;
              if (celebration && celebration.parentNode) {
                celebration.remove();
              }
              (_b = (_a = this._questCelebrations) == null ? void 0 : _a.delete) == null ? void 0 : _b.call(_a, celebration);
            }, 200);
          };
          const confirmButton = celebration.querySelector(".sls-quest-confirm-button");
          if (confirmButton) {
            confirmButton.addEventListener("click", (e) => {
              e.stopPropagation();
              closeNotification();
            });
          }
          celebration.addEventListener("click", (e) => {
            if (e.target === celebration) {
              e.stopPropagation();
            }
          });
          const questElements = /* @__PURE__ */ new Map();
          Object.keys(this.settings.dailyQuests.quests).forEach((qid) => {
            const el = celebration.querySelector(`[data-quest-id="${qid}"]`);
            if (el) questElements.set(qid, el);
          });
          const progressInterval = setInterval(() => {
            if (!celebration.parentNode) {
              clearInterval(progressInterval);
              return;
            }
            Object.entries(this.settings.dailyQuests.quests).forEach(([questId, quest]) => {
              const item = questElements.get(questId);
              if (!item) return;
              const isComplete = quest.completed;
              const percentage = Math.min(quest.progress / quest.target * 100, 100);
              const progressText = isComplete ? quest.target : Math.floor(quest.progress);
              item.classList.toggle("completed", isComplete);
              const checkbox = item.querySelector(".sls-quest-progress-checkbox");
              if (checkbox) checkbox.textContent = isComplete ? "\u2713" : "\u25CB";
              const fill = item.querySelector(".sls-quest-progress-fill");
              if (fill) fill.style.width = `${percentage}%`;
              const text = item.querySelector(".sls-quest-progress-text");
              if (text) text.textContent = `${progressText}/${quest.target}`;
            });
          }, 500);
          celebration._progressInterval = progressInterval;
          if (!this._questCelebrations) {
            this._questCelebrations = /* @__PURE__ */ new Set();
          }
          this._questCelebrations.add(celebration);
          celebration._cleanup = () => {
            if (celebration._progressInterval) {
              clearInterval(celebration._progressInterval);
            }
          };
          this.debugLog("QUEST_CELEBRATION", "Quest completion celebration shown", {
            questName,
            xpReward,
            statPoints
          });
        } catch (error) {
          this.debugError("QUEST_CELEBRATION", error);
        }
      },
      _loadQuestFont() {
        try {
          const fontName = "Friend or Foe BB";
          const existingStyle = document.getElementById("sls-quest-font-friend-or-foe-bb");
          if (existingStyle) {
            return;
          }
          if (document.fonts && document.fonts.check) {
            document.fonts.ready.then(() => {
              setTimeout(() => {
                if (document.fonts.check(`16px "${fontName}"`)) {
                  this.debugLog("QUEST_FONT", "Friend or Foe BB font already available");
                  return;
                }
                this._loadFontFromCriticalHit();
              }, 100);
            });
          } else {
            this._loadFontFromCriticalHit();
          }
        } catch (error) {
          this.debugError("QUEST_FONT_LOAD", error);
        }
      },
      _loadFontFromCriticalHit() {
        var _a, _b;
        try {
          const critInstance = (_b = (_a = this._SLUtils) == null ? void 0 : _a.getPluginInstance) == null ? void 0 : _b.call(_a, "CriticalHit");
          if (critInstance) {
            if (typeof critInstance.loadLocalFont === "function") {
              const fontLoaded = critInstance.loadLocalFont("Friend or Foe BB");
              if (fontLoaded) {
                this.debugLog(
                  "QUEST_FONT",
                  "Friend or Foe BB font loaded via CriticalHit loadLocalFont (base64)"
                );
                return;
              }
            }
            if (typeof critInstance.getFontsFolderPath === "function") {
              const fontsPath = critInstance.getFontsFolderPath();
              if (!fontsPath) {
                this.debugLog(
                  "QUEST_FONT",
                  "CriticalHit uses embedded fonts - font should already be loaded"
                );
                return;
              }
              const fontFileName2 = "FriendorFoeBB";
              const fontStyle2 = document.createElement("style");
              fontStyle2.id = "sls-quest-font-friend-or-foe-bb";
              fontStyle2.textContent = `
            @font-face {
              font-family: 'Friend or Foe BB';
              src: url('${fontsPath}${fontFileName2}.woff2') format('woff2'),
                   url('${fontsPath}${fontFileName2}.woff') format('woff'),
                   url('${fontsPath}${fontFileName2}.ttf') format('truetype');
              font-weight: normal;
              font-style: normal;
              font-display: swap;
            }
          `;
              document.head.appendChild(fontStyle2);
              this.debugLog(
                "QUEST_FONT",
                "Friend or Foe BB font loaded from CriticalHit path (legacy)"
              );
              return;
            }
          }
          const defaultFontsPath = BdApi.Plugins.folder + "/../fonts/";
          const fontFileName = "FriendorFoeBB";
          const fontStyle = document.createElement("style");
          fontStyle.id = "sls-quest-font-friend-or-foe-bb";
          fontStyle.textContent = `
        @font-face {
          font-family: 'Friend or Foe BB';
          src: url('${defaultFontsPath}${fontFileName}.woff2') format('woff2'),
               url('${defaultFontsPath}${fontFileName}.woff') format('woff'),
               url('${defaultFontsPath}${fontFileName}.ttf') format('truetype');
          font-weight: normal;
          font-style: normal;
          font-display: swap;
        }
      `;
          document.head.appendChild(fontStyle);
          this.debugLog("QUEST_FONT", "Friend or Foe BB font loaded from default path");
        } catch (error) {
          this.debugError("QUEST_FONT_LOAD_CRITICALHIT", error);
        }
      },
      createQuestParticles(container) {
        const particleCount = 30;
        const colors = ["#5a3a8f", "#4b2882", "#3d1f6b", "#8a2be2", "#00ff88"];
        for (let i = 0; i < particleCount; i++) {
          const particle = document.createElement("div");
          particle.className = "sls-quest-particle";
          particle.style.left = "50%";
          particle.style.top = "50%";
          particle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
          const angle = Math.PI * 2 * i / particleCount;
          const distance = 100 + Math.random() * 50;
          const x = Math.cos(angle) * distance;
          const y = Math.sin(angle) * distance;
          particle.style.setProperty("--particle-x", `${x}px`);
          particle.style.setProperty("--particle-y", `${y}px`);
          container.appendChild(particle);
          particle._removeTimeout = setTimeout(() => {
            particle._removeTimeout = null;
            particle.remove();
          }, 2e3);
        }
      }
    };
  }
});

// src/SoloLevelingStats/achievements.js
var require_achievements = __commonJS({
  "src/SoloLevelingStats/achievements.js"(exports2, module2) {
    var C2 = require_constants();
    module2.exports = {
      // DUPLICATE IDS ARE A SILENT, PERMANENT HAZARD HERE — this loop walks the
      // WHOLE definitions array and skips any id already unlocked, so if two
      // achievements share an id the EASIER one fires first, claims the id, and
      // makes the harder one unearnable forever while the player keeps the weaker
      // titleBonus. Nothing errors; the achievement simply never arrives.
      //
      // That happened once: `shadow_sovereign` was both the Level-2000 capstone and
      // a Level-1500 award. Fixed 2026-08-03 — the Lv-1500 entry is now
      // `shadow_sovereign_herald`, with a one-time repair in migration-compat.js
      // (_migrateShadowSovereignSplit) for saves that unlocked the id via the old
      // path. Ids are unique as of that date; keep them that way.
      checkAchievements() {
        const achievements = this.getAchievementDefinitions();
        let newAchievements = [];
        if (!this._unlockedAchievementSet || this._unlockedAchievementSetSize !== this.settings.achievements.unlocked.length) {
          this._unlockedAchievementSet = new Set(this.settings.achievements.unlocked);
          this._unlockedAchievementSetSize = this.settings.achievements.unlocked.length;
        }
        achievements.forEach((achievement) => {
          if (this._unlockedAchievementSet.has(achievement.id)) {
            return;
          }
          if (this.checkAchievementCondition(achievement)) {
            this.unlockAchievement(achievement);
            this._unlockedAchievementSet.add(achievement.id);
            this._unlockedAchievementSetSize = this.settings.achievements.unlocked.length;
            newAchievements.push(achievement);
          }
        });
        return newAchievements;
      },
      checkAchievementCondition(achievement) {
        var _a, _b, _c, _d, _e;
        const condition = achievement.condition;
        switch (condition.type) {
          case "messages":
            return this.settings.activity.messagesSent >= condition.value;
          case "characters":
            return this.settings.activity.charactersTyped >= condition.value;
          case "level":
            return this.settings.level >= condition.value;
          case "time":
            return this.settings.activity.timeActive >= condition.value;
          case "channels":
            const channelsVisited = (_a = this.settings.activity) == null ? void 0 : _a.channelsVisited;
            if (channelsVisited instanceof Set) {
              return channelsVisited.size >= condition.value;
            } else if (Array.isArray(channelsVisited)) {
              return channelsVisited.length >= condition.value;
            }
            return false;
          case "achievements":
            return (((_c = (_b = this.settings.achievements) == null ? void 0 : _b.unlocked) == null ? void 0 : _c.length) || 0) >= condition.value;
          case "crits":
            return (((_d = this.settings.activity) == null ? void 0 : _d.critsLanded) || 0) >= condition.value;
          case "stat":
            return ((_e = this.settings.stats) == null ? void 0 : _e[condition.stat]) >= condition.value;
          case "compound":
            return (condition.conditions || []).every(
              (c) => this.checkAchievementCondition({ condition: c })
            );
          default:
            return false;
        }
      },
      unlockAchievement(achievement) {
        if (this.settings.achievements.unlocked.includes(achievement.id)) {
          this.debugLog("ACHIEVEMENT", "Achievement already unlocked, skipping", {
            achievementId: achievement.id,
            achievementName: achievement.name
          });
          return;
        }
        this.settings.achievements.unlocked.push(achievement.id);
        if (achievement.title && !this.settings.achievements.titles.includes(achievement.title)) {
          this.settings.achievements.titles.push(achievement.title);
        }
        if (!this.settings.achievements.activeTitle && achievement.title) {
          this.settings.achievements.activeTitle = achievement.title;
          this.invalidatePerformanceCache(["title"]);
        }
        const message = `[SYSTEM] Achievement unlocked: ${achievement.name}
${achievement.description}
` + (achievement.title ? ` Title acquired: ${achievement.title}` : "");
        this.showNotification(message, "success", 5e3);
        this.debugLog("ACHIEVEMENT", "Achievement unlocked", {
          achievementId: achievement.id,
          achievementName: achievement.name,
          title: achievement.title,
          totalUnlocked: this.settings.achievements.unlocked.length
        });
        this.saveSettings(true);
      },
      cleanupUnwantedTitles() {
        var _a, _b, _c;
        const unwantedTitles = this.UNWANTED_TITLES_SET;
        let cleaned = false;
        if ((_a = this.settings.achievements) == null ? void 0 : _a.titles) {
          const beforeCount = this.settings.achievements.titles.length;
          this.settings.achievements.titles = this.settings.achievements.titles.filter(
            (t) => !unwantedTitles.has(t)
          );
          if (this.settings.achievements.titles.length !== beforeCount) {
            cleaned = true;
          }
        }
        if (((_b = this.settings.achievements) == null ? void 0 : _b.activeTitle) && unwantedTitles.has(this.settings.achievements.activeTitle)) {
          this.settings.achievements.activeTitle = null;
          cleaned = true;
        }
        if ((_c = this.settings.achievements) == null ? void 0 : _c.unlocked) {
          const achievements = this.getAchievementDefinitions();
          const unwantedIds = achievements.filter((a) => unwantedTitles.has(a.title)).map((a) => a.id);
          if (unwantedIds.length > 0) {
            const beforeCount = this.settings.achievements.unlocked.length;
            this.settings.achievements.unlocked = this.settings.achievements.unlocked.filter(
              (id) => !unwantedIds.includes(id)
            );
            if (this.settings.achievements.unlocked.length !== beforeCount) {
              cleaned = true;
            }
          }
        }
        if (cleaned) {
          this.saveSettings(true);
          this.debugLog("CLEANUP", "Removed unwanted titles from saved data", {
            removedTitles: unwantedTitles
          });
        }
      },
      revalidateUnlockedAchievements() {
        var _a, _b, _c;
        const achievements = this.getAchievementDefinitions();
        const unlocked = ((_a = this.settings.achievements) == null ? void 0 : _a.unlocked) || [];
        const titles = ((_b = this.settings.achievements) == null ? void 0 : _b.titles) || [];
        if (unlocked.length === 0) return;
        const revokedIds = [];
        const revokedTitles = [];
        unlocked.forEach((id) => {
          const achievement = achievements.find((a) => a.id === id);
          if (!achievement) return;
          if (!this.checkAchievementCondition(achievement)) {
            revokedIds.push(id);
            if (achievement.title) {
              revokedTitles.push(achievement.title);
            }
          }
        });
        if (revokedIds.length === 0) return;
        this.settings.achievements.unlocked = unlocked.filter(
          (id) => !revokedIds.includes(id)
        );
        this.settings.achievements.titles = titles.filter(
          (t) => !revokedTitles.includes(t)
        );
        if (((_c = this.settings.achievements) == null ? void 0 : _c.activeTitle) && revokedTitles.includes(this.settings.achievements.activeTitle)) {
          this.settings.achievements.activeTitle = null;
        }
        this.saveSettings(true);
        this.debugLog("REVALIDATE", "Revoked achievements that no longer meet requirements", {
          revokedCount: revokedIds.length,
          revokedIds,
          revokedTitles
        });
      },
      setActiveTitle(title) {
        const unwantedTitles = this.UNWANTED_TITLES_SET;
        if (title === null || title === "") {
          this.settings.achievements.activeTitle = null;
          this.saveSettings(true);
          if (this.updateChatUI) {
            this.updateChatUI();
          }
          return true;
        }
        if (unwantedTitles.has(title)) {
          return false;
        }
        this.settings.achievements.titles = this.settings.achievements.titles.filter(
          (t) => !unwantedTitles.has(t)
        );
        if (this.settings.achievements.titles.includes(title)) {
          this.settings.achievements.activeTitle = title;
          this.saveSettings(true);
          if (this.updateChatUI) {
            this.updateChatUI();
          }
          return true;
        }
        return false;
      },
      getActiveTitleBonus() {
        var _a;
        const now = Date.now();
        const activeTitle = ((_a = this.settings.achievements) == null ? void 0 : _a.activeTitle) || null;
        const cacheKey = activeTitle;
        if (this._cache.activeTitleBonus && this._cache.activeTitleBonusKey === cacheKey && this._cache.activeTitleBonusTime && now - this._cache.activeTitleBonusTime < this._cache.activeTitleBonusTTL) {
          return this._cache.activeTitleBonus;
        }
        const unwantedTitles = this.UNWANTED_TITLES_SET;
        if (!this.settings.achievements.activeTitle || unwantedTitles.has(this.settings.achievements.activeTitle)) {
          if (this.settings.achievements.activeTitle && unwantedTitles.has(this.settings.achievements.activeTitle)) {
            this.settings.achievements.activeTitle = null;
            this.saveSettings(true);
          }
          const result2 = { ...C2.DEFAULT_TITLE_BONUS };
          this._cache.activeTitleBonus = result2;
          this._cache.activeTitleBonusKey = null;
          this._cache.activeTitleBonusTime = now;
          return result2;
        }
        const achievements = this.getAchievementDefinitions();
        const achievement = achievements.find(
          (a) => a.title === this.settings.achievements.activeTitle
        );
        const bonus = (achievement == null ? void 0 : achievement.titleBonus) || C2.DEFAULT_TITLE_BONUS;
        const result = {
          ...C2.DEFAULT_TITLE_BONUS,
          ...bonus,
          // Ensure defaults for common properties to avoid undefined issues
          xp: this.normalizeNumber(bonus.xp, 0),
          critChance: this.normalizeNumber(bonus.critChance, 0),
          // Old format (raw numbers) - for backward compatibility
          strength: this.normalizeNumber(bonus.strength, 0),
          agility: this.normalizeNumber(bonus.agility, 0),
          intelligence: this.normalizeNumber(bonus.intelligence, 0),
          vitality: this.normalizeNumber(bonus.vitality, 0),
          perception: this.normalizeNumber(bonus.perception, 0),
          // New format (percentages) - primary format
          strengthPercent: this.normalizeNumber(bonus.strengthPercent, 0),
          agilityPercent: this.normalizeNumber(bonus.agilityPercent, 0),
          intelligencePercent: this.normalizeNumber(bonus.intelligencePercent, 0),
          vitalityPercent: this.normalizeNumber(bonus.vitalityPercent, 0),
          perceptionPercent: this.normalizeNumber(bonus.perceptionPercent, 0)
        };
        this._cache.activeTitleBonus = result;
        this._cache.activeTitleBonusKey = cacheKey;
        this._cache.activeTitleBonusTime = now;
        return result;
      },
      _commitShadowPower(totalPower, shadowArmy) {
        this.cachedShadowPower = totalPower.toLocaleString();
        this.settings.cachedShadowPower = this.cachedShadowPower;
        this.saveSettings();
        if (shadowArmy == null ? void 0 : shadowArmy.settings) {
          shadowArmy.settings.cachedTotalPower = totalPower;
          shadowArmy.settings.cachedTotalPowerTimestamp = Date.now();
          shadowArmy.saveSettings();
        }
        this.updateShadowPowerDisplay();
      },
      // Last-known power fallback for when ShadowArmy's aggregate APIs are absent/erroring.
      // Checked before any scan — stale cache beats scanning the full IDB store. Both fields
      // are kept fresh on every successful commit via _commitShadowPower.
      _getCachedPowerFallback(shadowArmy) {
        var _a;
        const armyCached = (_a = shadowArmy == null ? void 0 : shadowArmy.settings) == null ? void 0 : _a.cachedTotalPower;
        if (armyCached !== void 0) {
          return { found: true, power: armyCached, source: "ShadowArmy" };
        }
        const raw = this.settings.cachedShadowPower;
        if (raw !== void 0) {
          const power = Number(String(raw).replace(/,/g, "")) || 0;
          return { found: true, power, source: "SoloLevelingStats" };
        }
        return { found: false, power: 0 };
      },
      _sumShadowPower(shadowArmy, shadows) {
        return shadows.reduce((sum, shadow) => {
          try {
            if (shadowArmy.calculateShadowPowerCached) {
              return sum + (shadowArmy.calculateShadowPowerCached(shadow) || 0);
            }
            const d = shadowArmy.getShadowData ? shadowArmy.getShadowData(shadow) : shadow;
            if (shadowArmy.getShadowEffectiveStats && shadowArmy.calculateShadowPower) {
              const eff = shadowArmy.getShadowEffectiveStats(d);
              if (eff) {
                const p = shadowArmy.calculateShadowPower(eff, 1);
                return sum + (p > 0 ? p : (d == null ? void 0 : d.strength) || 0);
              }
            }
            return sum + ((d == null ? void 0 : d.strength) || 0);
          } catch (_) {
            return sum;
          }
        }, 0);
      },
      async updateShadowPower() {
        var _a, _b, _c, _d, _e, _f;
        try {
          if (!this._isRunning) return;
          const shadowArmy = (_b = (_a = this._SLUtils) == null ? void 0 : _a.getPluginInstance) == null ? void 0 : _b.call(_a, "ShadowArmy");
          if (!shadowArmy) {
            this.cachedShadowPower = "0";
            this.updateShadowPowerDisplay();
            return;
          }
          if (((_c = shadowArmy.settings) == null ? void 0 : _c.cachedTotalPower) !== void 0) {
            const cachedPower = shadowArmy.settings.cachedTotalPower || 0;
            const cacheAge = shadowArmy.settings.cachedTotalPowerTimestamp ? Date.now() - shadowArmy.settings.cachedTotalPowerTimestamp : Infinity;
            const isRecent = cacheAge < 3e5;
            const isRecentZero = cachedPower === 0 && cacheAge < 1e4;
            if (isRecent && (cachedPower > 0 || isRecentZero)) {
              this.debugLog("UPDATE_SHADOW_POWER", "Using ShadowArmy cached power", { cachedPower });
              this._commitShadowPower(cachedPower, shadowArmy);
              return;
            }
          }
          if (typeof shadowArmy.getAggregatedArmyStats === "function") {
            try {
              const armyStats = await shadowArmy.getAggregatedArmyStats();
              let totalPower = (armyStats == null ? void 0 : armyStats.totalPower) ?? 0;
              if (!(totalPower > 0) && typeof shadowArmy.getTotalShadowPower === "function") {
                try {
                  totalPower = await shadowArmy.getTotalShadowPower(false);
                } catch (_) {
                  totalPower = 0;
                }
              }
              if (totalPower === 0 && (armyStats == null ? void 0 : armyStats.totalShadows) === 0 && shadowArmy.storageManager) {
                try {
                  const count = await shadowArmy.storageManager.getTotalCount();
                  if (count > 0) {
                    const cached = this._getCachedPowerFallback(shadowArmy);
                    if (cached.found) {
                      this.debugLog("UPDATE_SHADOW_POWER", "Aggregation/index mismatch \u2014 using last cached power", cached);
                      this._commitShadowPower(cached.power, shadowArmy);
                      return;
                    }
                    this.debugError("UPDATE_SHADOW_POWER", "No cached power available; running capped diagnostic scan (10000 cap, may undercount)");
                    const direct = shadowArmy.storageManager.getShadowsByKeyPage ? ((_d = await shadowArmy.storageManager.getShadowsByKeyPage(null, 1e4)) == null ? void 0 : _d.shadows) || [] : await shadowArmy.storageManager.getShadows({}, 0, 1e4);
                    if ((direct == null ? void 0 : direct.length) > 0) {
                      const manualPower = this._sumShadowPower(shadowArmy, direct);
                      if (manualPower > 0) {
                        this._commitShadowPower(manualPower, shadowArmy);
                        return;
                      }
                    }
                  }
                } catch (e) {
                  this.debugError("UPDATE_SHADOW_POWER", "Direct shadow retrieval failed", e);
                }
              }
              if (!totalPower) totalPower = (armyStats == null ? void 0 : armyStats.totalPower) ?? 0;
              if (totalPower === 0 && (armyStats == null ? void 0 : armyStats.totalShadows) > 0) {
                const retry = await shadowArmy.getAggregatedArmyStats(true);
                if (((retry == null ? void 0 : retry.totalPower) ?? 0) > 0) {
                  this._commitShadowPower(retry.totalPower, shadowArmy);
                  return;
                }
              }
              this.debugLog("UPDATE_SHADOW_POWER", "Power calculation completed", {
                totalPower,
                totalShadows: (armyStats == null ? void 0 : armyStats.totalShadows) || 0
              });
              if (totalPower > 0 || armyStats && armyStats.totalShadows === 0) {
                this._commitShadowPower(totalPower, shadowArmy);
              } else {
                this.debugError("UPDATE_SHADOW_POWER", "Power is 0 despite having shadows");
                this.updateShadowPowerDisplay();
              }
              return;
            } catch (error) {
              this.debugError("UPDATE_SHADOW_POWER", "Primary method failed", error);
            }
          }
          const cachedFallback = this._getCachedPowerFallback(shadowArmy);
          if (cachedFallback.found) {
            this.debugLog("UPDATE_SHADOW_POWER", "Aggregate APIs unavailable \u2014 using last cached power", cachedFallback);
            this._commitShadowPower(cachedFallback.power, shadowArmy);
            return;
          }
          if ((_e = shadowArmy.storageManager) == null ? void 0 : _e.getShadows) {
            try {
              if (!shadowArmy.storageManager.db) await shadowArmy.storageManager.init();
              this.debugError("UPDATE_SHADOW_POWER", "No cached power available; running capped last-resort scan (10000 cap, may undercount on large armies)");
              const shadows = shadowArmy.storageManager.getShadowsByKeyPage ? ((_f = await shadowArmy.storageManager.getShadowsByKeyPage(null, 1e4)) == null ? void 0 : _f.shadows) || [] : await shadowArmy.storageManager.getShadows({}, 0, 1e4);
              if ((shadows == null ? void 0 : shadows.length) > 0) {
                const totalPower = this._sumShadowPower(shadowArmy, shadows);
                this._commitShadowPower(totalPower, shadowArmy);
                return;
              }
            } catch (e) {
              this.debugError("UPDATE_SHADOW_POWER", "Fallback storage enumeration failed", e);
            }
          }
          this._commitShadowPower(0, shadowArmy);
        } catch (error) {
          this.debugError("UPDATE_SHADOW_POWER", error);
          this.cachedShadowPower = "0";
          this.updateShadowPowerDisplay();
        }
      },
      updateShadowPowerDisplay() {
        if (!this._isRunning) return;
        this.debugLog("UPDATE_SHADOW_POWER_DISPLAY", "Triggering React re-render for shadow power", {
          cachedShadowPower: this.cachedShadowPower
        });
        this._triggerUIForceUpdates();
        this.emit("shadowPowerChanged", {
          shadowPower: this.cachedShadowPower
        });
      }
    };
  }
});

// src/SoloLevelingStats/achievement-definitions.js
var require_achievement_definitions = __commonJS({
  "src/SoloLevelingStats/achievement-definitions.js"(exports2, module2) {
    module2.exports = {
      getAchievementDefinitions() {
        if (this._cache.achievementDefinitions) {
          return this._cache.achievementDefinitions;
        }
        const achievements = [
          // Early Game (E-Rank)
          {
            id: "weakest_hunter",
            name: "The Weakest Hunter",
            description: "Send 50 messages",
            condition: { type: "messages", value: 50 },
            title: "The Weakest Hunter",
            titleBonus: { xp: 0.03, strengthPercent: 0.05 }
            // +3% XP, +5% Strength
          },
          {
            id: "e_rank",
            name: "E-Rank Hunter",
            description: "Send 200 messages",
            condition: { type: "messages", value: 200 },
            title: "E-Rank Hunter",
            titleBonus: { xp: 0.08, strengthPercent: 0.05 }
            // +8% XP, +5% STR
          },
          // Mid Game (D-C Rank)
          {
            id: "d_rank",
            name: "D-Rank Hunter",
            description: "Send 500 messages",
            condition: { type: "messages", value: 500 },
            title: "D-Rank Hunter",
            titleBonus: { xp: 0.12, agilityPercent: 0.05 }
            // +12% XP, +5% AGI
          },
          {
            id: "c_rank",
            name: "C-Rank Hunter",
            description: "Send 1,000 messages",
            condition: { type: "messages", value: 1e3 },
            title: "C-Rank Hunter",
            titleBonus: { xp: 0.18, critChance: 0.01, strengthPercent: 0.05 }
            // +18% XP, +1% Crit, +5% STR
          },
          // Advanced (B-A Rank)
          {
            id: "b_rank",
            name: "B-Rank Hunter",
            description: "Send 2,500 messages",
            condition: { type: "messages", value: 2500 },
            title: "B-Rank Hunter",
            titleBonus: { xp: 0.25, critChance: 0.02, agilityPercent: 0.05, intelligencePercent: 0.05 }
            // +25% XP, +2% Crit, +5% AGI, +5% INT
          },
          {
            id: "a_rank",
            name: "A-Rank Hunter",
            description: "Send 5,000 messages",
            condition: { type: "messages", value: 5e3 },
            title: "A-Rank Hunter",
            titleBonus: { xp: 0.32, critChance: 0.02, strengthPercent: 0.05, agilityPercent: 0.05 }
            // +32% XP, +2% Crit, +5% STR, +5% AGI
          },
          // Elite (S-SS Rank)
          {
            id: "s_rank",
            name: "S-Rank Hunter",
            description: "Send 10,000 messages",
            condition: { type: "messages", value: 1e4 },
            title: "S-Rank Hunter",
            titleBonus: { xp: 0.4, strengthPercent: 0.1, critChance: 0.02 }
            // +40% XP, +10% Strength, +2% Crit Chance
          },
          // Character/Writing Milestones
          {
            id: "shadow_extraction",
            name: "Shadow Extraction",
            description: "Type 25,000 characters \u2014 the Shadow Monarch's core power to raise the dead",
            condition: { type: "characters", value: 25e3 },
            title: "Shadow Extraction",
            titleBonus: { xp: 0.15, intelligencePercent: 0.1, critChance: 0.01 }
            // Shadow Extraction: necromantic INT ability
          },
          {
            id: "domain_expansion",
            name: "Domain Expansion",
            description: "Reach Level 100 and type 75,000 characters \u2014 territorial dominance amplifying all power within",
            condition: { type: "compound", conditions: [{ type: "level", value: 100 }, { type: "characters", value: 75e3 }] },
            title: "Domain Expansion",
            titleBonus: { xp: 0.3, intelligencePercent: 0.15, vitalityPercent: 0.1, perceptionPercent: 0.05, critChance: 0.02 }
            // Domain: area control INT, endurance, battlefield awareness
          },
          {
            id: "ruler_authority",
            name: "Ruler's Authority",
            description: "Reach Level 200 and type 150,000 characters \u2014 the telekinetic power wielded by the Rulers",
            condition: { type: "compound", conditions: [{ type: "level", value: 200 }, { type: "characters", value: 15e4 }] },
            title: "Ruler's Authority",
            titleBonus: { xp: 0.5, intelligencePercent: 0.2, perceptionPercent: 0.15, critChance: 0.03 }
            // Ruler's Authority: telekinetic INT mastery, cosmic perception
          },
          // Level Milestones (1-2000)
          {
            id: "first_steps",
            name: "First Steps",
            description: "Reach Level 1",
            condition: { type: "level", value: 1 },
            title: "First Steps",
            titleBonus: { xp: 0.02, critChance: 5e-3 }
            // +2% XP, +0.5% Crit
          },
          {
            id: "novice_hunter",
            name: "Novice Hunter",
            description: "Reach Level 5",
            condition: { type: "level", value: 5 },
            title: "Novice Hunter",
            titleBonus: { xp: 0.05, critChance: 0.01, strengthPercent: 0.05 }
            // +5% XP, +1% Crit, +5% STR
          },
          {
            id: "rising_hunter",
            name: "Rising Hunter",
            description: "Reach Level 10",
            condition: { type: "level", value: 10 },
            title: "Rising Hunter",
            titleBonus: { xp: 0.08, critChance: 0.01, agilityPercent: 0.05 }
            // +8% XP, +1% Crit, +5% AGI
          },
          {
            id: "awakened",
            name: "The Awakened",
            description: "Reach Level 15",
            condition: { type: "level", value: 15 },
            title: "The Awakened",
            titleBonus: { xp: 0.12, critChance: 0.015, strengthPercent: 0.05, agilityPercent: 0.05 }
            // +12% XP, +1.5% Crit, +5% STR/AGI
          },
          {
            id: "experienced_hunter",
            name: "Experienced Hunter",
            description: "Reach Level 20",
            condition: { type: "level", value: 20 },
            title: "Experienced Hunter",
            titleBonus: {
              xp: 0.15,
              critChance: 0.02,
              strengthPercent: 0.05,
              intelligencePercent: 0.05
            }
            // +15% XP, +2% Crit, +5% STR/INT
          },
          {
            id: "shadow_army",
            name: "Shadow Army Commander",
            description: "Reach Level 50 \u2014 commander of the shadow soldiers, Jin-Woo's extracted army",
            condition: { type: "level", value: 50 },
            title: "Shadow Army Commander",
            titleBonus: { xp: 0.22, intelligencePercent: 0.1, agilityPercent: 0.05, critChance: 0.02 }
            // Shadow Commander: INT to command army, tactical mobility
          },
          {
            id: "elite_hunter",
            name: "Elite Hunter",
            description: "Reach Level 40",
            condition: { type: "level", value: 40 },
            title: "Elite Hunter",
            titleBonus: {
              xp: 0.25,
              critChance: 0.025,
              strengthPercent: 0.1,
              agilityPercent: 0.05,
              intelligencePercent: 0.05
            }
            // +25% XP, +2.5% Crit, +10% STR, +5% AGI/INT
          },
          {
            id: "necromancer",
            name: "Necromancer",
            description: "Reach Level 100 \u2014 the forbidden class obtained after Jin-Woo's job change quest",
            condition: { type: "level", value: 100 },
            title: "Necromancer",
            titleBonus: {
              xp: 0.35,
              intelligencePercent: 0.15,
              vitalityPercent: 0.05,
              agilityPercent: 0.05,
              critChance: 0.02
            }
            // Necromancer class: heavy INT (shadow magic), some endurance and mobility
          },
          {
            id: "national_level",
            name: "National Level Hunter",
            description: "Reach Level 300 \u2014 one of the elite few hunters who represent an entire nation's power",
            condition: { type: "level", value: 300 },
            title: "National Level Hunter",
            titleBonus: {
              xp: 0.8,
              strengthPercent: 0.2,
              agilityPercent: 0.15,
              intelligencePercent: 0.15,
              vitalityPercent: 0.1,
              critChance: 0.06
            }
            // National Level: elite above S-rank, strong all-round with combat focus
          },
          {
            id: "monarch_candidate",
            name: "Monarch Candidate",
            description: "Reach Level 500 \u2014 on the threshold of transcending mortal hunter limits",
            condition: { type: "level", value: 500 },
            title: "Monarch Candidate",
            titleBonus: {
              xp: 1.2,
              strengthPercent: 0.25,
              agilityPercent: 0.25,
              intelligencePercent: 0.2,
              vitalityPercent: 0.2,
              critChance: 0.1
            }
            // Monarch Candidate: approaching transcendence, strong across all stats
          },
          {
            id: "high_rank_hunter",
            name: "High-Rank Hunter",
            description: "Reach Level 150",
            condition: { type: "level", value: 150 },
            title: "High-Rank Hunter",
            titleBonus: {
              xp: 0.6,
              critChance: 0.06,
              strengthPercent: 0.15,
              agilityPercent: 0.15,
              intelligencePercent: 0.15,
              vitalityPercent: 0.1
            }
            // +60% XP, +6% Crit, +15% STR/AGI/INT, +10% VIT
          },
          {
            id: "s_rank_elite",
            name: "S-Rank Elite",
            description: "Reach Level 200",
            condition: { type: "level", value: 200 },
            title: "S-Rank Elite",
            titleBonus: {
              xp: 0.7,
              critChance: 0.07,
              strengthPercent: 0.2,
              agilityPercent: 0.2,
              intelligencePercent: 0.15,
              vitalityPercent: 0.15
            }
            // +70% XP, +7% Crit, +20% STR/AGI, +15% INT/VIT
          },
          {
            id: "transcendent_hunter",
            name: "Transcendent Hunter",
            description: "Reach Level 250",
            condition: { type: "level", value: 250 },
            title: "Transcendent Hunter",
            titleBonus: {
              xp: 0.8,
              critChance: 0.08,
              strengthPercent: 0.2,
              agilityPercent: 0.2,
              intelligencePercent: 0.2,
              vitalityPercent: 0.15
            }
            // +80% XP, +8% Crit, +20% All Stats, +15% VIT
          },
          {
            id: "legendary_hunter",
            name: "Legendary Hunter",
            description: "Reach Level 300",
            condition: { type: "level", value: 300 },
            title: "Legendary Hunter",
            titleBonus: {
              xp: 0.9,
              critChance: 0.09,
              strengthPercent: 0.25,
              agilityPercent: 0.25,
              intelligencePercent: 0.2,
              vitalityPercent: 0.2
            }
            // +90% XP, +9% Crit, +25% STR/AGI, +20% INT/VIT
          },
          {
            id: "mythic_hunter",
            name: "Mythic Hunter",
            description: "Reach Level 400",
            condition: { type: "level", value: 400 },
            title: "Mythic Hunter",
            titleBonus: {
              xp: 1.05,
              critChance: 0.1,
              strengthPercent: 0.25,
              agilityPercent: 0.25,
              intelligencePercent: 0.25,
              vitalityPercent: 0.2
            }
            // +105% XP, +10% Crit, +25% All Stats, +20% VIT
          },
          {
            id: "divine_hunter",
            name: "Divine Hunter",
            description: "Reach Level 500",
            condition: { type: "level", value: 500 },
            title: "Divine Hunter",
            titleBonus: {
              xp: 1.2,
              critChance: 0.12,
              strengthPercent: 0.3,
              agilityPercent: 0.3,
              intelligencePercent: 0.25,
              vitalityPercent: 0.25
            }
            // +120% XP, +12% Crit, +30% STR/AGI, +25% INT/VIT
          },
          {
            id: "celestial_hunter",
            name: "Celestial Hunter",
            description: "Reach Level 600",
            condition: { type: "level", value: 600 },
            title: "Celestial Hunter",
            titleBonus: {
              xp: 1.35,
              critChance: 0.13,
              strengthPercent: 0.3,
              agilityPercent: 0.3,
              intelligencePercent: 0.3,
              vitalityPercent: 0.25
            }
            // +135% XP, +13% Crit, +30% All Stats, +25% VIT
          },
          {
            id: "national_hunter_elite",
            name: "National Hunter Elite",
            description: "Reach Level 700",
            condition: { type: "level", value: 700 },
            title: "National Hunter Elite",
            titleBonus: {
              xp: 1.5,
              critChance: 0.15,
              strengthPercent: 0.35,
              agilityPercent: 0.35,
              intelligencePercent: 0.3,
              vitalityPercent: 0.3
            }
            // +150% XP, +15% Crit, +35% STR/AGI, +30% INT/VIT
          },
          {
            id: "monarch_aspirant",
            name: "Monarch Aspirant",
            description: "Reach Level 800",
            condition: { type: "level", value: 800 },
            title: "Monarch Aspirant",
            titleBonus: {
              xp: 1.65,
              critChance: 0.16,
              strengthPercent: 0.35,
              agilityPercent: 0.35,
              intelligencePercent: 0.35,
              vitalityPercent: 0.3
            }
            // +165% XP, +16% Crit, +35% All Stats, +30% VIT
          },
          {
            id: "monarch_heir",
            name: "Monarch Heir",
            description: "Reach Level 900",
            condition: { type: "level", value: 900 },
            title: "Monarch Heir",
            titleBonus: {
              xp: 1.8,
              critChance: 0.18,
              strengthPercent: 0.4,
              agilityPercent: 0.4,
              intelligencePercent: 0.35,
              vitalityPercent: 0.35
            }
            // +180% XP, +18% Crit, +40% STR/AGI, +35% INT/VIT
          },
          {
            id: "true_monarch",
            name: "True Monarch",
            description: "Reach Level 1000",
            condition: { type: "level", value: 1e3 },
            title: "True Monarch",
            titleBonus: {
              xp: 2,
              critChance: 0.2,
              strengthPercent: 0.4,
              agilityPercent: 0.4,
              intelligencePercent: 0.4,
              vitalityPercent: 0.35
            }
            // +200% XP, +20% Crit, +40% All Stats, +35% VIT
          },
          {
            id: "monarch_transcendent",
            name: "Monarch Transcendent",
            description: "Reach Level 1200",
            condition: { type: "level", value: 1200 },
            title: "Monarch Transcendent",
            titleBonus: {
              xp: 2.25,
              critChance: 0.22,
              strengthPercent: 0.45,
              agilityPercent: 0.45,
              intelligencePercent: 0.4,
              vitalityPercent: 0.4
            }
            // +225% XP, +22% Crit, +45% STR/AGI, +40% INT/VIT
          },
          {
            id: "monarch_supreme",
            name: "Monarch Supreme",
            description: "Reach Level 1500",
            condition: { type: "level", value: 1500 },
            title: "Monarch Supreme",
            titleBonus: {
              xp: 2.5,
              critChance: 0.25,
              strengthPercent: 0.45,
              agilityPercent: 0.45,
              intelligencePercent: 0.45,
              vitalityPercent: 0.4
            }
            // +250% XP, +25% Crit, +45% All Stats, +40% VIT
          },
          {
            id: "monarch_ultimate",
            name: "Monarch Ultimate",
            description: "Reach Level 1800",
            condition: { type: "level", value: 1800 },
            title: "Monarch Ultimate",
            titleBonus: {
              xp: 2.75,
              critChance: 0.27,
              strengthPercent: 0.5,
              agilityPercent: 0.5,
              intelligencePercent: 0.45,
              vitalityPercent: 0.45
            }
            // +275% XP, +27% Crit, +50% STR/AGI, +45% INT/VIT
          },
          {
            // SHADOW MONARCH PERK (E — the single player-exclusive crown). This is the
            // ONLY Shadow-Monarch-tier title (the old level-2000 "Shadow Monarch (Final)"
            // was removed so there is exactly one). Gated on the FULL Shadow Monarch
            // requirement (level 2000 + 35 achievements = the SM rank def), so it unlocks
            // precisely on ascension. By far the most dominating title in the game.
            // NOTE: the Monarch's true powers (immortality, arise-anywhere, Domain, Aura)
            // are gated on the SM *rank* directly, not on equipping this title — the title
            // is the stat crown that sits on top of them.
            id: "shadow_sovereign",
            name: "Shadow Sovereign",
            description: "Ascend to Shadow Monarch \u2014 sovereign of the dead (Level 2000 + 35 achievements)",
            condition: {
              type: "compound",
              conditions: [
                { type: "level", value: 2e3 },
                { type: "achievements", value: 35 }
              ]
            },
            title: "Shadow Sovereign",
            titleBonus: {
              xp: 5,
              critChance: 0.5,
              strengthPercent: 1,
              agilityPercent: 1,
              intelligencePercent: 1,
              vitalityPercent: 1
            }
            // +500% XP, +50% Crit, +100% (DOUBLE) all stats — the Shadow Monarch's crown
          },
          // Activity/Time Milestones
          {
            id: "dungeon_grinder",
            name: "Dungeon Grinder",
            description: "Be active for 5 hours",
            condition: { type: "time", value: 300 },
            // minutes
            title: "Dungeon Grinder",
            titleBonus: { xp: 0.06, vitalityPercent: 0.05 }
            // +6% XP, +5% VIT
          },
          {
            id: "gate_explorer",
            name: "Gate Explorer",
            description: "Be active for 20 hours",
            condition: { type: "time", value: 1200 },
            title: "Gate Explorer",
            titleBonus: { xp: 0.14, vitalityPercent: 0.05, agilityPercent: 0.05 }
            // +14% XP, +5% VIT, +5% AGI
          },
          {
            id: "raid_veteran",
            name: "Raid Veteran",
            description: "Be active for 50 hours",
            condition: { type: "time", value: 3e3 },
            title: "Raid Veteran",
            titleBonus: { xp: 0.24, vitalityPercent: 0.1, strengthPercent: 0.05 }
            // +24% XP, +10% VIT, +5% STR
          },
          {
            id: "eternal_hunter",
            name: "Eternal Hunter",
            description: "Be active for 100 hours",
            condition: { type: "time", value: 6e3 },
            title: "Eternal Hunter",
            titleBonus: { xp: 0.33, vitalityPercent: 0.1, strengthPercent: 0.05, agilityPercent: 0.05 }
            // +33% XP, +10% VIT, +5% STR, +5% AGI
          },
          // Channel/Exploration Milestones
          {
            id: "gate_traveler",
            name: "Gate Traveler",
            description: "Visit 5 unique channels",
            condition: { type: "channels", value: 5 },
            title: "Gate Traveler",
            titleBonus: { xp: 0.04, agilityPercent: 0.05 }
            // +4% XP, +5% AGI
          },
          {
            id: "dungeon_master",
            name: "Dungeon Master",
            description: "Visit 15 unique channels",
            condition: { type: "channels", value: 15 },
            title: "Dungeon Master",
            titleBonus: { xp: 0.11, intelligencePercent: 0.05, agilityPercent: 0.05 }
            // +11% XP, +5% INT, +5% AGI
          },
          {
            id: "dimension_walker",
            name: "Dimension Walker",
            description: "Visit 30 unique channels",
            condition: { type: "channels", value: 30 },
            title: "Dimension Walker",
            titleBonus: { xp: 0.19, intelligencePercent: 0.1, agilityPercent: 0.05, critChance: 0.01 }
            // +19% XP, +10% INT, +5% AGI, +1% Crit
          },
          {
            id: "realm_conqueror",
            name: "Realm Conqueror",
            description: "Visit 50 unique channels",
            condition: { type: "channels", value: 50 },
            title: "Realm Conqueror",
            titleBonus: { xp: 0.27, intelligencePercent: 0.1, agilityPercent: 0.1, critChance: 0.02 }
            // +27% XP, +10% INT, +10% AGI, +2% Crit
          },
          // Special Titles (High Requirements)
          {
            id: "shadow_monarch",
            name: "Shadow Monarch",
            description: "Reach Shadow Monarch rank (Lv 2000) \u2014 Ashborn, the King of the Dead, supreme ruler of all shadows",
            condition: { type: "level", value: 2e3 },
            title: "Shadow Monarch",
            titleBonus: { xp: 5, strengthPercent: 1, agilityPercent: 1, intelligencePercent: 1, vitalityPercent: 1, perceptionPercent: 1, critChance: 0.3 }
            // ASHBORN: supreme god-tier — 100% ALL stats, 500% XP, 30% Crit
          },
          {
            id: "monarch_of_destruction",
            name: "Monarch of Destruction",
            description: "Reach Monarch+ rank (Lv 1500) \u2014 Antares, the King of Dragons and ultimate adversary",
            condition: { type: "level", value: 1500 },
            title: "Monarch of Destruction",
            titleBonus: { xp: 2.5, strengthPercent: 0.5, vitalityPercent: 0.4, intelligencePercent: 0.3, critChance: 0.2 }
            // Antares: supreme destructive force, dragon durability, breath attacks, devastating strikes
          },
          {
            id: "the_ruler",
            name: "The Ruler",
            description: "Reach National Hunter rank (Lv 700) and be active for 200 hours \u2014 emissary of the Absolute Being",
            condition: { type: "compound", conditions: [{ type: "level", value: 700 }, { type: "time", value: 12e3 }] },
            title: "The Ruler",
            titleBonus: {
              xp: 1.4,
              intelligencePercent: 0.35,
              perceptionPercent: 0.3,
              vitalityPercent: 0.2,
              strengthPercent: 0.15,
              critChance: 0.1
            }
            // Ruler: divine telekinetic power, cosmic awareness, light endurance
          },
          // Character-Based Titles
          {
            id: "sung_jin_woo",
            name: "Sung Jin-Woo",
            description: "Reach S-Rank (Lv 200) and send 10,000 messages \u2014 the Hunter who defied fate",
            condition: { type: "compound", conditions: [{ type: "level", value: 200 }, { type: "messages", value: 1e4 }] },
            title: "Sung Jin-Woo",
            titleBonus: { xp: 0.5, strengthPercent: 0.1, agilityPercent: 0.15, intelligencePercent: 0.1, critChance: 0.05 }
            // Jin-Woo: assassin AGI/Crit, growing INT, balanced warrior
          },
          {
            id: "the_weakest",
            name: "The Weakest",
            description: "Send your first 10 messages",
            condition: { type: "messages", value: 10 },
            title: "The Weakest",
            titleBonus: { xp: 0.02, perceptionPercent: 0.05 }
            // +2% XP, +5% Perception
          },
          {
            id: "s_rank_jin_woo",
            name: "S-Rank Hunter Jin-Woo",
            description: "Reach S-Rank (Lv 200) \u2014 Korea's 10th S-Rank Hunter",
            condition: { type: "level", value: 200 },
            title: "S-Rank Hunter Jin-Woo",
            titleBonus: {
              xp: 0.55,
              agilityPercent: 0.15,
              strengthPercent: 0.1,
              intelligencePercent: 0.1,
              critChance: 0.06,
              perceptionPercent: 0.05
            }
            // S-Rank Jin-Woo: assassin speed, dual dagger crits, shadow INT, combat awareness
          },
          {
            // Renamed from 'shadow_sovereign' (2026-08-03). It collided with the
            // Level-2000 capstone above, and because checkAchievements walks the
            // whole array and skips already-unlocked ids, this easier entry claimed
            // the id first and made the capstone permanently unearnable. This is the
            // messages-earned counterpart to 'shadow_sovereign_heir' (crits-earned).
            id: "shadow_sovereign_herald",
            name: "Shadow Sovereign Herald",
            description: "Reach Monarch+ rank (Lv 1500) and send 18,000 messages \u2014 heir to the shadow throne",
            condition: { type: "compound", conditions: [{ type: "level", value: 1500 }, { type: "messages", value: 18e3 }] },
            title: "Shadow Sovereign Herald",
            titleBonus: { xp: 2.3, intelligencePercent: 0.4, agilityPercent: 0.3, strengthPercent: 0.25, critChance: 0.15 }
            // Shadow heir: necromantic INT, shadow speed, growing power
          },
          {
            id: "ashborn_successor",
            name: "Ashborn's Successor",
            description: "Reach Monarch+ rank (Lv 1500) and type 500,000 characters \u2014 chosen vessel of the Shadow Monarch",
            condition: { type: "compound", conditions: [{ type: "level", value: 1500 }, { type: "characters", value: 5e5 }] },
            title: "Ashborn's Successor",
            titleBonus: { xp: 2.4, intelligencePercent: 0.45, agilityPercent: 0.3, strengthPercent: 0.25, vitalityPercent: 0.2, critChance: 0.15 }
            // Ashborn's vessel: inheriting shadow necromancy, combat prowess, shadow endurance
          },
          // Ability/Skill Titles
          {
            id: "arise",
            name: "Arise",
            description: "Unlock 10 achievements \u2014 the iconic command to summon shadow soldiers from the dead",
            condition: { type: "achievements", value: 10 },
            title: "Arise",
            titleBonus: { xp: 0.12, intelligencePercent: 0.1, critChance: 0.01 }
            // Arise: invocation of shadow extraction, pure INT
          },
          {
            id: "shadow_exchange",
            name: "Shadow Exchange",
            description: "Send 3,000 messages \u2014 instant teleportation by swapping position with a shadow soldier",
            condition: { type: "messages", value: 3e3 },
            title: "Shadow Exchange",
            titleBonus: { xp: 0.2, agilityPercent: 0.15, critChance: 0.02 }
            // Shadow Exchange: instant repositioning, pure AGI mobility
          },
          {
            id: "dagger_throw_master",
            name: "Dagger Throw Master",
            description: "Land 1,000 critical hits. Special: Agility-scaled (capped) chance for 150x crit multiplier! \u2014 Jin-Woo's lethal ranged precision",
            condition: { type: "crits", value: 1e3 },
            title: "Dagger Throw Master",
            titleBonus: { xp: 0.25, critChance: 0.06, agilityPercent: 0.1, perceptionPercent: 0.1 }
            // Dagger Throw: speed + precision + lethal accuracy
          },
          {
            id: "stealth_master",
            name: "Stealth Master",
            description: "Be active for 30 hours during off-peak hours \u2014 Jin-Woo's ability to erase his presence completely",
            condition: { type: "time", value: 1800 },
            title: "Stealth Master",
            titleBonus: { xp: 0.18, agilityPercent: 0.1, perceptionPercent: 0.1, critChance: 0.03 }
            // Stealth: evasion + counter-detection + ambush crits
          },
          {
            id: "mana_manipulator",
            name: "Mana Manipulator",
            description: "Reach 15 Intelligence stat \u2014 mastery over raw mana energy",
            condition: { type: "stat", stat: "intelligence", value: 15 },
            title: "Mana Manipulator",
            titleBonus: { xp: 0.22, intelligencePercent: 0.15, perceptionPercent: 0.05 }
            // Mana Mastery: heavy INT + mana sense (PER)
          },
          {
            id: "shadow_storage",
            name: "Shadow Storage",
            description: "Visit 25 unique channels \u2014 storing shadow soldiers in a pocket dimension across locations",
            condition: { type: "channels", value: 25 },
            title: "Shadow Storage",
            titleBonus: { xp: 0.16, intelligencePercent: 0.1, agilityPercent: 0.05 }
            // Shadow Storage: INT to manage pocket dimension, cross-location mobility
          },
          {
            id: "beast_monarch",
            name: "Beast Monarch",
            description: "Reach Monarch rank (Lv 1000) and 30 Strength stat \u2014 Rakan, the King of Beasts",
            condition: { type: "compound", conditions: [{ type: "level", value: 1e3 }, { type: "stat", stat: "strength", value: 30 }] },
            title: "Beast Monarch",
            titleBonus: { xp: 1.8, strengthPercent: 0.45, agilityPercent: 0.25, vitalityPercent: 0.2, perceptionPercent: 0.3, critChance: 0.2 }
            // Rakan: raw STR beast, predatory senses + lethal crits
          },
          {
            id: "frost_monarch",
            name: "Frost Monarch",
            description: "Reach Monarch rank (Lv 1000) and send 15,000 messages \u2014 Sillad, the King of Snow Folk",
            condition: { type: "compound", conditions: [{ type: "level", value: 1e3 }, { type: "messages", value: 15e3 }] },
            title: "Frost Monarch",
            titleBonus: { xp: 1.8, intelligencePercent: 0.45, vitalityPercent: 0.25, perceptionPercent: 0.25, critChance: 0.1 }
            // Sillad: cold intelligence, endurance, strategic awareness
          },
          {
            id: "plague_monarch",
            name: "Plague Monarch",
            description: "Reach Monarch rank (Lv 1000) and 30 Intelligence stat \u2014 Querehsha, the Queen of Insects",
            condition: { type: "compound", conditions: [{ type: "level", value: 1e3 }, { type: "stat", stat: "intelligence", value: 30 }] },
            title: "Plague Monarch",
            titleBonus: { xp: 1.8, intelligencePercent: 0.4, perceptionPercent: 0.3, vitalityPercent: 0.25, critChance: 0.08 }
            // Querehsha: swarm intelligence, omnisensory awareness, attrition endurance
          },
          {
            id: "monarch_white_flames",
            name: "Monarch of White Flames",
            description: "Reach Monarch rank (Lv 1000) and land 3,000 critical hits \u2014 Baran, the King of Demons",
            condition: { type: "compound", conditions: [{ type: "level", value: 1e3 }, { type: "crits", value: 3e3 }] },
            title: "Monarch of White Flames",
            titleBonus: { xp: 1.9, strengthPercent: 0.35, intelligencePercent: 0.3, vitalityPercent: 0.2, critChance: 0.18 }
            // Baran: brute STR + lightning/fire magic, devastating crits
          },
          {
            id: "monarch_transfiguration",
            name: "Monarch of Transfiguration",
            description: "Reach Monarch rank (Lv 1000) and type 500,000 characters \u2014 Yogumunt, the King of Demonic Spectres",
            condition: { type: "compound", conditions: [{ type: "level", value: 1e3 }, { type: "characters", value: 5e5 }] },
            title: "Monarch of Transfiguration",
            titleBonus: { xp: 1.8, intelligencePercent: 0.45, agilityPercent: 0.25, perceptionPercent: 0.3, critChance: 0.1 }
            // Yogumunt: master illusionist/schemer, spectral evasion, deception awareness
          },
          // Solo Leveling Lore Titles
          {
            id: "shadow_soldier",
            name: "Shadow Soldier",
            description: "Land 100 critical hits \u2014 a loyal soldier extracted from the fallen",
            condition: { type: "crits", value: 100 },
            title: "Shadow Soldier",
            titleBonus: { xp: 0.08, strengthPercent: 0.05, agilityPercent: 0.05, critChance: 0.01 }
            // Shadow Soldier: basic combat stats, loyal fighter
          },
          {
            id: "kamish_slayer",
            name: "Kamish Slayer",
            description: "Reach Level 200 and land 2,000 critical hits \u2014 the dragon Kamish required National Level Hunters to defeat",
            condition: { type: "compound", conditions: [{ type: "level", value: 200 }, { type: "crits", value: 2e3 }] },
            title: "Kamish Slayer",
            titleBonus: { xp: 0.5, strengthPercent: 0.15, agilityPercent: 0.1, vitalityPercent: 0.1, critChance: 0.05 }
            // Kamish Slayer: dragon-killing STR, survival VIT, decisive strikes
          },
          {
            id: "demon_tower_conqueror",
            name: "Demon Tower Conqueror",
            description: "Reach Level 100 and visit 40 unique channels \u2014 conqueror of the Demon King Baran's tower",
            condition: { type: "compound", conditions: [{ type: "level", value: 100 }, { type: "channels", value: 40 }] },
            title: "Demon Tower Conqueror",
            titleBonus: { xp: 0.35, strengthPercent: 0.1, intelligencePercent: 0.1, vitalityPercent: 0.1, critChance: 0.03 }
            // Baran's tower: balanced combat (physical + magic demons), endurance gauntlet
          },
          {
            id: "double_awakening",
            name: "Double Awakening",
            description: "Reach Level 50 and send 3,500 messages \u2014 the rare phenomenon of awakening a second time, unlocking unlimited growth",
            condition: { type: "compound", conditions: [{ type: "level", value: 50 }, { type: "messages", value: 3500 }] },
            title: "Double Awakening",
            titleBonus: { xp: 0.2, strengthPercent: 0.05, agilityPercent: 0.05, intelligencePercent: 0.05, vitalityPercent: 0.05, perceptionPercent: 0.05, critChance: 0.02 }
            // Double Awakening: ALL stats unlocked (unlimited growth potential)
          },
          {
            id: "system_user",
            name: "System User",
            description: "Unlock 15 achievements \u2014 fully interfacing with the System that grants unlimited growth",
            condition: { type: "achievements", value: 15 },
            title: "System User",
            titleBonus: { xp: 0.25, intelligencePercent: 0.1, perceptionPercent: 0.1 }
            // System User: INT (system interface) + PER (system notifications/awareness)
          },
          {
            id: "instant_dungeon_master",
            name: "Instant Dungeon Master",
            description: "Type 200,000 characters and be active for 75 hours \u2014 mastering the System's private training dimensions",
            condition: { type: "compound", conditions: [{ type: "characters", value: 2e5 }, { type: "time", value: 4500 }] },
            title: "Instant Dungeon Master",
            titleBonus: { xp: 0.5, intelligencePercent: 0.1, vitalityPercent: 0.1, strengthPercent: 0.05, agilityPercent: 0.05 }
            // Instant Dungeon: grinding master, balanced growth from endless training
          },
          {
            id: "shadow_army_general",
            name: "Shadow Army General",
            description: "Reach Level 100 and land 750 critical hits \u2014 commanding the shadow army's elite forces",
            condition: { type: "compound", conditions: [{ type: "level", value: 100 }, { type: "crits", value: 750 }] },
            title: "Shadow Army General",
            titleBonus: { xp: 0.35, intelligencePercent: 0.15, strengthPercent: 0.1, agilityPercent: 0.05, critChance: 0.03 }
            // Shadow General: strategic INT command, combat STR, tactical strikes
          },
          {
            id: "monarch_of_beasts",
            name: "Monarch of Fangs",
            description: "Reach Monarch rank (Lv 1000) and 40 Strength stat \u2014 Rakan, the King of Beasts unleashed",
            condition: { type: "compound", conditions: [{ type: "level", value: 1e3 }, { type: "stat", stat: "strength", value: 40 }] },
            title: "Monarch of Fangs",
            titleBonus: { xp: 2, strengthPercent: 0.5, agilityPercent: 0.3, perceptionPercent: 0.35, critChance: 0.22 }
            // Rakan unleashed: apex predator, maximum STR/Crit, hunting instincts
          },
          {
            id: "monarch_of_plagues",
            name: "Monarch of Plagues",
            description: "Reach Monarch+ rank (Lv 1500) and send 20,000 messages \u2014 Querehsha, the Queen of Insects ascended",
            condition: { type: "compound", conditions: [{ type: "level", value: 1500 }, { type: "messages", value: 2e4 }] },
            title: "Monarch of Plagues",
            titleBonus: { xp: 2.3, intelligencePercent: 0.45, perceptionPercent: 0.35, vitalityPercent: 0.3, agilityPercent: 0.15, critChance: 0.1 }
            // Querehsha ascended: plague mastery, swarm omniscience, corrosive endurance
          },
          {
            id: "monarch_of_iron_body",
            name: "Monarch of Iron Body",
            description: "Reach Monarch rank (Lv 1000) and 35 Vitality stat \u2014 Tarnak, the King of Monstrous Humanoids",
            condition: { type: "compound", conditions: [{ type: "level", value: 1e3 }, { type: "stat", stat: "vitality", value: 35 }] },
            title: "Monarch of Iron Body",
            titleBonus: { xp: 1.8, vitalityPercent: 0.5, strengthPercent: 0.3, critChance: 0.05 }
            // Tarnak: indestructible defense, massive VIT, secondary STR
          },
          {
            id: "monarch_of_beginning",
            name: "Monarch of Beginning",
            description: "Reach Monarch rank (Lv 1000) and unlock 30 achievements \u2014 Legia, the King of Giants (weakest Monarch)",
            condition: { type: "compound", conditions: [{ type: "level", value: 1e3 }, { type: "achievements", value: 30 }] },
            title: "Monarch of Beginning",
            titleBonus: {
              xp: 1.5,
              strengthPercent: 0.3,
              vitalityPercent: 0.25,
              critChance: 0.05
            }
            // Legia: weakest Monarch, brute force giant, durable but slow and unrefined
          },
          {
            id: "absolute_ruler",
            name: "Absolute Ruler",
            description: "Reach Monarch rank (Lv 1000) and type 600,000 characters \u2014 wielder of the Rulers' full authority",
            condition: { type: "compound", conditions: [{ type: "level", value: 1e3 }, { type: "characters", value: 6e5 }] },
            title: "Absolute Ruler",
            titleBonus: {
              xp: 2,
              intelligencePercent: 0.45,
              perceptionPercent: 0.35,
              vitalityPercent: 0.3,
              strengthPercent: 0.2,
              agilityPercent: 0.15,
              critChance: 0.12
            }
            // Absolute Ruler: full divine authority, supreme cosmic awareness, immortal endurance
          },
          {
            id: "shadow_sovereign_heir",
            name: "Shadow Sovereign Heir",
            description: "Reach Monarch+ rank (Lv 1500) and land 5,000 critical hits \u2014 on the cusp of inheriting the shadow",
            condition: { type: "compound", conditions: [{ type: "level", value: 1500 }, { type: "crits", value: 5e3 }] },
            title: "Shadow Sovereign Heir",
            titleBonus: { xp: 2.3, agilityPercent: 0.35, critChance: 0.2, intelligencePercent: 0.3, strengthPercent: 0.2 }
            // Shadow heir through combat: assassin crits, shadow magic, dagger mastery
          },
          {
            id: "ruler_of_chaos",
            name: "Ruler of Chaos",
            description: "Reach National Hunter rank (Lv 700) and be active for 300 hours \u2014 power beyond mortal comprehension",
            condition: { type: "compound", conditions: [{ type: "level", value: 700 }, { type: "time", value: 18e3 }] },
            title: "Ruler of Chaos",
            titleBonus: {
              xp: 1.5,
              intelligencePercent: 0.3,
              perceptionPercent: 0.3,
              agilityPercent: 0.2,
              strengthPercent: 0.15,
              critChance: 0.12
            }
            // Chaotic Ruler: unpredictable divine power, heightened awareness, cosmic speed
          }
        ];
        this._cache.achievementDefinitions = achievements;
        return achievements;
      }
    };
  }
});

// src/SoloLevelingStats/shadowarmy-integration.js
var require_shadowarmy_integration = __commonJS({
  "src/SoloLevelingStats/shadowarmy-integration.js"(exports2, module2) {
    module2.exports = {
      cacheShadowArmyBuffs(buffs, timestamp = Date.now()) {
        const normalized = buffs && typeof buffs === "object" ? this.normalizeStatBlock({ ...this.DEFAULT_SHADOW_BUFFS, ...buffs }, 0) : this.createEmptyStatBlock();
        this._cache.shadowArmyBuffs = normalized;
        this._cache.shadowArmyBuffsTime = timestamp;
        return normalized;
      },
      getShadowArmyBuffs() {
        var _a, _b;
        const now = Date.now();
        if (this._cache.shadowArmyBuffs && this._cache.shadowArmyBuffsTime && now - this._cache.shadowArmyBuffsTime < this._cache.shadowArmyBuffsTTL) {
          return this._cache.shadowArmyBuffs;
        }
        try {
          const shadowArmy = (_b = (_a = this._SLUtils) == null ? void 0 : _a.getPluginInstance) == null ? void 0 : _b.call(_a, "ShadowArmy");
          if (!shadowArmy) {
            return this.cacheShadowArmyBuffs(null, now);
          }
          if (shadowArmy.calculateTotalBuffs) {
            if (this._cachedShadowBuffs && Date.now() - (this._cachedShadowBuffsTime || 0) < 5e3) {
              return this.cacheShadowArmyBuffs(this._cachedShadowBuffs, now);
            }
            const refreshCooldownMs = 750;
            const canScheduleRefresh = !this._shadowBuffsRefreshPromise && now - (this._shadowBuffsRefreshAt || 0) >= refreshCooldownMs;
            if (canScheduleRefresh) {
              this._shadowBuffsRefreshAt = now;
              this._shadowBuffsRefreshPromise = Promise.resolve().then(() => shadowArmy.calculateTotalBuffs()).then((buffs) => {
                this._cachedShadowBuffs = buffs;
                this._cachedShadowBuffsTime = Date.now();
                this.cacheShadowArmyBuffs(buffs);
                this.updateChatUI();
                return buffs;
              }).catch((err) => {
                var _a2;
                (_a2 = this.debugError) == null ? void 0 : _a2.call(this, "SHADOW_BUFFS_REFRESH", err);
                return null;
              }).finally(() => {
                this._shadowBuffsRefreshPromise = null;
              });
            }
            return this.cacheShadowArmyBuffs(this._cachedShadowBuffs, now);
          }
          return this.cacheShadowArmyBuffs(null, now);
        } catch (error) {
          return this.cacheShadowArmyBuffs(null, now);
        }
      },
      getEffectiveShadowArmyBuffs() {
        return this.getShadowArmyBuffs();
      }
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

// src/SoloLevelingStats/equipment-integration.js
var require_equipment_integration = __commonJS({
  "src/SoloLevelingStats/equipment-integration.js"(exports2, module2) {
    var SLEvents = require_event_bus();
    module2.exports = {
      initEquipmentIntegration() {
        this.updateEquipmentBonuses();
        this._onEquipmentChanged = () => {
          this.updateEquipmentBonuses();
          this._cache.totalEffectiveStats = null;
          this._cache.totalEffectiveStatsTime = 0;
          this.updateChatUI();
        };
        SLEvents.on("EquipmentManager:changed", this._onEquipmentChanged);
      },
      updateEquipmentBonuses() {
        var _a, _b;
        try {
          const bonuses = ((_b = (_a = window.EquipmentManager) == null ? void 0 : _a.getTotalEquippedBonuses) == null ? void 0 : _b.call(_a)) || null;
          this._cachedEquipmentBonuses = bonuses && typeof bonuses === "object" ? bonuses : null;
        } catch (_) {
          this._cachedEquipmentBonuses = null;
        }
      },
      getEquipmentBonuses() {
        return this._cachedEquipmentBonuses || {};
      },
      cleanupEquipmentIntegration() {
        if (this._onEquipmentChanged) {
          SLEvents.off("EquipmentManager:changed", this._onEquipmentChanged);
          this._onEquipmentChanged = null;
        }
        this._cachedEquipmentBonuses = null;
      }
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

// src/SoloLevelingStats/chat-ui-core.js
var require_chat_ui_core = __commonJS({
  "src/SoloLevelingStats/chat-ui-core.js"(exports2, module2) {
    var { showToolbarTooltip, hideToolbarTooltip, removeToolbarTooltip, ensureTooltipCSS } = require_toolbar_tooltip();
    module2.exports = {
      _getChannelHeaderToolbar() {
        const selectors = [
          '[aria-label="Channel header"] [class*="toolbar_"]',
          '[class*="titleWrapper_"] [class*="toolbar_"]',
          'header [class*="toolbar_"]'
        ];
        for (const selector of selectors) {
          const toolbar = document.querySelector(selector);
          if (toolbar) return toolbar;
        }
        return null;
      },
      _createHeaderStatsButton() {
        var _a;
        if ((_a = this._headerStatsButton) == null ? void 0 : _a.isConnected) return this._headerStatsButton;
        const button = document.createElement("button");
        button.id = "sls-header-stats-button";
        button.className = "sls-header-stats-button";
        button.type = "button";
        button.setAttribute("aria-label", "Solo Leveling Stats");
        button.innerHTML = `
      <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
        <path d="M4 18h3v-6H4v6zm6 0h3V6h-3v12zm6 0h4V10h-4v8z" fill="currentColor"></path>
      </svg>
    `;
        button.addEventListener("click", (event) => {
          event.preventDefault();
          event.stopPropagation();
          this.toggleHeaderStatsPopup();
        });
        ensureTooltipCSS();
        button.addEventListener("mouseenter", () => showToolbarTooltip(button, "sl-toolbar-tip-sls", "Solo Leveling Stats"));
        button.addEventListener("mouseleave", () => hideToolbarTooltip("sl-toolbar-tip-sls"));
        this._headerStatsButton = button;
        return button;
      },
      ensureHeaderStatsButton() {
        var _a, _b;
        if (!this._isRunning || !this._isGuildTextChannel()) {
          this.removeHeaderStatsButton();
          return false;
        }
        try {
          const channelInfo = (_a = this.getCurrentChannelInfo) == null ? void 0 : _a.call(this);
          const channelType = (_b = this.getChannelTypeById) == null ? void 0 : _b.call(this, channelInfo == null ? void 0 : channelInfo.rawChannelId);
          if (channelType === 2 || channelType === 13 || channelType === 10 || channelType === 11 || channelType === 12 || channelType === 15) {
            this.removeHeaderStatsButton();
            return false;
          }
        } catch (_) {
        }
        const toolbar = this._getChannelHeaderToolbar();
        if (!toolbar) {
          this.closeHeaderStatsPopup();
          return false;
        }
        const button = this._createHeaderStatsButton();
        if (button.parentElement !== toolbar) {
          toolbar.appendChild(button);
        }
        return true;
      },
      removeHeaderStatsButton() {
        var _a;
        this.closeHeaderStatsPopup();
        if ((_a = this._headerStatsButton) == null ? void 0 : _a.isConnected) {
          this._headerStatsButton.remove();
        }
        this._headerStatsButton = null;
        removeToolbarTooltip("sl-toolbar-tip-sls");
      },
      toggleHeaderStatsPopup() {
        var _a;
        if ((_a = this._headerStatsPopup) == null ? void 0 : _a.isConnected) {
          this.closeHeaderStatsPopup();
        } else {
          this.openHeaderStatsPopup();
        }
      },
      openHeaderStatsPopup() {
        var _a, _b;
        if ((_a = this._headerStatsPopup) == null ? void 0 : _a.isConnected) return;
        if (!this.ensureHeaderStatsButton()) return;
        if (!((_b = this._headerStatsButton) == null ? void 0 : _b.isConnected)) return;
        const popup = document.createElement("div");
        popup.id = "sls-header-stats-popup";
        popup.className = "sls-header-stats-popup";
        document.body.appendChild(popup);
        try {
          const { StatsPopup } = this._chatUIComponents || {};
          const root = BdApi.ReactDOM.createRoot(popup);
          root.render(BdApi.React.createElement(StatsPopup, { onClose: () => this.closeHeaderStatsPopup() }));
          this._headerStatsPopupRoot = root;
          this._headerStatsPopup = popup;
        } catch (error) {
          this.debugError("HEADER_POPUP", error, { phase: "render" });
          popup.remove();
          return;
        }
        this._headerStatsPopupDocClickHandler = (event) => {
          var _a2, _b2, _c, _d;
          const target = event.target;
          if (!target) return;
          const clickedPopup = (_b2 = (_a2 = this._headerStatsPopup) == null ? void 0 : _a2.contains) == null ? void 0 : _b2.call(_a2, target);
          const clickedButton = (_d = (_c = this._headerStatsButton) == null ? void 0 : _c.contains) == null ? void 0 : _d.call(_c, target);
          if (!clickedPopup && !clickedButton) {
            this.closeHeaderStatsPopup();
          }
        };
        this._headerStatsPopupResizeHandler = () => this.queueHeaderStatsPopupPosition();
        this._headerStatsPopupScrollHandler = () => this.queueHeaderStatsPopupPosition();
        document.addEventListener("mousedown", this._headerStatsPopupDocClickHandler, true);
        window.addEventListener("resize", this._headerStatsPopupResizeHandler, { passive: true });
        window.addEventListener("scroll", this._headerStatsPopupScrollHandler, this._headerStatsPopupScrollListenerOptions);
        this.positionHeaderStatsPopup();
      },
      closeHeaderStatsPopup() {
        var _a;
        if (this._headerStatsPopupPositionRaf) {
          cancelAnimationFrame(this._headerStatsPopupPositionRaf);
          this._headerStatsPopupPositionRaf = null;
        }
        if (this._headerStatsPopupDocClickHandler) {
          document.removeEventListener("mousedown", this._headerStatsPopupDocClickHandler, true);
          this._headerStatsPopupDocClickHandler = null;
        }
        if (this._headerStatsPopupResizeHandler) {
          window.removeEventListener("resize", this._headerStatsPopupResizeHandler);
          this._headerStatsPopupResizeHandler = null;
        }
        if (this._headerStatsPopupScrollHandler) {
          window.removeEventListener("scroll", this._headerStatsPopupScrollHandler, this._headerStatsPopupScrollListenerOptions);
          this._headerStatsPopupScrollHandler = null;
        }
        if (this._headerStatsPopupRoot) {
          try {
            this._headerStatsPopupRoot.unmount();
          } catch (error) {
            this.debugError("HEADER_POPUP", error, { phase: "unmount" });
          }
          this._headerStatsPopupRoot = null;
        }
        if ((_a = this._headerStatsPopup) == null ? void 0 : _a.isConnected) {
          this._headerStatsPopup.remove();
        }
        this._headerStatsPopup = null;
      },
      queueHeaderStatsPopupPosition() {
        if (this._headerStatsPopupPositionRaf) return;
        if (typeof requestAnimationFrame !== "function") {
          this.positionHeaderStatsPopup();
          return;
        }
        this._headerStatsPopupPositionRaf = requestAnimationFrame(() => {
          this._headerStatsPopupPositionRaf = null;
          if (!this._isRunning) return;
          this.positionHeaderStatsPopup();
        });
      },
      positionHeaderStatsPopup() {
        const popup = this._headerStatsPopup;
        const button = this._headerStatsButton;
        if (!popup || !button || !popup.isConnected || !button.isConnected) return;
        const buttonRect = button.getBoundingClientRect();
        const viewportWidth = window.innerWidth || 0;
        const viewportHeight = window.innerHeight || 0;
        const desiredWidth = Math.max(340, Math.min(520, viewportWidth - 24));
        const maxHeight = Math.max(260, viewportHeight - 90);
        popup.style.width = `${desiredWidth}px`;
        popup.style.maxHeight = `${maxHeight}px`;
        const margin = 12;
        let left = buttonRect.right - desiredWidth;
        left = Math.max(margin, Math.min(left, viewportWidth - desiredWidth - margin));
        let top = buttonRect.bottom + 10;
        if (top > viewportHeight - margin - 180) {
          top = Math.max(margin, buttonRect.top - Math.min(maxHeight, 560) - 10);
        }
        popup.style.left = `${left}px`;
        popup.style.top = `${Math.max(margin, top)}px`;
      },
      ensureChatUIUpdateInterval(onlyWhenDirty = false) {
        if (this.chatUIUpdateInterval) return;
        this.chatUIUpdateInterval = setInterval(() => {
          var _a;
          if (document.hidden) return;
          if (this._isGuildTextChannel()) {
            const panelInDOM = document.getElementById("sls-chat-ui");
            if (!panelInDOM) {
              if (this.chatUIPanel) {
                this.debugLog("CHAT_UI_WATCHDOG", "Panel reference exists but DOM element missing \u2014 clearing stale ref");
                this.chatUIPanel = null;
              }
              this.debugLog("CHAT_UI_WATCHDOG", "Panel missing from DOM \u2014 triggering re-creation");
              clearInterval(this.chatUIUpdateInterval);
              this.chatUIUpdateInterval = null;
              this.createChatUI();
              return;
            }
          }
          this.ensureHeaderStatsButton();
          if ((_a = this._headerStatsPopup) == null ? void 0 : _a.isConnected) {
            this.queueHeaderStatsPopupPosition();
          }
          if (onlyWhenDirty && !this._chatUIDirty) return;
          this._chatUIDirty = false;
          this.updateChatUI();
        }, 4e3);
      },
      createChatUI() {
        if (this._isCreatingUI) {
          this.debugLog("CREATE_CHAT_UI", "Skipping \u2014 already creating UI");
          return;
        }
        this._isCreatingUI = true;
        try {
          if (!this._isGuildTextChannel()) {
            this.debugLog("CREATE_CHAT_UI", "Skipping \u2014 not a guild text channel");
            this._isCreatingUI = false;
            this.removeChatUI();
            return;
          }
          this.debugLog("CREATE_CHAT_UI", "Starting chat UI creation");
          this.removeChatUI();
          this.injectChatUICSS();
          this.debugLog("CREATE_CHAT_UI", "Using DOM injection path");
          const tryCreateUI = () => {
            try {
              if (!this._canShowChatUIInCurrentView()) return false;
              if (document.getElementById("sls-chat-ui")) {
                return true;
              }
              const headerSection = document.querySelector('section[aria-label="Channel header"]');
              if (!headerSection) return false;
              let chatContainer = headerSection.closest('[class*="chat_"]');
              if (!chatContainer) {
                chatContainer = headerSection.parentElement;
              }
              if (!chatContainer) return false;
              if (this._chatUIRoot) {
                try {
                  this._chatUIRoot.unmount();
                } catch (_) {
                }
                this._chatUIRoot = null;
              }
              const uiPanel = document.createElement("div");
              uiPanel.id = "sls-chat-ui";
              uiPanel.className = "sls-chat-strip-panel";
              chatContainer.insertBefore(uiPanel, chatContainer.firstChild);
              try {
                const { StatsPanel } = this._chatUIComponents;
                const root = BdApi.ReactDOM.createRoot(uiPanel);
                root.render(BdApi.React.createElement(StatsPanel));
                this._chatUIRoot = root;
              } catch (renderError) {
                this.debugError("RENDER_CHAT_UI", renderError);
                uiPanel.remove();
                return false;
              }
              this.chatUIPanel = uiPanel;
              this.debugLog("CREATE_CHAT_UI", "Panel mounted at top of chat container (below title bar)");
              this.ensureChatUIUpdateInterval(true);
              this.ensureHeaderStatsButton();
              return true;
            } catch (uiError) {
              this.debugError("TRY_CREATE_UI", uiError);
              return false;
            }
          };
          if (!tryCreateUI()) {
            this.chatUICreationObserver = new MutationObserver((records) => {
              var _a, _b;
              if (typeof document !== "undefined" && document.hidden) return;
              for (const r of records) {
                for (const node of r.addedNodes) {
                  if (node.nodeType !== 1) continue;
                  const headerPresent = ((_a = node.matches) == null ? void 0 : _a.call(node, 'section[aria-label="Channel header"]')) || ((_b = node.querySelector) == null ? void 0 : _b.call(node, 'section[aria-label="Channel header"]'));
                  if (headerPresent && tryCreateUI()) {
                    if (this.chatUICreationObserver) {
                      this.chatUICreationObserver.disconnect();
                      this.chatUICreationObserver = null;
                    }
                    if (this.chatUICreationRetryTimeout) {
                      clearTimeout(this.chatUICreationRetryTimeout);
                      this.chatUICreationRetryTimeout = null;
                    }
                    return;
                  }
                }
              }
            });
            const _chatObserveRoot = document.getElementById("app-mount") || document.body;
            this.chatUICreationObserver.observe(_chatObserveRoot, { childList: true, subtree: true });
            this.chatUICreationRetryTimeout = setTimeout(() => {
              if (this.chatUICreationObserver) {
                this.chatUICreationObserver.disconnect();
                this.chatUICreationObserver = null;
              }
              this.chatUICreationRetryTimeout = null;
            }, 1e4);
          }
          this._isCreatingUI = false;
        } catch (error) {
          this._isCreatingUI = false;
          this.debugError("CREATE_CHAT_UI", error);
          if (!this._createChatUIErrorRetryTimeout) {
            this._createChatUIErrorRetryTimeout = setTimeout(() => {
              this._createChatUIErrorRetryTimeout = null;
              try {
                this.createChatUI();
              } catch (retryError) {
                this.debugError("CREATE_CHAT_UI_RETRY", retryError);
              }
            }, 3e3);
          }
        }
      },
      removeChatUI() {
        var _a, _b, _c, _d, _e, _f, _g, _h;
        if ((_a = this.settings) == null ? void 0 : _a.debugMode) {
          this.debugLog("REMOVE_CHAT_UI", "removeChatUI() called", {
            hadPanel: !!this.chatUIPanel,
            panelConnected: ((_b = this.chatUIPanel) == null ? void 0 : _b.isConnected) ?? null,
            hadRoot: !!this._chatUIRoot,
            hadObserver: !!this.chatUIObserver,
            inGuildText: this._isGuildTextChannel(),
            caller: ((_d = (_c = new Error().stack) == null ? void 0 : _c.split("\n")[2]) == null ? void 0 : _d.trim()) || "unknown"
          });
        }
        this._isCreatingUI = false;
        if (this._chatUIRoot) {
          try {
            this._chatUIRoot.unmount();
          } catch (error) {
            this.debugError("REMOVE_CHAT_UI", error);
          }
          this._chatUIRoot = null;
        }
        if (this.chatUIPanel) {
          this.chatUIPanel.remove();
          this.chatUIPanel = null;
        }
        if (this.chatUIUpdateInterval) {
          clearInterval(this.chatUIUpdateInterval);
          this.chatUIUpdateInterval = null;
        }
        if (this._createChatUIStartupRetryTimeout) {
          clearTimeout(this._createChatUIStartupRetryTimeout);
          this._createChatUIStartupRetryTimeout = null;
        }
        if (this._createChatUIErrorRetryTimeout) {
          clearTimeout(this._createChatUIErrorRetryTimeout);
          this._createChatUIErrorRetryTimeout = null;
        }
        if (this._chatUiObserverRetryTimeout) {
          clearTimeout(this._chatUiObserverRetryTimeout);
          this._chatUiObserverRetryTimeout = null;
        }
        if (this._chatUiObserverDebounceTimeout) {
          clearTimeout(this._chatUiObserverDebounceTimeout);
          this._chatUiObserverDebounceTimeout = null;
        }
        if (this.chatUICreationObserver) {
          try {
            this.chatUICreationObserver.disconnect();
          } catch (_) {
          }
          this.chatUICreationObserver = null;
        }
        if (this.chatUICreationRetryTimeout) {
          clearTimeout(this.chatUICreationRetryTimeout);
          this.chatUICreationRetryTimeout = null;
        }
        if (this.chatUIObserver) {
          this.chatUIObserver.disconnect();
          this.chatUIObserver = null;
        }
        this.removeHeaderStatsButton();
        (_f = (_e = this._chatUIForceUpdates) == null ? void 0 : _e.clear) == null ? void 0 : _f.call(_e);
        this._chatUIForceUpdate = null;
        this._lastChatUIUpdateAt = 0;
        if (this._chatUIUpdateThrottleTimer) {
          clearTimeout(this._chatUIUpdateThrottleTimer);
          this._chatUIUpdateThrottleTimer = null;
        }
        (_h = document.getElementById(((_g = this._constants) == null ? void 0 : _g.CHAT_UI_STYLE_ID) || "sls-chat-ui-styles")) == null ? void 0 : _h.remove();
      },
      updateChatUI() {
        if (!this._isRunning) return;
        this._chatUIDirty = false;
        const now = Date.now();
        const lastUpdateAt = this._lastChatUIUpdateAt || 0;
        const throttleMs = 150;
        const elapsed = now - lastUpdateAt;
        if (elapsed < throttleMs) {
          const waitMs = Math.max(0, throttleMs - elapsed);
          if (!this._chatUIUpdateThrottleTimer) {
            this._chatUIUpdateThrottleTimer = setTimeout(() => {
              this._chatUIUpdateThrottleTimer = null;
              if (!this._isRunning) return;
              this._lastChatUIUpdateAt = Date.now();
              this._triggerUIForceUpdates();
            }, waitMs);
          }
          return;
        }
        this._lastChatUIUpdateAt = now;
        this._triggerUIForceUpdates();
      }
    };
  }
});

// src/SoloLevelingStats/styles.css
var require_styles = __commonJS({
  "src/SoloLevelingStats/styles.css"(exports2, module2) {
    module2.exports = `      /* ============================================================================
         SOLO LEVELING STATS - THEME CSS
         ============================================================================
         This CSS file styles the Solo Leveling Stats plugin UI components.
         Organized by functional area for easy maintenance and navigation.
         ============================================================================ */

      /* ============================================================================
         SECTION 0: COMPOSER STRIP + HEADER POPUP
         ============================================================================
         Targets: Compact HP/MP strip near composer and channel-header popup shell
         Purpose: Keep chat UI compact while moving interactive controls into popup
         ============================================================================ */
      .sls-chat-strip-panel {
        position: relative;
        margin: 0;
        padding: 8px 16px 4px;
        background: rgba(10, 10, 16, 0.85);
        border: none;
        border-bottom: 1px solid rgba(138, 43, 226, 0.3);
        border-radius: 0;
        box-shadow: 0 1px 6px rgba(138, 43, 226, 0.1);
        z-index: 1;
      }

      .sls-chat-strip {
        display: flex;
        align-items: center;
        gap: 8px;
        width: 100%;
      }

      .sls-chat-hp-mana-display.sls-chat-hp-mana-compact #sls-hp-text,
      .sls-chat-hp-mana-display.sls-chat-hp-mana-compact #sls-mp-text {
        display: block !important;
        min-width: 44px !important;
        font-size: 9px !important;
      }

      .sls-chat-hp-mana-display.sls-chat-hp-mana-compact #sls-hp-bar-fill,
      .sls-chat-hp-mana-display.sls-chat-hp-mana-compact #sls-mp-bar-fill {
        box-shadow: none !important;
      }

      .sls-header-stats-button {
        width: 24px;
        height: 24px;
        border: none !important;
        border-radius: 2px;
        background: transparent !important;
        box-shadow: none !important;
        color: #b5bac1 !important;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        opacity: 0.85;
        transition: opacity 0.15s ease, background 0.15s ease, color 0.15s ease;
        padding: 0;
        margin: 0 2px;
        outline: none !important;
        -webkit-appearance: none;
        appearance: none;
      }

      .sls-header-stats-button svg {
        width: 20px;
        height: 20px;
        display: block;
      }

      .sls-header-stats-button:hover {
        opacity: 1;
        color: var(--interactive-hover, #ffffff) !important;
        background: rgba(138, 43, 226, 0.15) !important;
        box-shadow: none !important;
      }

      .sls-header-stats-button:focus,
      .sls-header-stats-button:focus-visible,
      .sls-header-stats-button:active {
        outline: none !important;
        border: none !important;
        background: transparent !important;
        box-shadow: none !important;
        color: var(--interactive-hover, #ffffff) !important;
      }

      .sls-header-stats-popup {
        position: fixed;
        z-index: 11000;
        border: 1px solid rgba(138, 43, 226, 0.32);
        border-radius: 2px;
        background:
          linear-gradient(165deg, rgba(22, 18, 32, 0.98) 0%, rgba(13, 12, 20, 0.98) 55%, rgba(10, 10, 16, 0.99) 100%);
        box-shadow:
          0 20px 52px rgba(0, 0, 0, 0.66),
          0 0 24px rgba(138, 43, 226, 0.2),
          inset 0 1px 0 rgba(255, 255, 255, 0.06),
          inset 0 0 0 1px rgba(138, 43, 226, 0.06);
        overflow: hidden;
        scrollbar-width: thin;
        scrollbar-color: rgba(138, 43, 226, 0.85) rgba(8, 8, 13, 0.55);
      }

      .sls-stats-popup-surface {
        display: flex;
        flex-direction: column;
        max-height: inherit;
      }

      .sls-stats-popup-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 11px 14px;
        border-bottom: 1px solid rgba(138, 43, 226, 0.2);
        background: linear-gradient(180deg, rgba(138, 43, 226, 0.1) 0%, rgba(138, 43, 226, 0.02) 100%);
        box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.04);
      }

      .sls-stats-popup-title {
        color: #d9beff;
        font-size: 12px;
        letter-spacing: 0.04em;
        text-transform: uppercase;
        font-weight: 700;
      }

      .sls-stats-popup-close {
        width: 26px;
        height: 26px;
        border: 1px solid rgba(138, 43, 226, 0.18);
        border-radius: 2px;
        background: rgba(138, 43, 226, 0.14);
        color: #e7d6ff;
        cursor: pointer;
        font-size: 16px;
        line-height: 1;
        transition: background 0.18s ease, border-color 0.18s ease, box-shadow 0.18s ease;
      }

      .sls-stats-popup-close:hover {
        background: rgba(186, 85, 211, 0.3);
        border-color: rgba(186, 85, 211, 0.45);
        box-shadow: 0 0 12px rgba(138, 43, 226, 0.35);
      }

      .sls-stats-popup-content {
        padding: 10px 12px 12px;
        overflow-y: auto;
        max-height: inherit;
        display: flex;
        flex-direction: column;
        gap: 8px;
      }

      /* SL-themed scrollbar \u2014 thin, sharp, purple-gradient thumb */
      .sls-stats-popup-content::-webkit-scrollbar {
        width: 9px;
      }
      .sls-stats-popup-content::-webkit-scrollbar-track {
        background: rgba(8, 8, 13, 0.6);
      }
      .sls-stats-popup-content::-webkit-scrollbar-thumb {
        background: linear-gradient(180deg, rgba(138, 43, 226, 0.6) 0%, rgba(138, 43, 226, 0.38) 100%);
        border: 1px solid rgba(138, 43, 226, 0.35);
        border-radius: 2px;
      }
      .sls-stats-popup-content::-webkit-scrollbar-thumb:hover {
        background: linear-gradient(180deg, rgba(186, 85, 211, 0.75) 0%, rgba(138, 43, 226, 0.5) 100%);
      }

      .sls-popup-section-title {
        color: #d8b4fe;
        font-size: 11px;
        text-transform: uppercase;
        letter-spacing: 0.04em;
        margin-bottom: 4px;
      }

      .sls-popup-radar {
        border: 1px solid rgba(138, 43, 226, 0.16);
        background: linear-gradient(160deg, rgba(138, 43, 226, 0.06) 0%, rgba(10, 10, 16, 0.55) 100%);
        border-radius: 2px;
        padding: 10px;
        box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.04), 0 2px 8px rgba(0, 0, 0, 0.25);
      }

      .sls-popup-radar-wrap {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 6px;
      }

      .sls-popup-radar-svg {
        width: 100%;
        max-width: 220px;
        height: auto;
        overflow: visible;
      }

      .sls-popup-radar-ring {
        fill: rgba(138, 43, 226, 0.04);
        stroke: rgba(186, 85, 211, 0.22);
        stroke-width: 1;
      }

      .sls-popup-radar-axis {
        stroke: rgba(203, 155, 255, 0.36);
        stroke-width: 1;
      }

      .sls-popup-radar-area {
        fill: rgba(138, 43, 226, 0.24);
        stroke: rgba(229, 209, 255, 0.9);
        stroke-width: 1.6;
      }

      .sls-popup-radar-node {
        fill: #e9d5ff;
        stroke: rgba(10, 8, 18, 0.9);
        stroke-width: 1.1;
      }

      .sls-popup-radar-label {
        fill: #d8b4fe;
        font-size: 9px;
        font-weight: 700;
        letter-spacing: 0.04em;
        text-anchor: middle;
        dominant-baseline: middle;
      }

      .sls-popup-radar-scale {
        color: rgba(214, 198, 232, 0.9);
        font-size: 10px;
      }

      .sls-popup-buff-summary {
        border: 1px solid rgba(138, 43, 226, 0.16);
        background: linear-gradient(160deg, rgba(138, 43, 226, 0.06) 0%, rgba(10, 10, 16, 0.6) 100%);
        border-radius: 2px;
        padding: 10px;
        box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.04), 0 2px 8px rgba(0, 0, 0, 0.25);
      }

      .sls-popup-buff-group + .sls-popup-buff-group {
        margin-top: 7px;
        padding-top: 7px;
        border-top: 1px dashed rgba(138, 43, 226, 0.24);
      }

      .sls-popup-buff-source {
        color: #f3e8ff;
        font-size: 11px;
        font-weight: 700;
      }

      .sls-popup-buff-entries {
        margin-top: 4px;
        display: flex;
        flex-wrap: wrap;
        gap: 4px 8px;
      }

      .sls-popup-buff-entry {
        color: #c6b4e2;
        font-size: 10px;
      }

      .sls-popup-empty {
        color: rgba(214, 198, 232, 0.82);
        font-size: 10px;
      }

      /* ============================================================================
         SECTION 1: BASE PANEL & LAYOUT
         ============================================================================
         Targets: Main chat panel container, header, content wrapper, toggle button
         Purpose: Foundation layout and container styling for the entire UI
         ============================================================================ */
      .sls-chat-panel {
        position: relative;
        margin: 6px 16px 8px 16px;
        background: linear-gradient(160deg, rgba(22, 18, 32, 0.95) 0%, rgba(14, 13, 22, 0.95) 55%, rgba(11, 11, 17, 0.96) 100%);
        border: 1px solid rgba(138, 43, 226, 0.32);
        border-radius: 2px;
        padding: 14px 14px;
        box-shadow:
          0 10px 30px rgba(0, 0, 0, 0.45),
          0 0 18px rgba(138, 43, 226, 0.16),
          inset 0 1px 0 rgba(255, 255, 255, 0.05),
          inset 0 0 0 1px rgba(138, 43, 226, 0.05);
        z-index: 1000;
        backdrop-filter: blur(10px);
      }

      .sls-chat-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 10px;
        padding-bottom: 8px;
        border-bottom: 1px solid rgba(138, 43, 226, 0.2);
        gap: 12px;
      }

      /* ============================================================================
         SECTION 2: HP/MANA DISPLAY & COLLAPSED STATES
         ============================================================================
         Targets: HP/Mana bar containers, collapsed state styling
         Purpose: Health and mana bar display with enhanced visibility when collapsed
         ============================================================================ */
      .sls-chat-hp-mana-display {
        display: flex !important;
        align-items: center !important;
        gap: 12px !important;
        flex: 1 !important;
        min-width: 0 !important;
        overflow: hidden !important;
        transition: gap 0.3s ease;
      }

      /* Enhanced styling when collapsed (toggle off) - make bars more prominent */
      .sls-chat-hp-mana-display.sls-hp-mana-collapsed {
        gap: 16px !important;
        min-width: 333px !important;
      }

      /* Increase horizontal size of HP/MP containers when collapsed */
      .sls-hp-mana-collapsed > div {
        flex: 1.3 !important;
        min-width: 133px !important;
      }

      .sls-hp-mana-collapsed > div > div:nth-child(2),
      .sls-hp-mana-collapsed #sls-mp-bar-container {
        height: 16px !important;
        min-height: 16px !important;
        min-width: 100px !important;
        flex: 1 !important;
      }

      .sls-chat-title {
        color: #d4a5ff;
        font-weight: 700;
        font-size: 13px;
        letter-spacing: 0.5px;
        text-shadow: 0 0 6px rgba(138, 43, 226, 0.9), 0 0 12px rgba(138, 43, 226, 0.5);
      }

      .sls-chat-toggle {
        background: rgba(138, 43, 226, 0.15);
        border: 1px solid rgba(138, 43, 226, 0.3);
        color: #b894e6;
        cursor: pointer;
        font-size: 11px;
        padding: 4px 8px;
        border-radius: 2px;
        transition: all 0.2s ease;
        min-width: 24px;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
        margin-left: 8px;
      }

      .sls-chat-toggle:hover {
        background: rgba(138, 43, 226, 0.25);
        border-color: rgba(138, 43, 226, 0.5);
        color: #d4a5ff;
        box-shadow: 0 0 6px rgba(138, 43, 226, 0.4);
        transform: translateY(-1px);
      }

      .sls-chat-content {
        display: block;
      }

      /* ============================================================================
         SECTION 3: LEVEL & STATS DISPLAY
         ============================================================================
         Targets: Level number, rank badge, XP text, shadow power display
         Purpose: Display user level, rank, XP progress, and shadow army power
         ============================================================================ */
      .sls-chat-level {
        margin-bottom: 10px;
        display: flex;
        flex-direction: row;
        width: 100%;
      }

      .sls-chat-shadow-power {
        color: #8a2be2;
        font-size: 12px;
        font-weight: 600;
        margin-left: 12px;
        white-space: nowrap;
        text-shadow: 0 0 4px rgba(138, 43, 226, 0.6);
        display: flex !important;
        align-items: center;
        flex-shrink: 0;
        visibility: visible !important;
        opacity: 1 !important;
      }

      .sls-chat-level-row {
        display: flex !important;
        flex-direction: row !important;
        align-items: center !important;
        gap: 8px;
        flex-wrap: nowrap !important;
        margin-bottom: 0;
        width: 100%;
      }

      .sls-chat-rank {
        font-size: 11px;
        font-weight: 700;
        color: #ba55d3;
        text-shadow: 0 0 5px rgba(138, 43, 226, 0.9);
        padding: 2px 6px;
        background: linear-gradient(135deg, rgba(138, 43, 226, 0.22) 0%, rgba(75, 0, 130, 0.16) 100%);
        border: 1px solid rgba(138, 43, 226, 0.4);
        border-radius: 2px;
        display: inline-flex !important;
        flex-shrink: 0;
        box-shadow: 0 0 8px rgba(138, 43, 226, 0.28), inset 0 1px 0 rgba(255, 255, 255, 0.08);
        white-space: nowrap;
        line-height: 1.2;
        align-items: center;
      }

      .sls-chat-level-number {
        font-size: 13px;
        font-weight: 800;
        color: #d4a5ff;
        text-shadow: 0 0 6px rgba(138, 43, 226, 1), 0 0 12px rgba(138, 43, 226, 0.6);
        letter-spacing: 0.5px;
        white-space: nowrap;
        line-height: 1;
        display: inline-flex !important;
        flex-shrink: 0;
        align-items: center;
      }

      .sls-chat-xp-text {
        font-size: 11px;
        color: #b894e6;
        text-shadow: 0 0 4px rgba(138, 43, 226, 0.6);
        font-weight: 600;
        white-space: nowrap;
        line-height: 1;
        display: inline-flex !important;
        flex-shrink: 0;
        align-items: center;
      }

      /* ============================================================================
         SECTION 4: XP PROGRESS BAR
         ============================================================================
         Targets: Progress bar container, fill, sparkle particles, milestone markers
         Purpose: Visual XP progress indicator with animations and milestone tracking
         ============================================================================ */
      .sls-chat-progress-bar {
        flex: 1;
        min-width: 80px;
        max-width: 200px;
        height: 8px;
        background: rgba(8, 8, 13, 0.92);
        border-radius: 2px;
        overflow: hidden;
        border: none !important;
        box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.5) !important;
        filter: none !important;
        position: relative;
        align-self: center;
        margin: 0;
        display: flex;
        align-items: center;
      }

      .sls-chat-progress-fill {
        height: 100%;
        background: linear-gradient(90deg, #8a2be2 0%, #9370db 50%, #ba55d3 100%);
        transition: width 0.5s cubic-bezier(0.4, 0, 0.2, 1);
        position: relative;
        border-radius: 2px;
        /* COMPLETE GLOW REMOVAL - ALL POSSIBLE SOURCES */
        box-shadow: none !important;
        filter: none !important;
        outline: none !important;
        border: none !important;
        text-shadow: none !important;
        drop-shadow: none !important;
        -webkit-box-shadow: none !important;
        -moz-box-shadow: none !important;
        -webkit-filter: none !important;
        -moz-filter: none !important;
        backdrop-filter: none !important;
        -webkit-backdrop-filter: none !important;
      }

      /* Force remove glow from ALL states and pseudo-elements */
      .sls-chat-progress-fill *,
      .sls-chat-progress-fill::before,
      .sls-chat-progress-fill::after,
      .sls-chat-progress-fill:hover,
      .sls-chat-progress-fill:active,
      .sls-chat-progress-fill:focus {
        box-shadow: none !important;
        filter: none !important;
        text-shadow: none !important;
        outline: none !important;
        border: none !important;
      }

      /* Purple glow shimmer completely disabled */
      .sls-chat-progress-fill::after {
        display: none !important;
        content: none !important;
        background: none !important;
        animation: none !important;
      }

      /* Purple glow overlay completely disabled */
      .sls-chat-progress-fill::before {
        display: none !important;
        content: none !important;
        background: none !important;
        animation: none !important;
      }

      /* Sparkle particles */
      .sls-chat-progress-bar .sls-progress-sparkle {
        position: absolute;
        width: 4px;
        height: 4px;
        background: rgba(138, 43, 226, 0.9);
        border-radius: 50%;
        pointer-events: none;
        animation: sparkle-float 2s infinite;
        box-shadow: 0 0 6px rgba(138, 43, 226, 0.8);
      }

      /* Progress bar milestone markers - visual indicators for level milestones */
      .sls-chat-progress-bar .sls-milestone-marker {
        position: absolute;
        top: -8px;
        width: 2px;
        height: 22px;
        background: rgba(138, 43, 226, 0.5);
        pointer-events: none;
        z-index: 1;
      }

      .sls-chat-progress-bar .sls-milestone-marker::after {
        content: '';
        position: absolute;
        top: -4px;
        left: -3px;
        width: 8px;
        height: 8px;
        background: rgba(138, 43, 226, 0.8);
        border-radius: 50%;
        box-shadow: 0 0 6px rgba(138, 43, 226, 0.6);
      }

      /* ============================================================================
         SECTION 9: ANIMATIONS & KEYFRAMES
         ============================================================================
         Targets: All animated elements (progress bar, quest celebrations, particles)
         Purpose: Define animation keyframes for visual effects throughout the UI
         ============================================================================ */
      @keyframes sparkle-float {
        0% {
          opacity: 0;
          transform: translateY(0) scale(0);
        }
        50% {
          opacity: 1;
          transform: translateY(-10px) scale(1);
        }
        100% {
          opacity: 0;
          transform: translateY(-20px) scale(0);
        }
      }

      /* Level up overlay animation (non-toast) */
      .sls-levelup-overlay {
        position: fixed;
        left: 0;
        right: 0;
        top: 0;
        pointer-events: none;
        z-index: 999998;
      }

      .sls-levelup-banner {
        position: absolute;
        left: 50%;
        top: 54px;
        transform: translateX(-50%);
        padding: 10px 16px;
        border-radius: 2px;
        background: rgba(10, 10, 16, 0.92);
        border: 1px solid rgba(138, 43, 226, 0.55);
        color: #dcddde;
        font-weight: 800;
        letter-spacing: 0.08em;
        text-transform: uppercase;
        box-shadow: 0 10px 30px rgba(138, 43, 226, 0.25);
        text-shadow: 0 0 10px rgba(138, 43, 226, 0.6);
        animation: sls-levelup-pop 1200ms ease-out forwards;
        will-change: transform, opacity;
        text-align: center;
        min-width: 220px;
      }

      .sls-levelup-title {
        font-size: 14px;
        line-height: 1.2;
      }

      .sls-levelup-subtitle {
        margin-top: 6px;
        padding-top: 4px;
        font-size: 12px;
        font-weight: 700;
        opacity: 0.92;
        letter-spacing: 0.02em;
        text-transform: none;
      }

      @keyframes sls-levelup-pop {
        0% {
          opacity: 0;
          transform: translateX(-50%) translateY(0) scale(0.75);
        }
        15% {
          opacity: 1;
          transform: translateX(-50%) translateY(0) scale(1.05);
        }
        100% {
          opacity: 0;
          transform: translateX(-50%) translateY(-14px) scale(1);
        }
      }

      @media (prefers-reduced-motion: reduce) {
        .sls-levelup-banner {
          animation: none !important;
          opacity: 1 !important;
        }
      }

      /* ============================================================================
         SECTION 5: QUEST SYSTEM UI
         ============================================================================
         Targets: Quest celebration modal, quest progress items, quest notification
         Purpose: Quest completion animations and quest progress tracking UI
         ============================================================================ */
      /* Quest celebration styles */
      /*
       * ANIMATION TYPES AVAILABLE (change animation property to switch):
       *
       * 1. FADE (default): quest-celebration-fade-in + quest-celebration-visible + quest-celebration-fade-out
       *    - Fast fade-in (0.2s), smooth visible (2.1s), fast fade-out (0.2s)
       *
       * 2. SLIDE: quest-celebration-slide-in (slides from top)
       *
       * 3. ZOOM: quest-celebration-zoom-in (zooms from center)
       *
       * 4. BOUNCE: quest-celebration-bounce (bouncy entrance)
       *
       * 5. ROTATE: quest-celebration-rotate-in (rotates while fading)
       *
       * 6. ELASTIC: quest-celebration-elastic (elastic spring effect)
       *
       * To use alternative animations, replace the animation property with:
       *   animation: [animation-name] 0.2s ease-out,
       *              quest-celebration-visible 2.1s ease-out 0.2s,
       *              quest-celebration-fade-out 0.2s ease-out 2.3s;
       */
      .sls-quest-celebration {
        position: fixed;
        z-index: 100000;
        pointer-events: auto; /* Allow clicking to close */
        cursor: pointer; /* Show it's clickable */
        /* Fast fade-in: 0-200ms, visible: 200ms-2300ms, fast fade-out: 2300ms-2500ms */
        animation: quest-celebration-fade-in 0.2s ease-out,
                   quest-celebration-visible 2.1s ease-out 0.2s,
                   quest-celebration-fade-out 0.2s ease-out 2.3s;
        opacity: 0; /* Start hidden, animation will make it visible */
      }

      /* Alternative animation classes (add to celebration element to use) */
      .sls-quest-celebration.slide {
        animation: quest-celebration-slide-in 0.2s ease-out,
                   quest-celebration-visible 2.1s ease-out 0.2s,
                   quest-celebration-fade-out 0.2s ease-out 2.3s;
      }

      .sls-quest-celebration.zoom {
        animation: quest-celebration-zoom-in 0.2s ease-out forwards;
      }

      .sls-quest-celebration.bounce {
        animation: quest-celebration-bounce 0.4s ease-out,
                   quest-celebration-visible 1.9s ease-out 0.4s,
                   quest-celebration-fade-out 0.2s ease-out 2.3s;
      }

      .sls-quest-celebration.rotate {
        animation: quest-celebration-rotate-in 0.2s ease-out,
                   quest-celebration-visible 2.1s ease-out 0.2s,
                   quest-celebration-fade-out 0.2s ease-out 2.3s;
      }

      .sls-quest-celebration.elastic {
        animation: quest-celebration-elastic 0.5s ease-out,
                   quest-celebration-visible 1.8s ease-out 0.5s,
                   quest-celebration-fade-out 0.2s ease-out 2.3s;
      }

      .sls-quest-celebration-content {
        background: linear-gradient(135deg, rgba(5, 5, 10, 0.98) 0%, rgba(10, 5, 15, 0.98) 100%);
        border: 1px solid rgba(138, 43, 226, 0.3);
        border-radius: 2px;
        padding: 24px 32px;
        text-align: left;
        box-shadow: 0 0 20px rgba(138, 43, 226, 0.2),
                    0 0 40px rgba(75, 0, 130, 0.15),
                    inset 0 0 30px rgba(138, 43, 226, 0.1);
        backdrop-filter: blur(8px);
        min-width: 400px;
        max-width: 500px;
      }

      .sls-quest-notification-header {
        margin-bottom: 16px;
        padding-bottom: 12px;
        border-bottom: 1px solid rgba(138, 43, 226, 0.2);
      }

      .sls-quest-notification-title {
        font-size: 18px;
        font-weight: 700;
        color: rgba(138, 43, 226, 0.9);
        text-shadow: 0 0 8px rgba(138, 43, 226, 0.4);
        margin-bottom: 6px;
        letter-spacing: 0.5px;
      }

      .sls-quest-notification-subtitle {
        font-size: 14px;
        color: rgba(200, 180, 255, 0.8);
        font-weight: 600;
      }

      .sls-quest-completed-name {
        font-size: 16px;
        color: rgba(255, 255, 255, 0.95);
        font-weight: 600;
        margin-bottom: 20px;
        padding: 10px;
        background: rgba(138, 43, 226, 0.1);
        border-left: 3px solid rgba(138, 43, 226, 0.5);
        border-radius: 2px;
      }

      .sls-quest-current-progress {
        margin-top: 20px;
      }

      .sls-quest-progress-title {
        font-size: 14px;
        font-weight: 700;
        color: rgba(138, 43, 226, 0.8);
        margin-bottom: 12px;
        text-transform: uppercase;
        letter-spacing: 1px;
      }

      .sls-quest-progress-list {
        display: flex;
        flex-direction: column;
        gap: 10px;
      }

      .sls-quest-progress-item {
        display: flex;
        align-items: center;
        gap: 12px;
        padding: 8px;
        background: rgba(10, 5, 15, 0.6);
        border-radius: 2px;
        border: 1px solid rgba(138, 43, 226, 0.15);
        transition: all 0.2s ease;
      }

      .sls-quest-progress-item.completed {
        background: rgba(138, 43, 226, 0.1);
        border-color: rgba(138, 43, 226, 0.3);
      }

      .sls-quest-progress-checkbox {
        width: 20px;
        height: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 14px;
        color: rgba(138, 43, 226, 0.6);
        flex-shrink: 0;
      }

      .sls-quest-progress-item.completed .sls-quest-progress-checkbox {
        color: rgba(138, 43, 226, 0.9);
        text-shadow: 0 0 6px rgba(138, 43, 226, 0.6);
      }

      .sls-quest-progress-info {
        flex: 1;
        min-width: 0;
      }

      .sls-quest-progress-name {
        font-size: 12px;
        color: rgba(255, 255, 255, 0.85);
        font-weight: 600;
        margin-bottom: 6px;
      }

      .sls-quest-progress-item.completed .sls-quest-progress-name {
        color: rgba(200, 180, 255, 0.9);
      }

      .sls-quest-progress-bar-container {
        display: flex;
        align-items: center;
        gap: 8px;
      }

      .sls-quest-progress-bar {
        flex: 1;
        height: 6px;
        background: rgba(20, 10, 30, 0.8);
        border-radius: 2px;
        overflow: hidden;
        border: 1px solid rgba(138, 43, 226, 0.2);
      }

      .sls-quest-progress-fill {
        height: 100%;
        background: linear-gradient(90deg, rgba(138, 43, 226, 0.6) 0%, rgba(138, 43, 226, 0.4) 100%);
        transition: width 0.3s ease;
        border-radius: 2px;
      }

      .sls-quest-progress-item.completed .sls-quest-progress-fill {
        background: linear-gradient(90deg, rgba(138, 43, 226, 0.8) 0%, rgba(138, 43, 226, 0.6) 100%);
      }

      .sls-quest-progress-text {
        font-size: 11px;
        color: rgba(200, 180, 255, 0.7);
        font-weight: 600;
        min-width: 50px;
        text-align: right;
      }

      .sls-quest-confirm-button-container {
        display: flex;
        justify-content: center;
        margin-top: 24px;
        padding-top: 20px;
        border-top: 1px solid rgba(138, 43, 226, 0.2);
      }

      .sls-quest-confirm-button {
        background: linear-gradient(135deg, rgba(138, 43, 226, 0.3) 0%, rgba(75, 0, 130, 0.3) 100%);
        border: 1px solid rgba(138, 43, 226, 0.5);
        border-radius: 2px;
        padding: 12px 32px;
        color: rgba(200, 180, 255, 0.95);
        font-size: 14px;
        font-weight: 700;
        cursor: pointer;
        transition: all 0.2s ease;
        text-transform: uppercase;
        letter-spacing: 1px;
        text-shadow: 0 0 6px rgba(138, 43, 226, 0.6);
        box-shadow: 0 0 12px rgba(138, 43, 226, 0.3);
      }

      .sls-quest-confirm-button:hover {
        background: linear-gradient(135deg, rgba(138, 43, 226, 0.4) 0%, rgba(75, 0, 130, 0.4) 100%);
        border-color: rgba(138, 43, 226, 0.7);
        color: rgba(255, 255, 255, 1);
        box-shadow: 0 0 20px rgba(138, 43, 226, 0.5);
        transform: translateY(-2px);
      }

      .sls-quest-confirm-button:active {
        transform: translateY(0);
        box-shadow: 0 0 8px rgba(138, 43, 226, 0.4);
      }

      .sls-quest-celebration-icon {
        font-size: 64px;
        animation: quest-icon-bounce 0.6s ease-out;
        margin-bottom: 10px;
      }

      .sls-quest-celebration-text {
        font-size: 20px;
        color: #ffffff;
        text-shadow: 0 0 10px rgba(255, 255, 255, 0.8),
                     0 0 20px rgba(138, 43, 226, 0.8);
        margin-bottom: 10px;
        animation: quest-text-glow 1s ease-in-out infinite;
      }

      .sls-quest-celebration-name {
        font-size: 18px;
        color: rgba(255, 255, 255, 0.9);
        font-weight: bold;
        margin-bottom: 15px;
      }

      .sls-quest-celebration-rewards {
        display: flex;
        flex-direction: column;
        gap: 8px;
        margin-top: 15px;
      }

      .sls-quest-reward-item {
        font-size: 16px;
        color: #00ff88;
        font-weight: bold;
        text-shadow: 0 0 8px rgba(0, 255, 136, 0.6);
        animation: quest-reward-pop 0.4s ease-out 0.2s both;
      }

      .sls-quest-particle {
        position: absolute;
        width: 6px;
        height: 6px;
        border-radius: 50%;
        pointer-events: none;
        animation: quest-particle-burst 2s ease-out forwards;
      }

      .sls-quest-celebrating {
        animation: quest-card-pulse 0.5s ease-out;
        box-shadow: 0 0 20px rgba(138, 43, 226, 0.8) !important;
      }

      /* Fast fade-in animation (0-200ms) */
      @keyframes quest-celebration-fade-in {
        0% {
          opacity: 0;
          transform: translate(-50%, -50%) scale(0.8);
        }
        100% {
          opacity: 1;
          transform: translate(-50%, -50%) scale(1);
        }
      }

      /* Visible state (200ms-2300ms) - subtle scale bounce for engagement */
      @keyframes quest-celebration-visible {
        0%, 100% {
          opacity: 1;
          transform: translate(-50%, -50%) scale(1);
        }
        50% {
          transform: translate(-50%, -50%) scale(1.02);
        }
      }

      /* Fast fade-out animation (2300ms-2500ms) */
      @keyframes quest-celebration-fade-out {
        0% {
          opacity: 1;
          transform: translate(-50%, -50%) scale(1);
        }
        100% {
          opacity: 0;
          transform: translate(-50%, -50%) scale(0.95);
        }
      }

      /* Alternative animation: Slide from top */
      @keyframes quest-celebration-slide-in {
        0% {
          opacity: 0;
          transform: translate(-50%, -60%) scale(0.9);
        }
        100% {
          opacity: 1;
          transform: translate(-50%, -50%) scale(1);
        }
      }

      /* Alternative animation: Zoom in */
      @keyframes quest-celebration-zoom-in {
        0% {
          opacity: 0;
          transform: translate(-50%, -50%) scale(0.5);
        }
        100% {
          opacity: 1;
          transform: translate(-50%, -50%) scale(1);
        }
      }

      /* Alternative animation: Bounce */
      @keyframes quest-celebration-bounce {
        0% {
          opacity: 0;
          transform: translate(-50%, -50%) scale(0.3);
        }
        50% {
          opacity: 1;
          transform: translate(-50%, -50%) scale(1.15);
        }
        70% {
          transform: translate(-50%, -50%) scale(0.95);
        }
        100% {
          opacity: 1;
          transform: translate(-50%, -50%) scale(1);
        }
      }

      /* Alternative animation: Rotate + fade */
      @keyframes quest-celebration-rotate-in {
        0% {
          opacity: 0;
          transform: translate(-50%, -50%) scale(0.8) rotate(-10deg);
        }
        100% {
          opacity: 1;
          transform: translate(-50%, -50%) scale(1) rotate(0deg);
        }
      }

      /* Alternative animation: Elastic */
      @keyframes quest-celebration-elastic {
        0% {
          opacity: 0;
          transform: translate(-50%, -50%) scale(0.3);
        }
        50% {
          opacity: 1;
          transform: translate(-50%, -50%) scale(1.2);
        }
        75% {
          transform: translate(-50%, -50%) scale(0.9);
        }
        100% {
          opacity: 1;
          transform: translate(-50%, -50%) scale(1);
        }
      }

      @keyframes quest-icon-bounce {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(-20px); }
      }

      @keyframes quest-text-glow {
        0%, 100% {
          text-shadow: 0 0 10px rgba(255, 255, 255, 0.8),
                       0 0 20px rgba(138, 43, 226, 0.8);
        }
        50% {
          text-shadow: 0 0 20px rgba(255, 255, 255, 1),
                       0 0 40px rgba(138, 43, 226, 1);
        }
      }

      @keyframes quest-reward-pop {
        0% {
          opacity: 0;
          transform: scale(0);
        }
        100% {
          opacity: 1;
          transform: scale(1);
        }
      }

      @keyframes quest-particle-burst {
        0% {
          opacity: 1;
          transform: translate(0, 0) scale(1);
        }
        100% {
          opacity: 0;
          transform: translate(var(--particle-x, 0), var(--particle-y, 0)) scale(0);
        }
      }

      @keyframes quest-card-pulse {
        0%, 100% {
          transform: scale(1);
        }
        50% {
          transform: scale(1.05);
        }
      }

      .sls-chat-stats {
        display: flex;
        gap: 6px;
        flex-wrap: wrap;
        margin-bottom: 10px;
      }

      .sls-chat-stat-item {
        position: relative;
        background: linear-gradient(135deg, rgba(138, 43, 226, 0.12) 0%, rgba(75, 0, 130, 0.08) 100%);
        border: 1px solid rgba(138, 43, 226, 0.3);
        border-radius: 2px;
        padding: 5px 9px;
        cursor: pointer;
        transition: all 0.2s ease;
        display: flex;
        gap: 5px;
        align-items: center;
        backdrop-filter: blur(4px);
        box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.05);
      }

      .sls-chat-stat-item:hover {
        background: linear-gradient(135deg, rgba(138, 43, 226, 0.24) 0%, rgba(75, 0, 130, 0.16) 100%);
        border-color: rgba(138, 43, 226, 0.55);
        box-shadow: 0 4px 14px rgba(138, 43, 226, 0.35), inset 0 1px 0 rgba(255, 255, 255, 0.08);
        transform: translateY(-1px);
      }

      .sls-chat-stat-name {
        color: #d4a5ff;
        font-weight: 700;
        font-size: 11px;
        text-shadow: 0 0 4px rgba(138, 43, 226, 0.6);
      }

      .sls-chat-stat-value {
        color: #ba55d3;
        font-weight: 700;
        font-size: 12px;
        text-shadow: 0 0 3px rgba(138, 43, 226, 0.7);
      }

      .sls-chat-stat-points {
        background: linear-gradient(135deg, rgba(138, 43, 226, 0.24) 0%, rgba(75, 0, 130, 0.16) 100%);
        border: 1px solid rgba(138, 43, 226, 0.38);
        border-radius: 2px;
        padding: 6px 10px;
        color: #d4a5ff;
        font-weight: 700;
        font-size: 11px;
        text-align: center;
        text-shadow: 0 0 3px rgba(138, 43, 226, 0.8);
        box-shadow: 0 0 12px rgba(138, 43, 226, 0.22), inset 0 1px 0 rgba(255, 255, 255, 0.06);
        margin-bottom: 8px;
      }

      .sls-chat-stat-allocation {
        margin-top: 12px;
        margin-bottom: 12px;
      }

      .sls-chat-stat-buttons {
        display: flex;
        gap: 6px;
        flex-wrap: wrap;
        justify-content: center;
        margin-top: 8px;
      }

      .sls-chat-stat-btn {
        position: relative;
        background: linear-gradient(135deg, rgba(138, 43, 226, 0.15) 0%, rgba(75, 0, 130, 0.1) 100%);
        border: 1px solid rgba(138, 43, 226, 0.28);
        border-radius: 2px;
        padding: 8px 12px;
        min-width: 50px;
        cursor: pointer;
        transition: all 0.2s ease;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 2px;
        box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.05);
      }

      .sls-chat-stat-btn:hover:not(:disabled) {
        background: linear-gradient(135deg, rgba(138, 43, 226, 0.32) 0%, rgba(75, 0, 130, 0.21) 100%);
        border-color: rgba(138, 43, 226, 0.55);
        box-shadow: 0 5px 16px rgba(138, 43, 226, 0.35), inset 0 1px 0 rgba(255, 255, 255, 0.08);
        transform: translateY(-2px);
      }

      .sls-chat-stat-btn:active:not(:disabled) {
        transform: translateY(0);
      }

      .sls-chat-stat-btn:disabled {
        opacity: 0.5;
        cursor: not-allowed;
      }

      .sls-chat-stat-btn-available {
        border-color: rgba(138, 43, 226, 0.5);
        box-shadow: 0 0 4px rgba(138, 43, 226, 0.3);
      }

      .sls-chat-stat-btn-maxed {
        background: linear-gradient(135deg, rgba(138, 43, 226, 0.25) 0%, rgba(75, 0, 130, 0.15) 100%);
        border-color: rgba(138, 43, 226, 0.7);
        box-shadow: 0 0 4px rgba(138, 43, 226, 0.4);
      }

      .sls-chat-stat-btn-name {
        color: #b894e6;
        font-size: 10px;
        font-weight: 600;
        text-transform: uppercase;
        text-shadow: 0 0 4px rgba(138, 43, 226, 0.5);
      }

      .sls-chat-stat-btn-value {
        color: #d4a5ff;
        font-size: 14px;
        font-weight: 700;
        text-shadow: 0 0 3px rgba(138, 43, 226, 0.7);
      }

      .sls-chat-stat-btn-plus {
        position: absolute;
        top: 2px;
        right: 4px;
        color: #22c55e;
        font-size: 12px;
        font-weight: 700;
        text-shadow: 0 0 4px rgba(34, 197, 94, 0.8);
      }

      .sls-chat-total-xp {
        font-size: 10px;
        color: #dcddde;
        text-shadow: 0 0 4px rgba(138, 43, 226, 0.4);
        font-weight: 600;
        white-space: nowrap;
        display: inline-flex !important;
        flex-shrink: 0;
        line-height: 1;
        align-items: center;
      }

      /* ============================================================================
         SECTION 7: TITLE & ACHIEVEMENTS DISPLAY
         ============================================================================
         Targets: Title display, title labels, achievement items, achievement list
         Purpose: Display user titles and achievement progress
         ============================================================================ */
      .sls-chat-title-display {
        background: rgba(138, 43, 226, 0.15);
        border: 1px solid rgba(138, 43, 226, 0.3);
        border-radius: 2px;
        padding: 6px 10px;
        margin-bottom: 8px;
        display: flex;
        align-items: center;
        gap: 8px;
        flex-wrap: wrap;
      }

      .sls-chat-title-label {
        color: #b894e6;
        font-size: 11px;
        font-weight: 600;
      }

      .sls-chat-title-name {
        color: #d4a5ff;
        font-weight: 700;
        font-size: 12px;
        text-shadow: 0 0 3px rgba(138, 43, 226, 0.7);
      }

      .sls-chat-title-bonus {
        color: #ba55d3;
        font-size: 10px;
        font-weight: 600;
        text-shadow: 0 0 4px rgba(138, 43, 226, 0.6);
      }

      /* ============================================================================
         SECTION 8: UTILITY COMPONENTS
         ============================================================================
         Targets: Section toggles, activity grid, quest items in chat panel
         Purpose: Reusable UI components for collapsible sections and activity display
         ============================================================================ */
      .sls-chat-section-toggle {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 8px 10px;
        margin: 8px 0 4px 0;
        background: rgba(138, 43, 226, 0.1);
        border: 1px solid rgba(138, 43, 226, 0.3);
        border-radius: 2px;
        cursor: pointer;
        transition: all 0.2s;
      }

      .sls-chat-section-toggle:hover {
        background: rgba(138, 43, 226, 0.2);
        border-color: rgba(138, 43, 226, 0.5);
      }

      .sls-chat-section-title {
        color: #d4a5ff;
        font-weight: 700;
        font-size: 12px;
        text-shadow: 0 0 3px rgba(138, 43, 226, 0.6);
      }

      .sls-chat-section-arrow {
        color: #b894e6;
        font-size: 10px;
      }

      .sls-chat-section {
        margin-bottom: 8px;
        padding: 8px;
        background: rgba(138, 43, 226, 0.05);
        border-radius: 2px;
      }

      .sls-chat-activity-grid {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 8px;
      }

      .sls-chat-activity-item {
        background: rgba(138, 43, 226, 0.1);
        border: 1px solid rgba(138, 43, 226, 0.2);
        border-radius: 2px;
        padding: 8px;
        text-align: center;
      }

      .sls-chat-activity-label {
        font-size: 10px;
        color: #b894e6;
        margin-bottom: 4px;
        text-shadow: 0 0 4px rgba(138, 43, 226, 0.4);
      }

      .sls-chat-activity-value {
        font-size: 16px;
        font-weight: 700;
        color: #d4a5ff;
        text-shadow: 0 0 4px rgba(138, 43, 226, 0.7);
      }

      .sls-chat-quest-item {
        background: rgba(138, 43, 226, 0.08);
        border: 1px solid rgba(138, 43, 226, 0.2);
        border-left: 3px solid rgba(138, 43, 226, 0.4);
        border-radius: 2px;
        padding: 8px;
        margin-bottom: 6px;
        position: relative;
      }

      .sls-chat-quest-item.sls-chat-quest-complete {
        border-left-color: #00ff88;
        background: rgba(0, 255, 136, 0.1);
      }

      .sls-chat-quest-header {
        display: flex;
        justify-content: space-between;
        margin-bottom: 4px;
      }

      .sls-chat-quest-name {
        color: #d4a5ff;
        font-weight: 600;
        font-size: 11px;
        text-shadow: 0 0 4px rgba(138, 43, 226, 0.6);
      }

      .sls-chat-quest-progress {
        color: #ba55d3;
        font-weight: 600;
        font-size: 11px;
        text-shadow: 0 0 4px rgba(138, 43, 226, 0.6);
      }

      .sls-chat-quest-desc {
        font-size: 10px;
        color: #b894e6;
        margin-bottom: 6px;
        text-shadow: 0 0 3px rgba(138, 43, 226, 0.4);
      }

      .sls-chat-quest-badge {
        position: absolute;
        top: 8px;
        right: 8px;
        color: #00ff88;
        font-weight: 700;
        font-size: 14px;
        text-shadow: 0 0 4px rgba(0, 255, 136, 0.8);
      }

      .sls-chat-achievements-summary {
        padding: 4px 0;
      }

      .sls-chat-achievements-count {
        color: #d4a5ff;
        font-weight: 700;
        font-size: 11px;
        margin-bottom: 8px;
        text-shadow: 0 0 4px rgba(138, 43, 226, 0.6);
      }

      .sls-chat-achievements-list {
        display: flex;
        flex-direction: column;
        gap: 6px;
      }

      .sls-chat-achievement-item {
        display: flex;
        align-items: center;
        gap: 8px;
        padding: 6px;
        background: rgba(138, 43, 226, 0.1);
        border: 1px solid rgba(138, 43, 226, 0.3);
        border-radius: 2px;
      }

      .sls-chat-achievement-icon {
        color: #00ff88;
        font-weight: 700;
        font-size: 12px;
        text-shadow: 0 0 6px rgba(0, 255, 136, 0.7);
      }

      .sls-chat-achievement-name {
        color: #d4a5ff;
        font-weight: 600;
        font-size: 11px;
        text-shadow: 0 0 4px rgba(138, 43, 226, 0.6);
      }

      .sls-chat-achievements-empty {
        color: #b894e6;
        font-size: 10px;
        font-style: italic;
        text-align: center;
        padding: 8px;
      }

      /* When in VC AND the VC chat overlay panel is open, shrink the
         HP/MP/EXP strip so it doesn't extend underneath the chat panel.

         Layout context: #sls-chat-ui mounts at the app-mount level (above
         the main+chat column split), so its parent stays full-viewport-
         width even when Discord's chatLayerWrapper opens to the right.
         Adding right margin equal to the panel's typical width pulls the
         strip's edge back so HP/MP numerics + the EXP bar stay fully
         visible.

         Gates (both must hold), and both are ATTRIBUTES rather than :has():
           body[data-sl-in-voice-chat="true"]
             only in voice / stage channels
           body[data-sl-chat-layer="true"]
             only when the VC chat overlay panel is actually present

         Both attributes come from scoped observers in
         shared/channel-context.js. This file no longer runs
         :has(div[class^="chatLayerWrapper_"]) directly \u2014 that shape puts the
         subject on <body>, forcing a re-test on mutations anywhere in the
         document. The observer watches only the layer container and writes
         only on change.

         Outside VC or with chat panel closed, the strip keeps its full
         width unchanged.

         475px covers Discord's default chatLayerWrapper (~400px) plus
         the right-aligned MP/HP numeric labels' overflow allowance plus
         a small visual breathing buffer. Iterated: 400 clipped numerics,
         460 was tight, 490 left too much gap, 475 is the sweet spot.
         Drag-resize can shift this \u2014 acceptable tradeoff vs JS-driven
         width sync. */
      /* Attribute, not :has(). \`body:has(div[class^="chatLayerWrapper_"])\` is
         the one selector shape whose subject is <body>, so the style engine
         re-tests it on DOM mutations anywhere in the document. The equivalent
         state is published as body[data-sl-chat-layer] by a scoped observer in
         shared/channel-context.js (installed from lifecycle.js start()), which
         watches only the layer container and writes only on change. */
      body[data-sl-in-voice-chat="true"][data-sl-chat-layer="true"] #sls-chat-ui {
        margin-right: 475px !important;
        transition: margin-right 0.2s ease !important;
      }
`;
  }
});

// src/SoloLevelingStats/chat-ui-css.js
var require_chat_ui_css = __commonJS({
  "src/SoloLevelingStats/chat-ui-css.js"(exports2, module2) {
    var C2 = require_constants();
    var stylesText = require_styles();
    module2.exports = {
      _getChatUiCssRawText() {
        return stylesText;
      },
      getChatUiCssSections() {
        var _a;
        const css = this._getChatUiCssRawText();
        const sectionMarker = "/* ============================================================================\n         SECTION ";
        const chunks = css.split(sectionMarker);
        if (chunks.length <= 1) {
          return [{ key: "full", title: "Full CSS", css: css.trim() }];
        }
        const sections = [];
        const preamble = chunks[0].trim();
        if (preamble) {
          sections.push({ key: "preamble", title: "Preamble", css: preamble });
        }
        for (const chunk of chunks.slice(1)) {
          const restored = `${sectionMarker}${chunk}`.trim();
          const titleLine = ((_a = chunk.split("\n", 1)[0]) == null ? void 0 : _a.trim()) || "";
          const match = titleLine.match(/^(\d+):\s*(.+)$/);
          const index = (match == null ? void 0 : match[1]) || "x";
          const title = (match == null ? void 0 : match[2]) || "Untitled";
          const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
          sections.push({ key: `section-${index}-${slug || "part"}`, title: `Section ${index}: ${title}`, css: restored });
        }
        return sections;
      },
      getChatUiCssText() {
        return this.getChatUiCssSections().map((section) => section.css).join("\n\n");
      },
      injectChatUICSS() {
        if (document.getElementById(C2.CHAT_UI_STYLE_ID)) return;
        const style = document.createElement("style");
        style.id = C2.CHAT_UI_STYLE_ID;
        style.textContent = this.getChatUiCssText();
        document.head.appendChild(style);
      }
    };
  }
});

// src/SoloLevelingStats/settings-panel.js
var require_settings_panel = __commonJS({
  "src/SoloLevelingStats/settings-panel.js"(exports2, module2) {
    module2.exports = {
      getSettingsPanel() {
        var _a;
        const container = document.createElement("div");
        container.style.cssText = `
      padding: 20px;
      background: rgba(10, 10, 16, 0.98);
      border-radius: 2px;
      border: 1px solid rgba(138, 43, 226, 0.5);
      color: #ffffff;
      font-family: 'Friend or Foe BB', sans-serif;
    `;
        const title = document.createElement("h2");
        title.textContent = "Solo Leveling Stats - Settings";
        title.style.cssText = `
      color: #8a2be2;
      margin-bottom: 20px;
      font-size: 24px;
      text-shadow: 0 0 10px rgba(138, 43, 226, 0.6);
    `;
        container.appendChild(title);
        const debugToggle = this.createToggle(
          "debugMode",
          "Debug Mode",
          "Show detailed console logs for troubleshooting (constructor, save, load, periodic backups)",
          this.settings.debugMode || false
        );
        container.appendChild(debugToggle);
        const info = document.createElement("div");
        info.style.cssText = `
      margin-top: 20px;
      padding: 15px;
      background: rgba(138, 43, 226, 0.1);
      border-radius: 2px;
      border-left: 3px solid #8a2be2;
    `;
        info.innerHTML = `
      <strong style="color: #8a2be2;">Debug Console Logs:</strong><br>
      <span style="color: #b894e6; font-size: 13px;">
        When enabled, you'll see detailed logs for:<br>
        \u2022 Constructor initialization<br>
        \u2022 Save operations (current, clean, success)<br>
        \u2022 Load operations (raw data, merge, verification)<br>
        \u2022 Periodic backup saves (every 30 seconds)<br>
        \u2022 Shadow XP sharing<br>
        \u2022 Data verification (matches, deep copy status)
      </span>
    `;
        container.appendChild(info);
        const backfillApplied = !!((_a = this.settings) == null ? void 0 : _a._rankBonusBackfillV2Applied);
        const rankBackfillAction = this.createActionButton(
          "recalculateRankBonuses",
          backfillApplied ? "Rank Bonus Backfill Applied" : "Recalculate Rank Bonuses",
          backfillApplied ? "One-time rank-bonus backfill is already applied on this profile." : "Safely applies a one-time retroactive rank-bonus recalculation using the latest exponential curve. A backup snapshot is saved first.",
          backfillApplied
        );
        container.appendChild(rankBackfillAction);
        try {
          const previewHeader = document.createElement("h3");
          previewHeader.textContent = "Chat UI Preview";
          previewHeader.style.cssText = `
        margin-top: 24px;
        margin-bottom: 12px;
        color: #d4a5ff;
        font-size: 16px;
        font-weight: 700;
      `;
          container.appendChild(previewHeader);
          container.appendChild(this.createChatUiPreviewPanel());
        } catch (error) {
          this.debugError("SETTINGS_PANEL_PREVIEW", error);
        }
        this._detachSettingsPanelHandlers();
        this._settingsPanelHandlers = {
          change: (e) => {
            var _a2;
            const target = e == null ? void 0 : e.target;
            if (!target) return;
            const key = (_a2 = target.getAttribute) == null ? void 0 : _a2.call(target, "data-sls-setting");
            if (!key) return;
            const isChecked = !!target.checked;
            const handlers = {
              debugMode: () => this.withAutoSave(() => {
                this.settings.debugMode = isChecked;
                this.debugLog("SETTINGS", "Debug mode", isChecked ? "enabled" : "disabled");
              }, true)
            };
            const fn = handlers[key];
            fn && fn();
          },
          click: (e) => {
            var _a2, _b;
            const actionButton = (_b = (_a2 = e == null ? void 0 : e.target) == null ? void 0 : _a2.closest) == null ? void 0 : _b.call(_a2, "button[data-sls-action]");
            if (!actionButton) return;
            const actionKey = actionButton.getAttribute("data-sls-action");
            if (!actionKey) return;
            const handlers = {
              recalculateRankBonuses: async () => {
                var _a3, _b2;
                if ((_a3 = this.settings) == null ? void 0 : _a3._rankBonusBackfillV2Applied) {
                  this.showNotification("Rank bonus backfill already applied on this profile.", "info", 5e3);
                  actionButton.disabled = true;
                  actionButton.textContent = "Rank Bonus Backfill Applied";
                  return;
                }
                const confirmed = window.confirm(
                  "Apply one-time rank bonus recalculation?\n\nThis will create a backup snapshot first, then apply a one-time stat backfill. It should only be run once per profile."
                );
                if (!confirmed) return;
                const statusNode = (_b2 = container.querySelector) == null ? void 0 : _b2.call(
                  container,
                  `[data-sls-action-status="${actionKey}"]`
                );
                const originalLabel = actionButton.textContent;
                actionButton.disabled = true;
                actionButton.textContent = "Applying Backfill...";
                statusNode && (statusNode.textContent = "Creating backup and applying one-time rank bonus backfill...");
                try {
                  const result = await this.applyRankPromotionBonusBackfill();
                  if (result == null ? void 0 : result.applied) {
                    actionButton.textContent = "Rank Bonus Backfill Applied";
                    statusNode && (statusNode.textContent = `Applied successfully. +${result.perStatDelta} to each stat. Backup: ${result.backupKey}`);
                    this.showNotification(
                      `Rank bonus backfill complete (+${result.perStatDelta} each stat).`,
                      "success",
                      7e3
                    );
                    return;
                  }
                  const reason = (result == null ? void 0 : result.reason) || "unknown";
                  const recoverable = reason === "backup_failed" || reason === "apply_failed" || reason === "unexpected_error";
                  actionButton.disabled = !recoverable;
                  actionButton.textContent = recoverable ? originalLabel : "Rank Bonus Backfill Applied";
                  const failureText = reason === "already_applied" ? "Backfill was already applied previously." : reason === "no_promotions" ? "No rank promotions found for this profile. No changes made." : reason === "no_delta" ? "No bonus delta detected between legacy and current tables. No changes made." : reason === "missing_stats" ? "Stats object missing. No changes made." : `Backfill failed (${reason}). No data loss: restore via backup key ${(result == null ? void 0 : result.backupKey) || "N/A"}.`;
                  statusNode && (statusNode.textContent = failureText);
                  this.showNotification(failureText, recoverable ? "error" : "info", 7e3);
                } catch (error) {
                  actionButton.disabled = false;
                  actionButton.textContent = originalLabel;
                  statusNode && (statusNode.textContent = "Backfill failed unexpectedly. No data loss expected. Check console logs.");
                  this.debugError("SETTINGS_PANEL_ACTION", error, { actionKey });
                  this.showNotification("Backfill failed unexpectedly. Check console logs.", "error", 7e3);
                }
              }
            };
            const fn = handlers[actionKey];
            fn && fn().catch((error) => {
              this.debugError("SETTINGS_PANEL_ACTION", error, { actionKey, phase: "handler_invoke" });
            });
          }
        };
        container.addEventListener("change", this._settingsPanelHandlers.change);
        container.addEventListener("click", this._settingsPanelHandlers.click);
        this._settingsPanelRoot = container;
        return container;
      },
      createToggle(settingKey, label, description, defaultValue) {
        const wrapper = document.createElement("div");
        wrapper.style.cssText = `
      margin-bottom: 20px;
      padding: 15px;
      background: rgba(138, 43, 226, 0.05);
      border-radius: 2px;
      border: 1px solid rgba(138, 43, 226, 0.2);
    `;
        const toggleContainer = document.createElement("div");
        toggleContainer.style.cssText = "display: flex; align-items: center; margin-bottom: 8px;";
        const toggle = document.createElement("input");
        toggle.type = "checkbox";
        toggle.checked = defaultValue;
        toggle.id = `sls-setting-${settingKey}`;
        toggle.setAttribute("data-sls-setting", settingKey);
        toggle.style.cssText = `
      width: 40px;
      height: 20px;
      margin-right: 12px;
      cursor: pointer;
    `;
        const labelEl = document.createElement("label");
        labelEl.textContent = label;
        labelEl.setAttribute("for", toggle.id);
        labelEl.style.cssText = `
      font-size: 16px;
      font-weight: 600;
      color: #ffffff;
      cursor: pointer;
    `;
        const desc = document.createElement("div");
        desc.textContent = description;
        desc.style.cssText = `
      font-size: 13px;
      color: #b894e6;
      line-height: 1.5;
    `;
        toggleContainer.appendChild(toggle);
        toggleContainer.appendChild(labelEl);
        wrapper.appendChild(toggleContainer);
        wrapper.appendChild(desc);
        return wrapper;
      },
      createActionButton(actionKey, label, description, disabled = false) {
        const wrapper = document.createElement("div");
        wrapper.style.cssText = `
      margin-top: 16px;
      margin-bottom: 8px;
      padding: 15px;
      background: rgba(138, 43, 226, 0.05);
      border-radius: 2px;
      border: 1px solid rgba(138, 43, 226, 0.2);
    `;
        const button = document.createElement("button");
        button.type = "button";
        button.textContent = label;
        button.disabled = !!disabled;
        button.setAttribute("data-sls-action", actionKey);
        button.style.cssText = `
      padding: 10px 14px;
      border-radius: 2px;
      border: 1px solid rgba(138, 43, 226, 0.55);
      background: ${disabled ? "rgba(120, 120, 120, 0.35)" : "rgba(138, 43, 226, 0.25)"};
      color: #ffffff;
      font-size: 14px;
      font-weight: 700;
      cursor: ${disabled ? "not-allowed" : "pointer"};
      margin-bottom: 8px;
    `;
        const desc = document.createElement("div");
        desc.textContent = description;
        desc.style.cssText = `
      font-size: 13px;
      color: #b894e6;
      line-height: 1.5;
    `;
        const status = document.createElement("div");
        status.setAttribute("data-sls-action-status", actionKey);
        status.textContent = disabled ? "Already applied for this profile." : "Not applied yet.";
        status.style.cssText = `
      margin-top: 8px;
      font-size: 12px;
      color: #d4a5ff;
      line-height: 1.4;
    `;
        wrapper.appendChild(button);
        wrapper.appendChild(desc);
        wrapper.appendChild(status);
        return wrapper;
      }
    };
  }
});

// src/SoloLevelingStats/diagnostics.js
var require_diagnostics = __commonJS({
  "src/SoloLevelingStats/diagnostics.js"(exports2, module2) {
    module2.exports = {
      debugLog(operation, message, data = null) {
        var _a;
        if (!((_a = this.settings) == null ? void 0 : _a.debugMode)) return;
        const isFrequent = this.debug.frequentOperations.has(operation);
        if (isFrequent && !this.debug.verbose) {
          const now = Date.now();
          const lastLogTime = this.debug.lastLogTimes[operation] || 0;
          if (now - lastLogTime < this.debug.throttleInterval) {
            this.debug.operationCounts[operation] = (this.debug.operationCounts[operation] || 0) + 1;
            return;
          }
          this.debug.lastLogTimes[operation] = now;
        }
        console.warn(`[SoloLevelingStats:${operation}] ${message}`, data || "");
        this.debug.operationCounts[operation] = (this.debug.operationCounts[operation] || 0) + 1;
      },
      debugError(operation, error, context = {}) {
        if (!this.debug) this.debug = {};
        if (typeof this.debug.errorCount !== "number") this.debug.errorCount = 0;
        this.debug.errorCount++;
        let errorMessage = "Unknown error";
        let errorStack = null;
        if (error instanceof Error) {
          errorMessage = error.message || String(error);
          errorStack = error.stack;
        } else if (typeof error === "string") {
          errorMessage = error;
        } else if (error && typeof error === "object") {
          errorMessage = error.message || error.toString() || JSON.stringify(error).substring(0, 200);
          errorStack = error.stack;
        } else {
          errorMessage = String(error);
        }
        this.debug.lastError = {
          operation,
          error: errorMessage,
          stack: errorStack,
          context,
          timestamp: Date.now()
        };
        const timestamp = (/* @__PURE__ */ new Date()).toISOString();
        console.error(`[SoloLevelingStats:ERROR:${operation}]`, errorMessage, {
          stack: errorStack,
          context,
          timestamp
        });
      },
      debugConsole(prefix, message, data = {}) {
        var _a;
        if (((_a = this.settings) == null ? void 0 : _a.debugMode) === true) {
          console.log(`${prefix}`, message, data);
        }
      }
    };
  }
});

// src/SoloLevelingStats/index.js
var _bdLoad = (f) => {
  try {
    const m = { exports: {} };
    new Function("module", "exports", require("fs").readFileSync(require("path").join(BdApi.Plugins.folder, f), "utf8"))(m, m.exports);
    return typeof m.exports === "function" || Object.keys(m.exports).length ? m.exports : null;
  } catch (e) {
    return null;
  }
};
var _slsStartupWarn = (...args) => {
  try {
    if (typeof window !== "undefined" && window.__SLS_DEBUG_STARTUP__) {
      console.warn(...args);
    }
  } catch (_) {
  }
};
var UnifiedSaveManager;
try {
  if (typeof window !== "undefined" && typeof window.UnifiedSaveManager === "function") {
    UnifiedSaveManager = window.UnifiedSaveManager;
  } else {
    UnifiedSaveManager = _bdLoad("UnifiedSaveManager.js") || window.UnifiedSaveManager || null;
    if (UnifiedSaveManager && !window.UnifiedSaveManager) window.UnifiedSaveManager = UnifiedSaveManager;
  }
} catch (error) {
  _slsStartupWarn("[SoloLevelingStats] Failed to load UnifiedSaveManager:", error);
}
var _SLUtils;
_SLUtils = _bdLoad("SoloLevelingUtils.js") || window.SoloLevelingUtils || null;
var _PluginUtils;
try {
  _PluginUtils = _bdLoad("BetterDiscordPluginUtils.js");
} catch (_) {
  _PluginUtils = null;
}
if (_SLUtils && !window.SoloLevelingUtils) window.SoloLevelingUtils = _SLUtils;
var C = require_constants();
var SoloLevelingStats = class SoloLevelingStats2 {
  constructor() {
    this.defaultSettings = {
      enabled: true,
      debugMode: false,
      // Toggle debug console logs
      // Stat definitions
      stats: {
        strength: 0,
        // XP efficiency: +2% per point (diminishing returns after 20)
        agility: 0,
        // Reflexes/Speed: +2% crit chance per point (capped by CriticalHit at 50% effective)
        intelligence: 0,
        // Mana/Magic: long-message XP tiers (3/7/12), diminishing returns after 15
        vitality: 0,
        // HP/Stamina: quest reward scaling and max HP
        perception: 0
        // Sense precision: controls crit burst chance + burst chain ceiling
      },
      perceptionBuffs: [],
      // Legacy field (old random PER buffs), retained for backward compatibility
      unallocatedStatPoints: 0,
      // Level system
      level: 1,
      xp: 0,
      totalXP: 0,
      // Rank system (E, D, C, B, A, S, SS, SSS, SSS+, NH, Monarch, Monarch+, Shadow Monarch)
      rank: "E",
      rankHistory: [],
      ranks: [
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
      ],
      // Activity tracking
      activity: {
        messagesSent: 0,
        charactersTyped: 0,
        channelsVisited: [],
        // Will be converted to Set in loadSettings
        timeActive: 0,
        // in minutes
        lastActiveTime: null,
        // Will be set in start()
        sessionStartTime: null,
        // Will be set in start()
        critsLanded: 0
        // Track critical hits for achievements
      },
      // Daily quests
      dailyQuests: {
        lastResetDate: null,
        // Will be set in start()
        quests: {
          messageMaster: { progress: 0, target: 20, completed: false },
          characterChampion: { progress: 0, target: 1e3, completed: false },
          channelExplorer: { progress: 0, target: 5, completed: false },
          activeAdventurer: { progress: 0, target: 30, completed: false },
          // minutes
          perfectStreak: { progress: 0, target: 10, completed: false }
        }
      },
      // Achievements
      achievements: {
        unlocked: [],
        titles: [],
        activeTitle: null
      },
      // Chat UI panel state (closed by default, user opens manually)
      chatUIPanelExpanded: false,
      // HP/Mana (calculated from stats)
      userHP: null,
      userMaxHP: null,
      userMana: null,
      userMaxMana: null
    };
    this.settings = structuredClone(this.defaultSettings);
    this.debugConsole("[CONSTRUCTOR]", "Settings initialized with deep copy", {
      level: this.settings.level,
      xp: this.settings.xp,
      rank: this.settings.rank,
      settingsAreDefault: this.settings === this.defaultSettings,
      isDeepCopy: JSON.stringify(this.settings) === JSON.stringify(this.defaultSettings)
    });
    this.saveManager = null;
    if (UnifiedSaveManager) {
      this.saveManager = new UnifiedSaveManager("SoloLevelingStats");
    }
    this._UnifiedSaveManager = UnifiedSaveManager || null;
    this._PluginUtils = _PluginUtils || null;
    this._constants = C;
    try {
      const pathModule = require("path");
      const fs = require("fs");
      const appSupport = pathModule.resolve(BdApi.Plugins.folder, "..", "..");
      const backupDir = pathModule.join(appSupport, "discord", "SoloLevelingBackups");
      fs.mkdirSync(backupDir, { recursive: true });
      this.fileBackupPath = pathModule.join(backupDir, "SoloLevelingStats.json");
    } catch (_) {
      this.fileBackupPath = null;
    }
    this._fileBackupCache = null;
    this.messageObserver = null;
    this._msgDispatcher = null;
    this._msgCreateHandler = null;
    this._msgDispatcherPoll = null;
    this.activityTracker = null;
    this.messageInputHandler = null;
    this.processedMessageIds = /* @__PURE__ */ new Set();
    this.recentMessages = /* @__PURE__ */ new Map();
    this._messageAntiAbuse = {
      lastMessageTime: 0,
      fingerprints: /* @__PURE__ */ new Map()
      // Map<fingerprint, { count, lastSeen }>
    };
    this.lastSaveTime = Date.now();
    this.saveInterval = 3e4;
    this._startupLoadComplete = false;
    this._hasRealProgress = false;
    this._startupProgressProbeComplete = false;
    this._sessionToken = 0;
    this.pendingLevelUp = null;
    this.levelUpDebounceTimeout = null;
    this.levelUpDebounceDelay = 500;
    this._levelUpAnimationQueue = [];
    this._levelUpAnimationInFlight = false;
    this._levelUpAnimationTimeouts = /* @__PURE__ */ new Set();
    this.lastMessageId = null;
    this.lastMessageElement = null;
    this.eventListeners = {
      xpChanged: [],
      levelChanged: [],
      rankChanged: [],
      statsChanged: [],
      shadowPowerChanged: []
    };
    this.shadowPowerObserver = null;
    this.userHPBar = null;
    this.userHPBarPositionUpdater = null;
    this.panelWatcher = null;
    this.shadowPowerUpdateTimeout = null;
    this._activityTrackingHandlers = null;
    this._settingsPanelRoot = null;
    this._settingsPanelHandlers = null;
    this._settingsPreviewRoot = null;
    this._statAllocationQueue = [];
    this._statAllocationTimeout = null;
    this._statAllocationDebounceDelay = 1e3;
    this.webpackModules = {
      UserStore: null,
      ChannelStore: null
    };
    this.throttled = {};
    this.debounced = {};
    this._cache = {
      currentLevel: null,
      currentLevelTime: 0,
      currentLevelTTL: 100,
      // 100ms - level changes frequently
      // (Legacy perception buff caches removed — populated + cleared but
      // never read; perception system was redesigned to drive burst size
      // rather than per-stat buffs.)
      timeBonus: null,
      timeBonusTime: 0,
      timeBonusTTL: 6e4,
      // 1 minute - time changes every minute
      activityStreakBonus: null,
      activityStreakBonusTime: 0,
      activityStreakBonusKey: null,
      activityStreakBonusTTL: 36e5,
      // 1 hour - streak changes daily
      milestoneMultiplier: null,
      milestoneMultiplierLevel: null,
      milestoneMultiplierTTL: 100,
      // 100ms - level changes frequently
      skillTreeBonuses: null,
      skillTreeBonusesTime: 0,
      skillTreeBonusesTTL: 2e3,
      // 2s - skill tree changes rarely
      hiddenBlessingBonuses: null,
      hiddenBlessingBonusesTime: 0,
      hiddenBlessingBonusesTTL: 2e3,
      // 2s - hidden blessings track rank and update infrequently
      activeSkillBuffs: null,
      activeSkillBuffsTime: 0,
      activeSkillBuffsTTL: 1e3,
      // 1s - active skills can expire/activate frequently
      activeTitleBonus: null,
      activeTitleBonusTime: 0,
      activeTitleBonusKey: null,
      activeTitleBonusTTL: 1e3,
      // 1s - title changes rarely
      shadowArmyBuffs: null,
      shadowArmyBuffsTime: 0,
      shadowArmyBuffsTTL: 2e3,
      // 2s - shadow buffs update asynchronously
      totalEffectiveStats: null,
      totalEffectiveStatsTime: 0,
      totalEffectiveStatsKey: null,
      totalEffectiveStatsTTL: 500,
      // 500ms - stats change occasionally
      xpRequiredForLevel: /* @__PURE__ */ new Map(),
      // Cache individual level XP requirements
      achievementDefinitions: null,
      // Static definitions - cache permanently
      hpCache: /* @__PURE__ */ new Map(),
      // Cache HP calculations: key = `${vitality}_${rank}`
      manaCache: /* @__PURE__ */ new Map(),
      // Cache Mana calculations: key = intelligence
      criticalHitComboData: null,
      // Cache CriticalHit combo info (short TTL)
      criticalHitComboDataTime: 0,
      criticalHitComboDataTTL: 500,
      // 500ms - reduces repeated reads during message bursts
      lastAppliedCritBurst: null
      // Last validated PER burst used for XP bonus calculation
    };
    this.rankData = {
      colors: {
        E: "#808080",
        D: "#8B4513",
        C: "#4169E1",
        B: "#9370DB",
        A: "#FFD700",
        S: "#FF4500",
        SS: "#FF1493",
        SSS: "#8B00FF",
        "SSS+": "#FF00FF",
        NH: "#00FFFF",
        Monarch: "#FF0000",
        "Monarch+": "#FF69B4",
        "Shadow Monarch": "#000000"
      },
      xpMultipliers: {
        E: 1,
        D: 1.12,
        C: 1.28,
        B: 1.48,
        A: 1.72,
        S: 2.02,
        SS: 2.4,
        SSS: 2.88,
        "SSS+": 3.46,
        NH: 4.18,
        Monarch: 5.1,
        "Monarch+": 6.3,
        "Shadow Monarch": 9
      },
      statPoints: {
        E: 2,
        D: 3,
        C: 4,
        B: 5,
        A: 6,
        S: 8,
        SS: 10,
        SSS: 12,
        "SSS+": 15,
        NH: 20,
        Monarch: 25,
        "Monarch+": 30,
        "Shadow Monarch": 50
      }
    };
    this.STAT_KEYS = [...C.STAT_KEYS];
    this.UNWANTED_TITLES = [
      "Scribe",
      "Wordsmith",
      "Author",
      "Explorer",
      "Wanderer",
      "Apprentice",
      "Message Warrior",
      "Monarch of Beast",
      "Monarch of Beasts"
    ];
    this.UNWANTED_TITLES_SET = new Set(this.UNWANTED_TITLES);
    this.RE_LINKS = /https?:\/\//;
    this.RE_CODE = /```|`/;
    this.RE_EMOJIS = /[\u{1F300}-\u{1F9FF}]/u;
    this.RE_MENTIONS = /<@|@everyone|@here/;
    this.RE_WORDS = /\b\w+\b/g;
    this.RE_PROPER_SENTENCE = /^[A-Z].*[.!?]$/;
    this.RE_NUMBERED_LIST = /^\d+[.)]\s/;
    this.RE_BULLET_LIST = /^[-*]\s/m;
    this.STAT_METADATA = {
      strength: { name: "STR", fullName: "Strength", desc: "+2% XP (DR)", longDesc: "+2% XP per point, diminishing after 20", gain: "Send messages" },
      agility: { name: "AGI", fullName: "Agility", desc: "+2% Crit Chance", longDesc: "+2% critical hit chance per point (effective cap handled by CriticalHit)", gain: "Send messages" },
      intelligence: { name: "INT", fullName: "Intelligence", desc: "Tiered Long Msg XP", longDesc: "3/7/12% long-msg XP tiers with diminishing after 15", gain: "Long messages" },
      vitality: { name: "VIT", fullName: "Vitality", desc: "Quest + HP Scaling", longDesc: "Improves quest rewards and max HP", gain: "Complete quests" },
      perception: { name: "PER", fullName: "Perception", desc: "Crit Burst Control", longDesc: "Increases chance and ceiling for multi-hit crit bursts", gain: "Allocate stat points" }
    };
    this.DEFAULT_SHADOW_BUFFS = { ...C.EMPTY_STAT_BLOCK };
    this._chatUIDirty = false;
    this._chatUIForceUpdate = null;
    this._chatUIForceUpdates = /* @__PURE__ */ new Set();
    this._chatUIUpdateThrottleTimer = null;
    this._shadowBuffsRefreshPromise = null;
    this._shadowBuffsRefreshAt = 0;
    this._headerStatsButton = null;
    this._headerStatsPopup = null;
    this._headerStatsPopupRoot = null;
    this._headerStatsPopupDocClickHandler = null;
    this._headerStatsPopupResizeHandler = null;
    this._headerStatsPopupScrollHandler = null;
    this._headerStatsPopupPositionRaf = null;
    this._headerStatsPopupScrollListenerOptions = { capture: true, passive: true };
    this._channelInfoCacheUrl = null;
    this._channelInfoCache = null;
    this._channelTrackingHooks = null;
    this._xpChangedUnsub = null;
    this.questData = {
      messageMaster: { name: "Message Master", desc: "Send 20 messages", xp: 50, statPoints: 1 },
      characterChampion: { name: "Character Champion", desc: "Type 1,000 characters", xp: 75, statPoints: 0 },
      channelExplorer: { name: "Channel Explorer", desc: "Visit 5 unique channels", xp: 50, statPoints: 1 },
      activeAdventurer: { name: "Active Adventurer", desc: "Be active for 30 minutes", xp: 100, statPoints: 0 },
      perfectStreak: { name: "Perfect Streak", desc: "Send 10 messages", xp: 150, statPoints: 1 }
    };
    this.debug = {
      verbose: false,
      // Set to true for verbose logging (includes frequent operations)
      errorCount: 0,
      lastError: null,
      operationCounts: {},
      // Operations that happen frequently - only log if verbose=true
      frequentOperations: /* @__PURE__ */ new Set([
        "GET_CHANNEL_INFO",
        "TRACK_CHANNEL_VISIT",
        "START_CHANNEL_TRACKING",
        "HANDLE_CHANNEL_CHANGE",
        "MUTATION_OBSERVER",
        "INPUT_DETECTION",
        "PERIODIC_BACKUP",
        "SAVE_DATA"
      ]),
      // Throttle frequent operations (log max once per X ms)
      lastLogTimes: {},
      throttleInterval: 1e4
      // OPTIMIZED: Increased to 10 seconds (was 5) to reduce spam
    };
  }
};
Object.assign(
  SoloLevelingStats.prototype,
  require_performance_cache(),
  require_stat_helpers(),
  require_calculation_bonuses(),
  require_channel_context(),
  require_progression_read_model(),
  require_hp_mana(),
  require_events(),
  require_lifecycle(),
  require_webpack_integration(),
  require_criticalhit_integration(),
  require_migration_compat(),
  require_message_observers(),
  require_xp_processing(),
  require_notifications(),
  require_persistence_backups(),
  require_settings_store(),
  require_activity_tracking(),
  require_rank_progression(),
  require_levelup_overlay(),
  require_stat_allocation(),
  require_quests(),
  require_achievements(),
  require_achievement_definitions(),
  require_shadowarmy_integration(),
  require_equipment_integration(),
  require_chat_ui_core(),
  require_chat_ui_css(),
  require_settings_panel(),
  require_diagnostics()
);
module.exports = SoloLevelingStats;
