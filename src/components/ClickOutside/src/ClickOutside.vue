<template>
  <div ref="wrap">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { ref, onMounted, defineComponent } from 'vue'
import { onClickOutside } from '@vueuse/core'

export default defineComponent({
  name: 'ClickOutside',
  emits: ['mounted', 'clickOutside'],
  setup(_, { emit }) {
    const wrap = ref<ElRef>(null)

    onClickOutside(wrap, () => {
      emit('clickOutside')
    })

    onMounted(() => {
      emit('mounted')
    })

    return {
      wrap,
    }
  },
})
</script>
