// problem：https://leetcode-cn.com/problems/search-in-a-binary-search-tree/

/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @param {number} val
 * @return {TreeNode}
 */
var searchBST = function (root, val) {
  if (!root) return null
  if (root.val === val) return root
  if (root.val > val) {
    return searchBST(root.left, val)
  } else {
    return searchBST(root.right, val)
  }
}
