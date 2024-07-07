import { getCurrentInstance, onBeforeUnmount, ref, Ref, shallowRef, unref } from 'vue'

import { useRafThrottle } from '@/utils/domUtils'
import { addResizeListener, removeResizeListener } from '@/utils/event'

const domSymbol = Symbol('watermark-dom')

/**
 * 元素节点的水印处理
 *
 * Watermark elements
 * @param appendEl HTMLElement
 */
export function useWatermark(appendEl: Ref<HTMLElement | null> = ref(document.body) as Ref<HTMLElement>) {
  const func = useRafThrottle(function() {
    const el = unref(appendEl)
    if (!el) return
    const { clientHeight: height, clientWidth: width } = el
    updateWatermark({ height, width })
  })
  const id = domSymbol.toString()
  const watermarkEl = shallowRef<HTMLElement>()

  /**
   * 清除节点水印
   *
   * Clear dom watermark
   */
  const clear = () => {
    const domId = unref(watermarkEl)
    watermarkEl.value = undefined
    const el = unref(appendEl)
    if (!el) return
    domId && el.removeChild(domId)
    removeResizeListener(el, func)
  }

  /**
   * 字符串转base64格式的图片
   *
   * Convert strings to pictures in base64 format
   * @param str string
   */
  function createBase64(str: string) {
    const can = document.createElement('canvas')
    const width = 300
    const height = 240
    Object.assign(can, { width, height })

    const cans = can.getContext('2d')
    if (cans) {
      cans.rotate((-20 * Math.PI) / 120)
      cans.font = '15px Vedana'
      cans.fillStyle = 'rgba(0, 0, 0, 0.15)'
      cans.textAlign = 'left'
      cans.textBaseline = 'middle'
      cans.fillText(str, width / 20, height)
    }
    return can.toDataURL('image/png')
  }

  /**
   * 更新水印
   *
   * Update watermark
   * @param options
   */
  function updateWatermark(
    options: {
      width?: number
      height?: number
      str?: string
    } = {},
  ) {
    const el = unref(watermarkEl)
    if (!el) return
    if (options?.width) {
      el.style.width = `${options.width}px`
    }
    if (options?.height) {
      el.style.height = `${options.height}px`
    }
    if (options?.str) {
      el.style.background = `url(${createBase64(options.str)}) left top repeat`
    }
  }

  /**
   * 创建水印
   *
   * Create watermark
   * @param str string
   */
  const createWatermark = (str: string) => {
    if (unref(watermarkEl)) {
      updateWatermark({ str })
      return id
    }
    const div = document.createElement('div')
    watermarkEl.value = div
    div.id = id
    div.style.pointerEvents = 'none'
    div.style.top = '0px'
    div.style.left = '0px'
    div.style.position = 'absolute'
    div.style.zIndex = '100000'
    const el = unref(appendEl)
    if (!el) return id
    const { clientHeight: height, clientWidth: width } = el
    updateWatermark({ str, width, height })
    el.appendChild(div)
    return id
  }

  /**
   * 设置水印
   *
   * Set watermark
   * @param str string
   */
  function setWatermark(str: string) {
    createWatermark(str)
    addResizeListener(document.documentElement, func)
    const instance = getCurrentInstance()
    if (instance) {
      onBeforeUnmount(() => {
        clear()
      })
    }
  }

  return { setWatermark, clear }
}
