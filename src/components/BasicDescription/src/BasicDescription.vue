<script lang="tsx">
import type { BasicDescProps, DescActionMethods } from './typing'
import type { CollapseContainerProps } from '@/components/CollapseContainer'
import type { EleDescriptions } from '@/components/ElementPlus'

import { defineComponent, computed, ref, unref } from 'vue'
import { ElDescriptions, ElDescriptionsItem } from 'element-plus'
import { get, omit } from 'lodash-es'

import { CollapseContainer } from '@/components/CollapseContainer'
import { useDesign } from '@/hooks/web/useDesign'
import { getSlot } from '@/utils/helper/tsxHelper'

import { basicProps, customProps } from './props'

export default defineComponent({
  name: 'BasicDescription',
  props: basicProps,
  emits: ['register'],
  setup(props, { attrs, slots, emit, expose }) {
    const propsRef = ref<Partial<BasicDescProps> | null>(null)

    const { prefixCls } = useDesign('basic-description')

    /**
     * 获取更新 Props
     *
     * Merge Props
     */
    const getProps = computed(() => {
      return {
        ...props,
        ...(unref(propsRef) as Recordable),
      } as BasicDescProps
    })

    /**
     * 通过标题判断是否应该使用折叠组件
     *
     * Use the title to determine whether the collapsible component should be used
     */
    const useWrapper = computed(() => !!unref(getProps).title)

    /**
     * 获取折叠组件配置
     *
     * Get Collapse configuration
     */
    const getCollapseOptions = computed((): CollapseContainerProps => {
      const { collapseOptions = {} } = unref(getProps)
      return {
        // Cannot be expanded by default
        canExpand: false,
        ...collapseOptions,
      }
    })

    /**
     * 绑定描述Props
     *
     * Bind description props
     */
    const getBindValues = computed(() => {
      const opts = { ...attrs, ...unref(getProps) }
      // 绑定组件Porps前，移除自定义附加项
      // Before binding component Porps, remove custom add-ons
      const customOpts = Object.keys(customProps)

      return omit(opts, customOpts) as EleDescriptions
    })

    /**
     * 通过实例设置 Props
     *
     * Setting Props by Instance
     * @param descProps Description Props
     */
    function setDescProps(descProps: Partial<BasicDescProps>): void {
      propsRef.value = { ...(unref(propsRef) as Recordable), ...descProps } as Recordable
    }

    /**
     * 渲染描述项
     *
     * Render Description item
     */
    function renderItem() {
      const { schema, data } = unref(getProps)
      return unref(schema)
        .map((item) => {
          const { field, show, isSlot, render } = item

          if (typeof show === 'function' && !show(data)) {
            return null
          }

          const getContent = () => {
            if (!data) return null

            const getField = get(data, field)
            // 是否自定义插槽，插槽名称为 field 值
            // Custom Slot, slot name is field value
            if (isSlot) {
              return getSlot(slots, field, getField)
            }
            // 是否自定义渲染函数
            return typeof render === 'function' ? render(getField, data) : getField ?? ''
          }

          return (
            <ElDescriptionsItem {...unref(item)}>
              {() => {
                // if (!minWidth) {
                return getContent()
                // }
                // const style: CSSProperties = {
                //   minWidth: `${minWidth}px`,
                // }
                // return <div stylex={style}>{getContent()}</div>
              }}
            </ElDescriptionsItem>
          )
        })
        .filter((item) => !!item)
    }

    /**
     * 渲染描述
     *
     * Render description
     */
    const renderDesc = () => {
      return (
        <ElDescriptions class={`${prefixCls}`} {...unref(getBindValues)}>
          {renderItem()}
        </ElDescriptions>
      )
    }

    /**
     * 渲染折叠容器
     *
     * Render collapse container
     */
    const renderContainer = () => {
      const { title, useCollapse } = unref(getProps)

      // 如果 useCollapse 为 false， 不渲染折叠容器
      // If useCollapse is false, do not render the collapsed container
      if (!useCollapse) {
        return renderDesc()
      }

      const { canExpand, helpMessage } = unref(getCollapseOptions)

      return (
        <CollapseContainer title={title} canExpan={canExpand} helpMessage={helpMessage}>
          {{
            default: () => renderDesc(),
            action: () => getSlot(slots, 'action'),
          }}
        </CollapseContainer>
      )
    }

    const descMethods: DescActionMethods = {
      setDescProps,
    }

    expose(descMethods)

    emit('register', descMethods)

    return () => (unref(useWrapper) ? renderContainer() : renderDesc())
  },
})
</script>
