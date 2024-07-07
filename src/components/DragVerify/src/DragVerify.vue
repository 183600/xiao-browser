<script lang="tsx">
import type { CSSProperties, Ref } from 'vue'

import { defineComponent, ref, computed, unref, reactive, watch, watchEffect } from 'vue'

import { getSlot } from '@/utils/helper/tsxHelper'
import { SvgIcon } from '@/components/SvgIcon'
import { useDesign } from '@/hooks/web/useDesign'

import { basicProps } from './props'

export default defineComponent({
  name: 'BasicDragVerify',
  props: basicProps,
  emits: ['success', 'update:modelValue', 'change', 'start', 'move', 'end'],
  setup(props, { emit, slots, expose }) {
    const state = reactive({
      isMoving: false,
      isPassing: false,
      moveDistance: 0,
      toLeft: false,
      startTime: 0,
      endTime: 0,
    })

    const wrapElRef = ref<HTMLDivElement | null>(null)
    const barElRef = ref<HTMLDivElement | null>(null)
    const contentElRef = ref<HTMLDivElement | null>(null)
    const actionElRef = ref(null) as Ref<HTMLDivElement | null>
    const { prefixCls } = useDesign('basic-drag-verify')

    // 监听鼠标松开，重置拖动状态
    document.addEventListener('mouseup', () => {
      if (state.isMoving) {
        resume()
      }
    })

    /**
     * 拖动点样式
     *
     *  Drag action style
     */
    const getActionStyleRef = computed(() => {
      const { height, actionStyle } = props
      const h = `${height}px`
      return {
        left: 0,
        width: h,
        height: h,
        ...actionStyle,
      }
    })
    /**
     * 拖动框样式
     *
     * Drag box style
     */
    const getWrapStyleRef = computed(() => {
      const { height, width, circle, wrapStyle } = props
      const h = height
      const w = `${width}px`
      return {
        width: w,
        height: `${h}px`,
        lineHeight: `${h}px`,
        borderRadius: circle ? `${h / 2}px` : 0,
        ...wrapStyle,
      }
    })
    /**
     * 拖动条样式
     *
     * Drag bar style
     */
    const getBarStyleRef = computed(() => {
      const { height, circle, barStyle } = props
      const h = height
      return {
        height: `${h}px`,
        borderRadius: circle ? `${h / 2}px 0 0 ${h / 2}px` : 0,
        ...barStyle,
      }
    })
    /**
     * 拖动容器样式
     *
     * Drag content style
     */
    const getContentStyleRef = computed(() => {
      const { height, width, contentStyle } = props
      const h = `${height}px`
      const w = `${width}px`

      return {
        height: h,
        width: w,
        ...contentStyle,
      } as CSSProperties
    })

    watch(
      () => state.isPassing,
      (isPassing) => {
        if (isPassing) {
          // 拖动成功回调
          const { startTime, endTime } = state
          const time = (endTime - startTime) / 1000
          emit('success', { isPassing, time: time.toFixed(1) })
          emit('update:modelValue', isPassing)
          emit('change', isPassing)
        }
      },
    )

    watchEffect(() => {
      state.isPassing = !!props.modelValue
    })

    /**
     * 获取拖动的页面距离 x
     *
     * Get the dragged page x
     */
    function getEventPageX(e: MouseEvent | TouchEvent) {
      return (e as MouseEvent).pageX || (e as TouchEvent).touches[0].pageX
    }

    /**
     * 开始拖动
     *
     * Drag start
     */
    function handleDragStart(e: MouseEvent | TouchEvent) {
      if (state.isPassing) {
        return
      }
      const actionEl = unref(actionElRef)
      if (!actionEl) return

      // 拖动开始
      emit('start', e)
      state.moveDistance = getEventPageX(e) - parseInt(actionEl.style.left.replace('px', ''), 10)
      state.startTime = new Date().getTime()
      state.isMoving = true
    }

    /**
     * 获取拖动距离
     *
     * Get the drag distance
     */
    function getOffset(el: HTMLDivElement) {
      const actionWidth = parseInt(el.style.width)
      const { width } = props
      const widthNum = width
      const offset = widthNum - actionWidth - 6
      return { offset, widthNum, actionWidth }
    }

    /**
     * 拖动中处理
     *
     * Handling while dragging
     */
    function handleDragMoving(e: MouseEvent | TouchEvent) {
      const { isMoving, moveDistance } = state
      if (isMoving) {
        const actionEl = unref(actionElRef)
        const barEl = unref(barElRef)
        if (!actionEl || !barEl) return
        const { offset, widthNum, actionWidth } = getOffset(actionEl)
        const moveX = getEventPageX(e) - moveDistance

        emit('move', {
          event: e,
          moveDistance,
          moveX,
        })
        if (moveX > 0 && moveX <= offset) {
          actionEl.style.left = `${moveX}px`
          barEl.style.width = `${moveX + actionWidth / 2}px`
        } else if (moveX > offset) {
          actionEl.style.left = `${widthNum - actionWidth}px`
          barEl.style.width = `${widthNum - actionWidth / 2}px`
          if (!props.isSlot) {
            checkPass()
          }
        }
      }
    }

    /**
     * 处理拖动结束
     *
     * Handle drag end
     */
    function handleDragOver(e: MouseEvent | TouchEvent) {
      const { isMoving, isPassing, moveDistance } = state
      if (isMoving && !isPassing) {
        emit('end', e)
        const actionEl = unref(actionElRef)
        const barEl = unref(barElRef)
        if (!actionEl || !barEl) return
        const moveX = getEventPageX(e) - moveDistance
        const { offset, widthNum, actionWidth } = getOffset(actionEl)
        if (moveX < offset) {
          if (!props.isSlot) {
            resume()
          } else {
            setTimeout(() => {
              if (!props.modelValue) {
                resume()
              } else {
                const contentEl = unref(contentElRef)
                if (contentEl) {
                  contentEl.style.width = `${parseInt(barEl.style.width)}px`
                }
              }
            }, 0)
          }
        } else {
          actionEl.style.left = `${widthNum - actionWidth}px`
          barEl.style.width = `${widthNum - actionWidth / 2}px`
          checkPass()
        }
        state.isMoving = false
      }
    }

    /**
     * 检查成功状态
     *
     * Check success status
     */
    function checkPass() {
      // slot模式直接重置拖动状态
      if (props.isSlot) {
        resume()
        return
      }

      state.endTime = new Date().getTime()
      state.isPassing = true
      state.isMoving = false
    }

    /**
     * 重置拖动状态
     *
     * Reset drag state
     */
    function resume() {
      state.isMoving = false
      state.isPassing = false
      state.moveDistance = 0
      state.toLeft = false
      state.startTime = 0
      state.endTime = 0
      const actionEl = unref(actionElRef)
      const barEl = unref(barElRef)
      const contentEl = unref(contentElRef)
      if (!actionEl || !barEl || !contentEl) return

      state.toLeft = true
      setTimeout(() => {
        state.toLeft = false
        actionEl.style.left = '0'
        barEl.style.width = '0'
      }, 300)
      contentEl.style.width = unref(getContentStyleRef).width as string
    }

    // 暴露重置方法给外界
    // Expose the resume method to the outside
    expose({
      resume,
    })

    return () => {
      /**
       * 渲染拖动条
       *
       * Render drag bar
       */
      const renderBar = () => {
        const cls = [`${prefixCls}-bar`]
        if (state.toLeft) {
          cls.push('to-left')
        }
        return <div class={cls} ref={barElRef} style={unref(getBarStyleRef)} />
      }

      /**
       * 渲染拖动容器
       *
       * Render the drag container
       */
      const renderContent = () => {
        const cls = [`${prefixCls}-content`]
        const { isPassing } = state
        const { text, successText } = props

        isPassing && cls.push('success')

        return (
          <div class={cls} ref={contentElRef} style={unref(getContentStyleRef)}>
            {getSlot(slots, 'text', isPassing) || (isPassing ? successText : text)}
          </div>
        )
      }
      /**
       * 渲染拖动点
       *
       * Render drag action
       */
      const renderAction = () => {
        const cls = [`${prefixCls}-action`]
        const { toLeft, isPassing } = state
        if (toLeft) {
          cls.push('to-left')
        }
        return (
          <div class={cls} onMousedown={handleDragStart} onTouchstart={handleDragStart} style={unref(getActionStyleRef)} ref={actionElRef}>
            {getSlot(slots, 'actionIcon', isPassing) || <SvgIcon class={`${prefixCls}-action__icon`} name={`${isPassing ? 'check' : 'doubleright'}`} />}
          </div>
        )
      }

      return (
        <div
          class={prefixCls}
          ref={wrapElRef}
          style={unref(getWrapStyleRef)}
          onMousemove={handleDragMoving}
          onTouchmove={handleDragMoving}
          onMouseleave={handleDragOver}
          onMouseup={handleDragOver}
          onTouchend={handleDragOver}>
          {renderBar()}
          {renderContent()}
          {renderAction()}
        </div>
      )
    }
  },
})
</script>

