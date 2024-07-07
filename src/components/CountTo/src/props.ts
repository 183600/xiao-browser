export const basicProps = {
  /**
   * 开始数值
   *
   * Start number
   */
  startVal: { type: Number, default: 0 },
  /**
   * 完成数值
   *
   * Finish number
   */
  endVal: { type: Number, default: 100 },
  /**
   * 动画过渡时间(ms)
   *
   * Animation duration(ms)
   */
  duration: { type: Number, default: 1500 },
  /**
   * 是否自动播放，否则需要手动执行 start()
   * Whether to play automatically, otherwise you need to manually start()
   */
  autoplay: { type: Boolean, default: true },
  /**
   * 小数位分隔符
   *
   * Decimal separator
   */
  decimal: { type: String, default: '.' },
  /**
   * 支持多少位小数
   *
   * How many decimal places exist
   */
  decimals: {
    type: Number,
    default: 0,
    validator(v: number) {
      return v >= 0
    },
  },
  /**
   * 文本前内容
   *
   * prefix text
   */
  prefix: { type: String, default: '' },
  /**
   * 文本后内容
   *
   * suffix text
   */
  suffix: { type: String, default: '' },
  /**
   * 千分位分隔符
   *
   * Thousands separator
   */
  separator: { type: String, default: ',' },
  /**
   * 字体颜色
   *
   * font color
   */
  color: { type: String },
  /**
   * 是否使用动画
   *
   * Whether to use animation
   */
  useEasing: { type: Boolean, default: true },
  /**
   * 动画贝赛尔曲线
   *
   * Digital animation transition curves
   */
  transition: { type: String, default: 'linear' },
}
