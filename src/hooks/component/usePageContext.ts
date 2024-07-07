import type { InjectionKey, ComputedRef, Ref } from 'vue'
import { createContext, useContext } from '@/hooks/core/useContext'

/**
 * 页面上下文 Props
 *
 * Page context props
 */
export interface PageContextProps {
  /**
   * 内容区高度
   *
   * Content height
   */
  contentHeight: ComputedRef<number>
  /**
   * 页面高度
   *
   * Page height
   */
  pageHeight: Ref<number>
  /**
   * 设置页面高度
   *
   * Set page height
   */
  setPageHeight: (height: number) => Promise<void>
}

/**
 * 页面上下文Key
 *
 * Page context key
 */
const key: InjectionKey<PageContextProps> = Symbol()

/**
 * 创建页面上下文
 *
 * Create page context
 * @param context
 */
export function createPageContext(context: PageContextProps) {
  return createContext<PageContextProps>(context, key, { native: true })
}

/**
 * 使用页面上下文
 *
 * Reactive page Context
 */
export function usePageContext() {
  return useContext<PageContextProps>(key)
}
