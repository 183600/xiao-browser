import { withInstall } from '@/utils'
import collapseContainer from './src/CollapseContainer.vue'

export * from './src/typing'
export const CollapseContainer = withInstall(collapseContainer)
export default CollapseContainer
