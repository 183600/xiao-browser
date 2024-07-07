<template>
  <PageWrapper title="表单增删示例">
    <CollapseContainer title="表单增删">
      <BasicForm @register="register" @submit="handleSubmit">
        <template #add="{ field }">
          <el-button v-if="Number(field) === 0" style="width: 42px" @click="add">+</el-button>
          <el-button v-if="field > 0" style="width: 42px" @click="del(field)">-</el-button>
        </template>
      </BasicForm>
    </CollapseContainer>
  </PageWrapper>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { ElButton } from 'element-plus'

import { BasicForm, useForm } from '@/components/BasicForm'
import { CollapseContainer } from '@/components/CollapseContainer'

export default defineComponent({
  components: { CollapseContainer, BasicForm, ElButton },
  setup() {
    const [register, { appendSchemaByField, removeSchemaByField, validate }] = useForm({
      schemas: [
        {
          field: 'field0a',
          component: 'ElInput',
          label: '字段0',
          colProps: {
            span: 8,
          },
          required: true,
        },
        {
          field: 'field0b',
          component: 'ElInput',
          label: '字段0',
          colProps: {
            span: 8,
          },
          required: true,
        },
        {
          field: '0',
          component: 'ElInput',
          label: ' ',
          colProps: {
            span: 8,
          },
          slot: 'add',
        },
      ],
      labelWidth: 100,
      actionColProps: { span: 24 },
    })

    async function handleSubmit() {
      try {
        await validate()
      } catch (e) {
        // --
      }
    }

    const n = ref(1)

    function add() {
      appendSchemaByField(
        {
          field: `field${n.value}a`,
          component: 'ElInput',
          label: `字段${n.value}`,
          colProps: {
            span: 8,
          },
          required: true,
        },
        '',
      )
      appendSchemaByField(
        {
          field: `field${n.value}b`,
          component: 'ElInput',
          label: `字段${n.value}`,
          colProps: {
            span: 8,
          },
          required: true,
        },
        '',
      )

      appendSchemaByField(
        {
          field: `${n.value}`,
          component: 'ElInput',
          label: ' ',
          colProps: {
            span: 8,
          },
          slot: 'add',
        },
        '',
      )
      n.value++
    }

    function del(field) {
      removeSchemaByField([`field${field}a`, `field${field}b`, `${field}`])
      n.value--
    }

    return { register, handleSubmit, add, del }
  },
})
</script>
