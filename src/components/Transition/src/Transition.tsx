/**
 * Description: 更多使用方法请看： https://vuejs.org/guide/built-ins/transition.html#the-transition-component
 * Description: For more details see: https://vuejs.org/guide/built-ins/transition.html#the-transition-component
 */

import { defineComponent, Transition, TransitionGroup } from 'vue'

import { getSlot } from '@/utils/helper/tsxHelper'

type Mode = 'in-out' | 'out-in' | 'default' | undefined

/**
 * 创建简单过渡动画，一般与css类结合，请看 `@/design/transition` 里面的css类名
 *
 * Create simple transition animations, usually combined with css classes, see the css class names in `@/design/transition`
 * @param name CSS class name
 * @param origin transform origin
 * @param mode Transition mode
 */
export function createSimpleTransition(name: string, origin = 'top center 0', mode?: Mode) {
  return defineComponent({
    name,
    props: {
      /**
       * 是否过渡动画组
       *
       * Whether to transition the animation group
       */
      group: {
        type: Boolean,
        default: false,
      },
      /**
       * 过渡模式
       *
       * Transition mode
       */
      mode: {
        type: String as PropType<Mode>,
        default: mode,
      },
      /**
       * 过渡初始位置
       *
       * Transition initial position
       */
      origin: {
        type: String,
        default: origin,
      },
    },
    setup(props, { slots, attrs }) {
      const onBeforeEnter = (el: HTMLElement) => {
        el.style.transformOrigin = props.origin
      }

      return () => {
        const Tag = !props.group ? Transition : TransitionGroup
        return (
          <Tag name={name} mode={props.mode} {...attrs} onBeforeEnter={onBeforeEnter}>
            {() => getSlot(slots)}
          </Tag>
        )
      }
    },
  })
}

/**
 * 创建JS动画过渡
 *
 * Create JS animated transitions
 * @param name CSS class name
 * @param functions js transitions funcs
 * @param mode Transition mode
 */
export function createJavascriptTransition(name: string, functions: Recordable, mode: Mode = 'in-out') {
  return defineComponent({
    name,
    props: {
      /**
       * 过渡模式
       *
       * Transition mode
       */
      mode: {
        type: String as PropType<Mode>,
        default: mode,
      },
    },
    setup(props, { attrs, slots }) {
      return () => {
        return (
          <Transition
            name={name}
            mode={props.mode}
            {...attrs}
            onBeforeEnter={functions.beforeEnter}
            onEnter={functions.enter}
            onLeave={functions.leave}
            onAfterLeave={functions.afterLeave}
            onLeaveCancelled={functions.afterLeave}>
            {() => getSlot(slots)}
          </Transition>
        )
      }
    },
  })
}

/**
 * 定义展开/收起JS过渡方法
 *
 * Define expand JS transition methods
 * @param x Is it horizontal?
 */
export function createExpandFn(x = false) {
  let a = 'height'
  let b = 'paddingTop'
  let c = 'paddingBottom'
  let d = 'oldPaddingTop'
  let e = 'oldPaddingBottom'
  const f = 'overflow'
  const g = 'oldOverflow'
  let h = 'scrollHeight'

  if (x) {
    a = 'width'
    b = 'paddingLeft'
    c = 'paddingRight'
    d = 'oldPaddingLeft'
    e = 'oldPaddingRight'
    h = 'scrollWidth'
  }

  return {
    beforeEnter(el: HTMLElement) {
      // if (!el.dataset) el.dataset = {}
      el.dataset[d] = el.style[b]
      el.dataset[e] = el.style[c]

      el.style[a] = '0'
      el.style[b] = '0'
      el.style[c] = '0'
    },

    enter(el: HTMLElement) {
      el.dataset[g] = el.style[f]
      // if (el[h] !== 0) {
      //   el.style[a] = el[h] + 'px'
      //   el.style[b] = el.dataset[d] as string
      //   el.style[c] = el.dataset[e] as string
      // } else {
      el.style[a] = ''
      el.style[b] = el.dataset[d] as string
      el.style[c] = el.dataset[e] as string
      // }

      el.style[f] = 'hidden'
    },

    afterEnter(el: HTMLElement) {
      el.style[a] = ''
      el.style[f] = el.dataset[g] as string
    },

    beforeLeave(el: HTMLElement) {
      // if (!el.dataset) el.dataset = {}
      el.dataset[d] = el.style[b]
      el.dataset[e] = el.style[c]
      el.dataset[g] = el.style[f]

      el.style[a] = `${el[h]}px`
      el.style[f] = 'hidden'
    },

    leave(el: HTMLElement) {
      if (el[h] !== 0) {
        el.style[a] = '0'
        el.style[b] = '0'
        el.style[c] = '0'
      }
    },

    afterLeave(el: HTMLElement) {
      el.style[a] = ''
      el.style[f] = el.dataset[g] as string
      el.style[b] = el.dataset[d] as string
      el.style[c] = el.dataset[e] as string
    },
  }
}
