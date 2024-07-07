import { EleButtonProps } from '@/components/ElementPlus'

export const customProps = {
  /**
   * 按钮阴影
   *
   * Button shadow
   */
  shadow: { type: Boolean },
  /**
   * 文本前图标
   *
   * Text before icon
   */
  preIcon: { type: String },
  /**
   * 文本后图标
   *
   * Text after icon
   */
  sufIcon: { type: String },
  /**
   * 图标大小
   *
   * Icon size
   */
  iconSize: {
    type: Number,
    default: 14,
  },
  /**
   * 点击事件
   *
   * Click event
   */
  onClick: {
    type: Function as PropType<(...args) => any>,
    default: null,
  },
}

export const basicProps = {
  ...EleButtonProps,
  ...customProps,
}
