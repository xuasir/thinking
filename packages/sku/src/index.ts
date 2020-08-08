import { Judger, JudgerInstanceType } from './control/judger'
import { SpecGroup } from './spec/specGroup'
import { SpuOps, setSpuOps } from './spec/spuOps'

export function createSkuSelector<T>(
  spuList: T,
  _spuOps?: SpuOps
): JudgerInstanceType {
  _spuOps && setSpuOps(_spuOps)
  const sg = new SpecGroup(spuList)
  const judger = new Judger(sg)
  return judger
}
