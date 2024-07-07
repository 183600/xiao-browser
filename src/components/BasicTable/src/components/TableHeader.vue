<template>
  <div :class="prefixCls">
    <div v-if="$slots.headerTop" :class="`${prefixCls}__top`">
      <slot name="headerTop"></slot>
    </div>
    <div :class="`${prefixCls}__inner`">
      <div :class="`${prefixCls}__title`">
        <slot v-if="$slots.title" name="title"></slot>
        <BasicTitle v-else-if="title" :helpMessage="titleHelpMessage">
          {{ title }}
        </BasicTitle>
      </div>
      <div :class="`${prefixCls}__toolbar`">
        <slot name="toolbar"></slot>
        <ElDivider direction="vertical" v-if="$slots.toolbar && showTableSetting" />
        <div :class="`${prefixCls}__toolbar-setting`" v-if="showTableSetting">
          <TableSetting v-bind="getSettingProps" />
        </div>
      </div>
    </div>
    <div v-if="$slots.headerBottom" :class="`${prefixCls}__bottom`">
      <slot name="headerBottom"></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import { ElDivider } from 'element-plus'

import { BasicTitle } from '@/components/Basic'

import TableSetting from './TableSetting.vue'
import { headerProps } from '../props'
import { TableSetting as TableSettingType } from '../typing'

export default defineComponent({
  name: 'BasicTableHeader',
  components: {
    ElDivider,
    BasicTitle,
    TableSetting,
  },
  props: {
    ...headerProps,
    prefixCls: String,
  },
  setup(props) {
    const getSettingProps = computed(() => {
      return {
        redo: true,
        fullscreen: true,
        size: false,
        ...(props.tableSetting || {}),
      } as TableSettingType
    })

    return { getSettingProps }
  },
})
</script>
