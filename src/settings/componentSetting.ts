import type { ColumnSorterResult } from '../components/BasicTable'

/**
 * 用于在不修改组件的情况下配置部分组件的通用配置
 *
 * Generic configuration for configuring some components without modifying the components
 */
export default {
  /**
   * 表格组件的配置
   *
   * BasicTable setting
   */
  table: {
    /**
     * 内容区的对齐方式，可选 'left/center/right'
     *
     * Column alignment, optional 'left/center/right'
     */
    defaultColumnAlign: 'left',
    /**
     * 请求接口的相关字段，支持嵌套格式 xxx.xxx.xxx
     *
     * Basic configuration of the request interface, support xxx.xxx.xxx
     */
    fetchSetting: {
      /**
       * 服务端接收的页码字段
       *
       * The page number field received by the server
       */
      pageField: 'page',
      /**
       * 服务端接收的页码大小字段
       *
       * The page size field received by the server
       */
      sizeField: 'pageSize',
      /**
       * 服务端返回的列表字段，可能存在嵌套模式，如 'data.list'
       *
       * The list field returned by the server, there may be nested patterns, such as 'data.list'
       */
      listField: 'items',
      /**
       * 服务端返回的数据总数字段，可能存在嵌套模式，如 'data.totalRow'
       *
       * The field of the total number of data returned by the server, there may be nested patterns, such as 'data.totalRow'
       */
      totalField: 'total',
    },
    /**
     * 分页导航的对齐方式，可选 'left/center/right'
     *
     * Pagination alignment position, optional 'left/center/right'
     */
    defaultPageAlign: 'center',
    /**
     * 分页的页码大小
     *
     * Page size for pagination
     */
    defaultPageSize: 20,
    /**
     * 分页导航的分页切换大小的数组
     *
     * Array of pagination toggle sizes for pagination
     */
    pageSizeOptions: ['10', '20', '30', '50', '100'],
    /**
     * 根据字段显示哪些分页内容
     *
     * Which paginated content to display based on fields. All optional: 'total, sizes, prev, pager, next, jumper'
     */
    pageLayoutOptions: 'total, prev, pager, next, jumper',
    /**
     * 默认的排序方法
     *
     * Default sort method
     * @param sortInfo ColumnSorterResult
     */
    defaultSortFn: (sortInfo: ColumnSorterResult) => {
      const { prop, order } = sortInfo
      return {
        // The sort field passed to the backend you
        order,
        // Sorting method passed to the background asc/desc
        prop,
      }
    },
    /**
     * 默认的筛选方法
     *
     * Default filter method
     * @param data
     */
    defaultFilterFn: (data: Partial<Recordable<string[]>>) => {
      return data
    },
  },
  form: {
    /**
     * 每行显示的表单项数量
     *
     * Number of form items displayed per row
     */
    defaultItemSize: 4,
    /**
     * 表单项的间隔(px)
     *
     * Spacing of form items (px)
     */
    defaultItemGutter: 16,
    /**
     * 行的列数，一般不需要修改
     * The number of columns in the row, generally do not need to be modified
     */
    fullColumnSize: 24,
  },
  upload: {
    /**
     * 服务端返回的上传字段，可能存在嵌套模式，如 'data.url'
     *
     * The upload field returned by the server, there may be nested patterns, such as 'data.url'
     */
    urlField: 'url',
  },
  /**
   * 滚动组件的配置
   *
   * Scrollbar setting
   */
  scrollbar: {
    /**
     * 是否使用原生滚动条
     *
     * Whether to use native scrollbar
     */
    native: false,
  },
}
