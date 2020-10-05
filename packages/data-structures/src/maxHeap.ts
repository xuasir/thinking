import { defaultCompareNumber } from './helper/utils'
import { Compare, CompareFn } from './helper/types'

export class Heap<T extends number | string | Record<string, any>> {
  private data: T[]
  private _compare
  private count = 0

  constructor(compare?: CompareFn<T>)
  constructor(source?: T[], compare?: CompareFn<T>)
  constructor(
    source?: T[] | CompareFn<any> | undefined,
    compare?: CompareFn<any> | undefined
  ) {
    if (typeof source === 'undefined') {
      this.data = []
      this._compare = defaultCompareNumber
    } else if (typeof source === 'function') {
      this.data = []
      this._compare = compare
    } else {
      this.data = source.slice()
      this.count = this.data.length
      this._compare = compare || defaultCompareNumber
      this.heapify()
      console.log(this.data)
    }
  }

  size(): number {
    return this.count
  }

  private shiftUp(index: number) {
    let k = index
    const v = this.data[k]
    while (k > -1) {
      const parent = ((k - 1) / 2) | 0
      const compare = this._compare!(
        this.data[parent] as number,
        this.data[k] as number
      )
      if (compare === Compare.LARGE || compare === Compare.EAUAL) break
      else {
        this.data[k] = this.data[parent]
        k = parent
      }
    }
    this.data[k] = v
  }

  private shiftDown(index: number) {
    let k = index
    const v = this.data[k]
    while (k < this.count - 1) {
      const l = k * 2 + 1,
        r = k * 2 + 2
      const compare = this._compare!(
        this.data[l] as number,
        this.data[r] as number
      )
      const target =
        compare === Compare.LARGE || compare === Compare.EAUAL ? l : r
      const compare2 = this._compare!(
        this.data[k] as number,
        this.data[target] as number
      )
      if (compare2 === Compare.LARGE || compare2 === Compare.EAUAL) break
      else {
        this.data[k] = this.data[target]
        k = target
      }
    }
    this.data[k] = v
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
    ;[this.data[0], this.data[this.count]] = [
      this.data[this.count],
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
