<template>
  <PageWrapper
    v-loading="loadingRef"
    loading-tip="加载中..."
    title="ElLoading 示例"
    description="未做组件封装，仅是根据官方 ElLoading 组件进行示例">
    <div ref="wrapEl" v-loading.lock="boxLoadingRef" element-loading-background="rgba(0, 0, 0, 0.7)">
      <el-alert title="组件方式" />
      <el-button
        class="my-4 mr-4"
        type="primary"
        v-loading.fullscreen.lock="fullscreenLoading"
        @click="openCompFullLoading">全屏 Loading</el-button>
      <el-button class="my-4" type="primary" @click="openCompAbsolute">容器内 Loading</el-button>

      <el-alert title="函数方式" />

      <el-button class="my-4 mr-4" type="primary" @click="openFnFullLoading">全屏 Loading</el-button>
      <el-button class="my-4" type="primary" @click="openFnWrapLoading">容器内 Loading</el-button>

      <el-alert title="指令方式" />
      <el-button class="my-4 mr-4" type="primary" @click="openDirectiveLoading">打开指令Loading</el-button>
    </div>
  </PageWrapper>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { ElAlert, ElButton } from 'element-plus'
import { ElLoading } from 'element-plus'

export default defineComponent({
  components: { ElAlert, ElButton },
  directives: {
    loading: ElLoading.directive,
  },
  setup() {
    const wrapEl = ref<string | HTMLElement>()

    const loadingRef = ref(false)
    const boxLoadingRef = ref(false)
    const fullscreenLoading = ref(false)

    function openCompFullLoading() {
      fullscreenLoading.value = true
      setTimeout(() => {
        fullscreenLoading.value = false
      }, 2000)
    }

    function openCompAbsolute() {
      boxLoadingRef.value = true
      setTimeout(() => {
        boxLoadingRef.value = false
      }, 2000)
    }

    function openFnFullLoading() {
      const loading = ElLoading.service({
        lock: true,
        text: 'Loading',
      })
      setTimeout(() => {
        loading.close()
      }, 2000)
    }

    function openFnWrapLoading() {
      const loading = ElLoading.service({
        target: wrapEl.value,
        lock: true,
        text: 'Loading',
        background: 'rgba(0, 0, 0, 0.7)',
      })
      setTimeout(() => {
        loading.close()
      }, 2000)
    }

    function openDirectiveLoading() {
      loadingRef.value = true
      setTimeout(() => {
        loadingRef.value = false
      }, 2000)
    }

    return {
      fullscreenLoading,
      openCompFullLoading,
      openFnFullLoading,
      openFnWrapLoading,
      openCompAbsolute,
      wrapEl,
      loadingRef,
      boxLoadingRef,
      openDirectiveLoading,
    }
  },
})
</script>
