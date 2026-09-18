/**
 * Group consecutive messages by AUTHOR, ignoring the time gap.
 *
 * Why this cannot be CSS: the theme builds its dialogue box from Discord's own grouping
 * (`groupStart_` opens it, `:has(+ li ... groupStart_)` closes it). That is Discord's
 * definition, not ours -- Discord ends a group after roughly SEVEN MINUTES even when the
 * author has not changed. Merging those runs means knowing two rows share an author, and
 * the author is not in any class, attribute or id on the row. There is nothing to select
 * on, so a plugin has to stamp it.
 */

/**
 * @param {Array<{id: string, authorId: string|null}>} rows - message rows in display order
 * @returns {Array<{id: string, start: boolean, end: boolean}>}
 */
function computeGroups(rows) {
  return rows.map((row, i) => {
    const prev = rows[i - 1];
    const next = rows[i + 1];

    // A null author never merges. If we cannot identify the speaker we must not claim
    // two rows are the same one -- a wrong merge draws one box around two people.
    const sameAs = (other) =>
      !!other && other.authorId != null && row.authorId != null && other.authorId === row.authorId;

    return { id: row.id, start: !sameAs(prev), end: !sameAs(next) };
  });
}

module.exports = { computeGroups };

/**
 * Which rows should MERGE INTO THE ROW ABOVE them.
 *
 * This is the only thing the plugin acts on, and the shape matters: merging is purely
 * SUBTRACTIVE -- it removes the edges between two rows the theme already drew. It never
 * asks for an edge to be added.
 *
 * That makes the whole feature fail safe. If the author cannot be read (Discord changes a
 * class, a default avatar carries no id, the row is a system message), nothing merges and
 * the theme's own boxes are left exactly as they were. The first version stamped
 * start/end on every row and told the CSS to draw the closing edge itself, so a failed
 * author lookup silently re-cut every box in the channel -- including old conversations
 * that were rendering correctly before the plugin loaded.
 *
 * @param {Array<{id: string, authorId: string|null}>} rows
 * @returns {boolean[]} true where the row continues the speaker above it
 */
function mergesUp(rows) {
  return computeGroups(rows).map((g) => !g.start);
}

module.exports.mergesUp = mergesUp;
