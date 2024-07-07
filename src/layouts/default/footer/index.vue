<template>
  <div :class="prefixCls" v-if="getShowLayoutFooter" ref="footerRef">
    <div :class="`${prefixCls}__links`">
      <a @click="openWindow(SITE_URL)">在线预览</a>

      <a @click="openWindow(GITHUB_URL)" :class="`${prefixCls}__github`">Github</a>

      <a @click="openWindow(DOC_URL)">在线文档</a>
    </div>
    <div>Copyright &copy;2022 Tony Admin</div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, unref, ref } from 'vue'
import { useRouter } from 'vue-router'

import { DOC_URL, GITHUB_URL, SITE_URL } from '@/settings/siteSetting'
import { useDesign } from '@/hooks/web/useDesign'
import { openWindow } from '@/utils'
import { useRootSetting } from '@/hooks/setting/useRootSetting'

import { useLayoutHeight } from '../content/useContentViewHeight'

export default defineComponent({
  name: 'LayoutFooter',
  components: {},
  setup() {
    const { getShowFooter } = useRootSetting()
    const { currentRoute } = useRouter()
    const { prefixCls } = useDesign('layout-footer')

    const footerRef = ref<ComponentRef>(null)
    const { setFooterHeight } = useLayoutHeight()

    const getShowLayoutFooter = computed(() => {
      if (unref(getShowFooter)) {
        const footerEl = unref(footerRef)?.$el
        setFooterHeight(footerEl?.offsetHeight || 0)
      } else {
        setFooterHeight(0)
      }
      return unref(getShowFooter) && !unref(currentRoute).meta?.hiddenFooter
    })

    return {
      getShowLayoutFooter,
      prefixCls,
      DOC_URL,
      GITHUB_URL,
      SITE_URL,
      openWindow,
      footerRef,
    }
  },
})
</script>

<style lang="scss">
$prefix-cls: '#{$tonyname}-layout-footer';

.#{$prefix-cls} {
  color: rgba(0, 0, 0, 0.45);
  text-align: center;

  &__links {
    margin-bottom: 8px;

    a {
      color: rgba(0, 0, 0, 0.45);

      &:hover {
        color: rgba(0, 0, 0, 0.85);
      }
    }
  }

  &__github {
    margin: 0 30px;

    &:hover {
      color: rgba(0, 0, 0, 0.85);
    }
  }
}
</style>
