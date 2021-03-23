// problem: https://leetcode-cn.com/problems/remove-element/

var removeElement = function (nums, val) {
  const len = nums.length
  let k = 0,
    i = 0
  // [0...k) 为目标
  while (i < len) {
    if (nums[k] === val) {
      if (nums[i] !== val) {
        // 交换
        ;[nums[k], nums[i]] = [nums[i], nums[k]]
      } else {
        i++
        continue
      }
    }
    k++
    i++
  }

  return k
}

const source = [3, 2, 2, 3]

console.log(removeElement(source, 3), source)
