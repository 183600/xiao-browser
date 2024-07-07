<template>
  <el-button @click="openDrawerLoading" class="my-4" type="primary">打开Drawer</el-button>
  <BasicDrawer @register="register" title="Drawer Title" size="50%">
    <p>Drawer Info.</p>
    <el-button @click="closeDrawer" class="my-4">关闭 Drawer</el-button>
  </BasicDrawer>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { ElButton } from 'element-plus'

import { BasicDrawer, useDrawer } from '@/components/BasicDrawer'

export default defineComponent({
  components: { ElButton, BasicDrawer },
  setup() {
    const [register, { openDrawer, setDrawerProps, closeDrawer }] = useDrawer()

    function openDrawerLoading() {
      openDrawer()
      setDrawerProps({ loading: true })
      setTimeout(() => {
        setDrawerProps({ loading: false })
      }, 2000)
    }

    return {
      register,
      openDrawerLoading,
      closeDrawer,
    }
  },
})
</script>
