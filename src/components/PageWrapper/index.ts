import { withInstall } from '@/utils'
import pageWrapper from './src/PageWrapper.vue'

export { PageWrapperFixedHeightKey } from './src/helper'

/**
 * 组件已全局注册
 * Component is registered globally
 */
export const PageWrapper = withInstall(pageWrapper)
export default PageWrapper
