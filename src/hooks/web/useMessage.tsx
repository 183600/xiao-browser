import type { EleElMessageBox, EleNotification, EleActionPopconfirmAction } from '@/components/ElementPlus'

import { h } from 'vue'
import { ElMessage, ElMessageBox, ElNotification } from 'element-plus'

import { SvgIcon } from '@/components/SvgIcon'

import { useDesign } from './useDesign'

/**
 * 基础信息选项
 *
 * Basic message options
 */
interface BasicMessageOptions {
  /**
   * 标题
   *
   * Title
   */
  title?: string
  /**
   * 内容，支持 VNode
   *
   * Same as above, choose one
   */
  message?: string | JSX.Element
  /**
   * 自定义消息类
   *
   * Custom popup class
   */
  customClass?: string
  /**
   * 消息支持的类型
   *
   * Message box type
   */
  type?: EleElMessageBox['type']
}

/**
 * 提示信息选项
 *
 * Message box options
 */
export interface MessageBoxOptions extends BasicMessageOptions {
  /**
   * 确定文本
   *
   * Confirm text
   */
  confirmText?: string
  /**
   * 取消文本
   *
   * Cancel text
   */
  cancelText?: string
}

/**
 * 通知信息选项
 *
 * Notification options
 */
export interface NotificationOptions extends BasicMessageOptions {
  /**
   * 通知延迟关闭
   *
   * Notification duration
   */
  duration?: EleNotification['duration']
  /**
   * 通知方位
   *
   * Notification position
   */
  position?: EleNotification['position']
}

/**
 * 定义轻消息提示中心
 *
 * Define a light message center
 */
export function useMessage() {
  /**
   * 创建通知消息
   *
   * Create notification messages
   * @param options NotificationOptions
   */
  function createNotification(options: NotificationOptions): Promise<EleActionPopconfirmAction> {
    const { title, message, position = 'top-right', type, duration = 4500, customClass } = options

    return ElNotification({
      title,
      message,
      class: customClass, // compatible 2.3+
      customClass,
      type,
      position,
      duration,
    })
  }

  /**
   * 创建确认弹窗
   *
   * Create confirmation box
   * @param options MessageBoxOptions
   */
  function createConfirm(options: MessageBoxOptions): Promise<EleActionPopconfirmAction> {
    const { title, message, confirmText = '确认', cancelText = '取消', type, customClass = '' } = options
    const { prefixCls } = useDesign('confirm-popup')
    const className = `${prefixCls} ${prefixCls}__${type} ${customClass}`

    return ElMessageBox.confirm(message, title, {
      confirmButtonText: confirmText,
      cancelButtonText: cancelText,
      showClose: false,
      class: className, // compatible 2.3+
      customClass: className,
    })
  }

  /**
   * 创建简易弹窗信息
   *
   * Create simple popup content
   * @param options MessageBoxOptions
   * @param type EleElMessageBox['type']
   */
  function createModalOptions(options: MessageBoxOptions, type: EleElMessageBox['type']): Promise<EleActionPopconfirmAction> {
    const { title, message, confirmText, cancelText, customClass } = options

    return ElMessageBox.alert(message, title, {
      confirmButtonText: confirmText || '确认',
      cancelButtonText: cancelText || '取消',
      type,
      class: customClass, // compatible 2.3+
      customClass,
    })
  }

  /**
   * 创建成功弹窗信息
   *
   * Create success popup content
   * @param options MessageBoxOptions
   */
  function createSuccessModal(options: MessageBoxOptions) {
    return createModalOptions(options, 'success')
  }

  /**
   * 创建成功弹窗信息
   *
   * Create success popup content
   * @param options MessageBoxOptions
   */
  function createErrorModal(options: MessageBoxOptions) {
    return createModalOptions(options, 'error')
  }

  /**
   * 创建信息弹窗信息
   *
   * Create info popup content
   * @param options MessageBoxOptions
   */
  function createInfoModal(options: MessageBoxOptions) {
    return createModalOptions(options, 'info')
  }

  /**
   * 创建警告弹窗信息
   *
   * Create warning popup content
   * @param options MessageBoxOptions
   */
  function createWarningModal(options: MessageBoxOptions) {
    return createModalOptions(options, 'warning')
  }

  /**
   * 创建加载消息
   *
   * Create loading message
   * @param title msg
   * @param duration 单位毫秒，如果为0，则需要执行 ElMessage.closeAll() 关闭
   */
  const createLoading = (title: string, duration = 0) =>
    ElMessage({
      type: 'info',
      class: 'el-message--loading', // compatible 2.3+
      customClass: 'el-message--loading',
      duration, // If 0, you need to run ElMessage.closeAll() to close
      message: h('div', { style: 'display:flex;align-items:center;' }, [h(SvgIcon, { name: 'loading', spin: true }), h('span', { style: 'margin-left: 12px' }, title)]),
    })

  /**
   * 创建消息提示中心
   *
   * Create a message center
   */
  const createMessage = {
    /**
     * 普通消息
     *
     * Info message
     */
    info: ElMessage.info,
    /**
     * 成功消息
     *
     * Success message
     */
    success: ElMessage.success,
    /**
     * 警告消息
     *
     * Warning message
     */
    warning: ElMessage.warning,
    /**
     * 错误消息
     *
     * Error message
     */
    error: ElMessage.error,
    /**
     * 加载消息
     *
     * Loading message
     */
    loading: createLoading,
    /**
     * 关闭所有弹出的消息
     *
     * Close all message
     */
    closeAll: ElMessage.closeAll,
  }

  return {
    createMessage,
    createNotification,
    createConfirm,
    createSuccessModal,
    createErrorModal,
    createInfoModal,
    createWarningModal,
  }
}
