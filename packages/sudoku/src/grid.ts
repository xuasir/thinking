import { makeMatrix, makeRow, shffule, fillNumAble } from './utils/matrix'
import { resetMarks } from './checker'

export let grid: number[][] = []
let _level = 5

export function generate(): void {
  grid = makeMatrix()
  // 填写1-9的数字
  // 存在几率出现错误解 直至正确解出现
  // eslint-disable-next-line no-empty
  while (!innerGenerate()) {}
}

function innerGenerate(): boolean {
  for (let i = 1; i < 10; i++) {
    if (!fillRow(i, 0)) {
      return false
    }
  }
  return true
}

function fillRow(n: number, rowIndex: number): boolean {
  if (rowIndex > 8) return true
  const rows = grid[rowIndex]
  const orders = generateOrder()
  // 随机填入当前行的各个位置
  for (let i = 0; i < 9; i++) {
    const colIndex = orders[i]
    if (rows[colIndex] > 0) continue
    if (!fillNumAble(grid, n, rowIndex, colIndex)) continue
    rows[colIndex] = n
    if (!fillRow(n, rowIndex + 1)) {
      // 回溯
      rows[colIndex] = -1
      continue
    }
    return true
  }
  return false
}

function generateOrder(): number[] {
  return shffule(makeRow().map((_, i) => i))
}

export function makeGrid(level = 5): number[][] {
  _level = level
  generate()
  return grid.map((cells) =>
    cells.map((cell) => (Math.random() * 9 < _level ? 0 : cell))
  )
}

export function remakeGrid(): number[][] {
  resetMarks()
  return grid.map((cells) =>
    cells.map((cell) => (Math.random() * 9 < _level ? 0 : cell))
  )
}
