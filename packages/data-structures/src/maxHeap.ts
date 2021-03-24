import { defaultCompareNumber } from './helper/utils'
import { Compare, CompareFn } from './helper/types'

export class MaxHeap<T extends number | string | Record<string, any>> {
  private data: T[]
  private _compare: CompareFn<T> | CompareFn<number>
  private count = 0

  constructor(source?: number[])
  constructor(source: T[], compare: CompareFn<T>)
  constructor(source?: T[] | CompareFn<T>, compare?: CompareFn<T>) {
    if (typeof source === 'undefined') {
      this.data = []
      this._compare = defaultCompareNumber
    } else if (typeof source === 'function') {
      this.data = []
      this._compare = compare as CompareFn<T>
    } else {
      this.data = source.slice()
      this.count = this.data.length
      this._compare = compare || defaultCompareNumber
      this.heapify()
    }
  }

  size(): number {
    return this.count
  }

  private shiftUp(index: number) {
    const v = this.data[index]
    while (index > 0) {
      const parent = ((index - 1) / 2) | 0
      const compare = this._compare(
        this.data[parent] as T & number,
        v as T & number
      )
      if (compare === Compare.LARGE || compare === Compare.EQUAL) break
      else {
        this.data[index] = this.data[parent]
        index = parent
      }
    }
    this.data[index] = v
  }

  private shiftDown(index: number) {
    const v = this.data[index]
    while (2 * index + 1 < this.count) {
      let l = 2 * index + 1
      if (l + 1 < this.count) {
        const compare = this._compare(
          this.data[l] as T & number,
          this.data[l + 1] as T & number
        )
        compare === Compare.SMALL ? l++ : ''
      }
      const compare2 = this._compare(
        v as T & number,
        this.data[l] as T & number
      )
      if (compare2 === Compare.LARGE || compare2 === Compare.EQUAL) break

      this.data[index] = this.data[l]
      index = l
    }
    this.data[index] = v
  }

  private heapify() {
    let r = ((this.count - 2) / 2) | 0
    while (r > -1) {
      this.shiftDown(r)
      r--
    }
  }

  add(item: T): void {
    this.data.push(item)
    this.count++
    this.shiftUp(this.size() - 1)
  }

  extractMax(): T {
    const max = this.data[0]
    ;[this.data[0], this.data[this.count - 1]] = [
      this.data[this.count - 1],
      this.data[0]
    ]
    this.count--
    this.shiftDown(0)
    return max
  }

  print(): string {
    return this.data.slice(0, this.count).join('-')
  }
}
