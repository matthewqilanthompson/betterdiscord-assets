/**
 * Shared hotkey utilities with PluginUtils fallback.
 * Replaces the duplicated isEditableTarget, parseHotkey, matchesHotkey
 * patterns found in CSSPicker, ShadowStep, RulersAuthority.
 *
 * Usage:
 *   import { isEditableTarget, matchesHotkey } from "../shared/hotkeys";
 *   if (isEditableTarget(e.target)) return;
 *   if (matchesHotkey(e, "Ctrl+Shift+P")) { ... }
 */

/**
 * Check if the event target is an editable element (input, textarea, contentEditable).
 * @param {Element} target
 * @returns {boolean}
 */
function isEditableTarget(target) {
  if (!target) return false;
  const tag = target.tagName?.toLowerCase?.() || "";
  return (
    tag === "input" ||
    tag === "textarea" ||
    tag === "select" ||
    !!target.isContentEditable
  );
}

/**
 * Parse a hotkey string like "Ctrl+Shift+P" into a normalized spec.
 * @param {string} hotkey
 * @returns {{ key: string, ctrl: boolean, shift: boolean, alt: boolean, meta: boolean }}
 */
function parseHotkey(hotkey) {
  const parts = String(hotkey || "")
    .split("+")
    .map((p) => p.trim().toLowerCase());
  return {
    key: parts.filter(
      (p) => p !== "ctrl" && p !== "shift" && p !== "alt" && p !== "meta" && p !== "cmd"
    )[0] || "",
    ctrl: parts.includes("ctrl"),
    shift: parts.includes("shift"),
    alt: parts.includes("alt"),
    meta: parts.includes("meta") || parts.includes("cmd"),
  };
}

/**
 * Check if a keyboard event matches a hotkey string.
 * @param {KeyboardEvent} event
 * @param {string} hotkey - e.g. "Ctrl+Shift+P"
 * @returns {boolean}
 */
function matchesHotkey(event, hotkey) {
  if (!event || !hotkey) return false;
  /* A hotkey setting may list ALTERNATIVES, comma separated: "Ctrl+Alt+Y, Ctrl+Shift+Y".
     Any one of them fires. This exists because a combination can be swallowed before it
     ever reaches the page -- by the OS, by a remapper, or by the app itself -- and from
     inside the plugin that is indistinguishable from a broken matcher. Listing two
     removes the guesswork: if either arrives, the picker runs. */
  if (String(hotkey).includes(",")) {
    return String(hotkey)
      .split(",")
      .map((h) => h.trim())
      .filter(Boolean)
      .some((h) => matchesHotkey(event, h));
  }
  const spec = parseHotkey(hotkey);
  if (!spec.key) return false;
  // Inclusive matching: required modifiers must be pressed,
  // but extra modifiers (e.g. from Hyper/CapsLock) are allowed.
  /* Match event.key OR event.code. On macOS, Option is a COMPOSE key: Option+Y
     reports event.key "\u00a5", not "y", so a key-only comparison silently never
     fires for any Alt hotkey. event.code is layout- and modifier-independent. */
  const key = String(event.key || "").toLowerCase();
  const code = String(event.code || "").toLowerCase();
  const codeMatches =
    code === `key${spec.key}` || code === `digit${spec.key}` || code === spec.key;
  if (key !== spec.key && !codeMatches) return false;
  if (spec.ctrl && !event.ctrlKey) return false;
  if (spec.shift && !event.shiftKey) return false;
  if (spec.alt && !event.altKey) return false;
  if (spec.meta && !event.metaKey) return false;
  return true;
}

module.exports = { isEditableTarget, parseHotkey, matchesHotkey };
