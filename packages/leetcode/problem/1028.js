// problem: https://leetcode-cn.com/problems/recover-a-tree-from-preorder-traversal/

var TreeNode = function (val) {
  this.val = val
  this.left = this.right = null
}

var recoverFromPreorder = function (S) {
  if (!S) return new TreeNode(null)

  const reg = /((\d+)|(-+))/g
  let match = reg.exec(S)
  // 构造根节点
  let root = new TreeNode(match[2])
  let deep = 0
  // 循环匹配数字或者-
  while ((match = reg.exec(S))) {
    let str = match[0]
    if (match[2]) {
      // 数字- 创建节点
      let node = new TreeNode(str)
      let findNode = root
      // 查询目标节点的父节点
      for (let i = 0; i < deep - 1; i++) {
        if (findNode.right) findNode = findNode.right
        else findNode = findNode.left
      }
      // 插入当前节点
      findNode.left ? (findNode.right = node) : (findNode.left = node)
    } else if (match[3]) {
      // 记录深度信息
      deep = str.length
    }
  }

  return root
}

let str = '1-2--3--4-5--6--7'

let tree = recoverFromPreorder(str)

console.log(tree)
