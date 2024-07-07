<template>
  <MenuItem
    v-if="!menuHasChildren(item) && getShowMenu"
    :name="item.path"
    :disabled="item?.disabled"
    :class="getLevelClass">
    <Icon v-if="getIcon" :name="getIcon" />
    <div v-if="collapsedShowTitle && getIsCollapseParent" class="mt-1 collapse-title">
      {{ getName }}
    </div>
    <template #title>
      <span :class="`${prefixCls}-sub-title`">{{ getName }}</span>
      <SimpleMenuTag :item="item" :collapseParent="getIsCollapseParent" />
    </template>
  </MenuItem>
  <SubMenu
    :name="item.path"
    v-if="menuHasChildren(item) && getShowMenu"
    :class="getLevelClass"
    :collapsedShowTitle="collapsedShowTitle">
    <template #title>
      <Icon v-if="getIcon" :name="getIcon" />
      <div v-if="collapsedShowTitle && getIsCollapseParent" class="collapse-title">
        {{ getName }}
      </div>

      <span v-show="getShowSubTitle" :class="`${prefixCls}-sub-title`">
        {{ getName }}
      </span>
      <SimpleMenuTag :item="item" :collapseParent="!!collapse && !!parent" />
    </template>
    <template v-for="childrenItem in item.children || []" :key="childrenItem.path">
      <SimpleSubMenu :collapsedShowTitle="collapsedShowTitle" :item="childrenItem" :parent="false" />
    </template>
  </SubMenu>
</template>

<script lang="ts">
import type { Menu as MenuType } from '@/router/types'

import { defineComponent, computed } from 'vue'

import { useDesign } from '@/hooks/web/useDesign'
import Icon from '@/components/Icon'
import { createAsyncComponent } from '@/utils/factory/createAsyncComponent'

import MenuItem from './components/MenuItem.vue'
import SubMenu from './components/SubMenuItem.vue'

export default defineComponent({
  name: 'SimpleSubMenu',
  components: {
    SubMenu,
    MenuItem,
    SimpleMenuTag: createAsyncComponent(() => import('./SimpleMenuTag.vue')),
    Icon,
  },
  props: {
    item: {
      type: Object as PropType<MenuType>,
      default: () => ({}),
    },
    parent: Boolean,
    collapsedShowTitle: Boolean,
    collapse: Boolean,
  },
  setup(props) {
    const { prefixCls } = useDesign('simple-menu')

    const getShowMenu = computed(() => !props.item?.meta?.hideMenu)
    const getIcon = computed(() => props.item?.icon)
    const getName = computed(() => props.item?.name)
    const getShowSubTitle = computed(() => !props.collapse || !props.parent)
    const getIsCollapseParent = computed(() => !!props.collapse && !!props.parent)
    const getLevelClass = computed(() => {
      return [
        {
          [`${prefixCls}__parent`]: props.parent,
          [`${prefixCls}__children`]: !props.parent,
        },
      ]
    })

    function menuHasChildren(menuTreeItem: MenuType): boolean {
      return !menuTreeItem.meta?.hideChildrenInMenu && Reflect.has(menuTreeItem, 'children') && !!menuTreeItem.children && menuTreeItem.children.length > 0
    }

    return {
      prefixCls,
      menuHasChildren,
      getShowMenu,
      getIcon,
      getName,
      getShowSubTitle,
      getLevelClass,
      getIsCollapseParent,
    }
  },
})
</script>
