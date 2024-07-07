import { BasicFormSchema } from '@/components/BasicForm'

export const formSchema: BasicFormSchema[] = [
  {
    field: 'passwordOld',
    label: '当前密码',
    component: 'ElInput',
    componentProps: {
      showPassword: true,
    },
    required: true,
  },
  {
    field: 'passwordNew',
    label: '新密码',
    component: 'ElInput',
    slot: 'newpassword',
    componentProps: {
      placeholder: '新密码',
    },
    rules: [
      {
        required: true,
        message: '请输入新密码',
      },
    ],
  },
  {
    field: 'confirmPassword',
    label: '确认密码',
    component: 'ElInput',
    componentProps: {
      showPassword: true,
    },

    dynamicRules: ({ values }) => {
      return [
        {
          required: true,
          validator: (_, value) => {
            if (!value) {
              return Promise.reject('密码不能为空')
            }
            if (value !== values.passwordNew) {
              return Promise.reject('两次输入的密码不一致!')
            }
            return Promise.resolve()
          },
        },
      ]
    },
  },
]
