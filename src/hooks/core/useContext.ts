import { InjectionKey, provide, inject, reactive, readonly as defineReadonly, UnwrapRef } from 'vue'

export interface CreateContextOptions {
  readonly?: boolean
  createProvider?: boolean
  native?: boolean
}

type ShallowUnwrap<T> = {
  [P in keyof T]: UnwrapRef<T[P]>
}

/**
 * 创建上下文
 *
 * Create context
 * @param context 上下文内容
 * @param key 注入key
 * @param options 可选项
 */
export function createContext<T>(context: any, key: InjectionKey<T> = Symbol(), options: CreateContextOptions = {}) {
  const { readonly = true, createProvider = false, native = false } = options

  const state = reactive(context)
  const provideData = readonly ? defineReadonly(state) : state
  !createProvider && provide(key, native ? context : provideData)

  return {
    state,
  }
}

/**
 * 使用上下文
 *
 * Reactive context
 * @param key
 * @param defaultValue
 */
export function useContext<T>(key: InjectionKey<T> = Symbol(), defaultValue?: any): ShallowUnwrap<T> {
  return inject(key, defaultValue || {})
}
