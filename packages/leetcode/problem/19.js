/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} n
 * @return {ListNode}
 */
var removeNthFromEnd = function (head, n) {
  let vhead = new ListNode(null)
  vhead.next = head
  let offsetLen = n + 1,
    slow = (fast = vhead)
  while (offsetLen > 0) {
    fast = fast.next
    offsetLen--
  }
  while (fast != null) {
    slow = slow.next
    fast = fast.next
  }
  slow.next = slow.next.next
  return vhead.next
}
