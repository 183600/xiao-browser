<template>
  <PageWrapper contentBackground title="按钮权限控制" description="必须处于后台权限模式才可测试此页面所展示的功能">
    <CurrentPermissionMode />
    <p>
      当前拥有的code列表:
      <span>{{ permissionStore.getPermCodeList }}</span>
    </p>
    <el-divider />
    <el-alert
      class="mt-4"
      type="info"
      title="点击后请查看按钮变化"
      show-icon />
    <el-divider />
    <el-button
      type="primary"
      class="mr-2"
      @click="switchToken(2)"
      :disabled="!isBackPremissionMode">点击切换按钮权限(用户id为2)</el-button>
    <el-button type="primary" @click="switchToken(1)" :disabled="!isBackPremissionMode">点击切换按钮权限(用户id为1,默认)</el-button>

    <template v-if="isBackPremissionMode">
      <el-divider>组件方式判断权限</el-divider>
      <Authority :value="'1000'">
        <el-button type="primary" class="mx-4">拥有code ['1000']权限可见</el-button>
      </Authority>

      <Authority :value="'2000'">
        <el-button color="success" class="mx-4">拥有code ['2000']权限可见</el-button>
      </Authority>

      <Authority :value="['1000', '2000']">
        <el-button color="error" class="mx-4">拥有code ['1000','2000']角色权限可见</el-button>
      </Authority>

      <el-divider>函数方式方式判断权限</el-divider>
      <el-button v-if="hasPermission('1000')" type="primary" class="mx-4">拥有code ['1000']权限可见</el-button>

      <el-button v-if="hasPermission('2000')" color="success" class="mx-4">拥有code ['2000']权限可见</el-button>

      <el-button v-if="hasPermission(['1000', '2000'])" color="error" class="mx-4">拥有code ['1000','2000']角色权限可见</el-button>

      <el-divider>指令方式方式判断权限(该方式不能动态修改权限.)</el-divider>
      <el-button v-auth="'1000'" type="primary" class="mx-4">拥有code ['1000']权限可见</el-button>

      <el-button v-auth="'2000'" color="success" class="mx-4">拥有code ['2000']权限可见</el-button>

      <el-button v-auth="['1000', '2000']" color="error" class="mx-4">拥有code ['1000','2000']角色权限可见</el-button>
    </template>
  </PageWrapper>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { ElButton, ElDivider } from 'element-plus'
import CurrentPermissionMode from '../CurrentPermissionMode.vue'
import { usePermission } from '@/hooks/web/usePermission'
import { Authority } from '@/components/Authority'
import { usePermissionStore } from '@/store/modules/permission'
import { PermissionModeEnum } from '@/enums/appEnum'
import { useAppStore } from '@/store/modules/app'
import { useUserStore } from '@/store/modules/user'

export default defineComponent({
  components: { ElButton, ElDivider, CurrentPermissionMode, Authority },
  setup() {
    const { hasPermission } = usePermission()
    const permissionStore = usePermissionStore()
    const appStore = useAppStore()
    const userStore = useUserStore()

    const isBackPremissionMode = computed(() => appStore.getProjectConfig.permissionMode === PermissionModeEnum.BACK)

    async function switchToken(userId: number) {
      // 本函数切换用户登录Token的部分仅用于演示，实际生产时切换身份应当重新登录
      const token = `fakeToken${userId}`
      userStore.setToken(token)

      // 重新获取用户信息和菜单
      userStore.getUserInfoAction()
      permissionStore.changePermissionCode()
    }

    return {
      hasPermission,
      permissionStore,
      switchToken,
      isBackPremissionMode,
    }
  },
})
</script>

<style lang="scss" scoped>
.el-divider {
  --el-bg-color: var(--background-primary-color);
}
</style>
