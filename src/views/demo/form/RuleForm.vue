<template>
  <PageWrapper title="表单校验示例">
    <div class="mb-4">
      <el-button @click="validateForm()">手动校验表单</el-button>
      <el-button @click="resetValidate()">清空校验信息</el-button>
      <el-button @click="getFormValues()">获取表单值</el-button>
      <el-button @click="setFormValues()">设置表单值</el-button>
      <el-button @click="reset()">重置</el-button>
    </div>
    <CollapseContainer title="表单校验">
      <BasicForm @register="register">
        <template #countdown="{ model, field }">
          <CountdownInput v-model:modelValue="model[field]" />
        </template>
      </BasicForm>
    </CollapseContainer>
  </PageWrapper>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { ElButton } from 'element-plus'
import { BasicForm, BasicFormSchema, useForm } from '@/components/BasicForm'
import { CollapseContainer } from '@/components/CollapseContainer'
import { useMessage } from '@/hooks/web/useMessage'
import { isAccountExist } from '@/api/demo/system'
import { CountdownInput } from '@/components/CountdownInput'

export default defineComponent({
  components: { ElButton, BasicForm, CollapseContainer, CountdownInput },
  setup() {
    const { createMessage } = useMessage()
    const schemas: BasicFormSchema[] = [
      {
        field: 'field1',
        component: 'ElInput',
        label: '字段1',
        colProps: {
          span: 8,
        },
        required: true,
      },

      {
        field: 'field2',
        component: 'ElInput',
        label: '字段2',
        colProps: {
          span: 8,
        },
        required: true,
      },
      {
        field: 'id',
        label: 'id',
        required: true,
        defaultValue: 0,
        component: 'ElInputNumber',
        show: false,
      },
      {
        field: 'field3',
        component: 'ElDatePicker',
        label: '字段3',
        colProps: {
          span: 8,
        },
        required: true,
      },
      {
        field: 'field33',
        component: 'ElDatePicker',
        label: '字段33',
        colProps: {
          span: 8,
        },
        componentProps: {
          valueFormat: 'YYYY-MM-DD',
        },
        rules: [{ required: true, type: 'string' }],
      },
      {
        field: 'field44',
        component: 'ElInput',
        label: '验证码',
        slot: 'countdown',
        colProps: {
          span: 8,
        },
        required: true,
      },
      {
        field: 'field4',
        component: 'ElSelect',
        label: '字段4',
        colProps: {
          span: 8,
        },
        componentProps: {
          multiple: true,
          options: [
            {
              label: '选项1',
              value: '1',
            },
            {
              label: '选项2',
              value: '2',
            },
          ],
        },
        rules: [
          {
            required: true,
            message: '请选择',
            type: 'array',
          },
        ],
      },
      {
        field: 'field441',
        component: 'ElInput',
        label: '自定义校验',
        colProps: {
          span: 8,
        },
        rules: [
          {
            required: true,
            validator: (_, value: any, callback: any) => {
              if (!value) {
                callback(new Error('值不能为空'))
              }
              if (value === '1') {
                callback(new Error('值不能为1'))
              }
              return callback()
            },
            trigger: 'change',
          },
        ],
      },
      {
        field: 'field5',
        component: 'ElCheckboxGroup',
        defaultValue: [],
        label: '字段5',
        colProps: {
          span: 8,
        },
        required: true,
        componentProps: {
          options: [
            {
              label: '选项1',
              value: '1',
            },
            {
              label: '选项2',
              value: '2',
            },
          ],
        },
        // rules: [{ required: true }],
      },
      {
        field: 'field7',
        component: 'ElRadioGroup',
        label: '字段7',
        colProps: {
          span: 8,
        },
        componentProps: {
          options: [
            {
              label: '选项1',
              value: '1',
            },
            {
              label: '选项2',
              value: '2',
            },
          ],
        },
        rules: [
          {
            required: true,
            message: '覆盖默认生成的校验信息',
            type: 'string',
          },
        ],
      },
      {
        field: 'field8',
        component: 'ElInput',
        label: '后端异步验证',
        colProps: {
          span: 8,
        },
        helpMessage: ['本字段演示异步验证', '本地规则：必须填写', '后端规则：不能包含admin'],
        rules: [
          {
            required: true,
            message: '请输入数据',
          },
          {
            validator(_, value: any, callback: any) {
              isAccountExist(value)
                .then(() => callback())
                .catch((err) => {
                  callback(new Error(err.message || '验证失败'))
                })
            },
          },
        ],
      },
    ]
    const [register, { validateField, clearValidate, getFieldsValue, reset, setFieldsValue }] = useForm({
      labelWidth: 140,
      schemas,
      actionColProps: {
        span: 24,
      },
    })
    async function validateForm() {
      try {
        await validateField(['field1', 'field2'])
      } catch (error) {
        console.error('not passing', error)
      }
    }
    async function resetValidate() {
      clearValidate()
    }
    function getFormValues() {
      const values = getFieldsValue()
      createMessage.success(`values:${JSON.stringify(values)}`)
    }
    function setFormValues() {
      setFieldsValue({
        field1: 1111,
        field5: ['1'],
        field7: '1',
        field33: '2020-12-12',
        field3: '2020-12-12',
      })
    }
    return {
      register,
      schemas,
      handleSubmit: (values: any) => {
        createMessage.success(`click search,values:${JSON.stringify(values)}`)
      },
      getFormValues,
      setFormValues,
      validateForm,
      resetValidate,
      reset,
    }
  },
})
</script>
