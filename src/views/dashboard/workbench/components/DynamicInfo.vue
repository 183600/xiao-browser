<template>
  <el-card shadow="always">
    <template #header>
      <div class="dync-card-header">
        <div class="el-card__header--title">最新动态</div>
        <el-button text>更多</el-button>
      </div>
    </template>
    <List>
      <template v-for="item in dynamicInfoItems" :key="item.title">
        <ListItem>
          <template #title>
            <div class="dync-title">{{ item.name }}</div>
            <div class="dync-desc">
              <!-- eslint-disable-next-line vue/no-v-html -->
              <p v-html="item.desc"></p>
            </div>
          </template>
          <template #thumb>
            <img :src="item.avatar" :alt="item.name" width="32" />
          </template>
          <template #description>
            {{ item.date }}
          </template>
        </ListItem>
      </template>
    </List>
  </el-card>
</template>

<script lang="ts" setup>
import { ElCard, ElButton } from 'element-plus'
import { dynamicInfoItems } from './data'
import { List, ListItem } from '@/components/List'
</script>

<style scoped>
.dync-card-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.dync-title {
  margin-bottom: 6px;
  font-size: 20px;
  color: var(--text-primary-color);
}

.dync-desc {
  margin-bottom: 12px;
  font-size: 14px;
  color: var(--text-secondary-color);
}
</style>
