/**
 * @name SoloLevelingTitleManager
 * @description Title management system for Solo Leveling Stats - display and equip titles with buffs
 * @version 2.0.0
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
    function getCreateRoot2() {
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
      const createRoot = getCreateRoot2();
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
    module2.exports = { getCreateRoot: getCreateRoot2, renderToContainer };
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

// src/TitleManager/components.js
var require_components = __commonJS({
  "src/TitleManager/components.js"(exports2, module2) {
    function buildTitleComponents2(BdApi2, pluginInstance) {
      const { onKeydown } = require_dom_bus();
      const React = BdApi2.React;
      const ce = React.createElement;
      const SORT_OPTIONS = [
        { value: "xpBonus", label: "XP Gain (Highest)" },
        { value: "critBonus", label: "Crit Chance (Highest)" },
        { value: "strBonus", label: "Strength % (Highest)" },
        { value: "agiBonus", label: "Agility % (Highest)" },
        { value: "intBonus", label: "Intelligence % (Highest)" },
        { value: "vitBonus", label: "Vitality % (Highest)" },
        { value: "perBonus", label: "Perception % (Highest)" }
      ];
      function TitleCard({ title, isActive, bonus, onEquip }) {
        const buffs = pluginInstance.formatTitleBonusLines(bonus);
        return ce(
          "div",
          { className: `tm-title-card ${isActive ? "active" : ""}`.trim() },
          ce("div", { className: "tm-title-icon" }, ""),
          ce("div", { className: "tm-title-name" }, title),
          buffs.length > 0 ? ce("div", { className: "tm-title-bonus" }, buffs.join(", ")) : null,
          isActive ? ce("div", { className: "tm-title-status" }, "Equipped") : ce("button", { className: "tm-equip-btn", onClick: () => onEquip(title) }, "Equip")
        );
      }
      function TitleModal({ onClose }) {
        const [sortBy, setSortBy] = React.useState(pluginInstance.settings.sortBy || "xpBonus");
        const [, forceUpdate] = React.useReducer((x) => x + 1, 0);
        React.useEffect(() => {
          pluginInstance._modalForceUpdate = forceUpdate;
          return () => {
            pluginInstance._modalForceUpdate = null;
          };
        }, [forceUpdate]);
        React.useEffect(() => {
          const handler = (e) => {
            if (e.key === "Escape") {
              e.stopPropagation();
              onClose();
            }
          };
          const unsub = onKeydown(handler, { capture: true });
          return () => unsub();
        }, [onClose]);
        const soloData = pluginInstance.getSoloLevelingData();
        const isTitleAllowed = (t) => !pluginInstance._unwantedTitles.has(t);
        const rawTitles = (soloData == null ? void 0 : soloData.titles) || [];
        const { sorted: titles, bonusMap } = React.useMemo(() => {
          const filtered = rawTitles.filter(isTitleAllowed);
          return pluginInstance.getSortedTitles({ titles: filtered, sortBy });
        }, [rawTitles.length, rawTitles.join(","), sortBy]);
        const activeTitle = (soloData == null ? void 0 : soloData.activeTitle) && isTitleAllowed(soloData.activeTitle) ? soloData.activeTitle : null;
        const _sortSaveTimer = React.useRef(null);
        const handleSortChange = React.useCallback((e) => {
          const val = e.target.value;
          setSortBy(val);
          pluginInstance.settings.sortBy = val;
          if (_sortSaveTimer.current !== null) clearTimeout(_sortSaveTimer.current);
          _sortSaveTimer.current = setTimeout(() => {
            _sortSaveTimer.current = null;
            pluginInstance.saveSettings();
          }, 300);
        }, []);
        const handleEquip = React.useCallback((title) => {
          pluginInstance.equipTitle(title);
        }, []);
        const handleUnequip = React.useCallback(() => {
          pluginInstance.unequipTitle();
        }, []);
        const handleOverlayClick = React.useCallback((e) => {
          var _a;
          if ((_a = e.target.classList) == null ? void 0 : _a.contains("tm-title-modal")) onClose();
        }, [onClose]);
        let activeTitleSection;
        if (activeTitle) {
          const bonus = bonusMap[activeTitle] ?? pluginInstance.getTitleBonus(activeTitle);
          const buffs = pluginInstance.formatTitleBonusLines(bonus);
          activeTitleSection = ce(
            "div",
            { className: "tm-active-title" },
            ce("div", { className: "tm-active-label" }, "Active Title:"),
            ce("div", { className: "tm-active-name" }, activeTitle),
            buffs.length > 0 ? ce("div", { className: "tm-active-bonus" }, buffs.join(", ")) : null,
            ce("button", { className: "tm-unequip-btn", onClick: handleUnequip }, "Unequip")
          );
        } else {
          activeTitleSection = ce(
            "div",
            { className: "tm-no-title" },
            ce("div", { className: "tm-no-title-text" }, "No title equipped")
          );
        }
        let gridContent;
        if (titles.length === 0) {
          gridContent = ce(
            "div",
            { className: "tm-empty-state" },
            ce("div", { className: "tm-empty-icon" }, ""),
            ce("div", { className: "tm-empty-text" }, "No titles unlocked yet"),
            ce("div", { className: "tm-empty-hint" }, "Complete achievements to earn titles")
          );
        } else {
          gridContent = ce(
            "div",
            { className: "tm-titles-grid" },
            titles.map((title) => ce(TitleCard, {
              key: title,
              title,
              isActive: title === activeTitle,
              bonus: bonusMap[title] ?? pluginInstance.getTitleBonus(title),
              onEquip: handleEquip
            }))
          );
        }
        return ce(
          "div",
          { className: "tm-title-modal", onClick: handleOverlayClick },
          ce(
            "div",
            { className: "tm-modal-content" },
            ce(
              "div",
              { className: "tm-modal-header" },
              ce("h2", null, "Titles"),
              ce("button", { className: "tm-close-button", onClick: onClose }, "\xD7")
            ),
            ce(
              "div",
              { className: "tm-filter-bar" },
              ce("label", { className: "tm-filter-label" }, "Sort by:"),
              ce(
                "select",
                { id: "tm-sort-select", className: "tm-sort-dropdown", value: sortBy, onChange: handleSortChange },
                SORT_OPTIONS.map((opt) => ce("option", { key: opt.value, value: opt.value }, opt.label))
              )
            ),
            ce(
              "div",
              { className: "tm-modal-body" },
              activeTitleSection,
              ce(
                "div",
                { className: "tm-titles-section" },
                ce("h3", { className: "tm-section-title" }, `Available Titles (${titles.length})`),
                gridContent
              )
            )
          )
        );
      }
      return { TitleModal, TitleCard };
    }
    module2.exports = {
      buildTitleComponents: buildTitleComponents2
    };
  }
});

// src/shared/escape-html.js
var require_escape_html = __commonJS({
  "src/shared/escape-html.js"(exports2, module2) {
    function escapeHtml(value) {
      return String(value ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");
    }
    module2.exports = { escapeHtml };
  }
});

// src/TitleManager/settings-panel.js
var require_settings_panel = __commonJS({
  "src/TitleManager/settings-panel.js"(exports2, module2) {
    var { escapeHtml } = require_escape_html();
    function buildTitleManagerSettingsPanel2(plugin) {
      plugin.detachTitleManagerSettingsPanelHandlers();
      const panel = document.createElement("div");
      panel.style.cssText = `
      padding: 20px;
      background: rgba(10, 10, 16, 0.98);
      border-radius: 2px;
      border: 2px solid rgba(138, 43, 226, 0.3);
      box-shadow: 0 0 30px rgba(138, 43, 226, 0.2);
    `;
      panel.innerHTML = `
      <div>
        <h3 style="
          color: #8a2be2;
          font-size: 20px;
          font-weight: bold;
          margin-bottom: 20px;
          text-transform: uppercase;
          letter-spacing: 1px;
          text-shadow: 0 0 10px rgba(138, 43, 226, 0.5);
        ">Title Manager Settings</h3>

        <div style="
          margin-bottom: 20px;
          padding: 15px;
          background: rgba(138, 43, 226, 0.1);
          border-radius: 0;
          border-left: 3px solid #8a2be2;
        ">
          <div style="color: #8a2be2; font-weight: bold; margin-bottom: 10px;">Sort Preferences</div>
          <div style="color: rgba(255, 255, 255, 0.7); font-size: 13px;">
            Your default sort filter: <span style="color: #8a2be2; font-weight: bold;">${escapeHtml(plugin.getSortLabel(
        plugin.settings.sortBy || "xpBonus"
      ))}</span>
            <br><br>
            Change the sort filter in the titles modal by using the dropdown at the top.
          </div>
        </div>

        <label style="
          display: flex;
          align-items: center;
          margin-bottom: 15px;
          padding: 12px;
          background: rgba(0, 0, 0, 0.3);
          border-radius: 0;
          cursor: pointer;
          transition: all 0.3s ease;
        ">
          <input type="checkbox" ${plugin.settings.debugMode ? "checked" : ""} data-tm-setting="debugMode" style="
            width: 18px;
            height: 18px;
            cursor: pointer;
          ">
          <span style="margin-left: 10px; color: rgba(255, 255, 255, 0.9); font-weight: 500;">
            Debug Mode (Show console logs)
          </span>
        </label>

        <div style="
          margin-top: 15px;
          padding: 15px;
          background: rgba(138, 43, 226, 0.1);
          border-radius: 0;
          border-left: 3px solid #8a2be2;
        ">
          <div style="color: #8a2be2; font-weight: bold; margin-bottom: 8px;">Debug Information</div>
          <div style="color: rgba(255, 255, 255, 0.7); font-size: 13px; line-height: 1.6;">
            Enable Debug Mode to see detailed console logs for:
            <ul style="margin: 8px 0; padding-left: 20px;">
              <li>Title equip/unequip operations</li>
              <li>Settings load/save operations</li>
              <li>Button creation and retries</li>
              <li>Modal open/close tracking</li>
              <li>Filter and sort operations</li>
            </ul>
          </div>
        </div>
      </div>
    `;
      const onChange = (event) => {
        var _a;
        const target = event.target;
        const key = (_a = target == null ? void 0 : target.getAttribute) == null ? void 0 : _a.call(target, "data-tm-setting");
        if (!key) return;
        const nextValue = target.type === "checkbox" ? target.checked : target.value;
        const handlers = {
          debugMode: (value) => {
            plugin.settings.debugMode = !!value;
            plugin.saveSettings();
            plugin.debugLog("SETTINGS", "Debug mode toggled", { enabled: !!value });
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
    module2.exports = { buildTitleManagerSettingsPanel: buildTitleManagerSettingsPanel2 };
  }
});

// src/TitleManager/styles.js
var require_styles = __commonJS({
  "src/TitleManager/styles.js"(exports2, module2) {
    function getTitleManagerCss2() {
      return `
      /* Main Button - Matching Discord native toolbar buttons (GIF, Stickers, Emoji) */
      .tm-title-button-wrapper {
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 0;
        margin: 0 0 0 4px;
        box-sizing: border-box;
      }
      .tm-title-button {
        background: transparent;
        border: none;
        border-radius: 2px;
        width: 24px;
        height: 24px;
        cursor: pointer;
        color: #b5bac1;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: opacity 0.15s ease, background 0.15s ease, color 0.15s ease;
        margin: 0 2px;
        flex-shrink: 0;
        padding: 0;
        box-sizing: border-box;
        opacity: 0.85;
      }

      .tm-title-button svg {
        width: 20px;
        height: 20px;
        transition: color 0.15s ease;
        display: block;
      }

      .tm-title-button:hover {
        opacity: 1;
        background: rgba(138, 43, 226, 0.15);
      }

      .tm-title-button:active {
        color: var(--interactive-active, #fff);
        background: rgba(138, 43, 226, 0.25);
        border-color: rgba(138, 43, 226, 1);
      }

      .tm-title-modal {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.8);
        backdrop-filter: blur(10px);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
        animation: fadeIn 0.3s ease;
      }

      .tm-modal-content {
        background: rgba(10, 10, 16, 0.97);
        border: 1px solid rgba(138, 43, 226, 0.4);
        border-radius: 2px;
        width: 90%;
        max-width: 800px;
        max-height: 90vh;
        overflow-y: auto;
        box-shadow: 0 0 30px rgba(138, 43, 226, 0.5);
      }

      .tm-modal-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 20px;
        border-bottom: 1px solid rgba(138, 43, 226, 0.3);
      }

      .tm-modal-header h2 {
        margin: 0;
        color: #8a2be2;
        font-family: 'Orbitron', sans-serif;
        font-size: 24px;
      }

      /* Filter Bar Styling */
      .tm-filter-bar {
        display: flex;
        align-items: center;
        gap: 12px;
        padding: 16px 20px;
        background: linear-gradient(135deg, #12091e 0%, #0e0716 100%);
        border-bottom: 1px solid rgba(138, 43, 226, 0.2);
      }

      .tm-filter-label {
        color: #8a2be2;
        font-weight: bold;
        font-size: 14px;
        letter-spacing: 0.5px;
        text-transform: uppercase;
      }

      .tm-sort-dropdown {
        flex: 1;
        padding: 10px 16px;
        background: #0d0d14;
        border: 1px solid rgba(138, 43, 226, 0.5);
        border-radius: 2px;
        color: #e8dcff;
        font-size: 14px;
        font-weight: 500;
        cursor: pointer;
        outline: none;
        transition: all 0.3s ease;
        box-shadow: 0 0 15px rgba(138, 43, 226, 0.2);
        -webkit-appearance: none;
        -moz-appearance: none;
        appearance: none;
        background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%238a2be2' stroke-width='2'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E");
        background-repeat: no-repeat;
        background-position: right 12px center;
        padding-right: 36px;
      }

      .tm-sort-dropdown:hover {
        border-color: rgba(138, 43, 226, 0.8);
        background-color: #1a0e2e;
        box-shadow: 0 0 20px rgba(138, 43, 226, 0.4);
        transform: translateY(-1px);
      }

      .tm-sort-dropdown:focus {
        border-color: #8a2be2;
        box-shadow: 0 0 25px rgba(138, 43, 226, 0.6);
        background-color: #0d0d14;
      }

      .tm-sort-dropdown option {
        background: #0d0d14;
        color: #e8dcff;
        padding: 10px;
        font-size: 14px;
      }

      .tm-sort-dropdown option:checked {
        background: linear-gradient(135deg, #2a1548, #1a0e2e);
        color: #d4b8ff;
      }

      .tm-sort-dropdown option:hover {
        background: #1a0e2e;
      }

      .tm-close-button {
        background: transparent;
        border: none;
        color: #8a2be2;
        font-size: 32px;
        cursor: pointer;
        width: 40px;
        height: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 2px;
        transition: all 0.2s ease;
      }

      .tm-close-button:hover {
        background: rgba(138, 43, 226, 0.2);
    }

      .tm-modal-body {
        padding: 20px;
      }

      .tm-active-title {
        background: rgba(0, 255, 136, 0.1);
        border: 1px solid rgba(0, 255, 136, 0.5);
        border-radius: 2px;
        padding: 20px;
        margin-bottom: 20px;
        text-align: center;
      }

      .tm-active-label {
        color: rgba(0, 255, 136, 0.8);
        font-size: 14px;
        margin-bottom: 8px;
      }

      .tm-active-name {
        color: #00ff88;
        font-size: 24px;
        font-weight: bold;
        font-family: 'Orbitron', sans-serif;
        margin-bottom: 8px;
      }

      .tm-active-bonus {
        color: rgba(0, 255, 136, 0.8);
        font-size: 16px;
        margin-bottom: 15px;
      }

      .tm-unequip-btn {
        padding: 8px 20px;
        background: rgba(255, 68, 68, 0.8);
        border: 1px solid rgba(255, 68, 68, 1);
        border-radius: 2px;
        color: white;
        font-weight: bold;
        cursor: pointer;
        transition: all 0.2s ease;
      }

      .tm-unequip-btn:hover {
        background: rgba(255, 68, 68, 1);
        box-shadow: 0 0 10px rgba(255, 68, 68, 0.6);
      }

      .tm-no-title {
        background: rgba(138, 43, 226, 0.1);
        border: 1px dashed rgba(138, 43, 226, 0.3);
        border-radius: 2px;
        padding: 30px;
        margin-bottom: 20px;
        text-align: center;
      }

      .tm-no-title-text {
        color: rgba(255, 255, 255, 0.6);
        font-size: 16px;
      }

      .tm-titles-section {
        margin-top: 20px;
      }

      .tm-section-title {
        color: #8a2be2;
        font-family: 'Orbitron', sans-serif;
        font-size: 18px;
        margin-bottom: 15px;
        padding-bottom: 10px;
        border-bottom: 1px solid rgba(138, 43, 226, 0.3);
      }

      .tm-empty-state {
        text-align: center;
        padding: 40px;
        color: rgba(255, 255, 255, 0.5);
      }

      .tm-empty-icon {
        font-size: 48px;
        margin-bottom: 15px;
      }

      .tm-empty-text {
        font-size: 18px;
        font-weight: bold;
        margin-bottom: 8px;
      }

      .tm-empty-hint {
        font-size: 14px;
        color: rgba(255, 255, 255, 0.4);
      }

      .tm-titles-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
        gap: 15px;
      }

      .tm-title-card {
        background: rgba(0, 0, 0, 0.6);
        border: 1px solid rgba(138, 43, 226, 0.3);
        border-radius: 2px;
        padding: 20px;
        text-align: center;
        transition: all 0.3s ease;
      }

      .tm-title-card.active {
        border-color: rgba(0, 255, 136, 0.6);
        background: rgba(0, 255, 136, 0.1);
      }

      .tm-title-card:hover:not(.active) {
        border-color: rgba(138, 43, 226, 0.8);
        box-shadow: 0 0 15px rgba(138, 43, 226, 0.4);
        transform: translateY(-2px);
      }

      .tm-title-icon {
        font-size: 32px;
        margin-bottom: 10px;
      }

      .tm-title-name {
        font-weight: bold;
        color: #8a2be2;
        font-size: 16px;
        margin-bottom: 8px;
        font-family: 'Orbitron', sans-serif;
      }

      .tm-title-card.active .tm-title-name {
        color: #00ff88;
      }

      .tm-title-bonus {
        color: rgba(0, 255, 136, 0.8);
        font-size: 14px;
        margin-bottom: 12px;
      }

      .tm-title-status {
        color: #00ff88;
        font-size: 12px;
        font-weight: bold;
        padding: 6px 12px;
        background: rgba(0, 255, 136, 0.2);
        border-radius: 2px;
        display: inline-block;
      }

      .tm-equip-btn {
        width: 100%;
        padding: 8px;
        background: linear-gradient(135deg, #8a2be2 0%, #8a2be2 100%);
        border: 1px solid rgba(138, 43, 226, 0.8);
        border-radius: 2px;
        color: white;
        font-weight: bold;
        cursor: pointer;
        transition: all 0.2s ease;
        box-shadow: 0 0 8px rgba(138, 43, 226, 0.4);
      }

      .tm-equip-btn:hover {
        background: linear-gradient(135deg, #8a2be2 0%, #4b0082 100%);
        border-color: rgba(138, 43, 226, 1);
        box-shadow: 0 0 15px rgba(138, 43, 226, 0.8);
        transform: translateY(-1px);
      }

      /* Shadow-theme harmonization (scoped to TitleManager classes only) */
      .tm-title-modal {
        --tm-primary-rgb: var(--sl-color-primary-rgb, 138, 43, 226);
        --tm-primary: rgb(var(--tm-primary-rgb));
        --tm-surface: rgba(8, 10, 20, 0.96);
        --tm-surface-soft: rgba(12, 15, 30, 0.92);
        --tm-text: rgba(236, 233, 255, 0.94);
        --tm-text-muted: rgba(236, 233, 255, 0.68);
        --tm-active-rgb: 0, 255, 136;
      }

      .tm-title-button {
        border-color: rgba(var(--sl-color-primary-rgb, 138, 43, 226), 0.9);
      }

      .tm-title-button:hover {
        background: rgba(var(--sl-color-primary-rgb, 138, 43, 226), 0.14);
        border-color: rgba(var(--sl-color-primary-rgb, 138, 43, 226), 1);
      }

      .tm-modal-content {
        background: linear-gradient(145deg, var(--tm-surface) 0%, var(--tm-surface-soft) 100%);
        border-color: rgba(var(--tm-primary-rgb), 0.45);
        box-shadow: 0 18px 45px rgba(0, 0, 0, 0.55), 0 0 28px rgba(var(--tm-primary-rgb), 0.24);
      }

      .tm-modal-header,
      .tm-filter-bar,
      .tm-no-title,
      .tm-title-card,
      .tm-sort-dropdown {
        border-color: rgba(var(--tm-primary-rgb), 0.35);
      }

      .tm-modal-header h2,
      .tm-section-title,
      .tm-title-name,
      .tm-close-button,
      .tm-filter-label {
        color: var(--tm-primary);
      }

      .tm-sort-dropdown,
      .tm-sort-dropdown option,
      .tm-title-bonus,
      .tm-empty-state,
      .tm-no-title-text {
        color: var(--tm-text);
      }

      .tm-title-card.active,
      .tm-active-title {
        border-color: rgba(var(--tm-active-rgb), 0.52);
        background: rgba(var(--tm-active-rgb), 0.1);
      }

      .tm-title-card.active .tm-title-name,
      .tm-title-status,
      .tm-active-name,
      .tm-active-bonus,
      .tm-active-label {
        color: rgba(var(--tm-active-rgb), 0.96);
      }
    `;
    }
    module2.exports = {
      getTitleManagerCss: getTitleManagerCss2
    };
  }
});

// src/TitleManager/index.js
var { loadBdModuleFromPlugins } = require_bd_module_loader();
var { createToast } = require_toast();
var { getCreateRoot } = require_react_dom();
var { loadSettings, saveSettings } = require_settings();
var PERCENT_BONUS_RULES = [
  ["xp", "XP"],
  ["critChance", "Crit"],
  ["strengthPercent", "STR"],
  ["agilityPercent", "AGI"],
  ["intelligencePercent", "INT"],
  ["vitalityPercent", "VIT"],
  ["perceptionPercent", "PER"]
];
var RAW_BONUS_RULES = [
  ["strength", "strengthPercent", "STR"],
  ["agility", "agilityPercent", "AGI"],
  ["intelligence", "intelligencePercent", "INT"],
  ["vitality", "vitalityPercent", "VIT"],
  ["perception", "perceptionPercent", "PER"]
];
var SORT_VALUE_PICKERS = {
  xpBonus: (bonus) => (bonus == null ? void 0 : bonus.xp) || 0,
  critBonus: (bonus) => (bonus == null ? void 0 : bonus.critChance) || 0,
  strBonus: (bonus) => (bonus == null ? void 0 : bonus.strengthPercent) || 0,
  agiBonus: (bonus) => (bonus == null ? void 0 : bonus.agilityPercent) || 0,
  intBonus: (bonus) => (bonus == null ? void 0 : bonus.intelligencePercent) || 0,
  vitBonus: (bonus) => (bonus == null ? void 0 : bonus.vitalityPercent) || 0,
  perBonus: (bonus) => (bonus == null ? void 0 : bonus.perceptionPercent) || (bonus == null ? void 0 : bonus.perception) || 0
};
var SORT_LABELS = {
  xpBonus: "XP Gain",
  critBonus: "Crit Chance",
  strBonus: "Strength %",
  agiBonus: "Agility %",
  intBonus: "Intelligence %",
  vitBonus: "Vitality %",
  perBonus: "Perception %"
};
var { buildTitleComponents } = require_components();
var { buildTitleManagerSettingsPanel } = require_settings_panel();
var { getTitleManagerCss } = require_styles();
var _ReactUtils;
try {
  _ReactUtils = loadBdModuleFromPlugins("BetterDiscordReactUtils.js");
} catch (_) {
  _ReactUtils = null;
}
var _SLUtils;
_SLUtils = loadBdModuleFromPlugins("SoloLevelingUtils.js") || window.SoloLevelingUtils || null;
if (_SLUtils && !window.SoloLevelingUtils) window.SoloLevelingUtils = _SLUtils;
var _PluginUtils;
try {
  _PluginUtils = loadBdModuleFromPlugins("BetterDiscordPluginUtils.js");
} catch (_) {
  _PluginUtils = null;
}
module.exports = class SoloLevelingTitleManager {
  // Reserved for future external library imports
  // Currently all functionality is self-contained
  /**
   * 2.1 CONSTRUCTOR & DEFAULT SETTINGS
   */
  constructor() {
    this.defaultSettings = {
      enabled: true,
      debugMode: false,
      // Debug mode toggle
      sortBy: "xpBonus"
      // Default sort filter (xpBonus, critBonus, strBonus, etc.)
    };
    this.settings = structuredClone(this.defaultSettings);
    this._modalContainer = null;
    this._modalReactRoot = null;
    this._modalForceUpdate = null;
    this._components = null;
    this._isStopped = false;
    this._settingsPanelRoot = null;
    this._settingsPanelHandlers = null;
    this._cache = {
      soloLevelingData: null,
      soloLevelingDataTime: 0,
      soloLevelingDataTTL: 100,
      // 100ms - data changes frequently
      soloPluginInstance: null,
      // Cache plugin instance to avoid repeated lookups
      soloPluginInstanceTime: 0,
      soloPluginInstanceTTL: 5e3,
      // 5s - plugin instance doesn't change often
      achievementDefinitions: null,
      // Cache achievement definitions (large array)
      achievementDefinitionsTime: 0,
      achievementDefinitionsTTL: 2e3,
      // 2s - definitions are static but expensive to fetch
      titleBonuses: /* @__PURE__ */ new Map(),
      // Cache title bonuses by title name (Map preserves insertion order for O(1) eviction)
      titleBonusesTTL: 5e3
      // 5s - title bonuses are static
    };
    this._unwantedTitles = /* @__PURE__ */ new Set([
      "Scribe",
      "Wordsmith",
      "Author",
      "Explorer",
      "Wanderer",
      "Apprentice",
      "Message Warrior",
      "Monarch of Beast",
      "Monarch of Beasts"
    ]);
    this._warnedMessages = /* @__PURE__ */ new Set();
  }
  /**
   * 2.2 HELPER FUNCTIONS
   */
  /**
   * Debug logging helper - only logs when debug mode is enabled
   * Supports both formats:
   * - debugLog('message', data) - Simple format
   * - debugLog('TAG', 'message', data) - Tagged format
   * @param {string} tagOrMessage - Tag (if 3 params) or message (if 2 params)
   * @param {string|any} messageOrData - Message (if 3 params) or data (if 2 params)
   * @param {any} data - Optional data to log (only if tag provided)
   */
  debugLog(tag, message, data = null) {
    if (!this.settings.debugMode) return;
    data !== null ? console.log(`[TitleManager:${tag}] ${message}`, data) : console.log(`[TitleManager:${tag}] ${message}`);
  }
  /** Debug error helper - only logs when debug mode is enabled. Tagged form only. */
  debugError(tag, message, error = null) {
    if (!this.settings.debugMode) return;
    error !== null ? console.error(`[TitleManager:${tag}] ${message}`, error) : console.error(`[TitleManager:${tag}] ${message}`);
  }
  warnOnce(key, message, detail = null) {
    if (this._warnedMessages.has(key)) return;
    this._warnedMessages.add(key);
    if (detail !== null) {
      console.warn(message, detail);
      return;
    }
    console.warn(message);
  }
  /**
   * Load SoloLevelingUtils shared library (toolbar registry, React injection, etc.)
   */
  _loadSLUtils() {
    const fromWindow = typeof window !== "undefined" ? window.SoloLevelingUtils : null;
    this._SLUtils = fromWindow || _SLUtils || null;
    return !!this._SLUtils;
  }
  /** React 18 createRoot — delegates to shared/react-dom */
  _getCreateRoot() {
    const fromShared = typeof (_ReactUtils == null ? void 0 : _ReactUtils.getCreateRoot) === "function" ? _ReactUtils.getCreateRoot() : null;
    if (fromShared) return fromShared;
    return getCreateRoot();
  }
  /**
   * Render Title button as a React element (for SLUtils React toolbar patcher — Tier 1).
   * @param {object} React - React instance from Discord's internals
   * @returns {React.Element|null}
   */
  _renderTitleButtonReact(React) {
    if (this._isStopped) return null;
    const pluginInstance = this;
    return React.createElement(
      "div",
      {
        id: "tm-title-button-wrapper",
        className: "tm-title-button-wrapper",
        style: { display: "flex", alignItems: "center" }
      },
      React.createElement(
        "button",
        {
          className: "tm-title-button",
          title: "Titles",
          onClick: () => pluginInstance.openTitleModal()
        },
        React.createElement(
          "svg",
          {
            className: "tm-title-icon",
            viewBox: "0 0 512 512",
            width: "20",
            height: "20",
            fill: "currentColor",
            style: { display: "block", margin: "auto" }
          },
          React.createElement("path", {
            d: "M458.159,404.216c-18.93-33.65-49.934-71.764-100.409-93.431c-28.868,20.196-63.938,32.087-101.745,32.087c-37.828,0-72.898-11.89-101.767-32.087c-50.474,21.667-81.479,59.782-100.398,93.431C28.731,448.848,48.417,512,91.842,512c43.426,0,164.164,0,164.164,0s120.726,0,164.153,0C463.583,512,483.269,448.848,458.159,404.216z"
          }),
          React.createElement("path", {
            d: "M256.005,300.641c74.144,0,134.231-60.108,134.231-134.242v-32.158C390.236,60.108,330.149,0,256.005,0c-74.155,0-134.252,60.108-134.252,134.242V166.4C121.753,240.533,181.851,300.641,256.005,300.641z"
          })
        )
      )
    );
  }
  _getSoloPluginInstanceCached(now = Date.now()) {
    var _a, _b;
    if (this._cache.soloPluginInstance && this._cache.soloPluginInstanceTime && now - this._cache.soloPluginInstanceTime < this._cache.soloPluginInstanceTTL) {
      return this._cache.soloPluginInstance;
    }
    const instance = (_b = (_a = this._SLUtils) == null ? void 0 : _a.getPluginInstance) == null ? void 0 : _b.call(_a, "SoloLevelingStats");
    if (!instance) {
      this._cache.soloPluginInstance = null;
      this._cache.soloPluginInstanceTime = 0;
      return null;
    }
    this._cache.soloPluginInstance = instance;
    this._cache.soloPluginInstanceTime = now;
    return instance;
  }
  _getAchievementDefinitionsCached(instance, now = Date.now()) {
    if (this._cache.achievementDefinitions && this._cache.achievementDefinitionsTime && now - this._cache.achievementDefinitionsTime < this._cache.achievementDefinitionsTTL) {
      return this._cache.achievementDefinitions;
    }
    if (!instance || typeof instance.getAchievementDefinitions !== "function") {
      return null;
    }
    const achievements = instance.getAchievementDefinitions();
    this._cache.achievementDefinitions = achievements;
    this._cache.achievementDefinitionsTime = now;
    return achievements;
  }
  detachTitleManagerSettingsPanelHandlers() {
    const root = this._settingsPanelRoot;
    const handlers = this._settingsPanelHandlers;
    if (root && handlers) {
      root.removeEventListener("change", handlers.onChange);
    }
    this._settingsPanelRoot = null;
    this._settingsPanelHandlers = null;
  }
  /**
   * Get SoloLevelingStats data
   * @returns {Object|null} - SoloLevelingStats data or null if unavailable
   */
  getSoloLevelingData() {
    var _a;
    const now = Date.now();
    if (this._cache.soloLevelingData && this._cache.soloLevelingDataTime && now - this._cache.soloLevelingDataTime < this._cache.soloLevelingDataTTL) {
      return this._cache.soloLevelingData;
    }
    try {
      const instance = this._getSoloPluginInstanceCached(now);
      if (!instance) {
        this._cache.soloLevelingData = null;
        this._cache.soloLevelingDataTime = now;
        return null;
      }
      const achievements = ((_a = instance.settings) == null ? void 0 : _a.achievements) || {};
      const result = {
        titles: achievements.titles || [],
        activeTitle: achievements.activeTitle || null,
        achievements
      };
      this._cache.soloLevelingData = result;
      this._cache.soloLevelingDataTime = now;
      return result;
    } catch (error) {
      this.debugError("DATA", "Error getting SoloLevelingStats data", error);
      this._cache.soloLevelingData = null;
      this._cache.soloLevelingDataTime = now;
      return null;
    }
  }
  _cacheTitleBonusResult(titleName, result, now = Date.now()) {
    if (this._cache.titleBonuses.size >= 50) {
      const oldest = this._cache.titleBonuses.keys().next().value;
      this._cache.titleBonuses.delete(oldest);
    }
    this._cache.titleBonuses.set(titleName, { result, time: now });
    return result;
  }
  /**
   * Get title bonus info
   * @param {string} titleName - Title name
   * @returns {Object|null} - Title bonus object or null
   */
  getTitleBonus(titleName) {
    if (!titleName) return null;
    const now = Date.now();
    const cached = this._cache.titleBonuses.get(titleName);
    if (cached && now - cached.time < this._cache.titleBonusesTTL) {
      return cached.result;
    }
    try {
      const instance = this._getSoloPluginInstanceCached(now);
      if (!instance) {
        return this._cacheTitleBonusResult(titleName, null, now);
      }
      const achievements = this._getAchievementDefinitionsCached(instance, now);
      if (!achievements) {
        return this._cacheTitleBonusResult(titleName, null, now);
      }
      const achievement = achievements.find((a) => a.title === titleName);
      const result = (achievement == null ? void 0 : achievement.titleBonus) || null;
      return this._cacheTitleBonusResult(titleName, result, now);
    } catch (error) {
      return this._cacheTitleBonusResult(titleName, null, now);
    }
  }
  _appendPercentBonusLine(lines, bonus, key, label) {
    if (bonus[key] > 0) {
      lines.push(`+${(bonus[key] * 100).toFixed(0)}% ${label}`);
    }
  }
  _appendRawBonusLine(lines, bonus, rawKey, percentKey, label) {
    if (bonus[rawKey] > 0 && !bonus[percentKey]) {
      lines.push(`+${bonus[rawKey]} ${label}`);
    }
  }
  /**
   * Build formatted bonus lines for a title.
   * Centralized to avoid duplicated logic across equip toast + modal rendering.
   * @param {any} bonus
   * @returns {string[]} array of formatted bonus strings
   */
  formatTitleBonusLines(bonus) {
    if (!bonus) return [];
    const lines = [];
    PERCENT_BONUS_RULES.forEach(([key, label]) => this._appendPercentBonusLine(lines, bonus, key, label));
    RAW_BONUS_RULES.forEach(
      ([rawKey, percentKey, label]) => this._appendRawBonusLine(lines, bonus, rawKey, percentKey, label)
    );
    return lines;
  }
  /**
   * Get human-readable sort label
   * @param {string} sortBy - Sort key
   * @returns {string} - Human-readable label
   */
  getSortLabel(sortBy) {
    return SORT_LABELS[sortBy] || "XP Gain";
  }
  /**
   * Sort titles by the selected metric while avoiding repeated `getTitleBonus()` calls
   * inside the comparator (precompute once per render).
   * @param {object} params
   * @param {string[]} params.titles
   * @param {string} params.sortBy
   * @returns {string[]} sorted titles (new array, does not mutate input)
   */
  getSortedTitles({ titles, sortBy }) {
    const pickSortValue = SORT_VALUE_PICKERS[sortBy] || SORT_VALUE_PICKERS.xpBonus;
    const bonusMap = {};
    const sortValues = {};
    for (const title of titles) {
      const bonus = this.getTitleBonus(title);
      bonusMap[title] = bonus;
      sortValues[title] = pickSortValue(bonus);
    }
    const sorted = [...titles].sort((a, b) => (sortValues[b] || 0) - (sortValues[a] || 0));
    return { sorted, bonusMap };
  }
  /**
   * 3.1 PLUGIN LIFECYCLE
   */
  start() {
    var _a, _b;
    this.stop();
    this._toast = ((_a = _PluginUtils == null ? void 0 : _PluginUtils.createToastHelper) == null ? void 0 : _a.call(_PluginUtils, "titleManager")) || createToast();
    this._warnedMessages.clear();
    this._isStopped = false;
    this.loadSettings();
    this._loadSLUtils();
    this._components = buildTitleComponents(BdApi, this);
    this.injectCSS();
    if ((_b = this._SLUtils) == null ? void 0 : _b.registerToolbarButton) {
      this._SLUtils.registerToolbarButton({
        id: "tm-title-button-wrapper",
        priority: 10,
        // Before SkillTree (20)
        renderReact: (React, _channel) => this._renderTitleButtonReact(React)
      });
    } else {
      this.warnOnce("slutils-missing", "[TitleManager] SLUtils not available \u2014 toolbar button inactive");
    }
    this.debugLog("START", "Plugin started");
  }
  stop() {
    var _a, _b;
    this._isStopped = true;
    try {
      (_b = (_a = this._SLUtils) == null ? void 0 : _a.unregisterToolbarButton) == null ? void 0 : _b.call(_a, "tm-title-button-wrapper");
    } catch (error) {
      this.warnOnce("toolbar-unregister-failed", "[TitleManager] Failed to unregister toolbar button", error);
    }
    try {
      this.closeTitleModal();
      this.detachTitleManagerSettingsPanelHandlers();
      this.removeCSS();
    } finally {
      this._cache.soloLevelingData = null;
      this._cache.soloLevelingDataTime = 0;
      this._cache.soloPluginInstance = null;
      this._cache.soloPluginInstanceTime = 0;
      this._cache.achievementDefinitions = null;
      this._cache.achievementDefinitionsTime = 0;
      this._cache.titleBonuses = /* @__PURE__ */ new Map();
      this._components = null;
      this._toast = null;
    }
    this.debugLog("STOP", "Plugin stopped");
  }
  /**
   * 3.2 SETTINGS MANAGEMENT
   */
  loadSettings() {
    this.settings = structuredClone(loadSettings("TitleManager", this.defaultSettings));
  }
  saveSettings() {
    saveSettings("TitleManager", this.settings);
  }
  getSettingsPanel() {
    return buildTitleManagerSettingsPanel(this);
  }
  /**
   * 3.3 CSS MANAGEMENT
   */
  injectCSS() {
    const styleId = "title-manager-css";
    if (document.getElementById(styleId)) return;
    BdApi.DOM.addStyle(styleId, getTitleManagerCss());
  }
  removeCSS() {
    BdApi.DOM.removeStyle("title-manager-css");
  }
  /**
   * 3.5 WEBPACK & REACT INTEGRATION (Advanced BetterDiscord Integration)
   */
  /**
   * 3.4 UI MANAGEMENT
   */
  // NOTE: createTitleButton(), observeToolbar(), removeTitleButton() removed in v1.3.0.
  // Toolbar button is now managed entirely via SLUtils React patcher.
  // See _renderTitleButtonReact() for the React implementation.
  /**
   * 3.5 TITLE MANAGEMENT
   */
  /**
   * Equip a title
   * @param {string} titleName - Title name to equip
   * @returns {boolean} - True if successful
   */
  equipTitle(titleName) {
    var _a, _b, _c;
    try {
      const instance = (_b = (_a = this._SLUtils) == null ? void 0 : _a.getPluginInstance) == null ? void 0 : _b.call(_a, "SoloLevelingStats");
      if (!instance) return false;
      if (this._unwantedTitles.has(titleName)) {
        this._toast("This title has been removed", "error", 2e3);
        return false;
      }
      const soloData = this.getSoloLevelingData();
      if (!soloData || !soloData.titles.includes(titleName)) {
        this._toast("Title not unlocked", "error", 2e3);
        return false;
      }
      if (!instance.setActiveTitle) return false;
      const result = instance.setActiveTitle(titleName);
      if (result) {
        this._cache.soloLevelingData = null;
        this._cache.soloLevelingDataTime = 0;
        const bonus = this.getTitleBonus(titleName);
        const buffs = this.formatTitleBonusLines(bonus);
        const bonusText = buffs.length > 0 ? ` (${buffs.join(", ")})` : "";
        this._toast(`Title Equipped: ${titleName}${bonusText}`, "success", 3e3);
        (_c = this._modalForceUpdate) == null ? void 0 : _c.call(this);
      }
      return result;
    } catch (error) {
      this.debugError("EQUIP", "Error equipping title", error);
      return false;
    }
  }
  /**
   * Unequip currently active title
   * @returns {boolean} - True if successful
   */
  unequipTitle() {
    var _a, _b, _c;
    try {
      const instance = (_b = (_a = this._SLUtils) == null ? void 0 : _a.getPluginInstance) == null ? void 0 : _b.call(_a, "SoloLevelingStats");
      if (!instance) return false;
      if (instance.setActiveTitle) {
        const result = instance.setActiveTitle(null);
        if (!result) {
          BdApi.UI.showToast("Could not unequip title", { type: "error" });
          return false;
        }
        this._cache.soloLevelingData = null;
        this._cache.soloLevelingDataTime = 0;
        this._toast("Title Unequipped", "info", 2e3);
        (_c = this._modalForceUpdate) == null ? void 0 : _c.call(this);
        return true;
      }
      return false;
    } catch (error) {
      this.debugError("UNEQUIP", "Error unequipping title", error);
      return false;
    }
  }
  /**
   * 3.6 EVENT HANDLING & WATCHERS
   */
  // NOTE: Channel/focus watchers and periodic button checks removed — React patcher
  // handles button persistence natively across channel switches and focus changes.
  openTitleModal() {
    var _a, _b, _c, _d;
    if (this._modalReactRoot) {
      (_a = this._modalForceUpdate) == null ? void 0 : _a.call(this);
      return;
    }
    if (!((_b = this._components) == null ? void 0 : _b.TitleModal)) {
      this.warnOnce("components-missing", "[TitleManager] Modal components unavailable \u2014 cannot open modal");
      (_c = this._toast) == null ? void 0 : _c.call(this, "Title modal unavailable in current Discord runtime", "error", 2500);
      return;
    }
    const createRoot = this._getCreateRoot();
    if (!createRoot) {
      this.warnOnce("create-root-missing", "[TitleManager] createRoot unavailable \u2014 cannot open modal");
      (_d = this._toast) == null ? void 0 : _d.call(this, "Title modal unavailable in current Discord runtime", "error", 2500);
      return;
    }
    const container = document.createElement("div");
    container.id = "tm-modal-root";
    container.style.display = "contents";
    document.body.appendChild(container);
    const root = createRoot(container);
    this._modalContainer = container;
    this._modalReactRoot = root;
    const { TitleModal } = this._components;
    root.render(BdApi.React.createElement(TitleModal, { onClose: () => this.closeTitleModal() }));
    this.debugLog("MODAL", "Title modal opened (React)");
  }
  closeTitleModal() {
    if (this._modalReactRoot) {
      try {
        this._modalReactRoot.unmount();
      } catch (error) {
        this.warnOnce("modal-unmount-failed", "[TitleManager] Failed to unmount modal root", error);
      }
      this._modalReactRoot = null;
    }
    if (this._modalContainer) {
      this._modalContainer.remove();
      this._modalContainer = null;
    }
    this._modalForceUpdate = null;
    this.debugLog("MODAL", "Title modal closed");
  }
  // Debug logging helpers are in Section 2.2 (Helper Functions)
};
