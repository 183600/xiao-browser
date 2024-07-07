<template>
  <PageWrapper contentFullHeight>
    <BasicTable @register="registerTable">
      <template #imgs="{ label, width, prop }">
        <el-table-column :label="label" :width="width" :prop="prop">
          <template #default="scope">
            <img
              :src="item"
              :key="index"
              width="80"
              v-for="(item, index) in scope.row.imgs" />
          </template>
        </el-table-column>
      </template>
    </BasicTable>
  </PageWrapper>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { BasicTable, useTable, BasicColumn } from '@/components/BasicTable'
import { demoListApi } from '@/api/demo/table'
import { ElTableColumn } from 'element-plus'

export default defineComponent({
  components: { ElTableColumn, BasicTable },
  setup() {
    const columns: BasicColumn[] = [
      {
        label: 'ID',
        prop: 'id',
        fixed: 'left',
        width: 150,
      },
      {
        label: '名称',
        prop: 'name',
        width: 150,
      },
      {
        label: '姓名',
        prop: 'nickname',
        width: 150,
      },
      {
        label: '编号',
        prop: 'no',
        width: 150,
      },
      {
        label: '地址',
        prop: 'address',
        width: 400,
      },
      {
        label: '描述',
        prop: 'description',
        width: 800,
      },
      {
        label: '图片集',
        prop: 'imgs',
        width: 850,
        isSlot: true,
      },
      {
        label: '开始时间',
        prop: 'beginTime',
        width: 180,
      },
      {
        label: '结束时间',
        prop: 'endTime',
        width: 180,
      },
      {
        fixed: 'right',
        actions: [
          {
            btnText: '启用',
            callback: handleOpen,
          },
          {
            btnText: '删除',
            callback: handleDelete,
          },
        ],
      },
    ]
    const [registerTable] = useTable({
      title: 'TableAction组件及固定列示例',
      api: demoListApi,
      columns: columns,
      canResize: true,
      showCheckboxColumn: true,
      border: true,
    })
    function handleDelete() {
      // do something
    }
    function handleOpen() {
      // do something
    }

    return {
      registerTable,
      handleDelete,
      handleOpen,
    }
  },
})
</script>
