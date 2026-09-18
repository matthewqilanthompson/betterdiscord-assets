import STYLES from "./styles.css";
const { pixelAvatarUrl } = require("./avatar-url");
const { loadSettings, saveSettings } = require("../shared/settings");

const DEFAULTS = { size: 32, debug: false };
const STYLE_ID = "UndertalePixelAvatars";

/**
 * Why this is a plugin and not a theme rule: `image-rendering: pixelated` only applies
 * when an image is scaled UP. Discord downscales avatars (a 128px asset into a 40px box),
 * so CSS alone changes nothing -- the src has to be rewritten, and a theme cannot touch
 * attributes.
 */
module.exports = class UndertalePixelAvatars {
  constructor() {
    this._settings = loadSettings("UndertalePixelAvatars", DEFAULTS);
    this._observer = null;
    this._rewritten = 0;
  }

  _log(...args) {
    if (this._settings.debug) console.log("[UndertalePixelAvatars]", ...args);
  }

  getSettingsPanel() {
    const panel = document.createElement("div");
    panel.style.cssText =
      "padding:12px;background:#000;border:2px solid #fff;color:#fff;font-family:monospace;";

    const row = document.createElement("label");
    row.style.cssText = "display:flex;align-items:center;gap:8px;";
    row.appendChild(document.createTextNode("* Avatar size "));

    const select = document.createElement("select");
    // 16 is unmistakably pixel art but faces stop being recognisable; 32 keeps people
    // identifiable and still reads pixelated. 64 is the "barely any effect" escape hatch.
    for (const n of [16, 32, 64]) {
      const opt = document.createElement("option");
      opt.value = String(n);
      opt.textContent = `${n}px`;
      if (n === this._settings.size) opt.selected = true;
      select.appendChild(opt);
    }
    select.addEventListener("change", () => {
      this._settings.size = Number(select.value);
      saveSettings("UndertalePixelAvatars", this._settings);
      // Existing images already carry the old size; re-scan so the change is visible now.
      this._scan(document.body);
    });

    row.appendChild(select);
    panel.appendChild(row);

    const note = document.createElement("div");
    note.style.cssText = "margin-top:8px;opacity:0.7;font-size:12px;";
    note.textContent =
      "* Smaller also means less bandwidth — a 32px avatar is ~2.6 KB against ~33 KB at 128px.";
    panel.appendChild(note);

    return panel;
  }

  start() {
    this.stop(); // idempotent: a quick reload must not leave two observers running

    BdApi.DOM.addStyle(STYLE_ID, STYLES);

    this._observer = new MutationObserver((records) => {
      for (const r of records) {
        if (r.type === "attributes" && r.target instanceof HTMLImageElement) {
          this._rewrite(r.target);
          continue;
        }
        for (const node of r.addedNodes) {
          if (node.nodeType === Node.ELEMENT_NODE) this._scan(node);
        }
      }
    });

    this._observer.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ["src"],
    });

    this._scan(document.body);
    this._log("started; rewrote", this._rewritten, "avatars on first scan");
  }

  stop() {
    if (this._observer) {
      this._observer.disconnect();
      this._observer = null;
    }
    BdApi.DOM.removeStyle(STYLE_ID);
    // Deliberately NOT restoring the original srcs: they are still valid URLs pointing at
    // the same image, just smaller. Discord re-renders them at full size on its own.
  }

  _scan(root) {
    if (root instanceof HTMLImageElement) this._rewrite(root);
    const imgs = root.querySelectorAll ? root.querySelectorAll("img") : [];
    for (const img of imgs) this._rewrite(img);
  }

  _rewrite(img) {
    const next = pixelAvatarUrl(img.getAttribute("src"), this._settings.size);
    if (!next) return; // not an avatar, foreign host, or already the right size

    // srcset would let the browser pick a HIGHER resolution and quietly undo all of this.
    if (img.hasAttribute("srcset")) img.removeAttribute("srcset");

    img.setAttribute("src", next);
    img.setAttribute("data-ut-pixel", "");
    this._rewritten++;
  }
};
