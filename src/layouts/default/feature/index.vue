<template>
  <LayoutLockPage />
  <ElBacktop v-if="getUseOpenBackTop" />
  <SettingDrawer v-if="getIsFixedSettingDrawer" />
  <SessionTimeoutLogin v-if="getIsSessionTimeout" />
</template>

<script lang="ts">
import { defineComponent, computed, unref } from 'vue'
import { ElBacktop } from 'element-plus'

import { useRootSetting } from '@/hooks/setting/useRootSetting'
import { useHeaderSetting } from '@/hooks/setting/useHeaderSetting'
import { useUserStoreWithOut } from '@/store/modules/user'
import { SettingButtonPositionEnum } from '@/enums/appEnum'
import { createAsyncComponent } from '@/utils/factory/createAsyncComponent'
import SessionTimeoutLogin from '@/views/sys/login/SessionTimeoutLogin.vue'

export default defineComponent({
  name: 'LayoutFeatures',
  components: {
    ElBacktop,
    LayoutLockPage: createAsyncComponent(() => import('@/views/sys/lock/index.vue')),
    SettingDrawer: createAsyncComponent(() => import('@/layouts/default/setting/index.vue')),
    SessionTimeoutLogin,
  },
  setup() {
    const { getUseOpenBackTop, getShowSettingButton, getSettingButtonPosition, getFullContent } = useRootSetting()
    const userStore = useUserStoreWithOut()
    const { getShowHeader } = useHeaderSetting()

    const getIsSessionTimeout = computed(() => userStore.getSessionTimeout)

    const getIsFixedSettingDrawer = computed(() => {
      if (!unref(getShowSettingButton)) {
        return false
      }
      const settingButtonPosition = unref(getSettingButtonPosition)

      if (settingButtonPosition === SettingButtonPositionEnum.AUTO) {
        return !unref(getShowHeader) || unref(getFullContent)
      }
      return settingButtonPosition === SettingButtonPositionEnum.FIXED
    })

    return {
      getUseOpenBackTop,
      getIsFixedSettingDrawer,
      getIsSessionTimeout,
    }
  },
})
</script>
