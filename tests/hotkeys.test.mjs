/**
 * Regression tests for the hotkey matcher.
 *
 * Every event shape below was COPIED FROM A REAL BetterDiscord debug.log during the
 * 2026-09-17 session where the CSS Picker hotkey appeared dead. They are not invented:
 * macOS reports Option+Y as "¥" and Option+Shift+Y as "Á", which is why a
 * key-only comparison fails for every Alt binding.
 *
 * Run: node --test tests/
 */
import { test } from "node:test";
import assert from "node:assert/strict";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const { matchesHotkey, parseHotkey } = require("../src/shared/hotkeys.js");

const ev = (o) => ({
  key: "", code: "", ctrlKey: false, altKey: false, shiftKey: false, metaKey: false, ...o,
});

test("parses a setting with spaces around the plus", () => {
  assert.deepEqual(parseHotkey("cmd + y"), { key: "y", ctrl: false, shift: false, alt: false, meta: true });
});

test("macOS compose: Option+Y reports \\u00a5, matched via event.code", () => {
  const e = ev({ key: "¥", code: "KeyY", ctrlKey: true, altKey: true });
  assert.equal(matchesHotkey(e, "Ctrl+Alt+Y"), true);
});

test("macOS compose: Option+Shift+Y reports \\u00c1", () => {
  const e = ev({ key: "Á", code: "KeyY", altKey: true, shiftKey: true, ctrlKey: true });
  assert.equal(matchesHotkey(e, "Ctrl+Alt+Shift+Y"), true);
});

test("the exact event from the log matches the user's own 'cmd + y' setting", () => {
  const e = ev({ key: "¥", code: "KeyY", altKey: true, metaKey: true });
  assert.equal(matchesHotkey(e, "cmd + y"), true);
});

test("a list of alternatives fires on either", () => {
  const list = "Ctrl+Alt+Y, Ctrl+Shift+Y";
  assert.equal(matchesHotkey(ev({ key: "¥", code: "KeyY", ctrlKey: true, altKey: true }), list), true);
  assert.equal(matchesHotkey(ev({ key: "Y", code: "KeyY", ctrlKey: true, shiftKey: true }), list), true);
});

test("does not fire without the required modifiers", () => {
  assert.equal(matchesHotkey(ev({ key: "y", code: "KeyY" }), "Ctrl+Alt+Y"), false);
  assert.equal(matchesHotkey(ev({ key: "u", code: "KeyU", ctrlKey: true, altKey: true }), "Ctrl+Alt+Y"), false);
});

test("modifier-only keydowns never match", () => {
  for (const k of ["Alt", "Control", "Shift", "Meta"]) {
    const e = ev({ key: k, code: `${k}Left`, altKey: true, ctrlKey: true });
    assert.equal(matchesHotkey(e, "Ctrl+Alt+Y"), false, `${k} should not match`);
  }
});
