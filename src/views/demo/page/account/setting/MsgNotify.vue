<template>
  <CollapseContainer title="新消息通知" :canExpan="false">
    <List>
      <template v-for="item in list" :key="item.key">
        <ListItem>
          <template #title>
            {{ item.title }}
            <el-switch
              v-model="item.checked"
              class="extra"
              active-text="开"
              inactive-text="关"
              inline-prompt />
          </template>
          <template #description>
            <div>{{ item.description }}</div>
          </template>
        </ListItem>
      </template>
    </List>
  </CollapseContainer>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue'
import { ElSwitch } from 'element-plus'
import { CollapseContainer } from '@/components/CollapseContainer'
import { List, ListItem } from '@/components/List'

import { msgNotifyList } from './data'

export default defineComponent({
  components: {
    ElSwitch,
    CollapseContainer,
    List,
    ListItem,
  },
  setup() {
    const list = reactive(msgNotifyList)

    return {
      list,
    }
  },
})
</script>
<style lang="scss" scoped>
.extra {
  float: right;
  margin-top: 10px;
  margin-right: 30px;
}
</style>
