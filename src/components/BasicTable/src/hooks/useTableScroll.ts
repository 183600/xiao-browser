import type { Ref, ComputedRef } from 'vue'
import type { BasicTableProps } from '../typing'

import { computed, unref, watch, nextTick } from 'vue'
import { useDebounceFn } from '@vueuse/core'

import { getViewportOffset } from '@/utils/domUtils'
import { useWindowSizeFn } from '@/hooks/event/useWindowSizeFn'
import { useModalContext } from '@/components/BasicModal'
import { onMountedOrActivated } from '@/hooks/core/onMountedOrActivated'

/**
 * 处理表格高度变化及滚动
 *
 * Handling table height changes and scrolling
 * @param propsRef
 * @param tableElRef
 * @param getDataSourceRef
 */
export function useTableScroll(propsRef: ComputedRef<BasicTableProps>, tableElRef: Ref<ComponentRef>, getDataSourceRef: ComputedRef<Recordable[]>) {
  let paginationEl: HTMLElement | null
  let bodyEl: HTMLElement | null
  const modalFn = useModalContext()

  // 高度刷新防抖
  // Debounce when height changes
  const debounceRedoHeight = useDebounceFn(redoHeight, 200)

  /**
   * 获取自适应高度状态
   *
   * Get adaptive height state
   */
  const getCanResize = computed(() => {
    const { canResize } = unref(propsRef)
    return !!canResize
  })

  /**
   * 刷新高度-重新计算表格高度
   *
   * Redo height - recalculates table height
   */
  function redoHeight() {
    nextTick(() => {
      calcTableHeight()
    })
  }

  /**
   * 计算表格高度
   *
   * Calculate table height
   */
  async function calcTableHeight() {
    const { pagination, maxHeight } = unref(propsRef)
    const tableData = unref(getDataSourceRef)

    const table = unref(tableElRef)
    if (!table) return

    const tableEl: Element = table.$el
    if (!tableEl) return

    if (!bodyEl) {
      bodyEl = tableEl.querySelector('.el-scrollbar__view')
      if (!bodyEl) return
    }

    // 不需要进行计算
    // No calculations required
    if (!unref(getCanResize) || tableData.length === 0) {
      const event = document.createEvent('HTMLEvents')
      event.initEvent('resize', true, true)
      window.dispatchEvent(event)
      return
    }

    bodyEl.style.height = 'unset'

    await nextTick()
    // Add a delay to get the correct bottomIncludeBody paginationHeight headerHeight

    const headEl = tableEl.querySelector('.el-table__header-wrapper ')

    if (!headEl) return

    // Table height from bottom
    const { bottomIncludeBody } = getViewportOffset(headEl)

    // Pager height
    let paginationHeight = 0
    if (typeof pagination !== 'boolean') {
      paginationEl = tableEl?.nextSibling as HTMLElement
      if (paginationEl) {
        const offsetHeight = paginationEl.offsetHeight || 0
        paginationHeight += offsetHeight || 0
      } else {
        paginationHeight += 24
      }
    } else {
      paginationHeight = 0
    }

    // Header table height
    let headerHeight = 0
    if (headEl) {
      headerHeight = (headEl as HTMLElement).offsetHeight
    }

    let height = bottomIncludeBody - paginationHeight - headerHeight

    // 如果给出了最大高度
    // If maxHeight is given
    height = (height > maxHeight! ? (maxHeight as number) : height) ?? height

    bodyEl.style.height = `${height}px`

    try {
      modalFn?.redoModalHeight()
    } catch (error) {
      // try redo modal height
    }
  }

  useWindowSizeFn(debounceRedoHeight, 280)

  onMountedOrActivated(() => {
    debounceRedoHeight()
  })

  watch(
    () => [unref(getCanResize), unref(getDataSourceRef)?.length],
    () => {
      debounceRedoHeight()
    },
    {
      flush: 'post',
    },
  )
  return { redoHeight }
}
