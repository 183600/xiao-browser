/**
 * 用于配置全局错误处理功能，可以监控vue错误、脚本错误、静态资源错误和Promise错误
 *
 * Used to configure the global error handling function, which can monitor vue errors, script errors, static resource errors and Promise errors
 *
 * settings/projectSetting.js -> useErrorHandle
 */

import type { ErrorLogInfo } from '#/store'

import { App } from 'vue'

import { useErrorLogStoreWithOut } from '@/store/modules/errorLog'
import { ErrorTypeEnum } from '@/enums/exceptionEnum'
import projectSetting from '@/settings/projectSetting'

/**
 * 处理错误堆栈信息
 *
 * Handling error stack information
 * @param error Error
 */
function processStackMsg(error: Error) {
  if (!error.stack) {
    return ''
  }
  let stack = error.stack
    .replace(/\n/gi, '') // Remove line breaks to save the size of the transmitted content
    .replace(/\bat\b/gi, '@') // At in chrome, @ in ff
    .split('@') // Split information with @
    .slice(0, 9) // The maximum stack length (Error.stackTraceLimit = 10), so only take the first 10
    .map((v) => v.replace(/^\s*|\s*$/g, '')) // Remove extra spaces
    .join('~') // Manually add separators for later display
    .replace(/\?[^:]+/gi, '') // Remove redundant parameters of js file links (?x=1 and the like)
  const msg = error.toString()
  if (stack.indexOf(msg) < 0) {
    stack = `${msg}@${stack}`
  }
  return stack
}

/**
 * 获取组件名称
 *
 * Get component name
 * @param vm
 */
function formatComponentName(vm) {
  if (vm.$root === vm) {
    return {
      name: 'root',
      path: 'root',
    }
  }

  const options = vm.$options
  if (!options) {
    return {
      name: 'anonymous',
      path: 'anonymous',
    }
  }
  const name = options.name || options._componentTag
  return {
    name: name,
    path: options.__file,
  }
}

/**
 * 配置Vue错误处理功能
 *
 * Configure Vue error handling function
 * @param err Error
 * @param vm
 * @param info string
 */
function vueErrorHandler(err: Error, vm, info: string) {
  const errorLogStore = useErrorLogStoreWithOut()
  const { name, path } = formatComponentName(vm)
  errorLogStore.addErrorLogInfo({
    type: ErrorTypeEnum.VUE,
    name,
    file: path,
    message: err.message,
    stack: processStackMsg(err),
    detail: info,
    url: window.location.href,
  })
}

/**
 * 配置脚本错误处理功能
 *
 * Configure script error handling function
 * @param event Event | string
 * @param source string
 * @param lineno number
 * @param colno number
 * @param error Error
 * @returns
 */
export function scriptErrorHandler(event: Event | string, source?: string, lineno?: number, colno?: number, error?: Error) {
  if (event === 'Script error.' && !source) {
    return false
  }
  const errorInfo: Partial<ErrorLogInfo> = {}
  colno = colno || (window.event && (window.event as Event).errorCharacter) || 0
  errorInfo.message = event as string
  if (error?.stack) {
    errorInfo.stack = error.stack
  } else {
    errorInfo.stack = ''
  }
  const name = source ? source.substr(source.lastIndexOf('/') + 1) : 'script'
  const errorLogStore = useErrorLogStoreWithOut()
  errorLogStore.addErrorLogInfo({
    type: ErrorTypeEnum.SCRIPT,
    name: name,
    file: source as string,
    detail: `lineno${lineno}`,
    url: window.location.href,
    colno: colno || null,
    ...(errorInfo as Pick<ErrorLogInfo, 'message' | 'stack'>),
  })
  return true
}

/**
 * 配置Promise错误处理功能
 *
 * Configure Promise error handling function
 */
function registerPromiseErrorHandler() {
  window.addEventListener(
    'unhandledrejection',
    function(event) {
      const errorLogStore = useErrorLogStoreWithOut()
      errorLogStore.addErrorLogInfo({
        type: ErrorTypeEnum.PROMISE,
        name: 'Promise Error!',
        file: 'none',
        detail: 'promise error!',
        url: window.location.href,
        stack: 'promise error!',
        message: event.reason,
      })
    },
    true,
  )
}

/**
 * 配置监控资源加载错误处理功能
 *
 * Configure monitoring resource loading error handling function
 */
function registerResourceErrorHandler() {
  // Monitoring resource loading error(img,script,css,and jsonp)
  window.addEventListener(
    'error',
    function(e: Event) {
      const target = e.target ? e.target : e.srcElement
      const errorLogStore = useErrorLogStoreWithOut()
      errorLogStore.addErrorLogInfo({
        type: ErrorTypeEnum.RESOURCE,
        name: 'Resource Error!',
        file: (e.target || {}).currentSrc,
        detail: JSON.stringify({
          tagName: target.localName,
          html: target.outerHTML,
          type: e.type,
        }),
        url: window.location.href,
        stack: 'resource is not found',
        message: `${(e.target || {}).localName} is load error`,
      })
    },
    true,
  )
}

/**
 * 配置全局错误处理
 *
 * Configure global error handling
 * @param app App
 */
export function setupErrorHandle(app: App) {
  const { useErrorHandle } = projectSetting
  if (!useErrorHandle) {
    return
  }
  // Vue exception monitoring;
  app.config.errorHandler = vueErrorHandler

  // script error
  window.onerror = scriptErrorHandler

  //  promise exception
  registerPromiseErrorHandler()

  // Static resource exception
  registerResourceErrorHandler()
}
