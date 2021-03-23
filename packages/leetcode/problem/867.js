// problem： https://leetcode-cn.com/problems/transpose-matrix/
// 矩阵转置
var transpose = function (A) {
  const row = A.length
  const col = A[0].length
  const res = Array.from({ length: col }).map(() => Array.from({ length: row }))
  for (let r = 0; r < col; r++) {
    for (let c = 0; c < row; c++) {
      res[r][c] = A[c][r]
    }
  }
  return res
}
