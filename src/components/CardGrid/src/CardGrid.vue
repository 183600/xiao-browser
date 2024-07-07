<template>
  <ElCard shadow="never" :class="[prefixCls, { 'is-center': center }]">
    <template #header>
      <div>{{ title || '' }}</div>
      <slot name="extra"></slot>
    </template>
    <slot></slot>
  </ElCard>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { ElCard } from 'element-plus'

import { useDesign } from '@/hooks/web/useDesign'

export default defineComponent({
  name: 'CardGrid',
  components: {
    ElCard,
  },
  props: {
    /**
     * 标题
     *
     * Title
     */
    title: String,
    /**
     * 内容项是否居中
     *
     * Whether the content item is centered
     */
    center: Boolean,
  },
  setup() {
    const { prefixCls } = useDesign('card-grid')

    return {
      prefixCls,
    }
  },
})
</script>

<style lang="scss">
$prefix-cls: '#{$tonyname}-card-grid';

.#{$prefix-cls} {
  overflow: visible;
  background: var(--background-primary-color);

  .el-card__header {
    display: flex;
    justify-content: space-between;
    padding: 16px 24px;
    color: var(--text-primary-color);
  }

  .el-card__body {
    padding: 0;
    margin: -1px 0 0 -1px;
    clear: both;

    &::after {
      display: block;
      height: 0;
      clear: both;
      font-size: 0;
      visibility: hidden;
      content: '.';
    }
  }

  &__item {
    float: left;
    width: 33.3333%;
    padding: 24px;
    cursor: pointer;
    border: 0;
    border-radius: 0;
    box-shadow: 1px 0 var(--border-color-light), 0 1px var(--border-color-light), 1px 1px var(--border-color-light), 1px 0 var(--border-color-light) inset,
      0 1px var(--border-color-light) inset;
    transition: all 0.3s;

    &:hover {
      box-shadow: 0 1px 2px -2px rgba(0, 0, 0, 0.12), 0 4px 8px rgba(0, 0, 0, 0.09), 0 6px 18px 4px rgba(0, 0, 0, 0.06);
    }
  }

  &.is-center {
    .#{$prefix-cls}__item {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }
  }
}
</style>
