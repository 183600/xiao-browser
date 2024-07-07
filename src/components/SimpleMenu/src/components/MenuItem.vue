<template>
  <li :class="getClass" @click.stop="handleClickItem" :style="getCollapse ? {} : getItemStyle">
    <ElTooltip placement="right" v-if="showTooptip">
      <div :class="`${prefixCls}--tooltip`">
        <slot></slot>
      </div>
      <template #content>
        <slot name="title"></slot>
      </template>
    </ElTooltip>

    <template v-else>
      <slot></slot>
      <slot name="title"></slot>
    </template>
  </li>
</template>

<script lang="ts">
import { defineComponent, ref, computed, unref, getCurrentInstance, watch } from 'vue'
import { ElTooltip } from 'element-plus'

import { useDesign } from '@/hooks/web/useDesign'

import { useMenuItem } from './useMenu'
import { useSimpleRootMenuContext } from './useSimpleMenuContext'

export default defineComponent({
  name: 'MenuItem',
  components: { ElTooltip },
  props: {
    name: {
      type: String,
      required: true,
    },
    disabled: Boolean,
  },
  setup(props, { slots }) {
    const instance = getCurrentInstance()

    const active = ref(false)

    const { getItemStyle, getParentList, getParentMenu, getParentRootMenu } = useMenuItem(instance)

    const { prefixCls } = useDesign('simple-menu-item')

    const { rootMenuEmitter, activeName } = useSimpleRootMenuContext()

    const getClass = computed(() => {
      return [
        `${prefixCls}`,
        {
          [`${prefixCls}--active`]: unref(active),
          [`${prefixCls}--selected`]: unref(active),
          [`${prefixCls}--disabled`]: !!props.disabled,
        },
      ]
    })

    const getCollapse = computed(() => unref(getParentRootMenu)?.props.collapse)

    const showTooptip = computed(() => {
      return unref(getParentMenu)?.type.name === 'MenuList' && unref(getCollapse) && slots.title
    })

    function handleClickItem() {
      const { disabled } = props
      if (disabled) return

      rootMenuEmitter.emit('on-menu-item-select', props.name)
      if (unref(getCollapse)) return

      const { uidList } = getParentList()

      rootMenuEmitter.emit('on-update-opened', {
        opend: false,
        parent: instance?.parent,
        uidList: uidList,
      })
    }
    watch(
      () => unref(activeName),
      (name: string) => {
        if (name === props.name) {
          const { list, uidList } = getParentList()
          active.value = true
          list?.forEach((item) => {
            if (item.proxy) {
              // eslint-disable-next-line prettier/prettier
              (item.proxy as any).active = true
            }
          })

          rootMenuEmitter.emit('on-update-active-name:submenu', uidList)
        } else {
          active.value = false
        }
      },
      { immediate: true },
    )

    return { getClass, prefixCls, getItemStyle, getCollapse, handleClickItem, showTooptip }
  },
})
</script>
