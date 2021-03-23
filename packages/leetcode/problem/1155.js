// problem: https://leetcode-cn.com/problems/number-of-dice-rolls-with-target-sum/
// failed
var numRollsToTarget = function (d, f, target) {
  let count = 0

  function rollToTarget(d, target) {
    if (d < 1) return
    let maxNum = target <= f ? target : f
    for (let i = 1; i <= maxNum; i++) {
      let reslut = target - i
      if (reslut === 0) {
        count++
      } else {
        rollToTarget(d - 1, reslut)
      }
    }
  }

  rollToTarget(d, target)

  return count
}

let res = numRollsToTarget(30, 30, 500)

console.log(res)
