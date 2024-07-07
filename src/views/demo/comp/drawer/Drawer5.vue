<template>
  <BasicDrawer v-bind="$attrs" :isDetail="true" title="Drawer Title5">
    <p class="p-20">Content Message</p>
    <template #toolbar>toolbar</template>
  </BasicDrawer>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { BasicDrawer } from '@/components/BasicDrawer'
export default defineComponent({
  components: { BasicDrawer },
})
</script>
