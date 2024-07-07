<template>
  <ElMenuItem v-if="!menuHasChildren(item) && getShowMenu" :index="item.path">
    {{ item.name }}
  </ElMenuItem>
  <ElSubMenu
    v-if="menuHasChildren(item) && getShowMenu"
    :key="`submenu-${item.path}`"
    :index="item.path"
    popper-class="app-top-menu-popup">
    <template #title>
      <MenuItemContent :item="item" :class="`${prefixCls}-content`" />
    </template>

    <template v-for="childrenItem in item.children || []" :key="childrenItem.path">
      <BasicSubMenuItem :item="childrenItem" />
    </template>
  </ElSubMenu>
</template>

<script lang="ts">
import type { Menu as MenuType } from '@/router/types'

import { defineComponent, computed } from 'vue'
import { ElSubMenu, ElMenuItem } from 'element-plus'

import { itemProps } from '../props'
import MenuItemContent from './MenuItemContent.vue'

export default defineComponent({
  name: 'BasicSubMenuItem',
  isSubMenu: true,
  components: { ElSubMenu, ElMenuItem, MenuItemContent },
  props: itemProps,
  setup(props) {
    const getShowMenu = computed(() => !props.item.meta?.hideMenu)
    function menuHasChildren(menuTreeItem: MenuType): boolean {
      return !menuTreeItem.meta?.hideChildrenInMenu && Reflect.has(menuTreeItem, 'children') && !!menuTreeItem.children && menuTreeItem.children.length > 0
    }
    return {
      menuHasChildren,
      getShowMenu,
    }
  },
})
</script>
