/**
 * Reveal a message's text character by character WITHOUT flattening its tree.
 *
 * Discord message content is not a string. Mentions are pills, custom emoji are <img>,
 * plus code blocks, links and spoilers. The obvious implementation -- read textContent,
 * blank it, write it back on a timer -- destroys all of that: a boxed @mention becomes
 * plain text and emoji images are DELETED. So this walks the text nodes, reveals
 * characters across them in document order, and leaves every element in place.
 *
 * Inline elements count as one unit each and are hidden with `visibility` until the
 * reveal reaches them, so an emoji does not appear before the words leading up to it.
 * `visibility` rather than `display` keeps their box reserved -- the line does not
 * re-wrap underneath the cursor as it types.
 *
 * FAILURE MODE THIS IS BUILT AROUND: text that is blanked and never written back is
 * LOST CONTENT, which is far worse than no animation. Every exit path restores the full
 * text, a watchdog force-completes the reveal, and a click completes it on demand.
 */

/** One "unit" is either a run of characters in a text node, or one inline element. */
function collectUnits(root) {
  const units = [];
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT | NodeFilter.SHOW_ELEMENT);

  for (let n = walker.nextNode(); n; n = walker.nextNode()) {
    if (n.nodeType === Node.TEXT_NODE) {
      if (n.nodeValue && n.nodeValue.length) {
        units.push({ kind: "text", node: n, original: n.nodeValue, len: n.nodeValue.length });
      }
      continue;
    }
    // Only leaf-ish inline elements are units. A <span> that merely wraps more text
    // would otherwise consume a slot and hide its own children.
    if (n.childNodes.length === 0 || n.tagName === "IMG") {
      units.push({ kind: "el", node: n, original: n.style.visibility, len: 1 });
    }
  }
  return units;
}

/**
 * @param {Element} content - the message content element
 * @param {object} deps
 * @param {(lengths: number[], k: number) => number[]} deps.sliceCounts
 * @param {number} deps.msPerChar
 * @param {number} deps.pauseMs - extra dwell after . ! ?
 * @param {(fn: Function, ms: number) => any} deps.setTimeout
 * @returns {{complete: Function, total: number}|null} a handle, or null if nothing to do
 */
function typeOut(content, deps) {
  const { sliceCounts, msPerChar, pauseMs } = deps;
  const setTimer = deps.setTimeout;

  const units = collectUnits(content);
  const lengths = units.map((u) => u.len);
  const total = lengths.reduce((a, b) => a + b, 0);
  if (total === 0) return null;

  let done = false;

  /** Put everything back exactly as it was. The only safe terminal state. */
  const complete = () => {
    if (done) return;
    done = true;
    for (const u of units) {
      try {
        if (u.kind === "text") u.node.nodeValue = u.original;
        else u.node.style.visibility = u.original;
      } catch {
        /* node already detached by a React re-render -- its text came back with it */
      }
    }
  };

  const apply = (k) => {
    const counts = sliceCounts(lengths, k);
    for (let i = 0; i < units.length; i++) {
      const u = units[i];
      if (u.kind === "text") u.node.nodeValue = u.original.slice(0, counts[i]);
      else u.node.style.visibility = counts[i] > 0 ? u.original : "hidden";
    }
  };

  // Flat text used only to find sentence ends, so the pause lands where it reads right.
  const flat = units.map((u) => (u.kind === "text" ? u.original : " ")).join("");

  const step = (k) => {
    if (done) return;
    try {
      apply(k);
      if (k >= total) {
        done = true;
        return;
      }
      const ch = flat[k - 1];
      const delay = msPerChar + (ch === "." || ch === "!" || ch === "?" ? pauseMs : 0);
      setTimer(() => step(k + 1), delay);
    } catch (err) {
      // Never leave the message blank because of a bug in here.
      console.error("[UndertaleDialogue] reveal failed, restoring text:", err);
      complete();
    }
  };

  apply(0);
  setTimer(() => step(1), msPerChar);

  return { complete, total };
}

module.exports = { typeOut, collectUnits };
