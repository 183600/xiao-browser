<template>
  <Scrollbar ref="scrollbarRef" :class="prefixCls">
    <slot></slot>
  </Scrollbar>
</template>

<script lang="ts">
import type { ScrollActionType } from './typing'

import { defineComponent, ref, unref, nextTick } from 'vue'

import { Scrollbar } from '@/components/Scrollbar'
import { useScrollTo } from '@/hooks/event/useScrollTo'
import { useDesign } from '@/hooks/web/useDesign'

export default defineComponent({
  name: 'ScrollContainer',
  components: { Scrollbar },
  setup(_, { expose }) {
    const scrollbarRef = ref<Nullable<ScrollActionType>>(null)
    const { prefixCls } = useDesign('scroll-container')

    /**
     * 滚动到指定位置
     *
     * Scroll to the specified position
     */
    function scrollTo(to: number, duration = 500) {
      const scrollbar = unref(scrollbarRef)
      if (!scrollbar) return

      nextTick(() => {
        const wrap = unref(scrollbar.wrap)
        if (!wrap) return

        const { start } = useScrollTo({
          el: wrap,
          to,
          duration,
        })
        start()
      })
    }

    /**
     * 获取滚动容器Dom
     *
     * Get the scroll container Dom
     */
    function getScrollWrap() {
      const scrollbar = unref(scrollbarRef)
      if (!scrollbar) return null

      return scrollbar.wrap
    }

    /**
     * 滚动到底部
     *
     * Scroll to the bottom
     */
    function scrollBottom() {
      const scrollbar = unref(scrollbarRef)
      if (!scrollbar) return

      nextTick(() => {
        const wrap = unref(scrollbar.wrap) as any
        if (!wrap) return

        // 获取当前容器高度，然后滚动
        const scrollHeight = wrap.scrollHeight as number
        const { start } = useScrollTo({
          el: wrap,
          to: scrollHeight,
        })
        start()
      })
    }

    const scrollAction: ScrollActionType = {
      wrap: null,
      scrollTo,
      scrollBottom,
      getScrollWrap,
    }

    expose(scrollAction)

    return {
      prefixCls,
      scrollbarRef,
      ...scrollAction,
    }
  },
})
</script>

<style lang="scss">
$prefix-cls: '#{$tonyname}-scroll-container';

.#{$prefix-cls} {
  width: 100%;
  height: 100%;

  .scrollbar__wrap {
    margin-bottom: 16px;
    overflow-x: hidden;
  }

  .scrollbar__view {
    box-sizing: border-box;
  }
}
</style>
