<template>
  <BasicDrawer
    v-bind="$attrs"
    @register="register"
    title="Drawer Title"
    width="50%">
    <div>
      <BasicForm @register="registerForm" />
    </div>
  </BasicDrawer>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { BasicDrawer, useDrawerInner } from '@/components/BasicDrawer'

import { BasicForm, BasicFormSchema, useForm } from '@/components/BasicForm'

export default defineComponent({
  components: { BasicDrawer, BasicForm },
  setup() {
    const schemas: BasicFormSchema[] = [
      {
        field: 'field1',
        component: 'ElInput',
        label: '字段1',
        colProps: {
          span: 12,
        },
        defaultValue: '111',
      },
      {
        field: 'field2',
        component: 'ElInput',
        label: '字段2',
        colProps: {
          span: 12,
        },
      },
    ]
    const [registerForm, { setFieldsValue }] = useForm({
      schemas,
      showActionButtonGroup: false,
      actionColProps: {
        span: 24,
      },
    })
    const [register] = useDrawerInner((data) => {
      // 方式1
      setFieldsValue({
        field2: data.data,
        field1: data.info,
      })
    })
    return { register, schemas, registerForm }
  },
})
</script>
