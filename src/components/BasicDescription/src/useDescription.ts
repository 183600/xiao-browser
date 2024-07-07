import type { BasicDescProps, DescActionMethods, UseDescReturnType } from './typing'

import { ref, getCurrentInstance, unref } from 'vue'

import { isProdMode } from '@/utils/env'
import { error } from '@/utils/log'

/**
 * 定义使用实例
 *
 * Define use instance
 * @param props DescriptionProps
 */
export function useDescription(props?: Partial<BasicDescProps>): UseDescReturnType {
  if (!getCurrentInstance()) {
    error('useDescription() can only be used inside setup() or functional components!')
  }
  const desc = ref<Nullable<DescActionMethods>>(null)
  const loaded = ref(false)
  /**
   * 注册实例
   *
   * Register instance
   * @param instance Description instance
   */
  function register(instance: DescActionMethods) {
    if (unref(loaded) && isProdMode()) {
      return
    }
    desc.value = instance
    props && instance.setDescProps(props)
    loaded.value = true
  }

  const methods: DescActionMethods = {
    /**
     * 设置描述props
     *
     * Set description props
     * @param props DescriptionProps
     */
    setDescProps: (descProps: Partial<BasicDescProps>): void => {
      unref(desc)?.setDescProps(descProps)
    },
  }

  return [register, methods]
}
