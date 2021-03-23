// problem: https://leetcode-cn.com/problems/eight-queens-lcci/

/**
 * @param {number} n
 * @return {string[][]}
 */
var solveNQueens = function (n) {
  if (n < 1) return [[]]

  const res = []
  const usedCol = Array.from({ length: n }).fill(false)
  const diag1 = [],
    diag2 = []

  function find(nq, i) {
    if (i < 1) {
      res.push(nq.slice())
      return
    }

    for (let col = 0; col < n; col++) {
      if (
        !usedCol[col] &&
        !diag1.includes(n - i - col) &&
        !diag2.includes(n - i + col)
      ) {
        nq.push(genRow(col))
        usedCol[col] = true
        diag1.push(n - i - col)
        diag2.push(n - i + col)
        find(nq, i - 1)
        nq.pop()
        usedCol[col] = false
        diag1.pop()
        diag2.pop()
      }
    }

    return
  }

  function genRow(index) {
    const row = Array.from({ length: n }).fill('.')
    row[index] = 'Q'
    return row.join('')
  }

  find([], n)

  return res
}

const res = solveNQueens(4)

console.log(res)
