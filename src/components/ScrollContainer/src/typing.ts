import type { ScrollbarType } from '@/components/Scrollbar'

export interface ScrollActionType extends ScrollbarType {
  scrollBottom: () => void
  getScrollWrap: () => ElRef
  scrollTo: (top: number, duration?: number) => void
}
