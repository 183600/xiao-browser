import type { App } from 'vue'
import { createPinia } from 'pinia'

const store = createPinia()

/**
 * 配置 pinia 存储
 *
 * Configure pinia storage
 * @param app App<Element>
 */
export function setupStore(app: App<Element>) {
  app.use(store)
}

export { store }
