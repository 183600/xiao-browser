<template>
  <ElDrawer
    v-if="getIsMobile"
    v-bind="getBindValues"
    @close="handleClose">
    <Sider />
  </ElDrawer>
  <MixSider v-else-if="getIsMixSidebar" />
  <Sider v-else />
</template>

<script lang="ts">
import type { EleDrawer } from '@/components/ElementPlus'

import { defineComponent, unref, computed } from 'vue'
import { ElDrawer } from 'element-plus'

import { useAppInject } from '@/hooks/web/useAppInject'
import { useMenuSetting } from '@/hooks/setting/useMenuSetting'
import { useDesign } from '@/hooks/web/useDesign'

import Sider from './LayoutSider.vue'
import MixSider from './MixSider.vue'

export default defineComponent({
  name: 'SiderWrapper',
  components: { ElDrawer, Sider, MixSider },
  setup() {
    const { prefixCls } = useDesign('layout-sider-wrapper')
    const { getIsMobile } = useAppInject()
    const { setMenuSetting, getCollapsed, getMenuWidth, getIsMixSidebar } = useMenuSetting()

    const getBindValues = computed(() => {
      const opts = {
        direction: 'ltr',
        class: prefixCls, // compatible 2.3+
        customClass: prefixCls,
        size: unref(getMenuWidth),
        modelValue: !unref(getCollapsed),
      }
      return opts as EleDrawer
    })

    function handleClose() {
      setMenuSetting({
        collapsed: true,
      })
    }

    return { prefixCls, getBindValues, getIsMobile, getCollapsed, handleClose, getMenuWidth, getIsMixSidebar }
  },
})
</script>
<style lang="scss">
$prefix-cls: '#{$tonyname}-layout-sider-wrapper';

.#{$prefix-cls} {
  --el-drawer-bg-color: var(--sider-background-color);
}
</style>
