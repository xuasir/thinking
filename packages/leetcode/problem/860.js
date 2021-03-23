// problem: https://leetcode-cn.com/problems/lemonade-change/

var lemonadeChange = function (bills) {
  let i = 0
  let five = 0,
    ten = 0
  for (i; i < bills.length; i++) {
    if (bills[i] == 5) {
      five++
    } else if (bills[i] == 10) {
      if (!five) break
      five--
      ten++
    } else {
      if (ten > 0 && five > 0) {
        ten--
        five--
        continue
      }
      if (five > 2) {
        five -= 3
        continue
      }
      break
    }
  }
  return i == bills.length ? true : false
}

console.log(lemonadeChange([5, 5, 10, 10, 5, 20, 5, 10, 5, 5]))
