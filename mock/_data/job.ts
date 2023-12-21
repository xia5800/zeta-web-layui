/** 分页查询返回结果 */
export const pageResult = [
  {
    code: 0,
    message: '操作成功',
    data: {
      list: [
        {
          triggerName: 'cleanOptLogJobTrigger',
          triggerGroup: 'default',
          triggerDescription: '',
          nextFireTime: '2023-12-20 15:54:30',
          prevFireTime: '2023-12-20 15:54:00',
          priority: 0,
          startTime: '2023-12-20 15:03:15',
          endTime: '1970-01-01 08:00:00',
          triggerState: 'NORMAL',
          triggerType: 'CRON',
          jobName: '定时清理操作日志',
          jobGroup: 'default',
          jobDescription: '每天01:00定时清理操作日志',
          jobClassName: 'com.zeta.biz.quartz.task.CleanOptLogJob',
          jobParam: '{"beforeDay":10}',
          cron: '0 0 1 * * ? *'
        }
      ],
      count: '1',
    },
    error: null,
    success: true,
  },
]

/** 批量查询返回结果 */
export const queryResult = {
  code: 0,
  message: '操作成功',
  data: [
    {
      triggerName: 'cleanOptLogJobTrigger',
      triggerGroup: 'default',
      triggerDescription: '',
      nextFireTime: '2023-12-20 15:54:30',
      prevFireTime: '2023-12-20 15:54:00',
      priority: 0,
      startTime: '2023-12-20 15:03:15',
      endTime: '1970-01-01 08:00:00',
      triggerState: 'NORMAL',
      triggerType: 'CRON',
      jobName: '定时清理操作日志',
      jobGroup: 'default',
      jobDescription: '每天01:00定时清理操作日志',
      jobClassName: 'com.zeta.biz.quartz.task.CleanOptLogJob',
      jobParam: '{"beforeDay":10}',
      cron: '0 0 1 * * ? *'
    }
  ],
  error: null,
  success: true,
}

/** 任务执行类列表返回结果 */
export const jobClassListResult = {
  code: 0,
  message: '操作成功',
  data: [
    {
      value: 'com.zeta.biz.quartz.task.DemoJob',
      description: '案例Job'
    },
    {
      value: 'com.zeta.biz.quartz.task.CleanOptLogJob',
      description: '清除操作日志'
    }
  ],
  error: null,
  success: true
}
