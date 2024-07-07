import type { ElePagination } from '@/components/ElementPlus'
import type { BasicTableProps, FetchParams, ColumnSorterResult } from '../typing'

import { ref, unref, ComputedRef, computed, onMounted, watch, Ref, watchEffect, toRaw } from 'vue'
import { get, cloneDeep } from 'lodash-es'

import { buildUUID } from '@/utils'

import { FETCH_SETTING, ROW_KEY, PAGE_SIZE } from '../const'

/**
 * 处理表格数据
 *
 * Process tabular data
 * @param propsRef
 * @param tableData
 * @param paginationRef
 * @param setPagination
 * @param setLoading
 * @param getFieldsValue
 * @param emit
 */
export function useDataSource(
  propsRef: ComputedRef<BasicTableProps>,
  tableData: Ref<Recordable[]>,
  paginationRef: ComputedRef<ElePagination>,
  setPagination: (info: Partial<ElePagination>) => void,
  setLoading: (loading: boolean) => void,
  getFieldsValue: () => Recordable,
  emit: EmitType,
) {
  const sortInfo = ref<Recordable>({})
  const filterInfo = ref<Recordable>({})

  const dataSourceRef = ref<Recordable[]>([])
  const rawDataSourceRef = ref<Recordable>({})

  /**
   * 判断是否自动创建 key
   *
   * Determine whether to automatically create a key
   */
  const getAutoCreateKey = computed(() => {
    return unref(propsRef).autoCreateKey && !unref(propsRef).rowKey
  })
  /**
   * 获取行记录的 key
   *
   * Get the key of the row record
   */
  const getRowKey = computed(() => {
    const { rowKey } = unref(propsRef)
    const keyName = unref(getAutoCreateKey) ? ROW_KEY : rowKey
    if (typeof keyName === 'function') {
      return keyName(rowKey) as string
    }
    return keyName
  })
  /**
   * 统一处理表格数据
   *
   * Unified processing of tabular data
   */
  const getDataSourceRef = computed(() => {
    const dataSource = unref(dataSourceRef)
    if (!dataSource || dataSource.length === 0) {
      return []
    }

    // auto create key
    if (unref(getAutoCreateKey)) {
      const firstItem = dataSource[0]
      const lastItem = dataSource[dataSource.length - 1]
      const keyName = unref(getRowKey)

      if (firstItem && lastItem) {
        if (!firstItem[keyName] || !lastItem[keyName]) {
          const data = cloneDeep(unref(dataSourceRef))
          data.forEach((item) => {
            if (!item[keyName]) {
              item[keyName] = buildUUID()
            }
            if (item.children && item.children.length) {
              setTableKey(item.children)
            }
          })
          dataSourceRef.value = data
        }
      }
    }

    return unref(dataSourceRef)
  })

  /**
   * 表格导航、筛选、排序等内容改变时触发
   *
   * Triggered when table navigation, filtering, sorting, etc. change
   *
   * @param pagination ElePagination
   * @param sorter ColumnSorterResult
   * @param filters
   */
  function handleTableChange(pagination: Partial<ElePagination>, sorter?: ColumnSorterResult, filters?: Partial<Recordable<string[]>>) {
    const { sortFn, filterFn } = unref(propsRef)
    // 更新了分页
    // Pagination updated
    if (pagination) {
      setPagination(pagination)
    }
    // 更新了排序
    // Sort updated
    if (sorter && typeof sortFn === 'function') {
      sortInfo.value = sortFn(sorter)
    }
    // 更新了筛选
    // Filter updated
    if (filters && typeof filterFn === 'function') {
      filterInfo.value = filterFn(filters)
    }
    fetch()
  }
  /**
   * 设置表格项 Key
   *
   * Set the table item Key
   * @param items
   */
  function setTableKey(items: any[]) {
    if (!items || !Array.isArray(items)) return
    items.forEach((item) => {
      if (!item[ROW_KEY]) {
        item[ROW_KEY] = buildUUID()
      }
      if (item.children && item.children.length) {
        setTableKey(item.children)
      }
    })
  }

  /**
   * 更新表格数据，与 updateTableDataRecord 不同的是，这个可以单独修改某行的某个字段
   *
   * Update table data, unlike updateTableDataRecord, this one can modify a field of a row individually
   * @param index 所在行的索引
   * @param prop 需要修改的 prop
   * @param value 修改后的值
   */
  function updateTableData(index: number, prop: string, value: any) {
    const record = dataSourceRef.value[index]
    if (record) {
      dataSourceRef.value[index][prop] = value
    }
    return dataSourceRef.value[index]
  }

  /**
   * 根据 key 更新指定行的整行的记录，key必须存在
   *
   * Update the record of the entire row of the specified row according to the key, key must exist
   * @param rowKey
   * @param record 新记录
   */
  function updateTableDataRecord(rowKey: string | number, record: Recordable): Recordable | undefined {
    const row = findTableDataRecord(rowKey)

    if (row) {
      for (const field in row) {
        if (Reflect.has(record, field)) row[field] = record[field]
      }
      return row
    }
  }
  /**
   * 根据 key 删除指定行记录，key必须存在
   *
   * Delete the specified row record according to the key, the key must exist
   * @param rowKey
   */
  function deleteTableDataRecord(rowKey: string | number): Recordable | undefined {
    if (!dataSourceRef.value || dataSourceRef.value.length === 0) return

    const recordIndex = dataSourceRef.value.findIndex((s) => s.key === rowKey)
    if (recordIndex > -1) {
      unref(dataSourceRef).splice(recordIndex, 1)
    }

    const total = unref(paginationRef)?.total || 0
    setPagination({
      total: total > 0 ? total - 1 : 0,
    })

    return unref(dataSourceRef)
  }

  /**
   * 插入一条记录，如果索引存在，则插入索引的位置，否则插入最后的位置
   *
   * Insert a record, if the index exists, insert the position of the index, otherwise insert at the last position
   * @param record 插入的记录
   * @param index 索引
   */
  function insertTableDataRecord(record: Recordable, index: number): Recordable | undefined {
    if (!dataSourceRef.value || dataSourceRef.value.length === 0) return

    index = index ?? dataSourceRef.value?.length
    unref(dataSourceRef).splice(index, 0, record)

    return unref(dataSourceRef)
  }

  /**
   * 根据 key 查找所在行记录
   *
   * Find the row record based on the key
   * @param rowKey
   */
  function findTableDataRecord(rowKey: string | number) {
    if (!dataSourceRef.value || dataSourceRef.value.length === 0) return

    const rowKeyName = unref(getRowKey)
    if (!rowKeyName) return

    const { childrenColumnName = 'children' } = unref(propsRef)

    const findRow = (array: any[]) => {
      let ret
      array.some(function iter(r) {
        if (Reflect.has(r, rowKeyName) && r[rowKeyName] === rowKey) {
          ret = r
          return true
        }

        return r[childrenColumnName] && r[childrenColumnName].some(iter)
      })
      return ret
    }

    return findRow(dataSourceRef.value)
  }

  /**
   * 更新表格数据
   *
   * Set table data
   * @param values T[]
   */
  function setTableData<T = Recordable>(values: T[]) {
    dataSourceRef.value = values
  }

  /**
   * 获取处理后的表格数据
   *
   * Get the processed table data
   */
  function getDataSource<T = Recordable>() {
    return toRaw(getDataSourceRef.value as T[])
  }

  /**
   * 获取未处理的原始的接口数据
   *
   * Get unprocessed raw api data
   */
  function getRawDataSource<T = Recordable>() {
    return toRaw(rawDataSourceRef.value as T)
  }

  /**
   * 获取服务端数据
   *
   * Get server api data
   * @param opt FetchParams
   */
  async function fetch(opt?: FetchParams) {
    const { api, searchInfo, fetchSetting, beforeFetchFn, afterFetchFn, useSearchForm, pagination } = unref(propsRef)

    // api 必须为函数
    // 'api' must be a function
    if (typeof api !== 'function') return

    try {
      setLoading(true)
      const { pageField, sizeField, listField, totalField } = Object.assign({}, FETCH_SETTING, fetchSetting)
      let pageParams: Recordable = {}

      const { currentPage = 1, pageSize = PAGE_SIZE } = unref(paginationRef) ?? {}

      if ((typeof pagination === 'boolean' && !pagination) || typeof paginationRef === 'boolean') {
        pageParams = {}
      } else {
        pageParams[pageField] = opt?.page || currentPage
        pageParams[sizeField] = pageSize
      }

      let params: Recordable = {
        ...pageParams,
        ...(useSearchForm ? getFieldsValue() : {}),
        ...searchInfo,
        ...(opt?.searchInfo ?? {}),
        ...unref(sortInfo),
        ...unref(filterInfo),
      }

      // 前置请求，参数随服务端内容变化而变化
      // Pre-request, the parameters change with the content of the server
      if (typeof beforeFetchFn === 'function') {
        params = beforeFetchFn(params) || params
      }

      const res = await api(params)
      rawDataSourceRef.value = res

      const isArrayResult = Array.isArray(res)

      let resultItems: Recordable[] = isArrayResult ? res : get(res, listField)
      const resultTotal: number = isArrayResult ? 0 : parseInt(get(res, totalField))
      const resultPage: number = isArrayResult ? 1 : parseInt(get(res, pageField))

      if (resultTotal) {
        const currentTotalPage = Math.ceil(resultTotal / pageSize)
        // 如果请求页码大于最大页码，则进行最后一次请求，请求内容为最大页码的内容
        // If the requested page number is greater than the maximum page number, make the last request, and the requested content is the content of the maximum page number
        if (currentPage > currentTotalPage) {
          setPagination({
            currentPage: currentTotalPage,
          })
          fetch(opt)
        }
      }

      // 结果作为参数，第二次请求才是正确的结果
      // The result is used as a parameter, and the second request is the correct result
      if (typeof afterFetchFn === 'function') {
        resultItems = afterFetchFn(resultItems) || resultItems
      }
      dataSourceRef.value = resultItems
      setPagination({
        total: resultTotal || 0,
      })

      console.info('===fetch info===', resultItems)
      emit('fetch-success', {
        items: unref(resultItems),
        page: resultPage,
        total: resultTotal,
      })
    } catch (error) {
      console.error('===fetch error===', error)
      emit('fetch-error', error)
      dataSourceRef.value = []
      setPagination({
        currentPage: 1,
        total: 0,
      })
    } finally {
      setLoading(false)
    }
  }

  /**
   * 重新载入最后一次请求
   *
   * Reload last request
   * @param opt FetchParams
   */
  async function reload(opt?: FetchParams) {
    await fetch(opt)
  }

  onMounted(() => {
    setTimeout(() => {
      unref(propsRef).immediate && fetch()
    }, 50)
  })

  watchEffect(() => {
    tableData.value = unref(dataSourceRef)
  })

  watch(
    () => unref(propsRef).dataSource,
    () => {
      const { dataSource, api } = unref(propsRef)
      if (!api && dataSource) {
        dataSourceRef.value = dataSource
      }
    },
    {
      immediate: true,
    },
  )

  return {
    getDataSourceRef,
    getRowKey,
    getAutoCreateKey,
    getDataSource,
    getRawDataSource,
    setTableData,
    fetch,
    reload,
    updateTableData,
    updateTableDataRecord,
    deleteTableDataRecord,
    insertTableDataRecord,
    findTableDataRecord,
    handleTableChange,
  }
}
