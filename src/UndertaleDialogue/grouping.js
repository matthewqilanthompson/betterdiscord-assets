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
