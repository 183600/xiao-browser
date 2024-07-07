/**
 * 请求结果配置
 *
 * Request result
 */
export enum ResultEnum {
  /**
   * 成功
   *
   * Success
   */
  SUCCESS = 0,
  /**
   * 错误
   *
   * Error
   */
  ERROR = 1,
  /**
   * 超时
   *
   * Timeout
   */
  TIMEOUT = 401,
  /**
   * 回调类型
   *
   * Response type
   */
  TYPE = 'success',
}

/**
 * 请求的方法
 *
 * Request method
 */
export enum RequestEnum {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
}

/**
 * 请求上下文类型
 *
 * Content type
 */
export enum ContentTypeEnum {
  JSON = 'application/json;charset=UTF-8',
  FORM_URLENCODED = 'application/x-www-form-urlencoded;charset=UTF-8',
  FORM_DATA = 'multipart/form-data;charset=UTF-8',
}
