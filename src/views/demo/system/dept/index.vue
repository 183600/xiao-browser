<template>
  <div>
    <BasicTable @register="registerTable">
      <template #toolbar>
        <el-button type="primary" @click="handleCreate">新增部门</el-button>
      </template>
    </BasicTable>
    <DeptModal @register="registerModal" @success="handleSuccess" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { ElButton } from 'element-plus'

import { BasicTable, useTable } from '@/components/BasicTable'
import { getDeptList } from '@/api/demo/system'

import { useModal } from '@/components/BasicModal'
import DeptModal from './DeptModal.vue'
import { columns, searchFormSchema } from './data'

export default defineComponent({
  name: 'DeptManagement',
  components: { ElButton, BasicTable, DeptModal },
  setup() {
    const [registerModal, { openModal }] = useModal()
    const [registerTable, { reload }] = useTable({
      title: '部门列表',
      api: getDeptList,
      columns: [
        ...columns,
        {
          actions: [
            {
              iconName: 'clarity:note-edit-line',
              btnText: '编辑',
              callback: handleEdit,
            },
            {
              iconName: 'ep:delete',
              type: 'danger',
              btnText: '删除',
              popConfirm: {
                title: '是否删除？',
                type: 'error',
              },
              callback: handleDelete,
            },
          ],
        },
      ],
      formConfig: {
        labelWidth: 120,
        schemas: searchFormSchema,
      },
      // pagination: undefined,
      useSearchForm: true,
      showTableSetting: true,
      border: true,
      showIndexColumn: false,
    })

    function handleCreate() {
      openModal(true, {
        isUpdate: false,
      })
    }

    function handleEdit({ row }) {
      openModal(true, {
        record: row,
        isUpdate: true,
      })
    }

    function handleDelete() {
      // do something
    }

    function handleSuccess() {
      reload()
    }

    return {
      registerTable,
      registerModal,
      handleCreate,
      handleEdit,
      handleDelete,
      handleSuccess,
    }
  },
})
</script>
