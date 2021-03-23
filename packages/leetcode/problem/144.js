// problem：https://leetcode-cn.com/problems/binary-tree-preorder-traversal/

var preorderTraversal = function (root) {
  const res = []

  function traver(node) {
    if (!node) return

    res.push(node.val)
    traver(node.left)
    traver(node.right)
  }

  traver(root)

  return res
}
