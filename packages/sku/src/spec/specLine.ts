import { currentSpuOps } from './spuOps'
import { SpecInstanceType, Spec } from './spec'

export class SpecLine<T> {
  specLineTitle = ''
  specs: SpecInstanceType[] = []
  row: number

  constructor(_specs: T[], _row: number) {
    this.row = _row
    this.specLineTitle = currentSpuOps.getSpecTitle(_specs[0])
    this._init(_specs)
  }

  private _init(specs: T[]) {
    specs.map((s, col) => {
      if (!this._specIsRepeact(s)) {
        const spec = new Spec(s, this.row, col)
        this.specs.push(spec)
      }
    })
  }

  private _specIsRepeact(spec: T): boolean {
    return this.specs.findIndex(
      (curSpec) =>
        `${curSpec.specId}-${curSpec.specValueId}` ===
        `${currentSpuOps.getSpecId(spec)}-${currentSpuOps.getspecValueId(spec)}`
    ) > -1
      ? true
      : false
  }
}

export type SpecLineInstanceType = InstanceType<typeof SpecLine>
