import type { MockMethod } from 'vite-plugin-mock'
import { getRequestToken, resultError, resultOk } from '../_util'
import type { RequestParams } from '../_util'
import type { PageResult, TaskLogDTO } from '../../src/types'
import { pageResult } from '../_data/taskLog'

/** 分页查询api */
function pageApi(): MockMethod {
  return {
    url: '/mock-api/taskLog/page',
    method: 'post',
    response: (request: RequestParams) => {
      const token = getRequestToken(request)
      if (!token) {
        return resultError('未能读取到有效Token', { code: 401 })
      }

      let page = (request.body.page as number) - 1
      if (page < 0) page = 0
      return resultOk<PageResult<TaskLogDTO>>(pageResult[page].data as unknown as PageResult<TaskLogDTO>)
    },
  }
}

export default [
  pageApi(),
] as MockMethod[]
