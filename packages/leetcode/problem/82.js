// problem: https://leetcode-cn.com/problems/remove-duplicates-from-sorted-list-ii/

function ListNode(val) {
  this.val = val
  this.next = null
}

var deleteDuplicates = function (head) {
  let dummy = new ListNode(null)
  dummy.next = head
  let slideNode = dummy
  let nextNode = null

  while (slideNode.next && (nextNode = slideNode.next.next)) {
    let hasMove = false
    while (nextNode && slideNode.next.val == nextNode.val) {
      hasMove = true
      nextNode = nextNode.next
    }
    if (hasMove) {
      slideNode.next = nextNode
    } else {
      slideNode = slideNode.next
    }
    nextNode = null
  }

  return dummy.next
}

let head = new ListNode(1)
head.next = new ListNode(2)
head.next.next = new ListNode(2)

let res = deleteDuplicates(head)
console.log(res)
