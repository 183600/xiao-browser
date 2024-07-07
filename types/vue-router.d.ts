import { RoleEnum } from '@/enums/roleEnum'

export {}

declare module 'vue-router' {
  /**
   * 拓展路由菜单属性
   *
   * Extended route menu meta
   */
  interface RouteMeta extends Record<string | number | symbol, unknown> {
    orderNo?: number
    /**
     * 标题
     *
     * title
     */
    title: string
    /**
     * 是否忽略权限，只在权限模式为Role的时候有效
     *
     * Whether to ignore permissions
     */
    ignoreAuth?: boolean
    /**
     * 角色信息，只在权限模式为Role的时候有效
     *
     * role info
     */
    roles?: RoleEnum[]
    /**
     * 是否不缓存
     *
     * Whether not to cache
     */
    ignoreKeepAlive?: boolean
    /**
     * 是否固定在选项卡上
     *
     * Is it fixed on tab
     */
    affix?: boolean
    /**
     * 选项卡上的图标
     *
     * icon on tab
     */
    icon?: string
    /**
     * 如果为框架容器，请填写框架地址
     *
     * If it is a frame container, please fill in the frame url
     */
    frameSrc?: string
    /**
     * 当前页面过渡动画名称
     *
     * current page transition name
     */
    transitionName?: string
    /**
     * 从不显示在面包屑中
     *
     * Never show in breadcrumbs
     */
    hideBreadcrumb?: boolean
    /**
     * 隐藏子菜单
     *
     * Hide submenu
     */
    hideChildrenInMenu?: boolean
    /**
     * 携带参数
     *
     * Carrying parameters
     */
    carryParam?: boolean
    /**
     * 内部用于标记单级菜单
     *
     * Used internally to mark single-level menus
     */
    single?: boolean
    /**
     * 当前活动菜单
     *
     * Currently active menu
     */
    currentActiveMenu?: string
    /**
     * 从不显示在选项卡中
     *
     * Never show in tab
     */
    hideTab?: boolean
    /**
     * 是否在菜单中隐藏
     *
     * Never show in menu
     */
    hideMenu?: boolean
    /**
     * 是否为链接
     *
     * Is it a link
     */
    isLink?: boolean
    /**
     * 忽略路由。用于在ROUTE_MAPPING以及BACK权限模式下，生成对应的菜单而忽略路由。
     *
     * Routes are ignored. It is used to generate the corresponding menu and ignore the routing in the ROUTE_MAPPING and BACK permission modes.
     */
    ignoreRoute?: boolean
    /**
     * 是否在子级菜单的完整path中忽略本级path
     *
     * Whether to ignore the current level path in the full path of the submenu
     */
    hidePathForChildren?: boolean
  }
}
