<template>
  <div ref="chartRef" :style="{ width, height }"></div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, Ref } from 'vue'
import { useECharts } from '@/hooks/web/useECharts'
import { getRandomNumberData } from '@/utils/demo'

export default defineComponent({
  props: {
    width: {
      type: String,
      default: '100%',
    },
    height: {
      type: String,
      default: '300px',
    },
  },
  setup(_) {
    const chartRef = ref<HTMLDivElement | null>(null)
    const { setOptions } = useECharts(chartRef as Ref<HTMLDivElement>)

    const initChart = () => {
      setOptions({
        tooltip: {
          trigger: 'axis',
        },
        xAxis: {
          type: 'category',
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        },
        yAxis: {
          type: 'value',
        },
        grid: { left: '1%', right: '1%', top: '3%', bottom: '0', containLabel: true },
        series: [
          {
            data: getRandomNumberData(7),
            type: 'line',
          },
        ],
      })
    }

    onMounted(initChart)

    return {
      chartRef,
    }
  },
})
</script>
