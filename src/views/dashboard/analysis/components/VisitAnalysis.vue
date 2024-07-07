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
    const { setOptions, echarts } = useECharts(chartRef as Ref<HTMLDivElement>)

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
      // const colorList = ['#9E87FF', '#73DDFF', '#fe9a8b', '#F56948', '#9E87FF']
      setOptions({
        // backgroundColor: '#fff',
        // title: {
        //   text: '全国6月销售统计',
        //   textStyle: {
        //     fontSize: 12,
        //     fontWeight: 400,
        //   },
        //   left: 'center',
        //   top: '5%',
        // },
        legend: {
          icon: 'circle',
          top: '0%',
          left: '5%',
          itemWidth: 6,
          itemGap: 20,
          textStyle: {
            color: '#556677',
          },
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            label: {
              show: true,
              backgroundColor: '#fff',
              color: '#556677',
              borderColor: 'rgba(0,0,0,0)',
              shadowColor: 'rgba(0,0,0,0)',
              shadowOffsetY: 0,
            },
            lineStyle: {
              width: 0,
            },
          },
          backgroundColor: '#fff',
          textStyle: {
            color: '#5c6c7c',
          },
          padding: [10, 10],
          extraCssText: 'box-shadow: 1px 0 2px 0 rgba(163,163,163,0.5)',
        },
        grid: { left: '1%', right: '1%', top: '10%', bottom: 0, containLabel: true },
        xAxis: [
          {
            type: 'category',
            data: data.value.xdata,
            axisLine: {
              lineStyle: {
                color: '#DCE2E8',
              },
            },
            axisTick: {
              show: false,
            },
            axisLabel: {
              interval: 0,
              // textStyle: {
              color: '#556677',
              // },
              fontSize: 12,
              margin: 15,
            },
            axisPointer: {
              label: {
                padding: [0, 0, 10, 0],
                margin: 15,
                fontSize: 12,
                backgroundColor: {
                  type: 'linear',
                  x: 0,
                  y: 0,
                  x2: 0,
                  y2: 1,
                  colorStops: [
                    {
                      offset: 0,
                      color: '#fff',
                    },
                    {
                      offset: 0.86,
                      color: '#fff',
                    },
                    {
                      offset: 0.86,
                      color: '#33c0cd',
                    },
                    {
                      offset: 1,
                      color: '#33c0cd',
                    },
                  ],
                  global: false,
                },
              },
            },
            boundaryGap: false,
          },
        ],
        yAxis: [
          {
            type: 'value',
            axisTick: {
              show: false,
            },
            axisLine: {
              show: true,
              lineStyle: {
                color: '#DCE2E8',
              },
            },
            axisLabel: {
              // textStyle: {
              color: '#556677',
              // },
            },
            splitLine: {
              show: false,
            },
          },
          {
            type: 'value',
            position: 'right',
            axisTick: {
              show: false,
            },
            axisLabel: {
              // textStyle: {
              color: '#556677',
              // },
              formatter: '{value}',
            },
            axisLine: {
              show: true,
              lineStyle: {
                color: '#DCE2E8',
              },
            },
            splitLine: {
              show: false,
            },
          },
        ],
        series: [
          {
            name: 'K1',
            type: 'line',
            data: data.value.kdata.k1,
            symbolSize: 1,
            symbol: 'circle',
            smooth: true,
            yAxisIndex: 0,
            showSymbol: false,
            lineStyle: {
              width: 5,
              color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [
                {
                  offset: 0,
                  color: '#9effff',
                },
                {
                  offset: 1,
                  color: '#9E87FF',
                },
              ]),
              shadowColor: 'rgba(158,135,255, 0.3)',
              shadowBlur: 10,
              shadowOffsetY: 20,
            },
            // itemStyle: {
            // normal: {
            // color: colorList[0],
            // borderColor: colorList[0],
            // },
            // },
          },
          {
            name: 'K2',
            type: 'line',
            data: data.value.kdata.k2,
            symbolSize: 1,
            symbol: 'circle',
            smooth: true,
            yAxisIndex: 0,
            showSymbol: false,
            lineStyle: {
              width: 5,
              color: new echarts.graphic.LinearGradient(1, 1, 0, 0, [
                {
                  offset: 0,
                  color: '#73DD39',
                },
                {
                  offset: 1,
                  color: '#73DDFF',
                },
              ]),
              shadowColor: 'rgba(115,221,255, 0.3)',
              shadowBlur: 10,
              shadowOffsetY: 20,
            },
            // itemStyle: {
            // normal: {
            // color: colorList[1],
            // borderColor: colorList[1],
            // },
            // },
          },
          {
            name: 'K3',
            type: 'line',
            data: data.value.kdata.k3,
            symbolSize: 1,
            yAxisIndex: 1,
            symbol: 'circle',
            smooth: true,
            showSymbol: false,
            lineStyle: {
              width: 5,
              color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
                {
                  offset: 0,
                  color: '#fe9a',
                },
                {
                  offset: 1,
                  color: '#fe9a8b',
                },
              ]),
              shadowColor: 'rgba(254,154,139, 0.3)',
              shadowBlur: 10,
              shadowOffsetY: 20,
            },
            // itemStyle: {
            //   color: colorList[2],
            //   borderColor: colorList[2],
            // },
          },
        ],
      })

      // setOptions({
      //   tooltip: {
      //     trigger: 'axis',
      //     axisPointer: {
      //       lineStyle: {
      //         width: 1,
      //         color: '#019680',
      //       },
      //     },
      //   },
      //   xAxis: {
      //     type: 'category',
      //     boundaryGap: false,
      //     data: data.value.xdata,
      //     axisTick: {
      //       show: false,
      //     },
      //   },
      //   yAxis: [
      //     {
      //       type: 'value',
      //       splitNumber: 4,
      //       axisTick: {
      //         show: false,
      //       },
      //     },
      //   ],
      //   grid: { left: '1%', right: '1%', top: '2%', bottom: 0, containLabel: true },
      //   series: [
      //     {
      //       smooth: true,
      //       data: data.value.kdata.k1,
      //       type: 'line',
      //       areaStyle: {},
      //       // itemStyle: {
      //       //   color: 'rgba(33, 193, 214, 0.85)',
      //       // },
      //     },
      //     {
      //       smooth: true,
      //       data: data.value.kdata.k2,
      //       type: 'line',
      //       areaStyle: {},
      //       // itemStyle: {
      //       //   color: 'rgba(179, 192, 206, 0.85)',
      //       // },
      //       lineStyle: {
      //         color: '#B3C0CE',
      //         type: 'dashed',
      //       },
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
