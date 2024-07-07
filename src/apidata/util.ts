import Mock from 'mockjs'

enum ResultEnum {
  /**
   * 成功
   *
   * Success
   */
  SUCCESS = 0,
  /**
   * 错误
   *
   * Error
   */
  ERROR = 1,
  /**
   * 超时
   *
   * Timeout
   */
  TIMEOUT = 401,
  /**
   * 回调类型
   *
   * Response type
   */
  TYPE = 'success',
}

export function createFakeUserList() {
  return [
    {
      userId: '1',
      username: 'admin',
      realName: 'Administrator',
      avatar: 'https://himg.bdimg.com/sys/portrait/hotitem/wildkid/31',
      desc: '致敬钢铁侠！如同Tony的机甲一般，模块组合的前端框架。',
      password: '123456',
      token: 'fakeToken1',
      homePath: '/dashboard/analysis',
      roles: [
        {
          roleName: 'manager',
          value: 'admin',
        },
      ],
    },
    {
      userId: '2',
      username: 'tony',
      password: '123456',
      realName: 'Tony Stark',
      avatar: 'https://himg.bdimg.com/sys/portrait/hotitem/wildkid/49',
      desc: "Salute to Iron Man! Like Tony's mecha, the front-end framework for modular combinations.",
      token: 'fakeToken2',
      homePath: '/dashboard/workbench',
      roles: [
        {
          roleName: 'tester',
          value: 'test',
        },
      ],
    },
  ]
}

export const fakeCodeList = {
  '1': ['1000', '3000', '5000'],
  '2': ['2000', '4000', '6000'],
}

export function checkFakeUserLogin() {
  let msg = ''
  if (!checkFakeUserToken()) {
    msg = '无效token'
  }

  const cfu = checkFakeUser('获取用户信息失败或不存在')
  if (!cfu) {
    return cfu
  }

  if (msg) {
    return {
      code: ResultEnum.ERROR,
      result: null,
      message: msg,
      type: 'error',
    }
  }

  return true
}
export function getFakeUserToken() {
  const token = localStorage.getItem('apitoken')
  return token || null
}
export function checkFakeUserToken() {
  return !!getFakeUserToken()
}
export function checkFakeUser(msg) {
  const checkUser = createFakeUserList().find((item) => item.token === getFakeUserToken())
  if (!checkUser) {
    return {
      code: ResultEnum.ERROR,
      result: null,
      message: msg,
      type: 'error',
    }
  }

  return true
}
export function createFailMsg(msg, code = undefined) {
  return {
    code: code || ResultEnum.ERROR,
    result: null,
    message: msg || 'fail',
    type: 'error',
  }
}
export function createSuccessMsg(data, msg) {
  return {
    code: ResultEnum.SUCCESS,
    result: data || null,
    message: msg || 'ok',
    type: 'success',
  }
}
export function createPagination<T = any>(pageNo: number, pageSize: number, array: T[]): T[] {
  const offset = (pageNo - 1) * Number(pageSize)
  return offset + Number(pageSize) >= array.length
    ? array.slice(offset, array.length)
    : array.slice(offset, offset + Number(pageSize))
}
export function createRandomItem(id = '', code = '') {
  const item = {
    id,
    code,
    beginTime: '@datetime',
    endTime: '@datetime',
    address: '@county(true)',
    sex: '@integer(1,2)',
    name: '@first()',
    nickname: '@cname()',
    description: '@cparagraph()',
    age: '@integer(1,100)',
    avatar: Mock.Random.image(),
    imgs: [Mock.Random.image(), Mock.Random.image(), Mock.Random.image()],
    photos: [Mock.Random.image(), Mock.Random.image(), Mock.Random.image()],
    date: `@date('yyyy-MM-dd')`,
    time: `@time('HH:mm')`,
    'no|100000-10000000': 100000,
    type: '@integer(1,3)',
    'status|0': [0, 1, 2],
  }

  return Mock.mock(item)
}
