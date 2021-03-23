// 动态规划
// var lengthOfLIS = function(nums) {
//   let len = nums.length
//   if(len === 0) return 0

//   let memo = Array.from({ length: len }).fill(1)

//   for(let i = 1; i < len; i ++) {
//     // 向前找 比 nums[i] 小的 元素的 递增子序列
//     for(let j = i - 1; j >= 0; j --) {
//       if(nums[i] > nums[j]) {
//         // 状态转移
//         memo[i] = Math.max(memo[i], memo[j] + 1)
//       }
//     }
//   }

//   memo.sort((a, b) => b - a)

//   return memo[0]
// };
// 贪心 + 二分
var lengthOfLIS = function (nums) {
  let len = nums.length
  if (len < 2) return len
  // l描述的是 长度为i + 1的递增子序列 最后一个元素的大小l[i]
  let l = [nums[0]]
  for (let i = 1; i < len; i++) {
    if (nums[i] > l[l.length - 1]) {
      l.push(nums[i])
    } else {
      // 二分查找找到最接近nums[i]但是比他大的位置修改 我们总是希望 递增子序列构成值更加小
      // 当前情况只可能 缩短最长上升子序列 或者追上现有长度
      let left = 0,
        right = l.length - 1
      // 在[l,...,r]中查找
      while (left < right) {
        let center = ((left + right) / 2) | 0
        l[center] < nums[i] ? (left = center + 1) : (right = center)
      }
      l[left] = nums[i]
    }
  }
  return l.length
}

const len = lengthOfLIS([10, 9, 2, 5, 3, 7, 101, 18])

console.log(len)
