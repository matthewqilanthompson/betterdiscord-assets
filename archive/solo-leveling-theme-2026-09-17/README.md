# Solo Leveling / Shadow Monarch theme — archived 2026-09-17

Archived, **not deleted**, at the user's request, to make room for an Undertale restyle. Everything here can be
put back; nothing was removed from the BetterDiscord install.

## What is here

| folder | what it is |
|---|---|
| `repo-themes/` | the repo's entire former `themes/` tree, moved with `git mv` so history follows it |
| `betterdiscord-installed/` | a COPY of what was live in `~/Library/Application Support/BetterDiscord/themes` |

`repo-themes/` holds `SoloLeveling-ClearVision.theme.css`, the `variables/` and `svg/` trees, the
`animation_mask/` assets, the HSL-Diagnostic `.bak` files, and the SLEndingBest video/still assets (most of the
13 MB).

## The state it was archived in, which is worth knowing before reviving it

- **Every plugin and theme was already disabled.** `data/stable/plugins.json` listed 41 plugins and
  `themes.json` 11 themes, all `false`, last written 2026-09-15 22:55. Archiving broke nothing that was running.
- **The installed theme was a stale plain COPY, not a symlink** — BD's file was dated 2026-07-13 against the
  repo's 2026-08-03, so roughly three weeks of edits never reached Discord
  (DKB: `bd-plugins-stale-copy-vs-symlink`). If this theme is ever revived, symlink it rather than copying, the
  way the 28 plugins already are.

## To revive

```sh
R=~/Documents/DEVELOPMENT/discord/betterdiscord/betterdiscord-assets
git mv "$R/archive/solo-leveling-theme-2026-09-17/repo-themes"/* "$R/themes"/
ln -sf "$R/themes/SoloLeveling-ClearVision.theme.css" \
       ~/Library/Application\ Support/BetterDiscord/themes/SoloLeveling-ClearVision.theme.css
```

Then enable it in BetterDiscord settings. The BD install itself was left untouched by this archive, so the old
copy is still sitting there until you replace or remove it.
