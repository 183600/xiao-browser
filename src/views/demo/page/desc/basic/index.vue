<template>
  <PageWrapper title="基础详情页" contentBackground>
    <BasicDescription
      title="退款申请"
      size="small"
      :border="false"
      :column="3"
      :data="refundData"
      :schema="refundSchema" />
    <BasicDescription
      title="用户信息"
      size="small"
      class="mt-4"
      :border="false"
      :column="3"
      :data="personData"
      :schema="personSchema" />
    <BasicTable v-bind="registerRefundTableFields" @register="registerRefundTable" />
    <BasicTable v-bind="registerTimeTableFields" @register="registerTimeTable" />
  </PageWrapper>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue'
import { BasicDescription } from '@/components/BasicDescription'
import { BasicTable, useTable } from '@/components/BasicTable'

import { refundSchema, refundData, personSchema, personData, refundTableSchema, refundTimeTableSchema, refundTableData, refundTimeTableData } from './data'

export default defineComponent({
  components: { BasicDescription, BasicTable },
  setup() {
    const registerRefundTableFields = reactive<any>({
      title: '退货商品',
      dataSource: refundTableData,
      columns: refundTableSchema,
      showIndexColumn: false,
      scroll: { y: 300 },
      showSummary: true,
      summaryMethod: handleSummary,
    })

    const [registerRefundTable] = useTable()

    const registerTimeTableFields = reactive<any>({
      title: '退货进度',
      columns: refundTimeTableSchema,
      dataSource: refundTimeTableData,
      scroll: { y: 300 },
    })
    const [registerTimeTable] = useTable()

    function handleSummary({ columns, data }) {
      const sums: string[] = []
      sums[0] = '总计'

      columns.forEach((column, index) => {
        const values = data.map((item) => Number(item[column.property]))
        const showVals = ['t5', 't6']
        if (showVals.includes(column.property)) {
          sums[index] = `${values.reduce((prev, curr) => {
            const value = Number(curr)
            if (!Number.isNaN(value)) {
              return prev + curr
            } else {
              return prev
            }
          }, 0)}`
        }
      })

      return sums
    }
    return {
      refundTableData,
      registerRefundTableFields,
      refundTimeTableData,
      registerRefundTable,
      registerTimeTableFields,
      registerTimeTable,
      refundSchema,
      refundData,
      personSchema,
      personData,
    }
  },
})
</script>

<style lang="scss" scoped>
.basic-desc-table {
  padding: 12px;

  &__title {
    height: 44px;
    padding: 0 7px;
    margin-bottom: -8px;
    font-size: 14px;
    line-height: 44px;
    border-bottom: 1px solid var(--border-color);
  }
}
</style>
