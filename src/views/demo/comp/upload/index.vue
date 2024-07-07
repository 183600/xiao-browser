<template>
  <PageWrapper title="上传组件示例">
    <BasicUpload
      @change="handleChange"
      :api="uploadApi"
      showThumb
      :modelValue="uploadList"
      uploadName="file"
      :maxSize="5"
      :maxNumber="3"
      @delete="handleDelete"
      :accept="['png', 'jpg', 'jpeg', 'webp', 'svg']" />

    <el-alert type="error" class="my-4" title="如果需要演示上传功能,需要在test/server中运行test服务器" />

    <BasicUpload
      @change="handleChange"
      :api="uploadApi"
      :modelValue="uploadList"
      uploadName="file"
      :maxSize="5"
      :maxNumber="3"
      @delete="handleDelete"
      :accept="['png', 'jpg', 'jpeg', 'webp', 'svg']" />
  </PageWrapper>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { ElAlert } from 'element-plus'

import { BasicUpload } from '@/components/BasicUpload'
import { useMessage } from '@/hooks/web/useMessage'
import { uploadApi } from '@/api/sys/upload'

export default defineComponent({
  components: { ElAlert, BasicUpload },
  setup() {
    const { createMessage } = useMessage()
    const uploadList = ref<string[]>()

    function handleDelete(record: Recordable) {
      createMessage.info(`移除文件`)
      console.info(record)
    }
    function handleChange(list: Recordable) {
      createMessage.info(`已上传文件`)
      console.info(list)
    }

    return {
      uploadList,
      handleChange,
      handleDelete,
      uploadApi,
    }
  },
})
</script>
