<template>
  <li :class="getClass">
    <template v-if="!getCollapse">
      <div :class="`${prefixCls}-title`" @click.stop="handleClick" :style="getItemStyle">
        <slot name="title"></slot>
        <SvgIcon name="down" :size="12" :class="`${prefixCls}-title-icon`" />
      </div>
      <transition name="submenu-expand" mode="out-in">
        <ul :class="prefixCls" v-show="opened">
          <slot></slot>
        </ul>
      </transition>
    </template>

    <ElPopover
      placement="right"
      v-else
      effect="dark"
      :visible="getIsOpend"
      @show="handleVisibleChange(true)"
      @hide="handleVisibleChange(false)"
      :popper-class="`${prefixCls}-popover`">
      <template #reference>
        <div :class="getSubClass" v-bind="getEvents(false)">
          <div
            :class="[
              {
                [`${prefixCls}--popup`]: !getParentSubMenu,
                [`${prefixCls}--collapsed-show-title`]: collapsedShowTitle,
              },
            ]">
            <slot name="title"></slot>
          </div>
          <SvgIcon
            v-if="getParentSubMenu"
            name="down"
            :size="12"
            :class="`${prefixCls}-title-icon`" />
        </div>
      </template>
      <div v-bind="getEvents(true)">
        <ul :class="[prefixCls, `${prefixCls}--popup`]">
          <slot></slot>
        </ul>
      </div>
    </ElPopover>
  </li>
</template>

<script lang="ts">
import type { SubMenuProvider } from './types'

import { defineComponent, computed, unref, getCurrentInstance, toRefs, reactive, provide, onBeforeMount, inject } from 'vue'
import { ElPopover } from 'element-plus'
import { isObject } from '@vueuse/core'

import { useDesign } from '@/hooks/web/useDesign'
import { SvgIcon } from '@/components/SvgIcon'
import mitt from '@/utils/mitt'

import { useMenuItem } from './useMenu'
import { useSimpleRootMenuContext } from './useSimpleMenuContext'

