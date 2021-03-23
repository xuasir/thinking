// problem： https://leetcode-cn.com/problems/binary-tree-postorder-traversal/

var postorderTraversal = function (root) {
  const res = []

  function traver(node) {
    if (!node) return

    traver(node.left)
    traver(node.right)
    res.push(node.val)
  }

  traver(root)

  return res
}
