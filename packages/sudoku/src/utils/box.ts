export function converToBoxIndex(
  rowIndex: number,
  colIndex: number
): { boxIndex: number; cellIndex: number } {
  return {
    boxIndex: ((rowIndex / 3) | 0) + ((colIndex / 3) | 0) * 3,
    cellIndex: (rowIndex % 3 | 0) * 3 + (colIndex % 3 | 0)
  }
}

export function converFromBoxIndex(
  boxIndex: number,
  cellIndex: number
): { rowIndex: number; colIndex: number } {
  return {
    rowIndex: (boxIndex % 3 | 0) * 3 + (cellIndex % 3 | 0),
    colIndex: ((boxIndex / 3) | 0) * 3 + ((cellIndex / 3) | 0)
  }
}

function getBoxOffset(
  boxIndex: number
): { offsetRow: number; offsetCol: number } {
  return {
    offsetCol: ((boxIndex / 3) | 0) * 3,
    offsetRow: (boxIndex % 3 | 0) * 3
  }
}

export function getBoxCells(matrix: number[][], boxIndex: number): number[] {
  const { offsetRow, offsetCol } = getBoxOffset(boxIndex),
    cells = []

  for (let i = 0; i < 3; i++)
    for (let j = 0; j < 3; j++) cells.push(matrix[offsetRow + i][offsetCol + j])

  return cells
}
