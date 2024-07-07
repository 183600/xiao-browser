<template>
  <ElInput v-bind="$attrs" :class="prefixCls" v-model:modelValue="innerValueRef">
    <template #append>
      <ElButton :disabled="isStart" @click="handleStart" :loading="loading">
        {{ getButtonText }}
      </ElButton>
    </template>
  </ElInput>
</template>

<script lang="ts">
import { computed, defineComponent, PropType, ref, unref, watch, watchEffect } from 'vue'
import { ElInput, ElButton } from 'element-plus'

import { useDesign } from '@/hooks/web/useDesign'

import { useCountdown } from './useCountdown'

export default defineComponent({
  name: 'CountdownInput',
  components: { ElInput, ElButton },
  inheritAttrs: false,
  props: {
    /**
     * 绑定的值
     *
     * Bind value
     */
    modelValue: {
      type: [String, Number],
      default: '',
    },
    /**
     * 倒计时时间(s)
     *
     * Countdown time (s)
     */
    count: {
      type: Number,
      default: 60,
    },
    /**
     * 验证码的接口方法
     *
     * The api method of verification code
     */
    sendCodeApi: {
      type: Function as PropType<() => Promise<boolean>>,
      default: null,
    },
  },
  emits: ['change', 'update:modelValue'],
  setup(props, { emit }) {
    const { prefixCls } = useDesign('basic-countdown-input')
    const loading = ref(false)
    const innerValueRef = ref()
    const { currentCount, isStart, start } = useCountdown(props.count)

    /**
     * 监听倒计时文本变化
     *
     * Monitor the countdown text change
     */
    const getButtonText = computed(() => {
      return !unref(isStart) ? '获取验证码' : `${unref(currentCount)}秒后重新获取`
    })

    /**
     * 启动计时
     *
     * Start countdown time
     */
    async function handleStart() {
      const { sendCodeApi } = props
      // 如果有api方法，先请求后再启动
      // If there is an api method, first request and then start
      if (typeof sendCodeApi === 'function') {
        loading.value = true
        try {
          const canStart = await sendCodeApi()
          canStart && start()
        } finally {
          loading.value = false
        }
      } else {
        start()
      }
    }

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
      prefixCls,
      loading,
      isStart,
      innerValueRef,
      getButtonText,
      handleStart,
    }
  },
})
</script>
