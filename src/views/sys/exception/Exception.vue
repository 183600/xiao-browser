<script lang="tsx">
import type { PropType } from 'vue'
import { defineComponent, ref, computed, unref } from 'vue'
import { ExceptionEnum } from '@/enums/exceptionEnum'
import notDataSvg from '@/assets/svg/no-data.svg'
import netWorkSvg from '@/assets/svg/net-error.svg'
import svg403 from '@/assets/svg/403.svg'
import svg404 from '@/assets/svg/404.svg'
import svg500 from '@/assets/svg/500.svg'
import { useRoute } from 'vue-router'
import { useDesign } from '@/hooks/web/useDesign'
import { useGo, useRedo } from '@/hooks/web/usePage'
import { PageEnum } from '@/enums/pageEnum'
import { ElButton, ElResult } from 'element-plus'

interface MapValue {
  title: string
  subTitle: string
  btnText?: string
  icon?: string
  handler?: Fn
  status?: string
}

export default defineComponent({
  name: 'ErrorPage',
  props: {
    // 状态码
    status: {
      type: Number as PropType<number>,
      default: ExceptionEnum.PAGE_NOT_FOUND,
    },

    title: {
      type: String as PropType<string>,
      default: '',
    },

    subTitle: {
      type: String as PropType<string>,
      default: '',
    },

    full: {
      type: Boolean as PropType<boolean>,
      default: false,
    },
  },
  setup(props) {
    const statusMapRef = ref(new Map<string | number, MapValue>())

    const { query } = useRoute()
    const go = useGo()
    const redo = useRedo()
    const { prefixCls } = useDesign('app-exception-page')

    const getStatus = computed(() => {
      const { status: routeStatus } = query
      const { status } = props
      return Number(routeStatus) || status
    })

    const getMapValue = computed((): MapValue => {
      return unref(statusMapRef).get(unref(getStatus)) as MapValue
    })

    const backLoginText = '返回登录'
    const backHomeText = '返回首页'

    unref(statusMapRef).set(ExceptionEnum.PAGE_NOT_ACCESS, {
      title: '403',
      status: `${ExceptionEnum.PAGE_NOT_ACCESS}`,
      subTitle: '抱歉，您无权访问此页面',
      btnText: props.full ? backLoginText : backHomeText,
      handler: () => (props.full ? go(PageEnum.BASE_LOGIN) : go()),
      icon: svg403,
    })

    unref(statusMapRef).set(ExceptionEnum.PAGE_NOT_FOUND, {
      title: '404',
      status: `${ExceptionEnum.PAGE_NOT_FOUND}`,
      subTitle: '抱歉，您访问的页面不存在',
      btnText: props.full ? backLoginText : backHomeText,
      handler: () => (props.full ? go(PageEnum.BASE_LOGIN) : go()),
      icon: svg404,
    })

    unref(statusMapRef).set(ExceptionEnum.ERROR, {
      title: '500',
      status: `${ExceptionEnum.ERROR}`,
      subTitle: '抱歉，服务器报告错误',
      btnText: backHomeText,
      handler: () => go(),
      icon: svg500,
    })

    unref(statusMapRef).set(ExceptionEnum.PAGE_NOT_DATA, {
      title: '当前页无数据',
      subTitle: '',
      btnText: '刷新',
      handler: () => redo(),
      icon: notDataSvg,
    })

    unref(statusMapRef).set(ExceptionEnum.NET_WORK_ERROR, {
      title: '网络错误',
      subTitle: '抱歉，您的网络连接已断开，请检查您的网络！',
      btnText: '刷新',
      handler: () => redo(),
      icon: netWorkSvg,
    })

    return () => {
      const { title, subTitle, btnText, icon, handler, status } = unref(getMapValue) || {}
      return (
        <ElResult class={prefixCls} status={status as any} title={props.title || title} sub-title={props.subTitle || subTitle}>
          {{
            icon: () => (icon ? <img src={icon} /> : null),
            extra: () =>
              btnText && (
                <ElButton type='primary' onClick={handler}>
                  {() => btnText}
                </ElButton>
              ),
          }}
        </ElResult>
      )
    }
  },
})
</script>

<style lang="scss">
$prefix-cls: '#{$tonyname}-app-exception-page';

.#{$prefix-cls} {
  display: flex;
  flex-direction: column;
  align-items: center;

  > .el-result__icon {
    > img {
      width: 320px;
    }
  }
}
</style>
