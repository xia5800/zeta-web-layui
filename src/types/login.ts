import type { Meta } from './router'

/**
 * 登录参数
 */
export interface LoginParam {
  /** 账号 */
  account: string
  /** 密码 */
  password: string
  /** 验证码key */
  key: string | number
  /** 验证码值 */
  code: string
  /** 记住token */
  remember?: boolean
}

/**
 * 登录返回值
 */
export interface LoginResult {
  /** token */
  token: string
  /** token名称 */
  tokenName: string
}

/**
 * 验证码返回值
 */
export interface CaptchaResult {
  /** 验证码key */
  key: string | number
  /** 验证码base64值 */
  base64: string
  /** 验证码值，仅开发环境有此返回值 */
  text?: string
}

/**
 * 登录用户信息
 */
export interface LoginUserInfo {
  /** 用户id */
  id: number | string
  /** 账号 */
  account: string
  /** 用户名 */
  username: string
  /** 头像 */
  avatar?: string
  /** 性别 0未知 1男 2女 */
  sex: number
  /** 状态 0正常 1封禁 */
  state: number
}

/**
 * 用户菜单数据
 */
export interface UserMenu {
  /** 菜单id */
  id: string | number
  /** 菜单父id */
  parentId: string | number
  /** 路由名称 */
  name: string
  /** 路由路径 */
  path: string
  /** 组件路径 */
  component?: any
  /** 元数据 */
  meta: Meta
  /** 重定向地址 */
  redirect?: string
  /** 子路由 */
  children?: UserMenu[]
}
