import type { RouteRecordRaw } from 'vue-router'
import { HOME_ROUTE, LOGIN_ROUTE, REDIRECT_PATH, USER_PROFILE_ROUTE } from '~/types/router'
import BaseLayout from '~/layouts/BaseLayout.vue'
import Redirect from '~/layouts/RedirectView.vue'

/**
 * 基础路由
 * @param path 路由地址
 * @param name 路由名称, 必须设置,且不能重名
 * @param redirect 重定向地址, 访问这个路由时,自定进行重定向
 * @param component 组件地址
 * @param meta 路由元信息（路由附带扩展信息）
 * @param meta.title 菜单名称
 * @param meta.icon 菜单图标
 * @param meta.keepAlive 是否缓存该路由
 * @param meta.hide 是否不在菜单和tab中显示
 * @param meta.frameSrc 内嵌iframe地址， component组件必须为Frame
 * @param meta.href 外链地址
 */
export const baseRoutes: RouteRecordRaw[] = [
  {
    path: HOME_ROUTE,
    name: 'root',
    component: BaseLayout,
    children: [{
      name: 'home',
      path: '',
      component: () => import('~/views/index.vue'),
      meta: {
        title: '首页',
        affix: true,
      },
    }],
  },
  {
    path: LOGIN_ROUTE,
    name: 'login',
    component: () => import('~/views/common/login/index.vue'),
    meta: {
      title: '登录',
    },
  },
  {
    path: `${REDIRECT_PATH}/:path(.*)`,
    name: 'redirect',
    component: Redirect,
  },
  {
    path: USER_PROFILE_ROUTE,
    name: 'profile',
    component: BaseLayout,
    children: [{
      path: '',
      name: 'user_profile',
      component: () => import('~/views/common/profile/index.vue'),
      meta: {
        title: '用户信息',
        hide: true,
      },
    }],
  },
  {
    path: '/:path(.*)*',
    name: 'notFound',
    component: BaseLayout,
    children: [{
      path: '',
      name: '404',
      meta: {
        title: '404',
      },
      component: () => import('~/views/common/error/404.vue'),
    }],
  },
]
