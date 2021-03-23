// problem: https://leetcode-cn.com/problems/generate-parentheses/

/**
 * @param {number} n
 * @return {string[]}
 */
var generateParenthesis = function (n) {
  let res = []
  if (n <= 0) return res

  function generateStr(str, l, r) {
    if (l === 0 && r === 0) {
      return res.push(str)
    }

    if (l === r) {
      generateStr(str + '(', l - 1, r)
    } else {
      if (l > 0) generateStr(str + '(', l - 1, r)

      generateStr(str + ')', l, r - 1)
    }
  }
  generateStr('', n, n)
  return res
}
