import type { MockMethod } from 'vite-plugin-mock'
import { checkFailure, getRequestToken, resultError, resultOk } from '../_util'
import type { RequestParams } from '../_util'
import type { SysMenu } from '../../src/types'
import { menuTree, menuTreeNoButton } from '../_data/menu'

/** 查询菜单树 */
function queryMenuTreeApi(): MockMethod {
  return {
    url: '/mock-api/system/menu/tree',
    method: 'post',
    response: (request: RequestParams) => {
      const token = getRequestToken(request)
      if (!token) {
        return resultError('未能读取到有效Token', { code: 401 })
      }

      const body = request.body
      const noButton = body.type && body.type === 'MENU'

      return resultOk<SysMenu[]>(
        noButton
          ? menuTreeNoButton.data as unknown as SysMenu[]
          : menuTree.data as unknown as SysMenu[],
      )
    },
  }
}

/** 新增api */
function addApi(): MockMethod {
  return {
    url: '/mock-api/system/menu',
    method: 'post',
    response: (request: RequestParams) => {
      const token = getRequestToken(request)
      if (!token) {
        return resultError('未能读取到有效Token', { code: 401 })
      }

      const body = request.body
      if (!body.parentId) return checkFailure('父级id不能为空')
      if (!body.label) return checkFailure('名称不能为空')
      if (!body.type) return checkFailure('菜单类型不能为空')
      if (body.type === 'MENU') {
        if (!body.name) return checkFailure('路由key不能为空')
      }

      return resultOk<boolean>(true)
    },
  }
}

/** 修改api */
function updateApi(): MockMethod {
  return {
    url: '/mock-api/system/menu',
    method: 'put',
    response: (request: RequestParams) => {
      const token = getRequestToken(request)
      if (!token) {
        return resultError('未能读取到有效Token', { code: 401 })
      }

      const body = request.body
      if (!body.id) return checkFailure('id不能为空')
      if (!body.parentId) return checkFailure('父级id不能为空')
      if (!body.label) return checkFailure('名称不能为空')
      if (!body.type) return checkFailure('菜单类型')
      if (body.type === 'MENU') {
        if (!body.name) return checkFailure('路由key不能为空')
      }
      return resultOk<boolean>(true)
    },
  }
}

/** 删除api */
function deleteApi(): MockMethod {
  return {
    url: '/mock-api/system/menu/:id',
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
    url: '/mock-api/system/menu/batch',
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
  queryMenuTreeApi(),
  addApi(),
  updateApi(),
  deleteApi(),
  batchDeleteApi(),
] as MockMethod[]
