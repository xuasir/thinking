import { insertSort, selectionSort, mergeSort } from '../src'
import { getRandomArray } from './helper'

describe('test sort ', () => {
  let source: number[] = []
  const size = 1000,
    range = 1000
  beforeEach(() => {
    source = getRandomArray(size, range)
  })
  test('test insert sort number ', () => {
    const target = insertSort(source)

    for (let i = 1; i < size; i++) {
      expect(target[i]).toBeGreaterThanOrEqual(target[i - 1])
    }
  })

  test('test selection sort number ', () => {
    // const target = withPerformance(selectionSort, 'selection-sort')(source)
    const target = selectionSort(source)

    for (let i = 1; i < size; i++) {
      expect(target[i]).toBeGreaterThanOrEqual(target[i - 1])
    }
  })

  test('test merge sort number ', () => {
    const target = mergeSort(source)

    for (let i = 1; i < size; i++) {
      expect(target[i]).toBeGreaterThanOrEqual(target[i - 1])
    }
  })
})
