<template>
  <PageWrapper title="分步表单" contentBackground description=" 将一个冗长或用户不熟悉的表单任务分成多个步骤，指导用户完成。">
    <div class="step-form-form">
      <el-steps :active="current">
        <el-step title="填写转账信息" />
        <el-step title="确认转账信息" />
        <el-step title="完成" />
      </el-steps>
    </div>
    <div class="mt-5">
      <Step1 @next="handleStep1Next" v-show="current === 0" />
      <Step2
        @prev="handleStepPrev"
        @next="handleStep2Next"
        v-show="current === 1"
        v-if="initSetp2" />
      <Step3 v-show="current === 3" @redo="handleRedo" v-if="initSetp3" />
    </div>
  </PageWrapper>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, toRefs } from 'vue'
import { ElSteps, ElStep } from 'element-plus'
import Step1 from './Step1.vue'
import Step2 from './Step2.vue'
import Step3 from './Step3.vue'

export default defineComponent({
  name: 'FormStepPage',
  components: {
    ElSteps,
    ElStep,
    Step1,
    Step2,
    Step3,
  },
  setup() {
    const current = ref(0)

    const state = reactive({
      initSetp2: false,
      initSetp3: false,
    })

    function handleStep1Next() {
      current.value++
      state.initSetp2 = true
    }

    function handleStepPrev() {
      current.value--
    }

    function handleStep2Next() {
      current.value = 3
      state.initSetp3 = true
    }

    function handleRedo() {
      current.value = 0
      state.initSetp2 = false
      state.initSetp3 = false
    }

    return {
      current,
      handleStep1Next,
      handleStep2Next,
      handleRedo,
      handleStepPrev,
      ...toRefs(state),
    }
  },
})
</script>
<style lang="scss" scoped>
.step-form-content {
  padding: 24px;
  background-color: var(--background-primary-color);
}

.step-form-form {
  width: 750px;
  margin: 0 auto;
}
</style>
