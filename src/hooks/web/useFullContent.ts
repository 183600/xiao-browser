import { computed, unref } from 'vue'
import { useRouter } from 'vue-router'

import { useAppStore } from '@/store/modules/app'

/**
 * 处理内容区全屏
 *
 * Reactive full content
 */
export const useFullContent = () => {
  const appStore = useAppStore()
  const router = useRouter()
  const { currentRoute } = router

  /**
   * 获取内容区是否全屏
   *
   * Get whether the content area is full screen
   */
  const getFullContent = computed(() => {
    // Query parameters, the full screen is displayed when the address bar has a full parameter
    const route = unref(currentRoute)
    const query = route.query
    if (query && Reflect.has(query, '__full__')) {
      return true
    }
    // Return to the configuration in the configuration file
    return appStore.getProjectConfig.fullContent
  })

  return { getFullContent }
}
