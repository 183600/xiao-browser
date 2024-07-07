<template>
  <BasicDrawer
    v-bind="$attrs"
    @register="registerDrawer"
    showFooter
    :title="getTitle"
    width="500px"
    @confirm="handleSubmit">
    <BasicForm @register="registerForm">
      <template #menu="{ model, field }">
        <el-tree
          :default-checked-keys="model[field]"
          :data="treeData"
          node-key="id"
          defaultExpandAll
          :props="{ label: 'menuName' }"
          show-checkbox
          title="菜单分配" />
      </template>
    </BasicForm>
  </BasicDrawer>
</template>

<script lang="ts">
import { defineComponent, ref, computed, unref } from 'vue'
import { ElTree } from 'element-plus'

import { BasicForm, useForm } from '@/components/BasicForm'
import { BasicDrawer, useDrawerInner } from '@/components/BasicDrawer'
import { getMenuList } from '@/api/demo/system'

import { formSchema } from './data'

type ElTreeType = InstanceType<typeof ElTree>

export default defineComponent({
  name: 'RoleDrawer',
  components: { ElTree, BasicDrawer, BasicForm },
  emits: ['success', 'register'],
  setup(_, { emit }) {
    const isUpdate = ref(true)
    const treeData = ref<ElTreeType[]>([])

    const [registerForm, { resetFields, setFieldsValue, validate }] = useForm({
      labelWidth: 90,
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
      if (unref(treeData).length === 0) {
        treeData.value = (await getMenuList()) as any as ElTreeType[]
      }
      isUpdate.value = !!data?.isUpdate

      if (unref(isUpdate)) {
        setFieldsValue({
          ...data.record,
        })
      }
    })

    const getTitle = computed(() => (!unref(isUpdate) ? '新增角色' : '编辑角色'))

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

    return {
      registerDrawer,
      registerForm,
      getTitle,
      handleSubmit,
      treeData,
    }
  },
})
</script>
