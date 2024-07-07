<template>
  <PageWrapper>
    <template #extra><WorkbenchHeader /></template>
    <el-row :gutter="21">
      <el-col :lg="{ span: 16 }">
        <ProjectCard class="mb-6" />
        <DynamicInfo />
      </el-col>
      <el-col :lg="{ span: 8 }">
        <QuickNav />
        <ActivityTimeline class="my-6" />
        <TaskProportion />
      </el-col>
    </el-row>
  </PageWrapper>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { ElRow, ElCol } from 'element-plus'
import WorkbenchHeader from './components/WorkbenchHeader.vue'
import ProjectCard from './components/ProjectCard.vue'
import QuickNav from './components/QuickNav.vue'
import ActivityTimeline from './components/ActivityTimeline.vue'
import DynamicInfo from './components/DynamicInfo.vue'
import TaskProportion from './components/TaskProportion.vue'

const loading = ref(true)

setTimeout(() => {
  loading.value = false
}, 1500)
</script>
