import type { ComputedRef } from 'vue'
import type { EleButton, EleDrawer } from '@/components/ElementPlus'

/**
 * 抽屉基础Props
 *
 * Drawer Basic Props
 */
export interface BasicDrawerProps extends EleDrawer {
  /**
   * 绑定的值（显示/隐藏）
   *
   * Bind value (show/hide)
   */
  modelValue?: boolean
  /**
   * 抽屉标题
   *
   * Drawer title
   */
  title?: string
  /**
   * 是否为详情模式（带返回按钮）
   *
   * Whether it is in detail mode (with back button)
   */
  isDetail?: boolean
  /**
   * 是否显示加载状态
   *
   * Whether to show loading
   */
  loading?: boolean
  /**
   * 加载提示文字
   *
   * Loading text
   */
  loadingText?: string
  /**
   * 关闭前触发的方法
   *
   * Method triggered before closing
   */
  closeFn?: () => Promise<boolean>
  /**
   * 是否显示脚部
   *
   * Whether to display the footer
   */
  showFooter?: boolean
  /**
   * 是否显示确认按钮
   *
   * Whether to show the confirm button
   */
  showConfirmBtn?: boolean
  /**
   * 确认按钮配置，同 ElButton
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
 * 抽屉实例方法
 *
 * Drawer instance methods
 */
export interface DrawerInstanceMethods {
  /**
   * 设置抽屉props
   *
   * Set drawer props
   */
  setDrawerProps: (props: Partial<BasicDrawerProps> | boolean) => void
  /**
   * 显示/隐藏抽屉-方法内部生成
   *
   * Emit show/hide drawer - generated inside the method
   */
  emitVisible?: (visible: boolean, uid: number) => void
}

/**
 * 实例支持的方法
 *
 * Instance Supported Methods
 */
export interface DrawerActionMethods extends DrawerInstanceMethods {
  /**
   * 打开抽屉
   *
   * Open drawer
   */
  openDrawer: <T = any>(visible?: boolean, data?: T, openOnSet?: boolean) => void
  /**
   * 关闭抽屉
   *
   * Close drawer
   */
  closeDrawer: () => void
  /**
   * 获取抽屉状态
   *
   * Get drawer visible status
   */
  getVisible?: ComputedRef<boolean>
}

/**
 * 注册实例方法
 *
 * Register instance function
 */
export type RegisterFn = (drawerInstance: DrawerInstanceMethods, uuid?: string) => void

/**
 * 内部实例支持的方法
 *
 * Methods supported by inner instances
 */
export interface ReturnInnerMethods extends DrawerInstanceMethods {
  /**
   * 关闭抽屉
   *
   * Close drawer
   */
  closeDrawer: () => void
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
   * 获取抽屉状态
   *
   * Get drawer visible status
   */
  getVisible?: ComputedRef<boolean>
}

/**
 * 定义实例内容
 *
 * Define instance content
 */
export type UseDrawerReturnType = [RegisterFn, DrawerActionMethods]

/**
 * 定义内部实例返回内容
 *
 * Define inner instance return content
 */
export type UseDrawerInnerReturnType = [RegisterFn, ReturnInnerMethods]
