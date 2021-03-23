// problem: https://leetcode-cn.com/problems/combination-sum/

/**
 * @param {number[]} candidates
 * @param {number} target
 * @return {number[][]}
 */
var combinationSum = function (candidates, target) {
  if (target <= 0) return []
  let res = []
  candidates.sort((a, b) => a - b)

  function dfs(arr, sum, cur, begin) {
    for (let i = begin; i < arr.length; i++) {
      let n = sum + arr[i]
      if (n < target) {
        // 递归
        cur.push(arr[i])
        dfs(arr, n, cur.slice(), i)
        cur.pop()
      } else if (n === target) {
        // 终止放在此处 减少一次函数堆栈
        cur.push(arr[i])
        res.push(cur)
        // 剪枝
        break
      }
      // 剪枝
    }
  }

  dfs(candidates, 0, [], 0)
  return res
}

console.log(combinationSum([2, 3, 5], 8))
