<template>
  <CollapseContainer title="账号绑定" :canExpan="false">
    <List>
      <template v-for="item in list" :key="item.key">
        <ListItem>
          <template #thumb>
            <Icon
              v-if="item.avatar"
              class="avatar"
              :name="item.avatar"
              :color="item.color" />
          </template>
          <template #title>
            {{ item.title }}
            <el-button
              text
              size="small"
              v-if="item.extra"
              class="extra">
              {{ item.extra }}
            </el-button>
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
import { defineComponent } from 'vue'
import { ElButton } from 'element-plus'
import { CollapseContainer } from '@/components/CollapseContainer'
import Icon from '@/components/Icon'
import { List, ListItem } from '@/components/List'

import { accountBindList } from './data'

export default defineComponent({
  components: {
    ElButton,
    CollapseContainer,
    List,
    ListItem,
    Icon,
  },
  setup() {
    return {
      list: accountBindList,
    }
  },
})
</script>
<style lang="scss" scoped>
.avatar {
  font-size: 40px !important;
}

.extra {
  float: right;
  margin-top: 10px;
  margin-right: 30px;
  cursor: pointer;
}
</style>
