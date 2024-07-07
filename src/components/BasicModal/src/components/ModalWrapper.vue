<template>
  <div
    ref="spinRef"
    :style="spinStyle"
    v-loading="loading"
    :element-loading-text="loadingText">
    <ScrollContainer ref="wrapperRef" v-if="dyncHeight" :class="prefixCls">
      <div ref="innerRef"><slot></slot></div>
    </ScrollContainer>
    <template v-else><slot></slot></template>
  </div>
</template>

<script lang="ts">
import type { CSSProperties } from 'vue'

import { defineComponent, computed, ref, watchEffect, unref, watch, nextTick } from 'vue'
import { ElLoading } from 'element-plus'
// import { useMutationObserver } from '@vueuse/core'

import { useWindowSizeFn } from '@/hooks/event/useWindowSizeFn'
import { ScrollContainer } from '@/components/ScrollContainer'

import { createModalContext } from '../useModalContext'
import { wrapperProps } from '../props'

export default defineComponent({
  name: 'ModalWrapper',
  components: { ScrollContainer },
  directives: {
    loading: ElLoading.directive,
  },
  inheritAttrs: false,
  props: {
    modelValue: Boolean, // inherit
    fullscreen: Boolean, // inherit
    prefixCls: String, // inherit
    ...wrapperProps,
  },
  emits: ['height-change'],
  setup(props, { emit }) {
    const wrapperRef = ref<ComponentRef>(null)
    const spinRef = ref<ElRef>(null)
    const innerRef = ref<ElRef>(null)
    const realHeightRef = ref(0)
    /**
     * 获取内容区样式
     *
     * Get spin style
     */
    const spinStyle = computed((): CSSProperties => {
      const { dyncHeight } = props
      return dyncHeight
        ? {
          // 动态获取内容区高度
          // Dynamically get the height of the content area
          height: `${unref(realHeightRef)}px`,
        }
        : {
          height: 'auto',
          padding: '1rem',
        }
    })

    /**
     * 滚动区滚动到顶部
     *
     * scroll area scroll to top
     */
    async function scrollTop() {
      nextTick(() => {
        const wrapperRefDom = unref(wrapperRef)
        if (!wrapperRefDom) return
        ;(wrapperRefDom as any)?.scrollTo?.(0)
      })
    }

    /**
     * 设置内容区高度
     *
     * Set the content area height
     */
    async function setModalHeight() {
      // 为 false 时不操作
      // No action when false
      if (!props.modelValue) return

      // 不再动态高度
      // no longer dynamic height
      if (!props.dyncHeight) return

      // 内容区
      // content area
      const spinDom = unref(spinRef)
      if (!spinDom) return

      await nextTick()

      // 弹窗中心
      // modal body
      const bodyDom = spinDom.parentElement
      if (!bodyDom) return

      // 插槽内容
      // inner content
      const innerRefDom = unref(innerRef)
      if (!innerRefDom) return
      const modalInnerHeight = innerRefDom?.clientHeight || 0

      await nextTick()

      try {
        const modalDom = bodyDom.parentElement
        if (!modalDom) return

        // 弹窗头部高度
        // modal header height
        const modalHeaderHeight = modalDom.querySelector('.el-dialog__header')?.clientHeight || 0
        // 弹窗脚部高度
        // modal footer height
        const modalFooterHeight = modalDom.querySelector('.el-dialog__footer')?.clientHeight || 0

        const modalTop = modalDom.offsetTop

        // 计算合适的内容区高度
        // Calculate proper content area height
        let maxHeight =
          window.innerHeight - // window height
          modalTop * 2 - // modal offset top/bottom
          modalFooterHeight - // modal footer height
          modalHeaderHeight // modal header height

        // 如果插槽内容高度低于计算的高度，直接拿插槽内容高度
        // If the inner content height is lower than the calculated height, directly take the slot content height
        if (modalInnerHeight < maxHeight) {
          maxHeight = modalInnerHeight
        }

        // 至少保留 100px 的内容区高度
        // Keep content area height of at least 100px
        realHeightRef.value = maxHeight > 100 ? maxHeight : 100
        emit('height-change', unref(realHeightRef))
      } catch (error) {
        console.error(error)
      }
    }

    // 窗口变化是更新高度
    // window change is update height
    useWindowSizeFn(setModalHeight.bind(null, false))

    // useMutationObserver(
    //   innerRef,
    //   () => {
    //     setModalHeight()
    //   },
    //   {
    //     attributes: true,
    //     subtree: true,
    //   },
    // )

    createModalContext({
      redoModalHeight: setModalHeight,
    })

    watchEffect(() => {
      props.dyncHeight && setModalHeight()
    })

    watch(
      () => props.fullscreen,
      () => {
        setModalHeight()
      },
    )

    return {
      wrapperRef,
      spinRef,
      innerRef,
      spinStyle,
      scrollTop,
      setModalHeight,
    }
  },
})
</script>
