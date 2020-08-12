import {
  ref,
  Ref,
  watch,
  UnwrapRef,
  getCurrentInstance,
  onUnmounted,
} from 'vue'
import { useDebounceFn } from '../useDebounceFn'

export function useDebounceRef<T extends Ref>(rawValue: T, wait: number): T {
  const debounceValue = ref<UnwrapRef<T>>(rawValue.value)
  const { run } = useDebounceFn<UnwrapRef<T>[]>((newValue) => {
    debounceValue.value = newValue
  }, wait)
  const stop = watch(rawValue, (newValue) => run(newValue))

  if (getCurrentInstance()) {
    onUnmounted(() => stop())
  }

  return debounceValue
}
