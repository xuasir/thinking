import { MaxHeap } from '../src'

describe('test max max heap ', () => {
  test('test add item ', () => {
    const h = new MaxHeap<number>()

    expect(h.size()).toBe(0)
    h.add(2)
    h.add(4)
    expect(h.size()).toBe(2)
    expect(h.print()).toBe('4-2')
    h.add(5)
    expect(h.print()).toBe('5-2-4')
  })

  test('test extract max ', () => {
    const h = new MaxHeap<number>()
    ;[2, 3, 4].forEach(v => h.add(v))
    expect(h.size()).toBe(3)
    expect(h.print()).toBe('4-2-3')
    expect(h.extractMax()).toBe(4)
    expect(h.size()).toBe(2)
    expect(h.print()).toBe('3-2')
  })

  test('test heapify ', () => {
    const h = new MaxHeap<number>([2, 3, 4])
    expect(h.size()).toBe(3)
    expect(h.print()).toBe('4-3-2')
  })

  test('test max Maxheap ', () => {
    const h = new MaxHeap<number>([1, 2, 3, 4, 5, 6, 7])
    expect(h.size()).toBe(7)
    expect(h.print()).toBe('7-5-6-4-2-1-3')
    let prev = Infinity
    while (h.size()) {
      const max = h.extractMax()
      expect(max).toBeLessThan(prev)
      prev = max
    }
  })
})
