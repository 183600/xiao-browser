<template>
  <div :class="getClass" ref="wrapperRef">
    <div v-if="getShowheader" ref="headerRef" :class="getHeaderClass">
      <div v-if="getTitle" :class="`${prefixCls}-header__title`">{{ getTitle }}</div>
      <template v-else>
        <slot name="title"></slot>
      </template>

      <div v-if="getDesc" :class="`${prefixCls}-header__description`">{{ getDesc }}</div>
      <template v-else>
        <slot name="description"></slot>
      </template>

      <div :class="`${prefixCls}-header__toolbar`" v-if="$slots.toolbar">
        <slot name="toolbar"></slot>
      </div>

      <template v-if="$slots.extra">
        <slot name="extra"></slot>
      </template>
    </div>

    <div :class="getContentClass" ref="contentRef">
      <slot></slot>
    </div>

    <template v-if="$slots.footer">
      <div :class="`${prefixCls}-footer`">
        <slot name="footer"></slot>
      </div>
    </template>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref, provide } from 'vue'
import { useRoute } from 'vue-router'

import { useDesign } from '@/hooks/web/useDesign'

import { PageWrapperFixedHeightKey } from './helper'

export default defineComponent({
  name: 'PageWrapper',
  props: {
    /**
     * 页面标题(slot)
     *
     * Page header title
     */
    title: String,
    /**
     * 页面描述(slot)
     *
     * Page header description
     */
    description: String,
    /**
     * 当title和description不存在的时候，是否继承路由
     *
     * Whether to inherit routing when title and description do not exist
     */
    inheritRouter: {
      type: Boolean,
      default: true,
    },
    /**
     * 头部 class
     *
     * Header class
     */
    headerClass: String,
    /**
     * 内容区高度是否占满
     *
     * Whether the content is full
     */
    contentFullHeight: Boolean,
    /**
     * 内容区 class
     *
     * Content class
     */
    contentClass: String,
    /**
     * 内容区背景
     *
     * Content background
     */
    contentBackground: Boolean,
  },
  setup(props, { slots }) {
    const wrapperRef = ref<HTMLDivElement | null>(null)
    const headerRef = ref<HTMLDivElement | null>(null)
    const contentRef = ref<HTMLDivElement | null>(null)
    const footerRef = ref<HTMLDivElement | null>(null)
    const { prefixCls } = useDesign('page-wrapper')
    const route = useRoute()

    // 根据提供的内容，自动判断是否高度占满
    // According to the provided content, automatically determine whether the height is full
    provide(
      PageWrapperFixedHeightKey,
      computed(() => props.contentFullHeight),
    )

    const getClass = computed(() => {
      const { contentFullHeight } = props

      return [
        prefixCls,
        {
          [`${prefixCls}--full`]: contentFullHeight,
        },
      ]
    })

    const getTitle = computed(() => {
      const { title, inheritRouter } = props
      if (inheritRouter) {
        return title || route.meta.title || undefined
      }

      return title || undefined
    })

    const getDesc = computed(() => {
      const { description, inheritRouter } = props

      if (inheritRouter) {
        return description || route.meta.description || undefined
      }

      return description || undefined
    })
    const getShowheader = computed(() => {
      return !!(getTitle.value || slots?.title || getDesc.value || slots?.description || slots?.toolbar || slots?.extra)
    })

    const getHeaderClass = computed(() => {
      const { headerClass } = props
      return [
        `${prefixCls}-header`,
        headerClass,
      ]
    })

    const getContentClass = computed(() => {
      const { contentBackground, contentClass } = props
      return [
        `${prefixCls}-content`,
        contentClass,
        {
          [`${prefixCls}-content--background`]: contentBackground,
        },
      ]
    })

    return {
      prefixCls,
      wrapperRef,
      headerRef,
      contentRef,
      footerRef,
      getTitle,
      getDesc,
      getClass,
      getShowheader,
      getHeaderClass,
      getContentClass,
    }
  },
})
</script>

<style lang="scss">
$prefix-cls: '#{$tonyname}-page-wrapper';

.#{$prefix-cls} {
  position: relative;

  &-header {
    position: relative;
    padding: 16px;
    background-color: var(--background-primary-color);
    box-shadow: var(--card-shadow);

    &__title {
      font-size: 20px;
      font-weight: 600;
      line-height: 32px;
    }

    &__description {
      padding-top: 16px;
      color: var(--text-secondary-color);
    }

    &__toolbar {
      position: absolute;
      top: 16px;
      right: 16px;
    }

    .el-tabs__header {
      margin-bottom: 0;
    }
  }

  &-content {
    padding: 16px;
    overflow: hidden;

    &--full {
      height: 100%;
      overflow: auto;
    }

    &--background {
      background-color: var(--background-primary-color);
    }
  }

  &-footer {
    display: flex;
    align-items: center;
    width: 100%;
    background-color: var(--background-primary-color);
    border-top: 1px solid var(--border-color);
    box-shadow: 0 -6px 16px -8px rgba(0, 0, 0, 0.08), 0 -9px 28px 0 rgba(0, 0, 0, 0.05), 0 -12px 48px 16px rgba(0, 0, 0, 0.03);
  }

  &--full {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;

    .#{$prefix-cls}-header {
      flex-shrink: 0;
    }

    .#{$prefix-cls}-content {
      flex-grow: 1;
      overflow: auto;
    }

    .#{$prefix-cls}-footer {
      flex-shrink: 0;
    }
  }
}
</style>
