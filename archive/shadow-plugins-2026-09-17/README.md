# Shadow Monarch plugins — archived 2026-09-17

Archived, **not deleted**, to clear the way for an Undertale suite. Kept readable on purpose: the user wants these
as a REFERENCE for ideas, so the source stays in the repo rather than going to a tarball.

## What moved

`ShadowArmy`, `ShadowExchange`, `ShadowRecon`, `ShadowSenses`, `ShadowStep`, plus their modules
(`ShadowExchangeMain`, `ShadowStepMain`, `ShadowPortalCore`), the `ShadowAriseAnimation` assets and
`shadow-army-widget-styles.css`. Their BetterDiscord `.config.json` state is in `configs/`.

## What deliberately did NOT move

**`ShadowAwayBridge`** is named Shadow but is not lore — it is a signed local bridge to `127.0.0.1:8787`, the same
port the Sans Companion feed-bridge serves. It is live infrastructure for the companion ecosystem, so it stays.

## Two things checked before moving anything

- **The BD symlinks were removed FIRST.** A dangling symlink in the plugins folder makes BetterDiscord's whole
  addon scan fail silently — no error, no log, simply no plugins at all
  (DKB: `bd-dangling-symlink-kills-all-plugins`). Verified 0 dangling afterwards.
- **`SoloLevelingUtils` soft-loads `ShadowPortalCore`** via candidate paths wrapped in try/catch returning null,
  so removing it degrades rather than breaks. Only the three archived Shadow plugins hard-require it, and they
  moved together.

Everything was already disabled (41 plugins, 11 themes, all `false` as of 2026-09-15), so nothing that was
running stopped.

## To revive

```sh
R=~/Documents/DEVELOPMENT/discord/betterdiscord/betterdiscord-assets
git mv "$R/archive/shadow-plugins-2026-09-17/plugins"/* "$R/plugins"/
for f in ShadowArmy.plugin.js ShadowExchange.plugin.js ShadowRecon.plugin.js \
         ShadowSenses.plugin.js ShadowStep.plugin.js ShadowExchangeMain.js \
         ShadowStepMain.js ShadowPortalCore.js; do
  ln -sf "$R/plugins/$f" ~/Library/Application\ Support/BetterDiscord/plugins/"$f"
done
```

Symlink, never copy: a plain copy means later rebuilds never reach Discord
(DKB: `bd-plugins-stale-copy-vs-symlink`).
