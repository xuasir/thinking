import { insertSort } from '../src'
import { getRandomArray } from './helper'

describe('test insert sort ', () => {
  let source: number[] = []
  const size = 100,
    range = 1000
  beforeEach(() => {
    source = getRandomArray(size, range)
  })
  test('test sort number ', () => {
    const target = insertSort(source)

    for (let i = 1; i < size; i++) {
      expect(target[i]).toBeGreaterThanOrEqual(target[i - 1])
    }
  })
})
