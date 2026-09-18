# Repurposing the Shadow Monarch suite for Geno

Date: 2026-09-18 · Status: draft, awaiting review
Goal: work out which existing Solo Leveling plugins map onto Geno's documented abilities, which are
infrastructure to reuse untouched, and which **must not** be converted.

Companion to `macos-apps/sans-companion/docs/superpowers/specs/2026-09-18-introducing-geno-design.md`,
which establishes who Geno is here: a version who got peace, keeps the memory, left the wound.

## What Geno can actually do

From the 2026-09-18 source research (`scratchpad/wiki/au-error-geno.md`, cited to creator posts
where reachable). Two tiers, and the distinction matters for accuracy claims:

**Geno-specific** — persistence and information:
- retains memory across resets and **hands it to the current Sans**
- survives inside a saved state; **compromised outside it**
- can alter or erase others' memories — framed in-story as manipulative, not neutral
- creates blaster attacks **for others to use**

**Sans-baseline** — he is Sans, so he has Sans's kit:
- telekinesis / blue magic (pull, push, make things heavy)
- **shortcuts** — instant movement between places

Accurate either way; only the first tier is *his*.

## The mapping

### Tier 1 — direct repurpose, the mechanic is already right

| Existing plugin | What it does | Geno ability | Fit |
|---|---|---|---|
| **RulersAuthority** | "Telekinetic control over Discord's UI — push, pull, grip, and crush panels and channels" | **blue magic** | Near-perfect. Already telekinesis; only the skin and the verbs change. Blue magic makes things HEAVY, so "pull/drop" reads better than "crush". |
| **MessageEditHistory** | Records previous text of edited messages, shows version history inline | **the erasure he refuses** | **The best fit in the suite.** He CAN erase memory and does not. A plugin that keeps what was changed is that choice, working. |
| **ShadowStep** | Bookmark channels as anchors, teleport to them | **shortcuts** | Direct. Sans takes shortcuts; this is shortcuts. |
| **ShadowExchange** | Waypoint bookmarks, station and teleport | **shortcuts** | Same family as ShadowStep — see the consolidation note below. |
| **ItemVault** | Centralized storage for the plugin ecosystem | **the saved state** | Infrastructure that already IS persistence. Becomes the SAVE store. |
| **ShadowSenses** | Watch users, notify when they speak even while invisible | **memory across absence** | Reframe: not surveillance, but *what happened while you were gone*. |
| **ShadowRecon** | Mark guilds for dossiers, track authority, inspect targets | **knowing things** | Weaker fit — works as "what he has noticed", but the dossier framing is Monarch, not Geno. |

### Tier 2 — infrastructure, reuse untouched

`ShadowPortalCore` (shared transition runtime), `SoloLevelingToasts` (toast engine with rate
limiting and dedup), `AAPerfSentinel` (profiler), `CSSPicker`. None are thematic; all are plumbing.
**Do not fork these.** Re-skinning a shared core is how you end up maintaining two of them.

### Tier 3 — MUST NOT be converted, and this is the important finding

`SoloLevelingStats`, `SkillTree`, `EquipmentManager`, `Dungeons`, `CriticalHit`,
`LevelProgressBar`, `TitleManager`.

These are the RPG progression suite: levels, XP, skill trees, equipment, boss drops, crits.

**In Solo Leveling that fantasy is the point. In Undertale it is the thing you are not supposed to
do.** LV and EXP in Undertale are not neutral progression — they are a measure of violence, and the
game is explicit about it. A Geno plugin that awards XP for activity and levels you up is not a
reskin; it inverts the meaning of the source material it claims to be accurate to.

It also directly violates the peaceful-timeline ruling that governs this whole project: no battles,
no combat register. `Dungeons` (biome spawns, bosses, bleed and burn statuses) and `CriticalHit`
carry that register wholesale.

**Recommendation: leave the Solo Leveling progression suite as Solo Leveling.** If a sense of
accumulation is wanted on the Undertale side later, it has to be built on something other than
EXP — and that is a separate design problem, not a reskin.

### Tier 4 — inverted, and interesting because of it

`Stealth` — "suppress typing, force invisible, suppress idle detection, hide activities, **erase
telemetry**, neutralize tracking."

This is the exact opposite of Geno. Stealth erases traces; he is the one who **keeps** them. Do not
convert it. Worth noting in the spec because the contrast sharpens what he is: the suite already
contains his opposite, and leaving it as-is makes both clearer.

## Consolidation worth doing on the way

`ShadowStep` and `ShadowExchange` are both waypoint-and-teleport on the same `ShadowPortalCore`.
Under one character with one ability — shortcuts — two plugins doing it is harder to explain than
one. **Merging them is easier to justify as Geno than it was as Solo Leveling**, where army-stationing
and personal anchors were different fantasies.

## RULING: copy, never modify the originals

User's instruction, 2026-09-18: **the Solo Leveling plugins are not touched.** Each Geno plugin is a
NEW plugin in its own `src/<Name>/` directory, copied from its Shadow Monarch counterpart and
repurposed there. The originals keep working, keep their names, and stay enable-able.

That settles the coexist-or-replace question: **coexist.**

**Naming.** New directories get their own names rather than `Shadow*` ones — the point is that they
are separate plugins, and a copy that keeps the old name is a merge conflict waiting to happen.
`build-plugin.js --all` discovers any `src/<Name>/manifest.json`, so a new directory needs nothing
registered anywhere; it just has to have a manifest.

