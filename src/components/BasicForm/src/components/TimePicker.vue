<template>
  <ElTimePicker clearable v-model:modelValue="state" />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { ElTimePicker } from 'element-plus'
import { useRuleFormItem } from '@/hooks/component/useFormItem'

export default defineComponent({
  name: 'TimePicker',
  components: { ElTimePicker },
  props: {
    modelValue: [Array, Object, String],
  },
  emits: ['change'],
  setup(props) {
    const [state] = useRuleFormItem(props)

    return { state }
  },
})
</script>
