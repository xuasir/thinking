import { isUndefinedOrNull } from '@vcake/toolbox'
import { SpecInstanceType } from '../spec/spec'
import { currentSpuOps } from '../spec/spuOps'

export class SkuPending {
  selectedSpec: (SpecInstanceType | null)[]
  hooks: any[] = []

  constructor(totalSpecNum: number) {
    this.selectedSpec = Array.from({ length: totalSpecNum })
  }

  selectSpec(row: number, spec: SpecInstanceType): void {
    this.selectedSpec[row] = spec
    if (this.checkIsGenASku()) {
      this.hooks.forEach((cb) => {
        cb(this.getSpecsJoin())
      })
    }
  }

  cancelSpec(row: number): void {
    this.selectedSpec[row] = null
  }

  sepcIsSelected(row: number, spec: SpecInstanceType): boolean {
    return this.selectedSpec[row] &&
      this.selectedSpec[row]?.specJoinQue === spec.specJoinQue
      ? true
      : false
  }

  getSpecsJoinWith(row: number, spec: SpecInstanceType): string {
    return this.selectedSpec.reduce((memo, curSpec, curRow) => {
      if (curRow === row) {
        return memo
          ? `${memo}${currentSpuOps.specCodeJoiner}${spec.specJoinQue}`
          : spec.specJoinQue
      } else {
        return memo
          ? curSpec
            ? `${memo}${currentSpuOps.specCodeJoiner}${curSpec.specJoinQue}`
            : memo
          : curSpec
          ? curSpec.specJoinQue
          : ''
      }
    }, '')
  }

  combineHook(cb: (...args: any[]) => any): void {
    this.hooks.push(cb)
  }

  checkIsGenASku(): boolean {
    return !this.selectedSpec.some(isUndefinedOrNull)
  }

  getSpecsJoin(): string {
    return this.selectedSpec
      .map((spec) => spec?.specJoinQue)
      .join(currentSpuOps.specCodeJoiner)
  }
}

export type SkuPendingInstanceType = InstanceType<typeof SkuPending>
