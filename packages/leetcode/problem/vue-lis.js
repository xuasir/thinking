function getSequence(arr) {
  // p[i]存储的是 第 i 个元素出在某个符合贪心思想的最长子序列中的前一个元素的索引
  const p = arr.slice()
  // result[i] 存储的是 长度为i 的上升子序列最后一个元素的索引 result[i]--> arr[result[i]]
  const result = [0]
  let i, j, u, v, c
  const len = arr.length
  for (i = 0; i < len; i++) {
    // 循环目的： 当前第i个元素大于子序列末尾值 直接添加并记录result和p的信息
    // 第 i 个元素不大于 当前子序列末尾值时， 通过二分搜索查找到 当前子序列中第一个大于当前 i 元素的值，替换并更新result和p的信息
    // 拿到第i个元素的值
    const arrI = arr[i]
    if (arrI !== 0) {
      // 取出当前上升子序列最后一个元素的对应下标 j
      j = result[result.length - 1]
      // 如果当前元素比最后一个元素大 直接push 到 result
      if (arr[j] < arrI) {
        // 更新当前第 i 个元素在 子序列中上一个元素的索引
        p[i] = j
        // 添加到子序列中 子序列长度增加 1
        result.push(i)
        continue
      }
      // 否则需要在当前子序列中向前查找合适的位置
      u = 0
      v = result.length - 1
      while (u < v) {
        c = ((u + v) / 2) | 0
        if (arr[result[c]] < arrI) {
          u = c + 1
        } else {
          v = c
        }
      }
      //   二分查找 得到 u 现有子序列中 第一个 大于 当前元素的 下标
      // 确定当前第 i 个元素 小于 查找到的元素
      if (arrI < arr[result[u]]) {
        // 更新 p 和 result
        if (u > 0) {
          // p[i] = result[u - 1];
          p[i] = p[result[u]]
        }
        result[u] = i
      }
    }
  }
  // 由于result中存在二分查找后覆盖的情况，无法保证所有的下标是属于最长上升子序列的
  // 需要从result中最后一个元素开始 通过p 反向递推出正确的 子序列下标组合
  u = result.length
  v = result[u - 1]
  while (u-- > 0) {
    result[u] = v
    v = p[v]
  }
  return result
}

let res = getSequence([2, 1, 5, 6, 4, 7])
console.log(res)
