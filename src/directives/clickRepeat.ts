import type { Directive, DirectiveBinding } from 'vue'

/**
 * 防止重复点击
 *
 * Prevent clicks repeated
 * @Example v-click-repeat="Fn"
 *
 */
const repeatDirective: Directive = {
  beforeMount(el: Element, binding: DirectiveBinding<any>) {
    let interval: Nullable<IntervalHandle> = null
    let startTime = 0
    const handler = (): void => binding?.value()
    const clear = (): void => {
      if (Date.now() - startTime < 100) {
        handler()
      }
      interval && clearInterval(interval)
      interval = null
    }

    el.addEventListener(
      'mousedown',
      (e: MouseEvent): void => {
        if ((e as any).button !== 0) return
        startTime = Date.now()
        document.addEventListener('mouseup', clear)
        interval && clearInterval(interval)
        interval = setInterval(handler, 100)
      },
      false,
    )
  },
}

export default repeatDirective
