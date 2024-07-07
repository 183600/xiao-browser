import { tryOnMounted, tryOnUnmounted, useDebounceFn } from '@vueuse/core'

interface WindowSizeOptions {
  once?: boolean
  immediate?: boolean
  // eslint-disable-next-line no-undef
  listenerOptions?: AddEventListenerOptions | boolean
}

/**
 * 监听窗口大小
 *
 * Reactive window resize event listener
 * @param fn
 * @param wait
 * @param options
 */
export function useWindowSizeFn<T>(fn: Fn<T>, wait = 150, options?: WindowSizeOptions) {
  let handler = () => {
    fn()
  }
  const handleSize = useDebounceFn(handler, wait)
  handler = handleSize

  /**
   * 开始监听
   *
   * Start event listener
   */
  const start = () => {
    if (options && options.immediate) {
      handler()
    }
    window.addEventListener('resize', handler)
  }

  /**
   * 停止监听
   *
   * Stop event listener
   */
  const stop = () => {
    window.removeEventListener('resize', handler)
  }

  tryOnMounted(() => {
    start()
  })

  tryOnUnmounted(() => {
    stop()
  })
  return [start, stop]
}
