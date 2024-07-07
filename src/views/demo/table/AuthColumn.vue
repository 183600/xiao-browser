<template>
  <PageWrapper>
    <BasicTable @register="registerTable" />
  </PageWrapper>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { BasicTable, useTable, BasicColumn } from '@/components/BasicTable'
import { demoListApi } from '@/api/demo/table'
import { useMessage } from '@/hooks/web/useMessage'
import { getAuthColumns } from './data'
import { EleActionPopconfirmAction } from '@/components/ElementPlus'

export default defineComponent({
  components: { BasicTable },
  setup() {
    const { createMessage } = useMessage()
    const columns: BasicColumn[] = [
      ...getAuthColumns(),
      {
        align: 'right',
        actions: [
          {
            btnText: '启用',
            callback: handleOpen,
            auth: 'admin', // 根据权限控制是否显示: 无权限，不显示
          },
          {
            btnText: '编辑',
            callback: handleEdit,
            auth: 'other', // 根据权限控制是否显示: 无权限，不显示
          },
          {
            btnText: '删除',
            callback: handleDelete,
            popConfirm: {
              title: '是否删除？',
              type: 'error',
            },
            auth: 'admin', // 根据权限控制是否显示: 有权限，会显示
          },
        ],
      },
    ]
    const [registerTable, { deleteTableDataRecord }] = useTable({
      title: 'TableAction组件及固定列示例',
      api: demoListApi,
      columns,
      border: true,
    })
    function handleEdit() {
      // do something
    }
    function handleDelete({ row }, type: EleActionPopconfirmAction) {
      if (type === 'confirm') {
        deleteTableDataRecord(row.key)
        createMessage.success('删除成功')
      }
    }
    function handleOpen() {
      // do something
    }
    return { registerTable }
  },
})
</script>
