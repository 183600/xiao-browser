<template>
  <div :class="prefixCls">
    <div :class="prefixCls + '-thumb'" v-if="$slots.thumb">
      <slot name="thumb"></slot>
    </div>
    <div :class="prefixCls + '-thumb'" v-else-if="thumb">
      <img :src="thumb" :alt="title || 'pic'" />
    </div>
    <div :class="prefixCls + '-content'" v-if="$slots.title || $slots.description">
      <h4 :class="prefixCls + '-title'" v-if="$slots.title">
        <slot name="title"></slot>
      </h4>
      <h4 :class="prefixCls + '-title'" v-else-if="title">
        {{ title }}
      </h4>
      <div :class="prefixCls + '-description'" v-if="$slots.description">
        <slot name="description"></slot>
      </div>
      <div :class="prefixCls + '-description'" v-else-if="description">
        {{ description }}
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useDesign } from '@/hooks/web/useDesign'

export default defineComponent({
  name: 'ListMeta',
  components: {},
  props: {
    thumb: {
      type: String,
      default: '',
    },
    title: {
      type: String,
      default: '',
    },
    description: {
      type: String,
      default: '',
    },
  },
  setup() {
    const { prefixCls } = useDesign('basic-list-item-meta')

    return {
      prefixCls,
    }
  },
})
</script>
