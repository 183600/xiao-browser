<template>
  <Teleport to="body">
    <transition name="zoom-fade" mode="out-in">
      <div :class="getClass" @click.stop v-if="visible">
        <div :class="`${prefixCls}-content`" v-click-outside="handleClose">
          <div :class="`${prefixCls}-input__wrapper`">
            <ElInput
              :class="`${prefixCls}-input`"
              placeholder="搜索"
              ref="inputRef"
              clearable
              v-model="searchKey"
              @input="handleSearch">
              <template #prefix><SvgIcon name="search" /></template>
            </ElInput>
            <span :class="`${prefixCls}-cancel`" @click="handleClose">取消</span>
          </div>

          <div :class="`${prefixCls}-nodata`" v-show="getIsNotData">暂无搜索结果</div>

          <ul :class="`${prefixCls}-list`" v-show="!getIsNotData" ref="scrollWrap">
            <li
              :ref="setRefs(index)"
              v-for="(item, index) in searchResult"
              :key="item.path"
              :data-index="index"
              @mouseenter="handleMouseenter"
              @click="handleEnter"
              :class="[
                `${prefixCls}-list__item`,
                {
                  [`${prefixCls}-list__item--active`]: activeIndex === index,
                },
              ]">
              <div :class="`${prefixCls}-list__item-text`">
                {{ item.name }}
              </div>
              <div :class="`${prefixCls}-list__item-enter`">
                <SvgIcon name="enter" :size="20" />
              </div>
            </li>
          </ul>
          <AppSearchFooter :class="`${prefixCls}-footer`" />
        </div>
      </div>
    </transition>
  </Teleport>
</template>

<script lang="ts" setup>
import { computed, unref, ref, watch, nextTick } from 'vue'
import { ElInput } from 'element-plus'

import { SvgIcon } from '@/components/SvgIcon'
import vClickOutside from '@/directives/clickOutside'
import { useDesign } from '@/hooks/web/useDesign'
import { useRefs } from '@/hooks/core/useRefs'
import { useAppInject } from '@/hooks/web/useAppInject'

import { useMenuSearch } from './useMenuSearch'
import AppSearchFooter from './AppSearchFooter.vue'

const props = defineProps({
  visible: { type: Boolean },
})

const emit = defineEmits(['close'])

const scrollWrap = ref(null)
const inputRef = ref<Nullable<HTMLElement>>(null)
const searchKey = ref('')

const { prefixCls } = useDesign('header-search-modal')
const [refs, setRefs] = useRefs()
const { getIsMobile } = useAppInject()

const { handleSearch, searchResult, keyword, activeIndex, handleEnter, handleMouseenter } = useMenuSearch(refs, scrollWrap, emit)

const getIsNotData = computed(() => !keyword || unref(searchResult).length === 0)

const getClass = computed(() => {
  return [
    prefixCls,
    {
      [`${prefixCls}--mobile`]: unref(getIsMobile),
    },
  ]
})

watch(
  () => props.visible,
  (visible: boolean) => {
    visible &&
      nextTick(() => {
        searchKey.value = ''
        unref(inputRef)?.focus()
      })
  },
)

function handleClose() {
  searchResult.value = []
  emit('close')
}
</script>

<style lang="scss">
$prefix-cls: '#{$tonyname}-header-search-modal';

.#{$prefix-cls} {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
  display: flex;
  justify-content: center;
  width: 100%;
  height: 100%;
  padding-top: 3.25rem;
  background-color: rgba(0, 0, 0, 0.3);

  &--mobile {
    padding: 0;

    .#{$prefix-cls}-input {
      width: calc(100% - 2.75rem);
    }

    .#{$prefix-cls}-cancel {
      display: inline-block;
      color: var(--text-secondary-color);
    }

    .#{$prefix-cls}-content {
      width: 100%;
      height: 100%;
      border-radius: 0;
    }

    .#{$prefix-cls}-footer {
      display: none;
    }

    .#{$prefix-cls}-list {
      height: calc(100% - 5rem);
      max-height: unset;

      &__item {
        &-enter {
          opacity: 0;
        }
      }
    }
  }

  &-content {
    position: relative;
    flex-direction: column;
    width: 40rem;
    margin: 0 auto auto;
    background-color: var(--background-primary-color);
    border-radius: 1rem;
    box-shadow: 0 1.5rem 3.25rem -0.5rem rgba(0, 0, 0, 0.25);
  }

  &-input__wrapper {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1rem;
  }

  &-input {
    width: 100%;
    height: 3rem;
    font-size: 1em;
    color: var(--text-primary-color);
    border-radius: var(--radius-base);
  }

  .el-input__inner {
    height: 100%;
  }

  .el-input__prefix-inner {
    display: flex;
    align-items: center;
  }

  &-cancel {
    display: none;
  }

  &-nodata {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 7.5rem;
    color: var(--text-secondary-color);
  }

  &-list {
    max-height: 30rem;
    padding: 0 1rem;
    overflow: auto;

    &__item {
      position: relative;
      display: flex;
      align-items: center;
      width: 100%;
      padding: 1rem;
      margin-bottom: 1rem;
      font-size: 14px;
      color: var(--text-primary-color);
      cursor: pointer;
      background-color: var(--background-primary-color);
      border-radius: var(--radius-base);
      box-shadow: 0 2px 4px rgba(169, 194, 209, 0.55);

      &--active {
        color: var(--text-primary-reverse);
        background-color: var(--primary-color);

        .#{$prefix-cls}-list__item-enter {
          opacity: 1;
        }
      }

      &-text {
        flex: 1;
      }

      &-enter {
        width: 2rem;
        opacity: 0;
      }
    }
  }

  &-footer {
    display: flex;
    padding: 1rem;

    > div {
      display: flex;
      margin: 0 0.5rem;

      > span > span {
        padding: 4px;
        margin-right: 8px;
        background-color: #dee4e7;
        box-shadow: 0 2px 4px rgba(169, 194, 209, 0.55);
      }
    }
  }
}
</style>
