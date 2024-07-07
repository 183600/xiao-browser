import { BasicColumn } from '@/components/BasicTable'
import { BasicFormSchema } from '@/components/BasicForm'
import { h } from 'vue'
import { Icon } from '@/components/Icon'
import { ElTag } from 'element-plus'

export const columns: BasicColumn[] = [
  {
    label: '菜单名称',
    prop: 'menuName',
    width: 200,
    align: 'left',
  },
  {
    label: '图标',
    prop: 'icon',
    width: 100,
    customRender: ({ record }) => {
      return h(Icon, { name: record.icon })
    },
  },
  {
    label: '权限标识',
    prop: 'permission',
    width: 180,
  },
  {
    label: '组件',
    prop: 'component',
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
]

const isDir = (type: string) => type === '0'
const isMenu = (type: string) => type === '1'
const isButton = (type: string) => type === '2'

export const searchFormSchema: BasicFormSchema[] = [
  {
    field: 'menuName',
    label: '菜单名称',
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
    field: 'type',
    label: '菜单类型',
    component: 'ElRadioButton',
    defaultValue: '0',
    componentProps: {
      options: [
        { label: '目录', value: '0' },
        { label: '菜单', value: '1' },
        { label: '按钮', value: '2' },
      ],
    },
  },
  {
    field: 'menuName',
    label: '菜单名称',
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
    field: 'icon',
    label: '图标',
    component: 'ElSelect',
    slot: 'icon',
    required: true,
    ifShow: ({ values }) => !isButton(values.type),
  },

  {
    field: 'routePath',
    label: '路由地址',
    component: 'ElInput',
    required: true,
    ifShow: ({ values }) => !isButton(values.type),
  },
  {
    field: 'component',
    label: '组件路径',
    component: 'ElInput',
    ifShow: ({ values }) => isMenu(values.type),
  },
  {
    field: 'permission',
    label: '权限标识',
    component: 'ElInput',
    ifShow: ({ values }) => !isDir(values.type),
  },
  {
    field: 'status',
    label: '状态',
    component: 'ElRadioGroup',
    defaultValue: '0',
    componentProps: {
      options: [
        { label: '启用', value: '0' },
        { label: '禁用', value: '1' },
      ],
    },
  },
  {
    field: 'isExt',
    label: '是否外链',
    component: 'ElRadioGroup',
    defaultValue: '0',
    componentProps: {
      options: [
        { label: '否', value: '0' },
        { label: '是', value: '1' },
      ],
    },
    ifShow: ({ values }) => !isButton(values.type),
  },

  {
    field: 'keepalive',
    label: '是否缓存',
    component: 'ElRadioGroup',
    defaultValue: '0',
    componentProps: {
      options: [
        { label: '否', value: '0' },
        { label: '是', value: '1' },
      ],
    },
    ifShow: ({ values }) => isMenu(values.type),
  },

  {
    field: 'show',
    label: '是否显示',
    component: 'ElRadioGroup',
    defaultValue: '0',
    componentProps: {
      options: [
        { label: '是', value: '0' },
        { label: '否', value: '1' },
      ],
    },
    ifShow: ({ values }) => !isButton(values.type),
  },
]
