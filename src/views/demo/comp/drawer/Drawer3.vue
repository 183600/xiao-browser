<template>
  <BasicDrawer
    v-bind="$attrs"
    title="Modal Title"
    width="50%"
    ref="basicDrawer"
    showFooter
    @register="register"
    @confirm="handleConfirm">
    <template #toolbar>
      <el-button>btn</el-button>
      <el-button>btn2</el-button>
    </template>
    <p class="p-20" v-for="index in 10" :key="index">根据屏幕高度自适应</p>
    <template #prependFooter>
      <el-button>left info</el-button>
    </template>
    <template #centerFooter>
      <el-button>center info</el-button>
    </template>
    <template #appendFooter>
      <el-button>right info</el-button>
    </template>
  </BasicDrawer>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { ElButton } from 'element-plus'
import { BasicDrawer, useDrawerInner } from '@/components/BasicDrawer'
import { useMessage } from '@/hooks/web/useMessage'

export default defineComponent({
  components: { ElButton, BasicDrawer },
  setup() {
    const { createMessage } = useMessage()
    const [register, { changeConfirmLoading }] = useDrawerInner()

    function handleConfirm() {
      changeConfirmLoading(true)
      setTimeout(() => {
        changeConfirmLoading(false)
        createMessage.success('点击了提交')
      }, 3e3)
    }

    return { register, handleConfirm }
  },
})
</script>
