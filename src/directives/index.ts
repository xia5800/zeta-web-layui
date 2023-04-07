import type { App } from 'vue'
import { setupPermissionDirective } from './permission'

/**
 * 设置全局指令
 * @param app
 */
export function setupGlobalDirectives(app: App) {
  // 设置权限指令
  setupPermissionDirective(app)

  // others...
}
