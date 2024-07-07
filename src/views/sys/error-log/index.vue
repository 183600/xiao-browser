<template>
  <div class="p-4">
    <template v-for="src in imgList" :key="src">
      <img :src="src" v-show="false" />
    </template>
    <BasicTable @register="register" class="error-handle-table">
      <template #toolbar>
        <el-button @click="fireVueError" type="primary">点击触发vue错误</el-button>
        <el-button @click="fireResourceError" type="primary">点击触发资源加载错误</el-button>
        <el-button @click="fireAjaxError" type="primary">点击触发ajax错误</el-button>
      </template>
    </BasicTable>
  </div>
</template>

<script lang="ts" setup>
import { watch, ref, nextTick } from 'vue'
import { ElButton } from 'element-plus'
import { useMessage } from '@/hooks/web/useMessage'
import { useErrorLogStore } from '@/store/modules/errorLog'
import { fireErrorApi } from '@/api/demo/error'
import { getLogColumns } from './data'
import { BasicTable, useTable } from '@/components/BasicTable'
import { cloneDeep } from 'lodash-es'

const imgList = ref<string[]>([])

const errorLogStore = useErrorLogStore()
const [register, { setTableData }] = useTable({
  title: '错误日志列表',
  columns: getLogColumns(),
})

watch(
  () => errorLogStore.getErrorLogInfoList,
  (list) => {
    nextTick(() => {
      setTableData(cloneDeep(list))
    })
  },
  {
    immediate: true,
  },
)
const { createMessage } = useMessage()
if (import.meta.env.DEV) {
  createMessage.info('只在`/src/settings/projectSetting.ts` 内的useErrorHandle=true时生效')
}

function fireVueError() {
  throw new Error('fire vue error!')
}

function fireResourceError() {
  imgList.value.push(`${new Date().getTime()}.png`)
}

async function fireAjaxError() {
  await fireErrorApi()
}
</script>
