export type { ContextMenuItem } from '@/components/ContextMenu'

import { onUnmounted, getCurrentInstance } from 'vue'
import { createContextMenu, destroyContextMenu } from '@/components/ContextMenu'

/**
 * 处理右键菜单
 *
 * Handling right-click menus
 * @param autoRemove
 */
export function useContextMenu(autoRemove = true) {
  if (getCurrentInstance() && autoRemove) {
    onUnmounted(() => {
      destroyContextMenu()
    })
  }
  return [createContextMenu, destroyContextMenu]
}
