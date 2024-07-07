import type { ProjectConfig } from '#/config'
import { MenuTypeEnum, MenuModeEnum, TriggerEnum, MixSidebarTriggerEnum } from '@/enums/menuEnum'
import { CacheTypeEnum } from '@/enums/cacheEnum'
import { ContentEnum, PermissionModeEnum, RouterTransitionEnum, SettingButtonPositionEnum, SessionTimeoutProcessingEnum } from '@/enums/appEnum'
import { headerColor, primaryColor, sidebarColor } from './designSetting'

/**
 * 这是项目配置项，修改完后请清理缓存即可立即生效，如不会修改具体配置，请在项目可视化配置中心，拷贝自定义配置后的内容到下方 `do something` 位置粘贴
 *
 * This is the project configuration item. After modification, please clear the cache and it will take effect immediately. If the specific configuration will not be modified, please copy the customized configuration in the project visualization configuration center and paste it in the `do something` position below
 */
let setting: ProjectConfig = {
  /**
   * 是否显示配置按钮
   *
   * Whether to show the configuration button
   */
  showSettingButton: true,

  /**
   * 系统默认缓存时间，以秒为单位，默认为7天
   *
   * System default cache time, in seconds, default is 7 days
   */
  cacheTime: 60 * 60 * 24 * 7,

  /**
   * 是否显示暗黑主题切换按钮
   *
   * Whether to show the dark theme switch button
   */
  showDarkModeToggle: true,

  /**
   * 配置按钮位置
   *
   * `Settings` button position
   */
  settingButtonPosition: SettingButtonPositionEnum.AUTO,

  /**
   * 权限模式
   *
   * Permission mode
   */
  permissionMode: PermissionModeEnum.ROUTE_MAPPING,

  /**
   * 权限相关的缓存存储在 sessionStorage 或 localStorage
   *
   * Permission-related cache is stored in sessionStorage or localStorage
   */
  permissionCacheType: CacheTypeEnum.LOCAL,

  /**
   * 处理会话超时方式
   *
   * Session timeout processing
   */
  sessionTimeoutProcessing: SessionTimeoutProcessingEnum.ROUTE_JUMP,

  /**
   * 主题颜色
   *
   * Theme color
   */
  themeColor: primaryColor,

  /**
   * 切换为灰色模式
   *
   * Switch to grey mode
   */
  grayMode: false,

  /**
   * 切换为色弱模式
   *
   * Switch to color weak mode
   */
  colorWeak: false,

  /**
   * 隐藏头部、侧边菜单、标签栏等，只显示内容区。通常需要嵌入至第三方时很有用
   *
   * Hide the header, side menu, tab bar, etc., and only show the content area. Often useful when embedding into third parties
   */
  fullContent: false,

  /**
   * 内容区显示模式
   *
   * Content area display mode
   */
  contentMode: ContentEnum.FULL,

  /**
   * 是否显示Logo
   *
   * Whether to display the logo
   */
  showLogo: true,

  /**
   * 是否显示脚部
   *
   * Whether to show footer
   */
  showFooter: false,

  /**
   * 是否开启KeepAlive缓存，建议在开发时关闭缓存
   *
   * Whether to enable the KeepAlive cache, it is recommended to close the cache during development
   */
  openKeepAlive: true,

  /**
   * 自动锁屏时间，0不锁屏。单位/分钟 默认 0
   *
   * Automatic screen lock time, 0 does not lock the screen. Unitminute default 0
   */
  lockTime: 0,

  /**
   * 是否显示面包屑
   *
   * Whether to show breadcrumbs
   */
  showBreadCrumb: true,

  /**
   * 是否显示面包屑图标
   *
   * Whether to show the breadcrumb icon
   */
  showBreadCrumbIcon: false,

  /**
   * 是否使用错误处理程序插件
   *
   * Whether to use the error handler plugin
   */
  useErrorHandle: true,

  /**
   * 是否在打开页面时回到顶部
   *
   * Whether to go back to the top when opening the page
   */
  useOpenBackTop: true,

  /**
   * 是否可以嵌入 iframe 页面
   *
   * Is it possible to embed iframe pages
   */
  canEmbedIFramePage: true,

  /**
   * 切换界面时是否删除未关闭的提示弹窗
   *
   * Whether to delete unclosed prompt popups when switching interfaces
   */
  closeMessageOnSwitch: true,

  /**
   * 切换接口时，是否取消已经发送但没有响应的http请求
   *
   * Whether to cancel the http request that has been sent but not responded when switching the interface.
   */
  removeAllHttpPending: false,

  /**
   * 头部内容区配置
   *
   * Header configuration
   */
  headerSetting: {
    /**
     * 是否显示头部
     *
     * Whether to show the header
     */
    show: true,
    /**
     * 头部高度
     *
     * Header height
     */
    height: 60,
    /**
     * 头部背景颜色
     *
     * Header background color
     */
    bgColor: headerColor,
    /**
     * 是否固定在顶部
     *
     * Is it fixed at the top
     */
    fixed: true,
    /**
     * 是否开启锁屏功能
     *
     * Whether to enable the lock screen function
     */
    useLockPage: true,
    /**
     * 是否显示全屏按钮
     *
     * Whether to show the full screen button
     */
    showFullScreen: true,
    /**
     * 是否显示文档按钮
     *
     * Whether to show the document button
     */
    showDoc: true,
    /**
     * 是否显示通知按钮
     *
     * Whether to show the notification button
     */
    showNotice: true,
    /**
     * 是否显示菜单搜索
     *
     * Whether to display the menu search
     */
    showSearch: true,
  },

  /**
   * 菜单内容区配置
   *
   * Menu configuration
   */
  menuSetting: {
    /**
     * 是否显示菜单栏
     *
     * Whether to show the menu
     */
    show: true,
    /**
     * 菜单宽度
     *
     * Menu width
     */
    menuWidth: 220,
    /**
     * 菜单背景颜色
     *
     * Menu background color
     */
    bgColor: sidebarColor,
    /**
     * 是否固定左侧菜单
     *
     * Whether to fix the left menu
     */
    fixed: true,
    /**
     * 是否默认收起菜单
     *
     * Whether to collapse the menu by default
     */
    collapsed: false,
    /**
     * 折叠菜单时是否显示菜单名称
     *
     * Whether to display the menu name when folding the menu
     */
    collapsedShowTitle: false,
    /**
     * 是否允许拖动菜单的宽度
     *
     * Whether to allow dragging the width of the menu
     */
    canDrag: true,
    /**
     * 是否只隐藏菜单，但 DOM 节点还在
     *
     * Whether to show dom
     */
    hidden: false,
    /**
     * 菜单模式
     *
     * Menu mode
     */
    mode: MenuModeEnum.INLINE,
    /**
     * 菜单显示模式
     *
     * Menu display mode
     */
    type: MenuTypeEnum.SIDEBAR,
    /**
     * 菜单折叠触发位置
     *
     * Fold trigger position
     */
    trigger: TriggerEnum.HEADER,
    /**
     * 打开手风琴模式，即只显示一个菜单
     *
     * Turn on accordion mode, i.e. show only one menu
     */
    accordion: true,
    /**
     * 是否在切换页面时关闭菜单
     *
     * Switch page to close menu
     */
    closeMixSidebarOnChange: false,
    /**
     * 顶部菜单 - 分割菜单，主菜单位于头部，二级菜单位于左侧
     *
     * Top menu - split menu, main menu on the head, secondary menu on the left
     */
    split: false,
    /**
     * 顶部菜单 - 菜单的位置
     *
     * Top menu - the position of the menu
     */
    topMenuAlign: 'center',
    /**
     * 混合菜单 - 菜单展开方式，支持 click/hover
     *
     * Mixed menu, menu expansion method, support click/hover
     */
    mixSideTrigger: MixSidebarTriggerEnum.CLICK,
    /**
     * 混合菜单 - 是否固定展开的菜单
     *
     * Mixed menu, whether to fix the expanded menu
     */
    mixSideFixed: false,
  },

  /**
   * 标签栏内容区配置
   *
   * Multi tabs setting
   */
  multiTabsSetting: {
    /**
     * 是否显示标签
     *
     * Whether to show the tab bar
     */
    show: true,
    /**
     * 标签高度
     *
     * Tabs height
     */
    height: 40,
    /**
     * 是否缓存当前使用的标签，刷新不消失
     *
     * Whether to cache the currently used tags, refresh does not disappear
     */
    cache: false,
    /**
     * 是否显示快捷按钮
     */
    showQuick: true,
    /**
     * 是否显示刷新按钮
     *
     * Whether to show the refresh button
     */
    showRedo: true,
    /**
     * 是否显示折叠按钮
     *
     * Whether to show the collapse button
     */
    showFold: true,
  },

  /**
   * 页面过渡配置
   *
   * Transition Setting
   */
  transitionSetting: {
    /**
     * 是否开启页面切换动画
     *
     * Whether to open the page switching animation
     */
    enable: true,

    /**
     * 路由基础切换动画
     *
     * Route basic switching animation
     */
    basicTransition: RouterTransitionEnum.FADE_SIDE,

    /**
     * 是否开启页面切换加载动画
     */
    openPageLoading: true,

    /**
     * 是否打开顶部进度条
     *
     * Whether to open the top progress bar
     */
    openNProgress: true,
  },
}

setting = {
  ...setting,
  // 请把复制的项目配置内容，粘贴到此处
  // Please paste the copied project configuration content here
  // ↓↓↓↓↓↓↓↓
  /* do something */
  // ↑↑↑↑↑↑↑↑
}

export default setting
