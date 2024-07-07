import type { ComputedRef, Ref } from 'vue'
import type { BasicFormProps, BasicFormSchema, FormActionMethods } from '../typing'

import { unref, toRaw } from 'vue'

import { error } from '@/utils/log'

interface UseFormActionContext {
  emit: EmitType
  getProps: ComputedRef<BasicFormProps>
  getSchema: ComputedRef<BasicFormSchema[]>
  formModel: Recordable
  defaultValueRef: Ref<Recordable>
  formElRef: Ref<FormActionMethods | null>
  schemaRef: Ref<BasicFormSchema[]>
  validate: FormActionMethods['validate']
  resetFields: FormActionMethods['resetFields']
  validateField: FormActionMethods['validateField']
  handleFormValues: Fn
}

/**
 * 处理表单的事件、方法
 *
 * Handling form events and methods
 */
export function useFormEvents({
  emit,
  getProps,
  formModel,
  getSchema,
  defaultValueRef,
  formElRef,
  schemaRef,
  handleFormValues,
  validate,
  validateField,
  resetFields,
}: UseFormActionContext) {
  /**
   * 更新表单内容
   *
   * Set form field values
   * @param values
   */
  function setFieldsValue(values: Recordable): void {
    const fields = unref(getSchema)
      .map((item) => item.field)
      .filter(Boolean)

    const validKeys: string[] = []
    Object.keys(values).forEach((key) => {
      const value = values[key]

      const hasKey = Reflect.has(values, key)

      if (hasKey && fields.includes(key)) {
        formModel[key] = value
        validKeys.push(key)
      }
    })
    // 同时验证字段值
    // Also validate field values
    validateField(validKeys).catch(() => {})
  }

  /**
   * 获取表单内容
   *
   * Get form field values
   */
  function getFieldsValue(): Recordable {
    const formEl = unref(formElRef)
    if (!formEl) return {}

    return handleFormValues(toRaw(unref(formModel)))
  }

  /**
   * 根据字段删除表单架构内容
   *
   * Delete form schema content based on fields
   */
  function removeSchemaByField(fields: string | string[]): void {
    const schemaList: BasicFormSchema[] = [...unref(getSchema)]
    if (!fields || fields.length === 0) {
      return []
    }

    const fieldList: string[] = typeof fields === 'string' ? [fields] : fields
    for (let i = 0; i < fieldList.length; i++) {
      const fieldItem = fieldList[i]
      if (typeof fieldItem === 'string') {
        const index = schemaList.findIndex((schema) => schema.field === fieldItem)
        if (index !== -1) {
          delete formModel[fieldItem]
          schemaList.splice(index, 1)
        }
      }
    }
    schemaRef.value = schemaList
    return schemaList
  }

  /**
   * 插入一个结构到表单架构中
   *
   * Insert a structure into the form schema
   * @param schema
   * @param beforeField 插入定位的字段
   * @param first 是否插入到第一条
   */
  function appendSchemaByField(schema: BasicFormSchema, beforeField?: string, first = false): void {
    const schemaList: BasicFormSchema[] = [...unref(getSchema)]
    const hasInList = schemaList.some((item) => item.field === schema.field)

    if (hasInList) {
      return error('Operation failed, field already exists')
    }
    // Insert positioned fields
    const index = schemaList.findIndex((item) => item.field === beforeField)

    if (!beforeField || index === -1 || first) {
      // whether to insert into the first
      first ? schemaList.unshift(schema) : schemaList.push(schema)
      schemaRef.value = schemaList
      formModel[schema.field] = schema?.defaultValue
      return
    }

    if (index !== -1) {
      schemaList.splice(index + 1, 0, schema)
    }

    schemaRef.value = schemaList
  }

  /**
   * 重置表单数据架构，需要传入重置的架构数据
   *
   * To reset the form data schema, the reset schema data needs to be passed in
   * @param schemaData  BasicFormSchema[]
   */
  function resetSchema(schemaData: BasicFormSchema[]): void {
    let schemaList: BasicFormSchema[] = []
    if (Array.isArray(schemaData) && schemaData.length) {
      schemaList = [...schemaData]
    }

    const hasField = schemaList.every((item) => item.component === 'ElDivider' || (Reflect.has(item, 'field') && item.field))

    if (!hasField) {
      error('All form items must have a `field` field present')
      return
    }
    schemaRef.value = schemaList
  }

  /**
   * 更新表单架构数据
   *
   * Update form schema data
   * @param schema BasicFormSchema
   */
  function updateSchema(schema: Partial<BasicFormSchema>): boolean {
    if (!schema.field) {
      error('The `field` of schema data must exist')
      return false
    }

    const schemaList: BasicFormSchema[] = [...unref(getSchema)]
    for (let i = 0; i < schemaList.length; i++) {
      if (schemaList[i].field === schema?.field) {
        schemaList[i] = { ...schemaList[i], ...schema }
        schemaRef.value = schemaList
        return true
      }
    }

    return false
  }

  /**
   * 提交表单
   *
   * Submit form
   */
  async function handleSubmit(e?: Event): Promise<Recordable> {
    e && e.preventDefault()
    const { submitFn } = unref(getProps)
    const formEl = unref(formElRef)
    if (!formEl) {
      return error('Operation failed, form instance does not exist!')
    }

    await validate()

    const values = getFieldsValue()
    if (typeof submitFn === 'function') {
      return submitFn(values)
    }

    emit('submit', values)
  }

  /**
   * 重置表单
   *
   * Reset form
   */
  function handleReset(): void {
    const { resetFn, submitAfterReset } = unref(getProps)
    const formEl = unref(formElRef)
    if (!formEl) {
      return error('Operation failed, form instance does not exist!')
    }

    Object.keys(formModel).forEach((key) => {
      formModel[key] = defaultValueRef.value[key]
    })

    resetFields()

    submitAfterReset && handleSubmit()

    if (typeof resetFn === 'function') {
      return resetFn()
    }

    emit('reset')
  }

  return {
    handleSubmit,
    handleReset,
    setFieldsValue,
    getFieldsValue,
    updateSchema,
    resetSchema,
    appendSchemaByField,
    removeSchemaByField,
  }
}
