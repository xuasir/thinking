// problem: https://leetcode-cn.com/problems/binary-tree-zigzag-level-order-traversal/

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
var zigzagLevelOrder = function (root) {
  if (!root) return []
  let stack1 = [root],
    stack2 = [],
    res = []

  while (stack1.length || stack2.length) {
    if (stack1.length) {
      let level = []
      while (stack1.length) {
        let node = stack1.pop()
        if (!node) continue
        level.push(node.val)
        stack2.push(node.left)
        stack2.push(node.right)
      }
      level.length && res.push(level)
    }

    if (stack2.length) {
      let level = []
      while (stack2.length) {
        let node = stack2.pop()
        if (!node) continue
        level.push(node.val)
        stack1.push(node.right)
        stack1.push(node.left)
      }
      level.length && res.push(level)
    }
  }

  return res
}
