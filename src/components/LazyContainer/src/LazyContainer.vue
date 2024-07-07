<template>
  <transition-group
    :class="prefixCls"
    v-bind="$attrs"
    ref="elRef"
    :name="transitionName"
    :tag="tag"
    mode="out-in">
    <div key="component" v-if="isInit">
      <slot :loading="loading"></slot>
    </div>
    <div key="skeleton" v-else>
      <slot name="skeleton" v-if="$slots.skeleton"></slot>
      <ElSkeleton v-else />
    </div>
  </transition-group>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, toRef } from 'vue'
import { ElSkeleton } from 'element-plus'

import { useDesign } from '@/hooks/web/useDesign'
import { useIntersectionObserver } from '@/hooks/event/useIntersectionObserver'

export default defineComponent({
  name: 'LazyContainer',
  components: { ElSkeleton },
  inheritAttrs: false,
  props: {
    /**
     * 等待时间
     *
     * Waiting time
     */
    timeout: { type: Number },
    /**
     * 组件所在的容器
     *
     * The viewport where the component is located
     */
    viewport: {
      type: (typeof window !== 'undefined' ? window.HTMLElement : Object) as PropType<HTMLElement>,
      default: () => null,
    },
    /**
     * 预加载阈值
     *
     * Preload threshold
     */
    threshold: { type: String, default: '0px' },
    /**
     * 容器的滚动方向
     *
     * The scroll direction of the viewport
     */
    direction: {
      type: String as PropType<'vertical' | 'horizontal'>,
      default: 'vertical',
      validator: (v: string) => ['vertical', 'horizontal'].includes(v),
    },
    /**
     * 包裹组件的外层容器的标签名称
     *
     * The label name of the outer container that wraps the component
     */
    tag: { type: String, default: 'div' },
    /**
     * 最长等待时间
     *
     * maximum waiting time
     */
    maxWaitingTime: { type: Number, default: 120 },
    /**
     * 过渡名称
     *
     * transition name
     */
    transitionName: { type: String, default: 'lazy-container' },
  },
  emits: ['init'],
  setup(props, { emit }) {
    const elRef = ref()
    const isInit = ref(false)
    const loading = ref(false)
    const { prefixCls } = useDesign('lazy-container')

    /**
     * 如果设置了延迟时间，会在指定时间之后自动加载
     *
     * If a delay time is set, it will be loaded automatically after the specified time
     */
    function immediateInit() {
      const { timeout } = props
      timeout &&
        setTimeout(() => {
          init()
        }, timeout)
    }

    /**
     * 初始化容器内容
     *
     * Initialize container contents
     */
    function init() {
      loading.value = true

      setTimeout(() => {
        if (isInit.value) return

        isInit.value = true
        emit('init')
      }, props.maxWaitingTime || 120)
    }
    /**
     * 初始化加载视图容器
     *
     * Initialize loading view container
     */
    function initIntersectionObserver() {
      const { timeout, direction, threshold } = props
      // 设置了延后加载将不再触发延时加载
      if (timeout) return

      /**
       * 提前加载距离
       *
       * early loading distance
       */
      let rootMargin = '0px'
      switch (direction) {
      case 'vertical':
        rootMargin = `${threshold} 0px`
        break
      case 'horizontal':
        rootMargin = `0px ${threshold}`
        break
      }

      try {
        const { stop, observer } = useIntersectionObserver({
          rootMargin,
          target: toRef(elRef.value, '$el'),
          onIntersect: (entries: any[]) => {
            const isIntersecting = entries[0].isIntersecting || entries[0].intersectionRatio
            if (isIntersecting) {
              init()
              if (observer) {
                stop()
              }
            }
          },
          root: toRef(props, 'viewport'),
        })
      } catch (e) {
        init()
      }
    }

    onMounted(() => {
      immediateInit()
      initIntersectionObserver()
    })

    return {
      prefixCls,
      elRef,
      isInit,
      loading,
    }
  },
})
</script>

<style lang="scss">
$prefix-cls: '#{$tonyname}-lazy-container';

.#{$prefix-cls} {
  width: 100%;
  height: 100%;
}
</style>
