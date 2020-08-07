// type UnwrapFalt<T> = {
//   arr: UnwrapFalt<T>
//   other: T
// }[T extends Array<infer R> ? 'arr' : 'other']

function falt<T>(arr: T[]): any[] {
  const res = Array.prototype.concat.apply([], arr)
  const isDeep = res.some((item) => item instanceof Array)
  if (!isDeep) return res

  return falt(res)
}

export { falt }
