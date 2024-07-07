<template>
  <ElInput
    :style="{ width }"
    placeholder="点击选择图标"
    :class="prefixCls"
    v-model="currentSelect">
    <template #append>
      <ElPopover :width="560" trigger="click" placement="bottom">
        <div :class="`${prefixCls}__search`">
          <ElInput
            v-model="searckKeyword"
            placeholder="搜索图标"
            @input="handleSearchChange"
            clearable />
        </div>
        <div :class="`${prefixCls}__list`" v-if="currentList.length">
          <ScrollContainer>
            <ul>
              <li
                v-for="icon in currentList"
                :key="icon"
                :class="{ 'is-actived': currentSelect === icon }"
                @click="handleClick(icon)"
                :title="icon">
                <SvgIcon v-if="isSvgMode" :name="icon" />
                <Icon :name="icon" v-else />
                <div>{{ icon }}</div>
              </li>
            </ul>
          </ScrollContainer>
        </div>
        <template v-else>
          <div class="p-5"><ElEmpty /></div>
        </template>

        <template #reference>
          <span :class="`${prefixCls}__icon`" v-if="isSvgMode && currentSelect">
            <SvgIcon :name="currentSelect" />
          </span>
          <span :class="`${prefixCls}__search`" v-else>
            <Icon :name="currentSelect || 'ion:apps-outline'" />
          </span>
        </template>
      </ElPopover>
    </template>
  </ElInput>
</template>

<script lang="ts">
import { ref, watchEffect, watch, unref, defineComponent } from 'vue'
import { ElInput, ElPopover, ElEmpty } from 'element-plus'
import svgIcons from 'virtual:svg-icons-names'

import { useDesign } from '@/hooks/web/useDesign'
import { ScrollContainer } from '@/components/ScrollContainer'
import Icon from '@/components/Icon'
import { SvgIcon } from '@/components/SvgIcon'
import { useCopyToClipboard } from '@/hooks/web/useCopyToClipboard'
import { useMessage } from '@/hooks/web/useMessage'

import iconsData from './data'

export default defineComponent({
  name: 'IconPicker',
  components: { ElInput, ElPopover, ElEmpty, ScrollContainer, Icon, SvgIcon },
  inheritAttrs: false,
  props: {
    /**
     * 绑定的值
     *
     * Bind value
     */
    modelValue: {
      type: String,
      default: '',
    },
    /**
     * 输入框宽度
     *
     * Input width
     */
    width: {
      type: String,
      default: '300px',
    },
    /**
     * 是否点击图标就复制
     *
     * Whether to copy when clicked
     */
    copy: { type: Boolean },
    /**
     * 弹窗图标模式
     *
     * Icon mode
     */
    mode: {
      type: String as PropType<'svg' | 'iconify'>,
      default: 'iconify',
    },
  },
  emits: ['change', 'update:modelValue'],
  setup(props, { emit }) {
    const isSvgMode = props.mode === 'svg'
    const icons = isSvgMode ? getSvgIcons() : getIcons()

    const currentSelect = ref('')
    const currentList = ref(icons)
    const searckKeyword = ref('')

    const { prefixCls } = useDesign('icon-picker')

    const { clipboardRef, isSuccessRef } = useCopyToClipboard(props.modelValue)
    const { createMessage } = useMessage()

    /**
     * 获取本地定义的图标列表
     *
     * Get a list of locally defined icons
     */
    function getIcons() {
      const data = iconsData as any
      const prefix: string = data?.prefix ?? ''
      let result: string[] = []
      if (prefix) {
        result = (data?.icons ?? []).map((item) => `${prefix}:${item}`)
      } else if (Array.isArray(iconsData)) {
        result = iconsData as string[]
      }
      return result
    }

    /**
     * 获取本地Svg文件图标
     *
     * Get local Svg file icon
     */
    function getSvgIcons() {
      return svgIcons.map((icon) => icon.replace('icon-', ''))
    }

    /**
     * 处理点击图标动作
     *
     * Handle click icon action
     */
    function handleClick(icon: string) {
      currentSelect.value = icon
      if (props.copy) {
        clipboardRef.value = icon
        if (unref(isSuccessRef)) {
          createMessage.success('复制图标成功!')
        }
      }
    }

    /**
     * 筛选图标
     *
     * Filter icon
     */
    function handleSearchChange(value: any) {
      if (!value) {
        currentList.value = icons
        return
      }
      currentList.value = icons.filter((item) => item.includes(value))
    }

    watchEffect(() => {
      currentSelect.value = props.modelValue
    })

    watch(
      () => currentSelect.value,
      (v) => {
        emit('update:modelValue', v)
        return emit('change', v)
      },
    )

    return {
      prefixCls,
      currentSelect,
      currentList,
      isSvgMode,
      searckKeyword,
      handleClick,
      handleSearchChange,
    }
  },
})
</script>

<style lang="scss">
$prefix-cls: '#{$tonyname}-icon-picker';

.#{$prefix-cls} {
  &__list {
    display: block;
    margin: 24px 0;

    .scrollbar {
      height: 300px;
    }

    ul {
      display: flex;
      flex-wrap: wrap;

      > li {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        width: calc(20% - 24px);
        padding: 6px;
        margin: 12px;
        font-size: 36px;
        color: var(--text-secondary-color);
        text-align: center;
        cursor: pointer;
        border: 1px solid var(--border-color-light);

        &:hover {
          background: var(--background-regular-color);
        }

        > div {
          font-size: 12px;
        }

        > svg {
          width: 36px;
          height: 36px;
        }
      }
    }
  }

  &__icon,
  &__search {
    display: flex;
    width: 100%;
    height: 100%;
    font-size: 20px;
  }
}
</style>
