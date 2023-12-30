/** 分页查询返回结果 */
export const pageResult = [
  {
    code: 0,
    message: '操作成功',
    data: {
      list: [
        {
          jobName: '定期清理操作日志',
          jobDescription: '每月执行一次',
          jobClassName: 'com.zeta.biz.quartz.task.CleanOptLogJob',
          jobParam: '{"beforeDay":30}',
          nextFireTime: '2024-01-30 18:52:52',
          prevFireTime: '2023-12-30 18:52:52',
          priority: 0,
          startTime: '2023-12-30 18:52:52',
          endTime: '1970-01-01 08:00:00',
          triggerState: 'NORMAL',
          triggerType: 'CAL_INT',
          cron: null,
          strProp1: 'MONTH',
          strProp2: 'Asia/Shanghai',
          strProp3: null,
          intProp1: 1,
          simpleRepeatCount: null,
          simpleRepeatInterval: null
        },
        {
          jobName: 'simpleJob',
          jobDescription: '每15分钟执行一次，一直重复',
          jobClassName: 'com.zeta.biz.quartz.task.DemoJob',
          jobParam: '{}',
          nextFireTime: '2023-12-30 13:43:57',
          prevFireTime: '2023-12-30 11:28:57',
          priority: 0,
          startTime: '2023-12-30 11:28:57',
          endTime: '1970-01-01 08:00:00',
          triggerState: 'NORMAL',
          triggerType: 'SIMPLE',
          cron: null,
          strProp1: null,
          strProp2: null,
          strProp3: null,
          intProp1: null,
          simpleRepeatCount: -1,
          simpleRepeatInterval: '900000'
        },
        {
          jobName: 'dailyTimeJob',
          jobDescription: '周一、周三、周五，06:00-06:30执行, 每5分钟执行一次',
          jobClassName: 'com.zeta.biz.quartz.task.DemoJob',
          jobParam: '{}',
          nextFireTime: '2024-01-01 06:00:00',
          prevFireTime: null,
          priority: 0,
          startTime: '2023-12-30 11:28:39',
          endTime: '1970-01-01 08:00:00',
          triggerState: 'NORMAL',
          triggerType: 'DAILY_I',
          cron: null,
          strProp1: 'MINUTE',
          strProp2: '2,4,6',
          strProp3: '6,0,0,6,30,0',
          intProp1: 5,
          simpleRepeatCount: null,
          simpleRepeatInterval: null
        },
        {
          jobName: 'cronJob',
          jobDescription: '每30秒执行一次',
          jobClassName: 'com.zeta.biz.quartz.task.DemoJob',
          jobParam: '{"name":"张三"}',
          nextFireTime: '2023-12-30 13:40:30',
          prevFireTime: '2023-12-30 13:40:00',
          priority: 0,
          startTime: '2023-12-30 11:28:10',
          endTime: '1970-01-01 08:00:00',
          triggerState: 'PAUSED',
          triggerType: 'CRON',
          cron: '0/30 * * * * ? ',
          strProp1: null,
          strProp2: null,
          strProp3: null,
          intProp1: null,
          simpleRepeatCount: null,
          simpleRepeatInterval: null
        },
        {
          jobName: 'calendarJob',
          jobDescription: '一天触发一次',
          jobClassName: 'com.zeta.biz.quartz.task.DemoJob',
          jobParam: '{}',
          nextFireTime: '2023-12-31 11:28:18',
          prevFireTime: '2023-12-30 11:28:18',
          priority: 0,
          startTime: '2023-12-30 11:28:18',
          endTime: '1970-01-01 08:00:00',
          triggerState: 'NORMAL',
          triggerType: 'CAL_INT',
          cron: null,
          strProp1: 'DAY',
          strProp2: 'Asia/Shanghai',
          strProp3: null,
          intProp1: 1,
          simpleRepeatCount: null,
          simpleRepeatInterval: null
        }
      ],
      count: '1',
    },
    error: null,
    success: true,
  },
]

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
