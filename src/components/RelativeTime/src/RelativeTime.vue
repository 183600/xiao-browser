<template>
  <span>{{ date }}</span>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue'
import { useIntervalFn, isObject } from '@vueuse/core'

import { formatToDateTime, formatToDate, dateUtil } from '@/utils/dateUtil'

// 秒
const ONE_SECONDS = 1000
// 分
const ONE_MINUTES = ONE_SECONDS * 60
// 时
const ONE_HOUR = ONE_MINUTES * 60
// 天
const ONE_DAY = ONE_HOUR * 24

export default defineComponent({
  name: 'RelativeTime',
  props: {
    /**
     * 时间值，支持时间字符串、时间戳、时间
     *
     * Date value, supports time string, timestamp, time
     */
    value: {
      type: [String, Number, Date],
      required: true,
    },
    /**
     * 刷新间隔(s)
     *
     * Refresh interval (s)
     */
    step: {
      type: Number,
      default: 60,
    },
    /**
     * 显示模式，支持日期时间、日期时间、相对时间
     *
     * display mode, supports date/datetime/relative
     */
    mode: {
      type: String as PropType<'date' | 'datetime' | 'relative'>,
      default: 'relative',
    },
  },
  setup(props) {
    const date = ref('')

    /**
     * 周期性更新时间
     *
     * Periodic update time
     */
    useIntervalFn(setTime, props.step * ONE_SECONDS)

    /**
     * 处理传入的时间的值
     *
     * Process the value of the incoming time
     */
    function getTime() {
      const { value } = props
      let time = 0
      // 时间戳
      if (typeof value === 'number') {
        const timestamp = value.toString().length > 10 ? value : value * 1000
        time = new Date(timestamp).getTime()
        // 字符串
      } else if (typeof value === 'string') {
        time = new Date(value).getTime()
        // 时间
      } else if (isObject(value)) {
        time = value.getTime()
      }
      return time
    }
    /**
     * 更新时间
     *
     * Set time
     */
    function setTime() {
      const { mode, value } = props
      const time = getTime()
      // 相对时间，xxx小时前
      if (mode === 'relative') {
        date.value = getRelativeTime(time)
      } else {
        // 格式化 Y-M-D h:i:s
        if (mode === 'datetime') {
          date.value = formatToDateTime(value)
          // 格式化 Y-M-D
        } else if (mode === 'date') {
          date.value = formatToDate(value)
        }
      }
    }

    /**
     * 获取相对时间
     *
     * Get relative time
     * @param timeStamp 时间戳数值
     */
    function getRelativeTime(timeStamp: number) {
      const currentTime = new Date().getTime()

      // 判断传入时间戳是否早于当前时间戳
      // Determine whether the incoming timestamp is earlier than the current timestamp
      const isBefore = dateUtil(timeStamp).isBefore(currentTime)

      let diff = currentTime - timeStamp
      if (!isBefore) {
        diff = -diff
      }

      let resStr = ''
      const dirStr = isBefore ? '前' : '后'

      // 小于一秒
      // less than a second
      if (diff < ONE_SECONDS) {
        resStr = '刚刚'
        // 小于一分钟
        // less than a minute
      } else if (diff < ONE_MINUTES) {
        resStr = `${parseInt(diff / ONE_SECONDS)}秒${dirStr}`
        // 小于一小时
        // less than an hour
      } else if (diff >= ONE_MINUTES && diff < ONE_HOUR) {
        resStr = `${Math.floor(diff / ONE_MINUTES)}分钟${dirStr}`
        // 小于一天
        // less than a day
      } else if (diff >= ONE_HOUR && diff < ONE_DAY) {
        resStr = `${Math.floor(diff / ONE_HOUR)}小时${dirStr}`
        // 小于一个月
        // less than one month
      } else if (diff >= ONE_DAY && diff < 2623860000) {
        resStr = `${Math.floor(diff / ONE_DAY)}天${dirStr}`
        // 小于一年
        // less than one year
      } else if (diff >= 2623860000 && diff <= 31567860000 && isBefore) {
        resStr = dateUtil(timeStamp).format('MM-DD-HH-mm')
      } else {
        // 一年以上
        // greater than a year
        resStr = dateUtil(timeStamp).format('YYYY')
      }
      return resStr
    }

    watch(
      () => props.value,
      () => {
        setTime()
      },
      { immediate: true },
    )

    return { date }
  },
})
</script>
