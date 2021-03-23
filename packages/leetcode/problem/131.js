// problem：https://leetcode-cn.com/problems/palindrome-partitioning/

/**
 * @param {string} s
 * @return {string[][]}
 */
var partition = function (s) {
  const len = s.length
  if (len < 1) return [[]]
  if (len === 1) return [[s]]
  const res = []
  function find(cur, start) {
    if (start === len) {
      res.push(cur.slice())
      return
    }

    for (let i = start; i < len; i++) {
      if (isPalindrome(s, start, i)) {
        cur.push(s.slice(start, i + 1))
        find(cur, i + 1)
        cur.pop()
      }
    }
  }

  find([], 0)

  return res
}

function isPalindrome(str, l, r) {
  let flag = true
  while (l < r) {
    if (str[l] === str[r]) {
      l++
      r--
    } else {
      flag = false
      break
    }
  }

  return flag
}

const res = partition('aab')

console.log(res)
