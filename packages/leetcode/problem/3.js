// problem: https://leetcode-cn.com/problems/longest-substring-without-repeating-characters/

/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLongestSubstring = function (s) {
  let res = '',
    cur = ''
  let l = 0,
    r = -1,
    len = s.length
  while (l < len) {
    if (r + 1 < len) {
      // console.log(
      //   `cur: ${cur} includes s: ${s[r + 1]} is ${cur.includes(s[r + 1])}`
      // );
      if (!cur.includes(s[r + 1])) {
        cur += s[++r]
      } else {
        res = res.length > cur.length ? res : cur
        cur += s[++r]
        // 移动左标定点 直到去除重复
        // let offset = l;
        while (s[l] !== s[r] && l <= r) {
          l++
          cur = cur.slice(1)
          // console.log(`after delete ${l - offset} cur is ${cur}`);
        }
        l++
        cur = cur.slice(1)
        // console.log(`move l from ${offset} to ${l} ${cur} \n`);
      }
    } else {
      res = res.length > cur.length ? res : cur
      break
    }
  }
  // console.log(res);
  return res.length
}

console.log(lengthOfLongestSubstring('uiggtyqjt'))
