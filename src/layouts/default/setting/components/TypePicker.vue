<template>
  <div :class="prefixCls">
    <template v-for="item in menuTypeList || []" :key="item.title">
      <ElTooltip :content="item.title" placement="bottom">
        <div @click="handler(item)" :class="getItemCls(item.type)">
          <div class="mix-sidebar"></div>
        </div>
      </ElTooltip>
    </template>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { ElTooltip } from 'element-plus'

import { useDesign } from '@/hooks/web/useDesign'

import { menuTypeList } from '../enum'

export default defineComponent({
  name: 'MenuTypePicker',
  components: { ElTooltip },
  props: {
    menuTypeList: {
      type: Array as PropType<typeof menuTypeList>,
      defualt: () => [],
    },
    handler: {
      type: Function as PropType<Fn>,
      default: () => ({}),
    },
    def: {
      type: String,
      default: '',
    },
  },
  setup(props) {
    const { prefixCls } = useDesign('setting-menu-type-picker')
    const getItemCls = (type: string) => {
      return [
        `${prefixCls}__item`,
        `${prefixCls}__item--${type}`,
        {
          [`${prefixCls}__item--active`]: props.def === type,
        },
      ]
    }

    return {
      prefixCls,
      getItemCls,
    }
  },
})
</script>

<style lang="scss" scoped>
$prefix-cls: '#{$tonyname}-setting-menu-type-picker';

.#{$prefix-cls} {
  display: flex;
  justify-content: center;

  &__item {
    position: relative;
    width: 56px;
    height: 48px;
    margin-right: 16px;
    overflow: hidden;
    cursor: pointer;
    background-color: #f0f2f5;
    border-radius: 4px;
    box-shadow: 0 1px 2.5px 0 rgba(0, 0, 0, 0.18);

    &::before,
    &::after {
      position: absolute;
      content: '';
    }

    &--sidebar {
      &::before {
        top: 0;
        left: 0;
        z-index: 1;
        width: 33%;
        height: 100%;
        background-color: #273352;
        border-radius: 4px 0 0 4px;
      }

      &::after {
        top: 0;
        left: 0;
        width: 100%;
        height: 25%;
        background-color: #fff;
      }
    }

    &--mix {
      &::before {
        top: 0;
        left: 0;
        width: 33%;
        height: 100%;
        background-color: #fff;
        border-radius: 4px 0 0 4px;
      }

      &::after {
        top: 0;
        left: 0;
        z-index: 1;
        width: 100%;
        height: 25%;
        background-color: #273352;
      }
    }

    &--top-menu {
      &::after {
        top: 0;
        left: 0;
        width: 100%;
        height: 25%;
        background-color: #273352;
      }
    }

    &--mix-sidebar {
      &::before {
        top: 0;
        left: 0;
        z-index: 1;
        width: 25%;
        height: 100%;
        background-color: #273352;
        border-radius: 4px 0 0 4px;
      }

      &::after {
        top: 0;
        left: 0;
        width: 100%;
        height: 25%;
        background-color: #fff;
      }

      .mix-sidebar {
        position: absolute;
        left: 25%;
        width: 15%;
        height: 100%;
        background-color: #fff;
      }
    }

    &:hover,
    &--active {
      padding: 12px;
      border: 2px solid var(--primary-color);

      &::before,
      &::after {
        border-radius: 0;
      }
    }
  }

  // img {
  //   width: 100%;
  //   height: 100%;
  //   cursor: pointer;
  // }
}
</style>
