<template>
  <PageWrapper title="旋转校验示例">
    <div class="ty-demo">
      <RotateDragVerify :src="img" ref="el" @success="handleSuccess" />
    </div>
  </PageWrapper>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { RotateDragVerify } from '@/components/DragVerify'

import img from '@/assets/images/header.jpg'

export default defineComponent({
  components: { RotateDragVerify },
  setup() {
    const handleSuccess = () => {
      // do something
    }
    return {
      handleSuccess,
      img,
    }
  },
})
</script>

<style lang="scss" scoped>
.ty-demo {
  display: flex;
  justify-content: center;
  padding: 48px 0;
  background-color: #4a5568;
}
</style>
