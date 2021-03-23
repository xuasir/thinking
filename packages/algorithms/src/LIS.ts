import { CompareFn, Compare } from './helper/types'
import { defaultCompareNumber } from './helper/utils'

export function lengthOfLIS(source: number[]): number
export function lengthOfLIS<T extends string | Record<string, any>>(
  source: T[],
  compare: CompareFn<T>
): number
export function lengthOfLIS(
  source: number[],
  compare = defaultCompareNumber
): number {
  const len = source.length
  if (len < 1) return 0
  const seqLastItem = [source[0]]
  for (let i = 1; i < len; i++) {
    if (
      compare(source[i], seqLastItem[seqLastItem.length - 1]) === Compare.LARGE
    ) {
      seqLastItem.push(source[i])
    } else {
      let l = 0,
        r = seqLastItem.length - 1
      while (l < r) {
        const mid = ((l + r) / 2) | 0
        const res = compare(seqLastItem[mid], source[i])
        res === Compare.SMALL ? (l = mid + 1) : (r = mid)
      }
      seqLastItem[l] = source[i]
    }
  }
  return seqLastItem.length
}

export function indexOfLIS(source: number[]): number[]
export function indexOfLIS<T extends string | number | Record<string, any>>(
  source: T[],
  compare: CompareFn<T>
): number[]
export function indexOfLIS(
  source: number[],
  compare = defaultCompareNumber
): number[] {
  const len = source.length
  if (len < 1) return []

  const beforeIndex = Array.from({ length: len }).map((_, i) => i)
  const seqLastIndex = [0]

  for (let i = 1; i < len; i++) {
    const last = seqLastIndex[seqLastIndex.length - 1]
    if (compare(source[i], source[last]) === Compare.LARGE) {
      seqLastIndex.push(i)
      beforeIndex[i] = last
    } else {
      let l = 0,
        r = seqLastIndex.length - 1
      while (l < r) {
        const mid = ((l + r) / 2) | 0
        const res = compare(source[seqLastIndex[mid]], source[i])
        res === Compare.SMALL ? (l = mid + 1) : (r = mid)
      }
      if (compare(source[i], source[seqLastIndex[l]]) === Compare.SMALL) {
        if (l > 0) beforeIndex[i] = seqLastIndex[l - 1]
        seqLastIndex[l] = i
      }
    }
  }

  let seqLen = seqLastIndex.length
  let last = seqLastIndex[seqLen - 1]
  while (seqLen-- > 0) {
    seqLastIndex[seqLen] = last
    last = beforeIndex[last]
  }
  return seqLastIndex
}

export function itemOfLIS(source: number[]): number[]
export function itemOfLIS<T extends string | Record<string, any>>(
  source: T[],
  compare: CompareFn<T>
): T[]
export function itemOfLIS(
  source: number[],
  compare = defaultCompareNumber
): number[] {
  const len = source.length
  if (len < 1) return []
  return indexOfLIS(source, compare).map((i) => source[i])
}
