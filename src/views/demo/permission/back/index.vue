<template>
  <PageWrapper title="后台权限示例" contentBackground>
    <CurrentPermissionMode />

    <el-alert
      class="mt-4"
      type="info"
      title="点击后请查看左侧菜单变化"
      show-icon />

    <div class="mt-4">
      权限切换:
      <el-button-group>
        <el-button @click="switchToken(1)" :disabled="!isBackPremissionMode">获取用户id为1的菜单</el-button>
        <el-button @click="switchToken(2)" :disabled="!isBackPremissionMode">获取用户id为2的菜单</el-button>
      </el-button-group>

      <el-alert
        class="mt-4"
        type="info"
        title="请先切换权限模式为后台权限模式"
        show-icon />
    </div>
  </PageWrapper>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { ElButton, ElAlert, ElButtonGroup } from 'element-plus'
import CurrentPermissionMode from '../CurrentPermissionMode.vue'
import { RoleEnum } from '@/enums/roleEnum'
import { usePermission } from '@/hooks/web/usePermission'
import { useUserStore } from '@/store/modules/user'
import { PermissionModeEnum } from '@/enums/appEnum'
import { useAppStore } from '@/store/modules/app'

export default defineComponent({
  components: { ElButton, ElAlert, ElButtonGroup, CurrentPermissionMode },
  setup() {
    const { refreshMenu } = usePermission()
    const userStore = useUserStore()
    const appStore = useAppStore()

    const isBackPremissionMode = computed(() => appStore.getProjectConfig.permissionMode === PermissionModeEnum.BACK)

    async function switchToken(userId: number) {
      // 本函数切换用户登录Token的部分仅用于演示，实际生产时切换身份应当重新登录
      const token = `fakeToken${userId}`
      userStore.setToken(token)

      // 重新获取用户信息和菜单
      userStore.getUserInfoAction()
      refreshMenu()
    }

    return {
      RoleEnum,
      refreshMenu,
      switchToken,
      isBackPremissionMode,
    }
  },
})
</script>
