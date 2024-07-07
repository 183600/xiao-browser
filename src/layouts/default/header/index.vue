<template>
  <ElHeader :class="getHeaderClass">
    <div :class="`${prefixCls}-left`">
      <AppLogo v-if="getShowHeaderLogo || getIsMobile" :class="`${prefixCls}-logo`" :style="getLogoWidth" />
      <LayoutTrigger :class="`${prefixCls}-trigger`" v-if="(getShowContent && getShowHeaderTrigger && !getSplit && !getIsMixSidebar) || getIsMobile" />
      <LayoutBreadcrumb v-if="getShowContent && getShowBread" />
    </div>

    <div :class="`${prefixCls}-menu`" v-if="getShowTopMenu && !getIsMobile">
      <LayoutMenu :isHorizontal="true" :splitType="getSplitType" :menuMode="getMenuMode" />
    </div>

    <div :class="`${prefixCls}-action`">
      <AppSearch :class="`${prefixCls}-action__item `" v-if="getShowSearch" />

      <ErrorAction v-if="getUseErrorHandle" :class="`${prefixCls}-action__item`" />

      <Notify v-if="getShowNotice" :class="`${prefixCls}-action__item`" />

      <FullScreen v-if="getShowFullScreen" :class="`${prefixCls}-action__item`" />

      <UserDropDown :class="`${prefixCls}-action__item`" />

      <SettingDrawer v-if="getShowSetting" :class="`${prefixCls}-action__item`" />
    </div>
  </ElHeader>
</template>

<script lang="ts">
import { defineComponent, unref, computed } from 'vue'
import { ElHeader } from 'element-plus'

import { AppLogo } from '@/components/Application'
import { useHeaderSetting } from '@/hooks/setting/useHeaderSetting'
import { useMenuSetting } from '@/hooks/setting/useMenuSetting'
import { useRootSetting } from '@/hooks/setting/useRootSetting'
import { MenuModeEnum, MenuSplitTyeEnum } from '@/enums/menuEnum'
import { SettingButtonPositionEnum } from '@/enums/appEnum'
import { useAppInject } from '@/hooks/web/useAppInject'
import { useDesign } from '@/hooks/web/useDesign'
import { createAsyncComponent } from '@/utils/factory/createAsyncComponent'

import LayoutMenu from '../menu/index.vue'
import LayoutTrigger from '../trigger/index.vue'
import { UserDropDown, LayoutBreadcrumb, FullScreen, Notify, ErrorAction, AppSearch } from './components'

export default defineComponent({
  name: 'LayoutHeader',
  components: {
    ElHeader,
    AppLogo,
    LayoutTrigger,
    LayoutBreadcrumb,
    LayoutMenu,
    UserDropDown,
    FullScreen,
    Notify,
    AppSearch,
    ErrorAction,
    SettingDrawer: createAsyncComponent(() => import('@/layouts/default/setting/index.vue'), {
      loading: true,
    }),
  },
  props: {
    fixed: Boolean,
  },
  setup(props) {
    const { prefixCls } = useDesign('layout-header')
    const { getShowTopMenu, getShowHeaderTrigger, getSplit, getIsMixMode, getMenuWidth, getIsMixSidebar } = useMenuSetting()
    const { getUseErrorHandle, getShowSettingButton, getSettingButtonPosition } = useRootSetting()

    const { getShowFullScreen, getShowNotice, getShowContent, getShowBread, getShowHeaderLogo, getShowHeader, getShowSearch } = useHeaderSetting()

    const { getIsMobile } = useAppInject()

    const getHeaderClass = computed(() => {
      return [
        prefixCls,
        {
          [`${prefixCls}--fixed`]: props.fixed,
          [`${prefixCls}--mobile`]: unref(getIsMobile),
        },
      ]
    })

    const getShowSetting = computed(() => {
      if (!unref(getShowSettingButton)) {
        return false
      }
      const settingButtonPosition = unref(getSettingButtonPosition)

      if (settingButtonPosition === SettingButtonPositionEnum.AUTO) {
        return unref(getShowHeader)
      }
      return settingButtonPosition === SettingButtonPositionEnum.HEADER
    })

    const getLogoWidth = computed(() => {
      if (!unref(getIsMixMode) || unref(getIsMobile)) {
        return {}
      }
      const width = unref(getMenuWidth) < 180 ? 180 : unref(getMenuWidth)
      return { width: `${width}px` }
    })

    const getSplitType = computed(() => {
      return unref(getSplit) ? MenuSplitTyeEnum.TOP : MenuSplitTyeEnum.NONE
    })

    const getMenuMode = computed(() => {
      return unref(getSplit) ? MenuModeEnum.HORIZONTAL : null
    })

    return {
      prefixCls,
      getHeaderClass,
      getShowHeaderLogo,
      getShowHeaderTrigger,
      getIsMobile,
      getShowBread,
      getShowContent,
      getSplitType,
      getSplit,
      getMenuMode,
      getShowTopMenu,
      getShowFullScreen,
      getShowNotice,
      getUseErrorHandle,
      getLogoWidth,
      getIsMixSidebar,
      getShowSettingButton,
      getShowSetting,
      getShowSearch,
    }
  },
})
</script>
<style lang="scss" src="./index.scss"></style>
