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
          trigger: 'item',
        },
        series: [
          {
            name: 'Tony',
            type: 'pie',
            radius: '85%',
            center: ['50%', '50%'],
            data: data.value.vdata,
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)',
              },
            },
          },
        ],
      })

      // setOptions({
      //   tooltip: {
      //     trigger: 'axis',
      //     axisPointer: {
      //       lineStyle: {
      //         width: 1,
      //         color: '#22CCE2',
      //       },
      //     },
      //   },
      //   grid: { left: '1%', right: '1%', top: '2%', bottom: 0, containLabel: true },
      //   xAxis: {
      //     type: 'category',
      //     data: data.value.xdata,
      //   },
      //   yAxis: {
      //     type: 'value',
      //     max: 8000,
      //     splitNumber: 4,
      //   },
      //   series: [
      //     {
      //       data: data.value.kdata.k1,
      //       type: 'bar',
      //       barMaxWidth: 80,
      //     },
      //   ],
      // })
    }

    onMounted(initChart)

    return {
      chartRef,
    }
  },
})
</script>
