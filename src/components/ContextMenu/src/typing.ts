import type { CSSProperties } from 'vue'

/**
 * 鼠标右击的轴数据
 *
 * Right-clicked axis data
 */
export interface Axis {
  /**
   * x轴
   *
   * x-axis
   */
  x: number
  /**
   * x轴
   *
   * y-axis
   */
  y: number
}
/**
 * 右击菜单项的数据
 *
 * Right-click menu item data
 */
export interface ContextMenuItem {
  /**
   * 菜单项名称
   *
   * Menu item name
   */
  label: string
  /**
   * 菜单项图标
   *
   * Menu item icon
   */
  icon?: string
  /**
   * 是否禁用
   *
   * Whether to disable
   */
  disabled?: boolean
  /**
   * 菜单项点击触发的函数
   *
   * The function triggered by the menu item click
   */
  handler?: Fn
  /**
   * 菜单项下方是否带分割线
   *
   * Whether there is a dividing line below the menu item
   */
  divider?: boolean
  /**
   * 菜单项的子项
   *
   * Children of menu items
   */
  children?: ContextMenuItem[]
}
/**
 * 右击菜单项的选项
 *
 * Right-click menu item options
 */
export interface CreateContextMenuOptions {
  /**
   * 右击的DOM的事件
   *
   * Right-clicked DOM events
   */
  event: MouseEvent
  /**
   * 右击菜单项的数据
   *
   * Right-click menu item data
   */
  items: ContextMenuItem[]
  /**
   * 是否显示图标
   *
   * Whether to show the icon
   */
  showIcon?: boolean
  /**
   * 右击菜单的样式
   *
   * Right-click menu style
   */
  styles?: CSSProperties
  /**
   * 右击菜单的宽度
   *
   * Right-click menu width
   */
  width?: number
}

/**
 * 右击菜单Props
 *
 * Right click menu Props
 */
export interface ContextMenuProps extends CreateContextMenuOptions {
  /**
   * 右击菜单的轴偏移
   *
   * Axis Offset from right-click menu
   */
  axis?: Axis
}

/**
 * 菜单项内容Props
 *
 * Menu item content Props
 */
export interface ItemContentProps {
  /**
   * 是否显示图标
   *
   * Whether to show the icon
   */
  showIcon: boolean | undefined
  /**
   * 右击菜单项的数据
   *
   * Right-click menu item data
   */
  item: ContextMenuItem
  /**
   * 操作处理
   *
   * Action handling
   */
  handler: Fn
}
