// problem: https://leetcode-cn.com/problems/permutations/

/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var permute = function (nums) {
  const len = nums.length
  if (len < 1) return [[]]

  const used = Array.from({ length: len }).fill(false)
  const res = []
  function put(cur) {
    if (cur.length === len) {
      res.push(cur.slice())
      return
    }

    for (let i = 0; i < len; i++) {
      if (used[i]) continue
      cur.push(nums[i])
      used[i] = true
      put(cur)
      cur.pop()
      used[i] = false
    }
  }

  put([])
  return res
}
