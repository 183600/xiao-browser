import type { TableActionMethods } from '../typing'
import { Ref, unref } from 'vue'
import { error } from '@/utils/log'

/**
 * 方法使用请参考 Element Plus 文档
 *
 * Please refer to Element Plus documentation for method usage
 */
export function useBasicTableFn(tableRef: Ref<TableActionMethods>, handleTableChange: (...arg: any[]) => void, emit: EmitType) {
  function getTable() {
    const table = unref(tableRef)
    if (!table) {
      error('The table instance has not been obtained, please make sure that the table has been rendered when performing the table operation!')
    }
    return table as TableActionMethods
  }
  function clearSelection(): Promise<Recordable> {
    return getTable().clearSelection()
  }
  function getSelectionRows(): Promise<Recordable> {
    return getTable().getSelectionRows()
  }
  function toggleRowSelection(row: any, selected: boolean): Promise<Recordable> {
    return getTable().toggleRowSelection(row, selected)
  }
  function toggleAllSelection(): Promise<Recordable> {
    return getTable().toggleAllSelection()
  }
  function toggleRowExpansion(row: any, expanded: boolean): Promise<Recordable> {
    return getTable().toggleRowExpansion(row, expanded)
  }
  function setCurrentRow(row: any): Promise<Recordable> {
    return getTable().setCurrentRow(row)
  }
  function clearSort(): Promise<Recordable> {
    return getTable().clearSort()
  }
  function clearFilter(columnKeys: string[]): Promise<Recordable> {
    return getTable().clearFilter(columnKeys)
  }
  function doLayout(): Promise<Recordable> {
    return getTable().doLayout()
  }
  function sort(prop: string, order: string): Promise<Recordable> {
    return getTable().sort(prop, order)
  }

  const getBasicEmits = {
    onSelect: (selection, row) => {
      emit('select', selection, row)
    },
    onSelectAll: (selection) => {
      emit('select-all', selection)
    },
    onSelectionChange: (selection) => {
      emit('selection-change', selection)
    },
    onCellMouseEnter: (row, column, cell, event) => {
      emit('cell-mouse-enter', row, column, cell, event)
    },
    onCellMouseLeave: (row, column, cell, event) => {
      emit('cell-mouse-leave', row, column, cell, event)
    },
    onCellClick: (row, column, cell, event) => {
      emit('cell-click', row, column, cell, event)
    },
    onCellDblclick: (row, column, cell, event) => {
      emit('cell-dblclick', row, column, cell, event)
    },
    onCellContextmenu: (row, column, cell, event) => {
      emit('cell-contextmenu', row, column, cell, event)
    },
    onRowClick: (row, column, event) => {
      emit('row-click', row, column, event)
    },
    onRowContextmenu: (row, column, event) => {
      emit('row-contextmenu', row, column, event)
    },
    onRowDblclick: (row, column, event) => {
      emit('row-dblclick', row, column, event)
    },
    onHeaderClick: (column, event) => {
      emit('header-click', column, event)
    },
    onHeaderContextmenu: (column, event) => {
      emit('header-contextmenu', column, event)
    },
    onSortChange: (sorts) => {
      handleTableChange(null, sorts)
      emit('sort-change', { ...sorts })
    },
    onFilterChange: (filters) => {
      handleTableChange(null, null, filters)
      emit('filter-change', filters)
    },
    onCurrentChange: (currentRow, oldCurrentRow) => {
      emit('current-change', currentRow, oldCurrentRow)
    },
    onHeaderDragend: (newWidth, oldWidth, column, event) => {
      emit('header-dragend', newWidth, oldWidth, column, event)
    },
    // onExpandChange: (row, expandedRows_or_expanded) => {
    //   emit('expand-change', row, expandedRows_or_expanded)
    // },
  }

  return {
    // Element plus Events
    getBasicEmits,
    // Element plus Methods
    clearSelection,
    getSelectionRows,
    toggleRowSelection,
    toggleAllSelection,
    toggleRowExpansion,
    setCurrentRow,
    clearSort,
    clearFilter,
    doLayout,
    sort,
  }
}
