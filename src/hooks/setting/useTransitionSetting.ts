import type { TransitionSetting } from '#/config'

import { computed } from 'vue'

import { useAppStore } from '@/store/modules/app'

/**
 * 使用页面过渡配置项
 *
 * Reactive page transition setting
 */
export function useTransitionSetting() {
  const appStore = useAppStore()

  /**
   * 获取是否开启页面过渡动画
   */
  const getEnableTransition = computed(() => appStore.getTransitionSetting?.enable)

  /**
   * 获取是否开启页面进度条
   */
  const getOpenNProgress = computed(() => appStore.getTransitionSetting?.openNProgress)

  /**
   * 获取是否开启页面加载动画
   */
  const getOpenPageLoading = computed((): boolean => {
    return !!appStore.getTransitionSetting?.openPageLoading
  })

  /**
   * 获取路由切换过渡动画
   */
  const getBasicTransition = computed(() => appStore.getTransitionSetting?.basicTransition)

  /**
   * 修改页面过渡配置项
   *
   * Set transition configuration
   * @param transitionSetting
   */
  function setTransitionSetting(transitionSetting: Partial<TransitionSetting>) {
    appStore.setProjectConfig({ transitionSetting })
  }
  return {
    setTransitionSetting,

    getEnableTransition,
    getOpenNProgress,
    getOpenPageLoading,
    getBasicTransition,
  }
}
