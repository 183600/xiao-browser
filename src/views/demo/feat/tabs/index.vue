<template>
  <PageWrapper title="标签页操作示例">
    <CollapseContainer title="在下面输入框输入文本,切换后回来内容会保存">
      <el-alert show-icon type="info" title="该操作不会影响页面标题，仅修改Tab标题" />
      <div class="mt-2 flex flex-grow-0">
        <el-button class="mr-2" @click="setTabTitle" type="primary">设置Tab标题</el-button>
        <el-input placeholder="请输入" v-model="title" class="mr-4 w-12" />
      </div>
    </CollapseContainer>

    <CollapseContainer class="mt-4" title="标签页操作">
      <el-button plain class="mr-2" @click="closeAll">关闭所有</el-button>
      <el-button plain class="mr-2" @click="closeLeft">关闭左侧</el-button>
      <el-button plain class="mr-2" @click="closeRight">关闭右侧</el-button>
      <el-button plain class="mr-2" @click="closeOther">关闭其他</el-button>
      <el-button plain class="mr-2" @click="closeCurrent">关闭当前</el-button>
      <el-button plain class="mr-2" @click="refreshPage">刷新当前</el-button>
    </CollapseContainer>
  </PageWrapper>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { ElInput, ElAlert, ElButton } from 'element-plus'
import { CollapseContainer } from '@/components/CollapseContainer'
import { useTabs } from '@/hooks/web/useTabs'
import { useMessage } from '@/hooks/web/useMessage'

export default defineComponent({
  name: 'TabsDemo',
  components: { ElInput, ElAlert, ElButton, CollapseContainer },
  setup() {
    const title = ref<string>('')
    const { closeAll, closeLeft, closeRight, closeOther, closeCurrent, refreshPage, setTitle } = useTabs()
    const { createMessage } = useMessage()
    function setTabTitle() {
      if (title.value) {
        setTitle(title.value)
      } else {
        createMessage.error('请输入要设置的Tab标题！')
      }
    }
    return {
      closeAll,
      closeLeft,
      closeRight,
      closeOther,
      closeCurrent,
      refreshPage,
      setTabTitle,
      title,
    }
  },
})
</script>
