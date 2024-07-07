import { ref, watch } from 'vue'
import { tryOnUnmounted } from '@vueuse/core'

/**
 * 使用 Timeout 函数
 *
 * Reactive timeout func
 * @param handle 执行的函数
 * @param wait 延后执行时间
 * @param native 是否直接执行函数
 */
export function useTimeoutFn(handle: Fn<any>, wait: number, native = false) {
  if (typeof handle !== 'function') {
    throw new Error('handle is not Function!')
  }

  const { readyRef, stop, start } = useTimeoutRef(wait)
  if (native) {
    handle()
  } else {
    watch(
      readyRef,
      (maturity) => {
        maturity && handle()
      },
      { immediate: false },
    )
  }
  return { readyRef, stop, start }
}

export function useTimeoutRef(wait: number) {
  const readyRef = ref(false)

  let timer: TimeoutHandle
  /**
   * 停止计时器
   *
   * Clear timeout
   */
  function stop(): void {
    readyRef.value = false
    timer && window.clearTimeout(timer)
  }
  /**
   * 启动计时器
   *
   * Star timeout
   */
  function start(): void {
    stop()
    timer = setTimeout(() => {
      readyRef.value = true
    }, wait)
  }

  start()

  tryOnUnmounted(stop)

  return { readyRef, stop, start }
}
