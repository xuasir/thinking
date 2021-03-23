// problem: https://leetcode-cn.com/problems/house-robber/
/**
 * @param {number[]} nums
 * @return {number}
 */
var rob = function (nums) {
  const len = nums.length
  if (len === 0) return 0
  if (len === 1) return nums[0]

  const memo = Array.from({ length: len }).fill(-1)
  memo[len - 1] = nums[len - 1]

  for (let i = len - 2; i >= 0; i--) {
    for (let j = i; j < len; j++) {
      memo[i] = Math.max(memo[i], nums[j] + (j + 2 < len ? memo[j + 2] : 0))
    }
  }

  return memo[0]
}

console.log(rob([1, 2, 3, 1]))
