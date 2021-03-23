import { generate, grid } from '../src/grid'
import { fillNumAble } from '../src/utils/matrix'

describe('test grid', () => {
  test('generate grid and fill able', () => {
    generate()
    expect(grid.length).toBe(9)
    const sortGrid = grid.map((row) => row.sort((a, b) => a - b))
    sortGrid.forEach((row) => {
      expect(row).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9])
    })
    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        for (let n = 1; n < 10; n++)
          expect(fillNumAble(grid, n, row, col)).toBeFalsy()
      }
    }
  })
})
