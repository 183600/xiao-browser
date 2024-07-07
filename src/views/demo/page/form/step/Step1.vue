<template>
  <div class="step1">
    <div class="step1-form">
      <BasicForm @register="register">
        <template #fac="{ model, field }">
          <el-input v-model="model[field]" class="pay-input">
            <template #prepend>
              <el-select v-model="model['pay']" class="pay-select" style="width: 110px">
                <el-option value="zfb">支付宝</el-option>
                <el-option value="yl">银联</el-option>
              </el-select>
            </template>
          </el-input>
        </template>
      </BasicForm>
    </div>
    <el-divider />
    <h3>说明</h3>
    <p>分步表单演示</p>
    <p>支付前请确认对方账号是否正确</p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { ElInput, ElSelect, ElOption, ElDivider } from 'element-plus'
import { BasicForm, useForm } from '@/components/BasicForm'
import { step1Schemas } from './data'

export default defineComponent({
  components: {
    ElInput,
    ElSelect,
    ElOption,
    ElDivider,
    BasicForm,
  },
  emits: ['next'],
  setup(_, { emit }) {
    const [register, { validate }] = useForm({
      labelWidth: 100,
      schemas: step1Schemas,
      colProps: {
        span: 24,
      },
      actionColProps: {
        span: 14,
      },
      showResetButton: false,
      submitButtonOptions: {
        btnText: '下一步',
      },
      submitFn: customSubmitFunc,
    })

    async function customSubmitFunc() {
      try {
        const values = await validate()
        emit('next', values)
      } catch (error) {
        // continue regardless of error
      }
    }

    return { register }
  },
})
</script>
<style lang="scss" scoped>
.step1 {
  &-form {
    width: 450px;
    margin: 0 auto;
  }

  h3 {
    margin: 0 0 12px;
    font-size: 16px;
    line-height: 32px;
    color: var(--text-primary-color);
  }

  h4 {
    margin: 0 0 4px;
    font-size: 14px;
    line-height: 22px;
    color: var(--text-primary-color);
  }

  p {
    color: var(--text-primary-color);
  }
}

.pay-select {
  width: 20%;
}

.pay-input {
  width: 100%;
}
</style>
