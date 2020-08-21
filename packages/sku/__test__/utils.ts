export const MockData = {
  skuList: [
    {
      skuId: '1',
      specs: [
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
      specs: [
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
      specs: [
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
  ],
}

export const spuOpt = {
  getSkuList(spu: any): any {
    return spu.skuList
  },
  getSkuSpecList(sku: any): any {
    return sku.specs
  },
}
