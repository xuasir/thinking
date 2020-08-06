import { combination } from '../src'

describe('test combination ', () => {
  const rawData = [1, 2, 3]
  const handleOfCombine: (nums: number[]) => string = (nums) => nums.join('-')

  test('combine ', () => {
    const c1 = combination(rawData, 1, handleOfCombine)
    expect(c1).toEqual(['1', '2', '3'])
    const c2 = combination(rawData, 2, handleOfCombine)
    expect(c2).toEqual(['1-2', '1-3', '2-3'])
    const c3 = combination(rawData, 3, handleOfCombine)
    expect(c3).toEqual(['1-2-3'])
  })
})
