<template>
  <PageWrapper title="modal组件使用示例">
    <el-alert title="使用 useModal 进行弹窗操作，加载动态数据并自动调整高度(默认可以拖动/全屏)" show-icon />
    <el-button type="primary" class="my-4" @click="openModalLoading">打开弹窗</el-button>

    <el-alert title="使用 createConfirm 进行弹窗操作，是一个简易友好的弹窗" show-icon />
    <el-button type="primary" class="my-4" @click="openMsgPopup()">打开消息弹窗</el-button>

    <el-alert title="内外同时同时显示隐藏" show-icon />
    <el-button type="primary" class="my-4" @click="openModal2()">打开弹窗</el-button>

    <el-alert title="自适应高度" show-icon />
    <el-button type="primary" class="my-4" @click="openModal3()">打开弹窗</el-button>

    <el-alert title="内外数据交互" show-icon />
    <el-button type="primary" class="my-4" @click="send">打开弹窗并传递数据</el-button>

    <Modal1 @register="register1" />
    <Modal2 @register="register2" />
    <Modal3 @register="register3" />
    <Modal4 @register="register4" />
  </PageWrapper>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { ElAlert, ElButton } from 'element-plus'
import { useModal } from '@/components/BasicModal'
import Modal1 from './Modal1.vue'
import Modal2 from './Modal2.vue'
import Modal3 from './Modal3.vue'
import Modal4 from './Modal4.vue'
import { useMessage } from '@/hooks/web/useMessage'

export default defineComponent({
  components: { ElAlert, ElButton, Modal1, Modal2, Modal3, Modal4 },
  setup() {
    const [register1, { openModal: openModal1, setModalProps }] = useModal()
    const [register2, { openModal: openModal2 }] = useModal()
    const [register3, { openModal: openModal3 }] = useModal()
    const [register4, { openModal: openModal4 }] = useModal()
    const { createMessage, createConfirm } = useMessage()
    function send() {
      openModal4(true, {
        data: 'content',
        info: 'Info',
      })
    }

    function openModalLoading() {
      openModal1(true)
      setModalProps({
        confirmOptions: { btnText: 'New Btn' },
      })
    }

    function openMsgPopup() {
      createConfirm({ title: '是否删除？', message: '注意：删除后将无法找回内容！', type: 'warning' })
        .then((act) => {
          createMessage.success(`点击了 ${act}`)
        })
        .catch((act) => {
          createMessage.info(`点击了 ${act}`)
        })
    }

    return {
      openMsgPopup,
      register1,
      register2,
      openModal2,
      register3,
      openModal3,
      register4,
      send,
      openModalLoading,
    }
  },
})
</script>
