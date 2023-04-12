import type { MockMethod } from 'vite-plugin-mock'
import { checkFailure, getRequestToken, parseRequestParams, resultError, resultOk } from '../_util'
import type { RequestParams } from '../_util'
import type { SysMenu } from '../../src/types'
import { roleMenuResult } from '../_data/roleMenu'

/** 查询角色菜单Api */
function listApi(): MockMethod {
  return {
    url: '/mock-api/system/roleMenu/:roleId',
    method: 'get',
    response: (request: RequestParams) => {
      const token = getRequestToken(request)
      if (!token) {
        return resultError('未能读取到有效Token', { code: 401 })
      }

      // fix: 解决生产环境获取不到:id值的问题
      const params = parseRequestParams(request.url, '/mock-api/system/roleMenu/:roleId')
      if (!params.roleId) return checkFailure('角色id不能为空')

      const result = roleMenuResult.find(i => i.id === params.roleId)
      return resultOk<SysMenu[]>(result?.data as unknown as SysMenu[])
    },
  }
}

/** 新增或修改角色菜单api */
function updateApi(): MockMethod {
  return {
    url: '/mock-api/system/roleMenu',
    method: 'put',
    response: (request: RequestParams) => {
      const token = getRequestToken(request)
      if (!token) {
        return resultError('未能读取到有效Token', { code: 401 })
      }

      const body = request.body
      if (!body.roleId) return checkFailure('角色id不能为空')

      if (body.id === '1610517190090424320') {
        return resultError('角色[超级管理员]不可分配权限')
      }
      return resultOk<boolean>(true)
    },
  }
}

export default [
  listApi(),
  updateApi(),
] as MockMethod[]
