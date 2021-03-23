// problem: https://leetcode-cn.com/problems/n-ary-tree-postorder-traversal/

/**
 * // Definition for a Node.
 * function Node(val,children) {
 *    this.val = val;
 *    this.children = children;
 * };
 */

/**
 * @param {Node} root
 * @return {number[]}
 */
var postorder = function (root) {
  let res = []

  function traver(node) {
    if (!node) return

    node.children.forEach(traver)
    res.push(node.val)
  }
  traver(root)
  return res
}
