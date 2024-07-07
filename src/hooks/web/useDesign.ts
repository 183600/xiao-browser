import { prefixCls } from '@/settings/designSetting'

/**
 * 使用页面设计定义
 *
 * Reactive design
 * @param scope
 */
export function useDesign(scope: string) {
  return {
    prefixCls: `${prefixCls}-${scope}`,
    prefixVar: prefixCls,
  }
}
