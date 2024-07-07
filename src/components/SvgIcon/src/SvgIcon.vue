<template>
  <span :class="[`${prefixCls}`, spin && `${prefixCls}-spin`]" :style="getStyle">
    <svg aria-hidden="true" :style="getSvgStyle">
      <use :xlink:href="symbolId" :fill="color" />
    </svg>
  </span>
</template>

<script lang="ts">
import type { CSSProperties } from 'vue'
import { defineComponent, computed } from 'vue'
import { useDesign } from '@/hooks/web/useDesign'

export default defineComponent({
  name: 'SvgIcon',
  props: {
    /**
     * 图标名称，来源于 src/assets/icons 下的svg文件名
     *
     * Icon name, derived from the svg file name under src/assets/icons
     */
    name: {
      type: String,
      required: true,
    },
    /**
     * 图标大小
     *
     * Icon size
     */
    size: {
      type: [Number, String],
      default: 0,
    },
    /**
     * 是否旋转
     *
     * Whether the icon is turned on rotation
     */
    spin: {
      type: Boolean,
      default: false,
    },
    /**
     * 图标颜色
     *
     * Icon color
     */
    color: {
      type: String,
      default: 'inherit',
    },
    /**
     * 图标旋转角度(deg)
     *
     * Icon rotate (deg)
     */
    rotate: {
      type: Number,
      default: 0,
    },
    /**
     * SymbolId 命名前缀，如无特殊使用，可不予理会
     *
     * SymbolId naming prefix, if there is no special use, it can be ignored
     */
    prefix: {
      type: String,
      default: 'icon',
    },
  },
  setup(props) {
    const { prefixCls } = useDesign('svg-icon')
    // svg symbolId
    const symbolId = computed(() => `#${props.prefix}-${props.name}`)

    /**
     * 获取图标外框样式
     *
     * Get svg wrap style
     */
    const getStyle = computed((): CSSProperties => {
      const { size } = props
      const s = parseInt(size, 10)
      return {
        fontSize: s ? `${s}px` : 'inherit',
      }
    })

    /**
     * 获取图标样式
     *
     * Get svg style
     */
    const getSvgStyle = computed((): CSSProperties => {
      const { rotate = '' } = props
      if (!rotate) return {}

      return {
        transform: `rotate(${rotate}deg)`,
      }
    })

    return { symbolId, prefixCls, getStyle, getSvgStyle }
  },
})
</script>

<style lang="scss">
$prefix-cls: '#{$tonyname}-svg-icon';

.#{$prefix-cls} {
  display: inline-flex;
  align-self: center;
  justify-self: center;
  overflow: hidden;

  svg {
    display: block;
    width: 1em;
    height: 1em;
    overflow: hidden;
    font-size: 1em;
    line-height: 1em;
    /* stylelint-disable-next-line value-keyword-case */
    fill: currentColor;
    transition: transform 0.25s linear;
  }

  &-spin {
    svg {
      animation: svgLoadingCircle 1s infinite linear;
    }
  }
}

@keyframes svgLoadingCircle {
  100% {
    transform: rotate(360deg);
  }
}
</style>
