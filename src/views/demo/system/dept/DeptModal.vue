<template>
  <BasicModal
    v-bind="$attrs"
    @register="registerModal"
    :title="getTitle"
    @confirm="handleSubmit">
    <BasicForm @register="registerForm" />
  </BasicModal>
</template>

<script lang="ts">
import { defineComponent, ref, computed, unref } from 'vue'
import { BasicModal, useModalInner } from '@/components/BasicModal'
import { BasicForm, useForm } from '@/components/BasicForm'
import { formSchema } from './data'
import { getDeptList } from '@/api/demo/system'

export default defineComponent({
  name: 'DeptModal',
  components: { BasicModal, BasicForm },
  emits: ['success', 'register'],
  setup(_, { emit }) {
    const isUpdate = ref(true)

    const [registerForm, { resetFields, setFieldsValue, updateSchema, validate }] = useForm({
      labelWidth: 100,
      schemas: formSchema,
      showActionButtonGroup: false,
      colProps: {
        span: 24,
      },
      actionColProps: {
        span: 24,
      },
    })

    const [registerModal, { setModalProps, closeModal }] = useModalInner(async(data) => {
      resetFields()
      setModalProps({ confirmOptions: { loading: false } })
      isUpdate.value = !!data?.isUpdate

      if (unref(isUpdate)) {
        setFieldsValue({
          ...data.record,
        })
      }
      const treeData = await getDeptList()
      updateSchema({
        field: 'parentDept',
        componentProps: { treeData },
      })
    })

    const getTitle = computed(() => (!unref(isUpdate) ? '新增部门' : '编辑部门'))

    async function handleSubmit() {
      try {
        await validate()
        setModalProps({ confirmOptions: { loading: true } })
        closeModal()
        emit('success')
      } finally {
        setModalProps({ confirmOptions: { loading: false } })
      }
    }

    return { registerModal, registerForm, getTitle, handleSubmit }
  },
})
</script>
