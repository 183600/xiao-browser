<template>
  <PageWrapper title="层级面包屑示例" description="子级页面面包屑会添加到当前层级后面">
    <router-link to="/feat/breadcrumb/children/childrenDetail">进入子级详情页</router-link>
  </PageWrapper>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  components: {},
})
</script>
