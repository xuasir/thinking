import { Compare, CompareFn } from './types'

export const defaultCompareNumber: CompareFn<number> = (l, r) => {
  if (l > r) return Compare.LARGE
  else if (l === r) return Compare.EQUAL
  else return Compare.SMALL
}
