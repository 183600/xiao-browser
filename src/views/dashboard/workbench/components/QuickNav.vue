<template>
  <CardGrid center title="快捷导航">
    <CardGridItem vertical v-for="(item, index) in navItems" :key="index">
      <Icon :name="item.icon" :color="item.color" size="20" />
      <span class="text-md mt-2">{{ item.title }}</span>
    </CardGridItem>
  </CardGrid>
</template>

<script lang="ts" setup>
import { CardGrid, CardGridItem } from '@/components/CardGrid'
import { navItems } from './data'
import { Icon } from '@/components/Icon'
</script>
