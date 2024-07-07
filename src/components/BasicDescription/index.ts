import { withInstall } from '@/utils'
import basicDescription from './src/BasicDescription.vue'

export * from './src/typing'
export { useDescription } from './src/useDescription'
export const BasicDescription = withInstall(basicDescription)
export default BasicDescription
