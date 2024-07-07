<template>
  <PageWrapper
    title="前端权限示例"
    contentBackground
    description="由于刷新的时候会请求用户信息接口，会根据接口重置角色信息，所以刷新后界面会恢复原样，如果不需要，可以注释 src/layout/default/index内的获取用户信息接口">
    <CurrentPermissionMode />

    <p>
      当前角色:
      <span>{{ userStore.getRoleList }}</span>
    </p>
    <el-alert
      class="mt-4"
      type="info"
      title="点击后请查看左侧菜单变化"
      show-icon />

    <div class="mt-4">
      权限切换:
      <el-button-group>
        <el-button @click="changeRole(RoleEnum.ADMIN)" :type="isAdmin ? 'primary' : 'default'">
          {{ RoleEnum.ADMIN }}
        </el-button>
        <el-button @click="changeRole(RoleEnum.TEST)" :type="isTest ? 'primary' : 'default'">
          {{ RoleEnum.TEST }}
        </el-button>
      </el-button-group>
      <el-alert
        class="mt-4"
        type="info"
        title="请先切换权限模式为前端角色权限模式"
        show-icon />
    </div>
  </PageWrapper>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import { ElButton, ElAlert, ElButtonGroup } from 'element-plus'
import CurrentPermissionMode from '../CurrentPermissionMode.vue'
import { useUserStore } from '@/store/modules/user'
import { RoleEnum } from '@/enums/roleEnum'
import { usePermission } from '@/hooks/web/usePermission'

export default defineComponent({
  components: { ElButton, ElAlert, ElButtonGroup, CurrentPermissionMode },
  setup() {
    const { changeRole } = usePermission()
    const userStore = useUserStore()

    return {
      userStore,
      RoleEnum,
      isAdmin: computed(() => userStore.getRoleList.includes(RoleEnum.ADMIN)),
      isTest: computed(() => userStore.getRoleList.includes(RoleEnum.TEST)),
      changeRole,
    }
  },
})
</script>
