import type { HeaderSetting } from '#/config'

import { computed, unref } from 'vue'

import { useAppStore } from '@/store/modules/app'

import { useMenuSetting } from '@/hooks/setting/useMenuSetting'
import { useRootSetting } from '@/hooks/setting/useRootSetting'
import { useFullContent } from '@/hooks/web/useFullContent'
import { MenuModeEnum } from '@/enums/menuEnum'

/**
 * 使用头部配置项
 *
 * Reactive header setting
 */
export function useHeaderSetting() {
  const { getFullContent } = useFullContent()
  const appStore = useAppStore()
  const { getMenuMode, getSplit, getShowHeaderTrigger, getIsSidebarType, getIsMixSidebar, getIsTopMenu } = useMenuSetting()
  const { getShowBreadCrumb, getShowLogo } = useRootSetting()

  /**
   * 获取是否显示头部状态
   */
  const getShowHeader = computed(() => appStore.getHeaderSetting.show)

  /**
   * 获取是否混合头部状态
   */
  const getShowMixHeaderRef = computed(() => !unref(getIsSidebarType) && unref(getShowHeader))

  /**
   * 获取是否完整头部状态
   */
  const getShowFullHeaderRef = computed(() => {
    return !unref(getFullContent) && unref(getShowMixHeaderRef) && unref(getShowHeader) && !unref(getIsTopMenu) && !unref(getIsMixSidebar)
  })

  /**
   * 获取是否非固定头部状态
   */
  const getShowInsetHeaderRef = computed(() => {
    const need = !unref(getFullContent) && unref(getShowHeader)
    return (need && !unref(getShowMixHeaderRef)) || (need && unref(getIsTopMenu)) || (need && unref(getIsMixSidebar))
  })

  /**
   * 获取是否显示文档入口
   */
  const getShowDoc = computed(() => appStore.getHeaderSetting.showDoc)

  /**
   * 获取是否固定头部
   */
  const getFixed = computed(() => appStore.getHeaderSetting.fixed)

  /**
   * 获取背景颜色
   */
  const getHeaderBgColor = computed(() => appStore.getHeaderSetting.bgColor)

  /**
   * 获取是否显示搜索图标
   */
  const getShowSearch = computed(() => appStore.getHeaderSetting.showSearch)

  /**
   * 获取是否显示锁屏按钮
   */
  const getUseLockPage = computed(() => appStore.getHeaderSetting.useLockPage)

  /**
   * 获取是否显示全屏按钮
   */
  const getShowFullScreen = computed(() => appStore.getHeaderSetting.showFullScreen)

  /**
   * 获取是否显示通知按钮
   */
  const getShowNotice = computed(() => appStore.getHeaderSetting.showNotice)

  /**
   * 获取是否显示面包屑
   */
  const getShowBread = computed(() => {
    return unref(getMenuMode) !== MenuModeEnum.HORIZONTAL && unref(getShowBreadCrumb) && !unref(getSplit)
  })

  /**
   * 获取是否显示Logo
   */
  const getShowHeaderLogo = computed(() => {
    return unref(getShowLogo) && !unref(getIsSidebarType) && !unref(getIsMixSidebar)
  })

  /**
   * 获取是否显示头部内容区
   */
  const getShowContent = computed(() => {
    return unref(getShowBread) || unref(getShowHeaderTrigger)
  })

  /**
   * 修改头部配置项
   *
   * Set header configuration
   * @param headerSetting
   */
  function setHeaderSetting(headerSetting: Partial<HeaderSetting>) {
    appStore.setProjectConfig({ headerSetting })
  }
  return {
    setHeaderSetting,

    getShowHeader,
    getShowMixHeaderRef,
    getShowFullHeaderRef,
    getShowInsetHeaderRef,
    getShowDoc,
    getFixed,
    getHeaderBgColor,
    getShowSearch,
    getUseLockPage,
    getShowFullScreen,
    getShowNotice,
    getShowBread,
    getShowHeaderLogo,
    getShowContent,
  }
}
