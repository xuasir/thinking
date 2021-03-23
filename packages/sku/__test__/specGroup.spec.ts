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
          specValueRemark: '黑色'
        },
        {
          specId: 'b',
          specName: '尺寸',
          specValueId: '3',
          specValueRemark: 'L'
        }
      ]
    },
    {
      skuId: '2',
      spuSpecValues: [
        {
          specId: 'a',
          specName: '颜色',
          specValueId: '3',
          specValueRemark: '蓝色'
        },
        {
          specId: 'b',
          specName: '尺寸',
          specValueId: '4',
          specValueRemark: 'S'
        }
      ]
    }
  ]
  let judger: ReturnType<typeof createSkuSelector>
  beforeEach(() => {
    judger = createSkuSelector(MockData)
  })
  test('test init ', () => {
    expect(judger).toBeInstanceOf(Judger)
    expect(judger.pathDict).toEqual([
      'a-2',
      'b-3',
      'a-2#b-3',
      'a-3',
      'b-4',
      'a-3#b-4'
    ])
    judger.specGroup.specLines.forEach((specLine) => {
      specLine.specs.forEach((spec) => {
        expect(spec.status).toBe(SpecStatus.PENDING)
      })
    })
  })

  test('test tap spec', () => {
    judger.specTap(judger.specGroup.specLines[0].specs[0])
    /*
     * 00、11 --> combine
     * 01、10 --> disabled
     */
    expect(judger.specGroup.specLines[0].specs[0].status).toBe(
      SpecStatus.SELECTED
    )
    expect(judger.specGroup.specLines[0].specs[1].status).toBe(
      SpecStatus.PENDING
    )
    expect(judger.specGroup.specLines[1].specs[0].status).toBe(
      SpecStatus.PENDING
    )
    expect(judger.specGroup.specLines[1].specs[1].status).toBe(
      SpecStatus.DISABLED
    )
    // back to default
    judger.specTap(judger.specGroup.specLines[0].specs[0])

    judger.specGroup.specLines.forEach((specLine) => {
      specLine.specs.forEach((spec) => {
        expect(spec.status).toBe(SpecStatus.PENDING)
      })
    })
  })

  test('on combined sku', () => {
    let skuIdStr = ''
    let specsJoinStr = ''
    judger.onSkuCombined((skuId, specsJoin) => {
      skuIdStr = skuId
      specsJoinStr = specsJoin
    })
    judger.specTap(judger.specGroup.specLines[0].specs[0])
    judger.specTap(judger.specGroup.specLines[1].specs[0])

    expect(skuIdStr).toBe('1')
    expect(specsJoinStr).toBe('a-2#b-3')
  })

  test('test tap spec change', () => {
    judger.specTap(judger.specGroup.specLines[0].specs[0])
    judger.specTap(judger.specGroup.specLines[1].specs[0])
    /*
     * 00、11 --> combine
     * 01、10 --> disabled
     */
    expect(judger.specGroup.specLines[0].specs[0].status).toBe(
      SpecStatus.SELECTED
    )
    expect(judger.specGroup.specLines[0].specs[1].status).toBe(
      SpecStatus.DISABLED
    )
    expect(judger.specGroup.specLines[1].specs[0].status).toBe(
      SpecStatus.SELECTED
    )
    expect(judger.specGroup.specLines[1].specs[1].status).toBe(
      SpecStatus.DISABLED
    )
  })
})
