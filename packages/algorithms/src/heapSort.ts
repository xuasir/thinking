import { CompareFn, Compare } from './helper/types'
import { defaultCompareNumber } from './helper/utils'

export function heapSort(
  source: number[],
  compare?: CompareFn<number>
): number[]
export function heapSort<T extends string | number | Record<string, any>>(
  source: number[],
  compare?: CompareFn<number>
): number[]
export function heapSort(
  source: number[],
  compare = defaultCompareNumber
): number[] {
  const len = source.length
  if (len < 2) return source
  // heapify
  for (let i = ((len - 1) / 2) | 0; i >= 0; i--)
    shiftDown(source, len, i, compare)

  // shift down
  for (let j = len - 1; j > 0; j--) {
    ;[source[j], source[0]] = [source[0], source[j]]
    shiftDown(source, j, 0, compare)
  }
  return source
}

function shiftDown<T>(arr: T[], len: number, i: number, compare: CompareFn<T>) {
  const v = arr[i]
  while (2 * i + 1 < len) {
    let l = i * 2 + 1
    if (l + 1 < len) {
      const compare1 = compare(arr[l], arr[l + 1])
      compare1 === Compare.SMALL ? l++ : ''
    }
    const compare2 = compare(v, arr[l])
    if (compare2 === Compare.LARGE || compare2 === Compare.EAUAL) break

    arr[i] = arr[l]
    i = l
  }
  arr[i] = v
}
