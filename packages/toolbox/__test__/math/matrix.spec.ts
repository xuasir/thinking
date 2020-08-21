import { Matrix } from '../../src'

describe('test math method ', () => {
  const rawMatrix = [
    ['c1', 'c2', 'c3'],
    ['c1', 'c2', 'c3'],
    ['c1', 'c2', 'c3'],
  ]
  const transposeMatrix = [
    ['c1', 'c1', 'c1'],
    ['c2', 'c2', 'c2'],
    ['c3', 'c3', 'c3'],
  ]
  test('test matrix ', () => {
    const m = new Matrix(rawMatrix)
    expect(m.getRawMatrix()).toEqual(rawMatrix)
    expect(m.transpose()).toEqual(transposeMatrix)
  })

  const rawData = [
    ['c1', 'c2'],
    ['c1', 'c2'],
    ['c1', 'c2'],
  ]
  const transposeData = [
    ['c1', 'c1', 'c1'],
    ['c2', 'c2', 'c2'],
  ]

  test('test transpose', () => {
    const m = new Matrix(rawData)
    expect(m.getRawMatrix()).toEqual(rawData)
    expect(m.transpose()).toEqual(transposeData)
  })
})
