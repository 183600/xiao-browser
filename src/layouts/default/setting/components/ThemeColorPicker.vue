<template>
  <div :class="prefixCls">
    <template v-for="color in colorList || []" :key="color">
      <span @click="handleClick(color)" :class="getItemCls(color)" :style="{ background: color }">
        <SvgIcon name="check" />
      </span>
    </template>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { SvgIcon } from '@/components/SvgIcon'

import { useDesign } from '@/hooks/web/useDesign'

import { baseHandler } from '../handler'
import { HandlerEnum } from '../enum'

export default defineComponent({
  name: 'ThemeColorPicker',
  components: { SvgIcon },
  props: {
    colorList: {
      type: Array as PropType<string[]>,
      defualt: [],
    },
    event: {
      type: Number as PropType<HandlerEnum>,
    },
    def: {
      type: String,
    },
  },
  setup(props) {
    const { prefixCls } = useDesign('setting-theme-picker')

    function handleClick(color: string) {
      props.event && baseHandler(props.event, color)
    }

    const getItemCls = (color: string) => {
      return [
        `${prefixCls}__item`,
        {
          [`${prefixCls}__item--active`]: props.def === color,
        },
      ]
    }
    return {
      prefixCls,
      getItemCls,
      handleClick,
    }
  },
})
</script>

<style lang="scss">
$prefix-cls: '#{$tonyname}-setting-theme-picker';

.#{$prefix-cls} {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  margin: 16px 0;

  &__item {
    width: 20px;
    height: 20px;
    cursor: pointer;
    border: 1px solid #ddd;
    border-radius: 2px;

    svg {
      display: none;
    }

    &--active {
      display: flex;
      align-items: center;
      justify-content: center;
      border: 1px solid var(--primary-color);

      svg {
        display: inline-block;
        margin: 0 0 3px 3px;
        font-size: 12px;
        color: var(--white-color);
      }
    }
  }
}
</style>
