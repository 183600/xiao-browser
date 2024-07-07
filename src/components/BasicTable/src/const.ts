import componentSetting from '@/settings/componentSetting'

const { table } = componentSetting

/**
 * 默认 rowKey
 *
 * Default rowKey
 */
export const ROW_KEY = 'key'

/**
 * 内容对齐方式
 *
 * Column alignment
 */
export const COLUMN_POSITION_ALIGN = table.defaultColumnAlign || 'left'

/**
 * 每页显示数量选项
 *
 * Display quantity per page option
 */
export const PAGE_SIZE_OPTIONS = table.pageSizeOptions

/**
 * 分页布局
 *
 * Pagination layout
 */
export const PAGE_LAYOUT_OPTIONS = table.pageLayoutOptions

/**
 * 分页页码
 *
 * Pagination page size
 */
export const PAGE_SIZE = table.defaultPageSize

/**
 * 分页对齐位置
 *
 * Pagination align position
 */
export const PAGE_POSITION_ALIGN = table.defaultPageAlign || 'left'

/**
 * 接口响应数据的字段
 *
 * Interface response data fields
 */
export const FETCH_SETTING = table.fetchSetting

/**
 * 表格排序数据的过滤方法
 *
 * Filter method for sorting table data
 */
export const DEFAULT_SORT_FN = table.defaultSortFn

/**
 * 表格筛选数据的过滤方法
 *
 * Filter method for table filter data
 */
export const DEFAULT_FILTER_FN = table.defaultFilterFn
