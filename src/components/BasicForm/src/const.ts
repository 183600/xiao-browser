import componentSetting from '@/settings/componentSetting'

const { form } = componentSetting

/**
 * 满行的大小
 *
 * Full row size
 */
export const BASIC_COL_LEN = form.fullColumnSize

/**
 * 默认单行显示的个数
 *
 * The default number of single-line display
 */
export const BASIC_COL_NUM = form.defaultItemSize

/**
 * 默认列的大小，根据计算所得
 *
 * Default column size, based on calculated
 */
export const BASIC_COL_SIZE = BASIC_COL_LEN / BASIC_COL_NUM

/**
 * 列间隔大小(px)
 *
 * Column spacer size (px)
 */
export const BASIC_ROW_GUTTER = form.defaultItemGutter
