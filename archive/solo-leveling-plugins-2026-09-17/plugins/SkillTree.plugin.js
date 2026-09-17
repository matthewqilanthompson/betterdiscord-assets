/**
 * @name SkillTree
 * @description Solo Leveling lore-appropriate skill tree system with upgradeable passive abilities
 * @version 3.0.0
 * @author matthewqilanthompson
 */
var __getOwnPropNames = Object.getOwnPropertyNames;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};

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

// src/SkillTree/components.js
var require_components = __commonJS({
  "src/SkillTree/components.js"(exports2, module2) {
    function buildSkillTreeComponents2(pluginInstance) {
      const { onKeydown } = require_dom_bus();
      const React = BdApi.React;
      const ce = React.createElement;
      function formatEffectText(effect) {
        if (!effect) return "";
        const parts = [];
        if (effect.xpBonus) parts.push(`+${(effect.xpBonus * 100).toFixed(1)}% XP`);
        if (effect.critBonus) parts.push(`+${(effect.critBonus * 100).toFixed(1)}% Crit`);
        if (effect.critDamageBonus) parts.push(`+${(effect.critDamageBonus * 100).toFixed(1)}% Crit Damage`);
        if (effect.questBonus) parts.push(`+${(effect.questBonus * 100).toFixed(1)}% Quest`);
        if (effect.allStatBonus) parts.push(`+${(effect.allStatBonus * 100).toFixed(1)}% All Stats`);
        if (effect.attackCooldownReduction) {
          parts.push(`-${(effect.attackCooldownReduction * 100).toFixed(1)}% Attack Cooldown`);
        }
        if (effect.daggerThrowDamageBonus) {
          parts.push(`+${(effect.daggerThrowDamageBonus * 100).toFixed(1)}% Dagger Throw Damage`);
        }
        if (effect.hpRegenBonus) parts.push(`+${(effect.hpRegenBonus * 100).toFixed(1)}% HP Regen`);
        if (effect.manaRegenBonus) parts.push(`+${(effect.manaRegenBonus * 100).toFixed(1)}% Mana Regen`);
        if (effect.debuffDurationReduction) {
          parts.push(`-${(effect.debuffDurationReduction * 100).toFixed(1)}% Debuff Duration`);
        }
        if (effect.debuffResistChance) {
          parts.push(`+${(effect.debuffResistChance * 100).toFixed(1)}% Debuff Resist`);
        }
        if (effect.debuffCleanseChance) {
          parts.push(`+${(effect.debuffCleanseChance * 100).toFixed(1)}% Cleanse Chance`);
        }
        if (effect.tenacityDamageReduction && effect.tenacityThreshold) {
          const thresholdLabel = effect.tenacityThreshold >= 1 ? "Always Active" : `below ${(effect.tenacityThreshold * 100).toFixed(0)}% HP`;
          parts.push(
            `-${(effect.tenacityDamageReduction * 100).toFixed(1)}% Incoming Damage (${thresholdLabel})`
          );
        }
        if (effect.naturalGrowthMultiplier && effect.naturalGrowthMultiplier > 1) {
          parts.push(`+${((effect.naturalGrowthMultiplier - 1) * 100).toFixed(1)}% Natural Growth`);
        }
        if (effect.flatMana) {
          parts.push(`+${Number(effect.flatMana).toLocaleString()} Mana`);
        }
        if (effect.manaCostReduction) {
          parts.push(`-${(effect.manaCostReduction * 100).toFixed(1)}% Mana Costs`);
        }
        if (effect.ariseChanceOverride >= 1) {
          parts.push("100% Arise Chance");
        }
        if (effect.shadowGrowthMultiplier && effect.shadowGrowthMultiplier > 1) {
          parts.push(`${effect.shadowGrowthMultiplier.toFixed(1)}x Shadow Growth`);
        }
        return parts.join(" \u2022 ");
      }
      function ManaBar({ current, max }) {
        const pct = max > 0 ? current / max * 100 : 0;
        return ce(
          "div",
          { className: "skilltree-mana-bar-container" },
          ce("span", { className: "skilltree-mana-bar-label" }, "Mana"),
          ce(
            "div",
            { className: "skilltree-mana-bar-track" },
            ce("div", { className: "skilltree-mana-bar-fill", style: { width: `${pct.toFixed(1)}%` } })
          ),
          ce("span", { className: "skilltree-mana-bar-text" }, `${Math.floor(current)} / ${max}`)
        );
      }
      function getActiveSkillDurationText(def) {
        if (def.durationMs) return `${Math.round(def.durationMs / 6e4)}m`;
        if (def.charges) return `${def.charges} charge${def.charges > 1 ? "s" : ""}`;
        if (def.sustain) return "Sustain";
        return "Passive";
      }
      function buildActiveSkillStatus(ce2, options) {
        const {
          def,
          isRunning,
          isOnCooldown,
          cooldownRemaining,
          state
        } = options;
        if (isRunning) {
          if (def.durationMs && state.expiresAt > 0) {
            const remainMin = Math.max(0, Math.ceil((state.expiresAt - Date.now()) / 6e4));
            return ce2(
              "div",
              { className: "skilltree-active-skill-status active-text" },
              `ACTIVE - ${remainMin}m remaining`
            );
          }
          if (def.charges && state.chargesLeft > 0) {
            return ce2(
              "div",
              { className: "skilltree-active-skill-status active-text" },
              `ACTIVE - ${state.chargesLeft} charge${state.chargesLeft > 1 ? "s" : ""} left`
            );
          }
          if (def.sustain) {
            return ce2(
              "div",
              { className: "skilltree-active-skill-status active-text" },
              "ACTIVE - Sustained (regen-safe drain)"
            );
          }
          return null;
        }
        if (!isOnCooldown) return null;
        const cooldownMinutes = Math.ceil(cooldownRemaining / 6e4);
        return ce2(
          "div",
          { className: "skilltree-active-skill-status cooldown-text" },
          `Cooldown: ${cooldownMinutes}m`
        );
      }
      function buildActiveSkillAction(ce2, options) {
        var _a;
        const {
          skillId,
          def,
          isUnlocked,
          isRunning,
          isOnCooldown,
          manaInfo,
          onActivate,
          onDeactivate
        } = options;
        if (!isUnlocked) {
          let reqText;
          if (Array.isArray(def.unlock.passiveSkills)) {
            const names = def.unlock.passiveSkills.map((sid) => {
              var _a2;
              const found = pluginInstance.findSkillAndTier(sid);
              return ((_a2 = found == null ? void 0 : found.skill) == null ? void 0 : _a2.name) || sid;
            });
            reqText = `Requires ${names.join(" + ")} Lv${def.unlock.passiveLevel || 1}`;
          } else {
            const reqSkillDef = pluginInstance.findSkillAndTier(def.unlock.passiveSkill);
            const reqName = ((_a = reqSkillDef == null ? void 0 : reqSkillDef.skill) == null ? void 0 : _a.name) || def.unlock.passiveSkill;
            reqText = `Requires ${reqName} Lv${def.unlock.passiveLevel}`;
          }
          return ce2(
            "div",
            { className: "skilltree-active-skill-unlock-req" },
            reqText
          );
        }
        if (isRunning) {
          return ce2(
            "button",
            {
              className: "skilltree-activate-btn",
              onClick: () => onDeactivate(skillId)
            },
            "Deactivate"
          );
        }
        const effectiveManaCost = pluginInstance._getEffectiveManaCost(def.manaCost);
        const canActivate = !isOnCooldown && manaInfo.current >= effectiveManaCost;
        return ce2(
          "button",
          {
            className: "skilltree-activate-btn",
            disabled: !canActivate,
            onClick: canActivate ? () => onActivate(skillId) : void 0
          },
          isOnCooldown ? "On Cooldown" : "Activate"
        );
      }
      function ActiveSkillCard({ skillId, def, isUnlocked, isRunning, isOnCooldown, cooldownRemaining, state, manaInfo, onActivate, onDeactivate }) {
        const cardClasses = ["skilltree-active-skill", isRunning ? "is-active" : "", !isUnlocked ? "is-locked" : ""].filter(Boolean).join(" ");
        const durationText = getActiveSkillDurationText(def);
        const cooldownText = def.sustain ? `${Math.round(def.cooldownMs / 6e4)}m (only on mana depletion)` : `${Math.round(def.cooldownMs / 6e4)}m`;
        const statusEl = buildActiveSkillStatus(ce, {
          def,
          isRunning,
          isOnCooldown,
          cooldownRemaining,
          state
        });
        const actionEl = buildActiveSkillAction(ce, {
          skillId,
          def,
          isUnlocked,
          isRunning,
          isOnCooldown,
          manaInfo,
          onActivate,
          onDeactivate
        });
        return ce(
          "div",
          { className: cardClasses },
          ce(
            "div",
            { className: "skilltree-active-skill-header" },
            ce("span", { className: "skilltree-active-skill-name" }, def.name),
            ce("span", { className: "skilltree-active-skill-cost" }, `${def.manaCost} Mana`)
          ),
          ce("div", { className: "skilltree-active-skill-desc" }, def.desc),
          def.lore ? ce("div", { className: "skilltree-active-skill-lore" }, def.lore) : null,
          ce(
            "div",
            { className: "skilltree-active-skill-info" },
            ce("span", null, `Duration: ${durationText}`),
            ce("span", null, `Cooldown: ${cooldownText}`)
          ),
          statusEl,
          actionEl
        );
      }
      function ActiveSkillsSection({ onActivate, onDeactivate }) {
        const [, forceManaUpdate] = React.useReducer((x) => x + 1, 0);
        React.useEffect(() => {
          pluginInstance._manaTickForceUpdate = forceManaUpdate;
          return () => {
            if (pluginInstance._manaTickForceUpdate === forceManaUpdate) {
              pluginInstance._manaTickForceUpdate = null;
            }
          };
        }, [forceManaUpdate]);
        const manaInfo = pluginInstance.getManaInfo();
        return ce(
          "div",
          { className: "skilltree-active-section" },
          ce("div", { className: "skilltree-active-section-header" }, ce("span", null, "Active Skills")),
          ce(ManaBar, { current: manaInfo.current, max: manaInfo.max }),
          pluginInstance.activeSkillOrder.map((skillId) => {
            const def = pluginInstance.activeSkillDefs[skillId];
            if (!def) return null;
            return ce(ActiveSkillCard, {
              key: skillId,
              skillId,
              def,
              isUnlocked: pluginInstance.isActiveSkillUnlocked(skillId),
              isRunning: pluginInstance.isActiveSkillRunning(skillId),
              isOnCooldown: pluginInstance.isActiveSkillOnCooldown(skillId),
              cooldownRemaining: pluginInstance.getActiveSkillCooldownRemaining(skillId),
              state: pluginInstance.getActiveSkillState(skillId),
              manaInfo,
              onActivate,
              onDeactivate
            });
          })
        );
      }
      function SkillCard({ skill, level, maxLevel, canUpgrade, nextCost, effect, onUpgrade, onMaxUpgrade }) {
        const isUnlockOnly = Boolean(skill.unlockOnly);
        const effectiveMaxLevel = isUnlockOnly ? 1 : maxLevel;
        const canMax = !isUnlockOnly && level < effectiveMaxLevel && canUpgrade;
        const classes = `skilltree-skill ${level > 0 ? "unlocked" : ""} ${level >= effectiveMaxLevel ? "max-level" : ""}`;
        const effectStr = formatEffectText(effect);
        return ce(
          "div",
          { className: classes },
          ce("div", { className: "skilltree-skill-name" }, skill.name),
          ce("div", { className: "skilltree-skill-desc" }, skill.desc),
          skill.lore ? ce("div", { className: "skilltree-skill-lore" }, skill.lore) : null,
          level > 0 && !isUnlockOnly ? ce("div", { className: "skilltree-skill-level" }, `Level ${level}/${effectiveMaxLevel}`) : null,
          level > 0 && isUnlockOnly ? ce("div", { className: "skilltree-skill-level" }, "UNLOCKED") : null,
          level > 0 && effectStr ? ce("div", { className: "skilltree-skill-effects" }, `Current Effects: ${effectStr}`) : null,
          level < effectiveMaxLevel ? ce(
            React.Fragment,
            null,
            ce("div", { className: "skilltree-skill-cost" }, `Cost: ${nextCost || "N/A"} SP`),
            ce(
              "div",
              { className: "skilltree-btn-group" },
              ce("button", { className: "skilltree-upgrade-btn", disabled: !canUpgrade, onClick: canUpgrade ? () => onUpgrade(skill.id) : void 0 }, "Unlock"),
              isUnlockOnly ? null : ce("button", { className: "skilltree-max-btn", disabled: !canMax, onClick: canMax ? () => onMaxUpgrade(skill.id) : void 0 }, "Max")
            )
          ) : ce("div", { className: "skilltree-skill-max" }, isUnlockOnly ? "UNLOCKED" : "MAX LEVEL")
        );
      }
      function PassiveSkillList({ tier, tierKey, onUpgrade, onMaxUpgrade }) {
        if (!tier.skills) return null;
        return ce(
          "div",
          { className: "skilltree-tier", id: `st-${tierKey}` },
          ce(
            "div",
            { className: "skilltree-tier-header" },
            ce("span", null, tier.name),
            ce("span", { className: "skilltree-tier-badge" }, `Tier ${tier.tier}`)
          ),
          tier.skills.map((skill) => {
            const level = pluginInstance.getSkillLevel(skill.id);
            const maxLevel = skill.unlockOnly ? 1 : skill.maxLevel || tier.maxLevel || 10;
            return ce(SkillCard, {
              key: skill.id,
              skill,
              level,
              maxLevel,
              canUpgrade: pluginInstance.canUnlockSkill(skill, tier),
              nextCost: pluginInstance.getNextUpgradeCost(skill, tier),
              effect: pluginInstance.getSkillEffect(skill, tier),
              onUpgrade,
              onMaxUpgrade
            });
          })
        );
      }
      function PermanentEffectCard({ item, footerText }) {
        var _a;
        const effectStr = formatEffectText(item.effect);
        return ce(
          "div",
          { className: "skilltree-skill unlocked max-level" },
          ce("div", { className: "skilltree-skill-name" }, item.name),
          ce("div", { className: "skilltree-skill-desc" }, item.desc),
          item.lore ? ce("div", { className: "skilltree-skill-lore" }, item.lore) : null,
          ce("div", { className: "skilltree-skill-level" }, item.statusText || "Always Active"),
          ((_a = item.effect) == null ? void 0 : _a.sourceRank) ? ce("div", { className: "skilltree-skill-level" }, `Current Rank: ${item.effect.sourceRank}`) : null,
          effectStr ? ce("div", { className: "skilltree-skill-effects" }, `Current Effects: ${effectStr}`) : null,
          ce("div", { className: "skilltree-skill-max" }, footerText)
        );
      }
      function InnatePassivesSection() {
        var _a;
        const innatePassives = ((_a = pluginInstance.getInnatePassives) == null ? void 0 : _a.call(pluginInstance)) || [];
        if (innatePassives.length === 0) return null;
        return ce(
          "div",
          { className: "skilltree-tier", id: "st-innate-passives" },
          ce(
            "div",
            { className: "skilltree-tier-header" },
            ce("span", null, "Innate System Passives"),
            ce("span", { className: "skilltree-tier-badge" }, "Always On")
          ),
          innatePassives.map((passive) => ce(PermanentEffectCard, { key: passive.id, item: passive, footerText: "INNATE" }))
        );
      }
      function HiddenBlessingsSection() {
        var _a;
        const hiddenBlessings = ((_a = pluginInstance.getHiddenBlessings) == null ? void 0 : _a.call(pluginInstance)) || [];
        if (hiddenBlessings.length === 0) return null;
        return ce(
          "div",
          { className: "skilltree-tier", id: "st-hidden-blessings" },
          ce(
            "div",
            { className: "skilltree-tier-header" },
            ce("span", null, "Hidden Blessings"),
            ce("span", { className: "skilltree-tier-badge" }, "Rank-Scaled")
          ),
          hiddenBlessings.map((blessing) => ce(PermanentEffectCard, { key: blessing.id, item: blessing, footerText: "HIDDEN" }))
        );
      }
      function TierNavigation({ tiers, currentTier, onTierChange }) {
        return ce(
          "div",
          { className: "skilltree-tier-nav" },
          tiers.map(
            (tierKey) => ce("button", {
              key: tierKey,
              className: `skilltree-tier-nav-btn ${tierKey === currentTier ? "active" : ""}`,
              onClick: () => onTierChange(tierKey)
            }, `Tier ${tierKey.replace("tier", "")}`)
          )
        );
      }
      function SkillTreeHeader({ sp, level, onReset }) {
        return ce(
          "div",
          { className: "skilltree-header" },
          ce("h2", null, "Solo Leveling Skill Tree"),
          ce(
            "div",
            { className: "skilltree-header-info" },
            ce(
              "div",
              { className: "skilltree-stat" },
              ce("span", null, "Available SP:"),
              ce("span", { className: "skilltree-stat-value" }, String(sp))
            ),
            level != null ? ce(
              "div",
              { className: "skilltree-stat" },
              ce("span", null, "Level:"),
              ce("span", { className: "skilltree-stat-value" }, String(level))
            ) : null,
            ce("button", { className: "skilltree-reset-btn", onClick: onReset }, "Reset Skills")
          )
        );
      }
      function ResetConfirmDialog({ onConfirm, onCancel, expectedSP, currentLevel }) {
        React.useEffect(() => {
          const handler = (e) => {
            if (e.key === "Escape") {
              e.stopPropagation();
              onCancel();
            }
          };
          const unsub = onKeydown(handler, { capture: true });
          return () => unsub();
        }, [onCancel]);
        return ce(
          "div",
          { className: "st-confirm-dialog-overlay", onClick: (e) => {
            if (e.target.className === "st-confirm-dialog-overlay") onCancel();
          } },
          ce(
            "div",
            { className: "st-confirm-dialog" },
            ce("div", { className: "st-confirm-header" }, ce("h3", null, "Reset Skill Tree?")),
            ce(
              "div",
              { className: "st-confirm-body" },
              ce("p", null, "This will reset all skills and refund your skill points."),
              ce(
                "ul",
                null,
                ce("li", null, "Reset all skill levels to 0"),
                ce("li", null, "Clear all skill bonuses"),
                ce("li", null, "Refund ", ce("strong", null, String(expectedSP)), " SP for level ", ce("strong", null, String(currentLevel)))
              ),
              ce("p", { style: { color: "rgba(236, 72, 153, 0.85)", fontWeight: 600 } }, "This action cannot be undone.")
            ),
            ce(
              "div",
              { className: "st-confirm-actions" },
              ce("button", { className: "st-confirm-btn st-confirm-cancel", onClick: onCancel }, "Cancel"),
              ce("button", { className: "st-confirm-btn st-confirm-yes", onClick: onConfirm }, "Reset")
            )
          )
        );
      }
      function SkillTreeModal({ onClose }) {
        const [currentTierPage, setCurrentTierPage] = React.useState(pluginInstance.settings.currentTierPage || "tier1");
        const [isResetOpen, setIsResetOpen] = React.useState(false);
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
              if (isResetOpen) setIsResetOpen(false);
              else onClose();
            }
          };
          const unsub = onKeydown(handler, { capture: true });
          return () => unsub();
        }, [isResetOpen, onClose]);
        const soloData = pluginInstance.getSoloLevelingData();
        const allTierKeys = Object.keys(pluginInstance.skillTree);
        const visibleTiers = (pluginInstance.settings.visibleTiers || allTierKeys).filter((k) => allTierKeys.includes(k));
        const activeTier = allTierKeys.includes(currentTierPage) ? currentTierPage : visibleTiers[0] || "tier1";
        const tierData = pluginInstance.skillTree[activeTier];
        const handleTierChange = React.useCallback((tierKey) => {
          setCurrentTierPage(tierKey);
          pluginInstance.settings.currentTierPage = tierKey;
          pluginInstance.saveSettings();
        }, []);
        const handleUpgrade = React.useCallback((skillId) => {
          if (pluginInstance.unlockOrUpgradeSkill(skillId)) forceUpdate();
        }, []);
        const handleMaxUpgrade = React.useCallback((skillId) => {
          if (pluginInstance.maxUpgradeSkill(skillId)) forceUpdate();
        }, []);
        const handleActivate = React.useCallback((skillId) => {
          const result = pluginInstance.activateSkill(skillId);
          if (!result.success) pluginInstance._toast(result.reason, "error", 2500);
          forceUpdate();
        }, []);
        const handleDeactivate = React.useCallback((skillId) => {
          const result = pluginInstance.deactivateSkill(skillId, "manual");
          if (!result.success) pluginInstance._toast(result.reason, "error", 2500);
          forceUpdate();
        }, []);
        const handleReset = React.useCallback(() => {
          setIsResetOpen(true);
        }, []);
        const handleResetConfirm = React.useCallback(() => {
          pluginInstance.resetSkills();
          setIsResetOpen(false);
          forceUpdate();
        }, []);
        const handleResetCancel = React.useCallback(() => {
          setIsResetOpen(false);
        }, []);
        const resetSoloData = pluginInstance.getSoloLevelingData();
        const expectedSP = (resetSoloData == null ? void 0 : resetSoloData.level) ? pluginInstance.calculateSPForLevel(resetSoloData.level) : 0;
        return ce(
          "div",
          { className: "skilltree-modal" },
          ce(SkillTreeHeader, { sp: pluginInstance.settings.skillPoints, level: soloData == null ? void 0 : soloData.level, onReset: handleReset }),
          ce(TierNavigation, { tiers: visibleTiers, currentTier: activeTier, onTierChange: handleTierChange }),
          ce(
            "div",
            { className: "skilltree-modal-content" },
            ce(InnatePassivesSection),
            ce(HiddenBlessingsSection),
            tierData ? ce(PassiveSkillList, { tier: tierData, tierKey: activeTier, onUpgrade: handleUpgrade, onMaxUpgrade: handleMaxUpgrade }) : null,
            ce(ActiveSkillsSection, { onActivate: handleActivate, onDeactivate: handleDeactivate })
          ),
          ce("button", { className: "skilltree-close-btn", onClick: onClose }, "\xD7"),
          isResetOpen ? ce(ResetConfirmDialog, { onConfirm: handleResetConfirm, onCancel: handleResetCancel, expectedSP, currentLevel: (resetSoloData == null ? void 0 : resetSoloData.level) || 0 }) : null
        );
      }
      return { SkillTreeModal, SkillTreeHeader, TierNavigation, PassiveSkillList, SkillCard, ActiveSkillsSection, ActiveSkillCard, ManaBar, ResetConfirmDialog, InnatePassivesSection, HiddenBlessingsSection, PermanentEffectCard };
    }
    module2.exports = { buildSkillTreeComponents: buildSkillTreeComponents2 };
  }
});

