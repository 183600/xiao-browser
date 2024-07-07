/**
 * Independent time operation tool to facilitate subsequent switch to dayjs
 */
import dayjs from 'dayjs'

const DATE_TIME_FORMAT = 'YYYY-MM-DD HH:mm'
const DATE_FORMAT = 'YYYY-MM-DD'

export function formatToDateTime(date: dayjs.ConfigType = undefined, format = DATE_TIME_FORMAT): string {
  return dayjs(date).format(format)
}

export function formatToDate(date: dayjs.ConfigType = undefined, format = DATE_FORMAT): string {
  return dayjs(date).format(format)
}

/**
 * 是否为时间类型或Dayjs类型
 *
 * Whether it is a date type or a Dayjs type
 * @param val
 */
export function isDateValue(val) {
  return val instanceof dayjs
}

export const dateUtil = dayjs
