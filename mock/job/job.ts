import type { MockMethod } from 'vite-plugin-mock'
import { checkFailure, getRequestToken, parseRequestParams, resultError, resultOk } from '../_util'
import type { RequestParams } from '../_util'
import type { PageResult, QuartzJobDetailDTO, JobClassListResult } from '../../src/types'
import { pageResult, queryResult, jobClassListResult } from '../_data/job'

/** 分页查询api */
function pageApi(): MockMethod {
  return {
    url: '/mock-api/job/page',
    method: 'post',
    response: (request: RequestParams) => {
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

/** 列表查询api */
function queryApi(): MockMethod {
  return {
    url: '/mock-api/job',
    method: 'get',
    response: (request: RequestParams) => {
      const token = getRequestToken(request)
      if (!token) {
        return resultError('未能读取到有效Token', { code: 401 })
      }

      return resultOk<QuartzJobDetailDTO[]>(queryResult.data as unknown as QuartzJobDetailDTO[])
    },
  }
}

/** 任务执行类列表api */
function jobClassList(): MockMethod {
  return {
    url: '/mock-api/job/jobClassList',
    method: 'get',
    response: (request: RequestParams) => {
      const token = getRequestToken(request)
      if (!token) {
        return resultError('未能读取到有效Token', { code: 401 })
      }

      return resultOk<JobClassListResult[]>(jobClassListResult.data as unknown as JobClassListResult[])
    }
  }
}

/** 新增api */
function addApi(): MockMethod {
  return {
    url: '/mock-api/job',
    method: 'post',
    response: (request: RequestParams) => {
      const token = getRequestToken(request)
      if (!token) {
        return resultError('未能读取到有效Token', { code: 401 })
      }

      const body = request.body
      if (!body.jobClassName) return checkFailure('任务执行类不能为空')
      if (!body.jobName) return checkFailure('任务名称不能为空')
      if (!body.triggerName) return checkFailure('触发器名称不能为空')
      if (!body.cron) return checkFailure('cron表达式不能为空')

      return resultOk<boolean>(true)
    }
  }
}

/** 修改api */
function updateApi(): MockMethod {
  return {
    url: '/mock-api/job',
    method: 'put',
    response: (request: RequestParams) => {
      const token = getRequestToken(request)
      if (!token) {
        return resultError('未能读取到有效Token', { code: 401 })
      }

      const body = request.body
      if (!body.oldName) return checkFailure('旧触发器名称不能为空')
      if (!body.triggerName) return checkFailure('新触发器名称不能为空')
      if (!body.cron) return checkFailure('cron表达式不能为空')

      return resultOk<boolean>(true)
    }
  }
}

/** 单体删除api */
function deleteApi(): MockMethod {
  return {
    url: '/mock-api/job',
    method: 'delete',
    response: (request: RequestParams) => {
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
function pauseApi(): MockMethod {
  return {
    url: '/mock-api/job/pause',
    method: 'post',
    response: (request: RequestParams) => {
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
function resumeApi(): MockMethod {
  return {
    url: '/mock-api/job/resume',
    method: 'post',
    response: (request: RequestParams) => {
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
function runOnceApi(): MockMethod {
  return {
    url: '/mock-api/job/runOnce',
    method: 'post',
    response: (request: RequestParams) => {
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
function nextTriggerTime(): MockMethod {
  return {
    url: '/mock-api/job/nextTriggerTime',
    method: 'get',
    response: async (request: RequestParams) => {
      const token = getRequestToken(request)
      if (!token) {
        return resultError('未能读取到有效Token', { code: 401 })
      }

      let cron = request.query.cron
      if (!cron) return checkFailure('cron表达式不能为空')

      // issue: https://github.com/vbenjs/vite-plugin-mock/issues/48
      try {
        // 使用fetch函数发送GET请求
        const response = await fetch('https://www.pppet.net/preview?p='+ cron)
        const data = await response.json()
        return resultOk<string[]>(data as unknown as string[])
      } catch (e) {
        // 如果不支持fetch
        console.log(e)
        return resultOk<string[]>([
          '2023-01-01 12:00:00','2023-01-01 12:00:00',
          '2023-01-01 12:00:00','2023-01-01 12:00:00',
          '2023-01-01 12:00:00','2023-01-01 12:00:00',
        ])
      }
    }
  }
}

export default [
  pageApi(),
  queryApi(),
  jobClassList(),
  addApi(),
  updateApi(),
  deleteApi(),
  pauseApi(),
  resumeApi(),
  runOnceApi(),
  nextTriggerTime(),
] as MockMethod[]
