import type { ComputedRef } from 'vue'
import type { EleDialog, EleButton } from '@/components/ElementPlus'

/**
 * 弹窗基础Props
 *
 * Modal Basic Props
 */
export interface BasicModalProps extends EleDialog, ModalCustomHeader, ModalCustomContent, ModalCustomFooter {
  modelValue: Boolean
  /**
   * 是否显示脚部
   *
   * Whether to display the footer
   */
  showFooter?: Boolean
  /**
   * 关闭后是否滚动回顶部
   *
   * Whether to scroll back to the top after closing
   */
  scrollTop?: Boolean
  /**
   * 关闭前执行函数方法
   *
   * Execute the function before closing, return true before closing
   */
  closeFn?: () => Promise<boolean>
}

export interface ModalCustomHeader {
  /**
   * 是否显示关闭图标
   *
   * whether to show the close icon
   */
  showClose?: boolean
  /**
   * 是否显示全屏图标
   *
   * Whether to show the full screen icon
   */
  showFullscreen?: boolean
  /**
   * 标题帮助文本
   *
   * Help text to the right of the title
   */
  helpMessage?: string | string[]
}

export interface ModalCustomContent {
  /**
   * 是否开启自适应高度
   * Whether to enable adaptive height
   */
  dyncHeight?: boolean
  /**
   * 是否显示加载状态
   *
   * Whether to show loading
   */
  loading?: boolean
  /**
   * 加载提示文本
   *
   * Loading text
   */
  loadingText?: string
}

export interface ModalCustomFooter {
  /**
   * 是否显示确认按钮
   *
   * Whether to show the confirm button
   */
  showConfirmBtn?: boolean
  /**
   * 确定按钮配置，同 ElButton
   *
   * Confirm button configuration, same as ElButton
   */
  confirmOptions?: EleButton
  /**
   * 是否显示取消按钮
   *
   * Whether to show the cancel button
   */
  showCancelBtn?: boolean
  /**
   * 取消按钮配置，同 ElButton
   *
   * Confirm button configuration, same as ElButton
   */
  cancelOptions?: EleButton
}

/**
 * 弹窗实例方法
 *
 * Modal instance methods
 */
export interface ModalInstanceMethods {
  /**
   * 设置弹窗props
   *
   * Set modal props
   */
  setModalProps: (props: Partial<BasicModalProps>) => void
  /**
   * 显示/隐藏弹窗-方法内部生成
   *
   * Emit show/hide modal - generated inside the method
   */
  emitVisible?: (visible: boolean, uid: number) => void
  /**
   * 刷新弹窗高度
   *
   * redo modal height
   */
  redoModalHeight?: () => void
}

/**
 * 实例支持的方法
 *
 * Instance Supported Methods
 */
export interface ModalActionMethods extends ModalInstanceMethods {
  /**
   * 打开弹窗
   *
   * Open modal
   */
  openModal: <T = any>(props?: boolean, data?: T, openOnSet?: boolean) => void
  /**
   * 关闭弹窗
   *
   * Open modal
   */
  closeModal: () => void
  /**
   * 获取弹窗状态
   *
   * Get modal visible status
   */
  getVisible?: ComputedRef<boolean>
}

/**
 * 注册实例方法
 *
 * Register instance function
 */
export type RegisterFn = (modalMethods: ModalInstanceMethods, uuid?: string) => void

/**
 * 内部实例支持的方法
 *
 * Methods supported by inner instances
 */
export interface ReturnInnerMethods extends ModalInstanceMethods {
  /**
   * 关闭弹窗
   *
   * Open modal
   */
  closeModal: () => void
  /**
   * 改变内容loading状态
   *
   * Change content loading state
   */
  changeLoading: (loading: boolean) => void
  /**
   * 改变确认按钮loading状态
   *
   * Change the loading state of the confirm button
   */
  changeConfirmLoading: (loading: boolean) => void
  /**
   * 获取弹窗状态
   *
   * Get modal visible status
   */
  getVisible?: ComputedRef<boolean>
  /**
   * 刷新弹窗高度
   *
   * redo modal height
   */
  redoModalHeight: () => void
}

/**
 * 定义实例内容
 *
 * Define instance content
 */
export type UseModalReturnType = [RegisterFn, ModalActionMethods]

/**
 * 定义内部实例返回内容
 *
 * Define inner instance return content
 */
export type UseModalInnerReturnType = [RegisterFn, ReturnInnerMethods]
