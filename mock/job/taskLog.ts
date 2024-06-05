import { defineFakeRoute } from 'vite-plugin-fake-server/client'
import type { FakeRoute, ProcessedRequest } from 'vite-plugin-fake-server'
import { getRequestToken, resultError, resultOk } from '../util'
import type { PageResult } from '../../src/types/global'
import type { TaskLogDTO } from '../../src/types/job/taskLog'
import { pageResult } from '../mock_data/taskLog'

/** 分页查询api */
function pageApi(): FakeRoute {
  return {
    url: '/mock-api/taskLog/page',
    method: 'post',
    response: (request: ProcessedRequest) => {
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

export default defineFakeRoute([
  pageApi(),
])
