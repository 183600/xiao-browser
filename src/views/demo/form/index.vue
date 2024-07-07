<template>
  <PageWrapper title="表单基础示例" contentFullHeight>
    <CollapseContainer title="基础示例">
      <BasicForm
        :labelWidth="200"
        :schemas="basicSchemas"
        :colProps="{ span: 16 }"
        :actionColProps="{ span: 16 }"
        @submit="handleSubmit"
        @reset="handleReset">
        <template #selectA="{ model, field }">
          <el-select
            multiple
            v-model:modelValue="model[field]"
            @change="valueSelectA = model[field]"
            clearable>
            <el-option
              v-for="item in optionsA"
              :key="item.value"
              :label="item.label"
              :disabled="item.disabled"
              :value="item.value" />
          </el-select>
        </template>
        <template #selectB="{ model, field }">
          <el-select
            :options="optionsB"
            multiple
            v-model:modelValue="model[field]"
            @change="valueSelectB = model[field]"
            clearable>
            <el-option
              v-for="item in optionsB"
              :key="item.value"
              :label="item.label"
              :disabled="item.disabled"
              :value="item.value" />
          </el-select>
        </template>

        <template #localSearch="{ model, field }">
          <ApiSelect
            :api="optionsListApi"
            filterable
            v-model:modelValue="model[field]"
            resultField="list"
            labelField="name"
            valueField="id" />
        </template>

        <template #remoteSearch="{ model, field }">
          <ApiSelect
            :api="optionsListApi"
            remote
            filterable
            v-model:modelValue="model[field]"
            resultField="list"
            labelField="name"
            valueField="id"
            :params="searchParams"
            :remote-method="handleRemoteSearch" />
        </template>
      </BasicForm>
    </CollapseContainer>
  </PageWrapper>
</template>

<script lang="ts">
import { computed, defineComponent, unref, ref } from 'vue'
import { ElSelect, ElOption } from 'element-plus'
import { BasicForm } from '@/components/BasicForm'
import { CollapseContainer } from '@/components/CollapseContainer'
import { useMessage } from '@/hooks/web/useMessage'
import { ApiSelect } from '@/components/ApiSelect'

import { optionsListApi } from '@/api/demo/select'
import { cloneDeep } from 'lodash-es'
import { basicSchemas } from './data'

const valueSelectA = ref<string[]>([])
const valueSelectB = ref<string[]>([])
const options = ref<Recordable[]>([])
for (let i = 1; i < 10; i++) options.value.push({ label: `选项${i}`, value: `${i}` })

const optionsA = computed(() => {
  return cloneDeep(unref(options)).map((op) => {
    op.disabled = unref(valueSelectB).indexOf(op.value) !== -1
    return op
  })
})

const optionsB = computed(() => {
  return cloneDeep(unref(options)).map((op) => {
    op.disabled = unref(valueSelectA).indexOf(op.value) !== -1
    return op
  })
})

export default defineComponent({
  components: { ElSelect, ElOption, BasicForm, CollapseContainer, ApiSelect },
  setup() {
    const { createMessage } = useMessage()
    const keyword = ref('')
    const searchParams = computed<Recordable>(() => {
      return { keyword: unref(keyword) }
    })

    function handleRemoteSearch(v: string) {
      if (v !== '') {
        keyword.value = v
      }
    }
    return {
      basicSchemas,
      optionsListApi,
      optionsA,
      optionsB,
      valueSelectA,
      valueSelectB,
      handleRemoteSearch,
      searchParams,
      handleReset: () => {
        keyword.value = ''
      },
      handleSubmit: () => {
        createMessage.success('submit success!')
      },
    }
  },
})
</script>
