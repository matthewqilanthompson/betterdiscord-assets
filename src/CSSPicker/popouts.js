/**
 * Capture every open popout without touching the pointer.
 *
 * Pick mode resolves document.elementFromPoint from mousemove + click. A popup
 * dismisses on outside-click and usually on blur, so the act of picking destroys the
 * target -- menus, autocompletes, the quick switcher and modals are all unreachable
 * that way. This takes no pointer input at all: it walks what is already open.
 *
 * It also reads ::before and ::after, which element inspection structurally cannot
 * see. A pseudo-element fill is invisible to the picker and reads as "no rule touches
 * this" on an element that is visibly painted -- that exact contradiction cost an hour
 * on Discord's Friends button.
 */

/* Anything that behaves like a popup. Roles first: they survive Discord renaming its
   classes, which the class-based selectors here do not. */
const POPOUT_SELECTORS = [
  '[id^="popout_"]',
  '[role="menu"]',
  '[role="listbox"]',
  '[role="dialog"]',
  '[role="tooltip"]',
  '[class*="popout_"]',
  '[class*="autocomplete_" i]',
  '[class*="tooltip_" i]',
  '[class*="modal_" i]',
];

const PAINT_KEYS = [
  "background", "backgroundColor", "backgroundImage", "border", "borderColor",
  "borderWidth", "borderRadius", "boxShadow", "opacity", "color", "content",
  "position", "zIndex", "width", "height", "font",
];

const BLANK = new Set(["none", "auto", "normal", "rgba(0, 0, 0, 0)", "0px", "", "normal normal 400 16px / normal gg sans"]);

const isBlank = (v) => v == null || BLANK.has(String(v).trim());

/** Does this node actually paint anything, or is it just structure? */
const paints = (s) =>
  !isBlank(s.backgroundColor) || !isBlank(s.backgroundImage) ||
  !isBlank(s.boxShadow) || (!isBlank(s.borderWidth) && s.borderWidth !== "0px");

const styleOf = (el, pseudo) => {
  const c = getComputedStyle(el, pseudo || null);
  const out = {};
  for (const k of PAINT_KEYS) out[k] = c[k];
  return out;
};

const describe = (el, depth) => {
  const r = el.getBoundingClientRect();
  const cls = (el.className && el.className.baseVal !== undefined ? el.className.baseVal : el.className) || "";
  const self = styleOf(el, null);
  const before = styleOf(el, "::before");
  const after = styleOf(el, "::after");
  return {
    depth,
    tag: el.tagName.toLowerCase(),
    classes: String(cls).split(/\s+/).filter(Boolean),
    id: el.id || undefined,
    role: el.getAttribute?.("role") || undefined,
    ariaLabel: el.getAttribute?.("aria-label") || undefined,
    rect: { x: Math.round(r.x), y: Math.round(r.y), w: Math.round(r.width), h: Math.round(r.height) },
    paints: paints(self),
    self,
    /* Only reported when they draw -- an empty ::before on every node is noise, and the
       whole point is to make a painting pseudo-element impossible to miss. */
    before: before.content !== "none" && paints(before) ? before : undefined,
    after: after.content !== "none" && paints(after) ? after : undefined,
  };
};

/**
 * @param {number} maxNodes per popout, so one huge modal cannot produce an unreadable report
 * @returns {{ at: string, count: number, popouts: object[] }}
 */
export function captureOpenPopouts(maxNodes = 120) {
  const roots = new Set();
  for (const sel of POPOUT_SELECTORS) {
    for (const el of document.querySelectorAll(sel)) {
      const r = el.getBoundingClientRect();
      if (r.width < 2 || r.height < 2) continue;          // closed or collapsed
      if (getComputedStyle(el).visibility === "hidden") continue;
      roots.add(el);
    }
  }
  /* Drop any root that is inside another root: a menu nested in a dialog should be
     reported once, as part of that dialog's tree, not twice. */
  const tops = [...roots].filter((el) => ![...roots].some((o) => o !== el && o.contains(el)));

  const popouts = tops.map((root) => {
    const nodes = [describe(root, 0)];
    const walk = root.querySelectorAll("*");
    for (let i = 0; i < walk.length && nodes.length < maxNodes; i++) {
      const d = describe(walk[i], 1);
      /* Structure-only nodes are dropped: what matters is what draws. */
      if (d.paints || d.before || d.after) nodes.push(d);
    }
    return {
      root: {
        tag: root.tagName.toLowerCase(),
        id: root.id || undefined,
        role: root.getAttribute?.("role") || undefined,
        ariaLabel: root.getAttribute?.("aria-label") || undefined,
        classes: String(root.className || "").split(/\s+/).filter(Boolean),
      },
      totalDescendants: walk.length,
      reported: nodes.length,
      truncated: walk.length + 1 > maxNodes,
      nodes,
    };
  });

  return { at: new Date().toISOString(), count: popouts.length, popouts };
}
