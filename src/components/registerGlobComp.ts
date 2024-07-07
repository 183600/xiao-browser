import type { App } from 'vue'
import { PageWrapper } from './PageWrapper'

/**
 * 注册全局组件
 *
 * Register global components
 *
 * @param app Vue App
 */
export function registerGlobComp(app: App) {
  app.use(PageWrapper)
}
