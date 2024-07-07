export const data: Recordable[] = (() => {
  const arr: Recordable[] = []
  for (let index = 1; index < 20000; index++) {
    arr.push({
      title: `列表项${index}`,
    })
  }
  return arr
})()

export const litdata: Recordable[] = (() => {
  const arr: Recordable[] = []
  for (let index = 1; index < 200; index++) {
    arr.push(`列表项${index}`)
  }
  return arr
})()
