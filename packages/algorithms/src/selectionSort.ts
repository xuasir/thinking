import { CompareFn, Compare } from './helper/types'
import { defaultCompareNumber } from './helper/utils'

export function selectionSort(source: number[]): number[]
export function selectionSort<T extends string | Record<string, any>>(
  source: T[],
  compare: CompareFn<T>
): T[]
export function selectionSort(
  source: number[],
  compare = defaultCompareNumber
): number[] {
  const len = source.length
  if (len < 1) return []

  for (let i = 0; i < len; i++) {
    let minIndex = i
    for (let j = i + 1; j < len; j++) {
      if (compare(source[minIndex], source[j]) === Compare.LARGE) minIndex = j
    }
    minIndex !== i &&
      ([source[minIndex], source[i]] = [source[i], source[minIndex]])
  }

  return source
}
