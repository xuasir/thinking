import { extend } from '../../src'

describe('test extend', () => {
  const o1 = {
    a: 1,
    b: 2,
    d: 3,
  }
  const o2 = {
    a: 2,
    b: 4,
    c: 5,
  }
  const targetO = {
    a: 2,
    b: 4,
    c: 5,
    d: 3,
  }

  test('extend o1 o2', () => {
    const o = extend(o1, o2)
    expect(o).toEqual(targetO)
  })
})
