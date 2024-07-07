<template>
  <PageWrapper>
    <BasicTable @register="register" @expand-change="handleExpand">
      <template #toolbar>
        <el-button type="primary" @click="expandAll">展开全部</el-button>
        <el-button type="primary" @click="collapseAll">折叠全部</el-button>
      </template>
    </BasicTable>
  </PageWrapper>
</template>

<script lang="ts">
import { defineComponent, toRaw } from 'vue'
import { ElButton } from 'element-plus'
import { BasicTable, useTable } from '@/components/BasicTable'
import { getBasicColumns } from './data'
import { treeDemoListApi } from '@/api/demo/tree'
import { useMessage } from '@/hooks/web/useMessage'

export default defineComponent({
  components: { ElButton, BasicTable },
  setup() {
    const { createMessage } = useMessage()

    const [register, { expandAll, collapseAll }] = useTable({
      title: '树形表格',
      titleHelpMessage: '树形组件不能和序列号列同时存在',
      columns: getBasicColumns(),
      api: treeDemoListApi,
      searchInfo: { type: 2 },
      rowKey: 'code',
    })

    function handleExpand(row, expand) {
      createMessage.info(`点击了 - ${toRaw(row)?.id} - ${expand}`)
    }

    return { register, expandAll, collapseAll, handleExpand }
  },
})
</script>
