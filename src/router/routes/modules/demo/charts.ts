import type { AppRouteModule } from '@/router/types'

import { getParentLayout, LAYOUT } from '@/router/constant'

const charts: AppRouteModule = {
  path: '/charts',
  name: 'Charts',
  component: LAYOUT,
  redirect: '/charts/echarts/map',
  meta: {
    orderNo: 5,
    icon: 'ep:pie-chart',
    title: '图表',
  },
  children: [
    {
      path: 'baiduMap',
      name: 'BaiduMap',
      meta: {
        title: '百度地图',
      },
      component: () => import('@/views/demo/charts/map/Baidu.vue'),
    },
    {
      path: 'aMap',
      name: 'AMap',
      meta: {
        title: '高德地图',
      },
      component: () => import('@/views/demo/charts/map/Gaode.vue'),
    },
    {
      path: 'googleMap',
      name: 'GoogleMap',
      meta: {
        title: '谷歌地图',
      },
      component: () => import('@/views/demo/charts/map/Google.vue'),
    },
    {
      path: 'tMap',
      name: 'tMap',
      meta: {
        title: '腾讯地图',
      },
      component: () => import('@/views/demo/charts/map/Tencent.vue'),
    },
    {
      path: 'echarts',
      name: 'ECharts',
      component: getParentLayout('ECharts'),
      meta: {
        title: 'ECharts',
      },
      redirect: '/charts/echarts/map',
      children: [
        {
          path: 'map',
          name: 'Map',
          component: () => import('@/views/demo/charts/Map.vue'),
          meta: {
            title: '地图',
          },
        },
        {
          path: 'line',
          name: 'Line',
          component: () => import('@/views/demo/charts/Line.vue'),
          meta: {
            title: '折线图',
          },
        },
        {
          path: 'Dync',
          name: 'Dync',
          component: () => import('@/views/demo/charts/Dync.vue'),
          meta: {
            title: '动态折线图',
          },
        },
        {
          path: 'pie',
          name: 'Pie',
          component: () => import('@/views/demo/charts/Pie.vue'),
          meta: {
            title: '饼图',
          },
        },
        {
          path: 'nightingale',
          name: 'Nightingale',
          component: () => import('@/views/demo/charts/Nightingale.vue'),
          meta: {
            title: '南丁格尔图',
          },
        },
      ],
    },
  ],
}

export default charts
