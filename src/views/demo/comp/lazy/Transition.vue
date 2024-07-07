<template>
  <PageWrapper title="懒加载自定义动画示例" description="懒加载组件显示动画">
    <div class="lazy-base-demo-wrap">
      <h1>向下滚动</h1>
      <div class="lazy-base-demo-box">
        <LazyContainer transitionName="custom">
          <TargetContent />
        </LazyContainer>
      </div>
    </div>
  </PageWrapper>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import TargetContent from './TargetContent.vue'
import { LazyContainer } from '@/components/LazyContainer'

export default defineComponent({
  components: { LazyContainer, TargetContent },
})
</script>

<style lang="scss" scoped>
.lazy-base-demo {
  &-wrap {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 60%;
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
    width: 80%;
  }
}

.custom-enter {
  opacity: 0;
  transform: scale(0.4) translate(100%);
}

.custom-enter-to {
  opacity: 1;
}

.custom-enter-active {
  position: absolute;
  top: 0;
  width: 100%;
  transition: all 0.5s;
}

.custom-leave {
  opacity: 1;
}

.custom-leave-to {
  opacity: 0;
  transform: scale(0.4) translate(-100%);
}

.custom-leave-active {
  transition: all 0.5s;
}
</style>
