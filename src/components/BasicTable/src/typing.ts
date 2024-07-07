import type { ElePagination, EleTable, EleTableColumn, EleButton, EleActionPopconfirmAction } from '@/components/ElementPlus'
import type { FormActionMethods, BasicFormProps } from '@/components/BasicForm'
import type { MessageBoxOptions } from '@/hooks/web/useMessage'

import { RoleEnum } from '@/enums/roleEnum'

/**
 * 表格基础Props
 *
 * Table Basic Props
 */
export interface BasicTableProps extends EleTable {
  // header
  /**
   * 表格头部标题
   *
   * Table header title
   */
  title?: string
  /**
   * 标题右侧的帮助提示
   *
   * Title help message
   */
  titleHelpMessage?: string | string[]
  /**
   * 是否显示更多设置
   *
   * Whether to show more settings
   */
  showTableSetting?: boolean
  /**
   * 设置的选项
   *
   * Setting item
   */
  tableSetting?: TableSetting
  // main
  /**
   * 表格数据源，当存在 api 函数时，可为空
   *
   * Table data source, nullable when there is an api function
   */
  dataSource?: Recordable[]
  /**
   * 表格列配置
   *
   * Table column configuration
   */
  columns: BasicColumn[]
  /**
   * api 函数，请求后台数据
   *
   * api function, requesting data from the server
   */
  api?: (...arg: any) => Promise<any>
  /**
   * 接口结果字段匹配
   *
   * Interface result field match
   */
  fetchSetting?: Partial<FetchSetting>
  /**
   * 是否自动创建key
   *
   * Whether to automatically create a key
   */
  autoCreateKey?: boolean
  /**
   * 请求列表之前请求
   *
   * Request list before request
   */
  beforeFetchFn?: (data: Recordable) => Recordable
  /**
   * 请求列表之后请求
   *
   * Request list after request
   */
  afterFetchFn?: (data: Recordable[]) => Recordable[]
  /**
   * 搜索时的参数过滤
   *
   * Parameter filtering when searching
   */
  searchFn?: (data: Recordable) => Recordable
  /**
   * 排序时的参数过滤
   *
   * Parameter filtering when sorting
   */
  sortFn?: (data: ColumnSorterResult) => Recordable
  /**
   * 筛选时的参数过滤
   *
   * Parameter filtering when filtering
   */
  filterFn?: (data: Recordable[]) => Recordable[]
  /**
   * 是否立即请求
   *
   * whether to request now
   */
  immediate?: boolean
  /**
   * 额外的搜索参数
   *
   * Additional search parameters
   */
  searchInfo?: Recordable
  /**
   * 是否使用搜索表单
   *
   * Whether to use a search form
   */
  useSearchForm?: boolean
  /**
   * 搜索表单配置
   *
   * Search form configuration
   */
  formConfig?: Partial<BasicFormProps>
  /**
   * 是否显示序号列
   *
   * Whether to show the serial number column
   */
  showIndexColumn?: boolean
  /**
   * 是否显示选择列
   *
   * whether to show checkbox columns
   */
  showCheckboxColumn?: boolean
  /**
   * 是否自动调整表格大小
   *
   * Whether to automatically adjust the table size
   */
  canResize?: boolean
  /**
   * 是否显示盒子阴影
   *
   * Whether to show box shadow
   */
  isShadow?: Boolean
  /**
   * 分页导航配置
   *
   * Pagination Configuration
   */
  pagination?: Partial<ElePagination> | boolean
  /**
   * 是否加载状态
   *
   * Whether the status is being loaded
   */
  loading?: boolean
  /**
   * 子项的所在的字段名称，一般用在展开表格
   *
   * The name of the field where the child item is located, generally used to expand the table
   */
  childrenColumnName?: string

