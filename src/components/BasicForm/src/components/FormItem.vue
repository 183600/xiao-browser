<script lang="tsx">
import type { InternalRuleItem } from 'async-validator'
import type { EleFormItemRule } from '@/components/ElementPlus'

import { defineComponent, computed, unref, toRaw } from 'vue'
import { ElOption, ElCheckbox, ElFormItem, ElRadio, ElRadioButton, ElDivider, ElCol } from 'element-plus'

import { getSlot } from '@/utils/helper/tsxHelper'
import { BasicHelp } from '@/components/Basic'

import { basicFormItemProps } from '../props'
import { BASIC_COL_SIZE } from '../const'
import { componentMap } from '../componentMap'
import { ComponentType } from '../typing'

export default defineComponent({
  name: 'BasicFormItem',
  components: { ElOption, ElCheckbox, ElRadio, ElRadioButton, ElDivider, ElCol },
  inheritAttrs: false,
  props: basicFormItemProps,
  setup(props, { slots }) {
    /**
     * 获取表单项绑定值
     *
     * Get the value bound to the form item
     */
    const getValues = computed(() => {
      const { formModel, schema, defaultValues } = props
      const { mergeDynamicData } = props.formProps
      return {
        field: schema.field,
        model: formModel,
        values: {
          ...mergeDynamicData,
          ...defaultValues,
          ...formModel,
        } as Recordable,
        schema,
      }
    })
    /**
     * 获取表单项组件绑定值
     *
     * Get the value bound by the form item component
     */
    const getComponentsProps = computed(() => {
      const { schema, tableAction, formModel, formAction } = props
      let { componentProps = {} } = schema
      if (typeof componentProps === 'function') {
        componentProps = componentProps({ schema, tableAction, formModel, formAction }) ?? {}
      }
      if (schema.component === 'ElDivider') {
        componentProps = {
          direction: 'horizontal',
          contentPosition: 'left',
          ...componentProps,
        } as Recordable
      }
      return componentProps as Recordable
    })

    /**
     * 创建表单项占位符
     *
     * Create form item placeholders
     * @param component ComponentType
     */
    function createPlaceholderMessage(component: ComponentType) {
      if (['ElInput', 'ElInputNumber'].includes(component)) {
        return '请输入'
      }
      if (['ElSelect', 'ElCascader', 'ElDatePicker', 'ElTimePicker', 'ElTimeSelect', 'ElSelectV2', 'ElTreeSelect'].includes(component)) {
        return '请选择'
      }
      return ''
    }

    /**
     * 转换事件名称首字母大写
     *
     * Convert event names to uppercase
     */
    function upperEventFirstStr(str: string) {
      if (!str) {
        return 'Change'
      }
      return str.trim().toLowerCase().replace(str[0], str[0].toUpperCase())
    }

    /**
     * 获取表单项组件禁用状态
     *
     * Get the disabled state of the form item component
     */
    const getDisable = computed(() => {
      const { disabled: globDisabled } = props.formProps
      const { dynamicDisabled } = props.schema
      const { disabled: itemDisabled } = unref(getComponentsProps)
      const disabled = !!globDisabled || !!itemDisabled

      if (typeof dynamicDisabled === 'boolean') {
        return dynamicDisabled
      }

      if (typeof dynamicDisabled === 'function') {
        return dynamicDisabled(unref(getValues))
      }

      return disabled
    })

    /**
     * 获取表单项组件展示状态
     *
     * Get the display state of the form item component
     */
    function getShow(): { isShow: boolean; isIfShow: boolean } {
      const { show, ifShow, isAdvanced } = props.schema
      const { showAdvancedButton } = props.formProps
      let itemIsAdvanced = true
      if (showAdvancedButton && typeof isAdvanced === 'boolean') {
        itemIsAdvanced = isAdvanced
      }

      let isShow = true
      let isIfShow = true

      if (typeof show === 'boolean') {
        isShow = show
      }
      if (typeof ifShow === 'boolean') {
        isIfShow = ifShow
      }
      if (typeof show === 'function') {
        isShow = show(unref(getValues))
      }
      if (typeof ifShow === 'function') {
        isIfShow = ifShow(unref(getValues))
      }
      isShow = isShow && itemIsAdvanced
      return { isShow, isIfShow }
    }

    /**
     * 获取表单项校验规则
     *
     * Get form item validation rules
     */
    function handleRules(): EleFormItemRule[] {
      const { schema, formProps } = props
      const { component, rulesMessageJoinLabel, label, dynamicRules, required } = schema

      if (typeof dynamicRules === 'function') {
        return dynamicRules(unref(getValues))
      }

      let rules = [...(schema.rules || [])]
      const joinLabel = rulesMessageJoinLabel || formProps.rulesMessageJoinLabel || false
      const defaultMsg = `${createPlaceholderMessage(component)}${joinLabel ? label : ''}`

      /**
       * 处理必填的时的校验规则
       *
       * Validation rules when processing required fields
       */
      function validator(rule: InternalRuleItem, value: any, callback: any) {
        const msg = (rule.message || defaultMsg) as string
        if (value === undefined || value === null) {
          // null
          callback(new Error(msg))
        } else if (Array.isArray(value) && value.length === 0) {
          // array
          callback(new Error(msg))
        } else if (typeof value === 'string' && value.trim() === '') {
          // empty string
          callback(new Error(msg))
        }
        return callback()
      }

      const getRequired = typeof required === 'function' ? required(unref(getValues)) : required

      if (rules?.length === 0) {
        rules = getRequired ? [{ required: getRequired, validator, trigger: 'blur' }] : []
      } else {
        for (let i = 0; i < rules.length; i++) {
          const rule = rules[i]
          // 处理 required 规则的内容
          // Process the content of the 'required' rule
          if (Reflect.has(rule, 'required') && !rule.validator) {
            const { isShow } = getShow()
            const componentProp = unref(getComponentsProps)
            // 不显示的组件，强制非必填
            // Components not displayed, mandatory non-required
            if (!isShow) {
              rule.required = false
            }
            if (component) {
              if (!Reflect.has(rule, 'type')) {
                if (component === 'ElInputNumber') {
                  rule.type = 'number'
                } else if ((component === 'ElSelect' && componentProp?.multiple) || component === 'ElCheckboxGroup') {
                  rule.type = 'array'
                }
              }

              rule.message = rule.message || defaultMsg

              if (component === 'ElInput') {
                rule.whitespace = true
              }
            }
          }
          // 处理 min 规则的内容
          // Process the content of the 'min' rule
          if (Reflect.has(rule, 'min') && !rule.validator) {
            rule.message = `内容长度必须大于 ${rule.min} 位`
          }
          // 处理 max 规则的内容
          // Process the content of the 'max' rule
          if (Reflect.has(rule, 'max') && !rule.validator) {
            rule.message = `内容长度必须小于 ${rule.max} 位`
          }
          // 处理 len 规则的内容
          // Process the content of the 'len' rule
          if (Reflect.has(rule, 'len') && !rule.validator) {
            rule.message = `内容长度必须为 ${rule.len} 位`
          }
        }
      }

      return rules
    }

    /**
     * 渲染表单项组件
     *
     * Render the form item component
     */
    function renderComponent() {
      const { renderComponentContent, component, field, changeEvent, valueField } = props.schema

      if (!component) {
        return null
      }
      // input mode
      const bindInput = ['ElInput', 'ElSlider'].includes(component)

      // input event
      const eventKey = `on${upperEventFirstStr(changeEvent || (bindInput ? 'input' : 'change'))}`
      const on = {
        [eventKey]: (...args: Nullable<Recordable>[]) => {
          const [e] = args
          if (propsData[eventKey]) {
            propsData[eventKey](...args)
          }
          const target = e ? e.target : null
          const value = target?.value ?? target ?? e
          props.setFormModel(field, value)
        },
      }

      // input component
      const Comp = componentMap.get(component) as ReturnType<typeof defineComponent>

      // input props
      const { autoSetPlaceHolder, size = 'default' } = props.formProps
      const propsData: Recordable = {
        clearable: true,
        filterable: true,
        size,
        ...unref(getComponentsProps),
        disabled: unref(getDisable),
      }

      // input placeholder
      const isCreatePlaceholder = !propsData.disabled && autoSetPlaceHolder
      if (isCreatePlaceholder) {
        propsData.placeholder = unref(getComponentsProps)?.placeholder || createPlaceholderMessage(component)
      }

      // input value
      const bindValue: Recordable = {
        [valueField || 'modelValue']: toRaw(props.formModel[field]) ?? undefined,
      }

      // input attr
      const compAttr: Recordable = {
        ...propsData,
        ...on,
        ...bindValue,
      }

      // input component set
      if (!renderComponentContent) {
        const compSlot = {} as any

        // 尝试设置具有选项的表单项组件
        // Trying to set a form item component with options
        if (compAttr?.options?.length) {
          if (component === 'ElSelect') {
            compSlot.default = () =>
              compAttr.options.map((k: any) => {
                return <ElOption {...k} />
              })
          } else if (component === 'ElCheckboxGroup') {
            compSlot.default = () =>
              compAttr.options.map((k: any) => {
                return (
                  <ElCheckbox {...k} label={k.value}>
                    {k.label}
                  </ElCheckbox>
                )
              })
          } else if (component === 'ElRadioGroup') {
            compSlot.default = () =>
              compAttr.options.map((k: any) => {
                return (
                  <ElRadio {...k} label={k.value}>
                    {k.label}
                  </ElRadio>
                )
              })
          }
        }

        return (
          <Comp {...compAttr} options={null}>
            {compSlot}
          </Comp>
        )
      }

      // input component custom set
      const compSlot =
        typeof renderComponentContent === 'function'
          ? {
            ...renderComponentContent(unref(getValues)),
          }
          : {
            default: () => renderComponentContent,
          }
      return <Comp {...compAttr}>{compSlot}</Comp>
    }

    /**
     * 渲染表单项标签
     *
     * Render the form item label
     */
    function renderLabelHelpMessage() {
      const { label, helpMessage, subLabel } = props.schema
      const renderLabel = subLabel ? (
        <span>
          {label} <span>{subLabel}</span>
        </span>
      ) : (
        label
      )
      // no help message
      const getHelpMessage = typeof helpMessage === 'function' ? helpMessage(unref(getValues)) : helpMessage
      if (!getHelpMessage || (Array.isArray(getHelpMessage) && getHelpMessage.length === 0)) {
        return renderLabel
      }

      // has help message
      return (
        <span style='display:inline-flex;align-items:center;'>
          <span>{renderLabel}</span>
          <BasicHelp placement='top' class='mx-1' text={getHelpMessage} />
        </span>
      )
    }

    /**
     * 渲染表单项
     *
     * Render the form item
     */
    function renderItem() {
      const { itemProps, slot, render, field, component } = props.schema

      // render ElDivider
      if (component === 'ElDivider') {
        return <ElDivider {...unref(getComponentsProps)}>{renderLabelHelpMessage()}</ElDivider>
      } else {
        /**
         * 获取表单项内容
         *
         * Get form item content
         */
        const getContent = () => {
          // 插槽
          // slot
          if (slot) {
            return getSlot(slots, slot, unref(getValues))
            // 自定义渲染
            // custom render
          } else if (render) {
            return render(unref(getValues))
          }
          return renderComponent()
        }

        return (
          <ElFormItem prop={field} {...(itemProps as Recordable)} rules={handleRules()}>
            {{
              label: () => renderLabelHelpMessage(),
              default: () => getContent(),
            }}
          </ElFormItem>
        )
      }
    }

    return () => {
      const { colProps: itemColProps = {}, colSlot, renderColContent, component } = props.schema

      if (!componentMap.has(component)) {
        return null
      }

      const { colProps = {} } = props.formProps
      const realColProps = {
        span: BASIC_COL_SIZE,
        ...colProps,
        ...itemColProps,
      }
      const { isIfShow, isShow } = getShow()
      const values = unref(getValues)

      const getContent = () => {
        // 插槽
        // slot
        if (colSlot) {
          return getSlot(slots, colSlot, values)
          // 自定义渲染表单项及其组件
          // custom render form item and input components
        } else if (renderColContent) {
          return renderColContent(values)
        }
        return renderItem()
      }

      return (
        isIfShow && (
          <ElCol {...realColProps} v-show={isShow}>
            {getContent()}
          </ElCol>
        )
      )
    }
  },
})
</script>
