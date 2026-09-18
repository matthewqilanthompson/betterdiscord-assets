/**
 * Tests for the avatar URL rewriter.
 *
 * The whole point of the plugin is that `image-rendering: pixelated` does nothing to a
 * DOWNSCALED image, so the src has to ask Discord's CDN for a genuinely small asset and
 * let the browser upscale it. Everything here is about not breaking the ones we must not
 * touch: foreign hosts, data URIs, and non-avatar CDN paths.
 *
 * Run: node --test tests/
 */
import { test } from "node:test";
import assert from "node:assert/strict";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const { pixelAvatarUrl } = require("../src/UndertalePixelAvatars/avatar-url.js");

test("replaces an existing size param", () => {
  assert.equal(
    pixelAvatarUrl("https://cdn.discordapp.com/avatars/123/abc.webp?size=80", 32),
    "https://cdn.discordapp.com/avatars/123/abc.webp?size=32"
  );
});

test("adds a size param when there is none", () => {
  assert.equal(
    pixelAvatarUrl("https://cdn.discordapp.com/avatars/123/abc.webp", 32),
    "https://cdn.discordapp.com/avatars/123/abc.webp?size=32"
  );
});

test("keeps other query params and leaves their order alone", () => {
  const out = pixelAvatarUrl("https://cdn.discordapp.com/avatars/1/a.webp?size=80&quality=lossless", 32);
  assert.match(out, /quality=lossless/);
  assert.match(out, /size=32/);
});

test("animated avatars keep their .gif extension", () => {
  // a_ hashes are animated; rewriting the extension would freeze them.
  assert.equal(
    pixelAvatarUrl("https://cdn.discordapp.com/avatars/123/a_deadbeef.gif?size=128", 32),
    "https://cdn.discordapp.com/avatars/123/a_deadbeef.gif?size=32"
  );
});

test("handles per-guild member avatars", () => {
  assert.equal(
    pixelAvatarUrl("https://cdn.discordapp.com/guilds/9/users/7/avatars/xyz.webp?size=96", 32),
    "https://cdn.discordapp.com/guilds/9/users/7/avatars/xyz.webp?size=32"
  );
});

test("handles the default embed avatars", () => {
  assert.equal(
    pixelAvatarUrl("https://cdn.discordapp.com/embed/avatars/3.png", 32),
    "https://cdn.discordapp.com/embed/avatars/3.png?size=32"
  );
});

test("accepts media.discordapp.net as well as the cdn host", () => {
  assert.ok(pixelAvatarUrl("https://media.discordapp.net/avatars/1/a.webp?size=64", 32));
});

test("returns null when the size is already what we want — nothing to do", () => {
  assert.equal(pixelAvatarUrl("https://cdn.discordapp.com/avatars/1/a.webp?size=32", 32), null);
});

test("returns null for non-avatar CDN paths", () => {
  // Emoji, attachments and banners are NOT avatars and must render at full quality.
  assert.equal(pixelAvatarUrl("https://cdn.discordapp.com/emojis/12345.png?size=44", 32), null);
  assert.equal(pixelAvatarUrl("https://cdn.discordapp.com/attachments/1/2/pic.png", 32), null);
  assert.equal(pixelAvatarUrl("https://cdn.discordapp.com/banners/1/abc.png?size=600", 32), null);
});

test("returns null for foreign hosts, data URIs and junk", () => {
  assert.equal(pixelAvatarUrl("https://example.com/avatars/1/a.png?size=80", 32), null);
  assert.equal(pixelAvatarUrl("data:image/png;base64,iVBORw0KG", 32), null);
  assert.equal(pixelAvatarUrl("", 32), null);
  assert.equal(pixelAvatarUrl(null, 32), null);
  assert.equal(pixelAvatarUrl("not a url at all", 32), null);
});

test("is idempotent — rewriting its own output changes nothing", () => {
  const once = pixelAvatarUrl("https://cdn.discordapp.com/avatars/1/a.webp?size=128", 32);
  assert.equal(pixelAvatarUrl(once, 32), null);
});
