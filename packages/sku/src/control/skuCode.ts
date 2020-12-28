import { currentSpuOps } from './../spec/spuOps'
import { combination } from '@vcake/toolbox'

export class SkuCode {
  code: string
  skuId: number | string = ''
  toltalSpecCombine: string[] = []
  constructor(skuSpecsJoiner: string) {
    this.code = skuSpecsJoiner
    this._combineCode()
  }

  private _combineCode() {
    const splitRes = this.code.split(currentSpuOps.skuCodeJoiner)
    this.skuId = splitRes[0]
    const specIds = splitRes[1].split(currentSpuOps.specCodeJoiner)
    const len = specIds.length
    for (let i = 1; i <= len; i++) {
      const specCombine = combination(specIds, i, (specs) =>
        specs.join(currentSpuOps.specCodeJoiner)
      )
      this.toltalSpecCombine = [...this.toltalSpecCombine, ...specCombine]
    }
  }
}
