import { ref, unref } from 'vue'

export interface ScrollToParams {
  el: any
  to: number
  duration?: number
  callback?: () => any
}

/**
 * 创建动画曲线
 *
 * Creat easeinout timing-function
 */
const easeInOutQuad = (t: number, b: number, c: number, d: number) => {
  t /= d / 2
  if (t < 1) {
    return (c / 2) * t * t + b
  }
  t--
  return (-c / 2) * (t * (t - 2) - 1) + b
}

/**
 * 滚动到指定位置
 *
 * Reactive Scroll to the specified position
 */
export function useScrollTo({ el, to, duration = 500, callback }: ScrollToParams) {
  const isActiveRef = ref(false)
  const start = el.scrollTop ?? 0
  const change = to - start
  const increment = 20
  let currentTime = 0
  duration = duration ?? 500

  const animateScroll = function() {
    if (!unref(isActiveRef)) {
      return
    }
    currentTime += increment
    const val = easeInOutQuad(currentTime, start, change, duration)
    el.scrollTop = val
    if (currentTime < duration && unref(isActiveRef)) {
      requestAnimationFrame(animateScroll)
    } else {
      if (typeof callback === 'function') {
        callback()
      }
    }
  }
  const run = () => {
    isActiveRef.value = true
    animateScroll()
  }

  const stop = () => {
    isActiveRef.value = false
  }

  return { start: run, stop }
}
