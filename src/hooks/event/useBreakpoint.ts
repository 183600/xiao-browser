import { ref, computed, ComputedRef, unref } from 'vue'
import { useEventListener } from '@/hooks/event/useEventListener'
import { screenMap, sizeEnum, screenEnum } from '@/enums/breakpointEnum'

let globalScreenRef: ComputedRef<sizeEnum | undefined>
let globalWidthRef: ComputedRef<number>
let globalRealWidthRef: ComputedRef<number>

/**
 * 断点回调内容
 *
 * Breakpoint callback info
 */
export interface CreateCallbackParams {
  screen: ComputedRef<sizeEnum | undefined>
  width: ComputedRef<number>
  realWidth: ComputedRef<number>
  screenEnum: typeof screenEnum
  screenMap: Map<sizeEnum, number>
  sizeEnum: typeof sizeEnum
}

/**
 * 使用屏幕断点
 *
 * Reactive screen breakpoint
 */
export function useBreakpoint() {
  return {
    screenRef: computed(() => unref(globalScreenRef)),
    widthRef: globalWidthRef,
    screenEnum,
    realWidthRef: globalRealWidthRef,
  }
}

/**
 * 创建屏幕断点监听
 *
 * Create breakpoint listen
 * @param fn
 */
export function createBreakpointListen(fn?: (opt: CreateCallbackParams) => void) {
  const screenRef = ref<sizeEnum>(sizeEnum.XL)
  const realWidthRef = ref(window.innerWidth)

  /**
   * 获取窗口宽度
   *
   * Get window width
   */
  function getWindowWidth() {
    const width = document.body.clientWidth
    const xs = screenMap.get(sizeEnum.XS)!
    const sm = screenMap.get(sizeEnum.SM)!
    const md = screenMap.get(sizeEnum.MD)!
    const lg = screenMap.get(sizeEnum.LG)!
    const xl = screenMap.get(sizeEnum.XL)!
    if (width < xs) {
      screenRef.value = sizeEnum.XS
    } else if (width < sm) {
      screenRef.value = sizeEnum.SM
    } else if (width < md) {
      screenRef.value = sizeEnum.MD
    } else if (width < lg) {
      screenRef.value = sizeEnum.LG
    } else if (width < xl) {
      screenRef.value = sizeEnum.XL
    } else {
      screenRef.value = sizeEnum.XXL
    }
    realWidthRef.value = width
  }

  useEventListener({
    el: window,
    name: 'resize',

    listener: () => {
      getWindowWidth()
      resizeFn()
    },
  })

  getWindowWidth()
  globalScreenRef = computed(() => unref(screenRef))
  globalWidthRef = computed((): number => screenMap.get(unref(screenRef)!)!)
  globalRealWidthRef = computed((): number => unref(realWidthRef))

  function resizeFn() {
    fn?.({
      screen: globalScreenRef,
      width: globalWidthRef,
      realWidth: globalRealWidthRef,
      screenEnum,
      screenMap,
      sizeEnum,
    })
  }

  resizeFn()
  return {
    screenRef: globalScreenRef,
    screenEnum,
    widthRef: globalWidthRef,
    realWidthRef: globalRealWidthRef,
  }
}
