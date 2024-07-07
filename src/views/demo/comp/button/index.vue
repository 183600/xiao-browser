<template>
  <PageWrapper contentFullHeight title="基础组件" description="基础组件依赖于element-plus,组件库已有的基础组件,项目中不会再次进行demo展示（二次封装组件除外）">
    <el-row :gutter="12">
      <el-col :span="24">
        <el-card class="box-card" shadow="hover">
          <template #header>
            <div class="card-header">basic button (custom components)</div>
          </template>
          <BasicButton preIcon="ep:element-plus">Default</BasicButton>
          <BasicButton type="primary" preIcon="ep:element-plus">Primary</BasicButton>

          <BasicButton sufIcon="ep:element-plus" type="success">Success</BasicButton>
          <BasicButton sufIcon="ep:element-plus" :iconSize="22" type="info">Large Icon</BasicButton>

          <BasicButton shadow>Shadow</BasicButton>
          <BasicButton shadow type="primary">Success</BasicButton>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card class="box-card" shadow="hover">
          <template #header>
            <div class="card-header">normal</div>
          </template>
          <el-button>Default</el-button>
          <el-button type="primary">Primary</el-button>
          <el-button type="success">Success</el-button>
          <el-button type="info">Info</el-button>
          <el-button type="warning">Warning</el-button>
          <el-button type="danger">Danger</el-button>
          <el-button>中文</el-button>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card class="box-card" shadow="hover">
          <template #header>
            <div class="card-header">plain</div>
          </template>
          <el-button plain>Default</el-button>
          <el-button type="primary" plain>Primary</el-button>
          <el-button type="success" plain>Success</el-button>
          <el-button type="info" plain>Info</el-button>
          <el-button type="warning" plain>Warning</el-button>
          <el-button type="danger" plain>Danger</el-button>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card class="box-card" shadow="hover">
          <template #header>
            <div class="card-header">round</div>
          </template>

          <el-button round>Default</el-button>
          <el-button type="primary" round>Primary</el-button>
          <el-button type="success" round>Success</el-button>
          <el-button type="info" round>Info</el-button>
          <el-button type="warning" round>Warning</el-button>
          <el-button type="danger" round>Danger</el-button>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card class="box-card" shadow="hover">
          <template #header>
            <div class="card-header">text</div>
          </template>

          <el-button text>Text ElButton</el-button>
          <el-button text disabled>Text ElButton</el-button>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card class="box-card" shadow="hover">
          <template #header>
            <div class="card-header">icon</div>
          </template>

          <el-button :icon="Search" circle />
          <el-button type="primary" :icon="Edit" circle />
          <el-button type="success" :icon="Check" circle />
          <el-button type="info" :icon="Message" circle />
          <el-button type="warning" :icon="Star" circle />
          <el-button type="danger" :icon="Delete" circle />
          <el-button type="primary" :icon="Search">Search</el-button>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card class="box-card" shadow="hover">
          <template #header>
            <div class="card-header">group</div>
          </template>

          <el-button-group>
            <el-button type="primary" :icon="ArrowLeft">Previous Page</el-button>
            <el-button type="primary" class="direction-rtl" :icon="ArrowRight">Next Page</el-button>
          </el-button-group>

          <el-button-group>
            <el-button type="primary" :icon="Edit" />
            <el-button type="primary" :icon="Share" />
            <el-button type="primary" :icon="Delete" />
          </el-button-group>
        </el-card>
      </el-col>
    </el-row>
    <el-row :gutter="12">
      <el-col :span="12">
        <el-card class="box-card" shadow="hover">
          <template #header>
            <div class="card-header">disabled</div>
          </template>

          <el-button disabled>Default</el-button>
          <el-button type="primary" disabled>Primary</el-button>
          <el-button type="success" disabled>Success</el-button>
          <el-button type="info" disabled>Info</el-button>
          <el-button type="warning" disabled>Warning</el-button>
          <el-button type="danger" disabled>Danger</el-button>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card class="box-card" shadow="hover">
          <template #header>
            <div class="card-header">disabled plain</div>
          </template>

          <el-button plain disabled>Default</el-button>
          <el-button type="primary" plain disabled>Primary</el-button>
          <el-button type="success" plain disabled>Success</el-button>
          <el-button type="info" plain disabled>Info</el-button>
          <el-button type="warning" plain disabled>Warning</el-button>
          <el-button type="danger" plain disabled>Danger</el-button>
        </el-card>
      </el-col>
    </el-row>
    <el-row :gutter="12">
      <el-col :span="12">
        <el-card class="box-card" shadow="hover">
          <template #header>
            <div class="card-header">loading</div>
          </template>

          <div class="flex">
            <el-button type="primary" :loading="true">Loading</el-button>
            <el-button type="primary" :loading="loading" @click="onLoading">Click Me</el-button>
          </div>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card class="box-card" shadow="hover">
          <template #header>
            <div class="card-header">sizes</div>
          </template>

          <el-button>Default</el-button>
          <el-button size="large">Large</el-button>
          <el-button size="small">Small</el-button>
          <el-button :icon="Search" circle />
          <el-button :icon="Search" size="large" circle />
          <el-button :icon="Search" size="small" circle />
        </el-card>
      </el-col>
    </el-row>
  </PageWrapper>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { ElRow, ElCol, ElCard, ElButton, ElButtonGroup } from 'element-plus'
import { Search, Edit, Check, Message, Star, Delete, ArrowLeft, Share, ArrowRight } from '@element-plus/icons-vue'

import { BasicButton } from '@/components/BasicButton'

export default defineComponent({
  components: { ElRow, ElCol, ElCard, ElButton, ElButtonGroup, BasicButton },
  setup() {
    const loading = ref(false)

    function onLoading() {
      loading.value = true
      setTimeout(() => {
        loading.value = false
      }, 3e3)
    }
    return {
      Search,
      Edit,
      Check,
      Message,
      Star,
      Delete,
      ArrowLeft,
      ArrowRight,
      Share,
      loading,
      onLoading,
    }
  },
})
</script>

<style scoped>
.el-row > .el-col {
  margin-bottom: 30px;
}

.el-button-group {
  margin-right: 15px;
}
</style>
