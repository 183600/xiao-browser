<template>
  <PageWrapper title="消息示例">
    <CollapseContainer class="w-full h-32 bg-white rounded-md" title="Message">
      <el-button @click="infoMsg('Info message')" class="mr-2">Info</el-button>
      <el-button @click="successMsg('Success message')" class="mr-2" type="success">Success</el-button>
      <el-button @click="warningMsg('Warning message')" class="mr-2" type="warning">Warning</el-button>
      <el-button @click="errorMsg('Error message')" class="mr-2" type="danger">Error</el-button>
      <el-button @click="handleLoading" class="mr-2" type="primary">Loading</el-button>
    </CollapseContainer>

    <CollapseContainer class="w-full h-32 mt-5 bg-white rounded-md" title="Comfirm">
      <el-button @click="handleConfirm('info')" class="mr-2">Info</el-button>
      <el-button @click="handleConfirm('warning')" type="warning" class="mr-2">Warning</el-button>
      <el-button @click="handleConfirm('success')" type="success" class="mr-2">Success</el-button>
      <el-button @click="handleConfirm('error')" type="danger" class="mr-2">Error</el-button>
    </CollapseContainer>

    <CollapseContainer class="w-full h-32 mt-5 bg-white rounded-md" title="Modal">
      <el-button @click="handleInfoModal" class="mr-2">Info</el-button>
      <el-button @click="handleSuccessModal" type="success" class="mr-2">Success</el-button>
      <el-button @click="handleErrorModal" type="danger" class="mr-2">Error</el-button>
      <el-button @click="handleWarningModal" type="warning" class="mr-2">Warning</el-button>
    </CollapseContainer>

    <CollapseContainer class="w-full h-32 mt-5 bg-white rounded-md" title="Notification 用法与上面一致">
      <el-button @click="handleNotify('info')" class="mr-2">Info</el-button>
      <el-button @click="handleNotify('success')" type="success" class="mr-2">Success</el-button>
      <el-button @click="handleNotify('error')" type="danger" class="mr-2">Error</el-button>
      <el-button @click="handleNotify('warning')" type="warning" class="mr-2">Warning</el-button>
    </CollapseContainer>
  </PageWrapper>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { ElButton } from 'element-plus'
import { CollapseContainer } from '@/components/CollapseContainer'
import { useMessage } from '@/hooks/web/useMessage'

export default defineComponent({
  components: { ElButton, CollapseContainer },
  setup() {
    const { createMessage, createConfirm, createSuccessModal, createInfoModal, createErrorModal, createWarningModal, createNotification } = useMessage()
    const { info, success, warning, error } = createMessage

    function handleLoading() {
      const t = createMessage.loading('Loading...')

      // Manually close loading
      setTimeout(() => {
        t.close()
      }, 3000)
    }

    function handleConfirm(type: 'warning' | 'error' | 'success' | 'info') {
      createConfirm({
        title: 'Tip',
        message: 'content message...',
        type,
      })
    }
    function handleSuccessModal() {
      createSuccessModal({ title: 'Tip', message: 'content message...' })
    }
    function handleErrorModal() {
      createErrorModal({ title: 'Tip', message: 'content message...' })
    }
    function handleWarningModal() {
      createWarningModal({ title: 'Tip', message: 'content message...' })
    }
    function handleInfoModal() {
      createInfoModal({ title: 'Tip', message: 'content message...' })
    }
    function handleNotify(type: 'warning' | 'error' | 'success' | 'info') {
      createNotification({
        title: 'Tip',
        message: 'content message...',
        type,
      })
    }
    return {
      infoMsg: info,
      successMsg: success,
      warningMsg: warning,
      errorMsg: error,
      handleLoading,
      handleConfirm,
      handleSuccessModal,
      handleErrorModal,
      handleWarningModal,
      handleInfoModal,
      handleNotify,
    }
  },
})
</script>
