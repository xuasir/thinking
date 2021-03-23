import { defaultCompareNumber } from './helper/utils'
import { Compare, CompareFn } from './helper/types'

export class IndexMaxHeap<T extends number | string | Record<string, any>> {
  private data: T[]
  private index: number[]
  private rev: number[]
  private _compare: CompareFn<T> | CompareFn<number>
  private count = 0

  constructor(source?: number[])
  constructor(source: T[], compare: CompareFn<T>)
  constructor(source?: T[] | CompareFn<T>, compare?: CompareFn<T>) {
    if (typeof source === 'undefined') {
      this.data = []
      this.index = []
      this.rev = []
      this._compare = defaultCompareNumber
    } else if (typeof source === 'function') {
      this.data = []
      this.index = []
      this.rev = []
      this._compare = compare as CompareFn<T>
    } else {
      this.data = source
      this.index = Array.from({ length: source.length }).map(
        (_, i) => i
      ) as number[]
      this.rev = Array.from({ length: source.length }).fill(-1) as number[]
      this.count = this.data.length
      this._compare = compare || defaultCompareNumber
      this.heapify()
    }
  }

  size(): number {
    return this.count
  }

  private shiftUp(i: number) {
    const pos = this.index[i],
      v = this.data[pos]
    while (i > 0) {
      const parent = ((i - 1) / 2) | 0
      const compare = this._compare(
        this.data[this.index[parent]] as T & number,
        v as T & number
      )
      if (compare === Compare.LARGE || compare === Compare.EAUAL) break
      else {
        this.index[i] = this.index[parent]
        this.rev[this.index[parent]] = i
        i = parent
      }
    }
    this.index[i] = pos
    this.rev[pos] = i
  }

  private shiftDown(i: number) {
    const pos = this.index[i],
      v = this.data[pos]
    while (2 * i + 1 < this.count) {
      let l = 2 * i + 1
      if (l + 1 < this.count) {
        const compare = this._compare(
          this.data[this.index[l]] as T & number,
          this.data[this.index[l + 1]] as T & number
        )
        compare === Compare.SMALL ? l++ : ''
      }
      const compare2 = this._compare(
        v as T & number,
        this.data[this.index[l]] as T & number
      )
      if (compare2 === Compare.LARGE || compare2 === Compare.EAUAL) break

      this.index[i] = this.index[l]
      this.rev[this.index[l]] = i
      i = l
    }
    this.index[i] = pos
    this.rev[pos] = i
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
    this.index.push(this.count)
    this.rev.push(this.count)
    this.count++
    this.shiftUp(this.count - 1)
  }

  extractMax(): T {
    const maxIndex = this.index[0],
      lastIndex = this.index[this.count - 1]
    this.count--
    this.index[0] = lastIndex
    this.rev[lastIndex] = 0
    this.index[this.count] = maxIndex
    this.rev[maxIndex] = this.count
    this.shiftDown(0)
    return this.data[maxIndex]
  }

  print(): string {
    return this.index
      .slice(0, this.count)
      .map((v) => this.data[v])
      .join('-')
  }
}
