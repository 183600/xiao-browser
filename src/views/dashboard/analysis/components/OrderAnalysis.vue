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
      const gaugeData = data.value.vdata.map((k) => {
        k.value = k.value.toString().substring(0, 2)
        return k
      })

      setOptions({
        tooltip: {
          formatter: '{b0}完成进度{c0}%',
        },
        grid: { left: '1%', right: '1%', top: '2%', bottom: 0, containLabel: true },
        series: [
          {
            type: 'gauge',
            startAngle: 90,
            endAngle: -270,
            radius: '90%',
            pointer: {
              show: false,
            },
            progress: {
              show: true,
              overlap: false,
              roundCap: true,
              clip: false,
              // itemStyle: {
              //   borderWidth: 1,
              //   borderColor: '#464646'
              // }
            },
            axisLine: {
              lineStyle: {
                width: 84,
              },
            },
            splitLine: {
              show: false,
              distance: 0,
              length: 10,
            },
            axisTick: {
              show: false,
            },
            axisLabel: {
              show: false,
              distance: 50,
            },
            data: gaugeData,
            title: {
              show: false,
            },
            detail: {
              show: false,
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
