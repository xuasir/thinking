//  problem： https://leetcode-cn.com/problems/binary-tree-level-order-traversal/

/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number[][]}
 */
var levelOrder = function (root) {
  let res = []

  function traver(node, deep) {
    if (!node) return

    let target = res[deep] || (res[deep] = [])
    target.push(node.val)
    traver(node.left, deep + 1)
    traver(node.right, deep + 1)
  }
  traver(root, 0)
  return res
}