// src/SkillTree/active-skill-methods.js
var require_active_skill_methods = __commonJS({
  "src/SkillTree/active-skill-methods.js"(exports2, module2) {
    var ACTIVE_SKILL_PHASES = Object.freeze({
      LOCKED: "LOCKED",
      IDLE: "IDLE",
      CHANNELING: "CHANNELING",
      COOLDOWN: "COOLDOWN"
    });
    var ACTIVE_SKILL_EMPTY_STATE = Object.freeze({
      active: false,
      expiresAt: 0,
      cooldownUntil: 0,
      chargesLeft: 0
    });
    var DUNGEON_COMBAT_SKILL_EMPTY_STATE = Object.freeze({
      cooldownUntil: 0,
      lastUsedAt: 0
    });
    var ACTIVE_SKILL_STATE_EVENT = "SkillTree:activeSkillStateChanged";
    var DUNGEON_COMBAT_SKILL_STATE_EVENT = "SkillTree:dungeonCombatSkillStateChanged";
    var ActiveSkillMethods2 = {
      _getEffectiveManaCost(baseManaCost) {
        var _a, _b;
        const baseCost = Math.max(0, Number(baseManaCost) || 0);
        if (baseCost <= 0) return 0;
        if (this._isShadowMonarch()) return 0;
        const reduction = ((_b = (_a = this.calculateSkillBonuses) == null ? void 0 : _a.call(this)) == null ? void 0 : _b.manaCostReduction) || 0;
        return Math.max(1, Math.ceil(baseCost * (1 - reduction)));
      },
      isActiveSkillUnlocked(activeSkillId) {
        const def = this.activeSkillDefs[activeSkillId];
        if (!def || !def.unlock) return false;
        const passiveLevel = this.getSkillLevel(def.unlock.passiveSkill);
        return passiveLevel >= def.unlock.passiveLevel;
      },
      _computeMaxManaFromStats() {
        var _a;
        const soloData = this.getSoloLevelingData();
        const intelligence = ((_a = soloData == null ? void 0 : soloData.stats) == null ? void 0 : _a.intelligence) || 0;
        return 100 + intelligence * 10;
      },
      _getSoloLevelingInstance(now = Date.now()) {
        var _a, _b;
        if (this._cache.soloPluginInstance && this._cache.soloPluginInstanceTime && now - this._cache.soloPluginInstanceTime < this._cache.soloPluginInstanceTTL) {
          return this._cache.soloPluginInstance;
        }
        const instance = ((_b = (_a = this._SLUtils) == null ? void 0 : _a.getPluginInstance) == null ? void 0 : _b.call(_a, "SoloLevelingStats")) || null;
        this._cache.soloPluginInstance = instance;
        this._cache.soloPluginInstanceTime = now;
        return instance;
      },
      _getSharedManaInfo() {
        const instance = this._getSoloLevelingInstance();
        if (!(instance == null ? void 0 : instance.settings)) return null;
        const fallbackMax = this._computeMaxManaFromStats();
        const loadedMax = Number(instance.settings.userMaxMana);
        const max = Number.isFinite(loadedMax) && loadedMax > 0 ? loadedMax : fallbackMax;
        const loadedCurrent = Number(instance.settings.userMana);
        if (!Number.isFinite(max) || max <= 0 || !Number.isFinite(loadedCurrent)) {
          return null;
        }
        return {
          instance,
          max,
          current: Math.max(0, Math.min(loadedCurrent, max))
        };
      },
      _setSharedMana(nextMana, maxManaHint) {
        const instance = this._getSoloLevelingInstance();
        if (!(instance == null ? void 0 : instance.settings)) return false;
        const loadedMax = Number(instance.settings.userMaxMana);
        const max = Number.isFinite(loadedMax) && loadedMax > 0 ? loadedMax : Number.isFinite(maxManaHint) && maxManaHint > 0 ? maxManaHint : this._computeMaxManaFromStats();
        if (!Number.isFinite(max) || max <= 0) return false;
        const current = Math.max(0, Math.min(Number(nextMana) || 0, max));
        instance.settings.userMaxMana = max;
        instance.settings.userMana = current;
        if (typeof instance.saveSettings === "function") {
          instance.saveSettings();
        }
        if (typeof instance.updateChatUI === "function") {
          instance.updateChatUI();
        }
        return true;
      },
      _persistSettingsFast() {
        var _a, _b;
        try {
          (_b = (_a = BdApi == null ? void 0 : BdApi.Data) == null ? void 0 : _a.save) == null ? void 0 : _b.call(_a, "SkillTree", "settings", this.settings);
        } catch (_) {
        }
      },
      getManaInfo() {
        const sharedMana = this._getSharedManaInfo();
        if (sharedMana) {
          this.settings.currentMana = sharedMana.current;
          this.settings.maxMana = sharedMana.max;
          return { current: sharedMana.current, max: sharedMana.max };
        }
        const maxMana = this._computeMaxManaFromStats();
        const current = Math.max(0, Math.min(this.settings.currentMana || 0, maxMana));
        this.settings.currentMana = current;
        this.settings.maxMana = maxMana;
        return { current, max: maxMana };
      },
      _getManaRegenPerMinute() {
        var _a;
        const soloData = this.getSoloLevelingData();
        const intelligence = ((_a = soloData == null ? void 0 : soloData.stats) == null ? void 0 : _a.intelligence) || 0;
        const bonuses = typeof this.calculateSkillBonuses === "function" ? this.calculateSkillBonuses() || {} : {};
        const longevityMultiplier = 1 + Math.max(0, Number(bonuses.manaRegenBonus || 0));
        return (1 + intelligence * 0.1) * longevityMultiplier;
      },
      tickManaRegen() {
        const now = Date.now();
        const lastRegen = this.settings.lastManaRegen || now;
        const elapsedMinutes = (now - lastRegen) / 6e4;
        if (elapsedMinutes < 0.5) return;
        const regenPerMinute = this._getManaRegenPerMinute();
        const regenAmount = regenPerMinute * elapsedMinutes;
        const manaInfo = this.getManaInfo();
        const nextMana = Math.min((manaInfo.current || 0) + regenAmount, manaInfo.max);
        this.settings.lastManaRegen = now;
        if (nextMana === manaInfo.current && nextMana === manaInfo.max) return;
        this.settings.currentMana = nextMana;
        this.settings.maxMana = manaInfo.max;
        this._setSharedMana(nextMana, manaInfo.max);
      },
      startManaRegen() {
        if (this._manaRegenInterval) return;
        if (!this.settings.lastManaRegen) {
          this.settings.lastManaRegen = Date.now();
        }
        this.tickManaRegen();
        this._manaRegenInterval = setInterval(() => {
          if (this._isStopped) return;
          if (document.hidden) return;
          this.tickManaRegen();
        }, 3e4);
      },
      stopManaRegen() {
        if (this._manaRegenInterval) {
          clearInterval(this._manaRegenInterval);
          this._manaRegenInterval = null;
        }
      },
      _cloneActiveSkillState(state) {
        if (!state || typeof state !== "object") {
          return { ...ACTIVE_SKILL_EMPTY_STATE };
        }
        return {
          active: Boolean(state.active),
          expiresAt: Number(state.expiresAt) || 0,
          cooldownUntil: Number(state.cooldownUntil) || 0,
          chargesLeft: Math.max(0, Number(state.chargesLeft) || 0)
        };
      },
      getActiveSkillState(skillId) {
        const states = this.settings.activeSkillStates || {};
        return this._cloneActiveSkillState(states[skillId]);
      },
      getActiveSkillPhase(skillId, now = Date.now()) {
        if (!this.isActiveSkillUnlocked(skillId)) return ACTIVE_SKILL_PHASES.LOCKED;
        const state = this.getActiveSkillState(skillId);
        if (state.active) {
          const def = this.activeSkillDefs[skillId];
          if ((def == null ? void 0 : def.charges) && state.chargesLeft <= 0) {
            this._deactivateSkill(skillId, "charges_exhausted");
            return this.getActiveSkillPhase(skillId, now);
          }
          if ((def == null ? void 0 : def.durationMs) && state.expiresAt > 0 && state.expiresAt <= now) {
            this._deactivateSkill(skillId, "expired");
            return this.getActiveSkillPhase(skillId, now);
          }
          return ACTIVE_SKILL_PHASES.CHANNELING;
        }
        if (state.cooldownUntil > now) return ACTIVE_SKILL_PHASES.COOLDOWN;
        return ACTIVE_SKILL_PHASES.IDLE;
      },
      getActiveSkillRuntimeSnapshot(skillId, now = Date.now()) {
        const def = this.activeSkillDefs[skillId] || null;
        const phase = this.getActiveSkillPhase(skillId, now);
        const state = this.getActiveSkillState(skillId);
        const mana = this.getManaInfo();
        const cooldownRemaining = Math.max(0, state.cooldownUntil - now);
        const expiresIn = phase === ACTIVE_SKILL_PHASES.CHANNELING && state.expiresAt > 0 ? Math.max(0, state.expiresAt - now) : 0;
        return {
          skillId,
          def,
          state,
          phase,
          unlocked: phase !== ACTIVE_SKILL_PHASES.LOCKED,
          isRunning: phase === ACTIVE_SKILL_PHASES.CHANNELING,
          isOnCooldown: phase === ACTIVE_SKILL_PHASES.COOLDOWN,
          cooldownRemaining,
          expiresIn,
          mana
        };
      },
      _emitActiveSkillStateChange(skillId, prevState, nextState, reason, extra = {}) {
        const snapshot = this.getActiveSkillRuntimeSnapshot(skillId);
        document.dispatchEvent(
          new CustomEvent(ACTIVE_SKILL_STATE_EVENT, {
            detail: {
              skillId,
              prevState: prevState || null,
              nextState: nextState || null,
              reason: reason || "updated",
              mana: snapshot.mana.current,
              cooldownUntil: snapshot.state.cooldownUntil || 0,
              expiresAt: snapshot.state.expiresAt || 0,
              timestamp: Date.now(),
              ...extra
            }
          })
        );
      },
      isActiveSkillRunning(skillId) {
        return this.getActiveSkillPhase(skillId) === ACTIVE_SKILL_PHASES.CHANNELING;
      },
      isActiveSkillOnCooldown(skillId) {
        return this.getActiveSkillPhase(skillId) === ACTIVE_SKILL_PHASES.COOLDOWN;
      },
      getActiveSkillCooldownRemaining(skillId) {
        const state = this.getActiveSkillState(skillId);
        const remaining = state.cooldownUntil - Date.now();
        return remaining > 0 ? remaining : 0;
      },
      _clearActiveSkillTimer(skillId) {
        if (this._activeSkillTimers[skillId]) {
          clearTimeout(this._activeSkillTimers[skillId]);
          delete this._activeSkillTimers[skillId];
        }
      },
      _clearActiveSkillSustain(skillId) {
        if (!this._activeSkillSustainIntervals) this._activeSkillSustainIntervals = {};
        const timerId = this._activeSkillSustainIntervals[skillId];
        if (!timerId) return;
        clearInterval(timerId);
        delete this._activeSkillSustainIntervals[skillId];
      },
      _startActiveSkillSustain(skillId) {
        const def = this.activeSkillDefs[skillId];
        const sustain = def == null ? void 0 : def.sustain;
        if (!sustain) return;
        const tickMs = Math.max(1e3, Number(sustain.tickMs) || 0);
        const baseManaPerTick = Math.max(0, Number(sustain.manaPerTick) || 0);
        const policy = String(sustain.policy || "").trim().toLowerCase();
        const regenSafetyMultiplier = Math.max(
          0.1,
          Math.min(0.99, Number(sustain.regenSafetyMultiplier) || 0.9)
        );
        const minManaFloor = Math.max(0, Number(sustain.minManaFloor) || 0);
        const persistEveryTicks = Math.max(1, Math.round(1e4 / tickMs));
        if (!tickMs || !baseManaPerTick) return;
        if (!this._activeSkillSustainIntervals) this._activeSkillSustainIntervals = {};
        this._clearActiveSkillSustain(skillId);
        let tickCounter = 0;
        let _lastDisplayedMana = -1;
        this._activeSkillSustainIntervals[skillId] = setInterval(() => {
          if (this._isStopped) return;
          if (document.hidden) return;
          const running = this.isActiveSkillRunning(skillId);
          if (!running) {
            this._clearActiveSkillSustain(skillId);
            return;
          }
          const manaInfo = this.getManaInfo();
          let effectiveManaPerTick = baseManaPerTick;
          if (policy === "never_deplete") {
            const regenPerMinute = this._getManaRegenPerMinute();
            const regenPerTick = regenPerMinute * tickMs / 6e4;
            const cappedDrain = Math.max(0, regenPerTick * regenSafetyMultiplier);
            effectiveManaPerTick = Math.min(baseManaPerTick, cappedDrain);
          }
          if (effectiveManaPerTick <= 0) return;
          if (policy === "never_deplete" && manaInfo.current <= minManaFloor + effectiveManaPerTick) {
            const flooredMana = Math.max(minManaFloor, manaInfo.current);
            this.settings.currentMana = flooredMana;
            this.settings.maxMana = manaInfo.max;
            this._setSharedMana(flooredMana, manaInfo.max);
            tickCounter += 1;
            if (tickCounter >= persistEveryTicks) {
              tickCounter = 0;
              this._persistSettingsFast();
            }
            return;
          }
          if (manaInfo.current < effectiveManaPerTick) {
            this._deactivateSkill(skillId, "mana_depleted");
            return;
          }
          const remainingMana = Math.max(0, manaInfo.current - effectiveManaPerTick);
          this.settings.currentMana = remainingMana;
          this.settings.maxMana = manaInfo.max;
          this._setSharedMana(remainingMana, manaInfo.max);
          tickCounter += 1;
          if (tickCounter >= persistEveryTicks) {
            tickCounter = 0;
            this._persistSettingsFast();
          }
          if (typeof this._manaTickForceUpdate === "function" && remainingMana !== _lastDisplayedMana) {
            _lastDisplayedMana = remainingMana;
            this._manaTickForceUpdate();
          }
        }, tickMs);
      },
      activateSkill(skillId) {
        const def = this.activeSkillDefs[skillId];
        if (!def) return { success: false, reason: "Unknown skill" };
        const prevPhase = this.getActiveSkillPhase(skillId);
        if (prevPhase === ACTIVE_SKILL_PHASES.LOCKED) {
          return { success: false, reason: "Skill not unlocked" };
        }
        if (prevPhase === ACTIVE_SKILL_PHASES.CHANNELING) {
          return { success: false, reason: "Already active" };
        }
        if (prevPhase === ACTIVE_SKILL_PHASES.COOLDOWN) {
          const remainMs = this.getActiveSkillCooldownRemaining(skillId);
          const remainMin = Math.ceil(remainMs / 6e4);
          return { success: false, reason: `On cooldown (${remainMin}m)` };
        }
        const manaInfo = this.getManaInfo();
        const effectiveManaCost = this._getEffectiveManaCost(def.manaCost);
        if (manaInfo.current < effectiveManaCost) {
          return { success: false, reason: `Not enough Mana (${Math.floor(manaInfo.current)}/${effectiveManaCost})` };
        }
        const remainingMana = Math.max(0, manaInfo.current - effectiveManaCost);
        this.settings.currentMana = remainingMana;
        this.settings.maxMana = manaInfo.max;
        this._setSharedMana(remainingMana, manaInfo.max);
        const now = Date.now();
        if (!this.settings.activeSkillStates) this.settings.activeSkillStates = {};
        this.settings.activeSkillStates[skillId] = {
          active: true,
          expiresAt: def.durationMs ? now + def.durationMs : 0,
          cooldownUntil: now + (def.durationMs || 0) + def.cooldownMs,
          chargesLeft: def.charges || 0
        };
        if (def.durationMs) {
          this._setActiveSkillTimer(skillId, def.durationMs);
        }
        this._startActiveSkillSustain(skillId);
        this.saveSettings();
        let durationText = "Active";
        if (def.durationMs) {
          durationText = `${Math.round(def.durationMs / 6e4)}m`;
        } else if (def.charges) {
          durationText = `${def.charges} charge${def.charges > 1 ? "s" : ""}`;
        } else if (def.sustain) {
          durationText = "Sustained";
        }
        this._toast(`${def.name} activated! (${durationText})`, "success", 3e3);
        document.dispatchEvent(
          new CustomEvent("SkillTree:activeSkillActivated", {
            detail: { skillId, effect: def.effect, expiresAt: this.settings.activeSkillStates[skillId].expiresAt }
          })
        );
        const nextPhase = this.getActiveSkillPhase(skillId);
        this._emitActiveSkillStateChange(skillId, prevPhase, nextPhase, "activated", {
          effect: def.effect || {}
        });
        return { success: true };
      },
      deactivateSkill(skillId, reason = "manual") {
        const def = this.activeSkillDefs[skillId];
        if (!def) return { success: false, reason: "Unknown skill" };
        if (!this.isActiveSkillRunning(skillId)) {
          return { success: false, reason: "Not active" };
        }
        this._deactivateSkill(skillId, reason);
        return { success: true };
      },
      _setActiveSkillTimer(skillId, delayMs) {
        this._clearActiveSkillTimer(skillId);
        this._activeSkillTimers[skillId] = setTimeout(() => {
          delete this._activeSkillTimers[skillId];
          if (this._isStopped) return;
          this._deactivateSkill(skillId, "expired");
        }, delayMs);
      },
      _deactivateSkill(skillId, reason = "expired") {
        const prevPhase = this.getActiveSkillPhase(skillId);
        const state = this.getActiveSkillState(skillId);
        if (!state.active) return;
        this._clearActiveSkillTimer(skillId);
        this._clearActiveSkillSustain(skillId);
        if (!this.settings.activeSkillStates) this.settings.activeSkillStates = {};
        this.settings.activeSkillStates[skillId] = {
          ...state,
          active: false,
          expiresAt: 0,
          cooldownUntil: reason === "manual" ? 0 : state.cooldownUntil,
          chargesLeft: 0
        };
        this.saveSettings();
        const def = this.activeSkillDefs[skillId];
        if (def) {
          let toastText = `${def.name} expired.`;
          if (reason === "manual") toastText = `${def.name} deactivated.`;
          if (reason === "mana_depleted") toastText = `${def.name} ended (Mana depleted).`;
          this._toast(toastText, "info", 2200);
        }
        document.dispatchEvent(
          new CustomEvent("SkillTree:activeSkillExpired", {
            detail: { skillId, reason }
          })
        );
        const nextPhase = this.getActiveSkillPhase(skillId);
        this._emitActiveSkillStateChange(skillId, prevPhase, nextPhase, reason);
      },
      consumeActiveSkillCharge(skillId) {
        const state = this.getActiveSkillState(skillId);
        if (!state.active || state.chargesLeft <= 0) return false;
        if (!this.settings.activeSkillStates) this.settings.activeSkillStates = {};
        this.settings.activeSkillStates[skillId] = { ...state, chargesLeft: state.chargesLeft - 1 };
        if (state.chargesLeft - 1 <= 0) {
          this._deactivateSkill(skillId, "charges_exhausted");
        } else {
          this.saveSettings();
        }
        return true;
      },
      isDungeonCombatSkillUnlocked(skillId) {
        var _a;
        const def = (_a = this.dungeonCombatSkillDefs) == null ? void 0 : _a[skillId];
        if (!(def == null ? void 0 : def.unlock)) return false;
        const requiredLevel = def.unlock.passiveLevel || 1;
        if (Array.isArray(def.unlock.passiveSkills)) {
          return def.unlock.passiveSkills.every(
            (sid) => this.getSkillLevel(sid) >= requiredLevel
          );
        }
        const passiveLevel = this.getSkillLevel(def.unlock.passiveSkill);
        return passiveLevel >= requiredLevel;
      },
      _cloneDungeonCombatSkillState(state) {
        if (!state || typeof state !== "object") {
          return { ...DUNGEON_COMBAT_SKILL_EMPTY_STATE };
        }
        return {
          cooldownUntil: Math.max(0, Number(state.cooldownUntil) || 0),
          lastUsedAt: Math.max(0, Number(state.lastUsedAt) || 0)
        };
      },
      getDungeonCombatSkillState(skillId) {
        const states = this.settings.combatSkillStates || {};
        return this._cloneDungeonCombatSkillState(states[skillId]);
      },
      _getOffensiveCooldownReduction() {
        const bonuses = typeof this.calculateSkillBonuses === "function" ? this.calculateSkillBonuses() || {} : {};
        return Math.max(0, Math.min(0.35, Number(bonuses.attackCooldownReduction || 0)));
      },
      getEffectiveDungeonCombatSkillCooldownMs(skillId) {
        var _a;
        const def = (_a = this.dungeonCombatSkillDefs) == null ? void 0 : _a[skillId];
        if (!def) return 0;
        const baseCooldown = Math.max(1e3, Number(def.cooldownMs) || 0);
        const minimumCooldown = Math.max(
          1e3,
          Number(def.minimumCooldownMs || def.minCooldownMs) || 0
        );
        const reduction = this._getOffensiveCooldownReduction();
        return Math.max(minimumCooldown, Math.round(baseCooldown * (1 - reduction)));
      },
      getDungeonCombatSkillRuntimeSnapshot(skillId, now = Date.now()) {
        var _a;
        const def = ((_a = this.dungeonCombatSkillDefs) == null ? void 0 : _a[skillId]) || null;
        const unlocked = def ? this.isDungeonCombatSkillUnlocked(skillId) : false;
        const state = this.getDungeonCombatSkillState(skillId);
        const mana = this.getManaInfo();
        const cooldownRemaining = Math.max(0, state.cooldownUntil - now);
        return {
          skillId,
          def,
          unlocked,
          state,
          mana,
          isOnCooldown: cooldownRemaining > 0,
          cooldownRemaining,
          effectiveCooldownMs: def ? this.getEffectiveDungeonCombatSkillCooldownMs(skillId) : 0,
          effectiveManaCost: def ? this._getEffectiveManaCost(def.manaCost) : 0,
          ready: Boolean(def) && unlocked && cooldownRemaining <= 0 && mana.current >= (def ? this._getEffectiveManaCost(def.manaCost) : 0)
        };
      },
      getAvailableDungeonCombatSkillSnapshots(now = Date.now()) {
        return (this.dungeonCombatSkillOrder || []).map((skillId) => this.getDungeonCombatSkillRuntimeSnapshot(skillId, now)).filter((snapshot) => snapshot == null ? void 0 : snapshot.def);
      },
      _emitDungeonCombatSkillStateChange(skillId, prevState, nextState, reason, extra = {}) {
        document.dispatchEvent(
          new CustomEvent(DUNGEON_COMBAT_SKILL_STATE_EVENT, {
            detail: {
              skillId,
              prevState: prevState || null,
              nextState: nextState || null,
              reason: reason || "updated",
              timestamp: Date.now(),
              ...extra
            }
          })
        );
      },
      useDungeonCombatSkill(skillId) {
        var _a;
        const def = (_a = this.dungeonCombatSkillDefs) == null ? void 0 : _a[skillId];
        if (!def) return { success: false, reason: "Unknown combat skill" };
        if (!this.isDungeonCombatSkillUnlocked(skillId)) {
          return { success: false, reason: "Skill not unlocked" };
        }
        const now = Date.now();
        const prevState = this.getDungeonCombatSkillState(skillId);
        const cooldownRemaining = Math.max(0, prevState.cooldownUntil - now);
        if (cooldownRemaining > 0) {
          return {
            success: false,
            reason: `On cooldown (${Math.ceil(cooldownRemaining / 1e3)}s)`
          };
        }
        const manaInfo = this.getManaInfo();
        const effectiveManaCost = this._getEffectiveManaCost(def.manaCost);
        if (manaInfo.current < effectiveManaCost) {
          return {
            success: false,
            reason: `Not enough Mana (${Math.floor(manaInfo.current)}/${effectiveManaCost})`
          };
        }
        const cooldownMs = this.getEffectiveDungeonCombatSkillCooldownMs(skillId);
        const remainingMana = Math.max(0, manaInfo.current - effectiveManaCost);
        const nextState = {
          cooldownUntil: now + cooldownMs,
          lastUsedAt: now
        };
        this.settings.currentMana = remainingMana;
        this.settings.maxMana = manaInfo.max;
        this._setSharedMana(remainingMana, manaInfo.max);
        if (!this.settings.combatSkillStates) this.settings.combatSkillStates = {};
        this.settings.combatSkillStates[skillId] = nextState;
        this.saveSettings();
        this._emitDungeonCombatSkillStateChange(skillId, prevState, nextState, "used", {
          cooldownUntil: nextState.cooldownUntil,
          mana: remainingMana
        });
        return {
          success: true,
          def,
          state: nextState,
          mana: { current: remainingMana, max: manaInfo.max },
          cooldownMs,
          cooldownUntil: nextState.cooldownUntil,
          snapshot: this.getDungeonCombatSkillRuntimeSnapshot(skillId)
        };
      },
      restoreActiveSkillTimers() {
        const states = this.settings.activeSkillStates || {};
        const now = Date.now();
        Object.entries(states).forEach(([skillId, rawState]) => {
          const state = this._cloneActiveSkillState(rawState);
          if (!state.active) return;
          const def = this.activeSkillDefs[skillId];
          if (!def) return;
          this._startActiveSkillSustain(skillId);
          if (def.durationMs && state.expiresAt > 0) {
            const remaining = state.expiresAt - now;
            if (remaining > 0) {
              this._setActiveSkillTimer(skillId, remaining);
            } else {
              this._deactivateSkill(skillId, "expired");
              return;
            }
          }
          const nextPhase = this.getActiveSkillPhase(skillId);
          this._emitActiveSkillStateChange(skillId, null, nextPhase, "restored");
        });
      },
      getActiveBuffEffects() {
        const effects = {
          xpMultiplier: 1,
          critChanceBonus: 0,
          guaranteedCrit: false,
          allStatMultiplier: 1,
          globalMultiplier: 1
        };
        Object.entries(this.activeSkillDefs).forEach(([skillId, def]) => {
          if (!this.isActiveSkillRunning(skillId)) return;
          const eff = def.effect;
          if (eff.xpMultiplier) effects.xpMultiplier *= eff.xpMultiplier;
          if (eff.critChanceBonus) effects.critChanceBonus += eff.critChanceBonus;
          if (eff.guaranteedCrit) effects.guaranteedCrit = true;
          if (eff.allStatMultiplier) effects.allStatMultiplier *= eff.allStatMultiplier;
          if (eff.globalMultiplier) effects.globalMultiplier *= eff.globalMultiplier;
        });
        return effects;
      }
    };
    module2.exports = { ActiveSkillMethods: ActiveSkillMethods2 };
  }
});

