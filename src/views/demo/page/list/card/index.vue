<template>
  <PageWrapper :class="prefixCls" title="卡片列表">
    <template #extra>
      基于Vue Next, TypeScript, Ant Design Vue实现的一套完整的企业级后台管理系统。
      <div :class="`${prefixCls}__link`">
        <a>
          <Icon name="bx:bx-paper-plane" color="#1890ff" />
          <span>开始</span>
        </a>
        <a>
          <Icon name="carbon:warning" color="#1890ff" />
          <span>简介</span>
        </a>
        <a>
          <Icon name="ion:document-text-outline" color="#1890ff" />
          <span>文档</span>
        </a>
      </div>
    </template>

    <div :class="`${prefixCls}__content`">
      <List>
        <el-row :gutter="16">
          <template v-for="item in list" :key="item.title">
            <el-col :span="6">
              <ListItem :class="`${prefixCls}__card-item`">
                <el-card :class="`${prefixCls}__card`" :bodyStyle="{ padding: 0 }">
                  <div :class="`${prefixCls}__card-title`">
                    <Icon
                      class="icon"
                      size="50"
                      v-if="item.icon"
                      :name="item.icon"
                      :color="item.color" />
                    <span>{{ item.title }}</span>
                  </div>
                  <div :class="`${prefixCls}__card-detail`">基于 Vue3, TypeScript, Element Plus 实现的一套完整的企业级后台管理系统</div>
                </el-card>
              </ListItem>
            </el-col>
          </template>
        </el-row>
      </List>
    </div>
  </PageWrapper>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { ElRow, ElCol, ElCard } from 'element-plus'
import Icon from '@/components/Icon'
import { cardList } from './data'
import { List, ListItem } from '@/components/List'

export default defineComponent({
  components: {
    ElRow,
    ElCol,
    ElCard,
    Icon,
    List,
    ListItem,
  },
  setup() {
    return {
      prefixCls: 'list-card',
      list: cardList,
    }
  },
})
</script>

<style lang="scss" scoped>
.list-card {
  &__link {
    margin-top: 10px;
    font-size: 14px;

    a {
      margin-right: 30px;
    }

    span {
      margin-left: 5px;
    }
  }

  &__card {
    padding: 16px;

    &-item {
      border: none;
    }

    &-title {
      display: flex;
      font-size: 18px;
      font-weight: 500;
      color: var(--text-primary-color);

      .icon {
        margin-right: 10px;
      }
    }

    &-detail {
      padding-left: 60px;
      font-size: 16px;
      line-height: 1.7;
      color: var(--text-secondary-color);
    }
  }
}
</style>
