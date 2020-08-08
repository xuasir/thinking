export interface SpuOps {
  skuCodeJoiner: string
  specCodeJoiner: string
  getSkuList(spu: any): any[]
  getSkuSpecList(sku: any): any[]
  getSkuId(sku: any): number | string
  getSpecId(spec: any): number | string
  getspecValueId(spec: any): number | string
  getSpecTitle(spec: any): string
  getspecValue(spec: any): string
}

export let currentSpuOps: SpuOps = {
  skuCodeJoiner: '$',
  specCodeJoiner: '#',
  getSkuList(spu) {
    return spu
  },
  getSkuSpecList(sku) {
    return sku.spuSpecValues
  },
  getSkuId(sku) {
    return sku.skuId
  },
  getSpecId(spec) {
    return spec.specId
  },
  getSpecTitle(spec) {
    return spec.specName
  },
  getspecValueId(spec) {
    return spec.specValueId
  },
  getspecValue(spec) {
    return spec.specValueRemark
  },
}

export function setSpuOps(ops: SpuOps): void {
  currentSpuOps = ops
}
