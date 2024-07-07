<template>
  <el-card header="懒加载组件" shadow="hover">
    <img src="https://cn.bing.com/th?id=0&rf=LaDigue_1920x1080.jpg" />
  </el-card>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { ElCard } from 'element-plus'

export default defineComponent({
  components: { ElCard },
  setup() {
    return {}
  },
})
</script>
