import { Heap } from '../src'

describe('test max heap ', () => {
  test('test add item ', () => {
    const h = new Heap<number>()

    expect(h.size()).toBe(0)
    h.add(2)
    h.add(4)
    expect(h.size()).toBe(2)
    expect(h.print()).toBe('4-2')
    h.add(5)
    expect(h.print()).toBe('5-2-4')
  })

  test('test extract max ', () => {
    const h = new Heap<number>()
    ;[2, 3, 4].forEach(v => h.add(v))
    expect(h.size()).toBe(3)
    expect(h.print()).toBe('4-2-3')
    expect(h.extractMax()).toBe(4)
    expect(h.size()).toBe(2)
    expect(h.print()).toBe('3-2')
  })

  test('test heapify ', () => {
    const h = new Heap<number>([2, 3, 4])
    expect(h.size()).toBe(3)
    expect(h.print()).toBe('4-3-2')
  })
})
