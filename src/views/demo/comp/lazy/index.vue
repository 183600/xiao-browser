<template>
  <PageWrapper title="懒加载基础示例" description="向下滚动到可见区域才会加载组件">
    <div class="lazy-base-demo-wrap">
      <h1>向下滚动</h1>
      <div class="lazy-base-demo-box">
        <LazyContainer>
          <TargetContent />
          <template #skeleton>
            <el-skeleton :rows="10" />
          </template>
        </LazyContainer>
      </div>
    </div>
  </PageWrapper>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { ElSkeleton } from 'element-plus'
import TargetContent from './TargetContent.vue'
import { LazyContainer } from '@/components/LazyContainer'

export default defineComponent({
  components: { ElSkeleton, LazyContainer, TargetContent },
})
</script>

<style lang="scss" scoped>
.lazy-base-demo {
  &-wrap {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 70%;
    height: 2000px;
    margin: 20px auto;
    text-align: center;
    background-color: var(--background-primary-color);

    h1 {
      height: 1300px;
      margin: 20px 0;
    }
  }

  &-box {
    width: 70%;
  }
}
</style>
