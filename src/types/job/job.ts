/**
 * 任务查询参数
 */
export interface JobQueryParam {
  /** 任务名称 */
  jobName?: string
  /** 任务描述 */
  jobDescription?: string
  /** 触发器状态 */
  triggerState?: string
  /** 触发器类型 */
  triggerType?: string
  /** 任务执行类 */
  jobClassName?: string
}

/** 调度类型 */
export type ScheduleType = 'CRON' | 'CAL_INT' | 'DAILY_I' | 'SIMPLE'

/**
 * 任务详情
 */
export interface QuartzJobDetailDTO {
  /** 任务名称 */
  jobName?: string
  /** 任务描述 */
  jobDescription?: string
  /** 任务执行类 */
  jobClassName?: string
  /** 任务参数 */
  jobParam?: string
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
  triggerState?: 'NONE' | 'NORMAL' | 'PAUSED' | 'COMPLETE' | 'ERROR' | 'BLOCKED'
  /** 触发器类型 */
  triggerType?: ScheduleType
  /** cron表达式，仅当triggerType=CRON的时候才有值 */
  cron?: string
  /** 间隔的时间单位，仅当triggerType=CAL_INT,DAILY_I的时候才有值 */
  strProp1?: string
  /** 星期几，仅当triggerType=DAILY_I的时候才有值 */
  strProp2?: string
  /** 开始结束时间，仅当triggerType=DAILY_I的时候才有值 */
  strProp3?: string
  /** 重复次数，仅当triggerType=CAL_INT,DAILY_I的时候才有值 */
  intProp1?: number
  /** 重复次数，-1代表重复执行。仅当triggerType=SIMPLE的时候才有值 */
  simpleRepeatCount?: number
  /** 重复间隔，单位毫秒。仅当triggerType=SIMPLE的时候才有值 */
  simpleRepeatInterval?: number
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
 * 创建或编辑任务参数
 */
export interface JobSaveOrUpdateParam {
  /** 任务名称 */
  jobName: string
  /** 任务描述 */
  jobDescription?: string
  /** 任务执行类 */
  jobClassName: string
  /** 任务参数 */
  jobParam?: string
  /** 触发器优先级 */
  priority?: number

  /** 调度类型 */
  scheduleType: ScheduleType

  /** 调度类型为Cron时的参数 */
  cron: string
  /** 调度类型为CAL_INT时的参数 */
  calendar: Calendar
  /** 调度类型为DAILY_I时的参数 */
  dailyTime: DailyTime
  /** 调度类型为SIMPLE时的参数 */
  simple: Simple
}

/**
 * Calendar类型调度器参数
 */
export interface Calendar {
  /** 间隔时间 */
  timeInterval: number
  /** 间隔时间的单位 */
  unit: 'MILLISECOND' | 'SECOND' | 'MINUTE' | 'HOUR' | 'DAY' | 'WEEK' | 'MONTH' | 'YEAR'
}

/** 星期 */
export type DaysOfWeek = 'SUNDAY' | 'MONDAY' | 'TUESDAY' | 'WEDNESDAY' | 'THURSDAY' | 'FRIDAY' | 'SATURDAY'
/**
 * DailyTime类型调度器参数
 */
export interface DailyTime {
  /** 执行类型 */
  type: 'EveryDay' | 'SaturdayAndSunday' | 'MondayThroughFriday' | 'DaysOfTheWeek'
  /** 指定的执行时间 当type为DaysOfTheWeek时，不能为空 */
  daysOfWeek?: DaysOfWeek[]
  /** 间隔时间 */
  timeInterval?: number
  /** 间隔单位 */
  unit?: 'HOUR' | 'MINUTE' | 'SECOND'
  /** 开始时间  格式 HH:mm:ss */
  startTime?: string
  /** 结束时间  格式 HH:mm:ss */
  endTime?: string
}

/**
 * Simple类型调度器参数
 */
export interface Simple {
  /** 间隔单位 */
  unit: 'HOURS' | 'MINUTES' | 'SECONDS' | 'MILLISECONDS'
  /** 间隔时间 */
  timeInterval: number
  /** 重复次数 */
  repeatCount?: number
  /** 是否永远重复执行下去 */
  repeatForever?: boolean
}

/**
 * 任务操作（暂停、恢复、删除）
 */
export interface JobOperationParam {
  /** 任务名称 */
  jobName: string
}

/**
 * 立即运行一次参数
 */
export interface JobRunOnceParam {
  /** 任务名称 */
  jobName: string
  /** 任务参数 */
  jobParam?: string
}

/**
 * 获取下次触发时间参数
 */
export interface TriggerNextTimeParam {
  /** cron表达式 */
  cron: string
  /** 触发次数 */
  count?: number
}
