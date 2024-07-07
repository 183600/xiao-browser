<script lang="tsx">
import type { FunctionalComponent, CSSProperties } from 'vue'
import type { ContextMenuItem, ItemContentProps, Axis } from './typing'

import { defineComponent, nextTick, onMounted, computed, ref, unref, onUnmounted } from 'vue'
import { ElMenu, ElMenuItem, ElSubMenu } from 'element-plus'

import Icon from '@/components/Icon'
import { useDesign } from '@/hooks/web/useDesign'

export default defineComponent({
  name: 'ContextMenu',
  props: {
    /**
     * 右击菜单项的数据
     *
     * Right-click menu item data
     */
    items: {
      type: Array as PropType<ContextMenuItem[]>,
      default() {
        return []
      },
    },
    /**
     * 右击菜单的宽度
     *
     * Right-click menu width
     */
    width: {
      type: Number,
      default: 156,
    },
    /**
     * 右击的DOM的事件
     *
     * Right-clicked DOM events
     */
    event: {
      type: Object as PropType<Event>,
      default: null,
    },
    /**
     * 右击菜单的样式
     *
     * Right-click menu style
     */
    styles: Object as PropType<CSSProperties>,
    /**
     * 是否显示图标
     *
     * Whether to show the icon
     */
    showIcon: {
      type: Boolean,
      default: true,
    },
    /**
     * 右击菜单的轴偏移
     *
     * Axis Offset from right-click menu
     */
    axis: {
      type: Object as PropType<Axis>,
      default() {
        return { x: 0, y: 0 }
      },
    },
  },
  setup(props) {
    const wrapRef = ref(null)
    const showRef = ref(false)

    const { prefixCls } = useDesign('context-menu')

    /**
     * 处理菜单样式
     *
     * Handling menu styles
     */
    const getStyle = computed((): CSSProperties => {
      const { axis, items, styles, width } = props
      const { x, y } = axis || { x: 0, y: 0 }
      const menuHeight = (items || []).length * 44
      const menuWidth = width
      const body = document.body

      const left = body.clientWidth < x + menuWidth ? x - menuWidth : x
      const top = body.clientHeight < y + menuHeight ? y - menuHeight : y
      return {
        ...styles,
        width: `${width}px`,
        left: `${left + 1}px`,
        top: `${top + 1}px`,
      }
    })

    /**
     * 处理菜单项内容
     *
     * Handling menu item content
     */
    const ItemContent: FunctionalComponent<ItemContentProps> = (props) => {
      const { item, handler, showIcon } = props
      return (
        <div class={`${prefixCls}__text`} onClick={handler.bind(null, item)}>
          {showIcon && item.icon && <Icon class='mr-2' name={item.icon} />}
          <span>{item.label}</span>
        </div>
      )
    }

    /**
     * 处理点击动作
     *
     * Handling clicks
     */
    function handleAction(item: ContextMenuItem, e: MouseEvent) {
      const { handler, disabled } = item
      if (disabled) return

      showRef.value = false
      e?.stopPropagation()
      e?.preventDefault()
      handler?.()
    }

    /**
     * 渲染菜单项
     *
     * Render menu item
     */
    function renderMenuItem(items: ContextMenuItem[]) {
      return items.map((item) => {
        const { disabled, label, children, divider = false } = item

        const contentProps = {
          item,
          handler: handleAction,
          showIcon: props.showIcon,
        }

        if (!children || children.length === 0) {
          return (
            <>
              <ElMenuItem disabled={disabled} class={`${prefixCls}__item ${divider ? 'is-divider' : ''}`} index={label}>
                <ItemContent {...contentProps} />
              </ElMenuItem>
            </>
          )
        }
        if (!unref(showRef)) return null

        return (
          <ElSubMenu index={label} disabled={disabled} popper-class={`${prefixCls}__popup`}>
            {{
              title: () => <ItemContent {...contentProps} />,
              default: () => renderMenuItem(children),
            }}
          </ElSubMenu>
        )
      })
    }

    onMounted(() => {
      nextTick(() => (showRef.value = true))
    })

    onUnmounted(() => {
      const el = unref(wrapRef)
      el && document.body.removeChild(el)
    })

    return () => {
      if (!unref(showRef)) return null

      const { items } = props
      return (
        <ElMenu default-active='12' mode='vertical' collapse={true} unique-opened={true} menu-trigger='hover' class={prefixCls} ref={wrapRef} style={unref(getStyle)}>
          {renderMenuItem(items)}
        </ElMenu>
      )
    }
  },
})
</script>

<style lang="scss" src="./index.scss"></style>
