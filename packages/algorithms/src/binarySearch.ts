import { CompareFn, Compare } from './helper/types'

const defaultCompareNumber: CompareFn<number> = (l, r) => {
  if (l > r) return Compare.LARGE
  else if (l === r) return Compare.EAUAL
  else return Compare.SMALL
}

export function binarySearch<T extends number>(
  source: T[],
  target: T,
  compare?: CompareFn<T>
): number
export function binarySearch<T extends string | Record<string, unknown>>(
  source: T[],
  target: T,
  compare: CompareFn<T>
): number
export function binarySearch(
  source: number[],
  target: number,
  compare = defaultCompareNumber
): number {
  let l = 0,
    r = source.length - 1
  // [l...r]
  while (l <= r) {
    const mid = (l + (r - l) / 2) | 0
    const compareRes = compare(source[mid], target)
    if (compareRes === Compare.EAUAL) return mid
    if (compareRes === Compare.LARGE) r = mid - 1
    if (compareRes === Compare.SMALL) l = mid + 1
  }
  return -1
}