**Shared cores: consume, do not fork.** `ShadowPortalCore`, `SoloLevelingToasts` and `ItemVault` are
infrastructure, not character. Forking them gives you two toast engines with separate rate limiters
and dedup state fighting over the same queue — worse than a slightly odd import name. So the Geno
plugins depend on the EXISTING cores under their existing names. If that naming grates later,
extracting a neutral core is its own task; doing it now means touching originals, which is exactly
what this ruling forbids.

One consequence to accept knowingly: this means the Solo Leveling core plugins must stay installed
even if the rest of that suite is disabled. Archiving one is the documented way to silently break
others (see Hazards below).

**The real hazard of coexistence: both suites enabled at once.** Two telekinesis plugins grabbing
the same panels, two waypoint systems binding the same shortcuts, two toast producers. They must not
both be active. Options, cheapest first:
1. Rely on the user enabling one suite or the other (fine for one person; fragile).
2. Each Geno plugin checks whether its Solo Leveling counterpart is enabled and stands down with a
   one-line notice — self-documenting, and it turns a confusing conflict into a clear message.
3. A shared "which suite is active" setting. Most work; only worth it if 1 and 2 prove annoying.

Recommend 2 for anything that binds input or grabs UI, and 1 for everything else.

## Hazards specific to this repo

**Shared cores break silently when one consumer is archived.** `ShadowPortalCore` is consumed by
`ShadowStep`, `ShadowExchange` and `ShadowSenses`. The knowledge base already has an entry on a
plugin being archived and silently disabling features in others. Any repurposing that retires a
consumer must check the core's other consumers first.

**Do the plugins coexist or replace?** Open question. If the Solo Leveling suite stays enabled
alongside a Geno suite, two toast engines, two portal cores and two telekinesis plugins will fight
over the same UI. Decide before building, not after.

**The theme is already Undertale.** `Undertale.theme.css` is live and the Solo Leveling theme is
archived — so the visual layer has already moved. The plugins are the part that has not.

## RULING: trim the army out entirely

User's instruction, 2026-09-18: **the shadow-army layer is cut, not converted.** Geno does not
summon, station or command anything. He does not extract shadows from people -- that concept is
both wrong for him and wrong for a peaceful setting.

So the copies keep the underlying FUNCTION and drop the entities that carry it:

| Plugin | Keep | Cut |
|---|---|---|
| **ShadowStep** | bookmark a channel, jump to it | nothing to cut |
| **ShadowExchange** | waypoints, jump to them | "station a shadow at a location" -- the waypoint is just a waypoint |
| **ShadowSenses** | watch a user, be told when they speak | deploying soldiers as entities that do the watching |

**`ShadowArmy` itself is not eligible at all.** It IS the army system; there is no function
underneath to keep.

### Measured trim cost, 2026-09-18 -- this reorders the build

Counted by grepping each plugin for army/soldier/extraction references:

| Plugin | Size | Army wiring | Copy difficulty |
|---|---|---|---|
| **ShadowStep** | 5 files, 1,377 lines | **none found** | Cleanest in the suite. Straight copy and re-skin. |
| **ShadowExchange** | 5 files, 2,118 lines | `index.js` only | Shallow. One file to unpick. |
| **ShadowSenses** | 12 files, **8,668 lines** | 4+ files incl. a dedicated `deployment-manager.js` | **Deep.** Removing the army here is a rewrite, not a trim. |

The last row is the useful finding: ShadowSenses looked like the most interesting mapping
("what happened while you were gone") and it is also, by a wide margin, the most expensive. Its
deployment model is not a skin over the watch-and-notify function -- it is most of the plugin.

**Consequence:** if "what happened while you were gone" is wanted, consider writing it fresh
against the same Flux dispatches rather than carving 8,668 lines down. A watch-and-notify plugin
built for Geno directly is very likely smaller than ShadowSenses minus its army.

## Recommended build order

1. **MessageEditHistory → the one who keeps things.** Smallest change, best thematic fit, already
   works. Mostly re-skin and re-word.
2. **RulersAuthority → blue magic.** Mechanic is already telekinesis; change the verbs and the
   colour. "Heavy" rather than "crushed".
3. **ShadowStep → shortcuts.** Confirmed clean: no army wiring at all, 1,377 lines. The
   cheapest real copy in the suite; do it before ShadowExchange, not alongside it.
4. **ShadowExchange → merge into the same shortcuts plugin.** Shallow trim, one file.
5. **ItemVault → the saved state**, as the store behind anything that restores.
6. **"What happened while you were gone"** -- and per the measurement above, probably NOT by
   copying ShadowSenses. Write it against the same Flux dispatches instead and leave those 8,668
   lines alone.

Stop after any step; each stands alone.

## Open questions

1. ~~Coexist or replace?~~ **RESOLVED: coexist, via copies. Originals are never modified.** See the ruling above.
2. **Does Geno's Discord presence relate to the desktop Geno at all**, or are they separate
   inhabitants of separate places? The project's standing rule is that Sans is one person across
   surfaces — does that extend to a third character and a third surface?
3. **Is "blue magic" the right skin for RulersAuthority**, given blue is also Geno's own palette
   association? Might read as him rather than as his ability.
4. **Anything in the progression suite worth salvaging** on a non-EXP basis, or is it genuinely
   Solo-Leveling-only? Current recommendation: leave it alone.
