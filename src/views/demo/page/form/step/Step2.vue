<template>
  <div class="step2">
    <el-alert type="error" title="确认转账后，资金将直接打入对方账户，无法退回。" show-icon />
    <div class="step2-msg">
      <el-descriptions :column="1">
        <el-descriptions-item label="付款账户">test@alipay.com</el-descriptions-item>
        <el-descriptions-item label="收款账户">test@example.com</el-descriptions-item>
        <el-descriptions-item label="收款人姓名">Tony</el-descriptions-item>
        <el-descriptions-item label="转账金额">500元</el-descriptions-item>
      </el-descriptions>
    </div>
    <el-divider />
    <BasicForm @register="register" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { ElAlert, ElDescriptions, ElDescriptionsItem, ElDivider } from 'element-plus'
import { BasicForm, useForm } from '@/components/BasicForm'
import { step2Schemas } from './data'

export default defineComponent({
  components: {
    ElAlert,
    ElDescriptions,
    ElDescriptionsItem,
    ElDivider,
    BasicForm,
  },
  emits: ['next', 'prev'],
  setup(_, { emit }) {
    const [register, { validate, setFormProps }] = useForm({
      labelWidth: 80,
      schemas: step2Schemas,
      colProps: {
        span: 24,
      },
      actionColProps: {
        span: 14,
      },
      resetButtonOptions: {
        btnText: '上一步',
      },
      submitButtonOptions: {
        btnText: '提交',
      },
      resetFn: customResetFunc,
      submitFn: customSubmitFunc,
    })

    async function customResetFunc() {
      emit('prev')
    }

    async function customSubmitFunc() {
      try {
        const values = await validate()
        setFormProps({
          submitButtonOptions: {
            loading: true,
            btnText: '提交',
          },
        })
        setTimeout(() => {
          setFormProps({
            submitButtonOptions: {
              loading: false,
              btnText: '提交',
            },
          })
          emit('next', values)
        }, 1500)
      } catch (error) {
        // continue regardless of error
      }
    }

    return { register }
  },
})
</script>
<style lang="scss" scoped>
.step2 {
  width: 450px;
  margin: 0 auto;

  &-msg {
    padding: 24px;
    background: var(--background-main-color);
  }

  .el-descriptions {
    --el-fill-color-blank: none;
  }
}
</style>
