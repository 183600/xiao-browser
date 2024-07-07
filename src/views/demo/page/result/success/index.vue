<template>
  <div class="m-5 result-success">
    <el-result
      icon="success"
      title="提交成功"
      sub-title="提交结果页用于反馈一系列操作任务的处理结果， 如果仅是简单操作，使用 Message 全局提示反馈即可。 本文字区域可以展示简单的补充说明，如果有类似展示 “单据”的需求，下面这个灰色区域可以呈现比较复杂的内容。">
      <template #extra>
        <el-button type="primary">返回列表</el-button>
        <el-button>查看项目</el-button>
        <el-button>打印</el-button>
      </template>
    </el-result>

    <div class="result-success__content">
      <el-descriptions title="项目名称">
        <el-descriptions-item label="项目 ID">111222</el-descriptions-item>
        <el-descriptions-item label="负责人">Tony</el-descriptions-item>
        <el-descriptions-item label="生效时间">2016-12-12 ~ 2017-12-12</el-descriptions-item>
      </el-descriptions>

      <el-steps :active="1" finish-status="success" class="mt-8">
        <el-step title="创建项目">
          <template #description>
            <div>Tony</div>
            <p>2016-12-12 12:32</p>
          </template>
        </el-step>
        <el-step title="部门初审">
          <template #description>
            <p>Chad</p>
          </template>
        </el-step>
        <el-step title="财务复核" />
        <el-step title="完成" />
      </el-steps>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { ElResult, ElButton, ElDescriptions, ElDescriptionsItem, ElSteps, ElStep } from 'element-plus'

export default defineComponent({
  components: { ElResult, ElButton, ElDescriptions, ElDescriptionsItem, ElSteps, ElStep },
})
</script>

<style lang="scss" scoped>
.result-success {
  padding: 48px 32px;
  background-color: var(--background-primary-color);

  &__content {
    padding: 24px 40px;
    background-color: var(--background-main-color);

    .el-descriptions {
      --el-fill-color-blank: none;
    }
  }
}
</style>
