import type { BasicColumn, BasicTableProps, GetColumnsParams } from '../typing'
import type { ComputedRef } from 'vue'
import type { ElePagination } from '@/components/ElementPlus'

import { computed, ref, unref, watch } from 'vue'
import { cloneDeep, isEqual } from 'lodash-es'

import { usePermission } from '@/hooks/web/usePermission'

import { PAGE_SIZE, COLUMN_POSITION_ALIGN } from '../const'

/**
 * 处理表格列
 *
 * Handling table columns
 * @param propsRef
 * @param getPaginationRef
 */
export function useColumns(propsRef: ComputedRef<BasicTableProps>, getPaginationRef: ComputedRef<boolean | ElePagination>) {
  let cacheColumns = unref(propsRef).columns
  const columnsRef = ref(cacheColumns)
  const { hasPermission } = usePermission()

  /**
   * 获取表格列 - 内部
   *
   * Get table columns - inside
   */
  const getColumnsRef = computed(() => {
    const { showIndexColumn, showCheckboxColumn } = unref(propsRef)
    const columns = cloneDeep(unref(columnsRef))

    if (!columns || columns.length === 0) return []

    showIndexColumn && handleIndexColumn(columns, getPaginationRef)
    showCheckboxColumn && handleCheckboxColumn(columns)
    handleActionColumn(columns)

    columns.forEach((item) => {
      handleItem(item)
    })
    return columns
  })

  /**
   * 获取可视列，剔除了无权限或隐藏的列
   *
   * Get visible columns, excluding no premission or hidden ones
   */
  const getViewColumns = computed(() => {
    const viewColumns = sortFixedColumn(unref(getColumnsRef))

    const columns = cloneDeep(viewColumns)
    return columns.filter((column) => {
      return hasPermission(column.auth) && isIfShow(column)
    })
      .map((column) => {
        // Set default value
        if (column.defaultValue && column.defaultValue !== 0) {
          column.formatter = (row, { property, columnKey }) => {
            const item = row[property || columnKey]
            if (!item && item !== 0) {
              return column.defaultValue
            }
            return item
          }
        }
        return column
      })
  })

  /**
   * 更新列，支持列数据或者prop字段集
   *
   * Set columns, Support column data or prop field set
   * @param columnList BasicColumn[] | string[]
   */
  function setColumns(columnList: BasicColumn[] | string[]) {
    if (!Array.isArray(columnList)) return

    const columns = cloneDeep(columnList)

    if (columns.length <= 0) {
      columnsRef.value = []
      return
    }

    const firstColumn = columns[0]

    if (typeof firstColumn !== 'string') {
      columnsRef.value = columns as BasicColumn[]
    } else {
      const cacheKeys = cacheColumns.map((item) => item.prop)
      const columnKeys = columns as string[]
      const newColumns: BasicColumn[] = []

      cacheColumns.forEach((item) => {
        if (columnKeys.includes(item.prop)) {
          newColumns.push({
            ...item,
            defaultHidden: false,
          })
        } else {
          newColumns.push({
            ...item,
            defaultHidden: true,
          })
        }
      })

      // Sort according to another array
      if (!isEqual(cacheKeys, columns)) {
        newColumns.sort((prev, next) => {
          return cacheKeys.indexOf(prev.prop as string) - cacheKeys.indexOf(next.prop as string)
        })
      }
      columnsRef.value = newColumns
    }
  }

  /**
   * 获取表格列
   *
   * Get table columns
   * @param opt GetColumnsParams
   */
  function getColumns(opt?: GetColumnsParams) {
    const { ignoreIndex, ignoreAction, ignoreCheckbox, ignoreExpand, sort } = opt || {}
    let columns = unref(getColumnsRef)

    // 忽略索引列
    // Ignore index columns
    if (ignoreIndex) {
      columns = columns.filter((item) => item.type !== 'index')
    }
    // 忽略操作列
    // Ignore action columns
    if (ignoreAction) {
      columns = columns.filter((item) => item.type !== 'action')
    }
    // 忽略复选框列
    // Ignore checkbox columns
    if (ignoreCheckbox) {
      columns = columns.filter((item) => item.type !== 'selection')
    }
    // 忽略展开列
    // Ignore expand columns
    if (ignoreExpand) {
      columns = columns.filter((item) => item.type !== 'expand')
    }
    // 重新排序列
    // Reorder columns
    if (sort) {
      columns = sortFixedColumn(columns)
    }

    return columns
  }

  /**
   * 获取缓存列
   *
   * Get cache columns
   */
  function getCacheColumns() {
    return cacheColumns
  }

  watch(
    () => unref(propsRef).columns,
    (columns) => {
      if (columns?.length) {
        columnsRef.value = columns
        cacheColumns = columns.filter((item) => !item.type)
      }
    },
  )

  return {
    getColumnsRef,
    getViewColumns,
    getCacheColumns,
    getColumns,
    setColumns,
  }
}

