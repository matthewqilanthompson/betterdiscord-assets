/**
 * Tests for the two pure decisions behind the Undertale dialogue plugin:
 * WHICH messages type themselves out, and WHERE a speaker's box starts and ends.
 *
 * Both exist as pure functions precisely so they can be tested here rather than by
 * staring at Discord — the 2026-09-17 session lost four rounds to a selector that could
 * only be checked by eye.
 *
 * Run: node --test tests/
 */
import { test } from "node:test";
import assert from "node:assert/strict";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const { shouldType, DEFAULTS } = require("../src/UndertaleDialogue/typing-policy.js");
const { computeGroups } = require("../src/UndertaleDialogue/grouping.js");
const { sliceCounts } = require("../src/UndertaleDialogue/reveal-plan.js");

// A message that SHOULD type. Each test below breaks exactly one thing.
const live = {
  isOwnMessage: false,
  textLength: 40,
  reducedMotion: false,
  documentHidden: false,
  msSinceMount: 5000,
  messageTimestamp: 2000,
  pageLoadTimestamp: 1000,
};
const withOpts = (o) => ({ ...DEFAULTS, ...o });

test("a message arriving while watching types", () => {
  assert.equal(shouldType(live, withOpts()), true);
});

test("your own message never types — you wrote it, and the game never types the player", () => {
  assert.equal(shouldType({ ...live, isOwnMessage: true }, withOpts()), false);
});

test("prefers-reduced-motion wins over everything", () => {
  assert.equal(shouldType({ ...live, reducedMotion: true }, withOpts()), false);
});

test("a hidden tab lands messages instantly", () => {
  // Otherwise you return from another app and watch the backlog type itself out.
  assert.equal(shouldType({ ...live, documentHidden: true }, withOpts()), false);
});

test("nothing types during the mount grace window", () => {
  // Discord renders channel-switch backlog as node ADDITIONS, so "new node" is not
  // "new message". The grace window is the only thing separating them.
  assert.equal(shouldType({ ...live, msSinceMount: 100 }, withOpts()), false);
  assert.equal(shouldType({ ...live, msSinceMount: 501 }, withOpts()), true);
});

test("a message older than page load never types", () => {
  assert.equal(shouldType({ ...live, messageTimestamp: 500 }, withOpts()), false);
});

test("a wall of text is not held hostage at 28ms a character", () => {
  assert.equal(shouldType({ ...live, textLength: 281 }, withOpts({ maxLength: 280 })), false);
  assert.equal(shouldType({ ...live, textLength: 280 }, withOpts({ maxLength: 280 })), true);
});

test("an empty message does not type", () => {
  // Embed-only and attachment-only messages have no text to reveal.
  assert.equal(shouldType({ ...live, textLength: 0 }, withOpts()), false);
});

// ── grouping ──────────────────────────────────────────────────────────────────

test("a run from one speaker is a single box regardless of the time gap", () => {
  const rows = [{ id: "a", authorId: "1" }, { id: "b", authorId: "1" }, { id: "c", authorId: "1" }];
  assert.deepEqual(computeGroups(rows), [
    { id: "a", start: true, end: false },
    { id: "b", start: false, end: false },
    { id: "c", start: false, end: true },
  ]);
});

test("a different speaker opens a new box", () => {
  const rows = [{ id: "a", authorId: "1" }, { id: "b", authorId: "2" }];
  assert.deepEqual(computeGroups(rows), [
    { id: "a", start: true, end: true },
    { id: "b", start: true, end: true },
  ]);
});

test("an unknown author never merges with anything", () => {
  // If we cannot identify the speaker we must not claim two rows are the same one.
  const rows = [{ id: "a", authorId: null }, { id: "b", authorId: null }];
  assert.deepEqual(computeGroups(rows), [
    { id: "a", start: true, end: true },
    { id: "b", start: true, end: true },
  ]);
});

test("a single message is both the start and the end of its box", () => {
  assert.deepEqual(computeGroups([{ id: "a", authorId: "1" }]), [{ id: "a", start: true, end: true }]);
});

test("no messages produces no groups", () => {
  assert.deepEqual(computeGroups([]), []);
});

// ── reveal plan ───────────────────────────────────────────────────────────────
// This is what lets the typewriter preserve mention pills, custom emoji and code
// blocks: it reveals characters ACROSS the element tree instead of flattening it.

test("k characters are spread across the text nodes in order", () => {
  assert.deepEqual(sliceCounts([5, 3, 4], 0), [0, 0, 0]);
  assert.deepEqual(sliceCounts([5, 3, 4], 4), [4, 0, 0]);
  assert.deepEqual(sliceCounts([5, 3, 4], 5), [5, 0, 0]);
  assert.deepEqual(sliceCounts([5, 3, 4], 6), [5, 1, 0]);
  assert.deepEqual(sliceCounts([5, 3, 4], 9), [5, 3, 1]);
});

test("asking for more than exists reveals everything and does not overflow", () => {
  assert.deepEqual(sliceCounts([5, 3, 4], 99), [5, 3, 4]);
});

test("empty text nodes do not swallow characters", () => {
  assert.deepEqual(sliceCounts([0, 3], 2), [0, 2]);
});

// ── author identity ───────────────────────────────────────────────────────────

const { authorIdFromAvatarSrc } = require("../src/UndertaleDialogue/author-id.js");

test("reads the user id out of an avatar src", () => {
  assert.equal(
    authorIdFromAvatarSrc("https://cdn.discordapp.com/avatars/8675309/abc.webp?size=32"),
    "8675309"
  );
});

test("reads the user id out of a per-server avatar src", () => {
  assert.equal(
    authorIdFromAvatarSrc("https://cdn.discordapp.com/guilds/42/users/8675309/avatars/x.webp"),
    "8675309"
  );
});

test("a default avatar has no user id, and that must read as unknown", () => {
  // Not a failure -- there genuinely is no id in the URL. Grouping treats it as unknown
  // and refuses to merge, which is the safe direction.
  assert.equal(authorIdFromAvatarSrc("https://cdn.discordapp.com/embed/avatars/3.png"), null);
  assert.equal(authorIdFromAvatarSrc(""), null);
  assert.equal(authorIdFromAvatarSrc(null), null);
});

// ── merging is subtractive, and that is what makes it fail safe ────────────────

const { mergesUp } = require("../src/UndertaleDialogue/grouping.js");

test("a continuation merges into the row above it", () => {
  const rows = [{ id: "a", authorId: "1" }, { id: "b", authorId: "1" }, { id: "c", authorId: "2" }];
  assert.deepEqual(mergesUp(rows), [false, true, false]);
});

test("when the author cannot be read, NOTHING merges and the theme is left alone", () => {
  // The failure that shipped in v1.0.0: a failed author lookup re-cut every box in the
  // channel, including conversations that were rendering correctly before the plugin
  // loaded. Nothing to merge must mean nothing to change.
  const rows = [{ id: "a", authorId: null }, { id: "b", authorId: null }, { id: "c", authorId: null }];
  assert.deepEqual(mergesUp(rows), [false, false, false]);
});

test("the first row never merges upward — there is nothing above it", () => {
  assert.deepEqual(mergesUp([{ id: "a", authorId: "1" }]), [false]);
});
