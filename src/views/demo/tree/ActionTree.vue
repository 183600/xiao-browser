<template>
  <PageWrapper title="Tree 函数示例" contentBackground>
    <div class="demo-tree-btns">
      <el-button @click="checkAll(true)">全选</el-button>
      <el-button @click="checkAll(false)">全不选</el-button>

      <el-button @click="expandAll(true)">展开全部</el-button>
      <el-button @click="expandAll(false)">折叠全部</el-button>

      <el-button @click="handleLevel(2, true)">显示第2级</el-button>
      <el-button @click="handleLevel(2, false)">隐藏第2级</el-button>

      <el-button @click="handleSetExpandData(true)">展开1-1-1节点数据</el-button>
      <el-button @click="handleSetExpandData(false)">折叠1-1-1节点数据</el-button>
    </div>
    <div class="demo-tree-btns">
      <el-button @click="handleSetCheckData">设置勾选数据</el-button>
      <el-button @click="handleGetCheckData">获取勾选数据</el-button>

      <el-button @click="handleSetNodeData">设置节点数据</el-button>
      <el-button @click="handleGetNodeData">获取节点数据</el-button>
    </div>
    <div class="demo-tree-btns">
      <el-button @click="appendNodeByKey">在0-0-0内添加子节点</el-button>
      <el-button @click="insertNodeByKey('before')">在0-0-0前添加节点</el-button>
      <el-button @click="insertNodeByKey('after')">在0-0-0后添加节点</el-button>
      <el-button @click="updateNodeByKey">更新0-0-0子节点数据</el-button>
      <el-button @click="deleteNodeByKey">删除2-2-0节点</el-button>
    </div>
    <div class="demo-tree-btns">
      <el-input class="mb-2" v-model="filterTreeNodeKey" placeholder="请输入筛选内容" />
    </div>
    <el-card header="函数操作">
      <el-tree
        :data="treeData"
        ref="treeRef"
        node-key="key"
        default-expand-all
        check-on-click-node
        :filter-node-method="filterNode"
        show-checkbox />
    </el-card>
  </PageWrapper>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, unref, watch } from 'vue'
import { ElButton, ElInput, ElCard, ElTree } from 'element-plus'

import { useMessage } from '@/hooks/web/useMessage'

import { treeData } from './data'

type ElTreeType = InstanceType<typeof ElTree>

export default defineComponent({
  components: { ElButton, ElInput, ElCard, ElTree },
  setup() {
    const treeRef = ref<Nullable<ElTreeType>>(null)
    const { createMessage } = useMessage()
    const filterTreeNodeKey = ref('')

    watch(
      () => filterTreeNodeKey.value,
      (v: string) => {
        getTree().filter(v)
      },
    )

    function getTree() {
      const tree = unref(treeRef)
      if (!tree) {
        throw new Error('tree is null!')
      }
      return tree
    }

    function checkAll(checked: boolean) {
      setAllTreeNodes('checked', checked)
    }

    function expandAll(checked: boolean) {
      setAllTreeNodes('expanded', checked)
    }

    function handleLevel(level: number, boo: boolean) {
      const nodes = getTree().store._getAllNodes()
      for (let i = 0; i < nodes.length; i++) {
        if (nodes[i].level === level) {
          nodes[i].visible = boo
        }
      }
    }

    function handleSetCheckData() {
      getTree().setCheckedKeys(['0-0-0-1'], false)
    }

    function handleGetCheckData() {
      // 注意： tree 的 node-key 是必须要填写的，否则会得到 [undefined,undefined] 的数组
      const keys = getTree().getCheckedKeys(false)
      createMessage.success(JSON.stringify(keys))
    }

    function handleSetNodeData() {
      const treeNode = reactive([
        { label: 'leaf 0-0-0-1', key: '0-0-0-1' },
        { label: 'leaf 1-1-1', key: '1-1-1' },
      ])
      getTree().setCheckedNodes(treeNode as any, false)
    }

    function handleGetNodeData() {
      const keys = getTree().getCheckedNodes(true, true)
      createMessage.success(JSON.stringify(keys))
    }

    function handleSetExpandData(boo: boolean) {
      expandTreeNode('1-1-1-1', boo)
    }

    function appendNodeByKey() {
      const treeNode = { label: 'leaf 0-0-0-1 inert', key: '0-0-0-1' }

      getTree().append(treeNode, '0-0-0')
    }

    function insertNodeByKey(position: 'before' | 'after') {
      const treeNode = { label: `leaf 0-0-0-${position}`, key: `0-0-0-${position}` }

      if (position === 'before') {
        getTree().insertBefore(treeNode, '0-0-0')
      } else {
        getTree().insertAfter(treeNode, '0-0-0')
      }
    }

    function deleteNodeByKey() {
      getTree().remove(['2-2-0'])
    }

    function updateNodeByKey() {
      const treeNode = reactive([
        { label: 'leaf 0-0-0-1 new', key: '0-0-0-1' },
        { label: 'leaf 0-0-0-2 new', key: '0-0-0-2' },
      ])
      getTree().updateKeyChildren('0-0-0', treeNode)
    }

    function filterNode(v, data) {
      if (!v) return true
      return data.label.indexOf(v) !== -1
    }

    function expandTreeNode(expandKey: string | number, checked: boolean, nodeKeyName = 'key') {
      const nodes = getAllTreeNodes()
      for (let i = 0; i < nodes.length; i++) {
        if (nodes[i]?.data[nodeKeyName] === expandKey) {
          _expandParentNode(nodes[i], checked)
          break
        }
      }
    }

    function _expandParentNode(node, checked: boolean) {
      node.expanded = checked
      if (node.parent) {
        _expandParentNode(node.parent, checked)
      }
    }

    function getAllTreeNodes() {
      const nodes = getTree().store._getAllNodes()
      if (!nodes?.length) {
        return []
      }
      return nodes
    }

    function setAllTreeNodes(nodeStoreName, checked: boolean) {
      const nodes = getAllTreeNodes()
      for (let i = 0; i < nodes.length; i++) {
        nodes[i][nodeStoreName] = checked
      }
    }

    return {
      treeData,
      treeRef,
      filterTreeNodeKey,
      handleLevel,
      handleSetCheckData,
      handleGetCheckData,
      handleSetNodeData,
      handleGetNodeData,
      handleSetExpandData,
      appendNodeByKey,
      insertNodeByKey,
      deleteNodeByKey,
      updateNodeByKey,
      filterNode,
      checkAll,
      expandAll,
    }
  },
})
</script>

<style lang="scss" scoped>
.demo-tree-btns {
  > button {
    margin: 0 16px 12px;
  }
}
</style>
