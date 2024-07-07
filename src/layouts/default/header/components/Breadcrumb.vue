<template>
  <ElBreadcrumb separator="/" :class="prefixCls">
    <ElBreadcrumbItem v-for="route in routes" :key="route.name">
      <Icon :name="getIcon(route)" class="mr-1" v-if="getShowBreadCrumbIcon && getIcon(route)" />
      <span v-if="!hasRedirect(routes, route)">
        {{ route.name || route.meta.title }}
      </span>
      <router-link v-else to="" @click="handleClick(route, routes, $event)">
        {{ route.name || route.meta.title }}
      </router-link>
    </ElBreadcrumbItem>
  </ElBreadcrumb>
</template>

<script lang="ts">
import type { RouteLocationMatched } from 'vue-router'
import type { Menu } from '@/router/types'

import { defineComponent, ref, watchEffect } from 'vue'
import { ElBreadcrumb, ElBreadcrumbItem } from 'element-plus'
import { useRouter } from 'vue-router'

import Icon from '@/components/Icon'
import { useDesign } from '@/hooks/web/useDesign'
import { useRootSetting } from '@/hooks/setting/useRootSetting'
import { useGo } from '@/hooks/web/usePage'
import { filter } from '@/utils/helper/treeHelper'
import { getMenus } from '@/router/menus'
import { REDIRECT_NAME } from '@/router/constant'
import { getAllParentPath } from '@/router/helper/menuHelper'

export default defineComponent({
  name: 'LayoutBreadcrumb',
  components: { ElBreadcrumb, ElBreadcrumbItem, Icon },
  props: {},
  setup() {
    const routes = ref<any[]>([])
    const { currentRoute } = useRouter()
    const { prefixCls } = useDesign('layout-header-breadcrumb')
    const { getShowBreadCrumbIcon } = useRootSetting()
    const go = useGo()

    watchEffect(async() => {
      if (currentRoute.value.name === REDIRECT_NAME) return
      const menus = await getMenus()

      const routeMatched = currentRoute.value.matched
      const cur = routeMatched?.[routeMatched.length - 1]
      let path = currentRoute.value.path

      if (cur && cur?.meta?.currentActiveMenu) {
        path = cur.meta.currentActiveMenu as string
      }

      const parent = getAllParentPath(menus, path)
      const filterMenus = menus.filter((item) => item.path === parent[0])
      const matched = getMatched(filterMenus, parent) as any

      if (!matched || matched.length === 0) return

      const breadcrumbList = filterItem(matched)

      if (currentRoute.value.meta?.currentActiveMenu) {
        breadcrumbList.push({
          ...currentRoute.value,
          name: currentRoute.value.meta?.title || currentRoute.value.name,
        } as unknown as RouteLocationMatched)
      }
      routes.value = breadcrumbList
    })

    function getMatched(menus: Menu[], parent: string[]) {
      const metched: Menu[] = []
      menus.forEach((item) => {
        if (parent.includes(item.path)) {
          metched.push({
            ...item,
            name: item.meta?.title || item.name,
          })
        }
        if (item.children?.length) {
          metched.push(...getMatched(item.children, parent))
        }
      })
      return metched
    }

    function filterItem(list: RouteLocationMatched[]) {
      return filter(list, (item) => {
        const { meta, name } = item
        if (!meta) {
          return !!name
        }
        const { title, hideBreadcrumb } = meta
        if (!title || hideBreadcrumb) {
          return false
        }
        return true
      }).filter((item) => !item.meta?.hideBreadcrumb)
    }

    function handleClick(route: RouteLocationMatched, paths: string[], e: Event) {
      e?.preventDefault()
      const { children, redirect, meta } = route

      if (children?.length && !redirect) {
        e?.stopPropagation()
        return
      }
      if (meta?.carryParam) {
        return
      }

      if (redirect && typeof redirect === 'string') {
        go(redirect)
      } else {
        let goPath = ''
        if (paths.length === 1) {
          goPath = paths[0]
        } else {
          const ps = paths.slice(1)
          const lastPath = ps.pop() || ''
          goPath = `${lastPath}`
        }
        goPath = /^\//.test(goPath) ? goPath : `/${goPath}`
        go(goPath)
      }
    }

    function hasRedirect(routes: RouteLocationMatched[], route: RouteLocationMatched) {
      return routes.indexOf(route) !== routes.length - 1
    }

    function getIcon(route: RouteLocationMatched) {
      return route.meta?.icon as string
    }

    return {
      routes,
      prefixCls,
      getIcon,
      getShowBreadCrumbIcon,
      handleClick,
      hasRedirect,
    }
  },
})
</script>

<style lang="scss">
$prefix-cls: '#{$tonyname}-layout-header-breadcrumb';

.#{$prefix-cls} {
  padding: 0 8px;

  .el-breadcrumb__item {
    .el-breadcrumb__separator {
      margin: 0 8px;
      font-size: 12px;
      font-weight: normal;
      color: inherit;
      opacity: 0.6;
    }

    .el-breadcrumb__inner {
      display: inline-flex;
      color: inherit;
      vertical-align: top;

      a,
      span {
        font-weight: normal;
        color: inherit;
      }

      &:hover a {
        color: var(--primary-color, inherit);
      }
    }
  }
}
</style>
