import type { CSSProperties } from 'vue'
import type { Dayjs } from 'dayjs'
import type { TableActionMethods } from '@/components/BasicTable'
import type { EleButton, EleCol, EleRow } from '@/components/ElementPlus'
import type { BasicFormSchema, FormActionMethods, BasicFormProps } from './typing'

import { EleFormProps } from '@/components/ElementPlus'

/**
 * 表单操作项基础Props
 *
 * Form action basic props
 */
export const basicFormActionProps = {
  /**
   * 操作按钮所在的列的配置
   *
   * Operation column configuration
   */
  actionColProps: {
    type: Object as PropType<Partial<EleCol>>,
  },
  /**
   * 是否显示提交按钮
   *
   * whether to show the submit button
   */
  showSubmitButton: {
    type: Boolean,
    default: true,
  },
  /**
   * 提交按钮的配置项
   *
   * Submit button configuration
   */
  submitButtonOptions: {
    type: Object as PropType<EleButton>,
    default: () => {},
  },
  /**
   * 是否显示重置按钮
   *
   * Whether to show the reset button
   */
  showResetButton: {
    type: Boolean,
    default: true,
  },
  /**
   * 重置按钮的配置项
   *
   * Reset button configuration
   */
  resetButtonOptions: {
    type: Object as PropType<EleButton>,
    default: () => {},
  },
  /**
   * 是否显示展开/收起按钮
   *
   * Whether to show collapse and expand buttons
   */
  showAdvancedButton: Boolean,
  /**
   * 在支持展开/收起模式下，收起时显示多少行
   *
   * In support expand-collapse mode, how many rows to display after collapse
   */
  alwaysShowLines: {
    type: Number,
    default: 1,
  },
}

/**
 * 表单自定义Props
 *
 * Form custom props
 */
export const customProps = {
  ...basicFormActionProps,
  /**
   * 表单数据项架构的数组
   *
   * Array of form data item schemas
   */
  schemas: {
    type: Array as PropType<BasicFormSchema[]>,
    default: () => [],
  },
  /**
   * 表单的行的配置
   *
   * Row configuration for the form
   */
  rowProps: {
    type: Object as PropType<Partial<EleRow>>,
  },
  /**
   * 表单的行的样式
   *
   * Row style for the form
   */
  rowStyle: {
    type: Object as PropType<CSSProperties>,
  },
  /**
   * 表单的列的样式
   *
   * Column configuration for the form
   */
  colProps: {
    type: Object as PropType<Partial<EleCol>>,
  },
  /**
   * 合并到动态控件表单项中值
   *
   * Merge values into dynamic control form items
   */
  mergeDynamicData: {
    type: Object as PropType<Recordable>,
    default: null,
  },
  /**
   * 是否自动设置占位符
   *
   * Whether to automatically set placeholders
   */
  autoSetPlaceHolder: {
    type: Boolean,
    default: true,
  },
  /**
   * 是否在input组件按回车时提交整个表单
   *
   * Whether to submit the entire form when the input component presses enter
   */
  autoSubmitOnEnter: Boolean,
  /**
   * 是否在重置表单后提交表单
   *
   * Whether to submit the form after resetting the form
   */
  submitAfterReset: Boolean,
  /**
   * 是否把验证信息附加到标签中
   *
   * Whether to append verification information to the label
   */
  rulesMessageJoinLabel: {
    type: Boolean,
    default: true,
  },
  /**
   * 是否显示操作按钮组
   *
   * Whether to display the action button group
   */
  showActionButtonGroup: {
    type: Boolean,
    default: true,
  },
  /**
   * 格式化表单项时间函数
   *
   * Format the form item time function
   */
  transformDateFn: {
    type: Function as PropType<Fn>,
    default: (date: Dayjs) => {
      return date?.format('YYYY-MM-DD HH:mm:ss')
    },
  },
  /**
   * 自定义提交函数
   *
   * Custom submit function
   */
  resetFn: Function as PropType<() => Promise<void>>,
  /**
   * 自定义重置函数
   *
   * Custom reset function
   */
  submitFn: Function as PropType<() => Promise<void>>,
  /**
   * 表格操作项，当和表格组合时存在
   *
   * Table action item, which exists when combined with a table
   */
  tableAction: {
    type: Object as PropType<TableActionMethods>,
  },
}

/**
 * 表单Props
 *
 * Form props
 */
export const basicProps = {
  ...EleFormProps,
  ...customProps,
}

/**
 * 表单操作项Props
 *
 * Form action props
 */
export const formActionProps = {
  ...basicFormActionProps,
  /**
   * 操作项的列的大小
   *
   * The size of the column for the action item
   */
  actionSpan: {
    type: Number,
    default: 6,
  },
  /**
   * 是否显示展开/收起按钮-通过计算判断
   *
   * Whether to display the expand/collapse button - judged by calculation
   */
  showAdvanced: {
    type: Boolean,
    default: true,
  },
  /**
   * 展开/收起按钮的状态
   *
   * Expand/Collapse button state
   */
  isAdvanced: Boolean,
}

/**
 * 表单项的基础Props
 *
 * Basic Props for Form Items
 */
export const basicFormItemProps = {
  /**
   * 表单项结构数据
   *
   * Form item structure data
   */
  schema: {
    type: Object as PropType<BasicFormSchema>,
    default: () => ({}),
  },
  /**
   * 表单Props
   *
   * Form props
   */
  formProps: {
    type: Object as PropType<BasicFormProps>,
    default: () => ({}),
  },
  /**
   * 表单绑定的值
   *
   * Form model
   */
  formModel: {
    type: Object as PropType<Recordable>,
    default: () => ({}),
  },
  /**
   * 表单默认的值
   *
   * Form model
   */
  defaultValues: {
    type: Object as PropType<Recordable>,
    default: null,
  },
  /**
   * 更新表单数据，并尝试验证
   *
   * Update the form data and try to validate
   */
  setFormModel: {
    type: Function as PropType<(field: string, value: any) => void>,
    default: null,
  },
  /**
   * 表格操作项，当和表格组合时存在
   *
   * Table action item, which exists when combined with a table
   */
  tableAction: {
    type: Object as PropType<TableActionMethods>,
  },
  /**
   * 实例支持的方法
   *
   * Instance Supported Methods
   */
  formAction: {
    type: Object as PropType<FormActionMethods>,
    default: null,
  },
}
