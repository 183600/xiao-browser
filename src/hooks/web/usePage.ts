import type { RouteLocationRaw, Router } from 'vue-router'

import { unref } from 'vue'
import { useRouter } from 'vue-router'

import { PageEnum } from '@/enums/pageEnum'
import { REDIRECT_NAME } from '@/router/constant'

export type RouteLocationRawEx = Omit<RouteLocationRaw, 'path'> & { path: PageEnum }
/**
 * 显示错误
 *
 * Display error
 * @param e Error
 */
function handleError(e: Error) {
  console.error(e)
}

/**
 * 路由切换
 *
 * Reactive page switch
 * @param _router Router
 */
export function useGo(_router?: Router) {
  const { push, replace } = _router || useRouter()

  /**
   * 路由跳转
   *
   * Router jump
   * @param opt
   * @param isReplace
   */
  function go(opt: PageEnum | RouteLocationRawEx | string = PageEnum.BASE_HOME, isReplace = false) {
    if (!opt) {
      return
    }
    if (typeof opt === 'string') {
      isReplace ? replace(opt).catch(handleError) : push(opt).catch(handleError)
    } else {
      const o = opt as RouteLocationRaw
      isReplace ? replace(o).catch(handleError) : push(o).catch(handleError)
    }
  }
  return go
}

/**
 * 路由刷新
 *
 * Reactive page redo
 * @param _router Router
 */
export const useRedo = (_router?: Router) => {
  const { push, currentRoute } = _router || useRouter()
  const { query, params = {}, name, fullPath } = unref(currentRoute.value)

  /**
   * 刷新当前页面
   *
   * Redo current page
   */
  function redo(): Promise<boolean> {
    return new Promise((resolve) => {
      if (name === REDIRECT_NAME) {
        resolve(false)
        return
      }
      if (name && Object.keys(params).length > 0) {
        params['_redirect_type'] = 'name'
        params['path'] = String(name)
      } else {
        params['_redirect_type'] = 'path'
        params['path'] = fullPath
      }
      push({ name: REDIRECT_NAME, params, query }).then(() => resolve(true))
    })
  }
  return redo
}
