<template>
  <PageWrapper :class="prefixCls" title="搜索列表">
    <template #extra>
      <BasicForm
        :class="`${prefixCls}__header-form`"
        :labelWidth="100"
        :schemas="schemas"
        :showActionButtonGroup="false"
        autoSubmitOnEnter
        @submit="handleSubmit" />
    </template>

    <div :class="`${prefixCls}__container`">
      <List>
        <template v-for="item in list" :key="item.id">
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
              <div :class="`${prefixCls}__action`">
                <template v-for="action in metaActions" :key="action.icon">
                  <div :class="`${prefixCls}__action-item`">
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
    </div>
  </PageWrapper>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { ElTag } from 'element-plus'
import Icon from '@/components/Icon'
import { BasicForm } from '@/components/BasicForm'
import { searchList as list, schemas } from './data'
import { List, ListItem } from '@/components/List'
import { useMessage } from '@/hooks/web/useMessage'

export default defineComponent({
  components: {
    ElTag,
    Icon,
    BasicForm,
    List,
    ListItem,
  },
  setup() {
    const { createMessage } = useMessage()

    const metaActions = [
      { icon: 'ep:star', text: '156', color: '#018ffb' },
      { icon: 'ep:promotion', text: '156', color: '#459ae8' },
      { icon: 'ep:comment', text: '2', color: '#42d27d' },
    ]

    function handleSubmit(v: any) {
      if (!v.field1) {
        createMessage.error(JSON.stringify(v))
      } else {
        createMessage.success(JSON.stringify(v))
      }
    }

    return {
      prefixCls: 'list-search',
      list,
      schemas,
      metaActions,
      handleSubmit,
    }
  },
})
</script>

<style lang="scss" scoped>
.list-search {
  &__header {
    &-form {
      margin-bottom: -16px;
    }
  }

  &__container {
    padding: 12px;
    background-color: var(--background-primary-color);
  }

  &__title {
    margin-bottom: 12px;
    font-size: 18px;
  }

  &__content {
    color: var(--text-secondary-color);
  }

  &__action {
    position: relative;
    margin-top: 10px;
    line-height: 1;

    &-item {
      display: inline-flex;
      align-items: center;
      padding: 0 16px;
      color: var(--text-secondary-color);

      &:nth-child(1) {
        padding-left: 0;
      }

      &:nth-child(1),
      &:nth-child(2) {
        border-right: 1px solid var(--border-color);
      }
    }

    &-icon {
      margin-right: 3px;
    }
  }

  &__time {
    position: absolute;
    right: 0;
    color: rgba(0, 0, 0, 0.45);
  }
}
</style>
