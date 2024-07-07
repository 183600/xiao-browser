<template>
  <PageWrapper title="右键菜单示例">
    <CollapseContainer title="Simple">
      <el-button type="primary" @contextmenu="handleContext">Right Click on me</el-button>
    </CollapseContainer>

    <CollapseContainer title="Multiple" class="mt-4">
      <el-button type="primary" @contextmenu="handleMultipleContext">Right Click on me</el-button>
    </CollapseContainer>
  </PageWrapper>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { ElButton } from 'element-plus'
import { useContextMenu } from '@/hooks/web/useContextMenu'
import { CollapseContainer } from '@/components/CollapseContainer'
import { useMessage } from '@/hooks/web/useMessage'

export default defineComponent({
  components: { ElButton, CollapseContainer },
  setup() {
    const [createContextMenu] = useContextMenu()
    const { createMessage } = useMessage()
    function handleContext(e: MouseEvent) {
      createContextMenu({
        event: e,
        items: [
          {
            label: 'New',
            icon: 'ep:plus',
            handler: () => {
              createMessage.success('click new')
            },
          },
          {
            label: 'Open',
            icon: 'ep:folder',
            handler: () => {
              createMessage.success('click open')
            },
          },
        ],
      })
    }

    function handleMultipleContext(e: MouseEvent) {
      createContextMenu({
        event: e,
        items: [
          {
            label: 'New',
            icon: 'ep:plus',

            children: [
              {
                label: 'New1-1',
                icon: 'ep:plus',
                divider: true,
                children: [
                  {
                    label: 'New1-1-1',
                    handler: () => {
                      createMessage.success('click new')
                    },
                  },
                  {
                    label: 'New1-2-1',
                    disabled: true,
                  },
                ],
              },
              {
                label: 'New1-2',
                icon: 'ep:plus',
              },
            ],
          },
        ],
      })
    }

    return { handleContext, handleMultipleContext }
  },
})
</script>
