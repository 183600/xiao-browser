/**
 * 菜单显示模式
 *
 * Menu display mode
 */
export enum MenuTypeEnum {
  /**
   * 左侧菜单模式
   *
   * Left menu mode
   */
  SIDEBAR = 'sidebar',
  /**
   * 左侧菜单混合模式
   *
   * Left mixed menu mode
   */
  MIX_SIDEBAR = 'mix-sidebar',
  /**
   * 顶部菜单混合模式
   *
   * Top mix menu mode
   */
  MIX = 'mix',
  /**
   * 顶部菜单模式
   *
   * Top menu mode
   */
  TOP_MENU = 'top-menu',
}

/**
 * 菜单折叠触发器位置
 *
 * Menu Collapse Trigger Location
 */
export enum TriggerEnum {
  /**
   * 不显示
   *
   * Do not show
   */
  NONE = 'NONE',
  /**
   * 菜单底部
   *
   * Menu bottom
   */
  FOOTER = 'FOOTER',
  /**
   * 头部
   *
   * Header
   */
  HEADER = 'HEADER',
}

export type Mode = 'vertical' | 'vertical-right' | 'horizontal' | 'inline'

/**
 * 菜单模式
 *
 * Menu mode
 */
export enum MenuModeEnum {
  /**
   * 垂直
   *
   * Vertical
   */
  VERTICAL = 'vertical',
  /**
   * 水平
   *
   * Horizontal
   */
  HORIZONTAL = 'horizontal',
  /**
   * 垂直靠右
   *
   * Vertical right
   */
  VERTICAL_RIGHT = 'vertical-right',
  /**
   * 默认
   *
   * Inline
   */
  INLINE = 'inline',
}

/**
 * 菜单分割方式
 *
 * Menu split type
 */
export enum MenuSplitTyeEnum {
  /**
   * 不分割
   *
   * Not split
   */
  NONE,
  /**
   * 分割到顶部
   *
   * Split to top
   */
  TOP,
  /**
   * 分割到左侧
   *
   * Split to top
   */
  LEFT,
}

/**
 * 顶部菜单对齐方式
 *
 * Alignment of the top menu
 */
export enum TopMenuAlignEnum {
  /**
   * 居中
   *
   * Center
   */
  CENTER = 'center',
  /**
   * 靠左
   *
   * Stay left
   */
  START = 'start',
  /**
   * 靠右
   *
   * Stay right
   */
  END = 'end',
}

/**
 * 混合菜单触发方式
 *
 * Mixed menu triggering
 */
export enum MixSidebarTriggerEnum {
  /**
   * 悬浮
   *
   * Hover
   */
  HOVER = 'hover',
  /**
   * 点击
   *
   * Click
   */
  CLICK = 'click',
}
