<template>
  <div>
    <BasicTable @register="registerTable" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { BasicTable, useTable, BasicColumn } from '@/components/BasicTable'
import { demoListApi } from '@/api/demo/table'

export default defineComponent({
  components: { BasicTable },
  setup() {
    const columns: BasicColumn[] = [
      {
        label: '成员姓名',
        prop: 'name',
      },
      {
        label: '工号',
        prop: 'no',
      },
      {
        label: '所属部门',
        prop: 'dept',
      },
      {
        actions: [
          {
            btnText: '编辑',
            callback: handleEdit,
          },
          {
            type: 'danger',
            btnText: '删除',
          },
        ],
      },
    ]

    const [registerTable, { getDataSource }] = useTable({
      columns: columns,
      api: demoListApi,
      pagination: false,
    })

    function handleEdit(record) {
      record.onEdit?.(true)
    }

    function createActions(record) {
      return [
        {
          btnText: '编辑',
          onClick: handleEdit.bind(null, record),
        },
        {
          btnText: '删除',
        },
      ]
    }

    return {
      registerTable,
      handleEdit,
      createActions,
      getDataSource,
    }
  },
})
</script>
