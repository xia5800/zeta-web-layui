/**
 * 操作日志
 */
export interface SysOptLog {
  /** 操作日志id */
  id?: string
  /** 操作类型 */
  type?: 'OPERATION' | 'EXCEPTION'
  /** 操作描述 */
  description?: string
  /** 请求地址 */
  url?: string
  /** 请求方式 */
  httpMethod?: string
  /** 类路径 */
  classPath?: string
  /** 请求参数 */
  params?: string
  /** 返回值 */
  result?: string
  /** 异常描述 */
  exception?: string
  /** 消耗时间 单位毫秒 */
  spendTime?: string
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
  /** 最后修改时间 */
  updateTime?: string
  /** 修改人 */
  updatedBy?: string
  /** 操作人 */
  userName?: string
}
