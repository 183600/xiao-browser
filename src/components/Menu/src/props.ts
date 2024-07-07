import type { Menu } from '@/router/types'
import type { PropType } from 'vue'

import { MenuModeEnum, MenuTypeEnum } from '@/enums/menuEnum'

export const basicProps = {
  items: {
    type: Array as PropType<Menu[]>,
    default: () => [],
  },
  collapsedShowTitle: Boolean,
  inlineIndent: {
    type: Number,
    default: 20,
  },
  mode: {
    type: String as PropType<'horizontal' | 'vertical' | 'inline'>,
    default: MenuModeEnum.INLINE,
  },

  type: {
    type: String as PropType<MenuTypeEnum>,
    default: MenuTypeEnum.MIX,
  },
  inlineCollapsed: Boolean,
  mixSider: Boolean,

  isHorizontal: Boolean,
  accordion: {
    type: Boolean,
    default: true,
  },
}

export const itemProps = {
  item: {
    type: Object as PropType<Menu>,
    default: {},
  },
  prefixCls: String,
  level: Number,
  showTitle: Boolean,
  isHorizontal: Boolean,
}

export const contentProps = {
  item: {
    type: Object as PropType<Menu>,
    default: null,
  },
  showTitle: {
    type: Boolean,
    default: true,
  },
  level: {
    type: Number,
    default: 0,
  },
  isHorizontal: {
    type: Boolean,
    default: true,
  },
}
