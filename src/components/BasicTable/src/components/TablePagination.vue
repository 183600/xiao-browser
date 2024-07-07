<template>
  <div :class="getWrapperClass">
    <ElPagination
      v-if="total"
      v-bind="getBindValues"
      v-model:current-page="pageRef"
      v-model:page-size="sizeRef" />
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref, unref, watch, watchEffect } from 'vue'
import { ElPagination } from 'element-plus'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import { omit } from 'lodash-es'

import { PAGE_SIZE, PAGE_POSITION_ALIGN } from '../const'
import { paginationProps } from '../props'

export default defineComponent({
  name: 'TablePagination',
  components: { ElPagination },
  inheritAttrs: false,
  props: paginationProps,
  emits: ['pageChange', 'sizeChange'],
  setup(props, { emit }) {
    const pageRef = ref(1)
    const sizeRef = ref(PAGE_SIZE)

    /**
     * 绑定的值
     *
     * Bind value
     */
    const getBindValues = computed(() => {
      return omit(props, ['pageSize', 'currentPage', 'prefixCls'])
    })

    /**
     * 获取表格外框类
     *
     * Get wrapper class
     */
    const getWrapperClass = computed(() => {
      const { prefixCls } = props
      return [prefixCls, `${prefixCls}--align-${PAGE_POSITION_ALIGN}`]
    })

    watchEffect(() => {
      const { currentPage, pageSize } = props
      currentPage && (pageRef.value = currentPage)
      pageSize && (sizeRef.value = pageSize)
    })

    watch(
      () => unref(pageRef),
      (v) => {
        v && emit('pageChange', v)
      },
    )

    watch(
      () => unref(sizeRef),
      (v) => {
        v && emit('sizeChange', v)
      },
    )

    return {
      // 设置分页导航语言为中文
      // Set the pagination language to Chinese
      locale: zhCn,
      getWrapperClass,
      getBindValues,
      pageRef,
      sizeRef,
    }
  },
})
</script>
