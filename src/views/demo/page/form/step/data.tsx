import { BasicFormSchema } from '@/components/BasicForm'

export const step1Schemas: BasicFormSchema[] = [
  {
    field: 'account',
    component: 'ElSelect',
    label: '付款账户',
    required: true,
    defaultValue: '1',
    componentProps: {
      options: [
        {
          label: 'anncwb@126.com',
          value: '1',
        },
      ],
    },
  },
  {
    field: 'fac',
    component: 'ElInput',
    label: '收款账户',
    required: true,
    defaultValue: 'test@example.com',
    slot: 'fac',
  },
  {
    field: 'pay',
    component: 'ElInput',
    label: '',
    defaultValue: 'zfb',
    show: false,
  },
  {
    field: 'payeeName',
    component: 'ElInput',
    label: '收款人姓名',
    defaultValue: 'Tony',
    required: true,
  },
  {
    field: 'money',
    component: 'ElInput',
    label: '转账金额',
    defaultValue: '500',
    required: true,
    renderComponentContent: () => {
      return {
        append: () => '￥',
      }
    },
  },
]

export const step2Schemas: BasicFormSchema[] = [
  {
    field: 'pwd',
    component: 'ElInput',
    label: '支付密码',
    required: true,
    defaultValue: '123456',
    componentProps: {
      showPassword: true,
    },
  },
]
