import { createPagination, createRandomItem, createSuccessMsg } from '../util'

const demoList = (() => {
  const result: any[] = []
  for (let index = 0; index < 111; index++) {
    result.push(createRandomItem(String(index + 1), `k-${index + 1}`))
  }
  return result
})()

export default [
  {
    url: '/table/getDemoList',
    timeout: 100,
    method: 'get',
    response: (params) => {
      const { page = 1, pageSize = 20 } = params

      return new Promise((resolve) => {
        const pageData = createPagination(page, pageSize, demoList)

        return resolve(createSuccessMsg({
          items: pageData,
          total: demoList.length,
        }))
      })
    },
  },
]
