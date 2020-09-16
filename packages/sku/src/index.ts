import { Judger, JudgerInstanceType } from './control/judger'
import { SpecGroup, SpuList } from './spec/specGroup'
import { SpuOps, setSpuOps } from './spec/spuOps'
import { SpecInstanceType } from '../src/spec/spec'
import { SpecLineInstanceType } from '../src/spec/specLine'
import { SpecStatus } from './helper/enum'

export function createSkuSelector<T>(
  spuList: SpuList<T>,
  _spuOps?: Partial<SpuOps>
): JudgerInstanceType {
  _spuOps && setSpuOps(_spuOps)
  const sg = new SpecGroup(spuList)
  const judger = new Judger(sg)
  return judger
}

export {
  SpuOps,
  SpecInstanceType,
  SpecLineInstanceType,
  JudgerInstanceType,
  SpecStatus
}
