<template>
  <ElDialog v-bind="getBindValues" :showClose="false" v-model:modelValue="visibleRef">
    <template #header>
      <ModalHeader v-bind="getHeaderBindValues" @fullscreen="handleFullscreen" @cancel="handleCancel">
        <template #header>
          <slot name="header"></slot>
        </template>
      </ModalHeader>
    </template>

    <ModalWrapper ref="modalWrapperRef" v-bind="getWrapperBindValue" @height-change="handleHeightChange">
      <slot></slot>
    </ModalWrapper>

    <template #footer v-if="showFooter">
      <div :class="`${prefixCls}-footer`">
        <template v-if="$slots.footer">
          <slot name="footer"></slot>
        </template>

        <template v-else>
          <slot name="prependFooter"></slot>
          <ElButton v-bind="cancelOptions" @click="handleCancel" v-if="showCancelBtn">
            {{ cancelOptions?.btnText || 'Cancel' }}
          </ElButton>
          <slot name="centerFooter"></slot>
          <ElButton
            v-bind="confirmOptions"
            :loading="getProps.confirmOptions?.loading"
            @click="handleConfirm"
            v-if="showConfirmBtn">
            {{ confirmOptions?.btnText || 'OK' }}
          </ElButton>
          <slot name="appendFooter"></slot>
        </template>
      </div>
    </template>
  </ElDialog>
</template>

<script lang="ts">
import type { EleDialog } from '@/components/ElementPlus'
import type { BasicModalProps, ModalInstanceMethods, ModalCustomHeader, ModalCustomContent } from './typing'

import { defineComponent, computed, ref, watch, unref, watchEffect, getCurrentInstance, nextTick } from 'vue'
import { ElDialog, ElButton } from 'element-plus'
import { omit } from 'lodash-es'

import { useDesign } from '@/hooks/web/useDesign'

import { basicProps, customProps } from './props'
import ModalHeader from './components/ModalHeader.vue'
import ModalWrapper from './components/ModalWrapper.vue'

