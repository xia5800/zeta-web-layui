/**
 * 登录日志
 */
export interface SysLoginLog {
  /** 登录日志id */
  id?: string
  /** 状态 */
  state?: 'SUCCESS' | 'FAIL' | 'ERROR_PWD' | 'LOGOUT'
  /** 账号 */
  account?: string
  /** 备注 */
  comments?: string
  /** 操作系统 */
  os?: string
  /** 设备名称 */
  device?: string
  /** 浏览器类型 */
  browser?: string
  /** ip地址 */
  ip?: string
  /** ip所在地区 */
  ipRegion?: string
  /** 创建时间 */
  createTime?: string
  /** 创建人 */
  createdBy?: string
}
