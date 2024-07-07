import type { WatchStopHandle } from 'vue'
import type { DynamicProps } from '#/utils'
import type { FormActionMethods } from '@/components/BasicForm'
import type { ElePagination } from '@/components/ElementPlus'
import type { BasicTableProps, TableActionMethods, FetchParams, BasicColumn, GetColumnsParams, UseTableMethod } from '../typing'

import { ref, onUnmounted, unref, watch } from 'vue'

import { getDynamicProps } from '@/utils'
import { isProdMode } from '@/utils/env'
import { error } from '@/utils/log'

/**
 * 定义使用实例
 *
 * Define use instance
 */
export function useTable(tableProps?: Partial<DynamicProps<BasicTableProps>>): [(instance: TableActionMethods, formInstance: UseTableMethod) => void, UseTableMethod] {
  const tableRef = ref<Nullable<TableActionMethods>>(null)
  const loadedRef = ref<Nullable<boolean>>(false)
  const formRef = ref<Nullable<UseTableMethod>>(null)

  let stopWatch: WatchStopHandle
  /**
   * 注册实例
   *
   * Register instance
   * @param instance Table instance
   * @param formInstance Form instance
   */
  function register(instance: TableActionMethods, formInstance: UseTableMethod) {
    isProdMode() &&
      onUnmounted(() => {
        tableRef.value = null
        loadedRef.value = null
      })

    if (unref(loadedRef) && isProdMode() && instance === unref(tableRef)) return

    tableRef.value = instance
    formRef.value = formInstance
    loadedRef.value = true
    tableProps && instance.setTableProps(getDynamicProps(tableProps))

    stopWatch?.()

    stopWatch = watch(
      () => tableProps,
      () => {
        tableProps && instance.setTableProps(getDynamicProps(tableProps))
      },
      {
        immediate: true,
        deep: true,
      },
    )
  }
  /**
   * 获取实例
   *
   * Get instance
   */
  function getTableInstance() {
    const instance = unref(tableRef)
    if (!instance) {
      error('The table instance has not been obtained, please make sure the instance is rendered when performing the instance operation!')
    }
    return instance
  }

  /**
   * 定义实例方法
   *
   * Define instance methods
   */
  const methods: TableActionMethods & {
    getFormRef: () => FormActionMethods
  } = {
    // Element Plus
    clearSelection: () => {
      getTableInstance().clearSelection()
    },
    toggleRowSelection: (row: any, selected: boolean) => {
      getTableInstance().toggleRowSelection(row, selected)
    },
    toggleAllSelection: () => {
      getTableInstance().toggleAllSelection()
    },
    toggleRowExpansion: (row: any, expanded: boolean) => {
      getTableInstance().toggleRowExpansion(row, expanded)
    },
    setCurrentRow: (row: any) => {
      getTableInstance().setCurrentRow(row)
    },
    clearSort: () => {
      getTableInstance().clearSort()
    },
    clearFilter: (columnKeys: string[]) => {
      getTableInstance().clearFilter(columnKeys)
    },
    doLayout: () => {
      getTableInstance().doLayout()
    },
    sort: (prop: string, order: string) => {
      getTableInstance().sort(prop, order)
    },

    // Advanced
    reload: async(opt?: FetchParams) => {
      getTableInstance().reload(opt)
    },
    setTableProps: (props: Partial<BasicTableProps>) => {
      getTableInstance().setTableProps(props)
    },
    getColumns: ({ ignoreIndex = false }: GetColumnsParams = {}) => {
      const columns = getTableInstance().getColumns({ ignoreIndex }) || []
      return columns
    },
    setColumns: (columns: BasicColumn[] | string[]) => {
      getTableInstance().setColumns(columns)
    },
    setLoading: (loading: boolean) => {
      getTableInstance().setLoading(loading)
    },
    getDataSource: () => {
      return getTableInstance().getDataSource()
    },
    getRawDataSource: () => {
      return getTableInstance().getRawDataSource()
    },
    setTableData: <T = Recordable>(values: T[]) => {
      return getTableInstance().setTableData(values)
    },
    getCacheColumns: () => {
      return getTableInstance().getCacheColumns()
    },
    redoHeight: () => {
      getTableInstance().redoHeight()
    },
    setPagination: (info: Partial<ElePagination>) => {
      return getTableInstance().setPagination(info)
    },
    getPagination: () => {
      return getTableInstance().getPagination()
    },
    getFormRef: () => {
      return unref(formRef) as unknown as FormActionMethods
    },
    expandAll: () => {
      getTableInstance().expandAll()
    },
    collapseAll: () => {
      getTableInstance().collapseAll()
    },
    deleteTableDataRecord: (rowKey: string | number) => {
      return getTableInstance().deleteTableDataRecord(rowKey)
    },
    insertTableDataRecord: (record: Recordable | Recordable[], index?: number) => {
      return getTableInstance().insertTableDataRecord(record, index)
    },
    updateTableDataRecord: (rowKey: string | number, record: Recordable) => {
      return getTableInstance().updateTableDataRecord(rowKey, record)
    },
    findTableDataRecord: (rowKey: string | number) => {
      return getTableInstance().findTableDataRecord(rowKey)
    },
    updateTableData: (index: number, key: string, value: any) => {
      return getTableInstance().updateTableData(index, key, value)
    },
  }

  return [register, methods]
}
