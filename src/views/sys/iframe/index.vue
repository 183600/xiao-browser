<template>
  <div :class="prefixCls" :style="getWrapStyle" v-loading="loading">
    <iframe
      :src="frameSrc"
      :class="`${prefixCls}__main`"
      ref="frameRef"
      @load="hideLoading"></iframe>
  </div>
</template>

<script lang="ts">
import type { CSSProperties } from 'vue'

import { ref, unref, computed, defineComponent } from 'vue'
import { ElLoading } from 'element-plus'

import { useWindowSizeFn } from '@/hooks/event/useWindowSizeFn'
import { useDesign } from '@/hooks/web/useDesign'
import { useLayoutHeight } from '@/layouts/default/content/useContentViewHeight'

export default defineComponent({
  name: 'FrameBlank',
  directives: {
    loading: ElLoading.directive,
  },
  props: {
    frameSrc: String,
  },
  setup() {
    const loading = ref(true)
    const topRef = ref(50)
    const heightRef = ref(window.innerHeight)
    const frameRef = ref<HTMLIFrameElement>()
    const { headerHeightRef } = useLayoutHeight()

    const { prefixCls } = useDesign('iframe-page')
    useWindowSizeFn(calcHeight, 150, { immediate: true })

    const getWrapStyle = computed((): CSSProperties => {
      return {
        height: `${unref(heightRef)}px`,
      }
    })

    function calcHeight() {
      const iframe = unref(frameRef)
      if (!iframe) {
        return
      }
      const top = headerHeightRef.value
      topRef.value = top
      heightRef.value = window.innerHeight - top
      const clientHeight = document.documentElement.clientHeight - top
      iframe.style.height = `${clientHeight}px`
    }

    function hideLoading() {
      loading.value = false
      calcHeight()
    }
    return {
      prefixCls,
      getWrapStyle,
      loading,
      hideLoading,
    }
  },
})
</script>

<style lang="scss" scoped>
$prefix-cls: '#{$tonyname}-iframe-page';

.#{$prefix-cls} {
  &__mask {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

  &__main {
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    overflow: hidden;
    background-color: var(--background-primary-color);
    border: 0;
  }
}
</style>
