import { createSkuSelector } from '../src'
import { Judger } from '../src/control/judger'
import { SpecStatus } from '../src/helper/enum'

describe('test sepcGroup ', () => {
  const MockData = [
    {
      skuId: '1',
      spuSpecValues: [
        {
          specId: 'a',
          specName: '颜色',
          specValueId: '11',
          specValueRemark: '黑色',
        },
        {
          specId: 'b',
          specName: '尺寸',
          specValueId: '101',
          specValueRemark: 'L',
        },
      ],
    },
    {
      skuId: '2',
      spuSpecValues: [
        {
          specId: 'a',
          specName: '颜色',
          specValueId: '12',
          specValueRemark: '绿色',
        },
        {
          specId: 'b',
          specName: '尺寸',
          specValueId: '102',
          specValueRemark: 'S',
        },
      ],
    },
    {
      skuId: '2',
      spuSpecValues: [
        {
          specId: 'a',
          specName: '颜色',
          specValueId: '12',
          specValueRemark: '绿色',
        },
        {
          specId: 'b',
          specName: '尺寸',
          specValueId: '103',
          specValueRemark: 'XS',
        },
      ],
    },
  ]
  let judger: ReturnType<typeof createSkuSelector>
  beforeEach(() => {
    judger = createSkuSelector(MockData)
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
