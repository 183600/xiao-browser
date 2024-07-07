import { nextTick, onMounted, onActivated } from 'vue'

/**
 * 当页面安装后或者激活后触发回调
 *
 * When the page is mounted or activated, a callback is triggered
 * @param hook callback func
 */
export function onMountedOrActivated(hook: Fn) {
  let mounted: boolean

  onMounted(() => {
    hook()
    nextTick(() => {
      mounted = true
    })
  })

  onActivated(() => {
    if (mounted) {
      hook()
    }
  })
}
