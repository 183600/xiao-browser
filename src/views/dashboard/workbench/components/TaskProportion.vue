<template>
  <el-card shadow="always">
    <template #header><div class="el-card__header--title">销售统计</div></template>
    <div ref="chartRef" :style="{ width, height }"></div>
  </el-card>
</template>

<script lang="ts" setup>
import type { Ref } from 'vue'

import { ref } from 'vue'
import { ElCard } from 'element-plus'
import { useECharts } from '@/hooks/web/useECharts'

defineProps({
  width: {
    type: String as PropType<string>,
    default: '100%',
  },
  height: {
    type: String as PropType<string>,
    default: '400px',
  },
})

const chartRef = ref<HTMLDivElement | null>(null)
const { setOptions } = useECharts(chartRef as Ref<HTMLDivElement>)

setOptions({
  legend: {
    top: 'bottom',
  },
  tooltip: {},
  toolbox: {
    show: true,
    feature: {
      saveAsImage: { show: true },
    },
  },
  series: [
    {
      name: 'task proportion',
      type: 'pie',
      radius: ['10%', '70%'],
      center: ['50%', '50%'],
      roseType: 'area',
      itemStyle: {
        borderRadius: 8,
      },
      data: [
        { value: 40, name: 'User 1' },
        { value: 38, name: 'User 2' },
        { value: 32, name: 'User 3' },
        { value: 30, name: 'User 4' },
        { value: 28, name: 'User 5' },
        { value: 26, name: 'User 6' },
        { value: 22, name: 'User 7' },
        { value: 18, name: 'User 8' },
      ],
    },
  ],
})
</script>
