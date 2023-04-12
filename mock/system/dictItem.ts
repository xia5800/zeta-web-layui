import type { MockMethod } from 'vite-plugin-mock'
import { checkFailure, getRequestToken, parseRequestParams, resultError, resultOk } from '../_util'
import type { RequestParams } from '../_util'
import type { PageResult, SysDictItem } from '../../src/types'
import { pageResult, queryResult } from '../_data/dictItem'

/** 分页查询api */
function pageApi(): MockMethod {
  return {
    url: '/mock-api/system/dictItem/page',
    method: 'post',
    response: (request: RequestParams) => {
      const token = getRequestToken(request)
      if (!token) {
        return resultError('未能读取到有效Token', { code: 401 })
      }

      const body = request.body
      let page = (body.page as number) - 1
      if (page < 0) page = 0

      const result = pageResult.find(i => i.dictId === body.model.dictId)?.data
      return resultOk<PageResult<SysDictItem>>(result as unknown as PageResult<SysDictItem>)
    },
  }
}

/** 批量查询api */
function queryApi(): MockMethod {
  return {
    url: '/mock-api/system/dictItem/query',
    method: 'post',
    response: (request: RequestParams) => {
      const token = getRequestToken(request)
      if (!token) {
        return resultError('未能读取到有效Token', { code: 401 })
      }

      return resultOk<SysDictItem[]>(queryResult.data as SysDictItem[])
    },
  }
}

/** 单体查询api */
function getApi(): MockMethod {
  return {
    url: '/mock-api/system/dictItem/:id',
    method: 'get',
    response: (request: RequestParams) => {
      const token = getRequestToken(request)
      if (!token) {
        return resultError('未能读取到有效Token', { code: 401 })
      }

      // fix: 解决生产环境获取不到:id值的问题
      const params = parseRequestParams(request.url, '/mock-api/system/dictItem/:id')
      if (!params.id) return checkFailure('id不能为空')

      const data = queryResult.data?.find(i => i.id === params.id!)
      return resultOk<SysDictItem>(data as SysDictItem)
    },
  }
}

/** 新增api */
function addApi(): MockMethod {
  return {
    url: '/mock-api/system/dictItem',
    method: 'post',
    response: (request: RequestParams) => {
      const token = getRequestToken(request)
      if (!token) {
        return resultError('未能读取到有效Token', { code: 401 })
      }

      const body = request.body
      if (!body.dictId) return checkFailure('字典id不能为空')
      if (!body.name) return checkFailure('字典项不能为空')
      if (!body.value) return checkFailure('值不能为空')

      return resultOk<boolean>(true)
    },
  }
}

/** 修改api */
function updateApi(): MockMethod {
  return {
    url: '/mock-api/system/dictItem',
    method: 'put',
    response: (request: RequestParams) => {
      const token = getRequestToken(request)
      if (!token) {
        return resultError('未能读取到有效Token', { code: 401 })
      }

      const body = request.body
      if (!body.id) return checkFailure('字典项id不能为空')
      if (!body.dictId) return checkFailure('字典id不能为空')
      if (!body.name) return checkFailure('字典项不能为空')
      if (!body.value) return checkFailure('值不能为空')

      return resultOk<boolean>(true)
    },
  }
}

/** 删除api */
function deleteApi(): MockMethod {
  return {
    url: '/mock-api/system/dictItem/:id',
    method: 'delete',
    response: (request: RequestParams) => {
      const token = getRequestToken(request)
      if (!token) {
        return resultError('未能读取到有效Token', { code: 401 })
      }

      return resultOk<boolean>(true)
    },
  }
}

/** 批量删除api */
function batchDeleteApi(): MockMethod {
  return {
    url: '/mock-api/system/dictItem/batch',
    method: 'delete',
    response: (request: RequestParams) => {
      const token = getRequestToken(request)
      if (!token) {
        return resultError('未能读取到有效Token', { code: 401 })
      }

      return resultOk<boolean>(true)
    },
  }
}

export default [
  pageApi(),
  queryApi(),
  getApi(),
  addApi(),
  updateApi(),
  deleteApi(),
  batchDeleteApi(),
] as MockMethod[]
