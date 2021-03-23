// problem: https://leetcode-cn.com/problems/reverse-nodes-in-k-group/

/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} k
 * @return {ListNode}
 */
var reverseKGroup = function (head, k) {
  function reverse(node, k) {
    // 检测是否足够个数
    let next = node.next
    let num = 0
    while (next && num < k) {
      num++
      next = next.next
    }
    if (num < k) return

    // 倒转
    let tail = next
    let nex = node.next
    let call = nex
    // 一次按顺序 反转链表
    while (nex !== next) {
      let n = nex.next
      nex.next = tail
      tail = nex
      nex = n
    }
    // 连接上头部
    node.next = tail

    reverse(call, k)
  }

  let hair = new ListNode(null)
  hair.next = head
  reverse(hair, k)

  return hair.next
}
