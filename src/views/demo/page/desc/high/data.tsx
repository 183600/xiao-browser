import { BasicColumn } from '@/components/BasicTable'

import { ElTag } from 'element-plus'

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

export const refundTimeTableData: any[] = [
  {
    t1: '2017-10-01 14:10',
    t2: '联系客户',
    t3: '进行中',
    t3s: 'primary',
    t4: '取货员 ID1234',
    t5: '5mins',
  },
  {
    t1: '2017-10-01 14:10',
    t2: '取货员出发',
    t3: '成功',
    t3s: 'success',
    t4: '取货员 ID1234',
    t5: '5mins',
  },
  {
    t1: '2017-10-01 14:10',
    t2: '取货员接单',
    t3: '成功',
    t3s: 'success',
    t4: '系统',
    t5: '5mins',
  },
  {
    t1: '2017-10-01 14:10',
    t2: '申请审批通过',
    t3: '成功',
    t3s: 'success',
    t4: '用户',
    t5: '1h',
  },
]
