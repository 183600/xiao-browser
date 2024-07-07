<template>
  <PageWrapper
    title="前端权限按钮示例"
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
      title="点击后请查看按钮变化"
      show-icon />

    <div class="mt-4">
      权限切换(请先切换权限模式为前端角色权限模式):
      <el-button-group>
        <el-button @click="changeRole(RoleEnum.ADMIN)" :type="isAdmin ? 'primary' : 'default'">
          {{ RoleEnum.ADMIN }}
        </el-button>
        <el-button @click="changeRole(RoleEnum.TEST)" :type="isTest ? 'primary' : 'default'">
          {{ RoleEnum.TEST }}
        </el-button>
      </el-button-group>
    </div>
    <el-divider>组件方式判断权限(有需要可以自行全局注册)</el-divider>
    <Authority :value="RoleEnum.ADMIN">
      <el-button type="primary" class="mx-4">拥有admin角色权限可见</el-button>
    </Authority>

    <Authority :value="RoleEnum.TEST">
      <el-button type="success" class="mx-4">拥有test角色权限可见</el-button>
    </Authority>

    <Authority :value="[RoleEnum.TEST, RoleEnum.ADMIN]">
      <el-button type="danger" class="mx-4">拥有[test,admin]角色权限可见</el-button>
    </Authority>

    <el-divider>函数方式方式判断权限(适用于函数内部过滤)</el-divider>
    <el-button v-if="hasPermission(RoleEnum.ADMIN)" type="primary" class="mx-4">拥有admin角色权限可见</el-button>

    <el-button v-if="hasPermission(RoleEnum.TEST)" type="success" class="mx-4">拥有test角色权限可见</el-button>

    <el-button v-if="hasPermission([RoleEnum.TEST, RoleEnum.ADMIN])" type="danger" class="mx-4">拥有[test,admin]角色权限可见</el-button>

    <el-divider>指令方式方式判断权限(该方式不能动态修改权限.)</el-divider>
    <el-button v-auth="RoleEnum.ADMIN" type="primary" class="mx-4">拥有admin角色权限可见</el-button>

    <el-button v-auth="RoleEnum.TEST" type="success" class="mx-4">拥有test角色权限可见</el-button>

    <el-button v-auth="[RoleEnum.TEST, RoleEnum.ADMIN]" type="danger" class="mx-4">拥有[test,admin]角色权限可见</el-button>
  </PageWrapper>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import { ElButton, ElDivider, ElButtonGroup, ElAlert } from 'element-plus'
import CurrentPermissionMode from '../CurrentPermissionMode.vue'
import { useUserStore } from '@/store/modules/user'
import { RoleEnum } from '@/enums/roleEnum'
import { usePermission } from '@/hooks/web/usePermission'
import { Authority } from '@/components/Authority'

export default defineComponent({
  components: { ElButton, ElDivider, ElButtonGroup, ElAlert, CurrentPermissionMode, Authority },
  setup() {
    const { changeRole, hasPermission } = usePermission()
    const userStore = useUserStore()

    return {
      userStore,
      RoleEnum,
      isAdmin: computed(() => userStore.getRoleList.includes(RoleEnum.ADMIN)),
      isTest: computed(() => userStore.getRoleList.includes(RoleEnum.TEST)),
      changeRole,
      hasPermission,
    }
  },
})
</script>

<style lang="scss" scoped>
.el-divider {
  --el-bg-color: var(--background-primary-color);
}
</style>
