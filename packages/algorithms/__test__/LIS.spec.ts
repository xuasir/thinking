import { lengthOfLIS, indexOfLIS, itemOfLIS } from '../src'

describe('test LIS ', () => {
  const source = [10, 9, 2, 5, 3, 7, 101, 18]
  test('length of LIS', () => {
    expect(lengthOfLIS(source)).toBe(4)
  })

  test('index of LIS', () => {
    expect(indexOfLIS(source)).toEqual([2, 4, 5, 7])
  })

  test('item of LIS', () => {
    expect(itemOfLIS(source)).toEqual([2, 3, 7, 18])
  })
})
