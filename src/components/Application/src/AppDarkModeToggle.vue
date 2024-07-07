<template>
  <div v-if="getShowDarkModeToggle" :class="getClass" @click="toggleDark">
    <div :class="`${prefixCls}-inner`"></div>
    <SvgIcon name="sun" />
    <SvgIcon name="moon" />
  </div>
</template>

<script lang="ts" setup>
import { computed, unref } from 'vue'

import { SvgIcon } from '@/components/SvgIcon'
import { useDesign } from '@/hooks/web/useDesign'
import { useRootSetting } from '@/hooks/setting/useRootSetting'
import { updateHeaderColor, updateSidebarColor, toggleDarkMode, isDark } from '@/logics/theme'

const { prefixCls } = useDesign('dark-switch')
const { getShowDarkModeToggle } = useRootSetting()

const getClass = computed(() => [
  prefixCls,
  {
    [`${prefixCls}--dark`]: unref(isDark),
  },
])

function toggleDark() {
  toggleDarkMode()

  updateHeaderColor()
  updateSidebarColor()
}
</script>

<style lang="scss">
$prefix-cls: '#{$tonyname}-dark-switch';

.#{$prefix-cls} {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 50px;
  height: 26px;
  padding: 0 6px;
  margin-left: auto;
  color: var(--text-primary-reverse);
  cursor: pointer;
  background-color: var(--text-primary-color);
  border-radius: 30px;

  &-inner {
    position: absolute;
    z-index: 1;
    width: 18px;
    height: 18px;
    background-color: var(--text-primary-reverse);
    border-radius: 50%;
    transition: transform 0.5s, background-color 0.5s;
    will-change: transform;
  }

  &--dark {
    border: 1px solid #c4bcbc;

    .#{$prefix-cls}-inner {
      background-color: var(--text-primary-reverse);
      transform: translateX(calc(100% + 2px));
    }
  }
}
</style>
