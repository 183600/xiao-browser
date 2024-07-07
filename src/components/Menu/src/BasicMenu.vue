<template>
  <ElMenu
    :default-active="getActiveKey"
    mode="horizontal"
    :class="getMenuClass"
    :router="true">
    <template v-for="item in items" :key="item.path">
      <BasicSubMenuItem :item="item" :prefixCls="`${prefixCls}-item`" :isHorizontal="isHorizontal" />
    </template>
  </ElMenu>
</template>

<script lang="ts">
import type { MenuState } from './types'

import { computed, defineComponent, unref, reactive, watch, toRefs, ref } from 'vue'
import { RouteLocationNormalizedLoaded, useRouter } from 'vue-router'
import { ElMenu } from 'element-plus'

import { MenuModeEnum, MenuTypeEnum } from '@/enums/menuEnum'
import { useMenuSetting } from '@/hooks/setting/useMenuSetting'
import { REDIRECT_NAME } from '@/router/constant'
import { useDesign } from '@/hooks/web/useDesign'
import { getCurrentParentPath } from '@/router/menus'
import { listenerRouteChange } from '@/logics/mitt/routeChange'
import { getAllParentPath } from '@/router/helper/menuHelper'

import BasicSubMenuItem from './components/BasicSubMenuItem.vue'
import { useOpenKeys } from './useOpenKeys'
import { basicProps } from './props'

export default defineComponent({
  name: 'BasicMenu',
  components: { ElMenu, BasicSubMenuItem },
  props: basicProps,
  emits: ['menuClick'],
  setup(props) {
    const isClickGo = ref(false)
    const currentActiveMenu = ref('')

    const menuState = reactive<MenuState>({
      defaultSelectedKeys: [],
      openKeys: [],
      selectedKeys: [],
      collapsedOpenKeys: [],
    })

    const { prefixCls } = useDesign('basic-menu')
    const { items, mode, accordion } = toRefs(props)

    const { getCollapsed, getTopMenuAlign, getSplit } = useMenuSetting()

    const { currentRoute } = useRouter()

    const { handleOpenChange, setOpenKeys, getOpenKeys } = useOpenKeys(menuState, items, mode as any, accordion)

    const getIsTopMenu = computed(() => {
      const { type, mode } = props

      return (type === MenuTypeEnum.TOP_MENU && mode === MenuModeEnum.HORIZONTAL) || (props.isHorizontal && unref(getSplit))
    })

    const getMenuClass = computed(() => {
      const align = props.isHorizontal && unref(getSplit) ? 'start' : unref(getTopMenuAlign)
      return [
        prefixCls,
        `${prefixCls}__align-${align}`,
        {
          [`${prefixCls}__second`]: !props.isHorizontal && unref(getSplit),
          [`${prefixCls}__sidebar-hor`]: unref(getIsTopMenu),
        },
      ]
    })

    const getInlineCollapseOptions = computed(() => {
      const isInline = props.mode === MenuModeEnum.INLINE

      const inlineCollapseOptions: { inlineCollapsed?: boolean } = {}
      if (isInline) {
        inlineCollapseOptions.inlineCollapsed = props.mixSider ? false : unref(getCollapsed)
      }
      return inlineCollapseOptions
    })

    listenerRouteChange((route) => {
      if (route.name === REDIRECT_NAME) return
      handleMenuChange(route)
      currentActiveMenu.value = route.meta?.currentActiveMenu as string

      if (unref(currentActiveMenu)) {
        menuState.selectedKeys = [unref(currentActiveMenu)]
        setOpenKeys(unref(currentActiveMenu))
      }
    })

    !props.mixSider &&
      watch(
        () => props.items,
        () => {
          handleMenuChange()
        },
      )

    async function handleMenuChange(route?: RouteLocationNormalizedLoaded) {
      if (unref(isClickGo)) {
        isClickGo.value = false
        return
      }
      const path = (route || unref(currentRoute)).meta?.currentActiveMenu || (route || unref(currentRoute)).path
      setOpenKeys(path)
      if (unref(currentActiveMenu)) return
      if (props.isHorizontal && unref(getSplit)) {
        const parentPath = await getCurrentParentPath(path)
        menuState.selectedKeys = [parentPath]
      } else {
        const parentPaths = await getAllParentPath(props.items, path)
        menuState.selectedKeys = parentPaths
      }
    }

    const getActiveKey = computed(() => {
      const v = menuState.selectedKeys
      if (v.length > 0) {
        return v[v.length - 1]
      }
      return null
    })

    return {
      prefixCls,
      getInlineCollapseOptions,
      getMenuClass,
      handleOpenChange,
      getOpenKeys,
      ...toRefs(menuState),
      getActiveKey,
    }
  },
})
</script>
<style lang="scss" src="./index.scss"></style>
