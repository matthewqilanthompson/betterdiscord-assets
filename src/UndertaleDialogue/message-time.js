/**
 * Pull a message's creation time out of its snowflake.
 *
 * The 500ms mount grace in typing-policy.js was the ONLY thing separating "a new node
 * appeared" from "a new message arrived", and it cannot do that job alone: Discord
 * appends backlog pages to the same <ol> on infinite scroll, and re-mounts rows that
 * scrolled out of view, both long after the mount clock has expired. Every one of those
 * nodes looked live, so the whole visible history typed itself out at once -- which is
 * the lag.
 *
 * The snowflake is the one per-message "when" readable from the DOM without touching
 * Webpack internals, and it is exact: Discord packs the creation time into the high bits.
 *
 * Returns null -- never a number -- for anything unreadable, so the caller can fail
 * closed. A wrong number would classify history as live, which is the bug.
 */
const DISCORD_EPOCH = 1420070400000;

function messageTimeFromId(id) {
  if (typeof id !== "string") return null;

  // Accepts the raw snowflake and the two element ids Discord writes it into:
  // `message-content-<snowflake>` and `chat-messages-<channel>-<snowflake>`. The
  // snowflake is always the trailing run of digits.
  const m = id.match(/(\d+)$/);
  if (!m) return null;

  // > 2^53, so BigInt is required -- Number would round the low bits away.
  return Number((BigInt(m[1]) >> 22n) + BigInt(DISCORD_EPOCH));
}

module.exports = { messageTimeFromId, DISCORD_EPOCH };
