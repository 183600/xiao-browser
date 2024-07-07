export function randomNumber(minNum, maxNum: number | undefined = undefined, decimalNum: number | undefined = undefined): number {
  let max = 0
  let min = 0
  minNum <= maxNum ? ((min = minNum), (max = maxNum)) : ((min = maxNum), (max = minNum))
  switch (arguments.length) {
  case 1:
    return Math.floor(Math.random() * (max + 1))
  case 2:
    return Math.floor(Math.random() * (max - min + 1) + min)
  case 3:
    return parseFloat((Math.random() * (max - min) + min).toFixed(decimalNum))
  default:
    return Math.random()
  }
}

export function getRandomNumberData(len: number): number[] {
  return Array(...Array(len)).map(() => randomNumber(1, 1e5))
}

export function getSerialData(start = 0, end = 10, prefix = '', suffix = '') {
  const data = []
  for (let i = start; i <= end; i++) {
    data.push(prefix + i + suffix)
  }
  return data
}
