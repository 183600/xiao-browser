<template>
  <div :class="prefixCls">
    <slot></slot>
    <ListMeta :thumb="thumb" :title="title" :description="description">
      <template #[item]="data" v-for="item in Object.keys($slots)">
        <slot :name="item" v-bind="data || {}"></slot>
      </template>
    </ListMeta>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import { useDesign } from '@/hooks/web/useDesign'

import ListMeta from './meta.vue'

export default defineComponent({
  name: 'ListItem',
  components: { ListMeta },
  props: {
    /**
     * Thumbnail address
     */
    thumb: {
      type: String,
      default: '',
    },
    /**
     * List title
     */
    title: {
      type: String,
      default: '',
    },
    /**
     * List description
     */
    description: {
      type: String,
      default: '',
    },
  },
  setup() {
    const { prefixCls } = useDesign('basic-list-item')

    return {
      prefixCls,
    }
  },
})
</script>
