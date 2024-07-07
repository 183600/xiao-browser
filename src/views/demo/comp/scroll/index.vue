<template>
  <PageWrapper title="滚动组件示例">
    <div class="scroll-wrap">
      <ScrollContainer class="mt-4">
        <ul class="p-3">
          <li v-for="(k, i) in litdata" :key="i">
            {{ k }}
          </li>
        </ul>
      </ScrollContainer>
    </div>
  </PageWrapper>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { ScrollContainer } from '@/components/ScrollContainer'
import { litdata } from './data'

export default defineComponent({
  components: { ScrollContainer },
  setup() {
    return { litdata }
  },
})
</script>

<style lang="scss" scoped>
.scroll-wrap {
  width: 75%;
  height: 300px;
  background-color: var(--background-primary-color);

  li {
    height: 40px;
    padding: 0 20px;
    line-height: 40px;
    border-bottom: 1px solid var(--border-color-light);
  }
}
</style>
