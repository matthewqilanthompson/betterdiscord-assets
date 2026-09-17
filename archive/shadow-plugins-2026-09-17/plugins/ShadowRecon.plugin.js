/**
 * @name ShadowRecon
 * @description Lore-accurate recon suite: mark guilds for dossiers, track staff authority, and inspect marked targets from ShadowSenses.
 * @version 1.0.5
 * @author matthewthompson
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

// src/ShadowRecon/settings-panel.js
var require_settings_panel = __commonJS({
  "src/ShadowRecon/settings-panel.js"(exports2, module2) {
    var PANEL_STYLE = {
      padding: "16px",
      background: "rgba(10, 10, 16, 0.98)",
      color: "#d1d5db",
      borderRadius: "2px",
      border: "1px solid rgba(138, 43, 226, 0.45)"
    };
    var ROW_STYLE = {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      gap: "12px",
      padding: "10px 0",
      borderBottom: "1px solid rgba(138, 43, 226, 0.2)"
    };
    var LABEL_STYLE = { color: "#dcddde", fontSize: "13px", fontWeight: "600" };
    var NOTE_STYLE = { color: "#b5bac1", fontSize: "11px", marginTop: "2px", maxWidth: "480px" };
    var STAT_STYLE = { color: "#8a2be2", fontWeight: "700" };
    function buildSettingsPanel2(BdApi2, plugin) {
      const React = BdApi2.React;
      const ce = React.createElement;
      const makeToggle = (label, key, note, onChangeExtra) => ce(
        "div",
        { style: ROW_STYLE },
        ce(
          "div",
          null,
          ce("div", { style: LABEL_STYLE }, label),
          note ? ce("div", { style: NOTE_STYLE }, note) : null
        ),
        ce("input", {
          type: "checkbox",
          defaultChecked: !!plugin.settings[key],
          onChange: (e) => {
            plugin.settings[key] = e.target.checked;
            plugin.saveSettings();
            plugin.refreshAllVisuals();
            if (typeof onChangeExtra === "function") {
              try {
                onChangeExtra(plugin);
              } catch (_) {
              }
            }
          },
          style: { accentColor: "#8a2be2" }
        })
      );
      const refreshSubs = (p) => {
        var _a;
        return (_a = p.refreshDispatcherSubs) == null ? void 0 : _a.call(p);
      };
      const markedTargets = plugin._getShadowDeploymentMap().size;
      const currentGuildId = plugin._getCurrentGuildId();
      return ce(
        "div",
        { style: PANEL_STYLE },
        ce("h3", { style: { marginTop: 0, color: "#8a2be2" } }, "Shadow Recon Control"),
        ce(
          "div",
          { style: { marginBottom: "12px", color: "#b5bac1", fontSize: "12px" } },
          ce("span", null, "Guilds: "),
          ce("span", { style: STAT_STYLE }, plugin._formatNumber(plugin.getServerCount())),
          ce("span", null, " | Marked Guilds: "),
          ce("span", { style: STAT_STYLE }, plugin._formatNumber(plugin._markedGuildIds.size)),
          ce("span", null, " | Marked Targets: "),
          ce("span", { style: STAT_STYLE }, plugin._formatNumber(markedTargets))
        ),
        makeToggle("Lore Lock (recon guild for full dossier)", "loreLockedRecon", "When enabled, unrecon guild dossiers only show a limited briefing."),
        makeToggle("Server Counter Widget", "showServerCounterWidget", "Adds total guild / marked intel at top of guild bar."),
        makeToggle("Guild Hover Intel Hint", "showGuildHoverIntel", "Adds recon hint text on guild icon hover elements."),
        makeToggle("Staff Intel in User Context", "showStaffIntelInContextMenu", "Shows rank without recon mark; detailed staff dossier unlocks when guild is recon-marked."),
        makeToggle("Marked Target Intel Action", "showMarkedTargetIntelInContext", "Adds limited target intel action only when monitored target is present in the same guild."),
        makeToggle(
          "Activity Log (24h)",
          "enableSkirmishLog",
          "Records when monitored targets change status, join voice channels, or appear in channels you visit (in marked guilds only). Local-only, capped at 200 entries per target.",
          refreshSubs
        ),
        makeToggle(
          "Status & Activity History",
          "enableAuraReading",
          "Captures custom-status text and what games / apps monitored targets are running over time. Local-only, capped at 100 entries per target.",
          refreshSubs
        ),
        ce(
          "div",
          { style: { display: "flex", gap: "8px", marginTop: "14px" } },
          ce("button", {
            className: "shadow-recon-button",
            onClick: () => plugin._toggleCurrentGuildMarkWithToast()
          }, currentGuildId && plugin.isGuildMarked(currentGuildId) ? "Unrecon Current Guild" : "Recon Current Guild"),
          ce("button", {
            className: "shadow-recon-button",
            onClick: () => {
              if (currentGuildId) plugin.openGuildDossier(currentGuildId);
              else plugin._toast("Select a guild first", "warning");
            }
          }, "Open Current Guild Dossier"),
          ce("button", {
            className: "shadow-recon-button",
            onClick: () => {
              plugin._markedGuildIds.clear();
              plugin.saveMarkedGuilds();
              plugin.refreshAllVisuals();
              plugin._toast("Shadow Recon guild marks cleared", "info");
            }
          }, "Clear Recon Guilds")
        )
      );
    }
    module2.exports = {
      buildSettingsPanel: buildSettingsPanel2
    };
  }
});

// src/ShadowRecon/styles.js
var require_styles = __commonJS({
  "src/ShadowRecon/styles.js"(exports2, module2) {
    function getShadowReconCss2(widgetId, modalId) {
      return `
#${widgetId}.shadow-recon-widget {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  margin: 5px 10px 5px 6px;
  padding: 6px 8px;
  border: 1px solid rgba(138, 43, 226, 0.4);
  border-radius: 2px;
  background: linear-gradient(145deg, rgba(10, 10, 16, 0.95), rgba(12, 12, 24, 0.95));
  color: #8a2be2;
  font-size: 10px;
  line-height: 1.2;
  white-space: nowrap;
  max-width: 108px;
  overflow: hidden;
  text-overflow: ellipsis;
  cursor: pointer;
  user-select: none;
  flex-shrink: 0;
  transform-origin: center center;
  transition: border-color 120ms ease, color 120ms ease, transform 140ms ease;
}

#${widgetId}.shadow-recon-widget.shadow-recon-widget--rotated {
  margin: 4px 12px 4px 4px;
  padding: 4px 7px;
  border-radius: 2px;
  font-size: 9px;
  line-height: 1.2;
  max-width: none;
}

#${widgetId}.shadow-recon-widget:hover {
  border-color: rgba(138, 43, 226, 0.85);
  color: #dcddde;
}

#${modalId}.shadow-recon-overlay {
  position: fixed;
  inset: 0;
  z-index: 10060;
  /* PERF (2026-07-13): backdrop-filter removed \u2014 it re-blurred the entire
     app behind the overlay on every repaint for as long as the recon modal
     stayed open (user-bounded, not transition-bounded). A deeper wash reads
     near-identically. Same call made for the ShadowExchange panel (2905994). */
  background: rgba(2, 6, 23, 0.92);
  display: flex;
  align-items: center;
  justify-content: center;
}

#${modalId} .shadow-recon-modal {
  width: min(900px, 94vw);
  max-height: 85vh;
  border-radius: 2px;
  overflow: hidden;
  border: 1px solid rgba(138, 43, 226, 0.4);
  background: rgba(10, 10, 16, 0.97);
  box-shadow: 0 18px 60px rgba(0, 0, 0, 0.55);
  display: flex;
  flex-direction: column;
}

#${modalId} .shadow-recon-modal-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 14px;
  border-bottom: 1px solid rgba(138, 43, 226, 0.25);
  background: rgba(12, 12, 24, 0.9);
}

#${modalId} .shadow-recon-modal-title-wrap { display: flex; flex-direction: column; gap: 2px; }
#${modalId} .shadow-recon-modal-title { margin: 0; color: #dcddde; font-size: 16px; }
#${modalId} .shadow-recon-modal-subtitle { color: #8a2be2; font-size: 12px; }

#${modalId} .shadow-recon-close {
  border: 1px solid rgba(138, 43, 226, 0.45);
  background: transparent;
  color: #dcddde;
  border-radius: 2px;
  width: 30px;
  height: 30px;
  cursor: pointer;
}

#${modalId} .shadow-recon-close:hover {
  border-color: rgba(248, 113, 113, 0.8);
  color: #fecaca;
}

#${modalId} .shadow-recon-modal-body {
  overflow: auto;
  padding: 14px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 12px;
}

#${modalId} .shadow-recon-section {
  border: 1px solid rgba(138, 43, 226, 0.2);
  border-radius: 2px;
  padding: 10px;
  background: rgba(10, 10, 16, 0.82);
}

#${modalId} .shadow-recon-section-title {
  margin: 0 0 8px;
  color: #8a2be2;
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 0.04em;
}

#${modalId} .shadow-recon-grid {
  display: grid;
  grid-template-columns: 130px 1fr;
  gap: 6px 10px;
}

#${modalId} .shadow-recon-key {
  color: #b5bac1;
  font-size: 11px;
}

#${modalId} .shadow-recon-value {
  color: #dcddde;
  font-size: 12px;
  word-break: break-word;
}

#${modalId} .shadow-recon-perm-list {
  display: grid;
  gap: 6px;
}

#${modalId} .shadow-recon-perm-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 1px solid rgba(138, 43, 226, 0.22);
  border-radius: 2px;
  padding: 6px 8px;
  font-size: 12px;
}

#${modalId} .shadow-recon-perm-item.allowed {
  border-color: rgba(34, 197, 94, 0.45);
  color: #bbf7d0;
}

#${modalId} .shadow-recon-perm-item.denied {
  border-color: rgba(239, 68, 68, 0.4);
  color: #fecaca;
}

.shadow-recon-notice {
  grid-column: 1 / -1;
  padding: 10px;
  border: 1px solid rgba(250, 204, 21, 0.5);
  border-radius: 2px;
  color: #fde68a;
  background: rgba(120, 53, 15, 0.22);
  margin-bottom: 8px;
}

.shadow-recon-button {
  border: 1px solid rgba(138, 43, 226, 0.4);
  border-radius: 2px;
  background: rgba(10, 10, 16, 0.85);
  color: #dcddde;
  padding: 7px 10px;
  cursor: pointer;
}

.shadow-recon-button:hover {
  border-color: rgba(138, 43, 226, 0.85);
  background: rgba(138, 43, 226, 0.15);
}

/* Guild icon custom tooltip */
.shadow-recon-tooltip {
  position: fixed;
  z-index: 10100;
  padding: 8px 12px;
  border: 1px solid rgba(138, 43, 226, 0.65);
  border-radius: 2px;
  background: rgba(10, 10, 16, 0.96);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.6), 0 0 8px rgba(138, 43, 226, 0.15);
  pointer-events: none;
  opacity: 0;
  transform: translateX(-4px);
  transition: opacity 100ms ease, transform 100ms ease;
  max-width: 320px;
  font-family: inherit;
}

.shadow-recon-tooltip--visible {
  opacity: 1;
  transform: translateX(0);
}

.shadow-recon-tooltip-row {
  color: #d4d4d8;
  font-size: 12px;
  line-height: 1.5;
  white-space: nowrap;
}

.shadow-recon-tooltip-row + .shadow-recon-tooltip-row {
  margin-top: 2px;
}

.shadow-recon-tooltip-tag {
  font-weight: 600;
  font-size: 11px;
  padding: 1px 5px;
  border-radius: 2px;
  letter-spacing: 0.02em;
}

.shadow-recon-tooltip-tag--marked {
  color: #8a2be2;
  background: rgba(138, 43, 226, 0.18);
  border: 1px solid rgba(138, 43, 226, 0.4);
}

.shadow-recon-tooltip-tag--unmarked {
  color: #a1a1aa;
  background: rgba(113, 113, 122, 0.15);
  border: 1px solid rgba(113, 113, 122, 0.3);
}

