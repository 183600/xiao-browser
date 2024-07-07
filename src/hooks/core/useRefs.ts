import type { Ref } from 'vue'
import { ref, onBeforeUpdate } from 'vue'

/**
 * 使用Refs
 *
 * Reactive Refs
 */
export function useRefs(): [Ref<HTMLElement[]>, (index: number) => (el: HTMLElement) => void] {
  const refs = ref([]) as Ref<HTMLElement[]>

  onBeforeUpdate(() => {
    refs.value = []
  })

  /**
   * 设置 Refs
   *
   * Set Refs
   * @param index
   */
  const setRefs = (index: number) => (el: HTMLElement) => {
    refs.value[index] = el
  }

  return [refs, setRefs]
}
