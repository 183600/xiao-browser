<template>
  <BasicModal
    v-bind="$attrs"
    destroyOnClose
    draggable
    @register="register"
    title="Modal Title"
    :helpMessage="['提示1', '提示2']"
    @visible-change="handleShow">
    <template #title>Modal slot title</template>
    <template #prependFooter>
      <el-button type="danger" @click="setLines" :disabled="loading">点我更新内容</el-button>
    </template>
    <template v-if="loading">
      <div class="empty-tips">加载中，稍等3秒……</div>
    </template>
    <template v-if="!loading">
      <ul>
        <li v-for="index in lines" :key="index">加载完成{{ index }}！</li>
      </ul>
    </template>
  </BasicModal>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue'
import { ElButton } from 'element-plus'
import { BasicModal, useModalInner } from '@/components/BasicModal'
export default defineComponent({
  components: { ElButton, BasicModal },
  props: {
    modalValue: Boolean,
  },
  setup() {
    const loading = ref(false)
    const lines = ref(0)
    const [register, { setModalProps, redoModalHeight }] = useModalInner()

    watch(
      () => lines.value,
      () => {
        redoModalHeight()
      },
    )

    function handleShow(visible: boolean) {
      if (visible) {
        setModalProps({ loading: true, confirmOptions: { loading: true } })
        setTimeout(() => {
          setLines()
          setModalProps({ loading: false, confirmOptions: { loading: false } })
        }, 3000)
      }
    }

    function setLines() {
      lines.value = Math.round(Math.random() * 10 + 10)
    }
    return { register, loading, handleShow, lines, setLines }
  },
})
</script>

<style scoped>
.empty-tips {
  height: 100px;
  line-height: 100px;
  text-align: center;
}
</style>
