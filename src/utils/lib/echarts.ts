import * as echarts from 'echarts/core'

// echarts 图表并没有全部引入

import {
  BarChart, // 柱状图
  LineChart,
  PieChart,
  MapChart,
  // PictorialBarChart,
  // RadarChart,
  GaugeChart,
} from 'echarts/charts'

import {
  TitleComponent,
  TooltipComponent,
  GridComponent,
  PolarComponent,
  AriaComponent,
  ParallelComponent,
  LegendComponent,
  RadarComponent,
  ToolboxComponent,
  DataZoomComponent,
  VisualMapComponent,
  TimelineComponent,
  CalendarComponent,
  GraphicComponent,
} from 'echarts/components'

import { SVGRenderer } from 'echarts/renderers'

echarts.use([
  LegendComponent,
  TitleComponent,
  TooltipComponent,
  GridComponent,
  PolarComponent,
  AriaComponent,
  ParallelComponent,
  BarChart, // 柱状图
  LineChart,
  PieChart,
  MapChart,
  // RadarChart,
  // PictorialBarChart,
  GaugeChart,
  SVGRenderer,
  RadarComponent,
  ToolboxComponent,
  DataZoomComponent,
  VisualMapComponent,
  TimelineComponent,
  CalendarComponent,
  GraphicComponent,
])

export default echarts
