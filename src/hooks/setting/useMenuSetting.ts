import type { MenuSetting } from '#/config'

import { computed, unref } from 'vue'

import { useAppStore } from '@/store/modules/app'

import { SIDE_BAR_MINI_WIDTH, SIDE_BAR_SHOW_TIT_MINI_WIDTH } from '@/enums/appEnum'
import { MenuModeEnum, MenuTypeEnum, TriggerEnum } from '@/enums/menuEnum'
import { useFullContent } from '@/hooks/web/useFullContent'

/**
 * 使用菜单配置项
 *
 * Reactive menu setting
 */
export function useMenuSetting() {
  const { getFullContent } = useFullContent()
  const appStore = useAppStore()

  /**
   * 获取是否显示菜单
   */
  const getShowMenu = computed(() => appStore.getMenuSetting.show)

  /**
   * 获取是否分割菜单
   */
  const getSplit = computed(() => appStore.getMenuSetting.split)

  /**
   * 获取菜单显示位置
   */
  const getMenuMode = computed(() => appStore.getMenuSetting.mode)

  /**
   * 获取是否显示侧边菜单
   */
  const getShowSidebar = computed(() => {
    return unref(getSplit) || (unref(getShowMenu) && unref(getMenuMode) !== MenuModeEnum.HORIZONTAL && !unref(getFullContent))
  })

  /**
   * 获取菜单初始折叠状态
   */
  const getCollapsed = computed(() => appStore.getMenuSetting.collapsed)

  /**
   * 获取菜单显示类型
   */
  const getMenuType = computed(() => appStore.getMenuSetting.type)

  /**
   * 获取菜单是否固定
   */
  const getMenuFixed = computed(() => appStore.getMenuSetting.fixed)

  /**
   * 获取菜单是否隐藏
   */
  const getMenuHidden = computed(() => appStore.getMenuSetting.hidden)

  /**
   * 获取菜单宽度
   */
  const getMenuWidth = computed(() => appStore.getMenuSetting.menuWidth)

  /**
   * 获取菜单收缩触发按钮位置
   */
  const getTrigger = computed(() => appStore.getMenuSetting.trigger)

  /**
   * 获取菜单背景颜色
   */
  const getMenuBgColor = computed(() => appStore.getMenuSetting.bgColor)

  /**
   * 获取混合菜单触发方式
   */
  const getMixSideTrigger = computed(() => appStore.getMenuSetting.mixSideTrigger)

  /**
   * 获取侧边菜单大小是否能拖动
   */
  const getCanDrag = computed(() => appStore.getMenuSetting.canDrag)

  /**
   * 获取侧边菜单是否手风琴模式
   */
  const getAccordion = computed(() => appStore.getMenuSetting.accordion)

  /**
   * 获取侧边混合固定状态
   */
  const getMixSideFixed = computed(() => appStore.getMenuSetting.mixSideFixed)

  /**
   * 获取头部菜单对齐位置
   */
  const getTopMenuAlign = computed(() => appStore.getMenuSetting.topMenuAlign)

  /**
   * 获取是否切换页面时关闭菜单
   */
  const getCloseMixSidebarOnChange = computed(() => appStore.getMenuSetting.closeMixSidebarOnChange)

  /**
   * 获取是否侧边菜单
   */
  const getIsSidebarType = computed(() => unref(getMenuType) === MenuTypeEnum.SIDEBAR)

  /**
   * 获取是否头部菜单
   */
  const getIsTopMenu = computed(() => unref(getMenuType) === MenuTypeEnum.TOP_MENU)

  /**
   * 获取是否收缩后显示菜单标题
   */
  const getCollapsedShowTitle = computed(() => appStore.getMenuSetting.collapsedShowTitle)

  /**
   * 获取是否显示头部菜单
   */
  const getShowTopMenu = computed(() => {
    return unref(getMenuMode) === MenuModeEnum.HORIZONTAL || unref(getSplit)
  })

  /**
   * 获取是否显示头部的菜单收缩触发按钮
   */
  const getShowHeaderTrigger = computed(() => {
    if (unref(getMenuType) === MenuTypeEnum.TOP_MENU || !unref(getShowMenu) || unref(getMenuHidden)) {
      return false
    }

    return unref(getTrigger) === TriggerEnum.HEADER
  })

  /**
   * 获取是否菜单为水平模式
   */
  const getIsHorizontal = computed(() => {
    return unref(getMenuMode) === MenuModeEnum.HORIZONTAL
  })

  /**
   * 获取菜单是否侧边混合模式
   */
  const getIsMixSidebar = computed(() => {
    return unref(getMenuType) === MenuTypeEnum.MIX_SIDEBAR
  })

  /**
   * 获取菜单是否顶部混合模式
   */
  const getIsMixMode = computed(() => {
    return unref(getMenuMode) === MenuModeEnum.INLINE && unref(getMenuType) === MenuTypeEnum.MIX
  })

  /**
   * 获取菜单收缩后的宽度
   */
  const getMiniWidthNumber = computed(() => {
    const { collapsedShowTitle } = appStore.getMenuSetting
    return collapsedShowTitle ? SIDE_BAR_SHOW_TIT_MINI_WIDTH : SIDE_BAR_MINI_WIDTH
  })

  /**
   * 获取菜单真实的宽度
   */
  const getRealWidth = computed(() => {
    if (unref(getIsMixSidebar)) {
      return unref(getCollapsed) && !unref(getMixSideFixed) ? unref(getMiniWidthNumber) : unref(getMenuWidth)
    }
    return unref(getCollapsed) ? unref(getMiniWidthNumber) : unref(getMenuWidth)
  })

  /**
   * 获取菜单内容宽度
   */
  const getCalcContentWidth = computed(() => {
    const width =
      unref(getIsTopMenu) || !unref(getShowMenu) || (unref(getSplit) && unref(getMenuHidden))
        ? 0
        : unref(getIsMixSidebar)
          ? unref(getCollapsed)
            ? SIDE_BAR_MINI_WIDTH
            : SIDE_BAR_SHOW_TIT_MINI_WIDTH
          : unref(getRealWidth)

    return `calc(100% - ${unref(width)}px)`
  })

  /**
   * 修改菜单配置项
   *
   * Set menu configuration
   * @param menuSetting
   */
  function setMenuSetting(menuSetting: Partial<MenuSetting>): void {
    appStore.setProjectConfig({ menuSetting })
  }

  /**
   * 展开/收缩菜单
   *
   * Toggle collapse menu
   */
  function toggleCollapsed() {
    setMenuSetting({
      collapsed: !unref(getCollapsed),
    })
  }
  return {
    setMenuSetting,
    toggleCollapsed,

    getShowMenu,
    getSplit,
    getMenuMode,
    getShowSidebar,
    getCollapsed,
    getMenuType,
    getMenuFixed,
    getMenuHidden,
    getMenuWidth,
    getTrigger,
    getMenuBgColor,
    getMixSideTrigger,
    getCanDrag,
    getAccordion,
    getMixSideFixed,
    getTopMenuAlign,
    getCloseMixSidebarOnChange,
    getIsSidebarType,
    getIsTopMenu,
    getCollapsedShowTitle,
    getShowTopMenu,
    getShowHeaderTrigger,
    getIsHorizontal,
    getIsMixSidebar,
    getIsMixMode,
    getMiniWidthNumber,
    getRealWidth,
    getCalcContentWidth,
  }
}
