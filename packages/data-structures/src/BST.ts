import { defaultCompareNumber } from './helper/utils'
import { Compare, CompareFn } from './helper/types'
import { TreeNode } from './helper/basic'

type TraverseCB<T> = (e: T) => any

export class BST<T> {
  private root: TreeNode<T> | null
  private sz = 0
  private _compare: CompareFn<T> | CompareFn<number>

  constructor(rootValue?: number)
  constructor(rootValue: T, compare: CompareFn<T>)
  constructor(rootValue?: T | CompareFn<T>, compare?: CompareFn<T>) {
    if (typeof rootValue === 'undefined') {
      this.root = null
      this._compare = defaultCompareNumber
    } else if (typeof rootValue === 'function') {
      this.root = null
      this._compare = rootValue as CompareFn<T>
    } else {
      this.root = new TreeNode<T>(rootValue)
      this.sz = 1
      this._compare = compare || defaultCompareNumber
    }
  }

  size(): number {
    return this.sz
  }

  add(e: T): void {
    this.root = this._add(this.root, e)
  }
  // 返回插入后新子树的根
  private _add(node: null | TreeNode<T>, e: T): TreeNode<T> {
    if (!node) {
      const n = new TreeNode(e)
      this.sz++
      return n
    }
    const compare = this._compare(e as T & number, node.e as T & number)
    if (compare === Compare.LARGE) {
      node.right = this._add(node.right, e)
    } else if (compare === Compare.SMALL) {
      node.left = this._add(node.left, e)
    } else {
      node.count++
      this.sz++
    }
    return node
  }

  maximum(): T | null {
    return this._deepSearch(this.root, 'right')
  }

  minimum(): T | null {
    return this._deepSearch(this.root, 'left')
  }

  deleteMaximum(): T | null {
    const max = this.maximum()
    this.root = this._deepDelete(this.root, 'right')
    return max
  }

  deleteMinimum(): T | null {
    const min = this.minimum()
    this.root = this._deepDelete(this.root, 'left')
    return min
  }

  private _deepDelete(node: TreeNode<T> | null, child: 'left' | 'right') {
    if (!node) return null
    const childNode = node[child]
    if (!childNode) {
      node.count--
      this.sz--
      if (node.count > 0) {
        return node
      } else {
        node = null
        return null
      }
    }
    node[child] = this._deepDelete(childNode, child)
    return node
  }

  private _deepSearch(
    node: TreeNode<T> | null,
    child: 'left' | 'right'
  ): T | null {
    if (!node) return null
    const childNode = node[child]
    if (!childNode) return node.e
    return this._deepSearch(childNode, child)
  }

  delete(target: T): boolean {
    if (!this.contain(target)) return false
    this.root = this._deleteAny(this.root, target)
    return true
  }

  private _deleteAny(node: TreeNode<T> | null, target: T): TreeNode<T> | null {
    if (!node) return null
    const compare = this._compare(target as T & number, node.e as T & number)
    if (compare === Compare.EAUAL) {
      if (node.left === null) {
        node.count--
        this.sz--
        if (node.count > 0) {
          return node
        } else {
          const rightChild = node.right
          node = null
          return rightChild
        }
      }
      if (node.right === null) {
        node.count--
        this.sz--
        if (node.count > 0) {
          return node
        } else {
          const leftChild = node.left
          node = null
          return leftChild
        }
      }
      const minClose = this._deepSearch(node.right, 'left') as T
      node.right = this._deepDelete(node.right, 'left')
      node.e = minClose
      return node
    } else if (compare === Compare.LARGE) {
      node.right = this._deleteAny(node.right, target)
    } else {
      node.left = this._deleteAny(node.left, target)
    }
    return node
  }

  contain(target: T): boolean {
    return this._deepTraverse(this.root, target)
  }

  private _deepTraverse(node: TreeNode<T> | null, target: T): boolean {
    if (!node) return false
    const compare = this._compare(target as T & number, node.e as T & number)
    if (compare === Compare.EAUAL) return true
    else if (compare === Compare.LARGE) {
      return this._deepTraverse(node.right, target)
    } else {
      return this._deepTraverse(node.left, target)
    }
  }

  // 遍历
  preorderTraverse(cb: TraverseCB<T>): void {
    const stack = [this.root]
    while (stack.length) {
      const node = stack.pop()
      if (node) {
        cb && cb(node.e)
        stack.push(node.right)
        stack.push(node.left)
      }
    }
  }

  inorderTraverse(cb: TraverseCB<T>): void {
    this._traverse(this.root, cb, 'in')
  }

  postorderTraverse(cb: TraverseCB<T>): void {
    this._traverse(this.root, cb, 'post')
  }

  sequenceTraverse(cb: TraverseCB<T>): void {
    const queue = [this.root]
    while (queue.length) {
      const node = queue.shift()
      if (node) {
        cb && cb(node.e)
        queue.push(node.left)
        queue.push(node.right)
      }
    }
  }

  deepTraverse(cb: TraverseCB<T>): void {
    const stack = [this.root]
    while (stack.length) {
      const node = stack.pop()
      if (node) {
        cb && cb(node.e)
        stack.push(node.right)
        stack.push(node.left)
      }
    }
  }

  private _traverse(
    node: null | TreeNode<T>,
    cb: TraverseCB<T>,
    order: 'pre' | 'in' | 'post'
  ): void {
    if (!node) return
    order === 'pre' && cb && cb(node.e)
    this._traverse(node.left, cb, order)
    order === 'in' && cb && cb(node.e)
    this._traverse(node.right, cb, order)
    order === 'post' && cb && cb(node.e)
  }
}
