<template>
  <List :class="prefixCls">
    <el-row :gutter="16">
      <template v-for="item in list" :key="item.title">
        <el-col :span="6">
          <ListItem :class="`${prefixCls}__item`">
            <el-card :class="`${prefixCls}__card`" :bodyStyle="{ padding: 0 }">
              <div :class="`${prefixCls}__card-title`">
                <Icon
                  class="icon"
                  v-if="item.icon"
                  :name="item.icon"
                  size="24"
                  :color="item.color" />
                {{ item.title }}
              </div>
              <div :class="`${prefixCls}__card-num`">
                活跃用户：
                <span>{{ item.active }}</span>
                万
              </div>
              <div :class="`${prefixCls}__card-num`">
                新增用户：
                <span>{{ item.new }}</span>
              </div>
              <Icon
                :class="`${prefixCls}__card-download`"
                v-if="item.download"
                size="20"
                :name="item.download" />
            </el-card>
          </ListItem>
        </el-col>
      </template>
    </el-row>
  </List>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { ElRow, ElCol, ElCard } from 'element-plus'
import Icon from '@/components/Icon'
import { applicationList } from './data'
import { List, ListItem } from '@/components/List'

export default defineComponent({
  components: {
    ElRow,
    ElCol,
    ElCard,
    ListItem,
    List,
    Icon,
  },
  setup() {
    return {
      prefixCls: 'account-center',
      list: applicationList,
    }
  },
})
</script>

<style lang="scss" scoped>
.account-center {
  &__item {
    border: none;
  }

  &__card {
    width: 100%;
    padding: 16px;
    border: 1px solid var(--border-color-light);

    &-title {
      display: flex;
      align-items: center;
      font-size: 18px;
      font-weight: 500;

      .icon {
        margin-right: 12px;
      }
    }

    &-num {
      margin-left: 36px;
      font-size: 16px;
      line-height: 1.5;
      color: var(--text-secondary-color);

      span {
        margin-left: 5px;
        font-size: 18px;
      }
    }

    &-download {
      float: right;
      color: var(--primary-color);
    }
  }
}
</style>