.shadow-recon-tooltip-name {
  color: #e4e4e7;
  font-weight: 500;
}
`;
    }
    module2.exports = {
      getShadowReconCss: getShadowReconCss2
    };
  }
});

// src/ShadowRecon/modal-utils.js
var require_modal_utils = __commonJS({
  "src/ShadowRecon/modal-utils.js"(exports2, module2) {
    function createModal2(plugin, modalId, title, subtitle = "") {
      plugin.closeModal();
      const overlay = document.createElement("div");
      overlay.id = modalId;
      overlay.className = "shadow-recon-overlay";
      const panel = document.createElement("div");
      panel.className = "shadow-recon-modal";
      const header = document.createElement("div");
      header.className = "shadow-recon-modal-header";
      const titleWrap = document.createElement("div");
      titleWrap.className = "shadow-recon-modal-title-wrap";
      const titleEl = document.createElement("h2");
      titleEl.className = "shadow-recon-modal-title";
      titleEl.textContent = title;
      const subtitleEl = document.createElement("div");
      subtitleEl.className = "shadow-recon-modal-subtitle";
      subtitleEl.textContent = subtitle;
      const closeBtn = document.createElement("button");
      closeBtn.className = "shadow-recon-close";
      closeBtn.textContent = "\xD7";
      closeBtn.addEventListener("click", () => plugin.closeModal());
      titleWrap.appendChild(titleEl);
      titleWrap.appendChild(subtitleEl);
      header.appendChild(titleWrap);
      header.appendChild(closeBtn);
      const body = document.createElement("div");
      body.className = "shadow-recon-modal-body";
      panel.appendChild(header);
      panel.appendChild(body);
      overlay.appendChild(panel);
      overlay.addEventListener("click", (e) => {
        if (e.target === overlay) plugin.closeModal();
      });
      document.body.appendChild(overlay);
      plugin._modalEl = overlay;
      return overlay;
    }
    function buildGrid(rows) {
      const grid = document.createElement("div");
      grid.className = "shadow-recon-grid";
      for (const [key, value] of rows) {
        const k = document.createElement("div");
        k.className = "shadow-recon-key";
        k.textContent = String(key);
        const v = document.createElement("div");
        v.className = "shadow-recon-value";
        v.textContent = String(value);
        grid.appendChild(k);
        grid.appendChild(v);
      }
      return grid;
    }
    function buildKeyValueSection2(title, rows) {
      const section = document.createElement("section");
      section.className = "shadow-recon-section";
      const h = document.createElement("h3");
      h.className = "shadow-recon-section-title";
      h.textContent = title;
      section.appendChild(h);
      section.appendChild(buildGrid(rows));
      return section;
    }
    function buildPermissionsSection2(title, summary) {
      const section = document.createElement("section");
      section.className = "shadow-recon-section";
      const h = document.createElement("h3");
      h.className = "shadow-recon-section-title";
      h.textContent = title;
      const list = document.createElement("div");
      list.className = "shadow-recon-perm-list";
      for (const item of summary) {
        const row = document.createElement("div");
        row.className = `shadow-recon-perm-item ${item.allowed ? "allowed" : "denied"}`;
        const label = document.createElement("span");
        label.textContent = item.label;
        const status = document.createElement("span");
        status.textContent = item.allowed ? "Allowed" : "Denied";
        row.appendChild(label);
        row.appendChild(status);
        list.appendChild(row);
      }
      section.appendChild(h);
      section.appendChild(list);
      return section;
    }
    module2.exports = {
      createModal: createModal2,
      buildKeyValueSection: buildKeyValueSection2,
      buildPermissionsSection: buildPermissionsSection2,
      buildGrid
    };
  }
});

// src/ShadowRecon/target-intel.js
var require_target_intel = __commonJS({
  "src/ShadowRecon/target-intel.js"(exports2, module2) {
    function collectSessionClientStatuses(plugin) {
      var _a, _b;
      const out = {};
      if (!((_a = plugin._SessionsStore) == null ? void 0 : _a.getSessions)) return out;
      const sessions = plugin._SessionsStore.getSessions() || {};
      for (const session of Object.values(sessions)) {
        const client = (_b = session == null ? void 0 : session.clientInfo) == null ? void 0 : _b.client;
        if (!client) continue;
        out[client] = (session == null ? void 0 : session.status) || "unknown";
      }
      return out;
    }
    function collectClientStatuses(plugin, userId) {
      var _a, _b, _c, _d, _e, _f, _g;
      const currentUserId = (_c = (_b = (_a = plugin._UserStore) == null ? void 0 : _a.getCurrentUser) == null ? void 0 : _b.call(_a)) == null ? void 0 : _c.id;
      if (currentUserId && String(userId) === String(currentUserId)) {
        return collectSessionClientStatuses(plugin);
      }
      return ((_g = (_f = (_e = (_d = plugin._PresenceStore) == null ? void 0 : _d.getState) == null ? void 0 : _e.call(_d)) == null ? void 0 : _f.clientStatuses) == null ? void 0 : _g[userId]) || {};
    }
    function mapClientStatusesToRows(plugin, clientStatuses, { platformLabels, statusLabels }) {
      const rows = [];
      for (const [platformRaw, statusRaw] of Object.entries(clientStatuses || {})) {
        const platform = platformLabels[platformRaw] || plugin._capitalize(platformRaw);
        const status = statusLabels[statusRaw] || plugin._capitalize(statusRaw);
        rows.push({ platform, status });
      }
      return rows;
    }
    function appendPresenceFallbackRow(plugin, rows, userId, { statusLabels }) {
      var _a, _b;
      if (rows.length > 0) return;
      const statusRaw = (_b = (_a = plugin._PresenceStore) == null ? void 0 : _a.getStatus) == null ? void 0 : _b.call(_a, userId);
      if (!statusRaw) return;
      rows.push({
        platform: "Presence",
        status: statusLabels[statusRaw] || plugin._capitalize(statusRaw)
      });
    }
    function getPlatformIntel2(plugin, userId, labels) {
      try {
        const rows = mapClientStatusesToRows(plugin, collectClientStatuses(plugin, userId), labels);
        appendPresenceFallbackRow(plugin, rows, userId, labels);
        return rows;
      } catch (error) {
        console.error("[ShadowRecon] Failed getting platform intel", error);
        return [];
      }
    }
    module2.exports = {
      getPlatformIntel: getPlatformIntel2
    };
  }
});

// src/ShadowRecon/permissions.js
var require_permissions = __commonJS({
  "src/ShadowRecon/permissions.js"(exports2, module2) {
    function toBigInt2(value) {
      if (typeof value === "bigint") return value;
      if (typeof value === "number" && Number.isFinite(value)) return BigInt(Math.trunc(value));
      if (typeof value === "string" && value.trim().length > 0) {
        try {
          return BigInt(value);
        } catch (_) {
          return 0n;
        }
      }
      return 0n;
    }
    function humanizePermissionKey(cache, key) {
      if (cache[key]) return cache[key];
      const result = String(key).toLowerCase().split("_").map((part) => part.charAt(0).toUpperCase() + part.slice(1)).join(" ");
      cache[key] = result;
      return result;
    }
    function isDetailedStaffIntelUnlocked2(plugin, guildId) {
      if (!guildId) return false;
      if (!plugin.settings.loreLockedRecon) return true;
      return plugin.isGuildMarked(guildId);
    }
    function isGuildOwner(guild, userId) {
      if (!guild || !userId) return false;
      const uid = String(userId);
      return String(guild.ownerId ?? "") === uid || String(guild.owner_id ?? "") === uid;
    }
    function getGuildRoleMap(plugin, guildId, guild) {
      const grs = plugin._GuildRoleStore;
      try {
        if (grs == null ? void 0 : grs.getRoles) {
          const roles = grs.getRoles(guildId);
          if (roles && typeof roles === "object" && Object.keys(roles).length > 0) return roles;
        }
      } catch (_) {
      }
      if ((guild == null ? void 0 : guild.roles) && typeof guild.roles === "object" && Object.keys(guild.roles).length > 0) {
        return guild.roles;
      }
      return null;
    }
    function getGuildRole(plugin, guildId, roleId, roleMap) {
      var _a, _b;
      if (roleMap && roleMap[roleId]) return roleMap[roleId];
      try {
        const r = (_b = (_a = plugin._GuildRoleStore) == null ? void 0 : _a.getRole) == null ? void 0 : _b.call(_a, guildId, roleId);
        if (r) return r;
      } catch (_) {
      }
      return null;
    }
    function computeGuildPermissionBits(plugin, guildId, userId) {
      var _a, _b, _c, _d;
      const guild = (_b = (_a = plugin._GuildStore) == null ? void 0 : _a.getGuild) == null ? void 0 : _b.call(_a, guildId);
      if (!guild) return 0n;
      if (isGuildOwner(guild, userId)) {
        return allPermissionBits(plugin);
      }
      const member = (_d = (_c = plugin._GuildMemberStore) == null ? void 0 : _c.getMember) == null ? void 0 : _d.call(_c, guildId, userId);
      if (!member) return 0n;
      const roleMap = getGuildRoleMap(plugin, guildId, guild);
      const roleIds = /* @__PURE__ */ new Set([String(guildId), ...Array.isArray(member.roles) ? member.roles.map(String) : []]);
      let bits = 0n;
      for (const roleId of roleIds) {
        const role = getGuildRole(plugin, guildId, roleId, roleMap);
        if (!role) continue;
        bits |= toBigInt2(role.permissions);
      }
      return bits;
    }
    function getPermissionBitsMap(plugin) {
      if (plugin._permissionBitsCache) return plugin._permissionBitsCache;
      const collectFromSource = (src, into) => {
        if (!src || typeof src !== "object") return;
        for (const [key, value] of Object.entries(src)) {
          if (!/^[A-Z0-9_]+$/.test(key)) continue;
          if (!["number", "string", "bigint"].includes(typeof value)) continue;
          try {
            if (into[key] === void 0) into[key] = toBigInt2(value);
          } catch (_) {
          }
        }
      };
      const map = {};
      const root = plugin._PermissionsBits || {};
      collectFromSource(root, map);
      for (const nestedKey of ["default", "Z", "ZP", "a", "Permissions"]) {
        if (root[nestedKey] && typeof root[nestedKey] === "object") {
          collectFromSource(root[nestedKey], map);
        }
      }
      plugin._permissionBitsCache = map;
      return map;
    }
    function allPermissionBits(plugin) {
      if (plugin._allPermsBitsCache !== void 0) return plugin._allPermsBitsCache;
      const map = getPermissionBitsMap(plugin);
      let all = 0n;
      for (const bit of Object.values(map)) {
        if (typeof bit === "bigint") all |= bit;
      }
      plugin._allPermsBitsCache = all;
      return all;
    }
    function getPermissionSummaryForMember2(plugin, guildId, userId, { importantPermissions, humanizedPermCache }) {
      const bits = computeGuildPermissionBits(plugin, guildId, userId);
      const bitMap = getPermissionBitsMap(plugin);
      const adminBit = bitMap.ADMINISTRATOR || 0n;
      const hasAdmin = adminBit !== 0n && (bits & adminBit) === adminBit;
      const summary = [];
      for (const key of importantPermissions) {
        const bit = bitMap[key] || 0n;
        const allowed = hasAdmin || bit !== 0n && (bits & bit) === bit;
        summary.push({ key, label: humanizePermissionKey(humanizedPermCache, key), allowed });
      }
      return summary;
    }
    function getCurrentUserPermissionSummary2(plugin, guildId, constants) {
      var _a, _b, _c, _d, _e;
      const currentUser = (_b = (_a = plugin._UserStore) == null ? void 0 : _a.getCurrentUser) == null ? void 0 : _b.call(_a);
      if (!(currentUser == null ? void 0 : currentUser.id)) return [];
      const guild = (_d = (_c = plugin._GuildStore) == null ? void 0 : _c.getGuild) == null ? void 0 : _d.call(_c, guildId);
      const can = (_e = plugin._PermissionStore) == null ? void 0 : _e.can;
      if (guild && typeof can === "function") {
        const bitMap = getPermissionBitsMap(plugin);
        const bound = can.bind(plugin._PermissionStore);
        return constants.importantPermissions.map((key) => {
          const bit = bitMap[key] || 0n;
          let allowed = false;
          if (bit !== 0n) {
            try {
              allowed = !!bound(bit, guild);
            } catch (_) {
              allowed = false;
            }
          }
          return { key, label: humanizePermissionKey(constants.humanizedPermCache, key), allowed };
        });
      }
      return getPermissionSummaryForMember2(plugin, guildId, currentUser.id, constants);
    }
    function getStaffIntel2(plugin, userId, guildId, constants) {
      var _a, _b;
      if (!guildId || !userId) return null;
      const guild = (_b = (_a = plugin._GuildStore) == null ? void 0 : _a.getGuild) == null ? void 0 : _b.call(_a, guildId);
      if (!guild) return null;
      if (isGuildOwner(guild, userId)) {
        return { label: "Server Owner", capabilities: ["Full control"] };
      }
      const summary = getPermissionSummaryForMember2(plugin, guildId, userId, constants);
      const hasAdmin = summary.find((permission) => permission.key === "ADMINISTRATOR" && permission.allowed);
      if (hasAdmin) {
        return { label: "Administrator", capabilities: ["Full administrative access"] };
      }
      const capabilities = summary.filter((permission) => permission.allowed && constants.staffPermissionKeys.includes(permission.key) && permission.key !== "ADMINISTRATOR").map((permission) => permission.label);
      if (capabilities.length > 0) {
        return { label: "Management", capabilities };
      }
      return null;
    }
    function bandRolesByPower2(plugin, guildId) {
      var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j;
      const result = { S: [], A: [], B: [], C: [], D: [] };
      const guild = (_b = (_a = plugin._GuildStore) == null ? void 0 : _a.getGuild) == null ? void 0 : _b.call(_a, guildId);
      if (!guild) return result;
      const roleMap = getGuildRoleMap(plugin, guildId, guild);
      if (!roleMap) return result;
      const bitMap = getPermissionBitsMap(plugin);
      const ADMIN = bitMap.ADMINISTRATOR || 0n;
      const TIER_A_BITS = (bitMap.MANAGE_GUILD || 0n) | (bitMap.MANAGE_ROLES || 0n) | (bitMap.BAN_MEMBERS || 0n);
      const TIER_B_BITS = (bitMap.KICK_MEMBERS || 0n) | (bitMap.MANAGE_CHANNELS || 0n) | (bitMap.MANAGE_MESSAGES || 0n) | (bitMap.MODERATE_MEMBERS || 0n);
      const TIER_C_BITS = (bitMap.MENTION_EVERYONE || 0n) | (bitMap.MANAGE_THREADS || 0n) | (bitMap.MANAGE_EVENTS || 0n);
      const roleCounts = /* @__PURE__ */ Object.create(null);
      try {
        const sources = [
          (_d = (_c = plugin._GuildMemberStore) == null ? void 0 : _c.getMembers) == null ? void 0 : _d.call(_c, guildId),
          (_f = (_e = plugin._GuildMemberStore) == null ? void 0 : _e.getMutableGuildMembers) == null ? void 0 : _f.call(_e, guildId),
          (_h = (_g = plugin._GuildMemberStore) == null ? void 0 : _g.members) == null ? void 0 : _h[guildId],
          (_j = (_i = plugin._GuildMemberStore) == null ? void 0 : _i.guildMemberMap) == null ? void 0 : _j[guildId]
        ];
        for (const src of sources) {
          if (!src) continue;
          const values = Array.isArray(src) ? src : typeof src === "object" ? Object.values(src) : [];
          for (const member of values) {
            const roles = Array.isArray(member == null ? void 0 : member.roles) ? member.roles : [];
            for (const rid of roles) {
              const key = String(rid);
              roleCounts[key] = (roleCounts[key] || 0) + 1;
            }
          }
          break;
        }
      } catch (_) {
      }
      for (const [roleId, role] of Object.entries(roleMap)) {
        if (!role) continue;
        const bits = toBigInt2(role.permissions);
        if (bits === 0n) continue;
        let tier;
        if (ADMIN !== 0n && (bits & ADMIN) === ADMIN) tier = "S";
        else if (TIER_A_BITS !== 0n && (bits & TIER_A_BITS) !== 0n) tier = "A";
        else if (TIER_B_BITS !== 0n && (bits & TIER_B_BITS) !== 0n) tier = "B";
        else if (TIER_C_BITS !== 0n && (bits & TIER_C_BITS) !== 0n) tier = "C";
        else tier = "D";
        if (tier === "D" && String(roleId) === String(guildId)) continue;
        result[tier].push({
          id: roleId,
          name: role.name || roleId,
          memberCount: roleCounts[roleId] || 0
        });
      }
      for (const k of Object.keys(result)) {
        result[k].sort((a, b) => b.memberCount - a.memberCount);
      }
      return result;
    }
    module2.exports = {
      getCurrentUserPermissionSummary: getCurrentUserPermissionSummary2,
      getPermissionSummaryForMember: getPermissionSummaryForMember2,
      getStaffIntel: getStaffIntel2,
      isDetailedStaffIntelUnlocked: isDetailedStaffIntelUnlocked2,
      bandRolesByPower: bandRolesByPower2,
      toBigInt: toBigInt2
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

// src/ShadowRecon/intel-history.js
var require_intel_history = __commonJS({
  "src/ShadowRecon/intel-history.js"(exports2, module2) {
    var { acquireDispatcher } = require_dispatcher();
    var PLUGIN_NAME2 = "ShadowRecon";
    var _ringCache = /* @__PURE__ */ new Map();
    var _ringDirty = /* @__PURE__ */ new Set();
    var _ringFlushTimer = null;
    var _ringStopped = false;
    var FLUSH_DEBOUNCE_MS = 500;
    function flushRingBuffers2() {
      if (_ringFlushTimer !== null) {
        clearTimeout(_ringFlushTimer);
        _ringFlushTimer = null;
      }
      for (const key of _ringDirty) {
        try {
          const arr = _ringCache.get(key);
          if (Array.isArray(arr)) BdApi.Data.save(PLUGIN_NAME2, key, arr);
        } catch (_) {
        }
      }
      _ringDirty.clear();
    }
    function _scheduleFlush() {
      if (_ringStopped) return;
      if (_ringFlushTimer !== null) return;
      _ringFlushTimer = setTimeout(() => {
        _ringFlushTimer = null;
        if (!_ringStopped) flushRingBuffers2();
      }, FLUSH_DEBOUNCE_MS);
    }
    function clearRingCache2() {
      _ringStopped = true;
      if (_ringFlushTimer !== null) {
        clearTimeout(_ringFlushTimer);
        _ringFlushTimer = null;
      }
      _ringCache.clear();
      _ringDirty.clear();
      _ringStopped = false;
    }
    function ringRead2(key) {
      if (_ringCache.has(key)) return _ringCache.get(key);
      try {
        const raw = BdApi.Data.load(PLUGIN_NAME2, key);
        const arr = Array.isArray(raw) ? raw : [];
        _ringCache.set(key, arr);
        return arr;
      } catch (_) {
        _ringCache.set(key, []);
        return [];
      }
    }
    function ringWrite(key, arr, cap) {
      try {
        const trimmed = arr.length > cap ? arr.slice(arr.length - cap) : arr;
        _ringCache.set(key, trimmed);
        _ringDirty.add(key);
        _scheduleFlush();
        return trimmed;
      } catch (_) {
        return arr;
      }
    }
    function ringPush2(key, entry, cap, bucketFn) {
      const arr = ringRead2(key);
      if (typeof bucketFn === "function" && arr.length > 0) {
        const lastBucket = bucketFn(arr[arr.length - 1]);
        const newBucket = bucketFn(entry);
        if (lastBucket === newBucket) {
          arr[arr.length - 1] = entry;
          return ringWrite(key, arr, cap);
        }
      }
      arr.push(entry);
      return ringWrite(key, arr, cap);
    }
    function bucketHour2(entry) {
      return Math.floor(((entry == null ? void 0 : entry.t) || 0) / 36e5);
    }
    function bucketDay2(entry) {
      return Math.floor(((entry == null ? void 0 : entry.t) || 0) / 864e5);
    }
    function dispatcherSubscribe2(plugin, event, handler) {
      try {
        const dispatcher = acquireDispatcher();
        if (!dispatcher) return false;
        dispatcher.subscribe(event, handler);
        if (!Array.isArray(plugin._dispatcherSubs)) plugin._dispatcherSubs = [];
        plugin._dispatcherSubs.push({ dispatcher, event, handler });
        return true;
      } catch (_) {
        return false;
      }
    }
    function dispatcherUnsubscribeAll2(plugin) {
      const list = plugin == null ? void 0 : plugin._dispatcherSubs;
      if (!Array.isArray(list)) return;
      for (const { dispatcher, event, handler } of list) {
        try {
          dispatcher.unsubscribe(event, handler);
        } catch (_) {
        }
      }
      plugin._dispatcherSubs = [];
    }
    module2.exports = {
      ringRead: ringRead2,
      ringWrite,
      ringPush: ringPush2,
      flushRingBuffers: flushRingBuffers2,
      clearRingCache: clearRingCache2,
      bucketHour: bucketHour2,
      bucketDay: bucketDay2,
      dispatcherSubscribe: dispatcherSubscribe2,
      dispatcherUnsubscribeAll: dispatcherUnsubscribeAll2
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

// src/ShadowRecon/guild-visuals.js
var require_guild_visuals = __commonJS({
  "src/ShadowRecon/guild-visuals.js"(exports2, module2) {
    var dc = require_discord_classes();
    function getGuildsTarget(plugin) {
      if (plugin._guildsTargetCache && plugin._guildsTargetCache.isConnected) {
        return plugin._guildsTargetCache;
      }
      const target = document.querySelector('[data-list-id="guildsnav"]') || document.querySelector(`${dc.sel.guilds} ${dc.sel.scroller}`) || document.querySelector(dc.sel.guilds);
      plugin._guildsTargetCache = target;
      return target;
    }
    function isHorizontalGuildNav(plugin, target) {
      if (!target || typeof window === "undefined" || typeof window.getComputedStyle !== "function") return false;
      const cache = plugin._guildNavOrientationCache;
      const now = Date.now();
      if (cache.target === target && now - cache.measuredAt < plugin._guildNavOrientationCacheTTL) {
        return cache.horizontal;
      }
      let horizontal = false;
      const candidates = [target, target.firstElementChild, target.parentElement].filter(Boolean);
      for (const node of candidates) {
        try {
          const style = window.getComputedStyle(node);
          const direction = String((style == null ? void 0 : style.flexDirection) || "").toLowerCase();
          if (direction.startsWith("row")) {
            horizontal = true;
            break;
          }
        } catch (_) {
        }
      }
      if (!horizontal) {
        try {
          const rect = target.getBoundingClientRect();
          if (rect.width > rect.height * 1.3) horizontal = true;
        } catch (_) {
        }
      }
      cache.target = target;
      cache.measuredAt = now;
      cache.horizontal = horizontal;
      return horizontal;
    }
    function syncServerCounterWidgetOrientation(plugin, widget, target = null) {
      if (!widget) return false;
      const navTarget = target || getGuildsTarget(plugin);
      const horizontal = isHorizontalGuildNav(plugin, navTarget);
      const orientationFlag = horizontal ? "1" : "0";
      if (widget.dataset.shadowReconHorizontal !== orientationFlag) {
        widget.classList.toggle("shadow-recon-widget--rotated", horizontal);
        widget.dataset.shadowReconHorizontal = orientationFlag;
      }
      return horizontal;
    }
    function injectServerCounterWidget2(plugin, widgetId) {
      if (!plugin.settings.showServerCounterWidget) {
        removeServerCounterWidget2(plugin, widgetId);
        return;
      }
      const target = getGuildsTarget(plugin);
      if (!target) return;
      let widget = document.getElementById(widgetId);
      if (!widget) {
        widget = document.createElement("div");
        widget.id = widgetId;
        widget.className = "shadow-recon-widget";
        widget.addEventListener("mouseenter", () => showGuildTooltip(plugin, widget));
        widget.addEventListener("mouseleave", hideGuildTooltip);
        plugin._widgetClickHandler = () => {
          const guildId = plugin._getCurrentGuildId();
          if (guildId) plugin.openGuildDossier(guildId);
          else plugin._toast("Select a guild first", "warning");
        };
        plugin._widgetContextHandler = (event) => {
          event.preventDefault();
          plugin._toggleCurrentGuildMarkWithToast();
        };
        widget.addEventListener("click", plugin._widgetClickHandler);
        widget.addEventListener("contextmenu", plugin._widgetContextHandler);
        if (target.firstChild) target.insertBefore(widget, target.firstChild);
        else target.appendChild(widget);
      }
      updateServerCounterWidget2(plugin, widgetId, target);
    }
    function updateServerCounterWidget2(plugin, widgetId, target = null) {
      const widget = document.getElementById(widgetId);
      if (!widget) return;
      syncServerCounterWidgetOrientation(plugin, widget, target);
      const guildCount = plugin.getServerCount();
      const markedGuildCount = plugin._markedGuildIds.size;
      const markedTargetCount = plugin._getShadowDeploymentMap().size;
      const label = "\u260D Recon";
      if (widget.textContent !== label) {
        widget.textContent = label;
      }
      const hint = `Guilds: ${guildCount} | Marked: ${markedGuildCount} | Targets: ${markedTargetCount} | Left click: Open guild dossier | Right click: Recon/unrecon guild`;
      widget.setAttribute("data-shadow-recon-hint", hint);
    }
    function removeServerCounterWidget2(plugin, widgetId) {
      const widget = document.getElementById(widgetId);
      if (widget) {
        if (plugin._widgetClickHandler) widget.removeEventListener("click", plugin._widgetClickHandler);
        if (plugin._widgetContextHandler) widget.removeEventListener("contextmenu", plugin._widgetContextHandler);
        widget.remove();
      }
      plugin._widgetClickHandler = null;
      plugin._widgetContextHandler = null;
    }
    function safeNonNegativeInt(value) {
      const n = Number(value);
      return Number.isFinite(n) && n >= 0 ? Math.trunc(n) : null;
    }
    function readOnlineCountFromObject(obj) {
      if (!obj || typeof obj !== "object") return null;
      const keys = [
        "online",
        "onlineCount",
        "presence",
        "presenceCount",
        "approximatePresenceCount",
        "approximate_presence_count"
      ];
      for (const key of keys) {
        const parsed = safeNonNegativeInt(obj[key]);
        if (parsed !== null) return parsed;
      }
      return null;
    }
    function parseOnlineCountResult(result) {
      const direct = safeNonNegativeInt(result);
      if (direct !== null) return direct;
      return readOnlineCountFromObject(result);
    }
    function resolveOnlineCountFromMethod(plugin, countStore, guildId, methodRef) {
      if (typeof methodRef !== "function") return null;
      try {
        const parsed = parseOnlineCountResult(methodRef.call(countStore, guildId));
        if (parsed === null) return null;
        plugin._onlineCountMethod = methodRef;
        return parsed;
      } catch (_) {
        return null;
      }
    }
    function readOnlineCountFromMethodCache(plugin, countStore, guildId) {
      if (!plugin._onlineCountMethod) return null;
      const result = resolveOnlineCountFromMethod(
        plugin,
        countStore,
        guildId,
        plugin._onlineCountMethod
      );
      if (result !== null) return result;
      plugin._onlineCountMethod = null;
      return null;
    }
    function readOnlineCountFromMethodList(plugin, countStore, guildId, methodNames) {
      for (const methodName of methodNames) {
        const count = resolveOnlineCountFromMethod(plugin, countStore, guildId, countStore == null ? void 0 : countStore[methodName]);
        if (count !== null) return count;
      }
      return null;
    }
    function readOnlineCountFromStore(plugin, guildId) {
      const countStore = plugin._GuildMemberCountStore;
      if (!countStore || typeof countStore !== "object") return null;
      const cachedMethodCount = readOnlineCountFromMethodCache(plugin, countStore, guildId);
      if (cachedMethodCount !== null) return cachedMethodCount;
      const storeMethods = [
        "getOnlineCount",
        "getOnlineMemberCount",
        "getPresenceCount",
        "getMemberCounts",
        "getCounts",
        "getGuildCounts"
      ];
      return readOnlineCountFromMethodList(plugin, countStore, guildId, storeMethods);
    }
    function getGuildOnlineCount2(plugin, guildId, guild = null) {
      var _a, _b;
      if (!guildId) return 0;
      const fromStore = readOnlineCountFromStore(plugin, guildId);
      if (fromStore !== null) return fromStore;
      const activeGuild = guild || ((_b = (_a = plugin._GuildStore) == null ? void 0 : _a.getGuild) == null ? void 0 : _b.call(_a, guildId));
      const fromGuild = readOnlineCountFromObject(activeGuild);
      if (fromGuild !== null) return fromGuild;
      return 0;
    }
    function extractSnowflake(text, regex) {
      if (!text) return null;
      const match = String(text).match(regex);
      return match ? match[0] : null;
    }
    function getGuildHintNodes(plugin) {
      const scope = getGuildsTarget(plugin) || document;
      let nodes = scope.querySelectorAll('[data-list-item-id*="guild"]');
      if (!nodes.length && scope !== document) {
        nodes = document.querySelectorAll('[data-list-item-id*="guild"]');
      }
      return nodes;
    }
    function getGuildHintStats(plugin, guildId, guild) {
      var _a, _b;
      const memberCount = ((_b = (_a = plugin._GuildMemberCountStore) == null ? void 0 : _a.getMemberCount) == null ? void 0 : _b.call(_a, guildId)) || (guild == null ? void 0 : guild.memberCount) || (guild == null ? void 0 : guild.member_count) || 0;
      const online = getGuildOnlineCount2(plugin, guildId, guild);
      const marked = plugin.isGuildMarked(guildId);
      return { memberCount, online, marked };
    }
    function shouldSkipGuildHintUpdate(plugin, node, guildId, stats) {
      const cached = plugin._guildHintCache.get(guildId);
      if (!cached) return false;
      const unchanged = cached.memberCount === stats.memberCount && cached.online === stats.online && cached.marked === stats.marked;
      if (!unchanged) return false;
      return node.getAttribute("data-shadow-recon-title") === "1";
    }
    function getOrCreateTooltip() {
      let tooltip = document.getElementById("shadow-recon-tooltip");
      if (!tooltip) {
        tooltip = document.createElement("div");
        tooltip.id = "shadow-recon-tooltip";
        tooltip.className = "shadow-recon-tooltip";
        document.body.appendChild(tooltip);
      }
      return tooltip;
    }
    function positionTooltip(tooltip, anchor) {
      const rect = anchor.getBoundingClientRect();
      const tooltipRect = tooltip.getBoundingClientRect();
      const pad = 8;
      let left = rect.right + pad;
      let top = rect.top + rect.height / 2 - tooltipRect.height / 2;
      if (left + tooltipRect.width > window.innerWidth - pad) {
        left = rect.left - tooltipRect.width - pad;
      }
      if (top < pad) top = pad;
      if (top + tooltipRect.height > window.innerHeight - pad) {
        top = window.innerHeight - tooltipRect.height - pad;
      }
      tooltip.style.left = `${left}px`;
      tooltip.style.top = `${top}px`;
    }
    function showGuildTooltip(plugin, node) {
      const content = node.getAttribute("data-shadow-recon-hint");
      if (!content) return;
      const tooltip = getOrCreateTooltip();
      tooltip.textContent = "";
      const lines = content.split(" | ");
      for (const line of lines) {
        const row = document.createElement("div");
        row.className = "shadow-recon-tooltip-row";
        if (line.startsWith("[Marked]") || line.startsWith("[Unmarked]")) {
          const tag = document.createElement("span");
          tag.className = line.startsWith("[Marked]") ? "shadow-recon-tooltip-tag shadow-recon-tooltip-tag--marked" : "shadow-recon-tooltip-tag shadow-recon-tooltip-tag--unmarked";
          const bracketEnd = line.indexOf("]") + 1;
          tag.textContent = line.slice(0, bracketEnd);
          row.appendChild(tag);
          const rest = line.slice(bracketEnd).trim();
          if (rest) {
            const nameSpan = document.createElement("span");
            nameSpan.className = "shadow-recon-tooltip-name";
            nameSpan.textContent = ` ${rest}`;
            row.appendChild(nameSpan);
          }
        } else {
          row.textContent = line;
        }
        tooltip.appendChild(row);
      }
      tooltip.classList.add("shadow-recon-tooltip--visible");
      requestAnimationFrame(() => positionTooltip(tooltip, node));
    }
    function hideGuildTooltip() {
      const tooltip = document.getElementById("shadow-recon-tooltip");
      if (tooltip) tooltip.classList.remove("shadow-recon-tooltip--visible");
    }
    var _tooltipHandlerNodes = /* @__PURE__ */ new Map();
    function ensureTooltipHandlers(plugin, node) {
      if (node._shadowReconHoverBound) return;
      node._shadowReconHoverBound = true;
      const enterHandler = () => showGuildTooltip(plugin, node);
      const leaveHandler = hideGuildTooltip;
      node.addEventListener("mouseenter", enterHandler);
      node.addEventListener("mouseleave", leaveHandler);
      _tooltipHandlerNodes.set(node, { enter: enterHandler, leave: leaveHandler });
    }
    var GUILD_HINT_CACHE_TTL_MS = 5 * 60 * 1e3;
    function applyGuildHintTitle(plugin, node, guildId, guild, stats) {
      const markedLabel = stats.marked ? "[Marked]" : "[Unmarked]";
      const title = `${markedLabel} ${guild.name} | Online ${plugin._formatNumber(stats.online)} | Members ${plugin._formatNumber(stats.memberCount)}`;
      plugin._guildHintCache.set(guildId, { ...stats, _cachedAt: Date.now() });
      if (node.getAttribute("data-shadow-recon-hint") === title) return;
      node.removeAttribute("title");
      node.setAttribute("data-shadow-recon-hint", title);
      node.setAttribute("data-shadow-recon-title", "1");
      ensureTooltipHandlers(plugin, node);
    }
    function refreshGuildIconHints2(plugin, snowflakeRegex) {
      var _a, _b;
      if (!plugin.settings.showGuildHoverIntel) {
        plugin._guildHintCache.clear();
        clearGuildIconHints2();
        return;
      }
      const nodes = getGuildHintNodes(plugin);
      const now = Date.now();
      for (const node of nodes) {
        const raw = node.getAttribute("data-list-item-id") || "";
        const guildId = extractSnowflake(raw, snowflakeRegex);
        if (!guildId) continue;
        const guild = (_b = (_a = plugin._GuildStore) == null ? void 0 : _a.getGuild) == null ? void 0 : _b.call(_a, guildId);
        if (!guild) continue;
        const cached = plugin._guildHintCache.get(guildId);
        const cacheFresh = cached && cached._cachedAt && now - cached._cachedAt < GUILD_HINT_CACHE_TTL_MS;
        const domSynced = node.getAttribute("data-shadow-recon-title") === "1";
        if (cacheFresh && domSynced) {
          continue;
        }
        if (cacheFresh && !domSynced) {
          applyGuildHintTitle(plugin, node, guildId, guild, cached);
          continue;
        }
        const stats = getGuildHintStats(plugin, guildId, guild);
        if (shouldSkipGuildHintUpdate(plugin, node, guildId, stats)) continue;
        applyGuildHintTitle(plugin, node, guildId, guild, stats);
      }
    }
    function clearGuildIconHints2() {
      const nodes = document.querySelectorAll('[data-shadow-recon-title="1"]');
      for (const node of nodes) {
        node.removeAttribute("title");
        node.removeAttribute("data-shadow-recon-hint");
        node.removeAttribute("data-shadow-recon-title");
      }
      for (const [node, { enter, leave }] of _tooltipHandlerNodes) {
        try {
          node.removeEventListener("mouseenter", enter);
          node.removeEventListener("mouseleave", leave);
        } catch (_) {
        }
        node._shadowReconHoverBound = false;
      }
      _tooltipHandlerNodes.clear();
      removeGuildTooltip2();
    }
    function removeGuildTooltip2() {
      const tooltip = document.getElementById("shadow-recon-tooltip");
      if (tooltip) tooltip.remove();
    }
    module2.exports = {
      clearGuildIconHints: clearGuildIconHints2,
      getGuildOnlineCount: getGuildOnlineCount2,
      injectServerCounterWidget: injectServerCounterWidget2,
      refreshGuildIconHints: refreshGuildIconHints2,
      removeGuildTooltip: removeGuildTooltip2,
      removeServerCounterWidget: removeServerCounterWidget2,
      updateServerCounterWidget: updateServerCounterWidget2
    };
  }
});

// src/ShadowRecon/context-menu.js
var require_context_menu = __commonJS({
  "src/ShadowRecon/context-menu.js"(exports2, module2) {
    function buildStaffContextItems(plugin, BdApi2, userId, currentGuildId) {
      if (!plugin.settings.showStaffIntelInContextMenu) return [];
      const staff = plugin.getStaffIntel(userId, currentGuildId);
      if (!staff) return [];
      const detailedUnlocked = plugin.isDetailedStaffIntelUnlocked(currentGuildId);
      return [
        BdApi2.ContextMenu.buildItem({
          type: "text",
          label: `Shadow Recon: ${staff.label}`,
          disabled: true
        }),
        BdApi2.ContextMenu.buildItem({
          type: "text",
          label: detailedUnlocked ? "Shadow Recon: Open Staff Dossier" : "Shadow Recon: Staff Dossier (recon guild)",
          action: detailedUnlocked ? () => plugin.openStaffIntelModal(userId, currentGuildId) : void 0,
          disabled: !detailedUnlocked
        })
      ];
    }
    function buildMarkedTargetContextItems(plugin, BdApi2, userId, currentGuildId) {
      if (!plugin.settings.showMarkedTargetIntelInContext) return [];
      if (!plugin._canShowLimitedTargetIntel(userId, currentGuildId)) return [];
      const deployment = plugin._getShadowDeploymentMap().get(String(userId));
      return [
        BdApi2.ContextMenu.buildItem({
          type: "text",
          label: `Shadow Recon: Target Intel (Same Guild)${(deployment == null ? void 0 : deployment.shadowRank) ? ` [${deployment.shadowRank}]` : ""}`,
          action: () => plugin.openUserIntelModal(userId, currentGuildId)
        })
      ];
    }
    function buildUserContextReconItems2(plugin, BdApi2, userId, currentGuildId) {
      return [
        ...buildStaffContextItems(plugin, BdApi2, userId, currentGuildId),
        ...buildMarkedTargetContextItems(plugin, BdApi2, userId, currentGuildId)
      ];
    }
    function buildGuildReconActions2(plugin, BdApi2, guildId, guild = null) {
      if (!guildId) return [];
      const marked = plugin.isGuildMarked(guildId);
      const guildName = (guild == null ? void 0 : guild.name) || guildId;
      const items = [
        BdApi2.ContextMenu.buildItem({
          type: "text",
          label: marked ? "Unrecon Guild" : "Recon Guild",
          action: () => {
            const nextMarked = plugin.toggleGuildMark(guildId);
            plugin._toast(
              nextMarked ? `Recon enabled for guild: ${guildName}` : `Recon removed for guild: ${guildName}`,
              nextMarked ? "success" : "info"
            );
          }
        })
      ];
      if (marked) {
        items.push(
          BdApi2.ContextMenu.buildItem({
            type: "text",
            label: "Open Guild Dossier",
            action: () => plugin.openGuildDossier(guildId)
          })
        );
      }
      return items;
    }
    function getDirectContextChildrenArray(node) {
      var _a;
      if (Array.isArray(node)) return node;
      if (Array.isArray((_a = node == null ? void 0 : node.props) == null ? void 0 : _a.children)) return node.props.children;
      if (Array.isArray(node == null ? void 0 : node.children)) return node.children;
      return null;
    }
    function collectContextChildrenCandidates(node) {
      var _a;
      const candidates = [];
      if ((_a = node == null ? void 0 : node.props) == null ? void 0 : _a.children) candidates.push(node.props.children);
      if (node == null ? void 0 : node.children) candidates.push(node.children);
      if ((node == null ? void 0 : node.props) && typeof node.props === "object") {
        for (const value of Object.values(node.props)) {
          if (!value || value === node.props.children) continue;
          if (typeof value === "object") candidates.push(value);
        }
      }
      return candidates;
    }
    function resolveContextChildrenArray(node, depth = 0, seen = null) {
      if (!node || depth > 7) return null;
      if (!seen) seen = /* @__PURE__ */ new Set();
      if (typeof node !== "object") return null;
      if (seen.has(node)) return null;
      seen.add(node);
      const direct = getDirectContextChildrenArray(node);
      if (direct) return direct;
      for (const candidate of collectContextChildrenCandidates(node)) {
        const found = resolveContextChildrenArray(candidate, depth + 1, seen);
        if (found) return found;
      }
      return null;
    }
    function appendContextItems2(BdApi2, tree, items) {
      if (!Array.isArray(items) || items.length === 0) return;
      const target = resolveContextChildrenArray(tree);
      if (!target || !Array.isArray(target)) return;
      target.push(BdApi2.ContextMenu.buildItem({ type: "separator" }), ...items);
    }
    module2.exports = {
      appendContextItems: appendContextItems2,
      buildGuildReconActions: buildGuildReconActions2,
      buildUserContextReconItems: buildUserContextReconItems2
    };
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

// src/ShadowRecon/index.js
var { loadBdModuleFromPlugins } = require_bd_module_loader();
var { createToast } = require_toast();
var { loadSettings, saveSettings } = require_settings();
var PLUGIN_NAME = "ShadowRecon";
var PLUGIN_VERSION = "1.0.5";
var STYLE_ID = "shadow-recon-css";
var WIDGET_ID = "shadow-recon-widget";
var MODAL_ID = "shadow-recon-modal-root";
var SNOWFLAKE_RE = /\d{16,20}/;
var DEFAULT_SETTINGS = {
  loreLockedRecon: true,
  showServerCounterWidget: true,
  showGuildHoverIntel: true,
  showStaffIntelInContextMenu: true,
  showMarkedTargetIntelInContext: true,
  // Tier C dispatcher-subscriber features. Default OFF for privacy —
  // user opts in via settings panel toggles. Both subscribe to
  // PRESENCE_UPDATES; skirmish also subscribes to VOICE_STATE_UPDATES
  // and CHANNEL_SELECT. Strong gate: only marked targets in marked
  // guilds get tracked.
  enableSkirmishLog: false,
  enableAuraReading: false
};
var CHOKE_POINT_CACHE_TTL = 5 * 60 * 1e3;
var PATROL_RING_CAP = 168;
var MANA_RING_CAP = 90;
var SKIRMISH_RING_CAP = 200;
var AURA_RING_CAP = 100;
var IMPORTANT_PERMISSIONS = [
  "ADMINISTRATOR",
  "MANAGE_GUILD",
  "MANAGE_CHANNELS",
  "MANAGE_ROLES",
  "MANAGE_MESSAGES",
  "MANAGE_EVENTS",
  "MANAGE_THREADS",
  "BAN_MEMBERS",
  "KICK_MEMBERS",
  "VIEW_AUDIT_LOG",
  "MENTION_EVERYONE",
  "MODERATE_MEMBERS",
  "VIEW_CHANNEL",
  "SEND_MESSAGES",
  "CONNECT",
  "SPEAK"
];
var STAFF_PERMISSION_KEYS = [
  "ADMINISTRATOR",
  "MANAGE_GUILD",
  "MANAGE_CHANNELS",
  "MANAGE_ROLES",
  "MANAGE_MESSAGES",
  "BAN_MEMBERS",
  "KICK_MEMBERS",
  "MANAGE_EVENTS",
  "MANAGE_THREADS",
  "MODERATE_MEMBERS"
];
var PLATFORM_LABELS = {
  desktop: "Desktop",
  web: "Web",
  mobile: "Mobile",
  embedded: "Embedded"
};
var STATUS_LABELS = {
  online: "Online",
  idle: "Idle",
  dnd: "Do Not Disturb",
  offline: "Offline",
  invisible: "Invisible",
  streaming: "Streaming"
};
var _PluginUtils;
try {
  _PluginUtils = loadBdModuleFromPlugins("BetterDiscordPluginUtils.js");
} catch (_) {
  _PluginUtils = null;
}
var _humanizedPermCache = {};
var { buildSettingsPanel } = require_settings_panel();
var { getShadowReconCss } = require_styles();
var {
  createModal,
  buildKeyValueSection,
  buildPermissionsSection
} = require_modal_utils();
var {
  getPlatformIntel
} = require_target_intel();
var {
  getCurrentUserPermissionSummary,
  getPermissionSummaryForMember,
  getStaffIntel,
  isDetailedStaffIntelUnlocked,
  bandRolesByPower,
  toBigInt
} = require_permissions();
var {
  ringPush,
  ringRead,
  flushRingBuffers,
  clearRingCache,
  bucketHour,
  bucketDay,
  dispatcherSubscribe,
  dispatcherUnsubscribeAll
} = require_intel_history();
var {
  clearGuildIconHints,
  getGuildOnlineCount,
  injectServerCounterWidget,
  refreshGuildIconHints,
  removeGuildTooltip,
  removeServerCounterWidget,
  updateServerCounterWidget
} = require_guild_visuals();
var {
  appendContextItems,
  buildGuildReconActions,
  buildUserContextReconItems
} = require_context_menu();
var { onPresence } = require_presence_bus();
module.exports = class ShadowRecon {
  constructor() {
    this.settings = { ...DEFAULT_SETTINGS };
    this._markedGuildIds = /* @__PURE__ */ new Set();
    this._stopped = true;
    this._guildContextUnpatch = null;
    this._channelContextUnpatch = null;
    this._userContextUnpatch = null;
    this._refreshInterval = null;
    this._visualRefreshTimeout = null;
    this._modalEl = null;
    this._shadowCache = { timestamp: 0, map: /* @__PURE__ */ new Map(), diskFallbackDone: false };
    this._permissionBitsCache = null;
    this._allPermsBitsCache = void 0;
    this._onlineCountMethod = null;
    this._guildsTargetCache = null;
    this._guildHintCache = /* @__PURE__ */ new Map();
    this._guildNavOrientationCache = { target: null, measuredAt: 0, horizontal: false };
    this._guildNavOrientationCacheTTL = 1200;
    this._chokePointCache = /* @__PURE__ */ new Map();
    this._dispatcherSubs = [];
  }
  _clearRuntimeCaches() {
    var _a;
    this._permissionBitsCache = null;
    this._allPermsBitsCache = void 0;
    this._onlineCountMethod = null;
    this._guildsTargetCache = null;
    this._guildHintCache.clear();
    this._guildNavOrientationCache.target = null;
    this._guildNavOrientationCache.measuredAt = 0;
    this._guildNavOrientationCache.horizontal = false;
    if ((_a = this._shadowCache) == null ? void 0 : _a.map) this._shadowCache.map.clear();
    this._shadowCache.timestamp = 0;
    this._shadowCache.diskFallbackDone = false;
  }
  start() {
    var _a;
    this._toast = ((_a = _PluginUtils == null ? void 0 : _PluginUtils.createToastHelper) == null ? void 0 : _a.call(_PluginUtils, "shadowRecon")) || createToast();
    try {
      if (!this._stopped) this.stop({ silent: true });
      this._stopped = false;
      this.loadSettings();
      this.loadMarkedGuilds();
      this.initWebpack();
      this.injectCSS();
      this.patchGuildContextMenu();
      this.patchChannelContextMenu();
      this.patchUserContextMenu();
      this.injectServerCounterWidget();
      this.refreshGuildIconHints();
      this.startRefreshLoops();
      this.setupObserver();
      this.refreshDispatcherSubs();
      if (!document.getElementById(WIDGET_ID)) {
        const retryDelays = [800, 2e3, 5e3];
        this._startupRetryTimers = retryDelays.map(
          (delay) => setTimeout(() => {
            if (this._stopped) return;
            if (!document.getElementById(WIDGET_ID)) {
              this.injectServerCounterWidget();
              this.refreshGuildIconHints();
            }
          }, delay)
        );
      }
      this._toast(`${PLUGIN_NAME} v${PLUGIN_VERSION} - Recon online`, "info");
    } catch (err) {
      console.error(`[${PLUGIN_NAME}] Failed to start`, err);
      try {
        this.stop({ silent: true });
      } catch (_) {
      }
      this._toast(`${PLUGIN_NAME} failed to start: ${err.message}`, "error");
    }
  }
  stop(options = {}) {
    const { silent = false } = options;
    this._stopped = true;
    if (this._saveMarkedGuildsTimer) {
      clearTimeout(this._saveMarkedGuildsTimer);
      this._saveMarkedGuildsTimer = null;
    }
    if (this._startupRetryTimers) {
      this._startupRetryTimers.forEach((t) => clearTimeout(t));
      this._startupRetryTimers = null;
    }
    this.unpatchContextMenus();
    this.stopRefreshLoops();
    this.teardownObserver();
    this.removeServerCounterWidget();
    this.clearGuildIconHints();
    removeGuildTooltip();
    flushRingBuffers();
    clearRingCache();
    if (this._presenceUnsub) {
      this._presenceUnsub();
      this._presenceUnsub = null;
    }
    dispatcherUnsubscribeAll(this);
    this._chokePointCache.clear();
    this._clearRuntimeCaches();
    this.closeModal();
    BdApi.DOM.removeStyle(STYLE_ID);
    if (!silent) this._toast(`${PLUGIN_NAME} - Recon dismissed`, "info");
  }
  // ---- Data / Settings -------------------------------------------------
  loadSettings() {
    this.settings = loadSettings(PLUGIN_NAME, DEFAULT_SETTINGS);
  }
  saveSettings() {
    saveSettings(PLUGIN_NAME, this.settings);
  }
  loadMarkedGuilds() {
    try {
      const raw = BdApi.Data.load(PLUGIN_NAME, "markedGuildIds");
      this._markedGuildIds = new Set(Array.isArray(raw) ? raw.map(String) : []);
    } catch (err) {
      this._markedGuildIds = /* @__PURE__ */ new Set();
      console.error(`[${PLUGIN_NAME}] Failed loading marked guilds`, err);
    }
  }
  saveMarkedGuilds() {
    if (this._saveMarkedGuildsTimer) {
      clearTimeout(this._saveMarkedGuildsTimer);
    }
    const snapshot = Array.from(this._markedGuildIds);
    this._saveMarkedGuildsTimer = setTimeout(() => {
      this._saveMarkedGuildsTimer = null;
      try {
        BdApi.Data.save(PLUGIN_NAME, "markedGuildIds", snapshot);
      } catch (err) {
        console.error(`[${PLUGIN_NAME}] Failed saving marked guilds`, err);
      }
    }, 0);
  }
  isGuildMarked(guildId) {
    if (!guildId) return false;
    return this._markedGuildIds.has(String(guildId));
  }
  toggleGuildMark(guildId) {
    if (!guildId) return false;
    const id = String(guildId);
    const marked = this._markedGuildIds.has(id);
    if (marked) this._markedGuildIds.delete(id);
    else this._markedGuildIds.add(id);
    this.saveMarkedGuilds();
    this.refreshAllVisuals();
    return !marked;
  }
  _getCurrentGuildId() {
    var _a, _b;
    return ((_b = (_a = this._SelectedGuildStore) == null ? void 0 : _a.getGuildId) == null ? void 0 : _b.call(_a)) || null;
  }
  _toggleCurrentGuildMarkWithToast() {
    var _a, _b;
    const guildId = this._getCurrentGuildId();
    if (!guildId) {
      this._toast("Select a guild first", "warning");
      return null;
    }
    const marked = this.toggleGuildMark(guildId);
    const guild = (_b = (_a = this._GuildStore) == null ? void 0 : _a.getGuild) == null ? void 0 : _b.call(_a, guildId);
    this._toast(
      marked ? `Recon enabled for guild: ${(guild == null ? void 0 : guild.name) || guildId}` : `Recon removed for guild: ${(guild == null ? void 0 : guild.name) || guildId}`,
      marked ? "success" : "info"
    );
    return marked;
  }
  // ---- Webpack ---------------------------------------------------------
  initWebpack() {
    const { Webpack } = BdApi;
    this._GuildStore = Webpack.getStore("GuildStore");
    this._SelectedGuildStore = Webpack.getStore("SelectedGuildStore");
    this._SelectedChannelStore = Webpack.getStore("SelectedChannelStore");
    this._ChannelStore = Webpack.getStore("ChannelStore");
    this._GuildChannelStore = Webpack.getStore("GuildChannelStore");
    this._UserStore = Webpack.getStore("UserStore");
    this._PresenceStore = Webpack.getStore("PresenceStore");
    this._GuildMemberStore = Webpack.getStore("GuildMemberStore");
    this._GuildRoleStore = Webpack.getStore("GuildRoleStore");
    this._GuildMemberCountStore = Webpack.getStore("GuildMemberCountStore");
    this._SessionsStore = Webpack.getStore("SessionsStore");
    this._PermissionStore = Webpack.getStore("PermissionStore");
    this._PermissionsBits = Webpack.getModule((m) => m && typeof m === "object" && m.ADMINISTRATOR && m.VIEW_CHANNEL, { searchExports: true }) || Webpack.getByKeys("ADMINISTRATOR", "VIEW_CHANNEL");
    this._sortedGuildStore = Webpack.getStore("SortedGuildStore");
    this._EmojiStore = Webpack.getStore("EmojiStore");
    this._StickersStore = Webpack.getStore("StickersStore");
    this._SoundboardStore = Webpack.getStore("SoundboardStore");
    this._VoiceStateStore = Webpack.getStore("VoiceStateStore");
  }
  // ---- ShadowSenses Integration ---------------------------------------
  _getShadowDeploymentMap() {
    var _a, _b, _c;
    const now = Date.now();
    if (now - this._shadowCache.timestamp < 5e3) return this._shadowCache.map;
    const nextMap = /* @__PURE__ */ new Map();
    try {
      const plugin = BdApi.Plugins.isEnabled("ShadowSenses") && BdApi.Plugins.get("ShadowSenses");
      const instance = (plugin == null ? void 0 : plugin.instance) || null;
      const live = (_b = (_a = instance == null ? void 0 : instance.deploymentManager) == null ? void 0 : _a.getDeployments) == null ? void 0 : _b.call(_a);
      let deployments;
      if (Array.isArray(live)) {
        deployments = live;
      } else if (!this._shadowCache.diskFallbackDone) {
        deployments = ((_c = instance == null ? void 0 : instance.getDeployments) == null ? void 0 : _c.call(instance)) ?? BdApi.Data.load("ShadowSenses", "deployments") ?? [];
        this._shadowCache.diskFallbackDone = true;
      } else {
        deployments = [];
      }
      for (const dep of deployments) {
        const userId = String((dep == null ? void 0 : dep.targetUserId) || "");
        if (!userId) continue;
        nextMap.set(userId, dep);
      }
    } catch (err) {
      console.error(`[${PLUGIN_NAME}] Failed loading ShadowSenses deployments`, err);
    }
    this._shadowCache.timestamp = now;
    this._shadowCache.map = nextMap;
    return nextMap;
  }
  _isMarkedTarget(userId) {
    if (!userId) return false;
    return this._getShadowDeploymentMap().has(String(userId));
  }
  _isUserPresentInGuild(userId, guildId) {
    var _a, _b;
    if (!userId || !guildId) return false;
    try {
      return !!((_b = (_a = this._GuildMemberStore) == null ? void 0 : _a.getMember) == null ? void 0 : _b.call(_a, guildId, userId));
    } catch (_) {
      return false;
    }
  }
  _canShowLimitedTargetIntel(userId, guildId) {
    if (!this._isMarkedTarget(userId)) return false;
    return this._isUserPresentInGuild(userId, guildId);
  }
  // ---- Context Menus ---------------------------------------------------
  _resetContextPatch(unpatchKey) {
    const unpatch = this == null ? void 0 : this[unpatchKey];
    if (typeof unpatch !== "function") return;
    try {
      unpatch();
    } catch (_) {
    }
    this[unpatchKey] = null;
  }
  patchGuildContextMenu() {
    try {
      this._resetContextPatch("_guildContextUnpatch");
      this._guildContextUnpatch = BdApi.ContextMenu.patch("guild-context", (tree, props) => {
        var _a, _b;
        try {
          const guild = (props == null ? void 0 : props.guild) || ((_b = (_a = this._GuildStore) == null ? void 0 : _a.getGuild) == null ? void 0 : _b.call(_a, props == null ? void 0 : props.guildId));
          const guildId = (guild == null ? void 0 : guild.id) || (props == null ? void 0 : props.guildId);
          if (!guildId) return;
          const items = buildGuildReconActions(this, BdApi, guildId, guild);
          let groupedItem = null;
          try {
            groupedItem = BdApi.ContextMenu.buildItem({
              type: "submenu",
              label: "Shadow Recon",
              items
            });
          } catch (_) {
          }
          appendContextItems(BdApi, tree, groupedItem ? [groupedItem] : items);
        } catch (err) {
          console.error(`[${PLUGIN_NAME}] guild-context patch error`, err);
        }
      });
    } catch (err) {
      console.error(`[${PLUGIN_NAME}] Failed to patch guild-context`, err);
    }
  }
  patchChannelContextMenu() {
    try {
      this._resetContextPatch("_channelContextUnpatch");
      this._channelContextUnpatch = BdApi.ContextMenu.patch("channel-context", (tree, props) => {
        var _a, _b, _c, _d;
        try {
          const guildId = ((_a = props == null ? void 0 : props.channel) == null ? void 0 : _a.guild_id) || ((_b = props == null ? void 0 : props.channel) == null ? void 0 : _b.guildId) || (props == null ? void 0 : props.guildId) || this._getCurrentGuildId();
          if (!guildId) return;
          const guild = (_d = (_c = this._GuildStore) == null ? void 0 : _c.getGuild) == null ? void 0 : _d.call(_c, guildId);
          const marked = this.isGuildMarked(guildId);
          const items = [
            BdApi.ContextMenu.buildItem({
              type: "text",
              label: marked ? "Shadow Recon: Unrecon Current Guild" : "Shadow Recon: Recon Current Guild",
              action: () => {
                const nextMarked = this.toggleGuildMark(guildId);
                this._toast(
                  nextMarked ? `Recon enabled for guild: ${(guild == null ? void 0 : guild.name) || guildId}` : `Recon removed for guild: ${(guild == null ? void 0 : guild.name) || guildId}`,
                  nextMarked ? "success" : "info"
                );
              }
            }),
            BdApi.ContextMenu.buildItem({
              type: "text",
              label: "Shadow Recon: Open Current Guild Dossier",
              action: () => this.openGuildDossier(guildId)
            })
          ];
          appendContextItems(BdApi, tree, items);
        } catch (err) {
          console.error(`[${PLUGIN_NAME}] channel-context patch error`, err);
        }
      });
    } catch (err) {
      console.error(`[${PLUGIN_NAME}] Failed to patch channel-context`, err);
    }
  }
  patchUserContextMenu() {
    try {
      this._resetContextPatch("_userContextUnpatch");
      this._userContextUnpatch = BdApi.ContextMenu.patch("user-context", (tree, props) => {
        var _a, _b;
        try {
          const user = props == null ? void 0 : props.user;
          if (!(user == null ? void 0 : user.id)) return;
          const currentGuildId = (_b = (_a = this._SelectedGuildStore) == null ? void 0 : _a.getGuildId) == null ? void 0 : _b.call(_a);
          const items = buildUserContextReconItems(this, BdApi, user.id, currentGuildId);
          if (items.length > 0) appendContextItems(BdApi, tree, items);
        } catch (err) {
          console.error(`[${PLUGIN_NAME}] user-context patch error`, err);
        }
      });
    } catch (err) {
      console.error(`[${PLUGIN_NAME}] Failed to patch user-context`, err);
    }
  }
  unpatchContextMenus() {
    try {
      if (this._guildContextUnpatch) this._guildContextUnpatch();
    } catch (_) {
    }
    try {
      if (this._channelContextUnpatch) this._channelContextUnpatch();
    } catch (_) {
    }
    try {
      if (this._userContextUnpatch) this._userContextUnpatch();
    } catch (_) {
    }
    this._guildContextUnpatch = null;
    this._channelContextUnpatch = null;
    this._userContextUnpatch = null;
  }
  // ---- Visual Refresh --------------------------------------------------
  startRefreshLoops() {
    var _a, _b, _c, _d;
    this.stopRefreshLoops();
    try {
      const GuildStore = (_b = (_a = BdApi.Webpack).getStore) == null ? void 0 : _b.call(_a, "GuildStore");
      if (GuildStore && typeof GuildStore.addChangeListener === "function") {
        this._guildStoreListener = () => {
          if (this._stopped || document.hidden) return;
          this._queueVisualRefresh(0);
        };
        GuildStore.addChangeListener(this._guildStoreListener);
        this._guildStore = GuildStore;
      }
      const SelectedGuildStore = (_d = (_c = BdApi.Webpack).getStore) == null ? void 0 : _d.call(_c, "SelectedGuildStore");
      if (SelectedGuildStore && typeof SelectedGuildStore.addChangeListener === "function") {
        this._selGuildStoreListener = () => {
          if (this._stopped || document.hidden) return;
          this._queueVisualRefresh(0);
        };
        SelectedGuildStore.addChangeListener(this._selGuildStoreListener);
        this._selGuildStore = SelectedGuildStore;
      }
    } catch (_) {
    }
  }
  stopRefreshLoops() {
    if (this._guildStore && this._guildStoreListener) {
      try {
        this._guildStore.removeChangeListener(this._guildStoreListener);
      } catch (_) {
      }
      this._guildStore = null;
      this._guildStoreListener = null;
    }
    if (this._selGuildStore && this._selGuildStoreListener) {
      try {
        this._selGuildStore.removeChangeListener(this._selGuildStoreListener);
      } catch (_) {
      }
      this._selGuildStore = null;
      this._selGuildStoreListener = null;
    }
    if (this._visualRefreshTimeout) clearTimeout(this._visualRefreshTimeout);
    this._visualRefreshTimeout = null;
  }
  refreshAllVisuals() {
    if (this.settings.showServerCounterWidget && !document.getElementById(WIDGET_ID)) {
      this.injectServerCounterWidget();
    } else {
      this.updateServerCounterWidget();
    }
    this.refreshGuildIconHints();
  }
  _queueVisualRefresh(delayMs = 120) {
    if (this._visualRefreshTimeout) return;
    this._visualRefreshTimeout = setTimeout(() => {
      this._visualRefreshTimeout = null;
      if (this._stopped || document.hidden) return;
      this.refreshAllVisuals();
    }, Math.max(0, delayMs));
  }
  setupObserver() {
    try {
      if (this._layoutBusUnsub) return;
      if (_PluginUtils == null ? void 0 : _PluginUtils.LayoutObserverBus) {
        this._layoutBusUnsub = _PluginUtils.LayoutObserverBus.subscribe("ShadowRecon", () => {
          if (this._stopped || document.hidden) return;
          this._queueVisualRefresh(120);
        }, 500);
      } else if (!this._layoutBusWarned) {
        this._layoutBusWarned = true;
        console.warn(`[${PLUGIN_NAME}] LayoutObserverBus unavailable (PluginUtils missing) \u2014 guild visual hints will not auto-refresh on layout changes`);
      }
    } catch (err) {
      console.error(`[${PLUGIN_NAME}] Failed observer setup`, err);
    }
  }
  teardownObserver() {
    if (this._layoutBusUnsub) {
      this._layoutBusUnsub();
      this._layoutBusUnsub = null;
    }
  }
  // ---- Server Counter Widget ------------------------------------------
  injectServerCounterWidget() {
    return injectServerCounterWidget(this, WIDGET_ID);
  }
  updateServerCounterWidget(target = null) {
    return updateServerCounterWidget(this, WIDGET_ID, target);
  }
  removeServerCounterWidget() {
    return removeServerCounterWidget(this, WIDGET_ID);
  }
  _getGuildOnlineCount(guildId, guild = null) {
    return getGuildOnlineCount(this, guildId, guild);
  }
  // ---- Guild Hover Intel ----------------------------------------------
  refreshGuildIconHints() {
    return refreshGuildIconHints(this, SNOWFLAKE_RE);
  }
  clearGuildIconHints() {
    return clearGuildIconHints();
  }
  // ---- Guild Dossier ---------------------------------------------------
  openGuildDossier(guildId) {
    var _a, _b;
    this.closeModal();
    const guild = (_b = (_a = this._GuildStore) == null ? void 0 : _a.getGuild) == null ? void 0 : _b.call(_a, guildId);
    if (!guild) {
      this._toast("Guild intel unavailable", "error");
      return;
    }
    const marked = this.isGuildMarked(guildId);
    const intel = this.getGuildIntel(guildId);
    const createdTs = this._safeTimestampFromSnowflake(guild.id);
    const joinedTs = (guild == null ? void 0 : guild.joinedAt) ? new Date(guild.joinedAt).getTime() : 0;
    const staffSnapshot = this._collectStaffSnapshot(guildId, 20);
    const overlay = this._createModal(`Shadow Recon - Guild Dossier`, `${guild.name}${marked ? " [Marked]" : " [Unmarked]"}`);
    const body = overlay.querySelector(".shadow-recon-modal-body");
    body.appendChild(this._buildKeyValueSection("Guild Baseline", [
      ["Guild ID", guild.id],
      ["Owner", intel.ownerName],
      ["Created", intel.createdAt],
      ["Joined", intel.joinedAt],
      ["Guild Age", this._formatElapsedSince(createdTs)],
      ["Your Tenure", this._formatElapsedSince(joinedTs)]
    ]));
    body.appendChild(this._buildKeyValueSection("Member Snapshot", [
      ["Total Members", this._formatNumber(intel.memberCount)],
      ["Online Members", this._formatNumber(intel.onlineCount)]
    ]));
    if (marked) this._recordManaPulse(guildId, intel.memberCount);
    const manaHistory = this._getManaPulseHistory(guildId);
    if (manaHistory.length > 1) {
      const sorted = [...manaHistory].sort((a, b) => a.t - b.t);
      const oldest = sorted[0];
      const newest = sorted[sorted.length - 1];
      const delta = (newest.count || 0) - (oldest.count || 0);
      const span = Math.max(1, Math.round((newest.t - oldest.t) / 864e5));
      let min = Infinity, max = -Infinity;
      for (const e of sorted) {
        if (e.count < min) min = e.count;
        if (e.count > max) max = e.count;
      }
      body.appendChild(this._buildKeyValueSection("Member Count History", [
        ["Tracking Window", `Last ${span} day${span === 1 ? "" : "s"} (${sorted.length} samples)`],
        ["Net Change", `${delta >= 0 ? "+" : ""}${this._formatNumber(delta)} members`],
        ["Range", `${this._formatNumber(min)} \u2192 ${this._formatNumber(max)}`]
      ]));
    }
    const features = intel.featuresList || [];
    body.appendChild(this._buildKeyValueSection("Boost & Features", [
      ["Boost Tier", `Tier ${intel.premiumTier || 0}`],
      ["Active Boosts", this._formatNumber(intel.premiumSubscriptionCount)],
      ["Server Features", features.length > 0 ? features.slice(0, 8).join(", ") : "None"],
      ...features.length > 8 ? [["+more", `${features.length - 8} additional`]] : [],
      ...intel.description ? [["Description", String(intel.description).slice(0, 120)]] : []
    ]));
    body.appendChild(this._buildKeyValueSection("Custom Assets", [
      ["Custom Emoji", this._formatNumber(intel.emojiCount)],
      ["Custom Stickers", this._formatNumber(intel.stickerCount)],
      ["Soundboard Sounds", this._formatNumber(intel.soundboardCount)]
    ]));
    const terrain = this._surveyGuildChannels(guildId);
    body.appendChild(this._buildKeyValueSection("Channel Breakdown", [
      ["Total Channels", this._formatNumber(terrain.total)],
      ["Visible / Locked", `${this._formatNumber(terrain.visible)} / ${this._formatNumber(terrain.locked)}`],
      ["Text", this._formatNumber(terrain.byType.text)],
      ["Voice", this._formatNumber(terrain.byType.voice)],
      ["Forum", this._formatNumber(terrain.byType.forum)],
      ["Announcement", this._formatNumber(terrain.byType.announcement)],
      ["Stage", this._formatNumber(terrain.byType.stage)],
      ["Categories", this._formatNumber(terrain.byType.category)]
    ]));
    const verifLabels = ["None", "Low", "Medium", "High", "Very High"];
    const nsfwLabels = ["Default", "Explicit", "Safe", "Age-Restricted"];
    const filterLabels = ["Disabled", "Members Without Roles", "All Members"];
    body.appendChild(this._buildKeyValueSection("Server Verification", [
      ["Vanity URL", intel.vanityURLCode ? `discord.gg/${intel.vanityURLCode}` : "None"],
      ["Verification Level", intel.verificationLevel != null ? verifLabels[intel.verificationLevel] || `Level ${intel.verificationLevel}` : "Unknown"],
      ["2FA Required for Mod", intel.mfaLevel === 1 ? "Yes" : intel.mfaLevel === 0 ? "No" : "Unknown"],
      ["Age Rating", intel.nsfwLevel != null ? nsfwLabels[intel.nsfwLevel] || `Level ${intel.nsfwLevel}` : "Unknown"],
      ["Content Filter", intel.explicitContentFilter != null ? filterLabels[intel.explicitContentFilter] || `Level ${intel.explicitContentFilter}` : "Unknown"]
    ]));
    const choke = this._getChokePoints(guildId);
    const chokeRows = [
      ["Channels You Can View", this._formatNumber(choke.viewable)],
      ["Channels You Can Post In", this._formatNumber(choke.sendable)],
      ["Voice Channels You Can Join", this._formatNumber(choke.connectable)]
    ];
    if (choke.blocked.length > 0) {
      chokeRows.push(["Locked to You", `${choke.blocked.length} channel${choke.blocked.length === 1 ? "" : "s"}`]);
      for (const b of choke.blocked.slice(0, 6)) {
        chokeRows.push([" - Locked", b.name]);
      }
    }
    body.appendChild(this._buildKeyValueSection("Your Channel Access", chokeRows));
    body.appendChild(this._buildPermissionsSection("Your Effective Authority", intel.currentUserPermissionSummary));
    if (marked) this._recordPatrolSample(guildId, staffSnapshot.onlineCount);
    const patrol = this._getPatrolStats(guildId);
    if (patrol && (patrol.last24h || patrol.last7d)) {
      const rows = [];
      if (patrol.last24h) rows.push(["Last 24h", `min ${patrol.last24h.min} / avg ${patrol.last24h.avg} / max ${patrol.last24h.max} (${patrol.last24h.samples} samples)`]);
      if (patrol.last7d) rows.push(["Last 7d", `min ${patrol.last7d.min} / avg ${patrol.last7d.avg} / max ${patrol.last7d.max} (${patrol.last7d.samples} samples)`]);
      rows.push(["Sample Count", this._formatNumber(patrol.totalSamples)]);
      body.appendChild(this._buildKeyValueSection("Staff Online History", rows));
    }
    body.appendChild(this._buildKeyValueSection("Staff Presence Snapshot", [
      ["Owner", intel.ownerName],
      ["Loaded Staff Online", this._formatNumber(staffSnapshot.onlineCount)],
      ["Loaded Staff Total", this._formatNumber(staffSnapshot.totalCount)],
      ["Scanned Members", `${this._formatNumber(staffSnapshot.scannedCount)}${staffSnapshot.truncated ? "+" : ""}`]
    ]));
    body.appendChild(this._buildKeyValueSection(
      "Staff Map (Loaded Cache)",
      staffSnapshot.rows.length > 0 ? staffSnapshot.rows : [["Staff", "No elevated staff members in current cache"]]
    ));
    const bands = this._bandRolesByPower(guildId);
    const bandRows = [];
    for (const tier of ["S", "A", "B", "C", "D"]) {
      const list = bands[tier];
      if (!list || list.length === 0) continue;
      bandRows.push([`Tier ${tier}`, `${list.length} role${list.length === 1 ? "" : "s"}`]);
      for (const r of list.slice(0, 3)) {
        bandRows.push([` - ${r.name}`, r.memberCount > 0 ? `${this._formatNumber(r.memberCount)} member${r.memberCount === 1 ? "" : "s"}` : "\u2014"]);
      }
    }
    if (bandRows.length === 0) {
      bandRows.push(["No mod roles", "Only the owner has elevated power here"]);
      bandRows.push(["What this means", "No roles in this server grant moderation perms (kick/ban/manage). Cosmetic roles and @everyone are excluded."]);
    }
    body.appendChild(this._buildKeyValueSection("Role Permission Tiers", bandRows));
    const camps = this._getVoiceEncampments(guildId);
    if (camps.length > 0) {
      const campRows = camps.slice(0, 8).map((c) => [c.channelName, `${this._formatNumber(c.occupantCount)} member${c.occupantCount === 1 ? "" : "s"}`]);
      if (camps.length > 8) campRows.push(["+more", `${camps.length - 8} additional`]);
      body.appendChild(this._buildKeyValueSection("Active Voice Channels", campRows));
    }
    if (this.settings.loreLockedRecon && !marked) {
      body.appendChild(this._buildKeyValueSection("Briefing", [
        ["Mode", "Lore lock is enabled. Extended dossiers remain limited until this guild is marked."]
      ]));
    }
  }
  _collectLoadedGuildMembers(guildId, maxScan = 500) {
    var _a, _b, _c, _d, _e, _f, _g, _h;
    const out = [];
    const seen = /* @__PURE__ */ new Set();
    const sources = [
      (_b = (_a = this._GuildMemberStore) == null ? void 0 : _a.getMembers) == null ? void 0 : _b.call(_a, guildId),
      (_d = (_c = this._GuildMemberStore) == null ? void 0 : _c.getMutableGuildMembers) == null ? void 0 : _d.call(_c, guildId),
      (_f = (_e = this._GuildMemberStore) == null ? void 0 : _e.members) == null ? void 0 : _f[guildId],
      (_h = (_g = this._GuildMemberStore) == null ? void 0 : _g.guildMemberMap) == null ? void 0 : _h[guildId]
    ];
    for (const source of sources) {
      if (!source) continue;
      const values = Array.isArray(source) ? source : typeof source === "object" ? Object.values(source) : [];
      for (const member of values) {
        const userId = String((member == null ? void 0 : member.userId) || (member == null ? void 0 : member.user_id) || (member == null ? void 0 : member.id) || "").trim();
        if (!userId || seen.has(userId)) continue;
        seen.add(userId);
        out.push({ userId, member });
        if (out.length >= maxScan) return { members: out, truncated: true };
      }
    }
    return { members: out, truncated: false };
  }
  _collectStaffSnapshot(guildId, listLimit = 20) {
    var _a, _b, _c, _d;
    const { members, truncated } = this._collectLoadedGuildMembers(guildId, 500);
    const rows = [];
    let totalCount = 0;
    let onlineCount = 0;
    for (const { userId, member } of members) {
      const staff = this.getStaffIntel(userId, guildId);
      if (!staff) continue;
      totalCount += 1;
      const statusRaw = String(((_b = (_a = this._PresenceStore) == null ? void 0 : _a.getStatus) == null ? void 0 : _b.call(_a, userId)) || "offline").toLowerCase();
      const isOnline = statusRaw !== "offline" && statusRaw !== "invisible";
      if (isOnline) onlineCount += 1;
      if (rows.length < listLimit) {
        const user = (_d = (_c = this._UserStore) == null ? void 0 : _c.getUser) == null ? void 0 : _d.call(_c, userId);
        const displayName = (user == null ? void 0 : user.globalName) || (user == null ? void 0 : user.username) || (member == null ? void 0 : member.nick) || userId;
        rows.push([`${displayName} (${staff.label})`, this._capitalize(statusRaw)]);
      }
    }
    return {
      rows,
      totalCount,
      onlineCount,
      scannedCount: members.length,
      truncated
    };
  }
  _safeTimestampFromSnowflake(id) {
    const num = this._toBigInt(id);
    if (num === 0n) return 0;
    const discordEpoch = 1420070400000n;
    const ts = Number((num >> 22n) + discordEpoch);
    if (!Number.isFinite(ts) || ts <= 0) return 0;
    return ts;
  }
  _formatElapsedSince(timestampMs) {
    const ts = Number(timestampMs);
    if (!Number.isFinite(ts) || ts <= 0) return "Unknown";
    const delta = Date.now() - ts;
    if (!Number.isFinite(delta) || delta < 0) return "Unknown";
    const minutes = Math.floor(delta / 6e4);
    if (minutes < 60) return `${minutes}m`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h`;
    const days = Math.floor(hours / 24);
    if (days < 30) return `${days}d`;
    const months = Math.floor(days / 30);
    if (months < 24) return `${months}mo`;
    return `${Math.floor(months / 12)}y`;
  }
  _getGuildOwner(guild) {
    var _a, _b;
    if (!guild) return null;
    return ((_b = (_a = this._UserStore) == null ? void 0 : _a.getUser) == null ? void 0 : _b.call(_a, guild.ownerId)) || null;
  }
  _getGuildOwnerName(owner, guild) {
    if (owner) return owner.globalName || owner.username || owner.id;
    return (guild == null ? void 0 : guild.ownerId) || "Unknown";
  }
  _getGuildJoinedAtLabel(guild) {
    return (guild == null ? void 0 : guild.joinedAt) ? new Date(guild.joinedAt).toLocaleString() : "Unknown";
  }
  _getGuildRoleCount(guild) {
    return (guild == null ? void 0 : guild.roles) ? Object.keys(guild.roles).length : 0;
  }
  _getGuildMemberCount(guildId, guild) {
    var _a, _b;
    return ((_b = (_a = this._GuildMemberCountStore) == null ? void 0 : _a.getMemberCount) == null ? void 0 : _b.call(_a, guildId)) || (guild == null ? void 0 : guild.memberCount) || (guild == null ? void 0 : guild.member_count) || 0;
  }
  _getGuildFeaturesLabel(guild) {
    const features = guild == null ? void 0 : guild.features;
    if (!Array.isArray(features) || features.length === 0) return "None";
    return features.slice(0, 8).join(", ");
  }
  _getGuildPreferredLocale(guild) {
    return (guild == null ? void 0 : guild.preferredLocale) || (guild == null ? void 0 : guild.preferred_locale) || "";
  }
  getGuildIntel(guildId) {
    var _a, _b;
    const guild = (_b = (_a = this._GuildStore) == null ? void 0 : _a.getGuild) == null ? void 0 : _b.call(_a, guildId);
    const owner = this._getGuildOwner(guild);
    const createdAt = this._safeDateFromSnowflake(guild == null ? void 0 : guild.id);
    const joinedAt = this._getGuildJoinedAtLabel(guild);
    const channelCount = this._countGuildChannels(guildId);
    const roleCount = this._getGuildRoleCount(guild);
    const memberCount = this._getGuildMemberCount(guildId, guild);
    const onlineCount = this._getGuildOnlineCount(guildId, guild);
    const permissionSummary = this.getCurrentUserPermissionSummary(guildId);
    return {
      ownerName: this._getGuildOwnerName(owner, guild),
      createdAt,
      joinedAt,
      premiumTier: (guild == null ? void 0 : guild.premiumTier) || 0,
      premiumSubscriptionCount: (guild == null ? void 0 : guild.premiumSubscriptionCount) || 0,
      roleCount,
      channelCount,
      featuresLabel: this._getGuildFeaturesLabel(guild),
      featuresList: Array.isArray(guild == null ? void 0 : guild.features) ? guild.features : [],
      memberCount,
      onlineCount,
      description: (guild == null ? void 0 : guild.description) || "",
      emojiCount: this._countGuildEmojis(guildId, guild),
      stickerCount: this._countGuildStickers(guildId, guild),
      soundboardCount: this._countGuildSoundboard(guildId),
      preferredLocale: this._getGuildPreferredLocale(guild),
      // Sigil Provenance fields (Tier B item 7) — read-only metadata
      // already on the `guild` object, just never previously surfaced.
      vanityURLCode: (guild == null ? void 0 : guild.vanityURLCode) || (guild == null ? void 0 : guild.vanity_url_code) || null,
      verificationLevel: typeof (guild == null ? void 0 : guild.verificationLevel) === "number" ? guild.verificationLevel : null,
      mfaLevel: typeof (guild == null ? void 0 : guild.mfaLevel) === "number" ? guild.mfaLevel : null,
      nsfwLevel: typeof (guild == null ? void 0 : guild.nsfwLevel) === "number" ? guild.nsfwLevel : null,
      explicitContentFilter: typeof (guild == null ? void 0 : guild.explicitContentFilter) === "number" ? guild.explicitContentFilter : null,
      currentUserPermissionSummary: permissionSummary
    };
  }
  // ─── Tier A (item 1): Terrain Survey ────────────────────────────────
  // Channel topology breakdown by type + locked-vs-visible split (using
  // the current user's VIEW_CHANNEL permission). Replaces the single
  // integer count from _countGuildChannels with a structured survey.
  _surveyGuildChannels(guildId) {
    var _a, _b, _c, _d;
    const survey = {
      total: 0,
      visible: 0,
      locked: 0,
      byType: { text: 0, voice: 0, forum: 0, announcement: 0, stage: 0, category: 0, thread: 0, media: 0, other: 0 }
    };
    try {
      const grouped = (_b = (_a = this._GuildChannelStore) == null ? void 0 : _a.getChannels) == null ? void 0 : _b.call(_a, guildId);
      if (!grouped || typeof grouped !== "object") return survey;
      const VIEW_CHANNEL_BIT = ((_c = this._PermissionsBits) == null ? void 0 : _c.VIEW_CHANNEL) || 0n;
      for (const bucket of Object.values(grouped)) {
        if (!Array.isArray(bucket)) continue;
        for (const entry of bucket) {
          const channel = entry == null ? void 0 : entry.channel;
          if (!channel) continue;
          survey.total += 1;
          const t = Number(channel.type);
          if (t === 0) survey.byType.text += 1;
          else if (t === 2) survey.byType.voice += 1;
          else if (t === 4) survey.byType.category += 1;
          else if (t === 5) survey.byType.announcement += 1;
          else if (t === 13) survey.byType.stage += 1;
          else if (t === 15) survey.byType.forum += 1;
          else if (t === 16) survey.byType.media += 1;
          else if (t === 10 || t === 11 || t === 12) survey.byType.thread += 1;
          else survey.byType.other += 1;
          let visible = true;
          try {
            if (((_d = this._PermissionStore) == null ? void 0 : _d.can) && VIEW_CHANNEL_BIT) {
              visible = !!this._PermissionStore.can(VIEW_CHANNEL_BIT, channel);
            }
          } catch (_) {
          }
          if (visible) survey.visible += 1;
          else survey.locked += 1;
        }
      }
    } catch (_) {
    }
    return survey;
  }
  // ─── Tier B (item 5): Threat Tier Roster ────────────────────────────
  _bandRolesByPower(guildId) {
    return bandRolesByPower(this, guildId);
  }
  // ─── Tier B (item 6): Voice Encampments ──────────────────────────────
  // List currently-occupied voice channels in this guild with occupant
  // counts. Pure live read from VoiceStateStore + ChannelStore — no
  // persistence, no subscription.
  _getVoiceEncampments(guildId) {
    var _a, _b, _c, _d, _e, _f, _g;
    const encampments = [];
    try {
      const states = ((_b = (_a = this._VoiceStateStore) == null ? void 0 : _a.getVoiceStatesForGuild) == null ? void 0 : _b.call(_a, guildId)) || ((_e = (_d = (_c = this._VoiceStateStore) == null ? void 0 : _c.getAllVoiceStates) == null ? void 0 : _d.call(_c)) == null ? void 0 : _e[guildId]);
      if (!states || typeof states !== "object") return encampments;
      const occupantsByChannel = /* @__PURE__ */ new Map();
      for (const state of Object.values(states)) {
        const channelId = state == null ? void 0 : state.channelId;
        if (!channelId) continue;
        const arr = occupantsByChannel.get(channelId) || [];
        arr.push(state);
        occupantsByChannel.set(channelId, arr);
      }
      for (const [channelId, occupants] of occupantsByChannel) {
        const channel = (_g = (_f = this._ChannelStore) == null ? void 0 : _f.getChannel) == null ? void 0 : _g.call(_f, channelId);
        encampments.push({
          channelId,
          channelName: (channel == null ? void 0 : channel.name) || channelId,
          occupantCount: occupants.length
        });
      }
      encampments.sort((a, b) => b.occupantCount - a.occupantCount);
    } catch (_) {
    }
    return encampments;
  }
  // ─── Tier B (item 4): Patrol Patterns ────────────────────────────────
  // Sample staff-online count per dossier-open into a 1-week hourly ring.
  _recordPatrolSample(guildId, onlineStaffCount) {
    if (!guildId) return;
    ringPush(
      `intel:patrol:${guildId}`,
      { t: Date.now(), online: Number(onlineStaffCount) || 0 },
      PATROL_RING_CAP,
      bucketHour
    );
  }
  _getPatrolStats(guildId) {
    const ring = ringRead(`intel:patrol:${guildId}`);
    if (ring.length === 0) return null;
    const now = Date.now();
    const last24h = ring.filter((e) => now - e.t <= 864e5);
    const last7d = ring.filter((e) => now - e.t <= 6048e5);
    const stat = (arr) => {
      if (arr.length === 0) return null;
      let min = Infinity, max = -Infinity, sum = 0;
      for (const e of arr) {
        const v = Number(e.online) || 0;
        if (v < min) min = v;
        if (v > max) max = v;
        sum += v;
      }
      return { min, max, avg: Math.round(sum / arr.length), samples: arr.length };
    };
    return { last24h: stat(last24h), last7d: stat(last7d), totalSamples: ring.length };
  }
  // ─── Tier C (item 10): Choke Points ──────────────────────────────────
  // Per-channel permission map for the current user, cached 5 min.
  _getChokePoints(guildId) {
    var _a, _b, _c, _d, _e, _f;
    const cached = this._chokePointCache.get(guildId);
    if (cached && Date.now() - cached.ts < CHOKE_POINT_CACHE_TTL) return cached.data;
    const data = { viewable: 0, sendable: 0, connectable: 0, blocked: [] };
    try {
      const grouped = (_b = (_a = this._GuildChannelStore) == null ? void 0 : _a.getChannels) == null ? void 0 : _b.call(_a, guildId);
      if (!grouped || typeof grouped !== "object") return data;
      const VIEW = ((_c = this._PermissionsBits) == null ? void 0 : _c.VIEW_CHANNEL) || 0n;
      const SEND = ((_d = this._PermissionsBits) == null ? void 0 : _d.SEND_MESSAGES) || 0n;
      const CONN = ((_e = this._PermissionsBits) == null ? void 0 : _e.CONNECT) || 0n;
      for (const bucket of Object.values(grouped)) {
        if (!Array.isArray(bucket)) continue;
        for (const entry of bucket) {
          const channel = entry == null ? void 0 : entry.channel;
          if (!channel) continue;
          if (Number(channel.type) === 4) continue;
          const can = (_f = this._PermissionStore) == null ? void 0 : _f.can;
          const canView = can && VIEW ? !!can(VIEW, channel) : true;
          const canSend = can && SEND ? !!can(SEND, channel) : true;
          const canConn = can && CONN ? !!can(CONN, channel) : true;
          if (canView) data.viewable += 1;
          if (canSend) data.sendable += 1;
          if (canConn && (Number(channel.type) === 2 || Number(channel.type) === 13)) data.connectable += 1;
          if (!canView && data.blocked.length < 12) {
            data.blocked.push({ name: channel.name || channel.id, type: Number(channel.type) });
          }
        }
      }
    } catch (_) {
    }
    this._chokePointCache.set(guildId, { ts: Date.now(), data });
    return data;
  }
  // ─── Tier C (item 11): Mana Pulse ────────────────────────────────────
  // Daily member-count snapshot, 90 days cap.
  _recordManaPulse(guildId, memberCount) {
    if (!guildId) return;
    ringPush(
      `intel:mana:${guildId}`,
      { t: Date.now(), count: Number(memberCount) || 0 },
      MANA_RING_CAP,
      bucketDay
    );
  }
  _getManaPulseHistory(guildId) {
    return ringRead(`intel:mana:${guildId}`);
  }
  // ─── Tier C (items 8/9): Skirmish Log + Aura Reading dispatcher ─────
  // Single PRESENCE_UPDATES handler that branches on which settings are
  // on. Filtered by `_isMarkedTarget` AND `_isUserPresentInGuild` so we
  // only pay the cost for users we care about.
  refreshDispatcherSubs() {
    dispatcherUnsubscribeAll(this);
    if (this._stopped) return;
    const wantSkirmish = !!this.settings.enableSkirmishLog;
    const wantAura = !!this.settings.enableAuraReading;
    if (!wantSkirmish && !wantAura) return;
    if (this._presenceUnsub) {
      this._presenceUnsub();
      this._presenceUnsub = null;
    }
    const presenceHandler = (action) => {
      try {
        this._onPresenceUpdate(action);
      } catch (_) {
      }
    };
    this._presenceUnsub = onPresence("PRESENCE_UPDATES", presenceHandler);
    if (wantSkirmish) {
      const voiceHandler = (action) => {
        try {
          this._onVoiceStateUpdate(action);
        } catch (_) {
        }
      };
      dispatcherSubscribe(this, "VOICE_STATE_UPDATES", voiceHandler);
      const channelHandler = (action) => {
        try {
          this._onChannelSelect(action);
        } catch (_) {
        }
      };
      dispatcherSubscribe(this, "CHANNEL_SELECT", channelHandler);
    }
  }
  // Discord wraps PRESENCE_UPDATES around a `updates` array of records.
  _onPresenceUpdate(action) {
    var _a, _b;
    const deploymentMap = this._getShadowDeploymentMap();
    if (deploymentMap.size === 0) return;
    const wantSkirmish = this.settings.enableSkirmishLog;
    const wantAura = this.settings.enableAuraReading;
    if (!wantSkirmish && !wantAura) return;
    const updates = Array.isArray(action == null ? void 0 : action.updates) ? action.updates : [action];
    for (const upd of updates) {
      const rawId = ((_a = upd == null ? void 0 : upd.user) == null ? void 0 : _a.id) || (upd == null ? void 0 : upd.userId);
      if (!rawId) continue;
      const userId = String(rawId);
      if (!deploymentMap.has(userId)) continue;
      const guildId = (upd == null ? void 0 : upd.guildId) || (upd == null ? void 0 : upd.guild_id);
      if (wantSkirmish && guildId && this.isGuildMarked(guildId) && this._isUserPresentInGuild(userId, guildId)) {
        ringPush(
          `intel:skirmish:${userId}`,
          { t: Date.now(), type: "presence", status: String((upd == null ? void 0 : upd.status) || "").toLowerCase(), guildId: String(guildId) },
          SKIRMISH_RING_CAP
        );
      }
      if (wantAura) {
        const activities = Array.isArray(upd == null ? void 0 : upd.activities) ? upd.activities : [];
        const customStatus = activities.find((a) => (a == null ? void 0 : a.type) === 4) || null;
        const games = activities.filter((a) => (a == null ? void 0 : a.type) !== 4).map((a) => ({
          name: String((a == null ? void 0 : a.name) || "").slice(0, 80),
          type: Number(a == null ? void 0 : a.type) || 0,
          details: (a == null ? void 0 : a.details) ? String(a.details).slice(0, 100) : void 0,
          state: (a == null ? void 0 : a.state) ? String(a.state).slice(0, 100) : void 0
        }));
        ringPush(
          `intel:aura:${userId}`,
          {
            t: Date.now(),
            customStatus: customStatus ? { state: String(customStatus.state || "").slice(0, 100), emoji: ((_b = customStatus.emoji) == null ? void 0 : _b.name) || null } : null,
            activities: games
          },
          AURA_RING_CAP
        );
      }
    }
  }
  _onVoiceStateUpdate(action) {
    const states = Array.isArray(action == null ? void 0 : action.voiceStates) ? action.voiceStates : [];
    if (states.length === 0) return;
    const deploymentMap = this._getShadowDeploymentMap();
    if (deploymentMap.size === 0) return;
    for (const s of states) {
      const rawId = s == null ? void 0 : s.userId;
      const guildId = s == null ? void 0 : s.guildId;
      if (!rawId || !guildId) continue;
      const userId = String(rawId);
      if (!deploymentMap.has(userId)) continue;
      if (!this.isGuildMarked(guildId)) continue;
      ringPush(
        `intel:skirmish:${userId}`,
        { t: Date.now(), type: "voice", channelId: (s == null ? void 0 : s.channelId) || null, guildId: String(guildId) },
        SKIRMISH_RING_CAP
      );
    }
  }
  _onChannelSelect(action) {
    const guildId = action == null ? void 0 : action.guildId;
    if (!guildId || !this.isGuildMarked(guildId)) return;
    const channelId = action == null ? void 0 : action.channelId;
    if (!channelId) return;
    const deploymentMap = this._getShadowDeploymentMap();
    if (deploymentMap.size === 0) return;
    const now = Date.now();
    for (const userId of deploymentMap.keys()) {
      if (!this._isUserPresentInGuild(userId, guildId)) continue;
      ringPush(
        `intel:skirmish:${userId}`,
        { t: now, type: "channel-select", channelId: String(channelId), guildId: String(guildId) },
        SKIRMISH_RING_CAP
      );
    }
  }
  _getSkirmishLog(userId) {
    return ringRead(`intel:skirmish:${userId}`);
  }
  _getAuraTrail(userId) {
    return ringRead(`intel:aura:${userId}`);
  }
  // ---- Target Intel Modal ---------------------------------------------
  async openUserIntelModal(userId, guildId) {
    var _a, _b, _c;
    this.closeModal();
    if (!this._canShowLimitedTargetIntel(userId, guildId)) {
      this._toast("Target intel is limited to monitored users present in this guild", "warning");
      return;
    }
    const user = (_b = (_a = this._UserStore) == null ? void 0 : _a.getUser) == null ? void 0 : _b.call(_a, userId);
    const deployment = this._getShadowDeploymentMap().get(String(userId));
    const overlay = this._createModal(
      "Shadow Recon - Target Intel",
      `${(user == null ? void 0 : user.globalName) || (user == null ? void 0 : user.username) || userId}${(deployment == null ? void 0 : deployment.shadowName) ? ` | reported by ${deployment.shadowName}` : ""}`
    );
    const body = overlay.querySelector(".shadow-recon-modal-body");
    const platformData = this.getPlatformIntel(userId);
    const staff = this.getStaffIntel(userId, guildId);
    body.appendChild(this._buildKeyValueSection(
      "Presence Snapshot",
      platformData.length ? platformData.map((p) => [p.platform, p.status]) : [["Intel", "No platform statuses reported"]]
    ));
    body.appendChild(this._buildKeyValueSection(
      "Guild Role Snapshot",
      staff ? [
        ["Rank", staff.label],
        ["Capabilities", staff.capabilities.join(", ") || "None"]
      ] : [["Rank", "No elevated staff permissions detected"]]
    ));
    if (this.settings.enableSkirmishLog) {
      const log = this._getSkirmishLog(userId);
      const cutoff = Date.now() - 864e5;
      const recent = log.filter((e) => e.t >= cutoff).reverse();
      const rows = [];
      for (const e of recent.slice(0, 12)) {
        const when = this._formatElapsedSince(e.t) + " ago";
        let what = "\u2014";
        if (e.type === "presence") what = `Status \u2192 ${this._capitalize(e.status || "unknown")}`;
        else if (e.type === "voice") what = e.channelId ? `Joined VC ${this._channelDisplayName(e.channelId)}` : "Left voice";
        else if (e.type === "channel-select") what = `Seen in ${this._channelDisplayName(e.channelId)}`;
        rows.push([when, what]);
      }
      if (rows.length === 0) rows.push(["Activity Log", "No tracked activity in the last 24h"]);
      body.appendChild(this._buildKeyValueSection("Activity Log (24h)", rows));
    }
    if (this.settings.enableAuraReading) {
      const trail = this._getAuraTrail(userId);
      const recent = [...trail].reverse().slice(0, 8);
      const rows = [];
      for (const e of recent) {
        const when = this._formatElapsedSince(e.t) + " ago";
        const cs = ((_c = e.customStatus) == null ? void 0 : _c.state) ? `"${e.customStatus.state}"` : null;
        const act = (e.activities || []).map((a) => a.name).filter(Boolean).slice(0, 3).join(", ");
        const parts = [];
        if (cs) parts.push(cs);
        if (act) parts.push(act);
        rows.push([when, parts.length > 0 ? parts.join(" | ") : "\u2014"]);
      }
      if (rows.length === 0) rows.push(["Status History", "No status / activity changes captured yet"]);
      body.appendChild(this._buildKeyValueSection("Status & Activity History", rows));
    }
  }
  // Helper for skirmish/aura rendering — resolve a channel ID to a
  // human-readable name without spamming Discord lookups.
  _channelDisplayName(channelId) {
    var _a, _b;
    if (!channelId) return "\u2014";
    try {
      const ch = (_b = (_a = this._ChannelStore) == null ? void 0 : _a.getChannel) == null ? void 0 : _b.call(_a, channelId);
      return (ch == null ? void 0 : ch.name) ? `#${ch.name}` : String(channelId);
    } catch (_) {
      return String(channelId);
    }
  }
  getPlatformIntel(userId) {
    return getPlatformIntel(this, userId, {
      platformLabels: PLATFORM_LABELS,
      statusLabels: STATUS_LABELS
    });
  }
  // ---- Staff / Permissions --------------------------------------------
  isDetailedStaffIntelUnlocked(guildId) {
    return isDetailedStaffIntelUnlocked(this, guildId);
  }
  openStaffIntelModal(userId, guildId) {
    var _a, _b, _c, _d;
    if (!guildId || !userId) {
      this._toast("Guild context required for staff dossier", "warning");
      return;
    }
    const guild = (_b = (_a = this._GuildStore) == null ? void 0 : _a.getGuild) == null ? void 0 : _b.call(_a, guildId);
    const user = (_d = (_c = this._UserStore) == null ? void 0 : _c.getUser) == null ? void 0 : _d.call(_c, userId);
    const staff = this.getStaffIntel(userId, guildId);
    if (!guild || !staff) {
      this._toast("No staff dossier available for this user", "warning");
      return;
    }
    const overlay = this._createModal(
      "Shadow Recon - Staff Dossier",
      `${(user == null ? void 0 : user.globalName) || (user == null ? void 0 : user.username) || userId} @ ${guild.name}`
    );
    const body = overlay.querySelector(".shadow-recon-modal-body");
    body.appendChild(this._buildKeyValueSection("Staff Profile", [
      ["Rank", staff.label],
      ["Guild", guild.name],
      ["User ID", String(userId)]
    ]));
    const unlocked = this.isDetailedStaffIntelUnlocked(guildId);
    if (!unlocked) {
      const notice = document.createElement("div");
      notice.className = "shadow-recon-notice";
      notice.textContent = "Detailed staff capability intel is lore-locked. Recon this guild to unlock full staff dossier.";
      const markBtn = document.createElement("button");
      markBtn.className = "shadow-recon-button";
      markBtn.textContent = "Recon Guild and Reload Dossier";
      markBtn.addEventListener("click", () => {
        this.toggleGuildMark(guildId);
        this.closeModal();
        this.openStaffIntelModal(userId, guildId);
      });
      body.appendChild(notice);
      body.appendChild(markBtn);
      return;
    }
    body.appendChild(this._buildKeyValueSection("Capabilities", [
      ["Capabilities", staff.capabilities.join(", ") || "None"]
    ]));
    body.appendChild(this._buildPermissionsSection(
      "Permission Breakdown",
      this.getPermissionSummaryForMember(guildId, userId)
    ));
  }
  getCurrentUserPermissionSummary(guildId) {
    return getCurrentUserPermissionSummary(this, guildId, {
      importantPermissions: IMPORTANT_PERMISSIONS,
      staffPermissionKeys: STAFF_PERMISSION_KEYS,
      humanizedPermCache: _humanizedPermCache
    });
  }
  getStaffIntel(userId, guildId) {
    return getStaffIntel(this, userId, guildId, {
      importantPermissions: IMPORTANT_PERMISSIONS,
      staffPermissionKeys: STAFF_PERMISSION_KEYS,
      humanizedPermCache: _humanizedPermCache
    });
  }
  getPermissionSummaryForMember(guildId, userId) {
    return getPermissionSummaryForMember(this, guildId, userId, {
      importantPermissions: IMPORTANT_PERMISSIONS,
      staffPermissionKeys: STAFF_PERMISSION_KEYS,
      humanizedPermCache: _humanizedPermCache
    });
  }
  // ---- Modal Builders --------------------------------------------------
  _createModal(title, subtitle = "") {
    return createModal(this, MODAL_ID, title, subtitle);
  }
  closeModal() {
    const el = document.getElementById(MODAL_ID);
    if (el) el.remove();
    this._modalEl = null;
  }
  _buildKeyValueSection(title, rows) {
    return buildKeyValueSection(title, rows);
  }
  _buildPermissionsSection(title, summary) {
    return buildPermissionsSection(title, summary);
  }
  // ---- Counts / Stores -------------------------------------------------
  getServerCount() {
    var _a, _b, _c, _d, _e;
    try {
      if (typeof ((_a = this._GuildStore) == null ? void 0 : _a.getGuildCount) === "function") return this._GuildStore.getGuildCount();
      const guilds = (_c = (_b = this._GuildStore) == null ? void 0 : _b.getGuilds) == null ? void 0 : _c.call(_b);
      if (guilds && typeof guilds === "object") return Object.keys(guilds).length;
      const flattened = (_e = (_d = this._sortedGuildStore) == null ? void 0 : _d.getFlattenedGuildIds) == null ? void 0 : _e.call(_d);
      if (Array.isArray(flattened)) return flattened.length;
    } catch (_) {
    }
    return 0;
  }
  _countGuildChannels(guildId) {
    var _a, _b;
    try {
      const grouped = (_b = (_a = this._GuildChannelStore) == null ? void 0 : _a.getChannels) == null ? void 0 : _b.call(_a, guildId);
      if (!grouped || typeof grouped !== "object") return 0;
      let count = 0;
      for (const bucket of Object.values(grouped)) {
        if (!Array.isArray(bucket)) continue;
        for (const entry of bucket) {
          if (entry == null ? void 0 : entry.channel) count++;
        }
      }
      return count;
    } catch (_) {
      return 0;
    }
  }
  _countGuildEmojis(guildId, guild) {
    var _a, _b, _c;
    try {
      const guildEmojis = (_c = (_b = (_a = this._EmojiStore) == null ? void 0 : _a.getGuilds) == null ? void 0 : _b.call(_a)) == null ? void 0 : _c[guildId];
      if (Array.isArray(guildEmojis)) return guildEmojis.length;
    } catch (_) {
    }
    return Array.isArray(guild == null ? void 0 : guild.emojis) ? guild.emojis.length : 0;
  }
  _countGuildStickers(guildId, guild) {
    var _a, _b;
    try {
      const stickers = (_b = (_a = this._StickersStore) == null ? void 0 : _a.getGuildStickers) == null ? void 0 : _b.call(_a, guildId);
      if (Array.isArray(stickers)) return stickers.length;
    } catch (_) {
    }
    return Array.isArray(guild == null ? void 0 : guild.stickers) ? guild.stickers.length : 0;
  }
  _countGuildSoundboard(guildId) {
    var _a, _b;
    try {
      const sounds = (_b = (_a = this._SoundboardStore) == null ? void 0 : _a.getGuildSounds) == null ? void 0 : _b.call(_a, guildId);
      if (Array.isArray(sounds)) return sounds.length;
    } catch (_) {
    }
    return 0;
  }
  // ---- Utility ---------------------------------------------------------
  _safeDateFromSnowflake(id) {
    const ts = this._safeTimestampFromSnowflake(id);
    return ts > 0 ? new Date(ts).toLocaleString() : "Unknown";
  }
  _toBigInt(value) {
    return toBigInt(value);
  }
  _formatNumber(value) {
    const n = Number(value);
    if (!Number.isFinite(n)) return "0";
    return Math.trunc(n).toLocaleString();
  }
  _capitalize(text) {
    const str = String(text || "");
    if (!str) return "Unknown";
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
  // ---- Settings Panel --------------------------------------------------
  getSettingsPanel() {
    return buildSettingsPanel(BdApi, this);
  }
  // ---- CSS -------------------------------------------------------------
  injectCSS() {
    BdApi.DOM.addStyle(STYLE_ID, getShadowReconCss(WIDGET_ID, MODAL_ID));
  }
};
