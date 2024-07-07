<template>
  <div ref="chartRef" :style="{ height, width }"></div>
</template>
<script lang="ts">
import { defineComponent, PropType, ref, Ref, onMounted } from 'vue'

import { useECharts } from '@/hooks/web/useECharts'
import { getLineData } from './data'

export default defineComponent({
  props: {
    width: {
      type: String as PropType<string>,
      default: '100%',
    },
    height: {
      type: String as PropType<string>,
      default: 'calc(100vh - 110px)',
    },
  },
  setup() {
    const chartRef = ref<HTMLDivElement | null>(null)
    const { setOptions, echarts } = useECharts(chartRef as Ref<HTMLDivElement>)
    const { barData, lineData, category } = getLineData()
    onMounted(() => {
      setOptions({
        backgroundColor: '#0f375f',
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow',
            label: {
              show: true,
              backgroundColor: '#333',
            },
          },
        },
        legend: {
          data: ['line', 'bar'],
          textStyle: {
            color: '#ccc',
          },
        },
        xAxis: {
          data: category,
          axisLine: {
            lineStyle: {
              color: '#ccc',
            },
          },
        },
        yAxis: {
          splitLine: { show: false },
          axisLine: {
            lineStyle: {
              color: '#ccc',
            },
          },
        },
        series: [
          {
            name: 'line',
            type: 'line',
            smooth: true,
            showAllSymbol: 'auto',
            symbol: 'emptyCircle',
            symbolSize: 15,
            data: lineData,
          },
          {
            name: 'bar',
            type: 'bar',
            barWidth: 10,
            itemStyle: {
              borderRadius: 5,
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: '#14c8d4' },
                { offset: 1, color: '#43eec6' },
              ]),
            },
            data: barData,
          },
        ],
      })
    })
    return { chartRef }
  },
})
</script>
