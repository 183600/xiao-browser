import type { EleDescriptions, EleDescriptionsItem } from '@/components/ElementPlus'
import type { CollapseContainerProps } from '@/components/CollapseContainer'

/**
 * 描述详情基础Props
 *
 * Description Basic Props
 */
export interface BasicDescProps extends EleDescriptions {
  /**
   * 描述的数据项集合
   *
   * Description configuration
   */
  schema: DescItem[]
  /**
   * 描述数据
   *
   * Description data
   */
  data: Recordable
  /**
   * 是否包含折叠组件
   *
   * Whether to include the collapse component
   */
  useCollapse?: boolean
  /**
   * 折叠组件配置
   *
   * Collapse component configuration
   */
  collapseOptions?: CollapseContainerProps
}

/**
 * 描述的数据项
 *
 * Description data item
 */
export interface DescItem extends EleDescriptionsItem {
  /**
   * 描述项的字段名称
   *
   * The description item field name
   */
  field: string
  /**
   * 是否自定义插槽
   *
   * Whether to customize the slot
   */
  isSlot?: boolean
  /**
   * 是否显示当前描述项
   *
   * Whether to display the current description item
   */
  show?: (...arg: any) => boolean
  /**
   * 自定义渲染描述项内容(VNode)
   *
   * Custom rendering description item content (VNode)
   */
  render?: (val: any, data: Recordable) => JSX.Element | undefined | Element | string | number
}

/**
 * 实例支持的方法
 *
 * Instance Supported Methods
 */
export interface DescActionMethods {
  setDescProps(descProps: Partial<BasicDescProps>): void
}

/**
 * 注册描述实例
 *
 * Register description instance
 */
export type Register = (descInstance: DescActionMethods) => void

/**
 * 定义实例内容
 *
 * Define instance content
 */
export type UseDescReturnType = [Register, DescActionMethods]
