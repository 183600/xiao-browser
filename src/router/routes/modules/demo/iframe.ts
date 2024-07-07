import type { AppRouteModule } from '@/router/types'

import { LAYOUT } from '@/router/constant'
const IFrame = () => import('@/views/sys/iframe/FrameBlank.vue')

const iframe: AppRouteModule = {
  path: '/frame',
  name: 'Frame',
  component: LAYOUT,
  redirect: '/frame/doc',
  meta: {
    orderNo: 9,
    icon: 'ep:top-right',
    title: '外部页面',
  },

  children: [
    {
      path: 'doc',
      name: 'Doc',
      component: IFrame,
      meta: {
        frameSrc: 'http://tony.crlang.com/doc/',
        title: '项目文档(内嵌)',
      },
    },
    {
      path: 'eleDoc',
      name: 'EleDoc',
      component: IFrame,
      meta: {
        frameSrc: 'https://element-plus.gitee.io/zh-CN/guide/design.html',
        title: 'element plus文档(内嵌)',
      },
    },
    {
      path: 'http://tony.crlang.com/doc/',
      name: 'DocExternal',
      component: IFrame,
      meta: {
        title: '项目文档(外链)',
      },
    },
  ],
}

export default iframe
