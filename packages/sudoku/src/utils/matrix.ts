import { converToBoxIndex, getBoxCells } from './box'

export function makeRow(v = 0): number[] {
  return Array.from({ length: 9 }).fill(v) as number[]
}

export function makeMatrix(v = -1): number[][] {
  return Array.from({ length: 9 }, () => makeRow(v))
}

export function shffule(arr: number[]): number[] {
  const endIndex = arr.length - 2,
    len = arr.length - 1
  for (let i = 0; i <= endIndex; i++) {
    const j = i + ((Math.random() * (len - i)) | 0)
    ;[arr[i], arr[j]] = [arr[j], arr[i]]
  }
  return arr
}

export function fillNumAble(
  matrix: number[][],
  n: number,
  rowIndex: number,
  colIndex: number
): boolean {
  const rows = matrix[rowIndex]
  const cols = matrix.map(row => row[colIndex])
  const { boxIndex } = converToBoxIndex(rowIndex, colIndex)
  const cells = getBoxCells(matrix, boxIndex)
  for (let i = 0; i < 9; i++) {
    if (rows[i] === n || cols[i] === n || cells[i] === n) return false
  }
  return true
}
