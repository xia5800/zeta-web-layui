/**
 * 任务调度日志
 */
export interface TaskLog {
  /** 日志id */
  id?: string
  /** 创建时间 */
  createTime?: string
  /** 创建人 */
  createBy?: string
  /** 类型 */
  type?: 'SUCCESS' | 'EXCEPTION'
  /** 触发器名称 */
  triggerName?: string
  /** 触发器组 */
  triggerGroup?: string
  /** 任务名 */
  jobName?: string
  /** 任务描述 */
  jobDescription?: string
  /** 类路径 */
  jobClassName?: string
  /** 任务参数 */
  jobParam?: string
  /** 返回值 */
  result?: string
  /** 异常描述 */
  exception?: string
  /** 消耗时间 单位毫秒 */
  spendTime?: number
}

/**
 * 任务调度日志（分页查询返回值）
 */
export interface TaskLogDTO extends TaskLog {
  /** cron表达式 */
  cron?: string
}
