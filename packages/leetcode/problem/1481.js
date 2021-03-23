// problem: https://leetcode-cn.com/problems/least-number-of-unique-integers-after-k-removals/

/**
 * @param {number[]} arr
 * @param {number} k
 * @return {number}
 */
var findLeastNumOfUniqueInts = function (arr, k) {
  const len = arr.length
  if (len < 0) return 0
  let count = new Map()
  for (let i = 0; i < len; i++) {
    let c = count.get(arr[i])
    count.set(arr[i], c ? ++c : 1)
  }
  sum = Array.from(count.values()).sort((a, b) => a - b)
  let index = 0
  while (k > 0) {
    if (sum[index] > k) {
      break
    } else if (sum[index] === k) {
      index++
      break
    } else {
      k -= sum[index++]
    }
  }

  return sum.length - index
}

console.log(findLeastNumOfUniqueInts())
