import type { MockMethod } from 'vite-plugin-mock'
import { checkFailure, getRequestToken, parseRequestParams, resultError, resultOk } from '../_util'
import type { RequestParams } from '../_util'
import type { PageResult, SysDict } from '../../src/types'
import { pageResult, queryResult } from '../_data/dict'

/** 分页查询api */
function pageApi(): MockMethod {
  return {
    url: '/mock-api/system/dict/page',
    method: 'post',
    response: (request: RequestParams) => {
      const token = getRequestToken(request)
      if (!token) {
        return resultError('未能读取到有效Token', { code: 401 })
      }

      let page = (request.body.page as number) - 1
      if (page < 0) page = 0
      return resultOk<PageResult<SysDict>>(pageResult[page].data as unknown as PageResult<SysDict>)
    },
  }
}

/** 批量查询api */
function queryApi(): MockMethod {
  return {
    url: '/mock-api/system/dict/query',
    method: 'post',
    response: (request: RequestParams) => {
      const token = getRequestToken(request)
      if (!token) {
        return resultError('未能读取到有效Token', { code: 401 })
      }

      return resultOk<SysDict[]>(queryResult.data as SysDict[])
    },
  }
}

/** 单体查询api */
function getApi(): MockMethod {
  return {
    url: '/mock-api/system/dict/:id',
    method: 'get',
    response: (request: RequestParams) => {
      const token = getRequestToken(request)
      if (!token) {
        return resultError('未能读取到有效Token', { code: 401 })
      }

      // fix: 解决生产环境获取不到:id值的问题
      const params = parseRequestParams(request.url, '/mock-api/system/dict/:id')
      if (!params.id) return checkFailure('id不能为空')

      const data = queryResult.data?.find(i => i.id === params.id!)
      return resultOk<SysDict>(data as SysDict)
    },
  }
}

/** 新增api */
function addApi(): MockMethod {
  return {
    url: '/mock-api/system/dict',
    method: 'post',
    response: (request: RequestParams) => {
      const token = getRequestToken(request)
      if (!token) {
        return resultError('未能读取到有效Token', { code: 401 })
      }

      const body = request.body
      if (!body.name) return checkFailure('字典名不能为空')
      if (!body.code) return checkFailure('字典编码不能为空')

      return resultOk<boolean>(true)
    },
  }
}

/** 修改api */
function updateApi(): MockMethod {
  return {
    url: '/mock-api/system/dict',
    method: 'put',
    response: (request: RequestParams) => {
      const token = getRequestToken(request)
      if (!token) {
        return resultError('未能读取到有效Token', { code: 401 })
      }

      const body = request.body
      if (!body.id) return checkFailure('字典id不能为空')
      if (!body.name) return checkFailure('字典名不能为空')
      if (!body.code) return checkFailure('字典编码不能为空')

      return resultOk<boolean>(true)
    },
  }
}

/** 删除api */
function deleteApi(): MockMethod {
  return {
    url: '/mock-api/system/dict/:id',
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
    url: '/mock-api/system/dict/batch',
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
