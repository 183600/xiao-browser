import { withInstall } from '@/utils'
import basicForm from './src/BasicForm.vue'

export { useComponentRegister } from './src/hooks/useComponentRegister'

export { default as TimePicker } from './src/components/TimePicker.vue'
export { default as DatePicker } from './src/components/DatePicker.vue'

export * from './src/typing'
export { useForm } from './src/hooks/useForm'
export const BasicForm = withInstall(basicForm)
export default BasicForm
