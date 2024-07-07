<template>
  <div ref="chartRef" :style="{ height, width }"></div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref, Ref, onMounted, reactive } from 'vue'
import { useECharts } from '@/hooks/web/useECharts'
import { randomNumber } from '@/utils/demo'

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
    const { setOptions, getInstance, echarts } = useECharts(chartRef as Ref<HTMLDivElement>)
    const data = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    let startTimes = 0
    // eslint-disable-next-line no-undef
    const options = reactive<echarts.EChartsOption>({
      xAxis: {
        max: 'dataMax',
      },
      legend: {
        show: false,
      },
      color: ['#f00000'],
      yAxis: {
        type: 'category',
        data: ['Tony', 'Mary', 'John', 'Linda', 'Ben', 'Lilly', 'Kevin', 'James', 'Paul', 'Lisa'],
        inverse: true,
        animationDuration: 300,
        animationDurationUpdate: 300,
        // max: 10
      },
      series: [
        {
          realtimeSort: true,
          name: '热度',
          type: 'bar',
          data: data,
          itemStyle: {
            color: function(params) {
              var colorList = [
                ['#DCE35B', '#45B649'],
                ['#F5cF0D', '#fa9203'],
                ['#61dbe8', '#0785de'],
                ['#ff9717', '#ff4518'],
                ['#c0c0aa', '#1cefff'],
                ['#9CECFB', '#0052D4'],
                ['#3494E6', '#EC6EAD'],
                ['#ee0979', '#ff6a00'],
                ['#A770EF', '#FDB99B'],
                ['#fceabb', '#f8b500'],
              ]
              var index = params.dataIndex
              if (params.dataIndex >= colorList.length) {
                index = params.dataIndex - colorList.length
              }
              return new echarts.graphic.LinearGradient(1, 0, 0, 0, [
                {
                  offset: 0,
                  color: colorList[index][0],
                },
                {
                  offset: 1,
                  color: colorList[index][1],
                },
              ])
            },
          },
          label: {
            show: true,
            position: 'right',
            valueAnimation: true,
          },
        },
      ],
      animationDuration: 0,
      animationDurationUpdate: 3000,
      animationEasing: 'linear',
      animationEasingUpdate: 'linear',
      graphic: {
        elements: [
          {
            type: 'text',
            right: 160,
            bottom: 60,
            style: {
              text: startTimes.toString(),
              font: 'bolder 80px monospace',
              fill: 'rgba(100, 100, 100, 0.25)',
            },
            z: 100,
          },
        ],
      },
    })

    function run() {
      for (var i = 0; i < data.length; ++i) {
        data[i] += randomNumber(1000)
      }

      getInstance()?.setOption({
        series: [
          {
            type: 'bar',
            data,
          },
        ],
      })
    }

    function updateYear(year: string) {
      // eslint-disable-next-line prettier/prettier
      (options as any).graphic.elements[0].style.text = year
      // eslint-disable-next-line no-undef
      getInstance()?.setOption<echarts.EChartsOption>(options as any)
    }

    onMounted(() => {
      setOptions(options as any)

      setInterval(function() {
        run()
        updateYear(String((startTimes += 1)))
      }, 3000)
    })
    return { chartRef }
  },
})
</script>
