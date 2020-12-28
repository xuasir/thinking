import { SpecLine, SpecLineInstanceType } from './specLine'
import { Matrix } from '@vcake/toolbox'
import { currentSpuOps } from './spuOps'
import { SpecInstanceType } from './spec'
import { SpecStatus } from '../helper/enum'

export type SpuList<T> = {
  [key: string]: T[] | any
}

export class SpecGroup<T, U> {
  private _skuList: T[]
  private _skuSpecsList: U[][] = []
  private _skuIdJoinSpecsId: string[] = []
  specLines: SpecLineInstanceType[] = []

  get skuSpecsList(): U[][] {
    return this._skuSpecsList
  }

  get skuIdJoinSpecsId(): string[] {
    return this._skuIdJoinSpecsId
  }

  constructor(spu_list: SpuList<T>) {
    this._skuList = currentSpuOps.getSkuList(spu_list)
    this._setup()
  }

  private _setup() {
    this._createSkuSpecsList()
    const skuSpecList = this._transposeSkuSpecsList()
    this._createSpecLines(skuSpecList)
  }

  private _createSkuSpecsList() {
    this._skuSpecsList = this._skuList.map((sku) => {
      const specsList: U[] = currentSpuOps.getSkuSpecList(sku)
      this._createSkuIdJoinSpecsId(sku, specsList)
      return specsList
    })
  }

  private _createSkuIdJoinSpecsId(sku: T, specsList: U[]): void {
    const skuId = currentSpuOps.getSkuId(sku)
    let skuIdJoinSpecId = `${skuId}${currentSpuOps.skuCodeJoiner}`
    const specsIds = specsList.map((spec) => {
      const specId = currentSpuOps.getSpecId(spec)
      const specValueId = currentSpuOps.getspecValueId(spec)
      return specValueId ? `${specId}-${specValueId}` : specId
    })
    skuIdJoinSpecId += specsIds.join(currentSpuOps.specCodeJoiner)
    this._skuIdJoinSpecsId.push(skuIdJoinSpecId)
  }

  private _transposeSkuSpecsList() {
    const m = new Matrix(this._skuSpecsList)
    return m.transpose()
  }

  private _createSpecLines(skuSpecList: U[][]) {
    for (let row = 0; row < skuSpecList.length; row++) {
      const specLine = new SpecLine(skuSpecList[row], row)
      this.specLines.push(specLine)
    }
  }

  eachSpec(
    cb: (spec: SpecInstanceType, row: number, col: number) => any
  ): void {
    this.specLines.forEach((specLine, row) => {
      specLine.specs.forEach((spec, col) => {
        cb(spec, row, col)
      })
    })
  }

  getSpec(row: number, col: number): SpecInstanceType {
    return this.specLines[row].specs[col]
  }

  setSpecStatusByPosition(row: number, col: number, status: SpecStatus): void {
    this.specLines[row].specs[col].setStatus(status)
  }

  eachSkuIdJoinSpecsId(cb: (skuSpecsJoin: string) => any): void {
    this._skuIdJoinSpecsId.forEach((que) => {
      cb(que)
    })
  }
}

export type SpecGroupInstanceType = InstanceType<typeof SpecGroup>
