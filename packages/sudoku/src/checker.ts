import { converFromBoxIndex } from './utils/box'

export const marks: boolean[][] = Array.from({ length: 9 }).map(
  () => Array.from({ length: 9 }).fill(true) as boolean[]
)

export function resetMarks(): void {
  marks.forEach((row, i) => (marks[i] = row.map(() => true)))
}

function checkRow(matrix: number[][]) {
  for (let row = 0; row < 9; row++) markRow(matrix, row)
}

function markRow(matrix: number[][], rowIndex: number) {
  const rows = matrix[rowIndex],
    marksRow = marks[rowIndex]
  for (let i = 0; i < 8; i++) {
    for (let j = i + 1; j < 9; j++)
      if (rows[i] === rows[j]) marksRow[i] = marksRow[j] = false
  }
}

function checkCol(matrix: number[][]) {
  for (let col = 0; col < 9; col++) markCol(matrix, col)
}

function markCol(matrix: number[][], colIndex: number) {
  for (let i = 0; i < 8; i++) {
    for (let j = i + 1; j < 9; j++)
      if (matrix[i][colIndex] === matrix[j][colIndex])
        marks[i][colIndex] = marks[j][colIndex] = false
  }
}

function checkBox(matrix: number[][]) {
  for (let box = 0; box < 9; box++) markBox(matrix, box)
}

function markBox(matrix: number[][], boxIndex: number) {
  const IndexMap = Array.from({ length: 9 }, (_, i) =>
    converFromBoxIndex(boxIndex, i)
  )
  for (let i = 0; i < 8; i++) {
    const { rowIndex, colIndex } = IndexMap[i]
    for (let j = i + 1; j < 9; j++) {
      const { rowIndex: rowIndex2, colIndex: colIndex2 } = IndexMap[j]
      if (matrix[rowIndex][colIndex] === matrix[rowIndex2][colIndex2]) {
        marks[rowIndex][colIndex] = marks[rowIndex2][colIndex2] = false
      }
    }
  }
}

export function checker(matrix: number[][]): boolean {
  resetMarks()
  checkRow(matrix)
  checkCol(matrix)
  checkBox(matrix)
  return marks.every((cells) => cells.every((cell) => cell))
}
