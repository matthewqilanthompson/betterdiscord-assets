import STYLES from "./styles.css";
const { shouldType, DEFAULTS: POLICY } = require("./typing-policy");
const { computeGroups } = require("./grouping");
const { sliceCounts } = require("./reveal-plan");
const { authorIdFromAvatarSrc } = require("./author-id");
const { typeOut } = require("./typewriter");
const { createTrackedTimers } = require("../shared/tracked-timers");
const { loadSettings, saveSettings } = require("../shared/settings");

const STYLE_ID = "UndertaleDialogue";
const LIST = 'ol[data-list-id="chat-messages"]';
const ROW = 'li[class*="messageListItem_"]';

const DEFAULTS = {
  typing: true,
  grouping: true,
  msPerChar: 28,   // the rate the companion apps use for Sans and Papyrus
  pauseMs: 180,    // extra dwell on . ! ?
  maxLength: POLICY.maxLength,
  debug: false,
};

/**
 * Two features, one MutationObserver on the message list -- they both want exactly the
 * same event, and the author id that grouping reads is the same one typing needs to know
 * whether a message is yours.
 */
module.exports = class UndertaleDialogue {
  constructor() {
    this._settings = loadSettings("UndertaleDialogue", DEFAULTS);
    this._timers = createTrackedTimers();
    this._observer = null;
    this._list = null;
    this._mountAt = 0;
    this._startedAt = 0;
    this._currentUserId = null;
    this._active = new Map(); // content element -> typewriter handle
    this._onClick = null;
    this._regroupQueued = false;
  }

  _log(...args) {
    if (this._settings.debug) console.log("[UndertaleDialogue]", ...args);
  }

  // ── lifecycle ───────────────────────────────────────────────────────────────

  start() {
    this.stop(); // idempotent -- a fast reload must not leave two observers running

    BdApi.DOM.addStyle(STYLE_ID, STYLES);
    this._startedAt = Date.now();

    try {
      this._currentUserId = BdApi.Webpack.Stores?.UserStore?.getCurrentUser?.()?.id || null;
    } catch (err) {
      // Degrades benignly: without an id nothing is "yours", so your own messages type
      // too. Annoying, not broken -- and far better than failing to start.
      this._currentUserId = null;
      console.warn("[UndertaleDialogue] could not resolve current user; own messages will type:", err);
    }

    this._onClick = (e) => this._completeAt(e.target);
    document.addEventListener("click", this._onClick, true);

    this._observer = new MutationObserver((records) => this._onMutations(records));
    this._observer.observe(document.body, { childList: true, subtree: true });

    this._syncList();
    this._log("started; user:", this._currentUserId, "settings:", this._settings);
  }

  stop() {
    if (this._observer) {
      this._observer.disconnect();
      this._observer = null;
    }
    if (this._onClick) {
      document.removeEventListener("click", this._onClick, true);
      this._onClick = null;
    }
    this._timers.clearAll();

    // Anything mid-reveal is holding blanked text. Restoring is not optional.
    for (const handle of this._active.values()) {
      try { handle.complete(); } catch { /* node already gone */ }
    }
    this._active.clear();

    for (const el of document.querySelectorAll("[data-ut-typing]")) el.removeAttribute("data-ut-typing");
    for (const li of document.querySelectorAll("[data-ut-author]")) {
      li.removeAttribute("data-ut-author");
      li.removeAttribute("data-ut-group-start");
      li.removeAttribute("data-ut-group-end");
    }

    BdApi.DOM.removeStyle(STYLE_ID);
    this._list = null;
  }

  getSettingsPanel() {
    const panel = document.createElement("div");
    panel.style.cssText =
      "padding:12px;background:#000;border:2px solid #fff;color:#fff;font-family:monospace;";

    const toggle = (key, label) => {
      const row = document.createElement("label");
      row.style.cssText = "display:flex;align-items:center;gap:8px;cursor:pointer;margin-bottom:6px;";
      const cb = document.createElement("input");
      cb.type = "checkbox";
      cb.checked = !!this._settings[key];
      cb.addEventListener("change", () => {
        this._settings[key] = cb.checked;
        saveSettings("UndertaleDialogue", this._settings);
        if (key === "grouping") this._regroup();
      });
      row.appendChild(cb);
      row.appendChild(document.createTextNode(label));
      panel.appendChild(row);
    };

    toggle("typing", "* Type messages out as they arrive");
    toggle("grouping", "* One box per speaker, however long the gap");
    toggle("debug", "* Debug — log decisions to console");

    const note = document.createElement("div");
    note.style.cssText = "margin-top:8px;opacity:0.7;font-size:12px;line-height:1.5;";
    note.textContent =
      "* Only messages arriving while you are watching type out. Click a message to finish it early.";
    panel.appendChild(note);

    return panel;
  }

  // ── observer ────────────────────────────────────────────────────────────────

  _onMutations(records) {
    if (this._syncList()) return; // channel switched; the grace window handles the backlog

    let sawRow = false;
    for (const r of records) {
      for (const node of r.addedNodes) {
        if (node.nodeType !== Node.ELEMENT_NODE) continue;
        const row = node.matches?.(ROW) ? node : node.querySelector?.(ROW);
        if (!row || !this._list?.contains(row)) continue;
        sawRow = true;
        if (this._settings.typing) this._maybeType(row);
      }
    }
    if (sawRow && this._settings.grouping) this._queueRegroup();
  }

  /**
   * Discord replaces the whole list element on a channel switch, so "is this a different
   * element than last time" IS the channel-switch signal -- and resetting the mount clock
   * is what stops the backlog from typing itself out.
   * @returns {boolean} true if the list just changed
   */
  _syncList() {
    const list = document.querySelector(LIST);
    if (list === this._list) return false;
    this._list = list;
    this._mountAt = Date.now();
    if (list && this._settings.grouping) this._queueRegroup();
    this._log("list changed; mount clock reset");
    return true;
  }

  // ── typing ──────────────────────────────────────────────────────────────────

  _maybeType(row) {
    const content = row.querySelector('div[id^="message-content-"]');
    if (!content || this._active.has(content)) return;

    const ctx = {
      isOwnMessage: this._currentUserId != null && this._authorOf(row) === this._currentUserId,
      textLength: content.textContent.length,
      reducedMotion: window.matchMedia("(prefers-reduced-motion: reduce)").matches,
      documentHidden: document.hidden,
      msSinceMount: Date.now() - this._mountAt,
      // The row carries no timestamp we can trust cheaply; the mount clock above is the
      // real gate, so page-load is compared against itself here and stays inert.
      messageTimestamp: this._startedAt,
      pageLoadTimestamp: this._startedAt,
    };

    const opts = { mountGraceMs: POLICY.mountGraceMs, maxLength: this._settings.maxLength };
    if (!shouldType(ctx, opts)) {
      this._log("skip", ctx);
      return;
    }

    const handle = typeOut(content, {
      sliceCounts,
      msPerChar: this._settings.msPerChar,
      pauseMs: this._settings.pauseMs,
      setTimeout: (fn, ms) => this._timers.setTimeout(fn, ms),
    });
    if (!handle) return;

    content.setAttribute("data-ut-typing", "");
    this._active.set(content, handle);

    const finish = () => {
      handle.complete();
      content.removeAttribute("data-ut-typing");
      this._active.delete(content);
    };

    // Watchdog. If anything at all goes wrong -- an exception, a re-render, a tab switch
    // at the wrong moment -- the text comes back. Blank text is LOST CONTENT and is a
    // far worse outcome than a missing animation.
    const budget = handle.total * (this._settings.msPerChar + this._settings.pauseMs) + 2000;
    this._timers.setTimeout(finish, budget);
  }

  /** Click anywhere in a message to finish its reveal -- Undertale's own Z-to-skip. */
  _completeAt(target) {
    if (!(target instanceof Element)) return;
    const content = target.closest?.('div[id^="message-content-"][data-ut-typing]');
    if (!content) return;
    const handle = this._active.get(content);
    if (!handle) return;
    handle.complete();
    content.removeAttribute("data-ut-typing");
    this._active.delete(content);
  }

  // ── grouping ────────────────────────────────────────────────────────────────

  _queueRegroup() {
    if (this._regroupQueued) return;
    this._regroupQueued = true;
    this._timers.setTimeout(() => {
      this._regroupQueued = false;
      this._regroup();
    }, 50);
  }

  _regroup() {
    if (!this._list) return;

    const rows = Array.from(this._list.querySelectorAll(ROW));

    if (!this._settings.grouping) {
      for (const li of rows) {
        li.removeAttribute("data-ut-author");
        li.removeAttribute("data-ut-group-start");
        li.removeAttribute("data-ut-group-end");
      }
      return;
    }

    // Only the first row of one of DISCORD's groups renders an avatar, so a row without
    // one belongs to the speaker above it. Discord's groups are already
    // author-homogeneous; this walk only merges ACROSS them.
    let carried = null;
    const model = rows.map((li, i) => {
      const own = this._authorOf(li);
      if (own != null) carried = own;
      else if (i === 0) carried = null;
      return { id: String(i), authorId: own ?? carried };
    });

    const groups = computeGroups(model);
    for (let i = 0; i < rows.length; i++) {
      const li = rows[i];
      if (model[i].authorId) li.setAttribute("data-ut-author", model[i].authorId);
      li.setAttribute("data-ut-group-start", String(groups[i].start));
      li.setAttribute("data-ut-group-end", String(groups[i].end));
    }
    this._log("regrouped", rows.length, "rows");
  }

  _authorOf(row) {
    const img = row.querySelector('img[class*="avatar_"]');
    return img ? authorIdFromAvatarSrc(img.getAttribute("src")) : null;
  }
};
