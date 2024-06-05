import { defineFakeRoute } from 'vite-plugin-fake-server/client'
import type { FakeRoute, ProcessedRequest } from 'vite-plugin-fake-server'
import type { SysMenu } from '../../src/types/system/menu'
import { checkFailure, getRequestToken, resultError, resultOk } from '../util'
import { roleMenuResult } from '../mock_data/roleMenu'

/** 查询角色菜单Api */
function listApi(): FakeRoute {
  return {
    url: '/mock-api/system/roleMenu/:roleId',
    method: 'get',
    response: (request: ProcessedRequest) => {
      const token = getRequestToken(request)
      if (!token) {
        return resultError('未能读取到有效Token', { code: 401 })
      }

      const params = request.params
      if (!params.roleId) return checkFailure('角色id不能为空')

      const result = roleMenuResult.find(i => i.id === params.roleId)
      return resultOk<SysMenu[]>(result?.data as unknown as SysMenu[])
    },
  }
}

/** 新增或修改角色菜单api */
function updateApi(): FakeRoute {
  return {
    url: '/mock-api/system/roleMenu',
    method: 'put',
    response: (request: ProcessedRequest) => {
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

export default defineFakeRoute([
  listApi(),
  updateApi(),
])
