# Undertale suite — parked work

Items investigated during the theme pass and deferred. Each is confirmed feasible, and
the findings are recorded so the next session starts from evidence rather than scratch.

**Items 1 and 2 need a plugin. Item 3 does not** -- it is pure CSS and is only parked,
not blocked.

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


---

## 3. Replace the Home icon with sprite art — **CSS only, not plugin work**

Swap the Discord logo in the servers rail for an Undertale sprite, while the button still
navigates Home.

**Why no plugin:** only the *paint* changes. The click target is an ancestor
(`div[role="treeitem"]`), so leaving it untouched preserves navigation, focus and
accessibility for free. Nothing needs to intercept a click.

**The element**, from a CSS Picker capture:

```
svg[role="img"]  40x40
  └ parent  div[class^="childWrapper_"]
      └ div[role="treeitem"][class^="wrapper_"]     <- the click target, DO NOT touch
          └ <foreignObject>                          <- masked, like the avatars
```

Note the `<path>` inside the svg already computes as `display: none`, and
`nav[aria-label="Servers sidebar"] svg` (this theme's rule) already reaches it.

**Approach:** put a `background-image` on `div[class^="childWrapper_"]` with
`background-size: contain`, and suppress the logo's paint — **hide the path, not the svg**.
`display: none` on the svg itself risks collapsing the layout box and the hit area; the
goal is to change what is drawn, not what is there.

**Asset delivery is the real constraint.** A BD theme is injected into the discord.com
document, so a relative `url()` resolves against discord.com and silently 404s (the reason
the old theme pinned a GitHub raw URL — see the header comment in the theme). The fonts
sidestep this entirely by being installed locally, which an image cannot do.

So: **crop one frame and embed it as a base64 `data:` URI.** Self-contained, no network,
no publishing step. For scale, the whole `sans-dr.png` sheet is 16 KB; a single cropped
frame base64s to far less. Sheets available in
`chrome-themes/newtab-src/media/`: `sans-dr.png`, `sans-poses.png`, `sans-expressions.png`,
`sans-moods.png`, `overworld.png`.

**Open:** which sprite. A single idle Sans head reads at 40x40; a full-body frame probably
will not.

Add `image-rendering: pixelated` so the upscale stays crisp — the same property that does
nothing for avatars (item 1) works perfectly here, because this image genuinely IS small
and genuinely IS being scaled up.

---

## Asset routes — both proven in this repo

Relevant to the Home icon above, and to any future artwork. A BD theme is injected into
the discord.com document, so a **relative `url()` resolves against discord.com and 404s**.
Two routes work around that, and the Solo Leveling theme used the first in production:

1. **GitHub raw URL.** What the archived theme did:

   ```css
   ul[aria-label="Channels"] [class*="link_"] {
     background-image: url('https://raw.githubusercontent.com/<user>/betterdiscord-assets/main/themes/svg/Shadowbannerv1.1.svg') !important;
   }
   ```

   Needs the asset committed and pushed before it renders, and fetches over the network.

2. **base64 `data:` URI inline in the CSS.** Self-contained, no publishing step, no network.
   Better for something small like a 40x40 icon; worse for anything large, since it inflates
   the theme file every reload.

**A drawn SVG is therefore a real option, not a last resort** — the previous theme drew
per-state channel artwork this way. The archived library is at
`archive/solo-leveling-theme-2026-09-17/repo-themes/svg/`, and includes
`channel-selected.svg`, `channel-unread.svg`, `Selected_channel.svg`, `Shadowbannerv1.1.svg`,
`hand.svg`, `person.svg`, `Arisefont.svg`, `dataflow.svg`. `themes/svg/` is no longer in the
live working tree — it went with the archive.

The Undertale equivalent would be battle-box framing rather than banners, but the mechanism
is identical and already validated here.

Also worth lifting from that theme when channels are revisited:

```css
/* channel row spacing -- a double gap made the list far easier to scan */
ul[aria-label="Channels"] li[class*="containerDefault_"] { margin-bottom: 8px !important; }
```

## Undertale typing animation for messages

**Status:** not started. Requested 2026-09-17, alongside the dialogue-box message styling.

**What is wanted:** messages type themselves out character by character, the way Sans's and
Papyrus's dialogue does in `sans-companion` / `pixel-home`.

**Why this is NOT CSS, stated precisely so it is not attempted again:**

- The usual CSS trick is `width` animated in `ch` units with `overflow: hidden`, plus
  `steps(n)`. It needs the character count **in the stylesheet**, one keyframe set per
  length. Message text is arbitrary and unknown at author time.
- It also only works on a **single line**. Any message that wraps breaks it -- the clip
  is horizontal, so wrapped lines appear all at once, fully formed, above a line that is
  still typing.
- Per-line asterisks have the same root cause: CSS `::before` attaches to an ELEMENT.
  The visual lines produced by wrapping are not elements and do not exist until layout
  runs, so there is nothing to attach to. One asterisk per message is the CSS ceiling,
  and that is what the theme ships.

**What the plugin would do**, reusing the approach already working in the companion apps:

1. `MutationObserver` on the message list, firing only for newly added nodes.
2. For each new node, take `textContent`, blank it, then write it back on a timer
   (the companions use ~28ms/char, with a longer pause on `.`, `!` and `?`).
3. Split on line breaks and insert `* ` per line at that point -- trivial in JS, and the
   thing CSS cannot reach.
4. Respect `prefers-reduced-motion`, and skip messages already on screen at load: typing
   out a hundred-message backlog on every channel switch would be unusable.

**DECIDED 2026-09-17 by the user: only messages that arrive WHILE WATCHING.** Not on
channel switch, not on scrollback, not on reconnect. This matches the companion apps and
settles the cheapest version:

- The observer skips everything present at mount, and every node added within the first
  ~500ms of a channel switch (Discord renders the backlog as additions, so "new node" is
  not the same as "new message").
- A message whose timestamp is older than page load is never animated.
- If the tab is hidden (`document.hidden`), messages land instantly -- typing out what
  arrived while you were in another app is the failure mode this decision avoids.


## Group messages by author regardless of time gap

**Status:** not started. Requested 2026-09-17, after the CSS grouping shipped.

**What is wanted:** every consecutive run from the same person is ONE dialogue box, even
when the messages are far apart in time.

**Why the CSS version stops short.** The theme builds its box from Discord's own grouping:
`groupStart_` opens it, and `:has(+ li ... groupStart_)` closes it. That is exact, and it
is Discord's definition, not ours -- Discord ends a group after roughly **7 minutes** even
when the author has not changed, and stamps `groupStart_` on the next message. Measured in
the user's own screenshot: JOCCY at 16:20 and 16:29 are nine minutes apart, so both carry
`groupStart_` and both correctly draw their own box.

**Why CSS cannot fix it.** Merging those runs means knowing that two rows share an AUTHOR.
The author is not in any class, attribute or id on the row -- `li` ids carry the channel and
message snowflake only -- and CSS has no way to compare two elements' contents. There is
nothing to select on.

**What the plugin would do:**

1. Read the author id from Discord's message store (or the avatar `src`, which embeds the
   user id, as a DOM-only fallback).
2. Stamp `data-ut-author` on each `li`, plus `data-ut-group-start` / `data-ut-group-end`
   computed by comparing neighbours -- ignoring the time gap entirely.
3. The theme then keys its borders off those attributes instead of `groupStart_`. The CSS
   is otherwise unchanged: three states, same three rules.

**Note:** this pairs naturally with the typing animation above -- both want a
`MutationObserver` on the message list, so one observer should serve both.
