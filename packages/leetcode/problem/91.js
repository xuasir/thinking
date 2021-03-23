// problem: https://leetcode-cn.com/problems/decode-ways/

/**
 * @param {string} s
 * @return {number}
 */
var numDecodings = function (s) {
  const len = s.length
  if (s === '0') return 0
  if (len === 1) return 1

  const memo = Array.from({ length: len + 1 })
  memo[len] = 1
  memo[len - 1] = s[len - 1] === '0' ? 0 : 1

  for (let i = len - 2; i >= 0; i--) {
    if (s[i] === '0') {
      memo[i] = 0
      continue
    }
    if (s[i] + s[i + 1] - 0 <= 26) {
      memo[i] = memo[i + 1] + memo[i + 2]
    } else {
      memo[i] = memo[i + 1]
    }
  }

  return memo[0]
}
