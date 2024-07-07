import { Persistent, BasicKeys } from '@/utils/cache/persistent'
import { CacheTypeEnum, TOKEN_KEY } from '@/enums/cacheEnum'
import projectSetting from '@/settings/projectSetting'

const { permissionCacheType } = projectSetting
const isLocal = permissionCacheType === CacheTypeEnum.LOCAL

/**
 * 获取 token
 *
 * Get token
 */
export function getToken() {
  return getAuthCache(TOKEN_KEY)
}

/**
 * 获取权限缓存
 *
 * Get auth cache
 * @param key auth key
 */
export function getAuthCache<T>(key: BasicKeys) {
  const fn = isLocal ? Persistent.getLocal : Persistent.getSession
  return fn(key) as T
}

/**
 * 设置权限缓存
 *
 * Set auth cache
 * @param key auth key
 * @param value auth value
 */
export function setAuthCache(key: BasicKeys, value) {
  const fn = isLocal ? Persistent.setLocal : Persistent.setSession
  return fn(key, value, true)
}

/**
 * 清除权限缓存
 *
 * Clear auth cache
 * @param immediate 是否立即执行
 */
export function clearAuthCache(immediate = true) {
  const fn = isLocal ? Persistent.clearLocal : Persistent.clearSession
  return fn(immediate)
}
