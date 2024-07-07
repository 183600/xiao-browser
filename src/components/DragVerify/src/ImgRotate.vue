<script lang="tsx">
import type { MoveData, DragVerifyActionType } from './typing'

import { defineComponent, computed, unref, reactive, watch, ref } from 'vue'

import { useTimeoutFn } from '@/hooks/core/useTimeout'
import { useDesign } from '@/hooks/web/useDesign'

import BasicDragVerify from './DragVerify.vue'
import { rotateProps } from './props'

export default defineComponent({
  name: 'RotateDragVerify',
  inheritAttrs: false,
  props: rotateProps,
  emits: ['success', 'change', 'update:modelValue'],
  setup(props, { emit, attrs, expose }) {
    const basicRef = ref<Nullable<DragVerifyActionType>>(null)
    const state = reactive({
      showTip: false,
      isPassing: false,
      imgStyle: {},
      randomRotate: 0,
      currentRotate: 0,
      toOrigin: false,
      startTime: 0,
      endTime: 0,
      draged: false,
    })
    const { prefixCls } = useDesign('basic-img-verify')

    /**
     * 获取图片外框样式
     *
     * Get the picture wrap style
     */
    const getImgWrapStyleRef = computed(() => {
      const { imgWrapStyle, imgSize } = props
      return {
        width: `${imgSize}px`,
        height: `${imgSize}px`,
        ...imgWrapStyle,
      }
    })

    /**
     * 计算角度因子
     *
     * Calculate the angle factor
     */
    const getFactorRef = computed(() => {
      const { minDegree, maxDegree } = props
      if (minDegree === maxDegree) {
        return Math.floor(1 + Math.random() * 1) / 10 + 1
      }
      return 1
    })

    /**
     * 开始拖动时间
     *
     * Start dragging time
     */
    function handleStart() {
      state.startTime = new Date().getTime()
    }

    /**
     * 拖动时处理
     *
     * Handle while dragging
     * @param data MoveData
     */
    function handleDragBarMove(data: MoveData) {
      state.draged = true
      const { imgSize, height, maxDegree } = props
      const { moveX } = data

      const currentRotate = Math.ceil((moveX / (imgSize! - height)) * maxDegree! * unref(getFactorRef))
      state.currentRotate = currentRotate
      state.imgStyle = { transform: `rotateZ(${state.randomRotate - currentRotate}deg)` }
    }

    /**
     * 加载图片后初始化随机角度
     *
     * Initialize random angle after loading image
     */
    function handleImgOnLoad() {
      const { minDegree, maxDegree } = props
      // Generate random angles
      const ranRotate = Math.floor(minDegree! + Math.random() * (maxDegree! - minDegree!))
      state.randomRotate = ranRotate
      state.imgStyle = { transform: `rotateZ(${ranRotate}deg)` }
    }

    /**
     * 处理拖动结束
     *
     * Handle drag end
     */
    function handleDragEnd() {
      const { randomRotate, currentRotate } = state
      const { diffDegree } = props

      // 拖动失败，恢复原位
      // Failed to drag, return to original position
      if (Math.abs(randomRotate - currentRotate) >= (diffDegree || 20)) {
        state.imgStyle = { transform: `rotateZ(${randomRotate}deg)` }
        state.toOrigin = true
        useTimeoutFn(() => {
          state.toOrigin = false
          state.showTip = true
          // 时间最好与CSS动画时间保持一致
          //  The time is the same as the animation time
        }, 300)
      } else {
        checkPass()
      }
      state.showTip = true
    }
    /**
     * 拖动成功
     *
     * Drag success
     */
    function checkPass() {
      state.isPassing = true
      state.endTime = new Date().getTime()
    }

    /**
     * 重置拖动状态
     *
     * Reset drag state
     */
    function resume() {
      state.showTip = false
      const basicEl = unref(basicRef)
      if (!basicEl) return

      state.isPassing = false

      basicEl.resume()
      handleImgOnLoad()
    }

    expose({ resume })

    watch(
      () => state.isPassing,
      (isPassing) => {
        if (isPassing) {
          const { startTime, endTime } = state
          const time = (endTime - startTime) / 1000
          emit('success', { isPassing, time: time.toFixed(1) })
          emit('change', isPassing)
          emit('update:modelValue', isPassing)
        }
      },
    )

    return () => {
      const { src, width } = props
      const { toOrigin, isPassing, startTime, endTime } = state
      const imgCls: string[] = []
      if (toOrigin) {
        imgCls.push('to-origin')
      }
      const time = (endTime - startTime) / 1000

      return (
        <div class={`${prefixCls}`}>
          <div class={`${prefixCls}-img__wrap`} style={unref(getImgWrapStyleRef)}>
            <img
              src={src}
              onLoad={handleImgOnLoad}
              width={width}
              class={imgCls}
              style={state.imgStyle}
              onClick={() => {
                resume()
              }}
              alt='verify'
            />
            {state.showTip && (
              <span class={[`${prefixCls}-img__tip`, state.isPassing ? 'success' : 'error']}>{state.isPassing ? `验证校验成功,耗时${time.toFixed(1)}秒！` : '验证失败！'}</span>
            )}
            {!state.showTip && !state.draged && <span class={[`${prefixCls}-img__tip`, 'normal']}>{'点击图片可刷新'}</span>}
          </div>
          <BasicDragVerify
            class={`${prefixCls}-drag__bar`}
            onMove={handleDragBarMove}
            onEnd={handleDragEnd}
            onStart={handleStart}
            ref={basicRef}
            {...{ ...attrs, ...props }}
            modelValue={isPassing}
            isSlot={true}
          />
        </div>
      )
    }
  },
})
</script>

<style lang="scss">
$prefix-cls: '#{$tonyname}-basic-img-verify';

.#{$prefix-cls} {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;

  &-img__wrap {
    position: relative;
    overflow: hidden;
    border-radius: 50%;

    img {
      width: 100%;
      border-radius: 50%;

      &.to-origin {
        transition: transform 0.3s;
      }
    }
  }

  &-img__tip {
    position: absolute;
    bottom: 10px;
    left: 0;
    z-index: 1;
    display: block;
    width: 100%;
    height: 30px;
    font-size: 12px;
    line-height: 30px;
    color: #fff;
    text-align: center;
    user-select: none;

    &.success {
      background-color: var(--success-color);
    }

    &.error {
      background-color: var(--error-color);
    }

    &.normal {
      background-color: rgba(0, 0, 0, 0.3);
    }
  }

  &-drag__bar {
    margin-top: 20px;
    user-select: none;
  }
}
</style>
