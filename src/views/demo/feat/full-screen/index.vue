<template>
  <PageWrapper title="全屏示例">
    <CollapseContainer class="w-full h-32 bg-white rounded-md" title="Window Full Screen">
      <el-button type="primary" @click="enter" class="mr-2">Enter Window Full Screen</el-button>
      <el-button type="success" @click="toggle" class="mr-2">Toggle Window Full Screen</el-button>

      <el-button type="danger" @click="exit" class="mr-2">Exit Window Full Screen</el-button>

      Current State: {{ isFullscreen }}
    </CollapseContainer>

    <CollapseContainer class="w-full mt-5 bg-white rounded-md" title="Dom Full Screen">
      <el-button type="primary" @click="toggleDom" class="mr-2">Enter Dom Full Screen</el-button>
    </CollapseContainer>

    <div ref="domRef" class="flex items-center justify-center w-1/2 h-64 mx-auto mt-10 bg-white rounded-md">
      <el-button type="primary" @click="toggleDom" class="mr-2">Exit Dom Full Screen</el-button>
    </div>
  </PageWrapper>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { ElButton } from 'element-plus'
import { CollapseContainer } from '@/components/CollapseContainer'
import { useFullscreen } from '@vueuse/core'

export default defineComponent({
  components: { ElButton, CollapseContainer },
  setup() {
    const domRef = ref(null)
    const { enter, toggle, exit, isFullscreen } = useFullscreen()

    const { toggle: toggleDom } = useFullscreen(domRef)
    return {
      enter,
      toggleDom,
      toggle,
      isFullscreen,
      exit,
      domRef,
    }
  },
})
</script>
