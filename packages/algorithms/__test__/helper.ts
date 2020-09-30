import { performance, PerformanceObserver } from 'perf_hooks'

export function getRandomArray(size: number, range: number): number[] {
  const arr = []
  for (let i = 0; i < size; i++) arr.push(Math.floor(Math.random() * range))
  return arr
}

export function withPerformance<T extends (...args: any[]) => any>(
  fn: T,
  title = 'fn'
) {
  return (...args: Parameters<T>): ReturnType<T> => {
    let res = null

    performance.mark(`${title}-start`)
    res = fn(...args)
    performance.mark(`${title}-end`)
    performance.measure(title, `${title}-start`, `${title}-end`)
    measurePerf()
    return res
  }
}

function measurePerf() {
  const userTimingObserver = new PerformanceObserver(list => {
    list
      .getEntries()
      .map(({ name, entryType, startTime, duration }) => {
        const obj = {
          Duration: duration,
          'Entry Type': entryType,
          Name: name,
          'Start Time': startTime
        }
        return JSON.stringify(obj, null, 2)
      })
      .forEach(console.log)
    userTimingObserver.disconnect()
  })
  userTimingObserver.observe({ entryTypes: ['mark', 'measure'] })
}
