import { defineFakeRoute } from 'vite-plugin-fake-server/client'
import type { FakeRoute, ProcessedRequest } from 'vite-plugin-fake-server'
import type { PageResult } from '../../src/types/global'
import type { SysDictItem } from '~/types/system/dictItem'
import { checkFailure, getRequestToken, resultError, resultOk } from '../util'
import { pageResult, queryResult } from '../mock_data/dictItem'

/** 分页查询api */
function pageApi(): FakeRoute {
  return {
    url: '/mock-api/system/dictItem/page',
    method: 'post',
    response: (request: ProcessedRequest) => {
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
function queryApi(): FakeRoute {
  return {
    url: '/mock-api/system/dictItem/query',
    method: 'post',
    response: (request: ProcessedRequest) => {
      const token = getRequestToken(request)
      if (!token) {
        return resultError('未能读取到有效Token', { code: 401 })
      }

      return resultOk<SysDictItem[]>(queryResult.data as SysDictItem[])
    },
  }
}

/** 单体查询api */
function getApi(): FakeRoute {
  return {
    url: '/mock-api/system/dictItem/:id',
    method: 'get',
    response: (request: ProcessedRequest) => {
      const token = getRequestToken(request)
      if (!token) {
        return resultError('未能读取到有效Token', { code: 401 })
      }

      const params = request.params
      if (!params.id) return checkFailure('id不能为空')

      const data = queryResult.data?.find(i => i.id === params.id!)
      return resultOk<SysDictItem>(data as SysDictItem)
    },
  }
}

/** 新增api */
function addApi(): FakeRoute {
  return {
    url: '/mock-api/system/dictItem',
    method: 'post',
    response: (request: ProcessedRequest) => {
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
function updateApi(): FakeRoute {
  return {
    url: '/mock-api/system/dictItem',
    method: 'put',
    response: (request: ProcessedRequest) => {
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
function deleteApi(): FakeRoute {
  return {
    url: '/mock-api/system/dictItem/:id',
    method: 'delete',
    response: (request: ProcessedRequest) => {
      const token = getRequestToken(request)
      if (!token) {
        return resultError('未能读取到有效Token', { code: 401 })
      }

      return resultOk<boolean>(true)
    },
  }
}

/** 批量删除api */
function batchDeleteApi(): FakeRoute {
  return {
    url: '/mock-api/system/dictItem/batch',
    method: 'delete',
    response: (request: ProcessedRequest) => {
      const token = getRequestToken(request)
      if (!token) {
        return resultError('未能读取到有效Token', { code: 401 })
      }

      return resultOk<boolean>(true)
    },
  }
}

export default defineFakeRoute([
  pageApi(),
  queryApi(),
  getApi(),
  addApi(),
  updateApi(),
  deleteApi(),
  batchDeleteApi(),
])
