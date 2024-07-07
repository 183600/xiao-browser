<template>
  <ElContainer :class="[layoutClass]" v-bind="lockEvents">
    <LayoutHeader fixed v-if="getShowFullHeaderRef" />
    <LayoutSideBar v-if="getShowSidebar || getIsMobile" />
    <ElContainer :class="`${prefixCls}-main`">
      <LayoutFeatures />
      <LayoutMultipleHeader />
      <LayoutContent />
      <LayoutFooter />
    </ElContainer>
  </ElContainer>
</template>

<script lang="ts">
import { defineComponent, computed, unref } from 'vue'
import { ElContainer } from 'element-plus'

import { createAsyncComponent } from '@/utils/factory/createAsyncComponent'
import { useHeaderSetting } from '@/hooks/setting/useHeaderSetting'
import { useMenuSetting } from '@/hooks/setting/useMenuSetting'
import { useDesign } from '@/hooks/web/useDesign'
import { useLockPage } from '@/hooks/web/useLockPage'
import { useAppInject } from '@/hooks/web/useAppInject'

import LayoutHeader from './header/index.vue'
import LayoutContent from './content/index.vue'
import LayoutSideBar from './sider/index.vue'
import LayoutMultipleHeader from './header/MultipleHeader.vue'

export default defineComponent({
  name: 'DefaultLayout',
  components: {
    ElContainer,
    LayoutFeatures: createAsyncComponent(() => import('@/layouts/default/feature/index.vue')),
    LayoutFooter: createAsyncComponent(() => import('@/layouts/default/footer/index.vue')),
    LayoutHeader,
    LayoutContent,
    LayoutSideBar,
    LayoutMultipleHeader,
  },
  setup() {
    const { prefixCls } = useDesign('default-layout')
    const { getIsMobile } = useAppInject()
    const { getShowFullHeaderRef } = useHeaderSetting()
    const { getShowSidebar, getIsMixSidebar, getShowMenu } = useMenuSetting()

    // Create a lock screen monitor
    const lockEvents = useLockPage()

    const layoutClass = computed(() => {
      const cls: string[] = [prefixCls]
      if (unref(getIsMixSidebar) || unref(getShowMenu)) {
        cls.push(`${prefixCls}-has-sider`)
      }
      return cls
    })

    return {
      getShowFullHeaderRef,
      getShowSidebar,
      prefixCls,
      getIsMobile,
      getIsMixSidebar,
      layoutClass,
      lockEvents,
    }
  },
})
</script>
<style lang="scss">
$prefix-cls: '#{$tonyname}-default-layout';

.#{$prefix-cls} {
  display: flex;
  width: 100%;
  height: 100%;
  background-color: var(--background-main-color);

  &-main {
    flex-direction: column;
    width: 100%;
  }
}
</style>
