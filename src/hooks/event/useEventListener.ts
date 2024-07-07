import type { Ref } from 'vue'
import { ref, watch, unref } from 'vue'
import { useThrottleFn, useDebounceFn } from '@vueuse/core'

export type RemoveEventFn = () => void
export interface UseEventParams {
  /**
   * 事件对象
   *
   * Event object
   */
  el?: Element | Ref<Element | undefined> | Window | any
  /**
   * 事件名称
   *
   * Event name
   */
  name: string
  // eslint-disable-next-line no-undef
  listener: EventListener
  // eslint-disable-next-line no-undef
  options?: boolean | AddEventListenerOptions
  /**
   * 是否自动移除
   *
   * Whether to remove automatically
   */
  autoRemove?: boolean
  /**
   * 是否防抖
   *
   * Whether to prevent debounce
   */
  isDebounce?: boolean
  /**
   * 等待时间
   *
   * Wait time
   */
  wait?: number
}

/**
 * 使用监听函数
 *
 * Reactive event listener
 */
export function useEventListener({ el = window, name, listener, options, autoRemove = true, isDebounce = true, wait = 80 }: UseEventParams): { removeEvent: RemoveEventFn } {
  let remove: RemoveEventFn = () => {}
  const isAddRef = ref(false)

  if (el) {
    const element = ref(el as Element) as Ref<Element>

    const handler = isDebounce ? useDebounceFn(listener, wait) : useThrottleFn(listener, wait)
    const realHandler = wait ? handler : listener
    const removeEventListener = (e: Element) => {
      isAddRef.value = true
      e.removeEventListener(name, realHandler, options)
    }
    const addEventListener = (e: Element) => e.addEventListener(name, realHandler, options)

    const removeWatch = watch(
      element,
      (v, _ov, cleanUp) => {
        if (v) {
          !unref(isAddRef) && addEventListener(v)
          cleanUp(() => {
            autoRemove && removeEventListener(v)
          })
        }
      },
      { immediate: true },
    )

    remove = () => {
      removeEventListener(element.value)
      removeWatch()
    }
  }
  return { removeEvent: remove }
}
