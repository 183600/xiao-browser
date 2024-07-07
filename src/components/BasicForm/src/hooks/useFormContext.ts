import type { InjectionKey } from 'vue'

import { createContext, useContext } from '@/hooks/core/useContext'

/**
 * 表单上下文支持的方法
 *
 * Methods supported by the form context
 */
export interface FormContextProps {
  /** 重置表单 */
  resetAction: () => void
  /** 提交表单 */
  submitAction: () => Promise<Recordable>
}

const key: InjectionKey<FormContextProps> = Symbol('basic-form')

/**
 * 创建表单上下文
 *
 * Create form context
 * @param context FormContextProps
 */
export function createFormContext(context: FormContextProps) {
  return createContext<FormContextProps>(context, key)
}

/**
 * 使用表单上下文
 *
 * Use form context
 */
export function useFormContext() {
  return useContext<FormContextProps>(key)
}