  // Element Plus Table event
  // 请查看官方使用文档
  // Please check the official documentation
  /**
   * 当用户手动勾选数据行的 Checkbox 时触发的事件
   */
  onSelect?: (selection, row) => void
  /**
   * 当用户手动勾选全选 Checkbox 时触发的事件
   */
  onSelectAll?: (selection) => void
  /**
   * 当选择项发生变化时会触发该事件
   */
  onSelectionChange?: (selection) => void
  /**
   * 当单元格 hover 进入时会触发该事件
   */
  onCellMouseEnter?: (row, column, cell, event) => void
  /**
   * 当单元格 hover 退出时会触发该事件
   */
  onCellMouseLeave?: (row, column, cell, event) => void
  /**
   * 当某个单元格被点击时会触发该事件
   */
  onCellClick?: (row, column, cell, event) => void
  /**
   * 当某个单元格被双击击时会触发该事件
   */
  onCellDblclick?: (row, column, cell, event) => void
  /**
   * 当某个单元格被鼠标右键点击时会触发该事件
   */
  onCellContextmenu?: (row, column, cell, event) => void
  /**
   * 当某一行被点击时会触发该事件
   */
  onRowClick?: (row, column, event) => void
  /**
   * 当某一行被鼠标右键点击时会触发该事件
   */
  onRowContextmenu?: (row, column, event) => void
  /**
   * 当某一行被双击时会触发该事件
   */
  onRowDblclick?: (row, column, event) => void
  /**
   * 当某一列的表头被点击时会触发该事件
   */
  onHeaderClick?: (column, event) => void
  /**
   * 当某一列的表头被鼠标右键点击时触发该事件
   */
  onHeaderContextmenu?: (column, event) => void
  /**
   * 当表格的排序条件发生变化的时候会触发该事件
   */
  onSortChange?: ({ column, prop, order }) => void
  /**
   * column 的 key， 如果需要使用 filter-change 事件，则需要此属性标识是哪个 column 的筛选条件
   */
  onFilterChange?: (filters) => void
  /**
   * 当表格的当前行发生变化的时候会触发该事件，如果要高亮当前行，请打开表格的 highlight-current-row 属性
   */
  onCurrentChange?: (currentRow, oldCurrentRow) => void
  /**
   * 当拖动表头改变了列的宽度的时候会触发该事件
   */
  onHeaderDragend?: (newWidth, oldWidth, column, event) => void
  /**
   * 当用户对某一行展开或者关闭的时候会触发该事件（展开行时，回调的第二个参数为 expandedRows；树形表格时第二参数为 expanded）
   */
  onExpandChange?: (row, expandedRows_or_expanded) => void
}

export declare type ColumnSortOrder = 'ascending' | 'descending' | null

export interface TableCustomRecord<T = Recordable> {
  record?: T
  index?: number
}

/**
 * 列排序的回调结果
 *
 * Column sort callback result
 */
export interface ColumnSorterResult {
  /**
   * 当前列数据
   *
   * Column data
   */
  column: EleTableColumn
  /**
   * 排序
   *
   * Order
   */
  order: ColumnSortOrder
  /**
   * Prop 字段
   *
   * Prop
   */
  prop: string
}

/**
 * 请求接口数据函数支持的参数
 *
 * Parameters supported by the request interface data function
 */
export interface FetchParams {
  /**
   * 当前页码
   *
   * Current page
   */
  page?: number
  /**
   * 搜索参数
   *
   * Search params
   */
  searchInfo?: Recordable
  /**
   * 排序参数
   *
   * Sort params
   */
  sortInfo?: Recordable
  /**
   * 筛选参数
   *
   * Filter params
   */
  filterInfo?: Recordable
}

/**
 * 获取表格参数
 *
 * Get columns params
 */
export interface GetColumnsParams {
  /**
   * 是否忽略索引列
   *
   * whether to ignore index column
   */
  ignoreIndex?: boolean
  /**
   * 是否忽略操作列
   *
   * whether to ignore action column
   */
  ignoreAction?: boolean
  /**
   * 是否忽略复选框列
   *
   * whether to ignore checkbox column
   */
  ignoreCheckbox?: boolean
  /**
   * 是否忽略展开列
   *
   * whether to ignore expand column
   */
  ignoreExpand?: boolean
  /**
   * 是否需要重新排序
   *
   * Does it need to be reordered
   */
  sort?: boolean
}

/**
 * 实例支持的方法
 *
 * Instance Supported Methods
 */