// src/SkillTree/data.js
var require_data = __commonJS({
  "src/SkillTree/data.js"(exports2, module2) {
    var DEFAULT_SETTINGS = {
      enabled: true,
      debugMode: false,
      visibleTiers: ["tier1", "tier2", "tier3", "tier4", "tier5", "tier6"],
      currentTierPage: "tier1",
      skillPoints: 0,
      unlockedSkills: [],
      skillLevels: {},
      lastLevel: 1,
      totalEarnedSP: 0,
      totalSpentSP: 0,
      currentMana: 100,
      maxMana: 100,
      activeSkillStates: {},
      combatSkillStates: {},
      manaRegenRate: 1,
      lastManaRegen: 0
    };
    var INNATE_PASSIVES = [
      {
        id: "detoxification",
        name: "Detoxification",
        mode: "auto-scaling",
        desc: "Innate System passive that auto-purges toxins and magical debuffs, reducing their duration and granting a chance to resist or cleanse them entirely. Scales with level and rank. Does NOT resist physical effects like bleed \u2014 only poison, burn, frostbite, necrotic, and other magical ailments.",
        lore: "The System continuously cleanses Jin-Woo's body so poison and abnormal conditions fail to linger for long.",
        statusText: "Always Active \u2022 Auto-Scaling"
      },
      {
        // Canon: Longevity is the BROAD immunity passive (all diseases, toxins and
        // abnormal status effects), while Detoxification above covers only the
        // poison/magical subset. Display-only, like every INNATE_PASSIVES entry —
        // the mechanic lives in Dungeons/combat-status-effects.js, where it is
        // realised in full at Shadow Monarch as Perfect Body.
        id: "longevity",
        name: "Longevity",
        mode: "auto-scaling",
        desc: "Innate System passive granting TOTAL immunity to poison and necrotic affliction at any rank \u2014 the toxin/disease domain canon gives Jin-Woo from early on. Physical and elemental ailments (bleed, burn, frostbite, armor break) still land: canon Jin-Woo bleeds in every major fight. Those become immune too at Shadow Monarch, when this is realised in full as Perfect Body.",
        lore: "The System hardened Jin-Woo's body until sickness, poison and affliction simply stopped taking hold.",
        statusText: "Always Active \u2022 Poison/necrotic immune \u2022 Total immunity at Shadow Monarch"
      },
      {
        id: "tenacity",
        name: "Tenacity",
        mode: "conditional",
        desc: "Innate survival instinct that activates below 30% HP, halving all incoming damage. Always active \u2014 no mana cost, no cooldown. The System refuses to let you die easily.",
        lore: "When Jin-Woo is pushed toward death, the System hardens him and halves the force of incoming damage.",
        statusText: "Always Active \u2022 Triggers below 30% HP"
      }
    ];
    var HIDDEN_BLESSINGS = [
      {
        id: "blessing_of_kandiaru",
        name: "Blessing of Kandiaru",
        mode: "rank-scaling",
        desc: "Hidden blessing woven into the System itself. Passively accelerates XP gain and natural stat growth proportional to your rank. Higher rank = stronger blessing.",
        lore: "A secret favor woven into the System by Kandiaru himself, sharpening Jin-Woo's growth from the very start.",
        statusText: "Always Active \u2022 Rank-Scaled"
      }
    ];
    var SKILL_TREE = {
      tier1: {
        name: "System Foundation",
        tier: 1,
        maxLevel: 10,
        baseCost: 1,
        upgradeCostMultiplier: 1.5,
        growthRate: 1,
        skills: [
          {
            // Renamed from `longevity` (2026-08-03) to match canon: in Solo Leveling,
            // Will to Recover is the regeneration passive and Longevity is the
            // status-ailment immunity. This skill's effect was always regeneration, so
            // it belongs under Will to Recover; Longevity now sits in INNATE_PASSIVES
            // where the immunity actually lives. Old saves are carried over by
            // skillIdRenameMap in index.js — the level is preserved, not reset.
            id: "will_to_recover",
            name: "Will to Recover",
            desc: "Accelerate HP and mana recovery between combat exchanges. Base: +12% HP regen, +12% mana regen. Per level: +5% each. Requires 10 VIT, 8 INT.",
            lore: "The System regenerates Jin-Woo from any non-fatal wound \u2014 the passive that regrew what the Double Dungeon took.",
            requirement: { level: 15, vitality: 10, intelligence: 8 },
            baseEffect: { hpRegenBonus: 0.12, manaRegenBonus: 0.12 },
            perLevelEffect: { hpRegenBonus: 0.05, manaRegenBonus: 0.05 }
          }
        ]
      },
      tier2: {
        name: "Assassin Job",
        tier: 2,
        maxLevel: 15,
        baseCost: 3,
        upgradeCostMultiplier: 2,
        growthRate: 1.5,
        skills: [
          {
            id: "sprint",
            name: "Sprint",
            desc: "Assassin footwork that reduces attack cooldowns for you and your combat skills. Base: -4% cooldown. Per level: -1%. Unlocks the Sprint combat skill at level 3.",
            lore: "Jin-Woo's assassin footwork turns movement into tempo, letting each attack come faster than enemies expect.",
            requirement: { level: 35, agility: 10 },
            baseEffect: { attackCooldownReduction: 0.04 },
            perLevelEffect: { attackCooldownReduction: 0.01 }
          },
          {
            id: "mutilation",
            name: "Mutilation",
            desc: "Deepen critical strike wounds so crits tear harder. Base: +10% crit damage. Per level: +3.5%. Requires Dagger Arts. Unlocks the Mutilation combat skill at level 5.",
            lore: "A murderous finishing technique that tears through weakened targets.",
            requirement: { level: 45, strength: 10, skills: ["advanced_dagger_techniques"] },
            baseEffect: { critDamageBonus: 0.1 },
            perLevelEffect: { critDamageBonus: 0.035 }
          },
          {
            id: "vital_points_targeting",
            name: "Vital Points Targeting",
            desc: "Assassin perception that reads enemy weak points, increasing crit chance. Base: +1.2% crit. Per level: +0.7%. Requires 15 PER.",
            lore: "Assassin perception that turns openings into instant kill lines.",
            requirement: { level: 55, perception: 15 },
            baseEffect: { critBonus: 0.012 },
            perLevelEffect: { critBonus: 7e-3 }
          },
          {
            id: "advanced_dagger_techniques",
            name: "Dagger Arts",
            desc: "Refined dagger combat patterns that sharpen critical precision. Base: +0.8% crit. Per level: +0.5%. Prerequisite for Mutilation and Stealth.",
            lore: "Advanced dagger techniques honed through assassin-class combat.",
            requirement: { level: 30, strength: 5 },
            baseEffect: { critBonus: 8e-3 },
            perLevelEffect: { critBonus: 5e-3 }
          },
          {
            id: "dagger_throw",
            name: "Dagger Throw",
            desc: "Sharpen ranged dagger strikes for higher thrown damage. Base: +12% dagger throw damage. Per level: +3%. Unlocks the Dagger Throw combat skill at level 5.",
            lore: "A ranged dagger barrage that keeps pressure without sacrificing lethality.",
            requirement: { level: 65, agility: 15 },
            baseEffect: { daggerThrowDamageBonus: 0.12 },
            perLevelEffect: { daggerThrowDamageBonus: 0.03 }
          },
          {
            id: "stealth",
            name: "Stealth",
            desc: "Suppress your presence for passive XP and crit gains. Base: +2% XP, +1% crit. Per level: +1.5% XP, +0.8% crit. Unlocks the Stealth Technique active skill at level 3.",
            lore: "Presence concealment that turns a hunter into a ghost.",
            requirement: { level: 75, agility: 20, skills: ["advanced_dagger_techniques"] },
            baseEffect: { xpBonus: 0.02, critBonus: 0.01 },
            perLevelEffect: { xpBonus: 0.015, critBonus: 8e-3 }
          }
        ]
      },
      tier3: {
        name: "Job Change - Necromancer",
        tier: 3,
        maxLevel: 20,
        baseCost: 5,
        upgradeCostMultiplier: 2.5,
        growthRate: 2,
        skills: [
          {
            id: "shadow_preservation",
            name: "Shadow Preservation",
            desc: "Unlock shadow storage. Extracted shadows are preserved in the archive for permanent storage, inspection, and redeployment. Required for Shadow Senses. Requires B-rank.",
            lore: "A preserved shadow can be stored, redeployed, and observed through at will.",
            requirement: { level: 100, rank: "B" },
            unlockOnly: true,
            baseEffect: {},
            perLevelEffect: {}
          },
          {
            id: "shadow_extraction",
            name: "Shadow Extraction",
            desc: "Unlock the Arise command. Extract shadows from dungeon boss corpses after defeat, with a chance to arise shadows when sending messages. Required for Shadow Army Expansion. Requires B-rank.",
            lore: "The command that turns death into reinforcements.",
            requirement: { level: 95, rank: "B" },
            unlockOnly: true,
            baseEffect: {},
            perLevelEffect: {}
          },
          {
            id: "shadow_army_expansion",
            name: "Shadow Army Expansion",
            desc: "Unlock army-size stat scaling. Your shadow army's total count passively boosts XP gain and all stats. More shadows = stronger Monarch. Requires both Extraction and Preservation.",
            lore: "The army grows from elite summons into a complete military force. Each shadow added sharpens the Monarch's edge.",
            requirement: { level: 180, skills: ["shadow_extraction", "shadow_preservation"] },
            unlockOnly: true,
            baseEffect: {},
            perLevelEffect: {}
          }
        ]
      },
      tier4: {
        name: "Monarch Awakening",
        tier: 4,
        maxLevel: 25,
        baseCost: 10,
        upgradeCostMultiplier: 3,
        growthRate: 3,
        skills: [
          {
            id: "shadow_senses",
            name: "Shadow Senses",
            unlockOnly: true,
            desc: "Unlock the ShadowSenses plugin. Deploy shadows as remote scouts to monitor Discord users \u2014 get notified when they speak, come online, or go invisible. Requires Shadow Preservation.",
            lore: "Jin-Woo can share vision and awareness through the shadows under his command.",
            requirement: { level: 250, skills: ["shadow_preservation"] },
            baseEffect: {},
            perLevelEffect: {}
          },
          {
            id: "shadow_exchange",
            name: "Shadow Exchange",
            maxLevel: 5,
            desc: "Unlock the ShadowExchange plugin. Station shadows at Discord locations and teleport to them instantly. Each level reduces the teleport cooldown. Requires Shadow Army Expansion.",
            lore: "Switch places with a shadow instantly to control range and tempo.",
            requirement: { level: 275, skills: ["shadow_army_expansion"] },
            baseEffect: {},
            perLevelEffect: {}
          },
          {
            id: "rulers_authority",
            name: "Ruler's Authority",
            maxLevel: 3,
            desc: "Unlock the Ruler's Authority plugin (telekinetic UI control) and the Ruler's Force dungeon combat skill. Will-based power \u2014 costs no mana. Each level strengthens the combat skill's debuff duration and armor break effect.",
            lore: "The will-based force that crushes or controls without touch \u2014 a power distinct from the shadows.",
            requirement: { level: 300, rank: "A" },
            baseEffect: {},
            perLevelEffect: {}
          },
          {
            id: "domain_of_the_monarch",
            name: "Monarch's Domain",
            desc: "Unlock the Domain Expansion dungeon combat skill. Expands the Shadow Monarch's territory, buffing all deployed shadows' stats and granting them status effect immunity. Requires Ruler's Authority and Shadow Senses.",
            lore: "Within this domain, the Shadow Monarch is absolute.",
            requirement: { level: 350, intelligence: 30, skills: ["rulers_authority", "shadow_senses"] },
            baseEffect: {},
            perLevelEffect: {}
          }
        ]
      },
      tier5: {
        name: "Ashborn Will",
        tier: 5,
        maxLevel: 30,
        baseCost: 15,
        upgradeCostMultiplier: 3.5,
        growthRate: 4,
        skills: [
          {
            id: "black_heart_awakened",
            name: "Black Heart",
            desc: "Absorb Ashborn's Black Heart \u2014 permanently sets max mana to 100,000. Binary unlock, not upgradeable. Requires Shadow Exchange, Ruler's Authority, and Monarch's Domain. Requires 90 STR, 90 AGI.",
            lore: "The crystallised core of the Shadow Monarch. Its mana is limitless, its gift irreversible.",
            requirement: {
              level: 1e3,
              strength: 90,
              agility: 90,
              skills: ["shadow_exchange", "rulers_authority", "domain_of_the_monarch"]
            },
            unlockOnly: true,
            baseEffect: { flatMana: 1e5 },
            perLevelEffect: {}
          },
          {
            id: "ashborns_will",
            name: "Ashborn's Will",
            desc: "Inherit Ashborn's resolve \u2014 a powerful all-around passive. Base: +20% XP, +10% all stats, +6% crit, +8% quest rewards. Per level: +6% XP, +2.6% all stats, +1.6% crit, +2.2% quest. Requires Black Heart.",
            lore: "Ashborn chose you as successor not for strength, but for the will that refused to break.",
            requirement: { level: 1400, skills: ["black_heart_awakened"] },
            baseEffect: { xpBonus: 0.2, allStatBonus: 0.1, critBonus: 0.06, questBonus: 0.08 },
            perLevelEffect: {
              xpBonus: 0.06,
              allStatBonus: 0.026,
              critBonus: 0.016,
              questBonus: 0.022
            }
          },
          {
            id: "dragons_fear",
            name: "Dragon's Fear",
            desc: "Unlock Dragon's Fear dungeon combat skill. Release Kamish's draconic terror scream \u2014 a soul-level shout that paralyzes all mobs at or below your rank and terrifies bosses. No passive bonuses \u2014 pure combat ability.",
            lore: "The fear that paralysed an entire nation's S-Rank hunters, now yours to command.",
            requirement: { level: 1600, skills: ["ashborns_will"] },
            unlockOnly: true,
            baseEffect: {},
            perLevelEffect: {}
          }
        ]
      },
      tier6: {
        name: "True Shadow Monarch",
        tier: 6,
        maxLevel: 35,
        baseCost: 25,
        upgradeCostMultiplier: 4,
        growthRate: 5,
        skills: [
          {
            id: "eternal_shadow_monarch",
            name: "True Shadow Monarch",
            desc: "The final ascension. +300% all stats, 100% arise chance, 99% damage reduction (always active via Tenacity / Undying Will), immortality (HP can never reach zero), -75% mana costs, +100% HP/mana regen, 3x shadow growth rate. Requires Black Heart, Ashborn's Will, and Dragon's Fear.",
            lore: "No longer successor \u2014 you are the eternal Shadow Monarch. Every shadow bows, every stat surges, every enemy kneels.",
            requirement: { level: 2e3, skills: ["black_heart_awakened", "ashborns_will", "dragons_fear"] },
            unlockOnly: true,
            baseEffect: {
              allStatBonus: 3,
              hpRegenBonus: 1,
              manaRegenBonus: 1,
              manaCostReduction: 0.75,
              tenacityThreshold: 1,
              tenacityDamageReduction: 0.99,
              ariseChanceOverride: 1,
              shadowGrowthMultiplier: 3
            },
            perLevelEffect: {}
          }
        ]
      }
    };
    var ACTIVE_SKILL_DEFS = {
      stealth_technique: {
        id: "stealth_technique",
        name: "Stealth Technique",
        desc: "Toggle presence concealment. While active: +20% crit chance, +15% XP gain. Costs 200 mana to activate, then sustains at 10 mana/sec (auto-deactivates before mana hits zero). 25min cooldown after deactivation. Requires Stealth passive level 3.",
        lore: "Conceal your presence, close distance, and strike before you're seen.",
        manaCost: 200,
        durationMs: null,
        sustain: {
          manaPerTick: 10,
          tickMs: 1e3,
          policy: "never_deplete",
          regenSafetyMultiplier: 0.9,
          minManaFloor: 1
        },
        cooldownMs: 25 * 60 * 1e3,
        effect: { xpMultiplier: 1.15, critChanceBonus: 0.2 },
        unlock: { passiveSkill: "stealth", passiveLevel: 3 }
      }
    };
    var ACTIVE_SKILL_ORDER = [
      "stealth_technique"
    ];
    var DUNGEON_COMBAT_SKILL_DEFS = {
      mutilation: {
        id: "mutilation",
        name: "Mutilation",
        buttonLabel: "MUTILATION",
        desc: "Rapid-fire chain of guaranteed critical dagger slashes. 2.6x damage, every hit crits. Executes targets below 35% HP for 1.35x bonus damage. Inflicts max bleed stacks \u2014 deep wounds that deal DOT damage scaling with your stats vs target rank. 70 mana, 90s cooldown.",
        lore: "The evolved form of Fatal Strike. Jinwoo's daggers move faster than sight \u2014 each cut a guaranteed critical, each slash aimed at a weak point. Even the Monarch of Destruction could not withstand this relentless onslaught.",
        manaCost: 70,
        cooldownMs: 90 * 1e3,
        minimumCooldownMs: 35 * 1e3,
        damageMultiplier: 2.6,
        forceCritical: true,
        executeThreshold: 0.35,
        executeMultiplier: 1.35,
        targeting: "single",
        statusEffect: { name: "bleed", stacks: 5, chance: 1 },
        unlock: { passiveSkill: "mutilation", passiveLevel: 5 }
      },
      dagger_throw: {
        id: "dagger_throw",
        name: "Dagger Throw",
        buttonLabel: "DAGGER THROW",
        desc: "Hurl shadow-laced daggers that pierce through enemy defenses. Damage strongly scales with agility \u2014 faster reflexes mean more lethal throws. 1.35x base multiplier with agility-driven variance. Inflicts armorBreak on impact. 35 mana, 30s cooldown.",
        lore: "Even at range, Jinwoo's dagger work retains its killing edge. Combined with telekinetic control, each thrown blade flies with guided precision \u2014 a ranged extension of the assassin's lethal craft.",
        manaCost: 35,
        cooldownMs: 30 * 1e3,
        minimumCooldownMs: 10 * 1e3,
        damageMultiplier: 1.35,
        passiveDamageBonusKey: "daggerThrowDamageBonus",
        // Agility scaling: agility drives a damage spectrum instead of a fixed multiplier.
        // Each point of agility adds 1.5% damage, with ±15% variance per throw.
        // This replaces the old flat 50-500 piercing cap model with a continuous spectrum.
        agilityScaling: { perPoint: 0.015, variance: 0.15 },
        targeting: "piercing",
        statusEffect: { name: "armorBreak", stacks: 2, chance: 0.65 },
        unlock: { passiveSkill: "dagger_throw", passiveLevel: 5 }
      },
      dagger_rush: {
        id: "dagger_rush",
        name: "Dagger Rush",
        buttonLabel: "DAGGER RUSH",
        desc: "Omnidirectional blade storm controlled by Ruler's Authority. AOE DOT: 0.65x damage every 2s for 12s (+2s per level), hitting up to 150 mobs (+15 per level). Each tick inflicts bleed \u2014 sustained cuts that stack DOT. Damage scales +12% per Ruler's Authority level. 80 mana, 60s cooldown.",
        lore: "The ultimate expression of dagger mastery combined with telekinetic control. Jinwoo's daggers orbit the battlefield autonomously, guided by Ruler's Authority \u2014 each blade a homing instrument of destruction that rips through everything in range for the duration.",
        manaCost: 80,
        cooldownMs: 60 * 1e3,
        minimumCooldownMs: 25 * 1e3,
        combatEffect: "dot_aoe",
        dot: {
          tickIntervalMs: 2e3,
          durationMs: 12e3,
          durationPerLevel: 2e3,
          damageMultiplier: 0.65,
          damagePerLevel: 0.04,
          maxMobTargets: 150,
          maxMobTargetsPerLevel: 15,
          rulersAuthorityBonusPerLevel: 0.12
        },
        statusEffect: { name: "bleed", stacks: 1, stacksPerTick: 1, chance: 0.8 },
        unlock: { passiveSkills: ["dagger_throw", "rulers_authority"], passiveLevel: 1 }
      },
      sprint_burst: {
        id: "sprint_burst",
        name: "Sprint",
        buttonLabel: "SPRINT",
        desc: "Boost all deployed shadows' attack speed. -30% attack cooldown (-3% per level) for 180s (+15s per level). The signature assassin skill \u2014 15 mana, 5min cooldown. No status effects \u2014 pure speed.",
        lore: "The first active skill Jinwoo ever learned. At higher levels it evolves toward Quicksilver \u2014 a speed so absolute that enemies perceive only afterimages. In lore, costs merely 1 mana per minute to sustain.",
        manaCost: 15,
        cooldownMs: 300 * 1e3,
        minimumCooldownMs: 120 * 1e3,
        combatEffect: "speed_boost",
        speedBoost: {
          durationMs: 18e4,
          durationPerLevel: 15e3,
          attackCooldownReduction: 0.3,
          attackCooldownReductionPerLevel: 0.03
        },
        unlock: { passiveSkill: "sprint", passiveLevel: 3 }
      },
      rulers_authority_force: {
        id: "rulers_authority_force",
        name: "Ruler's Authority",
        buttonLabel: "RULER'S AUTHORITY",
        desc: "Telekinetic crush \u2014 stuns boss for 5s (doubles per level), immobilizes 25% of mobs (+5% per level), and inflicts armorBreak (shatters defenses, increasing incoming damage by 6% per stack). Also reduces boss damage resistance by 15% (+5% per level). Costs no mana \u2014 pure will. 2min cooldown.",
        lore: "The power of the Rulers, inherited through Ashborn. A will-based telekinetic force so overwhelming that even Monarch-level fighters cannot counter it unless they wield the same power. Jinwoo controls objects, daggers, and the very air around him \u2014 enemies are paralyzed under the weight of his intent.",
        manaCost: 0,
        cooldownMs: 120 * 1e3,
        minimumCooldownMs: 45 * 1e3,
        combatEffect: "debuff",
        debuff: {
          disableAttacksDurationMs: 5e3,
          durationScaling: "double_per_level",
          damageResistReduction: 0.15,
          resistReductionPerLevel: 0.05,
          mobTargetPercent: 0.25,
          mobTargetPercentPerLevel: 0.05
        },
        statusEffect: { name: "armorBreak", stacks: 3, chance: 1 },
        unlock: { passiveSkill: "rulers_authority", passiveLevel: 2 }
      },
      domain_expansion: {
        id: "domain_expansion",
        name: "Monarch's Domain",
        buttonLabel: "MONARCH DOMAIN",
        desc: "Expand the Shadow Monarch's territory. All deployed shadows receive +50% all stats (+5% per level) for 30s (+5s per level). While active, shadows are immune to all enemy status effects \u2014 no poison, bleed, burn, frostbite, or necrotic can touch them within the domain. 100 mana, 3min cooldown.",
        lore: "The Monarch's shadow spreads across the predetermined space, creating a territory where the Shadow Monarch's power is absolute. Every shadow soldier fights at full strength without restriction \u2014 their stats amplified by the Monarch's will. Even the terrain bends to Jinwoo's command within the domain.",
        manaCost: 100,
        cooldownMs: 180 * 1e3,
        minimumCooldownMs: 60 * 1e3,
        combatEffect: "shadow_buff",
        shadowBuff: {
          durationMs: 3e4,
          durationPerLevel: 5e3,
          allStatMultiplier: 1.5,
          allStatMultiplierPerLevel: 0.05,
          statusImmunity: true
        },
        unlock: { passiveSkill: "domain_of_the_monarch", passiveLevel: 3 }
      },
      bloodlust_aura: {
        id: "bloodlust_aura",
        name: "Bloodlust",
        buttonLabel: "BLOODLUST",
        desc: "Project murderous intent \u2014 fully paralyzes all mobs for 60s (+10s per level) and reduces boss stats by 50% (+3% per level) for half that duration. Pure fear-based CC: no damage, no status ailments. Overwhelms targets through killing intent alone. 100 mana, 2min cooldown.",
        lore: "An aura of pure killing intent so overwhelming that even S-Rank hunters cannot move. Bloodlust magically intimidates targets into submission, crushing their will and halving their strength. The fear-based effect wears off after one minute, but the psychological damage lingers.",
        manaCost: 100,
        cooldownMs: 120 * 1e3,
        minimumCooldownMs: 40 * 1e3,
        combatEffect: "bloodlust",
        bloodlust: {
          baseDurationMs: 6e4,
          durationPerLevel: 1e4,
          mobParalysisFull: true,
          bossStatReduction: 0.5,
          bossStatReductionPerLevel: 0.03,
          bossDurationMultiplier: 0.5
        },
        unlock: { passiveSkill: "advanced_dagger_techniques", passiveLevel: 8 }
      },
      dragons_fear_roar: {
        id: "dragons_fear_roar",
        name: "Dragon's Fear",
        buttonLabel: "DRAGON'S FEAR",
        desc: "Kamish's draconic terror scream \u2014 a soul-level shout that paralyzes all mobs at or below your rank for 8s (+2s per level). Boss receives 40% of that duration, reduced further by 35% per rank above yours. Indiscriminate \u2014 hits every weaker being in range. No status ailments, pure psychic terror. 120 mana, 2.5min cooldown.",
        lore: "Obtained from Kamish's rune stone, this is the draconic wave of terror that once paralyzed an entire nation's S-Rank hunters. The shout is indiscriminate \u2014 it affects anyone weaker than the user in their vicinity. Jinwoo ironically used Kamish's own power against Antares and the Monarchs in the final war.",
        manaCost: 120,
        cooldownMs: 150 * 1e3,
        minimumCooldownMs: 50 * 1e3,
        combatEffect: "fear",
        fear: {
          baseDurationMs: 8e3,
          durationPerLevel: 2e3,
          bossResistPerRankAbove: 0.35,
          bossDurationMultiplier: 0.4,
          mobParalysisFull: true
        },
        unlock: { passiveSkill: "dragons_fear", passiveLevel: 1 }
      }
    };
    var DUNGEON_COMBAT_SKILL_ORDER = ["mutilation", "dagger_throw", "dagger_rush", "sprint_burst", "bloodlust_aura", "rulers_authority_force", "domain_expansion", "dragons_fear_roar"];
    function createSkillTreeData2() {
      return {
        defaultSettings: structuredClone(DEFAULT_SETTINGS),
        innatePassives: structuredClone(INNATE_PASSIVES),
        hiddenBlessings: structuredClone(HIDDEN_BLESSINGS),
        skillTree: structuredClone(SKILL_TREE),
        activeSkillDefs: structuredClone(ACTIVE_SKILL_DEFS),
        activeSkillOrder: [...ACTIVE_SKILL_ORDER],
        dungeonCombatSkillDefs: structuredClone(DUNGEON_COMBAT_SKILL_DEFS),
        dungeonCombatSkillOrder: [...DUNGEON_COMBAT_SKILL_ORDER]
      };
    }
    module2.exports = { createSkillTreeData: createSkillTreeData2 };
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

// src/SkillTree/skill-upgrade-methods.js
var require_skill_upgrade_methods = __commonJS({
  "src/SkillTree/skill-upgrade-methods.js"(exports2, module2) {
    var { RANK_ORDER: SOLO_RANK_ORDER2 } = require_rank_utils();
    var SkillTreeUpgradeMethods2 = {
      _syncUnlockedSkillState(skillId) {
        if (!Array.isArray(this.settings.unlockedSkills)) {
          this.settings.unlockedSkills = [];
        }
        if (!this.settings.unlockedSkills.includes(skillId)) {
          this.settings.unlockedSkills.push(skillId);
        }
      },
      _finalizeSkillUpgrade(skillId) {
        this.settings.totalSpentSP = this.getTotalSpentSP();
        this._syncUnlockedSkillState(skillId);
        this._cache.skillBonuses = null;
        this._cache.skillBonusesTime = 0;
        this._cache.isShadowMonarchValue = void 0;
        this._cache.isShadowMonarchTime = 0;
        this.saveSettings();
        this.updateButtonText();
        const newLevel = this.getSkillLevel(skillId);
        try {
          document.dispatchEvent(
            new CustomEvent("SkillTree:skillLevelChanged", {
              detail: { skillId, level: newLevel }
            })
          );
        } catch (_) {
        }
      },
      /**
       * Get skill level (0 = not unlocked)
       * @param {string} skillId - Skill ID
       * @returns {number} - Skill level (0 if not unlocked)
       */
      getSkillLevel(skillId) {
        return this.settings.skillLevels[skillId] || 0;
      },
      /**
       * Get skill unlock cost. Driven entirely by the tier — every skill in a tier
       * costs the same to unlock, which is why no skill argument is taken.
       * @param {Object} tier - Tier definition
       * @returns {number} - Unlock cost in SP
       */
      getSkillUnlockCost(tier) {
        return tier.baseCost || 1;
      },
      /**
       * Get total upgrade cost up to a certain level. Cost per level is tier-driven;
       * only the level CAP is skill-specific, and clamping is the caller's job here
       * (see getNextUpgradeCost, which does take a skill for exactly that reason).
       * @param {Object} tier - Tier definition
       * @param {number} targetLevel - Target level
       * @returns {number} - Total upgrade cost
       */
      getSkillUpgradeCost(tier, targetLevel) {
        if (targetLevel <= 1) return 0;
        const baseCost = tier.baseCost || 1;
        const multiplier = tier.upgradeCostMultiplier || 1.5;
        let total = 0;
        for (let i = 1; i <= targetLevel - 1; i++) {
          total += Math.ceil(baseCost * i * multiplier);
        }
        return total;
      },
      /**
       * Get cost to upgrade skill to next level
       * @param {Object} skill - Skill definition
       * @param {Object} tier - Tier definition
       * @returns {number|null} - Cost in SP, or null if max level
       */
      getNextUpgradeCost(skill, tier) {
        const currentLevel = this.getSkillLevel(skill.id);
        if (currentLevel === 0) {
          return tier.baseCost || 1;
        }
        const maxLevel = skill.unlockOnly ? 1 : skill.maxLevel || tier.maxLevel || 10;
        if (currentLevel >= maxLevel) {
          return null;
        }
        const baseCost = tier.baseCost || 1;
        const multiplier = tier.upgradeCostMultiplier || 1.5;
        return Math.ceil(baseCost * currentLevel * multiplier);
      },
      /**
       * Get skill effect at current level
       * @param {Object} skill - Skill definition
       * @param {Object} tier - Tier definition
       * @returns {Object|null} - Effect object or null if not unlocked
       */
      getSkillEffect(skill, tier) {
        const level = this.getSkillLevel(skill.id);
        if (level === 0) return null;
        const effect = {};
        const growthRate = tier.growthRate || 1;
        const effectKeys = /* @__PURE__ */ new Set([
          ...Object.keys(skill.baseEffect || {}),
          ...Object.keys(skill.perLevelEffect || {})
        ]);
        effectKeys.forEach((key) => {
          var _a, _b;
          const baseValue = ((_a = skill.baseEffect) == null ? void 0 : _a[key]) || 0;
          const perLevelValue = ((_b = skill.perLevelEffect) == null ? void 0 : _b[key]) || 0;
          effect[key] = baseValue + perLevelValue * (level - 1) * growthRate;
        });
        return effect;
      },
      /**
       * Find skill and tier by skill ID
       * @param {string} skillId - Skill ID to find
       * @returns {Object|null} - Object with skill and tier, or null if not found
       */
      findSkillAndTier(skillId) {
        try {
          const result = Object.values(this.skillTree).filter((tierData) => tierData == null ? void 0 : tierData.skills).map((tierData) => ({
            skill: tierData.skills.find((s) => s.id === skillId),
            tier: tierData
          })).find(({ skill }) => skill);
          return result || null;
        } catch (error) {
          console.error("SkillTree: Error finding skill", error);
          return null;
        }
      },
      _meetsMinimumRequirement(requiredValue, currentValue) {
        return !requiredValue || currentValue >= requiredValue;
      },
      _meetsStatRequirements(requirement, stats) {
        const perception = stats.perception || 0;
        const statRules = [
          ["strength", stats.strength || 0],
          ["agility", stats.agility || 0],
          ["intelligence", stats.intelligence || 0],
          ["vitality", stats.vitality || 0],
          ["perception", perception]
        ];
        return statRules.every(([key, value]) => this._meetsMinimumRequirement(requirement[key], value));
      },
      _hasRequiredSkills(requirementSkills) {
        if (!Array.isArray(requirementSkills)) return true;
        return requirementSkills.every((prereqId) => this.getSkillLevel(prereqId) > 0);
      },
      _meetsRankRequirement(requiredRank, currentRank) {
        if (!requiredRank) return true;
        const reqIdx = SOLO_RANK_ORDER2.indexOf(requiredRank);
        const curIdx = SOLO_RANK_ORDER2.indexOf(currentRank);
        if (reqIdx === -1 || curIdx === -1) return false;
        return curIdx >= reqIdx;
      },
      /**
       * Check if skill can be unlocked/upgraded
       * @param {Object} skill - Skill definition
       * @param {Object} tier - Tier definition
       * @returns {boolean} - True if skill can be upgraded
       */
      canUnlockSkill(skill, tier) {
        try {
          const soloData = this.getSoloLevelingData();
          if (!soloData) return false;
          const currentLevel = this.getSkillLevel(skill.id);
          const maxLevel = skill.unlockOnly ? 1 : skill.maxLevel || tier.maxLevel || 10;
          if (currentLevel >= maxLevel) return false;
          const cost = this.getNextUpgradeCost(skill, tier);
          if (!cost || this.settings.skillPoints < cost) return false;
          const requirement = skill.requirement || {};
          if (!this._meetsMinimumRequirement(requirement.level, soloData.level)) {
            return false;
          }
          const stats = soloData.stats || {};
          if (!this._meetsStatRequirements(requirement, stats)) return false;
          if (!this._meetsRankRequirement(requirement.rank, soloData.rank)) return false;
          if (!this._hasRequiredSkills(requirement.skills)) return false;
          return true;
        } catch (error) {
          console.error("SkillTree: Error checking if skill can be unlocked", error);
          return false;
        }
      },
      /**
       * Unlock or upgrade a skill
       * @param {string} skillId - Skill ID to unlock/upgrade
       * @returns {boolean} - True if successful
       */
      unlockOrUpgradeSkill(skillId) {
        try {
          const result = this.findSkillAndTier(skillId);
          if (!result) {
            console.error("SkillTree: Skill not found:", skillId);
            return false;
          }
          const { skill, tier } = result;
          if (!this.canUnlockSkill(skill, tier)) {
            return false;
          }
          const cost = this.getNextUpgradeCost(skill, tier);
          if (!cost) return false;
          this.settings.skillPoints -= cost;
          const currentLevel = this.getSkillLevel(skillId);
          this.settings.skillLevels[skillId] = (currentLevel || 0) + 1;
          this._finalizeSkillUpgrade(skillId);
          const newLevel = this.getSkillLevel(skillId);
          const message = currentLevel === 0 ? `Skill Unlocked: ${skill.name}` : `${skill.name} upgraded to Level ${newLevel}!`;
          this._toast(message, "success");
          return true;
        } catch (error) {
          console.error("SkillTree: Error unlocking/upgrading skill", error);
          return false;
        }
      },
      _buildMaxUpgradePlan(tier, currentLevel, availableSP, skill = null) {
        const maxLevel = skill && skill.unlockOnly ? 1 : (skill == null ? void 0 : skill.maxLevel) || tier.maxLevel || 10;
        const baseCost = tier.baseCost || 1;
        const multiplier = tier.upgradeCostMultiplier || 1.5;
        let targetLevel = currentLevel;
        let totalCost = 0;
        let levelsUpgraded = 0;
        let remainingSP = availableSP;
        while (targetLevel < maxLevel && remainingSP > 0) {
          const nextCost = targetLevel === 0 ? baseCost : Math.ceil(baseCost * targetLevel * multiplier);
          if (!nextCost || remainingSP < nextCost) break;
          totalCost += nextCost;
          remainingSP -= nextCost;
          targetLevel++;
          levelsUpgraded++;
        }
        return { maxLevel, targetLevel, levelsUpgraded, totalCost };
      },
      /**
       * Max upgrade a skill (use all remaining SP)
       * @param {string} skillId - Skill ID to max upgrade
       * @returns {boolean} - True if successful
       */
      maxUpgradeSkill(skillId) {
        try {
          const result = this.findSkillAndTier(skillId);
          if (!result) {
            console.error("SkillTree: Skill not found:", skillId);
            return false;
          }
          const { skill, tier } = result;
          const currentLevel = this.getSkillLevel(skillId);
          const plan = this._buildMaxUpgradePlan(tier, currentLevel, this.settings.skillPoints, skill);
          if (currentLevel >= plan.maxLevel) return false;
          if (!this.canUnlockSkill(skill, tier)) {
            return false;
          }
          if (plan.levelsUpgraded === 0) {
            return false;
          }
          this.settings.skillPoints -= plan.totalCost;
          this.settings.skillLevels[skillId] = plan.targetLevel;
          this._finalizeSkillUpgrade(skillId);
          const message = currentLevel === 0 ? `Skill Unlocked: ${skill.name} (Level ${plan.targetLevel})` : `${skill.name} upgraded ${plan.levelsUpgraded} level(s) to Level ${plan.targetLevel}!`;
          this._toast(message, "success");
          return true;
        } catch (error) {
          console.error("SkillTree: Error max upgrading skill", error);
          return false;
        }
      }
    };
    module2.exports = { SkillTreeUpgradeMethods: SkillTreeUpgradeMethods2 };
  }
});

// src/SkillTree/styles.js
var require_styles = __commonJS({
  "src/SkillTree/styles.js"(exports2, module2) {
    var STYLE_ID = "skilltree-css";
    var SKILL_TREE_CSS = `
      /* \u2500\u2500 Font Override \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */

      /* Main Button - Matching Discord native toolbar buttons (GIF, Stickers, Emoji) */
      .st-skill-tree-button-wrapper {
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 0;
        margin: 0 0 0 4px;
        box-sizing: border-box;
      }
      .st-skill-tree-button {
        width: 32px;
        height: 32px;
        background: transparent;
        border: 1px solid rgba(138, 43, 226, 1);
        border-radius: 2px;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: color 0.15s ease, background-color 0.15s ease;
        color: var(--interactive-normal, #b9bbbe);
        padding: 0;
        margin: 0;
        box-sizing: border-box;
      }
      .st-skill-tree-button:hover {
        color: var(--interactive-hover, #dcddde);
        background: rgba(138, 43, 226, 0.15);
        border-color: rgba(138, 43, 226, 0.85);
      }
      .st-skill-tree-button:active {
        color: var(--interactive-active, #fff);
        background: rgba(138, 43, 226, 0.25);
        border-color: rgba(138, 43, 226, 1);
      }
      .st-skill-tree-button svg {
        width: 20px;
        height: 20px;
        display: block;
      }

      /* Modal Container */
      .skilltree-modal {
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: linear-gradient(145deg, #0a0a10 0%, #0d0d14 50%, #08080e 100%);
        border-radius: 2px;
        padding: 0;
        max-width: 900px;
        width: 90vw;
        max-height: 85vh;
        display: flex;
        flex-direction: column;
        overflow: hidden;
        z-index: 10001;
        box-shadow: 0 20px 60px rgba(0, 0, 0, 0.8),
                    0 0 100px rgba(138, 43, 226, 0.3),
                    inset 0 0 100px rgba(75, 0, 130, 0.1);
        border: 1px solid rgba(138, 43, 226, 0.4);
        animation: modalFadeIn 0.3s ease-out;
      }
      @keyframes modalFadeIn {
        from {
          opacity: 0;
          transform: translate(-50%, -50%) scale(0.9);
        }
        to {
          opacity: 1;
          transform: translate(-50%, -50%) scale(1);
        }
      }

      /* Modal Content */
      .skilltree-modal-content {
        padding: 30px;
        padding-bottom: 100px;
        overflow-y: auto;
        flex: 1;
        min-height: 0;
        background: linear-gradient(180deg, #0a0a0f 0%, #08080d 100%);
      }

      /* Header */
      .skilltree-header {
        background: linear-gradient(135deg, #1a0e2e 0%, #140a24 100%);
        padding: 25px 30px;
        border-bottom: 1px solid rgba(138, 43, 226, 0.3);
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.5);
        position: relative;
        overflow: visible;
        flex-shrink: 0;
      }
      .skilltree-header::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent);
        animation: shimmer 3s infinite;
        pointer-events: none;
        clip-path: inset(0);
        will-change: transform;
      }
      @keyframes shimmer {
        0% { transform: translateX(-100%); }
        100% { transform: translateX(100%); }
      }
      .skilltree-header h2 {
        margin: 0 0 12px 0;
        color: #dcddde;
        font-size: 28px;
        font-weight: 800;
        text-shadow: 0 2px 10px rgba(138, 43, 226, 0.8),
                     0 0 20px rgba(75, 0, 130, 0.6);
        letter-spacing: 1px;
        background: linear-gradient(135deg, #fff 0%, #e8dcff 50%, #d4b8ff 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
      }
      .skilltree-header-info {
        display: flex;
        gap: 20px;
        align-items: center;
        flex-wrap: wrap;
      }
      .skilltree-stat {
        display: inline-flex;
        align-items: center;
        gap: 8px;
        padding: 8px 16px;
        background: rgba(10, 10, 16, 0.98);
        border: 1px solid rgba(138, 43, 226, 0.4);
        border-radius: 2px;
        color: #e8dcff;
        font-size: 14px;
        font-weight: 600;
      }

      .skilltree-reset-btn {
        padding: 10px 20px;
        background: linear-gradient(135deg, #6b21a8 0%, #4c1d95 100%);
        border: 1px solid rgba(138, 43, 226, 0.85);
        border-radius: 2px;
        color: #f5f3ff;
        font-size: 14px;
        font-weight: bold;
        cursor: pointer;
        outline: none;
        transition: all 0.3s ease;
        box-shadow: 0 0 15px rgba(138, 43, 226, 0.35);
        text-transform: uppercase;
        letter-spacing: 0.5px;
      }

      .skilltree-reset-btn:hover {
        background: linear-gradient(135deg, #8a2be2 0%, #8a2be2 100%);
        border-color: rgba(196, 181, 253, 0.95);
        box-shadow: 0 0 25px rgba(138, 43, 226, 0.6);
        transform: translateY(-2px);
      }

      .skilltree-reset-btn:active {
        transform: translateY(0);
        box-shadow: 0 0 15px rgba(138, 43, 226, 0.45), 0 2px 10px rgba(0, 0, 0, 0.2);
      }

      /* Custom Confirm Dialog */
      .st-confirm-dialog-overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: #000000cc;
        backdrop-filter: blur(10px);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10001;
        animation: fadeIn 0.2s ease;
      }

      .st-confirm-dialog {
        background: linear-gradient(135deg, #0a0a10 0%, #08080d 100%);
        border: 1px solid rgba(138, 43, 226, 0.5);
        border-radius: 2px;
        width: 90%;
        max-width: 500px;
        box-shadow: 0 0 40px rgba(138, 43, 226, 0.35);
        animation: bounceIn 0.3s ease;
      }

      .st-confirm-header {
        padding: 20px;
        border-bottom: 1px solid rgba(138, 43, 226, 0.35);
      }

      .st-confirm-header h3 {
        margin: 0;
        color: #8a2be2;
        font-size: 22px;
        font-weight: bold;
        text-align: center;
      }

      .st-confirm-body {
        padding: 25px;
        color: #dcddde;
        font-size: 15px;
        line-height: 1.6;
      }

      .st-confirm-body p {
        margin: 0 0 10px 0;
      }

      .st-confirm-body ul {
        margin: 10px 0;
        padding-left: 25px;
      }

      .st-confirm-body li {
        margin: 8px 0;
        color: #dcddde;
      }

      .st-confirm-actions {
        display: flex;
        gap: 12px;
        padding: 20px;
        border-top: 1px solid rgba(138, 43, 226, 0.25);
      }

      .st-confirm-btn {
        flex: 1;
        padding: 12px 24px;
        border-radius: 2px;
        font-size: 15px;
        font-weight: bold;
        cursor: pointer;
        outline: none;
        transition: all 0.25s ease;
        text-transform: uppercase;
        letter-spacing: 0.5px;
      }

      .st-confirm-cancel {
        background: linear-gradient(135deg, #0d0d14 0%, #0d0d14 100%);
        border: 1px solid rgba(138, 43, 226, 0.35);
        color: #dcddde;
      }

      .st-confirm-cancel:hover {
        background: linear-gradient(135deg, #111118 0%, #111118 100%);
        border-color: rgba(138, 43, 226, 0.7);
        transform: translateY(-2px);
        box-shadow: 0 0 20px rgba(138, 43, 226, 0.35);
      }

      .st-confirm-yes {
        background: linear-gradient(135deg, #7a26cc 0%, #4b0082 100%);
        border: 1px solid rgba(138, 43, 226, 0.9);
        color: white;
        box-shadow: 0 0 20px rgba(138, 43, 226, 0.4);
      }

      .st-confirm-yes:hover {
        background: linear-gradient(135deg, rgba(138, 43, 226, 1) 0%, rgba(138, 43, 226, 1) 100%);
        border-color: rgba(138, 43, 226, 1);
        transform: translateY(-2px);
        box-shadow: 0 0 25px rgba(138, 43, 226, 0.55);
      }

      .st-confirm-btn:active {
        transform: translateY(0);
      }
      .skilltree-stat-value {
        color: #fbbf24;
        font-weight: 700;
        text-shadow: 0 0 10px rgba(251, 191, 36, 0.5);
      }

      /* Close Button */
      .skilltree-close-btn {
        position: absolute;
        top: 15px;
        right: 15px;
        background: linear-gradient(135deg, #8a2be2 0%, #5b21b6 100%);
        color: #f5f3ff;
        border: 1px solid rgba(196, 181, 253, 0.75);
        border-radius: 2px;
        padding: 8px 12px;
        cursor: pointer;
        font-size: 18px;
        font-weight: 700;
        box-shadow: 0 4px 15px rgba(138, 43, 226, 0.42);
        transition: all 0.2s;
        z-index: 10;
      }
      .skilltree-close-btn:hover {
        transform: none;
        background: linear-gradient(135deg, #8a2be2 0%, #8a2be2 100%);
        border-color: rgba(221, 214, 254, 0.95);
        box-shadow: 0 6px 20px rgba(138, 43, 226, 0.6);
      }

      /* Tier Section */
      /* Tier Navigation Bar */
      .skilltree-tier-nav {
        display: flex;
        gap: 8px;
        padding: 16px 20px;
        background: linear-gradient(135deg, #12091e 0%, #0e0716 100%);
        border-bottom: 1px solid rgba(138, 43, 226, 0.2);
        overflow-x: auto;
        flex-shrink: 0;
        scrollbar-width: none !important;
        -ms-overflow-style: none !important;
      }

      .skilltree-tier-nav::-webkit-scrollbar {
        width: 0 !important;
        height: 0 !important;
        display: none !important;
      }

      .skilltree-tier-nav::-webkit-scrollbar-track {
        background: transparent !important;
      }

      .skilltree-tier-nav::-webkit-scrollbar-thumb {
        background: transparent !important;
        border: none !important;
      }

      .skilltree-tier-nav-btn {
        padding: 10px 18px;
        min-width: 80px;
        text-align: center;
        flex-shrink: 0;
        background: linear-gradient(135deg, #0d0d14 0%, #08080d 100%);
        border: 1px solid rgba(138, 43, 226, 0.5);
        border-radius: 2px;
        color: #dcddde;
        font-size: 13px;
        font-weight: 600;
        cursor: pointer;
        outline: none;
        transition: all 0.3s ease;
        box-shadow: 0 0 15px rgba(138, 43, 226, 0.2);
        white-space: nowrap;
        text-transform: uppercase;
        letter-spacing: 0.5px;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      .skilltree-tier-nav-btn:hover {
        border-color: rgba(138, 43, 226, 0.8);
        background: linear-gradient(135deg, #2a1548 0%, #1e0f36 100%);
        box-shadow: 0 0 25px rgba(138, 43, 226, 0.5);
        transform: translateY(-2px);
        color: #fff;
      }

      .skilltree-tier-nav-btn:active {
        transform: translateY(0);
        box-shadow: 0 0 15px rgba(138, 43, 226, 0.3);
      }

      .skilltree-tier-nav-btn.active {
        background: linear-gradient(135deg, #3d1a66 0%, #2e1450 100%);
        border-color: #8a2be2;
        box-shadow: 0 0 30px rgba(138, 43, 226, 0.7);
        color: #fff;
        font-weight: 700;
      }

      .skilltree-tier {
        margin: 35px 0;
        padding: 25px;
        background: linear-gradient(135deg, #110a1e 0%, #0e0818 100%);
        border-radius: 2px;
        border: 1px solid rgba(138, 43, 226, 0.2);
        scroll-margin-top: 20px;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.5),
                    inset 0 1px 0 rgba(255, 255, 255, 0.05);
        position: relative;
        overflow: hidden;
      }
      .skilltree-tier::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        height: 3px;
        background: linear-gradient(90deg, #8a2be2 0%, #4b0082 50%, #8a2be2 100%);
        background-size: 200% 100%;
        animation: gradientShift 3s ease infinite;
      }
      .skilltree-tier-header {
        color: #dcddde;
        margin: 0 0 20px 0;
        font-size: 22px;
        font-weight: 700;
        padding-bottom: 12px;
        border-bottom: 1px solid rgba(138, 43, 226, 0.4);
        text-shadow: 0 2px 8px rgba(138, 43, 226, 0.6);
        display: flex;
        align-items: center;
        gap: 12px;
      }
      .skilltree-tier-badge {
        display: inline-block;
        padding: 4px 12px;
        background: linear-gradient(135deg, #8a2be2 0%, #4b0082 100%);
        border-radius: 2px;
        font-size: 12px;
        font-weight: 700;
        color: white;
        text-shadow: 0 1px 3px rgba(0, 0, 0, 0.5);
        box-shadow: 0 2px 8px rgba(138, 43, 226, 0.4);
      }

      /* Skill Card */
      .skilltree-skill {
        background: linear-gradient(135deg, #0a0a12 0%, #08080e 100%);
        border-radius: 2px;
        padding: 18px;
        margin: 12px 0;
        border: 1px solid rgba(138, 43, 226, 0.2);
        border-left: 4px solid #8a2be2;
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.5),
                    inset 0 1px 0 rgba(255, 255, 255, 0.05);
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        position: relative;
        overflow: hidden;
      }
      .skilltree-skill::before {
        content: '';
        position: absolute;
        top: 0;
        left: -100%;
        width: 100%;
        height: 100%;
        background: linear-gradient(90deg, transparent, rgba(138, 43, 226, 0.1), transparent);
        transition: left 0.5s;
      }
      .skilltree-skill:hover {
        transform: translateX(5px);
        border-color: rgba(138, 43, 226, 0.5);
        box-shadow: 0 6px 25px rgba(138, 43, 226, 0.3),
                    0 0 30px rgba(75, 0, 130, 0.2),
                    inset 0 1px 0 rgba(255, 255, 255, 0.1);
      }
      .skilltree-skill:hover::before {
        left: 100%;
      }
      .skilltree-skill.unlocked {
        border-left-color: #00ff88;
        background: linear-gradient(135deg, #081a12 0%, #0a0a12 100%);
      }
      .skilltree-skill.max-level {
        border-left-color: #fbbf24;
        background: linear-gradient(135deg, #1a1508 0%, #0a0a12 100%);
        box-shadow: 0 4px 20px rgba(251, 191, 36, 0.2),
                    0 0 30px rgba(251, 191, 36, 0.1);
      }
      .skilltree-skill-name {
        font-weight: 700;
        color: #dcddde;
        margin-bottom: 6px;
        font-size: 16px;
        text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
        letter-spacing: 0.3px;
      }
      .skilltree-skill-desc {
        color: #cbd5e1;
        font-size: 13px;
        margin-bottom: 10px;
        line-height: 1.5;
      }
      .skilltree-skill-lore {
        color: #8a2be2;
        font-size: 11px;
        font-style: italic;
        margin-top: 6px;
        padding-left: 12px;
        border-left: 2px solid rgba(138, 43, 226, 0.3);
      }
      .skilltree-skill-level {
        color: #00ff88;
        font-size: 12px;
        margin-top: 10px;
        margin-bottom: 6px;
        font-weight: 600;
        text-shadow: 0 0 8px rgba(0, 255, 136, 0.5);
      }
      .skilltree-skill-effects {
        color: #00ff88;
        font-size: 11px;
        margin-top: 8px;
        padding: 8px;
        background: #081a12;
        border-radius: 2px;
        border: 1px solid rgba(0, 255, 136, 0.25);
      }
      .skilltree-skill-cost {
        color: #fbbf24;
        font-size: 12px;
        font-weight: 600;
        margin-top: 8px;
        text-shadow: 0 0 8px rgba(251, 191, 36, 0.5);
      }
      .skilltree-skill-max {
        color: #fbbf24;
        font-size: 12px;
        font-weight: 700;
        margin-top: 8px;
        text-shadow: 0 0 10px rgba(251, 191, 36, 0.6);
        text-transform: uppercase;
        letter-spacing: 1px;
      }
      .skilltree-btn-group {
        display: flex;
        gap: 8px;
        margin-top: 12px;
      }
      .skilltree-upgrade-btn {
        background: linear-gradient(135deg, #00ff88 0%, #00cc6a 100%);
        color: white;
        border: none;
        border-radius: 2px;
        padding: 10px 20px;
        cursor: pointer;
        font-size: 13px;
        font-weight: 700;
        box-shadow: 0 4px 15px rgba(0, 255, 136, 0.4),
                    inset 0 1px 0 rgba(255, 255, 255, 0.2);
        transition: all 0.2s;
        text-transform: uppercase;
        letter-spacing: 0.5px;
        flex: 1;
      }
      .skilltree-upgrade-btn:hover:not(:disabled) {
        transform: translateY(-2px);
        box-shadow: 0 6px 20px rgba(0, 255, 136, 0.6),
                    inset 0 1px 0 rgba(255, 255, 255, 0.3);
        background: linear-gradient(135deg, #00ff88 0%, #00ff88 100%);
      }
      .skilltree-upgrade-btn:active:not(:disabled) {
        transform: translateY(0);
      }
      .skilltree-upgrade-btn:disabled {
        background: linear-gradient(135deg, #475569 0%, #334155 100%);
        cursor: not-allowed;
        opacity: 0.5;
        box-shadow: none;
      }
      .skilltree-max-btn {
        background: linear-gradient(135deg, #8a2be2 0%, #4b0082 100%);
        color: white;
        border: none;
        border-radius: 2px;
        padding: 10px 16px;
        cursor: pointer;
        font-size: 13px;
        font-weight: 700;
        box-shadow: 0 4px 15px rgba(138, 43, 226, 0.4),
                    inset 0 1px 0 rgba(255, 255, 255, 0.2);
        transition: all 0.2s;
        text-transform: uppercase;
        letter-spacing: 0.5px;
      }
      .skilltree-max-btn:hover:not(:disabled) {
        transform: translateY(-2px);
        box-shadow: 0 6px 20px rgba(138, 43, 226, 0.6),
                    inset 0 1px 0 rgba(255, 255, 255, 0.3);
        background: linear-gradient(135deg, #4b0082 0%, #8a2be2 100%);
      }
      .skilltree-max-btn:active:not(:disabled) {
        transform: translateY(0);
      }
      .skilltree-max-btn:disabled {
        background: linear-gradient(135deg, #475569 0%, #334155 100%);
        cursor: not-allowed;
        opacity: 0.5;
        box-shadow: none;
      }

      /* Scrollbar - Hidden but scrollable */
      .skilltree-modal-content::-webkit-scrollbar {
        width: 0px;
        background: transparent;
      }
      .skilltree-modal-content {
        scrollbar-width: none;  /* Firefox */
        -ms-overflow-style: none;  /* IE 10+ */
      }

      /* ===== ACTIVE SKILLS SECTION ===== */
      .skilltree-active-section {
        margin-top: 20px;
        padding-top: 16px;
        border-top: 1px solid rgba(138, 43, 226, 0.3);
      }
      .skilltree-active-section-header {
        font-size: 16px;
        font-weight: 700;
        color: #dcddde;
        margin-bottom: 12px;
        display: flex;
        align-items: center;
        gap: 10px;
      }
      .skilltree-mana-bar-container {
        display: flex;
        align-items: center;
        gap: 10px;
        margin-bottom: 16px;
        padding: 10px 14px;
        background: #08080e;
        border-radius: 2px;
        border: 1px solid rgba(0, 100, 255, 0.3);
      }
      .skilltree-mana-bar-label {
        font-size: 13px;
        font-weight: 600;
        color: rgba(100, 180, 255, 0.9);
        white-space: nowrap;
      }
      .skilltree-mana-bar-track {
        flex: 1;
        height: 12px;
        background: #060608;
        border-radius: 2px;
        overflow: hidden;
        position: relative;
      }
      .skilltree-mana-bar-fill {
        height: 100%;
        background: linear-gradient(90deg, #1e64ff 0%, #64b4ff 100%);
        border-radius: 2px;
        transition: width 0.5s ease;
        box-shadow: 0 0 8px rgba(30, 100, 255, 0.5);
      }
      .skilltree-mana-bar-text {
        font-size: 12px;
        font-weight: 600;
        color: rgba(100, 180, 255, 0.9);
        white-space: nowrap;
        min-width: 65px;
        text-align: right;
      }

      /* Active Skill Card */
      .skilltree-active-skill {
        padding: 14px 16px;
        margin-bottom: 10px;
        background: linear-gradient(135deg, #0a0a12 0%, #0c0c14 100%);
        border: 1px solid rgba(138, 43, 226, 0.25);
        border-radius: 2px;
        transition: all 0.3s ease;
      }
      .skilltree-active-skill:hover {
        border-color: rgba(138, 43, 226, 0.5);
        box-shadow: 0 0 12px rgba(138, 43, 226, 0.15);
      }
      .skilltree-active-skill.is-active {
        border-color: rgba(0, 255, 136, 0.6);
        box-shadow: 0 0 15px rgba(0, 255, 136, 0.15);
        background: linear-gradient(135deg, #081a12 0%, #0a0a12 100%);
      }
      .skilltree-active-skill.is-locked {
        opacity: 0.45;
        filter: grayscale(0.4);
      }
      .skilltree-active-skill-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 6px;
      }
      .skilltree-active-skill-name {
        font-size: 14px;
        font-weight: 700;
        color: #dcddde;
      }
      .skilltree-active-skill-cost {
        font-size: 12px;
        font-weight: 600;
        color: rgba(100, 180, 255, 0.9);
      }
      .skilltree-active-skill-desc {
        font-size: 12px;
        color: #b5bac1;
        margin-bottom: 6px;
        line-height: 1.3;
      }
      .skilltree-active-skill-lore {
        font-size: 11px;
        color: rgba(138, 43, 226, 0.7);
        font-style: italic;
        margin-bottom: 8px;
      }
      .skilltree-active-skill-info {
        display: flex;
        gap: 12px;
        font-size: 11px;
        color: #b5bac1;
        margin-bottom: 8px;
      }
      .skilltree-active-skill-info span {
        display: flex;
        align-items: center;
        gap: 4px;
      }
      .skilltree-active-skill-status {
        font-size: 12px;
        font-weight: 600;
        margin-bottom: 8px;
      }
      .skilltree-active-skill-status.active-text {
        color: #00ff88;
      }
      .skilltree-active-skill-status.cooldown-text {
        color: #ff4444;
      }

      /* Activate Button */
      .skilltree-activate-btn {
        width: 100%;
        padding: 8px 16px;
        border-radius: 2px;
        font-size: 13px;
        font-weight: 700;
        cursor: pointer;
        border: 1px solid rgba(138, 43, 226, 0.6);
        background: linear-gradient(135deg, #6a1fb3 0%, #4b0082 100%);
        color: white;
        transition: all 0.3s ease;
        text-transform: uppercase;
        letter-spacing: 0.5px;
      }
      .skilltree-activate-btn:hover:not(:disabled) {
        background: linear-gradient(135deg, #9a4de6 0%, #7a26cc 100%);
        border-color: rgba(138, 43, 226, 0.9);
        box-shadow: 0 0 15px rgba(138, 43, 226, 0.4);
        transform: translateY(-1px);
      }
      .skilltree-activate-btn:disabled {
        opacity: 0.4;
        cursor: not-allowed;
        background: #0d0d14;
        border-color: rgba(138, 43, 226, 0.2);
      }
      .skilltree-activate-btn:active:not(:disabled) {
        transform: translateY(0);
      }
      .skilltree-active-skill-unlock-req {
        font-size: 11px;
        color: rgba(255, 68, 68, 0.8);
        font-style: italic;
      }

      /* Shadow-theme harmonization (kept scoped to SkillTree classes) */
      .skilltree-modal {
        --st-primary-rgb: var(--sl-color-primary-rgb, 138, 43, 226);
        --st-primary: rgb(var(--st-primary-rgb));
        --st-surface: rgba(8, 10, 20, 0.98);
        --st-surface-soft: rgba(12, 15, 30, 0.95);
        --st-text: #dcddde;
        --st-text-muted: #b5bac1;
      }

      .skilltree-modal,
      .st-confirm-dialog {
        background: linear-gradient(145deg, var(--st-surface) 0%, var(--st-surface-soft) 100%);
        border-color: rgba(var(--st-primary-rgb), 0.42);
        box-shadow: 0 18px 42px rgba(0, 0, 0, 0.55), 0 0 28px rgba(var(--st-primary-rgb), 0.24);
      }

      .skilltree-header,
      .skilltree-tier-nav,
      .skilltree-tier,
      .skilltree-skill,
      .skilltree-active-skill,
      .skilltree-mana-bar-container {
        background: linear-gradient(145deg, rgba(12, 15, 30, 0.95) 0%, rgba(8, 10, 20, 0.95) 100%);
        border-color: rgba(var(--st-primary-rgb), 0.32);
      }

      .skilltree-header h2,
      .skilltree-tier-header,
      .skilltree-active-section-header {
        color: var(--st-text);
      }

      .skilltree-skill-desc,
      .skilltree-active-skill-desc,
      .skilltree-active-skill-info,
      .skilltree-active-skill-unlock-req {
        color: var(--st-text-muted);
      }

      .skilltree-tier-nav-btn,
      .skilltree-activate-btn,
      .skilltree-max-btn {
        border-color: rgba(var(--st-primary-rgb), 0.72);
      }

      .skilltree-tier-nav-btn.active {
        background: linear-gradient(135deg, rgba(var(--st-primary-rgb), 0.48) 0%, rgba(40, 22, 72, 0.92) 100%);
      }
    `;
    function injectSkillTreeCss2() {
      const existingStyle = document.getElementById(STYLE_ID);
      if (existingStyle) {
        existingStyle.remove();
      }
      try {
        BdApi.DOM.addStyle(STYLE_ID, SKILL_TREE_CSS);
      } catch (error) {
        const style = document.createElement("style");
        style.id = STYLE_ID;
        style.textContent = SKILL_TREE_CSS;
        document.head.appendChild(style);
      }
    }
    module2.exports = { injectSkillTreeCss: injectSkillTreeCss2 };
  }
});

// src/shared/bd-module-loader.js
var require_bd_module_loader = __commonJS({
  "src/shared/bd-module-loader.js"(exports2, module2) {
    function loadBdModuleFromPlugins(fileName) {
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
      loadBdModuleFromPlugins
    };
  }
});

// src/SkillTree/shared-utils.js
var require_shared_utils = __commonJS({
  "src/SkillTree/shared-utils.js"(exports2, module2) {
    var { loadBdModuleFromPlugins } = require_bd_module_loader();
    var _bdLoad = loadBdModuleFromPlugins;
    var _ReactUtils2;
    try {
      _ReactUtils2 = _bdLoad("BetterDiscordReactUtils.js");
    } catch (_) {
      _ReactUtils2 = null;
    }
    var _SLUtils2;
    _SLUtils2 = _bdLoad("SoloLevelingUtils.js") || window.SoloLevelingUtils || null;
    if (_SLUtils2 && !window.SoloLevelingUtils) window.SoloLevelingUtils = _SLUtils2;
    var _PluginUtils2;
    try {
      _PluginUtils2 = _bdLoad("BetterDiscordPluginUtils.js");
    } catch (_) {
      _PluginUtils2 = null;
    }
    module2.exports = {
      _PluginUtils: _PluginUtils2,
      _ReactUtils: _ReactUtils2,
      _SLUtils: _SLUtils2,
      _bdLoad
    };
  }
});

// src/SkillTree/ui-methods.js
var require_ui_methods = __commonJS({
  "src/SkillTree/ui-methods.js"(exports2, module2) {
    var { _PluginUtils: _PluginUtils2 } = require_shared_utils();
    var SkillTreeUiMethods2 = {
      /**
       * Update button text with current SP count
       */
      updateButtonText() {
        if (this.skillTreeButton) {
          this.skillTreeButton.title = `Skill Tree (${this.settings.skillPoints} SP)`;
        }
      },
      /**
       * Show skill tree modal (React v3.0.0)
       * If already open, forces a re-render. Otherwise creates root and renders.
       */
      showSkillTreeModal() {
        var _a, _b;
        this.recalculateSPFromLevel();
        this.checkForLevelUp();
        if (this._modalReactRoot && this._modalForceUpdate) {
          this._modalForceUpdate();
          return;
        }
        let container = document.getElementById("st-modal-root");
        if (!container) {
          container = document.createElement("div");
          container.id = "st-modal-root";
          container.style.display = "contents";
          document.body.appendChild(container);
        }
        this._modalContainer = container;
        const React = BdApi.React;
        const { SkillTreeModal } = this._components;
        const onClose = () => this.closeSkillTreeModal();
        const element = React.createElement(SkillTreeModal, { onClose });
        const createRoot = this._getCreateRoot();
        if (createRoot) {
          const root = createRoot(container);
          this._modalReactRoot = root;
          root.render(element);
          return;
        }
        const ReactDOM = BdApi.ReactDOM || BdApi.Webpack.getModule((m) => m && m.render && m.unmountComponentAtNode);
        if (ReactDOM == null ? void 0 : ReactDOM.render) {
          ReactDOM.render(element, container);
          return;
        }
        console.error("[SkillTree] Neither createRoot nor ReactDOM.render available");
        container.remove();
        (_b = (_a = BdApi.UI) == null ? void 0 : _a.showToast) == null ? void 0 : _b.call(_a, "SkillTree: React rendering unavailable", { type: "error" });
      },
      /**
       * Close and unmount skill tree modal (React v3.0.0)
       */
      closeSkillTreeModal() {
        if (this._modalReactRoot) {
          try {
            this._modalReactRoot.unmount();
          } catch (error) {
            console.error("[SkillTree] Failed to unmount modal React root:", error);
          }
          this._modalReactRoot = null;
        }
        const container = document.getElementById("st-modal-root");
        if (container) {
          try {
            const ReactDOM = BdApi.ReactDOM || BdApi.Webpack.getModule((m) => m && m.unmountComponentAtNode);
            if (ReactDOM == null ? void 0 : ReactDOM.unmountComponentAtNode) ReactDOM.unmountComponentAtNode(container);
          } catch (error) {
            console.error("[SkillTree] Failed to unmount legacy modal container:", error);
          }
          container.remove();
        }
        this._modalContainer = null;
        this._modalForceUpdate = null;
        this._manaTickForceUpdate = null;
      },
      /**
       * Setup channel watcher for URL changes (event-based, no polling)
       * Enhanced to persist buttons across guild/channel switches
       */
      setupChannelWatcher() {
        if (this._urlChangeCleanup) {
          try {
            this._urlChangeCleanup();
          } catch (_) {
          }
          this._urlChangeCleanup = null;
        }
        let lastUrl = window.location.href;
        const handleUrlChange = () => {
          if (this._isStopped) return;
          const currentUrl = window.location.href;
          if (currentUrl !== lastUrl) {
            lastUrl = currentUrl;
            this._setTrackedTimeout(() => this.updateButtonText(), 300);
          }
        };
        if (_PluginUtils2 == null ? void 0 : _PluginUtils2.NavigationBus) {
          this._navBusUnsub = _PluginUtils2.NavigationBus.subscribe(() => handleUrlChange());
        }
        this._urlChangeCleanup = () => {
          if (this._navBusUnsub) {
            this._navBusUnsub();
            this._navBusUnsub = null;
          }
        };
      },
      /**
       * Setup window focus/visibility watcher (detects when user returns from another window)
       * Pattern from AutoIdleOnAFK plugin - uses window blur/focus events for reliable detection
       */
      setupWindowFocusWatcher() {
        if (this._windowFocusCleanup) {
          try {
            this._windowFocusCleanup();
          } catch (_) {
          }
          this._windowFocusCleanup = null;
        }
        this._boundHandleVisibilityChange = () => {
          if (this._isStopped || document.hidden) return;
          this._setTrackedTimeout(() => this.updateButtonText(), 300);
        };
        document.addEventListener("visibilitychange", this._boundHandleVisibilityChange);
        this._windowFocusCleanup = () => {
          document.removeEventListener("visibilitychange", this._boundHandleVisibilityChange);
        };
      }
    };
    module2.exports = { SkillTreeUiMethods: SkillTreeUiMethods2 };
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

// src/SkillTree/index.js
var { buildSkillTreeComponents } = require_components();
var { ActiveSkillMethods } = require_active_skill_methods();
var { createSkillTreeData } = require_data();
var { SkillTreeUpgradeMethods } = require_skill_upgrade_methods();
var { injectSkillTreeCss } = require_styles();
var { SkillTreeUiMethods } = require_ui_methods();
var { _PluginUtils, _ReactUtils, _SLUtils } = require_shared_utils();
var { createToast } = require_toast();
var { getCreateRoot: _sharedGetCreateRoot } = require_react_dom();
var { loadSettings, saveSettings } = require_settings();
var PASSIVE_BONUS_TUNING = {
  xpBonus: { softCap: 0.8, hardCap: 2.2, taperScale: 0.55 },
  critBonus: { softCap: 0.12, hardCap: 0.35, taperScale: 0.1 },
  critDamageBonus: { softCap: 0.55, hardCap: 1.75, taperScale: 0.28 },
  questBonus: { softCap: 0.2, hardCap: 0.65, taperScale: 0.22 },
  allStatBonus: { softCap: 0.1, hardCap: 0.35, taperScale: 0.16 },
  attackCooldownReduction: { softCap: 0.18, hardCap: 0.35, taperScale: 0.08 },
  daggerThrowDamageBonus: { softCap: 0.45, hardCap: 1.2, taperScale: 0.18 },
  hpRegenBonus: { softCap: 0.4, hardCap: 1.1, taperScale: 0.25 },
  manaRegenBonus: { softCap: 0.4, hardCap: 1.1, taperScale: 0.25 },
  debuffDurationReduction: { softCap: 0.45, hardCap: 0.75, taperScale: 0.12 },
  debuffResistChance: { softCap: 0.22, hardCap: 0.45, taperScale: 0.09 },
  debuffCleanseChance: { softCap: 0.22, hardCap: 0.5, taperScale: 0.1 }
};
var PASSIVE_BONUS_KEYS = Object.freeze([
  "xpBonus",
  "critBonus",
  "critDamageBonus",
  "questBonus",
  "allStatBonus",
  "attackCooldownReduction",
  "daggerThrowDamageBonus",
  "hpRegenBonus",
  "manaRegenBonus",
  "debuffDurationReduction",
  "debuffResistChance",
  "debuffCleanseChance",
  "flatMana",
  "manaCostReduction"
]);
var STATIC_PASSIVE_BONUS_KEYS = Object.freeze([
  "tenacityThreshold",
  "tenacityDamageReduction",
  "ariseChanceOverride",
  "shadowGrowthMultiplier"
]);
var { RANK_ORDER: SOLO_RANK_ORDER } = require_rank_utils();
var KANDIARU_RANK_EFFECTS = Object.freeze({
  E: { xpBonus: 0.03, naturalGrowthMultiplier: 1.08 },
  D: { xpBonus: 0.05, naturalGrowthMultiplier: 1.14 },
  C: { xpBonus: 0.07, naturalGrowthMultiplier: 1.2 },
  B: { xpBonus: 0.09, naturalGrowthMultiplier: 1.26 },
  A: { xpBonus: 0.11, naturalGrowthMultiplier: 1.32 },
  S: { xpBonus: 0.13, naturalGrowthMultiplier: 1.38 },
  SS: { xpBonus: 0.15, naturalGrowthMultiplier: 1.44 },
  SSS: { xpBonus: 0.17, naturalGrowthMultiplier: 1.5 },
  "SSS+": { xpBonus: 0.18, naturalGrowthMultiplier: 1.55 },
  NH: { xpBonus: 0.19, naturalGrowthMultiplier: 1.6 },
  Monarch: { xpBonus: 0.2, naturalGrowthMultiplier: 1.65 },
  "Monarch+": { xpBonus: 0.22, naturalGrowthMultiplier: 1.72 },
  "Shadow Monarch": { xpBonus: 0.22, naturalGrowthMultiplier: 1.72 }
});
var SP_CURVE = Object.freeze({
  quadraticNumerator: 5705,
  linearNumerator: 659962,
  denominator: 665667
});
module.exports = class SkillTree {
  constructor() {
    const data = createSkillTreeData();
    this.defaultSettings = data.defaultSettings;
    this.innatePassives = data.innatePassives || [];
    this.hiddenBlessings = data.hiddenBlessings || [];
    this.skillTree = data.skillTree;
    this.activeSkillDefs = data.activeSkillDefs;
    this.activeSkillOrder = data.activeSkillOrder;
    this.dungeonCombatSkillDefs = data.dungeonCombatSkillDefs || {};
    this.dungeonCombatSkillOrder = data.dungeonCombatSkillOrder || [];
    this._retryTimeouts = /* @__PURE__ */ new Set();
    this._isStopped = true;
    this._settingsPanelRoot = null;
    this._settingsPanelHandlers = null;
    this._modalContainer = null;
    this._modalReactRoot = null;
    this._modalForceUpdate = null;
    this._manaTickForceUpdate = null;
    this._components = null;
    this.settings = structuredClone(this.defaultSettings);
    this.skillTreeButton = null;
    this.levelCheckInterval = null;
    this.eventUnsubscribers = [];
    this._urlChangeCleanup = null;
    this._windowFocusCleanup = null;
    this._manaRegenInterval = null;
    this._activeSkillTimers = {};
    this._activeSkillSustainIntervals = {};
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
      skillBonuses: null,
      // Cache calculated skill bonuses
      skillBonusesTime: 0,
      skillBonusesTTL: 500,
      // 500ms - bonuses change when skills are upgraded
      hiddenBlessingBonuses: null,
      hiddenBlessingBonusesTime: 0,
      hiddenBlessingBonusesTTL: 500,
      isShadowMonarchValue: void 0,
      // Cached SM rank check (5s TTL)
      isShadowMonarchTime: 0
    };
  }
  start() {
    var _a, _b;
    this._toast = ((_a = _PluginUtils == null ? void 0 : _PluginUtils.createToastHelper) == null ? void 0 : _a.call(_PluginUtils, "skillTree")) || createToast();
    if (!this._isStopped) this.stop();
    this._retryTimeouts.forEach((timeoutId) => clearTimeout(timeoutId));
    this._retryTimeouts.clear();
    this._isStopped = false;
    this.loadSettings();
    this._loadSLUtils();
    this._components = buildSkillTreeComponents(this);
    this.initializeSpentSP();
    this.injectCSS();
    if ((_b = this._SLUtils) == null ? void 0 : _b.registerToolbarButton) {
      this._SLUtils.registerToolbarButton({
        id: "st-skill-tree-button-wrapper",
        priority: 20,
        // After TitleManager (10)
        renderReact: (React, _channel) => this._renderSkillTreeButtonReact(React),
        cleanup: () => {
          this.skillTreeButton = null;
        }
      });
    } else {
      console.error("[SkillTree] SLUtils not available \u2014 toolbar button inactive");
    }
    this.saveSkillBonuses();
    this.saveHiddenBlessingBonuses();
    this.setupChannelWatcher();
    this.setupWindowFocusWatcher();
    this.recalculateSPFromLevel();
    this._spRecalculatedOnStartup = true;
    this.setupLevelUpWatcher();
    this.startLevelPolling();
    this.restoreActiveSkillTimers();
    this.saveActiveBuffs();
    this.startManaRegen();
    this._broadcastCurrentSkillLevels();
  }
  _broadcastCurrentSkillLevels() {
    var _a;
    const levels = (_a = this.settings) == null ? void 0 : _a.skillLevels;
    if (!levels) return;
    const queue = Object.entries(levels).filter(([, level]) => (level || 0) >= 1);
    const dispatchNext = () => {
      const next = queue.shift();
      if (!next) return;
      try {
        document.dispatchEvent(
          new CustomEvent("SkillTree:skillLevelChanged", {
            detail: { skillId: next[0], level: next[1] }
          })
        );
      } catch (_) {
      }
      if (queue.length) this._setTrackedTimeout(dispatchNext, 0);
    };
    dispatchNext();
  }
  _setTrackedTimeout(callback, delayMs) {
    const wrappedCallback = () => {
      this._retryTimeouts.delete(timeoutId);
      if (this._isStopped) return;
      callback();
    };
    const timeoutId = setTimeout(wrappedCallback, delayMs);
    this._retryTimeouts.add(timeoutId);
    return timeoutId;
  }
  _clearTrackedTimeout(timeoutId) {
    if (!Number.isFinite(timeoutId)) return;
    clearTimeout(timeoutId);
    this._retryTimeouts.delete(timeoutId);
  }
  /**
   * Load SoloLevelingUtils shared library (toolbar registry, React injection, etc.)
   */
  _loadSLUtils() {
    this._SLUtils = _SLUtils || window.SoloLevelingUtils || null;
  }
  /**
   * Get React 18 createRoot with webpack fallbacks (same pattern as ShadowExchange)
   */
  _getCreateRoot() {
    return _sharedGetCreateRoot();
  }
  /**
   * Render SkillTree button as a React element (for SLUtils Tier 1 React toolbar patcher).
   * Returns a React element that will be injected into ChatButtonsGroup.type children.
   * @param {Object} React - BdApi.React
   * @returns {ReactElement}
   */
  _renderSkillTreeButtonReact(React) {
    var _a;
    if (this._isStopped) return null;
    const pluginInstance = this;
    const sp = ((_a = this.settings) == null ? void 0 : _a.skillPoints) ?? 0;
    const svgPath = "M12 4V15.2C12 16.8802 12 17.7202 12.327 18.362C12.6146 18.9265 13.0735 19.3854 13.638 19.673C14.2798 20 15.1198 20 16.8 20H17M17 20C17 21.1046 17.8954 22 19 22C20.1046 22 21 21.1046 21 20C21 18.8954 20.1046 18 19 18C17.8954 18 17 18.8954 17 20ZM7 4L17 4M7 4C7 5.10457 6.10457 6 5 6C3.89543 6 3 5.10457 3 4C3 2.89543 3.89543 2 5 2C6.10457 2 7 2.89543 7 4ZM17 4C17 5.10457 17.8954 6 19 6C20.1046 6 21 5.10457 21 4C21 2.89543 20.1046 2 19 2C17.8954 2 17 2.89543 17 4ZM12 12H17M17 12C17 13.1046 17.8954 14 19 14C20.1046 14 21 13.1046 21 12C21 10.8954 20.1046 10 19 10C17.8954 10 17 10.8954 17 12Z";
    return React.createElement(
      "div",
      {
        id: "st-skill-tree-button-wrapper",
        className: "st-skill-tree-button-wrapper",
        style: { display: "flex", alignItems: "center" }
      },
      React.createElement(
        "button",
        {
          className: "st-skill-tree-button",
          title: `Skill Tree (${sp} SP)`,
          onClick: () => pluginInstance.showSkillTreeModal(),
          ref: (el) => {
            if (el && el !== pluginInstance.skillTreeButton) {
              pluginInstance.skillTreeButton = el;
            }
          }
        },
        React.createElement(
          "svg",
          {
            width: "20",
            height: "20",
            viewBox: "0 0 24 24",
            fill: "none",
            stroke: "currentColor",
            strokeWidth: "2",
            strokeLinecap: "round",
            strokeLinejoin: "round",
            style: { display: "block", margin: "auto" }
          },
          React.createElement("path", { d: svgPath })
        )
      )
    );
  }
  startLevelPolling() {
    if (this.eventUnsubscribers.length > 0) return;
    if (this.levelCheckInterval) return;
    this.levelCheckInterval = setInterval(() => {
      if (this._isStopped || document.hidden) return;
      this.checkForLevelUp();
      this.recalculateSPFromLevel();
    }, 15e3);
  }
  stopLevelPolling() {
    if (!this.levelCheckInterval) return;
    clearInterval(this.levelCheckInterval);
    this.levelCheckInterval = null;
  }
  setupLevelUpWatcher() {
    var _a, _b;
    if (this._isStopped) {
      return;
    }
    if (this.eventUnsubscribers.length > 0) {
      return;
    }
    const instance = (_b = (_a = this._SLUtils) == null ? void 0 : _a.getPluginInstance) == null ? void 0 : _b.call(_a, "SoloLevelingStats");
    if (!instance) {
      this._setTrackedTimeout(() => this.setupLevelUpWatcher(), 2e3);
      return;
    }
    if (!instance || typeof instance.on !== "function") {
      this._setTrackedTimeout(() => this.setupLevelUpWatcher(), 2e3);
      return;
    }
    const unsubscribeLevel = instance.on("levelChanged", (data) => {
      this._cache.soloLevelingData = null;
      this._cache.soloLevelingDataTime = 0;
      const lastLevel = this.settings.lastLevel || 1;
      if (data.newLevel > lastLevel) {
        const levelsGained = data.newLevel - lastLevel;
        this.awardSPForLevelUp(levelsGained, lastLevel);
        this.settings.lastLevel = data.newLevel;
        this.saveSettings();
      }
    });
    this.eventUnsubscribers.push(unsubscribeLevel);
    this.stopLevelPolling();
    if (this._spRecalculatedOnStartup) {
      this._spRecalculatedOnStartup = false;
    } else {
      this.checkForLevelUp();
    }
  }
  stop() {
    var _a, _b;
    this._isStopped = true;
    try {
      (_b = (_a = this._SLUtils) == null ? void 0 : _a.unregisterToolbarButton) == null ? void 0 : _b.call(_a, "st-skill-tree-button-wrapper");
    } catch (error) {
      console.error("[SkillTree] Failed to unregister toolbar button:", error);
    }
    this.unsubscribeFromEvents();
    this.stopLevelPolling();
    this.stopManaRegen();
    Object.values(this._activeSkillTimers).forEach((tid) => clearTimeout(tid));
    this._activeSkillTimers = {};
    Object.values(this._activeSkillSustainIntervals).forEach((iid) => clearInterval(iid));
    this._activeSkillSustainIntervals = {};
    this._retryTimeouts.forEach((timeoutId) => this._clearTrackedTimeout(timeoutId));
    this._retryTimeouts.clear();
    if (this._urlChangeCleanup) {
      try {
        this._urlChangeCleanup();
      } catch (e) {
        console.error("[SkillTree] Error during URL change watcher cleanup:", e);
      } finally {
        this._urlChangeCleanup = null;
      }
    }
    if (this._windowFocusCleanup) {
      try {
        this._windowFocusCleanup();
      } catch (e) {
        console.error("[SkillTree] Error during window focus watcher cleanup:", e);
      } finally {
        this._windowFocusCleanup = null;
      }
    }
    if (this.skillTreeButton) {
      this.skillTreeButton.remove();
      this.skillTreeButton = null;
    }
    if (this._sharedStorageFlushPending) {
      this._flushSharedStorage();
    }
    this._cache.soloLevelingData = null;
    this._cache.soloLevelingDataTime = 0;
    this._cache.soloPluginInstance = null;
    this._cache.soloPluginInstanceTime = 0;
    this._cache.skillBonuses = null;
    this._cache.skillBonusesTime = 0;
    this._cache.isShadowMonarchValue = void 0;
    this._cache.isShadowMonarchTime = 0;
    this.closeSkillTreeModal();
    this.detachSkillTreeSettingsPanelHandlers();
    if (BdApi.DOM && BdApi.DOM.removeStyle) {
      BdApi.DOM.removeStyle("skilltree-css");
    } else {
      const styleElement = document.getElementById("skilltree-css");
      if (styleElement) {
        styleElement.remove();
      }
    }
  }
  detachSkillTreeSettingsPanelHandlers() {
    const root = this._settingsPanelRoot;
    const handlers = this._settingsPanelHandlers;
    if (root && handlers) {
      root.removeEventListener("change", handlers.onChange);
    }
    this._settingsPanelRoot = null;
    this._settingsPanelHandlers = null;
  }
  checkForLevelUp() {
    try {
      const soloData = this.getSoloLevelingData();
      if (!soloData || !soloData.level) return;
      const currentLevel = soloData.level;
      const lastLevel = this.settings.lastLevel || 1;
      if (currentLevel > lastLevel) {
        const levelsGained = currentLevel - lastLevel;
        this.awardSPForLevelUp(levelsGained, lastLevel);
        this.settings.lastLevel = currentLevel;
        this.saveSettings();
      }
    } catch (error) {
      console.error("SkillTree: Error checking level up", error);
    }
  }
  /**
   * Calculate total SP that should be earned based on level.
   * Uses a quadratic growth curve tuned for endgame completion pacing.
   * @param {number} level - Current level
   * @returns {number} - Total SP earned
   */
  calculateSPForLevel(level) {
    const x = Math.max(0, Number(level || 0) - 1);
    const num = SP_CURVE.quadraticNumerator * x * x + SP_CURVE.linearNumerator * x;
    return Math.max(0, Math.round(num / SP_CURVE.denominator));
  }
  /**
   * Award SP when leveling up using the progression curve delta.
   * @param {number} levelsGained - Number of levels gained
   * @param {number} fromLevel - Previous level before gains
   */
  awardSPForLevelUp(levelsGained, fromLevel = this.settings.lastLevel || 1) {
    var _a, _b;
    const safeLevelsGained = Math.max(0, Number(levelsGained) || 0);
    const safeFromLevel = Math.max(1, Number(fromLevel) || 1);
    const toLevel = safeFromLevel + safeLevelsGained;
    const spEarned = Math.max(0, this.calculateSPForLevel(toLevel) - this.calculateSPForLevel(safeFromLevel));
    if (spEarned <= 0) return;
    this.settings.skillPoints += spEarned;
    this.settings.totalEarnedSP += spEarned;
    this.saveSettings();
    (_b = (_a = BdApi == null ? void 0 : BdApi.UI) == null ? void 0 : _a.showToast) == null ? void 0 : _b.call(_a, `Level Up! +${spEarned} Skill Point${spEarned > 1 ? "s" : ""}`, {
      type: "success",
      timeout: 3e3
    });
  }
  /**
   * Debug logging helper (checks debugMode setting)
   */
  debugLog(...args) {
    var _a;
    if ((_a = this.settings) == null ? void 0 : _a.debugMode) {
      console.log("[SkillTree]", ...args);
    }
  }
  /**
   * Recalculate SP based on current level (for reset or initial setup)
   * Always syncs level and ensures SP matches current level
   */
  recalculateSPFromLevel() {
    try {
      const soloData = this.getSoloLevelingData();
      if (!soloData || (soloData.level || 0) <= 1) {
        if (typeof this.debugLog === "function") this.debugLog("SP_RECALC", "Skipping SP recalculation \u2014 SoloLevelingStats data unavailable or stale");
        return;
      }
      const currentLevel = soloData.level;
      const expectedSP = this.calculateSPForLevel(currentLevel);
      const lastLevel = this.settings.lastLevel || 1;
      if (currentLevel !== lastLevel) {
        this.settings.lastLevel = currentLevel;
      }
      if (this.settings.totalEarnedSP !== expectedSP) {
        this.settings.totalEarnedSP = expectedSP;
      }
      const spentSP = this.getTotalSpentSP();
      const currentAvailable = this.settings.skillPoints;
      const expectedAvailable = Math.max(0, expectedSP - spentSP);
      if (spentSP > expectedSP) {
        this.debugLog(
          `SP over-spend detected: spent ${spentSP} vs earned ${expectedSP} for level ${currentLevel}. Clamping available SP to 0; skills preserved (no reset).`
        );
      }
      if (currentAvailable !== expectedAvailable) {
        this.settings.skillPoints = expectedAvailable;
      }
      if (currentAvailable !== expectedAvailable || currentLevel !== lastLevel) {
        this.saveSettings();
      }
    } catch (error) {
      console.error("SkillTree: Error recalculating SP", error);
    }
  }
  /**
   * Reset all skills and recalculate SP based on current level
   * Useful when skills were unlocked ahead of level
   */
  resetSkills() {
    var _a, _b, _c, _d;
    try {
      const soloData = this.getSoloLevelingData();
      if (!soloData || !soloData.level) {
        (_b = (_a = BdApi == null ? void 0 : BdApi.UI) == null ? void 0 : _a.showToast) == null ? void 0 : _b.call(_a, "Cannot reset: SoloLevelingStats not available", {
          type: "error",
          timeout: 3e3
        });
        return false;
      }
      const currentLevel = soloData.level;
      const expectedSP = this.calculateSPForLevel(currentLevel);
      const activeStates = this.settings.activeSkillStates || {};
      Object.keys(activeStates).forEach((skillId) => {
        var _a2;
        if ((_a2 = activeStates[skillId]) == null ? void 0 : _a2.active) {
          try {
            this._deactivateSkill(skillId, "skill_reset");
          } catch (_) {
          }
        }
      });
      this.settings.activeSkillStates = {};
      const previouslyUnlocked = Object.keys(this.settings.skillLevels || {}).filter(
        (id) => (this.settings.skillLevels[id] || 0) >= 1
      );
      this.settings.skillLevels = {};
      this.settings.unlockedSkills = [];
      this.settings.totalSpentSP = 0;
      this.settings.skillPoints = expectedSP;
      this.settings.totalEarnedSP = expectedSP;
      this.settings.lastLevel = currentLevel;
      this._cache.skillBonuses = null;
      this._cache.skillBonusesTime = 0;
      this.saveSettings();
      this.saveSkillBonuses();
      const resetQueue = [...previouslyUnlocked];
      const dispatchNextReset = () => {
        const skillId = resetQueue.shift();
        if (skillId === void 0) return;
        try {
          document.dispatchEvent(
            new CustomEvent("SkillTree:skillLevelChanged", {
              detail: { skillId, level: 0 }
            })
          );
        } catch (_) {
        }
        if (resetQueue.length) this._setTrackedTimeout(dispatchNextReset, 0);
      };
      dispatchNextReset();
      (_d = (_c = BdApi == null ? void 0 : BdApi.UI) == null ? void 0 : _c.showToast) == null ? void 0 : _d.call(_c, `Skills Reset! You have ${expectedSP} SP for level ${currentLevel}`, {
        type: "success",
        timeout: 4e3
      });
      if (this._modalForceUpdate) {
        this._modalForceUpdate();
      }
      return true;
    } catch (error) {
      console.error("SkillTree: Error resetting skills", error);
      return false;
    }
  }
  loadSettings() {
    var _a;
    try {
      this.settings = loadSettings("SkillTree", this.defaultSettings);
      ((_a = this.settings.unlockedSkills) == null ? void 0 : _a.length) > 0 && (this.settings.skillLevels = this.settings.skillLevels || {}, this.settings.unlockedSkills.forEach(
        (skillId) => this.settings.skillLevels[skillId] = this.settings.skillLevels[skillId] || 1
      ), this.settings.unlockedSkills = [], this.saveSettings());
      const skillIdRenameMap = {
        // Legacy title-based IDs (pre-v2.5)
        shadow_storage: "shadow_preservation",
        shadow_preservation: "shadow_preservation",
        basic_combat: "advanced_dagger_techniques",
        dagger_throw: "dagger_throw",
        instant_dungeon: "vital_points_targeting",
        mana_sense: "blessing_of_kandiaru",
        domain_expansion: "domain_of_the_monarch",
        absolute_ruler: "black_heart_awakened",
        void_mastery: "shadow_senses",
        dimension_ruler: "shadow_exchange",
        omnipotent_presence: "dragons_fear",
        eternal_shadow: "ashborns_will",
        true_monarch: "eternal_shadow_monarch",
        // Previous internal IDs (v2.5-v3.0)
        daggers_dance: "advanced_dagger_techniques",
        advanced_dagger_arts: "advanced_dagger_techniques",
        kandiarus_blessing: "blessing_of_kandiaru",
        indomitable_spirit: "tenacity",
        gate_creation: "vital_points_targeting",
        dagger_rush: "dagger_throw",
        ruler_authority: "rulers_authority",
        monarchs_domain: "domain_of_the_monarch",
        shadow_army: "shadow_army_expansion",
        monarch_power: "black_heart_awakened",
        shadow_monarch: "black_heart_awakened",
        shadow_monarch_awakening: "black_heart_awakened",
        arise: "shadow_extraction",
        ashborn_legacy: "ashborns_will",
        ashborn_inheritance: "ashborns_will",
        rulers_domain: "black_heart_awakened",
        shadow_realm: "shadow_senses",
        shadow_storage_dominion: "shadow_senses",
        monarchs_vessel_completion: "black_heart_awakened",
        commander_of_shadows: "shadow_army_expansion",
        gate_ruler: "shadow_exchange",
        shadow_sovereign: "eternal_shadow_monarch",
        // Canon correction (2026-08-03): this skill's effect is regeneration,
        // which in Solo Leveling is Will to Recover. Longevity is the immunity
        // passive and now lives in INNATE_PASSIVES. Preserves invested levels.
        longevity: "will_to_recover"
      };
      const activeSkillIdRenameMap = {
        stealth_active: "stealth_technique",
        mutilate: "mutilation"
      };
      let migrated = false;
      if (this.settings.skillLevels && typeof this.settings.skillLevels === "object") {
        const nextSkillLevels = {};
        Object.entries(this.settings.skillLevels).forEach(([skillId, rawLevel]) => {
          const targetId = skillIdRenameMap[skillId] || skillId;
          const level = Number(rawLevel) || 0;
          nextSkillLevels[targetId] = Math.max(Number(nextSkillLevels[targetId] || 0), level);
          if (targetId !== skillId) migrated = true;
        });
        this.settings.skillLevels = nextSkillLevels;
      }
      const maxLevelBySkillId = /* @__PURE__ */ new Map();
      Object.values(this.skillTree).forEach((tier) => {
        const tierMaxLevel = Number((tier == null ? void 0 : tier.maxLevel) || 0);
        ((tier == null ? void 0 : tier.skills) || []).forEach((skill) => {
          if (!(skill == null ? void 0 : skill.id)) return;
          maxLevelBySkillId.set(skill.id, tierMaxLevel);
        });
      });
      if (this.settings.skillLevels && typeof this.settings.skillLevels === "object") {
        const normalizedSkillLevels = {};
        Object.entries(this.settings.skillLevels).forEach(([skillId, rawLevel]) => {
          const maxLevel = maxLevelBySkillId.get(skillId);
          if (!maxLevel) {
            migrated = true;
            return;
          }
          const numericLevel = Math.max(0, Number(rawLevel) || 0);
          const clampedLevel = Math.min(maxLevel, numericLevel);
          if (clampedLevel !== numericLevel) migrated = true;
          if (clampedLevel > 0) {
            normalizedSkillLevels[skillId] = clampedLevel;
          }
        });
        this.settings.skillLevels = normalizedSkillLevels;
      }
      if (Array.isArray(this.settings.unlockedSkills) && this.settings.unlockedSkills.length > 0) {
        const migratedUnlocked = [
          ...new Set(this.settings.unlockedSkills.map((skillId) => skillIdRenameMap[skillId] || skillId))
        ];
        const filteredUnlocked = migratedUnlocked.filter((skillId) => maxLevelBySkillId.has(skillId));
        if (filteredUnlocked.length !== this.settings.unlockedSkills.length || filteredUnlocked.some((skillId, index) => skillId !== this.settings.unlockedSkills[index])) {
          migrated = true;
        }
        this.settings.unlockedSkills = filteredUnlocked;
      }
      if (this.settings.activeSkillStates && typeof this.settings.activeSkillStates === "object") {
        const nextActiveStates = {};
        Object.entries(this.settings.activeSkillStates).forEach(([skillId, state]) => {
          const targetId = activeSkillIdRenameMap[skillId] || skillId;
          if (targetId !== skillId) migrated = true;
          if (!this.activeSkillDefs[targetId]) {
            migrated = true;
            return;
          }
          if (!nextActiveStates[targetId]) {
            nextActiveStates[targetId] = state;
            return;
          }
          const existing = nextActiveStates[targetId] || {};
          const existingScore = Math.max(
            Number(existing.cooldownUntil || 0),
            Number(existing.expiresAt || 0),
            Number(existing.chargesLeft || 0)
          );
          const candidateScore = Math.max(
            Number((state == null ? void 0 : state.cooldownUntil) || 0),
            Number((state == null ? void 0 : state.expiresAt) || 0),
            Number((state == null ? void 0 : state.chargesLeft) || 0)
          );
          if (candidateScore > existingScore) {
            nextActiveStates[targetId] = state;
          }
        });
        this.settings.activeSkillStates = nextActiveStates;
      }
      if (this.settings.combatSkillStates && typeof this.settings.combatSkillStates === "object") {
        const nextCombatStates = {};
        Object.entries(this.settings.combatSkillStates).forEach(([skillId, state]) => {
          if (!this.dungeonCombatSkillDefs[skillId]) {
            migrated = true;
            return;
          }
          nextCombatStates[skillId] = state;
        });
        this.settings.combatSkillStates = nextCombatStates;
      }
      if (migrated) this.saveSettings();
    } catch (error) {
      console.error("SkillTree: Error loading settings", error);
    }
  }
  saveSettings() {
    try {
      saveSettings("SkillTree", this.settings);
      this._scheduleSharedStorageFlush();
    } catch (error) {
      console.error("SkillTree: Error saving settings", error);
    }
  }
  /**
   * Schedule a single deferred flush of the 3 shared-storage keys.
   * Multiple calls within the same turn collapse into one setTimeout(0).
   */
  _scheduleSharedStorageFlush() {
    if (this._sharedStorageFlushPending) return;
    this._sharedStorageFlushPending = true;
    setTimeout(() => this._flushSharedStorage(), 0);
  }
  /**
   * Write all 3 derived shared-storage keys in one pass.
   * Called via setTimeout(0) from _scheduleSharedStorageFlush and synchronously
   * from stop() to ensure nothing is lost when the plugin unloads.
   */
  _flushSharedStorage() {
    this._sharedStorageFlushPending = false;
    try {
      this.saveSkillBonuses();
    } catch (error) {
      console.error("SkillTree: Error flushing skill bonuses", error);
    }
    try {
      this.saveHiddenBlessingBonuses();
    } catch (error) {
      console.error("SkillTree: Error flushing hidden blessing bonuses", error);
    }
    try {
      this.saveActiveBuffs();
    } catch (error) {
      console.error("SkillTree: Error flushing active buffs", error);
    }
  }
  /**
   * Save skill bonuses to shared storage for SoloLevelingStats to read
   */
  saveSkillBonuses() {
    try {
      const bonuses = this.calculateSkillBonuses();
      BdApi.Data.save("SkillTree", "bonuses", bonuses);
    } catch (error) {
      console.error("SkillTree: Error saving bonuses", error);
    }
  }
  saveHiddenBlessingBonuses() {
    try {
      const blessings = this.getHiddenBlessingBonuses();
      BdApi.Data.save("SkillTree", "hiddenBlessings", blessings);
    } catch (error) {
      console.error("SkillTree: Error saving hidden blessing bonuses", error);
    }
  }
  /**
   * Save active skill buff effects to shared storage for SoloLevelingStats to read
   * SLS reads this via BdApi.Data.load('SkillTree', 'activeBuffs')
   */
  saveActiveBuffs() {
    try {
      const effects = this.getActiveBuffEffects();
      BdApi.Data.save("SkillTree", "activeBuffs", effects);
    } catch (error) {
      console.error("SkillTree: Error saving active buffs", error);
    }
  }
  _applyPassiveBonusCurve(statKey, rawValue) {
    const value = Math.max(0, Number(rawValue) || 0);
    const tuning = PASSIVE_BONUS_TUNING[statKey];
    if (!tuning) return value;
    const softCap = Math.max(0, Number(tuning.softCap || 0));
    const hardCap = Math.max(softCap, Number(tuning.hardCap || softCap));
    const taperScale = Math.max(1e-4, Number(tuning.taperScale || 0.1));
    if (value <= softCap) return value;
    if (hardCap <= softCap) return Math.min(value, hardCap);
    const overflow = value - softCap;
    const capSpan = hardCap - softCap;
    const taperedOverflow = capSpan * (1 - Math.exp(-overflow / taperScale));
    return Math.min(hardCap, softCap + taperedOverflow);
  }
  _getRankProgress(rank) {
    const index = SOLO_RANK_ORDER.indexOf(rank);
    if (index <= 0) return 0;
    return index / Math.max(1, SOLO_RANK_ORDER.length - 1);
  }
  _getKandiaruRankEffects(rank) {
    return KANDIARU_RANK_EFFECTS[rank] || KANDIARU_RANK_EFFECTS.E;
  }
  getInnatePassiveBonuses() {
    const soloData = this.getSoloLevelingData() || {};
    const level = Math.max(1, Number(soloData.level || 1));
    const levelProgress = Math.min(1, Math.max(0, (level - 1) / 1999));
    const rankProgress = this._getRankProgress(soloData.rank || "");
    const progression = Math.min(1, 0.08 + levelProgress * 0.72 + rankProgress * 0.2);
    return {
      debuffDurationReduction: Math.min(0.7, 0.12 + progression * 0.5),
      debuffResistChance: Math.min(0.42, 0.04 + progression * 0.3),
      debuffCleanseChance: Math.min(0.4, 0.08 + progression * 0.32),
      tenacityThreshold: 0.3,
      tenacityDamageReduction: 0.5
    };
  }
  getInnatePassiveEffect(passiveId) {
    const innateBonuses = this.getInnatePassiveBonuses();
    switch (passiveId) {
      case "detoxification":
        return {
          debuffDurationReduction: innateBonuses.debuffDurationReduction,
          debuffResistChance: innateBonuses.debuffResistChance,
          debuffCleanseChance: innateBonuses.debuffCleanseChance
        };
      case "tenacity":
        return {
          tenacityThreshold: innateBonuses.tenacityThreshold,
          tenacityDamageReduction: innateBonuses.tenacityDamageReduction
        };
      default:
        return null;
    }
  }
  getInnatePassives() {
    return (this.innatePassives || []).map((passive) => ({
      ...passive,
      effect: this.getInnatePassiveEffect(passive.id)
    }));
  }
  getHiddenBlessingBonuses() {
    const now = Date.now();
    if (this._cache.hiddenBlessingBonuses && this._cache.hiddenBlessingBonusesTime && now - this._cache.hiddenBlessingBonusesTime < this._cache.hiddenBlessingBonusesTTL) {
      return this._cache.hiddenBlessingBonuses;
    }
    const soloData = this.getSoloLevelingData() || {};
    const sourceRank = KANDIARU_RANK_EFFECTS[soloData.rank] ? soloData.rank : "E";
    const rankEffects = this._getKandiaruRankEffects(sourceRank);
    const bonuses = {
      sourceRank,
      xpBonus: Number(rankEffects.xpBonus || 0),
      naturalGrowthMultiplier: Number(rankEffects.naturalGrowthMultiplier || 1)
    };
    this._cache.hiddenBlessingBonuses = bonuses;
    this._cache.hiddenBlessingBonusesTime = now;
    return bonuses;
  }
  getHiddenBlessingEffect(blessingId) {
    switch (blessingId) {
      case "blessing_of_kandiaru":
        return this.getHiddenBlessingBonuses();
      default:
        return null;
    }
  }
  getHiddenBlessings() {
    return (this.hiddenBlessings || []).map((blessing) => ({
      ...blessing,
      effect: this.getHiddenBlessingEffect(blessing.id)
    }));
  }
  /**
   * Get shadow army count from ShadowArmy plugin (synchronous, snapshot-based).
   * @returns {number} Shadow count (0 if unavailable)
   */
  _getShadowArmyCount() {
    var _a, _b;
    try {
      const plugin = BdApi.Plugins.get("ShadowArmy");
      const instance = (plugin == null ? void 0 : plugin.instance) || null;
      if (!instance) return 0;
      const snapshot = (_a = instance.getShadowSnapshot) == null ? void 0 : _a.call(instance);
      if (Array.isArray(snapshot)) return snapshot.length;
      return ((_b = instance.settings) == null ? void 0 : _b.shadowCount) || 0;
    } catch {
      return 0;
    }
  }
  /**
   * Calculate army-scaled bonuses for Shadow Army Expansion.
   * Bonuses scale with sqrt(shadowCount) for natural diminishing returns.
   * @returns {Object} Bonus object with xpBonus and allStatBonus
   */
  _getShadowArmyScaledBonuses() {
    const count = this._getShadowArmyCount();
    if (count <= 0) return {};
    const sqrtCount = Math.sqrt(count);
    return {
      xpBonus: 5e-3 * sqrtCount,
      allStatBonus: 5e-3 * sqrtCount
    };
  }
  /**
   * Return true when the player's rank is exactly 'Shadow Monarch'.
   * Result is cached for 5 s (same TTL as the plugin-instance cache) to keep this
   * safe to call in hot loops (mana-cost checks on every skill use).
   * @returns {boolean}
   */
  _isShadowMonarch() {
    var _a, _b, _c;
    const now = Date.now();
    if (this._cache.isShadowMonarchValue !== void 0 && this._cache.isShadowMonarchTime && now - this._cache.isShadowMonarchTime < 5e3) {
      return this._cache.isShadowMonarchValue;
    }
    const rank = (_c = (_b = (_a = BdApi.Plugins.get("SoloLevelingStats")) == null ? void 0 : _a.instance) == null ? void 0 : _b.settings) == null ? void 0 : _c.rank;
    const result = rank === "Shadow Monarch";
    this._cache.isShadowMonarchValue = result;
    this._cache.isShadowMonarchTime = now;
    return result;
  }
  /**
   * Calculate total bonuses from all unlocked and upgraded skills.
   * Includes both general progression buffs and Detoxification's anti-debuff profile.
   * @returns {Object} Passive bonus bundle shared across plugins.
   */
  calculateSkillBonuses() {
    const now = Date.now();
    if (this._cache.skillBonuses && this._cache.skillBonusesTime && now - this._cache.skillBonusesTime < this._cache.skillBonusesTTL) {
      return this._cache.skillBonuses;
    }
    const bonuses = PASSIVE_BONUS_KEYS.reduce((acc, key) => {
      acc[key] = 0;
      return acc;
    }, {});
    STATIC_PASSIVE_BONUS_KEYS.forEach((key) => {
      bonuses[key] = 0;
    });
    const rawBonuses = PASSIVE_BONUS_KEYS.reduce((acc, key) => {
      acc[key] = 0;
      return acc;
    }, {});
    Object.values(this.skillTree).forEach((tier) => {
      if (!tier.skills) return;
      tier.skills.forEach((skill) => {
        const effect = this.getSkillEffect(skill, tier);
        if (effect) {
          PASSIVE_BONUS_KEYS.forEach((statKey) => {
            if (effect[statKey]) rawBonuses[statKey] += effect[statKey];
          });
        }
      });
    });
    const innateBonuses = this.getInnatePassiveBonuses();
    PASSIVE_BONUS_KEYS.forEach((statKey) => {
      if (innateBonuses[statKey]) rawBonuses[statKey] += innateBonuses[statKey];
    });
    if (this.getSkillLevel("shadow_army_expansion") >= 1) {
      const armyBonuses = this._getShadowArmyScaledBonuses();
      PASSIVE_BONUS_KEYS.forEach((statKey) => {
        if (armyBonuses[statKey]) rawBonuses[statKey] += armyBonuses[statKey];
      });
    }
    if (this._isShadowMonarch() && this.getSkillLevel("ashborns_will") >= 1) {
      const awResult = this.findSkillAndTier("ashborns_will");
      if (awResult) {
        const awEffect = this.getSkillEffect(awResult.skill, awResult.tier);
        if (awEffect) {
          PASSIVE_BONUS_KEYS.forEach((statKey) => {
            if (awEffect[statKey]) rawBonuses[statKey] += awEffect[statKey];
          });
        }
      }
    }
    PASSIVE_BONUS_KEYS.forEach((statKey) => {
      bonuses[statKey] = this._applyPassiveBonusCurve(statKey, rawBonuses[statKey]);
    });
    const skillStaticValues = {};
    Object.values(this.skillTree).forEach((tier) => {
      if (!tier.skills) return;
      tier.skills.forEach((skill) => {
        const effect = this.getSkillEffect(skill, tier);
        if (!effect) return;
        STATIC_PASSIVE_BONUS_KEYS.forEach((statKey) => {
          if (effect[statKey] != null) {
            skillStaticValues[statKey] = Math.max(skillStaticValues[statKey] || 0, Number(effect[statKey]));
          }
        });
      });
    });
    STATIC_PASSIVE_BONUS_KEYS.forEach((statKey) => {
      const innateVal = Number(innateBonuses[statKey] || 0);
      const skillVal = Number(skillStaticValues[statKey] || 0);
      bonuses[statKey] = Math.max(innateVal, skillVal);
    });
    if (this._isShadowMonarch()) {
      bonuses.shadowGrowthMultiplier = (bonuses.shadowGrowthMultiplier || 0) + 1;
    }
    this._cache.skillBonuses = bonuses;
    this._cache.skillBonusesTime = now;
    return bonuses;
  }
  // Active-skill methods are mixed in from active-skill-methods.js
  /**
   * Get SoloLevelingStats data
   * @returns {Object|null} - SoloLevelingStats data or null if unavailable
   */
  getSoloLevelingData() {
    var _a, _b, _c, _d, _e, _f;
    const now = Date.now();
    if (this._cache.soloLevelingData && this._cache.soloLevelingDataTime && now - this._cache.soloLevelingDataTime < this._cache.soloLevelingDataTTL) {
      return this._cache.soloLevelingData;
    }
    try {
      const instance = this._getSoloLevelingInstance(now);
      if (!instance) {
        this._cache.soloLevelingData = null;
        this._cache.soloLevelingDataTime = now;
        this._cache.soloPluginInstance = null;
        this._cache.soloPluginInstanceTime = 0;
        return null;
      }
      const result = {
        stats: ((_a = instance.settings) == null ? void 0 : _a.stats) || {},
        level: ((_b = instance.settings) == null ? void 0 : _b.level) || 1,
        rank: ((_c = instance.settings) == null ? void 0 : _c.rank) || "E",
        totalXP: ((_d = instance.settings) == null ? void 0 : _d.totalXP) || 0,
        userMana: (_e = instance.settings) == null ? void 0 : _e.userMana,
        userMaxMana: (_f = instance.settings) == null ? void 0 : _f.userMaxMana
      };
      this._cache.soloLevelingData = result;
      this._cache.soloLevelingDataTime = now;
      return result;
    } catch (error) {
      this._cache.soloLevelingData = null;
      this._cache.soloLevelingDataTime = now;
      return null;
    }
  }
  /**
   * Initialize spent SP on startup based on existing skill upgrades
   * This ensures accurate SP calculations if skills were already upgraded
   * Operations:
   * 1. Calculate total spent SP from existing skill levels
   * 2. Save it to settings
   * 3. Recalculate available SP to ensure accuracy
   */
  initializeSpentSP() {
    try {
      const spentSP = this.getTotalSpentSP();
      const soloData = this.getSoloLevelingData();
      if (soloData && soloData.level) {
        const expectedSP = this.calculateSPForLevel(soloData.level);
        const expectedAvailable = expectedSP - spentSP;
        if (this.settings.totalEarnedSP < expectedSP) {
          this.settings.totalEarnedSP = expectedSP;
        }
        if (this.settings.skillPoints !== expectedAvailable) {
          this.settings.skillPoints = expectedAvailable;
          this.saveSettings();
        }
      }
      if (spentSP > 0 && this.settings.totalSpentSP !== spentSP) {
        this.settings.totalSpentSP = spentSP;
        this.saveSettings();
      }
    } catch (error) {
      console.error("SkillTree: Error initializing spent SP", error);
    }
  }
  /**
   * Calculate total SP spent on skills
   * Updates the in-memory totalSpentSP in settings
   * @returns {number} - Total SP spent
   */
  getTotalSpentSP() {
    let totalSpent = 0;
    Object.values(this.skillTree).forEach((tier) => {
      if (!tier.skills) return;
      tier.skills.forEach((skill) => {
        const skillLevel = this.getSkillLevel(skill.id);
        if (skillLevel > 0) {
          totalSpent += this.getSkillUnlockCost(tier);
          totalSpent += this.getSkillUpgradeCost(tier, skillLevel);
        }
      });
    });
    this.settings.totalSpentSP = totalSpent;
    return totalSpent;
  }
  // Skill-upgrade methods are mixed in from skill-upgrade-methods.js
  /**
   * Unsubscribe from all SoloLevelingStats events
   */
  unsubscribeFromEvents() {
    this.eventUnsubscribers.forEach((unsubscribe) => {
      try {
        unsubscribe();
      } catch (error) {
        console.error("SkillTree: Error unsubscribing from events", error);
      }
    });
    this.eventUnsubscribers = [];
  }
  // ... (rest of the UI methods remain the same, but need to be updated to show skill levels and upgrade costs)
  injectCSS() {
    injectSkillTreeCss();
  }
  // UI helpers/watchers are mixed in from ui-methods.js
  getSettingsPanel() {
    this.detachSkillTreeSettingsPanelHandlers();
    const panel = document.createElement("div");
    panel.style.padding = "20px";
    panel.style.background = "rgba(10, 10, 16, 0.98)";
    panel.style.borderRadius = "2px";
    panel.innerHTML = `
      <div>
        <h3 style="color: #8a2be2; margin-bottom: 20px;">Skill Tree Settings</h3>

        <label style="display: flex; align-items: center; margin-bottom: 15px;">
          <input type="checkbox" ${this.settings.debugMode ? "checked" : ""} id="st-debug">
          <span style="margin-left: 10px;">Debug Mode (Show console logs)</span>
        </label>

        <div style="margin-top: 15px; padding: 10px; background: rgba(10, 10, 16, 0.98); border-radius: 2px; border-left: 3px solid #8a2be2;">
          <div style="color: #8a2be2; font-weight: bold; margin-bottom: 5px;">Debug Information</div>
          <div style="color: #b5bac1; font-size: 13px;">
            Enable Debug Mode to see detailed console logs for:
            <ul style="margin: 5px 0; padding-left: 20px;">
              <li>Level up detection and SP rewards</li>
              <li>Skill unlock/upgrade operations</li>
              <li>Settings load/save operations</li>
              <li>Button creation and retries</li>
              <li>Event system and watchers</li>
              <li>Error tracking and debugging</li>
            </ul>
          </div>
        </div>
      </div>
    `;
    const onChange = (event) => {
      const target = event.target;
      if ((target == null ? void 0 : target.id) === "st-debug") {
        this.settings.debugMode = target.checked;
        this.saveSettings();
        this.debugLog("SETTINGS", "Debug mode toggled", { enabled: target.checked });
      }
    };
    panel.addEventListener("change", onChange);
    this._settingsPanelRoot = panel;
    this._settingsPanelHandlers = { onChange };
    return panel;
  }
};
Object.assign(
  module.exports.prototype,
  ActiveSkillMethods,
  SkillTreeUpgradeMethods,
  SkillTreeUiMethods
);
