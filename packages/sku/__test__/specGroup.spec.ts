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
          specValueId: '2',
          specValueRemark: '黑色',
        },
        {
          specId: 'b',
          specName: '尺寸',
          specValueId: '3',
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
          specValueId: '2',
          specValueRemark: '蓝色',
        },
        {
          specId: 'b',
          specName: '尺寸',
          specValueId: '3',
          specValueRemark: 'S',
        },
      ],
    },
  ]
  test('test init ', () => {
    const judger = createSkuSelector(MockData)
    expect(judger).toBeInstanceOf(Judger)
    expect(judger.pathDict).toEqual([
      'a-2',
      'b-3',
      'a-2#b-3',
      'a-2',
      'b-3',
      'a-2#b-3',
    ])
    judger.specGroup.specLines.forEach((specLine) => {
      specLine.specs.forEach((spec) => {
        expect(spec.status).toBe(SpecStatus.PENDING)
      })
    })
  })
})
