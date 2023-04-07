import type { MockMethod } from 'vite-plugin-mock'
import { checkFailure, getRequestToken, resultError, resultOk } from '../_util'
import type { requestParams } from '../_util'
import type { PageResult, SysFile } from '../../src/types'
import { pageResult, queryResult, uploadResult } from '../_data/file'

/** 分页查询api */
function pageApi(): MockMethod {
  return {
    url: '/mock-api/system/file/page',
    method: 'post',
    response: (request: requestParams) => {
      const token = getRequestToken(request)
      if (!token) {
        return resultError('未能读取到有效Token', { code: 401 })
      }

      let page = (request.body.page as number) - 1
      if (page < 0) page = 0
      return resultOk<PageResult<SysFile>>(pageResult[page].data as unknown as PageResult<SysFile>)
    },
  }
}

/** 批量查询api */
function queryApi(): MockMethod {
  return {
    url: '/mock-api/system/file/query',
    method: 'post',
    response: (request: requestParams) => {
      const token = getRequestToken(request)
      if (!token) {
        return resultError('未能读取到有效Token', { code: 401 })
      }

      return resultOk<SysFile[]>(queryResult.data as SysFile[])
    },
  }
}

/** 单体查询api */
function getApi(): MockMethod {
  return {
    url: '/mock-api/system/file/:id',
    method: 'get',
    response: (request: requestParams) => {
      const token = getRequestToken(request)
      if (!token) {
        return resultError('未能读取到有效Token', { code: 401 })
      }

      const query = request.query
      if (!query.id) return checkFailure('id不能为空')

      const data = queryResult.data?.find(i => i.id === query.id!)
      return resultOk<SysFile>(data as SysFile)
    },
  }
}

/** 上传api */
function uploadApi(): MockMethod {
  // return {
  //   url: '/mock-api/system/file/upload',
  //   method: 'post',
  //   response: (request: requestParams) => {
  //     const token = getRequestToken(request)
  //     if (!token) {
  //       return resultError('未能读取到有效Token', { code: 401 })
  //     }

  //     return resultOk<SysFile>(uploadResult.data)
  //   },
  // }

  return {
    url: '/mock-api/system/file/upload',
    method: 'post',
    statusCode: 500,
    response: () => {
      return resultError('系统错误', { code: 500 })
    },
  }
}

/** 删除api */
function deleteApi(): MockMethod {
  return {
    url: '/mock-api/system/file/:id',
    method: 'delete',
    response: (request: requestParams) => {
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
    url: '/mock-api/system/file/batch',
    method: 'delete',
    response: (request: requestParams) => {
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
  uploadApi(),
  deleteApi(),
  batchDeleteApi(),
] as MockMethod[]
