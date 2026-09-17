# Undertale suite — parked plugin work

Two items that need a plugin and cannot be done from `Undertale.theme.css`. Both were
investigated, both are confirmed feasible, and the findings are recorded here so the
next session starts from evidence rather than from scratch.

Parked 2026-09-17 by request, after the theme pass was finished.

---

## 1. Pixelated avatars

**Why a plugin:** `image-rendering: pixelated` only applies when an image is scaled
**up**. Discord downscales avatars (128px asset into a 40px box), so CSS alone changes
nothing. The `src` has to be rewritten, and a theme cannot touch attributes.

**How:** point the avatar at Discord's small CDN size, then let the browser upscale it
with nearest-neighbour. Measured against the real CDN:

| Request | Bytes |
|---|---|
| `?size=16` | 791 |
| `?size=32` | 2,606 |
| `?size=128` | 33,715 |

So the small asset genuinely exists; this is real pixelation, not a filter imitating it.
It also cuts avatar bandwidth by ~40x.

**Decisions still open:**
- **16 vs 32px.** 16 is unmistakably pixel art but faces stop being recognisable; 32 keeps
  people identifiable and still reads pixelated. Suggested start: 32 for avatars, 16 for
  game icons.
- **Scope.** Active Now only, or every avatar (message list, member list, DM sidebar).
  App-wide is the version that makes the theme feel like the game.
- **Animated avatars.** GIFs need the same treatment or they will sit inconsistently
  beside pixelated ones.

**Pairs with squaring.** Squared avatars were tried alone and reverted -- squaring only
crops a photograph, so it reads as broken rather than styled. Square is correct only
once the image is actually pixel art. The mask rule to restore at that point:

```css
div[class^="nowPlayingColumn_"] svg[class*="mask" i] foreignObject {
  mask: none !important; -webkit-mask: none !important; clip-path: none !important;
}
```

The circle is an **SVG mask on a `<foreignObject>`**, not a `border-radius` -- which is
why `--ut-radius: 0` never affected it.

---

## 2. The alert rail glow

`src/HSLDockAutoHide/engine.js:976` `createRail()` draws a 9px bar with hardcoded Solo
Leveling purple and two blurred shadows:

```js
"background: linear-gradient(90deg, rgba(138,43,226,0.96), rgba(167,139,250,0.96))",
"box-shadow: 0 0 18px rgba(138,43,226,0.68), 0 0 34px rgba(138,43,226,0.42)",
```

**Undertale has no soft glows at all.** Recolouring a blur just produces a grey smudge;
the primitive itself is wrong. The game's "something is here for you" vocabulary is the
SAVE star, the SOUL, and the `*` dialogue bullet.

**Proposed (agreed in discussion, not built): severity instead of one binary glow.**

| Signal | Element | Behaviour |
|---|---|---|
| Unread, no mention | battle-box edge | crisp 2px white line, no blur |
| Mention in a server | **SAVE star** (yellow) | small pixel star above that server icon, bobbing |
| DM / direct @you | **the SOUL** (red) | slow pulse -- reserved, the strongest symbol in the game |

The SOUL is the player, so it belongs on "this one is about you" and nowhere cheaper.

**Two notes that matter for implementation:**
- The rail carries `id="sl-hsl-alert-rail"` and the plugin sets only *plain* inline
  styles, so a theme `!important` rule can restyle it -- **except `opacity`**, which the
  plugin toggles to show/hide it. An `!important` there pins the notifier on or off.
- The dock auto-collapses now, so it is hidden most of the time. The star/SOUL should
  appear in the 8px **peek strip**, or a mention is invisible until the dock is revealed.

**Also unfixed here:** `src/HSLDockAutoHide/styles.js:65` still has hardcoded
`rgba(138, 43, 226, 0.4)`. An earlier attempt to tokenise it edited
`plugins/HSLDockAutoHideMain.js`, which is a **dead file** -- the live plugin builds from
`src/`. See DKB `four-theories-read-from-a-dead-source-file`.
