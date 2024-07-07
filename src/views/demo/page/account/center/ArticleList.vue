<template>
  <List :class="prefixCls">
    <template v-for="item in list" :key="item.title">
      <ListItem>
        <template #title>
          <p :class="`${prefixCls}__title`">
            {{ item.title }}
          </p>
          <div>
            <template v-for="tag in item.description" :key="tag">
              <el-tag class="mb-2 mr-2" size="small">
                {{ tag }}
              </el-tag>
            </template>
          </div>
        </template>
        <template #description>
          <div :class="`${prefixCls}__content`">
            {{ item.content }}
          </div>
          <div class="mt-2">
            <template v-for="action in metaActions" :key="action.text">
              <div :class="`${prefixCls}__action`">
                <Icon
                  v-if="action.icon"
                  :class="`${prefixCls}__action-icon`"
                  :name="action.icon"
                  :color="action.color" />
                {{ action.text }}
              </div>
            </template>
            <span :class="`${prefixCls}__time`">{{ item.time }}</span>
          </div>
        </template>
      </ListItem>
    </template>
  </List>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { ElTag } from 'element-plus'
import Icon from '@/components/Icon'
import { articleList } from './data'
import { List, ListItem } from '@/components/List'

export default defineComponent({
  components: {
    ElTag,
    List,
    ListItem,

    Icon,
  },
  setup() {
    const metaActions = [
      { icon: 'ep:star', text: '156', color: '#018ffb' },
      { icon: 'ep:promotion', text: '156', color: '#459ae8' },
      { icon: 'ep:comment', text: '2', color: '#42d27d' },
    ]

    return {
      prefixCls: 'account-center-article',
      list: articleList,
      metaActions,
    }
  },
})
</script>

<style lang="scss" scoped>
.account-center-article {
  &__title {
    margin-bottom: 12px;
    font-size: 18px;
  }

  &__content {
    color: rgba(0, 0, 0, 0.65);
  }

  &__action {
    display: inline-block;
    padding: 0 16px;
    color: rgba(0, 0, 0, 0.45);

    &:nth-child(1) {
      padding-left: 0;
    }

    &:nth-child(1),
    &:nth-child(2) {
      border-right: 1px solid rgba(206, 206, 206, 0.4);
    }

    &-icon {
      margin-right: 3px;
    }
  }

  &__time {
    position: absolute;
    right: 20px;
    color: rgba(0, 0, 0, 0.45);
  }
}
</style>
