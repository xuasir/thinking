// problem：https://leetcode-cn.com/problems/binary-tree-inorder-traversal/

var inorderTraversal = function (root) {
  const res = []

  function traver(node) {
    if (!node) return

    traver(node.left)
    res.push(node.val)
    traver(node.right)
  }

  traver(root)

  return res
}
