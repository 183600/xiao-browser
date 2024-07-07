<script lang="tsx">
import type { Placement } from 'element-plus'

import { defineComponent } from 'vue'
import { ElTooltip } from 'element-plus'

import { SvgIcon } from '@/components/SvgIcon'
import { getSlot } from '@/utils/helper/tsxHelper'
import { useDesign } from '@/hooks/web/useDesign'

export default defineComponent({
  name: 'BasicHelp',
  components: { SvgIcon },
  props: {
    /**
     * 文本内容，支持单条文本或多条数组
     *
     * Text content, supports single text or multiple arrays
     */
    text: {
      type: [Array, String] as PropType<string | string[]>,
    },
    /**
     * 是否显示文本索引，仅多条有效
     */
    showIndex: Boolean,
    /**
     * 主题
     *
     * Theme effect
     */
    effect: {
      type: String,
      default: 'dark',
    },
    /**
     * 文本弹出方向
     *
     * Text popup direction
     */
    placement: {
      type: String as PropType<Placement>,
      default: 'right',
    },
  },
  setup(props, { slots }) {
    const { prefixCls } = useDesign('basic-help')

    /**
     * 渲染内容
     *
     * Render content
     */
    function renderTitle() {
      const textList = props.text || ''

      // 单条内容
      // single content
      if (typeof textList === 'string') {
        return textList
      }

      // 多条内容
      // multiple content
      if (Array.isArray(textList)) {
        return textList.map((text, index) => {
          return (
            <p key={text}>
              <>
                {props.showIndex ? `${index + 1}. ` : ''}
                {text}
              </>
            </p>
          )
        })
      }
      return null
    }

    return () => {
      return (
        <ElTooltip popper-class={`${prefixCls}__wrap`} effect={props.effect} placement={props.placement}>
          {{
            content: () => renderTitle(),
            default: () => <span class={prefixCls}>{getSlot(slots) || <SvgIcon name='info-cirlce-o' />}</span>,
          }}
        </ElTooltip>
      )
    }
  },
})
</script>

<style lang="scss">
$prefix-cls: '#{$tonyname}-basic-help';

.#{$prefix-cls} {
  display: inline-flex;
  flex-wrap: wrap;
  margin-left: 4px;
  font-size: 0.875rem;
  color: var(--text-secondary-color);
  cursor: pointer;

  &:hover {
    color: var(--text-primary-color);
  }
}
</style>
