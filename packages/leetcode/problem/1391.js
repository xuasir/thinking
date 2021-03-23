// problem: https://leetcode-cn.com/problems/check-if-there-is-a-valid-path-in-a-grid/

var hasValidPath = function (grid) {
  if (grid.length < 1) return false
  let flag = false
  let row = grid.length - 1
  let col = grid[0].length - 1

  const handleMap = {
    1(r, c) {
      let nextEnqueue = []
      if (r - 1 >= 0) {
        let val = grid[r - 1][c]
        if ([4, 6, 1].includes(val)) {
          nextEnqueue.push({ row: r - 1, col: c, val })
        }
      }
      if (r + 1 <= row) {
        let val = grid[r + 1][c]
        if ([3, 5, 1].includes(val)) {
          nextEnqueue.push({ row: r + 1, col: c, val })
        }
      }

      return nextEnqueue
    }
  }

  let q = []
  q.push({ row: 0, col: 0, val: grid[0][0] })
  while (q.length > 0) {
    let cell = q.shift()
    let nextEnqueue = handleMap[cell.val](cell.row, cell.col)
    if (nextEnqueue.length > 0) {
      q.concat(nextEnqueue)
    } else {
      if (cell.row == row && cell.col == col) {
        flag = true
        break
      }
    }
  }

  return flag
}

let grid = [[1, 1]]

let res = hasValidPath(grid)

console.log(res)
