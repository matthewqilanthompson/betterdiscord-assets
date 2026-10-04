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

  // The real history gate, now that messageTimestamp is a message's own snowflake time
  // rather than a copy of the page-load clock: anything created before the plugin
  // started is history, however it arrived in the DOM -- backlog page, virtualisation
  // re-mount or reconnect. Written as a positive test so a null or NaN timestamp (an id
  // we could not read) fails closed instead of comparing as 0.
  if (!(ctx.messageTimestamp >= ctx.pageLoadTimestamp)) return false;

  return true;
}

module.exports = { shouldType, DEFAULTS };
