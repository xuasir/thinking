import { defaultCompareNumber } from './helper/utils'
import { Compare, CompareFn } from './helper/types'
import { LinkNode } from './helper/basic'

export class LinkedList<T> {
  private _compare: CompareFn<T> | CompareFn<number>
  private dummyHead: LinkNode<null | T>
  private tail: LinkNode<T> | null = null
  private sz = 0

  constructor(compare?: CompareFn<number>)
  constructor(compare: CompareFn<T>)
  constructor(compare = defaultCompareNumber) {
    this._compare = compare
    this.dummyHead = new LinkNode(null)
  }

  size(): number {
    return this.sz
  }

  addFirst(item: T): void {
    this.dummyHead.next = new LinkNode(item, this.dummyHead.next)
    if (this.sz === 0) this.tail = this.dummyHead.next as LinkNode<T>
    this.sz++
  }

  add(index: number, item: T): void {
    if (index >= this.sz) throw Error(`invalid index`)
    let prev = this.dummyHead
    for (let i = 0; i < index; i++) {
      prev = prev.next as LinkNode<T | null>
    }
    prev.next = new LinkNode(item, prev.next)
    if (this.sz === index + 1) this.tail = prev.next as LinkNode<T>
    this.sz++
  }

  addLast(item: T): void {
    if (this.tail) {
      this.tail.next = new LinkNode(item)
      this.tail = this.tail.next
      this.sz++
    } else {
      this.addFirst(item)
    }
  }

  delete(target: T): boolean {
    if (!this.contain(target)) return false
    let flag = false,
      prev = this.dummyHead
    while (prev.next !== null) {
      const nextNode = prev.next
      const compare = this._compare(
        target as T & number,
        nextNode.e as T & number
      )
      if (compare === Compare.EQUAL) {
        flag = true
        prev.next = nextNode.next
        nextNode.next = null
        if (prev.next === null) this.tail = prev as LinkNode<T>
        this.sz--
        break
      }
      prev = prev.next
    }
    return flag
  }

  deleteIndex(index: number): T | null {
    if (index >= this.sz) throw Error(`invalid index`)
    let prev = this.dummyHead
    for (let i = 0; i < index; i++) {
      prev = prev.next as LinkNode<T | null>
    }
    const nextNode = prev.next as LinkNode<T | null>
    const ret = nextNode.e
    prev.next = nextNode.next
    nextNode.next = null
    if (this.sz === index + 1) this.tail = prev as LinkNode<T>
    this.sz--
    return ret
  }

  contain(target: T): boolean {
    let flag = false,
      node = this.dummyHead.next
    while (node !== null) {
      const compare = this._compare(target as T & number, node.e as T & number)
      if (compare === Compare.EQUAL) {
        flag = true
        break
      }
      node = node.next
    }
    return flag
  }

  print(): string {
    const ret: T[] = []
    let node = this.dummyHead.next
    while (node !== null) {
      if (node.e) ret.push(node.e)
      node = node.next
    }

    return ret.join('->')
  }
}
