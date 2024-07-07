import { withInstall } from '@/utils'
import apiSelect from './src/ApiSelect.vue'

export * from './src/typing'
export const ApiSelect = withInstall(apiSelect)

export default ApiSelect
