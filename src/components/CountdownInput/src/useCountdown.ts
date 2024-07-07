import { ref, unref } from 'vue'
import { tryOnUnmounted } from '@vueuse/core'

/**
 * 倒计时方法
 *
 * countdown func
 *
 * @param count 倒计时时间(s)
 */
export function useCountdown(count: number) {
  const currentCount = ref(count)

  const isStart = ref(false)

  let timerId: ReturnType<typeof setInterval> | null
  /**
   * 清除倒计时
   *
   * clear countdown
   */
  function clear() {
    timerId && window.clearInterval(timerId)
  }
  /**
   * 停止倒计时
   *
   * stop countdown
   */
  function stop() {
    isStart.value = false
    clear()
    timerId = null
  }
  /**
   * 启动倒计时
   *
   * start countdown
   */
  function start() {
    if (unref(isStart) || !!timerId) {
      return
    }
    isStart.value = true
    timerId = setInterval(() => {
      if (unref(currentCount) === 1) {
        stop()
        currentCount.value = count
      } else {
        currentCount.value -= 1
      }
    }, 1000)
  }
  /**
   * 重置倒计时
   *
   * reset countdown
   */
  function reset() {
    currentCount.value = count
    stop()
  }
  /**
   * 重启倒计时
   *
   * restart countdown
   */
  function restart() {
    reset()
    start()
  }

  tryOnUnmounted(() => {
    reset()
  })

  return {
    currentCount,
    isStart,
    start,
    reset,
    restart,
    clear,
    stop,
  }
}
