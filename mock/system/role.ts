import type { MockMethod } from 'vite-plugin-mock'
import { checkFailure, getRequestToken, parseRequestParams, resultError, resultOk } from '../_util'
import type { RequestParams } from '../_util'
import type { PageResult, SysRole } from '../../src/types'
import { pageResult, queryResult } from '../_data/role'

/** 分页查询api */
function pageApi(): MockMethod {
  return {
    url: '/mock-api/system/role/page',
    method: 'post',
    response: (request: RequestParams) => {
      const token = getRequestToken(request)
      if (!token) {
        return resultError('未能读取到有效Token', { code: 401 })
      }

      return resultOk<PageResult<SysRole>>(pageResult.data as unknown as PageResult<SysRole>)
    },
  }
}

/** 批量查询api */
function queryApi(): MockMethod {
  return {
    url: '/mock-api/system/role/query',
    method: 'post',
    response: (request: RequestParams) => {
      const token = getRequestToken(request)
      if (!token) {
        return resultError('未能读取到有效Token', { code: 401 })
      }

      return resultOk<SysRole[]>(queryResult.data as SysRole[])
    },
  }
}

/** 单体查询api */
function getApi(): MockMethod {
  return {
    url: '/mock-api/system/role/:id',
    method: 'get',
    response: (request: RequestParams) => {
      const token = getRequestToken(request)
      if (!token) {
        return resultError('未能读取到有效Token', { code: 401 })
      }

      // fix: 解决生产环境获取不到:id值的问题
      const params = parseRequestParams(request.url, '/mock-api/system/role/:id')
      if (!params.id) return checkFailure('id不能为空')

      const role = queryResult.data?.find(i => i.id === params.id!)
      return resultOk<SysRole>(role as SysRole)
    },
  }
}

/** 新增api */
function addApi(): MockMethod {
  return {
    url: '/mock-api/system/role',
    method: 'post',
    response: (request: RequestParams) => {
      const token = getRequestToken(request)
      if (!token) {
        return resultError('未能读取到有效Token', { code: 401 })
      }

      const body = request.body
      if (!body.name) return checkFailure('角色名不能为空')
      if (!body.code) return checkFailure('角色编码不能为空')

      return resultOk<boolean>(true)
    },
  }
}

/** 修改api */
function updateApi(): MockMethod {
  return {
    url: '/mock-api/system/role',
    method: 'put',
    response: (request: RequestParams) => {
      const token = getRequestToken(request)
      if (!token) {
        return resultError('未能读取到有效Token', { code: 401 })
      }

      const body = request.body
      if (!body.id) return checkFailure('角色id不能为空')
      if (!body.name) return checkFailure('角色名不能为空')
      if (!body.code) return checkFailure('角色编码不能为空')

      if (body.id === '1610517190090424320') {
        return resultError('角色[超级管理员]禁止修改')
      }
      return resultOk<boolean>(true)
    },
  }
}

/** 删除api */
function deleteApi(): MockMethod {
  return {
    url: '/mock-api/system/role/:id',
    method: 'delete',
    response: (request: RequestParams) => {
      const token = getRequestToken(request)
      if (!token) {
        return resultError('未能读取到有效Token', { code: 401 })
      }

      // fix: 解决生产环境获取不到:id值的问题
      const params = parseRequestParams(request.url, '/mock-api/system/role/:id')
      if (params.id === '1610517190090424320') {
        return resultError('角色[超级管理员]禁止删除')
      }

      return resultOk<boolean>(true)
    },
  }
}

/** 批量删除api */
function batchDeleteApi(): MockMethod {
  return {
    url: '/mock-api/system/role/batch',
    method: 'delete',
    response: (request: RequestParams) => {
      const token = getRequestToken(request)
      if (!token) {
        return resultError('未能读取到有效Token', { code: 401 })
      }

      const body = request.body
      if ('1610517190090424320' in (body.ids as string[])) {
        return resultError('角色[超级管理员]禁止删除')
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
