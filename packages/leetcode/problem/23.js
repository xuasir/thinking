// problem: https://leetcode-cn.com/problems/letter-combinations-of-a-phone-number/

// 队列代替递归写法 广度优先搜索
var letterCombinations = function (digits) {
  const numToStr = [
    '',
    '',
    'abc',
    'def',
    'ghi',
    'jkl',
    'mno',
    'pqrs',
    'tuv',
    'wxyz'
  ]

  if (!digits) return []
  let res = []
  while (true) {
    let preStr = res.shift() || ''
    // 可断言字符是否合法
    let targetStr = numToStr[digits[preStr.length]]
    if (!targetStr) {
      res.unshift(preStr)
      break
    }
    for (let j = 0; j < targetStr.length; j++) {
      res.push(preStr + targetStr[j])
    }
  }

  return res
}
