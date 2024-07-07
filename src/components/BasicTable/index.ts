import { withInstall } from '@/utils'
import basicTable from './src/BasicTable.vue'

export * from './src/typing'
export { useTable } from './src/hooks/useTable'
export const BasicTable = withInstall(basicTable)
export default BasicTable
