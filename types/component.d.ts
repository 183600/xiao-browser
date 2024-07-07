/**
 * 定义全局组件的智能提示
 *
 * Intellitips for defining global components
 */
declare module 'vue' {
  export interface GlobalComponents {
    // PageWrapper 全局组件类型声明
    // PageWrapper global component type declaration
    PageWrapper: typeof import('@/components/PageWrapper')['default']
  }
}

export {}
