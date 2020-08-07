import {
  isNumber,
  isBigint,
  isString,
  isBoolean,
  isFunction,
  isUndefined,
  isNull,
  isUndefinedOrNull,
  isObject,
  isObjectLike,
  isPureObject,
  isArray,
  isDate,
  isRegExp,
} from '../../src'

describe('test types judge', () => {
  const a = (c: number) => c
  class d {}
  test('is basic type ', () => {
    expect(isNumber(1)).toBeTruthy()
    expect(isNumber('1')).toBeFalsy()
    expect(isBigint('1')).toBeFalsy()
    expect(isBigint(1)).toBeFalsy()
    // expect(isBigint(23n)).toBeTruthy()
    expect(isString('11')).toBeTruthy()
    expect(isString(1)).toBeFalsy()
    expect(isBoolean(true)).toBeTruthy()
    expect(isBoolean(false)).toBeTruthy()
    expect(isBoolean(0)).toBeFalsy()
    expect(isFunction(a)).toBeTruthy()
    expect(isFunction(d)).toBeTruthy()

    expect(isNull(null)).toBeTruthy()
    expect(isUndefined(undefined)).toBeTruthy()
    expect(isNull(undefined)).toBeFalsy()
    expect(isUndefined(null)).toBeFalsy()
    expect(isUndefined(null)).toBeFalsy()
    expect(isUndefinedOrNull(null)).toBeTruthy()
    expect(isUndefinedOrNull(undefined)).toBeTruthy()
  })
  test('is object ', () => {
    // 最宽松的 typeof 为object 不包含null
    expect(isObjectLike(null)).toBeFalsy()
    expect(isObjectLike({})).toBeTruthy()
    expect(isObjectLike([])).toBeTruthy()
    expect(isObjectLike(new Date())).toBeTruthy()
    expect(isObjectLike(/abc/)).toBeTruthy()

    // toString 为 [object object]
    expect(isObject(null)).toBeFalsy()
    expect(isObject([])).toBeFalsy()
    expect(isObject(new Date())).toBeFalsy()
    expect(isObject(/abc/)).toBeFalsy()

    expect(isObject({})).toBeTruthy()
    expect(isObject(Object.create(null))).toBeTruthy()

    // 纯对象 {} Object.create(null)
    expect(isPureObject(Object.create(null))).toBeTruthy()
    expect(isPureObject({ a: 1 })).toBeTruthy()

    expect(isPureObject(null)).toBeFalsy()
    expect(isPureObject([])).toBeFalsy()
    expect(isPureObject(new Date())).toBeFalsy()
    expect(isPureObject(/abc+/)).toBeFalsy()
  })
  test('is quote type ', () => {
    expect(isArray([])).toBeTruthy()
    expect(isArray(new Set())).toBeFalsy()
    expect(isDate(new Date())).toBeTruthy()
    expect(isDate(``)).toBeFalsy()
    expect(isRegExp(``)).toBeFalsy()
    expect(isRegExp(/abc/)).toBeTruthy()
  })
})
