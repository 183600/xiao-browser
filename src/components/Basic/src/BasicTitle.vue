<template>
  <span :class="getClass">
    <slot></slot>
    <BasicHelp :class="`${prefixCls}-help`" v-if="helpMessage" :text="helpMessage" />
  </span>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'

import { useDesign } from '@/hooks/web/useDesign'

import BasicHelp from './BasicHelp.vue'

export default defineComponent({
  name: 'BasicTitle',
  components: { BasicHelp },
  props: {
    /**
     * 标题字体是否加粗
     *
     * Whether the title font is bold
     */
    bold: Boolean,
    /**
     * 标题字体左侧是否添加色块
     *
     * Whether to add a color block to the left of the title font
     */
    span: Boolean,
    /**
     * 帮助文本
     *
     * Help text
     */
    helpMessage: {
      type: [String, Array] as PropType<string | string[]>,
      default: '',
    },
  },
  setup(props, { slots }) {
    const { prefixCls } = useDesign('basic-title')

    const getClass = computed(() => [prefixCls, { [`${prefixCls}--span`]: props.span && slots.default }, { [`${prefixCls}--bold`]: props.bold }])

    return { prefixCls, getClass }
  },
})
</script>

<style lang="scss">
$prefix-cls: '#{$tonyname}-basic-title';

.#{$prefix-cls} {
  position: relative;
  display: flex;
  align-items: center;
  padding-left: 7px;
  font-size: 1rem;
  font-weight: normal;
  line-height: 1.5rem;
  color: var(--text-main-color);
  cursor: pointer;
  user-select: none;

  &--bold {
    font-weight: bold;
  }

  &--span::before {
    position: absolute;
    top: 10%;
    left: 0;
    width: 3px;
    height: 80%;
    margin-right: 4px;
    content: '';
    background-color: var(--primary-color);
  }

  &-help {
    margin-left: 0.75rem;
  }
}
</style>
