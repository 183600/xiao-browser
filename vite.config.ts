import { defineApplicationConfig } from './build/vite/application'

export default defineApplicationConfig({
  overrides: {
    optimizeDeps: {
      include: ['echarts/core', 'echarts/charts', 'echarts/components', 'echarts/renderers', '@iconify/iconify', '@element-plus/icons-vue'],
    },
  },
})
