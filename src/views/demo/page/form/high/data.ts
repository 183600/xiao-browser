import { BasicFormSchema } from '@/components/BasicForm'

const basicOptions: LabelValueOptions = [
  {
    label: '付晓晓',
    value: '1',
  },
  {
    label: '周毛毛',
    value: '2',
  },
]

const storeTypeOptions: LabelValueOptions = [
  {
    label: '私密',
    value: '1',
  },
  {
    label: '公开',
    value: '2',
  },
]

export const schemas: BasicFormSchema[] = [
  {
    field: 'f1',
    component: 'ElInput',
    label: '仓库名',
    required: true,
  },
  {
    field: 'f2',
    component: 'ElInput',
    label: '仓库域名',
    required: true,
    componentProps: {
      addonBefore: 'http://',
      addonAfter: 'com',
    },
    colProps: {
      offset: 2,
    },
  },
  {
    field: 'f3',
    component: 'ElSelect',
    label: '仓库管理员',
    componentProps: {
      options: basicOptions,
    },
    required: true,
    colProps: {
      offset: 2,
    },
  },
  {
    field: 'f4',
    component: 'ElSelect',
    label: '审批人',
    componentProps: {
      options: basicOptions,
    },
    required: true,
  },
  {
    field: 'f5',
    component: 'ElDatePicker',
    label: '生效日期',
    required: true,
    colProps: {
      offset: 2,
    },
    componentProps: {
      type: 'daterange',
    },
  },
  {
    field: 'f6',
    component: 'ElSelect',
    label: '仓库类型',
    componentProps: {
      options: storeTypeOptions,
    },
    required: true,
    colProps: {
      offset: 2,
    },
  },
]
export const taskSchemas: BasicFormSchema[] = [
  {
    field: 't1',
    component: 'ElInput',
    label: '任务名',
    required: true,
  },
  {
    field: 't2',
    component: 'ElInput',
    label: '任务描述',
    required: true,
    colProps: {
      offset: 2,
    },
  },
  {
    field: 't3',
    component: 'ElSelect',
    label: '执行人',
    componentProps: {
      options: basicOptions,
    },
    required: true,
    colProps: {
      offset: 2,
    },
  },
  {
    field: 't4',
    component: 'ElSelect',
    label: '责任人',
    componentProps: {
      options: basicOptions,
    },
    required: true,
  },
  {
    field: 't5',
    component: 'ElTimePicker',
    label: '生效日期',
    required: true,
    componentProps: {
      style: { width: '100%' },
    },
    colProps: {
      offset: 2,
    },
  },
  {
    field: 't6',
    component: 'ElSelect',
    label: '任务类型',
    componentProps: {
      options: storeTypeOptions,
    },
    required: true,
    colProps: {
      offset: 2,
    },
  },
]
