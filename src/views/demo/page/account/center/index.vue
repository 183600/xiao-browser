<template>
  <div :class="prefixCls">
    <el-row :class="`${prefixCls}-top`">
      <el-col :span="9" :class="`${prefixCls}-col`">
        <el-row>
          <el-col :span="8">
            <div :class="`${prefixCls}-top__avatar`">
              <img width="70" :src="avatar" />
              <span>Tony</span>
              <div>海纳百川，有容乃大</div>
            </div>
          </el-col>
          <el-col :span="16">
            <div :class="`${prefixCls}-top__detail`">
              <template v-for="detail in details" :key="detail.title">
                <p class="mb-3">
                  <Icon :name="detail.icon" />
                  {{ detail.title }}
                </p>
              </template>
            </div>
          </el-col>
        </el-row>
      </el-col>
      <el-col :span="7" :class="`${prefixCls}-col`">
        <CollapseContainer title="标签" :canExpan="false">
          <template v-for="tag in tags" :key="tag">
            <el-tag class="mb-2 mr-2" size="small">
              {{ tag }}
            </el-tag>
          </template>
        </CollapseContainer>
      </el-col>
      <el-col :span="8" :class="`${prefixCls}-col`">
        <CollapseContainer :class="`${prefixCls}-top__team`" title="团队" :canExpan="false">
          <div v-for="(team, index) in teams" :key="index" :class="`${prefixCls}-top__team-item`">
            <Icon :name="team.icon" :color="team.color" />
            <span>{{ team.title }}</span>
          </div>
        </CollapseContainer>
      </el-col>
    </el-row>
    <div :class="`${prefixCls}-bottom`">
      <el-tabs>
        <template v-for="item in achieveList" :key="item.key">
          <el-tab-pane :label="item.name">
            <component :is="item.component" />
          </el-tab-pane>
        </template>
      </el-tabs>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { ElRow, ElCol, ElTabs, ElTabPane, ElTag } from 'element-plus'
import { CollapseContainer } from '@/components/CollapseContainer'
import Icon from '@/components/Icon'
import ArticleList from './ArticleList.vue'
import Application from './Application.vue'
import Project from './Project.vue'

import headerImg from '@/assets/images/header.jpg'
import { tags, teams, details, achieveList } from './data'
import { useUserStore } from '@/store/modules/user'

export default defineComponent({
  components: {
    ElRow,
    ElCol,
    ElTabs,
    ElTabPane,
    ElTag,
    CollapseContainer,
    Icon,
    ArticleList,
    Application,
    Project,
  },
  setup() {
    const userStore = useUserStore()
    const avatar = computed(() => userStore.getUserInfo.avatar || headerImg)
    return {
      prefixCls: 'account-center',
      avatar,
      tags,
      teams,
      details,
      achieveList,
    }
  },
})
</script>

<style lang="scss" scoped>
.account-center {
  &-col:not(:last-child) {
    padding: 0 10px;

    &:not(:last-child) {
      border-right: 1px dashed rgba(206, 206, 206, 0.5);
    }
  }

  &-top {
    padding: 10px;
    margin: 16px 16px 12px;
    background-color: var(--background-primary-color);
    border-radius: 3px;

    &__avatar {
      text-align: center;

      img {
        margin: auto;
        border-radius: 50%;
      }

      span {
        display: block;
        font-size: 20px;
        font-weight: 500;
      }

      div {
        margin-top: 3px;
        font-size: 12px;
      }
    }

    &__detail {
      padding-left: 20px;
      margin-top: 15px;
    }

    &__team {
      &-item {
        display: inline-block;
        padding: 4px 24px;
      }

      span {
        margin-left: 3px;
      }
    }
  }

  &-bottom {
    padding: 10px;
    margin: 0 16px 16px;
    background-color: var(--background-primary-color);
    border-radius: 3px;
  }
}
</style>
