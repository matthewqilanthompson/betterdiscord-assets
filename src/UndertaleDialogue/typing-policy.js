/**
 * Decides whether one message types itself out.
 *
 * DECIDED 2026-09-17 by the user: only messages that arrive WHILE WATCHING. Not on
 * channel switch, not on scrollback, not on reconnect. Every rule below exists to
 * enforce that, and each one is a case where typing would obstruct rather than delight.
 */

const DEFAULTS = {
  /** Discord renders channel-switch backlog as node ADDITIONS, so "new node" is not the
   *  same as "new message". This window is the only thing separating them. */
  mountGraceMs: 500,
  /** Undertale's own dialogue boxes are short. A pasted wall of text at 28ms/char would
   *  hold the reader hostage for half a minute. */
  maxLength: 280,
};

/**
 * @param {object} ctx
 * @param {boolean} ctx.isOwnMessage
 * @param {number}  ctx.textLength         - visible characters in the message
 * @param {boolean} ctx.reducedMotion      - prefers-reduced-motion
 * @param {boolean} ctx.documentHidden     - document.hidden
 * @param {number}  ctx.msSinceMount       - ms since the observer attached to this channel
 * @param {number}  ctx.messageTimestamp   - epoch ms of the message
 * @param {number}  ctx.pageLoadTimestamp  - epoch ms the plugin started
 * @param {object} opts - DEFAULTS, or a copy with the caps overridden
 * @returns {boolean}
 */
function shouldType(ctx, opts = DEFAULTS) {
  if (ctx.reducedMotion) return false;

  // Typing out what arrived while you were in another app is the exact failure mode
  // the "only while watching" decision exists to avoid.
  if (ctx.documentHidden) return false;

  if (ctx.isOwnMessage) return false;

  if (!(ctx.textLength > 0)) return false;          // embed-only / attachment-only
  if (ctx.textLength > opts.maxLength) return false;

  if (ctx.msSinceMount <= opts.mountGraceMs) return false;

  // Belt and braces with the grace window: a message that predates the plugin starting
  // is history, however it arrived in the DOM.
  if (ctx.messageTimestamp < ctx.pageLoadTimestamp) return false;

  return true;
}

module.exports = { shouldType, DEFAULTS };
