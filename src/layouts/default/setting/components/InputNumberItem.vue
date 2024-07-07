<template>
  <div :class="prefixCls">
    <span>{{ title }}</span>
    <div>
      <ElInputNumber
        v-bind="getBindValue"
        size="small"
        :class="`${prefixCls}-input-number`"
        @change="handleChange" />
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from 'vue'
import { ElInputNumber } from 'element-plus'

import { useDesign } from '@/hooks/web/useDesign'

import { baseHandler } from '../handler'
import { HandlerEnum } from '../enum'

export type ElInputNumberType = InstanceType<typeof ElInputNumber>

export default defineComponent({
  name: 'InputNumberItem',
  components: { ElInputNumber },
  props: {
    event: {
      type: Number as PropType<HandlerEnum>,
    },
    title: {
      type: String,
    },
  },
  setup(props, { attrs }) {
    const { prefixCls } = useDesign('setting-input-number-item')
    const getBindValue = computed(() => {
      return { modelValue: attrs?.defaultValue || 0, ...attrs } as ElInputNumberType
    })
    function handleChange(v: number) {
      props.event && baseHandler(props.event, v)
    }
    return {
      prefixCls,
      getBindValue,
      handleChange,
    }
  },
})
</script>

<style lang="scss" scoped>
$prefix-cls: '#{$tonyname}-setting-input-number-item';

.#{$prefix-cls} {
  display: flex;
  justify-content: space-between;
  margin: 16px 0;
  color: var(--text-secondary-color);

  &-input-number {
    width: 128px;
  }
}
</style>
