<template>
  <div ref="chartRef" :style="{ width, height }"></div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, Ref } from 'vue'
import { useECharts } from '@/hooks/web/useECharts'
import { randomNumber } from '@/utils/demo'

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
          trigger: 'item',
        },
        legend: {
          top: '0%',
          icon: 'circle',
          left: 'center',
        },
        grid: { left: '1%', right: '1%', top: '3%', bottom: '0', containLabel: true },
        series: [
          {
            name: 'Access From',
            type: 'pie',
            center: ['50%', '55%'],
            radius: ['40%', '90%'],
            avoidLabelOverlap: false,
            itemStyle: {
              borderRadius: 10,
              borderColor: '#fff',
              borderWidth: 2,
            },
            label: {
              show: false,
              position: 'center',
            },
            emphasis: {
              label: {
                show: true,
                fontSize: 32,
                fontWeight: 'bold',
              },
            },
            labelLine: {
              show: false,
            },
            data: [
              { value: randomNumber(1000), name: 'Search Engine' },
              { value: randomNumber(1000), name: 'Direct' },
              { value: randomNumber(1000), name: 'Email' },
              { value: randomNumber(1000), name: 'Union Ads' },
              { value: randomNumber(1000), name: 'Video Ads' },
            ],
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
