import { DescItem } from '@/components/BasicDescription'

export const demoData: Recordable = {
  username: 'tony',
  nickName: 'Tony Water',
  age: 101,
  phone: '15695909xxx',
  email: '190848757@qq.com',
  addr: '厦门市思明区',
  sex: '男',
  certy: '3504256199xxxxxxxxx',
  tag: 'orange',
}
export const schema: DescItem[] = [
  {
    field: 'username',
    label: '用户名',
  },
  {
    field: 'tag',
    label: '标签',
    show: (item) => {
      return item.age > 99
    },
  },
  {
    field: 'nickName',
    label: '昵称',
    render: (val, item) => {
      return `${item.username}-${val}`
    },
  },
  {
    field: 'phone',
    label: '联系电话',
    isSlot: true,
  },
  {
    field: 'email',
    label: '邮箱',
  },
  {
    field: 'addr',
    label: '地址',
  },
]
