// problem：https://leetcode-cn.com/problems/n-ary-tree-preorder-traversal/

var preorder = function (root) {
  let res = []

  function traver(node) {
    if (!node) return

    res.push(node.val)
    node.children.forEach(traver)
  }
  traver(root)
  return res
}
