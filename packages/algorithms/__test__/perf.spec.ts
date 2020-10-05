import { withPerformance, getRandomArray } from './helper'
import { selectionSort } from '../src'

describe('test performance ', () => {
  let source: number[]
  const size = 10000,
    range = 1000
  beforeEach(() => {
    source = getRandomArray(size, range)
  })

  test('selection sort ', () => {
    withPerformance(() => selectionSort(source), 'selection-sort')()
    expect(1).toBe(1)
  })
})
