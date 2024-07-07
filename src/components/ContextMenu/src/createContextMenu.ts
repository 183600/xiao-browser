import type { CreateContextMenuOptions, ContextMenuProps } from './typing'

import { createVNode, render } from 'vue'

import contextMenuVue from './ContextMenu.vue'

const menuManager: {
  domList: Element[]
  resolve: Fn
} = {
  domList: [],
  resolve: () => {},
}

/**
 * 创建右键菜单
 *
 * Create a right-click menu
 * @param options CreateContextMenuOptions
 */
export const createContextMenu = function(options: CreateContextMenuOptions) {
  const { event = null, showIcon = true, styles = {}, items, width } = options || {}

  event && event?.preventDefault()

  if (typeof window === 'undefined') return

  return new Promise((resolve) => {
    const body = document.body

    const container = document.createElement('div')
    const propsData: Partial<ContextMenuProps> = {
      event,
      styles,
      showIcon,
      items,
      width,
      axis: { x: event?.clientX || 0, y: event?.clientY || 0 },
    }

    /** create VNode */
    const vm = createVNode(contextMenuVue, propsData)
    /** render VNode */
    render(vm, container)

    const handleClick = function() {
      menuManager.resolve('')
    }

    menuManager.domList.push(container)

    const remove = function() {
      menuManager.domList.forEach((dom: Element) => {
        try {
          dom && body.removeChild(dom)
        } catch (error) {
          // continue
        }
      })
      body.removeEventListener('click', handleClick)
      body.removeEventListener('scroll', handleClick)
    }

    menuManager.resolve = function(arg) {
      remove()
      resolve(arg)
    }
    remove()
    body.appendChild(container)
    body.addEventListener('click', handleClick)
    body.addEventListener('scroll', handleClick)
  })
}

/**
 * 销毁右键菜单
 */
export const destroyContextMenu = function() {
  if (menuManager) {
    menuManager.resolve('')
    menuManager.domList = []
  }
}