export default defineComponent({
  name: 'BasicModal',
  components: { ElDialog, ElButton, ModalWrapper, ModalHeader },
  inheritAttrs: false,
  props: basicProps,
  emits: ['visible-change', 'height-change', 'cancel', 'confirm', 'register', 'update:modelValue'],
  setup(props, { emit }) {
    const visibleRef = ref(false)
    const propsRef = ref<Partial<BasicModalProps> | null>(null)
    const modalWrapperRef = ref<any>(null)
    const { prefixCls } = useDesign('basic-modal')
    const fullscreenRef = ref(false)

    const modalMethod: ModalInstanceMethods = {
      setModalProps,
      emitVisible: undefined,
      redoModalHeight: () => {
        nextTick(() => {
          if (unref(modalWrapperRef)) {
            // eslint-disable-next-line prettier/prettier
            (unref(modalWrapperRef) as any).setModalHeight()
          }
        })
      },
    }

    /**
     * 获取并注册当前实例
     *
     * Get current instance
     */
    const instance = getCurrentInstance()
    instance && emit('register', modalMethod, instance.uid)

    /**
     * 获取更新 Props
     *
     * Merge Props
     */
    const getProps = computed(() => {
      return {
        ...props,
        ...(unref(propsRef) as Recordable),
      } as BasicModalProps
    })

    /**
     * 绑定弹窗Props
     *
     * Bind modal props
     */
    const getBindValues = computed(() => {
      const opts = {
        ...unref(getProps),
        fullscreen: unref(fullscreenRef),
      }
      const className = `${prefixCls} ${opts?.customClass || ''} ${prefixCls}-${instance?.uid}`
      opts.class = className
      opts.customClass = className

      // 绑定组件Porps前，移除自定义附加项
      // Before binding component Porps, remove custom add-ons
      const customOpts = Object.keys(customProps)

      return omit(opts, customOpts) as EleDialog
    })

    /**
     * 绑定弹窗头部
     *
     * Bind header props
     */
    const getHeaderBindValues = computed(() => {
      const { showFullscreen, showClose, helpMessage, title } = unref(getProps)
      const opts = {
        title,
        showFullscreen,
        showClose,
        helpMessage,
        fullscreen: unref(fullscreenRef),
        prefixCls: `${prefixCls}-header`,
      } as ModalCustomHeader
      return opts
    })

    /**
     * 绑定弹窗内容区
     *
     * Bind content props
     */
    const getWrapperBindValue = computed(() => {
      const { dyncHeight, loading, loadingText } = unref(getProps)

      const opts = {
        dyncHeight,
        loading,
        loadingText,
        fullscreen: unref(fullscreenRef),
        modelValue: unref(visibleRef),
        prefixCls: `${prefixCls}__body`,
      } as ModalCustomContent
      return opts
    })

    /**
     * 通过实例设置 Props
     *
     * Setting Props by Instance
     * @param modalProps Modal Props
     */
    function setModalProps(modalProps: Partial<BasicModalProps>): void {
      propsRef.value = { ...(unref(propsRef) as Recordable), ...modalProps } as Recordable

      if (Reflect.has(modalProps, 'modelValue')) {
        visibleRef.value = !!modalProps.modelValue
      }

      if (Reflect.has(modalProps, 'fullscreen')) {
        fullscreenRef.value = !!modalProps.fullscreen
      }
    }

    /**
     * 处理点击关闭或取消
     *
     * Handling clicks to close or cancel
     * @param e
     */
    async function handleCancel(e: Event) {
      e?.stopPropagation()
      const { closeFn } = unref(getProps)

      if (typeof closeFn === 'function') {
        const isClose: boolean = await closeFn()
        visibleRef.value = !isClose
        return
      } else {
        visibleRef.value = false
      }

      emit('cancel', e)
    }

    /**
     * 点击确认，弹窗未主动关闭
     *
     * Click to confirm, the pop-up window is not automatically closed
     */
    function handleConfirm(e: Event) {
      emit('confirm', e)
    }

    /**
     * 弹窗内容高度变化时回调
     *
     * Callback when the height of the popup content changes
     * @param height
     */
    function handleHeightChange(height: number) {
      emit('height-change', height)
    }

    /**
     * 点击全屏图标执行全屏
     *
     * Click the full screen icon to perform full screen
     */
    function handleFullscreen() {
      setModalProps({ fullscreen: !unref(fullscreenRef) })
    }

    watchEffect(() => {
      visibleRef.value = !!props.modelValue
      fullscreenRef.value = !!props.fullscreen
    })

    watch(
      () => unref(visibleRef),
      (v) => {
        emit('visible-change', v)
        emit('update:modelValue', v)

        instance && modalMethod.emitVisible?.(v, instance.uid)

        nextTick(() => {
          // 如果 scrollTop 为 true，弹窗显示时会尝试滚动内容到顶部
          // If scrollTop is true, the popup will try to scroll the content to the top when displayed
          if (props?.scrollTop && v && unref(modalWrapperRef)) {
            unref(modalWrapperRef)?.scrollTop(0)
          }
        })
      },
      {
        immediate: false,
      },
    )

    return {
      prefixCls,
      getBindValues,
      getHeaderBindValues,
      getWrapperBindValue,
      visibleRef,
      fullscreenRef,
      getProps,
      modalWrapperRef,
      handleFullscreen,
      handleCancel,
      handleConfirm,
      handleHeightChange,
    }
  },
})
</script>
<style lang="scss">
$prefix-cls: '#{$tonyname}-basic-modal';

.#{$prefix-cls} {
  --el-dialog-bg-color: var(--background-primary-color);

  display: flex;
  flex-direction: column;
  overflow: hidden;

  .el-dialog {
    &__header {
      flex-shrink: 0;
      padding: 0;
      margin: 0;
    }

    &__body {
      flex-grow: 1;
      padding: 0;
      overflow: hidden;
    }

    &__footer {
      flex-shrink: 0;
      padding: 0;
    }
  }

  &-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-left: 16px;
    font-size: 16px;

    &__extra {
      display: flex;
      align-items: center;

      > span {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 56px;
        height: 56px;
        color: var(--text-secondary-color);
        cursor: pointer;

        &:hover {
          color: var(--primary-color);
          background: rgba(0, 0, 0, 0.05);
        }

        > svg {
          width: 1em;
          height: 1em;
        }
      }
    }
  }

  &__body {
    padding: 0 16px;

    .scrollbar__wrap {
      margin-bottom: 0;
    }

    .scrollbar__bar.is-horizontal {
      display: none;
    }

    // .scrollbar__view {
    //   height: 100%;
    //   overflow: hidden;
    // }
  }

  &-footer {
    width: 100%;
    padding: 10px 20px 20px;
  }
}
</style>
