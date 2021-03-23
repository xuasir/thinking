// problem: https://leetcode-cn.com/problems/integer-break/

/**
 * @param {number} n
 * @return {number}
 */
var integerBreak = function (n) {
  if (n < 1) return 1

  const memo = Array.from({ length: n + 1 }).fill(-1)
  memo[1] = 1
  for (let i = 2; i <= n; i++)
    for (let j = 1; j <= i - 1; j++)
      memo[i] = max3(memo[i] || -1, j * (i - j), j * memo[i - j])

  return memo[n]
}

function max3(a, b, c) {
  return Math.max(a, Math.max(b, c))
}

console.log(integerBreak(10))
