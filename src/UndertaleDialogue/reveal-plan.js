/**
 * Spread a reveal of `k` characters across a message's text nodes, in order.
 *
 * This is what lets the typewriter preserve the message TREE. Discord message content is
 * not a string: mentions are pills, custom emoji are <img>, plus code blocks, links and
 * spoilers. The obvious implementation -- read textContent, blank it, write it back on a
 * timer -- flattens all of that, turning a boxed @mention into plain text and DELETING
 * emoji images outright. So the typewriter walks text nodes and reveals characters across
 * the tree with every element left in place, and this function is the arithmetic.
 */

/**
 * @param {number[]} lengths - character count of each text node, in document order
 * @param {number} k - how many characters should be visible in total
 * @returns {number[]} how many characters of each node to show; sums to min(k, total)
 */
function sliceCounts(lengths, k) {
  let left = Math.max(0, k);
  return lengths.map((len) => {
    const take = Math.min(len, left);
    left -= take;
    return take;
  });
}

module.exports = { sliceCounts };
