<template>
  <div :class="prefixCls">
    <ElPopover
      placement="bottom"
      trigger="click"
      width="300px"
      :popper-class="`${prefixCls}__overlay`">
      <template #reference>
        <ElBadge :value="count" is-dot>
          <SvgIcon name="bells" />
        </ElBadge>
      </template>

      <ElTabs :class="`${prefixCls}__tabs`" stretch>
        <template v-for="item in listData" :key="item.key">
          <ElTabPane :label="item.name">
            <NoticeList :list="item.list" v-if="item.key === '1'" @title-click="onNoticeClick" />
            <NoticeList :list="item.list" v-else />
            <div :class="`${prefixCls}__more`">查看更多</div>
          </ElTabPane>
        </template>
      </ElTabs>
    </ElPopover>
  </div>
</template>

<script lang="ts">
import type { ListItem } from './data'

import { computed, defineComponent, ref } from 'vue'
import { ElPopover, ElBadge, ElTabs, ElTabPane } from 'element-plus'

import { useDesign } from '@/hooks/web/useDesign'
import { SvgIcon } from '@/components/SvgIcon'
import { useMessage } from '@/hooks/web/useMessage'

import NoticeList from './NoticeList.vue'
import { tabListData } from './data'

export default defineComponent({
  components: { ElPopover, ElBadge, ElTabs, ElTabPane, SvgIcon, NoticeList },
  setup() {
    const { prefixCls } = useDesign('header-notify')
    const { createMessage } = useMessage()
    const listData = ref(tabListData)

    const count = computed(() => {
      let count = 0
      for (let i = 0; i < tabListData.length; i++) {
        count += tabListData[i].list.length
      }
      return count
    })

    function onNoticeClick(record: ListItem) {
      createMessage.success(`Notice ID: ${record.id}`)
      record.titleDelete = !record.titleDelete
    }

    return {
      prefixCls,
      listData,
      count,
      onNoticeClick,
    }
  },
})
</script>

<style lang="scss">
$prefix-cls: '#{$tonyname}-header-notify';

.#{$prefix-cls} {
  padding-top: 2px;

  &__overlay {
    &.is-light {
      border-color: transparent;

      .el-popper__arrow::before {
        border-color: transparent;
      }
    }

    &.el-popover.el-popper {
      padding: 0;
    }
  }

  &__tabs {
    .el-tabs__item {
      padding: 0;
    }
  }

  &__more {
    padding: 12px;
    color: var(--text-primary-color);
    text-align: center;

    &:hover {
      color: var(--text-primary-color);
      cursor: pointer;
      background: var(--background-main-color);
    }
  }
}
</style>
