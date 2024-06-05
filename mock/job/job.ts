import { defineFakeRoute } from 'vite-plugin-fake-server/client'
import type { FakeRoute, ProcessedRequest } from 'vite-plugin-fake-server'
import type { PageResult } from '../../src/types/global'
import type { QuartzJobDetailDTO, JobClassListResult } from '../../src/types/job/job'
import { checkFailure, getRequestToken, resultError, resultOk } from '../util'
import { pageResult, jobClassListResult } from '../mock_data/job'

/** 分页查询api */
function pageApi(): FakeRoute {
  return {
    url: '/mock-api/job/page',
    method: 'post',
    response: (request: ProcessedRequest) => {
      const token = getRequestToken(request)
      if (!token) {
        return resultError('未能读取到有效Token', { code: 401 })
      }

      let page = (request.body.page as number) - 1
      if (page < 0) page = 0
      return resultOk<PageResult<QuartzJobDetailDTO>>(pageResult[page].data as unknown as PageResult<QuartzJobDetailDTO>)
    },
  }
}

/** 任务执行类列表api */
function jobClassList(): FakeRoute {
  return {
    url: '/mock-api/job/jobClassList',
    method: 'get',
    response: (request: ProcessedRequest) => {
      const token = getRequestToken(request)
      if (!token) {
        return resultError('未能读取到有效Token', { code: 401 })
      }

      return resultOk<JobClassListResult[]>(jobClassListResult.data as unknown as JobClassListResult[])
    }
  }
}

/** 新增api */
function addApi(): FakeRoute {
  return {
    url: '/mock-api/job',
    method: 'post',
    response: (request: ProcessedRequest) => {
      const token = getRequestToken(request)
      if (!token) {
        return resultError('未能读取到有效Token', { code: 401 })
      }

      const body = request.body
      if (!body.jobClassName) return checkFailure('任务执行类不能为空')
      if (!body.jobName) return checkFailure('任务名称不能为空')
      if (!body.scheduleType) return checkFailure('调度类型不能为空')
      switch (body.scheduleType) {
        case 'CRON':
          if (!body.cron) return checkFailure('cron表达式不能为空')
          break
        case 'CAL_INT':
          if (!body.calendar) return checkFailure('Calendar类型调度器参数不能为空')
          if (!body.calendar.timeInterval) return checkFailure('间隔时间不能为空')
          if (!body.calendar.unit) return checkFailure('间隔单位不能为空')
          break
        case 'DAILY_I':
          if (!body.dailyTime) return checkFailure('DailyTime类型调度器参数不能为空')
          if (!body.dailyTime.type) return checkFailure('执行类型不能为空')
          break
        case 'SIMPLE':
          if (!body.simple) return checkFailure('Simple类型调度器参数不能为空')
          if (!body.simple.timeInterval) return checkFailure('间隔时间不能为空')
          if (!body.simple.unit) return checkFailure('间隔单位不能为空')
          break
        default:
          return checkFailure('调度类型不正确')
      }

      return resultOk<boolean>(true)
    }
  }
}

/** 修改api */
function updateApi(): FakeRoute {
  return {
    url: '/mock-api/job',
    method: 'put',
    response: (request: ProcessedRequest) => {
      const token = getRequestToken(request)
      if (!token) {
        return resultError('未能读取到有效Token', { code: 401 })
      }

      const body = request.body
      if (!body.jobClassName) return checkFailure('任务执行类不能为空')
      if (!body.jobName) return checkFailure('任务名称不能为空')
      if (!body.scheduleType) return checkFailure('调度类型不能为空')
      switch (body.scheduleType) {
        case 'CRON':
          if (!body.cron) return checkFailure('cron表达式不能为空')
          break
        case 'CAL_INT':
          if (!body.calendar) return checkFailure('Calendar类型调度器参数不能为空')
          if (!body.calendar.timeInterval) return checkFailure('间隔时间不能为空')
          if (!body.calendar.uint) return checkFailure('间隔单位不能为空')
          break
        case 'DAILY_I':
          if (!body.dailyTime) return checkFailure('DailyTime类型调度器参数不能为空')
          if (!body.dailyTime.type) return checkFailure('执行类型不能为空')
          break
        case 'SIMPLE':
          if (!body.simple) return checkFailure('Simple类型调度器参数不能为空')
          if (!body.simple.timeInterval) return checkFailure('间隔时间不能为空')
          if (!body.simple.unit) return checkFailure('间隔单位不能为空')
          break
        default:
          return checkFailure('调度类型不正确')
      }

      return resultOk<boolean>(true)
    }
  }
}

/** 单体删除api */
function deleteApi(): FakeRoute {
  return {
    url: '/mock-api/job',
    method: 'delete',
    response: (request: ProcessedRequest) => {
      const token = getRequestToken(request)
      if (!token) {
        return resultError('未能读取到有效Token', { code: 401 })
      }

      const body = request.body
      if (!body.jobName) return checkFailure('任务名称不能为空')

      return resultOk<boolean>(true)
    }
  }
}

/** 暂停任务api */
function pauseApi(): FakeRoute {
  return {
    url: '/mock-api/job/pause',
    method: 'post',
    response: (request: ProcessedRequest) => {
      const token = getRequestToken(request)
      if (!token) {
        return resultError('未能读取到有效Token', { code: 401 })
      }

      const body = request.body
      if (!body.jobName) return checkFailure('任务名称不能为空')

      return resultOk<boolean>(true)
    }
  }
}

/** 恢复任务api */
function resumeApi(): FakeRoute {
  return {
    url: '/mock-api/job/resume',
    method: 'post',
    response: (request: ProcessedRequest) => {
      const token = getRequestToken(request)
      if (!token) {
        return resultError('未能读取到有效Token', { code: 401 })
      }

      const body = request.body
      if (!body.jobName) return checkFailure('任务名称不能为空')

      return resultOk<boolean>(true)
    }
  }
}

/** 立即运行一次api */
function runOnceApi(): FakeRoute {
  return {
    url: '/mock-api/job/runOnce',
    method: 'post',
    response: (request: ProcessedRequest) => {
      const token = getRequestToken(request)
      if (!token) {
        return resultError('未能读取到有效Token', { code: 401 })
      }

      const body = request.body
      if (!body.jobName) return checkFailure('任务名称不能为空')

      return resultOk<boolean>(true)
    }
  }
}

/** 获取下次触发时间 */
function nextTriggerTime(): FakeRoute {
  return {
    url: '/mock-api/job/nextTriggerTime',
    method: 'get',
    response: async (request: ProcessedRequest) => {
      const token = getRequestToken(request)
      if (!token) {
        return resultError('未能读取到有效Token', { code: 401 })
      }

      const cron = request.query.cron
      if (!cron) return checkFailure('cron表达式不能为空')

      try {
        // 使用fetch函数发送GET请求
        const response = await fetch(`https://www.pppet.net/preview?p=${cron}`)
        const data = await response.json()
        return resultOk<string[]>(data as unknown as string[])
      } catch (e) {
        // 如果不支持fetch
        console.log(e)
        return resultOk<string[]>([
          '2023-01-01 12:00:00', '2023-01-01 12:00:00',
          '2023-01-01 12:00:00', '2023-01-01 12:00:00',
          '2023-01-01 12:00:00', '2023-01-01 12:00:00',
        ])
      }
    }
  }
}

export default defineFakeRoute([
  pageApi(),
  jobClassList(),
  addApi(),
  updateApi(),
  deleteApi(),
  pauseApi(),
  resumeApi(),
  runOnceApi(),
  nextTriggerTime(),
])
