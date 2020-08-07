type basicType =
  | 'number'
  | 'bigint'
  | 'string'
  | 'boolean'
  | 'function'
  | 'undefined'

function isBasicType(type: basicType): <T>(value: T) => boolean {
  return (value) => {
    const lowercaseType = type.toLowerCase()
    return typeof value === lowercaseType
  }
}

const toString: () => string = Object.prototype.toString
function isTypeByToString(type: string): (value: unknown) => boolean {
  return (value) => toString.call(value).toLowerCase() === `[object ${type}]`
}

export const isNumber = isBasicType('number')

export const isBigint = isBasicType('bigint')

export const isBoolean = isBasicType('boolean')

export const isString = isBasicType('string')

export const isFunction = isBasicType('function')

export const isUndefined = isBasicType('undefined')

export const isUndefinedOrNull = <T>(value: T): boolean => value == null

export const isArray = isTypeByToString('array')

export const isDate = isTypeByToString('date')

export const isRegExp = isTypeByToString('regexp')

export const isNull = <T>(value: T): boolean => value === null

// not null and typeof value is object
export const isObjectLike = <T>(value: T): boolean =>
  typeof value === 'object' && !isNull(value)

// {} Object.create(null) new A()
export const isObject = isTypeByToString('object')

// {} Object.create(null)
export const isPureObject = <T>(value: T): boolean => {
  if (!isObject(value)) return false

  if (Object.getPrototypeOf(value) === null) return true

  let proto = value
  while (Object.getPrototypeOf(proto) !== null) {
    proto = Object.getPrototypeOf(proto)
  }
  return Object.getPrototypeOf(value) === proto
}
