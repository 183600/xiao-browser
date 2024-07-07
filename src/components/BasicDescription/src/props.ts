import { CollapseContainerProps } from '@/components/CollapseContainer'
import { EleDescriptionsProps } from '@/components/ElementPlus'
import { DescItem } from './typing'

export const customProps = {
  /**
   * 描述的数据项集合
   *
   * Description configuration
   */
  schema: {
    type: Array as PropType<DescItem[]>,
    default: () => [],
  },
  /**
   * 描述数据
   *
   * Description data
   */
  data: { type: Object },
  /**
   * 是否包含折叠组件
   *
   * Whether to include the collapse component
   */
  useCollapse: {
    type: Boolean,
    default: true,
  },
  /**
   * 折叠组件配置
   *
   * Collapse component configuration
   */
  collapseOptions: {
    type: Object as PropType<CollapseContainerProps>,
    default: null,
  },
}

export const basicProps = {
  ...EleDescriptionsProps,
  ...customProps,
}
