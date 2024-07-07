<template>
  <PageWrapper title="修改当前用户密码" description="修改成功后会自动退出当前登录！">
    <CollapseContainer title="基础示例" :canExpan="false">
      <BasicForm @register="register" @submit="handleSubmit" @reset="resetFields">
        <template #newpassword="{ model, field }">
          <StrengthMeter v-model:modelValue="model[field]" />
        </template>
      </BasicForm>
    </CollapseContainer>
  </PageWrapper>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { BasicForm, useForm } from '@/components/BasicForm'
import { CollapseContainer } from '@/components/CollapseContainer'
import { StrengthMeter } from '@/components/StrengthMeter'
import { useMessage } from '@/hooks/web/useMessage'

import { formSchema } from './data'

export default defineComponent({
  name: 'ChangePassword',
  components: { BasicForm, CollapseContainer, StrengthMeter },
  setup() {
    const { createMessage } = useMessage()
    const [register, { validate, resetFields }] = useForm({
      size: 'large',
      labelWidth: 100,
      colProps: { span: 16 },
      schemas: formSchema,
      submitButtonOptions: {
        btnText: '确认',
      },
      resetButtonOptions: {
        btnText: '重置',
      },
    })

    async function handleSubmit() {
      try {
        await validate()
        createMessage.success('重置成功')
      } catch (error) {
        // continue regardless of error
      }
    }

    return { register, resetFields, handleSubmit }
  },
})
</script>
