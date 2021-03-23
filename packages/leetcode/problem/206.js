// problem: https://leetcode-cn.com/problems/reverse-linked-list/

/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var reverseList = function (head) {
  let tail = null
  let nex = head
  while (nex !== null) {
    let n = nex.next
    nex.next = tail
    tail = nex
    nex = n
  }

  return tail
}
