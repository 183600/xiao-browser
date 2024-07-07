import { createRandomItem, createPagination, createSuccessMsg } from '../util'

const demoList = (() => {
  const result: any[] = []
  for (let i = 0; i < 31; i++) {
    const item = createRandomItem(String(i + 1), `0-${i + 1}`)
    const len = Math.floor(Math.random() * 10)
    item.children = []
    for (let j = 0; j < len; j++) {
      const chilItem = createRandomItem(j + 1, `${i + 1}-${j}`)
      item.children.push(chilItem)
    }
    result.push(item)
  }
  return result
})()

export default [
  {
    url: '/tree/getDemoTreeList',
    timeout: 1000,
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
