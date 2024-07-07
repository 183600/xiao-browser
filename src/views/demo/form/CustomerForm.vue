<template>
  <PageWrapper title="自定义组件示例">
    <CollapseContainer title="自定义表单">
      <BasicForm @register="register" @submit="handleSubmit">
        <template #f3="{ model, field }">
          <el-input v-model:modelValue="model[field]" placeholder="自定义slot" />
        </template>
      </BasicForm>
    </CollapseContainer>
  </PageWrapper>
</template>

<script lang="ts">
import { defineComponent, h } from 'vue'
import { BasicFormSchema, useForm, BasicForm } from '@/components/BasicForm'
import { CollapseContainer } from '@/components/CollapseContainer'
import { useMessage } from '@/hooks/web/useMessage'
import { ElInput } from 'element-plus'

export default defineComponent({
  components: { ElInput, CollapseContainer, BasicForm },
  setup() {
    const { createMessage } = useMessage()
    const schemas: BasicFormSchema[] = [
      {
        field: 'field1',
        component: 'ElInput',
        label: 'render方式',
        colProps: {
          span: 8,
        },
        rules: [{ required: true }],
        render: ({ model, field }) => {
          return h(ElInput, {
            placeholder: '请输入',
            modelValue: model[field],
            onInput: (v: any) => {
              model[field] = v
            },
          })
        },
      },
      {
        field: 'field2',
        component: 'ElInput',
        label: 'render组件slot',
        colProps: {
          span: 8,
        },
        rules: [{ required: true }],
        renderComponentContent: () => {
          return {
            append: () => 'append',
          }
        },
      },
      {
        field: 'field3',
        component: 'ElInput',
        label: '自定义Slot',
        slot: 'f3',
        colProps: {
          span: 8,
        },
        rules: [{ required: true }],
      },
    ]

    const [register] = useForm({
      labelWidth: 120,
      schemas,
      actionColProps: {
        span: 24,
      },
    })

    return {
      register,
      handleSubmit: (values: any) => {
        createMessage.success(`click search,values:${JSON.stringify(values)}`)
      },
    }
  },
})
</script>
