import type { AppRouteModule } from '@/router/types'

import { LAYOUT } from '@/router/constant'

const setup: AppRouteModule = {
  path: '/setup',
  name: 'SetupDemo',
  component: LAYOUT,
  redirect: '/setup/index',
  meta: {
    orderNo: 10,
    hideChildrenInMenu: true,
    icon: 'ep:guide',
    title: '引导页',
  },
  children: [
    {
      path: 'index',
      name: 'SetupDemoPage',
      component: () => import('@/views/demo/setup/index.vue'),
      meta: {
        title: '引导页',
        icon: 'ep:guide',
        hideMenu: true,
      },
    },
  ],
}

export default setup
