<template>
  <div ref="wrapRef" :style="{ height, width }"></div>
</template>
<script lang="ts">
import { defineComponent, ref, nextTick, unref, onMounted } from 'vue'

import { useScript } from '@/hooks/web/useScript'

const BAI_DU_MAP_URL = 'https://map.qq.com/api/gljs?v=1.exp&key=HRBBZ-Z7NRP-ENVDD-LRRMT-GUK2E-PGBW2'
export default defineComponent({
  name: 'BaiduMap',
  props: {
    width: {
      type: String,
      default: '100%',
    },
    height: {
      type: String,
      default: 'calc(100vh - 78px)',
    },
  },
  setup() {
    const wrapRef = ref<HTMLDivElement | null>(null)
    const { toPromise } = useScript({ src: BAI_DU_MAP_URL })

    async function initMap() {
      await toPromise()
      await nextTick()
      const wrapEl = unref(wrapRef)
      if (!wrapEl) return
      const TMap = (window as any).TMap
      var center = new TMap.LatLng(39.915, 116.404)
      // 初始化地图
      var map = new TMap.Map(wrapEl, {
        rotation: 0, // 设置地图旋转角度
        pitch: 0, // 设置俯仰角度（0~45）
        zoom: 12, // 设置地图缩放级别
        center: center, // 设置地图中心点坐标
      })

      // 监听地图瓦片加载完成事件
      map.on('tilesloaded', function() {
        // 地图瓦片已加载完成
      })
    }

    onMounted(() => {
      initMap()
    })

    return { wrapRef }
  },
})
</script>
