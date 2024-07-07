<template>
  <PageWrapper title="带参数菜单（路由）" description="支持多级参数">
    当前参数：{{ params }}
    <br />
    输入参数切换路由：
    <el-input v-model="value" placeholder="建议为url标准字符，输入后点击切换" />
    <el-button type="primary" @click="handleClickGo">切换路由</el-button>
    <br />
    切换路由后
    <ul>
      <li>可刷新页面测试路由参数情况是否正常。</li>
      <li>可于左侧菜单中展开子菜单，点击测试参数是否携带正常。</li>
    </ul>
  </PageWrapper>
</template>

<script lang="ts">
import { computed, defineComponent, ref, unref } from 'vue'
import { ElButton, ElInput } from 'element-plus'
import { useRouter } from 'vue-router'

export default defineComponent({
  name: 'TestMenu',
  components: { ElButton, ElInput },
  setup() {
    const { currentRoute, replace } = useRouter()
    const value = ref<string>('')

    const handleClickGo = () => {
      const { name } = unref(currentRoute)
      replace({ name: name!, params: { id: unref(value) } })
    }
    return {
      value,
      handleClickGo,
      params: computed(() => {
        return unref(currentRoute).params
      }),
    }
  },
})
</script>
