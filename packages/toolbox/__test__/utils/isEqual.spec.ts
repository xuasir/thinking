import { isEqual } from '../../src'

describe('test isEqual ', () => {
  const o1 = {
    a: 2,
    b: '1'
  }
  const o2 = {
    a: 2,
    b: '1'
  }

  const o3 = {
    a: o1,
    b: [1, 2, 3]
  }

  const o4 = {
    a: o2,
    b: [1, 2, 3]
  }

  test('basic type', () => {
    expect(isEqual(o1, o2)).toBeTruthy()
  })

  test('obj array', () => {
    expect(isEqual(o3, o4)).toBeTruthy()
  })
})
