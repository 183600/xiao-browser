export const basicProps = {
  /**
   * 折叠标题
   *
   * Collapse title
   */
  title: {
    type: String,
    default: '',
  },
  /**
   * 是否显示加载状态
   *
   * Whether to show loading
   */
  loading: Boolean,
  /**
   * 是否能折叠，否则只是普通容器
   *
   * Can it be expanded, otherwise just normal container
   */
  canExpan: {
    type: Boolean,
    default: true,
  },
  /**
   * 标题右侧提示内容
   *
   * Warm reminder on the right side of the title
   */
  helpMessage: {
    type: [Array, String] as PropType<string | string[]>,
    default: '',
  },
}
