import type { FunctionalComponent } from 'vue'
import type { RouteLocation } from 'vue-router'

export interface DefaultContext {
  Component: FunctionalComponent & { type: Recordable }
  route: RouteLocation
}

/**
 * 根据路由、缓存中获取页面过渡动画名称
 *
 * Get the page transition animation name according to the route and cache
 */
export function getTransitionName({
  route,
  openCache,
  cacheTabs,
  enableTransition,
  def,
}: Pick<DefaultContext, 'route'> & {
  enableTransition: boolean
  openCache: boolean
  def: string
  cacheTabs: string[]
}): string | undefined {
  if (!enableTransition) {
    return undefined
  }

  const isInCache = cacheTabs.includes(route.name as string)
  const transitionName = 'fade-slide'
  let name: string | undefined = transitionName

  if (openCache) {
    name = isInCache && route.meta.loaded ? transitionName : undefined
  }
  const ret = name || (route.meta.transitionName as string) || def
  // 加上统一的动画前缀，预防名称相同
  // Add a uniform animation prefix to prevent the same name
  return `tyani-${ret}`
}
