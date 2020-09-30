import { selectionSort } from '../src'
import { getRandomArray } from './helper'
describe('test selection sort ', () => {
  let source: number[] = []
  const size = 100,
    range = 1000
  beforeEach(() => {
    source = getRandomArray(size, range)
  })
  test('test sort number ', () => {
    // const target = withPerformance(selectionSort, 'selection-sort')(source)
    const target = selectionSort(source)

    for (let i = 1; i < size; i++) {
      expect(target[i]).toBeGreaterThanOrEqual(target[i - 1])
    }
  })
})
