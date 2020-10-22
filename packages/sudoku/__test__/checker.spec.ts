import { checker, marks, remakeGrid } from '../src'
import { generate, grid } from '../src/grid'

describe('test checker', () => {
  test('full sudoku', () => {
    generate()
    expect(checker(grid)).toBeTruthy()
  })

  test('error marks', () => {
    const qGrid = remakeGrid()
    expect(checker(qGrid)).toBeFalsy()
    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        if (qGrid[row][col] < 1) expect(marks[row][col]).toBeFalsy()
        else expect(marks[row][col]).toBeTruthy()
      }
    }
  })
})
