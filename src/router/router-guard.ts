import type { NavigationGuardNext, RouteLocationNormalized, RouteRecordRaw, Router } from 'vue-router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { layer } from '@layui/layer-vue'
import { menuToRoute } from './router-helper'
import type { UserMenu } from '~/types/login'
import { HOME_ROUTE, LOGIN_ROUTE } from '~/types/router'
import { getToken } from '~/utils/token'
import { PROJECT_NAME, WHITE_LIST } from '~/config/setting'

NProgress.configure({
  // 动画方式
  easing: 'ease',
  // 递增进度条的速度
  speed: 500,
  // 是否显示加载ico
  showSpinner: false,
  // 自动递增间隔
  trickleSpeed: 200,
})

/**
 * 创建路由守卫
 * @param router vue-router路由实例
 */
export function createRouterGuard(router: Router) {
  /**
   * 前置路由守卫
   *
   * @param to RouteLocationNormalized 即将要进入的目标
   * @param from RouteLocationNormalized 当前导航正要离开的路由
   * @param next NavigationGuardNext
   * @returns 返回false取消当前导航
   */
  router.beforeEach(async (to: RouteLocationNormalized, _from: RouteLocationNormalized, next: NavigationGuardNext) => {
    NProgress.start()
    // 是否未登录
    const notLogin = !getToken()
    // 是否需要登录
    const needLogin = !WHITE_LIST.includes(to.path)

    // 未登录，前往白名单地址
    if (notLogin && !needLogin) {
      return next()
    }

    // 未登录，前往需要登录的地址
    if (notLogin && needLogin) {
      if (to.path !== LOGIN_ROUTE) {
        layer.msg('登录状态已过期', { icon: 2 })
      }
      return next({
        path: LOGIN_ROUTE,
        query: to.path === HOME_ROUTE ? {} : { from: to.path },
      })
    }

    // 已登录，前往登录地址
    if (!notLogin && to.path === LOGIN_ROUTE) {
      return next(HOME_ROUTE)
    }

    // 已登录，需要重新加载动态路由
    const userStore = useUserStore()
    if (!userStore.info) {
      const { menus } = await userStore.fetchUserInfo()
      if (menus && menus.length > 0) {
        const rootRouter = router.getRoutes().find((item: RouteRecordRaw) => item.name === 'root')!
        // 用户菜单转换成vue-router的路由，并添加到vue-router中
        menuToRoute(menus as UserMenu[]).forEach((route) => {
          // 如果route是一级路由且没有子路由。添加到/路由下
          if (!route.children) {
            rootRouter.children = rootRouter.children.concat(route)
            router.addRoute(rootRouter)
          } else {
            router.addRoute(route)
          }
        })
      }
      return next(to.fullPath)
    }
    return next()
  })

  /**
   * 后置路由钩子
   *
   * @param to RouteLocationNormalized 即将要进入的目标
   * @param from RouteLocationNormalized 当前导航正要离开的路由
   */
  router.afterEach((to: RouteLocationNormalized, _from: RouteLocationNormalized) => {
    useTitle(to.meta?.title as string ?? PROJECT_NAME)

    if (NProgress.isStarted()) {
      setTimeout(() => {
        NProgress.done(true)
      }, 200)
    }
  })
}
