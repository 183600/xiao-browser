<template>
  <div @click="showModal = true">
    <ElTooltip effect="dark" content="搜索" placement="bottom-end">
      <span><SvgIcon name="search" /></span>
    </ElTooltip>
    <AppSearchModal @close="showModal = false" :visible="showModal" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { ElTooltip } from 'element-plus'
import { SvgIcon } from '@/components/SvgIcon'

import AppSearchModal from './AppSearchModal.vue'

export default defineComponent({
  name: 'AppSearch',
  components: { ElTooltip, AppSearchModal, SvgIcon },
  setup() {
    const showModal = ref(false)

    return {
      showModal,
    }
  },
})
</script>
