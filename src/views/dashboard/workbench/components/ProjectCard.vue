<template>
  <CardGrid title="项目">
    <template #extra>
      <el-button text size="small">更多</el-button>
    </template>
    <CardGridItem v-for="(item, index) in items" class="project-item" :key="index">
      <span class="project-item__title">
        <img :src="item.icon" width="32" height="32" />
        <span class="ml-4">{{ item.title }}</span>
      </span>
      <div class="project-item__desc">{{ item.desc }}</div>
      <div class="project-item__meta">
        <span>{{ item.group }}</span>
        <span>{{ item.date }}</span>
      </div>
    </CardGridItem>
  </CardGrid>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { ElButton } from 'element-plus'
import { groupItems } from './data'
import { CardGrid, CardGridItem } from '@/components/CardGrid'

export default defineComponent({
  components: { ElButton, CardGrid, CardGridItem },
  setup() {
    return { items: groupItems }
  },
})
</script>

<style lang="scss" scoped>
.project-card-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.project-item {
  &__title {
    display: flex;
    margin-bottom: 8px;
    font-size: 14px;
  }

  &__desc {
    height: 44px;
    font-weight: 300;
    line-height: 22px;
    color: var(--text-secondary-color);
  }

  &__meta {
    margin-top: 12px;
    font-size: 12px;
    color: var(--text-secondary-color);
  }
}
</style>
