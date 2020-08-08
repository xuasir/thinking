import { SkuPending, SkuPendingInstanceType } from './skuPending'
import { SpecGroupInstanceType } from './../spec/specGroup'
import { SkuCode } from './skuCode'
import { SpecInstanceType } from '../spec/spec'
import { SpecStatus } from '../helper/enum'

export class Judger {
  specGroup: SpecGroupInstanceType
  pathDict: string[] = []
  skuPending: SkuPendingInstanceType | null = null

  constructor(sg: SpecGroupInstanceType) {
    this.specGroup = sg
    this._initPathDict()
    this._initSkuPending()
  }

  private _initPathDict() {
    this.specGroup.eachSkuIdJoinSpecsId((skuSpecsJoin) => {
      const sc = new SkuCode(skuSpecsJoin)
      this.pathDict = [...this.pathDict, ...sc.toltalSpecCombine]
    })
  }

  private _initSkuPending() {
    const totalSpecNum = this.specGroup.specLines.length
    this.skuPending = new SkuPending(totalSpecNum)
  }

  specTap(spec: SpecInstanceType): void {
    this._changeSpecStatus(spec)
    this._checkOtherSpecStatus()
  }

  private _changeSpecStatus(spec: SpecInstanceType) {
    if (spec.status === SpecStatus.PENDING) {
      this.specGroup.setSpecStatusByPosition(
        spec.row,
        spec.col,
        SpecStatus.SELECTED
      )
      this.skuPending!.selectSpec(
        spec.row,
        this.specGroup.getSpec(spec.row, spec.col)
      )
    }
    if (spec.status === SpecStatus.SELECTED) {
      this.specGroup.setSpecStatusByPosition(
        spec.row,
        spec.col,
        SpecStatus.PENDING
      )
      this.skuPending!.cancelSpec(spec.row)
    }
  }

  private _checkOtherSpecStatus() {
    this.specGroup.eachSpec((spec, row, col) => {
      if (!this.skuPending!.sepcIsSelected(row, spec)) {
        const curSpecJoinQue = this.skuPending!.getSpecsJoinWith(row, spec)
        if (!this._isInPathDict(curSpecJoinQue)) {
          this._disableSpec(row, col)
        }
      }
    })
  }

  private _isInPathDict(specJoinQue: string): boolean {
    return this.pathDict.includes(specJoinQue)
  }

  private _disableSpec(row: number, col: number) {
    this.specGroup.setSpecStatusByPosition(row, col, SpecStatus.DISABLED)
  }
}

export type JudgerInstanceType = InstanceType<typeof Judger>
