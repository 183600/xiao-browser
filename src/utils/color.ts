/**
 * 是否为十六进制颜色
 *
 * Whether it is a hex color
 * @param color string
 */
export function isHexColor(color: string) {
  const reg = /^#([0-9a-fA-F]{3}|[0-9a-fA-f]{6})$/
  return reg.test(color)
}

/**
 * 将 RGB 颜色转换为十六进制颜色
 *
 * Convert RGB color to hex color
 * @param r red
 * @param g green
 * @param b blue
 * @return hex color
 */
export function rgbToHex(r: number, g: number, b: number) {
  const hex = ((r << 16) | (g << 8) | b).toString(16)
  return `#${new Array(Math.abs(hex.length - 7)).join('0')}${hex}`
}

/**
 * 将十六进制颜色转换为 RGB 颜色
 *
 * Convert hex color to RGB color
 * @param hex string
 */
export function hexToRGB(hex: string) {
  let sHex = hex.toLowerCase()
  if (isHexColor(hex)) {
    if (sHex.length === 4) {
      let sColorNew = '#'
      for (let i = 1; i < 4; i += 1) {
        sColorNew += sHex.slice(i, i + 1).concat(sHex.slice(i, i + 1))
      }
      sHex = sColorNew
    }
    const sColorChange: number[] = []
    for (let i = 1; i < 7; i += 2) {
      sColorChange.push(parseInt(`0x${sHex.slice(i, i + 2)}`))
    }
    return `RGB(${sColorChange.join(',')})`
  }
  return sHex
}

/**
 * 检查十六进制颜色是否为深色调的颜色
 *
 * Check if a hex color is a dark toned color
 * @param color
 */
export function colorIsDark(color: string) {
  if (!isHexColor(color)) return

  const [r, g, b] = hexToRGB(color)
    .replace(/(?:\(|\)|rgb|RGB)*/g, '')
    .split(',')
    .map((item) => Number(item))
  return r * 0.299 + g * 0.578 + b * 0.114 < 192
}

/**
 * 通过给定的百分比，使十六进制颜色变暗
 *
 * Darken the hex color by the given percentage
 * @param color string
 * @param amount number, 0-100
 */
export function darken(color: string, amount: number) {
  color = color.indexOf('#') >= 0 ? color.substring(1, color.length) : color
  amount = Math.trunc((255 * amount) / 100)

  const r = subtractLight(color.substring(0, 2), amount)
  const g = subtractLight(color.substring(2, 4), amount)
  const b = subtractLight(color.substring(4, 6), amount)
  return `#${r}${g}${b}`
}

/**
 * 通过给定的百分比，使十六进制颜色变亮
 *
 * Lighten the hex color by the given percentage
 * @param color string
 * @param amount number, 0-100
 */
export function lighten(color: string, amount: number) {
  color = color.indexOf('#') >= 0 ? color.substring(1, color.length) : color
  amount = Math.trunc((255 * amount) / 100)

  const r = addLight(color.substring(0, 2), amount)
  const g = addLight(color.substring(2, 4), amount)
  const b = addLight(color.substring(4, 6), amount)
  return `#${r}${g}${b}`
}

/**
 * 将通过的百分比与十六进制颜色的 R、G 或 B 相加
 *
 * Sums the passed percentage to the R, G or B of a HEX color
 * @param color string
 * @param amount number, 0-100
 */
function addLight(color: string, amount: number) {
  const cc = parseInt(color, 16) + amount
  const c = cc > 255 ? 255 : cc
  return c.toString(16).length > 1 ? c.toString(16) : `0${c.toString(16)}`
}

/**
 * 将通过的百分比减去十六进制颜色的 R、G 或 B
 *
 * Subtracts the indicated percentage to the R, G or B of a HEX color
 * @param color string
 * @param amount number, 0-100
 */
function subtractLight(color: string, amount: number) {
  const cc = parseInt(color, 16) - amount
  const c = cc < 0 ? 0 : cc
  return c.toString(16).length > 1 ? c.toString(16) : `0${c.toString(16)}`
}
