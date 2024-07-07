import { DescItem } from '@/components/BasicDescription'
import { BasicColumn } from '@/components/BasicTable'
import { ElTag, ElButton } from 'element-plus'

export const refundData = {
  a1: '1000000000',
  a2: '已取货',
  a3: '1234123421',
  a4: '3214321432',
}

export const personData = {
  b1: '付小小',
  b2: '18100000000',
  b3: '菜鸟仓储',
  b4: '浙江省杭州市西湖区万塘路18号',
  b5: '无',
}
export const refundSchema: DescItem[] = [
  {
    field: 'a1',
    label: '取货单号',
  },
  {
    field: 'a2',
    label: '状态',
  },
  {
    field: 'a3',
    label: '销售单号',
  },
  {
    field: 'a4',
    label: '子订单',
  },
]
export const personSchema: DescItem[] = [
  {
    field: 'b1',
    label: '用户姓名',
  },
  {
    field: 'b2',
    label: '联系电话',
  },
  {
    field: 'b3',
    label: '常用快递',
  },
  {
    field: 'b4',
    label: '取货地址',
  },
  {
    field: 'b5',
    label: '备注',
  },
]

export const refundTableSchema: BasicColumn[] = [
  {
    label: '商品编号',
    width: 150,
    prop: 't1',
    customRender: ({ record }) => {
      return (
        <ElButton text size='small'>
          {() => record.t1}
        </ElButton>
      )
    },
  },
  {
    label: '商品名称',
    prop: 't2',
  },
  {
    label: '商品条码',
    prop: 't3',
  },
  {
    label: '单价',
    prop: 't4',
  },
  {
    label: '数量（件）',
    prop: 't5',
  },
  {
    label: '金额',
    prop: 't6',
  },
]
export const refundTimeTableSchema: BasicColumn[] = [
  {
    label: '时间',
    prop: 't1',
  },
  {
    label: '当前进度',
    prop: 't2',
  },
  {
    label: '状态',
    prop: 't3',
    customRender: ({ record }) => {
      return <ElTag type='success'>{record.t3}</ElTag>
    },
  },
  {
    label: '操作员ID',
    prop: 't4',
  },
  {
    label: '耗时',
    prop: 't5',
  },
]

export const refundTableData: any[] = [
  {
    t1: 1234561,
    t2: '矿泉水 550ml',
    t3: '12421432143214321',
    t4: '2.00',
    t5: 1,
    t6: 2.0,
  },
  {
    t1: 1234562,
    t2: '矿泉水 550ml',
    t3: '12421432143214321',
    t4: '2.00',
    t5: 2,
    t6: 2.0,
  },
  {
    t1: 1234562,
    t2: '矿泉水 550ml',
    t3: '12421432143214321',
    t4: '2.00',
    t5: 2,
    t6: 2.0,
  },
  {
    t1: 1234562,
    t2: '矿泉水 550ml',
    t3: '12421432143214321',
    t4: '2.00',
    t5: 2,
    t6: 2.0,
  },
]

export const refundTimeTableData: any[] = [
  {
    t1: '2017-10-01 14:10',
    t2: '联系客户',
    t3: '进行中',
    t4: '取货员 ID1234',
    t5: '5mins',
  },
  {
    t1: '2017-10-01 14:10',
    t2: '取货员出发',
    t3: '成功',
    t4: '取货员 ID1234',
    t5: '5mins',
  },
  {
    t1: '2017-10-01 14:10',
    t2: '取货员接单',
    t3: '成功',
    t4: '系统',
    t5: '5mins',
  },
  {
    t1: '2017-10-01 14:10',
    t2: '申请审批通过',
    t3: '成功',
    t4: '用户',
    t5: '1h',
  },
]
