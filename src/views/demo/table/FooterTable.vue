<template>
  <div class="p-4">
    <BasicTable @register="registerTable" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { BasicTable, useTable } from '@/components/BasicTable'
import { getTotalColumns } from './data'

import { demoListApi } from '@/api/demo/table'

export default defineComponent({
  components: { BasicTable },
  setup() {
    function handleSummary(tableData) {
      const { columns, data } = tableData
      const sums: string[] = []
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = '统计'
          return
        }

        const values = data.map((item) => Number(item[column.property]))
        if (!values.every((value) => Number.isNaN(value)) && column.property !== 'sex') {
          sums[index] = `${values.reduce((prev, curr) => {
            const value = Number(curr)
            if (!Number.isNaN(value)) {
              return prev + curr
            } else {
              return prev
            }
          }, 0)}`
        } else {
          sums[index] = '--'
        }
      })

      return sums
    }
    const [registerTable] = useTable({
      title: '表尾行合计示例',
      api: demoListApi,
      columns: getTotalColumns(),
      height: 350,
      showSummary: true,
      summaryMethod: handleSummary,
    })

    return {
      registerTable,
    }
  },
})
</script>
