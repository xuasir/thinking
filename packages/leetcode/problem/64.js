/**
 * @problem https://leetcode-cn.com/problems/minimum-path-sum/
 * @param {number[][]} grid
 * @return {number}
 */
// 反向动态规划
var minPathSum = function (grid) {
  if (grid.length == 0 || grid[0].length == 0) return 0
  let rows = grid.length,
    cols = grid[0].length
  let dp = Array.from({ length: rows }).map(() =>
    Array.from({ length: cols }).fill(0)
  )
  dp[0][0] = grid[0][0]

  // 只能来自左方
  for (let i = 1; i < cols; i++) {
    dp[0][i] = dp[0][i - 1] + grid[0][i]
  }
  // 只能来自上方
  for (let j = 1; j < rows; j++) {
    dp[j][0] = dp[j - 1][0] + grid[j][0]
  }
  // 可来自上方或者左方
  for (let r = 1; r < rows; r++) {
    for (let c = 1; c < cols; c++) {
      dp[r][c] = Math.min(dp[r - 1][c], dp[r][c - 1]) + grid[r][c]
    }
  }

  return dp[rows - 1][cols - 1]
}
