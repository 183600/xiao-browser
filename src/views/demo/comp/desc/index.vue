<template>
  <PageWrapper title="详情组件示例">
    <BasicDescription
      title="基础示例"
      :column="3"
      border
      :data="demoData"
      :schema="schema">
      <template #phone="val">
        <div>
          Call:
          <strong>{{ val }}</strong>
        </div>
      </template>
    </BasicDescription>

    <BasicDescription
      class="my-4"
      title="垂直示例"
      direction="vertical"
      :collapseOptions="{
        canExpand: true,
        helpMessage: 'help me',
      }"
      :column="2"
      border
      :data="demoData"
      :schema="schema" />

    <BasicDescription @register="register" />
  </PageWrapper>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { BasicDescription, useDescription } from '@/components/BasicDescription'
import { demoData, schema } from './data'

export default defineComponent({
  components: { BasicDescription },
  setup() {
    const [register] = useDescription({
      title: 'useDescription 方式',
      data: demoData,
      schema: schema,
    })

    return { demoData, schema, register }
  },
})
</script>
