### sku算法库
主要实现前端 sku规格切换的逻辑层

### 使用情况
该库让使用者不再关心逻辑，暂时对外仅提供一个接口`createSkuSelector`:  
希望您的数据结构符合如下：
```js
spu: {
  // ...spuAttrs
  skuList: [
    {
      // ...skuAttrs,
      skuIdKey: val,
      specsLsit: [
        {
          specId: val,
          specName: name,
          specValue: val,
          specValueId: id,
          // ...otherAttrs
        }
        // ...
      ]
    }
    // ...
  ]
}
```
本库仅对数据结构有如上要求，可通过`spuOps`来定义如何获取相应数据
> 1. 初始化
```js
import { createSkuSelector } from '@xuguo/sku'
let judger = createSkuSelector(spulist, spuOps)
```

> 2. 如何得到数据
```js
judger.specLines[index].specs[index]
```

> 3. 如何处理规格点击事件
```js
judger.specTap(spec)
```

> 4. 规格对象的状态
规格状态来自下面的枚举类，状态在内部完成修改
```ts
enum SpecStatus {
  PENDING = 'pending',
  DISABLED = 'disabled',
  SELECTED = 'selected',
}
// judger.specLines[row].specs[col].status
```

> 5. 如何得到skuId和specsId
`onSkuCombined`的回调时机在，点击勾选规格完成后构成一个sku的时候
```js
judger.onSkuCombined((skuId, specsIdJoin) => {
  // Do something
})
```