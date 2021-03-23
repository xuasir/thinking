import { BST } from '../src'

describe('test BST ', () => {
  let t: BST<number>
  beforeEach(() => {
    t = new BST<number>(100)
    t.add(15)
    t.add(19)
    t.add(5)
    t.add(105)
    t.add(150)
  })
  test('test new a BST', () => {
    const t = new BST<number>()
    t.add(100)
    t.add(50)
    t.add(150)
    expect(t.size()).toBe(3)
    const t2 = new BST<number>(10)
    t2.add(15)
    t2.add(5)
    expect(t2.size()).toBe(3)
  })

  test('BST Pre Order Traverse', () => {
    const t = new BST<number>()
    t.add(15)
    t.add(5)
    t.add(10)
    let res: number[] = []
    t.preorderTraverse((e) => res.push(e))
    expect(res.join('-')).toBe('15-5-10')
    t.add(50)
    t.add(4)
    res = []
    t.preorderTraverse((e) => res.push(e))
    expect(res.join('-')).toBe('15-5-4-10-50')
  })

  test('BST sequence in order and post order traverse ', () => {
    expect(t.size()).toBe(6)
    let res: number[] = []
    t.inorderTraverse((e) => res.push(e))
    expect(res.join('->')).toBe('5->15->19->100->105->150')
    res = []
    t.postorderTraverse((e) => res.push(e))
    expect(res.join('->')).toBe('5->19->15->150->105->100')
    res = []
    t.sequenceTraverse((e) => res.push(e))
    expect(res.join('->')).toBe('100->15->105->5->19->150')
  })

  test('BST maximum and minimum ', () => {
    expect(t.size()).toBe(6)
    expect(t.maximum()).toBe(150)
    expect(t.minimum()).toBe(5)
  })

  test('delete maximum and minimum ', () => {
    expect(t.size()).toBe(6)
    expect(t.deleteMaximum()).toBe(150)
    expect(t.size()).toBe(5)
    const res: number[] = []
    t.inorderTraverse((e) => res.push(e))
    expect(res.join('->')).toBe('5->15->19->100->105')
  })

  test('BST contain ', () => {
    expect(t.size()).toBe(6)
    expect(t.contain(150)).toBeTruthy()
    expect(t.contain(5)).toBeTruthy()
    expect(t.contain(1)).toBeFalsy()
  })

  test('BST delete any item', () => {
    expect(t.size()).toBe(6)
    t.delete(150)
    expect(t.size()).toBe(5)
    let res: number[] = []
    t.inorderTraverse((e) => res.push(e))
    expect(res.join('->')).toBe('5->15->19->100->105')
    t.delete(5)
    expect(t.size()).toBe(4)
    res = []
    t.inorderTraverse((e) => res.push(e))
    expect(res.join('->')).toBe('15->19->100->105')
    t.delete(100)
    expect(t.size()).toBe(3)
    res = []
    t.inorderTraverse((e) => res.push(e))
    expect(res.join('->')).toBe('15->19->105')

    t.add(105)
    expect(t.size()).toBe(4)
    res = []
    t.inorderTraverse((e) => res.push(e))
    expect(res.join('->')).toBe('15->19->105')
    t.delete(105)
    expect(t.size()).toBe(3)
    res = []
    t.inorderTraverse((e) => res.push(e))
    expect(res.join('->')).toBe('15->19->105')
    t.delete(105)
    expect(t.size()).toBe(2)
    res = []
    t.inorderTraverse((e) => res.push(e))
    expect(res.join('->')).toBe('15->19')
  })
})
