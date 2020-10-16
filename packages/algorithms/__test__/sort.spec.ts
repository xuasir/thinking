import {
  insertSort,
  selectionSort,
  mergeSort,
  quickSort,
  heapSort,
  bubbleSort
} from '../src'
import { getRandomArray } from './helper'

describe('test sort ', () => {
  let source: number[] = []
  const size = 100000,
    range = 10000
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

  test('test quick sort number ', () => {
    const target = quickSort(source)

    for (let i = 1; i < size; i++) {
      expect(target[i]).toBeGreaterThanOrEqual(target[i - 1])
    }
  })

  test('test heap sort number ', () => {
    const target = heapSort(source)

    for (let i = 1; i < size; i++) {
      expect(target[i]).toBeGreaterThanOrEqual(target[i - 1])
    }
  })

  test('test bubble sort number ', () => {
    const target = bubbleSort(source)

    for (let i = 1; i < size; i++) {
      expect(target[i]).toBeGreaterThanOrEqual(target[i - 1])
    }
  })
})