/**
 * 处理列
 *
 * Handle column
 * @param item BasicColumn
 */
function handleItem(item: BasicColumn) {
  const { columnKey, prop, children } = item

  item.align = item.align || COLUMN_POSITION_ALIGN

  if (!columnKey) {
    item.columnKey = prop
  }

  handleChildren(children)
}

/**
 * 处理子列
 *
 * Handle children columns
 * @param children BasicColumn[]
 */
function handleChildren(children: BasicColumn[] | undefined) {
  if (!children || children.length === 0) return

  children.forEach((item) => {
    const { children } = item
    handleItem(item)
    handleChildren(children)
  })
}

/**
 * 处理索引列
 *
 * Handle index column
 * @param columns BasicColumn[]
 * @param getPaginationRef
 */
function handleIndexColumn(columns: BasicColumn[], getPaginationRef: ComputedRef<boolean | ElePagination>) {
  // 如果存在自定义索引列，则不处理
  // If there is a custom index column, it will not be processed
  const hasIndexColumn = columns.some((item) => item.type === 'index')
  if (hasIndexColumn) return

  // 如果存在左固定，则默认左固定
  // If left fixed exists, default left fixed
  const isFixedLeft = columns.some((item) => item.fixed === 'left')

  columns.unshift({
    type: 'index',
    width: 72,
    label: '序号',
    prop: 'columnIndex',
    customRender: ({ index }) => {
      const paginationInfo = unref(getPaginationRef)
      // 如果存在分页，计算所在分页的索引
      // If there is a page, calculate the index of the page where it is located
      if (paginationInfo) {
        const { currentPage = 1, pageSize = PAGE_SIZE } = paginationInfo
        return ((currentPage < 1 ? 1 : currentPage) - 1) * pageSize + index + 1
      }

      return `${index + 1}`
    },
    fixed: isFixedLeft ? 'left' : undefined,
  })
}

/**
 * 处理复选框列
 *
 * Handle checkbox column
 * @param columns BasicColumn[]
 */
function handleCheckboxColumn(columns: BasicColumn[]) {
  // 存在子项则不渲染复选框
  // If there are children, do not render the checkbox
  const hasChildrenColumn = columns.some((item) => item?.children?.length)
  if (hasChildrenColumn) return

  // 如果存在自定义复选框列，则不处理
  // If there is a custom selection column, it will not be processed
  const hasCheckboxColumn = columns.some((item) => item.type === 'selection')
  if (hasCheckboxColumn) return

  const isFixedLeft = columns.some((item) => item.fixed === 'left')

  columns.unshift({
    type: 'selection',
    width: 50,
    prop: 'columnSelection',
    fixed: isFixedLeft ? 'left' : undefined,
  })
}

/**
 * 处理操作列
 *
 * Handle action column
 * @param columns BasicColumn[]
 */
function handleActionColumn(columns: BasicColumn[]) {
  // 如果存在自定义操作列，则不处理
  // If there is a custom action column, it will not be processed
  const hasActionColumn = columns.some((item) => item.type === 'action')
  if (hasActionColumn) return

  // 确认是否存在操作列
  // Check if the action column exists
  const hasIndex = columns.findIndex((column) => column.actions)
  if (hasIndex < 0) return

  const isFixedRight = columns.some((item) => item.fixed === 'right')
  columns[hasIndex] = {
    width: 150,
    label: '操作',
    prop: 'action',
    type: 'action',
    fixed: isFixedRight ? 'right' : undefined,
    ...columns[hasIndex],
  }
}

/**
 * 判断当前列是否需要显示，默认显示
 *
 * Check whether the current column needs to be displayed, default true
 * @param column BasicColumn
 */
function isIfShow(column: BasicColumn): boolean {
  const ifShow = column?.ifShow

  let isIfShow = true

  if (typeof ifShow === 'boolean') {
    isIfShow = ifShow
  }

  if (typeof ifShow === 'function') {
    isIfShow = ifShow(column)
  }

  return isIfShow
}

/**
 * 重新排序列，分离左右固定列并剔除默认隐藏列
 *
 * Reorder columns, separate left and right fixed columns and remove default hidden columns
 * @param columns
 */
function sortFixedColumn(columns: BasicColumn[]) {
  const fixedLeftColumns: BasicColumn[] = []
  const fixedRightColumns: BasicColumn[] = []
  const defColumns: BasicColumn[] = []
  // 左/右固定的放在首尾
  // Left/right fixed at the beginning and end
  for (const column of columns) {
    if (column.fixed === 'left') {
      fixedLeftColumns.push(column)
      continue
    }
    if (column.fixed === 'right') {
      fixedRightColumns.push(column)
      continue
    }
    defColumns.push(column)
  }
  // 剔除默认隐藏列
  // Remove default hidden columns
  return [...fixedLeftColumns, ...defColumns, ...fixedRightColumns].filter((item) => !item.defaultHidden)
}
