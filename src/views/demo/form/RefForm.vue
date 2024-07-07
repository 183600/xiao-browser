<template>
  <PageWrapper title="Ref操作示例">
    <div class="mb-4">
      <el-button @click="setFormProps({ labelWidth: 150 })">更改labelWidth</el-button>
      <el-button @click="setFormProps({ labelWidth: 120 })">还原labelWidth</el-button>
      <el-button @click="setFormProps({ size: 'large' })">更改Size</el-button>
      <el-button @click="setFormProps({ size: 'default' })">还原Size</el-button>
      <el-button @click="setFormProps({ disabled: true })">禁用表单</el-button>
      <el-button @click="setFormProps({ disabled: false })">解除禁用</el-button>
      <el-button @click="setFormProps({ actionColProps: { span: 8 } })">操作按钮位置</el-button>
    </div>
    <div class="mb-4">
      <el-button @click="setFormProps({ showActionButtonGroup: false })">隐藏操作按钮</el-button>
      <el-button @click="setFormProps({ showActionButtonGroup: true })">显示操作按钮</el-button>
      <el-button @click="setFormProps({ showResetButton: false })">隐藏重置按钮</el-button>
      <el-button @click="setFormProps({ showResetButton: true })">显示重置按钮</el-button>
      <el-button @click="setFormProps({ showSubmitButton: false })">隐藏查询按钮</el-button>
      <el-button @click="setFormProps({ showSubmitButton: true })">显示查询按钮</el-button>
      <el-button @click="setFormProps({ resetButtonOptions: { disabled: true, btnText: '重置New' } })">修改重置按钮</el-button>
      <el-button @click="setFormProps({ submitButtonOptions: { disabled: true, loading: true } })">修改查询按钮</el-button>
    </div>

    <CollapseContainer title="使用ref调用表单内部函数示例">
      <BasicForm
        :schemas="schemas"
        ref="formElRef"
        :labelWidth="100"
        @submit="handleSubmit"
        :actionColProps="{ span: 24 }" />
    </CollapseContainer>
  </PageWrapper>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { ElButton } from 'element-plus'
import { BasicForm, FormActionMethods, BasicFormProps } from '@/components/BasicForm'
import { CollapseContainer } from '@/components/CollapseContainer'
import { useMessage } from '@/hooks/web/useMessage'

import { UseSchemas as schemas } from './data'

export default defineComponent({
  components: { ElButton, BasicForm, CollapseContainer },
  setup() {
    const formElRef = ref<Nullable<FormActionMethods>>(null)
    const { createMessage } = useMessage()
    function handleSubmit(values: any) {
      createMessage.success(`click search,values:${JSON.stringify(values)}`)
    }
    function setFormProps(props: Partial<BasicFormProps>) {
      const formEl = formElRef.value
      if (!formEl) return
      formEl.setFormProps(props)
    }
    return {
      formElRef,
      schemas,
      handleSubmit,
      setFormProps,
    }
  },
})
</script>
