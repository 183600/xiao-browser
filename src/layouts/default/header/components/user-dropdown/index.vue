<template>
  <div>
    <ElDropdown @command="handleMenuClick">
      <div :class="prefixCls">
        <img :class="`${prefixCls}__avatar`" :src="getUserInfo.avatar" />
        <span :class="`${prefixCls}__name`">{{ getUserInfo.realName }}</span>
      </div>

      <template #dropdown>
        <ElDropdownMenu :class="`${prefixCls}-menulist`">
          <ElDropdownItem command="doc" v-if="getShowDoc">
            <SvgIcon class="mr-2" name="filetext" />
            <span>文档</span>
          </ElDropdownItem>
          <ElDropdownItem v-if="getUseLockPage" :divided="getShowDoc" command="lock">
            <SvgIcon class="mr-2" name="lock" />
            <span>锁定屏幕</span>
          </ElDropdownItem>
          <ElDropdownItem command="logout">
            <SvgIcon class="mr-2" name="poweroff" />
            <span>退出系统</span>
          </ElDropdownItem>
        </ElDropdownMenu>
      </template>
    </ElDropdown>
    <LockAction @register="register" />
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { ElDropdown, ElDropdownItem, ElDropdownMenu } from 'element-plus'

import { DOC_URL } from '@/settings/siteSetting'
import { useUserStore } from '@/store/modules/user'
import { useHeaderSetting } from '@/hooks/setting/useHeaderSetting'
import { useDesign } from '@/hooks/web/useDesign'
import { useModal } from '@/components/BasicModal'
import { openWindow } from '@/utils'
import { SvgIcon } from '@/components/SvgIcon'
import { createAsyncComponent } from '@/utils/factory/createAsyncComponent'

import headerImg from '@/assets/images/header.jpg'

export default defineComponent({
  name: 'UserDropdown',
  components: {
    ElDropdown,
    ElDropdownItem,
    ElDropdownMenu,
    LockAction: createAsyncComponent(() => import('../lock/LockModal.vue')),
    SvgIcon,
  },
  props: {
    itemClass: String,
  },
  setup() {
    const { prefixCls } = useDesign('header-user-dropdown')
    const { getShowDoc, getUseLockPage } = useHeaderSetting()
    const userStore = useUserStore()

    const getUserInfo = computed(() => {
      const { realName = '', avatar, desc } = userStore.getUserInfo || {}
      return { realName, avatar: avatar || headerImg, desc }
    })

    const [register, { openModal }] = useModal()

    function handleMenuClick(e: 'logout' | 'doc' | 'lock') {
      switch (e) {
      case 'logout':
        userStore.confirmLoginOut()
        break
      case 'doc':
        openWindow(DOC_URL)
        break
      case 'lock':
        openModal(true)
        break
      }
    }

    return {
      prefixCls,
      getUserInfo,
      handleMenuClick,
      getShowDoc,
      register,
      getUseLockPage,
    }
  },
})
</script>

<style lang="scss">
$prefix-cls: '#{$tonyname}-header-user-dropdown';

.#{$prefix-cls} {
  display: flex;
  align-items: center;
  width: 100%;
  height: 100%;
  padding: 0 0 0 10px;
  padding-right: 10px;
  overflow: hidden;
  font-size: 12px;
  color: var(--header-text-color);
  cursor: pointer;
  background-color: var(--header-background-color);

  &:hover {
    background-color: var(--header-background-hover-color);
  }

  img {
    width: 24px;
    height: 24px;
    margin-right: 12px;
  }

  &__avatar {
    border-radius: 50%;
  }

  &__name {
    font-size: 14px;
  }

  &-menulist {
    min-width: 160px;
  }
}
</style>
