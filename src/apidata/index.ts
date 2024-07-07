import user from './sys/user'
import menu from './sys/menu'
import account from './demo/account'
import selectDemo from './demo/select-demo'
import system from './demo/system'
import tableDemo from './demo/table-demo'
import treeDemo from './demo/tree-demo'
import { checkFakeUserLogin } from './util'

/**
 * 模拟服务器请求接口并返回数据
 */
export async function GetApiData<T>({ url, params }) {
  const datalist = [
    ...user,
    ...menu,
    ...account,
    ...selectDemo,
    ...system,
    ...tableDemo,
    ...treeDemo,
  ]

  const exUrl = ['/login']
  const isLogin = checkFakeUserLogin()

  if (!exUrl.includes(url) && isLogin !== true) {
    return Promise.reject(isLogin)
  }
  // 模拟服务器延迟
  // const customTimer = (time = 1000) => {
  //   return new Promise((reslove) => {
  //     let timer = setTimeout(() => {
  //       clearTimeout(timer)
  //       timer = null
  //       reslove()
  //     }, time)
  //   })
  // }

  try {
    const item = datalist.find(k => k.url === url)
    if (item) {
      const res = await item.response(params)
      // await customTimer(200)
      if (res?.code === 0) {
        return Promise.resolve<T>(res.result)
      }
      return Promise.reject(res)
    }
  } catch (error) {
    return Promise.reject(error)
  }
}
