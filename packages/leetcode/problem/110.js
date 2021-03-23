// problem：https://leetcode-cn.com/problems/balanced-binary-tree/

/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {boolean}
 */
var isBalanced = function (root) {
  if (!root) return true

  function height(node) {
    if (!node) return 0
    return Math.max(height(node.left), height(node.right)) + 1
  }

  return (
    Math.abs(height(root.left) - height(root.right)) < 2 &&
    isBalanced(root.left) &&
    isBalanced(root.right)
  )
}
