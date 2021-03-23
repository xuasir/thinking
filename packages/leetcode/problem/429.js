// problem:  https://leetcode-cn.com/problems/n-ary-tree-level-order-traversal/

/**
 * // Definition for a Node.
 * function Node(val,children) {
 *    this.val = val;
 *    this.children = children;
 * };
 */

/**
 * @param {Node} root
 * @return {number[][]}
 */
var levelOrder = function (root) {
  let res = []

  function traver(node, deep) {
    if (!node) return
    let target = res[deep] || (res[deep] = [])
    target.push(node.val)
    node.children.forEach((child) => traver(child, deep + 1))
  }

  traver(root, 0)

  return res
}
