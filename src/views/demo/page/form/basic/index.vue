<template>
  <PageWrapper title="基础表单" contentBackground description="表单页用于向用户收集或验证信息，基础表单常见于数据项较少的表单场景。">
    <el-row>
      <el-col
        :xl="{ span: 10, offset: 7 }"
        :lg="{ span: 12, offset: 6 }"
        :md="{ span: 16, offset: 4 }"
        :sm="{ span: 24, offset: 0 }">
        <BasicForm @register="register" />
      </el-col>
    </el-row>
  </PageWrapper>
</template>

<script lang="ts">
import { BasicForm, useForm } from '@/components/BasicForm'
import { ElRow, ElCol } from 'element-plus'
import { defineComponent } from 'vue'
import { schemas } from './data'
import { useMessage } from '@/hooks/web/useMessage'

export default defineComponent({
  name: 'FormBasicPage',
  components: { ElRow, ElCol, BasicForm },
  setup() {
    const { createMessage } = useMessage()
    const [register, { validate, setFormProps }] = useForm({
      labelWidth: 160,
      colProps: {
        span: 24,
      },
      schemas: schemas,
      actionColProps: {
        offset: 8,
        span: 12,
      },
      submitButtonOptions: {
        btnText: '提交',
      },
      submitFn: customSubmitFunc,
    })

    async function customSubmitFunc() {
      try {
        await validate()
        setFormProps({
          submitButtonOptions: {
            loading: true,
          },
        })
        setTimeout(() => {
          setFormProps({
            submitButtonOptions: {
              loading: false,
            },
          })
          createMessage.success('提交成功！')
        }, 2000)
      } catch (error) {
        // -
      }
    }

    return { register }
  },
})
</script>

<style lang="scss" scoped>
.form-wrap {
  padding: 24px;
  background-color: var(--background-primary-color);
}
</style>
