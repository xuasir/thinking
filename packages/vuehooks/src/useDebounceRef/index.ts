import { ref, Ref, watch, UnwrapRef } from 'vue'
import { useDebounceFn } from '../useDebounceFn'

export function useDebounceRef<T extends Ref>(rawValue: T, wait: number): T {
  const debounceValue = ref<UnwrapRef<T>>(rawValue.value)
  const { run } = useDebounceFn<UnwrapRef<T>[]>((newValue) => {
    debounceValue.value = newValue
  }, wait)
  watch(rawValue, (newValue) => run(newValue))

  return debounceValue
}
