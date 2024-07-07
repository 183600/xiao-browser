import { createSuccessMsg } from '../util'

const demoList = (keyword) => {
  const result = {
    list: [] as any[],
  }
  for (let index = 0; index < 20; index++) {
    result.list.push({
      name: `${keyword ?? ''}选项${index}`,
      id: `${index}`,
    })
  }
  return result
}

export default [
  {
    url: '/select/getDemoOptions',
    timeout: 1000,
    method: 'get',
    response: (params) => {
      const { keyword } = params

      return new Promise((resolve) => {
        return resolve(createSuccessMsg(demoList(keyword)))
      })
    },
  },
]
