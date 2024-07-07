<template>
  <div :class="getClass" :style="getDragBarStyle"></div>
</template>
<script lang="ts">
import { defineComponent, computed, unref } from 'vue'

import { useDesign } from '@/hooks/web/useDesign'
import { useMenuSetting } from '@/hooks/setting/useMenuSetting'

export default defineComponent({
  name: 'DragBar',
  props: {
    mobile: Boolean,
  },
  setup(props) {
    const { getMiniWidthNumber, getCollapsed, getCanDrag } = useMenuSetting()

    const { prefixCls } = useDesign('drag-bar')
    const getDragBarStyle = computed(() => {
      if (unref(getCollapsed)) {
        return { left: `${unref(getMiniWidthNumber) - 8}px`, right: 'auto' }
      }
      return {}
    })

    const getClass = computed(() => {
      return [
        prefixCls,
        {
          [`${prefixCls}--hide`]: !unref(getCanDrag) || props.mobile,
        },
      ]
    })

    return {
      prefixCls,
      getDragBarStyle,
      getClass,
    }
  },
})
</script>
<style lang="scss" scoped>
$prefix-cls: '#{$tonyname}-drag-bar';

.#{$prefix-cls} {
  position: absolute;
  top: 0;
  right: 0;
  z-index: 200;
  width: 4px;
  height: 100%;
  cursor: col-resize;
  border-top: none;
  border-bottom: none;

  &--hide {
    display: none;
  }

  &:hover {
    background-color: var(--primary-color);
    box-shadow: 0 0 4px 0 rgba(28, 36, 56, 0.15);
  }
}
</style>
