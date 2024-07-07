<template>
  <ElButton v-bind="getBindValues" :class="getButtonClass" @click="onClick">
    <template #default="data">
      <div :class="`${prefixCls}__inner`">
        <Icon :name="preIcon" v-if="preIcon" :size="iconSize" />
        <slot v-bind="data || {}"></slot>
        <Icon :name="sufIcon" v-if="sufIcon" :size="iconSize" />
      </div>
    </template>
  </ElButton>
</template>

<script lang="ts">
import type { EleButton } from '@/components/ElementPlus'

import { computed, unref, defineComponent } from 'vue'
import { ElButton } from 'element-plus'

import { Icon } from '@/components/Icon'
import { useDesign } from '@/hooks/web/useDesign'

import { basicProps, customProps } from './props'
import { omit } from 'lodash-es'

export default defineComponent({
  name: 'BasicButton',
  components: { Icon, ElButton },
  props: basicProps,
  setup(props, { attrs }) {
    const { prefixCls } = useDesign('basic-button')

    const getButtonClass = computed(() => {
      const { disabled, shadow } = props
      return [
        prefixCls,
        {
          [`is-disabled`]: disabled,
          [`is-shadow`]: shadow,
        },
      ]
    })

    const getBindValues = computed(() => {
      const opts = { ...props, ...unref(attrs) }
      // 绑定组件Porps前，移除自定义附加项
      // Before binding component Porps, remove custom add-ons
      const customOpts = Object.keys(customProps)

      return omit(opts, customOpts) as EleButton
    })

    return {
      prefixCls,
      getButtonClass,
      getBindValues,
    }
  },
})
</script>

<style lang="scss">
$prefix-cls: '#{$tonyname}-basic-button';

.#{$prefix-cls} {
  &__inner {
    display: inline-flex;
    align-items: center;
    justify-content: center;

    > .eleicon {
      &:first-child {
        margin-right: 4px;
      }

      &:last-child {
        margin-left: 4px;
      }
    }
  }

  &.is-shadow {
    box-shadow: 0 6px 7px -1px rgba(80, 86, 175, 0.3);
  }
}
</style>
