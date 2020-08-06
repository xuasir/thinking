class Matrix<T> {
  private _m: T[][] = null

  constructor(m: T[][]) {
    this._m = m
  }

  getRawMatrix(): T[][] {
    return this._m
  }

  private getRawMatrixColNum(): number {
    let colNum = 0
    try {
      colNum = this._m[0].length
      return colNum
    } catch (e) {
      throw new Error('矩阵列不能为空')
    }
  }

  private getRawMatrixRowNum(): number {
    return this._m.length
  }

  transpose(): T[][] {
    const colNum = this.getRawMatrixColNum()
    const rowNum = this.getRawMatrixRowNum()
    const transposeMatrix: T[][] = Array.from({ length: rowNum }).map(() =>
      Array.from({ length: colNum })
    )
    for (let c = 0; c < colNum; c++) {
      for (let r = 0; r < rowNum; r++) {
        transposeMatrix[r][c] = this._m[c][r]
      }
    }

    return transposeMatrix
  }
}

export { Matrix }
