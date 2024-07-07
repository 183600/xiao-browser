import { BasicColumn } from '@/components/BasicTable'
import { BasicFormSchema } from '@/components/BasicForm'
import { h } from 'vue'
import { ElTag } from 'element-plus'

export const columns: BasicColumn[] = [
  {
    label: '部门名称',
    prop: 'deptName',
    width: 160,
    align: 'left',
  },
  {
    label: '排序',
    prop: 'orderNo',
    width: 100,
  },
  {
    label: '状态',
    prop: 'status',
    width: 100,
    customRender: ({ record }) => {
      const status = record.status
      const enable = ~~status === 0
      const color = enable ? 'success' : 'danger'
      const text = enable ? '启用' : '停用'
      return h(ElTag, { type: color }, () => text)
    },
  },
  {
    label: '创建时间',
    prop: 'createTime',
    width: 180,
  },
  {
    label: '备注',
    prop: 'remark',
  },
]

export const searchFormSchema: BasicFormSchema[] = [
  {
    field: 'deptName',
    label: '部门名称',
    component: 'ElInput',
    colProps: { span: 8 },
  },
  {
    field: 'status',
    label: '状态',
    component: 'ElSelect',
    componentProps: {
      options: [
        { label: '启用', value: '0' },
        { label: '停用', value: '1' },
      ],
    },
    colProps: { span: 8 },
  },
]

export const formSchema: BasicFormSchema[] = [
  {
    field: 'deptName',
    label: '部门名称',
    component: 'ElInput',
    required: true,
  },
  {
    field: 'orderNo',
    label: '排序',
    component: 'ElInputNumber',
    defaultValue: 0,
    required: true,
  },
  {
    field: 'status',
    label: '状态',
    component: 'ElRadioButton',
    defaultValue: '0',
    componentProps: {
      options: [
        { label: '启用', value: '0' },
        { label: '停用', value: '1' },
      ],
    },
    required: true,
  },
  {
    label: '备注',
    field: 'remark',
    component: 'ElInput',
    componentProps: {
      type: 'textarea',
    },
  },
]
