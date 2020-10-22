import {
  converFromBoxIndex,
  converToBoxIndex,
  getBoxCells
} from '../src/utils/box'
import { makeMatrix } from '../src/utils/matrix'

describe('test box utils', () => {
  test('test col row index to boxIndex', () => {
    // box-0
    let index = 0
    for (let row = 0; row < 3; row++) {
      for (let col = 0; col < 3; col++) {
        const boxInfo = converToBoxIndex(row, col)
        expect(boxInfo.boxIndex).toBe(0)
        expect(boxInfo.cellIndex).toBe(index)
        index += 1
      }
    }
    // box-4
    index = 0
    for (let row = 3; row < 6; row++) {
      for (let col = 3; col < 6; col++) {
        const boxInfo = converToBoxIndex(row, col)
        expect(boxInfo.boxIndex).toBe(4)
        expect(boxInfo.cellIndex).toBe(index)
        index += 1
      }
    }
    // box-8
    index = 0
    for (let row = 6; row < 9; row++) {
      for (let col = 6; col < 9; col++) {
        const boxInfo = converToBoxIndex(row, col)
        expect(boxInfo.boxIndex).toBe(8)
        expect(boxInfo.cellIndex).toBe(index)
        index += 1
      }
    }
  })
  test('test boxIndex cellIndex to col row Index', () => {
    // box-0
    for (let i = 0; i < 9; i++) {
      const indexInfo = converFromBoxIndex(0, i)
      expect(indexInfo.rowIndex).toBe(i % 3 | 0)
      expect(indexInfo.colIndex).toBe((i / 3) | 0)
    }
    // box-4
    for (let i = 0; i < 9; i++) {
      const indexInfo = converFromBoxIndex(4, i)
      expect(indexInfo.rowIndex).toBe((i % 3 | 0) + 3)
      expect(indexInfo.colIndex).toBe(((i / 3) | 0) + 3)
    }
    // box-8
    for (let i = 0; i < 9; i++) {
      const indexInfo = converFromBoxIndex(8, i)
      expect(indexInfo.rowIndex).toBe((i % 3 | 0) + 6)
      expect(indexInfo.colIndex).toBe(((i / 3) | 0) + 6)
    }
  })
  test('test get box cells', () => {
    const grid = makeMatrix()
    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        grid[row][col] = ((row / 3) | 0) + ((col / 3) | 0) * 3
      }
    }

    function sort(arr: number[]): number[] {
      return [...new Set(arr)].sort((a, b) => a - b)
    }

    for (let boxIndex = 0; boxIndex < 9; boxIndex++) {
      let cells = getBoxCells(grid, boxIndex)
      expect(cells.length).toBe(9)
      cells = sort(cells)
      expect(cells).toEqual([boxIndex])
    }
  })
})
