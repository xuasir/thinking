import { isObjectLike } from '../types'

function isEqual<T, U>(obj1: T | U, obj2: U | T): boolean {
  // 终止条件
  if (!isObjectLike(obj1) || !isObjectLike(obj2)) {
    return obj1 === obj2
  }

  if (obj1 === obj2) return true

  const obj1Keys = Object.keys(obj1)
  const obj2Keys = Object.keys(obj2)

  if (obj1Keys.length !== obj2Keys.length) return false

  for (const key in <any>obj1) {
    const res = isEqual((<any>obj1)[key], (<any>obj2)[key])
    if (!res) return false
  }

  return true
}

export { isEqual }
