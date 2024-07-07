<template>
  <div ref="chartRef" :style="{ height, width }"></div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, ref, Ref, watch } from 'vue'
import { useECharts } from '@/hooks/web/useECharts'
import { basicProps } from './props'
import { getDateData } from '../data'

export default defineComponent({
  props: basicProps,
  setup(props) {
    const chartRef = ref<HTMLDivElement | null>(null)
    const { setOptions } = useECharts(chartRef as Ref<HTMLDivElement>)

    watch(
      () => props.type,
      (v) => {
        if (v) {
          initChart()
        }
      },
    )

    const initChart = () => {
      const data = computed(() => {
        const { type } = props

        return getDateData(type)
      })

      setOptions({
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow',
          },
        },
        xAxis: {
          type: 'category',
          data: data.value.xdata,
        },
        yAxis: {
          type: 'value',
        },
        grid: { left: '1%', right: '1%', top: '2%', bottom: 0, containLabel: true },
        series: [
          {
            data: data.value.kdata.k1,
            type: 'bar',
            emphasis: {
              focus: 'series',
            },
          },
          {
            data: data.value.kdata.k2,
            type: 'bar',
            emphasis: {
              focus: 'series',
            },
          },
          {
            data: data.value.kdata.k3,
            type: 'bar',
            emphasis: {
              focus: 'series',
            },
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
