// problem： https://leetcode-cn.com/problems/climbing-stairs/

/**
 * @param {number} n
 * @return {number}
 */
var climbStairs = function (n) {
  let memo = Array.from({ length: n + 1 }).fill(-1)
  memo[0] = 1
  memo[1] = 1
  memo[2] = 2

  for (let i = 3; i <= n; i++) memo[i] = memo[i - 1] + memo[i - 2]

  return memo[n]
}
