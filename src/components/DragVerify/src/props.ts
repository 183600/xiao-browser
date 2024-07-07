import { CSSProperties } from 'vue'

export const basicProps = {
  /**
   * 绑定的值
   *
   * Bind value
   */
  modelValue: {
    type: Boolean,
    default: false,
  },
  /**
   * 如果是slot模式，需要手动设置 modelValue 为 true/false
   *
   * If it is in slot mode, you need to manually set modelValue to true/false
   */
  isSlot: {
    type: Boolean,
    default: false,
  },
  /**
   * 拖动默认文本
   *
   * Drag default text
   */
  text: {
    type: String,
    default: '请按住滑块拖动',
  },
  /**
   * 拖动成功文本
   *
   * Drag success text
   */
  successText: {
    type: String,
    default: '验证通过',
  },
  /**
   * 拖动盒子高度
   *
   * Drag box height
   */
  height: {
    type: Number,
    default: 40,
  },
  /**
   * 拖动盒子宽度
   *
   * Drag box width
   */
  width: {
    type: Number,
    default: 220,
  },
  /**
   * 是否使用圆角样式
   *
   * Whether to use the rounded corner style
   */
  circle: {
    type: Boolean,
    default: false,
  },
  /**
   * 拖动盒子样式
   *
   * Drag box style
   */
  wrapStyle: {
    type: Object as PropType<CSSProperties>,
    default: {},
  },
  /**
   * 拖动容器样式
   *
   * Drag container style
   */
  contentStyle: {
    type: Object as PropType<CSSProperties>,
    default: {},
  },
  /**
   * 拖动条样式
   *
   * Drag bar style
   */
  barStyle: {
    type: Object as PropType<CSSProperties>,
    default: {},
  },
  /**
   * 拖动点样式
   *
   * Drag action style
   */
  actionStyle: {
    type: Object as PropType<CSSProperties>,
    default: {},
  },
}

export const rotateProps = {
  ...basicProps,
  /**
   * 图片地址
   *
   * Image src
   */
  src: {
    type: String,
  },
  /**
   * 图片大小
   *
   * Image size
   */
  imgSize: {
    type: Number,
    default: 260,
  },
  /**
   * 图片框样式
   *
   * Picture style
   */
  imgWrapStyle: {
    type: Object as PropType<CSSProperties>,
    default: {},
  },
  /**
   * 最小转动角度
   *
   * Minimum rotation angle
   */
  minDegree: {
    type: Number,
    default: 90,
  },
  /**
   * 最大转动角度
   *
   * Maximum rotation angle
   */
  maxDegree: {
    type: Number,
    default: 270,
  },
  /**
   * 旋转校对角度，越小越难成功
   *
   * Rotate the proofreading angle, the smaller it is, the harder it is to succeed
   */
  diffDegree: {
    type: Number,
    default: 20,
  },
}
