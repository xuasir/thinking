import { checker, marks, makeGrid } from '../src'
import { generate, grid } from '../src/grid'

describe('test checker', () => {
  test('full sudoku', () => {
    generate()
    expect(checker(grid)).toBeTruthy()
  })

  test('error marks', () => {
    makeGrid()
    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        if (grid[row][col] < 1) expect(marks[row][col]).toBeFalsy()
        else expect(marks[row][col]).toBeTruthy()
      }
    }
  })
})
