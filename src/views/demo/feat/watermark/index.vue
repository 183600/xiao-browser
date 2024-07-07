<template>
  <PageWrapper title="水印示例">
    <CollapseContainer class="w-full h-32 bg-white rounded-md" title="Global WaterMark">
      <el-button type="primary" class="mr-2" @click="setWatermark('WaterMark Info')">Create</el-button>
      <el-button type="danger" class="mr-2" @click="clear">Clear</el-button>
      <el-button type="warning" class="mr-2" @click="setWatermark('WaterMark Info New')">Reset</el-button>
    </CollapseContainer>
  </PageWrapper>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { ElButton } from 'element-plus'
import { CollapseContainer } from '@/components/CollapseContainer'
import { useWatermark } from '@/hooks/web/useWatermark'

export default defineComponent({
  components: { ElButton, CollapseContainer },
  setup() {
    const { setWatermark, clear } = useWatermark()
    return {
      setWatermark,
      clear,
    }
  },
})
</script>
