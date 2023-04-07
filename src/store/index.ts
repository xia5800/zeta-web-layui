import type { App } from 'vue'
import { createPinia } from 'pinia'

/**
 * 创建store
 */
export const store = createPinia()

/**
 * 设置store
 * @param app
 */
export function setupStore(app: App<Element>) {
  app.use(store)
}
