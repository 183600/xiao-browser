import type { BasicTableProps } from '../typing'
import type { ElePagination } from '@/components/ElementPlus'

import { computed, unref, ref, ComputedRef, watchEffect } from 'vue'
import { PAGE_SIZE, PAGE_SIZE_OPTIONS, PAGE_LAYOUT_OPTIONS } from '../const'

/**
 * 处理表格分页
 *
 * Handling table pagination
 * @param propsRef
 */
export function usePagination(propsRef: ComputedRef<BasicTableProps>) {
  const configRef = ref<ElePagination>({})

  /**
   * 获取分页信息
   *
   * Get pagination info
   */
  const getTablePagination = computed((): ElePagination => {
    const { pagination, api } = unref(propsRef)

    if (typeof pagination === 'boolean' || (!pagination && (!api || typeof api !== 'function'))) {
      return false
    }

    return {
      // Default
      currentPage: 1,
      defaultCurrentPage: 1,
      pageSize: PAGE_SIZE,
      defaultPageSize: PAGE_SIZE,
      pageSizes: PAGE_SIZE_OPTIONS,
      layout: PAGE_LAYOUT_OPTIONS,
      background: true,
      // init
      ...pagination,
      // dync
      ...unref(configRef),
    }
  })

  /**
   * 更新分页信息
   *
   * Set pagination
   * @param info ElePagination
   */
  function setPagination(info: Partial<ElePagination>) {
    const paginationInfo = unref(getTablePagination)
    configRef.value = {
      ...(paginationInfo || {}),
      ...(info || {}),
    }
  }
  /**
   * 获取分页信息
   *
   * Get pagination
   */
  function getPagination() {
    return unref(getTablePagination)
  }

  watchEffect(() => {
    const { pagination } = unref(propsRef)
    if (typeof pagination !== 'boolean' && pagination) {
      configRef.value = {
        ...pagination,
        ...unref(configRef),
      }
    }
  })

  return { getTablePagination, getPagination, setPagination }
}
