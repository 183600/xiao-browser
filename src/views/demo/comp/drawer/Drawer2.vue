<template>
  <BasicDrawer
    v-bind="$attrs"
    @register="register"
    title="Drawer Title"
    width="50%">
    Drawer Info.
    <el-button type="primary" @click="closeDrawer">内部关闭drawer</el-button>
  </BasicDrawer>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { ElButton } from 'element-plus'
import { BasicDrawer, useDrawerInner } from '@/components/BasicDrawer'
export default defineComponent({
  components: { ElButton, BasicDrawer },
  setup() {
    const [register, { closeDrawer }] = useDrawerInner()
    return { register, closeDrawer }
  },
})
</script>
