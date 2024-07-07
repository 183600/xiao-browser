/**
 * 用于监视路由更改以更改菜单和选项卡的状态。 不需要监听路由，因为路由状态变化受页面渲染时间影响，会比较慢
 *
 * Used to monitor routing changes to change the status of menus and tabs. There is no need to monitor the route, because the route status change is affected by the page rendering time, which will be slow
 */

import type { RouteLocationNormalized } from 'vue-router'

import mitt from '@/utils/mitt'
import { getRawRoute } from '@/utils'

const emitter = mitt()

const key = Symbol()

let lastChangeTab: RouteLocationNormalized

/**
 * 记录tab变更
 *
 * Record tab changes
 * @param lastChangeRoute RouteLocationNormalized
 */
export function setRouteChange(lastChangeRoute: RouteLocationNormalized) {
  const r = getRawRoute(lastChangeRoute)
  emitter.emit(key, r)
  lastChangeTab = r
}

/**
 * 监听tab变更内容
 *
 * Listener tab changes
 * @param callback (route: RouteLocationNormalized) => void
 * @param immediate boolean
 */
export function listenerRouteChange(callback: (route: RouteLocationNormalized) => void, immediate = true) {
  emitter.on(key, callback)
  immediate && lastChangeTab && callback(lastChangeTab)
}

/**
 * 移除tab变更内容
 *
 * Remove tab changes
 */
export function removeTabChangeListener() {
  emitter.clear()
}
