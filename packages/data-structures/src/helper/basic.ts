export class TreeNode<T> {
  e: T
  left: null | TreeNode<T>
  right: null | TreeNode<T>
  count = 1
  constructor(
    value: T,
    left: null | TreeNode<T> = null,
    right: null | TreeNode<T> = null
  ) {
    this.e = value
    this.left = left
    this.right = right
  }
}

export class LinkNode<T> {
  e: T
  next: null | LinkNode<T>
  constructor(value: T, next: null | LinkNode<T> = null) {
    this.e = value
    this.next = next
  }
}

export class TrieNode {
  isWord: boolean
  next: Map<string, TrieNode>
  constructor(isWord = false) {
    this.isWord = isWord
    this.next = new Map()
  }
}
