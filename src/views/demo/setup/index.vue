<template>
  <PageWrapper title="引导页" description="用于给用户的指引操作">
    <el-button type="primary" @click="handleStart">开始</el-button>
  </PageWrapper>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { ElButton } from 'element-plus'
import { useDesign } from '@/hooks/web/useDesign'
import intro from 'intro.js'
import 'intro.js/minified/introjs.min.css'

export default defineComponent({
  components: { ElButton },
  setup() {
    const { prefixVar } = useDesign('')

    function handleStart() {
      intro()
        .setOptions({
          steps: [
            {
              title: 'Welcome',
              intro: 'Hello World! 👋',
            },
            {
              title: 'Collapse Button',
              element: document.querySelector(`.${prefixVar}-layout-header-trigger`)!,
              intro: 'This is the menu collapse button.',
            },
            {
              title: 'User Action',
              element: document.querySelector(`.${prefixVar}-layout-header-action`)!,
              intro: 'This is the user function area.',
            },
          ],
        })
        .start()
    }
    return { handleStart }
  },
})
</script>
