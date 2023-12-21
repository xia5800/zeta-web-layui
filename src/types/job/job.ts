/**
 * 任务查询参数
 */
export interface JobQueryParam {
  /** 触发器名称 */
  triggerName?: string
  /** 触发器组 */
  triggerGroup?: string
  /** 触发器描述 */
  triggerDescription?: string
  /** 任务名称 */
  jobName?: string
  /** 任务组 */
  jobGroup?: string
  /** 任务描述 */
  jobDescription?: string
  /** 触发器状态 */
  triggerState?: string
  /** 任务执行类 */
  jobClassName?: string
}


/**
 * 任务详情
 */
export interface QuartzJobDetailDTO {
  /** 触发器名称 */
  triggerName?: string
  /** 触发器组名称 */
  triggerGroup?: string
  /** 触发器描述 */
  triggerDescription?: string
  /** 下次触发时间 */
  nextFireTime?: string
  /** 上次触发时间 */
  prevFireTime?: string
  /** 触发器优先级 */
  priority?: number
  /** 开始时间 */
  startTime?: string
  /** 结束时间 */
  endTime?: string
  /**
   * 触发器状态
   *
   * 状态值说明：
   *   null: 获取状态失败
   *   NONE: 触发器不存在或被删除
   *   NORMAL: 正常
   *   PAUSED: 暂停
   *   COMPLETE: 完成
   *   ERROR: 错误
   *   BLOCKED: 阻塞
   */
  triggerState?: 'NONE' | 'NORMAL' | 'PAUSED' | 'COMPLETE' | 'ERROR' | 'BLOCKED',
  /** 触发器类型 */
  triggerType?: string
  /** 任务名称 */
  jobName?: string
  /** 任务组 */
  jobGroup?: string
  /** 任务描述 */
  jobDescription?: string
  /** 任务执行类 */
  jobClassName?: string
  /** 任务参数 */
  jobParam?: string
  /** cron表达式，仅当triggerType=CRON的时候才有值 */
  cron?: string
}

/**
 * 任务执行类返回值
 */
export interface JobClassListResult {
  /** 任务执行类路径 */
  value: string
  /** 任务执行类描述 */
  description: string
}

/**
 * 创建任务参数
 */
export interface JobSaveParam {
  /** 触发器名称 */
  triggerName: string
  /** 触发器组名称 */
  triggerGroup?: string
  /** 触发器描述 */
  triggerDescription?: string
  /** 触发器优先级 */
  priority?: number
  /** 任务名称 */
  jobName: string
  /** 任务执行类 */
  jobClassName: string
  /** cron表达式 */
  cron: string
  /** 任务组名称 */
  jobGroup?: string
  /** 任务描述 */
  jobDescription?: string
  /** 任务参数 */
  jobParam?: string
}

/**
 * 修改任务触发器
 */
export interface JobTriggerUpdateParam {
   /** 旧触发器名称 */
  oldName?: string
  /** 旧触发器组名称 */
  oldGroup?: string
  /** 触发器名称 */
  triggerName?: string
  /** 触发器组名称 */
  triggerGroup?: string
  /** 触发器描述 */
  triggerDescription?: string
  /** cron表达式 */
  cron?: string
  /** 触发器优先级 */
  priority?: number
}

/**
 * 任务操作（暂停、恢复、删除）
 */
export interface JobOperationParam {
  /** 任务名称 */
  jobName: string
  /** 任务组名称 */
  jobGroup?: string
}
