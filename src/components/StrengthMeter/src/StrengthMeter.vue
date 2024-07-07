<template>
  <div :class="prefixCls">
    <ElInput
      v-if="showInput"
      v-bind="$attrs"
      clearable
      show-password
      v-model:modelValue="innerValueRef"
      :disabled="disabled" />
    <div :class="`${prefixCls}-bar`">
      <div :class="`${prefixCls}-bar--fill`" :data-score="getPasswordStrength"></div>
    </div>
  </div>
</template>

<script lang="ts">
import type { ZxcvbnResult } from '@zxcvbn-ts/core'

import { defineComponent, computed, ref, watch, unref, watchEffect } from 'vue'
import { ElInput } from 'element-plus'
import { zxcvbn } from '@zxcvbn-ts/core'

import { useDesign } from '@/hooks/web/useDesign'

export default defineComponent({
  name: 'StrengthMeter',
  components: { ElInput },
  inheritAttrs: false,
  props: {
    /**
     * 绑定的值(密码)
     *
     * Bind value
     */
    modelValue: String,
    /**
     * 是否显示输入框
     *
     * Whether to display the input box
     */
    showInput: {
      type: Boolean,
      default: true,
    },
    /**
     * 是否禁用
     *
     * Whether to disable
     */
    disabled: Boolean,
  },
  emits: ['score-change', 'change', 'update:modelValue'],
  setup(props, { emit }) {
    const innerValueRef = ref<string>('')
    const { prefixCls } = useDesign('strength-meter')

    /**
     * 监听复杂度变化
     *
     * Monitor complexity changes
     */
    const getPasswordStrength = computed(() => {
      const { disabled } = props
      if (disabled) return -1
      const innerValue = unref(innerValueRef)
      const zxc = zxcvbn(unref(innerValueRef)) as ZxcvbnResult
      const score = innerValue ? zxc.score : -1
      emit('score-change', score)
      return score
    })

    watchEffect(() => {
      innerValueRef.value = props.modelValue || ''
    })

    watch(
      () => unref(innerValueRef),
      (val) => {
        emit('update:modelValue', val)
        emit('change', val)
      },
    )

    return {
      getPasswordStrength,
      prefixCls,
      innerValueRef,
    }
  },
})
</script>

<style lang="scss">
$prefix-cls: '#{$tonyname}-strength-meter';

.#{$prefix-cls} {
  position: relative;
  width: 100%;

  &-bar {
    position: relative;
    height: 6px;
    margin: 10px auto 6px;
    background-color: var(--border-color-light);
    border-radius: 6px;

    &::before,
    &::after {
      position: absolute;
      z-index: 10;
      display: block;
      width: 20%;
      height: inherit;
      content: '';
      background-color: transparent;
      filter: brightness(1.1);
      border-color: var(--border-color-light);
      border-style: solid;
      border-width: 0 5px;
    }

    &::before {
      left: 20%;
    }

    &::after {
      right: 20%;
    }

    &--fill {
      position: absolute;
      width: 0;
      height: inherit;
      background-color: transparent;
      border-radius: inherit;
      transition: width 0.5s ease-in-out, background 0.25s;

      &[data-score='0'] {
        width: 20%;
        background-color: #dc3545;
      }

      &[data-score='1'] {
        width: 40%;
        background-color: #fd7e14;
      }

      &[data-score='2'] {
        width: 60%;
        background-color: #ffc107;
      }

      &[data-score='3'] {
        width: 80%;
        background-color: #198754;
      }

      &[data-score='4'] {
        width: 100%;
        background-color: #20c997;
      }
    }
  }
}
</style>
