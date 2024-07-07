<template>
  <div class="m-5 result-error">
    <el-result icon="error" title="提交失败" sub-title="请核对并修改以下信息后，再重新提交。">
      <template #extra>
        <el-button type="primary">返回修改</el-button>
      </template>
    </el-result>

    <div class="result-error__content">
      <div class="result-error__content-title">您提交的内容有如下错误：</div>
      <div class="result-error__content-item">
        <SvgIcon name="close" class="result-error__content-icon" />
        您的账户已被冻结
        <el-link class="ml-4">立即解冻 ></el-link>
      </div>
      <div class="result-error__content-item">
        <SvgIcon name="close" class="result-error__content-icon" />
        您的账户还不具备申请资格
        <el-link class="ml-4">立即解冻 ></el-link>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { ElResult, ElButton, ElLink } from 'element-plus'

import { SvgIcon } from '@/components/SvgIcon'

export default defineComponent({
  components: { ElResult, ElButton, ElLink, SvgIcon },
})
</script>

<style lang="scss" scoped>
.result-error {
  padding: 48px 32px;
  font-size: 14px;
  background-color: var(--background-primary-color);

  &__content {
    padding: 24px 40px;
    background-color: var(--background-main-color);

    &-title {
      margin-bottom: 16px;
      font-size: 16px;
      font-weight: 500;
    }

    &-item {
      display: flex;
      align-items: center;
      margin-bottom: 16px;
    }

    &-icon {
      margin-right: 8px;
    }

    .el-descriptions {
      --el-fill-color-blank: none;
    }
  }
}
</style>
