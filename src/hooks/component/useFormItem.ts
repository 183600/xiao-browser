import type { UnwrapRef } from 'vue'

import { reactive, readonly, computed, getCurrentInstance, watchEffect, nextTick } from 'vue'
import { isEqual } from 'lodash-es'

/**
 * 嵌入到表单中，子组件只需使用钩子绑定即可进行表单验证
 *
 * Reactive form item rule, Embed into a form, subcomponents just need to use hook binding for form validation
 * @param props
 * @param key
 * @param changeEvent
 * @param emitValue
 */
export function useRuleFormItem<T extends Recordable>(props: T, key: keyof T = 'modelValue', changeEvent = 'change', emitValue?: '') {
  const instance = getCurrentInstance()
  const emit = instance?.emit

  const innerState = reactive({
    value: props[key],
  })

  const defaultState = readonly(innerState)

  const setState = (val: UnwrapRef<T[keyof T]>): void => {
    innerState.value = val as T[keyof T]
  }

  const state = computed({
    get() {
      return innerState.value
    },
    set(value) {
      if (isEqual(value, defaultState.value)) return

      innerState.value = value as T[keyof T]
      nextTick(() => {
        emit?.(changeEvent, value, emitValue)
      })
    },
  })

  watchEffect(() => {
    innerState.value = props[key]
  })

  return [state, setState, defaultState]
}
