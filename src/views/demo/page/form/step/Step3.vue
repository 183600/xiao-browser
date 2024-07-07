<template>
  <div class="step3">
    <el-result icon="success" title="操作成功" sub-title="预计两小时内到账">
      <template #extra>
        <el-button type="primary" @click="redo">再转一笔</el-button>
        <el-button>查看账单</el-button>
      </template>
    </el-result>
    <div class="desc-wrap">
      <el-descriptions :column="1">
        <el-descriptions-item label="付款账户">test@alipay.com</el-descriptions-item>
        <el-descriptions-item label="收款账户">test@example.com</el-descriptions-item>
        <el-descriptions-item label="收款人姓名">Tony</el-descriptions-item>
        <el-descriptions-item label="转账金额">500元</el-descriptions-item>
      </el-descriptions>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { ElResult, ElButton, ElDescriptions, ElDescriptionsItem } from 'element-plus'

export default defineComponent({
  components: {
    ElResult,
    ElButton,
    ElDescriptions,
    ElDescriptionsItem,
  },
  emits: ['redo'],
  setup(_, { emit }) {
    return {
      redo: () => {
        emit('redo')
      },
    }
  },
})
</script>
<style lang="scss" scoped>
.step3 {
  width: 600px;
  margin: 0 auto;
}

.desc-wrap {
  padding: 24px 40px;
  margin-top: 24px;
  background-color: var(--background-main-color);

  .el-descriptions {
    --el-fill-color-blank: none;
  }
}
</style>
