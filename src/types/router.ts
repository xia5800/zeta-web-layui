import type { RouteMeta } from 'vue-router'

/** 登陆页路由地址 */
export const LOGIN_ROUTE = '/login'

/** 首页路由地址 */
export const HOME_ROUTE = '/'

/** 重定向路由地址 */
export const REDIRECT_PATH = '/redirect'

/** Iframe视图组件名称 */
export const FRAME_VIEW_NAME = 'Frame'

/** 空白布局组件名称 */
export const BLANK_LAYOUT_NAME = 'BlankLayout'

/**
 * 路由元数据
 */
export interface Meta extends RouteMeta {
  /** 标题 */
  title?: string
  /** 图标 */
  icon?: string
  /** 是否隐藏 */
  hide?: boolean
  /** 外链地址 */
  href?: string
  /** 是否缓存 */
  keepAlive?: boolean
}

/**
 * 路由项
 */
export interface RouteItem {
  /** 路由名称 */
  name: string
  /** 路由路径 */
  path: string
  /** 元数据 */
  meta?: Meta
  /** 组件路径 */
  component?: string
  /** 重定向地址 */
  redirect?: string
  /** 子路由 */
  children?: RouteItem[]
}
