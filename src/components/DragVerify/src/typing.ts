/**
 * 实例方法
 *
 * Instance function
 */
export interface DragVerifyActionType {
  resume: () => void
}

/**
 * 通过后返回数据
 *
 * Return data after passing
 */
export interface PassingData {
  isPassing: boolean
  time: number
}

/**
 * 移动时返回数据
 *
 * Return data when moving
 */
export interface MoveData {
  event: MouseEvent | TouchEvent
  moveDistance: number
  moveX: number
}
