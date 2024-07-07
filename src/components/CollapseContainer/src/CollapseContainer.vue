<template>
  <div :class="prefixCls">
    <div :class="`${prefixCls}__header`" v-if="title || $slots.title || $slots.action">
      <BasicTitle :helpMessage="helpMessage">
        <template v-if="title">{{ title }}</template>
        <template v-else><slot name="title"></slot></template>
      </BasicTitle>
      <div :class="`${prefixCls}__action`">
        <slot name="extra"></slot>
        <template v-if="canExpan">
          <SvgIcon @click="handleExpand" :name="show ? 'up' : 'down'" />
        </template>
      </div>
    </div>

    <div :class="`${prefixCls}__body`">
      <ExpandTransition v-if="canExpan">
        <ElSkeleton v-if="loading" />
        <div v-else v-show="show">
          <slot></slot>
        </div>
      </ExpandTransition>
      <template v-else>
        <ElSkeleton v-if="loading" />
        <div v-else v-show="show">
          <slot></slot>
        </div>
      </template>
    </div>
    <div :class="`${prefixCls}__footer`" v-if="$slots.footer">
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { ref, defineComponent } from 'vue'
import { ElSkeleton } from 'element-plus'

import { useDesign } from '@/hooks/web/useDesign'
import { ExpandTransition } from '@/components/Transition'
import { BasicTitle } from '@/components/Basic'
import { SvgIcon } from '@/components/SvgIcon'

import { basicProps } from './props'

export default defineComponent({
  name: 'CollapseContainer',
  components: { ElSkeleton, ExpandTransition, BasicTitle, SvgIcon },
  props: basicProps,
  emits: ['expand'],
  setup(_, { emit }) {
    const show = ref(true)

    const { prefixCls } = useDesign('collapse-container')

    function handleExpand() {
      show.value = !show.value
      emit('expand', show.value)
    }

    return {
      prefixCls,
      show,
      handleExpand,
    }
  },
})
</script>

<style lang="scss">
$prefix-cls: '#{$tonyname}-collapse-container';

.#{$prefix-cls} {
  background-color: var(--background-primary-color);
  border-radius: var(--radius-base);

  &__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 44px;
    padding: 0 12px;
    border-bottom: 1px solid var(--border-color-light);
  }

  &__body {
    padding: 16px;
  }

  &__footer {
    border-top: 1px solid var(--border-color);
  }

  &__action {
    display: flex;
    flex: 1;
    align-items: center;
    justify-content: flex-end;
  }
}
</style>
