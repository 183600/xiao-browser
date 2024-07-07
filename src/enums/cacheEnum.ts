/**
 * 登录密钥
 *
 * Token
 */
export const TOKEN_KEY = 'TOKEN__'

/**
 * 用户信息
 *
 * User info
 */
export const USER_INFO_KEY = 'USER__INFO__'

/**
 * 角色权限信息
 *
 * Role
 */
export const ROLES_KEY = 'ROLES__KEY__'

/**
 * 项目配置
 *
 * Project config
 */
export const PROJ_CFG_KEY = 'PROJ__CFG__KEY__'

/**
 * 锁屏
 *
 * Lock
 */
export const LOCK_INFO_KEY = 'LOCK__INFO__KEY__'

/**
 * 选项卡
 *
 * Tabs
 */
export const MULTIPLE_TABS_KEY = 'MULTIPLE_TABS__KEY__'

/**
 * 基础全局缓存Key
 *
 * Basic global local key
 */
export const APP_LOCAL_CACHE_KEY = 'COMMON__LOCAL__KEY__'

/**
 * 基础全局会话Key
 *
 * Basic global session key
 */
export const APP_SESSION_CACHE_KEY = 'COMMON__SESSION__KEY__'

/**
 * 缓存类型
 *
 * Cache type
 */
export enum CacheTypeEnum {
  /**
   * 会话缓存
   *
   * sessionStorage
   */
  SESSION,
  /**
   * 本地缓存
   *
   * localStorage
   */
  LOCAL,
}
