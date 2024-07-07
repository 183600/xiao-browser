import { ref, watch } from 'vue'

interface Options {
  target?: HTMLElement
}

/**
 * 使用复制到粘贴板
 *
 * Reactive copy to clipboard
 * @param initial
 */
export function useCopyToClipboard(initial?: string) {
  const clipboardRef = ref(initial || '')
  const isSuccessRef = ref(false)
  const copiedRef = ref(false)

  watch(
    clipboardRef,
    (str?: string) => {
      if (str) {
        copiedRef.value = true
        isSuccessRef.value = copyTextToClipboard(str)
      }
    },
    { immediate: !!initial, flush: 'sync' },
  )

  return { clipboardRef, isSuccessRef, copiedRef }
}

/**
 * 复制文本到粘贴板
 *
 * Copy text to clipboard
 * @param input
 * @param param1
 */
export function copyTextToClipboard(input: string, { target = document.body }: Options = {}) {
  const element = document.createElement('textarea')
  const previouslyFocusedElement = document.activeElement

  element.value = input

  element.setAttribute('readonly', '')
  ;(element.style as any).contain = 'strict'
  element.style.position = 'absolute'
  element.style.left = '-9999px'
  element.style.fontSize = '12pt'

  const selection = document.getSelection()
  let originalRange
  if (selection && selection.rangeCount > 0) {
    originalRange = selection.getRangeAt(0)
  }

  target.append(element)
  element.select()

  element.selectionStart = 0
  element.selectionEnd = input.length

  let isSuccess = false
  try {
    isSuccess = document.execCommand('copy')
  } catch (e) {
    throw new Error(e)
  }

  element.remove()

  if (originalRange && selection) {
    selection.removeAllRanges()
    selection.addRange(originalRange)
  }

  if (previouslyFocusedElement) {
    (previouslyFocusedElement as HTMLElement).focus()
  }
  return isSuccess
}
