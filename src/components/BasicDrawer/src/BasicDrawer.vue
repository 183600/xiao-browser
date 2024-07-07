<template>
  <ElDrawer @close="handleClose()" v-bind="getBindValues" v-model="visibleRef">
    <template #header>
      <div :class="`${prefixCls}-header`">
        <span :class="`${prefixCls}-header__back`" v-if="isDetail" @click="handleClose()">
          <SvgIcon name="left" />
        </span>

        <BasicTitle :class="`${prefixCls}-header__title`">
          <template v-if="title">{{ title || '' }}</template>
          <template v-else><slot name="header"></slot></template>
        </BasicTitle>

        <span :class="`${prefixCls}-header__toolbar`" v-if="$slots.toolbar">
          <slot name="toolbar"></slot>
        </span>
      </div>
    </template>

    <ScrollContainer :class="`${prefixCls}-body`" v-loading="getLoading" :element-loading-text="loadingText">
      <slot></slot>
    </ScrollContainer>

    <div :class="`${prefixCls}-footer`" v-if="showFooter">
      <template v-if="$slots.footer">
        <slot name="footer"></slot>
      </template>

      <template v-else>
        <slot name="prependFooter" v-if="$slots.prependFooter"></slot>
        <ElButton @click="handleClose" v-bind="cancelOptions" v-if="showCancelBtn">
          {{ cancelOptions.btnText || 'Cancel' }}
        </ElButton>
        <slot name="centerFooter" v-if="$slots.centerFooter"></slot>
        <ElButton
          @click="handleOk"
          v-bind="confirmOptions"
          :loading="getProps.confirmOptions?.loading"
          v-if="showConfirmBtn">
          {{ confirmOptions.btnText || 'Ok' }}
        </ElButton>
        <slot name="appendFooter" v-if="$slots.appendFooter"></slot>
      </template>
    </div>
  </ElDrawer>
</template>

<script lang="ts">
import type { DrawerInstanceMethods, BasicDrawerProps } from './typing'

import { defineComponent, ref, computed, watch, unref, nextTick, getCurrentInstance } from 'vue'
import { ElDrawer, ElLoading, ElButton } from 'element-plus'
import { omit } from 'lodash-es'

import { ScrollContainer } from '@/components/ScrollContainer'
import { useDesign } from '@/hooks/web/useDesign'
import { EleDrawer } from '@/components/ElementPlus'
import { BasicTitle } from '@/components/Basic'
import { SvgIcon } from '@/components/SvgIcon'

import { basicProps, customProps } from './props'

export default defineComponent({
  name: 'BasicDrawer',
  components: { ElDrawer, ElButton, ScrollContainer, BasicTitle, SvgIcon },
  directives: {
    loading: ElLoading.directive,
  },
  inheritAttrs: false,
  props: basicProps,
  emits: ['update:modelValue', 'visible-change', 'confirm', 'cancel', 'register'],
  setup(props, { attrs, emit }) {
    const visibleRef = ref(false)
    const propsRef = ref<Partial<Nullable<BasicDrawerProps>>>(null)

    const { prefixCls } = useDesign('basic-drawer')

    /**
     * 获取当前实例
     *
     * Get current instance
     */
    const instance = getCurrentInstance()

    /**
     * 获取更新 Props
     *
     * Merge Props
     */
    const getProps = computed(() => {
      const opts = {
        ...props,
        ...(unref(propsRef) as Recordable),
      } as BasicDrawerProps
      const className = `${prefixCls} ${opts?.customClass || ''} ${prefixCls}-${instance?.uid}`

      return {
        ...opts,
        class: className, // compatible 2.3+
        customClass: className,
      } as BasicDrawerProps
    })

    /**
     * 绑定抽屉Props
     *
     * Bind drawer props
     */
    const getBindValues = computed(() => {
      const opts = { ...attrs, ...unref(getProps) }
      // 绑定组件Porps前，移除自定义附加项
      // Before binding component Porps, remove custom add-ons
      const customOpts = Object.keys(customProps)

      return omit(opts, customOpts) as EleDrawer
    })

    /**
     * 获取loading状态
     *
     * Get loading state
     */
    const getLoading = computed(() => {
      return !!unref(getProps)?.loading
    })

    /**
     * 通过实例设置 Props
     *
     * Setting Props by Instance
     * @param drawerProps Drawer Props
     */
    function setDrawerProps(drawerProps: Partial<BasicDrawerProps>): void {
      propsRef.value = { ...(unref(propsRef) as Recordable), ...drawerProps } as Recordable

      if (Reflect.has(drawerProps, 'modelValue')) {
        visibleRef.value = !!drawerProps.modelValue
      }
    }

    /**
     * 关闭抽屉
     *
     * Close drawer
     */
    async function handleClose() {
      const { closeFn } = unref(getProps)

      if (typeof closeFn === 'function') {
        const isClose: boolean = await closeFn()
        visibleRef.value = !isClose
        return
      } else {
        visibleRef.value = false
      }

      emit('cancel')
    }

    /**
     * 确认下一步，抽屉未主动关闭
     *
     * Confirm the next step, the drawer is not automatically closed
     */
    function handleOk() {
      emit('confirm')
    }
    /**
     * 定义实例方法
     *
     * Define instance func
     */
    const drawerMethods: DrawerInstanceMethods = {
      setDrawerProps: setDrawerProps,
      emitVisible: undefined,
    }

    instance && emit('register', drawerMethods)

    watch(
      () => props.modelValue,
      (v) => {
        visibleRef.value = !!v
      },
      { deep: true },
    )

    watch(
      () => visibleRef.value,
      (visible) => {
        nextTick(() => {
          emit('visible-change', visible)
          emit('update:modelValue', visible)
          instance && drawerMethods.emitVisible?.(visible, instance.uid)
        })
      },
    )

    return {
      handleClose,
      prefixCls,
      visibleRef,
      getProps,
      getLoading,
      getBindValues,
      handleOk,
    }
  },
})
</script>

<style lang="scss">
$prefix-cls: '#{$tonyname}-basic-drawer';

.#{$prefix-cls} {
  line-height: 1;
  --el-drawer-bg-color: var(--background-primary-color);

  .el-drawer__header {
    height: 60px;
    padding: 0 16px;
    margin: 0;
    color: var(--text-primary-color);
  }

  .el-drawer__body {
    display: flex;
    flex: 1;
    flex-direction: column;
    width: 100%;
    padding: 0;
    overflow: hidden;
  }

  .scrollbar__wrap {
    padding: 16px;
    margin-bottom: 0;
  }

  &-header {
    display: flex;
    align-items: center;
    overflow: hidden;

    &__back {
      display: flex;
      flex-shrink: 0;
      align-items: center;
      justify-content: center;
      width: 60px;
      height: 60px;
      cursor: pointer;

      &:hover {
        color: var(--primary-color);
      }
    }

    &__title {
      display: flex;
      flex: 1;
      align-items: center;
      padding: 0;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    &__toolbar {
      margin: 0 16px;
    }
  }

  &-body {
    flex-grow: 1;
    width: auto;
    height: auto;
    padding: 0 16px;
  }

  &-footer {
    display: flex;
    flex-shrink: 0;
    align-items: center;
    justify-content: flex-end;
    width: 100%;
    height: 48px;
    padding: 0 16px;
  }
}
</style>
