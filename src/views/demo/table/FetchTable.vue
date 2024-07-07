<template>
  <PageWrapper contentBackground contentFullHeight>
    <BasicTable @register="registerTable">
      <template #toolbar>
        <el-button type="primary" @click="handleReloadCurrent">刷新当前页</el-button>
        <el-button type="primary" @click="handleReload">跳转第2页</el-button>
      </template>
    </BasicTable>
  </PageWrapper>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { ElButton } from 'element-plus'
import { BasicTable, useTable } from '@/components/BasicTable'
import { getBasicColumns } from './data'
import { demoListApi } from '@/api/demo/table'

export default defineComponent({
  components: { ElButton, BasicTable },
  setup() {
    const [registerTable, { reload, setPagination }] = useTable({
      title: '远程加载示例',
      api: demoListApi,
      canResize: true,
      pagination: { pageSize: 30 },
      showIndexColumn: true,
      showTableSetting: true,
      tableSetting: {
        size: true,
      },
      columns: getBasicColumns(),
    })
    function handleReloadCurrent() {
      reload()
    }

    function handleReload() {
      setPagination({
        currentPage: 2,
      })
    }

    return {
      registerTable,
      handleReloadCurrent,
      handleReload,
    }
  },
})
</script>
