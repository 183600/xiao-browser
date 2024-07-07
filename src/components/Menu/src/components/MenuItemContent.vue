<template>
  <span>
    <Icon v-if="getIcon" :name="getIcon" class="mr-2" />
    {{ getName }}
  </span>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'

import Icon from '@/components/Icon'

import { contentProps } from '../props'

export default defineComponent({
  name: 'MenuItemContent',
  components: {
    Icon,
  },
  props: contentProps,
  setup(props) {
    const getName = computed(() => props.item?.name)
    const getIcon = computed(() => props.item?.icon)

    return {
      getName,
      getIcon,
    }
  },
})
</script>
