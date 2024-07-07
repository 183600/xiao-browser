<template>
  <div v-if="showThumb" :style="getThumbStyle" :class="`${prefixCls}-entry-thumb`">
    <template v-if="fileList?.length">
      <div :class="`${prefixCls}-entry-thumb__img`">
        <img :src="fileList[0]" :alt="fileList[0]" />
        <div :class="`${prefixCls}-entry-thumb__img-inner`">
          <div :class="`${prefixCls}-entry-thumb__img--upload`" @click="openUpload()">
            <SvgIcon name="cloud-upload" />
            上传
          </div>
          <div :class="`${prefixCls}-entry-thumb__img--preview`" v-if="getProps.showPreview" @click="openPreview()">
            <SvgIcon name="eye" />
            预览
            <template v-if="fileList.length && showPreviewNumber">({{ fileList.length }})</template>
          </div>
        </div>
      </div>
    </template>
    <template v-else>
      <div :class="`${prefixCls}-entry-thumb__btn`" @click="openUpload()">
        <SvgIcon name="cloud-upload" />
      </div>
    </template>
  </div>
  <ElButtonGroup :class="`${prefixCls}-entry-simple`" v-else>
    <ElButton type="primary" @click="openUpload()">
      <SvgIcon name="cloud-upload" class="mr-1" />
      <span>上传</span>
    </ElButton>
    <ElTooltip placement="bottom" v-if="showPreview">
      <template #content>
        已上传
        <template v-if="fileList.length">
          {{ fileList.length }}
        </template>
      </template>
      <ElButton @click="openPreview()" v-if="getProps.showPreview">
        <SvgIcon name="eye" />
        <template v-if="fileList.length && showPreviewNumber">{{ fileList.length }}</template>
      </ElButton>
    </ElTooltip>
  </ElButtonGroup>

  <UploadModal
    v-bind="getBindValues"
    :prefixCls="`${prefixCls}-upload-modal`"
    @register="registerUploadModal"
    @change="handleChange"
    @delete="handleDelete" />

  <UploadPreviewModal
    :prefixCls="`${prefixCls}-preview-modal`"
    @register="registerPreviewModal"
    @list-change="handlePreviewChange"
    @delete="handlePreviewDelete" />
</template>

<script lang="ts">
import { defineComponent, ref, watch, unref, computed, CSSProperties } from 'vue'
import { ElButton, ElButtonGroup, ElTooltip } from 'element-plus'
import { omit } from 'lodash-es'

import { useModal } from '@/components/BasicModal'
import { SvgIcon } from '@/components/SvgIcon'
import { useDesign } from '@/hooks/web/useDesign'

import UploadModal from './components/UploadModal.vue'
import UploadPreviewModal from './components/PreviewModal.vue'
import { basicProps, customProps } from './props'

