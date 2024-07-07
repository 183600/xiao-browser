<template>
  <div class="fixed h-full w-full flex flex-col justify-center items-center text-4xl">
    <div class="">位于主框架外的页面</div>
    <el-button @click="$router.go(-1)" class="mt-10" type="primary">Back</el-button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { ElButton } from 'element-plus'

export default defineComponent({
  name: 'MainOut',
  components: { ElButton },
})
</script>
