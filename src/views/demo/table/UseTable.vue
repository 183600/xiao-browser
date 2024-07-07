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
      <el-button @click="toggleSelectedRows">切换选中行</el-button>
      <el-button @click="getPaginationInfo">获取分页信息</el-button>
    </div>
    <BasicTable @register="registerTable" />
  </PageWrapper>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { ElButton } from 'element-plus'
import { BasicTable, useTable } from '@/components/BasicTable'
import { getBasicColumns, getBasicShortColumns } from './data'
import { useMessage } from '@/hooks/web/useMessage'
import { demoListApi } from '@/api/demo/table'

export default defineComponent({
  components: { ElButton, BasicTable },
  setup() {
    const { createMessage } = useMessage()
    const columns = getBasicColumns()
    const [registerTable, { setLoading, setColumns, getColumns, getDataSource, getRawDataSource, reload, getPagination, setPagination, toggleAllSelection }] = useTable({
      title: 'useTable示例',
      titleHelpMessage: '使用useTable调用表格内方法',
      api: demoListApi,
      columns,
      rowKey: 'id',
      showTableSetting: true,
      onSelectionChange: (selection) => {
        // do something
        console.info(selection)
      },
      showCheckboxColumn: true,
    })
    function changeLoading() {
      setLoading(true)
      setTimeout(() => {
        setLoading(false)
      }, 1000)
    }
    function changeColumns() {
      // setColumns(['id', 'name', 'address'])
      setColumns(getBasicShortColumns())
    }
    function reloadTable() {
      setColumns(getBasicColumns())

      reload()
    }
    function getColumn() {
      createMessage.info('请在控制台查看！')
      console.info(getColumns())
    }

    function getTableData() {
      createMessage.info('请在控制台查看！')
      console.info(getDataSource())
    }

    function getTableRawData() {
      createMessage.info('请在控制台查看！')
      console.info(getRawDataSource())
    }

    function getPaginationInfo() {
      createMessage.info('请在控制台查看！')
      console.info(getPagination())
    }

    function setPaginationInfo() {
      setPagination({
        currentPage: 2,
      })
      reload()
    }

    function toggleSelectedRows() {
      toggleAllSelection()
    }

    return {
      registerTable,
      changeLoading,
      changeColumns,
      reloadTable,
      getColumn,
      getTableData,
      getTableRawData,
      getPaginationInfo,
      setPaginationInfo,
      toggleSelectedRows,
    }
  },
})
</script>
