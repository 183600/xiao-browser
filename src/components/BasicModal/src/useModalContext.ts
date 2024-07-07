import { InjectionKey } from 'vue'

import { createContext, useContext } from '@/hooks/core/useContext'

/**
 * 弹窗上下文支持的 props
 *
 * The props supported by the popup context
 */
export interface ModalContextProps {
  /**
   * 刷新弹窗高度
   *
   * redo modal height
   */
  redoModalHeight: () => void
}

const key: InjectionKey<ModalContextProps> = Symbol()

/**
 * 创建弹窗上下文
 *
 * Create modal context
 */
export function createModalContext(context: ModalContextProps) {
  return createContext<ModalContextProps>(context, key)
}

/**
 * 使用弹窗上下文
 *
 * Use modal context
 */
export function useModalContext() {
  return useContext<ModalContextProps>(key)
}
