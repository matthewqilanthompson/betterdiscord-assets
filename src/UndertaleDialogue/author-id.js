/**
 * Pull a user id out of an avatar URL.
 *
 * This is the DOM-only route to "who said this". The author is not in any class,
 * attribute or id on the message row -- the li id carries the channel and the message
 * snowflake only -- but the avatar src embeds the user id, so it is the one place the
 * speaker's identity is readable without touching Discord's Webpack internals.
 *
 * Returns null for the DEFAULT avatars (`/embed/avatars/N.png`), which carry no user id.
 * That is a real "unknown", and grouping must never merge an unknown with anything.
 */
function authorIdFromAvatarSrc(src) {
  if (typeof src !== "string" || src === "") return null;

  // /avatars/<userId>/<hash>  and  /guilds/<gid>/users/<userId>/avatars/<hash>
  const m = src.match(/\/guilds\/\d+\/users\/(\d+)\/avatars\//) || src.match(/\/avatars\/(\d+)\//);
  return m ? m[1] : null;
}

module.exports = { authorIdFromAvatarSrc };