export interface TableActionMethods {
  /**
   * 更新表格props
   *
   * Set table props
   */
  setTableProps: (props: Partial<BasicTableProps>) => void
  /**
   * 获取表格列
   *
   * Get table columns
   */
  getColumns: (opt?: GetColumnsParams) => BasicColumn[]
  /**
   * 更新列，支持列数据或者prop字段集
   *
   * Set columns, Support column data or prop field set
   */
  setColumns: (columns: BasicColumn[] | string[]) => void
  /**
   * 获取缓存列
   *
   * Get cache columns
   */
  getCacheColumns: () => BasicColumn[]
  /**
   * 更新加载状态
   *
   * Set loading state
   */
  setLoading: (loading: boolean) => void
  /**
   * 重载表格数据
   *
   * Reload table data
   */
  reload: (opt?: FetchParams) => Promise<void>
  /**
   * 处理表格数据
   *
   * Handling of tabular data
   */
  getDataSource: <T = Recordable>() => T[]
  /**
   * 获取未处理的原始的接口数据
   *
   * Get unprocessed raw api data
   */
  getRawDataSource: <T = Recordable>() => T
  /**
   * 更新表格数据
   *
   * Set table data
   */
  setTableData: <T = Recordable>(values: T[]) => void
  /**
   * 更新表格数据，与 updateTableDataRecord 不同的是，这个可以单独修改某行的某个字段
   *
   * Update table data, unlike updateTableDataRecord, this one can modify a field of a row individually
   */
  updateTableData: (index: number, prop: string, value: any) => Recordable
  /**
   * 根据 key 更新指定行的整行的记录，key必须存在
   *
   * Update the record of the entire row of the specified row according to the key, key must exist
   */
  updateTableDataRecord: (rowKey: string | number, record: Recordable) => Recordable | void
  /**
   * 根据 rowKey 删除指定行记录
   *
   * Delete the specified row record according to the rowKey
   */
  deleteTableDataRecord: (rowKey: string | number) => Recordable | void
  /**
   * 插入一条记录，如果索引存在，则插入索引的位置，否则插入最后的位置
   *
   * Insert a record, if the index exists, insert the position of the index, otherwise insert at the last position
   * @param record 插入的记录
   * @param index 索引
   */
  insertTableDataRecord: (record: Recordable, index?: number) => Recordable | void
  /**
   * 根据 rowKey 查找所在行记录
   *
   * Find the row record based on the rowKey
   */
  findTableDataRecord: (rowKey: string | number) => Recordable | void
  /**
   * 刷新高度-重新计算表格高度
   *
   * Redo height - recalculates table height
   */
  redoHeight: () => void
  /**
   * 更新分页信息
   *
   * Set pagination
   * @param info ElePagination
   */
  setPagination: (info: Partial<ElePagination>) => void
  /**
   * 获取分页信息
   *
   * Get pagination
   */
  getPagination: () => Partial<ElePagination> | boolean
  /**
   * 展开全部-树形表格
   *
   * Expand all
   */
  expandAll: () => void
  /**
   * 收起全部-树形表格
   *
   * Collapse all
   */
  collapseAll: () => void

  emit?: EmitType

  // Element Plus Table func
  // 请查看官方使用文档
  // Please check the official documentation
  /**
   * 用于多选表格，清空用户的选择
   */
  clearSelection: () => void
  /**
   * 返回当前选中的行
   */
  getSelectionRows: () => void
  /**
   * 用于多选表格，切换某一行的选中状态， 如果使用了第二个参数，则可直接设置这一行选中与否
   */
  toggleRowSelection: (row: any, selected: boolean) => void
  /**
   * 用于多选表格，切换全选和全不选
   */
  toggleAllSelection: () => void
  /**
   * 用于可扩展的表格或树表格，如果某行被扩展，则切换。 使用第二个参数，您可以直接设置该行应该被扩展或折叠。
   */
  toggleRowExpansion: (row: any, expanded: boolean) => void
  /**
   * 用于单选表格，设定某一行为选中行， 如果调用时不加参数，则会取消目前高亮行的选中状态。
   */
  setCurrentRow: (row: any) => void
  /**
   * 用于清空排序条件，数据会恢复成未排序的状态
   */
  clearSort: () => void
  /**
   * 	传入由 columnKey 组成的数组以清除指定列的过滤条件。 如果没有参数，清除所有过滤器
   */
  clearFilter: (columnKeys: string[]) => void
  /**
   * 对 Table 进行重新布局。 当表格可见性变化时，您可能需要调用此方法以获得正确的布局
   */
  doLayout: () => void
  /**
   * 手动排序表格。 参数 prop 属性指定排序列，order 指定排序顺序。
   */
  sort: (prop: string, order: string) => void
}

export type UseTableMethod = TableActionMethods & {
  /**
   * 获取表单实例方法
   *
   * Get form instance func
   */
  getFormRef: () => FormActionMethods
}

