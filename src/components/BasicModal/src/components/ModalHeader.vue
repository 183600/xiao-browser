<template>
  <div :class="prefixCls" @dblclick="handleTitleDbClick">
    <BasicTitle :helpMessage="helpMessage">
      <template v-if="title">{{ title }}</template>
      <slot name="header" v-else></slot>
    </BasicTitle>
    <div :class="`${prefixCls}__extra`">
      <template v-if="showFullscreen">
        <ElTooltip content="还原" placement="bottom" v-if="fullscreen">
          <SvgIcon @click="handleFullscreen" name="shrink" />
        </ElTooltip>
        <ElTooltip content="最大化" placement="bottom" v-else>
          <SvgIcon @click="handleFullscreen" name="arrowsalt" />
        </ElTooltip>
      </template>
      <ElTooltip v-if="showClose" content="关闭" placement="bottom">
        <SvgIcon @click="handleCancel" name="close" />
      </ElTooltip>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { ElTooltip } from 'element-plus'

import { BasicTitle } from '@/components/Basic'
import { SvgIcon } from '@/components/SvgIcon'

import { headerProps } from '../props'

export default defineComponent({
  name: 'BasicModalHeader',
  components: { ElTooltip, BasicTitle, SvgIcon },
  inheritAttrs: false,
  props: {
    fullscreen: Boolean, // inherit
    prefixCls: String, // inherit
    title: String, // inherit
    ...headerProps,
  },
  emits: ['cancel', 'fullscreen'],
  setup(props, { emit }) {
    /**
     * 双击标题栏全屏
     *
     * Double click on title bar to go full screen
     * @param e
     */
    function handleTitleDbClick(e: Event) {
      if (!props.showFullscreen) return
      e.stopPropagation()

      handleFullscreen(e)
    }

    /**
     * 点击关闭
     *
     * Handle cancel
     * @param e
     */
    function handleCancel(e: Event) {
      emit('cancel', e)
    }

    /**
     * 点击全屏
     *
     * Handle fullscreen
     * @param e
     */
    function handleFullscreen(e: Event) {
      e?.stopPropagation()
      e?.preventDefault()
      emit('fullscreen')
    }

    return {
      handleCancel,
      handleFullscreen,
      handleTitleDbClick,
    }
  },
})
</script>
