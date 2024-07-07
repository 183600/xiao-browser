import type { Directive, DirectiveBinding } from 'vue'

import { usePermission } from '@/hooks/web/usePermission'

/**
 * 判断是否有权限
 *
 * Determine whether there is permission
 *
 * @param el Element
 * @param binding DirectiveBinding
 */
function isAuth(el: Element, binding: any) {
  const { hasPermission } = usePermission()

  const value = binding.value
  if (!value) return
  if (!hasPermission(value)) {
    el.parentNode?.removeChild(el)
  }
}

/**
 * 用于组件、按钮权限等细粒度控制
 *
 * For fine-grained control of components, button permissions, etc.
 * @Example v-auth="RoleEnum.TEST"
 */
const authDirective: Directive = {
  mounted(el: Element, binding: DirectiveBinding<any>) {
    isAuth(el, binding)
  },
}

export default authDirective