<style lang="scss">
$prefix-cls: '#{$tonyname}-basic-drag-verify';

.#{$prefix-cls} {
  --varify-radius: 4px;

  position: relative;
  overflow: hidden;
  text-align: center;
  user-select: none;
  background-color: var(--white-color);
  border: 1px solid var(--border-color-light);
  border-radius: var(--varify-radius);

  &-bar {
    position: absolute;
    width: 0;
    height: 36px;
    background-color: var(--success-color);
    border-radius: var(--varify-radius);

    &.to-left {
      width: 0 !important;
      transition: width 0.3s;
    }
  }

  &-content {
    position: absolute;
    top: 0;
    font-size: 12px;
    user-select: none;
    background-image: -webkit-gradient(linear, left top, right top, color-stop(0, #333), color-stop(0.4, #333), color-stop(0.5, #fff), color-stop(0.6, #333), color-stop(1, #333));
    background-clip: text;
    animation: slidetounlock 3s infinite;
    text-size-adjust: none;

    > span {
      display: inline-block;
    }

    &.success {
      -webkit-text-fill-color: var(--white-color);
    }

    & > * {
      -webkit-text-fill-color: #333;
    }
  }

  &-action {
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: move;
    background-color: var(--background-primary-color);
    border-radius: var(--varify-radius);

    &__icon {
      cursor: inherit;
    }

    &.to-left {
      left: 0 !important;
      transition: left 0.3s;
    }
  }
}

@keyframes slidetounlock {
  0% {
    background-position: -120px 0;
  }

  100% {
    background-position: 120px 0;
  }
}
</style>
