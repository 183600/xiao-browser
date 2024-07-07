<template>
  <List :class="prefixCls">
    <template v-for="item in list" :key="item.title">
      <ListItem style="display: block" :class="[prefixCls + '__item', { 'is-read': item.titleDelete }]" @click="handleTitleClick(item)">
        <template #thumb v-if="item.avatar">
          <ElAvatar style="--el-avatar-bg-color: #fff" class="avatar" :src="item.avatar" />
        </template>

        <template #title>
          <div class="title">
            <span>{{ item.title }}</span>
            <div class="extra" v-if="item.extra">
              <ElTag class="tag" size="small" :type="item.color">
                {{ item.extra }}
              </ElTag>
            </div>
          </div>
        </template>

        <template #description>
          <div>
            <div class="description" v-if="item.description">
              {{ item.description }}
            </div>
            <div class="datetime">
              {{ item.datetime }}
            </div>
          </div>
        </template>
      </ListItem>
    </template>
  </List>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { ElAvatar, ElTag } from 'element-plus'

import { useDesign } from '@/hooks/web/useDesign'
import { List, ListItem } from '@/components/List'

import { ListItem as ListItemType } from './data'

export default defineComponent({
  components: {
    ElAvatar,
    ElTag,
    List,
    ListItem,
  },
  props: {
    list: {
      type: Array as PropType<ListItemType[]>,
      default: () => [],
    },
    onTitleClick: {
      type: Function as PropType<(record: ListItemType) => void>,
    },
  },
  setup(props) {
    const { prefixCls } = useDesign('header-notify-list')

    function handleTitleClick(item: ListItemType) {
      props.onTitleClick && props.onTitleClick(item)
    }

    return { prefixCls, handleTitleClick }
  },
})
</script>

<style lang="scss">
$prefix-cls: '#{$tonyname}-header-notify-list';

.#{$prefix-cls} {
  max-height: 320px;
  overflow-y: auto;

  &__item {
    padding: 12px 24px;
    cursor: pointer;

    &:hover {
      background: var(--background-main-color);
    }

    &.is-read {
      opacity: 0.5;
    }

    .avatar {
      width: 32px;
      height: 32px;
    }

    .title {
      display: flex;
      margin-bottom: 4px;
      color: var(--text-primary-color);

      > span:first-child {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }

    .extra {
      margin-left: 4px;
    }

    .description {
      max-height: 32px;
      overflow: hidden;
      font-size: 12px;
      line-height: 16px;
      color: var(--text-secondary-color);
    }

    .datetime {
      margin-top: 4px;
      font-size: 12px;
      color: var(--text-secondary-color);
    }
  }
}
</style>
