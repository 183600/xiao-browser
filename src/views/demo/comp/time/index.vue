<template>
  <PageWrapper title="时间组件示例">
    <CollapseContainer title="基础示例">
      <RelativeTime :value="time1" />
      <br />
      <RelativeTime :value="time2" />
    </CollapseContainer>

    <CollapseContainer title="定时更新" @expand="handleExpand" class="mt-4">
      <el-descriptions :column="1" border>
        <el-descriptions-item label="每60秒更新(默认)">
          <RelativeTime :value="now" />
        </el-descriptions-item>
        <el-descriptions-item label="格式化日期">
          <RelativeTime :value="now" mode="date" />
        </el-descriptions-item>
        <el-descriptions-item label="格式化时间">
          <RelativeTime :value="now" mode="datetime" />
        </el-descriptions-item>
        <el-descriptions-item label="每秒更新">
          <RelativeTime :value="now" :step="1" />
        </el-descriptions-item>
        <el-descriptions-item label="每5秒更新">
          <RelativeTime :value="now" :step="5" />
        </el-descriptions-item>
      </el-descriptions>
    </CollapseContainer>
  </PageWrapper>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { RelativeTime } from '@/components/RelativeTime'
import { CollapseContainer } from '@/components/CollapseContainer'
import { ElDescriptions, ElDescriptionsItem } from 'element-plus'

export default defineComponent({
  components: { ElDescriptions, ElDescriptionsItem, RelativeTime, CollapseContainer },
  setup() {
    const now = new Date().getTime()

    function handleExpand() {
      // do something
    }
    return {
      now,
      time1: now - 60 * 3 * 1000,
      time2: now - 86400 * 3 * 1000,
      handleExpand,
    }
  },
})
</script>
