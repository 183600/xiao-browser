<template>
  <PageWrapper title="Icon组件示例">
    <el-row :gutter="24">
      <el-col :span="12">
        <el-card header="图标选择器(Iconify)" class="text-center">
          <IconPicker copy />
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card header="图标选择器(Svg)" class="text-center">
          <IconPicker mode="svg" />
        </el-card>
      </el-col>
    </el-row>

    <CardGrid title="element-plus Icon使用 (直接按需引入相应组件即可)" class="my-6" center>
      <CardGridItem><ArrowDownBold :style="{ width: '2rem' }" /></CardGridItem>
      <CardGridItem><ArrowLeftBold :style="{ width: '2rem' }" /></CardGridItem>
      <CardGridItem><ArrowRightBold :style="{ width: '2rem' }" /></CardGridItem>
    </CardGrid>

    <CardGrid title="Icon 组件使用 Iconify、Svg " center>
      <CardGridItem>
        <Icon name="ep:arrow-down" :size="30" />
      </CardGridItem>
      <CardGridItem>
        <Icon name="ep:arrow-left" spin :size="30" />
      </CardGridItem>
      <CardGridItem>
        <Icon name="ep:arrow-right" :size="30" />
      </CardGridItem>
      <CardGridItem>
        <Icon name="arrowdown|svg" :size="30" />
      </CardGridItem>
      <CardGridItem>
        <Icon name="arrowleft|svg" spin :size="30" />
      </CardGridItem>
      <CardGridItem>
        <Icon name="arrowright|svg" :size="30" />
      </CardGridItem>
    </CardGrid>

    <CardGrid title="SVG 文件图标" class="my-6" center>
      <CardGridItem>
        <SvgIcon name="sun" :size="30" />
      </CardGridItem>
      <CardGridItem>
        <SvgIcon name="moon" :size="30" spin />
      </CardGridItem>
      <CardGridItem>
        <SvgIcon name="bells" :size="30" color="#f00" />
      </CardGridItem>
    </CardGrid>
  </PageWrapper>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { ElRow, ElCol, ElCard } from 'element-plus'
import { ArrowDownBold, ArrowLeftBold, ArrowRightBold } from '@element-plus/icons-vue'

import { Icon } from '@/components/Icon'
import { IconPicker } from '@/components/IconPicker'
import { CardGrid, CardGridItem } from '@/components/CardGrid'
import { SvgIcon } from '@/components/SvgIcon'

export default defineComponent({
  components: {
    ElRow,
    ElCol,
    ElCard,
    IconPicker,
    ArrowDownBold,
    ArrowLeftBold,
    ArrowRightBold,
    Icon,
    CardGrid,
    CardGridItem,
    SvgIcon,
  },
  setup() {
    return {}
  },
})
</script>
