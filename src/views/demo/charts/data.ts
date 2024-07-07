import { randomNumber } from '@/utils/demo'

export const mapData = () => {
  const _cityData: any = [
    '北京市',
    '天津市',
    '上海市',
    '重庆市',
    '河北省',
    '河南省',
    '云南省',
    '辽宁省',
    '黑龙江省',
    '湖南省',
    '安徽省',
    '山东省',
    '新疆维吾尔自治区',
    '江苏省',
    '浙江省',
    '江西省',
    '湖北省',
    '广西壮族自治区',
    '甘肃省',
    '山西省',
    '内蒙古自治区',
    '陕西省',
    '吉林省',
    '福建省',
    '贵州省',
    '广东省',
    '青海省',
    '西藏自治区',
    '四川省',
    '宁夏回族自治区',
    '海南省',
    '南海诸岛',
    '台湾省',
    '香港特别行政区',
    '澳门特别行政区',
    '',
  ]

  return _cityData.map((k) => {
    return {
      name: k,
      value: randomNumber(100000),
    }
  })
}

export const getLineData = () => {
  const category: any[] = []
  let dottedBase = +new Date()
  const lineData: any[] = []
  const barData: any[] = []

  for (let i = 0; i < 20; i++) {
    const date = new Date((dottedBase += 1000 * 3600 * 24))
    category.push([date.getFullYear(), date.getMonth() + 1, date.getDate()].join('-'))
    const b = randomNumber(3000)
    const d = randomNumber(3000)
    barData.push(b)
    lineData.push(d + b)
  }
  return { barData, category, lineData }
}

export const getNightingaleData = () => {
  const dt: any[] = []
  for (let i = 1; i < 10; i++) {
    dt.push({ value: 10 * i, name: `Nightingale ${i}` })
  }
  return dt
}

export const getPieData = () => {
  const category: any[] = []
  let dottedBase = +new Date()
  const lineData: any[] = []
  const barData: any[] = []

  for (let i = 0; i < 20; i++) {
    const date = new Date((dottedBase += 1000 * 3600 * 24))
    category.push([date.getFullYear(), date.getMonth() + 1, date.getDate()].join('-'))
    const b = Math.random() * 200
    const d = Math.random() * 200
    barData.push(b)
    lineData.push(d + b)
  }
  return { barData, category, lineData }
}
