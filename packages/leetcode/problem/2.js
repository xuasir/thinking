// problem: https://leetcode-cn.com/problems/add-two-numbers/

/**
 * Definition for singly-linked list.
 */
function ListNode(val) {
  this.val = val
  this.next = null
}

/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
// 反序
export var addTwoNumbers = function (l1, l2) {
  let hair = new ListNode(null)
  let n = hair
  let l = l1,
    r = l2
  let base = 0
  while (r !== null || l !== null) {
    let x = (l && l.val) || 0
    let y = (r && r.val) || 0
    let sum = base + x + y
    base = (sum / 10) | 0
    n.next = new ListNode(sum % 10)
    n = n.next
    l = (l && l.next) || null
    r = (r && r.next) || null
  }
  if (base) {
    n.next = new ListNode(base)
  }

  return hair.next
}

// 正序
var addTwoNumbers2 = function (l1, l2) {
  let stack1 = [],
    stack2 = []
  let l = l1,
    r = l2
  while (l) {
    stack1.push(l.val)
    l = l.next
  }
  while (r) {
    stack2.push(r.val)
    r = r.next
  }

  let base = 0
  let resStack = []
  while (stack1.length || stack2.length) {
    let x = stack1.pop() || 0
    let y = stack2.pop() || 0
    let sum = base + x + y
    base = (sum / 10) | 0
    resStack.push(sum % 10)
  }
  if (base) {
    resStack.push(base)
  }

  let hair = new ListNode(null)
  let n = hair
  while (resStack.length) {
    n.next = new ListNode(resStack.pop())
    n = n.next
  }

  return hair.next
}
