// promble: https://leetcode-cn.com/problems/cong-shang-dao-xia-da-yin-er-cha-shu-ii-lcof/

var levelOrder = function (root) {
  if (!root) return []
  let res = [[root]]
  let i = 0
  while (res[i] && res[i].length > 0) {
    let curFloor = res[i]
    let curVal = []
    let nextFloor = []
    curFloor.forEach((node) => {
      if (node) {
        curVal.push(node.val)
        node.left && nextFloor.push(node.left)
        node.right && nextFloor.push(node.right)
      }
    })
    curVal.length > 0 ? (res[i] = curVal) : ''
    i++
    nextFloor.length > 0 ? (res[i] = nextFloor) : ''
  }
  return res
}