const DELAY = 200
export default defineComponent({
  name: 'SubMenu',
  components: {
    ElPopover,
    SvgIcon,
  },
  props: {
    name: {
      type: String,
      required: true,
    },
    disabled: Boolean,
    collapsedShowTitle: Boolean,
  },
  setup(props) {
    const instance = getCurrentInstance()

    const state = reactive({
      active: false,
      opened: false,
    })

    const data = reactive({
      timeout: null as TimeoutHandle | null,
      mouseInChild: false,
      isChild: false,
    })

    const { getParentSubMenu, getItemStyle, getParentMenu, getParentList } = useMenuItem(instance)

    const { prefixCls } = useDesign('simple-submenu-item')

    const subMenuEmitter = mitt()

    const { rootMenuEmitter } = useSimpleRootMenuContext()

    const {
      addSubMenu: parentAddSubmenu,
      removeSubMenu: parentRemoveSubmenu,
      removeAll: parentRemoveAll,
      getOpenNames: parentGetOpenNames,
      isRemoveAllPopup,
      sliceIndex,
      level,
      props: rootProps,
      handleMouseleave: parentHandleMouseleave,
    } = inject<SubMenuProvider>(`subMenu:${getParentMenu.value?.uid}`)!

    const getClass = computed(() => {
      return [
        `${prefixCls}`,
        {
          [`${prefixCls}--active`]: state.active,
          [`${prefixCls}--opened`]: state.opened,
          [`${prefixCls}--disabled`]: props.disabled,
          [`${prefixCls}--hasparent`]: unref(getParentSubMenu),
          [`${prefixCls}--childitem-active`]: state.active,
        },
      ]
    })

    const getAccordion = computed(() => rootProps.accordion)
    const getCollapse = computed(() => rootProps.collapse)

    const getIsOpend = computed(() => {
      const name = props.name
      if (unref(getCollapse)) {
        return parentGetOpenNames().includes(name)
      }
      return state.opened
    })

    const getSubClass = computed(() => {
      const isActive = rootProps.activeSubMenuNames.includes(props.name)
      return [
        `${prefixCls}-title`,
        {
          [`${prefixCls}--active`]: isActive,
          [`${prefixCls}--active-border`]: isActive && level === 0,
          [`${prefixCls}--collapse`]: unref(getCollapse) && level === 0,
        },
      ]
    })

    function getEvents(deep: boolean) {
      if (!unref(getCollapse)) {
        return {}
      }
      return {
        onMouseenter: handleMouseenter,
        onMouseleave: () => handleMouseleave(deep),
      }
    }

    function handleClick() {
      const { disabled } = props
      if (disabled || unref(getCollapse)) return
      const opened = state.opened

      if (unref(getAccordion)) {
        const { uidList } = getParentList()
        rootMenuEmitter.emit('on-update-opened', {
          opend: false,
          parent: instance?.parent,
          uidList: uidList,
        })
      } else {
        rootMenuEmitter.emit('open-name-change', {
          name: props.name,
          opened: !opened,
        })
      }
      state.opened = !opened
    }

    function handleMouseenter() {
      const disabled = props.disabled
      if (disabled) return

      subMenuEmitter.emit('submenu:mouse-enter-child')

      const index = parentGetOpenNames().findIndex((item) => item === props.name)

      sliceIndex(index)

      const isRoot = level === 0 && parentGetOpenNames().length === 2
      if (isRoot) {
        parentRemoveAll()
      }
      data.isChild = parentGetOpenNames().includes(props.name)
      clearTimeout(data.timeout!)
      data.timeout = setTimeout(() => {
        parentAddSubmenu(props.name)
      }, DELAY)
    }

    function handleMouseleave(deepDispatch = false) {
      const parentName = getParentMenu.value?.props.name
      if (!parentName) {
        isRemoveAllPopup.value = true
      }

      if (parentGetOpenNames().slice(-1)[0] === props.name) {
        data.isChild = false
      }

      subMenuEmitter.emit('submenu:mouse-leave-child')
      if (data.timeout) {
        clearTimeout(data.timeout!)
        data.timeout = setTimeout(() => {
          if (isRemoveAllPopup.value) {
            parentRemoveAll()
          } else if (!data.mouseInChild) {
            parentRemoveSubmenu(props.name)
          }
        }, DELAY)
      }
      if (deepDispatch) {
        if (getParentSubMenu.value) {
          parentHandleMouseleave?.(true)
        }
      }
    }

    onBeforeMount(() => {
      subMenuEmitter.on('submenu:mouse-enter-child', () => {
        data.mouseInChild = true
        isRemoveAllPopup.value = false
        clearTimeout(data.timeout!)
      })
      subMenuEmitter.on('submenu:mouse-leave-child', () => {
        if (data.isChild) return
        data.mouseInChild = false
        clearTimeout(data.timeout!)
      })

      rootMenuEmitter.on('on-update-opened', (data: boolean | (string | number)[] | Recordable) => {
        if (unref(getCollapse)) return
        if (typeof data === 'boolean') {
          state.opened = data
          return
        }
        if (isObject(data) && rootProps.accordion) {
          const { opend, parent, uidList } = data as Recordable
          if (parent === instance?.parent) {
            state.opened = opend
          } else if (!uidList.includes(instance?.uid)) {
            state.opened = false
          }
          return
        }

        if (props.name && Array.isArray(data)) {
          state.opened = (data as (string | number)[]).includes(props.name)
        }
      })

      rootMenuEmitter.on('on-update-active-name:submenu', (data: number[]) => {
        if (instance?.uid) {
          state.active = data.includes(instance?.uid)
        }
      })
    })

    function handleVisibleChange(visible) {
      state.opened = visible
    }

    // provide
    provide<SubMenuProvider>(`subMenu:${instance?.uid}`, {
      addSubMenu: parentAddSubmenu,
      removeSubMenu: parentRemoveSubmenu,
      getOpenNames: parentGetOpenNames,
      removeAll: parentRemoveAll,
      isRemoveAllPopup,
      sliceIndex,
      level: level + 1,
      handleMouseleave,
      props: rootProps,
    })
    return {
      getClass,
      prefixCls,
      getCollapse,
      getItemStyle,
      handleClick,
      handleVisibleChange,
      getParentSubMenu,
      getIsOpend,
      getEvents,
      getSubClass,
      ...toRefs(state),
      ...toRefs(data),
    }
  },
})
</script>
