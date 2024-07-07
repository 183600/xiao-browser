<template>
  <el-card shadow="always">
    <template #header><div class="el-card__header--title">活动进度</div></template>
    <el-timeline>
      <el-timeline-item
        v-for="(activity, index) in activities"
        :key="index"
        :type="activity.type"
        :color="activity.color"
        :size="activity.size"
        :hollow="activity.hollow"
        :timestamp="activity.timestamp">
        <h4 class="timeline-title">{{ activity.content }}</h4>
        <p class="timeline-desc">{{ activity.desc }}</p>
      </el-timeline-item>
    </el-timeline>
  </el-card>
</template>

<script lang="ts" setup>
import { ElCard, ElTimeline, ElTimelineItem } from 'element-plus'

const activities = [
  {
    content: 'Custom icon',
    desc: 'Custom icon',
    timestamp: '2018-04-12 20:46',
    size: 'large',
    type: 'primary',
  },
  {
    content: 'Custom color',
    desc: 'Custom icon',
    timestamp: '2018-04-03 20:46',
    color: '#0bbd87',
  },
  {
    content: 'Custom size',
    desc: 'Custom icon',
    timestamp: '2018-04-03 20:46',
    size: 'large',
  },
  {
    content: 'Custom hollow',
    desc: 'Custom icon',
    timestamp: '2018-04-03 20:46',
    type: 'primary',
    hollow: true,
  },
  {
    content: 'Default node',
    desc: 'Custom icon',
    timestamp: '2018-04-03 20:46',
  },
]
</script>

<style lang="scss" scoped>
.timeline {
  &-title {
    margin-bottom: 6px;
    font-size: 20px;
    line-height: 1;
    color: var(--text-primary-color);
  }

  &-desc {
    font-size: 14px;
    color: var(--text-secondary-color);
  }
}
</style>
