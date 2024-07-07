<template>
  <el-row class="ana-card" :gutter="32">
    <template v-for="item in CardList" :key="item.title">
      <el-col :span="8">
        <el-card shadow="always">
          <div class="ana-card--li">
            <div class="ana-card--left">
              <div class="ana-card--title dashboard-analysis__title">{{ item.title }}</div>
              <div class="ana-card--subject">{{ item.subject }}</div>
              <div class="ana-card--compare" :class="[{ 'is-down': item.scale < 0, 'is-up': item.scale > 0 }]">
                <span class="t1">{{ item.value }}</span>
                <SvgIcon class="t2" :name="item.scale > 0 ? 'rise' : item.scale < 0 ? 'fall' : 'minus'" />
                <span class="t3">{{ Math.abs(item.scale) }}%</span>
              </div>
            </div>
            <div class="ana-card--chart">
              <el-progress
                type="circle"
                :percentage="item.mix"
                :width="112"
                :circlePathStyle="[{ color: '#f00' }]"
                :stroke-width="5"
                indeterminate
                :color="getBarColor(item.mix)">
                <template #default>
                  <div class="ana-card--chart-inner">
                    <div>
                      <span>{{ item.mix }}</span>
                      <span>%</span>
                    </div>
                    <span>{{ item.desc }}</span>
                  </div>
                </template>
              </el-progress>
            </div>
          </div>
        </el-card>
      </el-col>
    </template>
  </el-row>
</template>

<script lang="ts" setup>
import { ElRow, ElCol, ElCard, ElProgress } from 'element-plus'

import { SvgIcon } from '@/components/SvgIcon'

import { CardList } from '../data'

defineProps({
  loading: {
    type: Boolean,
  },
})

function getBarColor(v: number) {
  if (v < 30) {
    return '#09B66D'
  } else if (v < 70) {
    return '#FDBF5E'
  }

  return '#FF3D57'
}
</script>

<style lang="scss" scoped>
.ana-card {
  &--title {
    margin-bottom: 1rem;
  }

  &--subject {
    margin: 0.75rem 0;
    font-size: 1rem;
    color: var(--text-secondary-color);
  }

  &--compare {
    display: flex;
    align-items: center;

    > .t1 {
      margin-right: 0.25rem;
      font-size: 1.5rem;
      color: var(--text-secondary-color);
    }

    > .t2 {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 1.875rem;
      height: 1.875rem;
      color: var(--text-secondary-color);
    }

    > .t3 {
      padding: 0 0.375rem;
      margin-left: 0.25rem;
      font-size: 0.75rem;
      line-height: 1.125rem;
      color: #fff;
      background: var(--text-secondary-color);
      border-radius: 1.125rem;
    }

    &.is-up {
      > .t2 {
        color: var(--success-color);
      }

      > .t3 {
        background: var(--success-color);
      }
    }

    &.is-down {
      > .t2 {
        color: var(--danger-color);
      }

      > .t3 {
        background: var(--danger-color);
      }
    }
  }

  &--li {
    display: flex;
    justify-content: space-between;
  }

  &--chart {
    position: relative;

    &-inner {
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;

      > span {
        margin-top: 0.5rem;
        line-height: 1;
        color: var(--text-secondary-color);
      }

      > div {
        font-size: 0;
        line-height: 1;

        > span:first-child {
          font-size: 1.875rem;
          font-weight: bold;
        }

        > span:last-child {
          margin-left: 0.125rem;
          font-size: 1rem;
          font-weight: lighter;
        }
      }
    }
  }
}
</style>
