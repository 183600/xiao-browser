<template>
  <ElCol v-bind="actionColOptions">
    <ElFormItem :class="prefixCls+'-submit-btns'">
      <slot name="resetBefore"></slot>
      <ElButton
        type="default"
        v-bind="resetBtnOptions"
        @click="resetAction"
        v-if="showResetButton">
        {{ resetBtnOptions.btnText || '重置' }}
      </ElButton>

      <slot name="submitBefore"></slot>
      <ElButton
        type="primary"
        v-bind="submitBtnOptions"
        @click="submitAction"
        v-if="showSubmitButton">
        {{ submitBtnOptions.btnText || '查询' }}
      </ElButton>

      <slot name="advanceBefore"></slot>
      <ElButton
        text
        size="small"
        @click="toggleAdvanced"
        v-if="showAdvancedButton && showAdvanced">
        {{ isAdvanced ? '收起 ' : '展开 ' }}
        <SvgIcon class="ml-1" :name="isAdvanced ? 'up' : 'down'" />
      </ElButton>
      <slot name="advanceAfter"></slot>
    </ElFormItem>
  </ElCol>
</template>

<script lang="ts">
import type { EleCol } from '@/components/ElementPlus'

import { defineComponent, computed } from 'vue'
import { ElFormItem, ElCol, ElButton } from 'element-plus'

import { SvgIcon } from '@/components/SvgIcon'

import { useFormContext } from '../hooks/useFormContext'
import { formActionProps } from '../props'
import { BASIC_COL_LEN, BASIC_COL_SIZE } from '../const'

export default defineComponent({
  name: 'BasicFormAction',
  components: {
    ElFormItem,
    ElCol,
    ElButton,
    SvgIcon,
  },
  inheritAttrs: false,
  props: {
    ...formActionProps,
    prefixCls: String,
  },
  emits: ['toggle-advanced'],
  setup(props, { emit }) {
    /**
     * 操作列配置
     *
     * Action column configuration
     */
    const actionColOptions = computed((): Partial<EleCol> => {
      const { showAdvancedButton, actionSpan, actionColProps } = props
      const actSpan = BASIC_COL_LEN - actionSpan
      const advancedSpanObj = showAdvancedButton ? { span: actSpan < BASIC_COL_SIZE ? BASIC_COL_LEN : actSpan } : {}

      return {
        ...advancedSpanObj,
        ...actionColProps,
      }
    })
    /**
     * 重置按钮配置
     *
     * Reset button configuration
     */
    const resetBtnOptions = computed(() => {
      return {
        ...props.resetButtonOptions,
      }
    })
    /**
     * 提交按钮配置
     *
     * Submit button configuration
     */
    const submitBtnOptions = computed(() => {
      return {
        ...props.submitButtonOptions,
      }
    })

    /**
     * 切换展开/收起
     *
     * Toggle expand/collapse
     */
    function toggleAdvanced() {
      emit('toggle-advanced')
    }

    return {
      actionColOptions,
      resetBtnOptions,
      submitBtnOptions,
      toggleAdvanced,
      ...useFormContext(),
    }
  },
})
</script>
