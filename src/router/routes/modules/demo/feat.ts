import type { AppRouteModule } from '@/router/types'

import { getParentLayout, LAYOUT } from '@/router/constant'

const feat: AppRouteModule = {
  path: '/feat',
  name: 'FeatDemo',
  component: LAYOUT,
  redirect: '/feat/icon',
  meta: {
    orderNo: 3,
    icon: 'ep:compass',
    title: '功能',
  },

  children: [
    {
      path: 'icon',
      name: 'IconDemo',
      component: () => import('@/views/demo/feat/icon/index.vue'),
      meta: {
        title: '图标',
      },
    },
    {
      path: 'ws',
      name: 'WebSocket',
      component: () => import('@/views/demo/feat/ws/index.vue'),
      meta: {
        title: 'websocket测试',
      },
    },
    {
      path: 'session-timeout',
      name: 'SessionTimeout',
      component: () => import('@/views/demo/feat/session-timeout/index.vue'),
      meta: {
        title: '登录过期',
      },
    },
    {
      path: 'print',
      name: 'Print',
      component: () => import('@/views/demo/feat/print/index.vue'),
      meta: {
        title: '水印',
      },
    },
    {
      path: 'tabs',
      name: 'TabsDemo',
      component: () => import('@/views/demo/feat/tabs/index.vue'),
      meta: {
        title: '标签页操作',
      },
    },
    {
      path: 'breadcrumb',
      name: 'BreadcrumbDemo',
      redirect: '/feat/breadcrumb/flat',
      component: getParentLayout('BreadcrumbDemo'),
      meta: {
        title: '面包屑导航',
      },

      children: [
        {
          path: 'flat',
          name: 'BreadcrumbFlatDemo',
          component: () => import('@/views/demo/feat/breadcrumb/FlatList.vue'),
          meta: {
            title: '平级模式',
          },
        },
        {
          path: 'flatDetail',
          name: 'BreadcrumbFlatDetailDemo',
          component: () => import('@/views/demo/feat/breadcrumb/FlatListDetail.vue'),
          meta: {
            title: '平级详情',
            hideMenu: true,
            hideTab: true,
            currentActiveMenu: '/feat/breadcrumb/flat',
          },
        },
        {
          path: 'children',
          name: 'BreadcrumbChildrenDemo',
          component: () => import('@/views/demo/feat/breadcrumb/ChildrenList.vue'),
          meta: {
            title: '层级模式',
          },
          children: [
            {
              path: 'childrenDetail',
              name: 'BreadcrumbChildrenDetailDemo',
              component: () => import('@/views/demo/feat/breadcrumb/ChildrenListDetail.vue'),
              meta: {
                currentActiveMenu: '/feat/breadcrumb/children',
                title: '层级详情',
                // hideTab: true,
                // hideMenu: true,
              },
            },
          ],
        },
      ],
    },

    {
      path: 'context-menu',
      name: 'ContextMenuDemo',
      component: () => import('@/views/demo/feat/context-menu/index.vue'),
      meta: {
        title: '右键菜单',
      },
    },
    {
      path: 'download',
      name: 'DownLoadDemo',
      component: () => import('@/views/demo/feat/download/index.vue'),
      meta: {
        title: '文件下载',
      },
    },
    {
      path: 'click-outside',
      name: 'ClickOutsideDemo',
      component: () => import('@/views/demo/feat/click-outside/index.vue'),
      meta: {
        title: 'ClickOutside组件',
      },
    },
    {
      path: 'copy',
      name: 'CopyDemo',
      component: () => import('@/views/demo/feat/copy/index.vue'),
      meta: {
        title: '剪切板',
      },
    },
    {
      path: 'msg',
      name: 'MsgDemo',
      component: () => import('@/views/demo/feat/msg/index.vue'),
      meta: {
        title: '消息提示',
      },
    },
    {
      path: 'watermark',
      name: 'WatermarkDemo',
      component: () => import('@/views/demo/feat/watermark/index.vue'),
      meta: {
        title: '水印',
      },
    },
    {
      path: 'ripple',
      name: 'RippleDemo',
      component: () => import('@/views/demo/feat/ripple/index.vue'),
      meta: {
        title: '水波纹',
      },
    },
    {
      path: 'full-screen',
      name: 'FullScreenDemo',
      component: () => import('@/views/demo/feat/full-screen/index.vue'),
      meta: {
        title: '全屏',
      },
    },
    {
      path: '/error-log',
      name: 'ErrorLog',
      component: () => import('@/views/sys/error-log/index.vue'),
      meta: {
        title: '错误日志',
      },
    },
    {
      path: 'testTab/:id',
      name: 'TestTab',
      component: () => import('@/views/demo/feat/tab-params/index.vue'),
      meta: {
        title: 'Tab带参',
        carryParam: true,
        hidePathForChildren: true,
      },
      children: [
        {
          path: 'testTab/id1',
          name: 'TestTab1',
          component: () => import('@/views/demo/feat/tab-params/index.vue'),
          meta: {
            title: 'Tab带参1',
            carryParam: true,
            ignoreRoute: true,
          },
        },
        {
          path: 'testTab/id2',
          name: 'TestTab2',
          component: () => import('@/views/demo/feat/tab-params/index.vue'),
          meta: {
            title: 'Tab带参2',
            carryParam: true,
            ignoreRoute: true,
          },
        },
      ],
    },
    {
      path: 'testParam/:id',
      name: 'TestParam',
      component: getParentLayout('TestParam'),
      meta: {
        title: 'Menu带参',
        ignoreKeepAlive: true,
      },
      children: [
        {
          path: 'sub1',
          name: 'TestParam_1',
          component: () => import('@/views/demo/feat/menu-params/index.vue'),
          meta: {
            title: 'Menu带参1',
            ignoreKeepAlive: true,
          },
        },
        {
          path: 'sub2',
          name: 'TestParam_2',
          component: () => import('@/views/demo/feat/menu-params/index.vue'),
          meta: {
            title: 'Menu带参2',
            ignoreKeepAlive: true,
          },
        },
      ],
    },
  ],
}

export default feat
