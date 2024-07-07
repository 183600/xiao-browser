<template>
  <BasicDrawer
    v-bind="$attrs"
    @register="registerDrawer"
    showFooter
    :title="getTitle"
    size="500px"
    @confirm="handleSubmit">
    <BasicForm @register="registerForm">
      <template #icon="{ model, field }">
        <IconPicker v-model:modelValue="model[field]" />
      </template>
    </BasicForm>
  </BasicDrawer>
</template>

<script lang="ts">
import { defineComponent, ref, computed, unref } from 'vue'

import { BasicForm, useForm } from '@/components/BasicForm'
import { BasicDrawer, useDrawerInner } from '@/components/BasicDrawer'
import { IconPicker } from '@/components/IconPicker'

import { getMenuList } from '@/api/demo/system'
import { formSchema } from './data'

export default defineComponent({
  name: 'MenuDrawer',
  components: { BasicDrawer, BasicForm, IconPicker },
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

    const [registerDrawer, { closeDrawer, changeConfirmLoading }] = useDrawerInner(async(data) => {
      resetFields()
      changeConfirmLoading(false)
      isUpdate.value = !!data?.isUpdate

      if (unref(isUpdate)) {
        setFieldsValue({
          ...data.record,
        })
      }
      const treeData = await getMenuList()
      updateSchema({
        field: 'parentMenu',
        componentProps: { treeData },
      })
    })

    const getTitle = computed(() => (!unref(isUpdate) ? '新增菜单' : '编辑菜单'))

    async function handleSubmit() {
      try {
        await validate()
        changeConfirmLoading(true)
        closeDrawer()
        emit('success')
      } finally {
        changeConfirmLoading(false)
      }
    }

    return { registerDrawer, registerForm, getTitle, handleSubmit }
  },
})
</script>
