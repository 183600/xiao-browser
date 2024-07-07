import { createFailMsg, createFakeUserList, createSuccessMsg, fakeCodeList, getFakeUserToken } from '../util'

export default [
  {
    url: '/login',
    timeout: 200,
    method: 'post',
    response: (params) => {
      const { username, password } = params
      return new Promise((resolve, reject) => {
        const checkUser = createFakeUserList().find(
          (item) => item.username === username && password === item.password,
        )
        if (!checkUser) {
          return reject(createFailMsg('账号或密码错误'))
        }

        localStorage.setItem('apitoken', checkUser.token)

        return resolve(createSuccessMsg(checkUser))
      })
    },
  },
  {
    url: '/getUserInfo',
    method: 'get',
    response: (_params) => {
      return new Promise((resolve, reject) => {
        const checkUser = createFakeUserList().find((item) => item.token === getFakeUserToken())
        if (!checkUser) {
          return reject(createFailMsg('用户信息错误或不存在'))
        }

        return resolve(createSuccessMsg(checkUser))
      })
    },
  },
  {
    url: '/getPermCode',
    timeout: 200,
    method: 'get',
    response: (_params) => {
      return new Promise((resolve, reject) => {
        const checkUser = createFakeUserList().find((item) => item.token === getFakeUserToken())
        if (!checkUser) {
          return reject(createFailMsg('用户信息错误或不存在'))
        }

        const codeList = fakeCodeList[checkUser.userId]
        return resolve(createSuccessMsg(codeList))
      })
    },
  },
  {
    url: '/logout',
    timeout: 200,
    method: 'get',
    response: (_params) => {
      return new Promise((resolve) => {
        localStorage.removeItem('apitoken')

        return resolve(createSuccessMsg(null))
      })
    },
  },
]
