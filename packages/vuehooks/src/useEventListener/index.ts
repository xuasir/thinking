import { Ref, onMounted, isRef, onUnmounted } from 'vue'

type TargetType = HTMLElement | Ref<HTMLElement> | (() => HTMLElement) | Window

export function useEventListener<T extends keyof WindowEventMap>(
  type: T,
  handler: (this: Window, event: WindowEventMap[T]) => any,
  target?: TargetType,
  options?: boolean | AddEventListenerOptions
): void
export function useEventListener<T extends keyof HTMLElementEventMap>(
  type: T,
  handler: (this: HTMLElement, event: HTMLElementEventMap[T]) => any,
  target?: TargetType,
  options?: boolean | AddEventListenerOptions
): void
export function useEventListener(
  type: string,
  handler: EventListenerOrEventListenerObject,
  target?: TargetType,
  options?: boolean | AddEventListenerOptions
): void
export function useEventListener(
  type: string,
  handler: EventListenerOrEventListenerObject,
  target: TargetType = window,
  options?: boolean | AddEventListenerOptions
): void {
  let element: HTMLElement | Window
  onMounted(() => {
    element =
      typeof target === 'function'
        ? target()
        : isRef(target)
        ? target.value
        : target
    element.addEventListener(type, handler, options)
  })
  onUnmounted(() => {
    element.removeEventListener(type, handler, options)
  })
}
