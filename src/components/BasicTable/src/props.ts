import type { BasicColumn, FetchSetting, TableSetting, ColumnSorterResult } from './typing'
import type { BasicFormProps } from '@/components/BasicForm'
import type { ElePagination } from '@/components/ElementPlus'

import { EleTableProps, ElePaginationProps } from '@/components/ElementPlus'

import { DEFAULT_FILTER_FN, DEFAULT_SORT_FN, FETCH_SETTING } from './const'

/**
 * 头部Props
 *
 * Header props
 */
export const headerProps = {
  /**
   * 表格头部标题
   *
   * Table header title
   */
  title: {
    type: String,
    default: '',
  },
  /**
   * 标题右侧的帮助提示
   *
   * Title help message
   */
  titleHelpMessage: {
    type: [String, Array] as PropType<string | string[]>,
    default: '',
  },
  /**
   * 是否显示更多设置
   *
   * Whether to show more settings
   */
  showTableSetting: Boolean,
  /**
   * 设置的选项
   *
   * Setting item
   */
  tableSetting: {
    type: Object as PropType<TableSetting>,
    default: () => {},
  },
}

/**
 * 自定义Props
 *
 * Custom props
 */
export const customProps = {
  ...headerProps,
  /**
   * 表格数据源，当存在 api 函数时，可为空
   *
   * Table data source, nullable when there is an api function
   */
  dataSource: {
    type: Array as PropType<Recordable[]>,
    default: null,
  },
  /**
   * 表格列配置
   *
   * Table column configuration
   */
  columns: {
    type: Array as PropType<BasicColumn[]>,
    default: () => [],
  },
  /**
   * api 函数，请求后台数据
   *
   * api function, requesting data from the server
   */
  api: {
    type: Function as PropType<(...arg: any[]) => Promise<any>>,
    default: null,
  },
  /**
   * 接口结果字段匹配
   *
   * Interface result field match
   */
  fetchSetting: {
    type: Object as PropType<FetchSetting>,
    default: () => {
      return FETCH_SETTING
    },
  },
  /**
   * 是否自动创建key
   *
   * Whether to automatically create a key
   */
  autoCreateKey: {
    type: Boolean,
    default: true,
  },
  /**
   * 请求之前对参数进行处理
   *
   * Handle parameters before requesting
   */
  beforeFetch: {
    type: Function as PropType<(data: Recordable) => any>,
    default: null,
  },
  /**
   * 请求之后对返回值进行处理
   *
   * Process the return value after the request
   */
  afterFetch: {
    type: Function as PropType<(data: Recordable) => any>,
    default: null,
  },
  /**
   * 搜索时的参数过滤
   *
   * Parameter filtering when searching
   */
  searchFn: {
    type: Function as PropType<(data: Recordable) => any>,
    default: null,
  },
  /**
   * 排序时的参数过滤
   *
   * Parameter filtering when sorting
   */
  sortFn: {
    type: Function as PropType<(sortInfo: ColumnSorterResult) => any>,
    default: DEFAULT_SORT_FN,
  },
  /**
   * 筛选时的参数过滤
   *
   * Parameter filtering when filtering
   */
  filterFn: {
    type: Function as PropType<(data: Recordable) => any>,
    default: DEFAULT_FILTER_FN,
  },
  /**
   * 是否立即请求
   *
   * whether to request now
   */
  immediate: {
    type: Boolean,
    default: true,
  },
  /**
   * 额外的搜索参数
   *
   * Additional search parameters
   */
  searchInfo: {
    type: Object as PropType<Recordable>,
    default: null,
  },
  /**
   * 是否使用搜索表单
   *
   * Whether to use a search form
   */
  useSearchForm: { type: Boolean },
  /**
   * 搜索表单配置
   *
   * Search form configuration
   */
  formConfig: {
    type: Object as PropType<Partial<BasicFormProps>>,
    default: null,
  },
  /**
   * 是否显示序号列
   *
   * Whether to show the serial number column
   */
  showIndexColumn: Boolean,
  /**
   * 是否显示选择列
   *
   * whether to show checkbox columns
   */
  showCheckboxColumn: Boolean,
  /**
   * 是否自动调整表格大小
   *
   * Whether to automatically adjust the table size
   */
  canResize: Boolean,
  /**
   * 是否显示盒子阴影
   *
   * Whether to show box shadow
   */
  isShadow: Boolean,
  /**
   * 分页导航配置
   *
   * Pagination Configuration
   */
  pagination: {
    type: [Object, Boolean] as PropType<Partial<ElePagination> | boolean>,
    default: null,
  },
  /**
   * 是否加载状态
   *
   * Whether the status is being loaded
   */
  loading: Boolean,
  /**
   * 子项的所在的字段名称，一般用在展开表格
   *
   * The name of the field where the child item is located, generally used to expand the table
   */
  childrenColumnName: {
    type: String,
    default: 'children',
  },
}

/**
 * 分页Props
 *
 * Pagination props
 */
export const paginationProps = {
  ...ElePaginationProps,
  prefixCls: String,
}

/**
 * 组件Props
 *
 * Component props
 */
export const basicProps = {
  ...EleTableProps,
  ...customProps,
}

/**
 * ElTable 自带的 emit
 *
 *  ElTable emits
 */
export const ElTableBasicEmits = [
  'select',
  'select-all',
  'selection-change',
  'cell-mouse-enter',
  'cell-mouse-leave',
  'cell-click',
  'cell-dblclick',
  'cell-contextmenu',
  'row-click',
  'row-contextmenu',
  'row-dblclick',
  'header-click',
  'header-contextmenu',
  'sort-change',
  'filter-change',
  'current-change',
  'header-dragend',
  'expand-change',
]
