import { CompareFn, Compare } from './helper/types'
import { defaultCompareNumber } from './helper/utils'

export function mergeSort(source: number[]): number[]
export function mergeSort<T extends string | Record<string, any>>(
  source: T[],
  compare: CompareFn<T>
): T[]
export function mergeSort(
  source: number[],
  compare = defaultCompareNumber
): number[] {
  // BU
  const len = source.length
  if (len < 1) return []
  // sz 归并区间项目个数 sz --> 2 * sz
  for (let sz = 1; sz < len; sz += sz) {
    // 归并
    // [i...i+sz-1] [i+sz ... i + 2*sz-1 / len - 1] 进行归并
    for (let i = 0; i + sz < len; i += 2 * sz) {
      __mergeByInsert(
        source,
        i,
        i + sz - 1,
        Math.min(i + 2 * sz - 1, len - 1),
        compare
      )
    }
  }

  return source
}

function __mergeByInsert<T>(
  source: T[],
  l: number,
  mid: number,
  r: number,
  compare: CompareFn<T>
): void {
  // 归并区间 [l...mid] [mid+1...r]
  for (let i = mid + 1; i <= r; i++) {
    const origin = source[i]
    let j
    for (
      j = i;
      j > l && compare(source[j - 1], origin) === Compare.LARGE;
      j--
    ) {
      source[j] = source[j - 1]
    }

    source[j] = origin
  }
}
