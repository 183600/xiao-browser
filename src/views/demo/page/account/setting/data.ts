import { BasicFormSchema } from '@/components/BasicForm'

export interface ListItem {
  key: string
  title: string
  description: string
  checked?: boolean
  extra?: string
  avatar?: string
  color?: string
}

// tab的list
export const settingList = [
  {
    key: '1',
    name: '基本设置',
    component: 'BaseSetting',
  },
  {
    key: '2',
    name: '安全设置',
    component: 'SecureSetting',
  },
  {
    key: '3',
    name: '账号绑定',
    component: 'AccountBind',
  },
  {
    key: '4',
    name: '新消息通知',
    component: 'MsgNotify',
  },
]

// 基础设置 form
export const baseSetschemas: BasicFormSchema[] = [
  {
    field: 'email',
    component: 'ElInput',
    label: '邮箱',
    colProps: { span: 18 },
  },
  {
    field: 'name',
    component: 'ElInput',
    label: '昵称',
    colProps: { span: 18 },
  },
  {
    field: 'introduction',
    component: 'ElInput',
    label: '个人简介',
    colProps: { span: 18 },
    componentProps: {
      type: 'textarea',
      rows: 4,
    },
  },
  {
    field: 'phone',
    component: 'ElInput',
    label: '联系电话',
    colProps: { span: 18 },
  },
  {
    field: 'address',
    component: 'ElInput',
    label: '所在地区',
    colProps: { span: 18 },
  },
]

export const BaseSettingForm = {
  email: '',
  name: '',
  introduction: '',
  phone: '',
  address: '',
}

// 安全设置 list
export const secureSettingList: ListItem[] = [
  {
    key: '1',
    title: '账户密码',
    description: '当前密码强度：强',
    extra: '修改',
  },
  {
    key: '2',
    title: '密保手机',
    description: '已绑定手机：138****8293',
    extra: '修改',
  },
  {
    key: '3',
    title: '密保问题',
    description: '未设置密保问题，密保问题可有效保护账户安全',
    extra: '修改',
  },
  {
    key: '4',
    title: '备用邮箱',
    description: '已绑定邮箱：ant***sign.com',
    extra: '修改',
  },
  {
    key: '5',
    title: 'MFA 设备',
    description: '未绑定 MFA 设备，绑定后，可以进行二次确认',
    extra: '修改',
  },
]

// 账号绑定 list
export const accountBindList: ListItem[] = [
  {
    key: '1',
    title: '绑定淘宝',
    description: '当前未绑定淘宝账号',
    extra: '绑定',
    avatar: 'ri:taobao-fill',
    color: '#ff4000',
  },
  {
    key: '2',
    title: '绑定支付宝',
    description: '当前未绑定支付宝账号',
    extra: '绑定',
    avatar: 'fa-brands:alipay',
    color: '#2eabff',
  },
  {
    key: '3',
    title: '绑定钉钉',
    description: '当前未绑定钉钉账号',
    extra: '绑定',
    avatar: 'ri:dingding-fill',
    color: '#2eabff',
  },
]

// 新消息通知 list
export const msgNotifyList: ListItem[] = [
  {
    key: '1',
    title: '账户密码',
    checked: false,
    description: '其他用户的消息将以站内信的形式通知',
  },
  {
    key: '2',
    title: '系统消息',
    checked: false,
    description: '系统消息将以站内信的形式通知',
  },
  {
    key: '3',
    title: '待办任务',
    checked: false,
    description: '待办任务将以站内信的形式通知',
  },
]
