import type { AppRouteModule } from '@/router/types'

import { getParentLayout, LAYOUT } from '@/router/constant'
import { RoleEnum } from '@/enums/roleEnum'

const permission: AppRouteModule = {
  path: '/permission',
  name: 'Permission',
  component: LAYOUT,
  redirect: '/permission/front/page',
  meta: {
    orderNo: 6,
    icon: 'ep:key',
    title: '权限管理',
  },

  children: [
    {
      path: 'front',
      name: 'PermissionFrontDemo',
      component: getParentLayout('PermissionFrontDemo'),
      meta: {
        title: '基于前端权限',
      },
      children: [
        {
          path: 'page',
          name: 'FrontPageAuth',
          component: () => import('@/views/demo/permission/front/index.vue'),
          meta: {
            title: '页面权限',
          },
        },
        {
          path: 'btn',
          name: 'FrontBtnAuth',
          component: () => import('@/views/demo/permission/front/Btn.vue'),
          meta: {
            title: '按钮权限',
          },
        },
        {
          path: 'auth-pageA',
          name: 'FrontAuthPageA',
          component: () => import('@/views/demo/permission/front/AuthPageA.vue'),
          meta: {
            title: '权限测试页A',
            roles: [RoleEnum.ADMIN],
          },
        },
        {
          path: 'auth-pageB',
          name: 'FrontAuthPageB',
          component: () => import('@/views/demo/permission/front/AuthPageB.vue'),
          meta: {
            title: '权限测试页B',
            roles: [RoleEnum.TEST],
          },
        },
      ],
    },
    {
      path: 'back',
      name: 'PermissionBackDemo',
      component: getParentLayout('PermissionBackDemo'),
      meta: {
        title: '基于后台权限',
      },
      children: [
        {
          path: 'page',
          name: 'BackAuthPage',
          component: () => import('@/views/demo/permission/back/index.vue'),
          meta: {
            title: '页面权限',
          },
        },
        {
          path: 'btn',
          name: 'BackAuthBtn',
          component: () => import('@/views/demo/permission/back/Btn.vue'),
          meta: {
            title: '按钮权限',
          },
        },
      ],
    },
  ],
}

export default permission
