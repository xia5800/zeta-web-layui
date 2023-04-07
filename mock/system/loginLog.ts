import type { MockMethod } from 'vite-plugin-mock'
import { checkFailure, getRequestToken, resultError, resultOk } from '../_util'
import type { requestParams } from '../_util'
import type { PageResult, SysLoginLog } from '../../src/types'
import { pageResult, queryResult } from '../_data/loginLog'

/** 分页查询api */
function pageApi(): MockMethod {
  return {
    url: '/mock-api/system/loginLog/page',
    method: 'post',
    response: (request: requestParams) => {
      const token = getRequestToken(request)
      if (!token) {
        return resultError('未能读取到有效Token', { code: 401 })
      }

      let page = (request.body.page as number) - 1
      if (page < 0) page = 0
      return resultOk<PageResult<SysLoginLog>>(pageResult[page].data as unknown as PageResult<SysLoginLog>)
    },
  }
}

/** 单体查询api */
function getApi(): MockMethod {
  return {
    url: '/mock-api/system/loginLog/:id',
    method: 'get',
    response: (request: requestParams) => {
      const token = getRequestToken(request)
      if (!token) {
        return resultError('未能读取到有效Token', { code: 401 })
      }

      const query = request.query
      if (!query.id) return checkFailure('id不能为空')

      const data = queryResult.data?.find(i => i.id === query.id!)
      return resultOk<SysLoginLog>(data as unknown as SysLoginLog)
    },
  }
}

export default [
  pageApi(),
  getApi(),
] as MockMethod[]
