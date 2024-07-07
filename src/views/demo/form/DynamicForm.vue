<template>
  <PageWrapper title="动态表单示例">
    <div class="mb-4">
      <el-button @click="changeLabel3">更改字段3label</el-button>
      <el-button @click="appendField">往字段3后面插入字段10</el-button>
      <el-button @click="deleteField">删除字段11</el-button>
      <el-button @click="resetField">重置表单字段</el-button>
    </div>
    <CollapseContainer title="动态表单示例,动态根据表单内其他值改变">
      <BasicForm @register="register" @submit="handleSubmit" />
    </CollapseContainer>

    <CollapseContainer class="mt-5" title="componentProps动态改变">
      <BasicForm @register="register1" @submit="handleSubmit" />
    </CollapseContainer>
  </PageWrapper>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { ElButton } from 'element-plus'
import { BasicForm, useForm } from '@/components/BasicForm'
import { CollapseContainer } from '@/components/CollapseContainer'

import { dyncSchemas as schemas, dyncSchemas1 as schemas1 } from './data'

export default defineComponent({
  components: { ElButton, CollapseContainer, BasicForm },
  setup() {
    const [register, { setFormProps, updateSchema, appendSchemaByField, removeSchemaByField, resetSchema }] = useForm({
      labelWidth: 120,
      schemas,
      actionColProps: {
        span: 24,
      },
    })
    const [register1] = useForm({
      labelWidth: 120,
      schemas: schemas1,
      actionColProps: {
        span: 24,
      },
    })
    function changeLabel3() {
      updateSchema({
        field: 'field3',
        label: '字段3 New',
      })
    }

    function appendField() {
      appendSchemaByField(
        {
          field: 'field10',
          label: '字段10',
          component: 'ElInput',
          colProps: {
            span: 8,
          },
        },
        'field3',
      )
    }
    function deleteField() {
      removeSchemaByField('field11')
    }
    function resetField() {
      resetSchema(schemas)
    }
    function handleSubmit() {
      // do something
    }

    return {
      register,
      register1,
      schemas,
      setFormProps,
      changeLabel3,
      appendField,
      deleteField,
      resetField,
      handleSubmit,
    }
  },
})
</script>
