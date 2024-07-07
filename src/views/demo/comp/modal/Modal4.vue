<template>
  <BasicModal
    v-bind="$attrs"
    @register="register"
    title="Modal Title"
    @visible-change="handleVisibleChange">
    <div class="p-4">
      <BasicForm @register="registerForm" :model="model" />
    </div>
  </BasicModal>
</template>

<script lang="ts">
import { defineComponent, ref, nextTick } from 'vue'
import { BasicModal, useModalInner } from '@/components/BasicModal'
import { BasicForm, BasicFormSchema, useForm } from '@/components/BasicForm'
export default defineComponent({
  components: { BasicModal, BasicForm },
  props: {
    userData: { type: Object },
  },
  setup(props) {
    const modelRef = ref({})
    const schemas: BasicFormSchema[] = [
      {
        field: 'field1',
        component: 'ElInput',
        label: '字段1',
        colProps: {
          span: 24,
        },
        defaultValue: '111',
      },
      {
        field: 'field2',
        component: 'ElInput',
        label: '字段2',
        colProps: {
          span: 24,
        },
      },
    ]

    const [registerForm] = useForm({
      labelWidth: 120,
      schemas,
      showActionButtonGroup: false,
      actionColProps: {
        span: 24,
      },
    })

    const [register] = useModalInner((data) => {
      data && onDataReceive(data)
    })

    function onDataReceive(data) {
      // 方式1;
      // setFieldsValue({
      //   field2: data.data,
      //   field1: data.info,
      // });

      // // 方式2
      modelRef.value = { field2: data.data, field1: data.info }

      // setProps({
      //   model:{ field2: data.data, field1: data.info }
      // })
    }

    function handleVisibleChange(v) {
      v && props.userData && nextTick(() => onDataReceive(props.userData))
    }

    return { register, schemas, registerForm, model: modelRef, handleVisibleChange }
  },
})
</script>