export default defineComponent({
  name: 'BasicUpload',
  components: { ElTooltip, ElButton, ElButtonGroup, UploadModal, UploadPreviewModal, SvgIcon },
  props: basicProps,
  emits: ['change', 'delete', 'preview-delete', 'update:modelValue'],

  setup(props, { emit, attrs }) {
    const fileList = ref<string[]>([])
    const { prefixCls } = useDesign('basic-upload')

    const [registerUploadModal, { openModal: openUploadModal }] = useModal()
    const [registerPreviewModal, { openModal: openPreviewModal }] = useModal()

    /**
     * 是否显示预览按钮入口
     *
     * Whether to show the preview button entry
     */
    const showPreview = computed(() => {
      const { emptyHidePreview } = props
      if (!emptyHidePreview) return true
      return emptyHidePreview ? fileList.value.length > 0 : true
    })

    /**
     * 获取预览图的样式
     *
     * Get thumb style
     */
    const getThumbStyle = computed((): CSSProperties => {
      const { thumbSize } = props

      return {
        ['--thumb-size' as any]: `${thumbSize}px`,
      }
    })
    /**
     * 获取更新 Props
     *
     * Merge Props
     */
    const getProps = computed(() => {
      return {
        ...props,
      }
    })
    /**
     * 绑定上传弹窗Props
     *
     * Bind upload modal props
     */
    const getBindValues = computed(() => {
      const opts = {
        ...attrs,
        ...unref(getProps),
      }

      // 绑定组件Porps前，移除自定义附加项
      // Before binding component Porps, remove custom add-ons
      const customOpts = Object.keys(customProps)

      return omit(opts, customOpts)
    })

    /**
     * 打开上传
     *
     * Open upload modal
     */
    function openUpload() {
      openUploadModal(true, unref(fileList))
    }
    /**
     * 打开预览弹窗
     *
     * Open preview modal
     */
    function openPreview() {
      openPreviewModal(true, unref(fileList))
    }
    /**
     * 上传弹窗文件列表改变时回调
     *
     * Callback when upload popup file list changes
     */
    function handleChange(urls: string[]) {
      fileList.value = [...unref(fileList), ...(urls || [])]
      emit('update:modelValue', fileList.value)
      emit('change', fileList.value)
    }

    /**
     * 预览弹窗文件列表改变时回调
     *
     * Callback when the preview popup file list changes
     * @param urls
     */
    function handlePreviewChange(urls: string[]) {
      fileList.value = [...(urls || [])]
      emit('update:modelValue', fileList.value)
      emit('change', fileList.value)
    }

    /**
     * 上传弹窗列表删除文件回调
     *
     * Upload popup list delete file
     * @param record FileItem
     */
    function handleDelete(record: Recordable) {
      emit('delete', record)
    }

    /**
     * 上传弹窗列表删除文件回调
     *
     * Preview popup list delete file
     * @param url
     */
    function handlePreviewDelete(url: string) {
      emit('preview-delete', url)
    }

    watch(
      () => props.modelValue,
      (value = []) => {
        fileList.value = Array.isArray(value) ? value : []
      },
      { immediate: true },
    )

    return {
      prefixCls,
      fileList,
      showPreview,
      getProps,
      getBindValues,
      getThumbStyle,
      registerUploadModal,
      openUpload,
      handleChange,
      handlePreviewChange,
      registerPreviewModal,
      openPreview,
      handleDelete,
      handlePreviewDelete,
    }
  },
})
</script>

<style lang="scss">
$prefix-cls: '#{$tonyname}-basic-upload';

.#{$prefix-cls} {
  &-entry-thumb {
    &__img,
    &__btn {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      width: var(--thumb-size);
      height: var(--thumb-size);
      overflow: hidden;
      color: var(--text-primary-color);
      cursor: pointer;
      background: var(--background-primary-color);
      border: 1px solid var(--border-color);
      border-radius: var(--radius-base);
      transition: all 0.15s;

      &:hover {
        color: var(--primary-color);
        border-color: var(--primary-color);
        opacity: 0.75;
      }
    }

    &__btn {
      > span {
        font-size: calc(var(--thumb-size) / 2) !important;
      }
    }

    &__img {
      &-inner {
        position: absolute;
        top: 50%;
        right: 10%;
        left: 10%;
        z-index: 3;
        color: var(--text-primary-reverse);
        visibility: hidden;
        opacity: 0;
        transition: all 0.15s;
        transform: translateY(-50%);
      }

      &--upload,
      &--preview {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 44px;
        margin-bottom: 8px;
        color: #fff;
        background: var(--primary-color);
        border-radius: var(--radius-base);

        &:hover {
          opacity: 0.9;
        }

        > span {
          margin-right: 8px;
        }
      }

      &--preview {
        color: var(--primary-color);
        background: #fff;
      }

      &::after {
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        visibility: hidden;
        content: '';
        background: rgba(0, 0, 0, 0.35);
      }

      &:hover {
        &::after {
          visibility: visible;
        }

        .#{$prefix-cls}-entry-thumb__img-inner {
          visibility: visible;
          opacity: 1;
        }
      }
    }
  }
}
</style>
