import { falt } from '../../src'

describe('test falt ', () => {
  const a1 = [1, [2, [3, 4], 5], '6']

  test('falt array ', () => {
    const a = falt(a1)
    expect(a).toEqual([1, 2, 3, 4, 5, '6'])
  })
})
