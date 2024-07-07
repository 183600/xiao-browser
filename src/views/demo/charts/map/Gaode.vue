<template>
  <div ref="wrapRef" :style="{ height, width }"></div>
</template>
<script lang="ts">
import { defineComponent, ref, nextTick, unref, onMounted } from 'vue'

import { useScript } from '@/hooks/web/useScript'

const A_MAP_URL = 'https://webapi.amap.com/maps?v=2.0&key=738ebb785e3983d30f4b1949e31b400a'

export default defineComponent({
  name: 'AMap',
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
    const { toPromise } = useScript({ src: A_MAP_URL })

    async function initMap() {
      await toPromise()
      await nextTick()
      const wrapEl = unref(wrapRef)
      if (!wrapEl) return
      const AMap = (window as any).AMap
      new AMap.Map(wrapEl, {
        zoom: 11,
        center: [116.404, 39.915],
        viewMode: '3D',
      })
    }

    onMounted(() => {
      initMap()
    })

    return { wrapRef }
  },
})
</script>
