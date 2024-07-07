import type { ComputedRef } from 'vue'
import type { BasicTableProps } from '../typing'

import { computed, unref, ref, toRaw } from 'vue'

import { warn } from '@/utils/log'

/**
 * 处理展开表格
 *
 * Handle expand table
 * @param propsRef
 * @param tableData
 * @param emit
 */
export function useTableExpand(propsRef: ComputedRef<BasicTableProps>, getDataSourceRef: ComputedRef<Recordable[]>, getRowKey: ComputedRef<string | undefined>) {
  /**
   * 展开的key
   *
   * Expand keys
   */
  const expandRowKeys = ref<string[]>([])

  /**
   * 获取展开选项
   *
   * Get expand option
   */
  const getExpandOptions = computed(() => {
    return {
      expandRowKeys: unref(expandRowKeys),
    }
  })

  /**
   * 展开全部
   *
   * Expand all
   */
  function expandAll() {
    const keys = getTableDataKeys()
    expandRowKeys.value = keys
  }

  /**
   * 收起全部
   *
   * Collapse all
   */
  function collapseAll() {
    expandRowKeys.value = []
  }

  /**
   * 获取表格数据 key
   *
   * Get table data keys
   * @param data Recordable[]
   */
  function getTableDataKeys(data?: Recordable[]) {
    const keys: string[] = []
    const { childrenColumnName } = unref(propsRef)
    const keyName = unref(getRowKey)
    if (!keyName) {
      warn('cannot execute expand/collapse, "rowKey" must exist')
      return
    }

    toRaw(data || unref(getDataSourceRef)).forEach((item) => {
      keys.push(item[keyName as string])

      const children = item[childrenColumnName || 'children']
      if (children?.length) {
        keys.push(...getTableDataKeys(children))
      }
    })

    return keys
  }

  return { getExpandOptions, expandAll, collapseAll }
}
