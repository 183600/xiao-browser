import { getRandomNumberData, getSerialData, randomNumber } from '@/utils/demo'

export interface CardItem {
  title: string
  subject: string
  desc: string
  value: number
  scale: number
  mix: number
}

export const CardList: CardItem[] = [
  {
    title: '访问数',
    subject: '当天的访问数量',
    desc: '新访问数',
    value: randomNumber(1000, 20000),
    scale: randomNumber(-100, 100),
    mix: randomNumber(1, 100),
  },
  {
    title: '订单数',
    subject: '当天的订单数量',
    desc: '新订单数',
    value: randomNumber(1000, 20000),
    scale: randomNumber(-100, 100),
    mix: randomNumber(1, 100),
  },
  {
    title: '成交数',
    subject: '当天的成交数量',
    desc: '新成交数',
    value: randomNumber(1000, 20000),
    scale: randomNumber(-100, 100),
    mix: randomNumber(1, 100),
  },
]

export type dateType = 'day' | 'week' | 'month' | 'quarter' | 'year'

interface dateItem {
  xdata: Array
  kdata: {
    k1: Array
    k2: Array
    k3: Array
  }
  vdata: Array
}

export function getDateData(type: dateType = 'day') {
  const data: dateItem = {}
  let len = 0
  switch (type) {
  case 'week':
    len = 7
    data.xdata = ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
    break
  case 'month':
    len = 31
    data.xdata = getSerialData(1, len, '', '/12')
    break
  case 'quarter':
    len = 3
    data.xdata = getSerialData(1, len, '第', '季度')
    break
  case 'year':
    len = 12
    data.xdata = getSerialData(1, len, '', '月')
    break
  default:
    len = 24
    data.xdata = getSerialData(0, len - 1, '', ':00')
    break
  }
  data.kdata = {
    k1: getRandomNumberData(len),
    k2: getRandomNumberData(len),
    k3: getRandomNumberData(len),
  }
  data.vdata = data.xdata.map((k, i) => {
    return { value: data.kdata.k1[i], name: k }
  })
  return data
}
