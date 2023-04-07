import type { MockMethod } from 'vite-plugin-mock'
import { checkFailure, getRequestToken, resultError, resultOk } from '../_util'
import type { requestParams } from '../_util'
import type { SysMenu } from '../../src/types'
import { roleMenuResult } from '../_data/roleMenu'

/** 查询角色菜单Api */
function listApi(): MockMethod {
  return {
    url: '/mock-api/system/roleMenu/:roleId',
    method: 'get',
    response: (request: requestParams) => {
      const token = getRequestToken(request)
      if (!token) {
        return resultError('未能读取到有效Token', { code: 401 })
      }

      const query = request.query
      if (!query.roleId) return checkFailure('角色id不能为空')

      const result = roleMenuResult.find(i => i.id === query.roleId)
      return resultOk<SysMenu[]>(result?.data as unknown as SysMenu[])
    },
  }
}

/** 新增或修改角色菜单api */
function updateApi(): MockMethod {
  return {
    url: '/mock-api/system/roleMenu',
    method: 'put',
    response: (request: requestParams) => {
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
