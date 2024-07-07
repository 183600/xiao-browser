<template>
  <div :class="prefixCls">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useDesign } from '@/hooks/web/useDesign'

export default defineComponent({
  name: 'List',
  components: {},
  setup() {
    const { prefixCls } = useDesign('basic-list')

    return {
      prefixCls,
    }
  },
})
</script>

<style lang="scss" src="./index.scss"></style>
