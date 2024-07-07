import type { Ref, ComputedRef } from 'vue'
import type { BasicFormProps, BasicFormSchema } from '../typing'

import { unref } from 'vue'
import { isObject } from '@vueuse/core'

import { set } from 'lodash-es'
import dayjs from 'dayjs'

interface UseFormValuesContext {
  defaultValueRef: Ref<any>
  getSchema: ComputedRef<BasicFormSchema[]>
  getProps: ComputedRef<BasicFormProps>
  formModel: Recordable
}

/**
 * 处理表单的值
 *
 * Process the value of the form
 */
export function useFormValues({ defaultValueRef, getSchema, formModel, getProps }: UseFormValuesContext) {
  // check dayjs
  const isDayjsVal = (v) => v instanceof dayjs

  /**
   * 处理表单项值
   *
   * Handling form item values
   * @param values
   */
  function handleFormValues(values: Recordable) {
    if (!isObject(values)) {
      return {}
    }
    const res: Recordable = {}
    for (const item of Object.entries(values)) {
      const key = item[0]
      if (!key) continue

      let value = item[1]
      // 跳过空数组或者函数
      // skip empty arrays or functions
      if ((Array.isArray(value) && value.length === 0) || typeof value === 'function') {
        continue
      }

      // 移除空格
      // Remove spaces
      if (typeof value === 'string') {
        value = value.trim()
      }

      // 尝试处理时间值
      // try processing time value
      const { transformDateFn } = unref(getProps)
      if (typeof transformDateFn === 'function') {
        if (Array.isArray(value)) {
          for (let i = 0; i < value.length; i++) {
            value[i] = isDayjsVal(value[i]) ? transformDateFn?.(value[i]) : value[i]
          }
        } else {
          value = isDayjsVal(value) ? transformDateFn?.(value) : value
        }
      }

      set(res, key, value)
    }
    return res
  }

  /**
   * 初始化默认值
   *
   * Initialize default values
   */
  function initDefault() {
    const schemas = unref(getSchema)
    const obj: Recordable = {}
    for (let i = 0; i < schemas.length; i++) {
      const item = schemas[i]
      const { defaultValue, component } = item
      obj[item.field] = defaultValue

      if (component === 'ElDivider') {
        continue
      }

      // array
      const arrayComponent = ['ElCheckboxGroup']
      if (arrayComponent.includes(component)) {
        if (!Array.isArray(defaultValue)) {
          item.defaultValue = []
        }
      }

      // number
      const numberComponent = ['ElInputNumber']
      if (numberComponent.includes(component)) {
        if (!defaultValue || defaultValue !== 0) {
          item.defaultValue = 0
        }
      }

      // date - dayjs
      const dateComponent = ['ElDatePicker', 'ElTimePicker']
      if (dateComponent.includes(component)) {
        const { transformDateFn } = unref(getProps)
        if (typeof transformDateFn === 'function') {
          if (Array.isArray(defaultValue)) {
            for (let i = 0; i < defaultValue.length; i++) {
              item.defaultValue[i] = isDayjsVal(defaultValue[i]) ? transformDateFn?.(defaultValue[i]) : defaultValue[i]
            }
          } else {
            item.defaultValue = isDayjsVal(defaultValue) ? transformDateFn?.(defaultValue) : defaultValue
          }
        }
      }

      formModel[item.field] = item.defaultValue
    }

    defaultValueRef.value = obj
  }

  return { handleFormValues, initDefault }
}
