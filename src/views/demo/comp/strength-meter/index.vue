<template>
  <PageWrapper title="密码强度校验组件" content-background>
    <ElAlert title="默认，带输入框" class="mt-10 mb-4" />
    <StrengthMeter />

    <hr class="my-10" />

    <ElAlert class="mt-10 mb-4" title="隐藏输入框，只有强度提示条" />
    <StrengthMeter placeholder="" :show-input="false" modelValue="!@#qwe12345" />
  </PageWrapper>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { ElAlert } from 'element-plus'

import { StrengthMeter } from '@/components/StrengthMeter'

export default defineComponent({
  components: {
    ElAlert,
    StrengthMeter,
  },
})
</script>
