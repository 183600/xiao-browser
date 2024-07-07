<template>
  <ElSelect
    @visible-change="handleFetch"
    clearable
    v-bind="$attrs"
    :no-data-text="getSelectEmpty"
    v-model:modelValue="innerValueRef">
    <ElOption
      v-for="item in getOptions"
      :key="item.value"
      :label="item.label"
      :value="item.value" />
  </ElSelect>
</template>

<script lang="ts">
import type { PropType } from 'vue'

import { defineComponent, ref, watchEffect, computed, unref, watch, onMounted } from 'vue'
import { ElSelect, ElOption } from 'element-plus'
import { get, omit } from 'lodash-es'

import { OptionsItem } from './typing'

export default defineComponent({
  name: 'ApiSelect',
  components: { ElSelect, ElOption },
  inheritAttrs: false,
  props: {
    /**
     * 绑定的值
     *
     * Bind value
     */
    modelValue: {
      type: [Array, String, Number],
      default: '',
    },
    /**
     * API函数
     *
     * API function
     */
    api: {
      type: Function as PropType<(arg?: Recordable) => Promise<Recordable[]>>,
      default: null,
    },
    /**
     * API参数
     *
     * API parameters
     */
    params: {
      type: Object as PropType<Recordable>,
      default: () => ({}),
    },
    /**
     * API响应数据的所在的层级，支持多层级如 data.record.list
     *
     * The level of the API response data, supports multiple levels such as data.record.list
     */
    resultField: {
      type: String,
      default: '',
    },
    /**
     * 数据项的显示字段
     *
     * Display fields for data items
     */
    labelField: {
      type: String,
      default: 'label',
    },
    /**
     * 数据项的值字段
     *
     * The value field of the data item
     */
    valueField: {
      type: String,
      default: 'value',
    },
    /**
     * 是否转换数据项的值为字符串
     *
     * Whether to convert the value of the data item to a string
     */
    valueToString: { type: Boolean },
    /**
     * 是否立即请求
     *
     * whether to request now
     */
    immediate: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['option-change', 'change', 'update:modelValue'],
  setup(props, { emit }) {
    const options = ref<Recordable[]>([])
    const loading = ref(false)
    const isFirstLoad = ref(true)
    const innerValueRef = ref()

    /**
     * 根据 labelField/valueField 字段，对齐合法的 ElOption 数据
     *
     * Align legal ElOption data according to labelField/valueField
     */
    const getOptions = computed(() => {
      const { labelField, valueField, valueToString } = props

      return unref(options).reduce((prev, next: Recordable) => {
        if (next) {
          const value = next[valueField]
          prev.push({
            ...omit(next, [labelField, valueField]),
            label: next[labelField],
            value: valueToString ? `${value}` : value,
          })
        }
        return prev
      }, [] as OptionsItem[])
    })

    /**
     * 远程请求时的提示
     *
     * Tips for remote requests
     */
    const getSelectEmpty = computed(() => {
      if (unref(loading)) {
        return '请等待数据加载完成...'
      } else {
        return '数据为空'
      }
    })

    watchEffect(() => {
      innerValueRef.value = props.modelValue || ''

      props.immediate && fetch()
    })

    watch(
      () => props.params,
      () => {
        !unref(isFirstLoad) && fetch()
      },
      { deep: true },
    )

    watch(
      () => unref(innerValueRef),
      (val) => {
        emit('update:modelValue', val)
        emit('change', val)
      },
    )

    /**
     * 请求数据，根据 resultField 对齐合法的数据
     *
     * Request data, align legal data according to resultField
     */
    async function fetch() {
      const api = props.api
      if (!api || typeof api !== 'function') return

      options.value = []
      try {
        loading.value = true
        const res = await api(props.params)
        if (Array.isArray(res)) {
          options.value = res
          emitChange()
          return
        }
        if (props.resultField) {
          options.value = get(res, props.resultField) || []
        }
        emitChange()
      } catch (error) {
        console.error(error)
      } finally {
        loading.value = false
      }
    }

    /**
     * 预加载远程数据
     *
     * Preload remote data
     */
    async function handleFetch() {
      if (!props.immediate && unref(isFirstLoad)) {
        await fetch()
        isFirstLoad.value = false
      }
    }

    /**
     * 选项更新时回调数据
     *
     * Emit data when options are updated
     */
    function emitChange() {
      emit('option-change', unref(getOptions))
    }

    onMounted(() => {
      handleFetch()
    })

    return {
      innerValueRef,
      getOptions,
      loading,
      getSelectEmpty,
      handleFetch,
    }
  },
})
</script>
