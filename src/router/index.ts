import type { App } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import { createRouterGuard } from './router-guard'
import { baseRoutes } from './base-routes'

/**
 * 创建路由
 */
export const router = createRouter({
  // HTML5模式createWebHistory, Hash模式createWebHashHistory
  history: createWebHistory(),

  // 初始路由列表
  routes: baseRoutes,

  // 滚动行为配置
  scrollBehavior() {
    // 始终滚动到顶部
    return { top: 0 }
  },
})

/**
 * 设置路由
 * @param app
 */
export function setupRouter(app: App<Element>) {
  app.use(router)
  // 创建路由守卫
  createRouterGuard(router)
}
