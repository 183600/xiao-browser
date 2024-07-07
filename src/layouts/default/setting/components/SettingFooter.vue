<template>
  <div :class="prefixCls">
    <ElButton type="primary" @click="handleCopy">
      <SvgIcon name="copy" class="mr-1" />
      <span>拷贝</span>
    </ElButton>

    <ElButton type="warning" @click="handleResetSetting" class="my-3">
      <SvgIcon name="reload" class="mr-1" />
      <span>重置</span>
    </ElButton>

    <ElButton type="danger" @click="handleClearAndRedo">
      <SvgIcon name="poweroff" class="mr-1" />
      <span>清空缓存并返回登录页</span>
    </ElButton>
  </div>
</template>

<script lang="ts">
import { defineComponent, unref } from 'vue'
import { ElButton } from 'element-plus'

import { useAppStore } from '@/store/modules/app'
import { usePermissionStore } from '@/store/modules/permission'
import { useMultipleTabStore } from '@/store/modules/multipleTab'
import { useUserStore } from '@/store/modules/user'
import { useDesign } from '@/hooks/web/useDesign'
import { useMessage } from '@/hooks/web/useMessage'
import { useCopyToClipboard } from '@/hooks/web/useCopyToClipboard'
import { updateHeaderColor, updateSidebarColor, updateColorWeak, updateGrayMode, changeTheme, toggleDarkMode } from '@/logics/theme'
import defaultSetting from '@/settings/projectSetting'
import { primaryColor } from '@/settings/designSetting'
import { SvgIcon } from '@/components/SvgIcon'

export default defineComponent({
  name: 'SettingFooter',
  components: { ElButton, SvgIcon },
  setup() {
    const permissionStore = usePermissionStore()
    const { prefixCls } = useDesign('setting-footer')
    const { createSuccessModal, createMessage } = useMessage()
    const tabStore = useMultipleTabStore()
    const userStore = useUserStore()
    const appStore = useAppStore()

    function handleCopy() {
      const { isSuccessRef } = useCopyToClipboard(`...${JSON.stringify(unref(appStore.getProjectConfig), null, 2)}`)
      unref(isSuccessRef) &&
        createSuccessModal({
          title: '操作成功',
          message: '复制配置成功,请到 src/settings/projectSetting.ts 中的 /* do something */ 粘贴替换！',
        })
    }
    function handleResetSetting() {
      try {
        appStore.setProjectConfig(defaultSetting)
        const { colorWeak, grayMode, headerSetting, menuSetting } = defaultSetting
        toggleDarkMode(false)
        updateColorWeak(colorWeak)
        updateGrayMode(grayMode)
        updateHeaderColor(headerSetting.bgColor)
        updateSidebarColor(menuSetting.bgColor)
        changeTheme(primaryColor)
        createMessage.success('重置成功！')
      } catch (error) {
        createMessage.error(error as string)
      }
    }

    function handleClearAndRedo() {
      localStorage.clear()
      appStore.resetAllState()
      permissionStore.resetState()
      tabStore.resetState()
      userStore.resetState()
      location.reload()
    }
    return {
      prefixCls,
      handleCopy,
      handleResetSetting,
      handleClearAndRedo,
    }
  },
})
</script>

<style lang="scss" scoped>
$prefix-cls: '#{$tonyname}-setting-footer';

.#{$prefix-cls} {
  display: flex;
  align-items: center;
  height: 100%;
  margin: 0;

  > .el-button {
    flex: 1;
    margin: 0 12px;
    border-radius: 4px;

    svg {
      width: 1em;
      height: 1em;
      color: #fff;
    }
  }
}
</style>
