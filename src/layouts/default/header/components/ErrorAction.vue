<template>
  <div :class="prefixCls">
    <ElTooltip content="错误日志" placement="bottom">
      <span @click="handleToErrorList">
        <ElBadge :value="getCount" :max="99">
          <SvgIcon name="bug" />
        </ElBadge>
      </span>
    </ElTooltip>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useRouter } from 'vue-router'
import { ElTooltip, ElBadge } from 'element-plus'

import { SvgIcon } from '@/components/SvgIcon'
import { useErrorLogStore } from '@/store/modules/errorLog'
import { PageEnum } from '@/enums/pageEnum'
import { useDesign } from '@/hooks/web/useDesign'

export default defineComponent({
  name: 'ErrorAction',
  components: { ElTooltip, ElBadge, SvgIcon },

  setup() {
    const { push } = useRouter()
    const errorLogStore = useErrorLogStore()
    const { prefixCls } = useDesign('header-error-action')

    const getCount = computed(() => errorLogStore.getErrorLogListCount)

    function handleToErrorList() {
      push(PageEnum.ERROR_LOG_PAGE).then(() => {
        errorLogStore.setErrorLogListCount(0)
      })
    }

    return {
      prefixCls,
      getCount,
      handleToErrorList,
    }
  },
})
</script>

<style lang="scss">
$prefix-cls: '#{$tonyname}-header-error-action';
.#{$prefix-cls} {
  .el-badge {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;

    // &__content {
    //   position: absolute;
    //   top: 2px;
    //   right: calc(50% - 16px);
    //   width: 16px;
    //   height: 16px;
    //   padding: 0;
    //   font-size: 12px;
    //   line-height: 16px;
    //   border: none;
    //   transform: none;
    // }
  }
}
</style>
