<template>
  <PageWrapper title="登录过期示例" description="用户登录过期示例，不再跳转登录页，直接生成页面覆盖当前页面，方便保持过期前的用户状态！">
    <el-card>
      <template #header>
        <div>
          请点击下面的按钮访问测试接口(
          <span style="font-size: 60%; color: #666">所访问的接口会返回Token过期响应</span>
          )
        </div>
      </template>
      <el-button type="primary" plain @click="test1">HttpStatus == 401</el-button>
      <el-button class="ml-4" type="primary" @click="test2">Response.code == 401</el-button>
    </el-card>
  </PageWrapper>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { ElCard, ElButton } from 'element-plus'
import { useUserStore } from '@/store/modules/user'
import { sessionTimeoutApi, tokenExpiredApi } from '@/api/demo/account'

export default defineComponent({
  name: 'TestSessionTimeout',
  components: { ElCard, ElButton },
  setup() {
    const userStore = useUserStore()
    async function test1() {
      // 示例网站生产环境用的是假数据，不能返回Http状态码，
      // 所以在生产环境直接改变状态来达到测试效果
      if (import.meta.env.PROD) {
        userStore.setToken(undefined)
        userStore.setSessionTimeout(true)
      } else {
        // 这个api会返回状态码为401的响应
        await sessionTimeoutApi()
      }
    }

    async function test2() {
      // 这个api会返回code为401的json数据，Http状态码为200
      try {
        await tokenExpiredApi()
      } catch (err) {
        console.error('接口访问错误：', (err as Error).message || '错误')
      }
    }

    return { test1, test2 }
  },
})
</script>
