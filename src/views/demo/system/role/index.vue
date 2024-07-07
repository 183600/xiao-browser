<template>
  <div>
    <BasicTable @register="registerTable">
      <template #toolbar>
        <el-button type="primary" @click="handleCreate">新增角色</el-button>
      </template>
    </BasicTable>
    <RoleDrawer @register="registerDrawer" @success="handleSuccess" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { ElButton } from 'element-plus'

import { BasicTable, useTable } from '@/components/BasicTable'
import { getRoleListByPage } from '@/api/demo/system'

import { useDrawer } from '@/components/BasicDrawer'
import RoleDrawer from './RoleDrawer.vue'
import { columns, searchFormSchema } from './data'

export default defineComponent({
  name: 'RoleManagement',
  components: { ElButton, BasicTable, RoleDrawer },
  setup() {
    const [registerDrawer, { openDrawer }] = useDrawer()
    const [registerTable, { reload }] = useTable({
      title: '角色列表',
      api: getRoleListByPage,
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
      useSearchForm: true,
      border: true,
    })

    function handleCreate() {
      openDrawer(true, {
        isUpdate: false,
      })
    }

    function handleEdit({ row }) {
      openDrawer(true, {
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
      registerDrawer,
      handleCreate,
      handleEdit,
      handleDelete,
      handleSuccess,
    }
  },
})
</script>
