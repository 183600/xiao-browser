/**
 * 常用异常错误代码
 *
 * Exception Code
 */
export enum ExceptionEnum {
  /**
   * 页面未授权
   *
   * Page not access
   */
  PAGE_NOT_ACCESS = 403,

  /**
   * 页面不存在
   *
   * Page not found
   */
  PAGE_NOT_FOUND = 404,

  /**
   * 服务器繁忙
   *
   * Server error
   */
  ERROR = 500,

  /**
   * 网络繁忙
   *
   * network error
   */
  NET_WORK_ERROR = 10000,

  /**
   * 页面上没有数据。事实上，这不是一个异常页面
   *
   * No data on the page. In fact, it is not an exception page
   */
  PAGE_NOT_DATA = 10100,
}

/**
 * 日志错误类型
 *
 * Log exception type
 */
export enum ErrorTypeEnum {
  VUE = 'vue',
  SCRIPT = 'script',
  RESOURCE = 'resource',
  AJAX = 'ajax',
  PROMISE = 'promise',
}
