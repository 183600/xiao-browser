<template>
  <div :class="prefixCls" @click="goHome">
    <img src="@/assets/images/logo.png" />
    <span v-show="showTitle">{{ title }}</span>
  </div>
</template>

<script lang="ts" setup>
import { useGlobSetting } from '@/hooks/setting'
import { useGo } from '@/hooks/web/usePage'
import { useDesign } from '@/hooks/web/useDesign'
import { PageEnum } from '@/enums/pageEnum'
import { useUserStore } from '@/store/modules/user'

defineProps({
  /**
   * Whether to show title
   */
  showTitle: { type: Boolean, default: true },
})

const { prefixCls } = useDesign('app-logo')
const userStore = useUserStore()
const { title } = useGlobSetting()
const go = useGo()

function goHome() {
  go(userStore.getUserInfo.homePath || PageEnum.BASE_HOME)
}
</script>

<style lang="scss">
$prefix-cls: '#{$tonyname}-app-logo';

.#{$prefix-cls} {
  display: flex;
  align-items: center;
  font-family: var(--font-family-logo);
  font-size: 32px;
  font-weight: 600;
  cursor: pointer;

  > img {
    width: 32px;
    min-height: 32px;
  }

  > span {
    margin-left: 16px;
  }
}
</style>
