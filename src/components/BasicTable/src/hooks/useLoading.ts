import type { BasicTableProps } from '../typing'

import { ref, ComputedRef, unref, computed, watch } from 'vue'

/**
 * 处理表格加载
 *
 * Handling table loading state
 * @param props
 */
export function useLoading(props: ComputedRef<BasicTableProps>) {
  const loadingRef = ref(false)

  /**
   * 获取加载状态
   *
   * Get loading state
   */
  const getLoading = computed(() => unref(loadingRef))

  /**
   * 更新加载状态
   *
   * Set loading state
   * @param loading
   */
  function setLoading(loading: boolean) {
    loadingRef.value = loading
  }

  watch(
    () => unref(props).loading,
    (v) => {
      loadingRef.value = v
    },
  )

  return { getLoading, setLoading }
}
