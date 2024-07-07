import { withInstall } from '@/utils'
import basicDrawer from './src/BasicDrawer.vue'

export * from './src/typing'
export { useDrawer, useDrawerInner } from './src/useDrawer'
export const BasicDrawer = withInstall(basicDrawer)
export default BasicDrawer
