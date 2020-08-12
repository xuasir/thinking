import { shallowRef } from 'vue'
import { createSkuSelector } from '@xuguo/sku'

type SKU = {
  specTap(spec: any): void
  skuList: any
}

export function useSku<T>(spu: T): SKU {
  const judger = createSkuSelector(spu)
  const skuList = shallowRef(judger.specGroup.specLines)
  const specTap = (spec: any) => {
    judger.specTap(spec)
    skuList.value = judger.specGroup.specLines.concat()
  }
  return {
    specTap,
    skuList,
  }
}
