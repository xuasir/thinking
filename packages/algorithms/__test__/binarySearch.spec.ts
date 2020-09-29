import { binarySearch, Compare, CompareFn } from '../src'

describe('test binary search ', () => {
  test('test type number ', () => {
    const source = [1, 2, 3, 4, 6, 7, 8]
    expect(binarySearch(source, 2)).toBe(1)
    expect(binarySearch(source, 1)).toBe(0)
    expect(binarySearch(source, 16)).toBe(-1)
  })

  test('test type object ', () => {
    const source = [
      { id: 1, name: 'num-1' },
      { id: 2, name: 'num-2' },
      { id: 3, name: 'num-3' },
      { id: 4, name: 'num-4' }
    ]

    const compare: CompareFn<typeof source[0]> = (l, r) => {
      if (l?.id > r?.id) return Compare.LARGE
      else if (l?.id < r?.id) return Compare.SMALL
      else return Compare.EAUAL
    }

    expect(binarySearch(source, source[0], compare)).toBe(0)
    expect(binarySearch(source, source[1], compare)).toBe(1)
    expect(binarySearch(source, { id: 5, name: '' }, compare)).toBe(-1)
  })

  test('big data ', () => {
    const source = Array.from({ length: 10000 }).map((_, i) => i)

    for (let i = 10; i < 9000; i++) {
      expect(binarySearch(source, i)).toBe(i)
    }
  })
})
