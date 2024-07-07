<template>
  <PageWrapper title="带参数标签页" description="支持带参数多tab缓存">Current Param : {{ params }}</PageWrapper>
</template>

<script lang="ts">
import { computed, defineComponent, unref } from 'vue'
import { useRouter } from 'vue-router'

export default defineComponent({
  name: 'TestTab',
  components: {},
  setup() {
    const { currentRoute } = useRouter()
    return {
      params: computed(() => {
        return unref(currentRoute).params
      }),
    }
  },
})
</script>