/**
 * 请求响应字段匹配设置，支持多重嵌套，如 a.b.c
 *
 * Request response field matching settings, support multiple nesting, such as a.b.c
 */
export interface FetchSetting {
  /**
   * 请求结果的页码字段
   *
   * Page field for request result
   */
  pageField: string
  /**
   * 请求结果的页码大小字段
   *
   * Size field for request result
   */
  sizeField: string
  /**
   * 请求结果的列表字段
   *
   * List field for request result
   */
  listField: string
  /**
   * 请求结果的总数字段
   *
   * Total field for request result
   */
  totalField: string
}

/**
 * 表格可设置项
 *
 * Table Configurable Items
 */
export interface TableSetting {
  /**
   * 刷新
   *
   * Redo
   */
  redo?: boolean
  /**
   * 密度
   *
   * Density
   */
  size?: boolean
  /**
   * 全屏
   *
   * full screen
   */
  fullscreen?: boolean
}

/**
 * 继承官方自带的数据
 *
 * Inherit official data
 */
export interface scopeInfo {
  /**
   * 所在行
   *
   * Current column
   */
  row: Record
  /**
   * 所在列
   *
   * Current column
   */
  column: EleTableColumn
  /**
   * 所在索引
   *
   * Current index
   */
  $index: number
}

/**
 * 自定义渲染函数的返回数据
 *
 * Return data of custom rendering function
 */
export interface TableColumnRender {
  /**
   * 当前的内容
   *
   * Current content
   */
  text: string
  /**
   * 当前所在索引
   *
   * Current index
   */
  index: number
  /**
   * 当前行的数据
   *
   * Data of the current row
   */
  record: Record
  /**
   * 继承官方内容，内容为当前行(row)，当前列(column)，当前索引($index)
   *
   * Inherit the official content, exist row/column/$index
   */
  scope: scopeInfo
  /**
   * 当前列的数据
   *
   * Current column data
   */
  column: BasicColumn
}

/**
 * 表格的操作列
 *
 * Table action column
 */
export interface TableActionItem extends EleButton {
  /**
   * Svg 图标的名称
   *
   * Svg name
   */
  svgName?: string
  /**
   * 常规图标的名称
   *
   * Icon name
   */
  iconName?: string
  /**
   * 如果有，将转为弹窗确认按钮模式
   *
   * If there is, it will switch to popup confirmation button mode
   */
  popConfirm?: MessageBoxOptions
  /**
   * 通过权限判断是否显示
   *
   * Judging whether to display by permission
   */
  auth?: RoleEnum | RoleEnum[] | string | string[]
  /**
   * 通过条件判断是否显示
   *
   * Judging whether to display by condition
   */
  ifShow?: boolean | ((column: BasicColumn, scopes: scopeInfo, action: TableActionItem) => boolean)
  /**
   * 操作列的点击回调，当为确认按钮模式时，将会在确认弹窗操作后触发回调
   *
   * Click callback for action column, when it is in the confirmation button mode, the callback will be triggered after confirming the popup operation
   */
  callback?: (info: scopeInfo, action?: EleActionPopconfirmAction) => void
}

/**
 * 表格列的数据内容
 *
 * table column data content
 */
export interface BasicColumn extends EleTableColumn {
  /**
   * 操作列的项，当存在这个字段时，默认当前列为操作列
   *
   * The item of the operation column, when this field exists, the default current column is the operation column
   */
  actions?: TableActionItem[]
  /**
   * 子项
   *
   * Children
   */
  children?: BasicColumn[]
  /**
   * 是否插槽模式
   *
   * Whether the slot mode
   */
  isSlot?: boolean
  /**
   * 是否默认隐藏
   *
   * Whether to hide by default
   */
  defaultHidden?: boolean
  /**
   * 当内容为空时，显示默认内容
   *
   * When the content is empty, display the default content
   */
  defaultValue?: string
  /**
   * 是否自定义渲染
   *
   * Whether to customize the rendering
   */
  customRender?: (info: TableColumnRender) => void
  /**
   * 当前列的数据权限
   */
  auth?: RoleEnum | RoleEnum[] | string | string[]
  /**
   * 是否显示，可通过条件判断
   *
   * Whether to display, can be judged by conditions
   */
  ifShow?: boolean | ((column: BasicColumn) => boolean)
}
