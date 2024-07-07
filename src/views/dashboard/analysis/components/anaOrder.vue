<template>
  <el-row class="ana-site" :gutter="32">
    <el-col :span="16">
      <el-card shadow="always">
        <template #header>
          <div class="dashboard-analysis__title ana-site__title">
            <span>订单趋势</span>
            <div class="ana-site__extra">
              <el-date-picker v-model="dateVal" type="daterange" range-separator="~" />
              <el-select v-model="dateType" placeholder="Select">
                <el-option
                  v-for="item in dateOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value" />
              </el-select>
            </div>
          </div>
        </template>
        <OrderAnalysisBar :type="dateType" />
      </el-card>
    </el-col>
    <el-col :span="8">
      <el-card shadow="always">
        <template #header>
          <div class="dashboard-analysis__title">任务进度</div>
        </template>
        <OrderAnalysis :type="dateType" />
      </el-card>
    </el-col>
  </el-row>
</template>

<script lang="ts">
import { defineComponent, ref, unref, watch } from 'vue'
import { ElRow, ElCol, ElCard, ElSelect, ElOption, ElDatePicker } from 'element-plus'
import { dateType as DateType } from '../data'
import OrderAnalysis from './OrderAnalysis.vue'
import OrderAnalysisBar from './OrderAnalysisBar.vue'

export default defineComponent({
  components: { ElRow, ElCol, ElCard, ElSelect, ElOption, ElDatePicker, OrderAnalysis, OrderAnalysisBar },
  props: {
    loading: {
      type: Boolean,
    },
  },
  emits: ['dateType'],
  setup(_, { emit }) {
    const dateVal = ref([new Date(), new Date()])
    const dateType = ref<DateType>('quarter')
    const dateOptions = ref([
      { value: 'day', label: 'Day' },
      { value: 'week', label: 'Week' },
      { value: 'month', label: 'Month' },
      { value: 'quarter', label: 'Quarter' },
      { value: 'year', label: 'Year' },
    ])

    watch(
      () => unref(dateType),
      (v) => {
        emit('dateType', v)
      },
    )

    return {
      dateType,
      dateVal,
      dateOptions,
    }
  },
})
</script>

<style lang="scss" scoped>
.ana-site {
  margin: 2rem 0;

  &__title {
    position: relative;
  }

  &__extra {
    position: absolute;
    top: 0;
    right: 0;
    display: flex;
    align-items: center;

    .el-select {
      width: 150px;
      margin-left: 8px;
    }
  }
}
</style>
