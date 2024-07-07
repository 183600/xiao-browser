<template>
  <ElMain :class="[prefixCls, `${prefixCls}--${getLayoutContentMode}`]">
    <RouterView>
      <template #default="{ Component, route }">
        <transition :name="getTransName(route)" mode="out-in" appear>
          <keep-alive v-if="openCache" :include="getCaches">
            <component :is="Component" :key="route.fullPath" />
          </keep-alive>
          <component v-else :is="Component" :key="route.fullPath" />
        </transition>
      </template>
    </RouterView>
    <FrameLayout v-if="getCanEmbedIFramePage" />
  </ElMain>
</template>

<script lang="ts">
import type { RouteLocationNormalizedLoaded } from 'vue-router'

import { computed, defineComponent, unref } from 'vue'
import { ElMain } from 'element-plus'

import { useDesign } from '@/hooks/web/useDesign'
import { useRootSetting } from '@/hooks/setting/useRootSetting'
import { useTransitionSetting } from '@/hooks/setting/useTransitionSetting'
import { useMultipleTabSetting } from '@/hooks/setting/useMultipleTabSetting'
import { useMultipleTabStore } from '@/store/modules/multipleTab'

import FrameLayout from '@/layouts/iframe/index.vue'
import { getTransitionName } from './transition'
import { useContentViewHeight } from './useContentViewHeight'

export default defineComponent({
  name: 'LayoutContent',
  components: { ElMain, FrameLayout },
  setup() {
    const { prefixCls } = useDesign('layout-content')
    const { getOpenPageLoading, getBasicTransition, getEnableTransition } = useTransitionSetting()
    const { getLayoutContentMode, getPageLoading, getOpenKeepAlive, getCanEmbedIFramePage } = useRootSetting()
    const { getShowMultipleTab } = useMultipleTabSetting()
    const tabStore = useMultipleTabStore()

    const openCache = computed(() => unref(getOpenKeepAlive) && unref(getShowMultipleTab))

    const getCaches = computed((): string[] => {
      if (!unref(getOpenKeepAlive)) {
        return []
      }
      return tabStore.getCachedTabList
    })

    const getTransName = (route: RouteLocationNormalizedLoaded) =>
      getTransitionName({
        route,
        openCache: unref(openCache),
        enableTransition: unref(getEnableTransition),
        cacheTabs: unref(getCaches),
        def: unref(getBasicTransition),
      })

    useContentViewHeight()
    return {
      prefixCls,
      getOpenPageLoading,
      getLayoutContentMode,
      getPageLoading,
      openCache,
      getEnableTransition,
      getBasicTransition,
      getCaches,
      getCanEmbedIFramePage,
      getTransName,
    }
  },
})
</script>

<style lang="scss">
$prefix-cls: '#{$tonyname}-layout-content';

.#{$prefix-cls} {
  position: relative;
  flex: 1;
  min-height: 0;
  padding: 0;
  overflow-x: hidden;
  overflow-y: auto;

  &--full {
    height: 100%;
  }

  &--fixed {
    width: 1200px;
    margin: 0 auto;
  }
}
</style>
