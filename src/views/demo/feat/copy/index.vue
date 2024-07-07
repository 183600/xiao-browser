<template>
  <PageWrapper title="文本复制示例">
    <CollapseContainer class="w-full h-32 bg-white rounded-md" title="Copy Example">
      <div class="flex justify-center">
        <el-input placeholder="请输入" v-model="value" />
        <el-button type="primary" @click="handleCopy">Copy</el-button>
      </div>
    </CollapseContainer>
  </PageWrapper>
</template>

<script lang="ts">
import { defineComponent, unref, ref } from 'vue'
import { ElButton, ElInput } from 'element-plus'
import { CollapseContainer } from '@/components/CollapseContainer'
import { useCopyToClipboard } from '@/hooks/web/useCopyToClipboard'
import { useMessage } from '@/hooks/web/useMessage'

export default defineComponent({
  name: 'Copy',
  components: { ElButton, ElInput, CollapseContainer },
  setup() {
    const valueRef = ref('')
    const { createMessage } = useMessage()
    const { clipboardRef, copiedRef } = useCopyToClipboard()

    function handleCopy() {
      const value = unref(valueRef)
      if (!value) {
        createMessage.warning('请输入要拷贝的内容！')
        return
      }
      clipboardRef.value = value
      if (unref(copiedRef)) {
        createMessage.warning('copy success！')
      }
    }
    return { handleCopy, value: valueRef }
  },
})
</script>
