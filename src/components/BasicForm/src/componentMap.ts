import type { Component } from 'vue'
import type { ComponentType } from './typing'

/**
 * 导入支持的官方表单项组件
 *
 * Import supported official form item components
 */
import {
  ElInput,
  ElSelect,
  ElDivider,
  // ElRadio,
  ElRadioGroup,
  // ElRadioButton,
  // ElCheckbox,
  ElCheckboxGroup,
  ElSwitch,
  ElCascader,
  ElRate,
  ElSlider,
  ElInputNumber,
  ElTreeSelect,
} from 'element-plus'

/**
 * 导入自定义的表单项组件
 *
 * Import custom form item components
 */
import DatePicker from './components/DatePicker.vue'
import TimePicker from './components/TimePicker.vue'

/**
 * 注册导入的组件
 *
 * Register imported components
 */
const componentMap = new Map<ComponentType, Component>()

// Element plus
componentMap.set('ElInput', ElInput)
componentMap.set('ElSelect', ElSelect)
componentMap.set('ElDivider', ElDivider)
// componentMap.set('ElRadio', ElRadio)
componentMap.set('ElRadioGroup', ElRadioGroup)
// componentMap.set('ElRadioButton', ElRadioButton)
// componentMap.set('ElCheckbox', ElCheckbox)
componentMap.set('ElCheckboxGroup', ElCheckboxGroup)
componentMap.set('ElSwitch', ElSwitch)
componentMap.set('ElCascader', ElCascader)
componentMap.set('ElRate', ElRate)
componentMap.set('ElSlider', ElSlider)
componentMap.set('ElInputNumber', ElInputNumber)
componentMap.set('ElTreeSelect', ElTreeSelect)
// Custom
componentMap.set('ElTimePicker', TimePicker)
componentMap.set('ElDatePicker', DatePicker)

/**
 * 注册新的表单项组件
 *
 * Register a new form item component
 * @param compName ComponentType
 * @param component Component
 */
export function add(compName: ComponentType, component: Component) {
  componentMap.set(compName, component)
}

/**
 * 移除表单项组件
 *
 * Remove form item component
 * @param compName ComponentType
 */
export function del(compName: ComponentType) {
  componentMap.delete(compName)
}

export { componentMap }
