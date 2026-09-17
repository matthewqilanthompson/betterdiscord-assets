# Undertale suite — staging

Copies of the Solo Leveling plugins that are worth re-theming, taken from
`archive/solo-leveling-plugins-2026-09-17/`. The archive is the pristine reference and is never edited; work
happens here.

**The framing that decides everything: the user is the PLAYER, not Sans.** Sans is a presence in the world who
reacts, the way he does in the game. Plugins that only made sense while the user WAS the Shadow Monarch do not
survive the translation, however well they worked.

## Copied here, because the mapping is exact and the code is tractable

| file | becomes | why it maps |
|---|---|---|
| `SystemWindow.plugin.js` (1,012) | **the dialogue box** | black box, white pixel text, `*` asterisk lines. The most recognisable thing in the game, and the highest visual impact per line of code |
| `LevelProgressBar.plugin.js` (1,014) | **LV / EXP bar** | Undertale's actual stat. LV is LOVE, which is the joke the whole game turns on |
| `ItemVault.plugin.js` (1,513) | **inventory + BOX** | the game caps you at 8 slots and has box storage; the mechanic already exists |

## Left in the archive as reference, NOT forked

These are 3,400-19,500 lines each, about 52,000 in total. Re-theming them is not a rename, it is a rewrite, and
forking them would create a second copy to maintain before a single Undertale line exists.

| plugin | lines | what to MINE from it |
|---|---|---|
| `Dungeons` | 19,539 | biome spawn tables, status effects, encounter pacing → Ruins/Snowdin/Waterfall/Hotland/CORE |
| `SoloLevelingStats` | 11,535 | XP curves, daily quests, achievement plumbing → LV/EXP/HP/G |
| `CriticalHit` | 6,075 | per-message detection, combo tracking, damage numbers → the attack-timing bar |
| `SkillTree` | 4,300 | upgradeable passive structure → the seven SOUL traits |
| `SoloLevelingTheme` | 4,002 | **modular CSS injection with per-module toggles** — the architecture is theme-agnostic and is the single most reusable thing here |
| `EquipmentManager` | 4,010 | slot/stat plumbing → but Undertale gives the player exactly TWO slots, weapon and armour, not ten |
| `RulersAuthority` | 3,454 | telekinetic UI push/pull/grip → Sans's blue attack, but done TO the player, so it is an AU-Sans feature rather than a player ability |

## Not moved, deliberately

`SoloLevelingToasts` stays live and un-archived: **seven theme-neutral plugins depend on it** (AAPerfSentinel,
HSLDockAutoHide and its Main, Stealth and its Main, UserPanelDockMover, BetterDiscordPluginUtils). It is the
shared toast engine, so it is the first thing to re-theme, not the last — everything else surfaces through it.

`ShadowAwayBridge` is named Shadow but is infrastructure: a signed bridge to `127.0.0.1:8787`, the same port the
Sans Companion feed-bridge serves.

## Open, and both shape the design

1. **Which AU Sans.** Ink's brush, Error's strings and glitching, Dust, Killer, Cross — these imply different CSS
   and different animations. `RulersAuthority`'s replacement is a different plugin for each.
2. **Is AU Sans a second character beside the existing Sans Companion, or a variant that replaces him in
   Discord?** That decides whether this suite talks to the bridge on 8787 or stands alone.
