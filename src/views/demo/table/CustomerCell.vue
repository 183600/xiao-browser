<template>
  <PageWrapper contentBackground>
    <BasicTable @register="registerTable">
      <template #id="{ label, prop }">
        <el-table-column :label="label" :prop="prop">
          <template #default="scope">ID: {{ scope.row.id }}</template>
        </el-table-column>
      </template>
      <template #no="{ label, prop }">
        <el-table-column :label="label" :prop="prop">
          <template #default="scope">
            <el-tag type="success">
              {{ scope.row.no }}
            </el-tag>
          </template>
        </el-table-column>
      </template>
      <template #avatar="{ label, prop }">
        <el-table-column :label="label" :prop="prop">
          <template #default="scope">
            <el-avatar :size="60" :src="scope.row.avatar" />
          </template>
        </el-table-column>
      </template>
      <template #category="{ label, prop }">
        <el-table-column :label="label" :prop="prop">
          <template #default="scope">
            <el-tag type="success">
              {{ scope.row.category }}
            </el-tag>
          </template>
        </el-table-column>
      </template>
    </BasicTable>
  </PageWrapper>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { ElTag, ElAvatar, ElTableColumn } from 'element-plus'
import { BasicTable, useTable } from '@/components/BasicTable'
import { demoListApi } from '@/api/demo/table'
import { getCustomCellColumns } from './data'

export default defineComponent({
  components: { ElTag, ElAvatar, ElTableColumn, BasicTable },
  setup() {
    const [registerTable] = useTable({
      title: '自定义列内容',
      api: demoListApi,
      columns: getCustomCellColumns(),
      border: true,
      showTableSetting: true,
    })

    return {
      registerTable,
    }
  },
})
</script>
