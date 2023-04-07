import type { SysRole } from './role'

/**
 * 用户
 */
export interface SysUser {
  /** id */
  id?: string
  /** 创建时间 */
  createTime?: string
  /** 创建人 */
  createdBy?: string
  /** 修改时间 */
  updateTime?: string
  /** 修改人 */
  updatedBy?: string
  /** 状态 0封禁 1正常 */
  state?: number
  /** 用户名 */
  username?: string
  /** 账号 */
  account?: string
  /** 密码 */
  password?: string
  /** 邮箱 */
  email?: string
  /** 手机号 */
  mobile?: string
  /** 性别 0未知 1男 2女 */
  sex?: number
  /** 头像 */
  avatar?: string
  /** 生日 */
  birthday?: string
  /** 用户角色 */
  roles?: SysRole[]
}

/**
 * 用户基本信息
 */
export interface UserInfo {
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
  /** 状态 0封禁 1正常 */
  state: number
  /** 角色列表 */
  roles: string[]
  /** 权限列表 */
  permissions: string[]
}

/**
 * 修改用户参数
 */
export interface SysUserUpdateParam {
  /** 用户id */
  id: string
  /** 用户名 */
  username: string
  /** 邮箱 */
  email?: string
  /** 手机号 */
  mobile?: string
  /** 性别 0未知 1男 2女 */
  sex: number
  /** 生日 */
  birthday?: string
  /** 角色id列表 */
  roleIds?: string[]
}

/**
 * 新增用户参数
 *
 * 说明：
 * 利用Omit排除掉了UpdateParam的id字段
 */
export interface SysUserSaveParam extends Omit<SysUserUpdateParam, 'id'> {
  /** 账号 */
  account: string
  /** 密码 */
  password: string
}

/**
 * 修改密码参数
 */
export interface ChangePasswordParam {
  /** 旧密码 */
  oldPwd: string
  /** 新密码 */
  newPwd: string
  /** 确认密码 */
  confirmPwd: string
}

/**
 * 重置用户密码参数
 */
export interface ResetPwdParam {
  /** id */
  id: string
  /** 新密码 */
  password: string
}
