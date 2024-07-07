<template>
  <PageWrapper>
    <div class="mb-4">
      <el-button @click="reloadTable">还原</el-button>
      <el-button @click="changeLoading">开启loading</el-button>
      <el-button @click="changeColumns">更改Columns</el-button>
      <el-button @click="getColumn">获取Columns</el-button>
      <el-button @click="getTableData">获取表格数据</el-button>
      <el-button @click="getTableRawData">获取接口原始数据</el-button>
      <el-button @click="setPaginationInfo">跳转到第2页</el-button>
    </div>
    <div class="mb-4">
      <el-button @click="getPaginationInfo">获取分页信息</el-button>
    </div>
    <BasicTable
      title="RefTable示例"
      titleHelpMessage="使用Ref调用表格内方法"
      ref="tableRef"
      :api="api"
      :columns="columns"
      showCheckboxColumn />
  </PageWrapper>
</template>

<script lang="ts">
import type { TableActionMethods } from '@/components/BasicTable'

import { defineComponent, ref, unref } from 'vue'
import { ElButton } from 'element-plus'
import { BasicTable } from '@/components/BasicTable'
import { getBasicColumns, getBasicShortColumns } from './data'
import { useMessage } from '@/hooks/web/useMessage'
import { demoListApi } from '@/api/demo/table'

export default defineComponent({
  components: { ElButton, BasicTable },
  setup() {
    const tableRef = ref<Nullable<TableActionMethods>>(null)
    const { createMessage } = useMessage()

    function getTable() {
      const table = unref(tableRef)
      if (!table) {
        throw new Error('tableAction is null')
      }
      return table
    }

    function changeLoading() {
      getTable().setLoading(true)
      setTimeout(() => {
        getTable().setLoading(false)
      }, 1000)
    }
    function changeColumns() {
      getTable().setColumns(getBasicShortColumns())
    }
    function reloadTable() {
      getTable().setColumns(getBasicColumns())

      getTable().reload()
    }
    function getColumn() {
      createMessage.info('请在控制台查看！')
      console.info(getTable().getColumns())
    }

    function getTableData() {
      createMessage.info('请在控制台查看！')
      console.info(getTable().getDataSource())
    }
    function getTableRawData() {
      createMessage.info('请在控制台查看！')
      console.info(getTable().getRawDataSource())
    }

    function getPaginationInfo() {
      createMessage.info('请在控制台查看！')
      console.info(getTable().getPagination())
    }

    function setPaginationInfo() {
      getTable().setPagination({
        currentPage: 2,
      })
      getTable().reload()
    }

    return {
      tableRef,
      api: demoListApi,
      columns: getBasicColumns(),
      changeLoading,
      changeColumns,
      reloadTable,
      getColumn,
      getTableData,
      getTableRawData,
      getPaginationInfo,
      setPaginationInfo,
    }
  },
})
</script>
