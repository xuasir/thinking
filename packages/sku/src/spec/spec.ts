import { SpecStatus } from '../helper/enum'
import { currentSpuOps } from './spuOps'

export class Spec<T> {
  specValue: string
  specId: string | number
  specValueId: number | string
  status: SpecStatus = SpecStatus.PENDING
  row: number
  col: number

  get specJoinQue(): string {
    return this.specValueId
      ? `${this.specId}-${this.specValueId}`
      : `${this.specId}`
  }

  setStatus(status: SpecStatus): void {
    this.status = status
  }

  constructor(spec: T, _row: number, _col: number) {
    this.row = _row
    this.col = _col
    this.specValue = currentSpuOps.getspecValue(spec)
    this.specId = currentSpuOps.getSpecId(spec)
    this.specValueId = currentSpuOps.getspecValueId(spec)
  }
}

export type SpecInstanceType = InstanceType<typeof Spec>
