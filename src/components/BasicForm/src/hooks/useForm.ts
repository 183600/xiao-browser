import type { ValidateFieldsError } from 'async-validator'
import type { DynamicProps } from '#/utils'
import type { BasicFormProps, FormActionMethods, UseFormReturnType, BasicFormSchema, FormItemProp } from '../typing'

import { ref, onUnmounted, unref, watch, WatchStopHandle } from 'vue'
import { isProdMode } from '@/utils/env'
import { getDynamicProps, getUseInstance } from '@/utils'

type Props = Partial<DynamicProps<BasicFormProps>>

export function useForm(formProps?: Props): UseFormReturnType {
  const formRef = ref<Nullable<FormActionMethods>>(null)
  const loadedRef = ref<Nullable<boolean>>(false)

  let stopWatch: WatchStopHandle

  function register(instance: FormActionMethods) {
    isProdMode() &&
      onUnmounted(() => {
        formRef.value = null
        loadedRef.value = null
      })
    if (unref(loadedRef) && isProdMode() && instance === unref(formRef)) return

    formRef.value = instance
    loadedRef.value = true

    stopWatch?.()

    stopWatch = watch(
      () => formProps,
      () => {
        formProps && instance.setFormProps(getDynamicProps(formProps))
      },
      {
        immediate: true,
        deep: true,
      },
    )
  }

  const methods: FormActionMethods = {
    // Element Plus
    validate: (callback?: (isValid: boolean, invalidFields?: ValidateFieldsError) => void) => {
      return getUseInstance<FormActionMethods>(formRef, 'form')?.validate(callback)
    },
    validateField: (props?: Arrayable<FormItemProp>, callback?: (isValid: boolean, invalidFields?: ValidateFieldsError) => void) => {
      return getUseInstance<FormActionMethods>(formRef, 'form')?.validateField(props, callback)
    },
    resetFields: (props?: Arrayable<FormItemProp>) => {
      return getUseInstance<FormActionMethods>(formRef, 'form')?.resetFields(props)
    },
    scrollToField: (prop: FormItemProp) => {
      return getUseInstance<FormActionMethods>(formRef, 'form')?.scrollToField(prop)
    },
    clearValidate: (props?: Arrayable<FormItemProp>) => {
      return getUseInstance<FormActionMethods>(formRef, 'form')?.clearValidate(props)
    },
    // Advanced
    setFormProps: (formProps: Partial<BasicFormProps>) => {
      return getUseInstance<FormActionMethods>(formRef, 'form')?.setFormProps(formProps)
    },

    updateSchema: (schema: Partial<BasicFormSchema>) => {
      return getUseInstance<FormActionMethods>(formRef, 'form')?.updateSchema(schema)
    },

    resetSchema: (schemas: BasicFormSchema[]) => {
      return getUseInstance<FormActionMethods>(formRef, 'form')?.resetSchema(schemas)
    },

    removeSchemaByField: (field: string | string[]) => {
      return getUseInstance<FormActionMethods>(formRef, 'form')?.removeSchemaByField(field)
    },

    getFieldsValue: () => {
      return getUseInstance<FormActionMethods>(formRef, 'form')?.getFieldsValue()
    },

    setFieldsValue: (values: Recordable) => {
      return getUseInstance<FormActionMethods>(formRef, 'form')?.setFieldsValue(values)
    },

    appendSchemaByField: (schema: BasicFormSchema, beforeField?: string, first?: boolean) => {
      return getUseInstance<FormActionMethods>(formRef, 'form')?.appendSchemaByField(schema, beforeField, first)
    },
  }

  return [register, methods]
}
