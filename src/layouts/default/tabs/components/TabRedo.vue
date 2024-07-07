<template>
  <span @click="handleRedo" title="重新加载">
    <SvgIcon name="reload" />
  </span>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

import { useTabs } from '@/hooks/web/useTabs'
import { SvgIcon } from '@/components/SvgIcon'

export default defineComponent({
  name: 'TabRedo',
  components: { SvgIcon },

  setup() {
    const loading = ref(false)

    const { refreshPage } = useTabs()

    async function handleRedo() {
      loading.value = true
      await refreshPage()
      setTimeout(() => {
        loading.value = false
      }, 1200)
    }
    return { handleRedo, loading }
  },
})
</script>
