# Restoring the Shadow Monarch / Solo Leveling setup

One place for how to put it all back, written 2026-09-17 when it was archived to make room for the Undertale
theme. Nothing was deleted. Three archives, all tracked in git, all reversible.

The single most useful fact, which was NOT obvious when archiving and makes most of this easier:

> **Every archived plugin still has its `src/` directory, with ONE exception.** Only the built `*.plugin.js`
> files were moved, so a restore is usually `npm run build` rather than a file shuffle, and the builds in the
> archive are a fallback rather than the only copy.
>
> The exception is **`SoloLevelingTheme`**, whose source is in this archive at `src/SoloLevelingTheme/`. It
> `@import`s `../../themes/variables/*.css`, so it cannot build while the theme is archived — it broke
> `npm run build` outright until its source was moved here too. **Restore the theme FIRST** (below), put its
> source back with `git mv archive/solo-leveling-plugins-2026-09-17/src/SoloLevelingTheme src/`, and only then
> build.

---

## What is where

| archive | holds | size |
|---|---|---|
| `solo-leveling-theme-2026-09-17/` | `repo-themes/` — the whole former `themes/` tree (theme CSS, `variables/`, `svg/`, animation assets), plus `betterdiscord-installed/`, a copy of what was live in BD | 63 MB, 53 files |
| `shadow-plugins-2026-09-17/` | ShadowArmy, ShadowExchange, ShadowRecon, ShadowSenses, ShadowStep + `ShadowPortalCore`, `ShadowExchangeMain`, `ShadowStepMain`, assets, and their BD `configs/` | 9 MB, 20 files |
| `solo-leveling-plugins-2026-09-17/` | 11 lore plugins (CriticalHit, Dungeons, EquipmentManager, ItemVault, LevelProgressBar, RulersAuthority, SkillTree, SoloLevelingStats, SoloLevelingTheme, SystemWindow, TitleManager) + 5 modules, their `configs/`, and `scratch/` (10 dev test plugins) | 4.4 MB, 41 files |

---

## Restoring the plugins (the easy path)

```sh
R=~/Documents/DEVELOPMENT/discord/betterdiscord/betterdiscord-assets
cd "$R"
npm run build            # rebuilds every plugin that still has a src/ dir — all 16 of them
```

Then symlink the ones you want into BetterDiscord:

```sh
BD=~/Library/Application\ Support/BetterDiscord/plugins
for f in ShadowArmy ShadowExchange ShadowRecon ShadowSenses ShadowStep \
         CriticalHit Dungeons EquipmentManager ItemVault LevelProgressBar \
         RulersAuthority SkillTree SoloLevelingStats SoloLevelingTheme \
         SystemWindow TitleManager; do
  ln -sf "$R/plugins/$f.plugin.js" "$BD/$f.plugin.js"
done
```

The shared modules are hand-written, not built, so they come from the archive:

```sh
cp "$R/archive/shadow-plugins-2026-09-17/plugins/"{ShadowPortalCore,ShadowExchangeMain,ShadowStepMain}.js "$R/plugins/"
cp "$R/archive/solo-leveling-plugins-2026-09-17/plugins/"{SoloLevelingUtils,UnifiedSaveManager,LevelProgressBarMain,LevelProgressBarRuntimeHelpers,LevelProgressBarStyles}.js "$R/plugins/"
for f in ShadowPortalCore ShadowExchangeMain ShadowStepMain SoloLevelingUtils UnifiedSaveManager \
         LevelProgressBarMain LevelProgressBarRuntimeHelpers LevelProgressBarStyles; do
  ln -sf "$R/plugins/$f.js" "$BD/$f.js"
done
```

Saved state (levels, inventory, shadows) is in each archive's `configs/` — copy those back into the BD plugins
folder to keep your progress:

```sh
cp "$R/archive/"*/configs/*.json "$BD/"
```

## Restoring the theme

```sh
R=~/Documents/DEVELOPMENT/discord/betterdiscord/betterdiscord-assets
mkdir -p "$R/themes"
git mv "$R/archive/solo-leveling-theme-2026-09-17/repo-themes"/* "$R/themes"/
ln -sf "$R/themes/SoloLeveling-ClearVision.theme.css" \
       ~/Library/Application\ Support/BetterDiscord/themes/SoloLeveling-ClearVision.theme.css
```

Then enable it in BetterDiscord → Themes, and disable **Undertale**.

---

## Five things that will bite if skipped

1. **Symlink, never copy.** A plain copy is why roughly three weeks of theme edits never reached Discord: BD had
   2026-07-13 while the repo had 2026-08-03. DKB: `bd-plugins-stale-copy-vs-symlink`.
2. **A dangling symlink kills EVERY plugin.** BD's addon scan fails silently on an unresolvable file — no error,
   no log entry, just nothing loads. After any restore:
   `find ~/Library/Application\ Support/BetterDiscord/{plugins,themes} -maxdepth 1 -type l ! -exec test -e {} \; -print`
   must print nothing. DKB: `bd-dangling-symlink-kills-all-plugins`.
3. **`SoloLevelingToasts` was never archived** and must stay. Seven theme-neutral plugins depend on it
   (AAPerfSentinel, HSLDockAutoHide + Main, Stealth + Main, UserPanelDockMover, BetterDiscordPluginUtils). It is
   the shared toast engine.
4. **`ShadowAwayBridge` was never archived** either. It is named Shadow but is infrastructure: a signed bridge to
   `127.0.0.1:8787`, the same port the Sans Companion feed-bridge serves.
5. **`HSLDockAutoHideMain.js` was edited** on 2026-09-17. Its hardcoded Solo Leveling purples became CSS
   variables **whose fallbacks are the original purple**, so restoring the SL theme needs no action — it looks
   exactly as it did. Only a theme that DEFINES `--ut-dock-accent*` changes it. Pre-edit copy:
   `plugins/HSLDockAutoHideMain.js.bak-pre-tokens-20260917-111125`, and in git history.

## Going back to Undertale afterwards

Reverse it: disable the SL theme and plugins in BetterDiscord, remove their symlinks from `BD/plugins`, re-enable
the `Undertale` theme. The Undertale work lives in `undertale/` and is untouched by any of the above.

## If something is missing

Everything here is in git, including the archives. `git log --follow -- <path>` finds any file's whole history
across the `git mv`, and `git show <commit>:<path>` recovers a specific version.
