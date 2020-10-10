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
