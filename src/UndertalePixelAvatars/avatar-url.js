/**
 * Rewrite a Discord avatar URL to ask the CDN for a genuinely small asset.
 *
 * `image-rendering: pixelated` only takes effect when an image is scaled UP. Discord
 * downscales (a 128px asset into a 40px box), so CSS alone cannot pixelate an avatar --
 * the src has to change, which is why this is a plugin and not a theme rule.
 *
 * Measured against the real CDN during the 2026-09-17 theme pass:
 *   ?size=16  ->    791 bytes
 *   ?size=32  ->  2,606 bytes
 *   ?size=128 -> 33,715 bytes
 * So the small asset genuinely exists. This is real pixel art, not a filter imitating it.
 */

/** CDN hosts that serve avatars. Anything else is somebody else's image -- leave it. */
const AVATAR_HOSTS = new Set(["cdn.discordapp.com", "media.discordapp.net"]);

/**
 * Paths that ARE avatars. Deliberately a whitelist, not a blacklist: emoji, attachments,
 * banners, role icons and stickers live on the same host and must keep their full
 * resolution. A blacklist would pixelate every new image route Discord ever adds.
 */
const AVATAR_PATHS = [
  /^\/avatars\/\d+\//,                       // user avatar
  /^\/guilds\/\d+\/users\/\d+\/avatars\//,   // per-server avatar
  /^\/embed\/avatars\/\d+/,                  // default avatar (no custom image set)
];

/**
 * @param {string} src - the current image src
 * @param {number} size - CDN size to request; must be a power of two the CDN supports
 * @returns {string|null} the rewritten URL, or null when this src must not be touched
 *                        (foreign host, not an avatar, malformed, or already correct)
 */
function pixelAvatarUrl(src, size = 32) {
  if (typeof src !== "string" || src === "") return null;

  let url;
  try {
    url = new URL(src);
  } catch {
    return null; // relative, data:, blob: or junk -- not ours to rewrite
  }

  if (!AVATAR_HOSTS.has(url.hostname)) return null;
  if (!AVATAR_PATHS.some((re) => re.test(url.pathname))) return null;

  // Returning null when it already matches keeps this idempotent, which matters:
  // the observer re-runs on every mutation and a rewrite that is not a no-op would
  // set src on every pass and retrigger the observer forever.
  if (url.searchParams.get("size") === String(size)) return null;

  url.searchParams.set("size", String(size));
  return url.toString();
}

module.exports = { pixelAvatarUrl, AVATAR_HOSTS, AVATAR_PATHS };
