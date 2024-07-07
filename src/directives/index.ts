/**
 * 配置和注册全局指令
 *
 * Configure and register global directives
 */
import type { App } from 'vue'

import authDirective from './permission'
/**
 * 注册全局指令
 *
 * Register global directive
 *
 * @param app VueApp
 */
export function setupGlobDirectives(app: App) {
  // v-auth 指令
  app.directive('auth', authDirective)
}
