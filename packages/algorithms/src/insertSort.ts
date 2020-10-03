import { CompareFn, Compare } from './helper/types'
import { defaultCompareNumber } from './helper/utils'

export function insertSort(
  source: number[],
  compare?: CompareFn<number>
): number[]
export function insertSort<T extends string | number | Record<string, any>>(
  source: number[],
  compare?: CompareFn<number>
): number[]
export function insertSort(
  source: number[],
  compare = defaultCompareNumber
): number[] {
  const len = source.length
  if (len < 1) return []

  for (let i = 1; i < len; i++) {
    const flag = source[i]
    let j
    for (j = i; j > 0 && compare(source[j - 1], flag) === Compare.LARGE; j--) {
      source[j] = source[j - 1]
    }
    source[j] = flag
  }

  return source
}
