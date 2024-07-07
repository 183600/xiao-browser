<template>
  <div :class="getWrapClass">
    <ElTabs v-model="activeKeyRef" @tab-click="handleChange" @edit="handleEdit">
      <template v-for="item in getTabsState" :key="item.query ? item.fullPath : item.path">
        <ElTabPane :name="item.query ? item.fullPath : item.path" :closable="!(item && item.meta && item.meta.affix)">
          <template #label>
            <TabContent :tabItem="item" :prefixCls="prefixCls" />
          </template>
        </ElTabPane>
      </template>
    </ElTabs>
    <div :class="`${prefixCls}__extra`" v-if="getShowRedo || getShowQuick">
      <TabRedo v-if="getShowRedo" :class="`${prefixCls}__extra-btn`" />
      <FoldButton v-if="getShowQuick" :class="`${prefixCls}__extra-btn`" />
      <span :class="`${prefixCls}__extra-btn`">
        <TabContent
          :type="1"
          :prefixCls="`${prefixCls}__extra`"
          :tabItem="$route"
          v-if="getShowFold" />
      </span>
    </div>
  </div>
</template>

<script lang="ts">
import type { RouteLocationNormalized, RouteMeta } from 'vue-router'

import { defineComponent, computed, unref, ref, toRaw } from 'vue'
import { ElTabs, ElTabPane } from 'element-plus'
import { useRouter } from 'vue-router'

import { useGo } from '@/hooks/web/usePage'
import { useMultipleTabStore } from '@/store/modules/multipleTab'
import { useUserStore } from '@/store/modules/user'
import { useDesign } from '@/hooks/web/useDesign'
import { REDIRECT_NAME } from '@/router/constant'
import { listenerRouteChange } from '@/logics/mitt/routeChange'
import { useMultipleTabSetting } from '@/hooks/setting/useMultipleTabSetting'

import TabContent from './components/TabContent.vue'
import FoldButton from './components/FoldButton.vue'
import TabRedo from './components/TabRedo.vue'

export default defineComponent({
  name: 'MultipleTabs',
  components: { ElTabs, ElTabPane, TabContent, TabRedo, FoldButton },
  setup() {
    const activeKeyRef = ref('')

    const tabStore = useMultipleTabStore()
    const userStore = useUserStore()
    const router = useRouter()

    const { prefixCls } = useDesign('multiple-tabs')
    const go = useGo()
    const { getShowQuick, getShowRedo, getShowFold } = useMultipleTabSetting()

    const getTabsState = computed(() => {
      return tabStore.getTabList.filter((item) => !item.meta?.hideTab)
    })

    const unClose = computed(() => unref(getTabsState).length === 1)

    const getWrapClass = computed(() => {
      return [
        prefixCls,
        {
          [`${prefixCls}--hide-close`]: unref(unClose),
        },
      ]
    })

    listenerRouteChange((route) => {
      const { name } = route
      if (name === REDIRECT_NAME || !route || !userStore.getToken) {
        return
      }

      const { path, fullPath, meta = {} } = route
      const { currentActiveMenu, hideTab } = meta as RouteMeta
      const isHide = !hideTab ? null : currentActiveMenu
      const p = isHide || fullPath || path
      if (activeKeyRef.value !== p) {
        activeKeyRef.value = p as string
      }

      if (isHide) {
        const findParentRoute = router.getRoutes().find((item) => item.path === currentActiveMenu)

        findParentRoute && tabStore.addTab(findParentRoute as unknown as RouteLocationNormalized)
      } else {
        tabStore.addTab(unref(route))
      }
    })

    function handleChange(tab: any) {
      const activeKey = unref(toRaw(tab).paneName)
      activeKeyRef.value = activeKey
      go(activeKey, false)
    }

    // Close the current tab
    function handleEdit(targetKey: string) {
      // Added operation to hide, currently only use delete operation
      if (unref(unClose)) {
        return
      }
      tabStore.closeTabByKey(targetKey, router)
    }

    return {
      prefixCls,
      getWrapClass,
      getShowQuick,
      getShowRedo,
      getShowFold,
      handleEdit,
      handleChange,
      activeKeyRef,
      getTabsState,
    }
  },
})
</script>

<style lang="scss" src="./index.scss"></style>
