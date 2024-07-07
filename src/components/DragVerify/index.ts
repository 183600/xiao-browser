import { withInstall } from '@/utils'
import basicDragVerify from './src/DragVerify.vue'
import rotateDragVerify from './src/ImgRotate.vue'

export * from './src/typing'
export const BasicDragVerify = withInstall(basicDragVerify)
export const RotateDragVerify = withInstall(rotateDragVerify)
