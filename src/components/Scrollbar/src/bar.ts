import { defineComponent, h, computed, ref, getCurrentInstance, onUnmounted, inject, Ref } from 'vue'

import { renderThumbStyle, BAR_MAP } from './util'

export default defineComponent({
  name: 'Bar',

  props: {
    vertical: Boolean,
    size: String,
    move: Number,
  },

  setup(props) {
    const instance = getCurrentInstance()
    const thumb = ref()
    const wrap = inject('scroll-bar-wrap', {} as Ref<Nullable<HTMLElement>>) as any
    const bar = computed(() => {
      return BAR_MAP[props.vertical ? 'vertical' : 'horizontal']
    })
    const barStore = ref<Recordable>({})
    const cursorDown = ref()
    const clickThumbHandler = (e: any) => {
      // prevent click event of right button
      if (e.ctrlKey || e.button === 2) {
        return
      }
      window.getSelection()?.removeAllRanges()
      startDrag(e)
      barStore.value[bar.value.axis] = e.currentTarget[bar.value.offset] - (e[bar.value.client] - e.currentTarget.getBoundingClientRect()[bar.value.direction])
    }

    const clickTrackHandler = (e: any) => {
      const offset = Math.abs(e.target.getBoundingClientRect()[bar.value.direction] - e[bar.value.client])
      const thumbHalf = thumb.value[bar.value.offset] / 2
      const thumbPositionPercentage = ((offset - thumbHalf) * 100) / instance?.vnode.el?.[bar.value.offset]

      wrap.value[bar.value.scroll] = (thumbPositionPercentage * wrap.value[bar.value.scrollSize]) / 100
    }
    const startDrag = (e: any) => {
      e.stopImmediatePropagation()
      cursorDown.value = true
      document.addEventListener('mousemove', mouseMoveDocumentHandler, false)
      document.addEventListener('mouseup', mouseUpDocumentHandler, false)
      document.onselectstart = () => false
    }

    const mouseMoveDocumentHandler = (e: any) => {
      if (cursorDown.value === false) return
      const prevPage = barStore.value[bar.value.axis]

      if (!prevPage) return

      const offset = (instance?.vnode.el?.getBoundingClientRect()[bar.value.direction] - e[bar.value.client]) * -1
      const thumbClickPosition = thumb.value[bar.value.offset] - prevPage
      const thumbPositionPercentage = ((offset - thumbClickPosition) * 100) / instance?.vnode.el?.[bar.value.offset]
      wrap.value[bar.value.scroll] = (thumbPositionPercentage * wrap.value[bar.value.scrollSize]) / 100
    }

    function mouseUpDocumentHandler() {
      cursorDown.value = false
      barStore.value[bar.value.axis] = 0
      document.removeEventListener('mousemove', mouseMoveDocumentHandler, false)
      document.onselectstart = null
    }

    onUnmounted(() => {
      document.removeEventListener('mouseup', mouseUpDocumentHandler, false)
    })

    return () =>
      h(
        'div',
        {
          class: ['scrollbar__bar', `is-${bar.value.key}`],
          onMousedown: clickTrackHandler,
        },
        h('div', {
          ref: thumb,
          class: 'scrollbar__thumb',
          onMousedown: clickThumbHandler,
          style: renderThumbStyle({
            size: props.size,
            move: props.move,
            bar: bar.value,
          }),
        }),
      )
  },
})
