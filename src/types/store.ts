import type { LoginUserInfo, UserMenu } from './login'
import type { Tab, ThemeSettings, ThemeVariable } from './theme'

/**
 * 用户Pinia状态
 */
export interface UserState {
  /** 用户信息 */
  info: LoginUserInfo | null
  /** 用户权限列表 */
  permissions: string[]
  /** 用户角色列表 */
  roles: string[]
  /** 用户可访问的菜单列表 */
  menus: UserMenu[]
  /** 是否记住UserState信息 */
  remember: boolean
}

/**
 * 主题设置State
 */
export interface ThemeState {
  /** 主题设置 */
  settings: ThemeSettings
  /** 展开收起菜单 */
  collaspeSide: boolean
  /** 主题变量 */
  themeVariable: ThemeVariable
}

/**
 * 菜单栏State
 */
export interface TabState {
  /** 打开的tab */
  tabs: Tab[]
}
