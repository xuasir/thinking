import { SpecInstanceType } from '../spec/spec'
import { currentSpuOps } from '../spec/spuOps'

export class SkuPending {
  selectedSpec: (SpecInstanceType | null)[]

  constructor(totalSpecNum: number) {
    this.selectedSpec = Array.from({ length: totalSpecNum })
  }

  selectSpec(row: number, spec: SpecInstanceType): void {
    this.selectedSpec[row] = spec
  }

  cancelSpec(row: number): void {
    this.selectedSpec[row] = null
  }

  sepcIsSelected(row: number, spec: SpecInstanceType): boolean {
    return this.selectedSpec[row] &&
      this.selectedSpec[row]?.specId === spec.specId
      ? true
      : false
  }

  getSpecsJoinWith(row: number, spec: SpecInstanceType): string {
    return this.selectedSpec.reduce((memo, curSpec, curRow) => {
      if (curRow === row) {
        return `${memo}${currentSpuOps.specCodeJoiner}${spec.specJoinQue}`
      } else {
        return `${memo}${currentSpuOps.specCodeJoiner}${curSpec?.specJoinQue}`
      }
    }, '')
  }
}

export type SkuPendingInstanceType = InstanceType<typeof SkuPending>
