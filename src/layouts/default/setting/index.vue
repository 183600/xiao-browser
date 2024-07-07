<template>
  <div>
    <span style="width: 100%; text-align: center" @click="openDrawer(true)">
      <SvgIcon name="setting" />
    </span>
    <SettingDrawer @register="register" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import { SvgIcon } from '@/components/SvgIcon'
import { useDrawer } from '@/components/BasicDrawer'

import SettingDrawer from './SettingDrawer'

export default defineComponent({
  name: 'SettingButton',
  components: { SettingDrawer, SvgIcon },
  setup() {
    const [register, { openDrawer }] = useDrawer()

    return {
      register,
      openDrawer,
    }
  },
})
</script>

<style lang="scss">
.setting-drawer {
  .el-divider {
    --el-bg-color: var(--background-primary-color);
  }
}
</style>
