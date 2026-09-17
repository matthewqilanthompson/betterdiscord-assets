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
/* Containers Discord floats real popups in. A node inside one of these is open; a node
   that merely matches a selector may be permanently mounted app chrome. */
/* NOT [class*="layer_"]: Discord wraps the ENTIRE APP in a layer_ div, so including it
   made every candidate "floating" and the guard matched nothing. That is the bug this
   list was written to fix, reintroduced by one selector that looked harmless. */
const FLOATING_CONTAINERS =
  '[class*="layerContainer_"], [class*="popouts_"], [class*="tooltips_"], [class*="notices_"]';

/* App chrome that no popup ever contains. A "popout" wrapping the server rail or the
   message area is a false positive, not a popup. */
const APP_CHROME =
  'nav[aria-label="Servers sidebar"], [class*="chatContent_"], [class*="sidebarList_"]';

/**
 * Is this a floating popup, or just a permanently mounted element that happens to match?
 *
 * This guard is the difference between the feature working and the HOTKEY BEING DEAD.
 * captureOpenPopouts runs before pick mode, and the handler treats a non-zero count as
 * "a popup is open, capture it instead of picking" -- so ONE always-present false
 * positive makes the hotkey unable to start pick mode, for ever, while still being able
 * to cancel it. That is exactly how this was found.
 */
const isFloating = (el) => {
  if (el.querySelector && el.querySelector(APP_CHROME)) return false;
  /* Containment in a real popup container is the ONLY signal. The position/z-index
     fallback that used to live here matched permanently-mounted absolute elements,
     which is the same false-positive class. A popup Discord renders outside these
     containers is worth missing; a false positive kills the hotkey entirely. */
  return !!(el.closest && el.closest(FLOATING_CONTAINERS));
};

export function captureOpenPopouts(maxNodes = 120) {
  const roots = new Set();
  for (const sel of POPOUT_SELECTORS) {
    for (const el of document.querySelectorAll(sel)) {
      const r = el.getBoundingClientRect();
      if (r.width < 2 || r.height < 2) continue;          // closed or collapsed
      const cs = getComputedStyle(el);
      if (cs.visibility === "hidden" || cs.display === "none") continue;
      if (cs.opacity === "0") continue;
      if (!isFloating(el)) continue;                      // mounted chrome, not a popup
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

  if (popouts.length) {
    console.log(
      "[CSSPicker] capture found:",
      popouts.map((p) => p.root.ariaLabel || p.root.role || p.root.id || `.${p.root.classes[0] || p.root.tag}`).join(", ")
    );
  }
  return { at: new Date().toISOString(), count: popouts.length, popouts };
}
