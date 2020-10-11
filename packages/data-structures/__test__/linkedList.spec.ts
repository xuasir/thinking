import { LinkedList } from '../src'

describe('test linkedlist', () => {
  test('test method ', () => {
    const l = new LinkedList<number>()
    // add
    l.addLast(1)
    expect(l.size()).toBe(1)
    l.addLast(3)
    l.addFirst(2)
    expect(l.size()).toBe(3)
    expect(l.print()).toBe('2->1->3')
    l.add(1, 4)
    expect(l.size()).toBe(4)
    expect(l.print()).toBe('2->4->1->3')
    // contain
    expect(l.contain(4)).toBeTruthy()
    expect(l.contain(2)).toBeTruthy()
    expect(l.contain(3)).toBeTruthy()
    expect(l.contain(5)).toBeFalsy()
    // delete
    l.delete(2)
    l.delete(3)
    expect(l.size()).toBe(2)
    expect(l.print()).toBe('4->1')
    l.deleteIndex(1)
    expect(l.size()).toBe(1)
    expect(l.print()).toBe('4')
    expect(l.contain(1)).toBeFalsy()
    expect(l.contain(2)).toBeFalsy()
    expect(l.contain(3)).toBeFalsy()
    expect(l.contain(4)).toBeTruthy()
  })
})
