<template>
  <PageWrapper title="Tree 基础示例" description="未做封装，仅对 Element ElTree 官方组件进行演示">
    <el-row :gutter="16">
      <el-col :span="8">
        <el-card header="基础示例，默认展开第一层">
          <el-tree :data="treeData" node-key="key" :default-expanded-keys="['0-0', '1-1', '2-2']" />
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card header="可勾选，默认全部展开">
          <el-tree
            :data="treeData"
            node-key="key"
            show-checkbox
            defaultExpandAll
            @check-change="handleCheck" />
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card header="指定默认展开/勾选示例">
          <el-tree
            :data="treeData"
            node-key="key"
            show-checkbox
            :default-expanded-keys="['0-0']"
            :default-checked-keys="['0-0']" />
        </el-card>
      </el-col>
      <el-col :span="8" class="mt-4">
        <el-card header="懒加载异步树">
          <el-tree
            ref="asyncTreeRef"
            :data="ajaxTree"
            :props="ajaxProps"
            node-key="key"
            lazy
            :load="onLoadData" />
        </el-card>
      </el-col>
      <el-col :span="16" class="mt-4">
        <el-card>
          <template #header>
            <div>
              <span>异步数据，默认展开</span>
              <el-button @click="loadTreeData" class="ml-6" :loading="treeLoading">加载数据</el-button>
            </div>
          </template>
          <el-tree
            ref="asyncExpandTreeRef"
            v-loading="treeLoading"
            :default-expand-all="asyncTreeExpand"
            :data="asyncTreeData" />
        </el-card>
      </el-col>
    </el-row>
  </PageWrapper>
</template>

<script lang="ts">
import { defineComponent, nextTick, reactive, ref } from 'vue'
import { ElRow, ElCol, ElCard, ElTree, ElButton, ElLoading } from 'element-plus'
import { treeData } from './data'

export default defineComponent({
  components: { ElRow, ElCol, ElCard, ElTree, ElButton },
  directives: {
    loading: ElLoading.directive,
  },
  setup() {
    const asyncTreeRef = ref(null)
    const asyncExpandTreeRef = ref(null)
    const asyncTreeData = ref([])
    const treeLoading = ref(false)
    const asyncTreeExpand = ref(false)

    const ajaxProps = reactive({
      children: 'children',
      label: 'title',
    })

    const ajaxTree = reactive([
      {
        title: 'parent ',
        key: '0-0',
      },
    ])

    function handleCheck() {
      // do something
    }

    function loadTreeData() {
      treeLoading.value = true
      // 以下是模拟异步获取数据
      setTimeout(() => {
        // 设置数据源
        asyncTreeData.value = JSON.parse(JSON.stringify(treeData))
        treeLoading.value = false
        // 展开全部
        nextTick(() => {
          asyncTreeExpand.value = true
        })
      }, 2000)
    }

    function onLoadData(node, resolve) {
      if (node.level === 0) {
        return resolve(ajaxTree)
      }
      if (node.level > 1) {
        if (node.data.leaf || node.level > 5) {
          return resolve([])
        } else {
          return resolve([
            {
              title: `zone${node.data.key}`,
              key: `${node.data.key}-1`,
            },
          ])
        }
      }

      setTimeout(() => {
        const data = reactive([
          {
            title: 'leaf',
            key: '1-1',
            leaf: true,
          },
          {
            title: 'zone',
            key: '2-2',
          },
        ])

        resolve(data)
      }, 500)
    }
    return {
      treeData,
      ajaxProps,
      ajaxTree,
      handleCheck,
      onLoadData,
      asyncTreeRef,
      asyncExpandTreeRef,
      asyncTreeData,
      asyncTreeExpand,
      loadTreeData,
      treeLoading,
    }
  },
})
</script>

<style lang="scss" scoped>
.el-card {
  height: 100%;
}
</style>
