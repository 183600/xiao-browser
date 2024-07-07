<template>
  <div class="dashboard-analysis">
    <anaCard :loading="loading" />
    <anaSite :loading="loading" />
    <anaOrder :loading="loading" />
    <anaProduct :loading="loading" />
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import anaCard from './components/anaCard.vue'
import anaSite from './components/anaSite2.vue'
import anaOrder from './components/anaOrder.vue'
import anaProduct from './components/anaProduct.vue'
const loading = ref(true)

setTimeout(() => {
  loading.value = false
}, 1500)
</script>

<style lang="scss">
.dashboard-analysis {
  padding: var(--container-gutter-base);

  .el-card {
    --el-card-padding: 0;

    padding: 2rem;

    &__header {
      border: none;
    }
  }

  &__title {
    margin-bottom: 2rem;
    font-size: 1.25rem;
    font-weight: bold;
  }
}
</style>
