class Matrix<T> {
  private _m: T[][]

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
    const transposeMatrix: T[][] = Array.from({ length: colNum }).map(() =>
      Array.from({ length: rowNum })
    )

    for (let c = 0; c < colNum; c++) {
      for (let r = 0; r < rowNum; r++) {
        transposeMatrix[c][r] = this._m[r][c]
      }
    }

    return transposeMatrix
  }
}

export { Matrix }
