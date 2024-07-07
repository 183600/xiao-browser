<template>
  <div :class="prefixCls">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import { useDesign } from '@/hooks/web/useDesign'

export default defineComponent({
  name: 'CardGridItem',
  setup() {
    const { prefixCls } = useDesign('card-grid__item')

    return {
      prefixCls,
    }
  },
})
</script>
