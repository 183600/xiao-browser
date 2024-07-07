<template>
  <ElImage
    v-if="url"
    :src="url"
    fit="cover"
    :preview-src-list="[url]"
    style="width: 100px; height: 100px" />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { ElImage } from 'element-plus'

export default defineComponent({
  name: 'UploadThumb',
  components: { ElImage },
  props: {
    url: String,
  },
})
</script>
