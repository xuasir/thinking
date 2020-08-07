// 1. will create a new object
export function extend<
  T extends Record<string, unknown>,
  U extends Record<string, unknown>
>(obj1: T, obj2: U): T & U {
  const target = <T & U>{}
  for (const key in obj2) {
    ;(<any>target)[key] = (<any>obj2)[key]
  }
  for (const key in obj1) {
    if (!Object.prototype.hasOwnProperty.call(target, key)) {
      ;(<any>target)[key] = (<any>obj1)[key]
    }
  }
  return target
}
