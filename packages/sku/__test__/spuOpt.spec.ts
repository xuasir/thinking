import { createSkuSelector } from '../src'
import { Judger } from '../src/control/judger'
import { SpecStatus } from '../src/helper/enum'
import { MockData, spuOpt } from './utils'

describe('test sepcGroup ', () => {
  let judger: ReturnType<typeof createSkuSelector>
  beforeEach(() => {
    judger = createSkuSelector(MockData, spuOpt)
  })
  test('test init ', () => {
    expect(judger).toBeInstanceOf(Judger)
    expect(judger.pathDict).toEqual([
      'a-11',
      'b-101',
      'a-11#b-101',
      'a-12',
      'b-102',
      'a-12#b-102',
      'a-12',
      'b-103',
      'a-12#b-103',
    ])
    judger.specGroup.specLines.forEach((specLine) => {
      specLine.specs.forEach((spec) => {
        expect(spec.status).toBe(SpecStatus.PENDING)
      })
    })
  })
})
