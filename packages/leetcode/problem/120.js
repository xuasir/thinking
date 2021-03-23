// problem: https://leetcode-cn.com/problems/triangle/

/**
 * @param {number[][]} triangle
 * @return {number}
 */
var minimumTotal = function (triangle) {
  const floor = triangle.length
  let memo = Array.from({ length: floor }).map(() => [])
  memo[0][0] = triangle[0][0]

  for (let f = 1; f < floor; f++) {
    const len = triangle[f].length
    for (let i = 0; i < len; i++) {
      memo[f][i] = min3(
        memo[f][i] || Infinity,
        i < len - 1 ? triangle[f][i] + memo[f - 1][i] : Infinity,
        i - 1 > -1 ? triangle[f][i] + memo[f - 1][i - 1] : Infinity
      )
    }
  }
  return memo[floor - 1].sort((a, b) => a - b)[0]
}

function min3(a, b, c) {
  return Math.min(a, Math.min(b, c))
}

const res = minimumTotal([[2], [3, 4], [6, 5, 7], [4, 1, 8, 3]])

console.log(res)
