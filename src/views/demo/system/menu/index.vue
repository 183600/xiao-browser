<template>
  <div>
    <BasicTable @register="registerTable" @fetch-success="onFetchSuccess">
      <template #toolbar>
        <el-button type="primary" @click="handleCreate">新增菜单</el-button>
      </template>
    </BasicTable>
    <MenuDrawer @register="registerDrawer" @success="handleSuccess" />
  </div>
</template>

<script lang="ts">
import { defineComponent, nextTick } from 'vue'
import { ElButton } from 'element-plus'

import { BasicTable, useTable } from '@/components/BasicTable'
import { getMenuList } from '@/api/demo/system'

import { useDrawer } from '@/components/BasicDrawer'
import MenuDrawer from './MenuDrawer.vue'

import { columns, searchFormSchema } from './data'

export default defineComponent({
  name: 'MenuManagement',
  components: { ElButton, BasicTable, MenuDrawer },
  setup() {
    const [registerDrawer, { openDrawer }] = useDrawer()
    const [registerTable, { reload, expandAll }] = useTable({
      title: '菜单列表',
      api: getMenuList,
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

    function onFetchSuccess() {
      // 演示默认展开所有表项
      nextTick(expandAll)
    }

    return {
      registerTable,
      registerDrawer,
      handleCreate,
      handleEdit,
      handleDelete,
      handleSuccess,
      onFetchSuccess,
    }
  },
})
</script>
