import { IndexMaxHeap } from '../src'

describe('test index max heap', () => {
  test('test add item', () => {
    const imh = new IndexMaxHeap<number>()
    imh.add(1)
    imh.add(3)
    imh.add(2)
    expect(imh.size()).toBe(3)
    expect(imh.print()).toBe('3-1-2')
  })

  test('test heapify', () => {
    const size = 10000
    const arr = Array.from({ length: size }).map((_, i) => i)
    const imh = new IndexMaxHeap<number>(arr)
    expect(imh.size()).toBe(size)
    let prev = Infinity,
      cur = size - 1
    while (imh.size()) {
      const max = imh.extractMax()
      expect(max).toBe(cur)
      cur--
      expect(max).toBeLessThan(prev)
      prev = max
    }
    expect(imh.size()).toBe(0)
  })
})
