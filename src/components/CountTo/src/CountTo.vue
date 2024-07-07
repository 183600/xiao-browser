<template>
  <span :style="{ color }">{{ value }}</span>
</template>

<script lang="ts">
import { defineComponent, ref, computed, watchEffect, unref, onMounted, watch } from 'vue'
import { useTransition, TransitionPresets } from '@vueuse/core'

import { basicProps } from './props'

export default defineComponent({
  name: 'CountTo',
  props: basicProps,
  emits: ['started', 'finished'],
  setup(props, { emit, expose }) {
    const source = ref(props.startVal)
    const disabled = ref(false)
    let outputValue = useTransition(source)

    const value = computed(() => formatNumber(unref(outputValue)))

    /**
     * 启动动画
     *
     * Start
     */
    function start() {
      run()
      source.value = props.endVal
    }
    /**
     * 运行动画
     *
     * Run number
     */
    function run() {
      outputValue = useTransition(source, {
        disabled,
        duration: props.duration,
        onFinished: () => emit('finished'),
        onStarted: () => emit('started'),
        ...(props.useEasing ? { transition: TransitionPresets[props.transition] } : {}),
      })
    }
    /**
     * 格式化数值
     *
     * format the value
     * @param num value
     */
    function formatNumber(num: number | string) {
      if (!num && num !== 0) {
        return ''
      }
      const { decimals, decimal, separator, suffix, prefix } = props
      num = Number(num).toFixed(decimals)
      num += ''

      const x = num.split('.')
      let x1 = x[0]
      const x2 = x.length > 1 ? decimal + x[1] : ''

      const rgx = /(\d+)(\d{3})/
      if (separator && typeof separator !== 'number') {
        while (rgx.test(x1)) {
          x1 = x1.replace(rgx, `$1${separator}$2`)
        }
      }
      return prefix + x1 + x2 + suffix
    }

    watchEffect(() => {
      source.value = props.startVal
    })

    watch([() => props.startVal, () => props.endVal], () => {
      if (props.autoplay) {
        start()
      }
    })

    onMounted(() => {
      props.autoplay && start()
    })

    expose({
      start,
    })

    return {
      value,
      start,
    }
  },
})
</script>
