// problem: https://leetcode-cn.com/problems/reverse-linked-list-ii/

/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} m
 * @param {number} n
 * @return {ListNode}
 */
var reverseBetween = function (head, m, n) {
  let offset = n - m
  let hair = new ListNode(null)
  hair.next = head
  let start = hair
  // 查找出 目标开始节点的上一个节点
  while (m > 1) {
    m--
    start = start.next
  }
  // 查找 目标结束节点的下一个节点
  let tail = start.next
  while (offset > -1) {
    offset--
    tail = tail.next
  }

  // 倒序
  let moveTail = tail
  let nex = start.next
  while (nex !== tail) {
    let n = nex.next
    nex.next = moveTail
    moveTail = nex
    nex = n
  }
  // 拼接原头部
  start.next = moveTail

  return hair.next
}
