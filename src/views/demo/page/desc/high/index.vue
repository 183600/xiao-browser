<template>
  <PageWrapper
    title="单号：234231029431"
    description="组合详情"
    class="p-4"
    headerClass="pb-0"
    contentBackground>
    <template #toolbar>
      <el-button>操作一</el-button>
      <el-button>操作二</el-button>
      <el-button type="primary">主操作</el-button>
    </template>

    <template #extra>
      <el-tabs v-model="tabActivedName">
        <el-tab-pane name="detail" label="详情" />
        <el-tab-pane name="rule" label="规则" />
      </el-tabs>
    </template>

    <div class="pt-4 m-4" v-if="tabActivedName === 'detail'">
      <el-descriptions size="small" :column="2">
        <el-descriptions-item label="创建人">曲丽丽</el-descriptions-item>
        <el-descriptions-item label="订购产品">XX 服务</el-descriptions-item>
        <el-descriptions-item label="创建时间">2021-01-01</el-descriptions-item>
        <el-descriptions-item label="关联单据"><el-button text>12421</el-button></el-descriptions-item>
        <el-descriptions-item label="生效日期">2021-01-01 ~ 2022-01-01</el-descriptions-item>
        <el-descriptions-item label="备注">请于两个工作日内确认</el-descriptions-item>
      </el-descriptions>

      <el-card header="流程进度" class="mt-4">
        <el-steps :active="1" finish-status="success">
          <el-step title="创建项目">
            <template #description>
              <div>Tony</div>
              <p>2016-12-12 12:32</p>
            </template>
          </el-step>
          <el-step title="部门初审">
            <template #description>
              <p>Chad</p>
            </template>
          </el-step>
          <el-step title="财务复核" />
          <el-step title="完成" />
        </el-steps>
      </el-card>

      <el-card header="用户信息" class="mt-4">
        <el-descriptions :column="3">
          <el-descriptions-item label="用户姓名">付小小</el-descriptions-item>
          <el-descriptions-item label="会员卡号">XX 32943898021309809423</el-descriptions-item>
          <el-descriptions-item label="身份证">3321944288191034921</el-descriptions-item>
          <el-descriptions-item label="联系方式">18112345678</el-descriptions-item>
          <el-descriptions-item label="联系地址" :span="2">曲丽丽 18100000000 浙江省杭州市西湖区黄姑山路工专路交叉路口</el-descriptions-item>
        </el-descriptions>

        <el-descriptions title="信息组" :column="3">
          <el-descriptions-item label="某某数据">111</el-descriptions-item>
          <el-descriptions-item label="该数据更新时间">2017-08-08</el-descriptions-item>
          <el-descriptions-item label="某某数据">725</el-descriptions-item>
          <el-descriptions-item label="该数据更新时间">2017-08-08</el-descriptions-item>
        </el-descriptions>

        <el-card header="多层级信息组" class="mt-4">
          <el-descriptions title="组名称" :column="3">
            <el-descriptions-item label="负责人">林东东</el-descriptions-item>
            <el-descriptions-item label="角色码">1234567</el-descriptions-item>
            <el-descriptions-item label="所属部门">XX公司 - YY部</el-descriptions-item>
            <el-descriptions-item label="过期时间">2017-08-08</el-descriptions-item>
            <el-descriptions-item label="描述" :span="2">这段描述很长很长很长很长很长很长很长很长很长很长很长很长很长很长...</el-descriptions-item>
          </el-descriptions>
          <el-divider />
          <el-descriptions title="组名称" :column="1">
            <el-descriptions-item label="学名">Citrullus lanatus (Thunb.) Matsum. et Nakai一年生蔓生藤本；茎、枝粗壮，具明显的棱。卷须较粗..</el-descriptions-item>
          </el-descriptions>
          <el-divider />
          <el-descriptions title="组名称" :column="1">
            <el-descriptions-item label="负责人">付小小</el-descriptions-item>
            <el-descriptions-item label="角色码">1234568</el-descriptions-item>
          </el-descriptions>
        </el-card>
      </el-card>
      <el-card header="用户近半年来电记录" class="my-8">
        <el-empty />
      </el-card>
      <BasicTable v-bind="registerTimeTableFields" @register="registerTimeTable" />
    </div>
    <div v-else class="pt-4 m-4">~~~ rule ~~~</div>
  </PageWrapper>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'
import { ElButton, ElTabs, ElTabPane, ElDescriptions, ElDescriptionsItem, ElStep, ElSteps, ElCard, ElDivider, ElEmpty } from 'element-plus'
import { BasicTable, useTable } from '@/components/BasicTable'
import { refundTimeTableData, refundTimeTableSchema } from './data'

export default defineComponent({
  components: {
    ElButton,
    ElTabs,
    ElTabPane,
    ElDescriptions,
    ElDescriptionsItem,
    ElStep,
    ElSteps,
    ElCard,
    ElDivider,
    ElEmpty,
    BasicTable,
  },
  setup() {
    const tabActivedName = ref('detail')
    const registerTimeTableFields = reactive<any>({
      title: '退货进度',
      columns: refundTimeTableSchema,
      dataSource: refundTimeTableData,
      showIndexColumn: false,
      scroll: { y: 300 },
    })
    const [registerTimeTable] = useTable()
    return {
      registerTimeTableFields,
      registerTimeTable,
      tabActivedName,
    }
  },
})
</script>
