import { CompareFn, Compare } from './helper/types'
import { defaultCompareNumber } from './helper/utils'

export function quickSort(
  source: number[],
  compare?: CompareFn<number>
): number[]
export function quickSort<T extends string | number | Record<string, any>>(
  source: number[],
  compare?: CompareFn<number>
): number[]
export function quickSort(
  source: number[],
  compare = defaultCompareNumber
): number[] {
  const len = source.length
  if (len < 1) return []
  __qc(source, 0, len - 1, compare)
  return source
}

function __qc<T>(
  source: T[],
  l: number,
  r: number,
  compare: CompareFn<T>
): void {
  if (l >= r) return
  // 插入排序优化
  if (r - l + 1 < 18) __partitionInsert(source, l, r, compare)
  // 快速排序 [l...r] 区间
  const { lr, rl } = __partition(source, l, r, compare)
  lr >= l && __qc(source, l, lr, compare)
  r >= rl && __qc(source, rl, r, compare)
}

function __partition<T>(
  source: T[],
  l: number,
  r: number,
  compare: CompareFn<T>
): { lr: number; rl: number } {
  // partition [l...lr] < [lr+1...rl-1] < [rl...r]
  let lr = l - 1,
    rl = r + 1
  let i = l + 1
  const flag = source[l]

  while (i < rl) {
    if (compare(source[i], flag) === Compare.EAUAL) i++
    else if (compare(source[i], flag) === Compare.SMALL) {
      lr++
      ;[source[lr], source[i]] = [source[i], source[lr]]
      i++
    } else if (compare(source[i], flag) === Compare.LARGE) {
      rl--
      ;[source[rl], source[i]] = [source[i], source[rl]]
    }
  }

  return { rl, lr }
}

function __partitionInsert<T>(
  source: T[],
  l: number,
  r: number,
  compare: CompareFn<T>
): void {
  for (let i = l; i < r + 1; i++) {
    const origin = source[i]
    let j
    for (j = i; j > l && compare(source[j - 1], origin) === Compare.LARGE; j--)
      source[j] = source[j - 1]

    source[j] = origin
  }
}
