import type { RouteLocationNormalized, RouteRecordNormalized } from 'vue-router'
import type { App, Ref, Component } from 'vue'
import type { SFCInstallWithContext, SFCWithInstall } from '#/utils'

import { unref } from 'vue'

import { error } from './log'
import { isObject } from '@vueuse/core'

export const noop = () => {}

/**
 * @description:  Set ui mount node
 */
export function getPopupContainer(node?: HTMLElement): HTMLElement {
  return (node?.parentNode as HTMLElement) ?? document.body
}
/**
 * Add the object as a parameter to the URL
 * @param baseUrl url
 * @param obj
 * @returns {string}
 * eg:
 *  let obj = {a: '3', b: '4'}
 *  setObjToUrlParams('www.baidu.com', obj)
 *  ==>www.baidu.com?a=3&b=4
 */
export function setObjToUrlParams(baseUrl: string, obj: any): string {
  let parameters = ''
  for (const key in obj) {
    parameters += `${key}=${encodeURIComponent(obj[key])}&`
  }
  parameters = parameters.replace(/&$/, '')
  return /\?$/.test(baseUrl) ? baseUrl + parameters : baseUrl.replace(/\/?$/, '?') + parameters
}

export function deepMerge<T = any>(src: any = {}, target: any = {}): T {
  let key: string
  for (key in target) {
    src[key] = isObject(src[key]) ? deepMerge(src[key], target[key]) : (src[key] = target[key])
  }
  return src
}

export function openWindow(url: string, opt?: { target?: TargetContext | string; noopener?: boolean; noreferrer?: boolean }) {
  const { target = '__blank', noopener = true, noreferrer = true } = opt || {}
  const feature: string[] = []

  noopener && feature.push('noopener=yes')
  noreferrer && feature.push('noreferrer=yes')

  window.open(url, target, feature.join(','))
}

// dynamic use hook props
export function getDynamicProps<T, U>(props: T): Partial<U> {
  const ret: Recordable = {}

  Object.keys(props).map((key) => {
    ret[key] = unref((props as Recordable)[key])
  })

  return ret as Partial<U>
}

export function getRawRoute(route: RouteLocationNormalized): RouteLocationNormalized {
  if (!route) return route
  const { matched, ...opt } = route
  return {
    ...opt,
    matched: (matched ? matched.map((item) => ({ meta: item.meta, name: item.name, path: item.path })) : undefined) as RouteRecordNormalized[],
  }
}

// https://github.com/vant-ui/vant/issues/8302
type EventShim = {
  new (...args: any[]): {
    $props: {
      onClick?: (...args: any[]) => void
    }
  }
}

export type WithInstall<T> = T & {
  install(app: App): void
} & EventShim

export type CustomComponent = Component & { displayName?: string }

export const withInstall = <T extends CustomComponent>(component: T, alias?: string) => {
  (component as Record<string, unknown>).install = (app: App) => {
    const compName = component.name || component.displayName
    if (!compName) return
    app.component(compName, component)
    if (alias) {
      app.config.globalProperties[alias] = component
    }
  }
  return component as WithInstall<T>
}

/**
 * 注册函数式组件
 *
 * Register functional components
 * @param fn function
 * @param name alias
 * @returns
 */
export const withInstallFunction = <T>(fn: T, name: string) => {
  // eslint-disable-next-line prettier/prettier
  (fn as SFCWithInstall<T>).install = (app: App) => {
    // eslint-disable-next-line prettier/prettier
    (fn as SFCInstallWithContext<T>)._context = app._context
    app.config.globalProperties[name] = fn
  }

  return fn as SFCInstallWithContext<T>
}

export function buildUUID(): string {
  const hexList: string[] = []
  for (let i = 0; i <= 15; i++) {
    hexList[i] = i.toString(16)
  }

  let uuid = ''
  for (let i = 1; i <= 36; i++) {
    if (i === 9 || i === 14 || i === 19 || i === 24) {
      uuid += '-'
    } else if (i === 15) {
      uuid += 4
    } else if (i === 20) {
      uuid += hexList[(Math.random() * 4) | 8]
    } else {
      uuid += hexList[(Math.random() * 16) | 0]
    }
  }
  return uuid.replace(/-/g, '')
}

/**
 * 获取使用示例
 *
 * Get use instance
 * @param instanceRef Ref<T>
 * @param name instance name
 */
export function getUseInstance<T>(instanceRef: Ref<T> | null, name: string): T | null {
  const instance = unref(instanceRef)
  if (!instance) {
    error(`The ${name} instance has not been obtained, please make sure the instance is rendered when performing the instance operation!`)
  }
  return instance
}

/**
 * 检查是否为http链接，仅做简单判断
 *
 * Check if it is an http link - simple judgment
 * @param val
 */
export const isHttpUrl = (val: string) => {
  const reg = /^http(s)?:\/\/\w+\..*$/
  return reg.test(val)
}
