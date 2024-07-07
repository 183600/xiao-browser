import { useAppProviderContext } from '@/components/Application'
import { computed, unref } from 'vue'

/**
 * 使用应用载入
 *
 * Reactive app inject
 */
export function useAppInject() {
  const values = useAppProviderContext()

  /**
   * 是否手机端
   */
  const getIsMobile = computed(() => unref(values.isMobile))

  return {
    getIsMobile,
  }
}
