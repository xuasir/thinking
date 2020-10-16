import { CompareFn, Compare } from './helper/types'
import { defaultCompareNumber } from './helper/utils'

export function bubbleSort(source: number[]): number[]
export function bubbleSort<T extends string | Record<string, any>>(
  source: T[],
  compare: CompareFn<T>
): T[]
export function bubbleSort(
  source: number[],
  compare = defaultCompareNumber
): number[] {
  const len = source.length
  if (len < 1) return source

  const n = len
  let lastSwitchIndex = n
  while (lastSwitchIndex) {
    const top = lastSwitchIndex
    lastSwitchIndex = 0
    for (let i = 1; i < top; i++) {
      if (compare(source[i - 1], source[i]) === Compare.LARGE) {
        ;[source[i], source[i - 1]] = [source[i - 1], source[i]]
        lastSwitchIndex = i
      }
    }
  }
  return source
}
