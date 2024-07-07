import { Slots } from 'vue'
import { error } from '../log'

/**
 * 获取插槽内容
 *
 * Get slot content
 *
 * @param slots 全部插槽
 * @param slot 当前插槽名称
 * @param data 插槽参数
 */
export function getSlot(slots: Slots, slot = 'default', data?: any) {
  if (!slots || !Reflect.has(slots, slot)) {
    return null
  }
  if (typeof slots[slot] !== 'function') {
    error(`${slot} is not a slot function!`)
    return null
  }
  const slotFn = slots[slot]
  if (!slotFn) return null
  return slotFn(data)
}

/**
 * 拓展插槽
 *
 * Extends slots
 * @param slots 全部插槽
 * @param excludeKeys 拓展插槽 key
 */
export function extendSlots(slots: Slots, excludeKeys: string[] = []) {
  const slotKeys = Object.keys(slots)
  const ret: any = {}
  slotKeys.map((key) => {
    if (excludeKeys.includes(key)) {
      return null
    }
    ret[key] = () => getSlot(slots, key)
  })
  return ret
}
